// Maybe useDeferredValue is a better fit for this use case.

import { ComponentProps, FC, startTransition, useCallback, useEffect, useState } from "react";

type Props = Omit<ComponentProps<"input">, "value" | "onInput"> & {
  value: string;
  onInput?: (value: string) => any;
  onImmediateInput?: (value: string) => any;
};

export const TransitionInput: FC<Props> = ({ value, onInput, onImmediateInput, ...props }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => setInternalValue(value), [value]);

  const handleInput = useCallback<Required<ComponentProps<"input">>["onInput"]>(
    (e) => {
      setInternalValue(e.currentTarget.value);
      onImmediateInput?.(e.currentTarget.value);
      startTransition(() => onInput?.(e.currentTarget.value));
    },
    [onInput]
  );

  return <input value={internalValue} onInput={handleInput} {...props} />;
};
