"use client";

import { useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// --- SVI-parametrized implied volatility surface ---
// Gatheral's SVI: w(k,t) = a(t) + b(t) * (rho*(k-m) + sqrt((k-m)^2 + sigma(t)^2))
// where w = sigma_iv^2 * t (total variance), k = log(K/F) (log-moneyness)

const STRIKE_POINTS = 40;
const EXPIRY_POINTS = 30;
const K_MIN = -0.4;
const K_MAX = 0.4;
const T_MIN = 0.02;
const T_MAX = 2.0;

function sviVol(k: number, t: number): number {
  // Parameters that vary with expiry to create realistic surface
  const a = 0.01 + 0.03 * Math.sqrt(t);
  const b = 0.4 / (1 + 0.5 * t);
  const rho = -0.35 + 0.05 * t; // skew flattens with time
  const m = -0.02;
  const sigma = 0.15 * Math.sqrt(t) + 0.05;

  const dk = k - m;
  const w = a + b * (rho * dk + Math.sqrt(dk * dk + sigma * sigma));
  const totalVar = Math.max(w, 0.001);
  return Math.sqrt(totalVar / Math.max(t, 0.001));
}

function volToColor(vol: number, minVol: number, maxVol: number): THREE.Color {
  const t = Math.max(0, Math.min(1, (vol - minVol) / (maxVol - minVol)));
  // Bloomberg-style: blue (low) → cyan → green → yellow → red (high)
  if (t < 0.25) {
    return new THREE.Color().setHSL(0.6 - t * 0.4, 0.9, 0.4 + t * 0.4);
  } else if (t < 0.5) {
    const s = (t - 0.25) / 0.25;
    return new THREE.Color().setHSL(0.35 - s * 0.15, 0.9, 0.5 + s * 0.15);
  } else if (t < 0.75) {
    const s = (t - 0.5) / 0.25;
    return new THREE.Color().setHSL(0.15 - s * 0.05, 0.95, 0.55 + s * 0.05);
  } else {
    const s = (t - 0.75) / 0.25;
    return new THREE.Color().setHSL(0.05 - s * 0.05, 1.0, 0.5 - s * 0.1);
  }
}

function Surface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const { geometry, wireGeometry, minVol, maxVol } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    const vols: number[] = [];

    let minV = Infinity;
    let maxV = -Infinity;

    // Generate grid of vol values first to find min/max
    const volGrid: number[][] = [];
    for (let j = 0; j < EXPIRY_POINTS; j++) {
      volGrid[j] = [];
      const t = T_MIN + (j / (EXPIRY_POINTS - 1)) * (T_MAX - T_MIN);
      for (let i = 0; i < STRIKE_POINTS; i++) {
        const k = K_MIN + (i / (STRIKE_POINTS - 1)) * (K_MAX - K_MIN);
        const vol = sviVol(k, t);
        volGrid[j][i] = vol;
        minV = Math.min(minV, vol);
        maxV = Math.max(maxV, vol);
      }
    }

    // Scale factors for 3D display
    const scaleX = 6; // strike axis width
    const scaleY = 4; // expiry axis depth
    const scaleZ = 8; // vol axis height

    for (let j = 0; j < EXPIRY_POINTS; j++) {
      const tNorm = j / (EXPIRY_POINTS - 1);
      for (let i = 0; i < STRIKE_POINTS; i++) {
        const kNorm = i / (STRIKE_POINTS - 1);
        const vol = volGrid[j][i];
        const volNorm = (vol - minV) / (maxV - minV);

        const x = (kNorm - 0.5) * scaleX;
        const z = (tNorm - 0.5) * scaleY;
        const y = volNorm * scaleZ - scaleZ * 0.3;

        positions.push(x, y, z);
        vols.push(vol);

        const color = volToColor(vol, minV, maxV);
        colors.push(color.r, color.g, color.b);
      }
    }

    // Triangulate
    for (let j = 0; j < EXPIRY_POINTS - 1; j++) {
      for (let i = 0; i < STRIKE_POINTS - 1; i++) {
        const a = j * STRIKE_POINTS + i;
        const b = a + 1;
        const c = a + STRIKE_POINTS;
        const d = c + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    // Wireframe: draw lines along strike and expiry directions
    const wirePositions: number[] = [];
    // Along strike (every 4th expiry row)
    for (let j = 0; j < EXPIRY_POINTS; j += 3) {
      for (let i = 0; i < STRIKE_POINTS - 1; i++) {
        const idx1 = (j * STRIKE_POINTS + i) * 3;
        const idx2 = (j * STRIKE_POINTS + i + 1) * 3;
        wirePositions.push(
          positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
          positions[idx2], positions[idx2 + 1], positions[idx2 + 2],
        );
      }
    }
    // Along expiry (every 4th strike column)
    for (let i = 0; i < STRIKE_POINTS; i += 3) {
      for (let j = 0; j < EXPIRY_POINTS - 1; j++) {
        const idx1 = (j * STRIKE_POINTS + i) * 3;
        const idx2 = ((j + 1) * STRIKE_POINTS + i) * 3;
        wirePositions.push(
          positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
          positions[idx2], positions[idx2 + 1], positions[idx2 + 2],
        );
      }
    }

    const wireGeo = new THREE.BufferGeometry();
    wireGeo.setAttribute("position", new THREE.Float32BufferAttribute(wirePositions, 3));

    return { geometry: geo, wireGeometry: wireGeo, minVol: minV, maxVol: maxV };
  }, []);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial
          vertexColors
          side={THREE.DoubleSide}
          shininess={30}
          transparent
          opacity={0.85}
        />
      </mesh>
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

function AxisLabels() {
  const labelProps = {
    fontSize: 0.18,
    anchorX: "center" as const,
    anchorY: "middle" as const,
  };

  return (
    <group>
      {/* Strike axis (X) */}
      <Text position={[0, -3.2, -2.4]} color="#888888" {...labelProps} fontSize={0.22}>
        STRIKE (Log-Moneyness)
      </Text>
      {["-0.4", "-0.2", "ATM", "+0.2", "+0.4"].map((label, i) => (
        <Text
          key={`k-${i}`}
          position={[-3 + i * 1.5, -3.0, -2.2]}
          color="#666666"
          {...labelProps}
        >
          {label}
        </Text>
      ))}

      {/* Expiry axis (Z) */}
      <Text position={[3.6, -3.2, 0]} color="#888888" {...labelProps} fontSize={0.22} rotation={[0, -Math.PI / 2, 0]}>
        EXPIRY (Years)
      </Text>
      {["0.0", "0.5", "1.0", "1.5", "2.0"].map((label, i) => (
        <Text
          key={`t-${i}`}
          position={[3.3, -3.0, -2 + i]}
          color="#666666"
          {...labelProps}
        >
          {label}
        </Text>
      ))}

      {/* Vol axis (Y) */}
      <Text position={[-3.6, 0, -2.2]} color="#888888" {...labelProps} fontSize={0.22} rotation={[0, 0, Math.PI / 2]}>
        IMPLIED VOL
      </Text>
    </group>
  );
}

function BaseGrid() {
  return (
    <group position={[0, -2.8, 0]}>
      <gridHelper args={[8, 20, "#1a2a1a", "#0d1a0d"]} rotation={[0, 0, 0]} />
    </group>
  );
}

function ColorBar() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * 4 - 2;
      // Left and right vertices of the bar
      positions.push(-0.08, y, 0);
      positions.push(0.08, y, 0);

      const color = volToColor(t, 0, 1);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);

      if (i < steps) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  return (
    <group position={[4.2, 0.4, -2]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0.4, 2, 0]} color="#888888" fontSize={0.14} anchorX="left" anchorY="middle">
        HIGH
      </Text>
      <Text position={[0.4, -2, 0]} color="#888888" fontSize={0.14} anchorX="left" anchorY="middle">
        LOW
      </Text>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <Surface />
      <AxisLabels />
      <BaseGrid />
      <ColorBar />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.8}
        minDistance={4}
        maxDistance={18}
        target={[0, -0.5, 0]}
        maxPolarAngle={Math.PI * 0.85}
      />
    </>
  );
}

interface VolSurfaceProps {
  onClose: () => void;
}

export default function VolSurface({ onClose }: VolSurfaceProps) {
  const [hovered, setHovered] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "q") {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "#050510" }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      autoFocus
    >
      {/* Bloomberg-style header */}
      <div
        className="flex items-center justify-between px-4 py-1.5 shrink-0"
        style={{
          background: "#0a0a20",
          borderBottom: "1px solid #1a1a3a",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: "#ff8800", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
            IMPL VOL SURFACE
          </span>
          <span style={{ color: "#4488ff", fontSize: 12 }}>SPX</span>
          <span style={{ color: "#555577", fontSize: 11 }}>SIMULATED · SVI PARAMETRIZATION</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: "#555577", fontSize: 11 }}>
            Drag to rotate · Scroll to zoom · ESC to close
          </span>
          <button
            onClick={onClose}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: "none",
              border: "1px solid #333",
              color: hovered ? "#ff4444" : "#888",
              cursor: "pointer",
              padding: "2px 8px",
              fontSize: 12,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            ✕ CLOSE
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 min-h-0">
        <Canvas
          camera={{ position: [6, 4, 6], fov: 45, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor("#050510");
          }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Bloomberg-style footer */}
      <div
        className="flex items-center justify-between px-4 py-1 shrink-0"
        style={{
          background: "#0a0a20",
          borderTop: "1px solid #1a1a3a",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div className="flex items-center gap-6">
          <span style={{ color: "#555577", fontSize: 11 }}>
            Model: SVI (Gatheral) · a(t) = 0.01 + 0.03√t · b(t) = 0.4/(1+0.5t) · ρ = -0.35+0.05t
          </span>
        </div>
        <span style={{ color: "#333355", fontSize: 10 }}>
          marwin.dev
        </span>
      </div>
    </div>
  );
}
