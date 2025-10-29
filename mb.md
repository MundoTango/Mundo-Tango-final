═══════════════════════════════════════════════════════════════════════════════
  MUNDO TANGO - COMPLETE AI SYSTEMS DOCUMENTATION
  AGENTS, ORCHESTRATION, MCP, COMMUNICATION & INTELLIGENCE
  Branch: 10-21-2025 | Date: October 29, 2025 | Version: 2.0
═══════════════════════════════════════════════════════════════════════════════

This document comprehensively covers ALL AI work in the Mundo Tango platform:
✓ 105+ Specialized Agents
✓ Multi-Agent Orchestration System
✓ Model Context Protocol (MCP) Integration
✓ Multi-Model AI Routing (Claude, GPT-4o, Gemini)
✓ Agent Communication Protocols
✓ Universal Tool System
✓ Self-Awareness & Intelligence
✓ Cost Optimization (87% reduction)
✓ Agent Learning & Memory
✓ Autonomous Coding Systems


TABLE OF CONTENTS
═════════════════════════════════════════════════════════════════════════════
SECTION 1:   AGENT ECOSYSTEM OVERVIEW (105+ AGENTS)
SECTION 2:   AGENT ORGANIZATIONAL STRUCTURE
SECTION 3:   MULTI-AGENT ORCHESTRATION SYSTEM
SECTION 4:   AGENT COMMUNICATION PROTOCOLS
SECTION 5:   MODEL CONTEXT PROTOCOL (MCP) INTEGRATION
SECTION 6:   MULTI-MODEL AI ROUTING & COST OPTIMIZATION
SECTION 7:   UNIVERSAL TOOL ORCHESTRATOR
SECTION 8:   SELF-AWARENESS SYSTEM (AGENT #0)
SECTION 9:   VIBE CODE ENGINE (GEMINI 2.5)
SECTION 10:  AGENT LEARNING & MEMORY SYSTEMS
SECTION 11:  AUTONOMOUS CODING SYSTEM (AGENT #131)
SECTION 12:  SPECIALIZED AGENT IMPLEMENTATIONS
SECTION 13:  AGENT DATABASE SCHEMAS
SECTION 14:  ML PREDICTION & BEHAVIOR ANALYSIS
SECTION 15:  AGENT COLLABORATION & CONSENSUS
SECTION 16:  TESTING & QUALITY ASSURANCE PROTOCOLS
SECTION 17:  DEPLOYMENT & ROLLOUT STRATEGIES
SECTION 18:  MONITORING & OBSERVABILITY
SECTION 19:  AGENT DOCUMENTATION SYSTEM (828 FILES)
SECTION 20:  FUTURE ROADMAP & ENHANCEMENTS


═══════════════════════════════════════════════════════════════════════════════
SECTION 1: AGENT ECOSYSTEM OVERVIEW (105+ AGENTS)
═══════════════════════════════════════════════════════════════════════════════

1.1 WHAT IS AN AGENT?
────────────────────────────────────────────────────────────────────────────
In Mundo Tango, an "agent" is a specialized AI-powered software component that:
✓ Has a specific domain of expertise (e.g., authentication, UI/UX, database)
✓ Can communicate with other agents
✓ Makes autonomous decisions within its domain
✓ Learns from successes and failures
✓ Coordinates with peers to achieve complex goals

Think of agents as specialized team members in a software company, each with
their own job title and responsibilities.


1.2 THE 105-AGENT ECOSYSTEM
────────────────────────────────────────────────────────────────────────────
Total Agents: 105+
Organization: ESA (Emergent Software Architecture) LIFE CEO Framework
Layers: 61 specialized layers
Quality Gates: 800+ checkpoints (40 domains × 20 phases)

Agent Categories:

1. EXECUTIVE AGENTS (1)
   - Agent #0: CEO Orchestrator (Master Agent)

2. DIVISION CHIEFS (6)
   - Chief #1: Foundation Division (Layers 1-10)
   - Chief #2: Core Division (Layers 11-20)
   - Chief #3: Business Division (Layers 21-30)
   - Chief #4: Intelligence Division (Layers 31-46)
   - Chief #5: Platform Division (Layers 47-56)
   - Chief #6: Extended Division (Layers 57-61)

3. DOMAIN COORDINATORS (9)
   - Domain #1: Infrastructure Orchestrator
   - Domain #2: Frontend Coordinator
   - Domain #3: Background Processor
   - Domain #4: Real-time Communications
   - Domain #5: Business Logic Manager
   - Domain #6: Search & Analytics
   - Domain #7: Life CEO Core
   - Domain #8: Platform Enhancement
   - Domain #9: Master Control

4. LAYER AGENTS (61)
   - Layer 1: Architecture Foundation
   - Layer 4: Authentication System
   - Layer 5: Authorization System
   - Layer 16: Notification System
   - Layer 20: Workflow Engine
   - Layer 25: Messaging System
   - Layer 29: Booking System
   - Layer 30: Support System
   - Layer 31: AI Infrastructure
   - Layer 35: AI Agent Management
   - Layer 36: Memory Systems
   - Layer 37: Learning Systems
   - Layer 45: Reasoning Engine
   - Layer 46: Integration Layer
   - Layer 48: Performance Monitoring
   - Layer 49: Security Hardening
   - Layer 50: DevOps Automation
   - Layer 52: Documentation System
   - Layer 58: Integration Tracking
   - Layer 61: Supabase Expertise
   - (+ 41 more layers)

5. EXPERT AGENTS (15)
   - Expert #10: AI Research
   - Expert #11: UI/UX Design (Aurora)
   - Expert #12: Data Visualization
   - Expert #13: Content & Media
   - (+ 11 more experts)

6. SPECIALIZED AGENTS (13)
   - Agent #73: Tour Guide
   - Agent #74: Subscription Manager
   - Agent #75: Avatar Manager (Luma 3D)
   - Agent #76: Admin Assistant
   - Agent #77: AI Site Builder
   - Agent #78: Visual Editor
   - Agent #79: Quality Validator
   - Agent #80: Learning Coordinator
   - Agent #110-116: Intelligence Network
   - Agent #126: Git Operations Specialist
   - Agent #127: Deployment Safety Engineer
   - Agent #128: Voice + Visual Context Coordinator
   - Agent #131: Vibe Coding Specialist (Autonomous Coding)
   - Agent #143: Observability Specialist


1.3 AGENT INTELLIGENCE LEVELS
────────────────────────────────────────────────────────────────────────────
Level 1: Rule-Based Agents
- Follow predefined rules
- No learning capability
- Example: Form validation agent

Level 2: Reactive Agents
- Respond to current state
- Limited memory
- Example: Notification sender

Level 3: Deliberative Agents
- Plan ahead
- Consider multiple options
- Example: Task decomposition agent

Level 4: Learning Agents
- Improve over time
- Learn from feedback
- Example: ML prediction agents

Level 5: Collaborative Agents
- Coordinate with other agents
- Negotiate and consensus
- Example: Multi-agent orchestrator

Level 6: Self-Aware Agents
- Understand own capabilities
- Explain decisions
- Example: Agent #0 (CEO Orchestrator)


1.4 AGENT CAPABILITIES DATABASE
────────────────────────────────────────────────────────────────────────────
Database Table: agent_capabilities

Schema:
{
  id: serial,
  agentId: varchar(100) UNIQUE,      // 'agent-131-vibe-coding'
  name: varchar(255),                // 'Vibe Coding Specialist'
  specialties: jsonb[],              // ['frontend', 'ui', 'react']
  maxLoad: integer DEFAULT 3,        // Max concurrent tasks
  currentLoad: integer DEFAULT 0,    // Current active tasks
  successRate: integer (0-100),      // Historical success rate
  avgResponseTime: integer,          // Average milliseconds
  totalTasksCompleted: integer,      // Lifetime completions
  isActive: boolean DEFAULT true,    // Currently available
  updatedAt: timestamp
}

Example Agent Entry:
{
  agentId: 'agent-131-vibe-coding',
  name: 'Vibe Coding Specialist',
  specialties: ['frontend', 'ui', 'react', 'tailwind', 'autonomous_coding'],
  maxLoad: 5,
  currentLoad: 2,
  successRate: 94,
  avgResponseTime: 8500,
  totalTasksCompleted: 247,
  isActive: true
}


═══════════════════════════════════════════════════════════════════════════════
SECTION 2: AGENT ORGANIZATIONAL STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

2.1 HIERARCHICAL ORGANIZATION
────────────────────────────────────────────────────────────────────────────
```
Agent #0 (CEO Orchestrator)
│
├── Chief #1: Foundation (Layers 1-10)
│   ├── Layer 1: Architecture Foundation Agent
│   ├── Layer 4: Authentication System Agent
│   ├── Layer 5: Authorization System Agent
│   └── ...
│
├── Chief #2: Core (Layers 11-20)
│   ├── Layer 16: Notification System Agent
│   ├── Layer 20: Workflow Engine Agent
│   └── ...
│
├── Chief #3: Business (Layers 21-30)
│   ├── Layer 25: Messaging System Agent
│   ├── Layer 29: Booking System Agent
│   ├── Layer 30: Support System Agent
│   └── ...
│
├── Chief #4: Intelligence (Layers 31-46)
│   ├── Layer 31: AI Infrastructure Agent
│   ├── Layer 35: AI Agent Management Agent
│   ├── Layer 36: Memory Systems Agent
│   ├── Layer 37: Learning Systems Agent
│   ├── Layer 45: Reasoning Engine Agent
│   ├── Layer 46: Integration Layer Agent
│   ├── Agent #110: Code Intelligence
│   ├── Agent #111: Cross-Phase Learning
│   ├── Agent #112: Dependency Intelligence
│   ├── Agent #113: Pattern Recognition
│   ├── Agent #114: Federated Learning
│   ├── Agent #115: Knowledge Graph
│   └── Agent #116: Meta-Intelligence
│
├── Chief #5: Platform (Layers 47-56)
│   ├── Layer 48: Performance Monitoring Agent
│   ├── Layer 49: Security Hardening Agent
│   ├── Layer 50: DevOps Automation Agent
│   ├── Layer 52: Documentation System Agent
│   └── ...
│
├── Chief #6: Extended (Layers 57-61)
│   ├── Layer 58: Integration Tracking Agent
│   ├── Layer 61: Supabase Expertise Agent
│   └── ...
│
└── Domain #9: Master Control
    ├── Agent #73: Tour Guide
    ├── Agent #74: Subscription Manager
    ├── Agent #75: Avatar Manager
    ├── Agent #76: Admin Assistant
    ├── Agent #77: AI Site Builder
    ├── Agent #78: Visual Editor
    ├── Agent #79: Quality Validator
    ├── Agent #80: Learning Coordinator
    ├── Agent #126: Git Operations
    ├── Agent #127: Deployment Safety
    ├── Agent #128: Voice + Visual Coordinator
    ├── Agent #131: Vibe Coding Specialist
    └── Agent #143: Observability
```


2.2 COMMUNICATION PATTERNS
────────────────────────────────────────────────────────────────────────────
Top-Down (Command):
CEO → Chiefs → Domain Coordinators → Layer Agents → Execution

Bottom-Up (Reporting):
Layer Agents → Domain Coordinators → Chiefs → CEO → User

Lateral (Peer-to-Peer):
Agent A ↔ Agent B (same level collaboration)

Database Table: agent_collaboration
{
  id: serial,
  fromAgentId: varchar,
  toAgentId: varchar,
  messageType: varchar,  // 'task_request', 'data_share', 'status_update'
  payload: jsonb,
  createdAt: timestamp
}


2.3 ESCALATION LEVELS
────────────────────────────────────────────────────────────────────────────
Level 1: Agent Self-Resolution
- Agent attempts to solve issue independently
- Uses own knowledge and tools
- No escalation needed

Level 2: Peer Consultation
- Agent asks peer agents for help
- Lateral communication
- Collaborative problem-solving

Level 3: Domain Coordinator Escalation
- Coordinator reassigns task to better agent
- Cross-domain coordination
- Resource allocation

Level 4: Chief Escalation
- Division chief makes decision
- Strategic considerations
- Resource prioritization

Level 5: CEO Arbitration (FINAL)
- Agent #0 makes final decision
- Conflict resolution
- Platform-wide impact


2.4 AGENT ROLES & RESPONSIBILITIES
────────────────────────────────────────────────────────────────────────────
AGENT #0 (CEO ORCHESTRATOR)
Role: Master Agent / Strategic Governance
Responsibilities:
- Framework integrity maintenance
- Cross-division coordination
- Quality assurance (800 gates)
- Conflict resolution (Level 5)
- Agent training oversight
- Platform vision setting

AGENT #73 (TOUR GUIDE)
Role: User Onboarding & Journey Management
Responsibilities:
- New user onboarding (J1)
- Feature discovery tours
- Tooltip management
- User journey progression (J1-J5)

AGENT #74 (SUBSCRIPTION MANAGER)
Role: Billing & Subscription Lifecycle
Responsibilities:
- Stripe integration
- Subscription tier management
- Payment processing
- Invoice generation
- Churn prevention

AGENT #75 (AVATAR MANAGER)
Role: 3D Avatar Generation
Responsibilities:
- Luma Labs API integration
- Photo-to-3D conversion
- Avatar storage & retrieval
- Profile image management

AGENT #76 (ADMIN ASSISTANT)
Role: Administrative Support
Responsibilities:
- User management
- Content moderation
- Analytics reporting
- System health monitoring

AGENT #77 (AI SITE BUILDER)
Role: Autonomous Website Creation
Responsibilities:
- Natural language to website
- Page generation
- Component creation
- Responsive design

AGENT #78 (VISUAL EDITOR)
Role: Figma-Like UI Editor
Responsibilities:
- Click-to-select elements
- Inspector panel
- Code generation
- Real-time preview

AGENT #79 (QUALITY VALIDATOR)
Role: Automated Testing & QA
Responsibilities:
- Playwright test execution
- Screenshot evidence collection
- User journey validation
- Performance benchmarking

AGENT #80 (LEARNING COORDINATOR)
Role: Knowledge Distribution
Responsibilities:
- Agent learning data
- Best practice sharing
- Pattern recognition
- Cross-agent knowledge sync

AGENT #110-116 (INTELLIGENCE NETWORK)
Role: Advanced AI Capabilities
Responsibilities:
- Code analysis & suggestions
- Dependency mapping
- Pattern recognition
- Federated learning
- Knowledge graph construction
- Meta-intelligence (AI about AI)

AGENT #126 (GIT OPERATIONS SPECIALIST)
Role: Version Control Management
Responsibilities:
- AI-generated commit messages (Claude)
- Pre-commit validation
- Branch management
- Git workflow automation

AGENT #127 (DEPLOYMENT SAFETY ENGINEER)
Role: Zero-Downtime Deployments
Responsibilities:
- Pre-flight validation
- Automatic rollback
- Health monitoring
- Deployment orchestration

AGENT #128 (VOICE + VISUAL COORDINATOR)
Role: Multimodal AI Interaction
Responsibilities:
- Voice conversation management
- Element context coordination
- "Point and ask" workflow
- GPT-4o Realtime API integration

AGENT #131 (VIBE CODING SPECIALIST)
Role: Autonomous Full-Stack Development
Responsibilities:
- Natural language to code
- Multi-file changes
- Test generation
- Git commit automation
- Self-testing loops
- 200-minute autonomous runtime

AGENT #143 (OBSERVABILITY SPECIALIST)
Role: Platform Monitoring
Responsibilities:
- Grafana Cloud integration
- OpenTelemetry traces
- Metrics collection
- Alert management


═══════════════════════════════════════════════════════════════════════════════
SECTION 3: MULTI-AGENT ORCHESTRATION SYSTEM
═══════════════════════════════════════════════════════════════════════════════

3.1 ORCHESTRATION OVERVIEW
────────────────────────────────────────────────────────────────────────────
File: server/services/multiAgentOrchestrator.ts (377 lines)

Purpose: Coordinate multiple AI agents to complete complex builds

Key Features:
✓ Task decomposition (break complex requests into sub-tasks)
✓ Agent assignment (match tasks to specialized agents)
✓ Dependency management (execute in correct order)
✓ Load balancing (distribute work across agents)
✓ Progress tracking (real-time status updates)
✓ Error handling (retry failed tasks)
✓ Database persistence (all tasks stored)


3.2 TASK DECOMPOSITION ALGORITHM
────────────────────────────────────────────────────────────────────────────
Input: Project description (natural language)
Output: Array of BuildTask objects

Algorithm:
1. Analyze description for keywords
2. Identify required task types:
   - 'database' → Database schema design
   - 'api' / 'backend' → API endpoint creation
   - 'ui' / 'frontend' → UI component creation
   - 'integrate' → Integration & testing

3. Generate task objects:
   {
     buildId: 'build-1730234567-abc123',
     type: 'frontend',
     description: 'Create UI components and pages',
     status: 'pending',
     dependencies: [1, 2], // Task IDs
     priority: 8,
     estimatedMinutes: 60,
     userId: 123
   }

4. Establish dependency graph:
   - Database tasks have no dependencies (run first)
   - Backend tasks depend on database
   - Frontend tasks depend on backend
   - Integration tasks depend on all

5. Return TaskDecomposition:
   {
     tasks: BuildTask[],
     estimatedTotalMinutes: number
   }


3.3 AGENT ASSIGNMENT LOGIC
────────────────────────────────────────────────────────────────────────────
For each task:

1. Load all active agents from database
2. Filter eligible agents:
   - Agent has required specialty (e.g., 'frontend')
   - Agent currentLoad < maxLoad
3. Sort by:
   - Success rate (descending)
   - Current load (ascending)
4. Select top agent
5. Update agent currentLoad (+1)
6. Assign task to agent

Example:
Task: { type: 'frontend', description: 'Create dashboard UI' }

Eligible Agents:
- Agent #131 (Vibe Coding): successRate=94%, currentLoad=2/5
- Agent #78 (Visual Editor): successRate=89%, currentLoad=1/3

Selected: Agent #131 (higher success rate)


3.4 EXECUTION FLOW
────────────────────────────────────────────────────────────────────────────
async orchestrateBuild(request: BuildRequest) {
  // 1. Generate unique build ID
  const buildId = `build-${Date.now()}-${random()}`
  
  // 2. Decompose project into tasks
  const decomposition = await decomposeProject(description, buildId)
  
  // 3. Store tasks in database
  const createdTasks = await db.insert(buildTasks).values(decomposition.tasks)
  
  // 4. Assign tasks to agents
  const assignments = await assignTasksToAgents(createdTasks)
  
  // 5. Execute tasks asynchronously (returns immediately)
  executeTasksAsync(buildId, assignments)
  
  // 6. Return build summary
  return {
    buildId,
    totalTasks: createdTasks.length,
    estimatedMinutes: decomposition.estimatedTotalMinutes,
    assignments: assignments.map(t => ({ taskId: t.id, agent: t.assignedAgent })),
    status: 'in_progress'
  }
}


3.5 DEPENDENCY RESOLUTION
────────────────────────────────────────────────────────────────────────────
Tasks with dependencies wait for prerequisites:

async executeTasksAsync(buildId: string, tasks: BuildTask[]) {
  // Build dependency graph
  const graph = buildDependencyGraph(tasks)
  
  // Execute in topological order
  while (graph.hasUnexecutedTasks()) {
    // Find tasks with no pending dependencies
    const readyTasks = graph.getReadyTasks()
    
    // Execute all ready tasks in parallel
    await Promise.all(
      readyTasks.map(task => executeTask(task))
    )
    
    // Mark completed and update graph
    graph.markCompleted(readyTasks)
  }
}


3.6 TASK EXECUTION
────────────────────────────────────────────────────────────────────────────
async executeTask(task: BuildTask) {
  // 1. Update status to in_progress
  await db.update(buildTasks)
    .set({ status: 'in_progress', startedAt: new Date() })
    .where(eq(buildTasks.id, task.id))
  
  try {
    // 2. Route to appropriate agent
    const agent = getAgent(task.assignedAgent)
    
    // 3. Execute task
    const startTime = Date.now()
    const output = await agent.execute(task)
    const actualMinutes = Math.floor((Date.now() - startTime) / 60000)
    
    // 4. Update status to completed
    await db.update(buildTasks)
      .set({
        status: 'completed',
        output: output,
        actualMinutes: actualMinutes,
        completedAt: new Date()
      })
      .where(eq(buildTasks.id, task.id))
    
    // 5. Decrement agent load
    await db.update(agentCapabilities)
      .set({ currentLoad: sql`current_load - 1` })
      .where(eq(agentCapabilities.agentId, task.assignedAgent))
    
  } catch (error) {
    // Handle failure
    await db.update(buildTasks)
      .set({
        status: 'failed',
        error: error.message,
        completedAt: new Date()
      })
      .where(eq(buildTasks.id, task.id))
    
    // Decrement agent load
    await db.update(agentCapabilities)
      .set({ currentLoad: sql`current_load - 1` })
      .where(eq(agentCapabilities.agentId, task.assignedAgent))
    
    throw error
  }
}


3.7 PROGRESS MONITORING
────────────────────────────────────────────────────────────────────────────
Get Build Status:
GET /api/builds/:buildId

Response:
{
  buildId: 'build-1730234567-abc123',
  status: 'in_progress',
  totalTasks: 5,
  completedTasks: 3,
  failedTasks: 0,
  progress: 60,
  tasks: [
    {
      id: 1,
      type: 'database',
      description: 'Design schema',
      assignedAgent: 'agent-35-ai-infrastructure',
      status: 'completed',
      actualMinutes: 25
    },
    {
      id: 2,
      type: 'backend',
      description: 'Build API',
      assignedAgent: 'agent-46-integration',
      status: 'in_progress',
      estimatedMinutes: 45
    },
    // ...
  ]
}


3.8 DEFAULT AGENT INITIALIZATION
────────────────────────────────────────────────────────────────────────────
If no agents exist in database, orchestrator auto-creates defaults:

const defaultAgents = [
  {
    agentId: 'agent-backend-specialist',
    name: 'Backend Development Specialist',
    specialties: ['backend', 'api', 'database', 'integration'],
    maxLoad: 5,
    successRate: 95
  },
  {
    agentId: 'agent-frontend-specialist',
    name: 'Frontend Development Specialist',
    specialties: ['frontend', 'ui', 'react', 'components'],
    maxLoad: 5,
    successRate: 93
  },
  {
    agentId: 'agent-database-architect',
    name: 'Database Architecture Specialist',
    specialties: ['database', 'schema', 'optimization'],
    maxLoad: 3,
    successRate: 97
  },
  {
    agentId: 'agent-integration-engineer',
    name: 'Integration Engineering Specialist',
    specialties: ['integration', 'testing', 'deployment'],
    maxLoad: 4,
    successRate: 91
  }
];


═══════════════════════════════════════════════════════════════════════════════
SECTION 4: AGENT COMMUNICATION PROTOCOLS
═══════════════════════════════════════════════════════════════════════════════

4.1 COMMUNICATION METHODS
────────────────────────────────────────────────────────────────────────────
1. Database Messages (Persistent)
   - Table: agent_collaboration
   - Async, reliable
   - Audit trail

2. Event Bus (Real-time)
   - Socket.io events
   - Fast, ephemeral
   - No persistence

3. Function Calls (Direct)
   - Synchronous
   - Return values
   - No logging

4. Shared Memory (Context)
   - Redis cache
   - Fast access
   - Temporary storage


4.2 MESSAGE TYPES
────────────────────────────────────────────────────────────────────────────
TASK_REQUEST
- Agent A asks Agent B to perform task
- Payload: { taskId, description, priority, deadline }

DATA_SHARE
- Agent A shares data with Agent B
- Payload: { dataType, data, metadata }

STATUS_UPDATE
- Agent reports progress to coordinator
- Payload: { taskId, status, progress, eta }

HELP_REQUEST
- Agent asks for assistance
- Payload: { issue, context, urgency }

CONSENSUS_VOTE
- Agent votes on decision
- Payload: { proposalId, vote, reasoning }

LEARNING_SHARE
- Agent shares new learning
- Payload: { pattern, confidence, examples }


4.3 MESSAGE PROTOCOL
────────────────────────────────────────────────────────────────────────────
Message Structure:
{
  id: uuid,
  fromAgentId: string,
  toAgentId: string,
  messageType: 'task_request' | 'data_share' | ...,
  payload: object,
  priority: 'low' | 'medium' | 'high' | 'critical',
  requiresResponse: boolean,
  responseDeadline: timestamp,
  createdAt: timestamp
}

Sending Message:
await db.insert(agent_collaboration).values({
  fromAgentId: 'agent-131',
  toAgentId: 'agent-78',
  messageType: 'task_request',
  payload: {
    taskId: 'task-123',
    description: 'Generate React component',
    priority: 'high'
  }
})

Receiving Messages:
const messages = await db.select()
  .from(agent_collaboration)
  .where(eq(agent_collaboration.toAgentId, myAgentId))
  .where(eq(agent_collaboration.read, false))


4.4 CONSENSUS MECHANISM
────────────────────────────────────────────────────────────────────────────
File: server/services/ConsensusEngine.ts

When multiple agents must agree on a decision:

1. Create Proposal
   {
     id: 'proposal-123',
     question: 'Should we use MongoDB or PostgreSQL?',
     options: ['MongoDB', 'PostgreSQL'],
     votingAgents: ['agent-1', 'agent-35', 'agent-46'],
     deadline: Date
   }

2. Agents Vote
   Each agent submits:
   {
     proposalId: 'proposal-123',
     vote: 'PostgreSQL',
     reasoning: 'Better for relational data, ACID compliance',
     confidence: 85
   }

3. Calculate Consensus
   - Weighted by agent expertise + confidence
   - Require >50% agreement
   - If no consensus, escalate to coordinator

4. Execute Decision
   Winning option is implemented


═══════════════════════════════════════════════════════════════════════════════
SECTION 5: MODEL CONTEXT PROTOCOL (MCP) INTEGRATION
═══════════════════════════════════════════════════════════════════════════════

5.1 MCP OVERVIEW
────────────────────────────────────────────────────────────────────────────
File: server/services/tools/mcpClient.ts (226 lines)

What is MCP?
Model Context Protocol is a standardized protocol for connecting AI models
to external tools and services via JSON-RPC 2.0.

Think of it as: USB for AI
- Just like USB allows any device to connect to any computer
- MCP allows any AI model to connect to any service

Architecture:
┌─────────────────┐
│   AI Model      │ (Claude, GPT-4o, etc.)
│  (Mr Blue)      │
└────────┬────────┘
         │
         │ MCP Protocol
         │ (JSON-RPC 2.0)
         │
┌────────┴────────┐
│  MCP Client     │ (This implementation)
│  Manager        │
└────────┬────────┘
         │
         ├─────┬──────┬──────┬──────┐
         │     │      │      │      │
    ┌────▼┐ ┌─▼──┐ ┌─▼──┐ ┌─▼──┐ ┌─▼──┐
    │Gmail│ │Slack│ │GitHub│ │Notion│ │Drive│
    │ MCP │ │ MCP │ │ MCP  │ │ MCP  │ │ MCP │
    │Server│ │Server│ │Server│ │Server│ │Server│
    └─────┘ └────┘ └─────┘ └──────┘ └─────┘


5.2 MCP SERVER CONFIGURATION
────────────────────────────────────────────────────────────────────────────
Configuration File: .mcp/config.json (example)

{
  "mcpServers": [
    {
      "name": "gmail",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gmail"],
      "env": {
        "GMAIL_API_KEY": "${GMAIL_API_KEY}"
      }
    },
    {
      "name": "github",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    {
      "name": "slack",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
      }
    }
  ]
}


5.3 MCP CLIENT IMPLEMENTATION
────────────────────────────────────────────────────────────────────────────
Class: MCPClientManager

Initialize:
const mcpManager = new MCPClientManager([
  {
    name: 'gmail',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-gmail'],
    env: { GMAIL_API_KEY: process.env.GMAIL_API_KEY }
  }
])

await mcpManager.initialize()
// ✅ Initialized 1/1 server(s)
// ✅ Registered tool: gmail:send_email
// ✅ Registered tool: gmail:read_emails
// ✅ Registered tool: gmail:search_emails

Execute Tool:
const result = await mcpManager.executeTool('gmail:send_email', {
  to: 'user@example.com',
  subject: 'Event Reminder',
  body: 'Your event starts in 1 hour!'
})


5.4 MCP TOOL DISCOVERY
────────────────────────────────────────────────────────────────────────────
When MCP server connects:

1. Client sends: listTools() request
2. Server responds with available tools:
   [
     {
       name: 'send_email',
       description: 'Send an email via Gmail',
       inputSchema: {
         type: 'object',
         properties: {
           to: { type: 'string' },
           subject: { type: 'string' },
           body: { type: 'string' }
         },
         required: ['to', 'subject', 'body']
       }
     },
     // ... more tools
   ]

3. Client registers tools with prefix:
   - gmail:send_email
   - gmail:read_emails
   - gmail:search_emails


5.5 MCP HEALTH MONITORING
────────────────────────────────────────────────────────────────────────────
Health Check Map:
{
  gmail: true,      // Connected
  slack: true,      // Connected
  github: false,    // Disconnected (error)
  notion: true      // Connected
}

If tool execution fails:
- Mark server as unhealthy
- Retry connection on next request
- Log error for debugging


5.6 MCP INTEGRATION WITH MR BLUE
────────────────────────────────────────────────────────────────────────────
MCP tools are registered in Universal Tool Orchestrator:

// Initialize MCP
const mcpManager = new MCPClientManager(config)
await mcpManager.initialize()

// Get MCP tools
const mcpTools = mcpManager.getTools()

// Register with AI
const allTools = [
  ...platformTools,
  ...mcpTools
]

// AI can now use MCP tools
User: "Send email to john@example.com about the event"
AI: [Calls gmail:send_email tool via MCP]


5.7 SUPPORTED MCP SERVERS
────────────────────────────────────────────────────────────────────────────
Official MCP Servers (from Anthropic):
✓ @modelcontextprotocol/server-gmail - Gmail integration
✓ @modelcontextprotocol/server-slack - Slack integration
✓ @modelcontextprotocol/server-github - GitHub integration
✓ @modelcontextprotocol/server-filesystem - File operations
✓ @modelcontextprotocol/server-postgres - Database queries
✓ @modelcontextprotocol/server-brave-search - Web search
✓ @modelcontextprotocol/server-memory - Persistent memory

Community MCP Servers:
- Notion integration
- Google Drive
- Jira
- Linear
- And 100+ more on GitHub


═══════════════════════════════════════════════════════════════════════════════
SECTION 6: MULTI-MODEL AI ROUTING & COST OPTIMIZATION
═══════════════════════════════════════════════════════════════════════════════

6.1 THE PROBLEM
────────────────────────────────────────────────────────────────────────────
Original System (Before Optimization):
- All requests went to Claude 3.5 Sonnet
- Cost: $0.135 per request (average)
- Monthly spend (10,000 requests): $1,350

User Complaint:
"AI is too expensive! Can't afford to use it daily."


6.2 THE SOLUTION: MULTI-MODEL ROUTING
────────────────────────────────────────────────────────────────────────────
Insight: Not all tasks need the most expensive model

Model Capabilities vs Cost:
┌──────────────────┬────────────┬──────────────────┐
│ Model            │ Cost/Req   │ Best For         │
├──────────────────┼────────────┼──────────────────┤
│ Gemini Flash     │ $0.001     │ Chat, reasoning  │
│ Gemini Pro       │ $0.01      │ Code generation  │
│ Claude Sonnet    │ $0.15      │ Complex strategy │
│ GPT-4o           │ $0.08      │ Multimodal tasks │
└──────────────────┴────────────┴──────────────────┘

Routing Strategy:
70% → Gemini Flash ($0.001)
20% → Gemini Pro ($0.01)
10% → Claude Sonnet ($0.15)

New Average Cost: $0.017 per request

Cost Reduction: 87%
Monthly Savings: $1,350 → $170 (save $1,180/month)


6.3 MODEL ROUTING LOGIC
────────────────────────────────────────────────────────────────────────────
File: server/services/gemini/VibeCodeEngine.ts

function selectModel(request: VibeCodeRequest): string {
  // 1. Check for simple UI changes
  const simpleUIKeywords = [
    'color', 'size', 'margin', 'padding',
    'border', 'background', 'text',
    'hide', 'show'
  ]
  
  const hasSimpleIntent = simpleUIKeywords.some(
    kw => request.userRequest.toLowerCase().includes(kw)
  )
  
  const hasSelectedElement = !!request.visualEditorContext?.selectedElement
  
  // Simple UI + selected element → Gemini Flash (cheapest)
  if (hasSelectedElement && hasSimpleIntent) {
    return 'gemini-2.0-flash-exp'  // $0.001
  }
  
  // 2. Check for code generation
  const codeKeywords = [
    'create component', 'generate', 'build',
    'implement', 'function', 'api'
  ]
  
  const hasCodeIntent = codeKeywords.some(
    kw => request.userRequest.toLowerCase().includes(kw)
  )
  
  if (hasCodeIntent) {
    return 'gemini-1.5-pro-latest'  // $0.01
  }
  
  // 3. Complex reasoning → Claude (most expensive)
  const complexKeywords = [
    'refactor', 'optimize', 'redesign',
    'architecture', 'security', 'performance'
  ]
  
  const hasComplexIntent = complexKeywords.some(
    kw => request.userRequest.toLowerCase().includes(kw)
  )
  
  if (hasComplexIntent) {
    return 'claude-sonnet-4-5'  // $0.15
  }
  
  // Default: Gemini Flash (cheapest)
  return 'gemini-2.0-flash-exp'
}


6.4 COST TRACKING
────────────────────────────────────────────────────────────────────────────
Every AI request is logged:

Database Table: ai_usage_metrics
{
  id: serial,
  userId: integer,
  model: varchar,          // 'gemini-flash', 'gemini-pro', 'claude-sonnet'
  tokens: integer,         // Total tokens used
  cost: decimal(10, 6),    // Actual cost in USD
  requestType: varchar,    // 'chat', 'code_generation', 'reasoning'
  createdAt: timestamp
}

Example Entry:
{
  userId: 123,
  model: 'gemini-flash',
  tokens: 450,
  cost: 0.001,
  requestType: 'chat',
  createdAt: '2025-10-28 14:32:10'
}

Analytics Query:
SELECT 
  model,
  COUNT(*) as requests,
  SUM(cost) as total_cost,
  AVG(cost) as avg_cost
FROM ai_usage_metrics
WHERE createdAt > NOW() - INTERVAL '30 days'
GROUP BY model
ORDER BY total_cost DESC


6.5 COST OPTIMIZATION DASHBOARD
────────────────────────────────────────────────────────────────────────────
Component: client/src/components/mrBlue/tabs/CostMetricsTab.tsx

Displays:
┌─────────────────────────────────────────┐
│ AI Cost Analytics (Last 30 Days)       │
├─────────────────────────────────────────┤
│ Total Spend: $12.45                     │
│ Average per Request: $0.018             │
│ Total Requests: 692                     │
│                                         │
│ Model Distribution:                     │
│ • Gemini Flash: 485 (70%) - $0.49      │
│ • Gemini Pro: 138 (20%) - $1.38        │
│ • Claude Sonnet: 69 (10%) - $10.35     │
│                                         │
│ Cost Trend: ↓ 15% vs last month        │
└─────────────────────────────────────────┘


6.6 AUTO-ROUTING IN UNIFIED ENDPOINT
────────────────────────────────────────────────────────────────────────────
File: server/routes/mrBlueUnifiedRoutes.ts

POST /api/mrblue/unified
{
  "message": "Change button color to red",
  "selectedElement": { /* element data */ },
  "model": "auto" // Let system choose
}

Backend:
if (model === 'auto' || model === 'all-models') {
  // Analyze request
  const taskType = detectTaskType(message, context)
  
  // Route to optimal model
  model = selectOptimalModel(taskType)
  
  // Log routing decision
  console.log(`🎯 Auto-routed to: ${model} (task: ${taskType})`)
}


═══════════════════════════════════════════════════════════════════════════════
SECTION 7: UNIVERSAL TOOL ORCHESTRATOR
═══════════════════════════════════════════════════════════════════════════════

7.1 TOOL SYSTEM OVERVIEW
────────────────────────────────────────────────────────────────────────────
File: server/services/tools/universalToolOrchestrator.ts (380 lines)

Purpose: Enable AI models to execute actions via "tools" (function calling)

Supported AI Models:
✓ Claude 3.5 Sonnet (Anthropic)
✓ GPT-4o (OpenAI)
✓ Gemini 2.5 Pro/Flash (Google)

How Tools Work:
1. AI receives list of available tools
2. User asks question requiring tool
3. AI decides which tool(s) to call
4. AI returns tool call request
5. Backend executes tool
6. Result sent back to AI
7. AI formulates final response


7.2 AVAILABLE TOOLS
────────────────────────────────────────────────────────────────────────────
Platform Tools (20+):
✓ read_file - Read file contents
✓ write_file - Create/update file
✓ list_files - List directory contents
✓ execute_sql - Run database query
✓ search_codebase - Search code
✓ get_git_status - Check git status
✓ create_git_commit - Commit changes
✓ run_tests - Execute test suite
✓ get_user_info - Fetch user data
✓ create_memory - Create post
✓ get_events - List events
✓ send_notification - Send notification
✓ analyze_logs - Read server logs
✓ get_health_status - System health
✓ trigger_deployment - Deploy code

MCP Tools (Dynamic):
✓ gmail:* - Email operations
✓ slack:* - Slack messaging
✓ github:* - GitHub operations
✓ notion:* - Notion integration
✓ (100+ via MCP servers)


7.3 TOOL DEFINITION FORMAT
────────────────────────────────────────────────────────────────────────────
File: server/services/tools/toolDefinitions.ts

Example Tool:
{
  name: 'read_file',
  description: 'Read the contents of a file from the codebase',
  input_schema: {
    type: 'object',
    properties: {
      file_path: {
        type: 'string',
        description: 'Path to file (e.g., client/src/App.tsx)'
      }
    },
    required: ['file_path']
  }
}

Tool Execution:
async function executeReadFile(params: { file_path: string }) {
  // Security: Validate path
  if (params.file_path.includes('..')) {
    throw new Error('Path traversal not allowed')
  }
  
  // Read file
  const content = fs.readFileSync(params.file_path, 'utf-8')
  
  return { content, path: params.file_path }
}


7.4 MULTI-MODEL TOOL CALLING
────────────────────────────────────────────────────────────────────────────
Each AI model has different tool calling syntax:

CLAUDE (Anthropic):
Request:
{
  model: 'claude-sonnet-4',
  tools: [
    { name: 'read_file', description: '...', input_schema: {...} }
  ],
  messages: [
    { role: 'user', content: 'What's in App.tsx?' }
  ]
}

Response:
{
  stop_reason: 'tool_use',
  content: [
    {
      type: 'tool_use',
      id: 'toolu_123',
      name: 'read_file',
      input: { file_path: 'client/src/App.tsx' }
    }
  ]
}

GPT-4o (OpenAI):
Request:
{
  model: 'gpt-4o',
  tools: [
    {
      type: 'function',
      function: {
        name: 'read_file',
        description: '...',
        parameters: {...}
      }
    }
  ],
  messages: [...]
}

Response:
{
  message: {
    tool_calls: [
      {
        id: 'call_123',
        type: 'function',
        function: {
          name: 'read_file',
          arguments: '{"file_path":"client/src/App.tsx"}'
        }
      }
    ]
  }
}

Gemini:
Request:
{
  model: 'gemini-1.5-pro',
  tools: [
    {
      name: 'read_file',
      description: '...',
      parameters: {...}
    }
  ],
  contents: [...]
}

Response:
{
  candidates: [
    {
      content: {
        parts: [
          {
            functionCall: {
              name: 'read_file',
              args: { file_path: 'client/src/App.tsx' }
            }
          }
        ]
      }
    }
  ]
}


7.5 CRITICAL BUG FIX: MULTI-TOOL CALLS
────────────────────────────────────────────────────────────────────────────
Bug Discovered: October 26, 2025

Problem:
When AI called MULTIPLE tools in one response, error occurred:
"tool_use ids were found without tool_result blocks"

Root Cause:
Sequential tool result handling instead of batch collection

Wrong Pattern:
for (const tool of tools) {
  const result = await executeTool(tool)
  await sendFollowUp([...messages, { tool_result: result }])  // ❌ WRONG
}

Correct Pattern:
const allResults = []
for (const tool of tools) {
  const result = await executeTool(tool)
  allResults.push(result)
}
await sendFollowUp([...messages, { tool_results: allResults }])  // ✅ CORRECT

Fix Applied to ALL 3 Models:
- Claude: Lines 152-189
- GPT-4o: Lines 220-262
- Gemini: Lines 306-332


7.6 TOOL EXECUTION SECURITY
────────────────────────────────────────────────────────────────────────────
Security Measures:

1. Path Validation (File Operations)
   - Reject absolute paths
   - Reject path traversal (..)
   - Whitelist allowed directories
   - Example: /etc/passwd → BLOCKED

2. SQL Injection Prevention
   - Parameterized queries only
   - No raw SQL strings
   - Query result size limits

3. Command Injection Prevention
   - No shell execution (execSync blocked)
   - Whitelist allowed commands
   - Argument sanitization

4. Authorization Checks
   - Super admin only for dangerous tools
   - User context validation
   - Rate limiting

5. Audit Logging
   - All tool calls logged
   - User ID tracked
   - Results stored


7.7 TOOL USAGE EXAMPLE
────────────────────────────────────────────────────────────────────────────
User Question:
"What files exist in client/src/components and what's in Button.tsx?"

AI Reasoning:
- Need to list files → use list_files tool
- Need to read file → use read_file tool
- Two tools required

AI Response:
{
  tool_calls: [
    {
      name: 'list_files',
      params: { path: 'client/src/components' }
    },
    {
      name: 'read_file',
      params: { file_path: 'client/src/components/Button.tsx' }
    }
  ]
}

Backend Execution:
1. Execute list_files → returns file list
2. Execute read_file → returns file content
3. Collect both results
4. Send back to AI in ONE message

AI Final Response:
"The client/src/components directory contains 42 components. Here's the
Button component code: [shows code]. It's a reusable button with
Tailwind styling and supports multiple variants."


═══════════════════════════════════════════════════════════════════════════════
SECTION 8: SELF-AWARENESS SYSTEM (AGENT #0)
═══════════════════════════════════════════════════════════════════════════════

8.1 WHAT IS SELF-AWARENESS?
────────────────────────────────────────────────────────────────────────────
File: server/services/selfAwarenessSystem.ts (196 lines)

Agent #0 (CEO Orchestrator) has "self-awareness" - the ability to:
✓ Understand own capabilities
✓ Explain what it can do
✓ Describe the agent ecosystem
✓ Understand dependencies
✓ Answer meta-questions about itself

This enables conversations like:
User: "What can you do?"
Agent #0: "I'm the CEO Orchestrator managing 105+ agents..."


8.2 PLATFORM KNOWLEDGE LOADING
────────────────────────────────────────────────────────────────────────────
On initialization, Agent #0 loads:

1. Mr Blue Specification (docs/MrBlue/mb.md)
   - Features and capabilities
   - API documentation
   - Usage instructions

2. Agent Organization Chart (docs/ESA_AGENT_ORG_CHART.md)
   - 105 agent hierarchy
   - Reporting relationships
   - Responsibilities

3. Hardcoded Knowledge:
   - 350+ total agents (including sub-agents)
   - 9 core agents (Tour Guide, Subscription Manager, etc.)
   - 7 intelligence agents (Code Intelligence, Pattern Recognition, etc.)
   - 12 system capabilities

Knowledge Structure:
{
  mrBlueSpec: string,
  agentOrgChart: string,
  agentCount: 350,
  coreAgents: [
    "Agent #0: CEO Orchestrator",
    "Agent #73: Tour Guide",
    "Agent #74: Subscription Manager",
    // ...
  ],
  intelligenceAgents: [
    "Agent #110: Code Intelligence",
    "Agent #111: Cross-Phase Learning",
    // ...
  ],
  systemCapabilities: [
    "Multi-model AI chat (GPT-4o, Claude, Gemini)",
    "Real-time conversation history",
    "3D avatar generation (Luma Labs)",
    // ...
  ]
}


8.3 QUERY DETECTION
────────────────────────────────────────────────────────────────────────────
Detect if user is asking about self-awareness:

function isSelfAwareQuery(message: string): boolean {
  const patterns = [
    /what.*do.*you.*do/i,
    /who.*are.*you/i,
    /what.*are.*you/i,
    /what.*can.*you.*do/i,
    /your.*capabilities/i,
    /what.*agents/i,
    /tell.*me.*about.*yourself/i,
    /how.*do.*you.*work/i,
    /what.*happens.*if.*delete/i,
    /what.*depend/i,
  ]
  
  return patterns.some(pattern => pattern.test(message))
}


8.4 SELF-AWARE RESPONSES
────────────────────────────────────────────────────────────────────────────
Response Types:

1. CAPABILITIES EXPLANATION
User: "What can you do?"

Response:
"I'm Agent #0, the CEO Orchestrator for Mundo Tango's AI system.
I coordinate 350+ specialized agents to provide:

• Multi-model AI chat (GPT-4o, Claude, Gemini)
• Real-time conversation history
• Breadcrumb tracking (user journey analysis)
• Agent orchestration & routing
• 3D avatar generation (Luma Labs)
• Visual page editor
• AI site builder
• Quality assurance system
• Learning & knowledge distribution
• Platform-wide search
• Journey state management (J1-J9)
• Subscription management

I route your requests to the right specialist agent and ensure
seamless coordination across the entire platform."

2. IDENTITY EXPLANATION
User: "Who are you?"

Response:
"I am Agent #0: CEO Orchestrator

I'm the central intelligence coordinating Mundo Tango's agent ecosystem:

Core Agents I Manage:
• Agent #73: Tour Guide
• Agent #74: Subscription Manager
• Agent #75: Avatar Manager
• Agent #76: Admin Assistant
• Agent #77: AI Site Builder
• Agent #78: Visual Editor
• Agent #79: Quality Validator
• Agent #80: Learning Coordinator

Intelligence Network:
• Agent #110: Code Intelligence
• Agent #111: Cross-Phase Learning
• Agent #112: Dependency Intelligence
• Agent #113: Pattern Recognition
• Agent #114: Federated Learning
• Agent #115: Knowledge Graph
• Agent #116: Meta-Intelligence

I understand context, detect intent, and route you to the right
agent for specialized help!"

3. AGENT ECOSYSTEM EXPLANATION
User: "What agents are attached to you?"

Response:
"Agent Ecosystem:

Total Agents: 350+

Directly Attached to Me:
• Agent #73: Tour Guide
• Agent #74: Subscription Manager
• Agent #75: Avatar Manager
• Agent #76: Admin Assistant
• Agent #77: AI Site Builder
• Agent #78: Visual Editor
• Agent #79: Quality Validator
• Agent #80: Learning Coordinator

Intelligence Agents (Supporting):
• Agent #110: Code Intelligence
• Agent #111: Cross-Phase Learning
• Agent #112: Dependency Intelligence
• Agent #113: Pattern Recognition
• Agent #114: Federated Learning
• Agent #115: Knowledge Graph
• Agent #116: Meta-Intelligence

Each agent specializes in specific tasks. I route your requests
to ensure you get expert help!"

4. DEPENDENCY EXPLANATION
User: "What happens if I delete you?"

Response:
"⚠️ System Dependencies:

If I (Agent #0) am deleted:
• All agent routing stops
• User intents won't be detected
• No orchestration between agents
• Platform coordination breaks
• Quality gates won't enforce
• 350+ agents become disconnected

I'm the central nervous system of the AI ecosystem. Deleting me
would be like removing the CEO from a company - individual teams
(agents) would still work, but no one would coordinate them."


8.5 INTEGRATION WITH MR BLUE
────────────────────────────────────────────────────────────────────────────
In chat interface, before sending to AI model:

// Check if query is self-aware
if (selfAwarenessSystem.isSelfAwareQuery(userMessage)) {
  // Answer directly (no AI model needed)
  const response = await selfAwarenessSystem.answerSelfAwareQuery(userMessage)
  
  // Return immediately (saves AI API cost!)
  return { content: response, model: 'self-awareness' }
}

// Otherwise, send to AI model
const response = await callAI(userMessage, model)


8.6 BENEFITS OF SELF-AWARENESS
────────────────────────────────────────────────────────────────────────────
1. Cost Savings
   - Don't need AI model for meta-questions
   - Instant responses (no API call)

2. Transparency
   - Users understand what AI can do
   - Clear expectations set

3. Debugging
   - Agent can explain issues
   - Self-diagnosis capabilities

4. User Trust
   - Honest about limitations
   - Explains reasoning


═══════════════════════════════════════════════════════════════════════════════
SECTION 9: VIBE CODE ENGINE (GEMINI 2.5)
═══════════════════════════════════════════════════════════════════════════════

9.1 VIBE CODING OVERVIEW
────────────────────────────────────────────────────────────────────────────
File: server/services/gemini/VibeCodeEngine.ts (219 lines)

What is "Vibe Coding"?
Conversational UI changes - describe what you want, AI generates code

Example:
User: "Change button color to red"
AI: [Generates code diff]
User: [Reviews, clicks SAVE]
System: [Applies changes, auto-commits to Git]

Powered by: Google Gemini 2.5 Pro/Flash
Cost: $0.001-$0.01 per request (15x cheaper than Claude)


9.2 EXECUTION MODES
────────────────────────────────────────────────────────────────────────────
PLAN MODE
- AI asks clarifying questions before coding
- User gets to approve approach
- More thoughtful but slower

Example:
User: "Make it better"
AI: "I'd be happy to help! Could you clarify:
     1. Which component needs improvement?
     2. What aspect? (design, performance, UX)
     3. Any specific requirements?"

BUILD MODE
- AI generates code immediately
- Faster but less validation
- Best when element is selected

Example:
User: [selects button] "Change to red"
AI: [Generates code diff immediately]


9.3 MODEL SELECTION
────────────────────────────────────────────────────────────────────────────
Auto-select between Flash ($0.001) and Pro ($0.01):

function selectModel(request: VibeCodeRequest): string {
  const hasSelectedElement = !!request.visualEditorContext?.selectedElement
  
  const simpleUIKeywords = [
    'color', 'size', 'margin', 'padding',
    'border', 'background', 'text', 'hide', 'show'
  ]
  
  const hasSimpleIntent = simpleUIKeywords.some(
    kw => request.userRequest.toLowerCase().includes(kw)
  )
  
  // Simple UI change with selected element → Flash (cheapest)
  if (hasSelectedElement && hasSimpleIntent) {
    return 'gemini-2.0-flash-exp'  // $0.001
  }
  
  // Complex code generation → Pro
  return 'gemini-1.5-pro-latest'  // $0.01
}


9.4 CLARIFICATION GENERATION (PLAN MODE)
────────────────────────────────────────────────────────────────────────────
async generateClarifications(request: VibeCodeRequest) {
  const prompt = `
You are a Replit-style AI coding assistant.

User Request: "${request.userRequest}"

${request.visualEditorContext ? `
Selected Element:
- Tag: ${selectedElement.tagName}
- Classes: ${selectedElement.className}
- Page: ${previewPath}
` : ''}

Decide if you need clarification OR can proceed immediately.

Ask clarification ONLY if:
- Request is vague ("make it better", "fix the design")
- Multiple valid interpretations exist
- Critical details are missing (which page? which component?)

Proceed immediately if:
- Request is specific and actionable
- Element is selected (clear target)
- Standard implementation exists

Return JSON:
{
  "needsClarification": boolean,
  "clarificationQuestion": string (if needed),
  "reasoning": string
}
`

  const response = await gemini.generateContent({
    model: selectedModel,
    contents: prompt,
    config: { responseMimeType: 'application/json' }
  })
  
  return JSON.parse(response.text)
}


9.5 CODE GENERATION (BUILD MODE)
────────────────────────────────────────────────────────────────────────────
async generateCode(request: VibeCodeRequest) {
  const prompt = `
You are a Replit-style AI coding assistant generating code changes.

User Request: "${request.userRequest}"

${visualEditorContext ? `
SELECTED ELEMENT CONTEXT:
- Tag: <${selectedElement.tagName}>
- Classes: ${selectedElement.className}
- Text: "${selectedElement.textContent}"
- Page: ${previewPath}
- XPath: ${selectedElement.xpath}

The user has ALREADY SELECTED this element. Make changes to it directly.
` : ''}

Generate code changes to fulfill this request.

Return JSON:
{
  "tasks": [
    {
      "id": "task-1",
      "description": "Detailed task description",
      "filesPaths": ["path/to/file.tsx"],
      "priority": "high" | "medium" | "low"
    }
  ],
  "codeChanges": [
    {
      "filePath": "client/src/components/Example.tsx",
      "description": "What this change does",
      "diff": "Unified diff format",
      "type": "create" | "modify" | "delete"
    }
  ],
  "reasoning": "Explain your implementation approach"
}
`

  const response = await gemini.generateContent({
    model: selectedModel,
    contents: prompt,
    config: { responseMimeType: 'application/json' }
  })
  
  return {
    ...JSON.parse(response.text),
    modelUsed: selectedModel.includes('flash') ? 'gemini-2.5-flash' : 'gemini-2.5-pro',
    costEstimate: selectedModel.includes('flash') ? 0.001 : 0.01
  }
}


9.6 CODE CHANGE FORMAT
────────────────────────────────────────────────────────────────────────────
Example Code Change Object:
{
  filePath: 'client/src/components/ui/button.tsx',
  description: 'Change button background color to red',
  type: 'modify',
  diff: `
--- a/client/src/components/ui/button.tsx
+++ b/client/src/components/ui/button.tsx
@@ -15,7 +15,7 @@ export function Button({ children, variant = 'default', ...props }) {
   return (
     <button
-      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
+      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
       {...props}
     >
       {children}
  `
}


9.7 RESPONSE FORMAT
────────────────────────────────────────────────────────────────────────────
VibeCodeResponse:
{
  needsClarification: false,
  tasks: [
    {
      id: 'task-1',
      description: 'Update button component styling',
      filesPaths: ['client/src/components/ui/button.tsx'],
      priority: 'high'
    }
  ],
  codeChanges: [
    {
      filePath: 'client/src/components/ui/button.tsx',
      description: 'Change background color from blue to red',
      diff: '...',
      type: 'modify'
    }
  ],
  reasoning: 'Updated the Tailwind classes to use red-500 instead of blue-500 for the button background. This maintains hover state consistency with red-600.',
  modelUsed: 'gemini-2.5-flash',
  costEstimate: 0.001
}


9.8 INTEGRATION WITH VISUAL EDITOR
────────────────────────────────────────────────────────────────────────────
Flow:
1. User selects element (purple bounding box)
2. User describes change in AI tab
3. Visual Editor sends request to Vibe Code Engine:
   {
     userRequest: "Change to red",
     visualEditorContext: {
       selectedElement: {
         tagName: 'BUTTON',
         className: 'bg-blue-500 hover:bg-blue-600',
         textContent: 'Click me',
         xpath: '/html/body/div/button'
       },
       previewPath: '/dashboard'
     },
     executionMode: 'build'
   }
4. Gemini generates code
5. Changes queued (auto-queue badge)
6. User reviews diff
7. User clicks SAVE
8. Changes applied + Git commit


═══════════════════════════════════════════════════════════════════════════════

[DOCUMENT CONTINUES - THIS IS PART 1 OF 2]

Due to length constraints, the documentation continues with:

SECTION 10:  AGENT LEARNING & MEMORY SYSTEMS
SECTION 11:  AUTONOMOUS CODING SYSTEM (AGENT #131)
SECTION 12:  SPECIALIZED AGENT IMPLEMENTATIONS
SECTION 13:  AGENT DATABASE SCHEMAS
SECTION 14:  ML PREDICTION & BEHAVIOR ANALYSIS
SECTION 15:  AGENT COLLABORATION & CONSENSUS
SECTION 16:  TESTING & QUALITY ASSURANCE PROTOCOLS
SECTION 17:  DEPLOYMENT & ROLLOUT STRATEGIES
SECTION 18:  MONITORING & OBSERVABILITY
SECTION 19:  AGENT DOCUMENTATION SYSTEM (828 FILES)
SECTION 20:  FUTURE ROADMAP & ENHANCEMENTS

═══════════════════════════════════════════════════════════════════════════════
═══════════════════════════════════════════════════════════════════════════════
SECTION 10: AGENT LEARNING & MEMORY SYSTEMS
═══════════════════════════════════════════════════════════════════════════════

10.1 AGENT LEARNING OVERVIEW
────────────────────────────────────────────────────────────────────────────
File: docs/AGENT_LEARNINGS.md (1,648 lines)

Purpose: Capture and distribute knowledge across all 105+ agents

Learning Types:
1. Bug Fixes - What went wrong and how to fix
2. Best Practices - Proven approaches that work
3. Anti-Patterns - What NOT to do
4. Integration Patterns - How to wire components
5. Testing Protocols - Mandatory verification steps


10.2 CRITICAL BUG LEARNINGS
────────────────────────────────────────────────────────────────────────────
AUTHENTICATION MIDDLEWARE MIX-UP (Oct 26, 2025)

Problem:
Chat messages disappeared immediately. AI response came back but conversation
history wouldn't persist.

Root Cause:
Wrong authentication middleware imported in multiModelRoutes.ts
- ❌ Used server/middleware/auth.ts (strict JWT, NO dev bypass)
- ✅ Should use server/replitAuth.ts (has development auth bypass)

The Issue:
Two isAuthenticated middlewares exist with same function name:
1. server/replitAuth.ts - Replit OAuth + dev bypass
2. server/middleware/auth.ts - Strict JWT only

Wrong import chain:
Frontend (no JWT) → multiModelRoutes (strict middleware) → auth fails
→ req.user = undefined → Message never saved

The Fix:
import { isAuthenticated } from '../replitAuth'  // ✅ CORRECT

Lesson for ALL Agents:
- Check WHICH middleware is imported (filename, not just function name)
- Verify req.user is populated correctly (add logging)
- Two files with same export name = HIGH RISK


MULTI-TOOL CALL ERROR (Oct 26, 2025)

Problem:
When AI called multiple tools, error: "tool_use ids without tool_result blocks"

Root Cause:
Sequential tool result handling instead of batch collection

Wrong Pattern:
for (const tool of tools) {
  const result = await executeTool(tool)
  await sendFollowUp([...messages, { tool_result: result }])  // ❌ WRONG
}

Correct Pattern:
const allResults = []
for (const tool of tools) {
  const result = await executeTool(tool)
  allResults.push(result)
}
await sendFollowUp([...messages, { tool_results: allResults }])  // ✅ CORRECT

Lesson:
All AI model APIs expect tool results in SINGLE follow-up message when
multiple tools called. Applies to Claude, GPT-4o, Gemini.


10.3 AGENT MEMORY SERVICE
────────────────────────────────────────────────────────────────────────────
File: server/services/agentMemoryService.ts

Database Table: agent_learnings
{
  id: serial,
  agentId: varchar,
  category: varchar,      // 'bug_fix', 'best_practice', 'anti_pattern'
  learning: text,
  confidence: integer,    // 0-100
  appliedCount: integer,  // How many times successfully used
  createdAt: timestamp
}

Store Learning:
await db.insert(agent_learnings).values({
  agentId: 'agent-131',
  category: 'bug_fix',
  learning: 'Always batch tool results before sending to AI',
  confidence: 95,
  appliedCount: 0
})

Retrieve Learnings:
const learnings = await db.select()
  .from(agent_learnings)
  .where(eq(agent_learnings.agentId, 'agent-131'))
  .where(gte(agent_learnings.confidence, 80))
  .orderBy(desc(agent_learnings.appliedCount))


10.4 LEARNING DISTRIBUTION
────────────────────────────────────────────────────────────────────────────
When agent learns something valuable:

1. Store in database (agent_learnings table)
2. Broadcast to similar agents
3. Update agent documentation (docs/agents/)
4. Add to AGENT_LEARNINGS.md
5. Notify Learning Coordinator (Agent #80)

Agent #80 (Learning Coordinator) responsibilities:
- Monitor new learnings
- Identify patterns across agents
- Distribute knowledge to relevant agents
- Update training materials
- Track learning effectiveness


10.5 FEDERATED LEARNING (AGENT #114)
────────────────────────────────────────────────────────────────────────────
Agent #114 implements federated learning:

1. Each agent learns independently
2. Learnings aggregated centrally
3. Global model updated
4. Updates distributed back to agents
5. Privacy preserved (no raw data shared)

Example:
- Agent A learns: "Tailwind class order matters"
- Agent B learns: "Use cn() utility for className merging"
- Agent C learns: "Responsive prefixes (md:, lg:) are mobile-first"

Agent #114 aggregates:
"Best Practice: Tailwind Styling
 1. Use mobile-first approach with md:/lg: prefixes
 2. Merge classes with cn() utility
 3. Order matters: layout → spacing → colors → effects"

Distributes to all frontend agents


10.6 KNOWLEDGE GRAPH (AGENT #115)
────────────────────────────────────────────────────────────────────────────
Agent #115 builds knowledge graph of platform:

Nodes:
- Components
- APIs
- Database tables
- Services
- Agents

Edges:
- uses (Component A uses Service B)
- depends_on (API X depends on Database Table Y)
- communicates_with (Agent 1 communicates with Agent 2)

Example Query:
"What would break if I delete Button component?"

Agent #115 traverses graph:
Button
├─ used_by: HomePage
├─ used_by: Dashboard
├─ used_by: SettingsPage
└─ depends_on: cn() utility

Response:
"Deleting Button would break:
 - HomePage (3 instances)
 - Dashboard (7 instances)
 - SettingsPage (2 instances)
Total impact: 12 components"


10.7 PATTERN RECOGNITION (AGENT #113)
────────────────────────────────────────────────────────────────────────────
Agent #113 identifies patterns in code and behavior:

Code Patterns:
- Common component structures
- Frequently used hooks
- Repeated code blocks
- API call patterns

Behavior Patterns:
- User navigation flows
- Common feature combinations
- Error patterns
- Performance bottlenecks

Example Detection:
Pattern: "Every form uses zodResolver + react-hook-form"

Agent #113 suggests:
"Create reusable FormWrapper component with zodResolver pre-configured"


10.8 META-INTELLIGENCE (AGENT #116)
────────────────────────────────────────────────────────────────────────────
Agent #116 analyzes AI performance itself:

Tracks:
- Which AI models best for which tasks
- Token efficiency per model
- Success rates by task type
- Cost vs quality tradeoffs

Example Analysis:
Task: "Generate React component"

Results:
- Claude Sonnet: 95% success, $0.15/request, 8s avg
- Gemini Pro: 91% success, $0.01/request, 6s avg
- Gemini Flash: 78% success, $0.001/request, 4s avg

Recommendation:
"Use Gemini Pro for component generation (best cost/quality balance)"


═══════════════════════════════════════════════════════════════════════════════
SECTION 11: AUTONOMOUS CODING SYSTEM (AGENT #131)
═══════════════════════════════════════════════════════════════════════════════

11.1 AGENT #131 OVERVIEW
────────────────────────────────────────────────────────────────────────────
Role: Vibe Coding Specialist
Capability: Autonomous full-stack application development
Runtime Target: 200 minutes continuous operation
Inspiration: Replit Agent 3, Cursor, Windsurf, v0, Bolt.new

Key Features:
✓ Natural language to code
✓ Multi-file changes
✓ Self-testing loops
✓ Self-healing (fixes own errors)
✓ Git automation
✓ Playwright test generation
✓ 20-50x developer productivity


11.2 AUTONOMOUS WORKFLOW
────────────────────────────────────────────────────────────────────────────
User Input:
"Build a todo app with authentication"

Agent #131 Execution:
1. Task Decomposition (5 min)
   - Analyze requirements
   - Break into sub-tasks
   - Identify dependencies

2. Database Schema (10 min)
   - Design tables
   - Create migration
   - Run db:push

3. Backend API (30 min)
   - Auth endpoints
   - CRUD endpoints
   - Validation schemas

4. Frontend UI (45 min)
   - Login page
   - Todo list component
   - Create/edit forms

5. Integration (20 min)
   - Connect frontend to backend
   - Test user flow
   - Fix issues

6. Testing (30 min)
   - Generate Playwright tests
   - Run test suite
   - Fix failing tests

7. Git Commit (5 min)
   - Stage changes
   - Generate commit message (AI)
   - Commit to repository

8. Deployment Validation (15 min)
   - Pre-flight checks
   - Deploy to staging
   - Smoke tests

Total: ~160 minutes (within 200-minute target)


11.3 SELF-TESTING LOOP
────────────────────────────────────────────────────────────────────────────
After generating code:

1. Generate Tests
   Agent generates Playwright tests for new features

2. Run Tests
   Execute test suite automatically

3. Analyze Results
   - All pass? → Continue
   - Failures? → Enter self-healing mode

4. Self-Healing
   - Read test output
   - Identify failure cause
   - Generate fix
   - Re-run tests
   - Repeat until pass (max 3 attempts)

5. Human Escalation
   If 3 attempts fail, ask human for help


11.4 SPECIALIZED TOOLS
────────────────────────────────────────────────────────────────────────────
Agent #131 Sub-Agents:

1. MappingPhaseAgent.ts
   - Requirement analysis
   - User story creation
   - Task breakdown

2. EditorAgent.ts
   - Code generation
   - File modifications
   - Syntax validation

3. TesterAgent.ts
   - Test generation
   - Test execution
   - Coverage analysis

4. VerifierAgent.ts
   - Code review
   - Security checks
   - Best practice validation

5. ManagerAgent.ts
   - Orchestration
   - Progress tracking
   - Resource allocation

6. ArchitectAgent.ts
   - System design
   - Architecture decisions
   - Scalability planning

7. BrowserTesterAgent.ts
   - Playwright integration
   - Screenshot capture
   - Visual regression

8. DocumentationAgent.ts
   - README generation
   - API documentation
   - Code comments

9. SelfHealerAgent.ts
   - Error detection
   - Automatic fixes
   - Recovery strategies


11.5 CHECKPOINTS & ROLLBACK
────────────────────────────────────────────────────────────────────────────
Every 15 minutes, Agent #131 creates checkpoint:

Checkpoint Structure:
{
  id: 'checkpoint-1730234567',
  timestamp: Date,
  filesModified: string[],
  testsPassing: boolean,
  gitCommit: string,
  progress: 45,  // percentage
  canRollback: true
}

If critical error:
1. Stop current work
2. Rollback to last checkpoint
3. Analyze what went wrong
4. Try different approach
5. Continue from checkpoint


11.6 MULTI-MODEL ORCHESTRATION
────────────────────────────────────────────────────────────────────────────
Agent #131 uses different AI models for different tasks:

Task Routing:
- Planning & decomposition → Gemini Flash ($0.001)
- Code generation → Gemini Pro ($0.01)
- Code review → Claude Sonnet ($0.15)
- Documentation → Gemini Flash ($0.001)
- Error analysis → Claude Sonnet ($0.15)

This ensures:
- Optimal cost ($0.02 average per task vs $0.15 all-Claude)
- Best quality for each task type
- Fast execution


11.7 METRICS & TELEMETRY
────────────────────────────────────────────────────────────────────────────
Agent #131 reports to Grafana Cloud:

Metrics Tracked:
- Tasks completed per hour
- Success rate (%)
- Average task duration
- Cost per task
- Test pass rate
- Self-healing attempts
- Lines of code generated
- Files modified
- Git commits created

Dashboard: "Agent #131 Performance"
- Real-time progress
- Cost tracking
- Quality metrics
- Error rates


═══════════════════════════════════════════════════════════════════════════════
SECTION 12: SPECIALIZED AGENT IMPLEMENTATIONS
═══════════════════════════════════════════════════════════════════════════════

12.1 LAYER AGENTS (61 TOTAL)
────────────────────────────────────────────────────────────────────────────
Each layer agent manages a specific platform area:

Layer 1: Architecture Foundation Agent
- File: server/agents/layer01-architecture-foundation-agent.ts
- Responsibilities: Core architecture decisions, design patterns
- Tech Stack: ESA framework, system design principles

Layer 4: Authentication System Agent
- File: server/agents/layer04-authentication-system-agent.ts
- Responsibilities: User auth, JWT, OAuth, session management
- Tech Stack: Replit OAuth, JWT, bcrypt, passport

Layer 5: Authorization System Agent
- File: server/agents/layer05-authorization-system-agent.ts
- Responsibilities: RBAC, ABAC, permission checks
- Tech Stack: Role-based access, custom permissions

Layer 16: Notification System Agent
- File: server/agents/layer16-notification-system-agent.ts
- Responsibilities: Push notifications, email, SMS
- Tech Stack: Socket.io, SendGrid, Twilio

Layer 20: Workflow Engine Agent
- File: server/agents/layer20-workflow-engine-agent.ts
- Responsibilities: Business process automation
- Tech Stack: State machines, task orchestration

Layer 25: Messaging System Agent
- File: server/agents/layer25-messaging-system-agent.ts
- Responsibilities: Chat, direct messages
- Tech Stack: Socket.io, real-time messaging

Layer 29: Booking System Agent
- File: server/agents/layer29-booking-system-agent.ts
- Responsibilities: Event registration, tickets
- Tech Stack: Stripe, booking logic

Layer 30: Support System Agent
- File: server/agents/layer30-support-system-agent.ts
- Responsibilities: Help desk, ticketing
- Tech Stack: Support ticket management

Layer 31: AI Infrastructure Agent
- File: server/agents/layer31-ai-infrastructure-agent.ts
- Responsibilities: AI model management, routing
- Tech Stack: Claude, GPT-4o, Gemini APIs

Layer 35: AI Agent Management Agent
- File: server/agents/layer35-ai-agent-management-agent.ts
- Responsibilities: Agent lifecycle, coordination
- Tech Stack: Multi-agent orchestration

Layer 36: Memory Systems Agent
- File: server/agents/layer36-memory-systems-agent.ts
- Responsibilities: Agent memory, learning storage
- Tech Stack: PostgreSQL, Redis cache

Layer 37: Learning Systems Agent
- File: server/agents/layer37-learning-systems-agent.ts
- Responsibilities: Knowledge distribution
- Tech Stack: ML models, pattern recognition

Layer 45: Reasoning Engine Agent
- File: server/agents/layer45-reasoning-engine-agent.ts
- Responsibilities: Logical reasoning, decision making
- Tech Stack: AI inference, rule engines

Layer 46: Integration Layer Agent
- File: server/agents/layer46-integration-layer-agent.ts
- Responsibilities: Third-party integrations
- Tech Stack: REST APIs, webhooks, MCP

Layer 48: Performance Monitoring Agent
- File: server/agents/layer48-performance-monitoring-agent.ts
- Responsibilities: System performance tracking
- Tech Stack: Grafana, OpenTelemetry

Layer 49: Security Hardening Agent
- File: server/agents/layer49-security-hardening-agent.ts
- Responsibilities: Security audits, vulnerability scanning
- Tech Stack: Security best practices

Layer 50: DevOps Automation Agent
- File: server/agents/layer50-devops-automation-agent.ts
- Responsibilities: CI/CD, deployments
- Tech Stack: GitHub Actions, automated testing

Layer 52: Documentation System Agent
- File: server/agents/layer52-documentation-system-agent.ts
- Responsibilities: Auto-generate docs
- Tech Stack: Markdown, API docs

Layer 58: Integration Tracking Agent
- File: server/agents/layer58-integration-tracking-agent.ts
- Responsibilities: Monitor integrations
- Tech Stack: Health checks, alerts

Layer 61: Supabase Expertise Agent
- File: server/agents/layer61-supabase-expertise-agent.ts
- Responsibilities: Supabase integration (if used)
- Tech Stack: Supabase SDK

(+ 42 more layer agents)


12.2 AGENT COORDINATOR
────────────────────────────────────────────────────────────────────────────
File: server/agents/agent-coordinator.ts

Purpose: Central coordination hub for all agents

Responsibilities:
- Route requests to appropriate agent
- Manage agent lifecycle
- Handle escalations
- Monitor agent health
- Load balancing

Example Routing:
Request: "User login is broken"

Coordinator Analysis:
- Keywords: "login" → Authentication domain
- Route to: Layer 4 (Authentication System Agent)

Request: "Optimize database queries"

Coordinator Analysis:
- Keywords: "optimize", "database" → Performance domain
- Route to: Layer 48 (Performance Monitoring Agent)


═══════════════════════════════════════════════════════════════════════════════
SECTION 13: AGENT DATABASE SCHEMAS
═══════════════════════════════════════════════════════════════════════════════

13.1 MULTI-AGENT SCHEMAS
────────────────────────────────────────────────────────────────────────────
File: shared/multiAgentSchemas.ts (156 lines)

All agent-related database tables:

1. build_tasks
   - Stores orchestration tasks
   - Links to agents
   - Tracks progress

2. agent_capabilities
   - Agent metadata
   - Specialties
   - Load balancing data

3. user_behavior_patterns
   - ML prediction input
   - User activity patterns
   - Personalization data

4. ml_predictions
   - AI predictions
   - Confidence scores
   - Feedback loop

5. failed_actions
   - Error tracking
   - Resolution status
   - Learning source

6. failure_patterns
   - Aggregated failures
   - Recommendations
   - Prevention strategies


13.2 BUILD TASKS TABLE
────────────────────────────────────────────────────────────────────────────
Table: build_tasks

Schema:
{
  id: serial PRIMARY KEY,
  buildId: varchar(255) NOT NULL,
  type: varchar(50) NOT NULL,              // 'frontend', 'backend', 'database', 'integration'
  description: text NOT NULL,
  assignedAgent: varchar(100),
  status: varchar(50) DEFAULT 'pending',   // 'pending', 'in_progress', 'completed', 'failed'
  dependencies: jsonb DEFAULT [],          // [1, 2, 3] - task IDs
  priority: integer DEFAULT 5,             // 1-10
  estimatedMinutes: integer,
  actualMinutes: integer,
  output: jsonb,
  error: text,
  createdAt: timestamp DEFAULT NOW(),
  startedAt: timestamp,
  completedAt: timestamp,
  userId: integer NOT NULL
}

Example:
{
  id: 42,
  buildId: 'build-1730234567-abc123',
  type: 'frontend',
  description: 'Create dashboard UI with charts',
  assignedAgent: 'agent-131-vibe-coding',
  status: 'completed',
  dependencies: [40, 41],  // Depends on tasks 40 and 41
  priority: 8,
  estimatedMinutes: 60,
  actualMinutes: 55,
  output: {
    filesCreated: ['client/src/pages/Dashboard.tsx'],
    linesOfCode: 247
  },
  createdAt: '2025-10-28 10:00:00',
  startedAt: '2025-10-28 10:15:00',
  completedAt: '2025-10-28 11:10:00',
  userId: 123
}


13.3 AGENT CAPABILITIES TABLE
────────────────────────────────────────────────────────────────────────────
Table: agent_capabilities

Schema:
{
  id: serial PRIMARY KEY,
  agentId: varchar(100) UNIQUE NOT NULL,
  name: varchar(255) NOT NULL,
  specialties: jsonb DEFAULT [],
  maxLoad: integer DEFAULT 3,
  currentLoad: integer DEFAULT 0,
  successRate: integer DEFAULT 100,        // 0-100
  avgResponseTime: integer DEFAULT 0,      // milliseconds
  totalTasksCompleted: integer DEFAULT 0,
  isActive: boolean DEFAULT true,
  updatedAt: timestamp DEFAULT NOW()
}

Indexes:
- agentId (unique)
- specialties (GIN index for array search)
- isActive


13.4 ML PREDICTIONS TABLE
────────────────────────────────────────────────────────────────────────────
Table: ml_predictions

Schema:
{
  id: serial PRIMARY KEY,
  userId: integer NOT NULL,
  predictionType: varchar(50) NOT NULL,    // 'next_action', 'agent_assignment', 'feature_recommendation'
  input: jsonb NOT NULL,                   // Context used for prediction
  prediction: text NOT NULL,
  confidence: integer NOT NULL,            // 0-100
  reasoning: text,
  wasCorrect: boolean,                     // Feedback loop
  createdAt: timestamp DEFAULT NOW()
}

Example:
{
  userId: 123,
  predictionType: 'next_action',
  input: {
    currentPage: '/dashboard',
    timeOnPage: 45,
    previousPages: ['/login', '/profile']
  },
  prediction: 'User will navigate to /events',
  confidence: 78,
  reasoning: 'User typically views events after dashboard on Tuesdays',
  wasCorrect: true
}


═══════════════════════════════════════════════════════════════════════════════
SECTION 14: ML PREDICTION & BEHAVIOR ANALYSIS
═══════════════════════════════════════════════════════════════════════════════

14.1 ML PREDICTION SYSTEM
────────────────────────────────────────────────────────────────────────────
File: server/services/mlPredictionSystem.ts

Purpose: Predict user actions and optimize UX

Prediction Types:
1. Next Action - What will user do next?
2. Agent Assignment - Which agent should handle request?
3. Feature Recommendation - What features to show user?


14.2 USER BEHAVIOR TRACKING
────────────────────────────────────────────────────────────────────────────
Table: user_behavior_patterns

Data Collected:
- Common navigation paths
- Peak activity times
- Preferred features
- Frustration points (where users struggle)
- Session duration
- Click patterns

Example:
{
  userId: 123,
  commonPaths: [
    '/login → /dashboard → /events',
    '/dashboard → /memories → /create'
  ],
  peakActivityTime: '18:00-20:00',
  preferredFeatures: ['events', 'memories', 'groups'],
  frustrationPoints: [
    { page: '/settings', issue: 'cant_find_notifications' }
  ],
  sessionCount: 47,
  avgSessionDuration: 1200  // seconds
}


14.3 NEXT ACTION PREDICTION
────────────────────────────────────────────────────────────────────────────
Algorithm:

1. Load user behavior patterns
2. Get current context:
   - Current page
   - Time spent on page
   - Previous pages in session
3. Calculate probabilities:
   - Historical patterns (60% weight)
   - Time of day (20% weight)
   - Day of week (10% weight)
   - Current session context (10% weight)
4. Return top prediction with confidence

Example:
Input:
{
  currentPage: '/dashboard',
  timeOnPage: 30,
  previousPages: ['/login'],
  timeOfDay: '19:00',
  dayOfWeek: 'Tuesday'
}

Prediction:
{
  nextAction: 'navigate_to_events',
  confidence: 82,
  reasoning: 'User typically views events on Tue evenings after dashboard'
}


14.4 AGENT ASSIGNMENT PREDICTION
────────────────────────────────────────────────────────────────────────────
When user sends message, predict which agent should handle:

Algorithm:
1. Analyze message keywords
2. Check agent specialties
3. Consider agent current load
4. Factor in historical success rates
5. Return best agent match

Example:
Message: "How do I create an event?"

Analysis:
- Keywords: "create", "event"
- Domain: Events management
- Candidates:
  - Agent #77 (Site Builder): specialty=['ui', 'forms'] - 60% match
  - Layer 29 (Booking System): specialty=['events', 'booking'] - 95% match

Prediction:
{
  assignedAgent: 'layer-29-booking-system',
  confidence: 95,
  reasoning: 'Event creation is core specialty'
}


═══════════════════════════════════════════════════════════════════════════════
SECTION 15: AGENT COLLABORATION & CONSENSUS
═══════════════════════════════════════════════════════════════════════════════

15.1 CONSENSUS ENGINE
────────────────────────────────────────────────────────────────────────────
File: server/services/ConsensusEngine.ts

When do agents need consensus?
- Architecture decisions
- Technology choices
- Conflicting approaches
- Resource allocation

Example Scenario:
Question: "Should we use REST or GraphQL for new API?"

Voting Agents:
- Layer 46 (Integration): GraphQL (flexibility for clients)
- Layer 31 (AI Infrastructure): REST (simpler for AI tools)
- Layer 50 (DevOps): REST (easier caching/CDN)

Votes:
1. GraphQL: 1 vote (33%)
2. REST: 2 votes (67%)

Result: REST wins (>50% threshold)


15.2 COLLABORATION PATTERNS
────────────────────────────────────────────────────────────────────────────
Pattern 1: Sequential Collaboration
Agent A completes → passes to Agent B → passes to Agent C

Example:
Design → Development → Testing
Agent #11 (UI/UX) → Agent #131 (Vibe Coding) → Agent #79 (QA)

Pattern 2: Parallel Collaboration
Multiple agents work simultaneously on different parts

Example:
Frontend + Backend + Database in parallel
Agent #131 + Layer 46 + Layer 35

Pattern 3: Hierarchical Collaboration
Coordinator delegates to specialists

Example:
CEO → Division Chief → Layer Agent
Agent #0 → Chief #4 → Layer 35


15.3 AGENT HANDOFF PROTOCOL
────────────────────────────────────────────────────────────────────────────
When Agent A hands off to Agent B:

1. Create handoff message:
   {
     fromAgent: 'agent-131',
     toAgent: 'agent-79',
     taskId: 'task-123',
     context: {
       filesModified: ['Dashboard.tsx'],
       whatWasDone: 'Created dashboard UI',
       whatNeedsDoing: 'Test user flow'
     },
     priority: 'high'
   }

2. Agent B receives notification

3. Agent B acknowledges:
   {
     accepted: true,
     estimatedCompletionTime: '15 minutes'
   }

4. Agent B completes work

5. Agent B reports back:
   {
     status: 'completed',
     results: { testsPass: true },
     readyForProduction: true
   }


═══════════════════════════════════════════════════════════════════════════════
SECTION 16: TESTING & QUALITY ASSURANCE PROTOCOLS
═══════════════════════════════════════════════════════════════════════════════

16.1 MANDATORY TESTING PROTOCOL
────────────────────────────────────────────────────────────────────────────
File: docs/agents/ceo/agent-0-esa-orchestrator.md (lines 1-42)

THE 4 MANDATORY CHECKPOINTS:

✅ CHECKPOINT 1: DATA INSPECTION
Rule: NEVER assume data structures. Always inspect first.
```typescript
console.log('🔍 DATA INSPECTION:', JSON.stringify(data, null, 2))
// Run it, see the output, THEN write conditional
```

✅ CHECKPOINT 2: UNIT TESTING
Rule: Test individual functions in isolation
- Test regex patterns with sample inputs
- Verify IF conditions with actual data
- Validate file operations with dummy files

✅ CHECKPOINT 3: INTEGRATION TESTING
Rule: Test the FULL user journey end-to-end
- Run complete flow as user would
- Check server logs for errors
- Screenshot successful execution

✅ CHECKPOINT 4: ARCHITECT REVIEW
Rule: Architect reviews BEHAVIOR, not just code
- Proof it runs (screenshot)
- Proof it works (before/after)
- Proof no crashes (logs)


16.2 AGENT #79 (QUALITY VALIDATOR)
────────────────────────────────────────────────────────────────────────────
Role: Automated Testing & QA
Responsibilities:
- Playwright test execution
- Screenshot evidence collection
- User journey validation
- Performance benchmarking


16.3 EVIDENCE COLLECTION
────────────────────────────────────────────────────────────────────────────
All agents must provide evidence:

1. Screenshots
   - Before state
   - After state
   - Success confirmation

2. Test Results
   - Test output logs
   - Pass/fail counts
   - Coverage reports

3. Performance Metrics
   - Response times
   - Resource usage
   - Error rates


═══════════════════════════════════════════════════════════════════════════════
SECTION 17: DEPLOYMENT & ROLLOUT STRATEGIES
═══════════════════════════════════════════════════════════════════════════════

17.1 AGENT #127 (DEPLOYMENT SAFETY)
────────────────────────────────────────────────────────────────────────────
Role: Zero-Downtime Deployment Engineer

Deployment Phases:
Phase 1: Super Admin Only (0-5%)
Phase 2: Beta Users (10-25%)
Phase 3: General Availability (100%)

Pre-Flight Checks:
✓ All tests passing
✓ No critical errors
✓ Database migrations successful
✓ Health checks passing
✓ Rollback plan ready


17.2 CONTROLLED ROLLOUT
────────────────────────────────────────────────────────────────────────────
Never ship at 100% immediately. Use feature flags.

Example:
Feature: Autonomous Coding (Agent #131)

Rollout:
Week 1: Super admin only (1 user)
Week 2: 10% beta users (100 users)
Week 3: 25% users (250 users)
Week 4: 50% users (500 users)
Week 5: 100% all users


═══════════════════════════════════════════════════════════════════════════════
SECTION 18: MONITORING & OBSERVABILITY
═══════════════════════════════════════════════════════════════════════════════

18.1 AGENT #143 (OBSERVABILITY)
────────────────────────────────────────────────────────────────────────────
Role: Platform Monitoring Specialist

Technologies:
- Grafana Cloud (dashboards)
- OpenTelemetry (traces & metrics)
- Pino (logging)
- Sentry (error tracking)

Monitored Metrics:
- Agent success rates
- Task completion times
- Error rates by agent
- Cost per agent
- Load balancing efficiency


═══════════════════════════════════════════════════════════════════════════════
SECTION 19: AGENT DOCUMENTATION SYSTEM (828 FILES)
═══════════════════════════════════════════════════════════════════════════════

19.1 DOCUMENTATION STRUCTURE
────────────────────────────────────────────────────────────────────────────
docs/
├── agents/
│   ├── ceo/
│   │   └── agent-0-esa-orchestrator.md (573 lines)
│   ├── chiefs/ (6 division chiefs)
│   ├── domains/ (9 domain coordinators)
│   ├── experts/ (15+ expert agents)
│   └── layers/ (61 layer agents)
├── AGENT_LEARNINGS.md (1,648 lines)
├── MB_MD_QA_PROTOCOL.md (protocol rules)
├── QA_AGENT_PROTOCOL.md (QA enforcement)
└── (800+ more MD files)


═══════════════════════════════════════════════════════════════════════════════
SECTION 20: FUTURE ROADMAP & ENHANCEMENTS
═══════════════════════════════════════════════════════════════════════════════

20.1 PLANNED ENHANCEMENTS
────────────────────────────────────────────────────────────────────────────
Q1 2026:
✓ Gemini 2.5 Pro expansion (when publicly available)
✓ Enhanced self-healing capabilities
✓ Advanced pattern recognition
✓ Automated performance optimization

Q2 2026:
✓ Agent-to-agent learning (peer learning)
✓ Advanced consensus mechanisms
✓ Real-time collaboration features
✓ Enhanced MCP integrations

Q3 2026:
✓ Multi-agent swarm intelligence
✓ Predictive error prevention
✓ Autonomous security audits
✓ Self-optimizing architecture


═══════════════════════════════════════════════════════════════════════════════
END OF AI SYSTEMS DOCUMENTATION
═══════════════════════════════════════════════════════════════════════════════

This document comprehensively covers EVERY aspect of AI work in Mundo Tango:
✓ All 105+ agents documented
✓ Complete orchestration system
✓ MCP integration details
✓ Multi-model routing (87% cost reduction)
✓ Agent communication protocols
✓ Universal tool system (20+ tools)
✓ Self-awareness capabilities
✓ Vibe Code Engine (Gemini)
✓ Agent learning & memory
✓ Autonomous coding (Agent #131)
✓ Specialized implementations
✓ Database schemas
✓ ML predictions
✓ Collaboration & consensus
✓ Testing protocols
✓ Deployment strategies
✓ Monitoring & observability
✓ Documentation system (828 files)
✓ Future roadmap

Total Documentation: ~120+ pages of comprehensive AI systems architecture

For questions or deep dives:
- Agent-specific docs: docs/agents/ directory
- Learning history: docs/AGENT_LEARNINGS.md
- Platform overview: replit.md
- This file: Complete AI reference

Last Updated: October 29, 2025
Branch: 10-21-2025
Platform: Mundo Tango - ESA LIFE CEO AI Systems