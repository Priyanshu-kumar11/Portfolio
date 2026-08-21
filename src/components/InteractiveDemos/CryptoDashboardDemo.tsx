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
  ChevronRight,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Minimize2,
  Info
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
  const [dashboardVisualFilter, setDashboardVisualFilter] = useState<'all' | 'charts' | 'trend' | 'table'>('all');
  
  const [holdings, setHoldings] = useState<CoinHolding[]>(initialPortfolio);
  const [historyRows, setHistoryRows] = useState(initialHistoryRows);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('Fri Aug 21 2026 05:14:13 GMT+0530 (India Standard Time)');
  const [selectedCell, setSelectedCell] = useState<string>('Dashboard!B5');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24H' | '7D' | '30D' | 'ALL'>('24H');

  // Modal / Form state for Adding / Selling / Deleting Coins
  const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'sell' | 'delete'>('add');
  
  // Add mode state
  const [newCoinType, setNewCoinType] = useState<string>('cardano');
  const [customCoinId, setCustomCoinId] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [customQuantity, setCustomQuantity] = useState('50');
  const [customBuyPrice, setCustomBuyPrice] = useState('0.55');
  const [customCurrentPrice, setCustomCurrentPrice] = useState('0.68');
  
  // Sell mode state
  const [sellCoinId, setSellCoinId] = useState<string>('dogecoin');
  const [sellQuantity, setSellQuantity] = useState<string>('50');
  const [sellPrice, setSellPrice] = useState<string>('0.0803');

  // Delete mode state
  const [deleteCoinId, setDeleteCoinId] = useState<string>('dogecoin');

  // Feedback & Validation
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit inline state
  const [editingCoinId, setEditingCoinId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>('');
  const [editBuyPrice, setEditBuyPrice] = useState<string>('');
  const [editCurrentPrice, setEditCurrentPrice] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Open Add modal
  const openAddModal = (presetId: string = 'cardano') => {
    setModalMode('add');
    handleSelectPreset(presetId);
    setFormError(null);
    setIsAddCoinOpen(true);
  };

  // Open Sell modal
  const openSellModal = (coinId?: string) => {
    const targetId = coinId || (holdings[0]?.coinId ?? 'dogecoin');
    const target = holdings.find(h => h.coinId === targetId) || holdings[0];
    if (target) {
      setSellCoinId(target.coinId);
      setSellQuantity(target.quantity.toString());
      setSellPrice(target.currentPrice.toString());
    }
    setModalMode('sell');
    setFormError(null);
    setIsAddCoinOpen(true);
  };

  // Open Delete modal
  const openDeleteModal = (coinId?: string) => {
    const targetId = coinId || (holdings[0]?.coinId ?? 'dogecoin');
    setDeleteCoinId(targetId);
    setModalMode('delete');
    setFormError(null);
    setIsAddCoinOpen(true);
  };

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

  const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIvAivZbnGFA0aHX1u_lt8WFAVB4lV1vwuafXcvyijJQeT6uzJfxo33DWdwYLIdx1p/exec';

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
    showToast(`Added / Updated ${qty} ${symbol} at $${currP.toLocaleString()} to portfolio.`);
  };

  // Sell coin handler
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const holding = holdings.find(h => h.coinId === sellCoinId);
    if (!holding) {
      setFormError('Please select an active holding to sell.');
      return;
    }

    const qtyToSell = parseFloat(sellQuantity);
    const sellP = parseFloat(sellPrice);

    if (isNaN(qtyToSell) || qtyToSell <= 0) {
      setFormError('Please enter a valid positive quantity to sell.');
      return;
    }
    if (qtyToSell > holding.quantity) {
      setFormError(`Cannot sell ${qtyToSell} ${holding.symbol}. You only hold ${holding.quantity}.`);
      return;
    }
    if (isNaN(sellP) || sellP <= 0) {
      setFormError('Please enter a valid sell price.');
      return;
    }

    const proceeds = qtyToSell * sellP;
    const costBasis = qtyToSell * holding.buyPrice;
    const realizedPL = proceeds - costBasis;
    const realizedPLPct = costBasis > 0 ? (realizedPL / costBasis) * 100 : 0;
    const now = '8/21/2026';
    const timeStr = new Date().toLocaleTimeString();

    if (qtyToSell >= holding.quantity) {
      // Complete exit (100% sold)
      setHoldings(prev => prev.filter(c => c.coinId !== sellCoinId));
    } else {
      // Partial sell
      const remainingQty = Number((holding.quantity - qtyToSell).toFixed(6));
      setHoldings(prev =>
        prev.map(c =>
          c.coinId === sellCoinId
            ? { ...c, quantity: remainingQty, lastUpdated: now }
            : c
        )
      );
    }

    // Log to history
    setHistoryRows(prev => [
      {
        timestamp: `${now} ${timeStr}`,
        coinId: sellCoinId,
        price: sellP,
        change: Number(realizedPLPct.toFixed(2)),
        status: `SOLD (${realizedPL >= 0 ? '+$' : '-$'}${Math.abs(realizedPL).toFixed(2)})`
      },
      ...prev.slice(0, 30)
    ]);

    setIsAddCoinOpen(false);
    setLastRefreshedTime(new Date().toString());
    showToast(`Sold ${qtyToSell} ${holding.symbol} @ $${sellP.toLocaleString()} • Realized P&L: ${realizedPL >= 0 ? '+' : '-'}$${Math.abs(realizedPL).toFixed(2)} (${realizedPLPct >= 0 ? '+' : ''}${realizedPLPct.toFixed(1)}%)`);
  };

  // Remove / Delete coin handler (Mistake correction)
  const handleDeleteMistake = (coinIdToDelete: string) => {
    const holding = holdings.find(c => c.coinId === coinIdToDelete);
    if (!holding) return;

    setHoldings(prev => prev.filter(c => c.coinId !== coinIdToDelete));

    // Log to history as mistake removal
    setHistoryRows(prev => [
      {
        timestamp: `8/21/2026 ${new Date().toLocaleTimeString()}`,
        coinId: coinIdToDelete,
        price: 0,
        change: 0,
        status: 'DELETED (Correction)'
      },
      ...prev.slice(0, 30)
    ]);

    setIsAddCoinOpen(false);
    setLastRefreshedTime(new Date().toString());
    showToast(`Removed ${holding.symbol} (${holding.coinId}) from portfolio (Mistake Corrected).`);
  };

  // Reset to default
  const handleResetToDefault = () => {
    setHoldings(initialPortfolio);
    setHistoryRows(initialHistoryRows);
    setLastRefreshedTime(new Date().toString());
    setEditingCoinId(null);
    showToast('Reset portfolio tracker to initial sample holdings.');
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
      showToast(`Updated ${coinId.toUpperCase()} values.`);
    }
    setEditingCoinId(null);
  };

  // Color generator for dynamic coins
  const getCoinColor = (coinId: string, index: number) => {
    const palette = [
      '#f59e0b', // Amber (BTC)
      '#3b82f6', // Blue (ETH)
      '#14b8a6', // Teal (SOL)
      '#ec4899', // Pink (XRP)
      '#eab308', // Yellow (DOGE)
      '#8b5cf6', // Violet (ADA)
      '#06b6d4', // Cyan (DOT)
      '#10b981', // Emerald (LINK)
      '#6366f1', // Indigo (POL)
      '#f43f5e', // Rose (AVAX)
      '#0ea5e9', // Sky (BNB)
    ];
    if (coinId === 'bitcoin') return '#f59e0b';
    if (coinId === 'ethereum') return '#3b82f6';
    if (coinId === 'solana') return '#14b8a6';
    if (coinId === 'ripple') return '#ec4899';
    if (coinId === 'dogecoin') return '#eab308';
    if (coinId === 'cardano') return '#8b5cf6';
    if (coinId === 'polkadot') return '#06b6d4';
    if (coinId === 'chainlink') return '#10b981';
    if (coinId === 'polygon') return '#6366f1';
    if (coinId === 'avalanche') return '#f43f5e';
    if (coinId === 'binancecoin') return '#0ea5e9';

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

  // Generate historical timeline data points based on portfolio total
  const timelinePoints = [
    { label: '00:00', value: totalPortfolioValue * 0.94, change: '+1.2%' },
    { label: '04:00', value: totalPortfolioValue * 0.965, change: '+2.8%' },
    { label: '08:00', value: totalPortfolioValue * 0.95, change: '+1.9%' },
    { label: '12:00', value: totalPortfolioValue * 0.98, change: '+4.5%' },
    { label: '16:00', value: totalPortfolioValue * 0.992, change: '+5.7%' },
    { label: '20:00', value: totalPortfolioValue * 0.978, change: '+4.1%' },
    { label: 'Now', value: totalPortfolioValue, change: `${overallReturnPct >= 0 ? '+' : ''}${overallReturnPct.toFixed(1)}%` },
  ];

  // Compute SVG Donut Chart Paths
  let cumulativeAngle = 0;
  const donutSlices = calculatedRows.map((row, idx) => {
    const pct = totalPortfolioValue > 0 ? row.currentValue / totalPortfolioValue : 0;
    const angle = pct * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    // Convert polar to cartesian
    const radius = 80;
    const innerRadius = 52;
    const cx = 100;
    const cy = 100;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const x3 = cx + innerRadius * Math.cos(endRad);
    const y3 = cy + innerRadius * Math.sin(endRad);
    const x4 = cx + innerRadius * Math.cos(startRad);
    const y4 = cy + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = totalPortfolioValue > 0 && angle > 0 ? (
      angle >= 359.9 ? (
        `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} L ${cx - 0.01} ${cy - innerRadius} A ${innerRadius} ${innerRadius} 0 1 0 ${cx} ${cy - innerRadius} Z`
      ) : (
        `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`
      )
    ) : '';

    return {
      coinId: row.coinId,
      symbol: row.symbol,
      pct: pct * 100,
      value: row.currentValue,
      color: getCoinColor(row.coinId, idx),
      pathData,
      startAngle,
      endAngle
    };
  });

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
                <span>Charts &amp; Visual Analytics</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span className="text-emerald-400 font-semibold">Charts &amp; Visuals</span>
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
            onClick={() => openAddModal('cardano')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/30 active:scale-95 cursor-pointer"
            title="Add new crypto holding to demo"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Coin</span>
          </button>

          {/* Sell / Exit Button */}
          <button
            onClick={() => openSellModal()}
            disabled={holdings.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl transition active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            title="Sell or liquidate crypto holdings with realized P&L"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sell / Trade</span>
          </button>

          {/* Delete Mistake Button */}
          <button
            onClick={() => openDeleteModal()}
            disabled={holdings.length === 0}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-semibold text-xs rounded-xl transition active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            title="Delete accidental holding or mistake"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Delete</span>
          </button>

          {/* Reset button if modified */}
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl border border-slate-700 transition active:scale-95 cursor-pointer"
            title="Reset portfolio to default demo coins"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <a
            href={APPS_SCRIPT_WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/30 active:scale-95"
            title="Open deployed Google Apps Script Web App in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Apps Script Web App</span>
            <span className="sm:hidden">Web App</span>
          </a>

          <button
            onClick={handleSimulateAppsScriptRun}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-xl border border-slate-700 transition active:scale-95 cursor-pointer"
            title="Simulate Google Apps Script trigger fetching CoinGecko API"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Run API'}</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'sheets' ? 'code' : 'sheets')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{viewMode === 'sheets' ? 'Code' : 'Sheet'}</span>
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

      {/* Interactive Quick Add / Formula Banner */}
      <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <div className="text-slate-400 font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
            {selectedCell}
          </div>
          <span className="text-slate-500 font-serif italic text-sm">fx</span>
          <div className="text-cyan-300 truncate max-w-xs sm:max-w-md">
            {activeSheetTab === 'Dashboard' && `=SPARKLINE(History!B2:B30, {"charttype","column"; "color","cyan"}) [Live BI Visuals]`}
            {activeSheetTab === 'Portfolio' && '=C2*E2 [Current Value = Quantity * Current Price]'}
            {activeSheetTab === 'Live Prices' && '=fetchLiveCryptoPrices("coingecko_v3")'}
            {activeSheetTab === 'History' && '=HistoricalLogAppender() [Time-driven Trigger]'}
          </div>
        </div>

        {/* Quick actions & presets pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Quick Add:</span>
          {PRESET_COINS.filter(p => !holdings.some(h => h.coinId === p.coinId)).slice(0, 3).map(preset => (
            <button
              key={preset.coinId}
              onClick={() => openAddModal(preset.coinId)}
              className="px-2 py-0.5 text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-300 rounded-md transition flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{preset.symbol}</span>
            </button>
          ))}
          <button
            onClick={() => openAddModal('custom')}
            className="px-2 py-0.5 text-[11px] bg-blue-950 hover:bg-blue-900 border border-blue-700 text-blue-300 rounded-md transition flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-2.5 h-2.5" />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-950/90 border-b border-emerald-700/60 px-4 py-2 text-xs text-emerald-200 flex items-center justify-between gap-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-mono">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-emerald-100 p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-6 relative">
        {viewMode === 'code' ? (
          /* Code View */
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">
                  Google Apps Script (`Code.gs`)
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={APPS_SCRIPT_WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Launch Deployed Web App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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
                {/* Title & View Selector Banner */}
                <div className="bg-[#102236] border border-cyan-900/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        Crypto Portfolio Analytics Dashboard
                      </h2>
                      <span className="text-xs font-mono font-normal px-2.5 py-0.5 bg-blue-900/50 text-sky-300 border border-blue-700/60 rounded-full">
                        {holdings.length} Active Coins
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-2">
                      <span>Last Updated: {lastRefreshedTime.slice(0, 24)}</span>
                      <span className="text-emerald-400 font-semibold">• Live CoinGecko Feed</span>
                    </p>
                  </div>

                  {/* Dashboard Visual View Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      onClick={() => setDashboardVisualFilter('all')}
                      className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                        dashboardVisualFilter === 'all'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      All Visuals
                    </button>
                    <button
                      onClick={() => setDashboardVisualFilter('charts')}
                      className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                        dashboardVisualFilter === 'charts'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Charts &amp; Donut
                    </button>
                    <button
                      onClick={() => setDashboardVisualFilter('trend')}
                      className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                        dashboardVisualFilter === 'trend'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Trend &amp; History
                    </button>
                    <button
                      onClick={() => setDashboardVisualFilter('table')}
                      className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                        dashboardVisualFilter === 'table'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Holdings Table
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                      <span>Total Portfolio Value</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2.5 font-display">
                      ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Across {calculatedRows.length} assets
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      {totalProfitLoss >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>Total Profit / Loss</span>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-extrabold mt-2.5 font-display ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {totalProfitLoss >= 0 ? '+$' : '-$'}{Math.abs(totalProfitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-[11px] font-semibold mt-1 ${overallReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {overallReturnPct >= 0 ? '+' : ''}{overallReturnPct.toFixed(2)}% ROI
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Total Invested Cost</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-200 mt-2.5 font-display">
                      ${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Weighted Acquisition Basis
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Top Performer</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-2.5 capitalize flex items-center justify-center gap-1">
                      <span>{bestCoin}</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-300 mt-1">
                      +{sortedByReturn[0]?.returnPct.toFixed(1) || 0}% Gain
                    </div>
                  </div>
                </div>

                {/* PRIMARY CHARTS GRID (Row 1: Interactive Donut Allocation + Cost vs Value Clustered Bars) */}
                {(dashboardVisualFilter === 'all' || dashboardVisualFilter === 'charts') && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* CHART 1: Interactive SVG Donut / Pie Allocation */}
                    <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-md">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-bold text-white text-sm">
                            Asset Allocation (Portfolio Weight %)
                          </h4>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                          Interactive Donut Chart
                        </span>
                      </div>

                      {/* Donut Chart Visual */}
                      <div className="py-4 flex flex-col sm:flex-row items-center justify-around gap-6">
                        {/* SVG Donut Graphic */}
                        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                            {donutSlices.map((slice) => {
                              const isHovered = hoveredSlice === slice.coinId;
                              return (
                                <path
                                  key={slice.coinId}
                                  d={slice.pathData}
                                  fill={slice.color}
                                  className="transition-all duration-300 cursor-pointer hover:opacity-90"
                                  style={{
                                    transformOrigin: '100px 100px',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' : 'none'
                                  }}
                                  onMouseEnter={() => setHoveredSlice(slice.coinId)}
                                  onMouseLeave={() => setHoveredSlice(null)}
                                />
                              );
                            })}
                          </svg>

                          {/* Center KPI Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                            {hoveredSlice ? (
                              (() => {
                                const activeCoin = calculatedRows.find(c => c.coinId === hoveredSlice);
                                const slice = donutSlices.find(s => s.coinId === hoveredSlice);
                                return (
                                  <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-mono">{activeCoin?.symbol}</div>
                                    <div className="text-sm font-bold text-white">${activeCoin?.currentValue.toFixed(0)}</div>
                                    <div className="text-[11px] font-bold text-cyan-400">{slice?.pct.toFixed(1)}%</div>
                                  </div>
                                );
                              })()
                            ) : (
                              <div>
                                <div className="text-[10px] text-slate-400 font-mono uppercase">Portfolio</div>
                                <div className="text-sm font-extrabold text-white">
                                  ${totalPortfolioValue >= 1000 ? `${(totalPortfolioValue / 1000).toFixed(1)}k` : totalPortfolioValue.toFixed(0)}
                                </div>
                                <div className="text-[9px] text-emerald-400 font-semibold">{calculatedRows.length} Assets</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Donut Legend */}
                        <div className="space-y-1.5 w-full sm:max-w-xs max-h-52 overflow-y-auto pr-1">
                          {donutSlices.map((slice) => {
                            const isHovered = hoveredSlice === slice.coinId;
                            return (
                              <div
                                key={slice.coinId}
                                onMouseEnter={() => setHoveredSlice(slice.coinId)}
                                onMouseLeave={() => setHoveredSlice(null)}
                                className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition cursor-pointer ${
                                  isHovered ? 'bg-slate-800 border border-slate-700' : 'bg-slate-950/60 hover:bg-slate-800/40'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                                  <span className="capitalize font-medium text-slate-200 truncate">{slice.coinId}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">({slice.symbol})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-slate-300 font-semibold">${slice.value.toFixed(0)}</span>
                                  <span className="font-mono text-cyan-400 font-bold w-12 text-right">{slice.pct.toFixed(1)}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Formula: =F2/SUM(F2:F{holdings.length + 1})</span>
                        <span className="text-emerald-400">100% Normalized</span>
                      </div>
                    </div>

                    {/* CHART 2: Invested Cost vs Current Market Value (Clustered Dual Column Chart) */}
                    <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-md">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-emerald-400" />
                          <h4 className="font-bold text-white text-sm">
                            Cost Basis vs. Current Valuation ($ USD)
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <span className="flex items-center gap-1 text-slate-400">
                            <span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block" />
                            <span>Total Cost</span>
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
                            <span>Current Value</span>
                          </span>
                        </div>
                      </div>

                      {/* Visual Bar Comparison */}
                      <div className="py-4 space-y-3.5 max-h-64 overflow-y-auto">
                        {calculatedRows.length === 0 ? (
                          <div className="py-8 text-center text-xs text-slate-500">No coins in portfolio</div>
                        ) : (
                          calculatedRows.map((row) => {
                            const maxVal = Math.max(...calculatedRows.map(r => Math.max(r.currentValue, r.totalCost)), 100);
                            const costWidth = Math.max(4, (row.totalCost / maxVal) * 100);
                            const valueWidth = Math.max(4, (row.currentValue / maxVal) * 100);
                            const isProfit = row.profitLoss >= 0;

                            return (
                              <div key={row.coinId} className="space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white capitalize">{row.coinId}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">{row.symbol}</span>
                                  </div>
                                  <div className="flex items-center gap-2 font-mono text-[11px]">
                                    <span className="text-slate-400">Cost: ${row.totalCost.toFixed(1)}</span>
                                    <span className="text-white font-bold">Val: ${row.currentValue.toFixed(1)}</span>
                                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${isProfit ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                                      {isProfit ? '+' : ''}{row.returnPct.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>

                                {/* Dual Bars */}
                                <div className="space-y-1">
                                  {/* Cost Bar */}
                                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex items-center">
                                    <div 
                                      className="h-full bg-slate-600 rounded-full transition-all duration-500" 
                                      style={{ width: `${costWidth}%` }}
                                      title={`Invested Cost: $${row.totalCost.toFixed(2)}`}
                                    />
                                  </div>
                                  {/* Current Value Bar */}
                                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden flex items-center">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-500 ${isProfit ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                                      style={{ width: `${valueWidth}%` }}
                                      title={`Current Value: $${row.currentValue.toFixed(2)}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Spreadsheet Visual: Clustered Columns</span>
                        <span className="text-cyan-400">Auto-scaled Max Basis</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ROW 2: HISTORICAL TREND AREA CHART & PROFIT/LOSS WATERFALL */}
                {(dashboardVisualFilter === 'all' || dashboardVisualFilter === 'trend') && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* CHART 3: Cumulative Portfolio Historical Area/Line Chart */}
                    <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <LineChart className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-bold text-white text-sm">
                            Portfolio Valuation Trajectory &amp; Growth Curve
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                          {(['24H', '7D', '30D', 'ALL'] as const).map((tf) => (
                            <button
                              key={tf}
                              onClick={() => setSelectedTimeframe(tf)}
                              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                                selectedTimeframe === tf ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* SVG Area Chart */}
                      <div className="py-4">
                        <div className="relative h-44 w-full">
                          <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Background Grid Lines */}
                            <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                            <line x1="0" y1="75" x2="500" y2="75" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                            <line x1="0" y1="120" x2="500" y2="120" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />

                            {/* Area Fill */}
                            {(() => {
                              const minV = Math.min(...timelinePoints.map(p => p.value)) * 0.98;
                              const maxV = Math.max(...timelinePoints.map(p => p.value)) * 1.02;
                              const pointsStr = timelinePoints.map((p, i) => {
                                const x = (i / (timelinePoints.length - 1)) * 500;
                                const y = 140 - ((p.value - minV) / (maxV - minV || 1)) * 110;
                                return `${x},${y}`;
                              }).join(' ');

                              const areaPath = `M 0,140 L ${pointsStr} L 500,140 Z`;
                              const linePath = `M ${pointsStr}`;

                              return (
                                <>
                                  <path d={areaPath} fill="url(#areaGradient)" />
                                  <path d={linePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

                                  {/* Data Points */}
                                  {timelinePoints.map((p, i) => {
                                    const x = (i / (timelinePoints.length - 1)) * 500;
                                    const y = 140 - ((p.value - minV) / (maxV - minV || 1)) * 110;
                                    return (
                                      <g key={i} className="cursor-pointer group">
                                        <circle cx={x} cy={y} r="4" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
                                        <circle cx={x} cy={y} r="7" fill="#06b6d4" opacity="0.3" className="group-hover:opacity-80 transition" />
                                      </g>
                                    );
                                  })}
                                </>
                              );
                            })()}
                          </svg>

                          {/* Time Labels on X-axis */}
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                            {timelinePoints.map((p, i) => (
                              <span key={i}>{p.label}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5 text-cyan-300">
                          <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Logged snapshots from History tab ({historyRows.length} points)</span>
                        </span>
                        <span className="text-emerald-400 font-bold">Current: ${totalPortfolioValue.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* CHART 4: Net Profit & Loss Waterfall / Diverging Bar Chart */}
                    <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <h4 className="font-bold text-white text-sm">
                            Profit &amp; Loss Performance ($)
                          </h4>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
                          Zero-Axis Diverging
                        </span>
                      </div>

                      {/* Diverging Bar Chart */}
                      <div className="py-3 space-y-3 max-h-56 overflow-y-auto">
                        {calculatedRows.map((row) => {
                          const isProfit = row.profitLoss >= 0;
                          const maxAbs = Math.max(...calculatedRows.map(r => Math.abs(r.profitLoss)), 10);
                          const widthPct = Math.min(100, (Math.abs(row.profitLoss) / maxAbs) * 100);

                          return (
                            <div key={row.coinId} className="space-y-1 text-xs">
                              <div className="flex justify-between font-mono">
                                <span className="capitalize text-slate-200 font-semibold">{row.coinId} ({row.symbol})</span>
                                <span className={isProfit ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                  {isProfit ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)} ({row.returnPct.toFixed(1)}%)
                                </span>
                              </div>
                              
                              {/* Horizontal Bar with center line */}
                              <div className="w-full bg-slate-950 h-3 rounded-full flex items-center p-0.5 relative border border-slate-800">
                                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 z-10" />
                                
                                {isProfit ? (
                                  <div className="w-1/2 flex justify-start ml-auto">
                                    <div
                                      className="h-2 rounded-r-full bg-emerald-500 transition-all duration-500"
                                      style={{ width: `${Math.max(6, widthPct)}%` }}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-1/2 flex justify-end mr-auto">
                                    <div
                                      className="h-2 rounded-l-full bg-rose-500 transition-all duration-500"
                                      style={{ width: `${Math.max(6, widthPct)}%` }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="text-rose-400">◄ Loss Area</span>
                        <span className="text-slate-500">0 USD Baseline</span>
                        <span className="text-emerald-400">Profit Area ►</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ROW 3: SUMMARY HOLDINGS TABLE */}
                {(dashboardVisualFilter === 'all' || dashboardVisualFilter === 'table') && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
                    <div className="p-3.5 bg-[#102236] border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-sky-400" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          Live Portfolio Holdings &amp; Formulas Grid ({calculatedRows.length} positions)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveSheetTab('Portfolio');
                            setSelectedCell('Portfolio!A1');
                          }}
                          className="text-xs text-sky-400 hover:text-sky-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Full Editor</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto max-h-72 overflow-y-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 sticky top-0">
                          <tr>
                            <th className="py-2.5 px-3">Asset</th>
                            <th className="py-2.5 px-3 text-right">Holdings Qty</th>
                            <th className="py-2.5 px-3 text-right">Buy Price</th>
                            <th className="py-2.5 px-3 text-right">Current Price</th>
                            <th className="py-2.5 px-3 text-right">Total Valuation</th>
                            <th className="py-2.5 px-3 text-right">Unrealized P&amp;L</th>
                            <th className="py-2.5 px-3 text-right">Return %</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                            <th className="py-2.5 px-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {calculatedRows.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="py-8 text-center text-slate-400">
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
                                <td className="py-2.5 px-3 text-right font-mono text-slate-200">
                                  {row.quantity}
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                                  ${row.buyPrice.toLocaleString()}
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-white font-semibold">
                                  ${row.currentPrice.toLocaleString()}
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-200 font-bold">
                                  ${row.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className={`py-2.5 px-3 text-right font-mono font-semibold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {row.profitLoss >= 0 ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)}
                                </td>
                                <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {row.returnPct >= 0 ? '+' : ''}{row.returnPct.toFixed(1)}%
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                                    {row.errorStatus}
                                  </span>
                                </td>
                                <td className="py-2.5 px-2 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => openSellModal(row.coinId)}
                                      className="p-1 text-emerald-400 hover:text-emerald-300 transition rounded hover:bg-emerald-950/60 cursor-pointer"
                                      title={`Sell ${row.symbol}`}
                                    >
                                      <DollarSign className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => openDeleteModal(row.coinId)}
                                      className="p-1 text-slate-500 hover:text-rose-400 transition rounded hover:bg-rose-950/60 cursor-pointer"
                                      title={`Delete ${row.symbol} (Mistake)`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
                      <RotateCcw className="w-3.5 h-3.5" />
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

                              <td className="py-2.5 px-3 text-right font-mono text-slate-200 font-bold">
                                ${row.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>

                              <td className={`py-2.5 px-3 text-right font-mono font-semibold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {row.profitLoss >= 0 ? '+$' : '-$'}{Math.abs(row.profitLoss).toFixed(2)}
                              </td>

                              <td className={`py-2.5 px-3 text-right font-mono font-bold ${row.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {row.returnPct >= 0 ? '+' : ''}{row.returnPct.toFixed(1)}%
                              </td>

                              <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                                {row.lastUpdated}
                              </td>

                              <td className="py-2.5 px-3 text-center">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                                  {row.errorStatus}
                                </span>
                              </td>

                              <td className="py-2.5 px-3 text-center">
                                {isEditing ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => saveEditing(row.coinId)}
                                      className="p-1 text-emerald-400 hover:text-emerald-300 rounded bg-emerald-950 border border-emerald-700 cursor-pointer"
                                      title="Save changes"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingCoinId(null)}
                                      className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer"
                                      title="Cancel"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => openSellModal(row.coinId)}
                                      className="p-1 text-emerald-400 hover:text-emerald-300 rounded hover:bg-emerald-950/60 cursor-pointer"
                                      title={`Sell ${row.symbol}`}
                                    >
                                      <DollarSign className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => startEditing(row)}
                                      className="p-1 text-slate-400 hover:text-sky-300 rounded hover:bg-slate-800 cursor-pointer"
                                      title="Edit holding values"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => openDeleteModal(row.coinId)}
                                      className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-rose-950/60 cursor-pointer"
                                      title={`Delete ${row.symbol} (Mistake)`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
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
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Live Prices Tab (Direct CoinGecko API Feed)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Endpoint: `https://api.coingecko.com/api/v3/simple/price?ids=...&amp;vs_currencies=usd&amp;include_24hr_change=true`
                    </p>
                  </div>

                  <button
                    onClick={handleSimulateAppsScriptRun}
                    disabled={isRefreshing}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Fetching...' : 'Re-Fetch API Now'}</span>
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">Coin ID</th>
                          <th className="py-2.5 px-3 text-right">Price (USD)</th>
                          <th className="py-2.5 px-3 text-right">24h Change (%)</th>
                          <th className="py-2.5 px-3 text-center">Status</th>
                          <th className="py-2.5 px-3">Last Sync Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {calculatedRows.map((coin) => (
                          <tr key={coin.coinId} className="hover:bg-slate-800/40">
                            <td className="py-2.5 px-3 font-medium text-white capitalize">{coin.coinId}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-cyan-300 font-bold">
                              ${coin.currentPrice.toLocaleString()}
                            </td>
                            <td className={`py-2.5 px-3 text-right font-mono font-bold ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                                coin.change24h >= 0 
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}>
                                {coin.change24h >= 0 ? 'Gainer' : 'Loser'}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                              {lastRefreshedTime}
                            </td>
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
              <div className="space-y-4 max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-400" />
                      <span>History Tab (Time-series Audit Trail &amp; Triggers)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Rows automatically appended via `historySheet.appendRow([now, coinId, price, change])`.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 sticky top-0">
                        <tr>
                          <th className="py-2.5 px-3">Logged Timestamp</th>
                          <th className="py-2.5 px-3">Coin ID</th>
                          <th className="py-2.5 px-3 text-right">Logged Price ($)</th>
                          <th className="py-2.5 px-3 text-right">24h Change (%)</th>
                          <th className="py-2.5 px-3 text-center">Trigger Tag</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {historyRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40">
                            <td className="py-2 px-3 text-slate-400 text-[11px]">{row.timestamp}</td>
                            <td className="py-2 px-3 text-white capitalize">{row.coinId}</td>
                            <td className="py-2 px-3 text-right text-slate-200">${row.price}</td>
                            <td className={`py-2 px-3 text-right ${row.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {row.change >= 0 ? '+' : ''}{Number(row.change).toFixed(2)}%
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                {row.status || 'Hourly Sync'}
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
          </div>
        )}

        {/* Add / Sell / Delete Crypto Modal */}
        {isAddCoinOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl text-slate-100 flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-3.5 sm:p-5 border-b border-slate-800 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                      modalMode === 'add' ? 'bg-blue-600/20 border-blue-500/40 text-sky-400' :
                      modalMode === 'sell' ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400' :
                      'bg-rose-600/20 border-rose-500/40 text-rose-400'
                    }`}>
                      {modalMode === 'add' && <Plus className="w-4 h-4" />}
                      {modalMode === 'sell' && <DollarSign className="w-4 h-4" />}
                      {modalMode === 'delete' && <Trash2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        {modalMode === 'add' && 'Add / Buy Crypto Position'}
                        {modalMode === 'sell' && 'Sell / Trim Crypto Holding'}
                        {modalMode === 'delete' && 'Delete / Remove Holding'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {modalMode === 'add' && 'Add or increase asset holdings in the spreadsheet.'}
                        {modalMode === 'sell' && 'Liquidate or sell coins with calculated realized P&L.'}
                        {modalMode === 'delete' && 'Remove accidental entries or mistakes from tracker.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAddCoinOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-3 gap-1 mt-3 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => { setModalMode('add'); setFormError(null); }}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
                      modalMode === 'add' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Buy / Add</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalMode('sell');
                      setFormError(null);
                      if (holdings.length > 0 && !holdings.some(h => h.coinId === sellCoinId)) {
                        setSellCoinId(holdings[0].coinId);
                        setSellQuantity(holdings[0].quantity.toString());
                        setSellPrice(holdings[0].currentPrice.toString());
                      }
                    }}
                    disabled={holdings.length === 0}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
                      modalMode === 'sell' ? 'bg-emerald-600 text-white shadow-sm' : holdings.length === 0 ? 'opacity-40 cursor-not-allowed text-slate-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Sell ({holdings.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalMode('delete');
                      setFormError(null);
                      if (holdings.length > 0 && !holdings.some(h => h.coinId === deleteCoinId)) {
                        setDeleteCoinId(holdings[0].coinId);
                      }
                    }}
                    disabled={holdings.length === 0}
                    className={`py-1.5 px-2 rounded-lg font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
                      modalMode === 'delete' ? 'bg-rose-600 text-white shadow-sm' : holdings.length === 0 ? 'opacity-40 cursor-not-allowed text-slate-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs">
                {formError && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* MODE 1: ADD / BUY */}
                {modalMode === 'add' && (
                  <form id="add-coin-form" onSubmit={handleAddCoinSubmit} className="space-y-3.5">
                    {/* Preset Selector */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Select Asset Preset or Custom
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                        {PRESET_COINS.map(p => (
                          <button
                            type="button"
                            key={p.coinId}
                            onClick={() => handleSelectPreset(p.coinId)}
                            className={`p-1.5 sm:p-2 rounded-xl border text-left transition cursor-pointer ${
                              newCoinType === p.coinId
                                ? 'bg-blue-600/25 border-blue-500 text-white font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-semibold text-xs text-white">{p.symbol}</div>
                            <div className="text-[10px] text-slate-400 truncate capitalize">{p.coinId}</div>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('custom')}
                          className={`p-1.5 sm:p-2 rounded-xl border text-left transition cursor-pointer ${
                            newCoinType === 'custom'
                              ? 'bg-blue-600/25 border-blue-500 text-white font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-xs text-sky-400">+ Custom</div>
                          <div className="text-[10px] text-slate-400">Enter Any</div>
                        </button>
                      </div>
                    </div>

                    {/* Notice if already owned */}
                    {(() => {
                      const activeId = (newCoinType === 'custom' ? customCoinId : newCoinType).trim().toLowerCase();
                      const existing = holdings.find(h => h.coinId.toLowerCase() === activeId);
                      if (existing) {
                        return (
                          <div className="p-2 bg-blue-950/40 border border-blue-800/60 rounded-lg text-sky-300 text-[11px] flex items-center justify-between">
                            <span>Currently owned: <strong>{existing.quantity} {existing.symbol}</strong> (${(existing.quantity * existing.currentPrice).toFixed(2)})</span>
                            <span className="text-[10px] text-slate-400">Saving will update position</span>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Custom Name / Symbol if custom */}
                    {newCoinType === 'custom' && (
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Coin ID / Name</label>
                          <input
                            type="text"
                            placeholder="e.g. sui, polkadot, near"
                            required
                            value={customCoinId}
                            onChange={(e) => setCustomCoinId(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
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
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono uppercase focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Amount / Holdings */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
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
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
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
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-500 focus:outline-none"
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
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-[11px] font-mono">
                          <div className="text-slate-400 flex justify-between">
                            <span>Simulated Investment Cost:</span>
                            <span className="text-white font-bold">${cost.toFixed(2)}</span>
                          </div>
                          <div className="text-slate-400 flex justify-between">
                            <span>Simulated Market Value:</span>
                            <span className="text-white font-bold">${val.toFixed(2)}</span>
                          </div>
                          <div className="text-slate-400 flex justify-between">
                            <span>Simulated Unrealized P&amp;L:</span>
                            <span className={`font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {pl >= 0 ? '+$' : '-$'}{Math.abs(pl).toFixed(2)} ({ret >= 0 ? '+' : ''}{ret.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </form>
                )}

                {/* MODE 2: SELL / TRIM */}
                {modalMode === 'sell' && (
                  <form id="sell-coin-form" onSubmit={handleSellSubmit} className="space-y-3.5">
                    {/* Select Coin to Sell */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Select Holding to Sell / Liquidate
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {holdings.map(h => (
                          <button
                            type="button"
                            key={h.coinId}
                            onClick={() => {
                              setSellCoinId(h.coinId);
                              setSellQuantity(h.quantity.toString());
                              setSellPrice(h.currentPrice.toString());
                              setFormError(null);
                            }}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              sellCoinId === h.coinId
                                ? 'bg-emerald-600/25 border-emerald-500 text-white font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-white">{h.symbol}</span>
                              <span className="text-[10px] text-emerald-400">${(h.quantity * h.currentPrice).toFixed(1)}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate font-mono">Held: {h.quantity}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Holding Stats */}
                    {(() => {
                      const selectedHolding = holdings.find(h => h.coinId === sellCoinId);
                      if (!selectedHolding) return null;

                      return (
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                          <div>
                            <div className="text-slate-400 text-[10px]">Total Held</div>
                            <div className="text-white font-bold">{selectedHolding.quantity} {selectedHolding.symbol}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 text-[10px]">Buy Avg Price</div>
                            <div className="text-slate-300 font-bold">${selectedHolding.buyPrice.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 text-[10px]">Market Price</div>
                            <div className="text-emerald-400 font-bold">${selectedHolding.currentPrice.toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Sell Quantity & Quick Percentage Buttons */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-300 font-semibold">Quantity to Sell</label>
                        {(() => {
                          const h = holdings.find(item => item.coinId === sellCoinId);
                          if (!h) return null;
                          return (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setSellQuantity((h.quantity * 0.25).toFixed(4))}
                                className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                              >
                                25%
                              </button>
                              <button
                                type="button"
                                onClick={() => setSellQuantity((h.quantity * 0.5).toFixed(4))}
                                className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                              >
                                50%
                              </button>
                              <button
                                type="button"
                                onClick={() => setSellQuantity((h.quantity * 0.75).toFixed(4))}
                                className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                              >
                                75%
                              </button>
                              <button
                                type="button"
                                onClick={() => setSellQuantity(h.quantity.toString())}
                                className="px-1.5 py-0.5 text-[10px] bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded cursor-pointer"
                              >
                                100% (All)
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                      <input
                        type="number"
                        step="any"
                        min="0.000001"
                        required
                        placeholder="Quantity to sell"
                        value={sellQuantity}
                        onChange={(e) => setSellQuantity(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Sell Price */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Sale Price ($ USD)
                      </label>
                      <input
                        type="number"
                        step="any"
                        min="0.000001"
                        required
                        placeholder="Sell price"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Realized P&L Preview */}
                    {(() => {
                      const h = holdings.find(item => item.coinId === sellCoinId);
                      const qSell = parseFloat(sellQuantity) || 0;
                      const sPrice = parseFloat(sellPrice) || 0;
                      if (!h) return null;

                      const proceeds = qSell * sPrice;
                      const costBasis = qSell * h.buyPrice;
                      const realizedPL = proceeds - costBasis;
                      const realizedPct = costBasis > 0 ? (realizedPL / costBasis) * 100 : 0;
                      const remaining = Math.max(0, h.quantity - qSell);

                      return (
                        <div className="p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl space-y-1 text-[11px] font-mono">
                          <div className="text-slate-400 flex justify-between">
                            <span>Cash Proceeds Received:</span>
                            <span className="text-white font-bold">${proceeds.toFixed(2)}</span>
                          </div>
                          <div className="text-slate-400 flex justify-between">
                            <span>Cost Basis of Sold Amount:</span>
                            <span className="text-slate-300">${costBasis.toFixed(2)}</span>
                          </div>
                          <div className="text-slate-400 flex justify-between">
                            <span>Realized Profit / Loss:</span>
                            <span className={`font-bold ${realizedPL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {realizedPL >= 0 ? '+$' : '-$'}{Math.abs(realizedPL).toFixed(2)} ({realizedPct >= 0 ? '+' : ''}{realizedPct.toFixed(2)}%)
                            </span>
                          </div>
                          <div className="text-slate-400 flex justify-between pt-1 border-t border-slate-800 text-[10px]">
                            <span>Remaining Position:</span>
                            <span className="text-slate-200">{remaining > 0 ? `${remaining.toFixed(4)} ${h.symbol}` : '0 (Position Closed)'}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </form>
                )}

                {/* MODE 3: DELETE / MISTAKE */}
                {modalMode === 'delete' && (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Select Holding to Remove
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {holdings.map(h => (
                          <button
                            type="button"
                            key={h.coinId}
                            onClick={() => {
                              setDeleteCoinId(h.coinId);
                              setFormError(null);
                            }}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              deleteCoinId === h.coinId
                                ? 'bg-rose-600/25 border-rose-500 text-white font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-white">{h.symbol}</span>
                              <span className="text-[10px] text-rose-400">${(h.quantity * h.currentPrice).toFixed(1)}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate capitalize font-mono">{h.coinId}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const toDelete = holdings.find(h => h.coinId === deleteCoinId);
                      if (!toDelete) {
                        return (
                          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-slate-400">
                            No coin selected or portfolio is empty.
                          </div>
                        );
                      }

                      return (
                        <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-2">
                          <div className="flex items-center gap-2 text-rose-300 font-bold">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>Remove Accidental Holding ({toDelete.symbol})?</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            This will cleanly delete this holding from your portfolio tracker without recording a sell transaction.
                          </p>
                          <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono space-y-1">
                            <div className="text-slate-400 flex justify-between">
                              <span>Asset ID:</span>
                              <span className="text-white capitalize">{toDelete.coinId} ({toDelete.symbol})</span>
                            </div>
                            <div className="text-slate-400 flex justify-between">
                              <span>Recorded Quantity:</span>
                              <span className="text-white">{toDelete.quantity}</span>
                            </div>
                            <div className="text-slate-400 flex justify-between">
                              <span>Recorded Buy Price:</span>
                              <span className="text-slate-300">${toDelete.buyPrice.toLocaleString()}</span>
                            </div>
                            <div className="text-slate-400 flex justify-between">
                              <span>Recorded Valuation:</span>
                              <span className="text-white font-bold">${(toDelete.quantity * toDelete.currentPrice).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Sticky Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/95 shrink-0 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCoinOpen(false)}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer text-xs"
                >
                  Cancel
                </button>

                {modalMode === 'add' && (
                  <button
                    type="submit"
                    form="add-coin-form"
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save &amp; Add Position</span>
                  </button>
                )}

                {modalMode === 'sell' && (
                  <button
                    type="submit"
                    form="sell-coin-form"
                    disabled={holdings.length === 0}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer text-xs disabled:opacity-40"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Confirm Sale &amp; Realize P&amp;L</span>
                  </button>
                )}

                {modalMode === 'delete' && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMistake(deleteCoinId)}
                    disabled={!holdings.some(h => h.coinId === deleteCoinId)}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-md shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer text-xs disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Holding (Remove Mistake)</span>
                  </button>
                )}
              </div>
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
            <span>CoinGecko API Ready</span>
          </span>
          <a
            href={APPS_SCRIPT_WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Apps Script Web App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
