import React, { useState } from 'react';
import { 
  Code2, 
  BarChart3, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  Search, 
  Cpu, 
  Layers, 
  Sliders 
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

interface Props {
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
}

export const SkillsSection: React.FC<Props> = ({ roleFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = skillCategories.filter((cat) => {
    if (roleFilter === 'data-analyst') {
      if (cat.categoryName === 'Business Analysis & Delivery') return false;
    }
    if (roleFilter === 'business-analyst') {
      if (cat.categoryName === 'Programming, SQL & Automation' && !searchTerm) return false;
    }
    if (selectedCategory !== 'all' && cat.categoryName !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Technical &amp; Analytical Competencies</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Skills &amp; Technology Stack
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Proficiencies across Business Analysis, Data Visualization, ETL Data Modeling, RPA validation, and Modern AI tools.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g., DAX, SQL, UiPath)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const matchingSkills = category.skills.filter(
              (s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            if (matchingSkills.length === 0 && searchTerm) return null;

            return (
              <div
                key={category.categoryName}
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between glass-card-hover"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                      {idx === 0 && <BarChart3 className="w-5 h-5" />}
                      {idx === 1 && <Briefcase className="w-5 h-5" />}
                      {idx === 2 && <CheckCircle2 className="w-5 h-5" />}
                      {idx === 3 && <Code2 className="w-5 h-5" />}
                      {idx === 4 && <Sparkles className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {category.categoryName}
                      </h3>
                      <span className="text-[11px] text-slate-400">
                        {category.skills.length} core competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills with animated meters */}
                  <div className="space-y-3.5">
                    {matchingSkills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                            {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                            {skill.name}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {skill.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 border border-slate-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
