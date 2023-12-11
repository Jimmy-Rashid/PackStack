import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { StatusBar } from "expo-status-bar";
import { Scene } from "./src/scene";
import * as STDLIB from 'three-stdlib'

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
