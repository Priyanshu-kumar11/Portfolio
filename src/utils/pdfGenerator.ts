import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { profileData, experiences, education } from '../data/portfolioData';

/**
 * Generates an ATS-compliant, pure vector PDF with Times/Serif typography,
 * strictly fitted to 1 single A4 page with proportional vertical rhythm.
 */
export function generateStructuredVectorPDF(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
  const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
  const marginX = 36; // 0.5 in side margins
  const contentWidth = pageWidth - marginX * 2; // 523.28 pt

  let y = 32;

  // 1. Header Name
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('PRIYANSHU KUMAR', pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Contact line 1: Location | Phone | Email
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  const line1 = `${profileData.location}   |   ${profileData.phone}   |   ${profileData.email}`;
  doc.text(line1, pageWidth / 2, y, { align: 'center' });
  y += 11;

  // Contact line 2: LinkedIn | GitHub
  const line2 = `LinkedIn: linkedin.com/in/priyanshu-kumar-analytics   |   GitHub: github.com/Priyanshu-kumar11`;
  doc.text(line2, pageWidth / 2, y, { align: 'center' });
  y += 8;

  // Header Divider Line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 11;

  const renderSectionHeader = (title: string) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), marginX, y);
    y += 2.5;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 9;
  };

  // Section 1: Profile Summary
  renderSectionHeader('Profile Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(20, 20, 20);
  const summaryLines = doc.splitTextToSize(profileData.summary, contentWidth);
  doc.text(summaryLines, marginX, y, { align: 'justify', maxWidth: contentWidth });
  y += summaryLines.length * 10 + 6;

  // Section 2: Education
  renderSectionHeader('Education');
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(education[0].institution, marginX, y);
  doc.setFont('times', 'normal');
  doc.text(education[0].location, pageWidth - marginX, y, { align: 'right' });
  y += 9.5;

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.text(`${education[0].degree} — Score: ${education[0].score}`, marginX, y);
  doc.setFont('times', 'normal');
  doc.text(education[0].period, pageWidth - marginX, y, { align: 'right' });
  y += 11;

  // Section 3: Professional Experience
  renderSectionHeader('Professional Experience');
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(experiences[0].role, marginX, y);
  doc.setFont('times', 'normal');
  doc.text(experiences[0].period, pageWidth - marginX, y, { align: 'right' });
  y += 9.5;

  doc.setFont('times', 'bolditalic');
  doc.setFontSize(8.5);
  doc.text(experiences[0].company, marginX, y);
  y += 9.5;

  experiences[0].responsibilities.forEach((resp) => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    doc.text('•', marginX + 3, y);
    const bulletLines = doc.splitTextToSize(resp, contentWidth - 14);
    doc.text(bulletLines, marginX + 12, y, { align: 'left', maxWidth: contentWidth - 14 });
    y += bulletLines.length * 9.8 + 1.2;
  });
  y += 4;

  // Section 4: Key Analytics Projects
  renderSectionHeader('Key Analytics Projects');

  // Project 1
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text('Crypto Portfolio Automation Dashboard', marginX, y);
  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.text('Google Sheets, Google Apps Script, CoinGecko API', pageWidth - marginX, y, { align: 'right' });
  y += 9.5;

  const proj1Bullets = [
    'Built a crypto portfolio automation dashboard using Google Sheets, Apps Script, and CoinGecko API to reduce manual investment tracking.',
    'Automated live price fetching, portfolio value calculation, profit/loss tracking, return percentage analysis, historical logging, and email price alerts.',
    'Delivered a dashboard with KPI cards, allocation charts, profit/loss visuals, and conditional formatting to help users monitor portfolio performance and risk.'
  ];

  proj1Bullets.forEach((bullet) => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    doc.text('•', marginX + 3, y);
    const lines = doc.splitTextToSize(bullet, contentWidth - 14);
    doc.text(lines, marginX + 12, y, { align: 'left', maxWidth: contentWidth - 14 });
    y += lines.length * 9.8 + 1.2;
  });
  y += 4;

  // Project 2
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text('HR Employee Attrition Dashboard', marginX, y);
  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.text('Power BI, DAX, Power Query', pageWidth - marginX, y, { align: 'right' });
  y += 9.5;

  const proj2Bullets = [
    'Designed a multi-page Power BI dashboard using IBM\'s employee attrition dataset to analyze workforce demographics, compensation, and attrition drivers across departments and job roles.',
    'Built DAX measures and calculated columns to compute attrition rate, active headcount, and income bands, and applied Sort by Column for accurate ordinal representation of satisfaction metrics.',
    'Delivered an interactive report with page navigation and synced slicers (age group, gender) that surfaced insights linking low job satisfaction and poor work-life balance to higher attrition.'
  ];

  proj2Bullets.forEach((bullet) => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    doc.text('•', marginX + 3, y);
    const lines = doc.splitTextToSize(bullet, contentWidth - 14);
    doc.text(lines, marginX + 12, y, { align: 'left', maxWidth: contentWidth - 14 });
    y += lines.length * 9.8 + 1.2;
  });
  y += 4;

  // Section 5: Technical Skills & Tools
  renderSectionHeader('Technical Skills & Tools');
  const skillsList = [
    { cat: 'RPA & QA', items: 'UiPath (BOT Validation), UAT Testing, Shortcut (Ticket Management), Spec & SOP Documentation' },
    { cat: 'Business Analysis & Delivery', items: 'Requirements Gathering, Stakeholder Meetings, Agile Methodology, Sprint Calls' },
    { cat: 'Programming & Query', items: 'Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (MySQL, PostgreSQL)' },
    { cat: 'Data Visualization & BI', items: 'Power BI, Monthly/Quarterly/Yearly Business Dashboards, Advanced Excel (Pivot Tables, VLOOKUP, Power Query, Macros)' },
    { cat: 'Spreadsheet & Automation', items: 'Google Sheets (PivotTables, QUERY Function, Conditional Formatting), Google Apps Script (Automation, API Integration, Time-driven Triggers)' },
    { cat: 'AI & Productivity Tools', items: 'ChatGPT, Claude AI, GitHub Copilot, Gemini' },
  ];

  skillsList.forEach((skill) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 0, 0);
    const prefix = `${skill.cat}: `;
    doc.text(prefix, marginX, y);
    const prefixWidth = doc.getTextWidth(prefix);

    doc.setFont('times', 'normal');
    doc.setTextColor(20, 20, 20);
    const itemLines = doc.splitTextToSize(skill.items, contentWidth - prefixWidth);
    doc.text(itemLines, marginX + prefixWidth, y);
    y += itemLines.length * 9.8 + 1.8;
  });

  return doc;
}

/**
 * Downloads a high-resolution, perfectly formatted PDF directly matching the visible A4 document.
 */
export async function downloadResumePDF(elementId: string = 'printable-resume-canvas'): Promise<void> {
  const element = document.getElementById(elementId);
  
  if (element) {
    try {
      // Capture element with high scale for crisp typography
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 900,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 36; // 18pt margins left and right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const marginY = Math.max(16, (pdfHeight - imgHeight) / 2);

      pdf.addImage(imgData, 'JPEG', 18, marginY, imgWidth, Math.min(imgHeight, pdfHeight - 32));
      pdf.save('Priyanshu_Kumar_Resume.pdf');
      return;
    } catch (err) {
      console.warn('High-res canvas capture fallback to vector engine:', err);
    }
  }

  // Fallback to pure vector engine
  const vectorDoc = generateStructuredVectorPDF();
  vectorDoc.save('Priyanshu_Kumar_Resume.pdf');
}

/**
 * Opens the native browser print/PDF preview dialog.
 */
export function printResumePDF(elementId: string = 'printable-resume-canvas'): void {
  const vectorDoc = generateStructuredVectorPDF();
  const blob = vectorDoc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  
  const printWin = window.open(blobUrl, '_blank');
  if (!printWin) {
    // If popup is blocked, download directly
    downloadResumePDF(elementId);
  }
}
