# 🤖 RepoRanger - AI-Powered Repository Maintenance Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Kestra](https://img.shields.io/badge/Orchestration-Kestra-blue)](https://kestra.io)
[![AI: Groq](https://img.shields.io/badge/AI-Groq-orange)](https://groq.com)

> An intelligent AI agent that automatically triages GitHub issues, provides contextual analysis, and generates strategic insights for repository maintainers.

## 🎯 Problem Statement

Open-source maintainers are overwhelmed with:
- Hundreds of issues requiring manual triage
- Lack of context for bug reports
- No systematic way to identify patterns
- Time-consuming repetitive analysis

**RepoRanger solves this** by automating issue analysis and providing intelligent insights.

---

## ✨ Features

### 🔍 Real-Time Issue Triage
When a new issue is created, RepoRanger automatically:
- **Classifies** the issue type (bug/feature/documentation/question)
- **Assigns priority** (high/medium/low) based on content analysis
- **Adds labels** to GitHub for easy filtering
- **Posts AI analysis** as a comment with:
  - Issue summary
  - Potentially affected files
  - Recommended next steps

### 📊 Weekly Intelligence Reports
Every Monday, RepoRanger generates a comprehensive report:
- **Trend Analysis**: Most common issue types
- **Critical Issues**: What needs immediate attention
- **Strategic Decisions**: Prioritization recommendations
- **Actionable Insights**: Specific improvements to make

The report is automatically posted as a GitHub issue with `report` and `ai-generated` labels.

---

## 🏗️ Architecture

RepoRanger uses a **multi-workflow orchestration** pattern:
```plaintext
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
└───────────────┬─────────────────────────┬───────────────┘
                │                         │
        Webhook │ (Issue Event)   Cron   │ (Weekly)
                ▼                         ▼
┌───────────────────────────┐ ┌─────────────────────────┐
│  Flow 1: Issue Listener   │ │ Flow 2: Weekly Reporter │
│  ─────────────────────    │ │ ─────────────────────   │
│  1. Receive webhook       │ │ 1. Fetch issues (7 days)│
│  2. Classify with AI      │ │ 2. Analyze patterns     │
│  3. Post comment          │ │ 3. Make decisions       │
│  4. Add labels            │ │ 4. Generate report      │
└───────────────────────────┘ └─────────────────────────┘
                │                         │
                └──────────┬──────────────┘
                           ▼
                  ┌─────────────────┐
                  │  GitHub Issues  │
                  │  + Comments     │
                  │  + Labels       │
                  └─────────────────┘
```

### Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Orchestration** | [Kestra](https://kestra.io) | Workflow automation, scheduling, task coordination |
| **AI/LLM** | [Groq](https://groq.com) | Fast inference with Llama 3.3 70B model |
| **Integration** | GitHub API | Repository data access and updates |
| **Execution** | Python 3.11 | Task scripting and API interactions |
| **Triggers** | Webhooks + Cron | Real-time events + scheduled jobs |

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- GitHub Personal Access Token with `repo` scope
- Groq API Key (free tier available)
- Ngrok for webhook tunneling (development)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Geff115/repo-ranger.git
   cd repo-ranger
```

2. **Set up environment variables**
```bash
   # Create .env file
   cat > .env << EOL
   GROQ_API_KEY=your_groq_api_key_here
   GITHUB_PAT=your_github_token_here
   EOL
```

3. **Start Kestra**
```bash
   docker-compose up -d
```

4. **Access Kestra UI**
   - Open [http://localhost:8080](http://localhost:8080)
   - Login with credentials from docker-compose.yml

5. **Import flows**
   - Navigate to Flows in Kestra UI
   - Import `flows/repo-ranger-listener.yml`
   - Import `flows/weekly-issue-report.yml`

6. **Set up GitHub webhook**
   - Go to your repo Settings → Webhooks
   - Add webhook with your Ngrok URL + `/api/v1/executions/webhook/dev/repo-ranger-listener/hackathon-secret-key`
   - Content type: `application/json`
   - Events: Issues only

---

## 📋 Flows Documentation

### Flow 1: `repo-ranger-listener`

**Trigger:** GitHub webhook on issue events  
**Actions:**
1. Validates action type (only processes `opened` or `edited`)
2. Calls Groq AI to classify the issue
3. Parses classification results
4. Posts analysis comment to GitHub
5. Adds appropriate labels

**Variables:**
- `trigger.body.action` - GitHub event action
- `trigger.body.issue.*` - Issue metadata
- `outputs.classify_issue.body` - AI response

### Flow 2: `weekly-issue-report`

**Trigger:** Scheduled (Mondays at 9 AM UTC)  
**Actions:**
1. Fetches all issues from the past 7 days
2. Analyzes patterns and trends with AI
3. Generates strategic recommendations
4. Creates a new GitHub issue with the report

**Schedule:** `0 9 * * MON` (Every Monday at 9 AM)

---

## 🎨 Example Output

### Issue Comment Example
```markdown
🤖 **RepoRanger Analysis Complete!**

**Category:** bug
**Priority:** high
**Summary:** Authentication fails when using OAuth tokens

**Potentially Affected Files:**
- `src/auth.py`
- `config/oauth.json`
- `middleware/auth_handler.py`

---
*Powered by RepoRanger AI Agent*
```

### Weekly Report Example
```markdown
# 📊 Weekly RepoRanger Intelligence Report

## Summary of Trends
This week saw 23 issues, with 65% being bugs related to authentication...

## Critical Issues
- Issue #45: Security vulnerability in login endpoint (HIGH)
- Issue #52: Database connection pool exhausted (HIGH)

## Strategic Decisions
1. Prioritize auth-related bugs this week
2. Consider adding integration tests for auth flows
3. Update documentation for OAuth setup

## Recommendations
- Add rate limiting to prevent connection pool issues
- Create troubleshooting guide for common auth errors
...
```

---

## 🧪 Testing

### Manual Testing
1. Create a test issue in your repository
2. Check Kestra Executions tab for success
3. Verify comment and labels appear on GitHub

### Weekly Report Testing
```bash
# Trigger manually without waiting for Monday
# In Kestra UI: Flows → weekly-issue-report → Execute
```

---

## 🎯 Hackathon Alignment

Built for **AI Agents Assemble Hackathon**

### Sponsor Technologies Used
- ✅ **Kestra** - Core orchestration engine
- ✅ **Groq** - AI inference (Llama 3.3 70B)
- ⏳ **Vercel** - Dashboard (coming soon)
- ✅ **CodeRabbit** - Code review automation
- ❌ **Cline** - Not applicable for this use case
- ❌ **Oumi** - Skipped (time constraints)

### Prize Categories Targeted
- **Wakanda Data Award ($4k)** - AI-powered data summarization with decision-making
- **Stormbreaker Deployment Award ($2k)** - Vercel dashboard (in progress)
- **Captain Code Award ($1k)** - Clean OSS engineering with CodeRabbit

---

## 🔮 Roadmap

- [x] Real-time issue classification
- [x] Auto-labeling and commenting
- [x] Weekly intelligence reports
- [ ] Vercel analytics dashboard
- [ ] Duplicate issue detection
- [ ] Fix strategy recommendations
- [ ] Email notifications
- [ ] Multi-repository support

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

CodeRabbit will automatically review your PR.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Kestra](https://kestra.io) workflow orchestration
- AI powered by [Groq](https://groq.com) and Llama 3.3
- Code quality ensured by [CodeRabbit](https://coderabbit.ai)

---

## 📞 Contact

**Project Link:** [https://github.com/Geff115/repo-ranger](https://github.com/Geff115/repo-ranger)

**Demo Video:** [Coming soon]

---

Made with ❤️ for the AI Agents Assemble Hackathon