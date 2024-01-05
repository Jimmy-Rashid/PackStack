import { StyleSheet } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { React, useState, useRef, useEffect } from "react";
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

const CameraControls = ({ position, zoom }) => {
  const { camera } = useThree();
  camera.rotation.y = Math.PI / 4;
  camera.position.x = zoom;
  camera.position.z = zoom;
  camera.position.y = position;

  return null;
};

const Lights = () => {
  return (
    <>
      <directionalLight position={[4, 3, 2]} />
      <ambientLight intensity={1} />
    </>
  );
};

const Scene = ({ position, size }) => {
  const mesh = useRef();

  return (
    <>
      <mesh
        ref={mesh}
        scale={[1, 1, 1]}
        position={position}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={"#b37100"} />
      </mesh>
    </>
  );
};

const MovingPlatform = () => {
  const [screenTapped, setScreenTap] = useState(false);
  const [counter, setCounter] = useState(0);
  const [objects, setObjects] = useState([]);

  const [platformPosition, setPlatformPosition] = useState([]);
  const [platformSpeed, setPlatformSpeed] = useState(0.05);

  const [xChangeMoving, setX] = useState(0);
  const [yChangeMoving, setY] = useState(0.5);
  const [zChangeMoving, setZ] = useState(0);

  const [movementState, setMovementState] = useState("x");
  const [movementTracker, setMovementTracker] = useState(0);

  const [sizeX, setSizeX] = useState(2);
  const [sizeZ, setSizeZ] = useState(2);

  const [positionArray, setPositionArray] = useState([]);

  const [direction, setDirection] = useState("positive");

  const [cameraZoom, setCameraZoom] = useState(5);
  
  const newObjectZ = {
    id: objects.length + 1,
    position: [xChangeMoving, yChangeMoving, zChangeMoving / 2],
    size: [sizeX, 0.5, sizeZ],
  };

  const newObjectX = {
    id: objects.length + 1,
    position: [xChangeMoving / 2, yChangeMoving, zChangeMoving],
    size: [sizeX, 0.5, sizeZ],
  };

  setTimeout(() => {
    if (movementTracker < 3 && direction === "positive") {
      setMovementTracker(
        (prevMovementTracker) => prevMovementTracker + platformSpeed
      );
    } else if (movementTracker >= 3 && direction === "positive") {
      setDirection("negative");
    }
    if (movementTracker > -3 && direction === "negative") {
      setMovementTracker(
        (prevMovementTracker) => prevMovementTracker - platformSpeed
      );
    } else if (movementTracker <= -3 && direction === "negative") {
      setDirection("positive");
    }

    if (movementState == "x") {
      setX(movementTracker);
      setZ(0);
    }

    if (movementState == "z") {
      setZ(movementTracker);
      setX(0);
    }
  }, 5);

  useEffect(() => {
    if (screenTapped === true) {
      console.log(cameraZoom);
      setSizeX((prevSizeX) => prevSizeX - Math.abs(xChangeMoving));
      setSizeZ((prevSizeZ) => prevSizeZ - Math.abs(zChangeMoving));

      if (movementState == "x") {
        setObjects((prevObjects) => [...prevObjects, newObjectX]);
        setMovementState("z");
      }

      if (movementState == "z") {
        setObjects((prevObjects) => [...prevObjects, newObjectZ]);
        setMovementState("x");
      }

      setPositionArray([xChangeMoving, yChangeMoving, zChangeMoving]);

      setY(yChangeMoving + 0.5);
      setPlatformSpeed((prevPlatformSpeed) => prevPlatformSpeed + 0.005);

      setScreenTap(false);
    }
  });

  return (
    <>
      <Scene
        position={[xChangeMoving, yChangeMoving, zChangeMoving]}
        size={[sizeX, 0.5, sizeZ]}
      />

      <>
        {objects.map((obj) =>
          obj.size[0] > 0 && obj.size[2] > 0 ? (
            <Scene key={obj.id} position={obj.position} size={obj.size} />
          ) : (
            <Scene key={obj.id} position={obj.position} size={[0, 0, 0]} />
          )
        )}
      </>

      <mesh
        onPointerDown={() => {
          setCounter(counter + 1);
          // console.log(counter);
          setScreenTap(true);
        }}
      >
        <planeGeometry args={[100, 300]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default function App() {
  const [cameraPosition, setCameraPosition] = useState(3);
  const [cameraZoom, setCameraZoom] = useState(5);

  return (
    <Canvas>
      <CameraControls position={cameraPosition} zoom={cameraZoom} />
      <Lights />
      <Scene position={[0, 0, 0]} size={[2, 0.5, 2]} />
      <mesh
        onPointerDown={() => {
          setCameraPosition((prevPosition) => prevPosition + 0.5);
        }}
      >
        <planeGeometry args={[100, 300]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <MovingPlatform />
    </Canvas>
  );
}
