import { FC, useRef } from "react";
import { createRandomFloat, createRandomInt } from "@/app/_utils/create-random-int";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const ReccommendationSkeleton: FC = () => {
  const skeletonWidths = useRef(Array.from(new Array(createRandomInt(3, 6)), () => createRandomFloat(0.2, 0.5)));

  return (
    <div className="flex flex-col items-start gap-8">
      {skeletonWidths.current.map((width) => (
        <Skeleton className="h-6" style={{ width: `${width * 50}%` }} />
      ))}
    </div>
  );
};
