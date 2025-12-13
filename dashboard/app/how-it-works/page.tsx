import { Activity, Zap, Brain, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    RepoRanger
                  </h1>
                  <p className="text-slate-400 text-sm">How It Works</p>
                </div>
              </Link>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            How RepoRanger Works
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            An intelligent AI agent that automates GitHub issue management,
            saving maintainers hours of manual work every week.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-red-400" />
            </div>
            The Problem
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-lg mb-3 text-red-400">⏰ Time Consuming</h4>
              <p className="text-slate-300">
                Maintainers spend 15-30 minutes manually triaging each issue.
                For 100 issues/week, that's 25-50 hours!
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-lg mb-3 text-red-400">🔍 Lack of Context</h4>
              <p className="text-slate-300">
                Bug reports often lack details about affected files,
                making diagnosis difficult and time-consuming.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-lg mb-3 text-red-400">📊 No Pattern Detection</h4>
              <p className="text-slate-300">
                Without systematic analysis, recurring issues and trends
                go unnoticed until they become major problems.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-lg mb-3 text-red-400">🔄 Duplicate Issues</h4>
              <p className="text-slate-300">
                Users create duplicate issues because they can't find
                similar existing ones, cluttering the issue tracker.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            The Solution
          </h3>

          {/* Workflow Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 bg-blue-500/20 p-4 rounded-full border-4 border-blue-500/30">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-3">1. Issue Created</h4>
                <p className="text-slate-300 mb-4">
                  When a user creates an issue in your GitHub repository, a webhook
                  immediately triggers RepoRanger's workflow.
                </p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <code className="text-green-400 text-sm">
                    POST /api/v1/executions/webhook/dev/repo-ranger-listener
                  </code>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-slate-600" />
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 bg-purple-500/20 p-4 rounded-full border-4 border-purple-500/30">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-3">2. AI Analysis</h4>
                <p className="text-slate-300 mb-4">
                  Groq's Llama 3.3 70B model analyzes the issue content and provides:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong>Category:</strong> bug, feature, documentation, or question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong>Priority:</strong> high, medium, or low urgency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong>Affected Files:</strong> likely code locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong>Duplicate Detection:</strong> similar existing issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span><strong>Next Steps:</strong> suggested actions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-slate-600" />
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 bg-green-500/20 p-4 rounded-full border-4 border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-3">3. Automated Actions</h4>
                <p className="text-slate-300 mb-4">
                  RepoRanger takes immediate action:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h5 className="font-semibold mb-2 text-blue-400">💬 Posts Comment</h5>
                    <p className="text-sm text-slate-400">
                      Adds a detailed analysis comment with context and suggestions
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h5 className="font-semibold mb-2 text-purple-400">🏷️ Adds Labels</h5>
                    <p className="text-sm text-slate-400">
                      Automatically tags with category and priority labels
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-slate-600" />
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 bg-orange-500/20 p-4 rounded-full border-4 border-orange-500/30">
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
              <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-2xl font-semibold mb-3">4. Weekly Intelligence</h4>
                <p className="text-slate-300 mb-4">
                  Every Monday at 9 AM, RepoRanger generates a strategic report:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">→</span>
                    <span>Analyzes all issues from the past week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">→</span>
                    <span>Identifies trends and patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">→</span>
                    <span>Highlights critical issues needing attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">→</span>
                    <span>Provides strategic recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Powered By</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Kestra</h4>
              <p className="text-sm text-slate-400">Workflow orchestration & scheduling</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-semibold mb-2">Groq AI</h4>
              <p className="text-sm text-slate-400">Lightning-fast LLM inference</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">▲</div>
              <h4 className="font-semibold mb-2">Vercel</h4>
              <p className="text-sm text-slate-400">Dashboard deployment</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🐰</div>
              <h4 className="font-semibold mb-2">CodeRabbit</h4>
              <p className="text-sm text-slate-400">Automated code reviews</p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">The Impact</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-5xl font-bold text-blue-400 mb-2">90%</div>
              <div className="text-slate-300">Time Saved on Triage</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">33hrs</div>
              <div className="text-slate-300">Per Week (100 issues)</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-slate-300">Automated Analysis</div>
            </div>
          </div>
          <div className="mt-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
            >
              View Live Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
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