import { useContext } from "react";
import { ScopesContext } from "../_components/providers/scopes-provider";

export const useScopes = () => {
  const scopes = useContext(ScopesContext);
  if (!scopes) throw new Error("The useScopes hook must be used inside a ScopesProvider.");
  return scopes;
};
