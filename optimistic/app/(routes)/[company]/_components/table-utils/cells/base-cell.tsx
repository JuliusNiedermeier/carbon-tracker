import { FC, PropsWithChildren } from "react";

export const BaseCell: FC<PropsWithChildren> = ({ children }) => {
  return <div className="cell">{children}</div>;
};
