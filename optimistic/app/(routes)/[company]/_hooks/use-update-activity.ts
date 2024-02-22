import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { updateActivity } from "../_server-actions/update-activity";
import { useRef } from "react";

export const useUpdateActivity = (rootCompanySlug: string) => {
  const qc = useQueryClient();

  // The debounce logic must differentiate between update calls to different columns.
  // Currently any column update is canceled immediately by every other column update.
  // A timeout map with a key for every coluzmn sounds like a viable solution to this problem.

  // Ref to store timeouts, keyed by a combination of activity ID and column name
  const updateTimeouts = useRef<Record<string, NodeJS.Timeout | null>>({});

  const { mutate } = useMutation({
    mutationKey: ["update-activity", rootCompanySlug],

    // Perform the network request
    mutationFn: async (variables: { activityID: Activity["id"]; column: keyof Activity; value: Activity[keyof Activity] }) => {
      // Create a unique key for each activity-column combination
      const timeoutKey = `${variables.activityID}:${variables.column}`;

      // Clear any existing timeout for this activity-column combination
      if (updateTimeouts.current[timeoutKey]) clearTimeout(updateTimeouts.current[timeoutKey]!);

      return new Promise<Awaited<ReturnType<typeof updateActivity>>>((resolve) => {
        updateTimeouts.current[timeoutKey] = setTimeout(async () => {
          // TODO: Remove any type
          const updatedActivity = await updateActivity(variables.activityID, variables.column as any, variables.value);
          resolve(updatedActivity);
        }, 1000);
      });
    },

    // Optimistically update local activities
    onMutate: async (variables) => {
      await qc.cancelQueries({ queryKey: ["list-activities", rootCompanySlug] });

      // Map over activities to create copy of activities. Somehow this is required to make this work.
      const previousActivities = qc.getQueryData<Activity[]>(["list-activities", rootCompanySlug])?.map((activity) => ({ ...activity }));

      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (oldActivities) => {
        return oldActivities?.map((oldActivity) =>
          oldActivity.id === variables.activityID ? { ...oldActivity, [variables.column]: variables.value } : oldActivity
        );
      });

      return { previousActivities };
    },

    // Merge the updated activity into the activity set
    // Currently this causes a problem when updating multiple columns of the same activity in a short period of time.
    onSuccess: (updatedActivity) => {
      if (!updatedActivity) return;
      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (currentActivities) => {
        return currentActivities?.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity));
      });
    },

    // Rollback the optimistic update
    onError: (error, newItem, context) => {
      if (!context) return;
      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], context.previousActivities);
    },
  });

  return mutate;
};
