import { FC } from "react";
import { useActivityCreator } from "../providers/activity-creator-provider";
import { Button } from "@/app/_components/ui/button";
import { ChevronUp, Lock } from "lucide-react";
import { ActivityInsert } from "@/app/_database/schema";

export const ActivityCreatorToolbar: FC<{ height: number }> = (props) => {
  const { isValidCandidate, createActivity, candidate } = useActivityCreator();

  return (
    <div className="flex gap-1 items-center h-full bg-white rounded-md border p-1" style={{ height: props.height }}>
      <Button size="icon" variant="ghost" className="h-full">
        <Lock size="16" />
      </Button>
      <Button
        className="h-full rounded-sm bg-emerald-600 text-emerald-200 gap-2 hover:bg-emerald-700"
        disabled={!isValidCandidate}
        onClick={() => createActivity(candidate as ActivityInsert)}
      >
        Add activity <ChevronUp size="16" />
      </Button>
    </div>
  );
};
