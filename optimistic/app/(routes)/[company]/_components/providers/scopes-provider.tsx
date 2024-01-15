"use client";

import { FC, PropsWithChildren, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { listScopes } from "@/app/(routes)/[company]/_server-actions/list-scopes";

export const ScopesContext = createContext<Awaited<ReturnType<typeof listScopes>> | null>(null);

export const ScopesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useQuery({
    queryKey: ["list-scopes"],
    queryFn: async () => await listScopes(),
  });

  return <ScopesContext.Provider value={data || []}>{children}</ScopesContext.Provider>;
};
