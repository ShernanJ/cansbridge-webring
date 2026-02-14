"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import GlowStars from "./GlowStars";
import CansbridgeLogoModel from "./CansbridgeLogoModel";

export default function TopLogo3D() {
  const controlsRef = React.useRef<OrbitControlsImpl>(null!);

  return (
    <section className="w-full">
      <div className="mx-auto mt-10 flex w-full max-w-6xl justify-center">
        <div className="relative -mt-12 min-h-[600px] w-full min-w-[800px] overflow-visible">
          {/* css halo behind canvas */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 34%, rgba(255,255,255,0.00) 70%)",
              filter: "blur(42px)",
              opacity: 0.9,
              transform: "translate(-50%, -50%) translateZ(0)",
              willChange: "transform, filter",
            }}
          />

          <Canvas
            camera={{ position: [0, 0, 3.05], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.75]}
          >
            <Stars
              radius={80}
              depth={40}
              count={2800}
              factor={3.5}
              saturation={0}
              fade
              speed={0.4}
            />

            <GlowStars count={70} radius={4.2} size={0.022} opacity={0.55} />
            <GlowStars count={85} radius={3.2} size={0.045} opacity={0.85} />

            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 4, 3]} intensity={1.1} />
            <Environment preset="city" />

            <CansbridgeLogoModel controlsRef={controlsRef} />

            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.28}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.12}
                mipmapBlur
              />
            </EffectComposer>

            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              enableDamping
              dampingFactor={0.08}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
