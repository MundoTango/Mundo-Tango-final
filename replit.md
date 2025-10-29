# Mundo Tango - Multi-Agent AI Orchestration Platform

**Status:** In Development  
**Main Protocol:** `mb.md` (Mr Blue)  
**Architecture:** ESA (Emergent Software Architecture) LIFE CEO Framework

## Overview

Mundo Tango is a sophisticated multi-agent AI orchestration platform featuring 105+ specialized AI agents organized in a hierarchical structure to manage complex software development and business operations.

## Primary Reference Document

**📘 mb.md** - This is our master blueprint and main protocol for building the entire platform. All architectural decisions, agent specifications, database schemas, and implementation details are documented in `mb.md`.

**Always refer to mb.md for:**
- Agent ecosystem architecture (105+ agents)
- Agent organizational structure (CEO → Chiefs → Coordinators → Layers)
- Database schemas and API specifications
- Multi-agent orchestration system
- Agent communication protocols
- Multi-model AI routing (Claude, GPT-4o, Gemini)
- Cost optimization strategies (87% reduction)
- Agent learning & memory systems
- Autonomous coding system (Agent #131)
- All specialized agent implementations

## Current Build Phase

**✅ Backend Infrastructure COMPLETED**
- ✅ PostgreSQL database schemas for agent management (11 tables)
- ✅ API endpoints for agent orchestration (25+ endpoints)
- ✅ WebSocket server for real-time communication
- ✅ Storage layer for agent capabilities, tasks, and collaboration
- ✅ Database seeded with 112 agents
- ⏳ Frontend dashboard (future phase)

## Technology Stack

### Backend
- Node.js + Express
- PostgreSQL (Neon) for persistent storage
- WebSocket for real-time updates
- TypeScript for type safety

### AI Models
- Claude 3.5 Sonnet (complex reasoning)
- GPT-4o (multimodal tasks)
- Gemini 2.5 Pro/Flash (code generation, cost optimization)

### Future Frontend
- React + TypeScript
- Tailwind CSS + Shadcn UI
- Real-time dashboard with agent visualization
- Performance metrics and monitoring

## Key Features

### Multi-Agent Orchestration
- 105+ specialized agents across 61 layers
- Hierarchical organization (Agent #0 CEO → Chiefs → Coordinators → Layer Agents)
- Task decomposition and intelligent agent assignment
- Load balancing based on agent capacity and success rates
- Dependency management and parallel task execution

### Agent Intelligence Levels
1. **Level 1:** Rule-Based Agents
2. **Level 2:** Reactive Agents
3. **Level 3:** Deliberative Agents
4. **Level 4:** Learning Agents
5. **Level 5:** Collaborative Agents
6. **Level 6:** Self-Aware Agents (Agent #0)

### Core Database Tables
- `agent_capabilities` - Agent metadata, specialties, performance metrics
- `agent_tasks` - Task queue, assignments, and execution history
- `agent_collaboration` - Inter-agent communication messages
- `agent_performance_metrics` - Success rates, response times, completions
- `agent_learning_data` - Memory and pattern storage

### Communication Patterns
- **Top-Down:** CEO → Chiefs → Coordinators → Layer Agents
- **Bottom-Up:** Layer Agents → Coordinators → Chiefs → CEO
- **Lateral:** Peer-to-peer collaboration between same-level agents

## Development Workflow

1. **Reference mb.md** for all specifications
2. **Backend-first approach** - Complete backend infrastructure before frontend
3. **Database-driven** - PostgreSQL as source of truth for agent state
4. **Real-time updates** - WebSocket for live agent status and task monitoring
5. **Cost-optimized** - Multi-model routing for 87% cost reduction

## Environment Variables

See `.env` file for:
- `DATABASE_URL` - PostgreSQL connection string
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - OpenAI API endpoint
- `AI_INTEGRATIONS_OPENAI_API_KEY` - OpenAI API key
- (Additional secrets as configured)

## Important Files

- **mb.md** - Complete AI systems documentation (3,095 lines)
- **shared/schema.ts** - Database schemas and TypeScript types (11 tables)
- **server/storage.ts** - Storage layer with CRUD operations for all tables
- **server/routes.ts** - API endpoints (25+) and WebSocket setup
- **server/seed.ts** - Agent seeding script (112 agents)

## Implementation Status

### ✅ Phase 1: Backend Infrastructure (COMPLETED)
1. ✅ Create mb.md as main protocol (3,095 lines)
2. ✅ Define database schemas for agent system (11 tables)
3. ✅ Implement storage layer and API endpoints (25+ endpoints)
4. ✅ Set up WebSocket server for real-time updates
5. ✅ Seed database with 112 agents from mb.md
6. ✅ Comprehensive validation with Zod schemas
7. ✅ Complete testing of all API endpoints

### Backend API Endpoints
**Agent Management:**
- `GET /api/agents` - List all agents (with pagination)
- `GET /api/agents/:agentId` - Get agent by ID
- `POST /api/agents` - Create new agent
- `PATCH /api/agents/:agentId` - Update agent

**Task Management:**
- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `POST /api/tasks/:id/assign` - Assign task to agent

**Agent Collaboration:**
- `GET /api/messages/:agentId` - Get messages for agent
- `POST /api/messages` - Send collaboration message
- `PATCH /api/messages/:id/read` - Mark message as read

**Learning & Metrics:**
- `GET /api/learnings/:agentId` - Get agent learnings
- `POST /api/learnings` - Record learning
- `GET /api/metrics/:agentId` - Get performance metrics
- `POST /api/metrics` - Record performance metric

**ML & Predictions:**
- `POST /api/predictions` - Create prediction
- `PATCH /api/predictions/:id/verify` - Verify prediction
- `POST /api/behavior` - Track user behavior

**Error Tracking:**
- `POST /api/errors/actions` - Log failed action
- `POST /api/errors/patterns` - Record failure pattern

**AI Usage Tracking:**
- `POST /api/ai-usage` - Record AI API usage
- `GET /api/ai-usage/stats` - Get usage statistics

**System Health:**
- `GET /api/health` - System health check

### WebSocket Events
- Real-time agent status updates
- Task notifications
- Collaboration message broadcasts
- Room-based subscriptions for agent-specific updates

### Database Seeding
**112 Agents Organized By:**
- 1 Executive Agent (CEO Orchestrator)
- 6 Division Chiefs (Foundation, Core, Business, Intelligence, Platform, Extended)
- 9 Domain Coordinators
- 61 Layer Agents (organized across all divisions)
- 15 Expert Agents (UI/UX, AI Research, Data Viz, Mobile, etc.)
- 20 Specialized Agents (Tour Guide, Subscription Manager, Vibe Coding, etc.)

### ⏳ Phase 2: Frontend Dashboard (Future)
- Agent visualization dashboard
- Real-time task monitoring
- Performance metrics display
- Agent collaboration viewer
- Admin panel for agent management

## Remember

> **The mb.md file is our single source of truth.**  
> All implementation decisions must align with the specifications in mb.md.

Last Updated: October 29, 2025

## Running the Backend

The backend is fully operational and running on port 5000.

**Start the server:**
```bash
npm run dev
```

**Seed the database (if needed):**
```bash
tsx server/seed.ts
```

**Example API Calls:**
```bash
# Get all agents
curl http://localhost:5000/api/agents

# Get specific agent
curl http://localhost:5000/api/agents/agent-131-vibe-coding

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"buildId":"build-123","type":"frontend","description":"Build Dashboard","assignedAgent":"agent-131-vibe-coding","priority":9,"userId":"user-1","dependencies":[]}'

# Send collaboration message
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"fromAgentId":"agent-131-vibe-coding","toAgentId":"agent-79-qa","messageType":"task_handoff","payload":{"message":"Task complete"},"priority":8}'

# Health check
curl http://localhost:5000/api/health
```

---

**Last Updated:** October 29, 2025  
**Backend Status:** ✅ Fully Operational  
**Agents Seeded:** 112  
**API Endpoints:** 25+  
**WebSocket:** Active
