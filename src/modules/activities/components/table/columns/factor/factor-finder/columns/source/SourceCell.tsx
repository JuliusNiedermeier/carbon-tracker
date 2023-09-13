import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";

interface Props {
  source: string;
}

export const SourceCell: FC<Props> = ({ source }) => {
  return <TableCell className="py-2 px-5">{source}</TableCell>;
};
