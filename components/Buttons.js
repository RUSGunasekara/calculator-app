import React from "react";
// Import necessary components
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

// The Button component is exported.
const Button = ({ onPress, text,theme }) => {
  const btnStyles = [styles.button];
  const txtStyles = [styles.text];

  //add addtional style to buttons
  if (theme === "clear") {
    btnStyles.push(styles.clearButton);
    txtStyles.push(styles.clearText);

  } else if (theme === "operation") {
    btnStyles.push(styles.operationButton);

  }else if (theme === "operation" || theme === "equal") {
    txtStyles.push(styles.boldText);   // Used for operational and equal button text

  }else{
    btnStyles.push(styles.buttonDefault); // For other buttons (numbers)
  }

  return (
    <TouchableOpacity style={[btnStyles, styles[theme]]} onPress={onPress} >
      <Text style={txtStyles}>{text}</Text>
    </TouchableOpacity>
  );
};


// Setting screen dimensions using the 'Dimensions' API from React Native.
// This calculates the button width dynamically based on the screen size.
const { width } = Dimensions.get("window");
const buttonWidth = width / 4; // Adjusts button width to be 1/4 of the screen width.

// Styles for the button component using StyleSheet.
const styles = StyleSheet.create({

  // Default button style for all buttons
  button: {
    flex: 1,
    alignItems: "center",       // Aligns content to the center.
    justifyContent: "center",   
    backgroundColor: "#f0f0f0",
    height: Math.floor(buttonWidth - 10),
    borderRadius: Math.floor(buttonWidth),    // Makes the button round.
    borderRadius: 35, // Round buttons
    margin: 5, // Space between buttons
  },
  // Default text style for all buttons
  text: {
    fontSize: 24,
    color: "#FFFFFF",
  },


  // Style for the 'clear' button
  clearButton: {
    backgroundColor: "#FFEB3B",    // White background
    shadowColor: "#000000",        // Black shadow
  },
  clearText: {
    color: "#00008b",              // Dark blue text
    fontWeight: "bold",            // Bold text
  },


  // Style for operational buttons (eg: +, -, *, /)
  operationButton: {
    backgroundColor: "#E57373",    // darkcyan background
  },
  boldText: {
    color: "#ffffff",              // White text
    fontWeight: "bold",            // Bold text
    alignContent: "center",

  },


  // Style for the equal button
  equalButton: {
    backgroundColor: "#F44336",    // Green background
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
    fontWeight: "bold",
  },
  
  // Style for other buttons (numbers)
  buttonDefault: {
    backgroundColor: "#424242",    // Light blue background
  },
  
});

export default Button;