import { useQuery } from '@tanstack/react-query';
import { Indicator, IndicatorValue, Period } from '../types.ts';
import { formatApiDate, formatMonth, formatYear, parseApiDate } from '../utils.ts';

type InternalValue = {
  dimension: number;
  date: string;
  indicator: Indicator;
  value: number;
};

const periodFormatter: Record<Period, (date: Date) => string> = {
  monthly: formatMonth,
  yearly: formatYear,
};

const getIndicatorParams = (indicator: Indicator) => {
  if (indicator === 'total_headcount' || indicator === 'gender_parity_ratio')
    return `&indicators=male_headcount&indicators=female_headcount`;
  return `&indicators=${indicator}`;
};

const calculateRatio = (
  indicator: Indicator,
  firstValues: IndicatorValue[],
  secondValues: IndicatorValue[],
): IndicatorValue[] => {
  return firstValues.map((value) => {
    const totalValue = value.value + (secondValues.find((other) => other.period === value.period)?.value || 0);
    return {
      period: value.period,
      indicator,
      value: totalValue === 0 ? 0 : value.value / totalValue,
    };
  });
};

const aggregateValues = (values: InternalValue[], period: Period, indicator: Indicator) => {
  const result: IndicatorValue[] = [];
  values
    .filter((value) => value.indicator === indicator)
    .reduce((accumulator, currentValue) => {
      const periodStr = periodFormatter[period](parseApiDate(currentValue.date));
      const datum = accumulator.find((d) => d.period === periodStr);
      if (!datum) accumulator.push({ period: periodStr, value: currentValue.value, indicator });
      else datum.value += currentValue.value;
      return accumulator;
    }, result);
  return result.sort((a, b) => a.period.localeCompare(b.period));
};

export const useGetIndicatorValuesQuery = ({
  dimensions,
  indicator,
  start,
  end,
  period,
}: {
  dimensions?: number[];
  indicator?: Indicator;
  start?: Date;
  end?: Date;
  period: Period;
}) => {
  const { data: indicatorValues } = useQuery<IndicatorValue[], Error>({
    queryKey: ['indicators', indicator, start, end, dimensions, period],
    queryFn: async () => {
      const dimensionsParam = dimensions ? dimensions!.map((dimension) => `&dimensions=${dimension}`).join('') : '';
      const result = await fetch(
        `http://localhost:8080/indicators?start=${formatApiDate(start!)}&end=${formatApiDate(end!)}${dimensionsParam}${getIndicatorParams(indicator!)}`,
      );
      const data = await result.json();
      if (indicator === 'gender_parity_ratio') {
        return calculateRatio(
          'gender_parity_ratio',
          aggregateValues(data.results, period, 'female_headcount'),
          aggregateValues(data.results, period, 'male_headcount'),
        );
      }
      return aggregateValues(data.results, period, indicator!);
    },
    enabled: !!indicator && !!start && !!end,
  });
  return { indicatorValues };
};
