/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { DataBusinessBackground } from './components/DataBusinessBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DualRoleBridge } from './components/DualRoleBridge';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveDemosSection } from './components/InteractiveDemosSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveResumeModal } from './components/InteractiveResumeModal';

function AppContent() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<'all' | 'data-analyst' | 'business-analyst'>('all');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white' 
        : 'bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white'
    }`}>
      {/* Background data network canvas */}
      <DataBusinessBackground />

      {/* Scroll indicator bar */}
      <ScrollProgressBar />

      {/* Main sticky navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      {/* Main content sections */}
      <main className="flex-1 relative z-10">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
        
        <DualRoleBridge />
        
        <ExperienceSection />
        
        <ProjectsSection roleFilter={roleFilter} />
        
        <InteractiveDemosSection />
        
        <SkillsSection roleFilter={roleFilter} />
        
        <EducationSection />
        
        <ContactSection />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>

      {/* Modal Dialog */}
      <InteractiveResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
