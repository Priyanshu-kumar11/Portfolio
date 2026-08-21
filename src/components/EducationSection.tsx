import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle } from 'lucide-react';
import { education } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const EducationSection: React.FC = () => {
  const edu = education[0];
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="education" className={`py-16 sm:py-20 border-y transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f1d]/75 border-slate-800' : 'bg-slate-50/65 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-slate-200 text-blue-700 shadow-sm'
          }`}>
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Education &amp; Core Foundations
          </h2>
          <p className={`text-sm sm:text-base ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Rigorous Computer Science training grounding data analysis in computational logic, database architecture, and software engineering.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className={`max-w-3xl mx-auto rounded-xl p-6 sm:p-8 border shadow-sm transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
        }`}>
          <div className={`flex flex-wrap items-start justify-between gap-4 border-b pb-5 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0 border ${
                isDark 
                  ? 'bg-blue-950 text-sky-400 border-blue-800' 
                  : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg sm:text-xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  {edu.degree}
                </h3>
                <div className={`text-sm font-semibold mt-0.5 ${
                  isDark ? 'text-sky-400' : 'text-blue-800'
                }`}>
                  {edu.institution}
                </div>
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Badge */}
            <div className={`px-3.5 py-2 rounded-lg border text-right ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                CGPA
              </div>
              <div className={`text-lg font-extrabold ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                {edu.score}
              </div>
            </div>
          </div>

          {/* Core Foundations & Coursework */}
          <div className="mt-5 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              <BookOpen className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
              Relevant Coursework &amp; Technical Curriculum
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {edu.coursework?.map((course, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border font-medium ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-slate-200' 
                      : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${
                    isDark ? 'text-sky-400' : 'text-blue-600'
                  }`} />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
