"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type BlobProps = {
  position: [number, number, number];
  scale: number;
  speed: number;
  drift: number;
};

/** A dark chrome droplet: near-black metal, rim-lit so only its edge reads. */
function Droplet({ position, scale, speed, drift }: BlobProps) {
  const ref = useRef<THREE.Mesh>(null);
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.position.y = origin.y + Math.sin(t * speed) * drift;
    mesh.position.x = origin.x + Math.cos(t * speed * 0.7) * drift * 0.5;
    mesh.rotation.y = t * 0.18;
    mesh.rotation.z = Math.sin(t * 0.22) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 96, 96]} />
      <MeshDistortMaterial
        color="#101010"
        metalness={1}
        roughness={0.2}
        distort={0.5}
        speed={1.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* A hand-built environment: real chrome reflections with no HDRI
          download — the light shapes below ARE what the droplets mirror. */}
      <Environment resolution={256} frames={Infinity}>
        <Lightformer form="rect" intensity={3.2} position={[0, 4, -6]} scale={[12, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.2} position={[-7, -1, 2]} scale={[8, 10, 1]} color="#a8db42" rotation={[0, Math.PI / 2.4, 0]} />
        <Lightformer form="rect" intensity={1.2} position={[7, 2, 3]} scale={[8, 8, 1]} color="#9fd4ff" rotation={[0, -Math.PI / 2.4, 0]} />
        <Lightformer form="ring" intensity={1.4} position={[0, -5, -2]} scale={6} color="#ffffff" />
      </Environment>

      <ambientLight intensity={0.3} />
      {/* Rim lights: one cold key from behind, one hot accent from below. */}
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, 2]} intensity={14} color="#a8db42" distance={18} />
      <pointLight position={[5, 2, -4]} intensity={9} color="#9fd4ff" distance={20} />

      {/* Two large forms, not a field of bubbles. Scattered small spheres with
          bright rims read as stock 3D; one dominant shape reads as art
          direction. The wireframe rings are gone for the same reason. */}
      <Droplet position={[-3.1, 0.2, -0.5]} scale={2.6} speed={0.32} drift={0.3} />
      <Droplet position={[3.4, -0.6, -2.6]} scale={1.5} speed={0.46} drift={0.22} />

    </>
  );
}

/**
 * The liquid-chrome field behind the dark sections.
 *
 * Mounted only where it is wanted, and skipped entirely under reduced motion —
 * the layout never depends on it, so the page is complete without it.
 */
export default function LiquidField({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

