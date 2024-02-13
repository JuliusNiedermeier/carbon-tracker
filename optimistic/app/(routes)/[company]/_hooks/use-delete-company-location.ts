import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocation } from "../_server-actions/delete-company-location";

export const useDeleteCompanyLocation = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-company-location"],

    mutationFn: async (variables: { ID: number }) => {
      return await deleteLocation(variables.ID);
    },

    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["list-company-locations", data.companyId] });
    },
  });

  return mutate;
};
