import { FC, memo, useRef } from "react";

export const useMemoComponent = <P>(component: FC<P>) => useRef(memo(component)).current;
