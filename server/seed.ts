import { db } from './db';
import { agentCapabilities } from '../shared/schema';

/**
 * MUNDO TANGO AGENT SEEDING SCRIPT
 * 
 * Populates the database with 105+ specialized agents organized hierarchically:
 * - 1 Executive Agent (CEO)
 * - 6 Division Chiefs
 * - 9 Domain Coordinators
 * - 61 Layer Agents
 * - 15 Expert Agents
 * - 13+ Specialized Agents
 * 
 * Based on mb.md documentation (Section 1 & 2)
 */

const agents = [
  // ═══════════════════════════════════════════════════════════════
  // EXECUTIVE AGENT (1)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'agent-0-ceo',
    name: 'CEO Orchestrator',
    specialties: ['orchestration', 'governance', 'strategy', 'quality_assurance', 'conflict_resolution'],
    maxLoad: 20,
  },

  // ═══════════════════════════════════════════════════════════════
  // DIVISION CHIEFS (6)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'chief-1-foundation',
    name: 'Foundation Division Chief',
    specialties: ['architecture', 'authentication', 'authorization', 'infrastructure'],
    maxLoad: 15,
  },
  {
    agentId: 'chief-2-core',
    name: 'Core Division Chief',
    specialties: ['notifications', 'workflows', 'core_systems'],
    maxLoad: 15,
  },
  {
    agentId: 'chief-3-business',
    name: 'Business Division Chief',
    specialties: ['messaging', 'booking', 'support', 'business_logic'],
    maxLoad: 15,
  },
  {
    agentId: 'chief-4-intelligence',
    name: 'Intelligence Division Chief',
    specialties: ['ai_infrastructure', 'ml', 'learning', 'reasoning', 'intelligence'],
    maxLoad: 15,
  },
  {
    agentId: 'chief-5-platform',
    name: 'Platform Division Chief',
    specialties: ['performance', 'security', 'devops', 'platform'],
    maxLoad: 15,
  },
  {
    agentId: 'chief-6-extended',
    name: 'Extended Division Chief',
    specialties: ['integrations', 'supabase', 'external_services'],
    maxLoad: 15,
  },

  // ═══════════════════════════════════════════════════════════════
  // DOMAIN COORDINATORS (9)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'domain-1-infrastructure',
    name: 'Infrastructure Orchestrator',
    specialties: ['infrastructure', 'architecture', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-2-frontend',
    name: 'Frontend Coordinator',
    specialties: ['frontend', 'ui', 'ux', 'react', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-3-background',
    name: 'Background Processor',
    specialties: ['background_jobs', 'queues', 'async', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-4-realtime',
    name: 'Real-time Communications Coordinator',
    specialties: ['websockets', 'realtime', 'messaging', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-5-business-logic',
    name: 'Business Logic Manager',
    specialties: ['business_rules', 'logic', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-6-search',
    name: 'Search & Analytics Coordinator',
    specialties: ['search', 'analytics', 'data', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-7-life-ceo',
    name: 'Life CEO Core Coordinator',
    specialties: ['life_ceo', 'framework', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-8-platform',
    name: 'Platform Enhancement Coordinator',
    specialties: ['enhancements', 'features', 'coordination'],
    maxLoad: 10,
  },
  {
    agentId: 'domain-9-master',
    name: 'Master Control Coordinator',
    specialties: ['control', 'oversight', 'coordination'],
    maxLoad: 10,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS (61) - Foundation Division (Layers 1-10)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-1-architecture',
    name: 'Architecture Foundation Agent',
    specialties: ['architecture', 'foundation', 'design_patterns'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-2-database',
    name: 'Database Design Agent',
    specialties: ['database', 'schema', 'migrations', 'postgresql'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-3-api',
    name: 'API Design Agent',
    specialties: ['api', 'rest', 'graphql', 'endpoints'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-4-authentication',
    name: 'Authentication System Agent',
    specialties: ['authentication', 'oauth', 'jwt', 'security'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-5-authorization',
    name: 'Authorization System Agent',
    specialties: ['authorization', 'permissions', 'rbac', 'security'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-6-validation',
    name: 'Data Validation Agent',
    specialties: ['validation', 'zod', 'schemas'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-7-error-handling',
    name: 'Error Handling Agent',
    specialties: ['error_handling', 'logging', 'monitoring'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-8-caching',
    name: 'Caching Strategy Agent',
    specialties: ['caching', 'redis', 'performance'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-9-file-storage',
    name: 'File Storage Agent',
    specialties: ['storage', 'uploads', 's3', 'files'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-10-configuration',
    name: 'Configuration Management Agent',
    specialties: ['configuration', 'environment', 'secrets'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS - Core Division (Layers 11-20)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-11-user-profile',
    name: 'User Profile Agent',
    specialties: ['user_management', 'profiles', 'accounts'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-12-email',
    name: 'Email System Agent',
    specialties: ['email', 'notifications', 'sendgrid'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-13-sms',
    name: 'SMS Agent',
    specialties: ['sms', 'twilio', 'messaging'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-14-push-notifications',
    name: 'Push Notifications Agent',
    specialties: ['push', 'notifications', 'firebase'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-15-activity-feed',
    name: 'Activity Feed Agent',
    specialties: ['activity', 'feed', 'timeline'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-16-notification',
    name: 'Notification System Agent',
    specialties: ['notifications', 'alerts', 'system'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-17-search',
    name: 'Search Engine Agent',
    specialties: ['search', 'elasticsearch', 'indexing'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-18-recommendations',
    name: 'Recommendation Engine Agent',
    specialties: ['recommendations', 'ml', 'personalization'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-19-analytics',
    name: 'Analytics Agent',
    specialties: ['analytics', 'tracking', 'metrics'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-20-workflow',
    name: 'Workflow Engine Agent',
    specialties: ['workflows', 'automation', 'orchestration'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS - Business Division (Layers 21-30)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-21-payments',
    name: 'Payment Processing Agent',
    specialties: ['payments', 'stripe', 'billing'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-22-subscriptions',
    name: 'Subscription Management Agent',
    specialties: ['subscriptions', 'recurring', 'billing'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-23-invoicing',
    name: 'Invoicing Agent',
    specialties: ['invoices', 'billing', 'accounting'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-24-events',
    name: 'Event Management Agent',
    specialties: ['events', 'calendar', 'scheduling'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-25-messaging',
    name: 'Messaging System Agent',
    specialties: ['messaging', 'chat', 'communication'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-26-reviews',
    name: 'Review System Agent',
    specialties: ['reviews', 'ratings', 'feedback'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-27-bookmarks',
    name: 'Bookmark Agent',
    specialties: ['bookmarks', 'favorites', 'collections'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-28-social',
    name: 'Social Features Agent',
    specialties: ['social', 'connections', 'network'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-29-booking',
    name: 'Booking System Agent',
    specialties: ['booking', 'reservations', 'scheduling'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-30-support',
    name: 'Support System Agent',
    specialties: ['support', 'tickets', 'helpdesk'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS - Intelligence Division (Layers 31-46)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-31-ai-infrastructure',
    name: 'AI Infrastructure Agent',
    specialties: ['ai', 'infrastructure', 'ml_ops'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-32-model-routing',
    name: 'Model Routing Agent',
    specialties: ['model_routing', 'claude', 'gpt4', 'gemini'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-33-prompt-engineering',
    name: 'Prompt Engineering Agent',
    specialties: ['prompts', 'engineering', 'optimization'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-34-embeddings',
    name: 'Embeddings Agent',
    specialties: ['embeddings', 'vectors', 'similarity'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-35-agent-management',
    name: 'AI Agent Management Agent',
    specialties: ['agent_management', 'orchestration', 'coordination'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-36-memory',
    name: 'Memory Systems Agent',
    specialties: ['memory', 'context', 'history'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-37-learning',
    name: 'Learning Systems Agent',
    specialties: ['learning', 'training', 'improvement'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-38-nlp',
    name: 'NLP Agent',
    specialties: ['nlp', 'text_processing', 'language'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-39-sentiment',
    name: 'Sentiment Analysis Agent',
    specialties: ['sentiment', 'analysis', 'emotions'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-40-classification',
    name: 'Classification Agent',
    specialties: ['classification', 'categorization', 'ml'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-41-image-processing',
    name: 'Image Processing Agent',
    specialties: ['images', 'vision', 'processing'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-42-voice',
    name: 'Voice Processing Agent',
    specialties: ['voice', 'speech', 'audio'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-43-video',
    name: 'Video Processing Agent',
    specialties: ['video', 'processing', 'streaming'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-44-translation',
    name: 'Translation Agent',
    specialties: ['translation', 'i18n', 'localization'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-45-reasoning',
    name: 'Reasoning Engine Agent',
    specialties: ['reasoning', 'logic', 'inference'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-46-integration',
    name: 'Integration Layer Agent',
    specialties: ['integrations', 'apis', 'external_services'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS - Platform Division (Layers 47-56)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-47-load-balancing',
    name: 'Load Balancing Agent',
    specialties: ['load_balancing', 'distribution', 'scaling'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-48-performance',
    name: 'Performance Monitoring Agent',
    specialties: ['performance', 'monitoring', 'optimization'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-49-security',
    name: 'Security Hardening Agent',
    specialties: ['security', 'hardening', 'protection'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-50-devops',
    name: 'DevOps Automation Agent',
    specialties: ['devops', 'ci_cd', 'automation'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-51-testing',
    name: 'Testing Automation Agent',
    specialties: ['testing', 'qa', 'automation'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-52-documentation',
    name: 'Documentation System Agent',
    specialties: ['documentation', 'guides', 'wiki'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-53-api-versioning',
    name: 'API Versioning Agent',
    specialties: ['api_versioning', 'compatibility', 'migration'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-54-rate-limiting',
    name: 'Rate Limiting Agent',
    specialties: ['rate_limiting', 'throttling', 'protection'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-55-webhooks',
    name: 'Webhook Management Agent',
    specialties: ['webhooks', 'callbacks', 'events'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-56-backup',
    name: 'Backup & Recovery Agent',
    specialties: ['backup', 'recovery', 'disaster_recovery'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // LAYER AGENTS - Extended Division (Layers 57-61)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'layer-57-third-party',
    name: 'Third-Party Integration Agent',
    specialties: ['third_party', 'integrations', 'apis'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-58-integration-tracking',
    name: 'Integration Tracking Agent',
    specialties: ['tracking', 'monitoring', 'integrations'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-59-data-sync',
    name: 'Data Synchronization Agent',
    specialties: ['sync', 'replication', 'consistency'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-60-migration',
    name: 'Migration Agent',
    specialties: ['migration', 'data_transfer', 'imports'],
    maxLoad: 5,
  },
  {
    agentId: 'layer-61-supabase',
    name: 'Supabase Expertise Agent',
    specialties: ['supabase', 'postgresql', 'backend'],
    maxLoad: 5,
  },

  // ═══════════════════════════════════════════════════════════════
  // EXPERT AGENTS (15)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'expert-10-research',
    name: 'AI Research Expert',
    specialties: ['research', 'ai', 'ml', 'papers'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-11-uiux',
    name: 'UI/UX Design Expert (Aurora)',
    specialties: ['ui', 'ux', 'design', 'figma', 'prototyping'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-12-dataviz',
    name: 'Data Visualization Expert',
    specialties: ['data_visualization', 'charts', 'd3', 'analytics'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-13-content',
    name: 'Content & Media Expert',
    specialties: ['content', 'media', 'writing', 'editing'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-14-seo',
    name: 'SEO Expert',
    specialties: ['seo', 'marketing', 'optimization'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-15-accessibility',
    name: 'Accessibility Expert',
    specialties: ['accessibility', 'a11y', 'wcag', 'inclusive_design'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-16-mobile',
    name: 'Mobile Development Expert',
    specialties: ['mobile', 'ios', 'android', 'react_native'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-17-blockchain',
    name: 'Blockchain Expert',
    specialties: ['blockchain', 'web3', 'crypto', 'smart_contracts'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-18-iot',
    name: 'IoT Expert',
    specialties: ['iot', 'hardware', 'sensors', 'embedded'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-19-gaming',
    name: 'Gaming Expert',
    specialties: ['gaming', 'unity', 'unreal', 'game_dev'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-20-ar-vr',
    name: 'AR/VR Expert',
    specialties: ['ar', 'vr', 'xr', 'metaverse'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-21-compliance',
    name: 'Compliance Expert',
    specialties: ['compliance', 'gdpr', 'hipaa', 'regulations'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-22-legal',
    name: 'Legal Tech Expert',
    specialties: ['legal', 'contracts', 'terms', 'privacy'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-23-finance',
    name: 'Financial Systems Expert',
    specialties: ['finance', 'fintech', 'banking', 'payments'],
    maxLoad: 3,
  },
  {
    agentId: 'expert-24-healthcare',
    name: 'Healthcare Tech Expert',
    specialties: ['healthcare', 'medical', 'telemedicine', 'ehr'],
    maxLoad: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  // SPECIALIZED AGENTS (13+)
  // ═══════════════════════════════════════════════════════════════
  {
    agentId: 'agent-73-tour-guide',
    name: 'Tour Guide',
    specialties: ['onboarding', 'tours', 'tooltips', 'user_journey'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-74-subscription',
    name: 'Subscription Manager',
    specialties: ['subscriptions', 'stripe', 'billing', 'payments'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-75-avatar',
    name: 'Avatar Manager (Luma 3D)',
    specialties: ['3d', 'avatars', 'luma', 'generation'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-76-admin',
    name: 'Admin Assistant',
    specialties: ['admin', 'management', 'moderation', 'analytics'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-77-site-builder',
    name: 'AI Site Builder',
    specialties: ['ai', 'websites', 'generation', 'no_code'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-78-visual-editor',
    name: 'Visual Editor',
    specialties: ['visual_editing', 'wysiwyg', 'inspector', 'ui'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-79-qa',
    name: 'Quality Validator',
    specialties: ['qa', 'testing', 'playwright', 'validation'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-80-learning',
    name: 'Learning Coordinator',
    specialties: ['learning', 'knowledge', 'patterns', 'distribution'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-110-code-intelligence',
    name: 'Code Intelligence',
    specialties: ['code_analysis', 'suggestions', 'intelligence'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-111-cross-phase',
    name: 'Cross-Phase Learning',
    specialties: ['learning', 'phases', 'optimization'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-112-dependency',
    name: 'Dependency Intelligence',
    specialties: ['dependencies', 'mapping', 'analysis'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-113-pattern',
    name: 'Pattern Recognition',
    specialties: ['patterns', 'recognition', 'ml'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-114-federated',
    name: 'Federated Learning',
    specialties: ['federated_learning', 'distributed', 'ml'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-115-knowledge-graph',
    name: 'Knowledge Graph',
    specialties: ['knowledge_graph', 'relationships', 'ontology'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-116-meta',
    name: 'Meta-Intelligence',
    specialties: ['meta_learning', 'ai_about_ai', 'reflection'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-126-git',
    name: 'Git Operations Specialist',
    specialties: ['git', 'version_control', 'commits', 'branches'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-127-deployment',
    name: 'Deployment Safety Engineer',
    specialties: ['deployment', 'rollback', 'safety', 'zero_downtime'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-128-voice-visual',
    name: 'Voice + Visual Context Coordinator',
    specialties: ['voice', 'visual', 'context', 'multimodal'],
    maxLoad: 5,
  },
  {
    agentId: 'agent-131-vibe-coding',
    name: 'Vibe Coding Specialist',
    specialties: ['autonomous_coding', 'frontend', 'ui', 'react', 'tailwind'],
    maxLoad: 8,
  },
  {
    agentId: 'agent-143-observability',
    name: 'Observability Specialist',
    specialties: ['observability', 'monitoring', 'logging', 'tracing'],
    maxLoad: 5,
  },
];

async function seedAgents() {
  console.log('🌱 Starting agent seeding...\n');
  console.log(`📊 Total agents to seed: ${agents.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const agent of agents) {
    try {
      await db.insert(agentCapabilities).values({
        ...agent,
        currentLoad: 0,
        successRate: 0,
        avgResponseTime: 0,
        totalTasksCompleted: 0,
        isActive: true,
      });
      
      successCount++;
      console.log(`✅ ${agent.agentId.padEnd(30)} - ${agent.name}`);
    } catch (error: any) {
      if (error?.code === '23505') {
        // Duplicate key - agent already exists
        console.log(`⚠️  ${agent.agentId.padEnd(30)} - Already exists (skipped)`);
      } else {
        errorCount++;
        console.log(`❌ ${agent.agentId.padEnd(30)} - Error: ${error.message}`);
      }
    }
  }

  console.log('\n' + '═'.repeat(80));
  console.log(`🎉 Seeding complete!`);
  console.log(`   ✅ Successfully created: ${successCount} agents`);
  console.log(`   ⚠️  Skipped (duplicates): ${agents.length - successCount - errorCount} agents`);
  console.log(`   ❌ Errors: ${errorCount} agents`);
  console.log('═'.repeat(80));

  process.exit(0);
}

// Run the seeding
seedAgents().catch((error) => {
  console.error('❌ Fatal error during seeding:', error);
  process.exit(1);
});
