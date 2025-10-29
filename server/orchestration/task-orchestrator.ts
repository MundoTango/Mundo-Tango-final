import { db } from '../db';
import { agentTasks, agentCapabilities, type InsertAgentTask, type AgentCapability, type AgentTask } from '@shared/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import OpenAI from 'openai';

// This is using Replit's AI Integrations service
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export interface TaskDecomposition {
  mainTaskId: number;
  subTasks: SubTask[];
  dependencies: TaskDependency[];
}

export interface SubTask {
  id: string;
  type: 'database' | 'backend' | 'frontend' | 'testing' | 'deployment';
  description: string;
  estimatedMinutes: number;
  requiredSpecialties: string[];
  priority: number; // 1-10
}

export interface TaskDependency {
  taskId: string;
  dependsOn: string[];
  canStartWhen: 'all_complete' | 'any_complete';
}

export interface TaskAssignment {
  taskId: number;
  agentId: string;
  estimatedMinutes: number;
}

/**
 * TaskOrchestrator - Core multi-agent orchestration system
 * Reference: mb.md Section 3 (Multi-Agent Orchestration System)
 * 
 * Responsibilities:
 * 1. Decompose user requests into sub-tasks
 * 2. Assign sub-tasks to specialized agents
 * 3. Execute tasks in parallel (respecting dependencies)
 * 4. Load balance based on agent capacity and success rates
 */
export class TaskOrchestrator {
  /**
   * Step 1: Decompose user request into sub-tasks
   * Uses AI to analyze request and break it into manageable pieces
   * Example: "Build a dashboard" → [schema, API, frontend, tests]
   */
  async decompose(userRequest: string, userId: string): Promise<TaskDecomposition> {
    // Generate build ID
    const buildId = `build-${Date.now()}`;
    
    // Use AI to decompose the request
    // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o', // Using gpt-4o for decomposition
      messages: [{
        role: 'system',
        content: `You are a task decomposition expert for software development. 
Analyze the user request and break it into sub-tasks.
Return a JSON object with this structure:
{
  "subTasks": [
    {
      "id": "unique-id",
      "type": "database|backend|frontend|testing|deployment",
      "description": "clear task description",
      "estimatedMinutes": number,
      "requiredSpecialties": ["specialty1", "specialty2"],
      "priority": 1-10
    }
  ],
  "dependencies": [
    {
      "taskId": "task-id",
      "dependsOn": ["prerequisite-task-id"],
      "canStartWhen": "all_complete|any_complete"
    }
  ]
}`
      }, {
        role: 'user',
        content: `Decompose this request: ${userRequest}`
      }],
      response_format: { type: 'json_object' },
      max_completion_tokens: 4096
    });
    
    const decomposed = JSON.parse(aiResponse.choices[0]?.message?.content || '{}');
    
    // Create main orchestration task in database
    const [mainTask] = await db.insert(agentTasks).values({
      buildId,
      type: 'orchestration',
      description: userRequest,
      status: 'pending',
      priority: 10,
      userId,
      dependencies: []
    }).returning();
    
    return {
      mainTaskId: mainTask.id,
      subTasks: decomposed.subTasks || [],
      dependencies: decomposed.dependencies || []
    };
  }

  /**
   * Step 2: Assign sub-tasks to specialized agents
   * Selects best agent based on:
   * - Specialty match (required capabilities)
   * - Current capacity (how many tasks they're handling)
   * - Success rate (past performance)
   */
  async assignTasks(
    decomposition: TaskDecomposition,
    userId: string
  ): Promise<TaskAssignment[]> {
    const assignments: TaskAssignment[] = [];
    
    for (const subTask of decomposition.subTasks) {
      // Find agents with matching specialties
      const candidates = await db.select()
        .from(agentCapabilities)
        .where(
          sql`${agentCapabilities.isActive} = true`
        );
      
      // Filter by specialty match
      const matchingAgents = candidates.filter(agent => {
        const agentSpecialties = Array.isArray(agent.specialties) 
          ? agent.specialties as string[]
          : [];
        return subTask.requiredSpecialties.some(req => 
          agentSpecialties.some(spec => 
            spec.toLowerCase().includes(req.toLowerCase()) ||
            req.toLowerCase().includes(spec.toLowerCase())
          )
        );
      });
      
      if (matchingAgents.length === 0) {
        console.warn(`No matching agents found for task: ${subTask.description}`);
        // Fallback: assign to general-purpose agent (Agent #131)
        matchingAgents.push(
          candidates.find(a => a.agentId === 'agent-131-vibe-coding') || candidates[0]
        );
      }
      
      // Select best agent using scoring algorithm
      const bestAgent = await this.selectBestAgent(matchingAgents, subTask);
      
      // Create task assignment in database
      const dependencyIds = this.getDependencyIds(subTask.id, decomposition.dependencies);
      
      const [assignment] = await db.insert(agentTasks).values({
        buildId: String(decomposition.mainTaskId),
        type: subTask.type,
        description: subTask.description,
        assignedAgent: bestAgent.agentId,
        status: 'assigned',
        priority: subTask.priority,
        estimatedMinutes: subTask.estimatedMinutes,
        userId,
        dependencies: dependencyIds
      }).returning();
      
      // Update agent's current load
      await db.update(agentCapabilities)
        .set({ 
          currentLoad: sql`${agentCapabilities.currentLoad} + 1`
        })
        .where(eq(agentCapabilities.agentId, bestAgent.agentId));
      
      assignments.push({
        taskId: assignment.id,
        agentId: bestAgent.agentId,
        estimatedMinutes: subTask.estimatedMinutes
      });
    }
    
    return assignments;
  }

  /**
   * Step 3: Execute tasks in parallel (respecting dependencies)
   * Builds execution graph and runs tasks in waves
   * Tasks with no dependencies run first, then dependent tasks
   */
  async executeParallel(buildId: string): Promise<void> {
    // Get all tasks for this build
    const tasks = await db.select()
      .from(agentTasks)
      .where(eq(agentTasks.buildId, buildId));
    
    // Build execution graph
    const graph = this.buildExecutionGraph(tasks);
    
    // Find tasks with no dependencies (ready to start)
    let readyTasks = graph.filter(t => {
      const deps = Array.isArray(t.dependencies) ? t.dependencies as number[] : [];
      return deps.length === 0 && t.status === 'assigned';
    });
    
    const completedIds: number[] = [];
    
    // Execute in waves
    while (readyTasks.length > 0) {
      // Mark ready tasks as in_progress
      await Promise.all(
        readyTasks.map(task =>
          db.update(agentTasks)
            .set({ 
              status: 'in_progress',
              startedAt: new Date()
            })
            .where(eq(agentTasks.id, task.id))
        )
      );
      
      // In a real implementation, these would trigger agent execution
      // For now, we'll simulate by marking them as completed
      // The actual agent execution would happen via WebSocket or message queue
      
      completedIds.push(...readyTasks.map(t => t.id));
      
      // Find newly ready tasks (dependencies now complete)
      readyTasks = graph.filter(t => {
        if (completedIds.includes(t.id)) return false;
        if (t.status !== 'assigned') return false;
        
        const deps = Array.isArray(t.dependencies) ? t.dependencies as number[] : [];
        return deps.every(depId => completedIds.includes(depId));
      });
    }
  }

  /**
   * Step 4: Select best agent based on capacity and success rate
   * Scoring: success_rate * (1 - load_ratio) * specialty_match
   */
  async selectBestAgent(
    candidates: AgentCapability[],
    task: SubTask
  ): Promise<AgentCapability> {
    // Score each candidate
    const scored = candidates.map(agent => {
      const loadRatio = agent.currentLoad / agent.maxLoad;
      const capacityScore = Math.max(0, 1 - loadRatio);
      const successScore = agent.successRate / 100;
      
      // Specialty match bonus
      const agentSpecialties = Array.isArray(agent.specialties) 
        ? agent.specialties as string[]
        : [];
      const matchCount = task.requiredSpecialties.filter(req =>
        agentSpecialties.some(spec => 
          spec.toLowerCase().includes(req.toLowerCase())
        )
      ).length;
      const specialtyBonus = 1 + (matchCount * 0.2);
      
      // Final score
      const score = successScore * capacityScore * specialtyBonus;
      
      return { agent, score };
    });
    
    // Sort by score (descending) and return best
    scored.sort((a, b) => b.score - a.score);
    
    return scored[0]?.agent || candidates[0];
  }

  /**
   * Build execution graph from tasks
   */
  private buildExecutionGraph(tasks: AgentTask[]): AgentTask[] {
    return tasks;
  }

  /**
   * Get dependency task IDs for a given sub-task
   */
  private getDependencyIds(
    taskId: string,
    dependencies: TaskDependency[]
  ): number[] {
    const dep = dependencies.find(d => d.taskId === taskId);
    if (!dep) return [];
    
    // For now, return empty array since we don't have task ID mapping yet
    // In real implementation, would map sub-task IDs to database task IDs
    return [];
  }
}
