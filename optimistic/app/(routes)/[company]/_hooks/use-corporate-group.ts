import { useQuery } from "@tanstack/react-query";
import { listActivities } from "@/app/(routes)/[company]/_server-actions/list-activities";
import { getCorporateGroup } from "../_server-actions/get-corporate-group";

export type Activity = Awaited<ReturnType<typeof listActivities>>[number];

export const useCorporateGroup = (rootCompanySlug: string) => {
  const activitiesQuery = useQuery({
    queryKey: ["get-corporate-group", rootCompanySlug],
    queryFn: async () => await getCorporateGroup(rootCompanySlug),
  });

  return activitiesQuery;
};
