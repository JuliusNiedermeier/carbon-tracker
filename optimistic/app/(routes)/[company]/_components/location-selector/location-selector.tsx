import { FC, useMemo, useState } from "react";
import { Background, Controls, ReactFlow, Node, BackgroundVariant } from "reactflow";
import "reactflow/dist/style.css";
import { LocationItem } from "./location-item";
import { useCorporateGroup } from "../../_hooks/use-corporate-group";
import { useActivityGrid } from "../providers/activity-grid-provider";
import { useCompanyLocations } from "../../_hooks/use-company-locations";
import { CompanyNode } from "./company-node";
import { useCreateCompany } from "../../_hooks/use-create-company";

type Props = {
  activityID: number;
};

export const LocationSelector: FC<Props> = (props) => {
  const { rootCompanySlug, updateCell } = useActivityGrid();

  const [selectedCompanyID, setSelectedCompanyID] = useState<number | null>(null);

  const { data: corporateGroup } = useCorporateGroup(rootCompanySlug);
  const { data: locations } = useCompanyLocations(selectedCompanyID);

  const createCompany = useCreateCompany();

  const nodes = useMemo<Node[]>(() => {
    return (
      corporateGroup?.members?.map<Node>((member, index) => ({
        id: member.id.toString(),
        position: { x: 0, y: index * 200 },
        data: {
          label: (
            <CompanyNode
              name={member.name}
              onClick={() => setSelectedCompanyID(member.id)}
              onCreateSubsidiary={(name) => createCompany({ name, parentCompanyID: member.id })}
            />
          ),
        },
      })) || []
    );
  }, [corporateGroup]);

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full">
        <ReactFlow nodes={nodes} edges={[]} fitView>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>
      <div className="min-w-[30rem] border-l">
        <div className="p-4">
          <span className="text-lg font-medium">Locations</span>
        </div>
        {locations?.map((location) => (
          <LocationItem key={location.id} name={location.name} onClick={() => updateCell(props.activityID, "locationId", location.id)} />
        ))}
      </div>
    </div>
  );
};
