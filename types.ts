
export enum ModelType {
  LINEAR_REGRESSION = 'Linear Regression',
  LOGISTIC_REGRESSION = 'Logistic Regression',
  K_MEANS = 'K-Means Clustering'
}

export interface SimulationResult {
  columns: string[];
  data: Array<Record<string, string | number>>;
}

export interface ResourceItem {
  title: string;
  description: string;
  syntax: string;
  useCase: string;
}
