import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, Phone, ExternalLink, Award } from 'lucide-react';
import { profileData, experiences, education, projects, skillCategories } from '../data/portfolioData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveResumeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const rawText = `
Priyanshu Kumar
${profileData.phone} | ${profileData.email} | LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github}

PROFILE SUMMARY
${profileData.summary}

EDUCATION
${education[0].institution} ${education[0].location}
${education[0].degree}, ${education[0].score}   ${education[0].period}

EXPERIENCE
${experiences[0].role}   ${experiences[0].period}
${experiences[0].company}
${experiences[0].responsibilities.map(r => `• ${r}`).join('\n')}

PROJECTS
Crypto Portfolio Automation Dashboard | Google Sheets, Google Apps Script
• Built a crypto portfolio automation dashboard using Google Sheets, Apps Script, and CoinGecko API to reduce manual investment tracking.
• Automated live price fetching, portfolio value calculation, profit/loss tracking, return percentage analysis, historical logging, and email price alerts.
• Delivered a dashboard with KPI cards, allocation charts, profit/loss visuals, and conditional formatting to help users monitor portfolio performance and risk.

HR Employee Attrition Dashboard | Power BI, DAX, Power Query
• Designed a multi-page Power BI dashboard using IBM's employee attrition dataset to analyze workforce demographics, compensation, and attrition drivers across departments and job roles.
• Built DAX measures and calculated columns to compute attrition rate, active headcount, and income bands, and applied Sort by Column for accurate ordinal representation of satisfaction metrics.
• Delivered an interactive report with page navigation and synced slicers (age group, gender) that surfaced insights linking low job satisfaction and poor work-life balance to higher attrition.

TECHNICAL SKILLS
RPA & QA: UiPath (BOT Validation), UAT Testing, Shortcut (Ticket Management), Spec & SOP Documentation
Business Analysis & Delivery: Requirements Gathering, Stakeholder Meetings, Agile Methodology, Sprint Calls
Programming & Query: Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (MySQL)
Data Visualization & BI: Power BI, Monthly/Quarterly/Yearly Business Dashboards, Advanced Excel (Pivot Tables, VLOOKUP, Power Query, Macros)
Spreadsheet & Automation: Google Sheets (PivotTables, QUERY Function, Conditional Formatting), Google Apps Script (Automation, API Integration, Time-driven Triggers)
AI Tools: ChatGPT, Claude AI, GitHub Copilot, Gemini
`.trim();

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
              📄
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Verified Resume • Priyanshu Kumar</h3>
              <p className="text-[11px] text-slate-400">Data & Business Analyst</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold rounded-lg transition active:scale-95 shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
              title="Copy clean plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-900 font-sans text-slate-200 text-sm leading-normal space-y-6 print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="text-center border-b border-slate-800 pb-5 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight print:text-black">
              Priyanshu Kumar
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-400 print:text-gray-700">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400 print:hidden" />
                {profileData.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400 print:hidden" />
                <a href={`mailto:${profileData.email}`} className="hover:text-cyan-300 print:text-black underline">
                  {profileData.email}
                </a>
              </span>
              <span>•</span>
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 print:text-black underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 print:text-black underline">
                GitHub
              </a>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Profile Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify print:text-gray-900">
              {profileData.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs sm:text-sm font-semibold text-slate-200 print:text-black">
              <span>{education[0].institution}</span>
              <span className="text-slate-400 print:text-gray-700">{education[0].location}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-slate-400 print:text-gray-800">
              <span>{education[0].degree}, <strong className="text-cyan-400 print:text-black">{education[0].score}</strong></span>
              <span>{education[0].period}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Experience
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-semibold text-slate-200 print:text-black">
                <span className="text-white print:text-black font-bold">{experiences[0].role}</span>
                <span className="text-slate-400 print:text-gray-700">{experiences[0].period}</span>
              </div>
              <div className="text-xs font-medium text-cyan-400 print:text-gray-900">
                {experiences[0].company}
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-300 leading-relaxed print:text-gray-900">
                {experiences[0].responsibilities.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Projects
            </h2>

            {/* Project 1 */}
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-semibold text-white print:text-black">
                Crypto Portfolio Automation Dashboard | <span className="font-normal text-slate-400 print:text-gray-700">Google Sheets, Google Apps Script</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 print:text-gray-900">
                <li className="pl-1">
                  Built a crypto portfolio automation dashboard using Google Sheets, Apps Script, and CoinGecko API to reduce manual investment tracking.
                </li>
                <li className="pl-1">
                  Automated live price fetching, portfolio value calculation, profit/loss tracking, return percentage analysis, historical logging, and email price alerts.
                </li>
                <li className="pl-1">
                  Delivered a dashboard with KPI cards, allocation charts, profit/loss visuals, and conditional formatting to help users monitor portfolio performance and risk.
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1 pt-2">
              <div className="text-xs sm:text-sm font-semibold text-white print:text-black">
                HR Employee Attrition Dashboard | <span className="font-normal text-slate-400 print:text-gray-700">Power BI, DAX, Power Query</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-300 print:text-gray-900">
                <li className="pl-1">
                  Designed a multi-page Power BI dashboard using IBM's employee attrition dataset to analyze workforce demographics, compensation, and attrition drivers across departments and job roles.
                </li>
                <li className="pl-1">
                  Built DAX measures and calculated columns to compute attrition rate, active headcount, and income bands, and applied Sort by Column for accurate ordinal representation of satisfaction metrics.
                </li>
                <li className="pl-1">
                  Delivered an interactive report with page navigation and synced slicers (age group, gender) that surfaced insights linking low job satisfaction and poor work-life balance to higher attrition.
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 border-b border-slate-800 pb-1 print:text-black print:border-black">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed print:text-gray-900">
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">RPA & QA:</strong> UiPath (BOT Validation), UAT Testing, Shortcut (Ticket Management), Spec & SOP Documentation
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Business Analysis & Delivery:</strong> Requirements Gathering, Stakeholder Meetings, Agile Methodology, Sprint Calls
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Programming & Query:</strong> Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (MySQL)
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Data Visualization & BI:</strong> Power BI, Monthly/Quarterly/Yearly Business Dashboards, Advanced Excel (Pivot Tables, VLOOKUP, Power Query, Macros)
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">Spreadsheet & Automation:</strong> Google Sheets (PivotTables, QUERY Function, Conditional Formatting), Google Apps Script (Automation, API Integration, Time-driven Triggers)
              </div>
              <div>
                <strong className="text-slate-100 print:text-black font-semibold">AI Tools:</strong> ChatGPT, Claude AI, GitHub Copilot, Gemini
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
