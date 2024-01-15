"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClientProvider as QCP, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <QCP client={queryClient}>{children}</QCP>;
};
