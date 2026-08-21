import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  colorType: 'primary' | 'cyan' | 'emerald';
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

export const DataBusinessBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({ x: -1000, y: -1000, isInside: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.isInside = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isInside = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGraph();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Node & Packet Configuration
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];
    const nodeCount = Math.max(30, Math.min(65, Math.floor((width * height) / 22000)));

    const initGraph = () => {
      nodes = [];
      packets = [];
      const colorTypes: ('primary' | 'cyan' | 'emerald')[] = ['primary', 'primary', 'cyan', 'emerald'];

      for (let i = 0; i < nodeCount; i++) {
        const baseRadius = Math.random() * 2 + 1.5;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: baseRadius,
          baseRadius,
          alpha: Math.random() * 0.4 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
        });
      }
    };

    initGraph();

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const mouse = mouseRef.current;

      // Color Palette Configurations
      const colors = isDark ? {
        primaryNode: 'rgba(56, 189, 248, ',    // Sky blue
        cyanNode: 'rgba(34, 211, 238, ',       // Cyan
        emeraldNode: 'rgba(52, 211, 153, ',    // Emerald
        linkBase: 'rgba(148, 163, 184, ',      // Slate
        mouseLink: 'rgba(56, 189, 248, ',      // Glowing sky link
        packetPrimary: 'rgba(56, 189, 248, 0.85)',
        packetSecondary: 'rgba(52, 211, 153, 0.85)',
        cursorGlow: 'rgba(56, 189, 248, 0.15)',
      } : {
        primaryNode: 'rgba(37, 99, 235, ',     // Blue 600
        cyanNode: 'rgba(2, 132, 199, ',        // Sky 600
        emeraldNode: 'rgba(5, 150, 105, ',     // Emerald 600
        linkBase: 'rgba(100, 116, 139, ',      // Slate 500
        mouseLink: 'rgba(37, 99, 235, ',       // Blue
        packetPrimary: 'rgba(37, 99, 235, 0.8)',
        packetSecondary: 'rgba(5, 150, 105, 0.8)',
        cursorGlow: 'rgba(37, 99, 235, 0.12)',
      };

      const maxLinkDistance = Math.min(160, width / 6);
      const mouseInfluenceRadius = 170;

      // Draw Cursor interactive field if active
      if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
        const radGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseInfluenceRadius);
        radGrad.addColorStop(0, colors.cursorGlow);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseInfluenceRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Organic oscillation
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.6;

        // Position update
        node.x += node.vx;
        node.y += node.vy;

        // Screen edge wrapping / bounce
        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > width) { node.x = width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > height) { node.y = height; node.vy *= -1; }

        // Interactive mouse interaction (gentle attraction / soft push)
        if (mouse.isInside) {
          const dxMouse = mouse.x - node.x;
          const dyMouse = mouse.y - node.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouseInfluenceRadius && distMouse > 20) {
            // Draw interactive connector to cursor
            const mouseAlpha = (1 - distMouse / mouseInfluenceRadius) * (isDark ? 0.35 : 0.28);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${colors.mouseLink}${mouseAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Very subtle gravitational drag towards cursor
            const force = (1 - distMouse / mouseInfluenceRadius) * 0.02;
            node.x += (dxMouse / distMouse) * force * 3;
            node.y += (dyMouse / distMouse) * force * 3;
          }
        }

        // Determine node color
        let colorPrefix = colors.primaryNode;
        if (node.colorType === 'cyan') colorPrefix = colors.cyanNode;
        if (node.colorType === 'emerald') colorPrefix = colors.emeraldNode;

        const currentAlpha = node.alpha * (isDark ? 0.8 : 0.6);

        // Draw node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${currentAlpha})`;
        ctx.fill();

        // Outer glow halo for major nodes
        if (node.baseRadius > 2.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix}${currentAlpha * 0.25})`;
          ctx.fill();
        }

        // Connect with other nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            const linkAlpha = (1 - dist / maxLinkDistance) * (isDark ? 0.18 : 0.14);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `${colors.linkBase}${linkAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Spawn data packets along connected links randomly
            if (frameCount % 40 === 0 && packets.length < 12 && Math.random() < 0.08) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: Math.random() * 0.012 + 0.008,
                color: Math.random() > 0.4 ? colors.packetPrimary : colors.packetSecondary,
              });
            }
          }
        }
      }

      // Update and draw live data flow packets (moving light pulses)
      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const p = packets[pIdx];
        const n1 = nodes[p.fromNode];
        const n2 = nodes[p.toNode];

        if (!n1 || !n2) {
          packets.splice(pIdx, 1);
          continue;
        }

        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(pIdx, 1);
          continue;
        }

        const currX = n1.x + (n2.x - n1.x) * p.progress;
        const currY = n1.y + (n2.y - n1.y) * p.progress;

        // Draw traveling packet pulse
        ctx.beginPath();
        ctx.arc(currX, currY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur for next draw
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Ambient background glow orbs */}
      <div 
        className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full filter blur-[100px] transition-opacity duration-700 ${
          isDark ? 'bg-sky-600/10' : 'bg-blue-400/12'
        }`}
      />
      <div 
        className={`absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full filter blur-[120px] transition-opacity duration-700 ${
          isDark ? 'bg-indigo-600/10' : 'bg-sky-300/15'
        }`}
      />
      <div 
        className={`absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full filter blur-[110px] transition-opacity duration-700 ${
          isDark ? 'bg-emerald-600/08' : 'bg-emerald-400/10'
        }`}
      />

      {/* Subtle Matrix Dot Grid */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.04 : 0.05,
          backgroundImage: `radial-gradient(${isDark ? '#38bdf8' : '#2563eb'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Animated Data Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
