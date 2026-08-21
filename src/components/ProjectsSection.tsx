import React, { useState } from 'react';
import { 
  BarChart3, 
  Code, 
  ExternalLink, 
  Github, 
  Play, 
  CheckCircle2, 
  ChevronRight,
  X
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { CryptoDashboardDemo } from './InteractiveDemos/CryptoDashboardDemo';
import { HRAttritionDemo } from './InteractiveDemos/HRAttritionDemo';
import { useTheme } from '../context/ThemeContext';
import { Card3D } from './Card3D';

interface Props {
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
}

export const ProjectsSection: React.FC<Props> = ({ roleFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDemoProject, setActiveDemoProject] = useState<string | null>(null);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<Project | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filteredProjects = projects.filter((project) => {
    if (roleFilter === 'data-analyst' && project.category === 'business-analysis') return false;
    if (roleFilter === 'business-analyst' && project.category === 'automation' && project.id !== 'rpa-bot-validation-analytics') return false;
    
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className={`py-16 sm:py-20 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f1d]' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
              isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
            }`}>
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Featured Analytics &amp; Automation Portfolio</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Data Solutions &amp; Analytical Systems
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Interactive dashboards, DAX measures, and Google Apps Script API integrations built to automate workflows and drive decision accuracy.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('data-analytics')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedCategory === 'data-analytics'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              Data Analytics &amp; Power BI
            </button>
            <button
              onClick={() => setSelectedCategory('automation')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedCategory === 'automation'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              Spreadsheet Automation &amp; APIs
            </button>
            <button
              onClick={() => setSelectedCategory('business-analysis')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedCategory === 'business-analysis'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white' : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              RPA &amp; UAT Analysis
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <Card3D key={project.id} intensity={8} depth={10} className="h-full">
              <div
                className={`rounded-xl overflow-hidden border shadow-sm flex flex-col justify-between h-full transition group ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Project Image & Live Badge Banner */}
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-70"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-slate-900 via-slate-900/60' : 'from-slate-950/90 via-slate-950/40'
                    } to-transparent`} />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3.5 left-3.5 flex gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-950/90 text-slate-200 text-[11px] font-semibold border border-slate-700">
                        {project.category.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Live Simulation Action in Image Banner */}
                    {project.demoType !== 'none' && (
                      <div className="absolute bottom-3.5 right-3.5">
                        <button
                          onClick={() => setActiveDemoProject(project.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Interactive Demo</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-bold transition ${
                        isDark ? 'text-white group-hover:text-sky-400' : 'text-slate-950 group-hover:text-blue-700'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-xs font-mono mt-0.5 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {project.subtitle}
                      </p>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {project.description}
                    </p>

                    {/* Key Highlights from Resume */}
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className={`flex items-start gap-2.5 text-xs leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isDark ? 'text-sky-400' : 'text-blue-600'
                          }`} />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impact Metrics Box */}
                    <div className={`grid grid-cols-3 gap-2 py-2.5 rounded-lg border text-center ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                    }`}>
                      {project.impactMetrics.map((metric, i) => (
                        <div key={i} className="px-1">
                          <div className={`text-sm sm:text-base font-extrabold ${
                            isDark ? 'text-sky-400' : 'text-blue-700'
                          }`}>
                            {metric.value}
                          </div>
                          <div className={`text-[10px] truncate font-medium ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
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
                          className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                            isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className={`p-5 sm:p-6 pt-0 border-t mt-3 flex items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-semibold flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border transition ${
                          isDark 
                            ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800 hover:bg-emerald-900/40' 
                            : 'text-emerald-800 bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Sheet</span>
                      </a>
                    )}
                    {project.codeSnippet && (
                      <button
                        onClick={() => setActiveCodeSnippet(project)}
                        className={`text-xs font-semibold flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border transition cursor-pointer ${
                          isDark
                            ? 'text-sky-400 bg-blue-950/40 border-blue-800 hover:bg-blue-900/40'
                            : 'text-blue-800 bg-blue-50 border-blue-300 hover:bg-blue-100'
                        }`}
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
                        className={`p-2 rounded-lg border transition ${
                          isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-xs'
                        }`}
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoType !== 'none' && (
                      <button
                        onClick={() => setActiveDemoProject(project.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition flex items-center gap-1 cursor-pointer ${
                          isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white' : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 shadow-xs'
                        }`}
                      >
                        <span>Simulate</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Code Snippet Modal */}
        {activeCodeSnippet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className={`relative w-full max-w-3xl rounded-xl border shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <Code className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                  <h3 className={`font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeCodeSnippet.codeSnippet?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCodeSnippet(null)}
                  className={`p-1 rounded-md transition ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className={`p-5 overflow-y-auto flex-1 font-mono text-xs ${
                isDark ? 'text-sky-300 bg-slate-950' : 'text-slate-800 bg-slate-50'
              }`}>
                <pre className="leading-relaxed whitespace-pre-wrap">
                  {activeCodeSnippet.codeSnippet?.code}
                </pre>
              </div>

              <div className={`p-3.5 border-t flex justify-end ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  onClick={() => {
                    if (activeCodeSnippet.codeSnippet) {
                      navigator.clipboard.writeText(activeCodeSnippet.codeSnippet.code);
                    }
                  }}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition shadow-sm"
                >
                  Copy Snippet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Simulator Modal */}
        {activeDemoProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
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
