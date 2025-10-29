import { eq, desc, and, gte, lt, sql } from "drizzle-orm";
import { db } from "./db";
import {
  type User,
  type InsertUser,
  type AgentCapability,
  type InsertAgentCapability,
  type AgentTask,
  type InsertAgentTask,
  type AgentCollaboration,
  type InsertAgentCollaboration,
  type AgentLearning,
  type InsertAgentLearning,
  type AgentPerformanceMetric,
  type InsertAgentPerformanceMetric,
  type MlPrediction,
  type InsertMlPrediction,
  type UserBehaviorPattern,
  type InsertUserBehaviorPattern,
  type FailedAction,
  type InsertFailedAction,
  type FailurePattern,
  type InsertFailurePattern,
  type AiUsageMetric,
  type InsertAiUsageMetric,
  users,
  agentCapabilities,
  agentTasks,
  agentCollaboration,
  agentLearnings,
  agentPerformanceMetrics,
  mlPredictions,
  userBehaviorPatterns,
  failedActions,
  failurePatterns,
  aiUsageMetrics,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Agent Capability operations
  getAgentCapability(agentId: string): Promise<AgentCapability | undefined>;
  getAllAgentCapabilities(): Promise<AgentCapability[]>;
  getActiveAgents(): Promise<AgentCapability[]>;
  getAgentsBySpecialty(specialty: string): Promise<AgentCapability[]>;
  createAgentCapability(agent: InsertAgentCapability): Promise<AgentCapability>;
  updateAgentCapability(agentId: string, updates: Partial<InsertAgentCapability>): Promise<AgentCapability | undefined>;
  updateAgentLoad(agentId: string, loadDelta: number): Promise<void>;

  // Agent Task operations
  getAgentTask(id: number): Promise<AgentTask | undefined>;
  getTasksByBuildId(buildId: string): Promise<AgentTask[]>;
  getTasksByAgent(agentId: string): Promise<AgentTask[]>;
  getTasksByStatus(status: string): Promise<AgentTask[]>;
  getPendingTasks(): Promise<AgentTask[]>;
  createAgentTask(task: InsertAgentTask): Promise<AgentTask>;
  updateAgentTask(id: number, updates: Partial<InsertAgentTask>): Promise<AgentTask | undefined>;
  assignTaskToAgent(taskId: number, agentId: string): Promise<AgentTask | undefined>;

  // Agent Collaboration operations
  getAgentMessages(agentId: string, unreadOnly?: boolean): Promise<AgentCollaboration[]>;
  sendAgentMessage(message: InsertAgentCollaboration): Promise<AgentCollaboration>;
  markMessageAsRead(messageId: number): Promise<void>;

  // Agent Learning operations
  getAgentLearnings(agentId: string, minConfidence?: number): Promise<AgentLearning[]>;
  createAgentLearning(learning: InsertAgentLearning): Promise<AgentLearning>;
  incrementLearningUsage(learningId: number): Promise<void>;

  // Agent Performance Metrics operations
  getAgentMetrics(agentId: string, metricType?: string): Promise<AgentPerformanceMetric[]>;
  recordAgentMetric(metric: InsertAgentPerformanceMetric): Promise<AgentPerformanceMetric>;

  // ML Predictions operations
  createMlPrediction(prediction: InsertMlPrediction): Promise<MlPrediction>;
  verifyPrediction(predictionId: number, wasCorrect: boolean): Promise<void>;

  // User Behavior operations
  recordUserBehavior(behavior: InsertUserBehaviorPattern): Promise<UserBehaviorPattern>;

  // Error Tracking operations
  recordFailedAction(action: InsertFailedAction): Promise<FailedAction>;
  recordFailurePattern(pattern: InsertFailurePattern): Promise<FailurePattern>;

  // AI Usage Metrics operations
  recordAiUsage(usage: InsertAiUsageMetric): Promise<AiUsageMetric>;
  getAiUsageStats(userId?: string, days?: number): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // ═══════════════════════════════════════════════════════════════════
  // USER OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // ═══════════════════════════════════════════════════════════════════
  // AGENT CAPABILITY OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getAgentCapability(agentId: string): Promise<AgentCapability | undefined> {
    const result = await db.select().from(agentCapabilities).where(eq(agentCapabilities.agentId, agentId));
    return result[0];
  }

  async getAllAgentCapabilities(): Promise<AgentCapability[]> {
    return await db.select().from(agentCapabilities).orderBy(agentCapabilities.name);
  }

  async getActiveAgents(): Promise<AgentCapability[]> {
    return await db.select()
      .from(agentCapabilities)
      .where(eq(agentCapabilities.isActive, true))
      .orderBy(desc(agentCapabilities.successRate));
  }

  async getAgentsBySpecialty(specialty: string): Promise<AgentCapability[]> {
    return await db.select()
      .from(agentCapabilities)
      .where(
        and(
          eq(agentCapabilities.isActive, true),
          sql`${agentCapabilities.specialties}::jsonb @> ${JSON.stringify([specialty])}::jsonb`
        )
      )
      .orderBy(desc(agentCapabilities.successRate));
  }

  async createAgentCapability(agent: InsertAgentCapability): Promise<AgentCapability> {
    const result = await db.insert(agentCapabilities).values(agent).returning();
    return result[0];
  }

  async updateAgentCapability(agentId: string, updates: Partial<InsertAgentCapability>): Promise<AgentCapability | undefined> {
    const result = await db.update(agentCapabilities)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(agentCapabilities.agentId, agentId))
      .returning();
    return result[0];
  }

  async updateAgentLoad(agentId: string, loadDelta: number): Promise<void> {
    await db.update(agentCapabilities)
      .set({
        currentLoad: sql`${agentCapabilities.currentLoad} + ${loadDelta}`,
        updatedAt: new Date()
      })
      .where(eq(agentCapabilities.agentId, agentId));
  }

  // ═══════════════════════════════════════════════════════════════════
  // AGENT TASK OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getAgentTask(id: number): Promise<AgentTask | undefined> {
    const result = await db.select().from(agentTasks).where(eq(agentTasks.id, id));
    return result[0];
  }

  async getTasksByBuildId(buildId: string): Promise<AgentTask[]> {
    return await db.select()
      .from(agentTasks)
      .where(eq(agentTasks.buildId, buildId))
      .orderBy(agentTasks.priority, agentTasks.createdAt);
  }

  async getTasksByAgent(agentId: string): Promise<AgentTask[]> {
    return await db.select()
      .from(agentTasks)
      .where(eq(agentTasks.assignedAgent, agentId))
      .orderBy(desc(agentTasks.createdAt));
  }

  async getTasksByStatus(status: string): Promise<AgentTask[]> {
    return await db.select()
      .from(agentTasks)
      .where(eq(agentTasks.status, status))
      .orderBy(desc(agentTasks.priority), agentTasks.createdAt);
  }

  async getPendingTasks(): Promise<AgentTask[]> {
    return await db.select()
      .from(agentTasks)
      .where(eq(agentTasks.status, 'pending'))
      .orderBy(desc(agentTasks.priority));
  }

  async createAgentTask(task: InsertAgentTask): Promise<AgentTask> {
    const result = await db.insert(agentTasks).values(task).returning();
    return result[0];
  }

  async updateAgentTask(id: number, updates: Partial<InsertAgentTask>): Promise<AgentTask | undefined> {
    const result = await db.update(agentTasks)
      .set(updates)
      .where(eq(agentTasks.id, id))
      .returning();
    return result[0];
  }

  async assignTaskToAgent(taskId: number, agentId: string): Promise<AgentTask | undefined> {
    const result = await db.update(agentTasks)
      .set({
        assignedAgent: agentId,
        status: 'in_progress',
        startedAt: new Date()
      })
      .where(eq(agentTasks.id, taskId))
      .returning();
    
    if (result[0]) {
      await this.updateAgentLoad(agentId, 1);
    }
    
    return result[0];
  }

  // ═══════════════════════════════════════════════════════════════════
  // AGENT COLLABORATION OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getAgentMessages(agentId: string, unreadOnly: boolean = false): Promise<AgentCollaboration[]> {
    const conditions = unreadOnly
      ? and(eq(agentCollaboration.toAgentId, agentId), eq(agentCollaboration.read, false))
      : eq(agentCollaboration.toAgentId, agentId);

    return await db.select()
      .from(agentCollaboration)
      .where(conditions)
      .orderBy(desc(agentCollaboration.priority), desc(agentCollaboration.createdAt));
  }

  async sendAgentMessage(message: InsertAgentCollaboration): Promise<AgentCollaboration> {
    const result = await db.insert(agentCollaboration).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    await db.update(agentCollaboration)
      .set({ read: true })
      .where(eq(agentCollaboration.id, messageId));
  }

  // ═══════════════════════════════════════════════════════════════════
  // AGENT LEARNING OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getAgentLearnings(agentId: string, minConfidence: number = 0): Promise<AgentLearning[]> {
    return await db.select()
      .from(agentLearnings)
      .where(
        and(
          eq(agentLearnings.agentId, agentId),
          gte(agentLearnings.confidence, minConfidence)
        )
      )
      .orderBy(desc(agentLearnings.appliedCount), desc(agentLearnings.confidence));
  }

  async createAgentLearning(learning: InsertAgentLearning): Promise<AgentLearning> {
    const result = await db.insert(agentLearnings).values(learning).returning();
    return result[0];
  }

  async incrementLearningUsage(learningId: number): Promise<void> {
    await db.update(agentLearnings)
      .set({
        appliedCount: sql`${agentLearnings.appliedCount} + 1`
      })
      .where(eq(agentLearnings.id, learningId));
  }

  // ═══════════════════════════════════════════════════════════════════
  // AGENT PERFORMANCE METRICS OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async getAgentMetrics(agentId: string, metricType?: string): Promise<AgentPerformanceMetric[]> {
    const conditions = metricType
      ? and(eq(agentPerformanceMetrics.agentId, agentId), eq(agentPerformanceMetrics.metricType, metricType))
      : eq(agentPerformanceMetrics.agentId, agentId);

    return await db.select()
      .from(agentPerformanceMetrics)
      .where(conditions)
      .orderBy(desc(agentPerformanceMetrics.recordedAt));
  }

  async recordAgentMetric(metric: InsertAgentPerformanceMetric): Promise<AgentPerformanceMetric> {
    const result = await db.insert(agentPerformanceMetrics).values(metric).returning();
    return result[0];
  }

  // ═══════════════════════════════════════════════════════════════════
  // ML PREDICTIONS OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async createMlPrediction(prediction: InsertMlPrediction): Promise<MlPrediction> {
    const result = await db.insert(mlPredictions).values(prediction).returning();
    return result[0];
  }

  async verifyPrediction(predictionId: number, wasCorrect: boolean): Promise<void> {
    await db.update(mlPredictions)
      .set({
        wasCorrect,
        verifiedAt: new Date()
      })
      .where(eq(mlPredictions.id, predictionId));
  }

  // ═══════════════════════════════════════════════════════════════════
  // USER BEHAVIOR OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async recordUserBehavior(behavior: InsertUserBehaviorPattern): Promise<UserBehaviorPattern> {
    const result = await db.insert(userBehaviorPatterns).values(behavior).returning();
    return result[0];
  }

  // ═══════════════════════════════════════════════════════════════════
  // ERROR TRACKING OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async recordFailedAction(action: InsertFailedAction): Promise<FailedAction> {
    const result = await db.insert(failedActions).values(action).returning();
    return result[0];
  }

  async recordFailurePattern(pattern: InsertFailurePattern): Promise<FailurePattern> {
    const result = await db.insert(failurePatterns).values(pattern).returning();
    return result[0];
  }

  // ═══════════════════════════════════════════════════════════════════
  // AI USAGE METRICS OPERATIONS
  // ═══════════════════════════════════════════════════════════════════

  async recordAiUsage(usage: InsertAiUsageMetric): Promise<AiUsageMetric> {
    const result = await db.insert(aiUsageMetrics).values(usage).returning();
    return result[0];
  }

  async getAiUsageStats(userId?: string, days: number = 30): Promise<any> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const conditions = userId
      ? and(eq(aiUsageMetrics.userId, userId), gte(aiUsageMetrics.createdAt, cutoffDate))
      : gte(aiUsageMetrics.createdAt, cutoffDate);

    const metrics = await db.select()
      .from(aiUsageMetrics)
      .where(conditions);

    const totalCost = metrics.reduce((sum, m) => sum + Number(m.cost), 0);
    const totalRequests = metrics.length;
    const byModel: Record<string, { count: number; cost: number }> = {};

    metrics.forEach(m => {
      if (!byModel[m.model]) {
        byModel[m.model] = { count: 0, cost: 0 };
      }
      byModel[m.model].count++;
      byModel[m.model].cost += Number(m.cost);
    });

    return {
      totalCost,
      totalRequests,
      avgCostPerRequest: totalRequests > 0 ? totalCost / totalRequests : 0,
      byModel,
      period: `Last ${days} days`
    };
  }
}

export const storage = new DatabaseStorage();
