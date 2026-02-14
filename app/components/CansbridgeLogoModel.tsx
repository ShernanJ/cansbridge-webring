"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export default function CansbridgeLogoModel({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  const gltf = useGLTF("/Cansbridge.glb");
  const spinRef = React.useRef<THREE.Group>(null!);

  const HOME_TARGET = React.useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const HOME_POS = React.useMemo(() => new THREE.Vector3(0, 0, 3.2), []);
  const isInteracting = React.useRef(false);

  React.useMemo(() => {
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.2,
          metalness: 0.02,
          emissive: new THREE.Color("#ffffff"),
          emissiveIntensity: 0.06,
        });
      }
    });

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    gltf.scene.position.sub(center);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxAxis = Math.max(size.x, size.y, size.z);

    const TARGET_SIZE = 2.4;
    gltf.scene.scale.setScalar(TARGET_SIZE / maxAxis);
  }, [gltf.scene]);

  React.useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => (isInteracting.current = true);
    const onEnd = () => (isInteracting.current = false);

    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);

    controls.target.copy(HOME_TARGET);
    controls.object.position.copy(HOME_POS);
    controls.update();

    return () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
    };
  }, [controlsRef, HOME_POS, HOME_TARGET]);

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 1.15;

    const controls = controlsRef.current;
    if (!controls) return;

    if (!isInteracting.current) {
      controls.target.lerp(HOME_TARGET, 0.08);
      controls.object.position.lerp(HOME_POS, 0.08);
      controls.update();
    }
  });

  return (
    <group ref={spinRef}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[0, -Math.PI / 2, 0]}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <primitive object={gltf.scene} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Cansbridge.glb");
