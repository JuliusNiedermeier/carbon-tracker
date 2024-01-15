"use client";

import { FC, PropsWithChildren, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { listUnits } from "@/app/(routes)/[company]/_server-actions/list-units";

export const UnitsContext = createContext<Awaited<ReturnType<typeof listUnits>> | null>(null);

export const UnitsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useQuery({
    queryKey: ["list-units"],
    queryFn: async () => await listUnits(),
  });

  return <UnitsContext.Provider value={data || []}>{children}</UnitsContext.Provider>;
};
