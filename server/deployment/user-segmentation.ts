/**
 * User Segmentation System - Phase 5 Track B
 * Agent #133: User Segmentation Specialist
 * 
 * Manages beta user selection and segmentation for:
 * - Phase 5.1: Super admin only (1 user)
 * - Phase 5.2: Beta users (10-100 users)
 * - Phase 5.3: General availability (100% users)
 */

export type UserSegment = 'super_admin' | 'beta' | 'regular';

export interface UserSegmentation {
  userId: string;
  segment: UserSegment;
  enrolledAt: string;
  features: string[];
  metadata?: Record<string, unknown>;
}

export class UserSegmentationService {
  private segmentation: Map<string, UserSegmentation> = new Map();

  /**
   * Assign user to a segment
   */
  assignSegment(userId: string, segment: UserSegment): UserSegmentation {
    const userSeg: UserSegmentation = {
      userId,
      segment,
      enrolledAt: new Date().toISOString(),
      features: this.getFeaturesForSegment(segment)
    };

    this.segmentation.set(userId, userSeg);
    console.log(`[UserSegmentation] Assigned ${userId} to segment: ${segment}`);
    
    return userSeg;
  }

  /**
   * Get user's current segment
   */
  getUserSegment(userId: string): UserSegment {
    const userSeg = this.segmentation.get(userId);
    if (userSeg) {
      return userSeg.segment;
    }

    // Default to regular user if not assigned
    return 'regular';
  }

  /**
   * Get all users in a segment
   */
  getUsersBySegment(segment: UserSegment): UserSegmentation[] {
    return Array.from(this.segmentation.values())
      .filter(u => u.segment === segment);
  }

  /**
   * Get features available for a segment
   */
  private getFeaturesForSegment(segment: UserSegment): string[] {
    switch (segment) {
      case 'super_admin':
        return [
          'agentOrchestration',
          'aiRouting',
          'advancedAnalytics',
          'selfHealing',
          'realtimeDashboard',
          'deploymentTools',
          'adminPanel'
        ];
      case 'beta':
        return [
          'agentOrchestration',
          'aiRouting',
          'realtimeDashboard'
        ];
      case 'regular':
        return [];
      default:
        return [];
    }
  }

  /**
   * Promote user to beta (Phase 5.2 rollout)
   */
  promoteToBeta(userId: string): UserSegmentation {
    console.log(`[UserSegmentation] Promoting ${userId} to beta`);
    return this.assignSegment(userId, 'beta');
  }

  /**
   * Promote user to general availability (Phase 5.3)
   */
  promoteToGeneral(userId: string): UserSegmentation {
    console.log(`[UserSegmentation] Promoting ${userId} to general availability`);
    // In Phase 5.3, regular users get all features
    const userSeg = this.assignSegment(userId, 'regular');
    userSeg.features = [
      'agentOrchestration',
      'aiRouting',
      'realtimeDashboard'
    ];
    return userSeg;
  }

  /**
   * Automatic rollout schedule
   * Phase 5.1: Day 1-7 (super admin only)
   * Phase 5.2: Day 8-21 (beta users)
   * Phase 5.3: Day 22-35 (general availability)
   */
  async executeRolloutSchedule(): Promise<void> {
    const startDate = new Date('2025-10-29'); // Deployment start
    const now = new Date();
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    console.log(`[UserSegmentation] Days since deployment start: ${daysSinceStart}`);

    if (daysSinceStart < 7) {
      // Phase 5.1: Super admin only
      console.log('[UserSegmentation] Phase 5.1: Super admin access only');
      this.assignSegment('admin-1', 'super_admin');
    } else if (daysSinceStart < 21) {
      // Phase 5.2: Beta users
      console.log('[UserSegmentation] Phase 5.2: Beta user rollout');
      
      // Week 2: 10 beta users
      if (daysSinceStart < 14) {
        for (let i = 1; i <= 10; i++) {
          this.promoteToBeta(`beta-${i}`);
        }
      } 
      // Week 3: 100 beta users
      else {
        for (let i = 1; i <= 100; i++) {
          this.promoteToBeta(`beta-${i}`);
        }
      }
    } else {
      // Phase 5.3: General availability
      console.log('[UserSegmentation] Phase 5.3: General availability rollout');
      
      // Week 4: 50% of users
      if (daysSinceStart < 28) {
        console.log('[UserSegmentation] Enabling 50% of users');
        // In production, select 50% of user base
      } 
      // Week 5: 100% of users
      else {
        console.log('[UserSegmentation] Enabling 100% of users (full launch)');
        // In production, enable all users
      }
    }
  }

  /**
   * Get rollout statistics
   */
  getRolloutStats(): {
    total: number;
    bySegment: Record<UserSegment, number>;
    percentage: {
      super_admin: number;
      beta: number;
      regular: number;
    };
  } {
    const total = this.segmentation.size;
    const bySegment: Record<UserSegment, number> = {
      super_admin: 0,
      beta: 0,
      regular: 0
    };

    Array.from(this.segmentation.values()).forEach(user => {
      bySegment[user.segment]++;
    });

    return {
      total,
      bySegment,
      percentage: {
        super_admin: total > 0 ? (bySegment.super_admin / total) * 100 : 0,
        beta: total > 0 ? (bySegment.beta / total) * 100 : 0,
        regular: total > 0 ? (bySegment.regular / total) * 100 : 0
      }
    };
  }
}

export const userSegmentation = new UserSegmentationService();
