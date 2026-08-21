import React, { useEffect, useRef, useState } from 'react';
import { 
  Database, 
  TrendingUp, 
  BarChart2, 
  FileSpreadsheet, 
  Code2, 
  Terminal, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Layers, 
  Activity,
  Cpu
} from 'lucide-react';

interface Segment {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  label?: string;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface FoodBite {
  x: number;
  y: number;
  label: string;
  color: string;
  alpha: number;
  scale: number;
}

export const DataBusinessBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeDaxIndex, setActiveDaxIndex] = useState(0);
  const [excelFormulaIndex, setExcelFormulaIndex] = useState(0);
  const [sqlQueryIndex, setSqlQueryIndex] = useState(0);
  const [pythonSnippetIndex, setPythonSnippetIndex] = useState(0);
  const [isPythonCheering, setIsPythonCheering] = useState(false);

  // Rotating tech tickers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDaxIndex((prev) => (prev + 1) % 3);
      setExcelFormulaIndex((prev) => (prev + 1) % 3);
      setSqlQueryIndex((prev) => (prev + 1) % 3);
      setPythonSnippetIndex((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // CARTOONISH PYTHON SNAKE ENGINE
    // ==========================================
    const segmentCount = 18;
    const segmentLength = 11;
    const segments: Segment[] = [];
    
    // Initial snake position in center
    let snakeHeadX = width * 0.45;
    let snakeHeadY = height * 0.35;
    let snakeTargetX = width * 0.5;
    let snakeTargetY = height * 0.4;
    let snakeAngle = 0;
    let snakeSpeed = 2.4;
    let tongueFlick = 0;
    let wanderTimer = 0;
    let isChasingMouse = false;

    for (let i = 0; i < segmentCount; i++) {
      segments.push({ x: snakeHeadX - i * segmentLength, y: snakeHeadY });
    }

    // Little floating python "Data Snacks" that python eats playfully
    const foodLabels = ['pandas', 'numpy', 'scikit', 'csv', 'json', 'api', 'etl'];
    let foodBites: FoodBite[] = [];

    const spawnFood = () => {
      if (foodBites.length < 4) {
        foodBites.push({
          x: Math.random() * (width - 160) + 80,
          y: Math.random() * (height - 160) + 80,
          label: foodLabels[Math.floor(Math.random() * foodLabels.length)],
          color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24',
          alpha: 0.85,
          scale: 1,
        });
      }
    };

    // Initialize Network particles
    const particleCount = Math.min(45, Math.floor((width * height) / 28000));
    let particles: Particle[] = [];
    let packets: DataPacket[] = [];
    const dataLabels = ['SQL', 'DAX', 'ETL', 'API', 'KPI', 'ROI', 'BI', 'UAT', 'P&L', 'ML'];
    const colors = ['rgba(56, 189, 248, ', 'rgba(99, 102, 241, ', 'rgba(52, 211, 153, ', 'rgba(251, 191, 36, '];

    const initElements = () => {
      particles = [];
      packets = [];
      foodBites = [];

      for (let i = 0; i < 3; i++) spawnFood();

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.35 + 0.15,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          label: Math.random() < 0.25 ? dataLabels[Math.floor(Math.random() * dataLabels.length)] : undefined,
        });
      }
    };

    initElements();

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseIdleTimer = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      snakeTargetX = mouseX;
      snakeTargetY = mouseY;
      isChasingMouse = true;
      mouseIdleTimer = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let lastPacketSpawn = 0;

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      mouseIdleTimer += 1;
      if (mouseIdleTimer > 180) {
        isChasingMouse = false;
      }

      // Auto-wander / Target Selection for cartoon snake
      wanderTimer += 0.02;
      if (!isChasingMouse) {
        // If nearest food exists, pursue it
        if (foodBites.length > 0) {
          const targetFood = foodBites[0];
          snakeTargetX = targetFood.x;
          snakeTargetY = targetFood.y;
        } else {
          // Smooth figure-8 wandering
          snakeTargetX = width * 0.5 + Math.sin(wanderTimer * 0.8) * (width * 0.35);
          snakeTargetY = height * 0.5 + Math.cos(wanderTimer * 1.4) * (height * 0.25);
        }
      }

      // Move snake head toward target
      const headDx = snakeTargetX - snakeHeadX;
      const headDy = snakeTargetY - snakeHeadY;
      const headDist = Math.sqrt(headDx * headDx + headDy * headDy);

      if (headDist > 8) {
        snakeAngle = Math.atan2(headDy, headDx);
        const currentSpeed = isChasingMouse ? Math.min(4.5, headDist * 0.04 + 1.8) : snakeSpeed;
        snakeHeadX += Math.cos(snakeAngle) * currentSpeed;
        snakeHeadY += Math.sin(snakeAngle) * currentSpeed;
      }

      // Slithering wave offset applied to segments
      segments[0] = { x: snakeHeadX, y: snakeHeadY };
      for (let i = 1; i < segments.length; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          const angle = Math.atan2(dy, dx);
          // Add subtle slithering wave side-to-side
          const wiggle = Math.sin(time * 0.008 + i * 0.5) * 1.2;
          curr.x = prev.x - Math.cos(angle) * segmentLength + Math.cos(angle + Math.PI / 2) * wiggle;
          curr.y = prev.y - Math.sin(angle) * segmentLength + Math.sin(angle + Math.PI / 2) * wiggle;
        }
      }

      // Check food consumption
      for (let f = foodBites.length - 1; f >= 0; f--) {
        const bite = foodBites[f];
        const fdx = snakeHeadX - bite.x;
        const fdy = snakeHeadY - bite.y;
        const fdist = Math.sqrt(fdx * fdx + fdy * fdy);

        if (fdist < 28) {
          // Snake eats snack!
          setIsPythonCheering(true);
          setTimeout(() => setIsPythonCheering(false), 900);
          foodBites.splice(f, 1);
          setTimeout(spawnFood, 2500);
        } else {
          // Draw floating Data snack
          ctx.save();
          ctx.beginPath();
          ctx.arc(bite.x, bite.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = bite.color === '#38bdf8' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(251, 191, 36, 0.25)';
          ctx.fill();
          ctx.strokeStyle = bite.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillStyle = bite.color;
          ctx.fillText(`.${bite.label}`, bite.x + 11, bite.y + 3);
          ctx.restore();
        }
      }

      // 1. Draw Network Mesh Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.06, currentAlpha)})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
          const maxDist = 120;

          if (lineDist < maxDist) {
            const lineAlpha = (1 - lineDist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            if (time - lastPacketSpawn > 700 && packets.length < 8 && Math.random() < 0.02) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.008,
                color: p.color,
              });
              lastPacketSpawn = time;
            }
          }
        }
      }

      // Draw Data Packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;
        const pFrom = particles[pkt.fromNode];
        const pTo = particles[pkt.toNode];

        if (!pFrom || !pTo || pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const currX = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
        const currY = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ==========================================
      // 2. DRAW CARTOONISH PYTHON (SNAKE MASCOT)
      // ==========================================
      ctx.save();

      // A. Draw Body Segments (from tail to head)
      for (let s = segments.length - 1; s >= 1; s--) {
        const seg = segments[s];
        // Gradual tapering radius
        const radius = Math.max(4, 10 - (s / segments.length) * 5.5);
        // Alternating iconic Python Dual Colors (Blue #387eb8 and Yellow #ffe873)
        const isBlue = s % 2 === 0;
        const baseColor = isBlue ? '#387eb8' : '#ffd43b';
        const shadowColor = isBlue ? '#23527c' : '#c99a16';

        // Outer glow on segments
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.shadowColor = isBlue ? 'rgba(56, 126, 184, 0.4)' : 'rgba(255, 212, 59, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Cute highlight spot on segment
        ctx.beginPath();
        ctx.arc(seg.x - radius * 0.25, seg.y - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
      }

      // B. Draw Cute Cartoon Python Head
      const head = segments[0];
      const headRadius = 12;

      ctx.translate(head.x, head.y);
      ctx.rotate(snakeAngle);

      // Flickering Red Tongue (Cute Cartoon)
      tongueFlick += 0.05;
      if (Math.sin(tongueFlick * 2.5) > 0.4) {
        ctx.beginPath();
        ctx.moveTo(headRadius + 2, 0);
        ctx.lineTo(headRadius + 10, 0);
        ctx.lineTo(headRadius + 14, -3);
        ctx.moveTo(headRadius + 10, 0);
        ctx.lineTo(headRadius + 14, 3);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Head Base (Dual tone Python style)
      ctx.beginPath();
      ctx.ellipse(0, 0, headRadius + 2, headRadius - 1, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3776ab'; // Python Blue
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Snout / Yellow lower chin
      ctx.beginPath();
      ctx.ellipse(4, 3, headRadius * 0.65, headRadius * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd43b'; // Python Yellow
      ctx.fill();

      // Big Cute Anime / Cartoon Eyes
      // Left Eye
      ctx.beginPath();
      ctx.arc(2, -5, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(3.2, -5, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a'; // Pupil
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2.5, -6, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff'; // Sparkle highlight
      ctx.fill();

      // Right Eye
      ctx.beginPath();
      ctx.arc(2, 5, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(3.2, 5, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a'; // Pupil
      ctx.fill();
      ctx.beginPath();
      ctx.arc(2.5, 4, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff'; // Sparkle highlight
      ctx.fill();

      // Cheerful Smile
      ctx.beginPath();
      ctx.arc(5, 1, 3, 0.2, Math.PI * 0.8);
      ctx.strokeStyle = '#713f12';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Text contents for animated cards
  const daxMeasures = [
    { title: 'Power BI DAX Measure', code: 'YoY_Growth = DIVIDE([Sales] - [PY_Sales], [PY_Sales], 0)' },
    { title: 'Power BI DAX Measure', code: 'YTD_Revenue = TOTALYTD(SUM(Orders[Amount]), DateTable[Date])' },
    { title: 'Power BI DAX Measure', code: 'Retention_Rate = 1 - DIVIDE([Churned_Users], [Active_Users])' },
  ];

  const excelFormulas = [
    { formula: '=XLOOKUP(A2, Products!A:A, Products!D:D, 0)', label: 'Dynamic Price Match' },
    { formula: '=SUMIFS(Sales, Region, "North", Quarter, "Q4")', label: 'Multi-Condition Revenue' },
    { formula: '=INDEX(Matrix, MATCH(Target, RowRange, 0), 3)', label: '2D Matrix Lookup' },
  ];

  const sqlQueries = [
    { query: 'SELECT region, SUM(amount) AS revenue FROM transactions GROUP BY 1 ORDER BY revenue DESC;', label: 'Regional Aggregations' },
    { query: 'WITH cohort AS (SELECT user_id, DATE_TRUNC("month", signup_date) FROM users) SELECT * FROM cohort;', label: 'Cohort Retention CTE' },
    { query: 'SELECT emp_id, salary, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) FROM emps;', label: 'Window Ranking Functions' },
  ];

  const pythonSnippets = [
    { code: 'df.groupby("cohort")["revenue"].agg(["mean", "sum"]).reset_index()', label: 'Pandas Aggregation' },
    { code: 'sns.heatmap(df.corr(), annot=True, cmap="mako", fmt=".2f")', label: 'Correlation Matrix' },
    { code: 'model = RandomForestClassifier(n_estimators=100).fit(X_train, y_train)', label: 'Predictive Modeling' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle High-Tech Blueprint Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)'
        }}
      />

      {/* 2. Interactive Canvas (Cartoon Python Snake + Mesh Network) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-75"
      />

      {/* =========================================================================
          3. DEDICATED ANIMATED TECH BADGES (PYTHON, SQL, EXCEL, POWER BI)
         ========================================================================= */}

      {/* TOP LEFT: ANIMATED PYTHON SCRIPT RUNNER */}
      <div className="absolute top-[14%] left-[4%] hidden lg:flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md shadow-xl shadow-cyan-950/30 max-w-[280px] animate-pulse-slow">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-2">
            {/* Python Dual-tone mini icon */}
            <div className="w-5 h-5 rounded-md bg-[#1e293b] flex items-center justify-center p-0.5 border border-cyan-500/30">
              <span className="text-[10px] font-black text-[#38bdf8]">Py</span>
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Python Script Engine</span>
          </div>
          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 truncate">
          <span className="text-purple-400">import</span> <span className="text-cyan-300">pandas</span> <span className="text-purple-400">as</span> pd
          <br />
          <span className="text-emerald-400">{pythonSnippets[pythonSnippetIndex].code}</span>
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-0.5">
          <span>{pythonSnippets[pythonSnippetIndex].label}</span>
          <span className="text-cyan-400">numpy • seaborn • scipy</span>
        </div>
      </div>

      {/* TOP RIGHT: ANIMATED POWER BI INTERACTIVE TOWER BARS */}
      <div className="absolute top-[15%] right-[4%] hidden xl:flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-md shadow-xl shadow-amber-950/20 max-w-[290px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-2">
            {/* Power BI Gold Icon */}
            <div className="w-5 h-5 rounded-md bg-[#f2c811] flex items-center justify-center text-slate-950 font-black text-[10px] shadow-sm">
              BI
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Power BI Live Visuals</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
            DAX Engine
          </span>
        </div>

        {/* Animated Power BI Bouncing Bars */}
        <div className="flex items-end justify-between gap-1.5 h-12 bg-slate-950/80 p-2 rounded-xl border border-slate-800/80">
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#f2c811] rounded-t transition-all duration-700 animate-pulse" style={{ height: '45%' }} />
            <span className="text-[8px] font-mono text-slate-400">Q1</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#f2c811] rounded-t transition-all duration-700 animate-bounce" style={{ height: '70%' }} />
            <span className="text-[8px] font-mono text-slate-400">Q2</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#38bdf8] rounded-t transition-all duration-700 animate-pulse" style={{ height: '90%' }} />
            <span className="text-[8px] font-mono text-cyan-300 font-bold">Q3</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-[#34d399] rounded-t transition-all duration-700" style={{ height: '100%' }} />
            <span className="text-[8px] font-mono text-emerald-300 font-bold">Q4</span>
          </div>
        </div>

        {/* Dynamic DAX Measure formula */}
        <div className="text-[9.5px] font-mono text-amber-300/90 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 truncate">
          {daxMeasures[activeDaxIndex].code}
        </div>
      </div>

      {/* MID-BOTTOM LEFT: ANIMATED SQL DATABASE CYLINDER & QUERIES */}
      <div className="absolute top-[52%] left-[3%] hidden lg:flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-900/60 border border-indigo-500/30 backdrop-blur-md shadow-xl shadow-indigo-950/20 max-w-[310px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Database className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">SQL Relational DB</span>
          </div>
          <span className="text-[9px] font-mono text-cyan-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            PostgreSQL / MySQL
          </span>
        </div>

        {/* Live animated SQL Query block */}
        <div className="text-[10px] font-mono bg-slate-950/90 p-2 rounded-xl border border-slate-800/80 leading-relaxed">
          <div className="text-indigo-400 font-bold">-- {sqlQueries[sqlQueryIndex].label}</div>
          <div className="text-slate-300 truncate mt-0.5">
            {sqlQueries[sqlQueryIndex].query}
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
          <span>Execution: <strong className="text-emerald-400 font-bold">14.2ms</strong></span>
          <span className="text-indigo-300">Index Scanned: 100%</span>
        </div>
      </div>

      {/* MID-BOTTOM RIGHT: ANIMATED MICROSOFT EXCEL SPREADSHEET CARD */}
      <div className="absolute top-[54%] right-[3%] hidden lg:flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-md shadow-xl shadow-emerald-950/20 max-w-[300px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-2">
            {/* Excel Green Icon */}
            <div className="w-5 h-5 rounded-md bg-[#107c41] flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Excel Financial Modeling</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400">VLOOKUP • Pivot</span>
        </div>

        {/* Animated Excel Grid Simulation */}
        <div className="bg-slate-950/90 rounded-xl border border-slate-800/80 overflow-hidden text-[9px] font-mono">
          <div className="grid grid-cols-4 bg-[#107c41]/20 border-b border-slate-800 text-slate-300 font-bold p-1 text-center">
            <span>A: SKU</span>
            <span>B: Qty</span>
            <span>C: Unit$</span>
            <span>D: Total$</span>
          </div>
          <div className="grid grid-cols-4 p-1 text-center text-slate-400 border-b border-slate-800/50">
            <span className="text-cyan-300 font-bold">#4912</span>
            <span>450</span>
            <span>$12.50</span>
            <span className="text-emerald-400 font-bold">$5,625</span>
          </div>
          <div className="grid grid-cols-4 p-1 text-center text-slate-400 bg-emerald-500/5">
            <span className="text-cyan-300 font-bold">#8821</span>
            <span>1,200</span>
            <span>$84.00</span>
            <span className="text-emerald-400 font-bold">$100.8K</span>
          </div>
        </div>

        {/* Live Formula Bar */}
        <div className="text-[9px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-500/30 truncate">
          fx: {excelFormulas[excelFormulaIndex].formula}
        </div>
      </div>

      {/* BOTTOM CENTER: REAL-TIME PIPELINE TELEMETRY */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-6 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Python • Pandas Active
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1.5 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          SQL ETL Ingestion: 100%
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1.5 text-amber-300">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          Power BI DAX: Verified
        </span>
      </div>

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute top-[8%] left-[20%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[45%] right-[15%] w-[550px] h-[550px] bg-amber-500/08 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[75%] left-[10%] w-[480px] h-[480px] bg-emerald-600/08 rounded-full blur-[140px] pointer-events-none -z-10" />
    </div>
  );
};
