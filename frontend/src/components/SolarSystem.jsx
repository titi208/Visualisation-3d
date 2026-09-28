import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';
import { useUniverseStore } from '../store/useUniverseStore';

const planetsData = [
  { name: 'Mercure', distance: 2, radius: 0.2, color: '#aaaaaa', orbitalPeriod: 0.24, rotationPeriod: 58.6, description: 'La plus proche du Soleil' },
  { name: 'Vénus', distance: 3.5, radius: 0.45, color: '#ffcc99', orbitalPeriod: 0.62, rotationPeriod: -243, description: 'Atmosphère toxique' },
  { name: 'Terre', distance: 5, radius: 0.5, color: '#1da1f2', orbitalPeriod: 1, rotationPeriod: 1, description: 'Notre planète', hasRings: false, hasAtmosphere: true },
  { name: 'Mars', distance: 7, radius: 0.35, color: '#ff6600', orbitalPeriod: 1.88, rotationPeriod: 1.03, description: 'La planète rouge' },
  { name: 'Jupiter', distance: 12, radius: 1.2, color: '#ffcc66', orbitalPeriod: 11.86, rotationPeriod: 0.41, description: 'Géante gazeuse', hasRings: true },
  { name: 'Saturne', distance: 18, radius: 1, color: '#ffcc99', orbitalPeriod: 29.46, rotationPeriod: 0.45, description: 'Anneaux magnifiques', hasRings: true, ringSize: 2 },
  { name: 'Uranus', distance: 25, radius: 0.8, color: '#aaddff', orbitalPeriod: 84.01, rotationPeriod: 0.72, description: 'Tourne sur le côté', hasRings: true, tilt: Math.PI / 2 },
  { name: 'Neptune', distance: 30, radius: 0.75, color: '#0066ff', orbitalPeriod: 164.8, rotationPeriod: 0.67, description: 'Vents violents', hasRings: true }
];

function Sun({ position = [0, 0, 0], size = 1.5 }) {
  return (
    <group position={position}>
      <pointLight color="#ffff99" intensity={2} distance={50} />
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color="#ffff66" />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 1.5, 32, 32]} />
        <meshBasicMaterial color="#ffff99" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 2.5, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function SolarSystem({ scale = 1, position = [0, 0, 0] }) {
  const { showOrbits, setSelectedObject, selectedObject } = useUniverseStore();
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta * 0.1);
  });

  const handlePlanetClick = (planetData) => {
    setSelectedObject({
      type: 'planet',
      ...planetData,
      position: [
        Math.cos(time * planetData.orbitalPeriod * 0.1) * planetData.distance * scale,
        0,
        Math.sin(time * planetData.orbitalPeriod * 0.1) * planetData.distance * scale
      ]
    });
  };

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <Sun />
      {planetsData.map((planet) => (
        <Planet
          key={planet.name}
          name={planet.name}
          distance={planet.distance}
          radius={planet.radius}
          color={planet.color}
          orbitalPeriod={planet.orbitalPeriod}
          rotationPeriod={planet.rotationPeriod}
          time={time}
          hasRings={planet.hasRings}
          ringSize={planet.ringSize}
          tilt={planet.tilt}
          onClick={() => handlePlanetClick(planet)}
          isSelected={selectedObject?.name === planet.name}
          showOrbits={showOrbits}
        />
      ))}
    </group>
  );
}

export default SolarSystem;
