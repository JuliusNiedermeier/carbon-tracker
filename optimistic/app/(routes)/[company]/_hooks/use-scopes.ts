import { useQuery } from "@tanstack/react-query";
import { listScopes } from "../_server-actions/list-scopes";

export const useScopes = () => {
  const { data } = useQuery({
    queryKey: ["list-scopes"],
    queryFn: async () => await listScopes(),
    initialData: [],
  });

  return data;
};
