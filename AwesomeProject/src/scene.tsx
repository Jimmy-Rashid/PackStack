export function Scene() {
  return (
    <>
      <mesh castShadow receiveShadow={true} scale={[0.86,0.6,0.86]} visible={true} position={[0,-1.68,0]} rotation={[0.4363323129985824,0.7853981633974483,0]} frustumCulled={false}>
        <boxGeometry args={[2,1,2,1,1,1]} morphTargetsRelative={false} />
        <meshStandardMaterial color={"#ff0000"} transparent={false} alphaHash={false} clipShadows={false} flatShading={false} fog={false} forceSinglePass={false} polygonOffset={false} stencilWrite={false} dithering={true} />
      </mesh>
    <directionalLight position={[0.64,0.56,2.08]} /><ambientLight intensity={0.6} /></>
  );
}
