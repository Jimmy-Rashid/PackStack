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
        x={-5 + xChangeMoving}
        y={-2.5 + yChangeMoving}
        z={0 + zChangeMoving}
        length={2}
        height={1}
        width={2}
      />

      <>
        {platformPlaced && (
          <Scene
            x={(placedX/2)-5}
            y={-2.5 + placedY}
            z={0 + placedZ}
            length={(2-Math.abs(placedX))}
            height={1}
            width={2}
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

export function PlacePlatform({ x, y, z }) {
  console.log("poggers");
  return <Scene x={-5 + x} y={-2.5 + y} z={0 + z} />;
}

export default function App() {
  return (
    <Canvas>
      <CameraControls />
      <Scene x={-5} y={-2.5} z={0} length={2} height={1} width={2} />
      <MovingPlatform />
    </Canvas>
  );
}
