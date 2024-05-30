export type Dimension = {
  id: number;
  country: string;
  business_unit: string;
};

export type Indicator = "co2_emissions";

export type IndicatorValue = {
  dimension: number;
  date: string;
  indicator: Indicator;
  value: number;
};
