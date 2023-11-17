"use client";

import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "../utils";
import { numberFormat } from "@/common/numberFormats";

type OriginalInputProps = ComponentProps<typeof Input>;

type Props = Omit<ComponentProps<typeof Input>, "type" | "value"> & {
  value?: number | null;
  onValidInput?: (value: number | null) => void;
};

const stringifyNumberValue = (value?: number | null) => (typeof value === "number" ? value.toString() : "");

export const FormattedNumberInput = forwardRef<HTMLInputElement, Props>(
  ({ value: externalValue, onValidInput: onInputAccepted, onInput, onFocus, onBlur, className, ...unmodifiedProps }, ref) => {
    const stringifiedExternalValue = stringifyNumberValue(externalValue);

    const [rawInputValue, setRawInputValue] = useState<string>(stringifiedExternalValue);
    const [lastValidInput, setLastValidInput] = useState<number | null>(null);
    const [hasFocus, setHasFocus] = useState(false);

    const isControlledInput = typeof externalValue !== "undefined";

    const rawInputValueAsNumber = Number(rawInputValue);
    const rawInputValueIsValidNumber = !isNaN(rawInputValueAsNumber);
    const rawInputValueIsEmpty = rawInputValue === "";

    const formattedValue = numberFormat.format(rawInputValueAsNumber);
    const displayedValue = hasFocus || rawInputValueIsEmpty ? rawInputValue : formattedValue;

    useEffect(() => {
      setRawInputValue(stringifiedExternalValue);
    }, [stringifiedExternalValue]);

    useEffect(() => {
      if (!rawInputValueIsValidNumber) return;
      setLastValidInput(rawInputValueAsNumber);
      if (onInputAccepted) onInputAccepted(rawInputValueAsNumber);
    }, [rawInputValueIsValidNumber, rawInputValueAsNumber, rawInputValue, onInputAccepted]);

    const handleFocus: OriginalInputProps["onFocus"] = (e) => {
      setHasFocus(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur: OriginalInputProps["onBlur"] = (e) => {
      if (!rawInputValueIsValidNumber) setRawInputValue(isControlledInput ? stringifiedExternalValue : stringifyNumberValue(lastValidInput));
      setHasFocus(false);
      if (onBlur) onBlur(e);
    };

    const handleInput: OriginalInputProps["onInput"] = (e) => {
      setRawInputValue(e.currentTarget.value);
      if (onInput) onInput(e);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={displayedValue}
        className={cn(
          "text-right",
          { "focus-visible:ring-destructive focus-visible:text-destructive focus-visible:bg-destructive/5": !rawInputValueIsValidNumber },
          className
        )}
        {...unmodifiedProps}
      />
    );
  }
);

FormattedNumberInput.displayName = "FormattedNumberInput";
