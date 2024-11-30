//IM/2021/064
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity,ToastAndroid } from "react-native";
import Button from "./components/Buttons"; // Importing the custom Button component
import Row from "./components/Rows"; // Importing the custom Row component
import { calculateExpression, handleParentheses, handleSquareRoot} from "./util/Logic";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Icon for the backspace button

// Create a functional component for the App
export default function App() {
  const [input, setValue] = useState("");  // Stores the input expression
  const [result, setResult] = useState("0");  // Stores the result
  const [isCalculated, setIsCalculated] = useState(false); // Added this state to track if "=" was pressed
  

   // Function to handle button presses
  const handlePress = (btnText) => {
    // Clear input and result if starting a new calculation after "="
    if (isCalculated && !isNaN(btnText)) { //Clear if a number is pressed after "="
      setValue(btnText); // Set the number as the new input
      setResult("0"); // Reset result
      setIsCalculated(false); // Reset the flag
      return;
    }

    if (btnText === "()") {
      setValue(handleParentheses(input, isCalculated)); // Handle parentheses toggle
      setResult(""); // Reset live result
      setIsCalculated(false); // Reset flag
      return;
    }

    if (btnText === "√") {
      const { input: sqrtInput, result: sqrtResult } = handleSquareRoot(input);
      setValue(sqrtInput); // Show square root input
      setResult(sqrtResult); // Show square root result
      setIsCalculated(true); // Mark calculation complete
      return;
    }
    
  
    // Check if the input length is within the 32-character limit
    if (input.length >= 32 && btnText !== "C" && btnText !== "=") {
      ToastAndroid.show("Can't enter more than 32 digits.", ToastAndroid.SHORT);
      return;
    }

    // Allow only "-" as the first operator
    if (["+", "*", "/", "%",".","√"].includes(btnText) && input === "") {
      return;
  }

  //prevent mulitple consecutive operators in same type and replace the opertaor if it is different

  if (btnText === "+" || btnText === "-" || btnText === "*" || btnText === "/" || btnText === "%" || btnText === "." || btnText === "√") {      
    if (input.slice(-1) === "+" || input.slice(-1) === "-" || input.slice(-1) === "*" || input.slice(-1) === "/" || input.slice(-1) === "%" || input.slice(-1) === "." || input.slice(-1) === "√") {
      setValue(input.slice(0, -1) + btnText); // Replace the last operator with the new one
      setResult(calculateExpression(input.slice(0, -1) + btnText) || ""); // Update live result
      return;
    }
  }


    // Prevent empty parentheses
    if (btnText === ")" && !input.includes("(")) {
      return;
    }

    if (btnText === "=") {
      try {
        // Calculate the result
        setResult(calculateExpression(input)); // Display result
        setIsCalculated(true); // Mark the calculation as complete
      } catch {
        setResult("Error"); // Display error message
      }
    
    } else if (btnText === "C") {
      setValue(""); // Clear input
      setResult("0"); // Reset result
      setIsCalculated(false); // Reset the flag

    } else if (btnText === "backspace") {
      setValue(input.slice(0, -1)); // Remove the last character
      setResult(calculateExpression(input.slice(0, -1)) || ""); // Update live result

    } else {
      setValue(input + btnText); // Add the pressed button to the input
      setResult(calculateExpression(input + btnText || "")); // Update live result
    }
  };

    return (
      <View style={styles.container}>
        <SafeAreaView>

          {/* Display container */}
          <View style={styles.displayContainer}>
          {isCalculated && (
            <Text style={styles.inputs}>{input}</Text> 
          )}
          <Text style={styles.results}>{isCalculated ? result : input || "0"}</Text>
          </View>  

          <View style={styles.topIcons}>

          <TouchableOpacity onPress={() => handlePress("backspace")}>
            <Icon name="backspace" size={30} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
          {/* Spacer */}

          <View style={styles.spacer} />
          {/* Button Rows */}
          <Row>
            <Button text="C" theme="clear" onPress={() => handlePress("C")} />
            <Button text="( )" theme="operation" onPress={() => handlePress("()")}/>
            <Button text="%" theme="operation" onPress={() => handlePress("%")} />
            <Button text="/" theme="operation" onPress={() => handlePress("/")} />
          </Row>

          <Row>
            <Button text="7" onPress={() => handlePress("7")} />
            <Button text="8" onPress={() => handlePress("8")} />
            <Button text="9" onPress={() => handlePress("9")} />
            <Button text="X" theme="operation" onPress={() => handlePress("*")} />
          </Row>

          <Row>
            <Button text="4" onPress={() => handlePress("4")} />
            <Button text="5" onPress={() => handlePress("5")} />
            <Button text="6" onPress={() => handlePress("6")} />
            <Button text="-" theme="operation" onPress={() => handlePress("-")} />
          </Row>

          <Row>
            <Button text="1" onPress={() => handlePress("1")} />
            <Button text="2" onPress={() => handlePress("2")} />
            <Button text="3" onPress={() => handlePress("3")} />
            <Button text="+" theme="operation" onPress={() => handlePress("+")} />
          </Row>

          <Row>
            <Button text="0" onPress={() => handlePress("0")} />
            <Button text="." onPress={() => handlePress(".")} />
            <Button text="√" onPress={() => handlePress("√")} />
            <Button text="=" theme="equal" onPress={() => handlePress("=")} />
          </Row>

        </SafeAreaView>
      </View>
    );
  }

// create styles for the UI
const styles = StyleSheet.create({
  container: {
    flex: 1,                     // container takes the full height of the screen
    backgroundColor: "#000000",  //black background color
    justifyContent: "flex-end",  // Aligns content to the bottom of the screen
    padding: 10,                 
  },

  spacer: { 
    flex: 1,
  },

  // Style for the input
  inputs: { 
    color: "#FFFFFF",
    fontSize: 40,
    textAlign: "right",    // Align text to the right
    marginRight: 20,
    marginBottom: 10,
  },

  displayContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Style for the result
  results: { 
    color: "#FFFFFF",   
    fontSize: 58,
    textAlign: "right",
    marginTop: 10,
  },

  // Style for the backspace icon
  topIcons: { 
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 35,

  },
  icon: {
    marginLeft:270, // Add spacing between the icon and the edge of the screen
  },

});


//IM/2021/064