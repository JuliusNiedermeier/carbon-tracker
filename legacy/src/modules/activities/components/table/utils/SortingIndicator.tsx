import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { SortDirection } from "@tanstack/react-table";
import { FC } from "react";

interface Props {
  direction: false | SortDirection;
}

export const SortIndicator: FC<Props> = ({ direction }) => {
  if (direction === "asc") return <ArrowUpIcon />;
  if (direction === "desc") return <ArrowDownIcon />;
  return null;
};
