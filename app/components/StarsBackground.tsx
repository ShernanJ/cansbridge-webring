"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import GlowStars from "./GlowStars";

export default function StarsBackground() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
    >
      <Stars
        radius={220}
        depth={120}
        count={6500}
        factor={4}
        saturation={0}
        fade
        speed={0.25}
      />

      <GlowStars count={160} radius={22} size={0.06} opacity={0.22} />
      <GlowStars count={220} radius={16} size={0.09} opacity={0.35} />
    </Canvas>
  );
}
