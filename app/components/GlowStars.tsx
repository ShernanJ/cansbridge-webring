"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GlowStarsProps = {
  count?: number;
  radius?: number;
  size?: number;
  opacity?: number;
  drift?: boolean;
  position?: [number, number, number];
};

function makeSpherePoints(count: number, radius: number) {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const r = radius * Math.cbrt(Math.random());
    const sinPhi = Math.sin(phi);

    arr[i * 3 + 0] = r * sinPhi * Math.cos(theta);
    arr[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }

  return arr;
}

function makeDotTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  // radial gradient: bright core -> soft falloff -> transparent
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(255,255,255,0.85)");
  g.addColorStop(0.45, "rgba(255,255,255,0.28)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export default function GlowStars({
  count = 110,
  radius = 3.6,
  size = 0.03,
  opacity = 0.85,
  drift = true,
  position = [0, 0, 0],
}: GlowStarsProps) {
  const ref = React.useRef<THREE.Points>(null);

  const [positions, setPositions] = React.useState<Float32Array | null>(null);
  const [dotTex, setDotTex] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    setPositions(makeSpherePoints(count, radius));
    setDotTex(makeDotTexture());
  }, [count, radius]);

  // cleanup texture on unmount
  React.useEffect(() => {
    return () => {
      dotTex?.dispose();
    };
  }, [dotTex]);

  useFrame((_, delta) => {
    if (!drift || !ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  if (!positions || !dotTex) return null;

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        map={dotTex}
        transparent
        opacity={opacity}
        color="#ffffff"
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.05}
      />
    </points>
  );
}
