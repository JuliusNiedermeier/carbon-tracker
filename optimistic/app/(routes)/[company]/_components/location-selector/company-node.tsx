import { Button } from "@/app/_components/ui/button";
import { FC, useState } from "react";

export const CompanyNode: FC<{ name: string; onClick: () => any; onCreateSubsidiary: (name: string) => any }> = (props) => {
  const [subsidiary, setSubsidiary] = useState("");

  return (
    <div onClick={props.onClick} className="w-full overflow-hidden">
      <div className="font-medium">{props.name}</div>
      <input
        className="outline-none bg-neutral-100 p-1"
        placeholder="Subsidiary name"
        value={subsidiary}
        onInput={(e) => setSubsidiary(e.currentTarget.value)}
      />
      <Button size="sm" className="w-full p-1" onClick={() => subsidiary.length >= 3 && props.onCreateSubsidiary(subsidiary)}>
        Add subsidiary
      </Button>
    </div>
  );
};
