import { getEmissionFactorReccommendations } from "@/modules/activities/server-actions/get-emission-factor-reccommendations";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  description: string;
  unitIds?: number[];
  years?: number[];
  sourceIds?: number[];
  children: (factors: Awaited<ReturnType<typeof getEmissionFactorReccommendations>>, loading: boolean) => ReactNode;
}

export const FactorReccommendations: FC<Props> = ({ description, unitIds, years, sourceIds, children }) => {
  const [loading, setLoading] = useState(false);

  const [reccommendations, setReccommendations] = useState<Awaited<ReturnType<typeof getEmissionFactorReccommendations>>>([]);

  useEffect(() => {
    setLoading(true);
    getEmissionFactorReccommendations(description, {
      unitIds: unitIds,
      emissionFactorSourceIds: sourceIds,
      years: years,
    }).then((reccommendations) => {
      setReccommendations(reccommendations);
      setLoading(false);
    });
  }, [description, unitIds, years, sourceIds]);

  return children(reccommendations, loading);
};
