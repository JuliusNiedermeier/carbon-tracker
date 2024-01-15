import { evaluate } from "mathjs";

export const evaluateAmountFormula = (formula: string) => {
  try {
    const evaluatedValue = evaluate(formula);
    const parsedEvaluatedValue = parseFloat(evaluatedValue);
    if (isNaN(parsedEvaluatedValue)) return null;
    return parsedEvaluatedValue;
  } catch (error) {
    return null;
  }
};
