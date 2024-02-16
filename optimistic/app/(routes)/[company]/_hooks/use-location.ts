import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../_server-actions/get-location";

export const useLocation = (ID: number | null) => {
  const query = useQuery({
    queryKey: ["get-location", ID],
    queryFn: async () => await getLocation(ID!),
    enabled: ID !== null,
  });

  return query;
};
