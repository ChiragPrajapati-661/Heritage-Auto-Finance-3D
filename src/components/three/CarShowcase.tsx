import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks';

const GOLD = '#d9b45a';

function buildCarMaterials() {
  return {
    body: new THREE.MeshStandardMaterial({ color: '#1a1030', metalness: 0.9, roughness: 0.22 }),
    gold: new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.95, roughness: 0.18 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#0a0714',
      metalness: 0.3,
      roughness: 0.04,
      transparent: true,
      opacity: 0.85,
    }),
    rubber: new THREE.MeshStandardMaterial({ color: '#0c0a10', roughness: 0.9 }),
    headlight: new THREE.MeshStandardMaterial({ color: '#fff6dd', emissive: '#ffe9b0', emissiveIntensity: 2.2 }),
    tail: new THREE.MeshStandardMaterial({ color: '#ff4444', emissive: '#cc1111', emissiveIntensity: 1.2 }),
  };
}

type Mats = ReturnType<typeof buildCarMaterials>;

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

function CarModel({ m }: { m: Mats }) {
  return (
    <group position={[0, -0.75, 0]} scale={1.25}>
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
      <mesh position={[2.21, 0.78, 0.6]}>
        <boxGeometry args={[0.05, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
      <mesh position={[2.21, 0.78, -0.6]}>
        <boxGeometry args={[0.05, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
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

/**
 * Draggable showroom stage: the user rotates the car a full 360° by dragging.
 * Falls back to a slow auto-rotate when idle (or always, with reduced motion).
 */
export default function CarShowcase() {
  const reducedMotion = useReducedMotion();
  const group = useRef<THREE.Group>(null);
  const target = useRef(0.6);
  const current = useRef(0.6);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [hint, setHint] = useState(true);
  const m = useMemo(buildCarMaterials, []);

  useFrame(() => {
    if (!group.current) return;
    if (!dragging.current && !reducedMotion) target.current += 0.0035;
    current.current += (target.current - current.current) * 0.08;
    group.current.rotation.y = current.current;
  });

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    setHint(false);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    target.current += (e.clientX - lastX.current) * 0.012;
    lastX.current = e.clientX;
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="relative">
      <div
        className="h-[320px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[420px]"
        role="img"
        aria-label="Interactive 3D car — drag to rotate"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [4.8, 1.9, 5.6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.35} />
          <spotLight position={[6, 8, 4]} angle={0.5} penumbra={0.8} intensity={130} color="#f5e3a8" castShadow shadow-mapSize={[1024, 1024]} />
          <spotLight position={[-7, 5, -5]} angle={0.6} penumbra={1} intensity={70} color="#6d30b4" />
          <pointLight position={[0, 2, 6]} intensity={10} color={GOLD} />
          <group ref={group}>
            <CarModel m={m} />
          </group>
          <ContactShadows position={[0, -0.78, 0]} opacity={0.65} scale={12} blur={2.6} far={4} color="#000000" />
          <Environment preset="city" />
        </Canvas>
      </div>
      <p
        className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gold-500/30 bg-night-950/70 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold-400 backdrop-blur transition-opacity duration-500 ${
          hint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Drag to rotate
      </p>
    </div>
  );
}
