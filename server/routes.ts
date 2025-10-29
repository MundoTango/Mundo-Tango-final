import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertAgentCapabilitySchema,
  insertAgentTaskSchema,
  insertAgentCollaborationSchema,
  insertAgentLearningSchema,
  insertAgentPerformanceMetricSchema,
  insertMlPredictionSchema,
  insertUserBehaviorPatternSchema,
  insertFailedActionSchema,
  insertFailurePatternSchema,
  insertAiUsageMetricSchema,
} from "@shared/schema";

// WebSocket server instance (will be initialized in registerRoutes)
let io: SocketIOServer | null = null;

// Helper function to broadcast agent updates via WebSocket
export function broadcastAgentUpdate(eventType: string, data: any, agentId?: string) {
  if (io) {
    const payload = { eventType, data, timestamp: new Date() };
    if (agentId) {
      // Broadcast to specific agent room and general room
      io.to(`agent-${agentId}`).emit('agent-update', payload);
    } else {
      // Broadcast to all connected clients
      io.emit('agent-update', payload);
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ═══════════════════════════════════════════════════════════════════
  // WEBSOCKET SETUP
  // ═══════════════════════════════════════════════════════════════════
  
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`[WebSocket] Client connected: ${socket.id}`);

    socket.on('subscribe-agent', (agentId: string) => {
      socket.join(`agent-${agentId}`);
      console.log(`[WebSocket] Client ${socket.id} subscribed to agent ${agentId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[WebSocket] Client disconnected: ${socket.id}`);
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // AGENT CAPABILITIES API
  // ═══════════════════════════════════════════════════════════════════

  // Get all agent capabilities
  app.get('/api/agents', async (req: Request, res: Response) => {
    try {
      const { active, specialty } = req.query;
      
      let agents;
      if (specialty) {
        agents = await storage.getAgentsBySpecialty(specialty as string);
      } else if (active === 'true') {
        agents = await storage.getActiveAgents();
      } else {
        agents = await storage.getAllAgentCapabilities();
      }
      
      res.json(agents);
    } catch (error) {
      console.error('[API] Error fetching agents:', error);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  });

  // Get single agent capability
  app.get('/api/agents/:agentId', async (req: Request, res: Response) => {
    try {
      const agent = await storage.getAgentCapability(req.params.agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      res.json(agent);
    } catch (error) {
      console.error('[API] Error fetching agent:', error);
      res.status(500).json({ error: 'Failed to fetch agent' });
    }
  });

  // Create agent capability
  app.post('/api/agents', async (req: Request, res: Response) => {
    try {
      const agentData = insertAgentCapabilitySchema.parse(req.body);
      const agent = await storage.createAgentCapability(agentData);
      broadcastAgentUpdate('agent-created', agent);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid agent data', details: error.errors });
      }
      console.error('[API] Error creating agent:', error);
      res.status(500).json({ error: 'Failed to create agent' });
    }
  });

  // Update agent capability
  app.patch('/api/agents/:agentId', async (req: Request, res: Response) => {
    try {
      // Validate partial updates with Zod
      const partialAgentSchema = insertAgentCapabilitySchema.partial();
      const updates = partialAgentSchema.parse(req.body);
      
      const agent = await storage.updateAgentCapability(req.params.agentId, updates);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      broadcastAgentUpdate('agent-updated', agent, agent.agentId);
      res.json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid update data', details: error.errors });
      }
      console.error('[API] Error updating agent:', error);
      res.status(500).json({ error: 'Failed to update agent' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // AGENT TASKS API
  // ═══════════════════════════════════════════════════════════════════

  // Get tasks (filter by buildId, agentId, or status)
  app.get('/api/tasks', async (req: Request, res: Response) => {
    try {
      const { buildId, agentId, status } = req.query;
      
      let tasks;
      if (buildId) {
        tasks = await storage.getTasksByBuildId(buildId as string);
      } else if (agentId) {
        tasks = await storage.getTasksByAgent(agentId as string);
      } else if (status) {
        tasks = await storage.getTasksByStatus(status as string);
      } else {
        tasks = await storage.getPendingTasks();
      }
      
      res.json(tasks);
    } catch (error) {
      console.error('[API] Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

  // Get single task
  app.get('/api/tasks/:id', async (req: Request, res: Response) => {
    try {
      const task = await storage.getAgentTask(parseInt(req.params.id));
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      console.error('[API] Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  });

  // Create task
  app.post('/api/tasks', async (req: Request, res: Response) => {
    try {
      const taskData = insertAgentTaskSchema.parse(req.body);
      const task = await storage.createAgentTask(taskData);
      broadcastAgentUpdate('task-created', task);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid task data', details: error.errors });
      }
      console.error('[API] Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  });

  // Update task
  app.patch('/api/tasks/:id', async (req: Request, res: Response) => {
    try {
      // Validate partial updates with Zod
      const partialTaskSchema = insertAgentTaskSchema.partial();
      const updates = partialTaskSchema.parse(req.body);
      
      const task = await storage.updateAgentTask(parseInt(req.params.id), updates);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Broadcast to task's assigned agent if available
      broadcastAgentUpdate('task-updated', task, task.assignedAgent || undefined);
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid update data', details: error.errors });
      }
      console.error('[API] Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

  // Assign task to agent
  app.post('/api/tasks/:id/assign', async (req: Request, res: Response) => {
    try {
      // Validate assignment payload
      const assignSchema = z.object({
        agentId: z.string().min(1)
      });
      const { agentId } = assignSchema.parse(req.body);
      
      const task = await storage.assignTaskToAgent(parseInt(req.params.id), agentId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Broadcast to the assigned agent's room
      broadcastAgentUpdate('task-assigned', task, agentId);
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid assignment data', details: error.errors });
      }
      console.error('[API] Error assigning task:', error);
      res.status(500).json({ error: 'Failed to assign task' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // AGENT COLLABORATION API
  // ═══════════════════════════════════════════════════════════════════

  // Get messages for an agent
  app.get('/api/messages/:agentId', async (req: Request, res: Response) => {
    try {
      const { unreadOnly } = req.query;
      const messages = await storage.getAgentMessages(
        req.params.agentId,
        unreadOnly === 'true'
      );
      res.json(messages);
    } catch (error) {
      console.error('[API] Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  // Send message to agent
  app.post('/api/messages', async (req: Request, res: Response) => {
    try {
      const messageData = insertAgentCollaborationSchema.parse(req.body);
      const message = await storage.sendAgentMessage(messageData);
      
      // Notify recipient agent via WebSocket
      if (io) {
        io.to(`agent-${message.toAgentId}`).emit('new-message', message);
      }
      
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid message data', details: error.errors });
      }
      console.error('[API] Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  // Mark message as read
  app.patch('/api/messages/:id/read', async (req: Request, res: Response) => {
    try {
      // No body validation needed for this endpoint - ID from URL is sufficient
      await storage.markMessageAsRead(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error('[API] Error marking message as read:', error);
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // AGENT LEARNING API
  // ═══════════════════════════════════════════════════════════════════

  // Get learnings for an agent
  app.get('/api/learnings/:agentId', async (req: Request, res: Response) => {
    try {
      const { minConfidence } = req.query;
      const learnings = await storage.getAgentLearnings(
        req.params.agentId,
        minConfidence ? parseInt(minConfidence as string) : 0
      );
      res.json(learnings);
    } catch (error) {
      console.error('[API] Error fetching learnings:', error);
      res.status(500).json({ error: 'Failed to fetch learnings' });
    }
  });

  // Create learning
  app.post('/api/learnings', async (req: Request, res: Response) => {
    try {
      const learningData = insertAgentLearningSchema.parse(req.body);
      const learning = await storage.createAgentLearning(learningData);
      broadcastAgentUpdate('learning-created', learning);
      res.status(201).json(learning);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid learning data', details: error.errors });
      }
      console.error('[API] Error creating learning:', error);
      res.status(500).json({ error: 'Failed to create learning' });
    }
  });

  // Increment learning usage
  app.post('/api/learnings/:id/apply', async (req: Request, res: Response) => {
    try {
      // No body validation needed - ID from URL is sufficient
      await storage.incrementLearningUsage(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error('[API] Error incrementing learning usage:', error);
      res.status(500).json({ error: 'Failed to increment learning usage' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // AGENT PERFORMANCE METRICS API
  // ═══════════════════════════════════════════════════════════════════

  // Get metrics for an agent
  app.get('/api/metrics/:agentId', async (req: Request, res: Response) => {
    try {
      const { metricType } = req.query;
      const metrics = await storage.getAgentMetrics(
        req.params.agentId,
        metricType as string
      );
      res.json(metrics);
    } catch (error) {
      console.error('[API] Error fetching metrics:', error);
      res.status(500).json({ error: 'Failed to fetch metrics' });
    }
  });

  // Record metric
  app.post('/api/metrics', async (req: Request, res: Response) => {
    try {
      const metricData = insertAgentPerformanceMetricSchema.parse(req.body);
      const metric = await storage.recordAgentMetric(metricData);
      res.status(201).json(metric);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid metric data', details: error.errors });
      }
      console.error('[API] Error recording metric:', error);
      res.status(500).json({ error: 'Failed to record metric' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // ML PREDICTIONS API
  // ═══════════════════════════════════════════════════════════════════

  // Create prediction
  app.post('/api/predictions', async (req: Request, res: Response) => {
    try {
      const predictionData = insertMlPredictionSchema.parse(req.body);
      const prediction = await storage.createMlPrediction(predictionData);
      res.status(201).json(prediction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid prediction data', details: error.errors });
      }
      console.error('[API] Error creating prediction:', error);
      res.status(500).json({ error: 'Failed to create prediction' });
    }
  });

  // Verify prediction
  app.patch('/api/predictions/:id/verify', async (req: Request, res: Response) => {
    try {
      // Validate verification payload
      const verifySchema = z.object({
        wasCorrect: z.boolean()
      });
      const { wasCorrect } = verifySchema.parse(req.body);
      
      await storage.verifyPrediction(parseInt(req.params.id), wasCorrect);
      res.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid verification data', details: error.errors });
      }
      console.error('[API] Error verifying prediction:', error);
      res.status(500).json({ error: 'Failed to verify prediction' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // USER BEHAVIOR API
  // ═══════════════════════════════════════════════════════════════════

  // Record user behavior
  app.post('/api/behavior', async (req: Request, res: Response) => {
    try {
      const behaviorData = insertUserBehaviorPatternSchema.parse(req.body);
      const behavior = await storage.recordUserBehavior(behaviorData);
      res.status(201).json(behavior);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid behavior data', details: error.errors });
      }
      console.error('[API] Error recording behavior:', error);
      res.status(500).json({ error: 'Failed to record behavior' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // ERROR TRACKING API
  // ═══════════════════════════════════════════════════════════════════

  // Record failed action
  app.post('/api/errors/actions', async (req: Request, res: Response) => {
    try {
      const actionData = insertFailedActionSchema.parse(req.body);
      const action = await storage.recordFailedAction(actionData);
      res.status(201).json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid action data', details: error.errors });
      }
      console.error('[API] Error recording failed action:', error);
      res.status(500).json({ error: 'Failed to record failed action' });
    }
  });

  // Record failure pattern
  app.post('/api/errors/patterns', async (req: Request, res: Response) => {
    try {
      const patternData = insertFailurePatternSchema.parse(req.body);
      const pattern = await storage.recordFailurePattern(patternData);
      res.status(201).json(pattern);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid pattern data', details: error.errors });
      }
      console.error('[API] Error recording failure pattern:', error);
      res.status(500).json({ error: 'Failed to record failure pattern' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // AI USAGE METRICS API
  // ═══════════════════════════════════════════════════════════════════

  // Record AI usage
  app.post('/api/ai-usage', async (req: Request, res: Response) => {
    try {
      const usageData = insertAiUsageMetricSchema.parse(req.body);
      const usage = await storage.recordAiUsage(usageData);
      res.status(201).json(usage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid usage data', details: error.errors });
      }
      console.error('[API] Error recording AI usage:', error);
      res.status(500).json({ error: 'Failed to record AI usage' });
    }
  });

  // Get AI usage stats
  app.get('/api/ai-usage/stats', async (req: Request, res: Response) => {
    try {
      const { userId, days } = req.query;
      const stats = await storage.getAiUsageStats(
        userId as string,
        days ? parseInt(days as string) : 30
      );
      res.json(stats);
    } catch (error) {
      console.error('[API] Error fetching AI usage stats:', error);
      res.status(500).json({ error: 'Failed to fetch AI usage stats' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // MULTI-AGENT ORCHESTRATION SYSTEM
  // Phase 2: Core orchestration endpoints
  // ═══════════════════════════════════════════════════════════════════

  const { TaskOrchestrator } = await import('./orchestration/task-orchestrator');
  const { ModelRouter } = await import('./ai/model-router');
  const { AgentMessenger } = await import('./orchestration/agent-messenger');

  const orchestrator = new TaskOrchestrator();
  const modelRouter = new ModelRouter();
  const messenger = new AgentMessenger(io || undefined);

  // Decompose user request into sub-tasks
  app.post('/api/orchestration/decompose', async (req: Request, res: Response) => {
    try {
      const { request, userId } = req.body;
      if (!request || !userId) {
        return res.status(400).json({ error: 'request and userId are required' });
      }

      const decomposition = await orchestrator.decompose(request, userId);
      res.json(decomposition);
    } catch (error) {
      console.error('[API] Error decomposing task:', error);
      res.status(500).json({ error: 'Failed to decompose task' });
    }
  });

  // Assign sub-tasks to agents
  app.post('/api/orchestration/assign', async (req: Request, res: Response) => {
    try {
      const { decomposition, userId } = req.body;
      if (!decomposition || !userId) {
        return res.status(400).json({ error: 'decomposition and userId are required' });
      }

      const assignments = await orchestrator.assignTasks(decomposition, userId);
      res.json(assignments);
    } catch (error) {
      console.error('[API] Error assigning tasks:', error);
      res.status(500).json({ error: 'Failed to assign tasks' });
    }
  });

  // Execute task graph in parallel
  app.post('/api/orchestration/execute', async (req: Request, res: Response) => {
    try {
      const { buildId } = req.body;
      if (!buildId) {
        return res.status(400).json({ error: 'buildId is required' });
      }

      // Execute async (don't wait for completion)
      orchestrator.executeParallel(buildId).catch(err => 
        console.error('[Orchestration] Execution error:', err)
      );

      res.json({ status: 'executing', buildId });
    } catch (error) {
      console.error('[API] Error starting execution:', error);
      res.status(500).json({ error: 'Failed to start execution' });
    }
  });

  // Get orchestration status
  app.get('/api/orchestration/status/:buildId', async (req: Request, res: Response) => {
    try {
      const tasks = await storage.getTasksByBuildId(req.params.buildId);
      const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        in_progress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        failed: tasks.filter(t => t.status === 'failed').length,
        tasks
      };
      res.json(stats);
    } catch (error) {
      console.error('[API] Error fetching orchestration status:', error);
      res.status(500).json({ error: 'Failed to fetch status' });
    }
  });

  // Get optimal AI model for task type
  app.post('/api/ai/route-model', async (req: Request, res: Response) => {
    try {
      const { taskType, budget } = req.body;
      if (!taskType) {
        return res.status(400).json({ error: 'taskType is required' });
      }

      const selection = modelRouter.selectModel(taskType, budget);
      res.json(selection);
    } catch (error) {
      console.error('[API] Error routing model:', error);
      res.status(500).json({ error: 'Failed to route model' });
    }
  });

  // Get cost savings stats
  app.get('/api/ai/cost-savings', async (req: Request, res: Response) => {
    try {
      const savings = await modelRouter.calculateCostSavings();
      res.json(savings);
    } catch (error) {
      console.error('[API] Error calculating cost savings:', error);
      res.status(500).json({ error: 'Failed to calculate cost savings' });
    }
  });

  // Get usage statistics
  app.get('/api/ai/usage-distribution', async (req: Request, res: Response) => {
    try {
      const stats = await modelRouter.getUsageStats();
      res.json(stats);
    } catch (error) {
      console.error('[API] Error fetching usage stats:', error);
      res.status(500).json({ error: 'Failed to fetch usage stats' });
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 5: DEPLOYMENT & ROLLOUT ENDPOINTS
  // ═══════════════════════════════════════════════════════════════════

  // Enhanced health check with comprehensive diagnostics
  app.get('/api/health', async (req: Request, res: Response) => {
    try {
      const { healthCheckService } = await import('./deployment/health-check');
      const healthStatus = await healthCheckService.runHealthChecks();
      res.json(healthStatus);
    } catch (error) {
      res.status(500).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      });
    }
  });

  // Feature flags - Get flags for user
  app.get('/api/deployment/feature-flags/:userId', async (req: Request, res: Response) => {
    try {
      const { featureFlagService } = await import('./deployment/feature-flags');
      const { userId } = req.params;
      const flags = await featureFlagService.getFlagsForUser(userId);
      res.json(flags);
    } catch (error) {
      console.error('[API] Error fetching feature flags:', error);
      res.status(500).json({ error: 'Failed to fetch feature flags' });
    }
  });

  // Feature flags - Check specific feature
  app.get('/api/deployment/feature-flags/:userId/:feature', async (req: Request, res: Response) => {
    try {
      const { featureFlagService } = await import('./deployment/feature-flags');
      const { userId, feature } = req.params;
      const enabled = await featureFlagService.isFeatureEnabled(userId, feature as any);
      res.json({ enabled });
    } catch (error) {
      console.error('[API] Error checking feature flag:', error);
      res.status(500).json({ error: 'Failed to check feature flag' });
    }
  });

  // Metrics - Get current system metrics
  app.get('/api/deployment/metrics', async (req: Request, res: Response) => {
    try {
      const { metricsCollector } = await import('./deployment/metrics-collector');
      const metrics = await metricsCollector.collectMetrics();
      res.json(metrics);
    } catch (error) {
      console.error('[API] Error collecting metrics:', error);
      res.status(500).json({ error: 'Failed to collect metrics' });
    }
  });

  // Metrics - Check deployment thresholds
  app.get('/api/deployment/metrics/thresholds', async (req: Request, res: Response) => {
    try {
      const { metricsCollector } = await import('./deployment/metrics-collector');
      const thresholds = await metricsCollector.checkDeploymentThresholds();
      res.json(thresholds);
    } catch (error) {
      console.error('[API] Error checking thresholds:', error);
      res.status(500).json({ error: 'Failed to check thresholds' });
    }
  });

  // Rollback - Check rollback conditions
  app.get('/api/deployment/rollback/status', async (req: Request, res: Response) => {
    try {
      const { rollbackCoordinator } = await import('./deployment/rollback-coordinator');
      const decision = await rollbackCoordinator.checkRollbackConditions();
      res.json(decision);
    } catch (error) {
      console.error('[API] Error checking rollback conditions:', error);
      res.status(500).json({ error: 'Failed to check rollback conditions' });
    }
  });

  // Rollback - Manual trigger
  app.post('/api/deployment/rollback', async (req: Request, res: Response) => {
    try {
      const { rollbackCoordinator } = await import('./deployment/rollback-coordinator');
      const { reason } = req.body;
      await rollbackCoordinator.manualRollback(reason || 'Manual rollback requested');
      res.json({ success: true, message: 'Rollback initiated' });
    } catch (error) {
      console.error('[API] Error initiating rollback:', error);
      res.status(500).json({ error: 'Failed to initiate rollback' });
    }
  });

  // Alerts - Get active alerts
  app.get('/api/deployment/alerts', async (req: Request, res: Response) => {
    try {
      const { alertManager } = await import('./deployment/alert-manager');
      const alerts = alertManager.getActiveAlerts();
      res.json(alerts);
    } catch (error) {
      console.error('[API] Error fetching alerts:', error);
      res.status(500).json({ error: 'Failed to fetch alerts' });
    }
  });

  // Alerts - Get summary
  app.get('/api/deployment/alerts/summary', async (req: Request, res: Response) => {
    try {
      const { alertManager } = await import('./deployment/alert-manager');
      const summary = alertManager.getSummary();
      res.json(summary);
    } catch (error) {
      console.error('[API] Error fetching alert summary:', error);
      res.status(500).json({ error: 'Failed to fetch alert summary' });
    }
  });

  // Alerts - Acknowledge alert
  app.post('/api/deployment/alerts/:alertId/acknowledge', async (req: Request, res: Response) => {
    try {
      const { alertManager } = await import('./deployment/alert-manager');
      const { alertId } = req.params;
      const success = alertManager.acknowledgeAlert(alertId);
      res.json({ success });
    } catch (error) {
      console.error('[API] Error acknowledging alert:', error);
      res.status(500).json({ error: 'Failed to acknowledge alert' });
    }
  });

  // Deployment Safety - Run pre-flight checks
  app.get('/api/deployment/safety/preflight', async (req: Request, res: Response) => {
    try {
      const { deploymentSafety } = await import('./deployment/deployment-safety');
      const readiness = await deploymentSafety.runPreFlightChecks();
      res.json(readiness);
    } catch (error) {
      console.error('[API] Error running pre-flight checks:', error);
      res.status(500).json({ error: 'Failed to run pre-flight checks' });
    }
  });

  // Deployment Safety - Get report
  app.get('/api/deployment/safety/report', async (req: Request, res: Response) => {
    try {
      const { deploymentSafety } = await import('./deployment/deployment-safety');
      const report = await deploymentSafety.generateReport();
      res.set('Content-Type', 'text/plain');
      res.send(report);
    } catch (error) {
      console.error('[API] Error generating deployment report:', error);
      res.status(500).json({ error: 'Failed to generate deployment report' });
    }
  });

  // User Segmentation - Get user segment
  app.get('/api/deployment/segmentation/:userId', async (req: Request, res: Response) => {
    try {
      const { userSegmentation } = await import('./deployment/user-segmentation');
      const { userId } = req.params;
      const segment = userSegmentation.getUserSegment(userId);
      res.json({ userId, segment });
    } catch (error) {
      console.error('[API] Error getting user segment:', error);
      res.status(500).json({ error: 'Failed to get user segment' });
    }
  });

  // User Segmentation - Promote to beta
  app.post('/api/deployment/segmentation/:userId/promote-beta', async (req: Request, res: Response) => {
    try {
      const { userSegmentation } = await import('./deployment/user-segmentation');
      const { userId } = req.params;
      const result = userSegmentation.promoteToBeta(userId);
      res.json(result);
    } catch (error) {
      console.error('[API] Error promoting user to beta:', error);
      res.status(500).json({ error: 'Failed to promote user to beta' });
    }
  });

  // User Segmentation - Get rollout stats
  app.get('/api/deployment/segmentation/stats', async (req: Request, res: Response) => {
    try {
      const { userSegmentation } = await import('./deployment/user-segmentation');
      const stats = userSegmentation.getRolloutStats();
      res.json(stats);
    } catch (error) {
      console.error('[API] Error getting rollout stats:', error);
      res.status(500).json({ error: 'Failed to get rollout stats' });
    }
  });

  // Performance Analysis - Run analysis
  app.get('/api/deployment/performance/analyze', async (req: Request, res: Response) => {
    try {
      const { performanceAnalyzer } = await import('./deployment/performance-analyzer');
      const report = await performanceAnalyzer.analyzePerformance();
      res.json(report);
    } catch (error) {
      console.error('[API] Error analyzing performance:', error);
      res.status(500).json({ error: 'Failed to analyze performance' });
    }
  });

  // Performance Analysis - Get text report
  app.get('/api/deployment/performance/report', async (req: Request, res: Response) => {
    try {
      const { performanceAnalyzer } = await import('./deployment/performance-analyzer');
      const report = await performanceAnalyzer.generateTextReport();
      res.set('Content-Type', 'text/plain');
      res.send(report);
    } catch (error) {
      console.error('[API] Error generating performance report:', error);
      res.status(500).json({ error: 'Failed to generate performance report' });
    }
  });

  // Grafana Dashboards - Export all dashboards
  app.get('/api/deployment/grafana/dashboards', async (req: Request, res: Response) => {
    try {
      const { exportDashboardsForGrafana } = await import('./deployment/grafana-dashboards');
      const dashboards = exportDashboardsForGrafana();
      res.json(dashboards);
    } catch (error) {
      console.error('[API] Error exporting Grafana dashboards:', error);
      res.status(500).json({ error: 'Failed to export Grafana dashboards' });
    }
  });

  // Grafana Dashboards - Generate config for specific dashboard
  app.get('/api/deployment/grafana/dashboards/:name/config', async (req: Request, res: Response) => {
    try {
      const { exportDashboardsForGrafana, generateGrafanaConfig } = await import('./deployment/grafana-dashboards');
      const dashboards = exportDashboardsForGrafana();
      const dashboard = dashboards[req.params.name as keyof typeof dashboards];
      
      if (!dashboard) {
        return res.status(404).json({ error: 'Dashboard not found' });
      }

      const config = generateGrafanaConfig(dashboard);
      res.set('Content-Type', 'application/json');
      res.send(config);
    } catch (error) {
      console.error('[API] Error generating Grafana config:', error);
      res.status(500).json({ error: 'Failed to generate Grafana config' });
    }
  });

  // Database Migration - Execute migration
  app.post('/api/deployment/migration/execute', async (req: Request, res: Response) => {
    try {
      const { dbMigrationService } = await import('./deployment/database-migration');
      const { name, sql } = req.body;
      const result = await dbMigrationService.executeMigration(name, sql);
      res.json(result);
    } catch (error) {
      console.error('[API] Error executing migration:', error);
      res.status(500).json({ error: 'Failed to execute migration' });
    }
  });

  // Database Migration - Get history
  app.get('/api/deployment/migration/history', async (req: Request, res: Response) => {
    try {
      const { dbMigrationService } = await import('./deployment/database-migration');
      const history = dbMigrationService.getMigrationHistory();
      res.json(history);
    } catch (error) {
      console.error('[API] Error getting migration history:', error);
      res.status(500).json({ error: 'Failed to get migration history' });
    }
  });

  // Environment Config - Get current config
  app.get('/api/deployment/env/config', async (req: Request, res: Response) => {
    try {
      const { envConfig } = await import('./deployment/env-config');
      const config = envConfig.getConfig();
      res.json(config);
    } catch (error) {
      console.error('[API] Error getting environment config:', error);
      res.status(500).json({ error: 'Failed to get environment config' });
    }
  });

  // Environment Config - Get summary
  app.get('/api/deployment/env/summary', async (req: Request, res: Response) => {
    try {
      const { envConfig } = await import('./deployment/env-config');
      const summary = envConfig.getSummary();
      res.json(summary);
    } catch (error) {
      console.error('[API] Error getting environment summary:', error);
      res.status(500).json({ error: 'Failed to get environment summary' });
    }
  });

  // Notifications - Get user notifications
  app.get('/api/deployment/notifications/:userId', async (req: Request, res: Response) => {
    try {
      const { notificationService } = await import('./deployment/notification-service');
      const { userId } = req.params;
      const notifications = notificationService.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error('[API] Error getting notifications:', error);
      res.status(500).json({ error: 'Failed to get notifications' });
    }
  });

  // Notifications - Mark as read
  app.post('/api/deployment/notifications/:notificationId/read', async (req: Request, res: Response) => {
    try {
      const { notificationService } = await import('./deployment/notification-service');
      const { notificationId } = req.params;
      const success = notificationService.markAsRead(notificationId);
      res.json({ success });
    } catch (error) {
      console.error('[API] Error marking notification as read:', error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  });

  // Deployment Automation - Execute deployment
  app.post('/api/deployment/automation/deploy', async (req: Request, res: Response) => {
    try {
      const { deploymentAutomation } = await import('./deployment/deployment-automation');
      const { version } = req.body;
      const result = await deploymentAutomation.deploy(version || '1.0.0');
      res.json(result);
    } catch (error) {
      console.error('[API] Error executing deployment:', error);
      res.status(500).json({ error: 'Failed to execute deployment' });
    }
  });

  // Deployment Automation - Get history
  app.get('/api/deployment/automation/history', async (req: Request, res: Response) => {
    try {
      const { deploymentAutomation } = await import('./deployment/deployment-automation');
      const history = deploymentAutomation.getDeploymentHistory();
      res.json(history);
    } catch (error) {
      console.error('[API] Error getting deployment history:', error);
      res.status(500).json({ error: 'Failed to get deployment history' });
    }
  });

  console.log('[Server] All agent API routes registered');
  console.log('[WebSocket] Real-time communication server initialized');
  console.log('[Deployment] Phase 5 deployment endpoints registered (26 endpoints)');

  return httpServer;
}
