import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Upload, 
  FileCheck, 
  RotateCcw,
  Eye,
  FileText
} from 'lucide-react';
import { profileData, experiences, education } from '../data/portfolioData';
import { downloadResumePDF, printResumePDF, generateStructuredVectorPDF } from '../utils/pdfGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'priyanshu_custom_resume_pdf';
const FILENAME_KEY = 'priyanshu_custom_resume_filename';

export const InteractiveResumeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [customPdfDataUrl, setCustomPdfDataUrl] = useState<string | null>(null);
  const [customFilename, setCustomFilename] = useState<string>('Priyanshu_Kumar_Resume.pdf');
  const [viewMode, setViewMode] = useState<'ats' | 'custom-pdf'>('ats');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom PDF from storage if previously uploaded
  useEffect(() => {
    try {
      const savedPdf = localStorage.getItem(STORAGE_KEY);
      const savedName = localStorage.getItem(FILENAME_KEY);
      if (savedPdf) {
        setCustomPdfDataUrl(savedPdf);
        if (savedName) setCustomFilename(savedName);
        setViewMode('custom-pdf');
      }
    } catch {
      // Storage access fail-safe
    }
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      if (customPdfDataUrl) {
        // Download user uploaded PDF directly
        const link = document.createElement('a');
        link.href = customPdfDataUrl;
        link.download = customFilename || 'Priyanshu_Kumar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        await downloadResumePDF();
      }
    } catch (e) {
      console.error('PDF generation error:', e);
      // Fallback
      const doc = generateStructuredVectorPDF();
      doc.save('Priyanshu_Kumar_Resume.pdf');
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  const handleViewInNewTab = () => {
    if (customPdfDataUrl) {
      // Convert DataURL to Blob for clean new tab preview
      try {
        const arr = customPdfDataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch {
        window.open(customPdfDataUrl, '_blank');
      }
    } else {
      printResumePDF();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please select a valid PDF file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPdfDataUrl(result);
          setCustomFilename(file.name);
          setViewMode('custom-pdf');
          try {
            localStorage.setItem(STORAGE_KEY, result);
            localStorage.setItem(FILENAME_KEY, file.name);
          } catch {
            console.warn('Storage limit reached, PDF held in session state');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetCustomPdf = () => {
    setCustomPdfDataUrl(null);
    setCustomFilename('Priyanshu_Kumar_Resume.pdf');
    setViewMode('ats');
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(FILENAME_KEY);
    } catch {
      // Ignore
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  return createPortal(
    <div 
      id="resume-modal-overlay" 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      {/* Hidden file input for custom PDF uploading */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="application/pdf" 
        className="hidden" 
      />

      <div 
        id="resume-modal-dialog" 
        className="relative w-full max-w-4xl h-[94vh] max-h-[96dvh] bg-slate-900 border border-slate-700/80 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-3.5 sm:px-6 py-3 border-b border-slate-800 shrink-0 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-sky-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                <FileText className="w-4 h-4 text-sky-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
                  <span>Priyanshu Kumar • Official Resume</span>
                  {customPdfDataUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      <FileCheck className="w-3 h-3" />
                      <span>Custom PDF Loaded</span>
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      ATS 1-Page Vector
                    </span>
                  )}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                  {customPdfDataUrl ? customFilename : 'Data & Business Analyst • Direct PDF Download & High-Fidelity View'}
                </p>
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

          {/* Action Toolbar & Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            {/* View Switcher if custom PDF exists */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('ats')}
                className={`px-2.5 py-1 rounded-md transition font-medium cursor-pointer ${
                  viewMode === 'ats'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ATS Format
              </button>
              {customPdfDataUrl && (
                <button
                  onClick={() => setViewMode('custom-pdf')}
                  className={`px-2.5 py-1 rounded-md transition font-medium cursor-pointer ${
                    viewMode === 'custom-pdf'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Direct PDF File
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Upload or change custom PDF */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
                title="Upload or replace with your custom PDF file from device"
              >
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">{customPdfDataUrl ? 'Replace PDF' : 'Upload My PDF'}</span>
                <span className="sm:hidden">Upload</span>
              </button>

              {customPdfDataUrl && (
                <button
                  onClick={handleResetCustomPdf}
                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Revert back to default ATS resume"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              {/* View in New Tab */}
              <button
                id="resume-view-tab-btn"
                onClick={handleViewInNewTab}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
                title="View PDF document in a new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>

              {/* Download PDF Button */}
              <button
                id="resume-download-pdf-btn"
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg transition active:scale-95 shadow-sm shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                title="Download direct PDF resume"
              >
                {downloading ? (
                  <span className="animate-spin text-xs">⏳</span>
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
              </button>

              {/* Copy plain text */}
              <button
                id="resume-copy-text-btn"
                onClick={handleCopyText}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition cursor-pointer"
                title="Copy plain text for application portals"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Viewer Area */}
        <div className="overflow-y-auto flex-1 bg-slate-950 p-2 sm:p-6 md:p-8 flex justify-center items-start">
          {viewMode === 'custom-pdf' && customPdfDataUrl ? (
            <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-xl flex flex-col">
              <iframe
                src={customPdfDataUrl}
                title="Custom Resume PDF Viewer"
                className="w-full flex-1 border-0 min-h-[580px]"
              />
            </div>
          ) : (
            /* Authentic White A4 Paper ATS Resume Preview Canvas */
            <div 
              id="printable-resume-canvas"
              className="w-full max-w-[780px] bg-white text-slate-900 shadow-2xl p-5 sm:p-8 md:p-10 font-serif text-[11.5px] sm:text-[12.5px] leading-snug select-text border border-slate-300 rounded-sm space-y-3 sm:space-y-3.5"
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
                    LinkedIn: linkedin.com/in/priyanshu-kumar-0aa259227/
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
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
