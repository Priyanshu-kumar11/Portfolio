import React, { useState } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  Database
} from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onOpenResume: () => void;
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
  setRoleFilter: (filter: 'all' | 'data-analyst' | 'business-analyst') => void;
}

export const Hero: React.FC<Props> = ({ onOpenResume, roleFilter, setRoleFilter }) => {
  const [activePitch, setActivePitch] = useState<'da' | 'ba' | 'synergy'>('synergy');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="overview" className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Status pill */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm transition ${
            isDark 
              ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
              : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className={isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-700 font-semibold'}>
              Associate @ Fusion Business Solution
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Open to Data &amp; Business Analyst Roles
            </span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-4">
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Transforming Complex Data &amp; Business Processes Into{' '}
              <span className={isDark ? 'text-sky-400' : 'text-blue-700'}>
                Decision-Ready Insights.
              </span>
            </h1>
            <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Hi, I’m <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>{profileData.name}</strong>. I combine business analysis rigor (stakeholder requirements, agile sprint management, and UAT validation) with advanced analytical execution (Power BI, DAX, SQL, and automation).
            </p>
          </div>

          {/* Dual Profile Interactive Spotlight Switcher */}
          <div className="pt-2">
            <div className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl border max-w-xl mx-auto ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                id="hero-synergy-btn"
                onClick={() => {
                  setActivePitch('synergy');
                  setRoleFilter('all');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePitch === 'synergy'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Combined Synergy (DA + BA)
              </button>

              <button
                id="hero-da-btn"
                onClick={() => {
                  setActivePitch('da');
                  setRoleFilter('data-analyst');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePitch === 'da'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
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
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePitch === 'ba'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                As Business Analyst
              </button>
            </div>

            {/* Dynamic Pitch Card based on selected tab */}
            <div className={`mt-4 p-4 sm:p-5 rounded-xl border max-w-2xl mx-auto text-left transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {activePitch === 'synergy' && (
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-blue-950 text-sky-400 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      End-to-End Delivery &amp; Analytics
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      I align business priorities in sprint calls, document exact process specs, validate BOT execution during UAT, and engineer high-performance Power BI &amp; SQL reporting suites.
                    </p>
                  </div>
                </div>
              )}

              {activePitch === 'da' && (
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-blue-950 text-sky-400 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Data Modeling, DAX &amp; Quantitative Analytics
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Skilled in Power BI, DAX measures (CALCULATE, time intelligence, dynamic rankings), SQL (MySQL/PostgreSQL), Python (Pandas/NumPy), and automated Google Apps Script workflows.
                    </p>
                  </div>
                </div>
              )}

              {activePitch === 'ba' && (
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-blue-950 text-sky-400 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Requirements Elicitation &amp; Delivery Alignment
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Experienced conducting stakeholder meetings, writing Automation Spec and SOP documentation, tracking sprint tickets in Shortcut, and running discrepancy root-cause analysis during UAT.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              id="hero-explore-projects-cta"
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-sm active:scale-95 transition flex items-center gap-2"
            >
              <span>Explore Projects &amp; Live Demos</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              id="hero-view-resume-cta"
              onClick={onOpenResume}
              className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border transition active:scale-95 flex items-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <FileText className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
              <span>View &amp; Export Resume</span>
            </button>

            <a
              id="hero-contact-cta"
              href="#contact"
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition ${
                isDark 
                  ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Highlight Executive Metric Cards */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className={`p-4 sm:p-5 rounded-xl border transition ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-sky-400' : 'text-blue-700'}`}>
              7.69<span className={`text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/10 CGPA</span>
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              B.Tech Computer Science
            </div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              BBDITM Lucknow (2021-2025)
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl border transition ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              100%
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              UAT &amp; BOT Validation
            </div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Dev &amp; Prod Verification
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl border transition ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              M / Q / Y
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Business Dashboards
            </div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Monthly, Quarterly &amp; Yearly
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl border transition ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              Power BI &amp; SQL
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              DAX, Python, Apps Script
            </div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Automated Data Pipelines
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
