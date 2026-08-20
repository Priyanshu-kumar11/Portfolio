import React, { useState } from 'react';
import { 
  Briefcase, 
  BarChart3, 
  GitMerge, 
  CheckCircle2, 
  FileText, 
  Layers, 
  ArrowRight, 
  Users, 
  Database, 
  Cpu, 
  Activity, 
  Sparkles 
} from 'lucide-react';

export const DualRoleBridge: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      step: "01",
      title: "Requirements & Process Logic",
      side: "Business Analysis",
      icon: Users,
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description:
        "Engages directly with business stakeholders and process owners to elicit domain logic, identify operational bottlenecks, and translate needs into structured specification documents.",
      deliverables: ["Automation Spec Documents", "BRD & FRD Artifacts", "Stakeholder Priority Alignment"]
    },
    {
      step: "02",
      title: "Agile Sprints & Ticket Pipeline",
      side: "Agile Delivery",
      icon: Briefcase,
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      description:
        "Participates actively in sprint calls, standups, and backlog grooming. Manages tickets in Shortcut to track updates, scope shifts, and development tasks across cross-functional developers.",
      deliverables: ["Shortcut Ticket Tracking", "Sprint Velocity Alignment", "Cross-Functional Sync"]
    },
    {
      step: "03",
      title: "BOT Validation & Discrepancy QA",
      side: "Data Quality & UAT",
      icon: Cpu,
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      description:
        "Validates RPA development by running UiPath bots, producing BOT output datasets, and systematically reconciling them against manual reference benchmarks to catch anomalies before Prod release.",
      deliverables: ["UiPath BOT Execution QA", "Discrepancy Root Cause Analysis", "Dev & Prod UAT Sign-off"]
    },
    {
      step: "04",
      title: "Power BI, DAX & SQL Intelligence",
      side: "Data Analytics",
      icon: BarChart3,
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      description:
        "Transforms validated operational data into multi-page Power BI reports and SQL data models. Implements advanced DAX measures, time-intelligence calculations, and synced slicers.",
      deliverables: ["Monthly / Quarterly Dashboards", "DAX Calculated Measures", "Decision-Ready Visuals"]
    },
    {
      step: "05",
      title: "SOP Standardization & Knowledge Transfer",
      side: "Continuous Improvement",
      icon: FileText,
      badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
      description:
        "Prepares comprehensive Standard Operating Procedure (SOP) documentation to institutionalize automation workflows, onboard team members, and ensure frictionless operational handoffs.",
      deliverables: ["Process SOPs", "Training Documentation", "Operational Playbooks"]
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
            <GitMerge className="w-3.5 h-3.5" />
            <span>The End-to-End Analytical Spectrum</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            How I Bridge Business Strategy &amp; Data Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A seamless workflow connecting stakeholder problem definitions, RPA automation validation, and executive dashboard delivery.
          </p>
        </div>

        {/* Workflow Pipeline Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className={`p-3 sm:p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${stage.badgeColor}`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                    {stage.side}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                    {stage.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${stages[activeStage].badgeColor}`}>
                  Step {stages[activeStage].step} • {stages[activeStage].side}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {stages[activeStage].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {stages[activeStage].description}
              </p>
            </div>

            {/* Key Deliverables Pill Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Key Deliverables &amp; Outputs
              </span>
              <div className="space-y-2">
                {stages[activeStage].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
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
