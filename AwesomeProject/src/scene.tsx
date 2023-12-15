export const Scene = (props: any) => {
  return (
    <>
      <mesh
        scale={[1.2,0.6,1.2]}
        position={props.position}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={props.size} />
        <meshStandardMaterial color={"#b37100"} />
      </mesh>
      <directionalLight position={[3.66,2.98,2.22]} />
      <ambientLight intensity={0.6} />
    </>
  );
}
