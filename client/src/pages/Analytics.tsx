import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingDown, DollarSign, Zap, Target } from 'lucide-react';
import { useWebSocket } from '@/hooks/use-websocket';

interface CostSavings {
  savingsPercent: number;
  actualCost: number;
  baselineCost: number;
}

interface UsageStats {
  modelDistribution: Record<string, number>;
  totalRequests: number;
  costTrend: Array<{ date: string; actual: number; baseline: number }>;
}

export default function Analytics() {
  // Connect to WebSocket for real-time analytics updates
  useWebSocket();

  const { data: costSavings } = useQuery<CostSavings>({
    queryKey: ['/api/ai/cost-savings'],
    refetchInterval: 10000, // Poll every 10 seconds
  });

  const { data: usageStats } = useQuery<UsageStats>({
    queryKey: ['/api/ai/usage-distribution'],
    refetchInterval: 10000,
  });

  const savings = costSavings?.savingsPercent || 0;
  const actualCost = costSavings?.actualCost || 0;
  const baselineCost = costSavings?.baselineCost || 0;

  return (
    <div className="space-y-6 p-6">
      {/* Cost Optimization Overview */}
      <div>
        <h1 className="text-3xl font-bold mb-6">AI Cost Optimization Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card data-testid="card-cost-savings">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                  <p className="text-4xl font-bold mt-2" data-testid="stat-cost-savings">
                    {savings.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Target: 87%
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Actual Cost</p>
                  <p className="text-4xl font-bold mt-2">
                    ${actualCost.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This period
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Baseline Cost</p>
                  <p className="text-4xl font-bold mt-2">
                    ${baselineCost.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All-Claude approach
                  </p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-4xl font-bold mt-2">
                    {usageStats?.totalRequests || 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI API calls
                  </p>
                </div>
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Model Usage Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Model Usage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usageStats?.modelDistribution && Object.entries(usageStats.modelDistribution).map(([model, count]) => (
              <div key={model} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{model}</span>
                  <span className="text-muted-foreground">{count} requests</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ 
                      width: `${((count / (usageStats.totalRequests || 1)) * 100).toFixed(0)}%` 
                    }}
                  />
                </div>
              </div>
            ))}
            {(!usageStats?.modelDistribution || Object.keys(usageStats.modelDistribution).length === 0) && (
              <div className="text-center text-muted-foreground py-8">
                No AI usage data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Multi-Model Routing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Mundo Tango intelligently routes tasks to the most cost-effective AI model based on task type and quality requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <span className="font-medium">Gemini Flash</span>
                    <span className="text-muted-foreground"> - Planning, decomposition ($0.001/req)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <span className="font-medium">Gemini Pro</span>
                    <span className="text-muted-foreground"> - Code generation ($0.01/req)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <span className="font-medium">Claude Sonnet</span>
                    <span className="text-muted-foreground"> - Code review, architecture ($0.15/req)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <span className="font-medium">GPT-4o</span>
                    <span className="text-muted-foreground"> - Multimodal tasks ($0.12/req)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-green-500/10">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                Cost Reduction Achieved
              </h3>
              <p className="text-2xl font-bold">
                ${(baselineCost - actualCost).toFixed(2)} saved
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                vs. all-Claude baseline approach
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
