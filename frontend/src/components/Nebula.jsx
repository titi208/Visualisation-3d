import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Nebula({ position = [0, 0, 0], size = 50, color = '#ff0066' }) {
  const nebulaRef = useRef();

  const rgb = useMemo(() => {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    return { r, g, b };
  }, [color]);

  const cloudGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      const noise = (Math.random() - 0.5) * size * 0.3;
      positionAttribute.setX(i, x + noise);
      positionAttribute.setY(i, y + noise * 0.5);
      positionAttribute.setZ(i, z + noise);
    }

    return geometry;
  }, [size]);

  const particles = useMemo(() => {
    const count = 1000;
    const positions = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * size * 0.8;

      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      colors.push(
        rgb.r * (0.7 + Math.random() * 0.3),
        rgb.g * (0.7 + Math.random() * 0.3),
        rgb.b * (0.7 + Math.random() * 0.3)
      );

      sizes.push(0.2 + Math.random() * 0.8);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  }, [size, rgb]);

  useFrame(() => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0001;
      nebulaRef.current.rotation.x += 0.00005;
    }
  });

  return (
    <group ref={nebulaRef} position={position}>
      <mesh geometry={cloudGeometry}>
        <meshBasicMaterial color={color} transparent={true} opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={cloudGeometry} scale={[0.8, 0.8, 0.8]}>
        <meshBasicMaterial color={color} transparent={true} opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      <points geometry={particles}>
        <pointsMaterial
          size={1}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh geometry={cloudGeometry} scale={[1.2, 1.2, 1.2]}>
        <meshBasicMaterial color={color} transparent={true} opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default Nebula;
