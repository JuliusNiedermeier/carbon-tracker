import { useQuery } from "@tanstack/react-query";
import { listUnits } from "../_server-actions/list-units";

export type Unit = ReturnType<typeof useUnits>[number];

export const useUnits = () => {
  const { data } = useQuery({
    queryKey: ["list-units"],
    queryFn: async () => await listUnits(),
    initialData: [],
  });

  return data;
};
