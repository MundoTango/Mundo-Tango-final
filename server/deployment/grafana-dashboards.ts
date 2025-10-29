/**
 * Grafana Dashboard Definitions - Phase 5 Track C
 * Agent #143: Observability Specialist
 * Agent #138: Dashboard Builder
 * 
 * Defines 4 Grafana dashboards:
 * 1. System Health Dashboard
 * 2. Agent Performance Dashboard
 * 3. Cost Optimization Dashboard
 * 4. User Activity Dashboard
 */

export interface GrafanaDashboard {
  title: string;
  description: string;
  panels: GrafanaPanel[];
  refresh: string; // e.g., "5s", "1m", "5m"
  tags: string[];
}

export interface GrafanaPanel {
  title: string;
  type: 'graph' | 'stat' | 'table' | 'heatmap' | 'gauge';
  metric: string;
  query: string;
  thresholds?: {
    warning: number;
    critical: number;
  };
}

/**
 * Dashboard 1: System Health Dashboard
 */
export const systemHealthDashboard: GrafanaDashboard = {
  title: 'Mr Blue - System Health',
  description: 'Real-time monitoring of all system components',
  refresh: '10s',
  tags: ['health', 'monitoring', 'mr-blue'],
  panels: [
    {
      title: 'Overall Health Score',
      type: 'gauge',
      metric: 'health_score',
      query: 'SELECT overallHealth FROM health_checks ORDER BY timestamp DESC LIMIT 1',
      thresholds: {
        warning: 80,
        critical: 60
      }
    },
    {
      title: 'Database Response Time',
      type: 'graph',
      metric: 'db_response_time',
      query: 'SELECT timestamp, responseTime FROM health_checks WHERE component="Database"',
      thresholds: {
        warning: 500,
        critical: 1000
      }
    },
    {
      title: 'Agent Availability',
      type: 'stat',
      metric: 'agent_availability',
      query: 'SELECT (activeAgents / totalAgents) * 100 FROM agent_metrics',
      thresholds: {
        warning: 90,
        critical: 80
      }
    },
    {
      title: 'Memory Usage',
      type: 'graph',
      metric: 'memory_usage',
      query: 'SELECT timestamp, usagePercentage FROM system_metrics',
      thresholds: {
        warning: 80,
        critical: 90
      }
    },
    {
      title: 'Active WebSocket Connections',
      type: 'stat',
      metric: 'websocket_connections',
      query: 'SELECT activeConnections FROM websocket_metrics ORDER BY timestamp DESC LIMIT 1'
    },
    {
      title: 'Failed Health Checks (Last 24h)',
      type: 'table',
      metric: 'failed_checks',
      query: 'SELECT name, message, timestamp FROM health_checks WHERE status="fail" AND timestamp > NOW() - INTERVAL 24 HOUR'
    }
  ]
};

/**
 * Dashboard 2: Agent Performance Dashboard
 */
export const agentPerformanceDashboard: GrafanaDashboard = {
  title: 'Mr Blue - Agent Performance',
  description: '112 agents working simultaneously - performance metrics',
  refresh: '30s',
  tags: ['agents', 'performance', 'mr-blue'],
  panels: [
    {
      title: 'Active Agents (Current)',
      type: 'stat',
      metric: 'active_agents',
      query: 'SELECT COUNT(*) FROM agents WHERE isActive=true'
    },
    {
      title: 'Average Agent Success Rate',
      type: 'gauge',
      metric: 'avg_success_rate',
      query: 'SELECT AVG(successRate) FROM agent_performance_metrics',
      thresholds: {
        warning: 90,
        critical: 80
      }
    },
    {
      title: 'Top Performing Agents',
      type: 'table',
      metric: 'top_agents',
      query: 'SELECT agentId, successRate, tasksCompleted FROM agents ORDER BY successRate DESC LIMIT 10'
    },
    {
      title: 'Agent Load Distribution',
      type: 'heatmap',
      metric: 'agent_load',
      query: 'SELECT agentId, currentLoad FROM agents ORDER BY currentLoad DESC'
    },
    {
      title: 'Tasks by Agent (Last Hour)',
      type: 'graph',
      metric: 'tasks_by_agent',
      query: 'SELECT timestamp, COUNT(*) FROM tasks GROUP BY assignedAgent WHERE timestamp > NOW() - INTERVAL 1 HOUR'
    },
    {
      title: 'Agent Collaboration Events',
      type: 'graph',
      metric: 'collaboration_events',
      query: 'SELECT timestamp, COUNT(*) FROM agent_collaboration GROUP BY HOUR(timestamp)'
    }
  ]
};

/**
 * Dashboard 3: Cost Optimization Dashboard
 */
export const costOptimizationDashboard: GrafanaDashboard = {
  title: 'Mr Blue - Cost Optimization',
  description: '87% cost reduction target - multi-model AI routing',
  refresh: '1m',
  tags: ['cost', 'ai', 'optimization', 'mr-blue'],
  panels: [
    {
      title: 'Cost Savings %',
      type: 'gauge',
      metric: 'cost_savings_percent',
      query: 'SELECT savingsPercent FROM cost_savings ORDER BY timestamp DESC LIMIT 1',
      thresholds: {
        warning: 80, // 80% of 87% target
        critical: 70
      }
    },
    {
      title: 'Actual vs Baseline Cost',
      type: 'graph',
      metric: 'cost_comparison',
      query: 'SELECT timestamp, actualCost, baselineCost FROM cost_savings'
    },
    {
      title: 'Model Usage Distribution',
      type: 'stat',
      metric: 'model_distribution',
      query: 'SELECT model, COUNT(*) FROM ai_usage GROUP BY model'
    },
    {
      title: 'Cost Per Request',
      type: 'graph',
      metric: 'cost_per_request',
      query: 'SELECT timestamp, AVG(costPerRequest) FROM ai_usage GROUP BY DATE(timestamp)'
    },
    {
      title: 'Total AI Requests',
      type: 'stat',
      metric: 'total_requests',
      query: 'SELECT COUNT(*) FROM ai_usage'
    },
    {
      title: 'Average Tokens Used',
      type: 'graph',
      metric: 'avg_tokens',
      query: 'SELECT timestamp, AVG(tokensUsed) FROM ai_usage GROUP BY HOUR(timestamp)'
    }
  ]
};

/**
 * Dashboard 4: User Activity Dashboard
 */
export const userActivityDashboard: GrafanaDashboard = {
  title: 'Mr Blue - User Activity',
  description: 'User engagement and adoption metrics',
  refresh: '1m',
  tags: ['users', 'activity', 'mr-blue'],
  panels: [
    {
      title: 'Active Users (Last 24h)',
      type: 'stat',
      metric: 'active_users_24h',
      query: 'SELECT COUNT(DISTINCT userId) FROM user_activity WHERE timestamp > NOW() - INTERVAL 24 HOUR'
    },
    {
      title: 'Feature Adoption Rate',
      type: 'table',
      metric: 'feature_adoption',
      query: 'SELECT feature, COUNT(DISTINCT userId) as users FROM feature_usage GROUP BY feature'
    },
    {
      title: 'User Segmentation',
      type: 'stat',
      metric: 'user_segments',
      query: 'SELECT segment, COUNT(*) FROM user_segments GROUP BY segment'
    },
    {
      title: 'Beta User Feedback',
      type: 'table',
      metric: 'beta_feedback',
      query: 'SELECT userId, feedback, rating, timestamp FROM user_feedback WHERE userSegment="beta" ORDER BY timestamp DESC LIMIT 20'
    },
    {
      title: 'Task Creation Over Time',
      type: 'graph',
      metric: 'task_creation',
      query: 'SELECT timestamp, COUNT(*) FROM tasks GROUP BY HOUR(timestamp)'
    },
    {
      title: 'User Journey Analytics',
      type: 'graph',
      metric: 'user_journey',
      query: 'SELECT page, COUNT(*) as visits FROM page_views GROUP BY page ORDER BY visits DESC'
    }
  ]
};

/**
 * Export all dashboards as JSON for Grafana import
 */
export function exportDashboardsForGrafana(): Record<string, GrafanaDashboard> {
  return {
    'system-health': systemHealthDashboard,
    'agent-performance': agentPerformanceDashboard,
    'cost-optimization': costOptimizationDashboard,
    'user-activity': userActivityDashboard
  };
}

/**
 * Generate Grafana dashboard JSON configuration
 * This would be imported into Grafana Cloud
 */
export function generateGrafanaConfig(dashboard: GrafanaDashboard): string {
  return JSON.stringify({
    dashboard: {
      title: dashboard.title,
      description: dashboard.description,
      tags: dashboard.tags,
      refresh: dashboard.refresh,
      panels: dashboard.panels.map((panel, index) => ({
        id: index + 1,
        gridPos: { h: 8, w: 12, x: (index % 2) * 12, y: Math.floor(index / 2) * 8 },
        title: panel.title,
        type: panel.type,
        targets: [
          {
            expr: panel.query,
            refId: 'A'
          }
        ],
        thresholds: panel.thresholds ? [
          { value: panel.thresholds.warning, color: 'yellow' },
          { value: panel.thresholds.critical, color: 'red' }
        ] : []
      }))
    }
  }, null, 2);
}
