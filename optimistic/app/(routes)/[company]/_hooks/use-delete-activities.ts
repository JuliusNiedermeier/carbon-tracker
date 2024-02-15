import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { deleteActivities } from "../_server-actions/delete-activities";

export const useDeleteActivities = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["delete-activities"],

    mutationFn: async (variables: { IDs: number[]; rootCompanySlug: string }) => {
      return await deleteActivities(variables.IDs);
    },

    onMutate: (variables) => {
      const previousActivities = [...(qc.getQueryData<Activity[]>(["list-activities", variables.rootCompanySlug]) || [])];

      qc.setQueryData<Activity[]>(["list-activities", variables.rootCompanySlug], (activities) =>
        activities?.filter((activity) => !variables.IDs.includes(activity.id))
      );

      return { previousActivities };
    },

    // Do nothing on success. Deleted activities have already been removed.
    // onSuccess: () => {},

    onError: (error, variables, context) => {
      qc.setQueryData<Activity[]>(["list-activities", variables.rootCompanySlug], context?.previousActivities);
    },
  });
};
