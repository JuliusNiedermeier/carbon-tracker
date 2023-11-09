import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";
import { ActivityCellContext } from "@/modules/activities/components/table//ActivityTable";
import { MinusIcon } from "@radix-ui/react-icons";
import { numberFormat } from "@/common/numberFormats";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

interface Props {
  ctx: ActivityCellContext<"amount">;
}

export const EmissionCell: FC<Props> = ({ ctx }) => {
  const Component = useMemoComponent(_EmissionCell);
  return <Component cellId={ctx.cell.id} emission={ctx.getValue()} />;
};

interface _Props {
  emission: number | null;
  cellId: string;
}

const _EmissionCell: FC<_Props> = ({ emission, cellId }) => {
  return (
    <TableCell key={cellId} className="font-bold text-right">
      {typeof emission === "number" ? numberFormat.format(emission) : <MinusIcon className="ml-auto" />}
    </TableCell>
  );
};
