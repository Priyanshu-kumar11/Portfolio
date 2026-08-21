import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles, ChevronDown, BarChart2, Briefcase, Layers } from 'lucide-react';
import { profileData } from '../data/portfolioData';

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/50 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-display font-extrabold text-cyan-400 text-lg">
              PK
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition">
                {profileData.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for hire" />
            </div>
            <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Data &amp; Business Analyst
            </div>
          </div>
        </a>

        {/* Desktop Role Switcher Filter Pill */}
        <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1 text-xs">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1 rounded-full transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dual Profile (DA + BA)
          </button>
          <button
            onClick={() => setRoleFilter('data-analyst')}
            className={`px-3 py-1 rounded-full transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'data-analyst'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Data Analyst Focus
          </button>
          <button
            onClick={() => setRoleFilter('business-analyst')}
            className={`px-3 py-1 rounded-full transition font-medium flex items-center gap-1.5 ${
              roleFilter === 'business-analyst'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Business Analyst Focus
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Quick Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition"
          >
            <span>Get in Touch</span>
          </a>

          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          {/* Role selector in mobile */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Profile Focus Mode:
            </span>
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => {
                  setRoleFilter('all');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-center font-medium ${
                  roleFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Dual View
              </button>
              <button
                onClick={() => {
                  setRoleFilter('data-analyst');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-center font-medium ${
                  roleFilter === 'data-analyst' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Data
              </button>
              <button
                onClick={() => {
                  setRoleFilter('business-analyst');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-center font-medium ${
                  roleFilter === 'business-analyst' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Business
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-cyan-400"
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
              className="w-full py-2.5 bg-cyan-500 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <FileText className="w-4 h-4" />
              View Full Formatted Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
