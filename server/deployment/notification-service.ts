/**
 * User Notification Service - Phase 5 Track B
 * Agent #135: User Communication Specialist
 * 
 * Manages notifications for:
 * - Beta program enrollment
 * - Feature rollout announcements
 * - System alerts
 * - Deployment updates
 * - Performance issues
 */

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationChannel = 'in-app' | 'email' | 'webhook';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export class NotificationService {
  private notifications: Map<string, Notification> = new Map();

  /**
   * Send notification to user
   */
  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      channel?: NotificationChannel;
      actionUrl?: string;
      metadata?: Record<string, unknown>;
    }
  ): Promise<Notification> {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      channel: options?.channel || 'in-app',
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: options?.actionUrl,
      metadata: options?.metadata
    };

    this.notifications.set(notification.id, notification);

    // In production, this would send via email/SMS/webhook
    console.log(`[Notification] Sent ${type} to ${userId}: ${title}`);

    return notification;
  }

  /**
   * Send beta enrollment notification
   */
  async notifyBetaEnrollment(userId: string): Promise<Notification> {
    return this.sendNotification(
      userId,
      'success',
      '🎉 Welcome to Mr Blue Beta!',
      'You have been selected for early access to agent orchestration and AI routing features. Explore the new capabilities in your dashboard.',
      {
        actionUrl: '/dashboard',
        metadata: { enrollmentDate: new Date().toISOString() }
      }
    );
  }

  /**
   * Send feature launch notification
   */
  async notifyFeatureLaunch(
    userId: string,
    featureName: string,
    description: string
  ): Promise<Notification> {
    return this.sendNotification(
      userId,
      'info',
      `New Feature: ${featureName}`,
      description,
      {
        actionUrl: '/features',
        metadata: { feature: featureName }
      }
    );
  }

  /**
   * Send system alert notification
   */
  async notifySystemAlert(
    userId: string,
    severity: 'warning' | 'error',
    alertMessage: string
  ): Promise<Notification> {
    return this.sendNotification(
      userId,
      severity,
      'System Alert',
      alertMessage,
      {
        actionUrl: '/health',
        metadata: { severity }
      }
    );
  }

  /**
   * Send deployment update notification
   */
  async notifyDeployment(
    userId: string,
    version: string,
    changes: string[]
  ): Promise<Notification> {
    return this.sendNotification(
      userId,
      'info',
      `Deployment Update: v${version}`,
      `We've deployed a new version with ${changes.length} improvement(s). ${changes.slice(0, 3).join(', ')}`,
      {
        actionUrl: '/changelog',
        metadata: { version, changes }
      }
    );
  }

  /**
   * Get notifications for user
   */
  getUserNotifications(userId: string): Notification[] {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Get unread notifications for user
   */
  getUnreadNotifications(userId: string): Notification[] {
    return this.getUserNotifications(userId).filter(n => !n.read);
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.get(notificationId);
    if (!notification) return false;

    notification.read = true;
    return true;
  }

  /**
   * Mark all user notifications as read
   */
  markAllAsRead(userId: string): number {
    let count = 0;
    this.getUserNotifications(userId).forEach(notification => {
      if (!notification.read) {
        notification.read = true;
        count++;
      }
    });
    return count;
  }

  /**
   * Broadcast notification to all users
   */
  async broadcastToAll(
    type: NotificationType,
    title: string,
    message: string
  ): Promise<number> {
    // In production, query all user IDs from database
    const userIds = ['admin-1', 'beta-1', 'beta-2', 'user-1', 'user-2'];
    
    let count = 0;
    for (const userId of userIds) {
      await this.sendNotification(userId, type, title, message);
      count++;
    }

    console.log(`[Notification] Broadcast sent to ${count} users`);
    return count;
  }

  /**
   * Get notification statistics
   */
  getStats(): {
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
    byChannel: Record<NotificationChannel, number>;
  } {
    const all = Array.from(this.notifications.values());

    const byType: Record<NotificationType, number> = {
      info: 0,
      success: 0,
      warning: 0,
      error: 0
    };

    const byChannel: Record<NotificationChannel, number> = {
      'in-app': 0,
      'email': 0,
      'webhook': 0
    };

    all.forEach(n => {
      byType[n.type]++;
      byChannel[n.channel]++;
    });

    return {
      total: all.length,
      unread: all.filter(n => !n.read).length,
      byType,
      byChannel
    };
  }
}

export const notificationService = new NotificationService();
