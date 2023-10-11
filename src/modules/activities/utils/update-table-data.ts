import { Dispatch, SetStateAction } from "react";
import { ActivityTableData } from "../components/table/ActivityTable";

export type TableDataUpdater = (rowIndex: number, columnId: string, value: string) => void;

export const createTableDataUpdater = (setState: Dispatch<SetStateAction<ActivityTableData[]>>): TableDataUpdater => {
  return (rowIndex, columnId, value) => {
    setState((old) =>
      old.map((row, index) => {
        if (index !== rowIndex) return row;
        return { ...old[rowIndex], ["description"]: value };
      })
    );
  };
};
