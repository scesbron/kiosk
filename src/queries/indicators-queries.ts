import { useQuery } from "@tanstack/react-query";

export const useGetIndicatorsQuery = () => {
  const { data: indicators } = useQuery({
    queryKey: ["indicators"],
    queryFn: () => {
      return [];
    },
  });
  return { indicators };
};
