import { FC } from "react";
import Image from "next/image";

export const Logo: FC = () => {
  return <Image src={"/logo.svg"} alt="Rapid Footprints" width={20} height={20} />;
};
