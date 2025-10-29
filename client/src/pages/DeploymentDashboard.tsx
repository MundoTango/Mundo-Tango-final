import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock, TrendingUp, Users, Gauge, Activity } from 'lucide-react';

interface HealthCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  responseTime?: number;
  details?: Record<string, unknown>;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: HealthCheck[];
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    failures: number;
    overallHealth: number;
  };
}

interface SystemMetrics {
  agents: {
    totalAgents: number;
    activeAgents: number;
    averageSuccessRate: number;
  };
  api: {
    p95ResponseTime: number;
    errorRate: number;
  };
  websocket: {
    activeConnections: number;
  };
}

interface PerformanceBottleneck {
  component: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
}

interface PerformanceReport {
  overallScore: number;
  bottlenecks: PerformanceBottleneck[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface Alert {
  id: string;
  severity: string;
  title: string;
  message: string;
  timestamp: string;
}

interface SegmentationStats {
  bySegment: {
    super_admin: number;
    beta: number;
    regular: number;
  };
  percentage: {
    super_admin: number;
    beta: number;
    regular: number;
  };
}

export default function DeploymentDashboard() {
  const { data: health } = useQuery<HealthStatus>({
    queryKey: ['/api/health'],
    refetchInterval: 10000
  });

  const { data: metrics } = useQuery<SystemMetrics>({
    queryKey: ['/api/deployment/metrics'],
    refetchInterval: 30000
  });

  const { data: alerts } = useQuery<Alert[]>({
    queryKey: ['/api/deployment/alerts'],
    refetchInterval: 15000
  });

  const { data: performance } = useQuery<PerformanceReport>({
    queryKey: ['/api/deployment/performance/analyze'],
    refetchInterval: 60000
  });

  const { data: segmentationStats } = useQuery<SegmentationStats>({
    queryKey: ['/api/deployment/segmentation/stats'],
    refetchInterval: 30000
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Phase 5: Deployment & Rollout</h1>
        <p className="text-muted-foreground">Real-time deployment monitoring and rollout management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-health-status">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-health-status">
              {health?.status === 'healthy' && (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Healthy
                </Badge>
              )}
              {health?.status === 'degraded' && (
                <Badge variant="default" className="bg-yellow-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Degraded
                </Badge>
              )}
              {health?.status === 'unhealthy' && (
                <Badge variant="destructive">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Unhealthy
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {health?.summary.passed}/{health?.summary.totalChecks} checks passing
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-performance-score">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-performance-score">
              {performance?.overallScore || 0}/100
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {performance?.summary.critical || 0} critical bottlenecks
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-active-alerts">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-alerts">
              {Array.isArray(alerts) ? alerts.length : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Real-time monitoring active
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-rollout-progress">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rollout Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-rollout-progress">
              {segmentationStats?.percentage.beta.toFixed(0) || 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Beta users: {segmentationStats?.bySegment.beta || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-health-checks">
          <CardHeader>
            <CardTitle>Health Checks</CardTitle>
            <CardDescription>Component-level system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {health?.checks?.map((check, index) => (
                <div key={index} className="flex items-center justify-between" data-testid={`health-check-${index}`}>
                  <div className="flex items-center gap-2">
                    {check.status === 'pass' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {check.status === 'warn' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    {check.status === 'fail' && <AlertCircle className="h-4 w-4 text-red-500" />}
                    <span className="font-medium">{check.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {check.responseTime ? `${check.responseTime}ms` : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-metrics">
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
            <CardDescription>Real-time performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between" data-testid="metric-api-response">
                <span className="text-sm font-medium">API Response (p95)</span>
                <Badge variant="outline">{metrics?.api.p95ResponseTime || 0}ms</Badge>
              </div>
              <div className="flex items-center justify-between" data-testid="metric-error-rate">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge variant="outline">{metrics?.api.errorRate.toFixed(3) || 0}%</Badge>
              </div>
              <div className="flex items-center justify-between" data-testid="metric-websocket">
                <span className="text-sm font-medium">WebSocket Connections</span>
                <Badge variant="outline">{metrics?.websocket.activeConnections || 0}</Badge>
              </div>
              <div className="flex items-center justify-between" data-testid="metric-agent-success">
                <span className="text-sm font-medium">Agent Success Rate</span>
                <Badge variant="outline">{metrics?.agents.averageSuccessRate.toFixed(1) || 0}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-performance-bottlenecks">
        <CardHeader>
          <CardTitle>Performance Bottlenecks</CardTitle>
          <CardDescription>Detected performance issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          {performance?.bottlenecks && performance.bottlenecks.length > 0 ? (
            <div className="space-y-4">
              {performance.bottlenecks.map((bottleneck, index) => (
                <div key={index} className="border rounded-lg p-4" data-testid={`bottleneck-${index}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          bottleneck.severity === 'critical' ? 'destructive' :
                          bottleneck.severity === 'high' ? 'default' :
                          'outline'
                        }
                        data-testid={`badge-severity-${bottleneck.severity}`}
                      >
                        {bottleneck.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{bottleneck.component}</span>
                    </div>
                    <Badge variant="outline">{bottleneck.type}</Badge>
                  </div>
                  <p className="text-sm mb-2">{bottleneck.description}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Impact:</strong> {bottleneck.impact}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Recommendation:</strong> {bottleneck.recommendation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No performance bottlenecks detected</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card data-testid="card-alerts">
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Real-time system alerts and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          {Array.isArray(alerts) && alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert: any) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg" data-testid={`alert-${alert.id}`}>
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'critical' ? 'text-red-500' :
                    alert.severity === 'error' ? 'text-orange-500' :
                    alert.severity === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{alert.title}</span>
                      <Badge variant="outline">{alert.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No active alerts</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
