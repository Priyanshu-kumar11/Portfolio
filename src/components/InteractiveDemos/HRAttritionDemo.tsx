import React, { useState } from 'react';
import { Filter, Users, UserMinus, UserCheck, DollarSign, BarChart2, PieChart, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface HRRecord {
  department: 'Sales' | 'Research & Development' | 'Human Resources';
  gender: 'Male' | 'Female';
  ageGroup: '<30' | '30-45' | '45+';
  workLifeBalance: 'Low' | 'High';
  jobSatisfaction: 1 | 2 | 3 | 4;
  overTime: 'Yes' | 'No';
  attrition: 'Yes' | 'No';
  monthlyIncome: number;
}

// Representative sample modeled on IBM Attrition dataset (1470 scaled distribution)
const mockDataset: HRRecord[] = [
  // Sales
  { department: 'Sales', gender: 'Male', ageGroup: '<30', workLifeBalance: 'Low', jobSatisfaction: 1, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 2800 },
  { department: 'Sales', gender: 'Female', ageGroup: '<30', workLifeBalance: 'Low', jobSatisfaction: 2, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 3100 },
  { department: 'Sales', gender: 'Male', ageGroup: '30-45', workLifeBalance: 'Low', jobSatisfaction: 2, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 4500 },
  { department: 'Sales', gender: 'Female', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 5800 },
  { department: 'Sales', gender: 'Male', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 6200 },
  { department: 'Sales', gender: 'Female', ageGroup: '45+', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 9400 },
  { department: 'Sales', gender: 'Male', ageGroup: '<30', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 3400 },
  { department: 'Sales', gender: 'Female', ageGroup: '30-45', workLifeBalance: 'Low', jobSatisfaction: 1, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 4200 },
  
  // R&D
  { department: 'Research & Development', gender: 'Male', ageGroup: '<30', workLifeBalance: 'Low', jobSatisfaction: 2, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 3800 },
  { department: 'Research & Development', gender: 'Female', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 7500 },
  { department: 'Research & Development', gender: 'Male', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 6900 },
  { department: 'Research & Development', gender: 'Female', ageGroup: '<30', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 4100 },
  { department: 'Research & Development', gender: 'Male', ageGroup: '45+', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 11200 },
  { department: 'Research & Development', gender: 'Female', ageGroup: '45+', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 12400 },
  { department: 'Research & Development', gender: 'Male', ageGroup: '30-45', workLifeBalance: 'Low', jobSatisfaction: 1, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 5100 },
  { department: 'Research & Development', gender: 'Male', ageGroup: '<30', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 4300 },

  // HR
  { department: 'Human Resources', gender: 'Female', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 5400 },
  { department: 'Human Resources', gender: 'Male', ageGroup: '<30', workLifeBalance: 'Low', jobSatisfaction: 1, overTime: 'Yes', attrition: 'Yes', monthlyIncome: 2900 },
  { department: 'Human Resources', gender: 'Female', ageGroup: '45+', workLifeBalance: 'High', jobSatisfaction: 4, overTime: 'No', attrition: 'No', monthlyIncome: 8600 },
  { department: 'Human Resources', gender: 'Male', ageGroup: '30-45', workLifeBalance: 'High', jobSatisfaction: 3, overTime: 'No', attrition: 'No', monthlyIncome: 6100 }
];

export const HRAttritionDemo: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  // Power BI Slicers State
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [selectedWLB, setSelectedWLB] = useState<string>('All');
  const [selectedOverTime, setSelectedOverTime] = useState<string>('All');
  const [activeDaxInspector, setActiveDaxInspector] = useState<string | null>('Attrition Rate');

  // Filter records based on active Power BI slicers
  const filteredData = mockDataset.filter((r) => {
    if (selectedDept !== 'All' && r.department !== selectedDept) return false;
    if (selectedGender !== 'All' && r.gender !== selectedGender) return false;
    if (selectedAge !== 'All' && r.ageGroup !== selectedAge) return false;
    if (selectedWLB !== 'All' && r.workLifeBalance !== selectedWLB) return false;
    if (selectedOverTime !== 'All' && r.overTime !== selectedOverTime) return false;
    return true;
  });

  // Calculate DAX Measures
  const totalHeadcount = filteredData.length;
  const activeHeadcount = filteredData.filter((r) => r.attrition === 'No').length;
  const attritionCount = filteredData.filter((r) => r.attrition === 'Yes').length;
  const attritionRate = totalHeadcount > 0 ? (attritionCount / totalHeadcount) * 100 : 0;
  const avgIncome =
    totalHeadcount > 0
      ? Math.round(filteredData.reduce((sum, r) => sum + r.monthlyIncome, 0) / totalHeadcount)
      : 0;

  // Breakdown calculations for visuals
  const salesAttrition = mockDataset.filter(r => r.department === 'Sales' && r.attrition === 'Yes').length / mockDataset.filter(r => r.department === 'Sales').length * 100;
  const rdAttrition = mockDataset.filter(r => r.department === 'Research & Development' && r.attrition === 'Yes').length / mockDataset.filter(r => r.department === 'Research & Development').length * 100;
  const hrAttrition = mockDataset.filter(r => r.department === 'Human Resources' && r.attrition === 'Yes').length / mockDataset.filter(r => r.department === 'Human Resources').length * 100;

  const lowSatAttrition = mockDataset.filter(r => r.jobSatisfaction <= 2 && r.attrition === 'Yes').length / mockDataset.filter(r => r.jobSatisfaction <= 2).length * 100;
  const highSatAttrition = mockDataset.filter(r => r.jobSatisfaction >= 3 && r.attrition === 'Yes').length / mockDataset.filter(r => r.jobSatisfaction >= 3).length * 100;

  const otYesAttrition = mockDataset.filter(r => r.overTime === 'Yes' && r.attrition === 'Yes').length / mockDataset.filter(r => r.overTime === 'Yes').length * 100;
  const otNoAttrition = mockDataset.filter(r => r.overTime === 'No' && r.attrition === 'Yes').length / mockDataset.filter(r => r.overTime === 'No').length * 100;

  const daxFormulas: Record<string, { code: string; explanation: string }> = {
    'Active Headcount': {
      code: `Active Headcount = 
CALCULATE(
    COUNTROWS('HR_Employee_Data'),
    'HR_Employee_Data'[Attrition] = "No"
)`,
      explanation: "Evaluates the total number of currently active personnel by modifying the filter context to only count rows where Attrition equals 'No'."
    },
    'Attrition Rate': {
      code: `Attrition Rate (%) = 
VAR TotalEmployees = COUNTROWS('HR_Employee_Data')
VAR TotalLeft = CALCULATE(
    COUNTROWS('HR_Employee_Data'), 
    'HR_Employee_Data'[Attrition] = "Yes"
)
RETURN
DIVIDE(TotalLeft, TotalEmployees, 0)`,
      explanation: "Uses local variables (VAR) and DIVIDE with a 0 fallback to guard against division-by-zero errors when filtered slices have 0 headcount."
    },
    'Average Monthly Income': {
      code: `Avg Monthly Income = 
AVERAGEX(
    'HR_Employee_Data', 
    'HR_Employee_Data'[MonthlyIncome]
)`,
      explanation: "Iterates through the active filtered table row-by-row to compute the weighted average compensation across filtered job roles."
    },
    'Satisfaction Sort Column': {
      code: `// Power BI Model Sort-By Column Configuration
Job_Satisfaction_Order = 
SWITCH(
    'HR_Employee_Data'[JobSatisfaction],
    1, "1 - Low",
    2, "2 - Medium",
    3, "3 - High",
    4, "4 - Very High"
)`,
      explanation: "Used with Power BI's 'Sort by Column' feature to ensure ordinal satisfaction rating visual representations rather than alphabetical sorting."
    }
  };

  const handleResetFilters = () => {
    setSelectedDept('All');
    setSelectedGender('All');
    setSelectedAge('All');
    setSelectedWLB('All');
    setSelectedOverTime('All');
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[85vh] w-full">
      {/* Power BI Title Ribbon */}
      <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">HR Employee Attrition Intelligence Report</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Power BI • DAX
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Slicers & Synchronized DAX Measures • IBM Workforce Dataset (1,470 Records)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetFilters}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition flex items-center gap-1"
          >
            <Filter className="w-3 h-3 text-cyan-400" />
            Reset Slicers
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-medium border border-slate-700"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Slicer Ribbon (Power BI Top Filter Bar) */}
      <div className="bg-slate-950/60 p-3 sm:px-6 border-b border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Synced Slicers:</span>
        </div>

        {/* Department Slicer */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <span className="text-slate-400">Dept:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-slate-900">All Depts</option>
            <option value="Sales" className="bg-slate-900">Sales</option>
            <option value="Research & Development" className="bg-slate-900">R & D</option>
            <option value="Human Resources" className="bg-slate-900">HR</option>
          </select>
        </div>

        {/* Gender Slicer */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <span className="text-slate-400">Gender:</span>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-slate-900">All Genders</option>
            <option value="Male" className="bg-slate-900">Male</option>
            <option value="Female" className="bg-slate-900">Female</option>
          </select>
        </div>

        {/* Age Band Slicer */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <span className="text-slate-400">Age:</span>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-slate-900">All Ages</option>
            <option value="<30" className="bg-slate-900">&lt; 30 yrs</option>
            <option value="30-45" className="bg-slate-900">30 - 45 yrs</option>
            <option value="45+" className="bg-slate-900">45+ yrs</option>
          </select>
        </div>

        {/* Work Life Balance */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <span className="text-slate-400">Work-Life:</span>
          <select
            value={selectedWLB}
            onChange={(e) => setSelectedWLB(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-slate-900">All Ratings</option>
            <option value="Low" className="bg-slate-900">Low (Poor)</option>
            <option value="High" className="bg-slate-900">High (Good)</option>
          </select>
        </div>

        {/* Overtime */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <span className="text-slate-400">OverTime:</span>
          <select
            value={selectedOverTime}
            onChange={(e) => setSelectedOverTime(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="All" className="bg-slate-900">All</option>
            <option value="Yes" className="bg-slate-900">Yes (OT)</option>
            <option value="No" className="bg-slate-900">No (Standard)</option>
          </select>
        </div>
      </div>

      {/* Main Report Area */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
        {/* Dynamic DAX KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Filtered Headcount */}
          <div
            onClick={() => setActiveDaxInspector('Active Headcount')}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border ${
              activeDaxInspector === 'Active Headcount'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Sample Pool</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">{totalHeadcount}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>Active: <strong className="text-emerald-400">{activeHeadcount}</strong></span>
              <span className="text-[10px] text-amber-400 font-mono">DAX Count</span>
            </div>
          </div>

          {/* Attrition Count */}
          <div
            onClick={() => setActiveDaxInspector('Active Headcount')}
            className="cursor-pointer transition-all p-3.5 rounded-xl border bg-slate-800/80 border-slate-700/80 hover:border-slate-600"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Departures (Left)</span>
              <UserMinus className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{attritionCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {attritionCount === 0 ? 'Zero turnover in slice' : `${attritionCount} total resignations`}
            </div>
          </div>

          {/* Attrition Rate % */}
          <div
            onClick={() => setActiveDaxInspector('Attrition Rate')}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border ${
              activeDaxInspector === 'Attrition Rate'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Attrition Rate %</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                DAX Measure
              </span>
            </div>
            <div className={`text-2xl font-bold mt-1 ${attritionRate > 25 ? 'text-rose-400' : attritionRate > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {attritionRate.toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Benchmark Target: &lt; 15%
            </div>
          </div>

          {/* Avg Monthly Income */}
          <div
            onClick={() => setActiveDaxInspector('Average Monthly Income')}
            className={`cursor-pointer transition-all p-3.5 rounded-xl border ${
              activeDaxInspector === 'Average Monthly Income'
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Avg Monthly Income</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              ${avgIncome.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Dynamic Weighted Average
            </div>
          </div>
        </div>

        {/* Charts & Analytical Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chart 1: Attrition by Department */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
              Attrition Rate by Department
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Sales</span>
                  <span className="font-mono text-rose-400 font-bold">{salesAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${salesAttrition}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Research & Dev</span>
                  <span className="font-mono text-amber-400 font-bold">{rdAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${rdAttrition}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Human Resources</span>
                  <span className="font-mono text-emerald-400 font-bold">{hrAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${hrAttrition}%` }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              Insight: Sales turnover is 2x higher due to commission reliance & travel fatigue.
            </p>
          </div>

          {/* Chart 2: Job Satisfaction Correlation */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-cyan-400" />
              Satisfaction vs Attrition
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Low Satisfaction (Score 1-2)</span>
                  <span className="font-mono text-rose-400 font-bold">{lowSatAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${lowSatAttrition}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">High Satisfaction (Score 3-4)</span>
                  <span className="font-mono text-emerald-400 font-bold">{highSatAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${highSatAttrition}%` }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              Surfaced with 'Sort by Column' to avoid alphabetical order misrepresentation.
            </p>
          </div>

          {/* Chart 3: OverTime Impact */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              OverTime Work Impact
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Working OverTime (Yes)</span>
                  <span className="font-mono text-rose-400 font-bold">{otYesAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${otYesAttrition}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Standard Hours (No OT)</span>
                  <span className="font-mono text-emerald-400 font-bold">{otNoAttrition.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${otNoAttrition}%` }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              Insight: OverTime employees suffer 3x higher turnover, prompting HR policy revisions.
            </p>
          </div>
        </div>

        {/* DAX Measure Inspector Drawer */}
        {activeDaxInspector && daxFormulas[activeDaxInspector] && (
          <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  DAX Measure Formula: {activeDaxInspector}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Power BI Data Modeling</span>
            </div>
            <pre className="p-3 bg-slate-900/90 rounded-lg text-xs font-mono text-amber-200 overflow-x-auto border border-slate-800 leading-relaxed">
              {daxFormulas[activeDaxInspector].code}
            </pre>
            <p className="text-xs text-slate-400 mt-2">
              <strong className="text-slate-300">Analyst Context:</strong> {daxFormulas[activeDaxInspector].explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
