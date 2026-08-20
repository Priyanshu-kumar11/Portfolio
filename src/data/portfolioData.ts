import { ProfileData, ExperienceItem, EducationItem, Project, SkillCategory } from '../types';

export const profileData: ProfileData = {
  name: "Priyanshu Kumar",
  titles: [
    "Data Analyst",
    "Business Analyst",
    "Power BI & DAX Specialist",
    "Automation & QA Associate"
  ],
  email: "priyanshuk1601@gmail.com",
  phone: "+91 7646091624",
  location: "Lucknow, Uttar Pradesh, India",
  linkedin: "https://linkedin.com/in/priyanshu-kumar-analytics",
  github: "https://github.com/priyanshu-kumar-dev",
  summary:
    "Data & Business Analyst with hands-on experience gathering requirements from business stakeholders and process owners, then translating them into clear specification documents within an Agile framework. Skilled in Power BI, DAX, SQL, and Advanced Excel to build monthly, quarterly, and yearly dashboards that turn operational data into decision-ready insights, backed by a strong foundation in data validation, discrepancy analysis, and process documentation gained from managing UAT and BOT output testing. Comfortable partnering with cross-functional teams through sprint calls and stakeholder meetings to align on priorities, track delivery, and drive process improvements.",
  stats: [
    { label: "CGPA (B.Tech CSE)", value: "7.69/10", helper: "BBDITM Lucknow (2021-2025)" },
    { label: "Dashboard Cadence", value: "M/Q/Y", helper: "Monthly, Quarterly & Yearly BI" },
    { label: "Automation Validation", value: "100%", helper: "Dev & Prod UAT Verification" },
    { label: "Core Tooling", value: "Power BI & SQL", helper: "DAX, Python, Apps Script, UiPath" },
  ]
};

export const experiences: ExperienceItem[] = [
  {
    role: "Associate",
    company: "Fusion Business Solution (P) Ltd.",
    location: "India",
    period: "June 2025 – Present",
    type: "Full-Time",
    summary:
      "Bridging the gap between business stakeholders and RPA development teams. Leading requirement elicitation, automation spec documentation, UAT verification, and operational BI dashboard reporting.",
    responsibilities: [
      "Conducted requirements gathering sessions with business stakeholders and process representatives to understand process logic ahead of preparing automation specification documents for the RPA Team and developers.",
      "Participated in sprint calls and stakeholder meetings within an Agile delivery framework, aligning on sprint priorities, timelines, and process changes across the automation pipeline.",
      "Created and managed tickets in Shortcut to track the status of changes, development tasks, and updates across the automation pipeline.",
      "Validated RPA Team's automation development by running bots in UiPath, generating BOT output files, and comparing them against manually prepared reference files.",
      "Identified discrepancies during validation and raised tickets for the RPA Team, documenting root cause to support faster issue resolution.",
      "Tested and verified BOT automations across both Dev and Prod environments to ensure consistent, error-free performance before deployment.",
      "Prepared monthly, quarterly, and yearly business dashboards to track automation performance and support stakeholder reporting.",
      "Prepared SOP documentation to standardize automation processes and support knowledge transfer."
    ],
    keyAchievements: [
      "Authored standardized SOP and Automation Specification Documents used across cross-functional dev teams.",
      "Maintained zero-critical-defect deployments by systematically validating BOT outputs against reference benchmarks.",
      "Constructed operational BI dashboards empowering leadership with monthly & quarterly KPI visibility."
    ],
    toolsUsed: ["UiPath", "Shortcut", "Power BI", "Excel / Power Query", "Agile / Scrum", "SOP & BRD Documentation", "UAT Testing"]
  }
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    field: "Computer Science & Engineering",
    institution: "B B D Institute of Technology and Management",
    location: "Lucknow, UP",
    period: "2021 – 2025",
    score: "CGPA: 7.69 / 10",
    coursework: [
      "Database Management Systems (DBMS & SQL)",
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Python/Java)",
      "Software Engineering & Agile Methodologies",
      "Probability, Statistics & Data Analytics"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "crypto-portfolio-automation",
    title: "Crypto Portfolio Automation Dashboard",
    subtitle: "Google Sheets • Google Apps Script • CoinGecko API • Triggers",
    category: "automation",
    techStack: ["Google Sheets", "Google Apps Script", "CoinGecko REST API", "Time-driven Triggers", "Conditional Formatting"],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient: "from-emerald-900/60 via-teal-900/40 to-slate-900",
    description:
      "Automated financial analytics tool built in Google Sheets and Google Apps Script to eliminate manual investment tracking. Fetches live crypto prices from the CoinGecko API, calculates real-time portfolio valuation, logs historical snapshots, formats profit/loss visual indicators, and manages multi-tab analysis across Portfolio, Live Prices, History, and Dashboard.",
    highlights: [
      "Integrated CoinGecko API via Google Apps Script with automated hourly time-driven execution triggers.",
      "Multi-tab spreadsheet architecture featuring Portfolio, Live Prices, History logging, and an executive KPI Dashboard.",
      "Dynamic formulas calculating Total Portfolio Value ($1,006.45), Profit/Loss (+$67.45 / +7.18%), Asset Allocation %, and Top Performers.",
      "Color-coded conditional formatting (Green Profit / Red Loss) with automated error status verification and historical time-series logging."
    ],
    impactMetrics: [
      { label: "Portfolio Return", value: "+7.18%" },
      { label: "Tracked Coins", value: "BTC, ETH, SOL, XRP, DOGE" },
      { label: "Manual Effort Saved", value: "95%" }
    ],
    codeSnippet: {
      language: "javascript",
      title: "Google Apps Script - CoinGecko API Fetch & Multi-Tab Update Engine",
      code: `/**
 * CryptoTracker Automation Script
 * Author: Priyanshu Kumar
 * Sheet: https://docs.google.com/spreadsheets/d/1_SpPacj2CpRXJv6S1yaOWxR4ocmxCS_RPi84Ry8eecU/edit?usp=sharing
 */

function updateLivePricesAndPortfolio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const portfolioSheet = ss.getSheetByName("Portfolio");
  const livePricesSheet = ss.getSheetByName("Live Prices");
  const historySheet = ss.getSheetByName("History");
  
  const coinIds = "bitcoin,dogecoin,ethereum,ripple,solana";
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinIds + '&vs_currencies=usd&include_24hr_change=true';
  
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());
  const now = new Date();
  
  // 1. Update Live Prices Tab
  const liveRowData = [
    ["bitcoin", data.bitcoin.usd, data.bitcoin.usd_24h_change, data.bitcoin.usd_24h_change >= 0 ? "Gainer" : "Loser", now],
    ["ethereum", data.ethereum.usd, data.ethereum.usd_24h_change, data.ethereum.usd_24h_change >= 0 ? "Gainer" : "Loser", now],
    ["solana", data.solana.usd, data.solana.usd_24h_change, data.solana.usd_24h_change >= 0 ? "Gainer" : "Loser", now],
    ["ripple", data.ripple.usd, data.ripple.usd_24h_change, data.ripple.usd_24h_change >= 0 ? "Gainer" : "Loser", now],
    ["dogecoin", data.dogecoin.usd, data.dogecoin.usd_24h_change, data.dogecoin.usd_24h_change >= 0 ? "Gainer" : "Loser", now]
  ];
  livePricesSheet.getRange(2, 1, liveRowData.length, 5).setValues(liveRowData);
  
  // 2. Update Portfolio Tab Prices & Error Status
  const holdings = portfolioSheet.getRange("A2:D6").getValues();
  holdings.forEach((row, index) => {
    const coinId = row[0].toString().toLowerCase();
    if (data[coinId]) {
      portfolioSheet.getRange(index + 2, 5).setValue(data[coinId].usd); // Current Price
      portfolioSheet.getRange(index + 2, 9).setValue(now);              // Last Updated
      portfolioSheet.getRange(index + 2, 10).setValue("OK");           // Error Status
      
      // 3. Append to History tab for time-series logging
      historySheet.appendRow([now, coinId, data[coinId].usd, data[coinId].usd_24h_change]);
    }
  });
}`
    },
    demoType: "crypto-sheets",
    githubUrl: "https://github.com/priyanshu-kumar-dev/crypto-portfolio-automation",
    liveUrl: "https://docs.google.com/spreadsheets/d/1_SpPacj2CpRXJv6S1yaOWxR4ocmxCS_RPi84Ry8eecU/edit?usp=sharing"
  },
  {
    id: "hr-employee-attrition-dashboard",
    title: "HR Employee Attrition Intelligence Dashboard",
    subtitle: "Power BI • DAX Measures • Power Query • IBM HR Dataset",
    category: "data-analytics",
    techStack: ["Power BI", "DAX", "Power Query", "Data Modeling", "IBM HR Dataset", "Synced Slicers"],
    // Easy to replace with user's own screenshot or asset
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient: "from-blue-900/60 via-indigo-900/40 to-slate-900",
    description:
      "Multi-page enterprise Power BI analytics solution built on IBM's employee attrition dataset to diagnose workforce demographics, compensation disparity, satisfaction ratings, and core attrition drivers across departments and roles.",
    highlights: [
      "Designed multi-page navigational architecture with synchronized slicers across age groups, gender, department, and salary brackets.",
      "Engineered advanced DAX measures and calculated columns for dynamic Attrition Rate (%), Active Headcount, and Income Bands.",
      "Implemented Sort by Column to guarantee ordinal representation of survey satisfaction scores.",
      "Surfaced high-impact business insights linking low job satisfaction and poor work-life balance directly to attrition spikes in Sales & R&D."
    ],
    impactMetrics: [
      { label: "Dataset Processed", value: "1,470+ Records" },
      { label: "Calculated DAX Measures", value: "15+ Custom Metrics" },
      { label: "Key Insight Surfaced", value: "Work-Life Balance Impact" }
    ],
    codeSnippet: {
      language: "dax",
      title: "DAX Measures - Attrition Rate & Dynamic Headcount",
      code: `// DAX Measure: Total Active Employees
Active Headcount = 
CALCULATE(
    COUNTROWS('HR_Employee_Data'),
    'HR_Employee_Data'[Attrition] = "No"
)

// DAX Measure: Attrition Rate %
Attrition Rate = 
VAR TotalEmployees = COUNTROWS('HR_Employee_Data')
VAR TotalLeft = CALCULATE(
    COUNTROWS('HR_Employee_Data'), 
    'HR_Employee_Data'[Attrition] = "Yes"
)
RETURN
DIVIDE(TotalLeft, TotalEmployees, 0)

// DAX Calculated Column: Income Band Classification
Income Band = 
SWITCH(
    TRUE(),
    'HR_Employee_Data'[MonthlyIncome] < 3500, "1. Low (< $3.5k)",
    'HR_Employee_Data'[MonthlyIncome] <= 8000, "2. Mid ($3.5k - $8k)",
    "3. High (> $8k)"
)`
    },
    demoType: "hr-powerbi",
    githubUrl: "https://github.com/priyanshu-kumar-dev/hr-attrition-powerbi",
    liveUrl: "#"
  },
  {
    id: "rpa-bot-validation-analytics",
    title: "RPA Automation & BOT Output Discrepancy Analyzer",
    subtitle: "UiPath Validation • Shortcut Pipeline • SQL QA Dashboard",
    category: "business-analysis",
    techStack: ["UiPath", "SQL", "Excel Macros", "Shortcut", "Agile UAT", "Discrepancy Analysis"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient: "from-cyan-900/60 via-blue-900/40 to-slate-900",
    description:
      "Enterprise testing and discrepancy analysis framework used to benchmark UiPath BOT generated data against gold-standard manual reference files across Dev and Prod pipelines before operational release.",
    highlights: [
      "Standardized BOT output verification protocol comparing thousands of row-level records against benchmark references.",
      "Formulated root cause documentation on edge-case failures to accelerate RPA developer remediation turnaround.",
      "Delivered weekly and monthly status reports and burn-down dashboards to cross-functional stakeholders in sprint calls."
    ],
    impactMetrics: [
      { label: "Deployment Accuracy", value: "99.9%" },
      { label: "Defect Turnaround", value: "-40% Time" },
      { label: "Documentation", value: "Full SOP Standard" }
    ],
    demoType: "none",
    githubUrl: "https://github.com/priyanshu-kumar-dev",
    liveUrl: "#"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    categoryName: "Data Visualization & BI",
    iconName: "BarChart3",
    description: "Creating decision-ready executive dashboards and exploratory visual analytics.",
    skills: [
      { name: "Power BI", level: 92, tags: ["Reporting", "Slicers", "Bookmarks"], highlight: true },
      { name: "DAX Measures", level: 88, tags: ["Calculated Columns", "Time Intelligence"], highlight: true },
      { name: "Power Query (ETL)", level: 86, tags: ["Data Cleaning", "M-Code", "Unpivoting"] },
      { name: "Advanced Excel", level: 94, tags: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Macros"], highlight: true },
      { name: "Business Dashboards", level: 90, tags: ["Monthly", "Quarterly", "Yearly Cadence"] }
    ]
  },
  {
    categoryName: "Business Analysis & Delivery",
    iconName: "Briefcase",
    description: "Eliciting requirements, translating business logic, and aligning Agile delivery teams.",
    skills: [
      { name: "Requirements Gathering", level: 92, tags: ["Stakeholder Elicitation", "Process Logic"], highlight: true },
      { name: "Agile & Sprint Calls", level: 90, tags: ["Scrum", "Sprint Planning", "Standups"], highlight: true },
      { name: "Spec & SOP Documentation", level: 95, tags: ["BRD", "FRD", "Standard Operating Procedures"], highlight: true },
      { name: "Ticket Management (Shortcut)", level: 88, tags: ["Backlog", "Bug Tracking", "Pipeline"] },
      { name: "Stakeholder Communication", level: 92, tags: ["Cross-functional", "Executive Reporting"] }
    ]
  },
  {
    categoryName: "RPA, QA & Data Validation",
    iconName: "CheckCircle2",
    description: "Validating BOT executions, diagnosing data anomalies, and ensuring production readiness.",
    skills: [
      { name: "UiPath BOT Validation", level: 88, tags: ["Execution Testing", "BOT Output Files"], highlight: true },
      { name: "UAT Testing & QA", level: 92, tags: ["Dev & Prod Environments", "Test Cases"], highlight: true },
      { name: "Discrepancy & Root Cause Analysis", level: 90, tags: ["Data Anomaly Detection", "Issue Resolution"], highlight: true },
      { name: "Reference File Benchmarking", level: 94, tags: ["Data Reconciliation", "Validation Scripts"] }
    ]
  },
  {
    categoryName: "Programming, SQL & Automation",
    iconName: "Code2",
    description: "Querying relational databases, transforming datasets, and scripting cloud automation.",
    skills: [
      { name: "SQL (MySQL)", level: 88, tags: ["JOINs", "Subqueries", "Aggregations", "Window Functions"], highlight: true },
      { name: "Python", level: 82, tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn"], highlight: true },
      { name: "Google Apps Script", level: 86, tags: ["REST APIs", "Time Triggers", "Mail Alerts"], highlight: true },
      { name: "Google Sheets Advanced", level: 94, tags: ["QUERY Function", "PivotTables", "RegEx"] }
    ]
  },
  {
    categoryName: "AI & Modern Productivity Tools",
    iconName: "Sparkles",
    description: "Augmenting analytical workflows with modern LLMs and prompt engineering.",
    skills: [
      { name: "ChatGPT & Claude AI", level: 95, tags: ["Prompt Engineering", "DAX/SQL Debugging"] },
      { name: "Gemini", level: 90, tags: ["Analytical Insights", "Summary Generation"] },
      { name: "GitHub Copilot", level: 88, tags: ["Code Acceleration", "Script Refactoring"] }
    ]
  }
];

export const analyticalCaseStudies = [
  {
    title: "Bridging the Gap: How Business Analysis Drives Accurate Data Dashboards",
    category: "Methodology",
    readTime: "3 min read",
    summary:
      "Why starting with stakeholder requirements and process mapping in Shortcut prevents metric hallucination and delivers dashboards that directly drive business action."
  },
  {
    title: "UAT & BOT Output Verification Strategy for High-Throughput Pipelines",
    category: "QA & RPA",
    readTime: "4 min read",
    summary:
      "A systematic approach to running UiPath bot outputs against manually prepared gold-standard benchmarks to catch 100% of data formatting edge cases before production."
  },
  {
    title: "Writing Resilient DAX: Time Intelligence & Calculated Attrition Slicers",
    category: "Power BI",
    readTime: "5 min read",
    summary:
      "Optimizing complex cardinality and filter context across synchronized multi-page reports with IBM workforce metrics."
  }
];
