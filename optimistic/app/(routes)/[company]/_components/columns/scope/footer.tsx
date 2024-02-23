import { ComponentProps, FC, useMemo } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useScopes } from "../../../_hooks/use-scopes";
import { Badge } from "@/app/_components/ui/badge";
import { useActivityCreator } from "../../providers/activity-creator-provider";

export const ScopeFooter: FC<ActivityHeaderContext<"scope.name">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();
  const scopes = useScopes();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () =>
      scopes.map((scope) => ({
        value: scope.id.toString(),
        component: (
          <div className="flex items-center gap-3 overflow-hidden">
            <Badge>
              {scope.scope}.{scope.subScope}
            </Badge>
            <span className="text-ellipsis overflow-hidden">{scope.name}</span>
          </div>
        ),
      })),
    [scopes]
  );

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    setCandidate((previous) => ({ ...previous, scopeId: Number(value) }));
  };

  return (
    <SelectCell
      width={props.column.getSize()}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
      options={options}
      value={candidate.scopeId?.toString() || ""}
      onValueChange={handleValueChange}
    />
  );
};
