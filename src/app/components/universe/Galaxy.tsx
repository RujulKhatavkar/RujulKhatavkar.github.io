import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

type Props = {
  count?: number;
  radius?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
};

export default function Galaxy({
  count = 20000,
  radius = 14,
  branches = 4,
  spin = 1,
  randomness = 0.35,
}: Props) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const inside = new THREE.Color("#c084fc");
    const outside = new THREE.Color("#0ea5e9");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const rand = (n: number) => (Math.random() - 0.5) * n * randomness * r;

      pos[i3 + 0] = Math.cos(branchAngle + spinAngle) * r + rand(1);
      pos[i3 + 1] = rand(0.35);
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand(1);

      const mixed = inside.clone().lerp(outside, r / radius);
      col[i3 + 0] = mixed.r;
      col[i3 + 1] = mixed.g;
      col[i3 + 2] = mixed.b;
    }

    return { positions: pos, colors: col };
  }, [count, radius, branches, spin, randomness]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={count} />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}