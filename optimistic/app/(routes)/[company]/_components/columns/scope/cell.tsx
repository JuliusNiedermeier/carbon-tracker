import { ComponentProps, FC, useMemo } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useScopes } from "../../../_hooks/use-scopes";
import { Cell } from "../../cell";

export const ScopeCell: FC<ActivityCellContext<"scope.name">> = (props) => {
  const scopes = useScopes();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () => scopes.map((scope) => ({ value: scope.id.toString(), component: <span>{scope.name}</span> })),
    [scopes]
  );

  return (
    <Cell padding={false} width={props.column.getSize()}>
      <SelectCell options={options} value={props.row.original.scopeId?.toString() || ""} onValueChange={() => {}} />
    </Cell>
  );
};
