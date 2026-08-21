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
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  X,
  PieChart,
  BarChart3,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

export interface CoinHolding {
  coinId: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  change24h: number;
  lastUpdated: string;
  errorStatus: string;
}

const PRESET_COINS = [
  { coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', defaultPrice: 73104, defaultBuyPrice: 68000, defaultQty: 0.02, change24h: 5.45 },
  { coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum', defaultPrice: 2324.89, defaultBuyPrice: 2100, defaultQty: 0.1, change24h: 3.04 },
  { coinId: 'solana', symbol: 'SOL', name: 'Solana', defaultPrice: 87.64, defaultBuyPrice: 75, defaultQty: 2, change24h: 2.34 },
  { coinId: 'ripple', symbol: 'XRP', name: 'Ripple', defaultPrice: 1.27, defaultBuyPrice: 1.10, defaultQty: 100, change24h: 14.62 },
  { coinId: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', defaultPrice: 0.0803, defaultBuyPrice: 0.09, defaultQty: 500, change24h: 6.91 },
  { coinId: 'cardano', symbol: 'ADA', name: 'Cardano', defaultPrice: 0.68, defaultBuyPrice: 0.55, defaultQty: 150, change24h: 4.12 },
  { coinId: 'avalanche', symbol: 'AVAX', name: 'Avalanche', defaultPrice: 34.50, defaultBuyPrice: 28, defaultQty: 5, change24h: 5.80 },
  { coinId: 'chainlink', symbol: 'LINK', name: 'Chainlink', defaultPrice: 18.20, defaultBuyPrice: 15, defaultQty: 10, change24h: 3.40 },
  { coinId: 'polygon', symbol: 'POL', name: 'Polygon', defaultPrice: 0.52, defaultBuyPrice: 0.60, defaultQty: 200, change24h: -1.15 },
  { coinId: 'binancecoin', symbol: 'BNB', name: 'BNB', defaultPrice: 590.00, defaultBuyPrice: 540, defaultQty: 0.5, change24h: 2.10 },
];

const initialPortfolio: CoinHolding[] = [
  { coinId: 'bitcoin', symbol: 'BTC', quantity: 0.01, buyPrice: 70000, currentPrice: 73104, change24h: 5.452024663, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'dogecoin', symbol: 'DOGE', quantity: 100, buyPrice: 0.09, currentPrice: 0.080304, change24h: 6.910384125, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'ethereum', symbol: 'ETH', quantity: 0.05, buyPrice: 2000, currentPrice: 2324.89, change24h: 3.043319002, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'ripple', symbol: 'XRP', quantity: 50, buyPrice: 1.1, currentPrice: 1.27, change24h: 14.6211107, lastUpdated: '8/21/2026', errorStatus: 'OK' },
  { coinId: 'solana', symbol: 'SOL', quantity: 1, buyPrice: 75, currentPrice: 87.64, change24h: 2.338244689, lastUpdated: '8/21/2026', errorStatus: 'OK' }
];

const initialHistoryRows = [
  { timestamp: '8/21/2026 6:21:37', coinId: 'bitcoin', price: 76744, change: 1.900253973, status: '' },
  { timestamp: '8/21/2026 6:21:37', coinId: 'dogecoin', price: 0.103022, change: 1.909925277, status: '' },
  { timestamp: '8/21/2026 6:21:37', coinId: 'ethereum', price: 2115.69, change: 2.554614555, status: '' },
  { timestamp: '8/21/2026 6:21:37', coinId: 'ripple', price: 1.36, change: 2.238038435, status: '' },
  { timestamp: '8/21/2026 6:21:37', coinId: 'solana', price: 85.74, change: 1.701840835, status: '' },
  { timestamp: '8/21/2026 6:24:43', coinId: 'bitcoin', price: 76714, change: 1.860251117, status: '' },
  { timestamp: '8/21/2026 6:24:43', coinId: 'dogecoin', price: 0.102942, change: 1.830404991, status: '' },
  { timestamp: '8/21/2026 6:24:43', coinId: 'ethereum', price: 2114.59, change: 2.501211229, status: '' },
  { timestamp: '8/21/2026 6:24:43', coinId: 'ripple', price: 1.36, change: 2.219212063, status: '' },
  { timestamp: '8/21/2026 6:24:43', coinId: 'solana', price: 85.7, change: 1.660772467, status: '' },
  { timestamp: '8/21/2026 6:26:43', coinId: 'bitcoin', price: 76725, change: 1.880848024, status: '' },
  { timestamp: '8/21/2026 6:26:43', coinId: 'dogecoin', price: 0.102936, change: 1.714610069, status: '' },
  { timestamp: '8/21/2026 6:26:43', coinId: 'ethereum', price: 2115, change: 2.531386925, status: '' },
  { timestamp: '8/21/2026 6:26:43', coinId: 'ripple', price: 1.36, change: 2.117344918, status: '' },
  { timestamp: '8/21/2026 6:26:43', coinId: 'solana', price: 85.71, change: 1.593390376, status: '' },
  { timestamp: '8/21/2026 6:28:32', coinId: 'bitcoin', price: 76752, change: 1.917169204, status: 'Gainer' },
  { timestamp: '8/21/2026 6:28:32', coinId: 'dogecoin', price: 0.103011, change: 1.789120039, status: 'Gainer' },
  { timestamp: '8/21/2026 6:28:32', coinId: 'ethereum', price: 2116.16, change: 2.587841681, status: 'Gainer' },
  { timestamp: '8/21/2026 6:28:32', coinId: 'ripple', price: 1.36, change: 2.168562646, status: 'Gainer' },
  { timestamp: '8/21/2026 6:28:32', coinId: 'solana', price: 85.77, change: 1.661680003, status: 'Gainer' },
];

export const CryptoDashboardDemo: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [activeSheetTab, setActiveSheetTab] = useState<'Dashboard' | 'Portfolio' | 'Live Prices' | 'History'>('Dashboard');
  const [viewMode, setViewMode] = useState<'sheets' | 'code'>('sheets');
  const [holdings, setHoldings] = useState<CoinHolding[]>(initialPortfolio);
  const [historyRows, setHistoryRows] = useState(initialHistoryRows);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('Fri Aug 21 2026 05:14:13 GMT+0530 (India Standard Time)');
  const [selectedCell, setSelectedCell] = useState<string>('Dashboard!B5');

  // Modal / Form state for Adding / Customizing Coins
  const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
  const [newCoinType, setNewCoinType] = useState<string>('cardano');
  const [customCoinId, setCustomCoinId] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [customQuantity, setCustomQuantity] = useState('50');
  const [customBuyPrice, setCustomBuyPrice] = useState('0.55');
  const [customCurrentPrice, setCustomCurrentPrice] = useState('0.68');
  const [formError, setFormError] = useState<string | null>(null);

  // Edit inline state
  const [editingCoinId, setEditingCoinId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>('');
  const [editBuyPrice, setEditBuyPrice] = useState<string>('');
  const [editCurrentPrice, setEditCurrentPrice] = useState<string>('');

  // Handle preset selection
  const handleSelectPreset = (presetId: string) => {
    setNewCoinType(presetId);
    setFormError(null);
    if (presetId === 'custom') {
      setCustomCoinId('');
      setCustomSymbol('');
      setCustomQuantity('10');
      setCustomBuyPrice('100');
      setCustomCurrentPrice('115');
    } else {
      const preset = PRESET_COINS.find(p => p.coinId === presetId);
      if (preset) {
        setCustomCoinId(preset.coinId);
        setCustomSymbol(preset.symbol);
        setCustomQuantity(preset.defaultQty.toString());
        setCustomBuyPrice(preset.defaultBuyPrice.toString());
        setCustomCurrentPrice(preset.defaultPrice.toString());
      }
    }
  };

  // Safe Calculations
  const calculatedRows = holdings.map((c) => {
    const qty = Number(c.quantity) || 0;
    const currentP = Number(c.currentPrice) || 0;
    const buyP = Number(c.buyPrice) || 0;
    const currentValue = qty * currentP;
    const totalCost = qty * buyP;
    const profitLoss = currentValue - totalCost;
    const returnPct = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;
    return {
      ...c,
      quantity: qty,
      currentPrice: currentP,
      buyPrice: buyP,
      currentValue,
      totalCost,
      profitLoss,
      returnPct
    };
  });

  const totalPortfolioValue = calculatedRows.reduce((acc, c) => acc + c.currentValue, 0);
  const totalInvestment = calculatedRows.reduce((acc, c) => acc + c.totalCost, 0);
  const totalProfitLoss = totalPortfolioValue - totalInvestment;
  const overallReturnPct = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;

  // Best & Worst coins by Return %
  const sortedByReturn = [...calculatedRows].sort((a, b) => b.returnPct - a.returnPct);
  const bestCoin = sortedByReturn[0]?.coinId || 'None';
  const worstCoin = sortedByReturn[sortedByReturn.length - 1]?.coinId || 'None';

  const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_SpPacj2CpRXJv6S1yaOWxR4ocmxCS_RPi84Ry8eecU/edit?usp=sharing';

  // Add / Upsert coin handler
  const handleAddCoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const coinId = (newCoinType === 'custom' ? customCoinId : newCoinType).trim().toLowerCase();
    const symbol = (newCoinType === 'custom' ? customSymbol : PRESET_COINS.find(p => p.coinId === newCoinType)?.symbol || coinId.slice(0, 4)).toUpperCase().trim();
    const qty = parseFloat(customQuantity);
    const buyP = parseFloat(customBuyPrice);
    const currP = parseFloat(customCurrentPrice);

    if (!coinId) {
      setFormError('Please enter a valid Coin Name or ID.');
      return;
    }
    if (isNaN(qty) || qty <= 0) {
      setFormError('Please enter a valid positive quantity.');
      return;
    }
    if (isNaN(buyP) || buyP < 0) {
      setFormError('Please enter a valid buy price.');
      return;
    }
    if (isNaN(currP) || currP < 0) {
      setFormError('Please enter a valid current price.');
      return;
    }

    const change24h = buyP > 0 ? Number((((currP - buyP) / buyP) * 100).toFixed(2)) : 0;
    const now = '8/21/2026';

    setHoldings(prev => {
      const existingIndex = prev.findIndex(c => c.coinId.toLowerCase() === coinId);
      if (existingIndex >= 0) {
        // Update existing coin
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: qty,
          buyPrice: buyP,
          currentPrice: currP,
          change24h,
          lastUpdated: now,
          errorStatus: 'OK'
        };
        return updated;
      } else {
        // Append new coin
        return [
          ...prev,
          {
            coinId,
            symbol: symbol || coinId.toUpperCase().slice(0, 4),
            quantity: qty,
            buyPrice: buyP,
            currentPrice: currP,
            change24h,
            lastUpdated: now,
            errorStatus: 'OK'
          }
        ];
      }
    });

    // Also log to history
    setHistoryRows(prev => [
      {
        timestamp: `8/21/2026 ${new Date().toLocaleTimeString()}`,
        coinId,
        price: currP,
        change: change24h,
        status: change24h >= 0 ? 'Gainer' : 'Dip'
      },
      ...prev.slice(0, 30)
    ]);

    setIsAddCoinOpen(false);
    setLastRefreshedTime(new Date().toString());
  };

  // Remove a coin
  const handleRemoveCoin = (coinId: string) => {
    setHoldings(prev => prev.filter(c => c.coinId !== coinId));
  };

  // Reset to default
  const handleResetToDefault = () => {
    setHoldings(initialPortfolio);
    setHistoryRows(initialHistoryRows);
    setLastRefreshedTime(new Date().toString());
    setEditingCoinId(null);
  };

  // Start inline editing
  const startEditing = (coin: CoinHolding) => {
    setEditingCoinId(coin.coinId);
    setEditQuantity(coin.quantity.toString());
    setEditBuyPrice(coin.buyPrice.toString());
    setEditCurrentPrice(coin.currentPrice.toString());
  };

  // Save inline edit
  const saveEditing = (coinId: string) => {
    const qty = parseFloat(editQuantity);
    const buyP = parseFloat(editBuyPrice);
    const currP = parseFloat(editCurrentPrice);

    if (!isNaN(qty) && qty > 0 && !isNaN(buyP) && buyP >= 0 && !isNaN(currP) && currP >= 0) {
      setHoldings(prev =>
        prev.map(c =>
          c.coinId === coinId
            ? { ...c, quantity: qty, buyPrice: buyP, currentPrice: currP, lastUpdated: '8/21/2026' }
            : c
        )
      );
    }
    setEditingCoinId(null);
  };

  // Color generator for dynamic coins
  const getCoinColor = (coinId: string, index: number) => {
    const palette = [
      '#ea4335', // Red (BTC)
      '#34a853', // Green (ETH)
      '#00acc1', // Cyan (SOL)
      '#fb8c00', // Orange (XRP)
      '#fbc02d', // Yellow (DOGE)
      '#8e24aa', // Purple (ADA)
      '#e91e63', // Pink (DOT)
      '#00897b', // Teal (LINK)
      '#3949ab', // Indigo (MATIC)
      '#d81b60', // Rose (AVAX)
      '#039be5', // Sky (BNB)
    ];
    if (coinId === 'bitcoin') return '#ea4335';
    if (coinId === 'ethereum') return '#34a853';
    if (coinId === 'solana') return '#00acc1';
    if (coinId === 'ripple') return '#fb8c00';
    if (coinId === 'dogecoin') return '#fbc02d';
    if (coinId === 'cardano') return '#8e24aa';
    if (coinId === 'polkadot') return '#e91e63';
    if (coinId === 'chainlink') return '#00897b';
    if (coinId === 'polygon') return '#3949ab';
    if (coinId === 'avalanche') return '#d81b60';
    if (coinId === 'binancecoin') return '#039be5';

    return palette[index % palette.length];
  };

  const handleSimulateAppsScriptRun = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHoldings((prev) =>
        prev.map((coin) => {
          const deltaPct = (Math.random() * 3.5 - 1.2);
          const newPrice = Number((coin.currentPrice * (1 + deltaPct / 100)).toFixed(coin.currentPrice < 1 ? 6 : 2));
          const newChange24h = Number((coin.change24h + deltaPct).toFixed(4));
          return {
            ...coin,
            currentPrice: newPrice,
            change24h: newChange24h,
            lastUpdated: '8/21/2026'
          };
        })
      );

      // Append updated rows to history
      const nowStr = new Date().toLocaleTimeString();
      setHistoryRows(prev => [
        ...holdings.slice(0, 3).map(h => ({
          timestamp: `8/21/2026 ${nowStr}`,
          coinId: h.coinId,
          price: Number((h.currentPrice * 1.01).toFixed(2)),
          change: Number((h.change24h + 1.1).toFixed(3)),
          status: 'Synced'
        })),
        ...prev.slice(0, 25)
      ]);

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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-sky-500/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Custom Coins Interactive</span>
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
        <div className="flex items-center flex-wrap gap-2">
          {/* Add Coin Button */}
          <button
            onClick={() => {
              handleSelectPreset('cardano');
              setIsAddCoinOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/30 active:scale-95 cursor-pointer"
            title="Add new crypto holding to demo"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Crypto Coin</span>
          </button>

          {/* Reset button if modified */}
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl border border-slate-700 transition active:scale-95 cursor-pointer"
            title="Reset portfolio to default demo coins"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition shadow-md shadow-emerald-600/30 active:scale-95"
            title="Open real Google Spreadsheet in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open in Google Sheets</span>
          </a>

          <button
            onClick={handleSimulateAppsScriptRun}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-xl border border-slate-700 transition active:scale-95 cursor-pointer"
            title="Simulate Google Apps Script trigger fetching CoinGecko API"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Run Apps Script API'}</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'sheets' ? 'code' : 'sheets')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{viewMode === 'sheets' ? 'View Code' : 'View Sheet'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Interactive Quick Add / Status Banner */}
      <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <div className="text-slate-400 font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
            {selectedCell}
          </div>
          <span className="text-slate-500 font-serif italic text-sm">fx</span>
          <div className="text-cyan-300 truncate max-w-md">
            {activeSheetTab === 'Dashboard' && `=SUM(Portfolio!F2:F${holdings.length + 1}) [Dynamic Sum of ${holdings.length} Active Positions]`}
            {activeSheetTab === 'Portfolio' && '=C2*E2 [Current Value = Quantity * Current Price]'}
            {activeSheetTab === 'Live Prices' && '=fetchLiveCryptoPrices("coingecko_v3")'}
            {activeSheetTab === 'History' && '=HistoricalLogAppender() [Time-driven Trigger]'}
          </div>
        </div>

        {/* Quick presets pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Quick Add:</span>
          {PRESET_COINS.filter(p => !holdings.some(h => h.coinId === p.coinId)).slice(0, 3).map(preset => (
            <button
              key={preset.coinId}
              onClick={() => {
                handleSelectPreset(preset.coinId);
                setIsAddCoinOpen(true);
              }}
              className="px-2 py-0.5 text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-300 rounded-md transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{preset.symbol}</span>
            </button>
          ))}
          <button
            onClick={() => {
              handleSelectPreset('custom');
              setIsAddCoinOpen(true);
            }}
            className="px-2 py-0.5 text-[11px] bg-blue-950 hover:bg-blue-900 border border-blue-700 text-blue-300 rounded-md transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-2.5 h-2.5" />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-6 relative">
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
  
  // Read dynamic active holdings
  const lastRow = portfolioSheet.getLastRow();
  const holdings = portfolioSheet.getRange(2, 1, Math.max(1, lastRow - 1), 4).getValues();
  const coinIds = holdings.map(r => r[0].toString().toLowerCase().trim()).filter(Boolean).join(",");
  
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + coinIds + '&vs_currencies=usd&include_24hr_change=true';
  
  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    const now = new Date();
    
    // 1. Update Portfolio Tab Prices & Error Status dynamically
    holdings.forEach((row, index) => {
      const coinId = row[0].toString().toLowerCase();
      if (data[coinId]) {
        portfolioSheet.getRange(index + 2, 5).setValue(data[coinId].usd); // Current Price
        portfolioSheet.getRange(index + 2, 9).setValue(now);              // Last Updated
        portfolioSheet.getRange(index + 2, 10).setValue("OK");           // Error Status
        
        // 2. Append to History tab for time-series logging
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
                <div className="bg-[#102236] border border-cyan-900/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                      <span>Crypto Portfolio Dashboard</span>
                      <span className="text-xs font-mono font-normal px-2.5 py-0.5 bg-blue-900/50 text-sky-300 border border-blue-700/60 rounded-full">
                        {holdings.length} Coins Active
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      Last Updated: {lastRefreshedTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleSelectPreset('cardano');
                        setIsAddCoinOpen(true);
                      }}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add / Buy Coin</span>
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                      <span>Total Portfolio Value</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-display">
                      ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      {totalProfitLoss >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>Total Profit / Loss</span>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-extrabold mt-3 font-display ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {totalProfitLoss >= 0 ? '+$' : '-$'}{Math.abs(totalProfitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Overall Return %</span>
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
                      Best Performing Coin
                    </div>
                    <div className="text-lg font-bold text-emerald-400 mt-2 capitalize flex items-center justify-center gap-1">
                      <span>{bestCoin}</span>
                      {calculatedRows.length > 0 && (
                        <span className="text-xs font-mono font-normal">
                          (+{sortedByReturn[0]?.returnPct.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg">
                      Worst Performing Coin
                    </div>
                    <div className="text-lg font-bold text-rose-400 mt-2 capitalize flex items-center justify-center gap-1">
                      <span>{worstCoin}</span>
                      {calculatedRows.length > 0 && (
                        <span className="text-xs font-mono font-normal">
                          ({sortedByReturn[sortedByReturn.length - 1]?.returnPct.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg">
                      Total Cost / Investment
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
                      <div className="p-3 bg-[#102236] border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-sky-400" />
                          <span>Holdings Summary ({calculatedRows.length} positions)</span>
                        </span>
                        <button
                          onClick={() => {
                            setActiveSheetTab('Portfolio');
                            setSelectedCell('Portfolio!A1');
                          }}
                          className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Manage / Edit</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="overflow-x-auto max-h-72 overflow-y-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
                            <tr>
                              <th className="py-2.5 px-3">Coin</th>
                              <th className="py-2.5 px-3 text-right">Holdings</th>
                              <th className="py-2.5 px-3 text-right">Value</th>
                              <th className="py-2.5 px-3 text-right">P&amp;L</th>
                              <th className="py-2.5 px-2 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {calculatedRows.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-400">
                                  No coins in portfolio. Click "Add Crypto Coin" above to test.
                                </td>
                              </tr>
                            ) : (
                              calculatedRows.map((row, idx) => (
                                <tr key={row.coinId} className="hover:bg-slate-800/50">
                                  <td className="py-2.5 px-3 font-medium text-slate-200 capitalize flex items-center gap-2">
                                    <span 
                                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                                      style={{ backgroundColor: getCoinColor(row.coinId, idx) }} 
                                    />
                                    <div>
                                      <div className="font-semibold text-white">{row.coinId}</div>
                                      <div className="text-[10px] text-slate-400 font-mono">{row.symbol}</div>
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                                    <div>{row.quantity}</div>
                                    <div className="text-[10px] text-slate-500">${row.currentPrice}</div>
                                  </td>
                                  <td className="py-2.5 px-3 text-right font-mono text-slate-200 font-semibold">
                                    ${row.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </td>
                                  <td className={`py-2.5 px-3 text-right font-mono font-semibold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    <div>
                                      {row.profitLoss >= 0 ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)}
                                    </div>
                                    <div className="text-[10px]">
                                      {row.returnPct >= 0 ? '+' : ''}{row.returnPct.toFixed(1)}%
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-2 text-center">
                                    <button
                                      onClick={() => handleRemoveCoin(row.coinId)}
                                      className="p-1 text-slate-500 hover:text-rose-400 transition rounded hover:bg-slate-800 cursor-pointer"
                                      title="Remove from demo"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Profit/Loss by Coin Bar Chart */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-slate-300">
                          Profit / Loss by Coin ($)
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono">Dynamic Bar Chart</span>
                      </div>
                      
                      <div className="space-y-3">
                        {calculatedRows.length === 0 ? (
                          <div className="py-6 text-center text-xs text-slate-500">
                            Add coins to visualize P&amp;L breakdown
                          </div>
                        ) : (
                          calculatedRows.map((row) => {
                            const maxAbsPL = Math.max(...calculatedRows.map(r => Math.abs(r.profitLoss)), 10);
                            const isPositive = row.profitLoss >= 0;
                            const widthPct = Math.min(100, (Math.abs(row.profitLoss) / maxAbsPL) * 100);

                            return (
                              <div key={row.coinId} className="space-y-1 text-xs">
                                <div className="flex justify-between text-slate-400">
                                  <span className="capitalize font-medium text-slate-200">{row.coinId} ({row.symbol})</span>
                                  <span className={isPositive ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
                                    {isPositive ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)} ({row.returnPct.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex items-center p-0.5 border border-slate-800/80">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                    style={{ width: `${Math.max(4, widthPct)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Coin Allocation Breakdown */}
                  <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <PieChart className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Coin Allocation (Portfolio Weight %)</span>
                        </h4>
                        <span className="text-[11px] text-cyan-400 font-mono font-semibold">100% Normalized</span>
                      </div>

                      {/* Visual Allocation Stack */}
                      <div className="flex h-6 rounded-lg overflow-hidden my-4 border border-slate-800 bg-slate-950">
                        {totalPortfolioValue === 0 ? (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                            Portfolio Empty
                          </div>
                        ) : (
                          calculatedRows.map((row, idx) => {
                            const pct = totalPortfolioValue > 0 ? (row.currentValue / totalPortfolioValue) * 100 : 0;
                            if (pct <= 0) return null;

                            return (
                              <div
                                key={row.coinId}
                                className="h-full transition-all hover:opacity-90 cursor-help"
                                style={{
                                  width: `${pct}%`,
                                  backgroundColor: getCoinColor(row.coinId, idx)
                                }}
                                title={`${row.coinId} (${row.symbol}): $${row.currentValue.toFixed(2)} (${pct.toFixed(1)}%)`}
                              />
                            );
                          })
                        )}
                      </div>

                      {/* Allocation Legend with Percentages */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-h-64 overflow-y-auto">
                        {calculatedRows.map((row, idx) => {
                          const pct = totalPortfolioValue > 0 ? (row.currentValue / totalPortfolioValue) * 100 : 0;
                          const colorDot = getCoinColor(row.coinId, idx);

                          return (
                            <div key={row.coinId} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                              <div className="flex items-center gap-2 truncate">
                                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: colorDot }} />
                                <span className="text-slate-200 capitalize font-medium truncate">{row.coinId}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{row.symbol}</span>
                              </div>
                              <span className="font-mono text-cyan-400 font-bold ml-2">{pct.toFixed(1)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 mt-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-slate-400">Formula: =F2/SUM(F2:F{holdings.length + 1})</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Dynamic Real-Time Rebalancing</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PORTFOLIO */}
            {activeSheetTab === 'Portfolio' && (
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Portfolio Tab (Core Holdings &amp; Calculations)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Directly edit quantities, buy prices, or add new crypto positions to simulate portfolio changes.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleSelectPreset('cardano');
                        setIsAddCoinOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Row</span>
                    </button>
                    <button
                      onClick={handleResetToDefault}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
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
                          <th className="py-2.5 px-3 text-center">Status</th>
                          <th className="py-2.5 px-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {calculatedRows.map((row) => {
                          const isEditing = editingCoinId === row.coinId;

                          return (
                            <tr key={row.coinId} className="hover:bg-slate-800/40">
                              <td className="py-2.5 px-3 font-medium text-white capitalize">{row.coinId}</td>
                              <td className="py-2.5 px-3 text-slate-300 font-mono">{row.symbol}</td>
                              
                              {/* Quantity */}
                              <td className="py-2.5 px-3 text-right font-mono text-slate-200">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    step="any"
                                    value={editQuantity}
                                    onChange={(e) => setEditQuantity(e.target.value)}
                                    className="w-20 bg-slate-950 border border-blue-500 rounded px-1.5 py-0.5 text-right text-white font-mono"
                                  />
                                ) : (
                                  row.quantity
                                )}
                              </td>

                              {/* Buy Price */}
                              <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    step="any"
                                    value={editBuyPrice}
                                    onChange={(e) => setEditBuyPrice(e.target.value)}
                                    className="w-24 bg-slate-950 border border-blue-500 rounded px-1.5 py-0.5 text-right text-white font-mono"
                                  />
                                ) : (
                                  `$${row.buyPrice}`
                                )}
                              </td>

                              {/* Current Price */}
                              <td className="py-2.5 px-3 text-right font-mono text-white font-semibold">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    step="any"
                                    value={editCurrentPrice}
                                    onChange={(e) => setEditCurrentPrice(e.target.value)}
                                    className="w-24 bg-slate-950 border border-blue-500 rounded px-1.5 py-0.5 text-right text-white font-mono"
                                  />
                                ) : (
                                  `$${row.currentPrice}`
                                )}
                              </td>

                              {/* Calculated Current Value */}
                              <td className="py-2.5 px-3 text-right font-mono text-slate-200 font-bold">
                                ${row.currentValue.toFixed(2)}
                              </td>

                              {/* Profit/Loss */}
                              <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {row.profitLoss >= 0 ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)}
                              </td>

                              {/* Return % */}
                              <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {row.returnPct >= 0 ? '+' : ''}{row.returnPct.toFixed(2)}%
                              </td>

                              <td className="py-2.5 px-3 text-slate-400 text-[11px]">{row.lastUpdated}</td>

                              <td className="py-2.5 px-3 text-center">
                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                                  {row.errorStatus}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-2.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {isEditing ? (
                                    <>
                                      <button
                                        onClick={() => saveEditing(row.coinId)}
                                        className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition cursor-pointer"
                                        title="Save edits"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => setEditingCoinId(null)}
                                        className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition cursor-pointer"
                                        title="Cancel"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => startEditing(row)}
                                        className="p-1 text-slate-400 hover:text-sky-300 rounded hover:bg-slate-800 transition cursor-pointer"
                                        title="Edit coin quantity or prices"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleRemoveCoin(row.coinId)}
                                        className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition cursor-pointer"
                                        title="Remove coin"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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
                  <span className="text-xs text-slate-400">Sheet: Live Prices ({holdings.length} tracked assets)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Coin ID</th>
                          <th className="py-2.5 px-4">Symbol</th>
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
                            <td className="py-2.5 px-4 font-mono text-slate-300">{row.symbol}</td>
                            <td className="py-2.5 px-4 text-right font-mono text-white font-semibold">${row.currentPrice}</td>
                            <td className={`py-2.5 px-4 text-right font-mono font-bold ${row.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {row.change24h >= 0 ? '+' : ''}{row.change24h.toFixed(2)}%
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                                row.change24h >= 0 
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              }`}>
                                {row.change24h >= 0 ? 'Gainer' : 'Dip'}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-400 text-[11px] font-mono">{row.lastUpdated}</td>
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
                          <td className={`py-2 px-4 text-right ${row.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}% {row.status && `(${row.status})`}
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

        {/* MODAL / DIALOG: Add & Manipulate Crypto Coin */}
        {isAddCoinOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Add Crypto to Demo Portfolio</h3>
                    <p className="text-xs text-slate-400">Specify coin details, amount, and buy price</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddCoinOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleAddCoinSubmit} className="space-y-4 text-xs">
                {/* Preset or Custom Selector */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Select Coin Preset or Custom
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                    {PRESET_COINS.map((p) => (
                      <button
                        key={p.coinId}
                        type="button"
                        onClick={() => handleSelectPreset(p.coinId)}
                        className={`p-2 rounded-lg border text-left transition cursor-pointer ${
                          newCoinType === p.coinId
                            ? 'bg-blue-600/30 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-semibold truncate">{p.symbol}</div>
                        <div className="text-[10px] text-slate-400 truncate capitalize">{p.name}</div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('custom')}
                      className={`p-2 rounded-lg border text-left transition cursor-pointer ${
                        newCoinType === 'custom'
                          ? 'bg-blue-600/30 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-sky-400">+ Custom</div>
                      <div className="text-[10px] text-slate-400">Any Coin</div>
                    </button>
                  </div>
                </div>

                {/* Custom Name / Symbol if custom */}
                {newCoinType === 'custom' && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Coin Name / ID</label>
                      <input
                        type="text"
                        placeholder="e.g. sui, polkadot, near"
                        required
                        value={customCoinId}
                        onChange={(e) => setCustomCoinId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Symbol</label>
                      <input
                        type="text"
                        placeholder="e.g. SUI, DOT, NEAR"
                        required
                        value={customSymbol}
                        onChange={(e) => setCustomSymbol(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono uppercase focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Amount / Holdings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Holdings Quantity
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0.000001"
                      required
                      placeholder="e.g. 50"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Buy Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0.000001"
                      required
                      placeholder="e.g. 0.55"
                      value={customBuyPrice}
                      onChange={(e) => setCustomBuyPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Current Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0.000001"
                      required
                      placeholder="e.g. 0.68"
                      value={customCurrentPrice}
                      onChange={(e) => setCustomCurrentPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Real-Time Preview Callout */}
                {(() => {
                  const q = parseFloat(customQuantity) || 0;
                  const bp = parseFloat(customBuyPrice) || 0;
                  const cp = parseFloat(customCurrentPrice) || 0;
                  const cost = q * bp;
                  const val = q * cp;
                  const pl = val - cost;
                  const ret = cost > 0 ? (pl / cost) * 100 : 0;

                  return (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-[11px] font-mono">
                      <div className="text-slate-400 flex justify-between">
                        <span>Calculated Investment Cost:</span>
                        <span className="text-white font-bold">${cost.toFixed(2)}</span>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>Calculated Current Value:</span>
                        <span className="text-white font-bold">${val.toFixed(2)}</span>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>Simulated Profit / Loss:</span>
                        <span className={`font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {pl >= 0 ? '+$' : '-$'}{Math.abs(pl).toFixed(2)} ({ret >= 0 ? '+' : ''}{ret.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddCoinOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save &amp; Update Dashboard</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Google Sheets Tab Switcher Bar */}
      <div className="bg-slate-950 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => {
              handleSelectPreset('cardano');
              setIsAddCoinOpen(true);
            }}
            className="p-1 text-slate-400 hover:text-white font-bold px-2 rounded hover:bg-slate-800 transition cursor-pointer"
            title="Add crypto coin holding"
          >
            +
          </button>
          <span className="p-1 text-slate-500 px-2">≡</span>

          <button
            onClick={() => {
              setActiveSheetTab('Dashboard');
              setViewMode('sheets');
              setSelectedCell('Dashboard!B5');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeSheetTab === 'Dashboard' && viewMode === 'sheets'
                ? 'bg-slate-800 text-emerald-400 font-bold border-b-2 border-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Dashboard</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>

          <button
            onClick={() => {
              setActiveSheetTab('Portfolio');
              setViewMode('sheets');
              setSelectedCell('Portfolio!A1');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeSheetTab === 'Portfolio' && viewMode === 'sheets'
                ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>Portfolio ({holdings.length})</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>

          <button
            onClick={() => {
              setActiveSheetTab('Live Prices');
              setViewMode('sheets');
              setSelectedCell('Live Prices!A1');
            }}
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-t-lg font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeSheetTab === 'History' && viewMode === 'sheets'
                ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>History ({historyRows.length})</span>
            <span className="text-[10px] opacity-60">▾</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CoinGecko API Sync Ready</span>
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
