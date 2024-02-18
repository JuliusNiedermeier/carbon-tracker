import { evaluate } from "mathjs";

export const evaluateFormula = (formula: string) => {
  try {
    const evaluatedValue = evaluate(formula) as number;
    if (isNaN(evaluatedValue)) return null;
    return evaluatedValue;
  } catch (error) {
    return null;
  }
};
