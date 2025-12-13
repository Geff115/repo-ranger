'use client';

import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Clock, CheckCircle, AlertCircle, FileText, Link } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieLabelRenderProps } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

// Types
interface Issue {
  number: number;
  title: string;
  state: string;
  labels: { name: string }[];
  created_at: string;
  html_url: string;
  comments: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface PriorityData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

const COLORS = {
  bug: '#ef4444',
  enhancement: '#3b82f6',
  documentation: '#8b5cf6',
  question: '#10b981',
};

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    bugs: 0,
    features: 0,
    docs: 0,
    questions: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/Geff115/repo-ranger/issues?state=all&per_page=50',
        {
          headers: {
            'Accept': 'application/vnd.github+json',
          },
        }
      );
      const data = await response.json();
      setIssues(data);
      calculateStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setLoading(false);
    }
  };

  const calculateStats = (issueData: Issue[]) => {
    // Initialize stats dynamically
    const newStats = {
      total: issueData.length,
      bugs: 0,
      features: 0,
      docs: 0,
      questions: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
    };

    // Label → stat mapping
    const labelMap: Record<string, keyof typeof newStats> = {
      bug: "bugs",
      enhancement: "features",
      documentation: "docs",
      question: "questions",
      "priority: high": "highPriority",
      "priority: medium": "mediumPriority",
      "priority: low": "lowPriority",
    };

    // One pass through issues → one pass through labels
    for (const issue of issueData) {
      for (const { name } of issue.labels) {
        const mapped = labelMap[name];
        if (mapped) {
          newStats[mapped]++;
        }
      }
    }

    setStats(newStats);
  };


  const categoryData: CategoryData[] = [
    { name: 'Bugs', value: stats.bugs, color: COLORS.bug },
    { name: 'Features', value: stats.features, color: COLORS.enhancement },
    { name: 'Docs', value: stats.docs, color: COLORS.documentation },
    { name: 'Questions', value: stats.questions, color: COLORS.question },
  ].filter(item => item.value > 0);

  const priorityData: PriorityData[] = [
    { name: 'High', value: stats.highPriority, color: '#dc2626' },
    { name: 'Medium', value: stats.mediumPriority, color: '#f59e0b' },
    { name: 'Low', value: stats.lowPriority, color: '#10b981' },
  ].filter(item => item.value > 0);

  const recentIssues = issues
    .filter(issue => !issue.labels.some(l => l.name === 'report'))
    .slice(0, 5);

  const weeklyReports = issues
    .filter(issue => issue.labels.some(l => l.name === 'report'))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-blue-500 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading RepoRanger Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  RepoRanger Analytics
                </h1>
                <p className="text-slate-400 text-sm">AI-Powered Repository Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/how-it-works"
                className="px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-colors text-sm font-medium"
              >
                How It Works
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Agent Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="w-6 h-6" />}
            label="Total Issues"
            value={stats.total}
            color="blue"
          />
          <StatCard
            icon={<AlertCircle className="w-6 h-6" />}
            label="High Priority"
            value={stats.highPriority}
            color="red"
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Bugs Detected"
            value={stats.bugs}
            color="purple"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Questions Answered"
            value={stats.questions}
            color="green"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: PieLabelRenderProps) =>
                    `${props.name ?? ''} ${(props.percent ?? 0 * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              Priority Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity & Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Issues */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Recent Issues Processed
            </h2>
            <div className="space-y-4">
              {recentIssues.map(issue => (
                <a
                  key={issue.number}
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">#{issue.number} {issue.title}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {issue.labels.slice(0, 3).map(label => (
                          <span
                            key={label.name}
                            className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300"
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Weekly Reports */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Intelligence Reports
            </h2>
            <div className="space-y-4">
              {weeklyReports.map(report => (
                <a
                  key={report.number}
                  href={report.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{report.title}</p>
                      <p className="text-sm text-slate-400 mt-1">
                        {report.comments} insights
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Powered by Kestra • Groq AI • Built for AI Agents Assemble Hackathon</p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number; 
  color: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm border rounded-xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
    </div>
  );
}