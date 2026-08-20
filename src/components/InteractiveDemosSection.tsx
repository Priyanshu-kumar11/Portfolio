import React, { useState } from 'react';
import { Play, Sparkles, BarChart3, TrendingUp, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CryptoDashboardDemo } from './InteractiveDemos/CryptoDashboardDemo';
import { HRAttritionDemo } from './InteractiveDemos/HRAttritionDemo';

export const InteractiveDemosSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'crypto' | 'hr'>('crypto');

  return (
    <section id="interactive-demos" className="py-16 sm:py-24 bg-slate-900/50 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Simulators</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Test Drive Priyanshu's Analytics Live
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Directly interact with the data pipelines, calculation engines, and slicers without leaving your browser.
          </p>
        </div>

        {/* Demo Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 max-w-xl w-full">
            <button
              onClick={() => setActiveDemo('crypto')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                activeDemo === 'crypto'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Crypto API &amp; Automation Engine</span>
            </button>
            <button
              onClick={() => setActiveDemo('hr')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                activeDemo === 'hr'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Power BI HR Attrition Report</span>
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
