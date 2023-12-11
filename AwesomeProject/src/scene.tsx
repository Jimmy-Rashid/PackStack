export const Scene = (props: any) => {
  return (
    <>
      <mesh
        scale={[0.86, 0.6, 0.86]}
        position={[props.x, props.y, props.z]}
        rotation={[0.4363323129985824, 0.7853981633974483, 0]}
      >
        <boxGeometry args={[2, 1, 2, 1, 1, 1]} />
        <meshStandardMaterial color={"#b37100"} />
      </mesh>
      <directionalLight position={[0.64, 0.56, 2.08]} />
      <ambientLight intensity={0.6} />
    </>
  );
}
