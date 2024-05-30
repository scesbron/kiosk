import Title from "../components/title.tsx";
import { useGetDimensionsQuery } from "../queries/dimensions-queries.ts";
import Filter from "../components/filter.tsx";

const Dashboard = () => {
  const { dimensions } = useGetDimensionsQuery();
  return (
    <div>
      {dimensions?.map((dimension) => (
        <div>
          <div>{dimension.id}</div>
          <div>{dimension.country}</div>
          <div>{dimension.business_unit}</div>
        </div>
      ))}
      <Filter />
      <Title title="total revenue" />
      <Title title="total CO₂ emissions" />
      <Title title="total headcount" />
      <Title title="gender parity ratio" />
    </div>
  );
};

export default Dashboard;
