import { sql } from "drizzle-orm";
import { 
  pgTable, 
  serial,
  text, 
  varchar, 
  integer, 
  boolean,
  timestamp,
  jsonb,
  decimal
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


// ═══════════════════════════════════════════════════════════════════
// AGENT SYSTEM - CORE TABLES
// ═══════════════════════════════════════════════════════════════════

/**
 * Agent Capabilities - Metadata and performance metrics for all 105+ agents
 * Based on mb.md Section 1.4 & 13.3
 */
export const agentCapabilities = pgTable("agent_capabilities", {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  specialties: jsonb("specialties").default([]).notNull(),
  maxLoad: integer("max_load").default(3).notNull(),
  currentLoad: integer("current_load").default(0).notNull(),
  successRate: integer("success_rate").default(0).notNull(), // 0-100
  avgResponseTime: integer("avg_response_time").default(0).notNull(), // milliseconds
  totalTasksCompleted: integer("total_tasks_completed").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAgentCapabilitySchema = createInsertSchema(agentCapabilities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  specialties: z.array(z.string()).default([]),
});

export type InsertAgentCapability = z.infer<typeof insertAgentCapabilitySchema>;
export type AgentCapability = typeof agentCapabilities.$inferSelect;


/**
 * Agent Tasks - Task queue, assignments, and execution tracking
 * Based on mb.md Section 13.2
 */
export const agentTasks = pgTable("agent_tasks", {
  id: serial("id").primaryKey(),
  buildId: varchar("build_id", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'frontend', 'backend', 'database', 'integration'
  description: text("description").notNull(),
  assignedAgent: varchar("assigned_agent", { length: 100 }),
  status: varchar("status", { length: 50 }).default('pending').notNull(), // 'pending', 'in_progress', 'completed', 'failed'
  dependencies: jsonb("dependencies").default([]).notNull(), // Array of task IDs
  priority: integer("priority").default(5).notNull(), // 1-10
  estimatedMinutes: integer("estimated_minutes"),
  actualMinutes: integer("actual_minutes"),
  output: jsonb("output"),
  error: text("error"),
  userId: varchar("user_id").notNull(), // References users.id
  createdAt: timestamp("created_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const insertAgentTaskSchema = createInsertSchema(agentTasks).omit({
  id: true,
  createdAt: true,
}).extend({
  dependencies: z.array(z.number()).default([]),
  output: z.record(z.any()).optional(),
});

export type InsertAgentTask = z.infer<typeof insertAgentTaskSchema>;
export type AgentTask = typeof agentTasks.$inferSelect;


/**
 * Agent Collaboration - Inter-agent communication messages
 * Based on mb.md Section 2.2 & 4.3
 */
export const agentCollaboration = pgTable("agent_collaboration", {
  id: serial("id").primaryKey(),
  fromAgentId: varchar("from_agent_id", { length: 100 }).notNull(),
  toAgentId: varchar("to_agent_id", { length: 100 }).notNull(),
  messageType: varchar("message_type", { length: 50 }).notNull(), // 'task_request', 'data_share', 'status_update'
  payload: jsonb("payload").notNull(),
  priority: integer("priority").default(5).notNull(),
  read: boolean("read").default(false).notNull(),
  responseDeadline: timestamp("response_deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAgentCollaborationSchema = createInsertSchema(agentCollaboration).omit({
  id: true,
  createdAt: true,
}).extend({
  payload: z.record(z.any()),
});

export type InsertAgentCollaboration = z.infer<typeof insertAgentCollaborationSchema>;
export type AgentCollaboration = typeof agentCollaboration.$inferSelect;


/**
 * Agent Learnings - Memory and learning data for all agents
 * Based on mb.md Section 10.3
 */
export const agentLearnings = pgTable("agent_learnings", {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'bug_fix', 'best_practice', 'anti_pattern'
  learning: text("learning").notNull(),
  confidence: integer("confidence").default(0).notNull(), // 0-100
  appliedCount: integer("applied_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAgentLearningSchema = createInsertSchema(agentLearnings).omit({
  id: true,
  createdAt: true,
});

export type InsertAgentLearning = z.infer<typeof insertAgentLearningSchema>;
export type AgentLearning = typeof agentLearnings.$inferSelect;


/**
 * Agent Performance Metrics - Historical performance tracking
 * Based on mb.md Section 13.5
 */
export const agentPerformanceMetrics = pgTable("agent_performance_metrics", {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id", { length: 100 }).notNull(),
  metricType: varchar("metric_type", { length: 50 }).notNull(), // 'task_completion', 'response_time', 'success_rate'
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  metadata: jsonb("metadata"),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});

export const insertAgentPerformanceMetricSchema = createInsertSchema(agentPerformanceMetrics).omit({
  id: true,
  recordedAt: true,
}).extend({
  metadata: z.record(z.any()).optional(),
});

export type InsertAgentPerformanceMetric = z.infer<typeof insertAgentPerformanceMetricSchema>;
export type AgentPerformanceMetric = typeof agentPerformanceMetrics.$inferSelect;


// ═══════════════════════════════════════════════════════════════════
// ML & INTELLIGENCE SYSTEMS
// ═══════════════════════════════════════════════════════════════════

/**
 * ML Predictions - AI-generated predictions for routing and recommendations
 * Based on mb.md Section 13.4
 */
export const mlPredictions = pgTable("ml_predictions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  predictionType: varchar("prediction_type", { length: 50 }).notNull(), // 'next_action', 'agent_assignment', 'feature_recommendation'
  input: jsonb("input").notNull(), // Context used for prediction
  prediction: jsonb("prediction").notNull(), // Predicted output
  confidence: integer("confidence").default(0).notNull(), // 0-100
  wasCorrect: boolean("was_correct"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  verifiedAt: timestamp("verified_at"),
});

export const insertMlPredictionSchema = createInsertSchema(mlPredictions).omit({
  id: true,
  createdAt: true,
}).extend({
  input: z.record(z.any()),
  prediction: z.record(z.any()),
});

export type InsertMlPrediction = z.infer<typeof insertMlPredictionSchema>;
export type MlPrediction = typeof mlPredictions.$inferSelect;


/**
 * User Behavior Patterns - Track user activity for ML predictions
 * Based on mb.md Section 14.2
 */
export const userBehaviorPatterns = pgTable("user_behavior_patterns", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  patternType: varchar("pattern_type", { length: 50 }).notNull(), // 'navigation', 'feature_usage', 'timing'
  patternData: jsonb("pattern_data").notNull(),
  frequency: integer("frequency").default(1).notNull(),
  lastOccurrence: timestamp("last_occurrence").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserBehaviorPatternSchema = createInsertSchema(userBehaviorPatterns).omit({
  id: true,
  createdAt: true,
}).extend({
  patternData: z.record(z.any()),
});

export type InsertUserBehaviorPattern = z.infer<typeof insertUserBehaviorPatternSchema>;
export type UserBehaviorPattern = typeof userBehaviorPatterns.$inferSelect;


// ═══════════════════════════════════════════════════════════════════
// ERROR TRACKING & LEARNING
// ═══════════════════════════════════════════════════════════════════

/**
 * Failed Actions - Track errors and failures for learning
 * Based on mb.md Section 13.1
 */
export const failedActions = pgTable("failed_actions", {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id", { length: 100 }),
  userId: varchar("user_id"),
  actionType: varchar("action_type", { length: 100 }).notNull(),
  errorMessage: text("error_message").notNull(),
  stackTrace: text("stack_trace"),
  context: jsonb("context"),
  resolved: boolean("resolved").default(false).notNull(),
  resolutionNotes: text("resolution_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertFailedActionSchema = createInsertSchema(failedActions).omit({
  id: true,
  createdAt: true,
}).extend({
  context: z.record(z.any()).optional(),
});

export type InsertFailedAction = z.infer<typeof insertFailedActionSchema>;
export type FailedAction = typeof failedActions.$inferSelect;


/**
 * Failure Patterns - Aggregated failure analysis
 * Based on mb.md Section 13.1
 */
export const failurePatterns = pgTable("failure_patterns", {
  id: serial("id").primaryKey(),
  patternType: varchar("pattern_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  occurrenceCount: integer("occurrence_count").default(1).notNull(),
  affectedAgents: jsonb("affected_agents").default([]).notNull(),
  recommendation: text("recommendation"),
  severity: varchar("severity", { length: 20 }).default('medium').notNull(), // 'low', 'medium', 'high', 'critical'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFailurePatternSchema = createInsertSchema(failurePatterns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  affectedAgents: z.array(z.string()).default([]),
});

export type InsertFailurePattern = z.infer<typeof insertFailurePatternSchema>;
export type FailurePattern = typeof failurePatterns.$inferSelect;


// ═══════════════════════════════════════════════════════════════════
// AI COST TRACKING
// ═══════════════════════════════════════════════════════════════════

/**
 * AI Usage Metrics - Track AI costs and model usage
 * Based on mb.md Section 6.4
 */
export const aiUsageMetrics = pgTable("ai_usage_metrics", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  model: varchar("model", { length: 50 }).notNull(), // 'gemini-flash', 'gemini-pro', 'claude-sonnet', 'gpt-4o'
  tokens: integer("tokens").notNull(),
  cost: decimal("cost", { precision: 10, scale: 6 }).notNull(), // USD
  requestType: varchar("request_type", { length: 50 }).notNull(), // 'chat', 'code_generation', 'reasoning'
  agentId: varchar("agent_id", { length: 100 }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiUsageMetricSchema = createInsertSchema(aiUsageMetrics).omit({
  id: true,
  createdAt: true,
}).extend({
  metadata: z.record(z.any()).optional(),
});

export type InsertAiUsageMetric = z.infer<typeof insertAiUsageMetricSchema>;
export type AiUsageMetric = typeof aiUsageMetrics.$inferSelect;
