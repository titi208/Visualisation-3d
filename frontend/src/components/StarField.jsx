import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 5000, speed = 0.1 }) {
  const starsRef = useRef();

  const stars = useMemo(() => {
    const positions = [];
    const colors = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 500;

      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      const brightness = 0.5 + Math.random() * 0.5;
      colors.push(brightness, brightness, brightness);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }, [count]);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001 * speed;
    }
  });

  return (
    <points ref={starsRef} geometry={stars}>
      <pointsMaterial
        size={0.1}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default StarField;
