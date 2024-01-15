import { useQuery } from "@tanstack/react-query";
import { listActivities } from "@/app/(routes)/[company]/_server-actions/list-activities";

export type Activity = Awaited<ReturnType<typeof listActivities>>[number];

export const useActivities = (rootCompanySlug: string) => {
  const activitiesQuery = useQuery({
    queryKey: ["list-activities", rootCompanySlug],
    queryFn: async () => await listActivities(rootCompanySlug),
  });

  return activitiesQuery;
};
