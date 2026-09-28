import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useUniverseStore } from '../store/useUniverseStore';

function Ring({ radius, innerRadius = radius * 1.2, color = '#cccc99' }) {
  const geometry = useMemo(() => {
    const ringGeometry = new THREE.RingGeometry(innerRadius, radius, 32);
    ringGeometry.rotateX(Math.PI / 2);
    return ringGeometry;
  }, [radius, innerRadius]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Atmosphere({ radius, color = '#88ffdd', opacity = 0.2 }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function OrbitPath({ distance, color = '#666666' }) {
  const segments = 64;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(theta) * distance,
      0,
      Math.sin(theta) * distance
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

function PlanetLabel({ name, position, isSelected }) {
  const { showLabels } = useUniverseStore();
  if (!showLabels) return null;

  return (
    <Text
      position={[position[0], position[1] + 1.5, position[2]]}
      fontSize={0.3}
      color={isSelected ? '#ffff00' : '#ffffff'}
      anchorX="center"
      anchorY="middle"
    >
      {name}
    </Text>
  );
}

function Planet({ name, distance, radius, color, orbitalPeriod = 1, rotationPeriod = 1, time = 0, hasRings = false, ringSize = 1.5, tilt = 0, onClick, isSelected = false, showOrbits = false }) {
  const meshRef = useRef();
  const groupRef = useRef();

  const x = Math.cos(time * orbitalPeriod) * distance;
  const z = Math.sin(time * orbitalPeriod) * distance;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (2 * Math.PI / (rotationPeriod * 10));
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = tilt || 0;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <group ref={groupRef} position={[x, 0, z]} onClick={handleClick}>
      {showOrbits && <OrbitPath distance={distance} />}

      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      <Atmosphere radius={radius} color="#88ffdd" opacity={0.1} />
      {hasRings && <Ring radius={radius * ringSize} innerRadius={radius * 1.2} color="#cccc99" />}

      {isSelected && (
        <mesh>
          <sphereGeometry args={[radius * 1.3, 32, 32]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.3} />
        </mesh>
      )}

      <PlanetLabel name={name} position={[x, 0, z]} isSelected={isSelected} />
    </group>
  );
}

export default Planet;
