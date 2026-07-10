"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function CuteRobotModel() {
  const gltf = useGLTF("/cute_robot_model.glb");
  const modelObject = gltf.scene || gltf.scenes?.[0] || gltf.object || gltf;

  if (!modelObject) return null;

  return (
    <primitive 
      object={modelObject} 
      scale={1.8}         
      position={[0, -0.7, 0]} 
    />
  );
}
export function RobotWorker() {
  return (
    <div className="flex flex-col items-center rounded-xl p-4 select-none">
      <div className="mb-3 flex w-full items-center justify-between text-white z-10">
        {/* <span className="label-eyebrow text-xs tracking-wider opacity-60">patching...</span> */}
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Added `relative` layout container to prevent other blocks from stealing cursor clicks */}
      <div className="relative h-[250px] w-full max-w-[250px] overflow-hidden">
        <Canvas
          camera={{ position: [0, 0.8, 2.5], fov: 45 }}
          className="absolute inset-0 z-0 touch-none" // Prevents mobile gestures from locking up interaction
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#00f3ff" />
            <pointLight position={[-5, 5, 5]} intensity={2} color="#ff2a8d" />
            <directionalLight position={[0, 5, 2]} intensity={1} color="#ffffff" />
            
            <CuteRobotModel />

            {/* Completely unlocked OrbitControls configuration to test rotation limits */}
            <OrbitControls 
              enablePan={true} 
              enableZoom={true}
              autoRotate={true} // 👈 Added this! The robot will automatically spin on its own to prove it's 3D!
              autoRotateSpeed={4}
            />
          </Suspense>
        </Canvas>
      </div>

      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-slate-400 z-10">
        connecting your tools
      </p>
    </div>
  );
}