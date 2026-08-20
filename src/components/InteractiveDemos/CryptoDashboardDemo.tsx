import React, { useState } from 'react';
import { 
  ExternalLink, 
  RefreshCw, 
  Code, 
  Layers, 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  FileSpreadsheet, 
  Sliders, 
  ChevronRight,
  Info
} from 'lucide-react';

interface CoinHolding {
  coinId: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  change24h: number;
  lastUpdated: string;
  errorStatus: string;
}

const initialPortfolio: CoinHolding[] = [
  { coinId: 'bitcoin', symbol: 'BTC', quantity: 0.01, buyPrice: 70000, currentPrice: 73104, change24h: 5.452024663, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'dogecoin', symbol: 'DOGE', quantity: 100, buyPrice: 0.09, currentPrice: 0.080304, change24h: 6.910384125, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'ethereum', symbol: 'ETH', quantity: 0.05, buyPrice: 2000, currentPrice: 2324.89, change24h: 3.043319002, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'ripple', symbol: 'XRP', quantity: 50, buyPrice: 1.1, currentPrice: 1.27, change24h: 14.6211107, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'solana', symbol: 'SOL', quantity: 1, buyPrice: 75, currentPrice: 87.64, change24h: 2.338244689, lastUpdated: '8/21/2026', errorStatus: 'OK' }
];

const historyRows = [
  { timestamp: '5/24/2026 6:21:37', coinId: 'bitcoin', price: 76744, change: 1.900253973, status: '' },
  { timestamp: '5/24/2026 6:21:37', coinId: 'dogecoin', price: 0.103022, change: 1.909925277, status: '' },
  { timestamp: '5/24/2026 6:21:37', coinId: 'ethereum', price: 2115.69, change: 2.554614555, status: '' },
  { timestamp: '5/24/2026 6:21:37', coinId: 'ripple', price: 1.36, change: 2.238038435, status: '' },
  { timestamp: '5/24/2026 6:21:37', coinId: 'solana', price: 85.74, change: 1.701840835, status: '' },
  { timestamp: '5/24/2026 6:24:43', coinId: 'bitcoin', price: 76714, change: 1.860251117, status: '' },
  { timestamp: '5/24/2026 6:24:43', coinId: 'dogecoin', price: 0.102942, change: 1.830404991, status: '' },
  { timestamp: '5/24/2026 6:24:43', coinId: 'ethereum', price: 2114.59, change: 2.501211229, status: '' },
  { timestamp: '5/24/2026 6:24:43', coinId: 'ripple', price: 1.36, change: 2.219212063, status: '' },
  { timestamp: '5/24/2026 6:24:43', coinId: 'solana', price: 85.7, change: 1.660772467, status: '' },
  { timestamp: '5/24/2026 6:26:43', coinId: 'bitcoin', price: 76725, change: 1.880848024, status: '' },
  { timestamp: '5/24/2026 6:26:43', coinId: 'dogecoin', price: 0.102936, change: 1.714610069, status: '' },
  { timestamp: '5/24/2026 6:26:43', coinId: 'ethereum', price: 2115, change: 2.531386925, status: '' },
  { timestamp: '5/24/2026 6:26:43', coinId: 'ripple', price: 1.36, change: 2.117344918, status: '' },
  { timestamp: '5/24/2026 6:26:43', coinId: 'solana', price: 85.71, change: 1.593390376, status: '' },
  { timestamp: '5/24/2026 6:28:32', coinId: 'bitcoin', price: 76752, change: 1.917169204, status: 'Gainer' },
  { timestamp: '5/24/2026 6:28:32', coinId: 'dogecoin', price: 0.103011, change: 1.789120039, status: 'Gainer' },
  { timestamp: '5/24/2026 6:28:32', coinId: 'ethereum', price: 2116.16, change: 2.587841681, status: 'Gainer' },
  { timestamp: '5/24/2026 6:28:32', coinId: 'ripple', price: 1.36, change: 2.168562646, status: 'Gainer' },
  { timestamp: '5/24/2026 6:28:32', coinId: 'solana', price: 85.77, change: 1.661680003, status: 'Gainer' },
  { timestamp: '5/24/2026 6:30:50', coinId: 'bitcoin', price: 76742, change: 1.7992451, status: 'Gainer' },
  { timestamp: '5/24/2026 6:30:50', coinId: 'dogecoin', price: 0.103007, change: 1.78544037, status: 'Gainer' }
];

export const CryptoDashboardDemo: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [activeSheetTab, setActiveSheetTab] = useState<'Dashboard' | 'Portfolio' | 'Live Prices' | 'History'>('Dashboard');
  const [viewMode, setViewMode] = useState<'sheets' | 'code'>('sheets');
  const [holdings, setHoldings] = useState<CoinHolding[]>(initialPortfolio);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('Fri Aug 21 2026 05:14:13 GMT+0530 (India Standard Time)');
  const [selectedCell, setSelectedCell] = useState<string>('Dashboard!B5');

  // Calculations
  const calculatedRows = holdings.map((c) => {
    const currentValue = c.quantity * c.currentPrice;
    const totalCost = c.quantity * c.buyPrice;
    const profitLoss = currentValue - totalCost;
    const returnPct = (profitLoss / totalCost) * 100;
    return {
      ...c,
      currentValue,
      totalCost,
      profitLoss,
      returnPct
    };
  });

  const totalPortfolioValue = calculatedRows.reduce((acc, c) => acc + c.currentValue, 0);
  const totalInvestment = calculatedRows.reduce((acc, c) => acc + c.totalCost, 0);
  const totalProfitLoss = totalPortfolioValue - totalInvestment;
  const overallReturnPct = (totalProfitLoss / totalInvestment) * 100;

  // Best & Worst coins by Return %
  const sortedByReturn = [...calculatedRows].sort((a, b) => b.returnPct - a.returnPct);
  const bestCoin = sortedByReturn[0]?.coinId || 'solana';
  const worstCoin = sortedByReturn[sortedByReturn.length - 1]?.coinId || 'dogecoin';

  const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_SpPacj2CpRXJv6S1yaOWxR4ocmxCS_RPi84Ry8eecU/edit?usp=sharing';

  const handleSimulateAppsScriptRun = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHoldings((prev) =>
        prev.map((coin) => {
          const deltaPct = (Math.random() * 3.5 - 1.2);
          const newPrice = Number((coin.currentPrice * (1 + deltaPct / 100)).toFixed(coin.coinId === 'dogecoin' ? 6 : coin.coinId === 'ripple' ? 2 : 2));
          const newChange24h = Number((coin.change24h + deltaPct).toFixed(4));
          return {
            ...coin,
            currentPrice: newPrice,
            change24h: newChange24h,
            lastUpdated: '8/21/2026'
          };
        })
      );
      setIsRefreshing(false);
      setLastRefreshedTime(new Date().toString());
    }, 700);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/90 rounded-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[88vh] w-full">
      {/* Top Google Sheets Style Header */}
      <div className="bg-[#1e293b] border-b border-slate-700 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Green Sheets Icon */}
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/30">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">CryptoTracker</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                Live Google Sheet Replica
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <span>Data</span>
              <span>Tools</span>
              <span className="text-cyan-400 font-medium">Extensions (Apps Script)</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition shadow-md shadow-emerald-600/30 active:scale-95"
            title="Open real Google Spreadsheet in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Sheets</span>
          </a>

          <button
            onClick={handleSimulateAppsScriptRun}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-xl border border-slate-700 transition active:scale-95"
            title="Simulate Google Apps Script trigger fetching CoinGecko API"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Apps Script Executing...' : 'Run Apps Script API'}</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'sheets' ? 'code' : 'sheets')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>{viewMode === 'sheets' ? 'View Script Code' : 'View Spreadsheet'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 flex items-center gap-3 text-xs font-mono">
        <div className="w-24 text-slate-400 font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
          {selectedCell}
        </div>
        <span className="text-slate-500 font-serif italic text-sm">fx</span>
        <div className="text-cyan-300 truncate">
          {activeSheetTab === 'Dashboard' && '=SUM(Portfolio!F2:F6)'}
          {activeSheetTab === 'Portfolio' && '=C2*E2 [Current Value = Quantity * Current Price]'}
          {activeSheetTab === 'Live Prices' && '=fetchLiveCryptoPrices("coingecko_v3")'}
          {activeSheetTab === 'History' && '=HistoricalLogAppender() [Time-driven Trigger]'}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-6">
        {viewMode === 'code' ? (
          /* Code View */
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">
                  Google Apps Script (`Code.gs`)
                </h4>
              </div>
              <a
                href={GOOGLE_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View in Google Sheets Extensions &gt; Apps Script</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
              <pre>{`/**
 * CryptoTracker Automation & Live Sync Script
 * Author: Priyanshu Kumar
 * Integrated APIs: CoinGecko v3 REST API
 * Triggers: Time-driven Hourly Sync + History Logger
 */

function updateLivePricesAndPortfolio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const portfolioSheet = ss.getSheetByName("Portfolio");
  const livePricesSheet = ss.getSheetByName("Live Prices");
  const historySheet = ss.getSheetByName("History");
  
  const coinIds = "bitcoin,dogecoin,ethereum,ripple,solana";
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinIds + '&vs_currencies=usd&include_24hr_change=true';
  
  try {
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
    
    Logger.log("Successfully refreshed all crypto positions at " + now);
  } catch (err) {
    Logger.log("Error in updateLivePricesAndPortfolio: " + err.toString());
  }
}`}</pre>
            </div>
          </div>
        ) : (
          /* Spreadsheet Tab Content */
          <div>
            {/* TAB 1: DASHBOARD */}
            {activeSheetTab === 'Dashboard' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                {/* Title Banner */}
                <div className="bg-[#102236] border border-cyan-900/60 rounded-xl p-4 text-center shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    Crypto Portfolio Dashboard
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    Last Updated: {lastRefreshedTime}
                  </p>
                </div>

                {/* KPI Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg">
                      Total Portfolio Value
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-display">
                      ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg">
                      Total Profit/Loss
                    </div>
                    <div className={`text-2xl sm:text-3xl font-extrabold mt-3 font-display ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ${totalProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg">
                      Overall Return %
                    </div>
                    <div className={`text-2xl sm:text-3xl font-extrabold mt-3 font-display ${overallReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {overallReturnPct >= 0 ? '+' : ''}{overallReturnPct.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Secondary KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg">
                      Best Coin
                    </div>
                    <div className="text-lg font-bold text-emerald-400 mt-2 capitalize">
                      {bestCoin}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg">
                      Worst Coin
                    </div>
                    <div className="text-lg font-bold text-rose-400 mt-2 capitalize">
                      {worstCoin}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg">
                      Total Investment
                    </div>
                    <div className="text-lg font-bold text-slate-200 mt-2">
                      ${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Table and Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Summary Table & P&L Bar Chart */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Summary Table */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-[#102236] text-white font-bold border-b border-slate-800">
                            <tr>
                              <th className="py-2.5 px-4">Coin ID</th>
                              <th className="py-2.5 px-4 text-right">Current Value</th>
                              <th className="py-2.5 px-4 text-right">Profit/Loss</th>
                              <th className="py-2.5 px-4 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {calculatedRows.map((row) => (
                              <tr key={row.coinId} className="hover:bg-slate-800/50">
                                <td className="py-2.5 px-4 font-medium text-slate-200 capitalize">
                                  {row.coinId}
                                </td>
                                <td className="py-2.5 px-4 text-right font-mono text-slate-200">
                                  ${row.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className={`py-2.5 px-4 text-right font-mono font-semibold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {row.profitLoss >= 0 ? '$' : '-$'}{Math.abs(row.profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="py-2.5 px-4 text-center">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                    row.profitLoss >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {row.profitLoss >= 0 ? 'Profit' : 'Loss'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Profit/Loss by Coin Bar Chart (matches Google Sheets Bar Chart) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-slate-300 mb-4">
                        Profit/Loss by Coin ($)
                      </h4>
                      <div className="space-y-3">
                        {calculatedRows.map((row) => {
                          const maxPositive = 35;
                          const isPositive = row.profitLoss >= 0;
                          const widthPct = Math.min(100, (Math.abs(row.profitLoss) / maxPositive) * 100);

                          return (
                            <div key={row.coinId} className="space-y-1 text-xs">
                              <div className="flex justify-between text-slate-400">
                                <span className="capitalize">{row.coinId}</span>
                                <span className={isPositive ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
                                  {isPositive ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)}
                                </span>
                              </div>
                              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex items-center">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${isPositive ? 'bg-blue-500' : 'bg-rose-500'}`}
                                  style={{ width: `${Math.max(4, widthPct)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Coin Allocation Donut Chart (Matches Google Sheets) */}
                  <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 mb-4">
                        Coin Allocation (Portfolio Weight %)
                      </h4>

                      {/* Visual Allocation Stack */}
                      <div className="flex h-5 rounded-lg overflow-hidden my-4 border border-slate-800">
                        {calculatedRows.map((row) => {
                          const pct = (row.currentValue / totalPortfolioValue) * 100;
                          const colorClass = 
                            row.coinId === 'bitcoin' ? 'bg-[#ea4335]' :
                            row.coinId === 'ethereum' ? 'bg-[#34a853]' :
                            row.coinId === 'solana' ? 'bg-[#00acc1]' :
                            row.coinId === 'ripple' ? 'bg-[#fb8c00]' : 'bg-[#fbc02d]';

                          return (
                            <div
                              key={row.coinId}
                              className={`${colorClass} hover:opacity-90 transition`}
                              style={{ width: `${pct}%` }}
                              title={`${row.coinId}: ${pct.toFixed(1)}%`}
                            />
                          );
                        })}
                      </div>

                      {/* Allocation Legend with Percentages */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {calculatedRows.map((row) => {
                          const pct = (row.currentValue / totalPortfolioValue) * 100;
                          const colorDot = 
                            row.coinId === 'bitcoin' ? 'bg-[#ea4335]' :
                            row.coinId === 'ethereum' ? 'bg-[#34a853]' :
                            row.coinId === 'solana' ? 'bg-[#00acc1]' :
                            row.coinId === 'ripple' ? 'bg-[#fb8c00]' : 'bg-[#fbc02d]';

                          return (
                            <div key={row.coinId} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                              <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${colorDot}`} />
                                <span className="text-slate-200 capitalize font-medium">{row.coinId}</span>
                              </div>
                              <span className="font-mono text-cyan-400 font-bold">{pct.toFixed(1)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 mt-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Formula: =F2/SUM(F2:F6)</span>
                      <span className="text-cyan-400 font-medium">Auto-Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PORTFOLIO */}
            {activeSheetTab === 'Portfolio' && (
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Portfolio Tab (Core Holdings & Calculations)</span>
                  </h3>
                  <span className="text-xs text-slate-400">Sheet: Portfolio</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">Coin ID</th>
                          <th className="py-2.5 px-3">Symbol</th>
                          <th className="py-2.5 px-3 text-right">Quantity</th>
                          <th className="py-2.5 px-3 text-right">Buy Price</th>
                          <th className="py-2.5 px-3 text-right">Current Price</th>
                          <th className="py-2.5 px-3 text-right">Current Value</th>
                          <th className="py-2.5 px-3 text-right">Profit/Loss</th>
                          <th className="py-2.5 px-3 text-right">Return%</th>
                          <th className="py-2.5 px-3">Last Updated</th>
                          <th className="py-2.5 px-3 text-center">Error Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {calculatedRows.map((row) => (
                          <tr key={row.coinId} className="hover:bg-slate-800/40">
                            <td className="py-2.5 px-3 font-medium text-white capitalize">{row.coinId}</td>
                            <td className="py-2.5 px-3 text-slate-300 font-mono">{row.symbol}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-slate-200">{row.quantity}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-slate-400">${row.buyPrice}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-white font-semibold">${row.currentPrice}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-slate-200 font-bold">${row.currentValue.toFixed(2)}</td>
                            <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {row.profitLoss.toFixed(2)}
                            </td>
                            <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {row.returnPct.toFixed(2)}%
                            </td>
                            <td className="py-2.5 px-3 text-slate-400 text-[11px]">{row.lastUpdated}</td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                                {row.errorStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE PRICES */}
            {activeSheetTab === 'Live Prices' && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Live Prices Tab (Direct REST API Output)</span>
                  </h3>
                  <span className="text-xs text-slate-400">Sheet: Live Prices</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Coin ID</th>
                          <th className="py-2.5 px-4 text-right">Current Price USD</th>
                          <th className="py-2.5 px-4 text-right">24h Change %</th>
                          <th className="py-2.5 px-4 text-center">Status</th>
                          <th className="py-2.5 px-4">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {calculatedRows.map((row) => (
                          <tr key={row.coinId} className="hover:bg-slate-800/40">
                            <td className="py-2.5 px-4 font-medium text-white capitalize">{row.coinId}</td>
                            <td className="py-2.5 px-4 text-right font-mono text-white font-semibold">${row.currentPrice}</td>
                            <td className="py-2.5 px-4 text-right font-mono text-emerald-400 font-bold">
                              {row.change24h.toFixed(4)}%
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[11px] font-bold border border-emerald-500/30">
                                Gainer
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-400 text-[11px] font-mono">8/21/2026 5:14:1</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: HISTORY */}
            {activeSheetTab === 'History' && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>History Tab (Time-Series Append Logs)</span>
                  </h3>
                  <span className="text-xs text-slate-400">Sheet: History ({historyRows.length} logged records)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-4">Date/Time</th>
                        <th className="py-2.5 px-4">Coin ID</th>
                        <th className="py-2.5 px-4 text-right">Price</th>
                        <th className="py-2.5 px-4 text-right">24h Change %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {historyRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-2 px-4 text-slate-400">{row.timestamp}</td>
                          <td className="py-2 px-4 font-medium text-slate-200 capitalize">{row.coinId}</td>
                          <td className="py-2 px-4 text-right text-white">${row.price}</td>
                          <td className="py-2 px-4 text-right text-emerald-400">
                            {row.change.toFixed(4)}% {row.status && `(${row.status})`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Google Sheets Tab Switcher Bar */}
      <div className="bg-slate-950 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="p-1 text-slate-500 font-bold px-2">+</span>
          <span className="p-1 text-slate-500 px-2">≡</span>

          <button
            onClick={() => {
              setActiveSheetTab('Portfolio');
              setViewMode('sheets');
              setSelectedCell('Portfolio!A1');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 ${
              activeSheetTab === 'Portfolio' && viewMode === 'sheets'
                ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Portfolio</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>

          <button
            onClick={() => {
              setActiveSheetTab('Live Prices');
              setViewMode('sheets');
              setSelectedCell('Live Prices!A1');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 ${
              activeSheetTab === 'Live Prices' && viewMode === 'sheets'
                ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Live Prices</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>

          <button
            onClick={() => {
              setActiveSheetTab('History');
              setViewMode('sheets');
              setSelectedCell('History!A1');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 ${
              activeSheetTab === 'History' && viewMode === 'sheets'
                ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>History</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>

          <button
            onClick={() => {
              setActiveSheetTab('Dashboard');
              setViewMode('sheets');
              setSelectedCell('Dashboard!B5');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 ${
              activeSheetTab === 'Dashboard' && viewMode === 'sheets'
                ? 'bg-slate-800 text-emerald-400 font-bold border-b-2 border-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Dashboard</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CoinGecko API Connected</span>
          </span>
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>docs.google.com/spreadsheets</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
