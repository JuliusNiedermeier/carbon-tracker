import "reactflow/dist/style.css";
import { ComponentProps, FC, useMemo, useState } from "react";
import { Background, Controls, ReactFlow, Node, BackgroundVariant, NodeTypes } from "reactflow";
import { LocationItem } from "./location-item";
import { useCorporateGroup } from "../../_hooks/use-corporate-group";
import { useActivityGrid } from "../providers/activity-grid-provider";
import { useCompanyLocations } from "../../_hooks/use-company-locations";
import { CompanyNodeData, CompanyNode } from "./company-node";
import { stratify, tree } from "d3-hierarchy";
import { CorporateGroupViewMember } from "@/app/_database/schema";
import { useCompany } from "../../_hooks/use-company";
import { Button } from "@/app/_components/ui/button";
import { Building2, CornerDownLeft, MapPin } from "lucide-react";
import { useDeleteCompany } from "../../_hooks/use-delete-company";
import { useCreateCompanyLocation } from "../../_hooks/use-create-company-location";
import { useDeleteCompanyLocation } from "../../_hooks/use-delete-company-location";
import { cn } from "@/app/_utils/cn";

type Props = {
  currentCompanyID: number;
  currentLocationID: number;
  activityID: number;
};

const createCompanyHierarchy = stratify<CorporateGroupViewMember>()
  .id((member) => member.id.toString())
  .parentId((member) => member.parentCompanyId?.toString());

const createCompanyTree = tree<CorporateGroupViewMember>().nodeSize([280, 250]);

const nodeTypes: NodeTypes = { "company-node": CompanyNode };

export const LocationSelector: FC<Props> = (props) => {
  const { rootCompanySlug, updateCell } = useActivityGrid();

  const [selectedCompanyID, setSelectedCompanyID] = useState<number>(props.currentCompanyID);
  const [newLocationName, setNewLocationName] = useState("");

  const { data: corporateGroup } = useCorporateGroup(rootCompanySlug);
  const { data: selectedCompany } = useCompany(selectedCompanyID);
  const { data: locations } = useCompanyLocations(selectedCompanyID);

  const deleteCompany = useDeleteCompany();
  const createCompanyLocation = useCreateCompanyLocation();
  const deleteCompanyLocation = useDeleteCompanyLocation();

  const handleDeleteCompany: ComponentProps<typeof Button>["onClick"] = () => {
    if (selectedCompanyID === null || !corporateGroup?.rootCompanySlug) return;
    deleteCompany({ rootCompanySlug: corporateGroup.rootCompanySlug, ID: selectedCompanyID });
    setSelectedCompanyID(props.currentCompanyID);
  };

  const handleNewLocationFormSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    if (newLocationName.length < 3 || selectedCompanyID === null) return;
    createCompanyLocation({ companyID: selectedCompanyID, name: newLocationName });
    setNewLocationName("");
  };

  const { nodes, edges } = useMemo(() => {
    if (!corporateGroup?.members) return { nodes: [], edges: [] };
    const hierarchy = createCompanyHierarchy(corporateGroup.members);
    const tree = createCompanyTree(hierarchy);

    const nodes = tree.descendants().map<Node<CompanyNodeData>>((node) => ({
      id: node.data.id.toString(),
      type: "company-node",
      position: { x: node.x, y: node.y },
      data: { ID: node.data.id, name: node.data.name, selected: node.data.id === selectedCompanyID, onSelect: () => setSelectedCompanyID(node.data.id) },
    }));

    const edges = corporateGroup.members
      .filter((member) => member.parentCompanyId !== null)
      .map((member) => ({ id: `${member.parentCompanyId}-${member.id}`, source: member.parentCompanyId.toString(), target: member.id.toString() }));

    return { nodes, edges };
  }, [corporateGroup, selectedCompanyID]);

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls showZoom={false} showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="min-w-[30rem] border-l pt-4 grid grid-rows-[min-content_1fr_min-content]">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Building2 size="22" />
            <span className="text-lg font-medium">{selectedCompany?.name}</span>
            <Button size="sm" variant="ghost" className="ml-auto hover:text-destructive hover:bg-destructive/10" onClick={handleDeleteCompany}>
              Delete
            </Button>
          </div>
          <span className="block text-muted-foreground">
            Created on {selectedCompany ? new Date(selectedCompany.createdAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </span>
          <div className="flex items-center gap-2 my-1 mt-8">
            <MapPin size="16" />
            <span className="font-medium text-sm">Locations</span>
          </div>
        </div>

        <div className="flex-1 border-y">
          {locations?.map((location) => (
            <LocationItem
              key={location.id}
              name={location.name}
              selected={props.currentLocationID === location.id}
              onSelect={() => updateCell(props.activityID, "locationId", location.id)}
              onDelete={() => deleteCompanyLocation({ ID: location.id })}
            />
          ))}
        </div>
        <form className="relative" onSubmit={handleNewLocationFormSubmit}>
          <input
            className="p-4 outline-none w-full"
            type="text"
            placeholder="New location"
            value={newLocationName}
            onInput={(e) => setNewLocationName(e.currentTarget.value)}
          />
          <div className="absolute right-0 top-0 bottom-0 grid place-content-center pr-4">
            <CornerDownLeft size="16" className={cn("transition-all", { "opacity-0 translate-x-2": newLocationName.length < 3 })} />
          </div>
        </form>
      </div>
    </div>
  );
};
