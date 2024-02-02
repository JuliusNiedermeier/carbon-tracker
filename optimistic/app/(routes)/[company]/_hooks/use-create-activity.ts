import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { updateActivity } from "../_server-actions/update-activity";
import { ActivityInsert } from "@/app/_database/schema";
import { createActivity } from "../_server-actions/create-activity";

export const useCreateActivity = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create-activity"],

    // Perform the network request
    mutationFn: async (variables: ActivityInsert) => {
      return await createActivity(variables);
    },

    // Optimistically update local activities
    // onMutate: async (variables) => {
    //   await qc.cancelQueries({ queryKey: ["list-activities", rootCompanySlug] });
    //   const previousActivities = qc.getQueryData<Activity[]>(["list-activities", rootCompanySlug])?.map((activity) => ({ ...activity }));

    //   qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (oldActivities) => {
    //     return oldActivities?.map((oldActivity) =>
    //       oldActivity.id === variables.activityID ? { ...oldActivity, [variables.column]: variables.value } : oldActivity
    //     );
    //   });

    //   return { previousActivities };
    // },

    // // Merge the updated activity into the activity set
    // onSuccess: (updatedActivity, variables, context) => {
    //   if (!context.previousActivities || !updatedActivity) return;
    //   const mergedActivitySet = context.previousActivities.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity));
    //   qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], mergedActivitySet);
    // },

    // // Rollback the optimistic update
    // onError: (error, newItem, context) => {
    //   if (!context) return;
    //   qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], context.previousActivities);
    // },
  });

  return mutate;
};
