import { EmissionFactorFinderHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { Search } from "lucide-react";
import { useFactorFinder } from "../../factor-finder";

export const CategoryHeader: FC<EmissionFactorFinderHeaderContext<"categoryPath">> = (props) => {
  const { searchTerm, setSearchTerm } = useFactorFinder();

  return (
    <Cell className="flex-1 gap-4 pl-3" padding={false}>
      <Search size="16" />
      <input
        type="text"
        className="h-full flex-1 outline-none bg-transparent"
        placeholder="Describe an activity..."
        value={searchTerm}
        onInput={(e) => setSearchTerm(e.currentTarget.value)}
      />
    </Cell>
  );
};
