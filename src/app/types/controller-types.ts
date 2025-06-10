export type CvVariable = {
  id: number;
  controllerId: number;
  name: string;
  description: string;
  order: number;
  units: string;
  isCritical: 'true' | 'false';
  lowEngineeringLimit: number;
  highEngineeringLimit: number;
  weight: number;
  priority: 'low' | 'medium' | 'high';
  linearCoefficient: number;
  quadraticCoefficient: number;
  qpTarget: number;
  lowSoftLimit: number;
  highSoftLimit: number;
  softLimitRate: number;
  optimizationRate: number;
  status: 'active' | 'inactive' | null;
  lowLimit: number | null;
  highLimit: number | null;
  value: number | null;
  predictedValue: number | null;
};

export type ControllerVariables = {
  cvs: CvVariable[];
};