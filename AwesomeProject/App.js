import { StyleSheet } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { React, useState, useRef, useEffect } from "react";
import { Html } from "@react-three/drei";

// import * as STDLIB from "three-stdlib";

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

  const [platformSpeed] = useState(0.075);

  const [xChangeMoving, setX] = useState(0);
  const [yChangeMoving, setY] = useState(0.5);
  const [zChangeMoving, setZ] = useState(0);

  const [xPreviousDistance, setXPrevious] = useState(0);
  const [zPreviousDistance, setZPrevious] = useState(0);

  const [movementState, setMovementState] = useState("x");
  const [movementTracker, setMovementTracker] = useState(0);

  const [sizeX, setSizeX] = useState(2);
  const [sizeZ, setSizeZ] = useState(2);

  const [direction, setDirection] = useState("positive");

  const [gameState, setGameState] = useState("running");

  const [cameraZoom, setCameraZoom] = useState(5);
  const [cameraPosition, setCameraPosition] = useState(3);

  const newObject = {
    id: objects.length + 1,
    position: [xChangeMoving, yChangeMoving, zChangeMoving],
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
      setZ(zPreviousDistance);
    }

    if (movementState == "z") {
      setZ(movementTracker);
      setX(xPreviousDistance);
    }
  }, 5);

  useEffect(() => {
    if (screenTapped === true && gameState === "running") {
      setSizeX((prevSizeX) => prevSizeX - Math.abs(xChangeMoving) / 2);
      setSizeZ((prevSizeZ) => prevSizeZ - Math.abs(zChangeMoving) / 2);

      setXPrevious(xChangeMoving);
      setZPrevious(zChangeMoving);

      if (movementState == "x") {
        setMovementState("z");
      }

      if (movementState == "z") {
        setMovementState("x");
      }

      setObjects((prevObjects) => [...prevObjects, newObject]);

      sizeX > 0 && sizeZ > 0
        ? (setCameraPosition((prevPosition) => prevPosition + 0.5),
          setY(yChangeMoving + 0.5))
        : setGameState("over");

      setScreenTap(false);
    }
  }, [screenTapped]);

  useEffect(() => {
    gameState == "over"
      ? (setX(0),
        setY(0.5),
        setZ(0),
        setSizeX(2),
        setSizeZ(2),
        setObjects([]),
        setGameState("running"),
        setCameraPosition(3),
        setMovementTracker(0),
        setXPrevious(0),
        setZPrevious(0),
        setMovementState("x"),
        setDirection("positive"))
      : null;
  }, [gameState]);

  return (
    <>
      <CameraControls position={cameraPosition} zoom={cameraZoom} />

      {sizeX > 0 && sizeZ > 0 ? (
        <Scene
          position={[xChangeMoving, yChangeMoving, zChangeMoving]}
          size={[sizeX, 0.5, sizeZ]}
        />
      ) : (
        <Scene position={[0, 0, 0]} size={[0, 0, 0]} />
      )}

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

          // gameState == "over" ? () : ()
        }}
      >
        <planeGeometry args={[100, 300]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default function App() {
  return (
    <Canvas>
      <Lights />
      <Scene position={[0, 0, 0]} size={[2, 0.5, 2]} />
      <MovingPlatform />
    </Canvas>
  );
}
