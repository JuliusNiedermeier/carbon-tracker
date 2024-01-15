import { useContext } from "react";
import { UnitsContext } from "../_components/providers/units-provider";

export const useUnits = () => {
  const units = useContext(UnitsContext);
  if (!units) throw new Error("The useUnits hook must be used inside a UnitsProvider.");
  return units;
};
