import React, { useState } from 'react';
import { 
  Code2, 
  BarChart3, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Sliders 
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Card3D } from './Card3D';

interface Props {
  roleFilter: 'all' | 'data-analyst' | 'business-analyst';
}

export const SkillsSection: React.FC<Props> = ({ roleFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filteredCategories = skillCategories.filter((cat) => {
    if (roleFilter === 'data-analyst') {
      if (cat.categoryName === 'Business Analysis & Delivery') return false;
    }
    if (roleFilter === 'business-analyst') {
      if (cat.categoryName === 'Programming, SQL & Automation' && !searchTerm) return false;
    }
    return true;
  });

  return (
    <section id="skills" className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19]/75 border-slate-800' : 'bg-white/60 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
              isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
            }`}>
              <Sliders className="w-3.5 h-3.5" />
              <span>Technical &amp; Analytical Competencies</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Skills &amp; Technology Stack
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Proficiencies across Business Analysis, Data Visualization, ETL Data Modeling, RPA validation, and Modern AI tools.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search skills (e.g., DAX, SQL, UiPath)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs transition border focus:outline-none ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                  : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-600 shadow-xs'
              }`}
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
              <Card3D key={category.categoryName} intensity={8} depth={10} className="h-full">
                <div
                  className={`rounded-xl p-5 sm:p-6 border shadow-sm flex flex-col justify-between h-full transition ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold border ${
                        isDark 
                          ? 'bg-blue-950 text-sky-400 border-blue-800' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {idx === 0 && <BarChart3 className="w-4 h-4" />}
                        {idx === 1 && <Briefcase className="w-4 h-4" />}
                        {idx === 2 && <CheckCircle2 className="w-4 h-4" />}
                        {idx === 3 && <Code2 className="w-4 h-4" />}
                        {idx === 4 && <Sparkles className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                          {category.categoryName}
                        </h3>
                        <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {category.skills.length} core competencies
                        </span>
                      </div>
                    </div>

                    <p className={`text-xs mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {category.description}
                    </p>

                    {/* Skills with meters */}
                    <div className="space-y-3">
                      {matchingSkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className={`font-semibold flex items-center gap-1.5 ${
                              isDark ? 'text-slate-200' : 'text-slate-900'
                            }`}>
                              {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                              {skill.name}
                            </span>
                            <span className={`font-mono font-medium text-[11px] ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                            isDark ? 'bg-slate-950' : 'bg-slate-200'
                          }`}>
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {skill.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                                  isDark 
                                    ? 'bg-slate-950 text-slate-300 border-slate-800' 
                                    : 'bg-white text-slate-800 border-slate-300'
                                }`}
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
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
