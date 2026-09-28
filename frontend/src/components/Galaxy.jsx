import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Galaxy({ position = [0, 0, 0], size = 100, color = '#ffffff' }) {
  const galaxyRef = useRef();

  const particles = useMemo(() => {
    const count = 5000;
    const positions = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * size * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * size * 0.1;
      const spiralRadius = radius * (1 + 0.3 * Math.sin(theta * 3));

      positions.push(
        spiralRadius * Math.cos(theta),
        height,
        spiralRadius * Math.sin(theta)
      );

      const hue = 0.6 + (Math.random() - 0.5) * 0.1;
      const saturation = 0.7 + Math.random() * 0.3;
      const lightness = 0.5 + Math.random() * 0.3;

      colors.push(hue, saturation, lightness);
      sizes.push(0.1 + Math.random() * 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  }, [size]);

  const coreGeometry = useMemo(() => {
    return new THREE.SphereGeometry(size * 0.1, 16, 16);
  }, [size]);

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group ref={galaxyRef} position={position}>
      <mesh geometry={coreGeometry}>
        <meshBasicMaterial color="#ffff99" />
      </mesh>

      <mesh geometry={coreGeometry} scale={[1.5, 1.5, 1.5]}>
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} />
      </mesh>

      <points geometry={particles}>
        <pointsMaterial
          size={1}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 0.3, size * 0.05, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <torusGeometry args={[size * 0.3, size * 0.05, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default Galaxy;
