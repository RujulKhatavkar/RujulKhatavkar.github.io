import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

type Props = {
  position: [number, number, number];
  size?: number;
  base?: string;
  glow?: string;
};

export default function Planet({ position, size = 1, base = "#7c3aed", glow = "#c084fc" }: Props) {
  const planet = useRef<THREE.Group>(null);

  const baseColor = useMemo(() => new THREE.Color(base), [base]);
  const glowColor = useMemo(() => new THREE.Color(glow), [glow]);

  useFrame((state) => {
    const g = planet.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    g.rotation.y = t * 0.35;
    g.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.18;
  });

  return (
    <group ref={planet} position={position}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.35}
          metalness={0.25}
          emissive={glowColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[size * 1.08, 64, 64]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[size * 1.55, size * 0.04, 16, 128]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}