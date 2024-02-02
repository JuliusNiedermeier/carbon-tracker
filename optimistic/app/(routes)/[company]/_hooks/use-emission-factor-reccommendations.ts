import { useQuery } from "@tanstack/react-query";
import { FilterOptions, getEmissionFactorReccommendations } from "../_server-actions/get-emission-factor-reccommendations";

export type EmissionFactorReccommendation = Awaited<ReturnType<typeof getEmissionFactorReccommendations>>[number];

export const useEmissionFactorReccommendations = (searchTerm: string, filters?: FilterOptions) => {
  const factorQuery = useQuery({
    queryKey: ["get-emission-factor-reccommendation", searchTerm, filters?.unitIds, filters?.years, filters?.emissionFactorSourceIds],
    queryFn: async () => await getEmissionFactorReccommendations(searchTerm, filters),
    enabled: searchTerm.length > 2,
    initialData: [],
  });

  return factorQuery;
};
