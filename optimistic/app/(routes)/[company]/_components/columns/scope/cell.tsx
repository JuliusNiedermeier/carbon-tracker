import { ComponentProps, FC, useMemo } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useScopes } from "../../../_hooks/use-scopes";

export const ScopeCell: FC<ActivityCellContext<"scope.name">> = (props) => {
  const scopes = useScopes();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () => scopes.map((scope) => ({ value: scope.id.toString(), component: <span>{scope.name}</span> })),
    [scopes]
  );

  return <SelectCell options={options} value={props.row.original.scopeId?.toString() || ""} onValueChange={() => {}} />;
};
