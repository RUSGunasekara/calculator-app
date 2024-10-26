import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Buttons"; // Importing the custom Button component
import Row from "./components/Rows"; // Importing the custom Row component
import { calculateExpression } from "./util/Logic";

// Create a functional component for the App
export default function App() {
  const [input, setValue] = useState("");  // Stores the input expression
  const [result, setResult] = useState("0");  // Stores the result

  // Function to handle button presses
  const handlePress = (btnText) => {

    if (btnText === "=") {
      setResult(calculateExpression(input));  // Calculate result when "=" is pressed
    } else if (btnText === "C") {
      setValue("");  // Clear input
      setResult("0");  // Reset result
    } else {
      setValue(input + btnText);  // Add the pressed button to the input
    }
  };

    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Display container */}
          <View style={styles.displayContainer}>
            {/* input value */}
            <Text style={styles.inputs}>{input}</Text>

            {/* results */}
            <Text style={styles.results}>{result}</Text>

          </View>  

          {/* Button Rows */}
          <Row>
            <Button text="C" theme="clear" onPress={() => handlePress("C")} />
            <Button text="+/-" onPress={() => handlePress("")} /> 
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
  },

  inputs: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "right",    // Align text to the right
    marginRight: 20,
    marginBottom: 10,
  },

  displayContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  results: {
    color: "#FFFFFF",   
    fontSize: 42,
    textAlign: "right",
    marginTop: 10,
  },
});
