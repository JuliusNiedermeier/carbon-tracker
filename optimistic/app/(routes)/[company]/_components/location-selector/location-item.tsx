import { FC } from "react";

export const LocationItem: FC<{ name: string; onClick: () => any }> = (props) => {
  return (
    <div className="p-4 hover:bg-neutral-100 cursor-pointer" onClick={props.onClick}>
      <span className="font-medium">{props.name}</span>
    </div>
  );
};
