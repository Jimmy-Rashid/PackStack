import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { StatusBar } from "expo-status-bar";
import { Scene } from "./src/scene";
import { Html } from "@react-three/drei";

import * as STDLIB from 'three-stdlib'

const xChange = 0;
const yChange = 0.526;
const zChange = 0.245;

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
      <Scene x={0} y={-1.68} z={0}/>
      <Scene x={0 + xChange} y={-1.68 + yChange} z={0 + zChange} />
    </Canvas>
  );
}
