import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "../_server-actions/create-company";

export const useCreateCompany = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create-company"],

    // Perform the network request
    mutationFn: async (variables: { name: string; parentCompanyID: number }) => {
      return await createCompany(variables.name, variables.parentCompanyID);
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["get-corporate-group"] });
    },
  });

  return mutate;
};
