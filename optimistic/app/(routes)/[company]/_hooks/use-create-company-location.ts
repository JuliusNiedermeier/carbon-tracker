import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyLocation } from "../_server-actions/create-company-location";

export const useCreateCompanyLocation = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create-company-location"],

    // Perform the network request
    mutationFn: async (variables: { companyID: number; name: string }) => {
      return await createCompanyLocation(variables.companyID, variables.name);
    },

    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ["list-company-locations", variables.companyID] });
    },
  });

  return mutate;
};
