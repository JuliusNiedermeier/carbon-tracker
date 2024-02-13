import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "../_server-actions/delete-company";

export const useDeleteCompany = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-company"],

    mutationFn: async (variables: { rootCompanySlug: string; ID: number }) => {
      return await deleteCompany(variables.ID);
    },

    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ["get-corporate-group", variables.rootCompanySlug] });
    },
  });

  return mutate;
};
