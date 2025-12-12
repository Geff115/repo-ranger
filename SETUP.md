# Complete Setup Guide

This guide walks you through setting up RepoRanger from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Kestra Setup](#kestra-setup)
3. [GitHub Configuration](#github-configuration)
4. [Groq API Setup](#groq-api-setup)
5. [Dashboard Deployment](#dashboard-deployment)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools
- Docker Desktop (v20.10+)
- Docker Compose (v2.0+)
- Git
- Node.js 18+ (for dashboard)
- Ngrok (for local webhook testing)

### API Keys Needed
1. **GitHub Personal Access Token**
   - Scope: `repo` (full control)
   - Generate at: https://github.com/settings/tokens

2. **Groq API Key**
   - Free tier available
   - Sign up at: https://console.groq.com

## Kestra Setup

1. **Ensure Docker Is Running To Access Kestra**
   - Ensure all your environment variables are set in .env (KESTRA_BASIC_AUTH_USER, KESTRA_BASIC_AUTH_PASSWORD, etc..)
   - Run docker in your terminal: `docker compose up -d`
   - Docker automatically picks up everything from docker-compose.yml file, including your environment variable. see [.env.example](.env.example) for the variables needed.

2. **Create Your Flows**
   - In your Kestra dashboard, create a new flow.
   - ensure Ngrok is listening on port 8080.
   - Your flow is now listening to issue events via GitHub webhook in your repository.

## Troubleshooting

### Common Issues

**Issue**: Webhook not triggering
- Check Ngrok is running
- Verify webhook URL in GitHub
- Check Kestra logs in your terminal: `docker-compose logs kestra`