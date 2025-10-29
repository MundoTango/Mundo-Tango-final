import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, CheckCircle2, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { AgentTask } from '@shared/schema';
import { useWebSocket } from '@/hooks/use-websocket';

export default function TaskMonitor() {
  // Connect to WebSocket for real-time task updates
  useWebSocket();

  const { data: tasks, isLoading } = useQuery<AgentTask[]>({
    queryKey: ['/api/tasks'],
    refetchInterval: 3000, // Poll every 3 seconds as fallback
  });

  if (isLoading) {
    return <TaskMonitorSkeleton />;
  }

  const stats = {
    pending: tasks?.filter(t => t.status === 'pending').length || 0,
    in_progress: tasks?.filter(t => t.status === 'in_progress').length || 0,
    completed: tasks?.filter(t => t.status === 'completed').length || 0,
    failed: tasks?.filter(t => t.status === 'failed').length || 0,
  };

  const avgTime = tasks && tasks.length > 0
    ? tasks.filter(t => t.actualMinutes).reduce((sum, t) => sum + (t.actualMinutes || 0), 0) / tasks.filter(t => t.actualMinutes).length || 0
    : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TaskStatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="h-5 w-5" />}
          variant="secondary"
          data-testid="stat-pending-tasks"
        />
        <TaskStatCard
          title="In Progress"
          value={stats.in_progress}
          icon={<Loader2 className="h-5 w-5 animate-spin" />}
          variant="default"
          data-testid="stat-progress-tasks"
        />
        <TaskStatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="success"
          data-testid="stat-completed-tasks"
        />
        <TaskStatCard
          title="Failed"
          value={stats.failed}
          icon={<XCircle className="h-5 w-5" />}
          variant="destructive"
          data-testid="stat-failed-tasks"
        />
        <TaskStatCard
          title="Avg Time"
          value={avgTime > 0 ? `${avgTime.toFixed(0)}m` : 'N/A'}
          icon={<AlertCircle className="h-5 w-5" />}
          variant="outline"
          data-testid="stat-avg-time"
        />
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks ({tasks?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {tasks?.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            {(!tasks || tasks.length === 0) && (
              <div className="text-center text-muted-foreground py-8">
                No tasks yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TaskStatCard({ 
  title, 
  value, 
  icon,
  variant = 'default',
  ...props 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline';
  'data-testid'?: string;
}) {
  return (
    <Card {...props}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskItem({ task }: { task: AgentTask }) {
  const statusConfig = {
    pending: { variant: 'secondary' as const, icon: Clock },
    in_progress: { variant: 'default' as const, icon: Loader2 },
    completed: { variant: 'default' as const, icon: CheckCircle2 },
    failed: { variant: 'destructive' as const, icon: XCircle }
  };

  const config = statusConfig[task.status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div 
      className="flex items-start gap-4 p-4 rounded-lg border hover-elevate"
      data-testid={`task-item-${task.id}`}
    >
      <div className="mt-1">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-medium truncate">{task.description}</h3>
          <Badge variant={config.variant} data-testid={`badge-status-${task.id}`}>
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {task.assignedAgent && (
            <span className="font-mono text-xs">{task.assignedAgent}</span>
          )}
          <span>Type: {task.type}</span>
          <span>Priority: {task.priority}/10</span>
          {task.createdAt && (
            <span>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
          )}
        </div>
        {task.error && (
          <div className="mt-2 p-2 bg-destructive/10 rounded text-sm text-destructive">
            {task.error}
          </div>
        )}
      </div>
    </div>
  );
}

function TaskMonitorSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
