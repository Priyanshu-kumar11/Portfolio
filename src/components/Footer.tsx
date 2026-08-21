import React from 'react';
import { FileText, ArrowUp, Linkedin, Github, Mail, Phone } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface Props {
  onOpenResume: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-white font-display">
              {profileData.name}
            </div>
            <div className="text-xs text-slate-500">
              Data &amp; Business Analyst • Power BI, DAX, SQL, Python &amp; Automation
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Resume</span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            >
              <span>Contact Priyanshu</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Priyanshu Kumar. Portfolio &amp; Project Case Studies.
          </div>
          <div className="flex items-center gap-4">
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              LinkedIn
            </a>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              GitHub
            </a>
            <a href={`mailto:${profileData.email}`} className="hover:text-cyan-400 transition">
              {profileData.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
