import React, { useState } from 'react';
import { Sparkles, BarChart3, TrendingUp } from 'lucide-react';
import { CryptoDashboardDemo } from './InteractiveDemos/CryptoDashboardDemo';
import { HRAttritionDemo } from './InteractiveDemos/HRAttritionDemo';
import { useTheme } from '../context/ThemeContext';

export const InteractiveDemosSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'crypto' | 'hr'>('crypto');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="interactive-demos" className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#080d1a]/80 border-slate-800' : 'bg-slate-50/65 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
            isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Simulators</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Test Drive Priyanshu's Analytics Live
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Directly interact with the data pipelines, calculation engines, and slicers without leaving your browser.
          </p>
        </div>

        {/* Demo Switcher Tabs */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex p-1 rounded-xl border max-w-xl w-full ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/80 border-slate-300'
          }`}>
            <button
              onClick={() => setActiveDemo('crypto')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeDemo === 'crypto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Crypto API &amp; Automation</span>
            </button>
            <button
              onClick={() => setActiveDemo('hr')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeDemo === 'hr'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Power BI HR Report</span>
            </button>
          </div>
        </div>

        {/* Active Simulator Container */}
        <div className="max-w-5xl mx-auto">
          {activeDemo === 'crypto' ? (
            <CryptoDashboardDemo />
          ) : (
            <HRAttritionDemo />
          )}
        </div>
      </div>
    </section>
  );
};
