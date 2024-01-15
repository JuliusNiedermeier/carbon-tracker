import { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FC } from "react";

interface Props {
  direction: false | SortDirection;
}

export const SortIndicator: FC<Props> = ({ direction }) => {
  if (direction === "asc") return <ArrowUp size="16" />;
  if (direction === "desc") return <ArrowDown size="16" />;
  return null;
};
