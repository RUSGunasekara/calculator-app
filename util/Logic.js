import { evaluate } from "mathjs";

// This function takes an input expression and returns the calculated result
export const calculateExpression = (expression) => {
  try {
    // Use mathjs's evaluate method to calculate the result according to BODMAS
    return evaluate(expression);
  } catch (error) {
    // If the expression is invalid, return "Error"
    return "Error";
  }
};