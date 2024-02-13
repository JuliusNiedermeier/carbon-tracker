import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../_server-actions/get-company";

export const useCompany = (ID: number | null) => {
  const query = useQuery({
    queryKey: ["get-company", ID],
    queryFn: async () => await getCompany(ID!),
    enabled: ID !== null,
  });

  return query;
};
