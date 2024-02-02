import { EmissionFactorReccommendation } from "@/app/(routes)/[company]/_hooks/use-emission-factor-reccommendations";
import { FC } from "react";

type Defined<T> = T extends undefined ? never : T;

type Props = { categories: string[] };

export const Category: FC<Props> = (props) => {
  const primaryCategories = props.categories.slice(0, 3).reverse();
  const secondaryCategories = props.categories.slice(3).reverse();

  return (
    <div className="grid">
      <span className="text-muted-foreground">{secondaryCategories?.map((category) => category).join(" › ")}</span>
      <span className="text-foreground font-medium">{primaryCategories?.map((category) => category).join(" › ")}</span>
    </div>
  );
};
