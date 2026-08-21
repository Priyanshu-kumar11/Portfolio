import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { profileData, experiences, education } from '../data/portfolioData';
import { downloadResumePDF, printResumePDF } from '../utils/pdfGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveResumeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      downloadResumePDF();
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    printResumePDF();
  };

  const handleCopyText = () => {
    const rawText = `
PRIYANSHU KUMAR
${profileData.location}
Phone: ${profileData.phone} | Email: ${profileData.email}
LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github}

============================================================
PROFILE SUMMARY
============================================================
${profileData.summary}

============================================================
EDUCATION
============================================================
${education[0].institution} — ${education[0].location}
${education[0].degree} — Score: ${education[0].score} (${education[0].period})

============================================================
PROFESSIONAL EXPERIENCE
============================================================
${experiences[0].role} (${experiences[0].period})
${experiences[0].company}
${experiences[0].responsibilities.map(r => `• ${r}`).join('\n')}

============================================================
KEY ANALYTICS PROJECTS
============================================================
1. Crypto Portfolio Automation Dashboard
   Stack: Google Sheets, Google Apps Script, CoinGecko API
   • Built a crypto portfolio automation dashboard using Google Sheets, Apps Script, and CoinGecko API to reduce manual investment tracking.
   • Automated live price fetching, portfolio value calculation, profit/loss tracking, return percentage analysis, historical logging, and email price alerts.
   • Delivered a dashboard with KPI cards, allocation charts, profit/loss visuals, and conditional formatting to help users monitor portfolio performance and risk.

2. HR Employee Attrition Dashboard
   Stack: Power BI, DAX, Power Query
   • Designed a multi-page Power BI dashboard using IBM's employee attrition dataset to analyze workforce demographics, compensation, and attrition drivers across departments and job roles.
   • Built DAX measures and calculated columns to compute attrition rate, active headcount, and income bands, and applied Sort by Column for accurate ordinal representation of satisfaction metrics.
   • Delivered an interactive report with page navigation and synced slicers (age group, gender) that surfaced insights linking low job satisfaction and poor work-life balance to higher attrition.

============================================================
TECHNICAL SKILLS & TOOLS
============================================================
• RPA & QA: UiPath (BOT Validation), UAT Testing, Shortcut (Ticket Management), Spec & SOP Documentation
• Business Analysis & Delivery: Requirements Gathering, Stakeholder Meetings, Agile Methodology, Sprint Calls
• Programming & Query: Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (MySQL, PostgreSQL)
• Data Visualization & BI: Power BI, Monthly/Quarterly/Yearly Business Dashboards, Advanced Excel (Pivot Tables, VLOOKUP, Power Query, Macros)
• Spreadsheet & Automation: Google Sheets (PivotTables, QUERY Function, Conditional Formatting), Google Apps Script (Automation, API Integration, Time-driven Triggers)
• AI & Productivity Tools: ChatGPT, Claude AI, GitHub Copilot, Gemini
`.trim();

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="resume-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden"
    >
      <div 
        id="resume-modal-dialog" 
        className="relative w-full max-w-4xl h-[94vh] max-h-[96dvh] bg-slate-900 border border-slate-700/80 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Top Bar - Adaptive & Clean */}
        <div className="bg-slate-950 px-3.5 sm:px-6 py-3 border-b border-slate-800 shrink-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                📄
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  <span>Priyanshu Kumar • Resume</span>
                  <span className="hidden xs:inline-flex px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    ATS 1-Page
                  </span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Data &amp; Business Analyst • Exact PDF View</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 pt-1 border-t border-slate-800/60">
            <button
              id="resume-download-pdf-btn"
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold rounded-lg transition active:scale-95 shadow-sm shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
              title="Download ATS-compliant vector PDF file"
            >
              {downloading ? (
                <span className="animate-spin text-xs">⏳</span>
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            <button
              id="resume-print-btn"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium rounded-lg border border-slate-700 transition cursor-pointer"
              title="Open full page print/preview dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Tab</span>
            </button>

            <button
              id="resume-copy-text-btn"
              onClick={handleCopyText}
              className="hidden xs:flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition cursor-pointer"
              title="Copy plain text for application portals"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Authentic White A4 Paper ATS Resume Preview Canvas */}
        <div className="overflow-y-auto flex-1 bg-slate-950 p-2 sm:p-6 md:p-8 flex justify-center items-start">
          <div 
            id="printable-resume-canvas"
            className="w-full max-w-[780px] bg-white text-slate-900 shadow-2xl p-4 sm:p-8 md:p-10 font-serif text-[11.5px] sm:text-[12.5px] leading-snug select-text border border-slate-300 rounded-sm space-y-3 sm:space-y-3.5"
          >
            {/* Header */}
            <div className="text-center pb-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black uppercase font-serif mb-1">
                Priyanshu Kumar
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-slate-900 font-sans">
                <span>{profileData.location}</span>
                <span>|</span>
                <span>{profileData.phone}</span>
                <span>|</span>
                <a href={`mailto:${profileData.email}`} className="text-slate-900 hover:underline">
                  {profileData.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-slate-900 font-sans mt-0.5">
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn: linkedin.com/in/priyanshu-kumar-analytics
                </a>
                <span>|</span>
                <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub: github.com/Priyanshu-kumar11
                </a>
              </div>
              <hr className="border-t border-black mt-2 mb-1.5" />
            </div>

            {/* Profile Summary */}
            <div className="space-y-1">
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-sans">
                Profile Summary
              </h2>
              <p className="text-[11px] sm:text-[12px] text-slate-900 leading-normal text-justify">
                {profileData.summary}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-sans">
                Education
              </h2>
              <div className="flex justify-between items-baseline text-[11px] sm:text-xs font-bold text-black">
                <span>{education[0].institution}</span>
                <span className="font-normal text-slate-800">{education[0].location}</span>
              </div>
              <div className="flex justify-between items-baseline text-[11px] sm:text-xs italic text-slate-900">
                <span>{education[0].degree} — Score: <strong>{education[0].score}</strong></span>
                <span className="not-italic font-normal text-slate-800">{education[0].period}</span>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-1">
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-sans">
                Professional Experience
              </h2>
              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-[11px] sm:text-xs font-bold text-black">
                  <span>{experiences[0].role}</span>
                  <span className="font-normal text-slate-800">{experiences[0].period}</span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold italic text-slate-900">
                  {experiences[0].company}
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] sm:text-[12px] text-slate-900 leading-snug">
                  {experiences[0].responsibilities.map((item, idx) => (
                    <li key={idx} className="pl-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-1">
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-sans">
                Key Analytics Projects
              </h2>

              {/* Project 1 */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-baseline gap-1 text-[11px] sm:text-xs">
                  <span className="font-bold text-black">Crypto Portfolio Automation Dashboard</span>
                  <span className="italic text-slate-800 text-[10px] sm:text-[11px]">Google Sheets, Google Apps Script, CoinGecko API</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] sm:text-[12px] text-slate-900 leading-snug">
                  <li className="pl-0.5">
                    Built a crypto portfolio automation dashboard using Google Sheets, Apps Script, and CoinGecko API to reduce manual investment tracking.
                  </li>
                  <li className="pl-0.5">
                    Automated live price fetching, portfolio value calculation, profit/loss tracking, return percentage analysis, historical logging, and email price alerts.
                  </li>
                  <li className="pl-0.5">
                    Delivered a dashboard with KPI cards, allocation charts, profit/loss visuals, and conditional formatting to help users monitor portfolio performance and risk.
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-0.5 pt-0.5">
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-baseline gap-1 text-[11px] sm:text-xs">
                  <span className="font-bold text-black">HR Employee Attrition Dashboard</span>
                  <span className="italic text-slate-800 text-[10px] sm:text-[11px]">Power BI, DAX, Power Query</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] sm:text-[12px] text-slate-900 leading-snug">
                  <li className="pl-0.5">
                    Designed a multi-page Power BI dashboard using IBM's employee attrition dataset to analyze workforce demographics, compensation, and attrition drivers across departments and job roles.
                  </li>
                  <li className="pl-0.5">
                    Built DAX measures and calculated columns to compute attrition rate, active headcount, and income bands, and applied Sort by Column for accurate ordinal representation of satisfaction metrics.
                  </li>
                  <li className="pl-0.5">
                    Delivered an interactive report with page navigation and synced slicers (age group, gender) that surfaced insights linking low job satisfaction and poor work-life balance to higher attrition.
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1">
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 font-sans">
                Technical Skills &amp; Tools
              </h2>
              <div className="space-y-0.5 text-[11px] sm:text-[12px] text-slate-900 leading-snug">
                <div>
                  <strong className="text-black font-bold">RPA &amp; QA:</strong> UiPath (BOT Validation), UAT Testing, Shortcut (Ticket Management), Spec &amp; SOP Documentation
                </div>
                <div>
                  <strong className="text-black font-bold">Business Analysis &amp; Delivery:</strong> Requirements Gathering, Stakeholder Meetings, Agile Methodology, Sprint Calls
                </div>
                <div>
                  <strong className="text-black font-bold">Programming &amp; Query:</strong> Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (MySQL, PostgreSQL)
                </div>
                <div>
                  <strong className="text-black font-bold">Data Visualization &amp; BI:</strong> Power BI, Monthly/Quarterly/Yearly Business Dashboards, Advanced Excel (Pivot Tables, VLOOKUP, Power Query, Macros)
                </div>
                <div>
                  <strong className="text-black font-bold">Spreadsheet &amp; Automation:</strong> Google Sheets (PivotTables, QUERY Function, Conditional Formatting), Google Apps Script (Automation, API Integration, Time-driven Triggers)
                </div>
                <div>
                  <strong className="text-black font-bold">AI &amp; Productivity Tools:</strong> ChatGPT, Claude AI, GitHub Copilot, Gemini
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


