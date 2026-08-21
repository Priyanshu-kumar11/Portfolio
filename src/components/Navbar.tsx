import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sun, Moon, BarChart2, Briefcase, Layers } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { smoothScrollTo } from '../utils/smoothScroll';

interface Props {
  onOpenResume: () => void;
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
  setRoleFilter: (filter: 'all' | 'data-analyst' | 'business-analyst') => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenResume,
  roleFilter,
  setRoleFilter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Live Demos', href: '#interactive-demos' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href, 75, 750);
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800 shadow-md py-3'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : isDark
            ? 'bg-[#0b0f19]/80 backdrop-blur-sm border-b border-slate-800/40 py-3.5 sm:py-4.5'
            : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#overview" 
          onClick={(e) => handleNavClick(e, '#overview')}
          className="flex items-center gap-3 group"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition ${
            isDark 
              ? 'bg-slate-900 border border-slate-700 text-sky-400 group-hover:border-sky-500' 
              : 'bg-slate-900 border border-slate-800 text-white shadow-sm'
          }`}>
            PK
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-semibold text-base sm:text-lg transition ${
                isDark ? 'text-white group-hover:text-sky-400' : 'text-slate-900 group-hover:text-blue-700'
              }`}>
                {profileData.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Available for hire" />
            </div>
            <div className={`text-[11px] font-medium hidden sm:block ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Data &amp; Business Analyst
            </div>
          </div>
        </a>

        {/* Role Switcher Pill */}
        <div className={`hidden lg:flex items-center rounded-lg p-1 text-xs transition ${
          isDark ? 'bg-slate-900/90 border border-slate-800' : 'bg-slate-100 border border-slate-200'
        }`}>
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'all'
                ? isDark
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-900 font-semibold shadow-sm border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dual Profile
          </button>
          <button
            onClick={() => setRoleFilter('data-analyst')}
            className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'data-analyst'
                ? isDark
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-900 font-semibold shadow-sm border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Data Analyst
          </button>
          <button
            onClick={() => setRoleFilter('business-analyst')}
            className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'business-analyst'
                ? isDark
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-900 font-semibold shadow-sm border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Business Analyst
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center gap-5 text-xs font-medium ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition cursor-pointer ${isDark ? 'hover:text-sky-400' : 'hover:text-blue-600'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Quick Actions & Day/Night Toggle */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Day / Night Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 hover:border-amber-300/40'
                : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 hover:border-slate-400'
            }`}
            title={isDark ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
            aria-label="Toggle day and night mode"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-semibold text-amber-200">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-semibold text-slate-800">Night</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
            }`}
          >
            Contact
          </a>

          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm active:scale-95 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu and Theme toggle trigger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center cursor-pointer ${
              isDark 
                ? 'bg-slate-900 text-amber-300 border border-slate-700' 
                : 'bg-white text-blue-700 border border-slate-300 shadow-xs'
            }`}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-700" />}
          </button>
          
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1.5 rounded-md bg-blue-600 text-white font-semibold text-xs active:scale-95"
          >
            Resume
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-lg ${
              isDark ? 'bg-slate-900 border border-slate-700 text-slate-200' : 'bg-white border border-slate-300 text-slate-800 shadow-xs'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden px-4 pt-3 pb-5 space-y-3.5 border-b shadow-xl ${
          isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Role selector */}
          <div className="space-y-1">
            <span className={`text-[10px] uppercase font-bold tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Profile Focus:
            </span>
            <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg text-[11px] ${
              isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'
            }`}>
              <button
                onClick={() => {
                  setRoleFilter('all');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded text-center font-medium ${
                  roleFilter === 'all' 
                    ? isDark ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-slate-900 font-semibold shadow-sm'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Dual
              </button>
              <button
                onClick={() => {
                  setRoleFilter('data-analyst');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded text-center font-medium ${
                  roleFilter === 'data-analyst'
                    ? isDark ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-slate-900 font-semibold shadow-sm'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Data
              </button>
              <button
                onClick={() => {
                  setRoleFilter('business-analyst');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded text-center font-medium ${
                  roleFilter === 'business-analyst'
                    ? isDark ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-slate-900 font-semibold shadow-sm'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Business
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-2 pt-2 border-t text-xs ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg transition ${
                  isDark ? 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-sky-400' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              View Formatted Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
