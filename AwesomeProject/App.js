import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [Amogus, setCount] = useState(10);
  return (
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
      <AmogusComponent props={Amogus} />
    </View>
  );
}

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
