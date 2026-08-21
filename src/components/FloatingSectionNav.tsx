import React, { useEffect, useState } from 'react';
import { 
  Compass, 
  Layers, 
  Briefcase, 
  FolderGit2, 
  Sparkles, 
  Sliders, 
  GraduationCap, 
  Mail, 
  ArrowUp,
  ChevronUp
} from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useTheme } from '../context/ThemeContext';

interface SectionItem {
  id: string;
  label: string;
  icon: any;
  shortLabel: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'overview', label: 'Overview & 3D Matrix', icon: Compass, shortLabel: 'Overview' },
  { id: 'bridge', label: 'Dual-Role Spectrum', icon: Layers, shortLabel: 'Bridge' },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, shortLabel: 'Experience' },
  { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2, shortLabel: 'Projects' },
  { id: 'interactive-demos', label: 'Live Crypto & BI Demos', icon: Sparkles, shortLabel: 'Demos' },
  { id: 'skills', label: 'Skills & Tech Stack', icon: Sliders, shortLabel: 'Skills' },
  { id: 'education', label: 'Education & Honors', icon: GraduationCap, shortLabel: 'Education' },
  { id: 'contact', label: 'Contact & Hire', icon: Mail, shortLabel: 'Contact' },
];

export const FloatingSectionNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showDock, setShowDock] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)) : 0;
      setScrollProgress(progress);
      setShowDock(currentScroll > 150);

      // Section intersection detection
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJump = (sectionId: string) => {
    smoothScrollTo(sectionId, 75, 750);
  };

  const handleBackToTop = () => {
    smoothScrollTo('overview', 0, 800);
  };

  if (!showDock) return null;

  return (
    <aside
      aria-label="Section Jump Navigator"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5 transition-all duration-300"
    >
      {/* Main 3D Floating Glass Dock */}
      <div
        className={`p-2 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col items-center gap-1.5 ${
          isDark
            ? 'bg-[#0f172a]/85 border-slate-700/80 shadow-cyan-950/30'
            : 'bg-white/90 border-slate-300/80 shadow-slate-400/20'
        }`}
        style={{
          transform: isHovered ? 'scale(1.04) translateX(-3px)' : 'scale(1)',
          boxShadow: isDark 
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.15)' 
            : '0 20px 35px -12px rgba(0, 0, 0, 0.15), 0 0 15px rgba(37, 99, 235, 0.1)'
        }}
      >
        <div className="text-[9px] font-mono uppercase font-bold text-slate-400 py-0.5 tracking-wider">
          Jump
        </div>

        {/* Section Navigation Buttons */}
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <div key={sec.id} className="relative group flex items-center justify-center">
              <button
                onClick={() => handleJump(sec.id)}
                aria-label={`Jump to ${sec.label}`}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 scale-110'
                    : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>

              {/* Floating Tooltip with 3D Arrow */}
              <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 z-50">
                <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl border flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-900 text-slate-100 border-slate-700'
                    : 'bg-slate-900 text-white border-slate-800'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{sec.label}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Divider */}
        <div className={`w-5 h-[1px] my-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

        {/* Circular Progress & Back To Top 3D Button */}
        <div className="relative group">
          <button
            onClick={handleBackToTop}
            aria-label="Scroll back to top"
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 text-sky-400' 
                : 'bg-slate-100 hover:bg-slate-200 text-blue-600'
            }`}
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Progress Circular SVG Ring */}
          <svg className="absolute inset-0 w-8 h-8 -rotate-90 pointer-events-none">
            <circle
              cx="16"
              cy="16"
              r="14"
              className="text-transparent"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              className="text-blue-500 transition-all duration-150"
              strokeWidth="2"
              strokeDasharray={88}
              strokeDashoffset={88 - (88 * scrollProgress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 z-50">
            <div className={`px-2 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap shadow-xl border ${
              isDark
                ? 'bg-slate-900 text-sky-400 border-slate-700'
                : 'bg-slate-900 text-sky-300 border-slate-800'
            }`}>
              Top • {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
