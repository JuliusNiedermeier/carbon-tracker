import { useQuery } from "@tanstack/react-query";
import { listLocations } from "../_server-actions/list-locations";

export const useCompanyLocations = (companyID: number | null) => {
  const query = useQuery({
    queryKey: ["list-company-locations", companyID],
    queryFn: async () => await listLocations(companyID!),
    enabled: companyID !== null,
  });

  return query;
};
