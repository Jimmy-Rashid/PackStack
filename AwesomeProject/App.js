import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Canvas, useFrame } from "@react-three/fiber";
import { Scene } from "./src/scene";

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

export default function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}
