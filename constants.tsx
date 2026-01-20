
import React from 'react';
import { 
  Layout, 
  TrendingUp,
  PlusCircle,
  Users,
  ShoppingBag,
  LineChart,
  BrainCircuit,
  Target,
  Sparkles,
  Bot,
  Layers,
  Rocket
} from 'lucide-react';
import { ModelType, ResourceItem } from './types';

export const NAVIGATION_LINKS = [
  { path: '/', label: 'Overview', icon: <Layout className="w-5 h-5" /> },
  { path: '/startup-journey', label: 'Startup Journey', icon: <Rocket className="w-5 h-5" /> },
  { path: '/value-prop', label: 'Why BigQuery AI?', icon: <TrendingUp className="w-5 h-5" /> },
  { path: '/wizard-demo', label: 'BigQuery ML Demo', icon: <Target className="w-5 h-5" /> },
  { path: '/ai-features', label: 'Custom AI Functions', icon: <Sparkles className="w-5 h-5" /> },
  { path: '/managed-ai', label: 'Managed AI Functions', icon: <Layers className="w-5 h-5" /> },
];

export interface BQMLModelDetail {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  startupUseCases: {
    product: string;
    internal: string;
  };
  sellerInsights: {
    valueProp: string;
  };
}

export const BQML_MODELS: BQMLModelDetail[] = [
  {
    id: 'regression',
    title: 'Revenue & Price Predictor',
    desc: 'Forecast exact numbers like next month\'s sales or ideal product pricing.',
    icon: <LineChart className="w-5 h-5" />,
    startupUseCases: {
      product: "Dynamic pricing engines that adjust based on demand.",
      internal: "Sales team revenue forecasting for next quarter."
    },
    sellerInsights: {
      valueProp: "Helps customers stop guessing their revenue and start planning with data-backed targets.",
    }
  },
  {
    id: 'classification',
    title: 'Churn & Fraud Detector',
    desc: 'Identify "Yes/No" outcomes—will a customer leave? Is a transaction fake?',
    icon: <Target className="w-5 h-5" />,
    startupUseCases: {
      product: "Automatic blocking of high-risk transactions.",
      internal: "Identifying 'at-risk' customers before they cancel subscriptions."
    },
    sellerInsights: {
      valueProp: "Reduces financial loss by catching fraud early and increases retention by saving customers.",
    }
  },
  {
    id: 'clustering',
    title: 'Customer Segmenter',
    desc: 'Group users into profiles like "High Spenders" or "Window Shoppers" automatically.',
    icon: <Users className="w-5 h-5" />,
    startupUseCases: {
      product: "Serving different app experiences to different user types.",
      internal: "Creating targeted marketing campaigns for specific user groups."
    },
    sellerInsights: {
      valueProp: "Moves customers away from 'one-size-fits-all' marketing to hyper-personalized experiences.",
    }
  },
  {
    id: 'forecasting',
    title: 'Demand Forecaster',
    desc: 'Predict future demand for products while accounting for holidays and seasons.',
    icon: <TrendingUp className="w-5 h-5" />,
    startupUseCases: {
      product: "Smart inventory management for retail apps.",
      internal: "Server capacity planning for expected traffic spikes."
    },
    sellerInsights: {
      valueProp: "Ensures customers never run out of stock during peak times, maximizing every sales opportunity.",
    }
  },
  {
    id: 'recommendation',
    title: 'Product Recommender',
    desc: 'The "Netflix Style" engine. Shows users exactly what they are most likely to buy next.',
    icon: <ShoppingBag className="w-5 h-5" />,
    startupUseCases: {
      product: "Increasing average order value with 'Recommended for you'.",
      internal: "Suggesting next-best-actions for B2B sales reps."
    },
    sellerInsights: {
      valueProp: "Instantly increases top-line revenue by surfacing relevant products users didn't know they needed.",
    }
  },
  {
    id: 'xgboost',
    title: 'Advanced Pattern Finder',
    desc: 'Our most powerful tool for finding complex hidden patterns in messy data.',
    icon: <BrainCircuit className="w-5 h-5" />,
    startupUseCases: {
      product: "Advanced credit scoring for fintech platforms.",
      internal: "Optimizing logistics and delivery routes for efficiency."
    },
    sellerInsights: {
      valueProp: "Gives technical startups a 'Big Tech' advantage by processing complex data relationships easily.",
    }
  }
];

export const VALUE_PROPS = [
  {
    title: "Zero Data Movement",
    desc: "Train models where your data lives. Eliminate the need to export data to external ML platforms.",
    icon: <PlusCircle className="w-5 h-5" />
  },
  {
    title: "Built-in GUI",
    desc: "Use the BigQuery console to build, evaluate, and deploy models visually. No coding required.",
    icon: <Layout className="w-5 h-5" />
  },
  {
    title: "Serverless Scaling",
    desc: "Leverage BigQuery's distributed architecture to train on petabytes of data without managing infrastructure.",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    title: "Production Ready",
    desc: "Model serving is built-in. Use the console for real-time or batch predictions instantly.",
    icon: <Target className="w-5 h-5" />
  }
];

// SQL Templates for the Simulation Console
export const SQL_TEMPLATES: Record<ModelType, string> = {
  [ModelType.LINEAR_REGRESSION]: `CREATE OR REPLACE MODEL \`startup_training_v1.revenue_predictor\`
OPTIONS(model_type='linear_reg', input_label_cols=['total_sales']) AS
SELECT 
  category,
  total_sales,
  promotion_active,
  region
FROM \`historical_data.sales_records\`
WHERE date BETWEEN '2023-01-01' AND '2023-12-31'`,

  [ModelType.LOGISTIC_REGRESSION]: `CREATE OR REPLACE MODEL \`startup_training_v1.churn_detector\`
OPTIONS(model_type='logistic_reg', input_label_cols=['has_churned']) AS
SELECT 
  tenure,
  avg_spend,
  support_tickets,
  has_churned
FROM \`customer_data.activity_logs\``,

  [ModelType.K_MEANS]: `CREATE OR REPLACE MODEL \`startup_training_v1.customer_segments\`
OPTIONS(model_type='kmeans', num_clusters=3) AS
SELECT 
  avg_order_value,
  purchase_frequency,
  recency_days
FROM \`customer_data.profiles\``
};

export const AI_SQL_TEMPLATES = {
  SCALE_ENRICHMENT: `/* Custom AI Functions: High-Scale Product Categorization (1.5M Rows) */
SELECT
  product_id,
  raw_description,
  AI.GENERATE(
    ( "Categorize this product description: ", raw_description ),
    output_schema => 'category STRING, color STRING, target_audience STRING'
  ).*
FROM \`marketplace_data.product_catalog_1_5M_rows\`
WHERE last_updated >= '2024-01-01';`,

  ENTITY_EXTRACTION: `/* Custom AI Functions: Large Scale Entity Extraction (2.8M Rows) */
SELECT
  feedback_id,
  user_comment,
  AI.GENERATE(
    user_comment,
    output_schema => '''name STRING, age INT64, location STRING, sentiment STRING, urgency BOOL'''
  ) AS info
FROM \`customer_service.user_feedback_logs_2_8M_rows\`
WHERE sentiment_score < 0.2;`,

  GROUNDING: `/* Custom AI Functions: Real-time Web Grounding across Inventory (850k Rows) */
SELECT
  sku_name,
  AI.GENERATE(
    ('Research current market trends for ', sku_name, ' and suggest a competitive price range.'),
    model_params => JSON '{"tools": [{"googleSearch": {}}]}'
  ) AS market_analysis
FROM \`ecom_data.trending_products_850k_rows\`
LIMIT 1000;`,

  AI_IF_PHISHING: `/* AI.IF: Massive Scale Security Filtering (5.2M Rows) */
SELECT
  email_id,
  sender,
  subject
FROM \`security_logs.internal_emails_5M_rows\`
WHERE
  AI.IF(
    ( 'The following email contains phishing attempts or suspicious links: ', body ),
    connection_id => 'us.gemini_connection'
  );`,

  AI_SCORE_RESUMES: `/* AI.SCORE: Automated Talent Ranking (120k Resumes) */
SELECT
  candidate_name,
  AI.SCORE(
    ( 'On a scale of 1-100, rate how well this resume matches an AI Engineer role: ', resume_text ),
    connection_id => 'us.gemini_connection'
  ) AS hireability_score
FROM \`hr_data.talent_pool_120k\`
ORDER BY hireability_score DESC
LIMIT 10;`,

  AI_CLASSIFY_TICKETS: `/* AI.CLASSIFY: Support Ticket Auto-Routing (2.1M Rows) */
SELECT
  ticket_id,
  user_query,
  AI.CLASSIFY(
    user_query,
    categories => ['Technical Support', 'Billing', 'Account Access', 'Feature Request', 'Other'],
    connection_id => 'us.gemini_connection'
  ) AS route_to
FROM \`support_ops.ticket_history_2M\`
LIMIT 500;`,

  MANAGED_TEXT: `/* ML.GENERATE_TEXT: Simplified Managed LLM Interface */
SELECT
  ml_generate_text_result,
  feedback_id
FROM ML.GENERATE_TEXT(
  MODEL \`project.dataset.gemini_pro\`,
  (SELECT feedback_id, prompt FROM \`customer_data.feedback\`),
  STRUCT(0.2 AS temperature, 1024 AS max_output_tokens)
);`,

  MANAGED_EMBEDDING: `/* ML.GENERATE_EMBEDDING: Vectorization for RAG Search */
SELECT
  text_embedding,
  content_id
FROM ML.GENERATE_EMBEDDING(
  MODEL \`project.dataset.embedding_model\`,
  (SELECT content_id, content FROM \`knowledge_base.articles\`),
  STRUCT('RETRIEVAL_DOCUMENT' AS task_type)
);`
};

// Resource Cards for the SQL Syntax Reference page
export const RESOURCE_CARDS: ResourceItem[] = [
  {
    title: "CREATE MODEL",
    description: "The primary command to start training. BigQuery handles the infrastructure allocation automatically.",
    syntax: `CREATE OR REPLACE MODEL \`project.dataset.model_name\`
OPTIONS(model_type='linear_reg') AS
SELECT * FROM \`data_table\``,
    useCase: "Training a new predictor for sales or churn."
  },
  {
    title: "ML.EVALUATE",
    description: "Assess the accuracy of your model using standard metrics like R² or precision/recall.",
    syntax: `SELECT * FROM ML.EVALUATE(
  MODEL \`project.dataset.model_name\`,
  (SELECT * FROM \`test_data\`)
)`,
    useCase: "Checking if the model is ready for production."
  },
  {
    title: "ML.PREDICT",
    description: "Generate predictions in real-time or batch directly from your existing data.",
    syntax: `SELECT * FROM ML.PREDICT(
  MODEL \`project.dataset.model_name\`,
  (SELECT * FROM \`new_data\`)
)`,
    useCase: "Surfacing 'Recommended for You' items in a web app."
  }
];
