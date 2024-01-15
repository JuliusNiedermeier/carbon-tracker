import { ComponentProps, FC, startTransition, useCallback, useEffect, useState } from "react";

type Props = {
  value: string;
  onUpdate: (value: string) => void;
};

export const InputCell: FC<Props> = (props) => {
  const [internalValue, setInternalValue] = useState(props.value);

  useEffect(() => setInternalValue(props.value), [props.value]);

  const handleInput = useCallback<Required<ComponentProps<"input">>["onInput"]>(
    (e) => {
      setInternalValue(e.currentTarget.value);
      startTransition(() => props.onUpdate(e.currentTarget.value));
    },
    [props.onUpdate]
  );

  return <input className="cell" value={internalValue} onInput={handleInput} spellCheck={false} />;
};
