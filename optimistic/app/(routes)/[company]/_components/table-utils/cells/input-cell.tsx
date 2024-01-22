import { cn } from "@/app/_utils/cn";
import { ComponentProps, FC, startTransition, useCallback, useEffect, useState } from "react";

type Props = ComponentProps<"input"> & {
  value: string;
  onUpdate: (value: string) => void;
};

export const InputCell: FC<Props> = ({ value, onUpdate, className, ...props }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => setInternalValue(value), [value]);

  const handleInput = useCallback<Required<ComponentProps<"input">>["onInput"]>(
    (e) => {
      setInternalValue(e.currentTarget.value);
      startTransition(() => onUpdate(e.currentTarget.value));
    },
    [onUpdate]
  );

  return <input className={cn("cell", className)} value={internalValue} onInput={handleInput} spellCheck={false} {...props} />;
};
