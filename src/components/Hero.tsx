import React, { useState } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  CheckCircle2, 
  Download, 
  FileText, 
  Layers, 
  Mail, 
  Sparkles, 
  Terminal, 
  TrendingUp,
  Cpu,
  Database
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface Props {
  onOpenResume: () => void;
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
  setRoleFilter: (filter: 'all' | 'data-analyst' | 'business-analyst') => void;
}

export const Hero: React.FC<Props> = ({ onOpenResume, roleFilter, setRoleFilter }) => {
  const [activePitch, setActivePitch] = useState<'da' | 'ba' | 'synergy'>('synergy');

  return (
    <section id="overview" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden glow-mesh-bg">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-400">Associate @ Fusion Business Solution</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Open to Data & Business Analyst Opportunities</span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Turning Raw Data &amp; Business Logic Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Decision-Ready Insights.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
              Hi, I’m <strong className="text-white font-semibold">{profileData.name}</strong>. I bridge the critical divide between stakeholder requirements, agile sprints, and high-performance BI analytics using Power BI, DAX, SQL, and automation.
            </p>
          </div>

          {/* Dual Profile Interactive Spotlight Switcher */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md max-w-xl mx-auto">
              <button
                id="hero-synergy-btn"
                onClick={() => {
                  setActivePitch('synergy');
                  setRoleFilter('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePitch === 'synergy'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                The Dual Synergy (DA + BA)
              </button>

              <button
                id="hero-da-btn"
                onClick={() => {
                  setActivePitch('da');
                  setRoleFilter('data-analyst');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePitch === 'da'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                As Data Analyst
              </button>

              <button
                id="hero-ba-btn"
                onClick={() => {
                  setActivePitch('ba');
                  setRoleFilter('business-analyst');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePitch === 'ba'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                As Business Analyst
              </button>
            </div>

            {/* Dynamic Pitch Card based on selected tab */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 max-w-2xl mx-auto text-left transition-all">
              {activePitch === 'synergy' && (
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      The Complete Analytical Lifecycle
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      I don't just build dashboards in isolation. I gather the exact process logic from stakeholders, map requirements in Agile sprint calls, validate BOT outputs during UAT, and translate those into verified Power BI & SQL reporting suites.
                    </p>
                  </div>
                </div>
              )}

              {activePitch === 'da' && (
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Data Modeling &amp; Quantitative Rigor
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Skilled in Power BI, DAX measures (CALCULATE, time intelligence, dynamic ranking), SQL (MySQL queries & subqueries), Python (Pandas/NumPy), and Google Apps Script automated pipeline logging.
                    </p>
                  </div>
                </div>
              )}

              {activePitch === 'ba' && (
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Requirements Elicitation &amp; Delivery Management
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Proven track record conducting stakeholder meetings, authoring Automation Spec and SOP documentation, tracking sprint tickets in Shortcut, and running discrepancy root-cause analysis during UAT.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              id="hero-explore-projects-cta"
              href="#projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition flex items-center gap-2"
            >
              <span>Explore Projects &amp; Live Demos</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              id="hero-view-resume-cta"
              onClick={onOpenResume}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-bold text-sm transition active:scale-95 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View &amp; Print Resume</span>
            </button>

            <a
              id="hero-contact-cta"
              href="#contact"
              className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm font-medium transition"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Highlight Stats Grid */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card-hover">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
              7.69<span className="text-base text-slate-400 font-sans">/10</span>
            </div>
            <div className="text-xs font-bold text-slate-200 mt-1">B.Tech (CSE) Degree</div>
            <div className="text-[11px] text-slate-400 mt-0.5">BBDITM Lucknow (2021-2025)</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card-hover">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
              100%
            </div>
            <div className="text-xs font-bold text-slate-200 mt-1">UAT &amp; BOT Validation</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Dev &amp; Prod Verification</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card-hover">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-display">
              M / Q / Y
            </div>
            <div className="text-xs font-bold text-slate-200 mt-1">Business Dashboards</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Monthly, Quarterly &amp; Yearly</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card-hover">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
              Power BI &amp; SQL
            </div>
            <div className="text-xs font-bold text-slate-200 mt-1">DAX, Python, Apps Script</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Automated Data Pipelines</div>
          </div>
        </div>
      </div>
    </section>
  );
};
