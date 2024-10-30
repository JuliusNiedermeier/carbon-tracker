import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { Activity } from "../../_hooks/use-activities";
import { useUpdateActivity } from "../../_hooks/use-update-activity";

export type ActivityGridContext = {
  updateCell: <Key extends keyof Activity>(activityID: Activity["id"], columnID: Key, value: Activity[Key]) => void;
  rootCompanySlug: string;
  rowHeight: number;
  showActivityCreator: boolean;
  setShowActivityCreator: Dispatch<SetStateAction<boolean>>;
};

const ActivityGridContext = createContext<ActivityGridContext | null>(null);

type Props = { rootCompanySlug: string };

export const ActivityGridProvider: FC<PropsWithChildren<Props>> = ({ rootCompanySlug, children }) => {
  const [showActivityCreator, setShowActivityCreator] = useState(false);

  const updateActivity = useUpdateActivity(rootCompanySlug);

  const updateCell: ActivityGridContext["updateCell"] = (activityID, column, value) => {
    updateActivity({ activityID, column, value });
  };

  return (
    <ActivityGridContext.Provider value={{ rootCompanySlug, updateCell, rowHeight: 40, showActivityCreator, setShowActivityCreator }}>
      {children}
    </ActivityGridContext.Provider>
  );
};

export const ActivityGridConsumer = ActivityGridContext.Consumer;

export const useActivityGrid = () => {
  const context = useContext(ActivityGridContext);
  if (!context) throw new Error("The hook useActivityGrid must be used inside an ActivityGridProvider.");
  return context;
};
