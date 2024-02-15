import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "./use-activities";
import { ActivityInsert } from "@/app/_database/schema";
import { createActivity } from "../_server-actions/create-activity";
import { useActivityGrid } from "../_components/providers/activity-grid-provider";

export const useCreateActivity = () => {
  const { rootCompanySlug } = useActivityGrid();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create-activity"],

    // Perform the network request
    mutationFn: async (variables: ActivityInsert) => {
      return await createActivity(variables);
    },

    // Optimistically update local activities
    onMutate: (newActivity) => {
      const previousActivities = qc.getQueryData<Activity[]>(["list-activities", rootCompanySlug]);

      const placeholder: Activity = {
        // Using a float as the placeholder ID ensures there will be no conflicts with other real IDs
        // Using a random float number ensures there are no local conflicts when quickly adding multiple activities
        id: Math.random(),
        locationId: newActivity.locationId,
        locationName: "",
        companyId: 0,
        companyName: "",
        description: newActivity.description,
        miscellaneous: newActivity.miscellaneous,
        scopeId: newActivity.scopeId ?? null,
        scope: null,
        amount: newActivity.amount ?? null,
        amountFormula: newActivity.amountFormula ?? null,
        unitId: newActivity.unitId ?? null,
        unit: null,
        emissionFactorId: newActivity.emissionFactorId ?? null,
        factor: null,
        co2e: null,
        responsibility: newActivity.responsibility ?? null,
        biogenicShare: newActivity.biogenicShare ?? null,
        doubleCounting: newActivity.doubleCounting ?? null,
        year: newActivity.year ?? null,
        createdAt: new Date(),
      };

      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (activities) => [placeholder, ...(activities || [])]);

      return { previousActivities, placeholderID: placeholder.id };
    },

    // // Merge the updated activity into the activity set
    onSuccess: (newActivity, variables, context) => {
      if (!context.previousActivities || !newActivity) return;
      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (activities) =>
        activities?.map((activity) => (activity.id !== context.placeholderID ? activity : newActivity))
      );
    },

    // // Rollback the optimistic update
    onError: (error, variables, context) => {
      if (!context) return;
      qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (activities) =>
        activities?.filter((activity) => activity.id !== context.placeholderID)
      );
    },
  });

  return mutate;
};
