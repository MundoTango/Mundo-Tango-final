/**
 * Performance Analyzer - Phase 5 Track C
 * Agent #139: Performance Analyzer
 * 
 * Analyzes performance bottlenecks:
 * - Slow API endpoints
 * - Database query performance
 * - Agent processing delays
 * - Memory/CPU usage patterns
 * - WebSocket latency
 */

import { metricsCollector } from './metrics-collector';

export interface PerformanceBottleneck {
  component: string;
  type: 'database' | 'api' | 'agent' | 'memory' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
  metrics: Record<string, number>;
}

export interface PerformanceReport {
  timestamp: string;
  overallScore: number; // 0-100
  bottlenecks: PerformanceBottleneck[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export class PerformanceAnalyzer {
  private readonly THRESHOLDS = {
    api: {
      responseTime: 500, // ms
      errorRate: 0.1, // 0.1%
    },
    database: {
      queryTime: 100, // ms
    },
    agent: {
      successRate: 95, // %
      averageLoad: 5, // tasks
    },
    memory: {
      usagePercent: 80, // %
    },
    websocket: {
      latency: 50, // ms
    }
  };

  /**
   * Run comprehensive performance analysis
   */
  async analyzePerformance(): Promise<PerformanceReport> {
    const bottlenecks: PerformanceBottleneck[] = [];

    // Collect current metrics
    const metrics = await metricsCollector.collectMetrics();

    // Analyze each component
    const [
      apiBottlenecks,
      agentBottlenecks,
      memoryBottlenecks,
      websocketBottlenecks
    ] = await Promise.all([
      this.analyzeAPI(metrics.api),
      this.analyzeAgents(metrics.agents),
      this.analyzeMemory(),
      this.analyzeWebSocket(metrics.websocket)
    ]);

    bottlenecks.push(
      ...apiBottlenecks,
      ...agentBottlenecks,
      ...memoryBottlenecks,
      ...websocketBottlenecks
    );

    const summary = {
      total: bottlenecks.length,
      critical: bottlenecks.filter(b => b.severity === 'critical').length,
      high: bottlenecks.filter(b => b.severity === 'high').length,
      medium: bottlenecks.filter(b => b.severity === 'medium').length,
      low: bottlenecks.filter(b => b.severity === 'low').length
    };

    // Calculate overall performance score
    const overallScore = this.calculatePerformanceScore(bottlenecks);

    return {
      timestamp: new Date().toISOString(),
      overallScore,
      bottlenecks,
      summary
    };
  }

  /**
   * Analyze API performance
   */
  private async analyzeAPI(apiMetrics: any): Promise<PerformanceBottleneck[]> {
    const bottlenecks: PerformanceBottleneck[] = [];

    // Check response times
    if (apiMetrics.p95ResponseTime > this.THRESHOLDS.api.responseTime) {
      bottlenecks.push({
        component: 'API Layer',
        type: 'api',
        severity: apiMetrics.p95ResponseTime > 1000 ? 'critical' : 'high',
        description: `High API response times (p95: ${apiMetrics.p95ResponseTime}ms)`,
        impact: 'Users experiencing slow page loads and delayed interactions',
        recommendation: 'Review slow endpoints, add caching, optimize database queries',
        metrics: {
          p95: apiMetrics.p95ResponseTime,
          p99: apiMetrics.p99ResponseTime,
          average: apiMetrics.averageResponseTime,
          threshold: this.THRESHOLDS.api.responseTime
        }
      });
    }

    // Check error rates
    if (apiMetrics.errorRate > this.THRESHOLDS.api.errorRate) {
      bottlenecks.push({
        component: 'API Layer',
        type: 'api',
        severity: apiMetrics.errorRate > 1.0 ? 'critical' : 'medium',
        description: `High API error rate (${apiMetrics.errorRate}%)`,
        impact: 'Users experiencing failed requests and errors',
        recommendation: 'Review error logs, add error handling, fix failing endpoints',
        metrics: {
          errorRate: apiMetrics.errorRate,
          totalRequests: apiMetrics.totalRequests,
          threshold: this.THRESHOLDS.api.errorRate
        }
      });
    }

    return bottlenecks;
  }

  /**
   * Analyze agent performance
   */
  private async analyzeAgents(agentMetrics: any): Promise<PerformanceBottleneck[]> {
    const bottlenecks: PerformanceBottleneck[] = [];

    // Check agent success rate
    if (agentMetrics.averageSuccessRate < this.THRESHOLDS.agent.successRate) {
      bottlenecks.push({
        component: 'Agent Orchestration',
        type: 'agent',
        severity: agentMetrics.averageSuccessRate < 90 ? 'critical' : 'high',
        description: `Low agent success rate (${agentMetrics.averageSuccessRate.toFixed(1)}%)`,
        impact: 'Tasks failing more frequently, reduced system reliability',
        recommendation: 'Review failed tasks, improve agent error handling, increase agent capacity',
        metrics: {
          successRate: agentMetrics.averageSuccessRate,
          activeAgents: agentMetrics.activeAgents,
          totalAgents: agentMetrics.totalAgents,
          threshold: this.THRESHOLDS.agent.successRate
        }
      });
    }

    // Check agent overload
    if (agentMetrics.averageLoad > this.THRESHOLDS.agent.averageLoad) {
      bottlenecks.push({
        component: 'Agent Load Balancing',
        type: 'agent',
        severity: agentMetrics.averageLoad > 8 ? 'high' : 'medium',
        description: `High agent load (avg: ${agentMetrics.averageLoad} tasks/agent)`,
        impact: 'Agents overloaded, slower task completion times',
        recommendation: 'Scale up agent capacity, improve load distribution, prioritize critical tasks',
        metrics: {
          averageLoad: agentMetrics.averageLoad,
          activeAgents: agentMetrics.activeAgents,
          threshold: this.THRESHOLDS.agent.averageLoad
        }
      });
    }

    return bottlenecks;
  }

  /**
   * Analyze memory usage
   */
  private async analyzeMemory(): Promise<PerformanceBottleneck[]> {
    const bottlenecks: PerformanceBottleneck[] = [];
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = memoryUsage.heapUsed / 1024 / 1024;
    const heapTotalMB = memoryUsage.heapTotal / 1024 / 1024;
    const usagePercent = (heapUsedMB / heapTotalMB) * 100;

    if (usagePercent > this.THRESHOLDS.memory.usagePercent) {
      bottlenecks.push({
        component: 'Memory Management',
        type: 'memory',
        severity: usagePercent > 90 ? 'critical' : 'high',
        description: `High memory usage (${usagePercent.toFixed(1)}%)`,
        impact: 'Risk of out-of-memory errors, system instability',
        recommendation: 'Review memory leaks, clear caches, restart services if necessary',
        metrics: {
          heapUsedMB: parseFloat(heapUsedMB.toFixed(2)),
          heapTotalMB: parseFloat(heapTotalMB.toFixed(2)),
          usagePercent: parseFloat(usagePercent.toFixed(1)),
          threshold: this.THRESHOLDS.memory.usagePercent
        }
      });
    }

    return bottlenecks;
  }

  /**
   * Analyze WebSocket performance
   */
  private async analyzeWebSocket(wsMetrics: any): Promise<PerformanceBottleneck[]> {
    const bottlenecks: PerformanceBottleneck[] = [];

    if (wsMetrics.averageLatency > this.THRESHOLDS.websocket.latency) {
      bottlenecks.push({
        component: 'WebSocket Communications',
        type: 'network',
        severity: wsMetrics.averageLatency > 100 ? 'high' : 'medium',
        description: `High WebSocket latency (${wsMetrics.averageLatency}ms)`,
        impact: 'Delayed real-time updates, laggy user experience',
        recommendation: 'Check network conditions, optimize message size, review server load',
        metrics: {
          averageLatency: wsMetrics.averageLatency,
          activeConnections: wsMetrics.activeConnections,
          totalMessages: wsMetrics.totalMessages,
          threshold: this.THRESHOLDS.websocket.latency
        }
      });
    }

    return bottlenecks;
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(bottlenecks: PerformanceBottleneck[]): number {
    if (bottlenecks.length === 0) {
      return 100; // Perfect score
    }

    // Deduct points based on severity
    let deductions = 0;
    bottlenecks.forEach(bottleneck => {
      switch (bottleneck.severity) {
        case 'critical':
          deductions += 25;
          break;
        case 'high':
          deductions += 15;
          break;
        case 'medium':
          deductions += 8;
          break;
        case 'low':
          deductions += 3;
          break;
      }
    });

    const score = Math.max(0, 100 - deductions);
    return score;
  }

  /**
   * Generate performance report as text
   */
  async generateTextReport(): Promise<string> {
    const report = await this.analyzePerformance();

    let text = '═══════════════════════════════════════════════════\n';
    text += '  PERFORMANCE ANALYSIS REPORT\n';
    text += '═══════════════════════════════════════════════════\n';
    text += `\nTimestamp: ${report.timestamp}\n`;
    text += `Overall Score: ${report.overallScore}/100\n\n`;

    text += `Summary:\n`;
    text += `- Total Bottlenecks: ${report.summary.total}\n`;
    text += `- Critical: ${report.summary.critical}\n`;
    text += `- High: ${report.summary.high}\n`;
    text += `- Medium: ${report.summary.medium}\n`;
    text += `- Low: ${report.summary.low}\n\n`;

    if (report.bottlenecks.length === 0) {
      text += '✅ No performance bottlenecks detected!\n';
    } else {
      text += 'Detected Bottlenecks:\n\n';
      report.bottlenecks.forEach((bottleneck, index) => {
        const icon = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢'
        }[bottleneck.severity];

        text += `${icon} ${index + 1}. ${bottleneck.component} [${bottleneck.severity.toUpperCase()}]\n`;
        text += `   ${bottleneck.description}\n`;
        text += `   Impact: ${bottleneck.impact}\n`;
        text += `   Recommendation: ${bottleneck.recommendation}\n\n`;
      });
    }

    text += '═══════════════════════════════════════════════════\n';
    
    return text;
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer();
