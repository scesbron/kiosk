import { useQuery } from "@tanstack/react-query";
import { Dimension } from "../types.ts";

const mockResult = {
  results: [
    {
      id: 0,
      country: "Germany",
      business_unit: "Manufacturing",
    },
    {
      id: 1,
      country: "Germany",
      business_unit: "IT",
    },
  ],
};

export const useGetDimensionsQuery = () => {
  const { data: dimensions } = useQuery<Dimension[], Error>({
    queryKey: ["dimensions"],
    queryFn: async () => {
      // const result = await fetch('http://localhost:8080/dimensions');
      // const data = await result.json();
      const data = mockResult;
      return data.results;
    },
  });
  return { dimensions };
};
