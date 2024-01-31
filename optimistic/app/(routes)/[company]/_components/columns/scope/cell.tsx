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

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    props.table.options.meta?.updateCell(props.row.original.id, "scopeId", value ? Number(value) : null);
  };

  return (
    <Cell padding={false} width={props.column.getSize()}>
      <SelectCell options={options} value={props.row.original.scopeId?.toString() || ""} onValueChange={handleValueChange} />
    </Cell>
  );
};
