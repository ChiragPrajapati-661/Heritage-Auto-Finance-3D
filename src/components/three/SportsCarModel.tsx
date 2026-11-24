/**
 * SportsCarModel.tsx — High-fidelity procedural luxury sports car.
 *
 * Engineered with realistic automotive proportions:
 *  - Raked low-slung supercar silhouette (~4.4m length, 1.86m rear width, 1.28m height)
 *  - Wider rear track & muscular flared rear haunches (coke-bottle waist)
 *  - Aerodynamic front fascia with chin splitter & intake ducts
 *  - Swept curved panoramic windscreen & fastback rear glass
 *  - Visible cockpit interior (dashboard, sport steering wheel, bucket seat headrests)
 *  - 4 complete wheels: 10-spoke alloy rims, low-profile performance tyres,
 *    drilled brake rotors & gold racing calipers
 *  - Quad stainless steel exhaust tips & carbon rear diffuser
 *  - Multi-element LED projector headlights with gold DRL accent strips
 *  - Continuous 3D OLED lightblade rear taillight bar
 *  - Luxury deep royal night purple metallic paint with clearcoat reflections
 */
import { useMemo } from 'react';
import * as THREE from 'three';
import { type CarMaterials } from './carMaterials';

export type { CarMaterials };

/* ═════════════════════════════════════════════════════════════
   WHEEL ASSEMBLY:
   Torus tyre shoulder + cylindrical tread + 10-spoke alloy rim
   + cross-drilled rotor + gold brake caliper + centre lock cap
   ═════════════════════════════════════════════════════════════ */
function DetailedWheel({
  position,
  outwardZ,
  m,
}: {
  position: [number, number, number];
  outwardZ: number; // +1 for right side, -1 for left side
  m: CarMaterials;
}) {
  const TY_OUTER = 0.38; // 38cm radius = 76cm diameter
  const RIM_R    = 0.26; // 26cm radius = ~20-inch rim
  const TY_WIDTH = 0.24; // 24cm tyre width
  const sign     = outwardZ > 0 ? 1 : -1;

  // Single spoke geometry shared across the 10 spokes
  const spokeGeo = useMemo(() => new THREE.BoxGeometry(0.026, RIM_R * 0.88, 0.022), [RIM_R]);

  return (
    <group position={position}>
      {/* ── Tyre Rubber ── */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Outer curved tread shoulder */}
        <mesh castShadow>
          <torusGeometry args={[TY_OUTER - 0.065, 0.065, 20, 48]} />
          <primitive object={m.rubber} attach="material" />
        </mesh>
        {/* Main contact tread cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[TY_OUTER, TY_OUTER, TY_WIDTH - 0.02, 48]} />
          <primitive object={m.rubber} attach="material" />
        </mesh>
        {/* Inner rim bead */}
        <mesh>
          <cylinderGeometry args={[RIM_R + 0.015, RIM_R + 0.015, TY_WIDTH + 0.002, 48]} />
          <primitive object={m.rubber} attach="material" />
        </mesh>
      </group>

      {/* ── Rim Outer Barrel & Lip ── */}
      <mesh
        castShadow
        position={[0, 0, (TY_WIDTH * 0.5 - 0.01) * sign]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[RIM_R, RIM_R - 0.02, 0.04, 48, 1, true]} />
        <primitive object={m.rim} attach="material" />
      </mesh>

      {/* ── Deep-Dish Rim Face ── */}
      <mesh
        castShadow
        position={[0, 0, (TY_WIDTH * 0.5 + 0.004) * sign]}
      >
        <circleGeometry args={[RIM_R - 0.01, 48]} />
        <primitive object={m.rim} attach="material" />
      </mesh>

      {/* ── 10 Machined Alloy Spokes (5 Twin-Spoke Architecture) ── */}
      <group position={[0, 0, (TY_WIDTH * 0.5 + 0.010) * sign]}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const angle = (i / 10) * Math.PI * 2;
          const reach = RIM_R * 0.52;
          return (
            <mesh
              key={i}
              geometry={spokeGeo}
              castShadow
              position={[Math.sin(angle) * reach, Math.cos(angle) * reach, 0]}
              rotation={[0, 0, -angle]}
            >
              <primitive object={m.rim} attach="material" />
            </mesh>
          );
        })}
      </group>

      {/* ── Centre Lock Nut (Heritage Gold) ── */}
      <mesh
        castShadow
        position={[0, 0, (TY_WIDTH * 0.5 + 0.022) * sign]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.065, 0.075, 0.035, 24]} />
        <primitive object={m.gold} attach="material" />
      </mesh>

      {/* ── Brake Rotor (Drilled Steel Disc, Inset) ── */}
      <mesh
        position={[0, 0, (TY_WIDTH * 0.5 - 0.05) * sign]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[RIM_R * 0.78, RIM_R * 0.78, 0.024, 36]} />
        <primitive object={m.rotor} attach="material" />
      </mesh>

      {/* ── Gold Racing Caliper (Piston Housing at 10 o'clock) ── */}
      <mesh
        castShadow
        position={[-RIM_R * 0.55, RIM_R * 0.55, (TY_WIDTH * 0.5 - 0.035) * sign]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.07, 0.16, 0.045]} />
        <primitive object={m.caliper} attach="material" />
      </mesh>
    </group>
  );
}

/* ═════════════════════════════════════════════════════════════
   SPORTS CAR BODY GEOMETRY GENERATOR
   ═════════════════════════════════════════════════════════════ */
function buildCarBodyProfile(): THREE.Shape {
  const s = new THREE.Shape();
  // Front splitter bottom tip
  s.moveTo(2.26, 0.12);

  // Front nose & aerodynamic intake rake
  s.lineTo(2.28, 0.22);
  s.quadraticCurveTo(2.30, 0.44, 2.16, 0.55);

  // Sloping muscular hood / bonnet down from windscreen base
  s.quadraticCurveTo(1.68, 0.68, 1.20, 0.74);

  // Windscreen cowl transition
  s.quadraticCurveTo(1.05, 0.76, 0.90, 0.84);

  // Raked A-pillar (sleek 33° rake)
  s.quadraticCurveTo(0.68, 1.04, 0.45, 1.25);

  // Aerodynamic roofline apex
  s.quadraticCurveTo(0.18, 1.32, -0.15, 1.32);
  s.lineTo(-0.48, 1.30);

  // Fastback sweep down toward rear engine deck
  s.quadraticCurveTo(-0.82, 1.26, -1.10, 1.05);
  s.quadraticCurveTo(-1.32, 0.88, -1.55, 0.76);

  // Integrated rear ducktail spoiler lip
  s.lineTo(-1.92, 0.74);
  s.lineTo(-2.14, 0.68);

  // Vertical rear fascia & taillight shelf
  s.quadraticCurveTo(-2.28, 0.56, -2.28, 0.38);

  // Lower rear carbon diffuser
  s.lineTo(-2.24, 0.18);
  s.lineTo(-2.18, 0.12);

  // Underside: Rear wheel cutout (axle at X = -1.30, R = 0.44)
  s.lineTo(-1.74, 0.12);
  s.quadraticCurveTo(-1.72, 0.50, -1.30, 0.50);
  s.quadraticCurveTo(-0.88, 0.50, -0.86, 0.12);

  // Flat carbon side-skirt belly line
  s.lineTo(0.88, 0.12);

  // Underside: Front wheel cutout (axle at X = 1.32, R = 0.44)
  s.quadraticCurveTo(0.90, 0.50, 1.32, 0.50);
  s.quadraticCurveTo(1.74, 0.50, 1.76, 0.12);

  // Return to front splitter
  s.lineTo(2.26, 0.12);
  s.closePath();

  return s;
}

function buildCabinGlassProfile(): THREE.Shape {
  const s = new THREE.Shape();
  // Windscreen base
  s.moveTo(0.86, 0.86);
  // Windscreen rake
  s.quadraticCurveTo(0.64, 1.06, 0.42, 1.24);
  // Roof glass edge
  s.quadraticCurveTo(0.16, 1.29, -0.15, 1.29);
  s.lineTo(-0.46, 1.27);
  // Fastback rear glass
  s.quadraticCurveTo(-0.78, 1.23, -1.05, 1.04);
  s.quadraticCurveTo(-1.26, 0.88, -1.48, 0.78);
  s.closePath();
  return s;
}

/* ═════════════════════════════════════════════════════════════
   MAIN SPORTS CAR COMPONENT
   ═════════════════════════════════════════════════════════════ */
export function SportsCarModel({ m }: { m: CarMaterials }) {
  const BODY_W = 1.76;  // Central body width
  const REAR_W = 1.86;  // Wider rear haunches (muscular stance!)
  const GLASS_W = 1.48; // Tapered greenhouse tumblehome

  // Central sculpted body core
  const bodyGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(buildCarBodyProfile(), {
      depth: BODY_W,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.05,
      curveSegments: 28,
    });
    geo.translate(0, 0, -BODY_W / 2);
    geo.computeVertexNormals();
    return geo;
  }, [BODY_W]);

  // Panoramic greenhouse glass
  const glassGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(buildCabinGlassProfile(), {
      depth: GLASS_W,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      curveSegments: 24,
    });
    geo.translate(0, 0, -GLASS_W / 2);
    geo.computeVertexNormals();
    return geo;
  }, [GLASS_W]);

  return (
    <group position={[0, -0.48, 0]}>
      {/* ── Central Main Body Fuselage ── */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <primitive object={m.body} attach="material" />
      </mesh>

      {/* ── Sculpted Muscular Rear Haunches (Wide-Body Sports Stance) ── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[-1.30, 0.48, side * (BODY_W * 0.5 + 0.035)]}>
          {/* Flared arch body volume */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 0.38, 0.16]} />
            <primitive object={m.body} attach="material" />
          </mesh>
          {/* Wheel arch bevel crest */}
          <mesh position={[0, 0.08, side * 0.06]}>
            <torusGeometry args={[0.44, 0.038, 12, 28, Math.PI]} />
            <primitive object={m.body} attach="material" />
          </mesh>
          {/* Rear brake cooling intake scoop */}
          <mesh position={[0.56, -0.04, side * 0.02]} rotation={[0, side * 0.2, 0]}>
            <boxGeometry args={[0.08, 0.18, 0.09]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Flared Front Fenders ── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[1.32, 0.48, side * (BODY_W * 0.5 + 0.015)]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.15, 0.34, 0.12]} />
            <primitive object={m.body} attach="material" />
          </mesh>
          <mesh position={[0, 0.06, side * 0.04]}>
            <torusGeometry args={[0.44, 0.034, 12, 28, Math.PI]} />
            <primitive object={m.body} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Sculpted Hood Centre Strakes & Aerodynamic Spine ── */}
      <mesh position={[1.56, 0.70, 0]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.92, 0.028, 0.44]} />
        <primitive object={m.body} attach="material" />
      </mesh>
      {/* Heritage Gold Center Hood Crest Line */}
      <mesh position={[1.54, 0.718, 0]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.88, 0.012, 0.018]} />
        <primitive object={m.gold} attach="material" />
      </mesh>

      {/* ── Panoramic Canopy Glass ── */}
      <mesh geometry={glassGeo} castShadow>
        <primitive object={m.glass} attach="material" />
      </mesh>

      {/* ── Double-Bubble Roof Panel & Gold Trim Rails ── */}
      <mesh position={[-0.14, 1.33, 0]}>
        <boxGeometry args={[0.85, 0.028, GLASS_W - 0.12]} />
        <primitive object={m.body} attach="material" />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[-0.14, 1.342, side * (GLASS_W * 0.46)]}>
          <boxGeometry args={[1.05, 0.022, 0.024]} />
          <primitive object={m.gold} attach="material" />
        </mesh>
      ))}

      {/* ── Cockpit Interior (Visible through Glass) ── */}
      <group position={[0.0, 0.82, 0]}>
        {/* Dashboard shelf */}
        <mesh position={[0.54, 0.02, 0]}>
          <boxGeometry args={[0.34, 0.14, GLASS_W - 0.22]} />
          <primitive object={m.interior} attach="material" />
        </mesh>
        {/* Sport steering wheel on driver's side (RHD for India!) */}
        <group position={[0.38, 0.12, -0.28]} rotation={[0, 0, -0.35]}>
          <mesh>
            <torusGeometry args={[0.11, 0.016, 12, 24]} />
            <primitive object={m.interior} attach="material" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.018, 16]} />
            <primitive object={m.gold} attach="material" />
          </mesh>
        </group>
        {/* Driver & Passenger Bucket Seat Headrests */}
        {[-0.28, 0.28].map((zPos, idx) => (
          <group key={idx} position={[-0.16, 0.22, zPos]}>
            {/* Contoured headrest */}
            <mesh castShadow>
              <capsuleGeometry args={[0.075, 0.08, 12, 16]} />
              <primitive object={m.interior} attach="material" />
            </mesh>
            {/* Seat back upper bolster */}
            <mesh position={[0, -0.16, 0]}>
              <boxGeometry args={[0.14, 0.24, 0.26]} />
              <primitive object={m.interior} attach="material" />
            </mesh>
            {/* Gold headrest accent insert */}
            <mesh position={[0.04, 0.02, 0]}>
              <boxGeometry args={[0.04, 0.06, 0.08]} />
              <primitive object={m.gold} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── Aerodynamic Side Wing Mirrors ── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[0.62, 0.88, side * (GLASS_W * 0.5 + 0.10)]}>
          {/* Mirror mounting pylon */}
          <mesh position={[0, -0.04, -side * 0.05]} rotation={[0, 0, side * 0.3]}>
            <cylinderGeometry args={[0.015, 0.018, 0.09, 12]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
          {/* Aerodynamic mirror housing */}
          <mesh castShadow rotation={[0, side * 0.18, 0]}>
            <boxGeometry args={[0.16, 0.085, 0.12]} />
            <primitive object={m.body} attach="material" />
          </mesh>
          {/* Reflective mirror glass face */}
          <mesh position={[-0.078, 0, 0]}>
            <boxGeometry args={[0.008, 0.075, 0.10]} />
            <primitive object={m.mirrorGlass} attach="material" />
          </mesh>
          {/* Integrated LED indicator strip */}
          <mesh position={[0.08, 0, 0]}>
            <boxGeometry args={[0.008, 0.018, 0.09]} />
            <primitive object={m.drl} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Carbon Front Chin Splitter & Corner Winglets ── */}
      <mesh position={[2.22, 0.10, 0]}>
        <boxGeometry args={[0.16, 0.032, BODY_W + 0.10]} />
        <primitive object={m.carbon} attach="material" />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[2.22, 0.15, side * (BODY_W * 0.5 + 0.05)]}>
          <boxGeometry args={[0.14, 0.09, 0.024]} />
          <primitive object={m.carbon} attach="material" />
        </mesh>
      ))}

      {/* ── Front Fascia: Central Grille & Heritage Gold Emblem ── */}
      <mesh position={[2.28, 0.28, 0]}>
        <boxGeometry args={[0.032, 0.22, BODY_W * 0.58]} />
        <primitive object={m.carbon} attach="material" />
      </mesh>
      {/* Heritage Gold Hexagonal Badge on Nose */}
      <group position={[2.28, 0.44, 0]} rotation={[0, 0, -0.3]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.015, 6]} />
          <primitive object={m.gold} attach="material" />
        </mesh>
      </group>

      {/* ── Dual Multi-Element LED Projector Headlights ── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[2.20, 0.50, side * (BODY_W * 0.35)]}>
          {/* Angled headlight housing */}
          <mesh rotation={[0, -side * 0.25, 0]}>
            <boxGeometry args={[0.07, 0.085, 0.36]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
          {/* Main LED projector lenses */}
          <mesh position={[0.032, 0, 0]} rotation={[0, -side * 0.25, 0]}>
            <boxGeometry args={[0.018, 0.065, 0.32]} />
            <primitive object={m.headlight} attach="material" />
          </mesh>
          {/* Signature Gold DRL Eyebrow Ribbon */}
          <mesh position={[0.038, 0.042, 0]} rotation={[0, -side * 0.25, 0]}>
            <boxGeometry args={[0.014, 0.020, 0.34]} />
            <primitive object={m.drl} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Continuous 3D OLED Taillight Lightblade Bar ── */}
      <group position={[-2.28, 0.46, 0]}>
        {/* Full-width continuous lightblade spanning the haunches */}
        <mesh>
          <boxGeometry args={[0.032, 0.075, REAR_W - 0.10]} />
          <primitive object={m.tail} attach="material" />
        </mesh>
        {/* Lower gold signature accent bar */}
        <mesh position={[0.008, -0.048, 0]}>
          <boxGeometry args={[0.020, 0.018, REAR_W - 0.14]} />
          <primitive object={m.gold} attach="material" />
        </mesh>
      </group>

      {/* ── Carbon Rear Aerodynamic Diffuser with 4 Vertical Fins ── */}
      <group position={[-2.15, 0.16, 0]}>
        <mesh>
          <boxGeometry args={[0.24, 0.045, REAR_W * 0.76]} />
          <primitive object={m.carbon} attach="material" />
        </mesh>
        {/* 4 aerodynamic diffuser fins */}
        {[-0.45, -0.15, 0.15, 0.45].map((zOffset, i) => (
          <mesh key={i} position={[-0.04, -0.05, zOffset]}>
            <boxGeometry args={[0.18, 0.09, 0.018]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
        ))}
      </group>

      {/* ── Quad Stainless Steel Exhaust Tips (Twin Dual Pipes) ── */}
      {[-0.62, -0.52, 0.52, 0.62].map((zPos, idx) => (
        <group key={idx} position={[-2.24, 0.22, zPos]}>
          {/* Polished outer stainless pipe */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.12, 24, 1, true]} />
            <primitive object={m.rim} attach="material" />
          </mesh>
          {/* Dark internal chamber */}
          <mesh position={[-0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.038, 0.09, 16]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Sculpted Active Rear Aerofoil / Spoiler on Dual Pylons ── */}
      <group position={[-1.94, 0.80, 0]}>
        {/* Left Pylon */}
        <mesh position={[0, -0.06, REAR_W * 0.32]}>
          <boxGeometry args={[0.06, 0.14, 0.035]} />
          <primitive object={m.carbon} attach="material" />
        </mesh>
        {/* Right Pylon */}
        <mesh position={[0, -0.06, -REAR_W * 0.32]}>
          <boxGeometry args={[0.06, 0.14, 0.035]} />
          <primitive object={m.carbon} attach="material" />
        </mesh>
        {/* Main Aerofoil Wing Blade */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.24, 0.045, REAR_W + 0.06]} />
          <primitive object={m.body} attach="material" />
        </mesh>
        {/* Wing Endplates */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[0, 0.02, side * (REAR_W * 0.5 + 0.032)]}>
            <boxGeometry args={[0.26, 0.09, 0.020]} />
            <primitive object={m.gold} attach="material" />
          </mesh>
        ))}
      </group>

      {/* ── Sculpted Side Skirt Aeroblades with Gold Accent Channels ── */}
      {[-1, 1].map((side) => (
        <group key={side} position={[0.01, 0.11, side * (BODY_W * 0.5 + 0.015)]}>
          {/* Carbon side skirt shelf */}
          <mesh>
            <boxGeometry args={[2.14, 0.036, 0.05]} />
            <primitive object={m.carbon} attach="material" />
          </mesh>
          {/* Heritage Gold metallic inlay line */}
          <mesh position={[0, 0.022, side * 0.018]}>
            <boxGeometry args={[2.08, 0.014, 0.016]} />
            <primitive object={m.gold} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── 4 Complete High-Performance Wheels (All 4 Corners) ── */}
      {/* Front-Right Wheel (Z > 0) */}
      <DetailedWheel position={[1.32, 0.38, BODY_W * 0.5 + 0.02]} outwardZ={1} m={m} />
      {/* Front-Left Wheel (Z < 0) */}
      <DetailedWheel position={[1.32, 0.38, -(BODY_W * 0.5 + 0.02)]} outwardZ={-1} m={m} />
      {/* Rear-Right Wheel (Wider Stance! Z > 0) */}
      <DetailedWheel position={[-1.30, 0.38, REAR_W * 0.5 - 0.02]} outwardZ={1} m={m} />
      {/* Rear-Left Wheel (Wider Stance! Z < 0) */}
      <DetailedWheel position={[-1.30, 0.38, -(REAR_W * 0.5 - 0.02)]} outwardZ={-1} m={m} />
    </group>
  );
}
