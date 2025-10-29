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

**Backend Infrastructure** - Building the core backend system first:
- PostgreSQL database schemas for agent management
- API endpoints for agent orchestration
- WebSocket server for real-time communication
- Storage layer for agent capabilities, tasks, and collaboration
- Load balancing and task queue system

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
- **shared/schema.ts** - Database schemas and TypeScript types
- **server/storage.ts** - Storage layer and database operations
- **server/routes.ts** - API endpoints and WebSocket setup

## Next Steps

1. ✅ Create mb.md as main protocol
2. ✅ Update replit.md to reference mb.md
3. 🔄 Define database schemas for agent system
4. 🔄 Implement storage layer and API endpoints
5. 🔄 Set up WebSocket server for real-time updates
6. 🔄 Seed database with 105+ agents
7. ⏳ Build frontend dashboard (future phase)

## Remember

> **The mb.md file is our single source of truth.**  
> All implementation decisions must align with the specifications in mb.md.

Last Updated: October 29, 2025
