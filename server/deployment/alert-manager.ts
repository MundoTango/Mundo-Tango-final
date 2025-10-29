/**
 * Alert Management System - Phase 5 Track C
 * Agent #137: Alert Manager
 * 
 * Manages alerts for:
 * - Error rate thresholds
 * - Performance degradation
 * - System health issues
 * - Cost anomalies
 */

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  source: string;
  timestamp: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: () => Promise<boolean>;
  severity: AlertSeverity;
  message: string;
  cooldownMs: number; // Minimum time between alerts
}

export class AlertManager {
  private alerts: Map<string, Alert> = new Map();
  private rules: Map<string, AlertRule> = new Map();
  private lastAlertTime: Map<string, number> = new Map();

  constructor() {
    this.initializeDefaultRules();
  }

  /**
   * Initialize default alert rules from Phase 5 requirements
   */
  private initializeDefaultRules(): void {
    // Rule 1: High error rate
    this.addRule({
      id: 'high-error-rate',
      name: 'High Error Rate',
      condition: async () => {
        // In production, check actual error rate
        return false; // Mock: no errors
      },
      severity: 'critical',
      message: 'Error rate exceeded 5% threshold',
      cooldownMs: 5 * 60 * 1000 // 5 minutes
    });

    // Rule 2: Slow response times
    this.addRule({
      id: 'slow-response',
      name: 'Slow Response Times',
      condition: async () => {
        // In production, check p95 response time
        return false; // Mock: good performance
      },
      severity: 'warning',
      message: 'Response time (p95) exceeded 500ms',
      cooldownMs: 10 * 60 * 1000 // 10 minutes
    });

    // Rule 3: Database connectivity issues
    this.addRule({
      id: 'database-down',
      name: 'Database Connectivity',
      condition: async () => {
        // In production, check database health
        return false; // Mock: database healthy
      },
      severity: 'critical',
      message: 'Database connection failed',
      cooldownMs: 1 * 60 * 1000 // 1 minute
    });

    // Rule 4: High memory usage
    this.addRule({
      id: 'high-memory',
      name: 'High Memory Usage',
      condition: async () => {
        const memoryUsage = process.memoryUsage();
        const heapUsedMB = memoryUsage.heapUsed / 1024 / 1024;
        const heapTotalMB = memoryUsage.heapTotal / 1024 / 1024;
        const usagePercentage = (heapUsedMB / heapTotalMB) * 100;
        return usagePercentage > 90;
      },
      severity: 'warning',
      message: 'Memory usage exceeded 90%',
      cooldownMs: 15 * 60 * 1000 // 15 minutes
    });

    // Rule 5: Agent availability
    this.addRule({
      id: 'low-agent-availability',
      name: 'Low Agent Availability',
      condition: async () => {
        // In production, check agent availability
        return false; // Mock: agents available
      },
      severity: 'error',
      message: 'Less than 80% of agents are active',
      cooldownMs: 10 * 60 * 1000 // 10 minutes
    });
  }

  /**
   * Add a new alert rule
   */
  addRule(rule: AlertRule): void {
    this.rules.set(rule.id, rule);
  }

  /**
   * Check all rules and create alerts if triggered
   */
  async checkRules(): Promise<Alert[]> {
    const newAlerts: Alert[] = [];

    for (const [ruleId, rule] of Array.from(this.rules.entries())) {
      try {
        const isTriggered = await rule.condition();

        if (isTriggered) {
          // Check cooldown
          const lastAlertTime = this.lastAlertTime.get(ruleId) || 0;
          const timeSinceLastAlert = Date.now() - lastAlertTime;

          if (timeSinceLastAlert >= rule.cooldownMs) {
            const alert = this.createAlert(rule);
            newAlerts.push(alert);
            this.lastAlertTime.set(ruleId, Date.now());
          }
        }
      } catch (error) {
        console.error(`[AlertManager] Error checking rule ${ruleId}:`, error);
      }
    }

    return newAlerts;
  }

  /**
   * Create an alert from a rule
   */
  private createAlert(rule: AlertRule): Alert {
    const alert: Alert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      severity: rule.severity,
      status: 'active',
      title: rule.name,
      message: rule.message,
      source: rule.id,
      timestamp: new Date().toISOString()
    };

    this.alerts.set(alert.id, alert);
    return alert;
  }

  /**
   * Get all active alerts
   */
  getActiveAlerts(): Alert[] {
    return Array.from(this.alerts.values())
      .filter(alert => alert.status === 'active')
      .sort((a, b) => {
        // Sort by severity (critical > error > warning > info)
        const severityOrder = { critical: 4, error: 3, warning: 2, info: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      });
  }

  /**
   * Get all alerts (any status)
   */
  getAllAlerts(): Alert[] {
    return Array.from(this.alerts.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.status = 'acknowledged';
    alert.acknowledgedAt = new Date().toISOString();
    return true;
  }

  /**
   * Resolve an alert
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.status = 'resolved';
    alert.resolvedAt = new Date().toISOString();
    return true;
  }

  /**
   * Get alert summary statistics
   */
  getSummary(): {
    total: number;
    active: number;
    bySeverity: Record<AlertSeverity, number>;
  } {
    const alerts = Array.from(this.alerts.values());
    const active = alerts.filter(a => a.status === 'active');

    const bySeverity: Record<AlertSeverity, number> = {
      info: 0,
      warning: 0,
      error: 0,
      critical: 0
    };

    active.forEach(alert => {
      bySeverity[alert.severity]++;
    });

    return {
      total: alerts.length,
      active: active.length,
      bySeverity
    };
  }

  /**
   * Start monitoring (check rules periodically)
   */
  startMonitoring(intervalMs: number = 60000): NodeJS.Timeout {
    console.log(`[AlertManager] Starting monitoring (checking every ${intervalMs}ms)`);
    
    return setInterval(async () => {
      const newAlerts = await this.checkRules();
      
      if (newAlerts.length > 0) {
        console.log(`[AlertManager] ${newAlerts.length} new alert(s) triggered`);
        newAlerts.forEach(alert => {
          console.log(`[AlertManager] [${alert.severity.toUpperCase()}] ${alert.title}: ${alert.message}`);
        });
      }
    }, intervalMs);
  }
}

export const alertManager = new AlertManager();
