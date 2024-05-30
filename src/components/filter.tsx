import { Dimension, Indicator, Period } from '../types.ts';
import { ChangeEvent } from 'react';
import { useGetDimensionsQuery } from '../queries/dimensions-queries.ts';
import { onlyUnique } from '../utils.ts';
import DatePicker from './date-picker.tsx';
import './filter.css';

const indicatorOptions: { id: Indicator; name: string }[] = [
  { id: 'co2_emissions', name: 'CO2 emissions' },
  { id: 'total_revenue', name: 'Total revenue' },
  { id: 'total_headcount', name: 'Total headcount' },
  { id: 'gender_parity_ratio', name: 'Gender parity ratio' },
];

const periodOptions: { id: Period; name: string }[] = [
  { id: 'monthly', name: 'Monthly' },
  { id: 'yearly', name: 'Yearly' },
];

const buildDimensionsOptions = (dimensions: Dimension[]) => {
  const countries = dimensions?.map((dimension) => dimension.country).filter(onlyUnique);
  return countries.flatMap((country) => [
    {
      name: country,
      value: JSON.stringify(
        dimensions.filter((dimension) => dimension.country === country).map((dimension) => dimension.id),
      ),
    },
    ...dimensions
      .filter((dimension) => dimension.country === country)
      .map((dimension) => ({
        name: `${dimension.country} - ${dimension.business_unit}`,
        value: JSON.stringify([dimension.id]),
      })),
  ]);
};

export type FilterProps = {
  period: Period;
  indicator?: Indicator;
  start?: Date;
  end?: Date;
  dimensionIds?: number[];
  setPeriod: (period: Period) => void;
  setIndicator: (indicator?: Indicator) => void;
  setStart: (start?: Date) => void;
  setEnd: (end?: Date) => void;
  setDimensionIds: (ids?: number[]) => void;
};

const Filter = ({
  period,
  indicator,
  start,
  end,
  dimensionIds,
  setPeriod,
  setIndicator,
  setStart,
  setEnd,
  setDimensionIds,
}: FilterProps) => {
  const { dimensions } = useGetDimensionsQuery();

  const selectIndicator = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    // We know that options values are of type Indicator
    setIndicator(value === '' ? undefined : (value as Indicator));
  };

  const onPeriodChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    // We know that options values are of type Period
    setPeriod(value as Period);
  };

  const onDimensionsChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setDimensionIds(value === '' ? undefined : (JSON.parse(value) as number[]));
  };

  return (
    <div>
      <div className='filter-row'>
        <label>Indicator</label>
        <select onChange={selectIndicator} defaultValue={indicator}>
          <option value=''>All</option>
          {indicatorOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {!!dimensions && (
        <div className='filter-row'>
          <label>Dimension</label>
          <select onChange={onDimensionsChange} defaultValue={JSON.stringify(dimensionIds)}>
            <option value=''>All</option>
            {buildDimensionsOptions(dimensions).map((dimension) => (
              <option key={dimension.name} value={dimension.value}>
                {dimension.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className='filter-row'>
        <label>Period</label>
        <select onChange={onPeriodChange} defaultValue={period}>
          {periodOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className='filter-row'>
        <label>Start date</label>
        <DatePicker selectedDate={start} setSelectedDate={setStart} />
      </div>
      <div className='filter-row'>
        <label>End date</label>
        <DatePicker selectedDate={end} setSelectedDate={setEnd} />
      </div>
    </div>
  );
};

export default Filter;
