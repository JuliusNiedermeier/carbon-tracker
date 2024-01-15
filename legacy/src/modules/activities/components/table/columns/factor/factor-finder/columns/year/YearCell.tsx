import { TableCell } from "@/common/components/ui/table";
import { FC } from "react";

interface Props {
  year: number;
}

export const YearCell: FC<Props> = ({ year }) => {
  return <TableCell className="py-2 pl-5">{year}</TableCell>;
};
