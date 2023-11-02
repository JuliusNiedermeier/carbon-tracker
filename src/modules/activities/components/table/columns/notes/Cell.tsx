import { TableCell } from "@/common/components/ui/table";
import { FC, FocusEventHandler, useState } from "react";
import { ActivityCellContext } from "@/modules/activities/components/table/ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/common/components/ui/hover-card";
import { marked } from 'marked';
import { ReaderIcon } from "@radix-ui/react-icons"

interface Props {
  ctx: ActivityCellContext<"notes">;
}

export const Cell: FC<Props> = ({ ctx }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(ctx.getValue());
  const markdownify = marked.parse(value || '');

  const handleValueChange: FocusEventHandler<HTMLTextAreaElement> = async (e) => {
    if (ctx.getValue() === value) return;

    try {
      await updateActvity(ctx.row.original.id, { notes: e.currentTarget.value });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell key={ctx.cell.id} className="max-w-[20rem] overflow-hidden text-ellipsis flex">

    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <ReaderIcon className="cursor-pointer"/>
      </HoverCardTrigger>
      <HoverCardContent align="center" side="left" className="w-auto p-4">
        <div className="prose"
          dangerouslySetInnerHTML={{__html: markdownify}}
        />
      </HoverCardContent>
    </HoverCard>

    <Textarea
      className="border-none shadow-none"
      placeholder="Notes"
      onBlur={handleValueChange}
      onInput={(e) => setValue(e.currentTarget.value)}
      value={value || ''}
    />




    </TableCell>
  );
};
