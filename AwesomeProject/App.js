import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
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
  camera.position.x = 5;
  camera.position.y = 3;

  return null;
};

export const MovingPlatform = () => {
  const [platformPlaced, setPlace] = useState(false);

  const [xChangeMoving, setX] = useState(0);
  const [yChangeMoving, setY] = useState(0.6);
  const [zChangeMoving, setZ] = useState(0);

  const [placedX, setPlacedX] = useState(0);
  const [placedY, setPlacedY] = useState(0);
  const [placedZ, setPlacedZ] = useState(0);

  var [direction, setDirection] = useState("positive");

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

  useEffect(() => {
    setPlacedX(xChangeMoving);
    setPlacedY(yChangeMoving);
    setPlacedZ(zChangeMoving);
  }, [platformPlaced]);

  return (
    <>
      <Scene
        position={[xChangeMoving, yChangeMoving, zChangeMoving]}
        size={[2, 1, 2]}
      />

      <>
        {platformPlaced && (
          <Scene
            position={[placedX, placedY, placedZ]}
            size={[(2-Math.abs(placedX-2)), 1, 2]}
          />
        )}
      </>

      <mesh
        onPointerDown={async () => {
          console.log(placedX, placedY, placedZ);
          setPlace(Math.random());
        }}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default function App() {
  return (
    <Canvas>
      <CameraControls />
      <Scene position={[0, 0, 0]} size={[2, 1, 2]} />
      <MovingPlatform />
    </Canvas>
  );
}
