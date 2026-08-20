import React, { useState } from 'react';
import { 
  BarChart3, 
  Code, 
  ExternalLink, 
  Github, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  TrendingUp, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { CryptoDashboardDemo } from './InteractiveDemos/CryptoDashboardDemo';
import { HRAttritionDemo } from './InteractiveDemos/HRAttritionDemo';

interface Props {
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
}

export const ProjectsSection: React.FC<Props> = ({ roleFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDemoProject, setActiveDemoProject] = useState<string | null>(null);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    // Role filter synergy
    if (roleFilter === 'data-analyst' && project.category === 'business-analysis') return false;
    if (roleFilter === 'business-analyst' && project.category === 'automation' && project.id !== 'rpa-bot-validation-analytics') return false;
    
    // Category pill filter
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Featured Analytics &amp; Automation Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Data Solutions &amp; Analytical Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Interactive dashboards, DAX measures, and Google Apps Script API integrations built to automate workflows and drive decision accuracy.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('data-analytics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === 'data-analytics'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Data Analytics &amp; Power BI
            </button>
            <button
              onClick={() => setSelectedCategory('automation')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === 'automation'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Spreadsheet Automation &amp; APIs
            </button>
            <button
              onClick={() => setSelectedCategory('business-analysis')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === 'business-analysis'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              RPA &amp; UAT Analysis
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/90 border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between glass-card-hover group"
            >
              <div>
                {/* Project Image & Live Badge Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                  {/* Background Image (Easily replaceable) */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
                    onError={(e) => {
                      // Fallback gradient if external asset fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />

                  {/* Gradient Overlay for high text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 text-xs font-semibold border border-cyan-500/30 shadow-lg">
                      {project.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Live Simulation Action in Image Banner */}
                  {project.demoType !== 'none' && (
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => setActiveDemoProject(project.id)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 transition active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Launch Interactive Demo</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-300 transition">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights from Resume */}
                  <div className="space-y-2 pt-2">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Metrics Box */}
                  <div className="grid grid-cols-3 gap-2 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80 text-center">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="px-2">
                        <div className="text-sm sm:text-base font-bold text-cyan-400 font-display">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
                      title="Open Live Google Spreadsheet in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Sheet</span>
                    </a>
                  )}
                  {project.codeSnippet && (
                    <button
                      onClick={() => setActiveCodeSnippet(project)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoType !== 'none' && (
                    <button
                      onClick={() => setActiveDemoProject(project.id)}
                      className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1"
                    >
                      <span>Simulate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Snippet Modal */}
        {activeCodeSnippet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
              <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-sm">
                    {activeCodeSnippet.codeSnippet?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCodeSnippet(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-cyan-300 bg-slate-950">
                <pre className="leading-relaxed whitespace-pre-wrap">
                  {activeCodeSnippet.codeSnippet?.code}
                </pre>
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    if (activeCodeSnippet.codeSnippet) {
                      navigator.clipboard.writeText(activeCodeSnippet.codeSnippet.code);
                    }
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition"
                >
                  Copy Snippet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Simulator Modal */}
        {activeDemoProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-5xl my-auto">
              {activeDemoProject === 'crypto-portfolio-automation' && (
                <CryptoDashboardDemo onClose={() => setActiveDemoProject(null)} />
              )}
              {activeDemoProject === 'hr-employee-attrition-dashboard' && (
                <HRAttritionDemo onClose={() => setActiveDemoProject(null)} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
