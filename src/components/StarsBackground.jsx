// src/components/StarsBackground.jsx
import React, { useRef, useMemo, useEffect, useState, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ThemeContext } from './ThemeContext';
import { Color } from 'three';

function Stars({ theme, scrollPosition }) {
  const groupRef = useRef();

  // Reference to store the material
  const materialRef = useRef();

  // Store the target color based on the theme
  const targetColor = useMemo(() => new Color(theme === 'dark' ? '#ffffff' : '#000000'), [theme]);

  // Initialize the color for interpolation
  const color = useRef(new Color(theme === 'dark' ? '#ffffff' : '#000000'));

  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    // Apply scroll position to the position of the stars group
    groupRef.current.position.y = scrollPosition * 0.1;
    groupRef.current.rotation.z += 0.001;

    // Smoothly interpolate the color
    color.current.lerp(targetColor, delta * 2); // Adjust the multiplier for speed

    // Update the material color
    if (materialRef.current) {
      materialRef.current.color.copy(color.current);
    }
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh key={index} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial ref={materialRef} color={color.current.clone()} />
        </mesh>
      ))}
    </group>
  );
}

function Background({ theme }) {
  const { gl } = useThree();

  // Reference to store the background color
  const backgroundColorRef = useRef(new Color(theme === 'dark' ? '#000000' : '#ffffff'));

  // Target background color
  const targetBackgroundColor = useMemo(
    () => new Color(theme === 'dark' ? '#000000' : '#ffffff'),
    [theme]
  );

  useFrame((state, delta) => {
    // Interpolate background color
    backgroundColorRef.current.lerp(targetBackgroundColor, delta * 2);
    gl.setClearColor(backgroundColorRef.current);
  });

  return null;
}

function StarsBackground() {
  const { theme } = useContext(ThemeContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Moved useFrame into Background component */}
      <Background theme={theme} />
      <Stars theme={theme} scrollPosition={scrollPosition} />
    </Canvas>
  );
}

export default StarsBackground;
