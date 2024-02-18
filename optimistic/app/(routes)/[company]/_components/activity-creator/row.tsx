import { ComponentProps, FC, PropsWithChildren } from "react";
import { useActivityCreator } from "../providers/activity-creator-provider";

type Props = {
  height: number;
};

export const ActivityCreatorRow: FC<PropsWithChildren<Props>> = ({ children, height }) => {
  const { createActivity } = useActivityCreator();

  const handleKeyDown: ComponentProps<"div">["onKeyDown"] = (e) => {
    if (!e.shiftKey || e.key !== "Enter") return;
    createActivity();
  };

  return (
    <div className="flex w-min" style={{ height }} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};
