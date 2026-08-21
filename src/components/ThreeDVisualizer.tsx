import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  RotateCw, 
  Eye, 
  Sparkles, 
  Layers, 
  Database, 
  BarChart3, 
  Cpu, 
  Briefcase, 
  Code2, 
  CheckCircle2,
  Maximize2,
  Minimize2,
  Zap,
  Activity,
  Compass,
  Sliders,
  TrendingUp,
  ShieldCheck,
  Flame
} from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face3D {
  indices: [number, number, number];
  color: string;
  normal?: Point3D;
}

interface OrbitSatellite {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  glowColor: string;
  angle: number;
  orbitRadius: number;
  speed: number;
  inclination: number; // orbital tilt
  yOffset: number;
  metric: string;
  description: string;
  bullets: string[];
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
  vz: number;
}

export const ThreeDVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeNode, setActiveNode] = useState<string>('powerbi');
  const [visualizerMode, setVisualizerMode] = useState<'crystal' | 'helix' | 'orbital'>('crystal');
  const [isRotating, setIsRotating] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [viewPreset, setViewPreset] = useState<'isometric' | 'front' | 'top' | 'free'>('isometric');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Drag & Inertia physics state
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.35, y: 0.45, z: 0 });
  const velocityRef = useRef({ x: 0, y: 0.005 });
  const hoveredNodeRef = useRef<string | null>(null);

  // Keep hovered ref synced for canvas render loop
  useEffect(() => {
    hoveredNodeRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  // Orbiting Satellites / Skill Planets
  const satellites: OrbitSatellite[] = useMemo(() => [
    {
      id: 'powerbi',
      name: 'Power BI & DAX Matrix',
      category: 'Data Analytics',
      icon: BarChart3,
      color: '#38bdf8', // Sky Blue
      glowColor: 'rgba(56, 189, 248, 0.4)',
      angle: 0,
      orbitRadius: 165,
      speed: 0.009,
      inclination: 0.25,
      yOffset: -22,
      metric: 'Advanced DAX & Executive BI',
      description: 'Engineered executive dashboards with complex DAX measures, time-intelligence, multi-grain data modeling, and Star schema optimization.',
      bullets: ['CALCULATE, FILTER, ALLSELECTED, EARLIER', 'Automated drill-throughs & conditional KPI cards', 'Star schema data modeling with 1-to-many relationships']
    },
    {
      id: 'sql',
      name: 'SQL & Data Modeling',
      category: 'Database Engine',
      icon: Database,
      color: '#3b82f6', // Royal Blue
      glowColor: 'rgba(59, 130, 246, 0.4)',
      angle: (Math.PI * 2) / 5,
      orbitRadius: 178,
      speed: 0.008,
      inclination: -0.3,
      yOffset: 32,
      metric: 'PostgreSQL / MySQL Queries',
      description: 'Crafted production queries, relational schemas, indexing, CTEs, window functions, and cross-source aggregation pipelines.',
      bullets: ['Complex JOINs, Window Aggregations, CTEs', 'Data cleansing & deduplication algorithms', 'Sub-second response tuning on large datasets']
    },
    {
      id: 'rpa',
      name: 'BOT Validation & UAT',
      category: 'Quality Assurance',
      icon: Cpu,
      color: '#10b981', // Emerald
      glowColor: 'rgba(16, 185, 129, 0.4)',
      angle: ((Math.PI * 2) / 5) * 2,
      orbitRadius: 155,
      speed: 0.0105,
      inclination: 0.4,
      yOffset: -38,
      metric: '100% Dev & Prod Verification',
      description: 'End-to-end verification of RPA bots, discrepancy root-cause isolation, and production deployment sign-off.',
      bullets: ['Multi-scenario test case matrix authoring', 'Real-time discrepancy triage with engineering', 'Zero post-release defects in signed-off bots']
    },
    {
      id: 'business',
      name: 'Business Analysis & BRD',
      category: 'Delivery Strategy',
      icon: Briefcase,
      color: '#8b5cf6', // Violet
      glowColor: 'rgba(139, 92, 246, 0.4)',
      angle: ((Math.PI * 2) / 5) * 3,
      orbitRadius: 172,
      speed: 0.0075,
      inclination: -0.2,
      yOffset: 24,
      metric: 'Stakeholder Elicitation & Specs',
      description: 'Bridges executive stakeholders with dev squads through crisp BRDs, user stories, Sprint tracking in Shortcut, and clear SOPs.',
      bullets: ['Sprint ceremonies & backlog prioritization', 'Functional & Technical specification authoring', 'Change management & client workshop facilitation']
    },
    {
      id: 'automation',
      name: 'Python & Apps Script',
      category: 'Pipeline Automation',
      icon: Code2,
      color: '#f59e0b', // Amber
      glowColor: 'rgba(245, 158, 11, 0.4)',
      angle: ((Math.PI * 2) / 5) * 4,
      orbitRadius: 160,
      speed: 0.0088,
      inclination: 0.15,
      yOffset: -8,
      metric: 'ETL Pipelines & Live Sync',
      description: 'Automated CoinGecko API integrations, data transformation scripts with Pandas/NumPy, and scheduled trigger jobs.',
      bullets: ['Live REST API ingestion & error handling', 'Automated CSV/Excel reporting pipelines', 'Google Sheets custom triggers & dynamic formulas']
    },
  ], []);

  const satellitesRef = useRef(satellites);

  // Dynamic 3D Geometry Vertices (Dual-Stellated Polyhedron & Geodesic Crystal)
  const crystalVertices: Point3D[] = [
    // Outer Primary Stellated Octahedron
    { x: 0, y: -105, z: 0 },    // 0: Top Apex
    { x: 85, y: 0, z: 0 },      // 1: Right
    { x: 0, y: 0, z: 85 },      // 2: Front
    { x: -85, y: 0, z: 0 },     // 3: Left
    { x: 0, y: 0, z: -85 },     // 4: Back
    { x: 0, y: 105, z: 0 },     // 5: Bottom Apex

    // Secondary Intersecting Stellations (Mid-tier diamonds)
    { x: 50, y: -45, z: 50 },   // 6
    { x: -50, y: -45, z: 50 },  // 7
    { x: -50, y: -45, z: -50 }, // 8
    { x: 50, y: -45, z: -50 },  // 9
    { x: 50, y: 45, z: 50 },    // 10
    { x: -50, y: 45, z: 50 },   // 11
    { x: -50, y: 45, z: -50 },  // 12
    { x: 50, y: 45, z: -50 },   // 13
  ];

  // Faces for semi-transparent 3D rendering with lighting
  const crystalFaces: Face3D[] = [
    // Top pyramid faces
    { indices: [0, 1, 2], color: 'rgba(56, 189, 248, 0.15)' },
    { indices: [0, 2, 3], color: 'rgba(37, 99, 235, 0.18)' },
    { indices: [0, 3, 4], color: 'rgba(139, 92, 246, 0.15)' },
    { indices: [0, 4, 1], color: 'rgba(56, 189, 248, 0.18)' },
    // Bottom pyramid faces
    { indices: [5, 2, 1], color: 'rgba(56, 189, 248, 0.15)' },
    { indices: [5, 3, 2], color: 'rgba(16, 185, 129, 0.18)' },
    { indices: [5, 4, 3], color: 'rgba(139, 92, 246, 0.15)' },
    { indices: [5, 1, 4], color: 'rgba(56, 189, 248, 0.18)' },
  ];

  // Core Wireframe Edges
  const crystalEdges: [number, number][] = [
    // Outer Pyramid
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [2, 3], [3, 4], [4, 1],
    [5, 1], [5, 2], [5, 3], [5, 4],
    // Inner Stellation Cube
    [6, 7], [7, 8], [8, 9], [9, 6],
    [10, 11], [11, 12], [12, 13], [13, 10],
    [6, 10], [7, 11], [8, 12], [9, 13],
    // Stellation Spokes
    [0, 6], [0, 7], [0, 8], [0, 9],
    [5, 10], [5, 11], [5, 12], [5, 13],
  ];

  // 3D Projection math with FOV
  const projectPoint = (p: Point3D, width: number, height: number, fov = 420) => {
    const scale = fov / (fov + p.z);
    return {
      x: p.x * scale + width / 2,
      y: p.y * scale + height / 2,
      scale,
      z: p.z,
    };
  };

  // 3D Euler Matrix Rotation
  const rotatePoint = (p: Point3D, rot: { x: number; y: number; z: number }): Point3D => {
    // Rotate around X
    const cosX = Math.cos(rot.x);
    const sinX = Math.sin(rot.x);
    const y1 = p.y * cosX - p.z * sinX;
    const z1 = p.y * sinX + p.z * cosX;
    const x1 = p.x;

    // Rotate around Y
    const cosY = Math.cos(rot.y);
    const sinY = Math.sin(rot.y);
    const x2 = x1 * cosY + z1 * sinY;
    const z2 = -x1 * sinY + z1 * cosY;
    const y2 = y1;

    // Rotate around Z
    const cosZ = Math.cos(rot.z);
    const sinZ = Math.sin(rot.z);
    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    return { x: x3, y: y3, z: z3 };
  };

  // Main 3D WebGL / Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate 3D ambient particle starfield
    const particles: Particle3D[] = [];
    const particleCount = 85;
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 240 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI - Math.PI / 2;
      particles.push({
        x: radius * Math.cos(phi) * Math.sin(theta),
        y: radius * Math.sin(phi),
        z: radius * Math.cos(phi) * Math.cos(theta),
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#818cf8' : '#34d399',
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.2,
      });
    }

    let globalTick = 0;

    const render = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      globalTick++;

      // Handle continuous rotation and inertia damping
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.y += 0.006 * speedMultiplier;
        rotationRef.current.x = 0.25 + Math.sin(globalTick * 0.015) * 0.08;
      } else if (!isRotating && !isDraggingRef.current) {
        // Apply smooth velocity deceleration on release
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
        velocityRef.current.x *= 0.93;
        velocityRef.current.y *= 0.93;
      }

      const rot = rotationRef.current;
      const isDarkTheme = theme === 'dark';

      // 1. Draw 3D Floating Particle Constellation
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (Math.abs(p.x) > 280) p.vx *= -1;
        if (Math.abs(p.y) > 280) p.vy *= -1;
        if (Math.abs(p.z) > 280) p.vz *= -1;

        const rotated = rotatePoint(p, rot);
        const proj = projectPoint(rotated, width, height, 420);
        if (proj.scale > 0) {
          const depthAlpha = Math.max(0.1, Math.min(0.8, (rotated.z + 200) / 400)) * p.alpha;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = isDarkTheme 
            ? `${p.color}${Math.floor(depthAlpha * 255).toString(16).padStart(2, '0')}`
            : `rgba(37, 99, 235, ${depthAlpha * 0.4})`;
          ctx.fill();
        }
      });

      // ==========================================
      // MODE 1: HOLOGRAPHIC GEODESIC CRYSTAL CORE
      // ==========================================
      if (visualizerMode === 'crystal') {
        // 2. Draw Multi-axis Gyroscopic Gimbal Rings
        const ringRadii = [140, 115, 90];
        ringRadii.forEach((r, idx) => {
          ctx.save();
          ctx.translate(width / 2, height / 2);
          const spinOffset = (globalTick * 0.008 * (idx % 2 === 0 ? 1 : -1) * speedMultiplier);
          ctx.beginPath();
          ctx.ellipse(0, 0, r, r * 0.35, rot.y + spinOffset + (idx * Math.PI) / 3, 0, Math.PI * 2);
          ctx.strokeStyle = idx === 0 
            ? (isDarkTheme ? 'rgba(56, 189, 248, 0.18)' : 'rgba(37, 99, 235, 0.16)')
            : idx === 1
            ? (isDarkTheme ? 'rgba(139, 92, 246, 0.14)' : 'rgba(99, 102, 241, 0.12)')
            : (isDarkTheme ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.14)');
          ctx.lineWidth = idx === 0 ? 1.5 : 1;
          ctx.setLineDash(idx === 0 ? [5, 5] : idx === 1 ? [3, 6] : []);
          ctx.stroke();
          ctx.restore();
        });

        // Rotate & Project Crystal Vertices
        const projectedVertices = crystalVertices.map((v) => {
          const rotated = rotatePoint(v, rot);
          const projected = projectPoint(rotated, width, height, 420);
          return { ...projected, rotatedZ: rotated.z, raw: rotated };
        });

        // Depth sort faces (Painter's algorithm)
        const facesWithDepth = crystalFaces.map((face) => {
          const p0 = projectedVertices[face.indices[0]];
          const p1 = projectedVertices[face.indices[1]];
          const p2 = projectedVertices[face.indices[2]];
          const avgZ = (p0.rotatedZ + p1.rotatedZ + p2.rotatedZ) / 3;
          return { face, avgZ, p0, p1, p2 };
        });

        facesWithDepth.sort((a, b) => a.avgZ - b.avgZ);

        // Draw translucent polygonal faces
        facesWithDepth.forEach(({ face, p0, p1, p2, avgZ }) => {
          if (avgZ > -40) {
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();
            ctx.fillStyle = isDarkTheme ? face.color : 'rgba(37, 99, 235, 0.08)';
            ctx.fill();
          }
        });

        // Draw wireframe edges
        crystalEdges.forEach(([i1, i2]) => {
          const p1 = projectedVertices[i1];
          const p2 = projectedVertices[i2];
          if (!p1 || !p2) return;

          const avgZ = (p1.rotatedZ + p2.rotatedZ) / 2;
          const depthAlpha = Math.max(0.12, Math.min(0.95, 0.5 + avgZ / 220));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (i1 < 6 && i2 < 6) {
            ctx.strokeStyle = isDarkTheme
              ? `rgba(56, 189, 248, ${depthAlpha * 0.9})`
              : `rgba(37, 99, 235, ${depthAlpha * 0.8})`;
            ctx.lineWidth = 1.8;
          } else {
            ctx.strokeStyle = isDarkTheme
              ? `rgba(139, 92, 246, ${depthAlpha * 0.65})`
              : `rgba(99, 102, 241, ${depthAlpha * 0.5})`;
            ctx.lineWidth = 1.1;
          }
          ctx.setLineDash([]);
          ctx.stroke();
        });

        // Draw central glowing energy core
        const corePulse = Math.sin(globalTick * 0.05) * 4;
        const coreRadGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 25 + corePulse);
        coreRadGrad.addColorStop(0, isDarkTheme ? 'rgba(56, 189, 248, 0.8)' : 'rgba(37, 99, 235, 0.7)');
        coreRadGrad.addColorStop(0.5, isDarkTheme ? 'rgba(139, 92, 246, 0.3)' : 'rgba(99, 102, 241, 0.25)');
        coreRadGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreRadGrad;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 25 + corePulse, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Apex Vertices
        projectedVertices.forEach((p, idx) => {
          const radius = (idx < 6 ? 4.5 : 2.5) * p.scale;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1.5, radius), 0, Math.PI * 2);
          if (idx === 0 || idx === 5) {
            ctx.fillStyle = isDarkTheme ? '#38bdf8' : '#2563eb';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = isDarkTheme ? '#a78bfa' : '#6366f1';
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // ==========================================
      // MODE 2: NEURAL DATA DOUBLE HELIX
      // ==========================================
      if (visualizerMode === 'helix') {
        const helixRungs = 24;
        const helixRadius = 75;
        const helixHeight = 220;

        for (let i = 0; i < helixRungs; i++) {
          const t = (i / helixRungs) * Math.PI * 3 + globalTick * 0.02 * speedMultiplier;
          const y = (i / helixRungs - 0.5) * helixHeight;

          // Strand 1 (Data Analytics - Sky Blue)
          const p1Raw: Point3D = {
            x: Math.cos(t) * helixRadius,
            y,
            z: Math.sin(t) * helixRadius,
          };
          // Strand 2 (Business Analysis - Violet)
          const p2Raw: Point3D = {
            x: Math.cos(t + Math.PI) * helixRadius,
            y,
            z: Math.sin(t + Math.PI) * helixRadius,
          };

          const p1Rot = rotatePoint(p1Raw, rot);
          const p2Rot = rotatePoint(p2Raw, rot);
          const p1Proj = projectPoint(p1Rot, width, height);
          const p2Proj = projectPoint(p2Rot, width, height);

          // Connecting bridge rung (UAT / Alignment)
          const avgZ = (p1Rot.z + p2Rot.z) / 2;
          const depthAlpha = Math.max(0.15, Math.min(0.85, 0.5 + avgZ / 200));

          ctx.beginPath();
          ctx.moveTo(p1Proj.x, p1Proj.y);
          ctx.lineTo(p2Proj.x, p2Proj.y);
          ctx.strokeStyle = isDarkTheme
            ? `rgba(148, 163, 184, ${depthAlpha * 0.5})`
            : `rgba(100, 116, 139, ${depthAlpha * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Strand 1 Node
          ctx.beginPath();
          ctx.arc(p1Proj.x, p1Proj.y, Math.max(2, 4.5 * p1Proj.scale), 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Strand 2 Node
          ctx.beginPath();
          ctx.arc(p2Proj.x, p2Proj.y, Math.max(2, 4.5 * p2Proj.scale), 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ==========================================
      // MODE 3: SPATIAL ORBITAL TECH SOLAR SYSTEM
      // ==========================================
      if (visualizerMode === 'orbital') {
        // Central Sun with Solar Flares
        const sunRadius = 24 + Math.sin(globalTick * 0.04) * 3;
        const sunGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, sunRadius * 1.6);
        sunGrad.addColorStop(0, '#38bdf8');
        sunGrad.addColorStop(0.4, '#3b82f6');
        sunGrad.addColorStop(0.8, 'rgba(139, 92, 246, 0.4)');
        sunGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sunRadius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ==========================================
      // ORBITING SKILL SATELLITES (3D DEPTH SORTED)
      // ==========================================
      const renderedSatellites = satellitesRef.current.map((sat) => {
        if (isRotating) {
          sat.angle += sat.speed * speedMultiplier;
        }

        const ox = Math.cos(sat.angle) * sat.orbitRadius;
        const oz = Math.sin(sat.angle) * sat.orbitRadius;
        const oy = sat.yOffset + Math.sin(sat.angle * 2) * 16;

        const rotated = rotatePoint({ x: ox, y: oy, z: oz }, rot);
        const proj = projectPoint(rotated, width, height, 420);

        return {
          ...sat,
          proj,
          z: rotated.z,
          rawPos: rotated,
        };
      });

      // Sort satellites back-to-front (Z-sorting)
      renderedSatellites.sort((a, b) => a.z - b.z);

      renderedSatellites.forEach((sat) => {
        const { proj, color, id, name, z } = sat;
        const isActive = activeNode === id;
        const isHovered = hoveredNodeRef.current === id;
        const baseSize = isActive ? 15 : isHovered ? 13 : 10.5;
        const size = baseSize * proj.scale;

        // Draw dynamic laser beam connector to core
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(proj.x, proj.y);
        ctx.strokeStyle = isActive 
          ? color 
          : isHovered 
          ? `${color}99`
          : isDarkTheme ? 'rgba(148, 163, 184, 0.16)' : 'rgba(100, 116, 139, 0.14)';
        ctx.lineWidth = isActive ? 2 : isHovered ? 1.5 : 0.8;
        if (isActive) {
          ctx.setLineDash([4, 2]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite Outer Orbital Ring (3D Mini-ring around planet)
        ctx.save();
        ctx.translate(proj.x, proj.y);
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.7, size * 0.6, rot.y + sat.inclination, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}60`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(4, size * 1.8), 0, Math.PI * 2);
        ctx.fillStyle = `${color}28`;
        ctx.fill();

        // Main Node Sphere Body
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(3, size), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isActive ? 18 : isHovered ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Inner Specular Highlight
        ctx.beginPath();
        ctx.arc(proj.x - size * 0.3, proj.y - size * 0.3, size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();

        // 3D Tag Label
        const fontSize = Math.round(11 * Math.max(0.75, proj.scale));
        ctx.font = `600 ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`;
        ctx.fillStyle = isDarkTheme ? '#f8fafc' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(name, proj.x, proj.y + size + 14);

        if (isActive || isHovered) {
          ctx.font = `500 ${Math.round(9.5 * Math.max(0.75, proj.scale))}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = color;
          ctx.fillText(sat.metric, proj.x, proj.y + size + 27);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, visualizerMode, isRotating, speedMultiplier, activeNode]);

  // Mouse Drag & Inertia Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      const rotSpeed = 0.009;
      rotationRef.current.y += deltaX * rotSpeed;
      rotationRef.current.x += deltaY * rotSpeed;

      velocityRef.current = {
        x: deltaY * rotSpeed * 0.5,
        y: deltaX * rotSpeed * 0.5,
      };

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const setPreset = (preset: 'isometric' | 'front' | 'top' | 'free') => {
    setViewPreset(preset);
    if (preset === 'isometric') rotationRef.current = { x: 0.35, y: 0.45, z: 0 };
    if (preset === 'front') rotationRef.current = { x: 0, y: 0, z: 0 };
    if (preset === 'top') rotationRef.current = { x: 1.5, y: 0, z: 0 };
  };

  const activeSatelliteData = satellites.find((s) => s.id === activeNode);

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 flex flex-col bg-slate-950/95 border-sky-500/50 backdrop-blur-2xl' :
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Top 3D Spatial Control Bar */}
      <div
        className={`px-3.5 sm:px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2.5 text-xs select-none ${
          isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        {/* Title and Live Status */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-sky-400" />
          </div>
          <span className="font-bold text-sm text-sky-400 flex items-center gap-1.5 font-display">
            <Sparkles className="w-4 h-4 text-sky-400" />
            3D Spatial Intelligence Matrix
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border hidden sm:inline ${
              isDark ? 'bg-slate-900 border-slate-700 text-sky-300' : 'bg-white border-slate-300 text-blue-700'
            }`}
          >
            WebGL • Interactive 3D Orbit
          </span>
        </div>

        {/* Action & Mode Controls */}
        <div className="flex items-center flex-wrap gap-1.5">
          {/* Mode Switcher Tabs */}
          <div
            className={`p-0.5 rounded-xl border flex items-center gap-0.5 text-[11px] font-semibold ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}
          >
            <button
              onClick={() => setVisualizerMode('crystal')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                visualizerMode === 'crystal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Crystal Core</span>
            </button>
            <button
              onClick={() => setVisualizerMode('helix')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                visualizerMode === 'helix'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Neural Helix</span>
            </button>
            <button
              onClick={() => setVisualizerMode('orbital')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                visualizerMode === 'orbital'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Solar System</span>
            </button>
          </div>

          {/* Preset Angle Buttons */}
          <div
            className={`p-0.5 rounded-xl border hidden md:flex items-center gap-0.5 text-[11px] ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}
          >
            <button
              onClick={() => setPreset('isometric')}
              className={`px-2 py-1 rounded-lg font-medium transition cursor-pointer ${
                viewPreset === 'isometric'
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Iso
            </button>
            <button
              onClick={() => setPreset('front')}
              className={`px-2 py-1 rounded-lg font-medium transition cursor-pointer ${
                viewPreset === 'front'
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setPreset('top')}
              className={`px-2 py-1 rounded-lg font-medium transition cursor-pointer ${
                viewPreset === 'top'
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top
            </button>
          </div>

          {/* Speed Toggle (0.5x, 1x, 2x) */}
          <button
            onClick={() => {
              setSpeedMultiplier(speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 0.5 : 1);
            }}
            className={`px-2 py-1 rounded-lg border text-[11px] font-mono font-bold transition cursor-pointer ${
              isDark ? 'bg-slate-900 border-slate-800 text-sky-400 hover:bg-slate-800' : 'bg-white border-slate-300 text-blue-700 hover:bg-slate-100'
            }`}
            title="Adjust 3D rotation speed"
          >
            {speedMultiplier}x
          </button>

          {/* Play/Pause Rotation */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isRotating
                ? 'bg-blue-600 text-white border-blue-500'
                : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300'
            }`}
            title={isRotating ? 'Pause 3D Engine' : 'Resume 3D Rotation'}
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`}
              style={{ animationDuration: `${6 / speedMultiplier}s` }}
            />
          </button>

          {/* Fullscreen Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isExpanded
                ? 'bg-sky-600 text-white border-sky-500'
                : isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
            title={isExpanded ? 'Exit Fullscreen 3D Stage' : 'Expand 3D Spatial Canvas'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${
          isExpanded ? 'flex-1 min-h-[400px]' : 'h-80 sm:h-96'
        }`}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Ambient Spatial Lighting Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-slate-950/40" />

        {/* Bottom Interactive HUD Overlay */}
        <div
          className={`absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono pointer-events-none ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">60 FPS Hardware-Accelerated Projection</span>
            <span>•</span>
            <span>Drag to rotate with inertia</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Active Target:</span>
            <span className="font-bold text-sky-400 uppercase">{activeSatelliteData?.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Interactive Orbit Node Selector Badges */}
      <div
        className={`p-3 sm:p-4 border-t grid grid-cols-2 sm:grid-cols-5 gap-2 select-none ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        {satellites.map((sat) => {
          const Icon = sat.icon;
          const isActive = activeNode === sat.id;
          return (
            <button
              key={sat.id}
              onClick={() => setActiveNode(sat.id)}
              onMouseEnter={() => setHoveredNodeId(sat.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? isDark
                    ? 'bg-slate-900 border-sky-400 shadow-lg ring-1 ring-sky-400/50 scale-[1.02]'
                    : 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/30 scale-[1.02]'
                  : isDark
                    ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    : 'bg-white border-slate-300 hover:bg-slate-100/80 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: sat.color }} />
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {sat.name}
                </div>
                <div className={`text-[10px] truncate mt-0.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {sat.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected 3D Node Telemetry Inspector Card */}
      {activeSatelliteData && (
        <div
          className={`px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isDark ? 'bg-slate-900/95 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold font-mono text-white"
                style={{ backgroundColor: activeSatelliteData.color }}
              >
                {activeSatelliteData.category}
              </span>
              <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeSatelliteData.name}
              </h4>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {activeSatelliteData.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center flex-wrap gap-1.5">
            {activeSatelliteData.bullets.map((b, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
