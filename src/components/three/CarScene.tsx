/**
 * CarScene.tsx — Full-screen 3D showroom hero background canvas.
 * Showcases the procedural luxury sports car with showroom lighting,
 * smooth mouse parallax, scroll-driven rotation, and gold atmosphere particles.
 */
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  SportsCarModel,
} from './SportsCarModel';
import {
  useCarMaterials,
  CAR_GOLD,
} from './carMaterials';

export { SportsCarModel as PremiumCar };

interface SceneRefs {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

/* ─── Floating Gold Atmosphere Particles ─────────────────── */
function ShowroomAtmosphere({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 90;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = Math.random() * 6 - 0.2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.012;
    pointsRef.current.position.y = Math.sin(t * 0.25) * 0.18;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={CAR_GOLD}
        size={0.042}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Hero Car Group (Parallax, Scroll, and Headlight Glow) ─ */
function HeroCarRig({ pointer, scroll, reducedMotion }: SceneRefs) {
  const group = useRef<THREE.Group>(null);
  const headlightL = useRef<THREE.PointLight>(null);
  const headlightR = useRef<THREE.PointLight>(null);
  const m = useCarMaterials();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    if (!reducedMotion) {
      // Gentle cinematic breathing idle
      group.current.rotation.y += 0.0016;
      group.current.position.y  = Math.sin(t * 0.55) * 0.028;
      group.current.rotation.z  = Math.sin(t * 0.38) * 0.005;
    }

    // Pointer-driven parallax yaw & pitch
    group.current.rotation.y += pointer.current.x * 0.0028;
    group.current.rotation.x  = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.07,
      0.04
    );

    // Scroll-driven rotation (360° across page scroll)
    group.current.rotation.y += scroll.current * 0.55;

    // Headlight beam pulsing glow
    if (!reducedMotion && headlightL.current && headlightR.current) {
      const pulse = 2.2 + Math.sin(t * 2.2) * 0.45;
      headlightL.current.intensity = pulse;
      headlightR.current.intensity = pulse;
    }
  });

  return (
    // Scale 1.35 brings the sports car forward so it has commanding presence
    <group ref={group} scale={1.35}>
      <SportsCarModel m={m} />
      {/* Dynamic forward headlight projector beams */}
      <pointLight ref={headlightL} position={[3.5, 0.45, 0.65]} distance={8} color="#ffeec0" intensity={2.2} />
      <pointLight ref={headlightR} position={[3.5, 0.45, -0.65]} distance={8} color="#ffeec0" intensity={2.2} />
    </group>
  );
}

/* ─── Smooth Parallax Camera Rig ─────────────────────────── */
function CameraController({
  pointer,
  reducedMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  useFrame((state) => {
    if (reducedMotion) return;
    const { x, y } = pointer.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 5.2 + x * 0.5, 0.038);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.2 - y * 0.3, 0.038);
    state.camera.lookAt(0, 0.25, 0);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════
   EXPORT: CarScene
   ═══════════════════════════════════════════════════════════ */
export default function CarScene({ reducedMotion }: { reducedMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll  = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.25]}
      camera={{ position: [5.2, 2.2, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {/* ── Studio Showroom Lighting Rig ── */}
      <ambientLight intensity={0.28} color="#9a8db4" />

      {/* Main warm key spot (highlights metallic hood & roof curvature) */}
      <spotLight
        position={[6.5, 9.5, 4.5]}
        angle={0.42}
        penumbra={0.85}
        intensity={180}
        color="#faebd0"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0003}
      />

      {/* Heritage signature purple fill spot (from rear-left) */}
      <spotLight
        position={[-7.5, 5.5, -5.0]}
        angle={0.58}
        penumbra={1}
        intensity={95}
        color="#6226a4"
      />

      {/* Rear rim light (cuts out the fastback curve & rear spoiler silhouette) */}
      <spotLight
        position={[0, 6.5, -6.0]}
        angle={0.65}
        penumbra={1}
        intensity={65}
        color="#c88c24"
      />

      {/* Subtle gold underbody floor bounce */}
      <pointLight position={[0, -0.4, 0]} intensity={14} color={CAR_GOLD} distance={6} />

      <CameraController pointer={pointer} reducedMotion={reducedMotion} />

      <Float speed={reducedMotion ? 0 : 0.9} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.22}>
        <HeroCarRig pointer={pointer} scroll={scroll} reducedMotion={reducedMotion} />
      </Float>

      <ShowroomAtmosphere reducedMotion={reducedMotion} />

      {/* Realistic contact shadow beneath the tyres */}
      <ContactShadows
        position={[0, -0.86, 0]}
        opacity={0.72}
        scale={14}
        blur={2.8}
        far={4.5}
        color="#000000"
      />

      {/* HDRI city environment reflection map */}
      <Environment preset="city" />
    </Canvas>
  );
}
