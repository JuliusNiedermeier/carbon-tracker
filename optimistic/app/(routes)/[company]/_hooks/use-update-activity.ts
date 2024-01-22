import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { updateActivity } from "../_server-actions/update-activity";
import { useRef } from "react";

export const useUpdateActivity = (rootCompanySlug: string) => {
  const qc = useQueryClient();
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  const { mutate } = useMutation({
    mutationKey: ["update-activity", rootCompanySlug],
    // Perform the network request
    mutationFn: async (variables: { activityID: Activity["id"]; column: keyof Activity; value: Activity[keyof Activity] }) => {
      // Clear any existing timeout
      if (updateTimeout.current) clearTimeout(updateTimeout.current);

      updateTimeout.current = setTimeout(() => {
        // TODO: Remove any type
        updateActivity(variables.activityID, variables.column as any, variables.value);
      }, 1000);
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
