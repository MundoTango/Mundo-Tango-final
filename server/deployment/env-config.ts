/**
 * Environment Configuration Manager - Phase 5 Track A
 * Agent #129: Environment Configuration Specialist
 * 
 * Manages environment-specific configuration:
 * - Development
 * - Staging
 * - Production
 * - Feature flags per environment
 * - Secrets validation
 */

export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  env: Environment;
  features: {
    orchestration: boolean;
    aiRouting: boolean;
    analytics: boolean;
    selfHealing: boolean;
    debugMode: boolean;
  };
  limits: {
    maxConcurrentTasks: number;
    maxAgentsPerTask: number;
    requestTimeout: number;
    rateLimit: number;
  };
  integrations: {
    openai: boolean;
    websocket: boolean;
    grafana: boolean;
  };
}

export class EnvironmentConfigManager {
  private currentEnv: Environment;
  private configs: Map<Environment, EnvironmentConfig> = new Map();

  constructor() {
    this.currentEnv = this.detectEnvironment();
    this.initializeConfigs();
  }

  /**
   * Detect current environment
   */
  private detectEnvironment(): Environment {
    const env = process.env.NODE_ENV?.toLowerCase();
    
    if (env === 'production') return 'production';
    if (env === 'staging') return 'staging';
    return 'development';
  }

  /**
   * Initialize configs for all environments
   */
  private initializeConfigs(): void {
    // Development config
    this.configs.set('development', {
      env: 'development',
      features: {
        orchestration: true,
        aiRouting: true,
        analytics: true,
        selfHealing: true,
        debugMode: true
      },
      limits: {
        maxConcurrentTasks: 100,
        maxAgentsPerTask: 10,
        requestTimeout: 30000,
        rateLimit: 1000
      },
      integrations: {
        openai: true,
        websocket: true,
        grafana: false
      }
    });

    // Staging config
    this.configs.set('staging', {
      env: 'staging',
      features: {
        orchestration: true,
        aiRouting: true,
        analytics: true,
        selfHealing: true,
        debugMode: true
      },
      limits: {
        maxConcurrentTasks: 500,
        maxAgentsPerTask: 15,
        requestTimeout: 60000,
        rateLimit: 5000
      },
      integrations: {
        openai: true,
        websocket: true,
        grafana: true
      }
    });

    // Production config
    this.configs.set('production', {
      env: 'production',
      features: {
        orchestration: true,
        aiRouting: true,
        analytics: true,
        selfHealing: true,
        debugMode: false
      },
      limits: {
        maxConcurrentTasks: 10000,
        maxAgentsPerTask: 20,
        requestTimeout: 120000,
        rateLimit: 50000
      },
      integrations: {
        openai: true,
        websocket: true,
        grafana: true
      }
    });
  }

  /**
   * Get current environment config
   */
  getConfig(): EnvironmentConfig {
    const config = this.configs.get(this.currentEnv);
    if (!config) {
      throw new Error(`Config for ${this.currentEnv} not found`);
    }
    return config;
  }

  /**
   * Get config for specific environment
   */
  getConfigFor(env: Environment): EnvironmentConfig {
    const config = this.configs.get(env);
    if (!config) {
      throw new Error(`Config for ${env} not found`);
    }
    return config;
  }

  /**
   * Validate required environment variables
   */
  validateEnvironment(): {
    valid: boolean;
    missing: string[];
    warnings: string[];
  } {
    const missing: string[] = [];
    const warnings: string[] = [];

    // Required for all environments
    const required = ['DATABASE_URL', 'SESSION_SECRET'];
    
    // Required for production
    if (this.currentEnv === 'production') {
      required.push('AI_INTEGRATIONS_OPENAI_API_KEY');
    }

    for (const key of required) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    // Optional but recommended
    const recommended = ['AI_INTEGRATIONS_OPENAI_BASE_URL'];
    for (const key of recommended) {
      if (!process.env[key]) {
        warnings.push(`Recommended: ${key}`);
      }
    }

    return {
      valid: missing.length === 0,
      missing,
      warnings
    };
  }

  /**
   * Get current environment
   */
  getCurrentEnvironment(): Environment {
    return this.currentEnv;
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature: keyof EnvironmentConfig['features']): boolean {
    const config = this.getConfig();
    return config.features[feature];
  }

  /**
   * Get environment summary
   */
  getSummary(): {
    environment: Environment;
    features: EnvironmentConfig['features'];
    limits: EnvironmentConfig['limits'];
    validation: {
      valid: boolean;
      missing: string[];
      warnings: string[];
    };
  } {
    const config = this.getConfig();
    const validation = this.validateEnvironment();

    return {
      environment: this.currentEnv,
      features: config.features,
      limits: config.limits,
      validation
    };
  }
}

export const envConfig = new EnvironmentConfigManager();
