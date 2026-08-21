import React, { useState } from 'react';
import { 
  Briefcase, 
  BarChart3, 
  GitMerge, 
  CheckCircle2, 
  FileText, 
  Users, 
  Cpu
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const DualRoleBridge: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stages = [
    {
      step: "01",
      title: "Requirements & Process Logic",
      side: "Business Analysis",
      icon: Users,
      description:
        "Engages directly with business stakeholders and process owners to elicit domain logic, identify operational bottlenecks, and translate needs into structured specification documents.",
      deliverables: ["Automation Spec Documents", "BRD & FRD Artifacts", "Stakeholder Priority Alignment"]
    },
    {
      step: "02",
      title: "Agile Sprints & Ticket Pipeline",
      side: "Agile Delivery",
      icon: Briefcase,
      description:
        "Participates actively in sprint calls, standups, and backlog grooming. Manages tickets in Shortcut to track updates, scope shifts, and development tasks across cross-functional developers.",
      deliverables: ["Shortcut Ticket Tracking", "Sprint Velocity Alignment", "Cross-Functional Sync"]
    },
    {
      step: "03",
      title: "BOT Validation & Discrepancy QA",
      side: "Data Quality & UAT",
      icon: Cpu,
      description:
        "Validates RPA development by running UiPath bots, producing BOT output datasets, and systematically reconciling them against manual reference benchmarks to catch anomalies before Prod release.",
      deliverables: ["UiPath BOT Execution QA", "Discrepancy Root Cause Analysis", "Dev & Prod UAT Sign-off"]
    },
    {
      step: "04",
      title: "Power BI, DAX & SQL Intelligence",
      side: "Data Analytics",
      icon: BarChart3,
      description:
        "Transforms validated operational data into multi-page Power BI reports and SQL data models. Implements advanced DAX measures, time-intelligence calculations, and synced slicers.",
      deliverables: ["Monthly / Quarterly Dashboards", "DAX Calculated Measures", "Decision-Ready Visuals"]
    },
    {
      step: "05",
      title: "SOP Standardization & Knowledge Transfer",
      side: "Continuous Improvement",
      icon: FileText,
      description:
        "Prepares comprehensive Standard Operating Procedure (SOP) documentation to institutionalize automation workflows, onboard team members, and ensure frictionless operational handoffs.",
      deliverables: ["Process SOPs", "Training Documentation", "Operational Playbooks"]
    }
  ];

  return (
    <section className={`py-16 sm:py-20 border-y transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f1d] border-slate-800' : 'bg-slate-100/70 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
            isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
          }`}>
            <GitMerge className="w-3.5 h-3.5" />
            <span>End-to-End Analytical Spectrum</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            How I Bridge Business Strategy &amp; Data Engineering
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            A structured, repeatable workflow connecting stakeholder problem definitions, RPA automation validation, and executive dashboard delivery.
          </p>
        </div>

        {/* Workflow Pipeline Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className={`p-3 sm:p-4 rounded-xl text-left border transition flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-slate-900 border-sky-400 shadow-lg ring-1 ring-sky-400/30' 
                      : 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                    : isDark 
                      ? 'bg-slate-900/90 border-slate-800 hover:bg-slate-900 hover:border-slate-700' 
                      : 'bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${
                    isActive ? (isDark ? 'text-sky-400' : 'text-blue-600') : (isDark ? 'text-slate-400' : 'text-slate-500')
                  }`} />
                </div>
                <div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stage.side}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold mt-0.5 line-clamp-1 ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}>
                    {stage.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className={`rounded-xl p-6 sm:p-8 border shadow-sm transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${
                  isDark ? 'bg-blue-950 text-sky-400 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  Phase {stages[activeStage].step} • {stages[activeStage].side}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {stages[activeStage].title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {stages[activeStage].description}
              </p>
            </div>

            {/* Key Deliverables Pill Box */}
            <div className={`rounded-lg p-4 sm:p-5 space-y-2.5 border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              <span className={`text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                Key Deliverables &amp; Outputs
              </span>
              <div className="space-y-1.5">
                {stages[activeStage].deliverables.map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isDark ? 'bg-sky-400' : 'bg-blue-600'
                    }`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
