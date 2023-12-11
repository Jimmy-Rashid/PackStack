import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { StatusBar } from "expo-status-bar";
import { Scene } from "./src/scene";
import { Html } from "@react-three/drei";

import * as STDLIB from "three-stdlib";

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

export const MovingPlatform = () => {
  var [xChangeMoving, setX] = useState(0);
  var [yChangeMoving, setY] = useState(0.526);
  var [zChangeMoving, setZ] = useState(0.245);

  var [direction, setDirection] = useState("positive");

  setTimeout(() => {
    // {xChangeMoving < 1 ? setX(xChangeMoving + 0.05) : xChangeMoving > -1 ? setX(xChangeMoving - 0.05) : xChangeMoving}
    // {zChangeMoving < 1 ? setZ(zChangeMoving + 0.4) : zChangeMoving > -1 ? setZ(zChangeMoving - 0.4) : zChangeMoving}
    if (xChangeMoving < 2 && direction === "positive") {
      setX(xChangeMoving + 0.05);
      setZ(zChangeMoving + 0.025);
    } else if (xChangeMoving >= 2 && direction === "positive") {
      setDirection("negative");
    }
    if (xChangeMoving > -2 && direction === "negative") {
      setX(xChangeMoving - 0.05);
      setZ(zChangeMoving - 0.025);
    } else if (xChangeMoving <= -2 && direction === "negative") {
      setDirection("positive");
    }
  }, 20);
  return (
    <Scene
      x={0 + xChangeMoving}
      y={-1.68 + yChangeMoving}
      z={0 + zChangeMoving}
    />
  );
};

export default function App() {
  return (
    <Canvas>
      <Scene x={0} y={-1.68} z={0} />
      {/* <Scene x={0 + xChange} y={-1.68 + yChange} z={0 + zChange} /> */}
      <MovingPlatform />
    </Canvas>
  );
}
