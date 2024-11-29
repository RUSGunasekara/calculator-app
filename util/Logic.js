// IM/2021/064
import { evaluate } from "mathjs";

// returns the calculated result
export const calculateExpression = (expression) => {
  try {
    
    // Use mathjs's evaluate method to calculate the result according to BODMAS
    const result = evaluate(expression);

    // Check for invalid results (NaN, Infinity)
    if (isNaN(result) || !isFinite(result)) {
      return "Undefined"; // Return "Error" for invalid results
    }

    // Format the result to a maximum of 6 decimal places
    return parseFloat(result.toFixed(6));
    
    
  } catch (error) {
    // If the expression is invalid, return "Error"
    return "Error";
  }
};

// Function to handle parentheses in the input
export const handleParentheses = (input, isCalculated) => {
  if (isCalculated) {
    return "("; // Reset to just "(" after "="
  }

  const openCount = (input.match(/\(/g) || []).length;
  const closeCount = (input.match(/\)/g) || []).length;

  if (openCount <= closeCount) {
    return input + "("; // Add "(" if fewer or equal opening brackets
  } else {
    return input + ")"; // Add ")" if unbalanced
  }
};

// Function to handle square root operation
export const handleSquareRoot = (input) => {
  if (!input || isNaN(input)) {
    return { input: "√", result: "Error" }; // Handle invalid input
  }

  const number = parseFloat(input); 
  if (number < 0) {
    return { input: `√(${number})`, result: "Error" }; // Handle negative numbers
  }

  const result = parseFloat(Math.sqrt(number).toFixed(6)); // Format the result to a maximum of 6 decimal places
  return { input: `√${number}`, result: result }; // Return the square root of the number
}; 


// IM/2021/064


