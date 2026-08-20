import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Briefcase, 
  BarChart3, 
  FileText, 
  Sparkles, 
  Tag 
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const exp = experiences[0];
  const [activeTab, setActiveTab] = useState<'all' | 'rpa' | 'agile' | 'bi'>('all');

  const rpaPoints = [
    exp.responsibilities[3], // Validated RPA Team's automation...
    exp.responsibilities[4], // Identified discrepancies...
    exp.responsibilities[5]  // Tested and verified BOT automations...
  ];

  const agilePoints = [
    exp.responsibilities[0], // Requirements gathering...
    exp.responsibilities[1], // Sprint calls...
    exp.responsibilities[2]  // Shortcut tickets...
  ];

  const biPoints = [
    exp.responsibilities[6], // Monthly, quarterly, yearly dashboards...
    exp.responsibilities[7]  // SOP documentation...
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Work Experience</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Industry Experience &amp; Impact
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Hands-on expertise leading requirements elicitation, BOT validation pipelines, and business dashboard reporting.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient corner accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {exp.role}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
                  {exp.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-1 text-slate-200 font-medium">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Quick summary pill */}
            <div className="text-left sm:text-right">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Dev &amp; Prod UAT Lead
              </span>
            </div>
          </div>

          {/* Summary paragraph */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-5">
            {exp.summary}
          </p>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Responsibilities ({exp.responsibilities.length})
            </button>
            <button
              onClick={() => setActiveTab('rpa')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                activeTab === 'rpa'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              UiPath &amp; BOT Validation
            </button>
            <button
              onClick={() => setActiveTab('agile')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                activeTab === 'agile'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Requirements &amp; Shortcut
            </button>
            <button
              onClick={() => setActiveTab('bi')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                activeTab === 'bi'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboards &amp; SOPs
            </button>
          </div>

          {/* Responsibilities list */}
          <div className="space-y-3">
            {(activeTab === 'all' ? exp.responsibilities : activeTab === 'rpa' ? rpaPoints : activeTab === 'agile' ? agilePoints : biPoints).map((resp, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs sm:text-sm text-slate-300 leading-relaxed hover:border-slate-700 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            ))}
          </div>

          {/* Tools & Technologies Used Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Environment Tools:
            </span>
            {exp.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
