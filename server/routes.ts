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
  // HEALTH CHECK
  // ═══════════════════════════════════════════════════════════════════

  app.get('/api/health', async (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date(),
      websocket: io ? 'connected' : 'disconnected',
      database: 'connected'
    });
  });

  console.log('[Server] All agent API routes registered');
  console.log('[WebSocket] Real-time communication server initialized');

  return httpServer;
}
