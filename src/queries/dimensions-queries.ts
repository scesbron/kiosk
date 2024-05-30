import { useQuery } from '@tanstack/react-query';
import { Dimension } from '../types.ts';

export const useGetDimensionsQuery = () => {
  const { data: dimensions } = useQuery<Dimension[], Error>({
    queryKey: ['dimensions'],
    queryFn: async () => {
      const result = await fetch('http://localhost:8080/dimensions');
      const data = await result.json();
      return data.results;
    },
  });
  return { dimensions };
};
