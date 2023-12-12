import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Scene } from "./src/scene";
import { Html } from "@react-three/drei";

import * as STDLIB from "three-stdlib";

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

const CameraControls = () => {
  const { camera } = useThree();
  camera.rotation.y = Math.PI / 4;

  return null;
};

export const MovingPlatform = (isMoving) => {
  var [xChangeMoving, setX] = useState(0);
  var [yChangeMoving, setY] = useState(0.6);
  var [zChangeMoving, setZ] = useState(0);

  var [direction, setDirection] = useState("positive");

  if (isMoving == true) {
    setTimeout(() => {
      if (xChangeMoving < 3 && direction === "positive") {
        setX(xChangeMoving + 0.1);
      } else if (xChangeMoving >= 3 && direction === "positive") {
        setDirection("negative");
      }
      if (xChangeMoving > -3 && direction === "negative") {
        setX(xChangeMoving - 0.1);
      } else if (xChangeMoving <= -3 && direction === "negative") {
        setDirection("positive");
      }
    }, 20);
  } else {
    PlacePlatform();
  }

  return (
    <Scene
      x={-5 + xChangeMoving}
      y={-2.5 + yChangeMoving}
      z={0 + zChangeMoving}
    />
  );
};

export const PlacePlatform = () => {
  console.log("poggers");
};

export default function App() {
  var [isMoving, setIsMoving] = useState(true);

  return (
    <Canvas
      onPress={() => {
        setIsMoving(false);
      }}
    >
      <CameraControls />
      <Scene x={-5} y={-2.5} z={0} />
      <MovingPlatform isMoving={true}/>
    </Canvas>
  );
}
