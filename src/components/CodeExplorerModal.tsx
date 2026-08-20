import React, { useState } from 'react';
import { X, FolderTree, Rocket, Code2, Image, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExplorerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'deployment' | 'structure' | 'images'>('deployment');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const projectFolderStructure = `
/ (Root)
├── index.html                    # SEO optimized HTML entry with Google Fonts
├── metadata.json                 # Project configuration & capabilities
├── package.json                  # Dependencies (React 19, Motion, Lucide, Tailwind 4)
├── tsconfig.json                 # TypeScript strict configuration
├── vite.config.ts                # Ultra-fast Vite bundler config
└── src/
    ├── main.tsx                  # Application bootstrap
    ├── App.tsx                   # Main root view with responsive state
    ├── index.css                 # Tailwind 4 utility layers & glassmorphism
    ├── types/
    │   └── index.ts              # TypeScript interfaces (Projects, Experience, Skills)
    ├── data/
    │   └── portfolioData.ts      # ⭐️ Single Source of Truth (Resume, Projects, Metrics)
    └── components/
        ├── Navbar.tsx            # Sticky navigation & role filter switcher
        ├── Hero.tsx              # Interactive Hero & dual-role spotlight
        ├── DualRoleBridge.tsx    # BA vs DA synergy architecture
        ├── ExperienceSection.tsx # Fusion Business Solution detailed timeline & UAT tabs
        ├── ProjectsSection.tsx   # Filterable cards with image slots & live demos
        ├── SkillsSection.tsx     # Categorized skill metrics & proficiency meters
        ├── EducationSection.tsx  # B.Tech CSE details & coursework
        ├── ContactSection.tsx    # Quick contact & message dispatcher
        ├── Footer.tsx            # Footer & social links
        ├── InteractiveResumeModal.tsx  # Print & PDF ready resume view
        └── InteractiveDemos/
            ├── CryptoDashboardDemo.tsx # Live CoinGecko API simulated engine
            └── HRAttritionDemo.tsx     # Power BI simulated DAX analytics
`.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Folder Structure & Zero-Config Deployment</h3>
              <p className="text-[11px] text-slate-400">Ready for Vercel, Netlify, Cloudflare & GitHub Pages</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950/50 px-4 sm:px-6 pt-2 border-b border-slate-800 flex gap-4 text-xs font-medium shrink-0">
          <button
            onClick={() => setActiveTab('deployment')}
            className={`pb-2.5 px-1 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'deployment'
                ? 'border-indigo-400 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            Deploy to Vercel / Netlify
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`pb-2.5 px-1 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'structure'
                ? 'border-indigo-400 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            Folder Architecture
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`pb-2.5 px-1 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'images'
                ? 'border-indigo-400 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            Replacing Project Images
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {activeTab === 'deployment' && (
            <div className="space-y-6">
              {/* Option 1: Vercel */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-white text-black font-black flex items-center justify-center text-xs">
                      ▲
                    </span>
                    <h4 className="text-sm font-bold text-white">Deploy to Vercel (1-Click)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    Automatic Vite Detection
                  </span>
                </div>
                <p className="text-slate-300">
                  Vercel automatically detects Vite. Simply push the code to a GitHub repository and import it into Vercel:
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-slate-300 flex justify-between items-center">
                  <code>
                    Build Command: <strong className="text-cyan-400">vite build</strong> (or <strong className="text-cyan-400">npm run build</strong>)<br />
                    Output Directory: <strong className="text-emerald-400">dist</strong><br />
                    Install Command: <strong className="text-indigo-400">npm install</strong>
                  </code>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'vercel')}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
                    title="Copy command"
                  >
                    {copiedKey === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Option 2: Netlify */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-teal-500 text-slate-950 font-black flex items-center justify-center text-xs">
                      ◈
                    </span>
                    <h4 className="text-sm font-bold text-white">Deploy to Netlify</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px]">
                    Zero Config
                  </span>
                </div>
                <p className="text-slate-300">
                  Connect your repository on Netlify and set the publish directory:
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-slate-300">
                  <div>Publish directory: <span className="text-emerald-400 font-bold">dist</span></div>
                  <div>Build command: <span className="text-cyan-400 font-bold">npm run build</span></div>
                </div>
              </div>

              {/* CLI deployment */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  Terminal CLI Deployment
                </h4>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                  # To deploy with Vercel CLI:<br />
                  npx vercel<br /><br />
                  # To deploy with Netlify CLI:<br />
                  npx netlify deploy --prod --dir=dist
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Modular Project Architecture:</span>
                <button
                  onClick={() => copyToClipboard(projectFolderStructure, 'structure')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition text-[11px]"
                >
                  {copiedKey === 'structure' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Directory Map</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                {projectFolderStructure}
              </pre>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Image className="w-4 h-4 text-cyan-400" />
                  How to swap Project Screenshots with your real files
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  All project data, descriptions, links, DAX code, and image URLs are cleanly isolated in <strong className="text-cyan-400">/src/data/portfolioData.ts</strong>. You can change them in seconds!
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-200">Step 1: Put your screenshot files in <code className="text-indigo-300">/public/projects/</code></div>
                  <div className="text-xs text-slate-400 pl-4">
                    For example: <code className="text-slate-300">/public/projects/crypto-dashboard.png</code> or <code className="text-slate-300">/public/projects/powerbi-attrition.png</code>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-200">Step 2: Open <code className="text-cyan-300">/src/data/portfolioData.ts</code></div>
                  <div className="text-xs text-slate-400 pl-4">
                    Update the <code className="text-amber-300">image</code> property on each project:
                  </div>
                  <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
{`export const projects: Project[] = [
  {
    id: "crypto-portfolio-automation",
    title: "Crypto Portfolio Automation Dashboard",
    // ⬇️ Replace this URL with your custom asset or local path:
    image: "/projects/my-real-crypto-dashboard.png", 
    ...
  }
];`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
