import { FC, PropsWithChildren, createContext, useContext } from "react";
import { Activity } from "../../_hooks/use-activities";
import { useUpdateActivity } from "../../_hooks/use-update-activity";

export type ActivityGridContext = {
  updateCell: <Key extends keyof Activity>(activityID: Activity["id"], columnID: Key, value: Activity[Key]) => void;
  rootCompanySlug: string;
};

const ActivityGridContext = createContext<ActivityGridContext | null>(null);

type Props = { rootCompanySlug: string };

export const ActivityGridProvider: FC<PropsWithChildren<Props>> = ({ rootCompanySlug, children }) => {
  const updateActivity = useUpdateActivity("");

  const updateCell: ActivityGridContext["updateCell"] = (activityID, column, value) => {
    updateActivity({ activityID, column, value });
  };

  return <ActivityGridContext.Provider value={{ rootCompanySlug, updateCell }}>{children}</ActivityGridContext.Provider>;
};

export const useActivityGrid = () => {
  const context = useContext(ActivityGridContext);
  if (!context) throw new Error("The hook useActivityGrid must be used inside an ActivityGridProvider.");
  return context;
};
