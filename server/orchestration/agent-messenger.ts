import { db } from '../db';
import { agentCollaboration, agentTasks, type InsertAgentCollaboration } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { Server as SocketIOServer } from 'socket.io';

/**
 * Agent Messenger - Inter-agent communication system
 * Reference: mb.md Section 2.2 & 4.3 (Agent Communication Protocols)
 * 
 * Handles:
 * - Agent-to-agent messaging
 * - Task handoffs between agents
 * - Real-time WebSocket broadcasts
 * - Priority-based message routing
 */

export type MessageType = 
  | 'task_assignment'
  | 'task_handoff'
  | 'status_update'
  | 'request_help'
  | 'consensus_request'
  | 'learning_share'
  | 'error_notification';

export interface AgentMessage {
  fromAgentId: string;
  toAgentId: string;
  messageType: MessageType;
  payload: Record<string, any>;
  priority: number; // 1-10
}

export class AgentMessenger {
  private wsServer: SocketIOServer | null = null;

  constructor(wsServer?: SocketIOServer) {
    this.wsServer = wsServer || null;
  }

  /**
   * Set WebSocket server for real-time broadcasts
   */
  setWebSocketServer(wsServer: SocketIOServer) {
    this.wsServer = wsServer;
  }

  /**
   * Send message from one agent to another
   * Includes WebSocket broadcast for real-time updates
   */
  async sendMessage(message: AgentMessage): Promise<number> {
    // Save to database
    const [saved] = await db.insert(agentCollaboration).values({
      fromAgentId: message.fromAgentId,
      toAgentId: message.toAgentId,
      messageType: message.messageType,
      payload: message.payload,
      priority: message.priority,
      read: false
    }).returning();
    
    // Broadcast via WebSocket to subscribed clients
    if (this.wsServer) {
      this.wsServer.to(`agent:${message.toAgentId}`).emit('agent:message', {
        id: saved.id,
        ...message,
        timestamp: saved.createdAt
      });
      
      // Also broadcast to general monitoring clients
      this.wsServer.emit('agent:collaboration', {
        id: saved.id,
        from: message.fromAgentId,
        to: message.toAgentId,
        type: message.messageType,
        priority: message.priority,
        timestamp: saved.createdAt
      });
    }
    
    // If high priority (8+), could trigger additional notifications
    if (message.priority >= 8) {
      await this.notifyUrgent(message);
    }
    
    return saved.id;
  }

  /**
   * Task handoff between agents
   * Example: Agent #131 (Vibe Coding) → Agent #79 (QA)
   * 
   * This is a critical pattern in Mr Blue's workflow:
   * 1. Agent completes their work
   * 2. Hands off to next agent in pipeline
   * 3. Includes context and completed work
   * 4. Updates task assignment in database
   */
  async handoffTask(
    fromAgent: string,
    toAgent: string,
    taskId: number,
    context: {
      completedWork?: string[];
      nextSteps?: string;
      notes?: string;
      [key: string]: any;
    }
  ): Promise<void> {
    // Send handoff message
    await this.sendMessage({
      fromAgentId: fromAgent,
      toAgentId: toAgent,
      messageType: 'task_handoff',
      payload: {
        taskId,
        completedWork: context.completedWork || [],
        nextSteps: context.nextSteps || '',
        notes: context.notes || '',
        ...context
      },
      priority: 9 // High priority for task handoffs
    });
    
    // Update task assignment in database
    await db.update(agentTasks)
      .set({
        assignedAgent: toAgent,
        status: 'assigned'
      })
      .where(eq(agentTasks.id, taskId));
    
    // Broadcast task update via WebSocket
    if (this.wsServer) {
      this.wsServer.emit('task:updated', {
        taskId,
        assignedAgent: toAgent,
        status: 'assigned',
        handoffFrom: fromAgent
      });
    }
  }

  /**
   * Get all unread messages for an agent
   */
  async getUnreadMessages(agentId: string): Promise<any[]> {
    return await db.select()
      .from(agentCollaboration)
      .where(
        eq(agentCollaboration.toAgentId, agentId)
      )
      .orderBy(agentCollaboration.priority);
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: number): Promise<void> {
    await db.update(agentCollaboration)
      .set({ read: true })
      .where(eq(agentCollaboration.id, messageId));
  }

  /**
   * Request help from another agent (escalation pattern)
   * Used when agent encounters problem it can't solve
   */
  async requestHelp(
    fromAgent: string,
    toAgent: string,
    issue: {
      taskId?: number;
      problem: string;
      attemptedSolutions?: string[];
      urgency: 'low' | 'medium' | 'high' | 'critical';
    }
  ): Promise<void> {
    const priorityMap = {
      'low': 4,
      'medium': 6,
      'high': 8,
      'critical': 10
    };
    
    await this.sendMessage({
      fromAgentId: fromAgent,
      toAgentId: toAgent,
      messageType: 'request_help',
      payload: issue,
      priority: priorityMap[issue.urgency]
    });
  }

  /**
   * Share learning between agents (peer learning pattern)
   * Example: Agent #131 discovers a better approach, shares with Agent #30
   */
  async shareLearning(
    fromAgent: string,
    toAgents: string[], // Can broadcast to multiple agents
    learning: {
      category: string;
      pattern: string;
      successRate?: number;
      applicableTo?: string[];
    }
  ): Promise<void> {
    // Send to each agent
    await Promise.all(
      toAgents.map(toAgent =>
        this.sendMessage({
          fromAgentId: fromAgent,
          toAgentId: toAgent,
          messageType: 'learning_share',
          payload: learning,
          priority: 5 // Medium priority for learning
        })
      )
    );
  }

  /**
   * Consensus request - ask multiple agents to vote/decide
   * Reference: mb.md Section 4.4 (Consensus Mechanisms)
   */
  async requestConsensus(
    fromAgent: string,
    agents: string[],
    decision: {
      question: string;
      options: string[];
      context?: any;
      deadline?: Date;
    }
  ): Promise<number[]> {
    // Send consensus request to each agent
    const messageIds = await Promise.all(
      agents.map(toAgent =>
        this.sendMessage({
          fromAgentId: fromAgent,
          toAgentId: toAgent,
          messageType: 'consensus_request',
          payload: decision,
          priority: 7 // Important but not urgent
        })
      )
    );
    
    return messageIds;
  }

  /**
   * Handle urgent notifications (priority 8+)
   * Could trigger alerts, escalations, etc.
   */
  private async notifyUrgent(message: AgentMessage): Promise<void> {
    // In production, this might:
    // - Send email/SMS alerts
    // - Trigger escalation workflows
    // - Create incident tickets
    
    console.log(`URGENT MESSAGE: ${message.messageType} from ${message.fromAgentId} to ${message.toAgentId}`);
    
    // Broadcast to monitoring dashboard
    if (this.wsServer) {
      this.wsServer.emit('alert:urgent', {
        from: message.fromAgentId,
        to: message.toAgentId,
        type: message.messageType,
        priority: message.priority,
        timestamp: new Date()
      });
    }
  }

  /**
   * Get message statistics for an agent
   * Useful for performance monitoring and analytics
   */
  async getMessageStats(agentId: string): Promise<{
    sent: number;
    received: number;
    unread: number;
    byType: Record<string, number>;
  }> {
    const sent = await db.select()
      .from(agentCollaboration)
      .where(eq(agentCollaboration.fromAgentId, agentId));
    
    const received = await db.select()
      .from(agentCollaboration)
      .where(eq(agentCollaboration.toAgentId, agentId));
    
    const unread = received.filter(m => !m.read).length;
    
    // Group by message type
    const byType = received.reduce((acc, msg) => {
      acc[msg.messageType] = (acc[msg.messageType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      sent: sent.length,
      received: received.length,
      unread,
      byType
    };
  }
}
