import { EmissionFactorFinderHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../../cell";
import { useUnits } from "@/app/(routes)/[company]/_hooks/use-units";
import { Select, SelectContent, SelectItem } from "@/app/_components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useFactorFinder } from "../../factor-finder";
import { ListFilter } from "lucide-react";
import { cn } from "@/app/_utils/cn";

export const UnitHeader: FC<EmissionFactorFinderHeaderContext<"unit.abbreviation">> = (props) => {
  const units = useUnits();

  const { unitID, setUnitID } = useFactorFinder();

  return (
    <Select value={unitID?.toString() || ""} onValueChange={(value) => setUnitID(value ? Number(value) : null)}>
      <SelectTrigger asChild>
        <Cell width={props.header.getSize()} className="border-none gap-2">
          <span className="flex-1">Unit</span> <ListFilter size="16" className={cn({ "opacity-25": unitID === null })} />
        </Cell>
      </SelectTrigger>
      <SelectContent onClear={() => setUnitID(null)}>
        {units.map((unit) => (
          <SelectItem key={unit.id} value={unit.id.toString()}>
            {unit.abbreviation}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
