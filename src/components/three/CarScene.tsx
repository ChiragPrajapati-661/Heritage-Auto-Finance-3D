import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneRefs {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

const GOLD = '#d9b45a';

function useCarMaterials() {
  return useMemo(() => {
    const body = new THREE.MeshStandardMaterial({ color: '#1a1030', metalness: 0.9, roughness: 0.22 });
    const gold = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.95, roughness: 0.18 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#0a0714',
      metalness: 0.3,
      roughness: 0.04,
      transparent: true,
      opacity: 0.85,
    });
    const rubber = new THREE.MeshStandardMaterial({ color: '#0c0a10', roughness: 0.9 });
    const headlight = new THREE.MeshStandardMaterial({
      color: '#fff6dd',
      emissive: '#ffe9b0',
      emissiveIntensity: 2.2,
    });
    const tail = new THREE.MeshStandardMaterial({
      color: '#ff4444',
      emissive: '#cc1111',
      emissiveIntensity: 1.2,
    });
    return { body, gold, glass, rubber, headlight, tail };
  }, []);
}

function Wheel({ x, material }: { x: number; material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[x, 0.34, x > 0 ? -1.15 : 1.15]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.24, 24]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, x > 0 ? -0.13 : 0.13, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

function LuxuryCar({ pointer, scroll, reducedMotion }: SceneRefs) {
  const group = useRef<THREE.Group>(null);
  const headlightL = useRef<THREE.PointLight>(null);
  const headlightR = useRef<THREE.PointLight>(null);
  const m = useCarMaterials();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.rotation.y += 0.0018;
      group.current.position.y = Math.sin(t * 0.6) * 0.04;
      group.current.rotation.z = Math.sin(t * 0.4) * 0.008;
    }
    // gentle pointer-driven turn
    group.current.rotation.y += pointer.current.x * 0.004;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.12, 0.05);
    // scroll-driven rotation (360° across the hero scroll)
    group.current.rotation.y += scroll.current * 0.8;
    // headlight beam breathing
    if (!reducedMotion && headlightL.current && headlightR.current) {
      const pulse = 1.6 + Math.sin(t * 2.2) * 0.5;
      headlightL.current.intensity = pulse;
      headlightR.current.intensity = pulse;
    }
  });

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={1.35}>
      <mesh castShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[4.4, 0.55, 1.9]} />
        <primitive object={m.body} attach="material" />
      </mesh>
      <mesh castShadow position={[-0.25, 1.08, 0]}>
        <boxGeometry args={[2.3, 0.52, 1.7]} />
        <primitive object={m.glass} attach="material" />
      </mesh>
      <mesh castShadow position={[1.75, 0.78, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[1.2, 0.3, 1.8]} />
        <primitive object={m.body} attach="material" />
      </mesh>
      <mesh castShadow position={[-2.0, 0.8, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.9, 0.3, 1.8]} />
        <primitive object={m.body} attach="material" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[4.42, 0.05, 1.92]} />
        <primitive object={m.gold} attach="material" />
      </mesh>
      <mesh position={[2.2, 0.6, 0]}>
        <boxGeometry args={[0.06, 0.28, 1.3]} />
        <primitive object={m.gold} attach="material" />
      </mesh>
      {/* Headlights with live glow lights */}
      <mesh position={[2.21, 0.78, 0.6]}>
        <boxGeometry args={[0.05, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
      <mesh position={[2.21, 0.78, -0.6]}>
        <boxGeometry args={[0.05, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
      <pointLight ref={headlightL} position={[2.6, 0.78, 0.6]} distance={6} color="#ffe9b0" intensity={1.6} />
      <pointLight ref={headlightR} position={[2.6, 0.78, -0.6]} distance={6} color="#ffe9b0" intensity={1.6} />
      {/* Tail lights */}
      <mesh position={[-2.21, 0.78, 0.6]}>
        <boxGeometry args={[0.05, 0.1, 0.4]} />
        <primitive object={m.tail} attach="material" />
      </mesh>
      <mesh position={[-2.21, 0.78, -0.6]}>
        <boxGeometry args={[0.05, 0.1, 0.4]} />
        <primitive object={m.tail} attach="material" />
      </mesh>
      <Wheel x={1.45} material={m.rubber} />
      <Wheel x={-1.45} material={m.rubber} />
    </group>
  );
}

function GoldParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 7 - 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    points.current.position.y = Math.sin(t * 0.25) * 0.3;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={180} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export default function CarScene({ reducedMotion }: { reducedMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [5.2, 2.2, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={(state) => {
        const onMove = (e: PointerEvent) => {
          pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
          pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onScroll = () => {
          scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        state.gl.domElement.addEventListener('webglcontextlost', () => state.invalidate());
      }}
    >
      {/* Showroom lighting rig */}
      <ambientLight intensity={0.35} />
      <spotLight
        position={[6, 8, 4]}
        angle={0.5}
        penumbra={0.8}
        intensity={140}
        color="#f5e3a8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-7, 5, -5]} angle={0.6} penumbra={1} intensity={80} color="#6d30b4" />
      <pointLight position={[0, 2, 6]} intensity={12} color={GOLD} />
      {/* Mouse-responsive camera */}
      <CameraRig pointer={pointer} reducedMotion={reducedMotion} />
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.35}>
        <LuxuryCar pointer={pointer} scroll={scroll} reducedMotion={reducedMotion} />
      </Float>
      <GoldParticles reducedMotion={reducedMotion} />
      <ContactShadows position={[0, -0.75, 0]} opacity={0.65} scale={12} blur={2.6} far={4} color="#000000" />
      <Environment preset="city" />
    </Canvas>
  );
}

function CameraRig({
  pointer,
  reducedMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  useFrame((state) => {
    if (reducedMotion) return;
    const px = pointer.current.x;
    const py = pointer.current.y;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 5.2 + px * 0.6, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.2 - py * 0.4, 0.04);
    state.camera.lookAt(0, 0.4, 0);
  });
  return null;
}
