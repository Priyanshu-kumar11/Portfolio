import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen, CheckCircle } from 'lucide-react';
import { education } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const edu = education[0];

  return (
    <section id="education" className="py-16 sm:py-24 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Education &amp; Core Foundations
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Rigorous Computer Science training grounding data analysis in computational logic, database architecture, and software engineering.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl glass-card-hover">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {edu.degree}
                </h3>
                <div className="text-sm font-medium text-cyan-400 mt-0.5">
                  {edu.institution}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Badge */}
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <div className="text-xs text-slate-400 font-medium">Graduation Grade</div>
              <div className="text-lg font-extrabold text-emerald-400 font-display">
                {edu.score}
              </div>
            </div>
          </div>

          {/* Core Foundations & Coursework */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Relevant Coursework &amp; Technical Curriculum
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {edu.coursework?.map((course, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
