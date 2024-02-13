import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import { CornerDownLeft, Plus } from "lucide-react";
import { ComponentProps, FC, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { useCreateCompany } from "../../_hooks/use-create-company";
import { cn } from "@/app/_utils/cn";

export type CompanyNodeData = { ID: number; name: string; selected: boolean; onSelect: () => any };
export type CompanyNodeProps = NodeProps<CompanyNodeData>;

export const CompanyNode: FC<CompanyNodeProps> = ({ data }) => {
  const [subsidiaryName, setSubsidiaryName] = useState("");
  const [isSubisdiaryInputOpen, setIsSubsidiaryInputOpen] = useState(false);

  const createCompany = useCreateCompany();

  const handleSubsidiaryInputKeydown: ComponentProps<"input">["onKeyDown"] = (e) => {
    if (e.key !== "Enter" || subsidiaryName.length < 3) return;
    createCompany({ name: subsidiaryName, parentCompanyID: data.ID });
    setIsSubsidiaryInputOpen(false);
    setSubsidiaryName("");
  };

  return (
    <div
      className={cn("nodrag relative bg-white border rounded p-4 cursor-pointer hover:bg-muted group", {
        "bg-black text-white hover:bg-neutral-900": data.selected,
      })}
      onClick={data.onSelect}
    >
      <span className="block font-medium">{data.name}</span>
      <div className="flex items-center text-muted-foreground text-sm gap-8">
        <span className="flex-1">
          <span className={cn("text-foreground text-md", { "text-white": data.selected })}>246</span> t CO2e
        </span>
        <span>5,7%</span>
      </div>
      <span className="block mt-4 text-muted-foreground text-sm">27 locations</span>
      <Popover open={isSubisdiaryInputOpen} onOpenChange={setIsSubsidiaryInputOpen}>
        <PopoverTrigger
          className={cn(
            "bg-neutral-200 p-1 rounded-full border-2 hover:bg-neutral-300 opacity-0 group-hover:opacity-100 cursor-pointer border-white absolute bottom-0 left-1/2 translate-y-2/3 group-hover:translate-y-1/2 -translate-x-1/2 transition-all",
            { "bg-black text-white hover:bg-neutral-800": data.selected, "translate-y-1/2 opacity-1": isSubisdiaryInputOpen }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Plus size="16" />
        </PopoverTrigger>
        <PopoverContent className="p-0 relative">
          <input
            type="text"
            placeholder="Subsidiary name"
            className="outline-none p-4"
            value={subsidiaryName}
            onInput={(e) => setSubsidiaryName(e.currentTarget.value)}
            onKeyDown={handleSubsidiaryInputKeydown}
          />
          <div className="absolute right-0 top-0 bottom-0 pr-4 grid place-content-center">
            <CornerDownLeft size="16" />
          </div>
        </PopoverContent>
      </Popover>
      <Handle type="target" position={Position.Top} className="opacity-0 !pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 !pointer-events-none" />
    </div>
  );
};
