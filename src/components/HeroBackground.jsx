import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// Remove Stars and Sparkles imports
// import { Stars, Sparkles } from '@react-three/drei';

// Remove unused image imports
// import mvp1Img from '../assets/mvp1_image1.png';
// import landingImg from '../assets/uiVs1.png';
// import modelImg from '../assets/model1.jpg';
// import apicusImg from '../assets/apicus-1-ss.png';

// Remove unused constant
// const IMAGES = [mvp1Img, landingImg, modelImg, apicusImg];

// Remove the FloatingPictures component entirely
// function FloatingPictures() { ... }

// New Starfield Component
function Starfield() {
  const pointsRef = useRef();

  // Create star positions
  const [sphere] = useMemo(() => {
    const numStars = 7000;
    const positions = new Float32Array(numStars * 3);
    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64); // Larger sphere radius
    for (let i = 0; i < numStars; i++) {
      const vertex = new THREE.Vector3();
      vertex.setFromSphericalCoords(
        THREE.MathUtils.randFloat(50, 150), // Distribute stars further out
        Math.acos(THREE.MathUtils.randFloatSpread(2)),
        THREE.MathUtils.randFloatSpread(Math.PI * 2)
      );
      positions[i * 3] = vertex.x;
      positions[i * 3 + 1] = vertex.y;
      positions[i * 3 + 2] = vertex.z;
    }
    return [positions];
  }, []);

  // Subtle rotation over time
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 250;
      pointsRef.current.rotation.y -= delta / 300;
    }
  });

  return (
    <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02} // Adjust size as needed
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// New MeteorShower Component
function MeteorShower({ count = 50 }) {
  const pointsRef = useRef();
  const velocitiesRef = useRef();
  const startPositionsRef = useRef();
  const lifetimesRef = useRef();

  // Function to reset a single meteor - MOVED HERE
  const resetMeteor = (i, positions, velocities, startPositions, lifetimes) => {
    const idx = i * 3;
    // Start position (top-right, off-screen)
    const startX = THREE.MathUtils.randFloat(20, 50);
    const startY = THREE.MathUtils.randFloat(20, 40);
    const startZ = THREE.MathUtils.randFloat(-30, 10);
    positions[idx] = startX;
    positions[idx + 1] = startY;
    positions[idx + 2] = startZ;
    startPositions[idx] = startX;
    startPositions[idx + 1] = startY;
    startPositions[idx + 2] = startZ;

    // Velocity (towards bottom-left)
    velocities[idx] = THREE.MathUtils.randFloat(-25, -15); // Faster X
    velocities[idx + 1] = THREE.MathUtils.randFloat(-15, -10); // Slower Y
    velocities[idx + 2] = THREE.MathUtils.randFloat(5, 15); // Towards camera slightly

    // Lifetime/delay (staggered appearance)
    lifetimes[i] = THREE.MathUtils.randFloat(0, 15); // Initial delay + travel time
  };

  // Initialize meteor properties only once
  useMemo(() => {
    const positions = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    const startPos = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    // Allocate geometry buffer attribute once
    pointsRef.current?.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    for (let i = 0; i < count; i++) {
      // Now safe to call resetMeteor
      resetMeteor(i, positions, vels, startPos, lifetimes);
    }

    // Store the generated values in refs
    velocitiesRef.current = vels;
    startPositionsRef.current = startPos;
    lifetimesRef.current = lifetimes;

    // Ensure the initial positions are uploaded to the GPU
    if (pointsRef.current) {
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

  }, [count]); // Dependency array remains [count]

  // Removed resetMeteor definition from here

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const velocities = velocitiesRef.current;
    const startPositions = startPositionsRef.current;
    const lifetimes = lifetimesRef.current;

    for (let i = 0; i < count; i++) {
      lifetimes[i] -= delta;

      if (lifetimes[i] <= 0) {
        // Reset meteor when lifetime ends
        resetMeteor(i, positions, velocities, startPositions, lifetimes);
      } else {
        // Update position based on velocity
        const idx = i * 3;
        positions[idx] += velocities[idx] * delta;
        positions[idx + 1] += velocities[idx + 1] * delta;
        positions[idx + 2] += velocities[idx + 2] * delta;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    // Initialize geometry inside the Points component
    <Points ref={pointsRef} limit={count} frustumCulled={false}>
      {/* Initial empty buffer, will be populated by useMemo */}
      {/* <bufferGeometry attach="geometry">
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={new Float32Array(count * 3)} 
          itemSize={3} 
        />
      </bufferGeometry> */} 
      <PointMaterial
        transparent
        color="#ADD8E6" // Light blueish-white head
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Scene() {
  // Add useRef for mouse tracking if needed later for parallax
  const groupRef = useRef(); 
  
  // Add useFrame for mouse parallax if needed
  useFrame((state) => {
    if (groupRef.current) {
        // Example subtle mouse parallax - adjust as needed
        const targetX = state.mouse.y * 0.05; // Reduced intensity
        const targetY = state.mouse.x * 0.05; // Reduced intensity
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05; // Rotate y instead of z for a different feel
    }
  });

  return (
    // Add a group to apply parallax to both stars and meteors
    <group ref={groupRef}>
      {/* Add the new Starfield component */}
      <Suspense fallback={null}>
        <Starfield />
        {/* Add the MeteorShower component */}
        <MeteorShower count={30} /> 
      </Suspense>
      
      {/* New MeteorShower will go here */}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      className="absolute inset-0 -z-10 !pointer-events-none" // full-cover & always behind content
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      {/* Add subtle background color/gradient via scene background */}
      <color attach="background" args={['#0a011a']} /> 
      {/* Or use a THREE.Color for more complex gradients if needed later */}
      <Scene />
    </Canvas>
  );
} 