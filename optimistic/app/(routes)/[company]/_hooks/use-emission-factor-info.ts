import { useQuery } from "@tanstack/react-query";
import { getEmissionFactorInfo } from "../_server-actions/get-emission-factor-info";

export type EmissionFactorInfo = Awaited<ReturnType<typeof getEmissionFactorInfo>>;

export const useEmissionFactorInfo = (emissionFactorID: number | null) => {
  const query = useQuery({
    queryKey: ["get-emission-factor-info", emissionFactorID],
    queryFn: async () => await getEmissionFactorInfo(emissionFactorID!),
    enabled: emissionFactorID !== null,
  });

  return query;
};
