/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgressBar, CustomCursor } from './components/ScrollProgressBar';
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
import { CodeExplorerModal } from './components/CodeExplorerModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCodeExplorerOpen, setIsCodeExplorerOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<'all' | 'data-analyst' | 'business-analyst'>('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Scroll indicator bar */}
      <ScrollProgressBar />

      {/* Ambient cursor spotlight on desktop fine-pointer devices */}
      <CustomCursor />

      {/* Main sticky navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      {/* Main content sections */}
      <main className="flex-1">
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
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
      />

      {/* Modal Dialogs */}
      <InteractiveResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CodeExplorerModal
        isOpen={isCodeExplorerOpen}
        onClose={() => setIsCodeExplorerOpen(false)}
      />
    </div>
  );
}
