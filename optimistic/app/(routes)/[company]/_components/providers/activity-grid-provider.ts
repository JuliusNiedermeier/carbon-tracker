import { createContext, useContext } from "react";
import { Activity } from "../../_hooks/use-activities";

export type ActivityGridContext = {
  updateCell: <Key extends keyof Activity>(activityID: Activity["id"], columnID: Key, value: Activity[Key]) => void;
  rootCompanySlug: string;
};

const ActivityGridContext = createContext<ActivityGridContext | null>(null);

export const ActivityGridProvider = ActivityGridContext.Provider;

export const useActivityGrid = () => {
  const context = useContext(ActivityGridContext);
  if (!context) throw new Error("The hook useActivityGrid must be used inside the activity page.");
  return context;
};
