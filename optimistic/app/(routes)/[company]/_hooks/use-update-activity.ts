import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { updateActivity } from "../_server-actions/update-activity";

export const useUpdateActivity = (rootCompanySlug: string) => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["update-activity", rootCompanySlug],
    // Perform the network request
    mutationFn: async (variables: { activityID: Activity["id"]; column: keyof Activity; value: Activity[keyof Activity] }) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await updateActivity(variables.activityID, variables.column, variables.value);
      // const response = await fetch(`/api/activities/${variables.activityID}/${variables.column}?value=${variables.value}`, { method: "PUT" });
      // if (!response.ok) throw new Error("Failed to fetch");
      // return response.text();
    },
    // Optimistically update local activities
    onMutate: async (variables) => {
      await qc.cancelQueries({ queryKey: ["list-activities", rootCompanySlug] });
      const previousActivities = qc.getQueryData<Activity[]>(["list-activities", rootCompanySlug])?.map((activity) => ({ ...activity }));

      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (oldActivities) => {
        return oldActivities?.map((oldActivity) =>
          oldActivity.id === variables.activityID ? { ...oldActivity, [variables.column]: variables.value } : oldActivity
        );
      });

      return { previousActivities };
    },
    // Rollback the optimistic update
    onError: (error, newItem, context) => {
      if (!context) return;
      qc.setQueryData(["list-activities", rootCompanySlug], context.previousActivities);
    },
  });

  return mutate;
};
