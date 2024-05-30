export type Dimension = {
  id: string;
  country: string;
  business_unit: string;
};

export type Indicator =
  | 'co2_emissions'
  | 'total_revenue'
  | 'female_headcount'
  | 'male_headcount'
  | 'total_headcount'
  | 'gender_parity_ratio';

export type IndicatorValue = {
  indicator: Indicator;
  period: string;
  value: number;
};

export type Period = 'monthly' | 'yearly';
