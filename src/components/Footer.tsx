import React from 'react';
import { FileText, ArrowUp } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onOpenResume: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-10 text-xs transition-colors duration-300 ${
      isDark ? 'bg-[#080c16] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="space-y-1 text-center md:text-left">
            <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {profileData.name}
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Data &amp; Business Analyst • Power BI, DAX, SQL, Python &amp; Automation
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={onOpenResume}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
              <span>Full Resume</span>
            </button>

            <a
              href="#contact"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              <span>Contact</span>
            </a>

            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
          isDark ? 'text-slate-500' : 'text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} Priyanshu Kumar. Portfolio &amp; Project Case Studies.
          </div>
          <div className="flex items-center gap-4">
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className={`transition ${
              isDark ? 'hover:text-sky-400' : 'hover:text-blue-700'
            }`}>
              LinkedIn
            </a>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className={`transition ${
              isDark ? 'hover:text-sky-400' : 'hover:text-blue-700'
            }`}>
              GitHub
            </a>
            <a href={`mailto:${profileData.email}`} className={`transition ${
              isDark ? 'hover:text-sky-400' : 'hover:text-blue-700'
            }`}>
              {profileData.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
