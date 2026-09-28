import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import SolarSystem from './SolarSystem';
import Galaxy from './Galaxy';
import Nebula from './Nebula';
import StarField from './StarField';
import { useUniverseStore } from '../store/useUniverseStore';

function CustomCamera() {
  const { cameraPosition, zoomLevel } = useUniverseStore();
  const { camera } = useThree();

  useFrame(() => {
    camera.position.set(
      cameraPosition.x * zoomLevel,
      cameraPosition.y * zoomLevel,
      cameraPosition.z * zoomLevel
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

function Scene() {
  const { showStars, showPlanets, showGalaxies, showNebulae, currentView, animationSpeed } = useUniverseStore();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffaa33" />
      <directionalLight position={[0, 1, 0]} intensity={0.3} color="#8888ff" />
      <Environment preset="space" />
      <color attach="background" args={['#020617']} />

      <StarField count={5000} speed={animationSpeed * 0.1} />

      {currentView === 'solar-system' && (
        <>
          {showStars && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} />}
          {showPlanets && <SolarSystem />}
        </>
      )}

      {currentView === 'milky-way' && (
        <>
          {showStars && <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} />}
          {showGalaxies && <Galaxy position={[0, 0, 0]} size={150} />}
          {showPlanets && <SolarSystem scale={0.3} position={[40, 0, 0]} />}
        </>
      )}

      {currentView === 'universe' && (
        <>
          {showStars && <Stars radius={500} depth={200} count={10000} factor={4} saturation={0} />}
          {showGalaxies && (
            <>
              <Galaxy position={[0, 0, 0]} size={200} />
              <Galaxy position={[300, 0, -100]} size={100} />
              <Galaxy position={[-200, 150, 50]} size={150} />
            </>
          )}
          {showNebulae && (
            <>
              <Nebula position={[100, 50, -50]} size={80} color="#ff0066" />
              <Nebula position={[-150, -30, 20]} size={60} color="#0066ff" />
              <Nebula position={[50, -100, -80]} size={100} color="#66ff00" />
            </>
          )}
        </>
      )}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={1000}
        enablePan={true}
        panSpeed={0.8}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
      />

      <CustomCamera />
    </>
  );
}

function UniverseScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 10000 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}

export default UniverseScene;
