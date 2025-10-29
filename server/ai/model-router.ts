import { db } from '../db';
import { aiUsageMetrics } from '@shared/schema';

/**
 * Multi-Model AI Router
 * Reference: mb.md Section 6 (Multi-Model AI Routing)
 * 
 * Routes AI tasks to optimal models based on:
 * - Task type (planning, code generation, review)
 * - Cost constraints (target: 87% cost reduction)
 * - Quality requirements
 * - Performance metrics
 */

export type AIModel = 'gemini-flash' | 'gemini-pro' | 'claude-sonnet' | 'gpt-4o';

export interface ModelCapabilities {
  model: AIModel;
  costPerRequest: number;
  avgResponseTime: number; // ms
  successRateByTask: Record<string, number>;
  strengths: string[];
  available: boolean; // Whether model is currently configured
}

/**
 * Model Registry - Performance characteristics of each AI model
 * Based on mb.md Section 6.2 (Cost Optimization Matrix)
 */
export const MODEL_REGISTRY: ModelCapabilities[] = [
  {
    model: 'gemini-flash',
    costPerRequest: 0.001,
    avgResponseTime: 4000,
    successRateByTask: {
      'planning': 0.95,
      'decomposition': 0.93,
      'simple_code': 0.78,
      'task_analysis': 0.91
    },
    strengths: ['planning', 'decomposition', 'cost-effective'],
    available: false // Would need Gemini integration
  },
  {
    model: 'gemini-pro',
    costPerRequest: 0.01,
    avgResponseTime: 6000,
    successRateByTask: {
      'code_generation': 0.91,
      'component_creation': 0.89,
      'api_endpoints': 0.87,
      'frontend': 0.88
    },
    strengths: ['code_generation', 'best_cost_quality', 'frontend'],
    available: false // Would need Gemini integration
  },
  {
    model: 'claude-sonnet',
    costPerRequest: 0.15,
    avgResponseTime: 8000,
    successRateByTask: {
      'code_review': 0.95,
      'architecture': 0.94,
      'complex_reasoning': 0.96,
      'refactoring': 0.93
    },
    strengths: ['code_review', 'architecture', 'quality', 'reasoning'],
    available: false // Would need Claude integration
  },
  {
    model: 'gpt-4o',
    costPerRequest: 0.12,
    avgResponseTime: 7000,
    successRateByTask: {
      'multimodal': 0.93,
      'code_generation': 0.89,
      'planning': 0.90,
      'general': 0.88
    },
    strengths: ['multimodal', 'general_purpose', 'versatile'],
    available: true // Available via Replit AI Integrations
  }
];

export class ModelRouter {
  /**
   * Select optimal AI model based on task type and cost constraints
   * Target: 87% cost reduction vs. all-Claude approach
   * 
   * Strategy:
   * - ONLY select from available models (available: true)
   * - Use cheapest capable model for each task type
   * - Fallback to GPT-4o (currently the only available model)
   * - Track performance to optimize routing over time
   */
  selectModel(
    taskType: string,
    budget?: number
  ): { model: AIModel; reasoning: string } {
    // CRITICAL: Filter to available models ONLY
    const availableModels = MODEL_REGISTRY.filter(m => m.available);
    
    if (availableModels.length === 0) {
      throw new Error('No AI models available - check MODEL_REGISTRY configuration');
    }
    
    // Filter capable models that are ALSO available
    const capableAndAvailable = availableModels.filter(m => 
      m.successRateByTask[taskType] && m.successRateByTask[taskType] >= 0.75
    );
    
    // If no available models are specifically good at this task, use first available model
    if (capableAndAvailable.length === 0) {
      const fallback = availableModels[0];
      return {
        model: fallback.model,
        reasoning: `No available specialized model for ${taskType}, using ${fallback.model} (general-purpose)`
      };
    }
    
    // If budget constrained, pick cheapest available capable model
    if (budget && budget < 0.05) {
      const cheapest = capableAndAvailable
        .sort((a, b) => a.costPerRequest - b.costPerRequest)[0];
      
      return {
        model: cheapest.model,
        reasoning: `Budget-constrained: ${cheapest.model} at $${cheapest.costPerRequest}/request`
      };
    }
    
    // Optimize for cost/quality balance (from available models only)
    const scored = capableAndAvailable.map(m => ({
      model: m.model,
      score: m.successRateByTask[taskType]! / m.costPerRequest,
      cost: m.costPerRequest,
      successRate: m.successRateByTask[taskType]!
    }));
    
    // Sort by score (descending)
    scored.sort((a, b) => b.score - a.score);
    
    const selected = scored[0];
    return {
      model: selected.model,
      reasoning: `Best available cost/quality: ${selected.model} (${(selected.successRate * 100).toFixed(0)}% success, $${selected.cost}/request)`
    };
  }

  /**
   * Track actual AI usage for cost monitoring and performance optimization
   * This data feeds into the Meta-Intelligence agent (Agent #116)
   */
  async recordUsage(
    agentId: string,
    model: AIModel,
    requestType: string,
    tokens: number,
    userId?: string
  ): Promise<void> {
    const modelConfig = MODEL_REGISTRY.find(m => m.model === model);
    const cost = String(modelConfig?.costPerRequest || 0);
    
    await db.insert(aiUsageMetrics).values({
      agentId,
      userId,
      model,
      requestType,
      tokens,
      cost
    });
  }

  /**
   * Calculate cost savings compared to all-Claude baseline
   * Target: 87% reduction
   */
  async calculateCostSavings(): Promise<{
    actualCost: number;
    baselineCost: number;
    savingsPercent: number;
  }> {
    // Get all AI usage from database
    const usage = await db.select().from(aiUsageMetrics);
    
    const actualCost = usage.reduce((sum, u) => sum + parseFloat(u.cost || '0'), 0);
    
    // Calculate what it would have cost if all requests used Claude
    const claudeCost = MODEL_REGISTRY.find(m => m.model === 'claude-sonnet')!.costPerRequest;
    const baselineCost = usage.length * claudeCost;
    
    const savingsPercent = baselineCost > 0 
      ? ((baselineCost - actualCost) / baselineCost) * 100 
      : 0;
    
    return {
      actualCost,
      baselineCost,
      savingsPercent
    };
  }

  /**
   * Get model usage distribution for analytics
   */
  async getUsageStats(): Promise<{
    modelDistribution: Record<AIModel, number>;
    costTrend: Array<{ date: string; actual: number; baseline: number }>;
    totalRequests: number;
  }> {
    const usage = await db.select().from(aiUsageMetrics);
    
    // Model distribution
    const modelDistribution = usage.reduce((acc, u) => {
      const model = u.model as AIModel;
      acc[model] = (acc[model] || 0) + 1;
      return acc;
    }, {} as Record<AIModel, number>);
    
    // Cost trend (simplified - would group by day in production)
    const claudeCost = MODEL_REGISTRY.find(m => m.model === 'claude-sonnet')!.costPerRequest;
    const costTrend = [{
      date: new Date().toISOString().split('T')[0],
      actual: usage.reduce((sum, u) => sum + parseFloat(u.cost || '0'), 0),
      baseline: usage.length * claudeCost
    }];
    
    return {
      modelDistribution,
      costTrend,
      totalRequests: usage.length
    };
  }
}
