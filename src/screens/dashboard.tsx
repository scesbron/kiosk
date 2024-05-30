import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './dashboard.css';
import Filter from '../components/filter.tsx';
import { useGetIndicatorValuesQuery } from '../queries/indicator-values-queries.ts';
import { Indicator, Period } from '../types.ts';

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>('monthly');
  const [indicator, setIndicator] = useState<Indicator>();
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const [dimensions, setDimensions] = useState<number[]>();
  const { indicatorValues } = useGetIndicatorValuesQuery({ indicator, start, end, dimensions, period });

  return (
    <div className='dashboard'>
      <div className='filter'>
        <Filter
          period={period}
          indicator={indicator}
          start={start}
          end={end}
          dimensionIds={dimensions}
          setPeriod={setPeriod}
          setIndicator={setIndicator}
          setStart={setStart}
          setEnd={setEnd}
          setDimensionIds={setDimensions}
        />
      </div>
      <div className='chart'>
        <LineChart
          width={800}
          height={500}
          data={indicatorValues}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='period' />
          <YAxis width={100} />
          <Tooltip />
          <Legend />
          <Line name={indicator} type='monotone' dataKey='value' stroke='#8884d8' activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
