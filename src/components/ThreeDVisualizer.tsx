import React, { useEffect, useRef, useState } from 'react';
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
  Maximize2
} from 'lucide-react';

interface Vertex3D {
  x: number;
  y: number;
  z: number;
}

interface OrbitNode {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  angle: number;
  orbitRadius: number;
  speed: number;
  yOffset: number;
  metric: string;
}

export const ThreeDVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeNode, setActiveNode] = useState<string | null>('powerbi');
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [viewAngle, setViewAngle] = useState<'isometric' | 'top' | 'front'>('isometric');

  // Mouse interaction for rotation drag
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.35, y: 0.45, z: 0 });

  // 3D Polyhedron Vertices (Dual-pyramid / Octahedron with core sub-divisions)
  const baseVertices: Vertex3D[] = [
    { x: 0, y: -110, z: 0 },    // Top Apex
    { x: 90, y: 0, z: 0 },      // Right
    { x: 0, y: 0, z: 90 },      // Front
    { x: -90, y: 0, z: 0 },     // Left
    { x: 0, y: 0, z: -90 },     // Back
    { x: 0, y: 110, z: 0 },     // Bottom Apex
    // Inner core cube
    { x: 40, y: 40, z: 40 },
    { x: -40, y: 40, z: 40 },
    { x: -40, y: -40, z: 40 },
    { x: 40, y: -40, z: 40 },
    { x: 40, y: 40, z: -40 },
    { x: -40, y: 40, z: -40 },
    { x: -40, y: -40, z: -40 },
    { x: 40, y: -40, z: -40 },
  ];

  // Octahedron wireframe edges (pairs of vertex indices)
  const edges: [number, number][] = [
    // Top pyramid
    [0, 1], [0, 2], [0, 3], [0, 4],
    // Equator ring
    [1, 2], [2, 3], [3, 4], [4, 1],
    // Bottom pyramid
    [5, 1], [5, 2], [5, 3], [5, 4],
    // Core cube
    [6, 7], [7, 8], [8, 9], [9, 6],
    [10, 11], [11, 12], [12, 13], [13, 10],
    [6, 10], [7, 11], [8, 12], [9, 13],
    // Spoke connectors
    [0, 8], [0, 9], [5, 6], [5, 7]
  ];

  // Orbiting Key Skill Satellites
  const orbitNodes: OrbitNode[] = [
    {
      id: 'powerbi',
      name: 'Power BI & DAX',
      category: 'Data Analytics',
      icon: BarChart3,
      color: '#38bdf8',
      angle: 0,
      orbitRadius: 155,
      speed: 0.009,
      yOffset: -25,
      metric: 'Advanced DAX & Dashboards'
    },
    {
      id: 'sql',
      name: 'SQL & Data Modeling',
      category: 'Database Engine',
      icon: Database,
      color: '#3b82f6',
      angle: (Math.PI * 2) / 5,
      orbitRadius: 165,
      speed: 0.008,
      yOffset: 30,
      metric: 'PostgreSQL / MySQL Queries'
    },
    {
      id: 'rpa',
      name: 'BOT Validation & UAT',
      category: 'Quality Assurance',
      icon: Cpu,
      color: '#10b981',
      angle: ((Math.PI * 2) / 5) * 2,
      orbitRadius: 150,
      speed: 0.01,
      yOffset: -35,
      metric: '100% Dev & Prod Sign-off'
    },
    {
      id: 'business',
      name: 'Business Analysis & BRD',
      category: 'Delivery Strategy',
      icon: Briefcase,
      color: '#8b5cf6',
      angle: ((Math.PI * 2) / 5) * 3,
      orbitRadius: 160,
      speed: 0.0075,
      yOffset: 20,
      metric: 'Stakeholder Elicitation & Specs'
    },
    {
      id: 'automation',
      name: 'Python & Apps Script',
      category: 'Pipeline Automation',
      icon: Code2,
      color: '#f59e0b',
      angle: ((Math.PI * 2) / 5) * 4,
      orbitRadius: 158,
      speed: 0.0085,
      yOffset: -10,
      metric: 'ETL Pipelines & Live Sync'
    },
  ];

  const orbitNodesRef = useRef(orbitNodes);

  // Projection math
  const project = (x: number, y: number, z: number, width: number, height: number, fov = 400) => {
    const scale = fov / (fov + z);
    const x2d = x * scale + width / 2;
    const y2d = y * scale + height / 2;
    return { x: x2d, y: y2d, scale, z };
  };

  // Rotation math (Euler rotations)
  const rotatePoint = (p: Vertex3D, rot: { x: number; y: number; z: number }) => {
    // Rotate around X
    let y1 = p.y * Math.cos(rot.x) - p.z * Math.sin(rot.x);
    let z1 = p.y * Math.sin(rot.x) + p.z * Math.cos(rot.x);
    let x1 = p.x;

    // Rotate around Y
    let x2 = x1 * Math.cos(rot.y) + z1 * Math.sin(rot.y);
    let z2 = -x1 * Math.sin(rot.y) + z1 * Math.cos(rot.y);
    let y2 = y1;

    // Rotate around Z
    let x3 = x2 * Math.cos(rot.z) - y2 * Math.sin(rot.z);
    let y3 = x2 * Math.sin(rot.z) + y2 * Math.cos(rot.z);
    let z3 = z2;

    return { x: x3, y: y3, z: z3 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let angleCounter = 0;

    const render = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation update
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.y += 0.006 * rotationSpeed;
        rotationRef.current.x = 0.25 + Math.sin(angleCounter * 0.02) * 0.1;
      }
      angleCounter++;

      const rot = rotationRef.current;
      const isDarkTheme = theme === 'dark';

      // 1. Draw 3D Ambient Ring Guides
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 45, rot.y, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkTheme ? 'rgba(56, 189, 248, 0.12)' : 'rgba(37, 99, 235, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 140, 60, -rot.y * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkTheme ? 'rgba(16, 185, 129, 0.10)' : 'rgba(5, 150, 105, 0.10)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.restore();

      // 2. Rotate and project Polyhedron Vertices
      const projectedVertices = baseVertices.map((v) => {
        const rotated = rotatePoint(v, rot);
        const projected = project(rotated.x, rotated.y, rotated.z, width, height);
        return { ...projected, original: v, rotatedZ: rotated.z };
      });

      // 3. Draw Edges with depth alpha
      edges.forEach(([i1, i2]) => {
        const p1 = projectedVertices[i1];
        const p2 = projectedVertices[i2];
        if (!p1 || !p2) return;

        const avgZ = (p1.rotatedZ + p2.rotatedZ) / 2;
        // Depth-based line weight and opacity
        const depthAlpha = Math.max(0.12, Math.min(0.85, 0.5 + avgZ / 250));
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        if (i1 < 6 && i2 < 6) {
          // Outer primary octahedron
          ctx.strokeStyle = isDarkTheme
            ? `rgba(56, 189, 248, ${depthAlpha * 0.85})`
            : `rgba(37, 99, 235, ${depthAlpha * 0.75})`;
          ctx.lineWidth = 1.6;
        } else {
          // Core inner matrix
          ctx.strokeStyle = isDarkTheme
            ? `rgba(139, 92, 246, ${depthAlpha * 0.55})`
            : `rgba(99, 102, 241, ${depthAlpha * 0.45})`;
          ctx.lineWidth = 1;
        }
        ctx.setLineDash([]);
        ctx.stroke();
      });

      // 4. Draw Core Glowing Vertices
      projectedVertices.forEach((p, idx) => {
        const radius = (idx < 6 ? 4.5 : 2.5) * p.scale;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.5, radius), 0, Math.PI * 2);
        
        if (idx === 0 || idx === 5) {
          // Apex nodes
          ctx.fillStyle = isDarkTheme ? '#38bdf8' : '#2563eb';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = isDarkTheme ? '#818cf8' : '#4f46e5';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Update, Sort and Draw Orbiting Satellites by Z-Depth
      const nodesWithPos = orbitNodesRef.current.map((node) => {
        if (isRotating) {
          node.angle += node.speed * rotationSpeed;
        }
        const ox = Math.cos(node.angle) * node.orbitRadius;
        const oz = Math.sin(node.angle) * node.orbitRadius;
        const oy = node.yOffset + Math.sin(node.angle * 2) * 15;

        const rotated = rotatePoint({ x: ox, y: oy, z: oz }, rot);
        const proj = project(rotated.x, rotated.y, rotated.z, width, height);

        return {
          ...node,
          proj,
          z: rotated.z,
        };
      });

      // Sort satellites back-to-front for proper 3D layering
      nodesWithPos.sort((a, b) => a.z - b.z);

      nodesWithPos.forEach((node) => {
        const { proj, color, id, name } = node;
        const isActive = activeNode === id;
        const size = (isActive ? 14 : 10) * proj.scale;

        // Draw connecting beam from center to satellite
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(proj.x, proj.y);
        ctx.strokeStyle = isActive 
          ? color 
          : isDarkTheme ? 'rgba(148, 163, 184, 0.18)' : 'rgba(100, 116, 139, 0.15)';
        ctx.lineWidth = isActive ? 1.5 : 0.75;
        ctx.stroke();

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(3, size * 1.6), 0, Math.PI * 2);
        ctx.fillStyle = `${color}25`;
        ctx.fill();

        // Node Center
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(2, size), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isActive ? 14 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw text label next to satellite
        ctx.font = `${Math.round(11 * Math.max(0.8, proj.scale))}px 'Plus Jakarta Sans', system-ui, sans-serif`;
        ctx.fillStyle = isDarkTheme ? '#f1f5f9' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(name, proj.x, proj.y + size + 14);

        if (isActive) {
          ctx.font = `${Math.round(9 * Math.max(0.8, proj.scale))}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = color;
          ctx.fillText(node.metric, proj.x, proj.y + size + 26);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isRotating, rotationSpeed, activeNode]);

  // Mouse drag handlers for interactive 3D orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationRef.current.y += deltaX * 0.01;
    rotationRef.current.x += deltaY * 0.01;

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetView = () => {
    rotationRef.current = { x: 0.35, y: 0.45, z: 0 };
    setViewAngle('isometric');
    setIsRotating(true);
  };

  const setPresetAngle = (angle: 'isometric' | 'top' | 'front') => {
    setViewAngle(angle);
    if (angle === 'isometric') rotationRef.current = { x: 0.35, y: 0.45, z: 0 };
    if (angle === 'top') rotationRef.current = { x: 1.5, y: 0, z: 0 };
    if (angle === 'front') rotationRef.current = { x: 0, y: 0, z: 0 };
  };

  return (
    <div className={`relative rounded-2xl border overflow-hidden shadow-xl transition-all duration-300 ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Top Holographic Control Bar */}
      <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span className="font-bold text-sm text-sky-400 flex items-center gap-1.5 font-display">
            <Sparkles className="w-4 h-4" />
            3D Data Intelligence Matrix
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border hidden sm:inline ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-300 text-slate-600'
          }`}>
            Interactive Spatial Canvas
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {/* Angle Presets */}
          <div className={`p-0.5 rounded-lg border flex items-center gap-0.5 text-[11px] ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
          }`}>
            <button
              onClick={() => setPresetAngle('isometric')}
              className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                viewAngle === 'isometric' 
                  ? 'bg-blue-600 text-white' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Isometric
            </button>
            <button
              onClick={() => setPresetAngle('front')}
              className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                viewAngle === 'front' 
                  ? 'bg-blue-600 text-white' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setPresetAngle('top')}
              className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                viewAngle === 'top' 
                  ? 'bg-blue-600 text-white' 
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top
            </button>
          </div>

          {/* Toggle Auto Rotation */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isRotating
                ? 'bg-blue-600 text-white border-blue-500'
                : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300'
            }`}
            title={isRotating ? 'Pause 3D Rotation' : 'Start 3D Rotation'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <button
            onClick={handleResetView}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
            title="Reset 3D Camera"
          >
            <Eye className="w-3.5 h-3.5" />
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
        className="relative w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing select-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Drag Hint Overlay */}
        <div className={`absolute bottom-3 left-4 text-[11px] font-mono flex items-center gap-1.5 pointer-events-none ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <span>⚡ Drag to orbit 3D model</span>
          <span>•</span>
          <span>Click nodes to inspect</span>
        </div>
      </div>

      {/* Interactive Orbit Node Badges */}
      <div className={`p-3.5 border-t grid grid-cols-2 sm:grid-cols-5 gap-2 ${
        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        {orbitNodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? isDark
                    ? 'bg-slate-900 border-sky-400 shadow-md ring-1 ring-sky-400/40'
                    : 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-600/20'
                  : isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    : 'bg-white border-slate-300 hover:bg-slate-100/80 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color }} />
                <Icon className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <div className={`text-[11px] font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {node.name}
                </div>
                <div className={`text-[9px] truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {node.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
