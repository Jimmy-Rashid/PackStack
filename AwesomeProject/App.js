import { StyleSheet } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
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

const CameraControls = ({ position }) => {
  const { camera } = useThree();
  camera.rotation.y = Math.PI / 4;
  camera.position.x = 5;
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
  const [counter, setCounter] = useState(0);
  const [objects, setObjects] = useState([]);
  const [screenTapped, setScreenTap] = useState(false);
  const [platformPlaced, setPlace] = useState(false);

  const [platformPosition, setPlatformPosition] = useState(0);
  const [platformSize, setPlatformSize] = useState(2);

  const [xChangeMoving, setX] = useState(0);
  const [yChangeMoving, setY] = useState(0.5);
  const [zChangeMoving, setZ] = useState(0);

  const [direction, setDirection] = useState("positive");

  const newObject = {
    id: objects.length + 1,
    position: [xChangeMoving / 2, yChangeMoving, zChangeMoving],
    size: [2 - Math.abs(xChangeMoving), 0.5, 2],
  };

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

    setPlatformPosition(xChangeMoving);
  }, 20);

  useEffect(() => {
    if (screenTapped === true) {
      setObjects((prevObjects) => [...prevObjects, newObject]);

      setY(yChangeMoving + 0.5);
      setPlatformSize(2);
      //2 - Math.abs(xChangeMoving)
      setPlace(true);
      setScreenTap(false);
    }
  });

  return (
    <>
      <Scene
        position={[platformPosition, yChangeMoving, zChangeMoving]}
        size={[platformSize, 0.5, 2]}
      />

      <>
        {/* {platformPlaced
          ? objects.map((obj) =>
              setTimeout(() => {
                obj.size > [0, 0, 0] ? (
                  <Scene key={obj.id} position={obj.position} size={obj.size} />
                ) : (
                  <Scene
                    key={obj.id}
                    position={obj.position}
                    size={[0, 0, 0]}
                  />
                );
              }, 50)
            )
          : null} */}

        {objects.map((obj) =>
          obj.size > [0, 0, 0] ? (
            <Scene key={obj.id} position={obj.position} size={obj.size} />
          ) : (
            <Scene key={obj.id} position={obj.position} size={[0, 0, 0]} />
          )
        )}
      </>

      <mesh
        onPointerDown={() => {
          setCounter(counter + 1);
          setScreenTap(true);
          console.log(counter);
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

  return (
    <Canvas>
      <CameraControls position={cameraPosition} />
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
