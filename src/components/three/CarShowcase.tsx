import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks';

const GOLD = '#d9b45a';

function buildCarMaterials() {
  return {
    body: new THREE.MeshStandardMaterial({ color: '#34313b', metalness: 0.78, roughness: 0.28 }),
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

function Wheel({ x, z, material }: { x: number; z: number; material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[x, 0.34, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.24, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.035, 24]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.125, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.035, 24]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
      </mesh>
    </group>
  );
}

function CarModel({ m }: { m: Mats }) {
  const bodyGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.35, 0.48);
    shape.lineTo(-2.28, 0.86);
    shape.quadraticCurveTo(-2.18, 1.02, -1.88, 1.05);
    shape.lineTo(-1.28, 1.08);
    shape.quadraticCurveTo(-1.04, 1.08, -0.86, 1.25);
    shape.lineTo(-0.34, 1.72);
    shape.quadraticCurveTo(-0.15, 1.86, 0.12, 1.86);
    shape.lineTo(1.08, 1.82);
    shape.quadraticCurveTo(1.38, 1.78, 1.58, 1.52);
    shape.lineTo(2.05, 1.12);
    shape.quadraticCurveTo(2.28, 1.02, 2.38, 0.82);
    shape.lineTo(2.32, 0.48);
    shape.lineTo(1.9, 0.48);
    shape.absarc(1.38, 0.48, 0.42, 0, Math.PI, true);
    shape.lineTo(-0.92, 0.48);
    shape.absarc(-1.42, 0.48, 0.42, 0, Math.PI, true);
    shape.lineTo(-2.35, 0.48);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 1.82,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.07,
      bevelThickness: 0.07,
      curveSegments: 16,
    });
    geometry.translate(0, 0, -0.91);
    return geometry;
  }, []);

  const cabinGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.15, 1.12);
    shape.lineTo(-0.48, 1.72);
    shape.quadraticCurveTo(-0.32, 1.82, -0.08, 1.82);
    shape.lineTo(0.92, 1.78);
    shape.quadraticCurveTo(1.08, 1.76, 1.2, 1.58);
    shape.lineTo(1.62, 1.12);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 1.48,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    });
    geometry.translate(0, 0, -0.74);
    return geometry;
  }, []);

  return (
    <group position={[0, -0.75, 0]} scale={1.18}>
      <mesh geometry={bodyGeometry} castShadow receiveShadow>
        <primitive object={m.body} attach="material" />
      </mesh>
      <mesh geometry={cabinGeometry} castShadow>
        <primitive object={m.glass} attach="material" />
      </mesh>
      {/* Gold lower-body pinstripe */}
      <mesh position={[0, 0.83, 0]} scale={[1, 1, 0.94]}>
        <boxGeometry args={[4.55, 0.035, 1.88]} />
        <primitive object={m.gold} attach="material" />
      </mesh>
      {/* Front grille and bumper */}
      <mesh position={[2.34, 0.69, 0]}>
        <boxGeometry args={[0.07, 0.28, 0.78]} />
        <meshStandardMaterial color="#111116" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[2.37, 0.53, 0]}>
        <boxGeometry args={[0.12, 0.09, 1.45]} />
        <primitive object={m.gold} attach="material" />
      </mesh>
      {/* LED headlights */}
      <mesh position={[2.27, 0.91, 0.58]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
      <mesh position={[2.27, 0.91, -0.58]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.42]} />
        <primitive object={m.headlight} attach="material" />
      </mesh>
      {/* Rear LED lamps */}
      <mesh position={[-2.3, 0.88, 0.58]}>
        <boxGeometry args={[0.08, 0.11, 0.4]} />
        <primitive object={m.tail} attach="material" />
      </mesh>
      <mesh position={[-2.3, 0.88, -0.58]}>
        <boxGeometry args={[0.08, 0.11, 0.4]} />
        <primitive object={m.tail} attach="material" />
      </mesh>
      {/* Four alloy wheels */}
      <Wheel x={1.38} z={0.92} material={m.rubber} />
      <Wheel x={1.38} z={-0.92} material={m.rubber} />
      <Wheel x={-1.42} z={0.92} material={m.rubber} />
      <Wheel x={-1.42} z={-0.92} material={m.rubber} />
    </group>
  );
}

function ShowroomRotation({
  group,
  target,
  current,
  dragging,
  reducedMotion,
  children,
}: {
  group: React.RefObject<THREE.Group | null>;
  target: React.MutableRefObject<number>;
  current: React.MutableRefObject<number>;
  dragging: React.MutableRefObject<boolean>;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  // This component is rendered inside <Canvas>, so R3F hooks are valid here.
  useFrame(() => {
    if (!group.current) return;
    if (!dragging.current && !reducedMotion) target.current += 0.0035;
    current.current += (target.current - current.current) * 0.08;
    group.current.rotation.y = current.current;
  });

  return <group ref={group}>{children}</group>;
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
          dpr={[1, 1.35]}
          camera={{ position: [4.8, 1.9, 5.6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.35} />
          <spotLight position={[6, 8, 4]} angle={0.5} penumbra={0.8} intensity={130} color="#f5e3a8" castShadow shadow-mapSize={[1024, 1024]} />
          <spotLight position={[-7, 5, -5]} angle={0.6} penumbra={1} intensity={70} color="#6d30b4" />
          <pointLight position={[0, 2, 6]} intensity={10} color={GOLD} />
          <ShowroomRotation
            group={group}
            target={target}
            current={current}
            dragging={dragging}
            reducedMotion={reducedMotion}
          >
            <CarModel m={m} />
          </ShowroomRotation>
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
