import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { StatusBar } from "expo-status-bar";
import { Canvas } from "@react-three/fiber";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});

function Base({ props }) {
  const ref = "useRef";
  const [hovered, clicked, active, setActive] = useState(false);
  return (
    <mesh {...props} ref={ref} scale={1}>
      <boxGeometry args={[1, 1, 1]} />;
      <meshStandardMaterial />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={1} />
    </Canvas>
  );
}
