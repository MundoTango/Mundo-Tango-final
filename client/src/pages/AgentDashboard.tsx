import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Zap, TrendingUp, DollarSign } from 'lucide-react';
import type { AgentCapability } from '@shared/schema';
import { useWebSocket } from '@/hooks/use-websocket';

export default function AgentDashboard() {
  // Connect to WebSocket for real-time updates
  useWebSocket();

  const { data: agents, isLoading } = useQuery<AgentCapability[]>({
    queryKey: ['/api/agents'],
    refetchInterval: 5000, // Also poll every 5 seconds as fallback
  });

  if (isLoading) {
    return <AgentDashboardSkeleton />;
  }

  const stats = {
    total: agents?.length || 0,
    active: agents?.filter(a => a.isActive && a.currentLoad > 0).length || 0,
    avgSuccess: agents && agents.length > 0 
      ? agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length
      : 0,
    totalCompleted: agents?.reduce((sum, a) => sum + a.totalTasksCompleted, 0) || 0
  };

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Agents"
          value={stats.total}
          icon={<Activity className="h-5 w-5" />}
          data-testid="stat-total-agents"
        />
        <StatCard
          title="Active Now"
          value={stats.active}
          icon={<Zap className="h-5 w-5" />}
          data-testid="stat-active-agents"
        />
        <StatCard
          title="Avg Success Rate"
          value={`${stats.avgSuccess.toFixed(1)}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          data-testid="stat-success-rate"
        />
        <StatCard
          title="Tasks Completed"
          value={stats.totalCompleted.toLocaleString()}
          icon={<DollarSign className="h-5 w-5" />}
          data-testid="stat-completed-tasks"
        />
      </div>

      {/* Agent Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Agents ({stats.total})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents?.map(agent => (
            <AgentCard key={agent.agentId} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: AgentCapability }) {
  const loadPercent = (agent.currentLoad / agent.maxLoad) * 100;
  const isOverloaded = loadPercent > 80;
  
  return (
    <Card 
      className="hover-elevate cursor-pointer"
      data-testid={`card-agent-${agent.agentId}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{agent.name}</CardTitle>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {agent.agentId}
            </p>
          </div>
          <Badge 
            variant={agent.isActive ? 'default' : 'secondary'}
            data-testid={`badge-status-${agent.agentId}`}
          >
            {agent.isActive ? 'Active' : 'Idle'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Specialties */}
        <div className="flex flex-wrap gap-1">
          {(Array.isArray(agent.specialties) ? agent.specialties : []).slice(0, 2).map((spec: string, idx: number) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>

        {/* Metrics */}
        <div className="space-y-2">
          <MetricRow 
            label="Success Rate" 
            value={`${agent.successRate}%`}
            data-testid={`metric-success-${agent.agentId}`}
          />
          <MetricRow 
            label="Tasks Done" 
            value={agent.totalTasksCompleted}
            data-testid={`metric-completed-${agent.agentId}`}
          />
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Load</span>
              <span className={isOverloaded ? 'text-destructive font-medium' : ''}>
                {agent.currentLoad}/{agent.maxLoad}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${isOverloaded ? 'bg-destructive' : 'bg-primary'}`}
                style={{ width: `${Math.min(loadPercent, 100)}%` }}
                data-testid={`progress-load-${agent.agentId}`}
              />
            </div>
          </div>
        </div>

        {/* Response Time */}
        {agent.avgResponseTime > 0 && (
          <div className="text-xs text-muted-foreground">
            Avg Response: {agent.avgResponseTime}ms
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({ 
  title, 
  value, 
  icon,
  ...props 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  'data-testid'?: string;
}) {
  return (
    <Card {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricRow({ 
  label, 
  value,
  ...props 
}: { 
  label: string; 
  value: string | number;
  'data-testid'?: string;
}) {
  return (
    <div className="flex justify-between text-sm" {...props}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function AgentDashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
