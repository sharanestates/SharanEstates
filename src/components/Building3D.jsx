import React, { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export default function Building3D({ color = "#ffffff", accent = "#D3B98A", scale = 1, rotationSpeed = 0.005 }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]} scale={scale}>
      {/* Central Core */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 6, 1]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Light Theme Accents */}
      <mesh position={[0.6, 1, 0.6]}>
        <boxGeometry args={[0.2, 4, 0.2]} />
        <meshStandardMaterial color={accent} roughness={0.3} metalness={1} />
      </mesh>
      <mesh position={[-0.6, 3, -0.6]}>
        <boxGeometry args={[0.2, 5, 0.2]} />
        <meshStandardMaterial color={accent} roughness={0.3} metalness={1} />
      </mesh>
      
      {/* Glass Floors - lighter for light theme */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.6, 0]}>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshPhysicalMaterial 
            color="#E8F4F8" 
            transmission={0.8} 
            opacity={0.8} 
            transparent
            metalness={0.1} 
            roughness={0.1} 
            ior={1.4} 
            thickness={0.2} 
          />
        </mesh>
      ))}
    </group>
  );
}
