import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import Galaxy from "./Galaxy";
import Planet from "./Planet";
import { Color } from "three";


function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => (scrollY.current = window.scrollY || 0);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const purple = useMemo(() => new THREE.Color("#a855f7"), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    g.rotation.y += delta * 0.03;

    // mouse parallax
    const targetX = -mouse.current.y * 0.08;
    const targetY = mouse.current.x * 0.10;
    g.rotation.x = lerp(g.rotation.x, targetX, 0.05);
    g.rotation.y = lerp(g.rotation.y, g.rotation.y + targetY * 0.02, 0.03);

    // scroll parallax
    const s = scrollY.current;
    state.camera.position.z = lerp(state.camera.position.z, 18 + s * 0.002, 0.04);
    state.camera.position.y = lerp(state.camera.position.y, -s * 0.0006, 0.04);

    // camera micro drift
    state.camera.position.x = lerp(state.camera.position.x, mouse.current.x * 1.2, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <primitive attach="background" object={new Color("#05010a")} />
      <fog attach="fog" args={["#05010a", 12, 55]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[8, 10, 10]} intensity={30} color={purple} />
      <pointLight position={[-12, -6, -10]} intensity={18} color={"#22d3ee"} />

      <group ref={group}>
        <Stars radius={90} depth={70} count={6500} factor={3.2} saturation={0} fade speed={0.35} />
        <Galaxy count={24000} radius={18} branches={4} spin={0.9} randomness={0.35} />

        {/* 3 spatial planets */}
        <Planet position={[-7.2, 2.2, -6]} size={1.35} base="#7c3aed" glow="#c084fc" />
        <Planet position={[6.2, -1.6, -10]} size={1.05} base="#0ea5e9" glow="#67e8f9" />
        <Planet position={[0.4, 3.9, -14]} size={0.85} base="#a855f7" glow="#e9d5ff" />
      </group>

      <EffectComposer>
        <Bloom intensity={1.1} mipmapBlur luminanceThreshold={0.05} luminanceSmoothing={0.75} />
        <Vignette eskil={false} offset={0.12} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function SpaceUniverse() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 52, position: [0, 0, 18], near: 0.1, far: 250 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}