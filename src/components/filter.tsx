import { Indicator } from "../types.ts";

const indicatorOptions: { id: Indicator; name: string }[] = [
  {
    id: "co2_emissions",
    name: "CO2 emissions",
  },
];

const Filter = () => {
  return (
    <select>
      <option value="">All</option>
      {indicatorOptions.map((indicatorOption) => (
        <option key={indicatorOption.id} value={indicatorOption.id}>
          {indicatorOption.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
