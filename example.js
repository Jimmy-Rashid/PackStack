import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Main Function
export default function App() {
  // Defines constant "Amogus", sets setCount to be render call for it, starts at 10
  const [Amogus, setCount] = useState(10);
  return (
    // Use the styling of "container" in the style sheet
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Increase"
        onPress={() => {
          setCount(Amogus + 1);
        }}
      />
      <Button
        title="Decrease"
        onPress={() => {
          setCount(Amogus - 1);
        }}
      />
      {/* Renders function "AmogusComponent" while sending the value of "Amogus" as "props" */}
      <AmogusComponent props={Amogus} />
    </View>
  );
}

// Function that displays a text and integer value
function AmogusComponent({ props }) {
  return (
    <View>
      <Text>Amogus is so fire</Text>
      <Text>{props}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
