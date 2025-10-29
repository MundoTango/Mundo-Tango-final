# Mundo Tango - Multi-Agent AI Orchestration Platform

## Overview

Mundo Tango (Mr Blue) is a sophisticated multi-agent AI orchestration platform designed to manage complex software development and business operations. It features 112 specialized AI agents organized in a hierarchical structure, following the ESA (Emergent Software Architecture) LIFE CEO Framework. The platform aims to streamline development, optimize costs (targeting 87% reduction through multi-model AI routing), and provide real-time monitoring of agent activities and task progression.

## User Preferences

- **Mr Blue** = The AI orchestration system we are building (defined in `mb.md`)
- **mb.md** = The master blueprint/protocol for Mr Blue
- When the user references "Mr Blue" or "mb.md", they mean the AI system being created
- All implementation must follow Mr Blue's protocols documented in `mb.md`
- **Always reference mb.md** as the single source of truth
- **Multi-agent orchestration** - 112 agents working simultaneously across all phases
- **Parallel development tracks** - Backend, Frontend, Testing, Deployment in parallel
- **Logical phasing** - Backend → Orchestration → Frontend → Testing → Deployment
- **Cost optimization** - Multi-model AI routing
- **Quality gates** - 800+ checkpoints (40 domains × 20 phases)
- **Self-healing** - Agents fix their own errors (max 3 attempts before human escalation)
- **Evidence-based** - All work includes screenshots, test results, performance metrics

## System Architecture

Mundo Tango's architecture is guided by the `mb.md` blueprint, detailing a hierarchical multi-agent ecosystem.

**UI/UX Decisions:**
The frontend adopts a "mission-control" aesthetic with a dark theme, utilizing Shadcn UI components and Tailwind CSS for a technical and responsive design. Key dashboards provide real-time visualization of agents, tasks, and analytics.

**Technical Implementations & Feature Specifications:**

*   **Multi-Agent Orchestration:**
    *   112 specialized agents across 61 layers, organized hierarchically (CEO, Chiefs, Coordinators, Layer Agents).
    *   Task decomposition using GPT-4o, intelligent agent assignment based on capacity and specialties, parallel execution, and dependency management.
    *   Agent Intelligence Levels: From Rule-Based to Self-Aware (Level 6 for Agent #0).
*   **Cost Optimization:**
    *   Multi-model AI routing (Claude 3.5 Sonnet, GPT-4o, Gemini 2.5 Pro/Flash) for an 87% cost reduction target.
    *   Strict availability filtering, budget-aware model selection, and real-time cost tracking.
*   **Real-time Communication:**
    *   WebSocket server for real-time updates on agent status, task notifications, and collaboration messages.
    *   Priority-based messaging for inter-agent communication.
*   **Database Design:**
    *   PostgreSQL serves as the persistent storage, with 11 core tables managing agent capabilities, tasks, collaboration, performance metrics, learning data, predictions, errors, and AI usage tracking.
*   **API Endpoints:**
    *   A comprehensive set of 32+ REST API endpoints for agent management, task management, collaboration, learning/metrics, ML/predictions, error tracking, AI usage, and orchestration (decompose, assign, execute).
*   **Frontend Dashboards:**
    *   **Agent Dashboard:** Displays 112 agents with real-time status, stats (active agents, success rate, completed tasks), and detailed agent cards.
    *   **Task Monitor:** Provides a live feed of tasks with status, priority, assigned agent, and timestamps.
    *   **Analytics Dashboard:** Shows cost optimization metrics (savings, actual vs. baseline cost), model usage distribution, and request volumes.
*   **Testing & Quality Assurance:**
    *   Comprehensive E2E tests using Playwright for UI validation, navigation, and real-time update verification.

**System Design Choices:**

*   **Node.js + Express backend** with TypeScript for type safety.
*   **React + TypeScript + Wouter frontend** for a dynamic user interface.
*   **Tailwind CSS + Shadcn UI** for consistent styling.
*   **PostgreSQL (Neon)** for robust data storage.
*   **WebSocket** for full-duplex, real-time communication.
*   **Multi-model AI routing** ensures efficiency and cost-effectiveness.

## External Dependencies

*   **Database:** PostgreSQL (specifically Neon for persistent storage)
*   **AI Models:**
    *   Claude 3.5 Sonnet (for complex reasoning)
    *   GPT-4o (for multimodal tasks and task decomposition)
    *   Gemini 2.5 Pro/Flash (for code generation and cost optimization)
*   **Frontend Libraries/Frameworks:**
    *   React
    *   Wouter (for routing)
    *   Tailwind CSS
    *   Shadcn UI
    *   TanStack Query
*   **Testing Framework:** Playwright (for End-to-End testing)
*   **Environment Variables (Required Secrets):**
    *   `DATABASE_URL`
    *   `SESSION_SECRET`
    *   `AI_INTEGRATIONS_OPENAI_BASE_URL`
    *   `AI_INTEGRATIONS_OPENAI_API_KEY`

## Current Build Status

**✅ Phase 1: Backend Infrastructure (COMPLETED)**
- ✅ PostgreSQL database schemas (11 tables)
- ✅ API endpoints (32+)
- ✅ WebSocket server
- ✅ Database seeded with 112 agents

**✅ Phase 2: Multi-Agent Orchestration System (COMPLETED)**
- ✅ Task Orchestration Engine
- ✅ Multi-Model AI Router (strict availability filtering)
- ✅ Agent Communication Protocol
- ✅ Orchestration API endpoints

**✅ Phase 3: Frontend Dashboard (COMPLETED)**
- ✅ Agent Dashboard (112 agents, real-time updates)
- ✅ Task Monitor (live feed, WebSocket)
- ✅ Analytics Dashboard (cost metrics)
- ✅ Sidebar navigation

**✅ Phase 4: Testing & Quality Assurance (COMPLETED)**
- ✅ Comprehensive E2E tests (Playwright)
- ✅ All assertions passed

## Important Files

**Documentation:** mb.md, MR_BLUE_MASTER_PLAN.md, design_guidelines.md

**Backend:** server/orchestration/task-orchestrator.ts, server/ai/model-router.ts, server/orchestration/agent-messenger.ts

**Frontend:** client/src/pages/AgentDashboard.tsx, TaskMonitor.tsx, Analytics.tsx, client/src/hooks/use-websocket.ts

---

**Last Updated:** October 29, 2025
**Status:** ✅ Phases 1-4 Complete
**Next:** Phase 5 (Deployment)
