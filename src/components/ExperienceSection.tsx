import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  Briefcase, 
  BarChart3, 
  Tag 
} from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const ExperienceSection: React.FC = () => {
  const exp = experiences[0];
  const [activeTab, setActiveTab] = useState<'all' | 'rpa' | 'agile' | 'bi'>('all');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <section id="experience" className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
            isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
          }`}>
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Work Experience</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Industry Experience &amp; Impact
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Hands-on expertise leading requirements elicitation, BOT validation pipelines, and business dashboard reporting.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className={`max-w-4xl mx-auto rounded-xl p-6 sm:p-8 border shadow-sm transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
        }`}>
          {/* Header Row */}
          <div className={`flex flex-wrap items-start justify-between gap-4 border-b pb-5 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className={`text-xl sm:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {exp.role}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isDark ? 'bg-blue-950 text-sky-400 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {exp.type}
                </span>
              </div>

              <div className={`flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs sm:text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <span className={`flex items-center gap-1 font-semibold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  <Building2 className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className={`text-xs font-mono px-2.5 py-1 rounded-md border font-semibold ${
                isDark ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                Dev &amp; Prod UAT Lead
              </span>
            </div>
          </div>

          {/* Summary paragraph */}
          <p className={`text-xs sm:text-sm leading-relaxed my-4 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {exp.summary}
          </p>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-5 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Responsibilities ({exp.responsibilities.length})
            </button>
            <button
              onClick={() => setActiveTab('rpa')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rpa'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              UiPath &amp; BOT Validation
            </button>
            <button
              onClick={() => setActiveTab('agile')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'agile'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Requirements &amp; Shortcut
            </button>
            <button
              onClick={() => setActiveTab('bi')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'bi'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboards &amp; SOPs
            </button>
          </div>

          {/* Responsibilities list */}
          <div className="space-y-2.5">
            {(activeTab === 'all' ? exp.responsibilities : activeTab === 'rpa' ? rpaPoints : activeTab === 'agile' ? agilePoints : biPoints).map((resp, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm leading-relaxed transition ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                  isDark ? 'text-sky-400' : 'text-blue-600'
                }`} />
                <span>{resp}</span>
              </div>
            ))}
          </div>

          {/* Tools & Technologies Used Footer */}
          <div className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <span className={`text-xs font-semibold mr-1 flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Tag className="w-3.5 h-3.5" />
              Environment Tools:
            </span>
            {exp.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className={`text-xs px-2.5 py-0.5 rounded-md font-medium border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-800 border-slate-200 shadow-sm'
                }`}
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
