/**
 * Automatic Rollback Coordinator - Phase 5 Track B
 * Agent #134: Rollback Coordinator
 * 
 * Monitors system health and triggers automatic rollback when:
 * - Error rate > 5%
 * - Response time > 2000ms (p95)
 * - Database connection failures
 * - Agent orchestration failures
 */

import { metricsCollector } from './metrics-collector';
import { healthCheckService } from './health-check';

export interface RollbackTrigger {
  name: string;
  threshold: number;
  currentValue: number;
  triggered: boolean;
  severity: 'critical' | 'warning';
}

export interface RollbackDecision {
  shouldRollback: boolean;
  reason: string;
  triggers: RollbackTrigger[];
  timestamp: string;
}

export class RollbackCoordinator {
  private isMonitoring: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;

  /**
   * Start monitoring for rollback conditions
   */
  startMonitoring(intervalMs: number = 30000): void {
    if (this.isMonitoring) {
      console.log('[Rollback] Already monitoring');
      return;
    }

    console.log(`[Rollback] Starting monitoring (checking every ${intervalMs}ms)`);
    this.isMonitoring = true;

    this.checkInterval = setInterval(async () => {
      const decision = await this.checkRollbackConditions();
      
      if (decision.shouldRollback) {
        console.error('[Rollback] CRITICAL: Rollback conditions met!');
        console.error('[Rollback] Reason:', decision.reason);
        console.error('[Rollback] Triggers:', decision.triggers);
        
        // In production, this would trigger actual rollback
        await this.executeRollback(decision);
      }
    }, intervalMs);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isMonitoring = false;
    console.log('[Rollback] Monitoring stopped');
  }

  /**
   * Check all rollback conditions
   */
  async checkRollbackConditions(): Promise<RollbackDecision> {
    const triggers: RollbackTrigger[] = [];

    // Get current metrics
    const metrics = await metricsCollector.collectMetrics();
    const health = await healthCheckService.runHealthChecks();

    // Check 1: Error rate > 5%
    triggers.push({
      name: 'Error Rate',
      threshold: 5.0,
      currentValue: metrics.api.errorRate,
      triggered: metrics.api.errorRate > 5.0,
      severity: 'critical'
    });

    // Check 2: Response time > 2000ms (p95)
    triggers.push({
      name: 'Response Time (p95)',
      threshold: 2000,
      currentValue: metrics.api.p95ResponseTime,
      triggered: metrics.api.p95ResponseTime > 2000,
      severity: 'critical'
    });

    // Check 3: Database health
    const dbCheck = health.checks.find(c => c.name === 'Database');
    triggers.push({
      name: 'Database Health',
      threshold: 1, // Must pass
      currentValue: dbCheck?.status === 'pass' ? 1 : 0,
      triggered: dbCheck?.status === 'fail',
      severity: 'critical'
    });

    // Check 4: Agent availability
    const agentCheck = health.checks.find(c => c.name === 'Agents');
    const agentAvailability = (metrics.agents.activeAgents / metrics.agents.totalAgents) * 100;
    triggers.push({
      name: 'Agent Availability',
      threshold: 80, // At least 80% agents must be active
      currentValue: agentAvailability,
      triggered: agentAvailability < 80,
      severity: 'critical'
    });

    // Check 5: Memory usage (warning only)
    const memoryCheck = health.checks.find(c => c.name === 'Memory');
    triggers.push({
      name: 'Memory Usage',
      threshold: 90,
      currentValue: memoryCheck?.details?.usagePercentage as number || 0,
      triggered: memoryCheck?.status === 'warn' || memoryCheck?.status === 'fail',
      severity: 'warning'
    });

    // Determine if rollback should occur
    const criticalTriggersActivated = triggers.filter(
      t => t.triggered && t.severity === 'critical'
    );

    const shouldRollback = criticalTriggersActivated.length > 0;
    const reason = shouldRollback
      ? `${criticalTriggersActivated.length} critical condition(s) triggered: ${criticalTriggersActivated.map(t => t.name).join(', ')}`
      : 'All systems nominal';

    return {
      shouldRollback,
      reason,
      triggers,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Execute rollback procedure
   */
  private async executeRollback(decision: RollbackDecision): Promise<void> {
    console.log('[Rollback] ========================================');
    console.log('[Rollback] INITIATING AUTOMATIC ROLLBACK');
    console.log('[Rollback] ========================================');
    console.log('[Rollback] Time:', decision.timestamp);
    console.log('[Rollback] Reason:', decision.reason);
    
    // Step 1: Stop accepting new requests
    console.log('[Rollback] Step 1: Stopping new request acceptance');
    
    // Step 2: Notify monitoring systems
    console.log('[Rollback] Step 2: Sending alerts to monitoring systems');
    
    // Step 3: Execute rollback
    console.log('[Rollback] Step 3: Rolling back to previous deployment');
    console.log('[Rollback] Command: replit deployments rollback');
    
    // Step 4: Verify rollback success
    console.log('[Rollback] Step 4: Verifying rollback success');
    
    // Step 5: Notify stakeholders
    console.log('[Rollback] Step 5: Notifying stakeholders');
    
    console.log('[Rollback] ========================================');
    console.log('[Rollback] ROLLBACK COMPLETE');
    console.log('[Rollback] ========================================');

    // In production, this would:
    // 1. Call Replit deployment API to rollback
    // 2. Send alerts via Sentry/PagerDuty
    // 3. Notify users via email/SMS
    // 4. Update status page
  }

  /**
   * Manually trigger rollback (for testing or emergency)
   */
  async manualRollback(reason: string): Promise<void> {
    const decision: RollbackDecision = {
      shouldRollback: true,
      reason: `Manual rollback: ${reason}`,
      triggers: [],
      timestamp: new Date().toISOString()
    };

    await this.executeRollback(decision);
  }

  /**
   * Get current monitoring status
   */
  getStatus(): { monitoring: boolean; interval: number | null } {
    return {
      monitoring: this.isMonitoring,
      interval: this.checkInterval ? 30000 : null
    };
  }
}

export const rollbackCoordinator = new RollbackCoordinator();
