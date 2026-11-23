import { useMemo } from 'react';
import * as THREE from 'three';

/* ─── Brand Colors ────────────────────────────────────────── */
export const CAR_GOLD       = '#d9b45a';
export const CAR_BODY_COLOR = '#140a28'; // Deep Royal Night Purple / Obsidian
export const CAR_CHROME     = '#d4d8e4'; // Machined alloy / polished chrome

/* ─── Material Factory (memoised per canvas context) ─────── */
export function useCarMaterials() {
  return useMemo(() => {
    // Ultra-premium metallic automotive paint with dual-layer clearcoat
    const body = new THREE.MeshPhysicalMaterial({
      color: CAR_BODY_COLOR,
      metalness: 0.92,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    });

    // Dark carbon-fiber / aero matte parts
    const carbon = new THREE.MeshStandardMaterial({
      color: '#0d0b12',
      roughness: 0.72,
      metalness: 0.35,
    });

    // Heritage signature metallic gold trim
    const gold = new THREE.MeshStandardMaterial({
      color: CAR_GOLD,
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 1.4,
    });

    // Panoramic automotive glass
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#120b22',
      metalness: 0.08,
      roughness: 0.02,
      transparent: true,
      opacity: 0.70,
      transmission: 0.28,
      ior: 1.52,
    });

    // Performance rubber tyres
    const rubber = new THREE.MeshStandardMaterial({
      color: '#121214',
      roughness: 0.88,
      metalness: 0.02,
    });

    // Machined alloy wheels & polished exhaust tips
    const rim = new THREE.MeshStandardMaterial({
      color: CAR_CHROME,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 1.6,
    });

    // Cross-drilled brake rotors
    const rotor = new THREE.MeshStandardMaterial({
      color: '#36363e',
      metalness: 0.88,
      roughness: 0.28,
    });

    // Gold racing brake calipers
    const caliper = new THREE.MeshStandardMaterial({
      color: CAR_GOLD,
      metalness: 0.92,
      roughness: 0.18,
    });

    // LED Projector Headlights
    const headlight = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      emissive: '#fff4d0',
      emissiveIntensity: 3.8,
      transparent: true,
      opacity: 0.96,
    });

    // Daytime Running Light (DRL) glowing accents
    const drl = new THREE.MeshStandardMaterial({
      color: '#ffe596',
      emissive: '#ffd970',
      emissiveIntensity: 2.6,
    });

    // OLED Lightblade Taillights
    const tail = new THREE.MeshStandardMaterial({
      color: '#ff1424',
      emissive: '#e80818',
      emissiveIntensity: 2.8,
    });

    // Cockpit interior (seats, dashboard)
    const interior = new THREE.MeshStandardMaterial({
      color: '#181420',
      roughness: 0.85,
      metalness: 0.15,
    });

    // Wing mirror reflective glass
    const mirrorGlass = new THREE.MeshStandardMaterial({
      color: '#f0f2fa',
      metalness: 0.99,
      roughness: 0.02,
    });

    return {
      body,
      carbon,
      gold,
      glass,
      rubber,
      rim,
      rotor,
      caliper,
      headlight,
      drl,
      tail,
      interior,
      mirrorGlass,
    };
  }, []);
}

export type CarMaterials = ReturnType<typeof useCarMaterials>;
