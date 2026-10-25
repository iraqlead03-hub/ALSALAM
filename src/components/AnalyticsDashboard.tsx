import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  MousePointerClick,
  DollarSign,
  CreditCard,
  BookOpen,
  Sparkles,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3,
  Activity,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { Language, ContentTab } from '../types';

interface AnalyticsDashboardProps {
  language: Language;
  onNavigateTab?: (tab: ContentTab) => void;
}

// 7-day initial dataset
const DATA_7_DAYS = [
  { date: '19 أكتوبر', dateEn: 'Oct 19', visits: 1840, interactions: 820, googlePaySales: 540, booksSold: 18, servicesSold: 2 },
  { date: '20 أكتوبر', dateEn: 'Oct 20', visits: 2150, interactions: 1040, googlePaySales: 780, booksSold: 24, servicesSold: 3 },
  { date: '21 أكتوبر', dateEn: 'Oct 21', visits: 2680, interactions: 1390, googlePaySales: 1120, booksSold: 32, servicesSold: 4 },
  { date: '22 أكتوبر', dateEn: 'Oct 22', visits: 2420, interactions: 1180, googlePaySales: 960, booksSold: 28, servicesSold: 3 },
  { date: '23 أكتوبر', dateEn: 'Oct 23', visits: 3190, interactions: 1650, googlePaySales: 1450, booksSold: 41, servicesSold: 5 },
  { date: '24 أكتوبر', dateEn: 'Oct 24', visits: 3840, interactions: 2050, googlePaySales: 1890, booksSold: 56, servicesSold: 6 },
  { date: '25 أكتوبر (اليوم)', dateEn: 'Oct 25 (Today)', visits: 4320, interactions: 2480, googlePaySales: 2410, booksSold: 68, servicesSold: 8 },
];

// 14-day dataset
const DATA_14_DAYS = [
  { date: '12 أكتوبر', dateEn: 'Oct 12', visits: 1320, interactions: 610, googlePaySales: 410, booksSold: 14, servicesSold: 1 },
  { date: '13 أكتوبر', dateEn: 'Oct 13', visits: 1450, interactions: 700, googlePaySales: 480, booksSold: 16, servicesSold: 2 },
  { date: '14 أكتوبر', dateEn: 'Oct 14', visits: 1610, interactions: 760, googlePaySales: 510, booksSold: 17, servicesSold: 2 },
  { date: '15 أكتوبر', dateEn: 'Oct 15', visits: 1580, interactions: 720, googlePaySales: 490, booksSold: 15, servicesSold: 2 },
  { date: '16 أكتوبر', dateEn: 'Oct 16', visits: 1740, interactions: 810, googlePaySales: 560, booksSold: 19, servicesSold: 2 },
  { date: '17 أكتوبر', dateEn: 'Oct 17', visits: 1890, interactions: 890, googlePaySales: 620, booksSold: 21, servicesSold: 3 },
  { date: '18 أكتوبر', dateEn: 'Oct 18', visits: 1980, interactions: 940, googlePaySales: 680, booksSold: 23, servicesSold: 3 },
  ...DATA_7_DAYS,
];

// Revenue breakdown by category
const REVENUE_BY_STREAM_AR = [
  { name: 'كتب الهندسة والكهرباء والذكاء الاصطناعي', value: 38, amount: '$3,420', color: '#2563eb' },
  { name: 'كتب الفقه والعقائد (الجعفري والسني)', value: 29, amount: '$2,610', color: '#059669' },
  { name: 'الخدمات الاستشارية (تسعير Gemini)', value: 22, amount: '$1,980', color: '#7c3aed' },
  { name: 'المنتجات المعروضة المحددة الأسعار', value: 11, amount: '$990', color: '#ea580c' },
];

const REVENUE_BY_STREAM_EN = [
  { name: 'Electrical Eng & AI Books', value: 38, amount: '$3,420', color: '#2563eb' },
  { name: 'Islamic Religious Books (Ja\'fari & Sunni)', value: 29, amount: '$2,610', color: '#059669' },
  { name: 'Gemini AI Advisory Services', value: 22, amount: '$1,980', color: '#7c3aed' },
  { name: 'Curated Store Products', value: 11, amount: '$990', color: '#ea580c' },
];

// Payment methods share
const PAYMENT_METHODS = [
  { nameAr: 'Google Pay (رصيد مباشر)', nameEn: 'Google Pay Direct', share: 72, color: '#3b82f6' },
  { nameAr: 'بطاقات Visa الائتمانية', nameEn: 'Visa Cards', share: 18, color: '#10b981' },
  { nameAr: 'بطاقات Mastercard', nameEn: 'Mastercard', share: 10, color: '#f59e0b' },
];

// Top books performance
const TOP_PERFORMING_BOOKS = [
  { name: 'نهج البلاغة (شرح وتحقيق)', nameEn: 'Nahj al-Balagha (Exegesis)', reads: 1420, revenue: 840, rating: 4.95 },
  { name: 'هندسة الشبكات الكهربائية الذكية', nameEn: 'Smart Electrical Grids', reads: 1280, revenue: 1120, rating: 4.92 },
  { name: 'صحيح البخاري (دراسة موضوعية)', nameEn: 'Sahih al-Bukhari Insights', reads: 980, revenue: 650, rating: 4.90 },
  { name: 'آلات التيار المتردد وإلكترونيات القوى', nameEn: 'AC Machines & Power Electronics', reads: 890, revenue: 980, rating: 4.88 },
  { name: 'فلسفة أصول الفقه الجعفري', nameEn: 'Philosophy of Ja\'fari Fiqh', reads: 760, revenue: 590, rating: 4.94 },
];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  language,
  onNavigateTab,
}) => {
  const isRtl = language === 'ar';
  const [timeRange, setTimeRange] = useState<'7d' | '14d'>('7d');
  const [activeMetric, setActiveMetric] = useState<'all' | 'visits' | 'sales'>('all');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedBonus, setSimulatedBonus] = useState({ visits: 0, interactions: 0, sales: 0 });

  const activeData = useMemo(() => {
    const base = timeRange === '7d' ? DATA_7_DAYS : DATA_14_DAYS;
    if (simulatedBonus.visits === 0 && simulatedBonus.sales === 0) return base;

    return base.map((item, idx) => {
      if (idx === base.length - 1) {
        return {
          ...item,
          visits: item.visits + simulatedBonus.visits,
          interactions: item.interactions + simulatedBonus.interactions,
          googlePaySales: item.googlePaySales + simulatedBonus.sales,
        };
      }
      return item;
    });
  }, [timeRange, simulatedBonus]);

  // Aggregate totals
  const totals = useMemo(() => {
    return activeData.reduce(
      (acc, item) => {
        acc.visits += item.visits;
        acc.interactions += item.interactions;
        acc.sales += item.googlePaySales;
        acc.books += item.booksSold;
        acc.services += item.servicesSold;
        return acc;
      },
      { visits: 0, interactions: 0, sales: 0, books: 0, services: 0 }
    );
  }, [activeData]);

  const handleSimulateNewOrder = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedBonus((prev) => ({
        visits: prev.visits + Math.floor(Math.random() * 45) + 15,
        interactions: prev.interactions + Math.floor(Math.random() * 25) + 10,
        sales: prev.sales + Math.floor(Math.random() * 60) + 35,
      }));
      setIsSimulating(false);
    }, 600);
  };

  const handleExportCsv = () => {
    const headers = 'Date,Visits,Interactions,GooglePaySalesUSD,BooksSold\n';
    const rows = activeData
      .map((d) => `${d.dateEn},${d.visits},${d.interactions},${d.googlePaySales},${d.booksSold}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alsalam-analytics-${timeRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const revenueStreams = isRtl ? REVENUE_BY_STREAM_AR : REVENUE_BY_STREAM_EN;

  return (
    <section className="py-10 space-y-8 animate-fade-in">
      
      {/* Top Header & Overview Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-blue-500/20 backdrop-blur-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{isRtl ? 'لوحة تحكم إحصائيات المنصة' : 'Platform Analytics Dashboard'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono font-bold border border-emerald-500/30">
                {isRtl ? 'مباشر 🟢' : 'Live 🟢'}
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {isRtl
              ? 'متابعة الرسوم البيانية التفاعلية لعدد الزيارات اليومية، تفاعلات القراء والمشاهدين، والمبيعات المحققة عبر Google Pay.'
              : 'Interactive charts for daily traffic, reader engagements, and revenue deposited via Google Pay.'}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
            <CreditCard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{isRtl ? 'حساب الاستلام المعتمد:' : 'Settlement Account:'}</span>
            <span className="bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-lg border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200">
              iraqlead03@gmail.com
            </span>
          </div>
        </div>

        {/* Controls: Range & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
          
          {/* Time range toggle */}
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '7d'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'آخر 7 أيام' : 'Last 7 Days'}
            </button>
            <button
              onClick={() => setTimeRange('14d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === '14d'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'آخر 14 يوماً' : 'Last 14 Days'}
            </button>
          </div>

          {/* Simulate Live Event Button */}
          <button
            onClick={handleSimulateNewOrder}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm transition-all"
            title={isRtl ? 'محاكاة حركة زيارات ومبيعات لحظية' : 'Simulate live traffic and Google Pay order'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? (isRtl ? 'جارٍ التحديث...' : 'Updating...') : (isRtl ? 'محاكاة حركة لحظية' : 'Live Simulation')}</span>
          </button>

          {/* Export Report */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{isRtl ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>

        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Daily Visits */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isRtl ? 'إجمالي الزيارات' : 'Total Visits'}
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {totals.visits.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8%</span>
            <span className="text-slate-400 font-normal text-[11px]">{isRtl ? 'مقارنة بالأسبوع الماضي' : 'vs last period'}</span>
          </div>
        </div>

        {/* KPI 2: Engagements & Interactions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isRtl ? 'التفاعلات والقراءات' : 'Interactions & Reads'}
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {totals.interactions.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+19.3%</span>
            <span className="text-slate-400 font-normal text-[11px]">{isRtl ? 'معدل قراءة الكتب' : 'readership rate'}</span>
          </div>
        </div>

        {/* KPI 3: Google Pay Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isRtl ? 'مبيعات Google Pay المحققة' : 'Google Pay Revenue'}
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
            ${totals.sales.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'مستلمة في الحساب' : 'Deposited directly'}</span>
            <span className="text-slate-400 font-normal text-[11px]">G-Pay</span>
          </div>
        </div>

        {/* KPI 4: Total E-Books Sold */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isRtl ? 'الكتب والخدمات المباعة' : 'Books & Services Sold'}
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {(totals.books + totals.services).toLocaleString()}{' '}
            <span className="text-xs font-sans text-slate-400 font-normal">
              ({totals.books} {isRtl ? 'كتاب' : 'books'})
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تسعير Gemini الذكي' : 'Gemini AI Priced'}</span>
          </div>
        </div>

      </div>

      {/* Main Chart 1: Interactive AreaChart for Daily Visits & Engagements */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>{isRtl ? 'الرسم البياني لتطور الزيارات والتفاعلات اليومية' : 'Daily Traffic & User Engagements'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isRtl
                ? 'مقارنة بين عدد الزوار الفريدين للمنصة والتفاعلات الفعلية مع المحتوى وقراءة الكتب'
                : 'Comparison of unique platform visitors against reader interactions and content consumption'}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isRtl ? 'الزيارات اليومية' : 'Visits'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isRtl ? 'التفاعلات والقراءات' : 'Interactions'}
              </span>
            </div>
          </div>
        </div>

        {/* Responsive AreaChart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis
                dataKey={isRtl ? 'date' : 'dateEn'}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(value: any, name: any) => {
                  const label =
                    name === 'visits'
                      ? isRtl ? 'الزيارات اليومية' : 'Visits'
                      : isRtl ? 'التفاعلات والقراءات' : 'Interactions';
                  return [Number(value).toLocaleString(), label];
                }}
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorVisits)"
              />
              <Area
                type="monotone"
                dataKey="interactions"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorInteractions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Grid: Chart 2 (BarChart Revenue) & Chart 3 (PieChart Stream Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 2: Daily Google Pay Sales (BarChart) - Takes 2 cols */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>{isRtl ? 'عائدات المبيعات المحققة عبر Google Pay يومياً ($)' : 'Daily Google Pay Revenue ($)'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isRtl
                  ? 'المبالغ المودعة مباشرة في حساب البائع iraqlead03@gmail.com من بيع الكتب والخدمات'
                  : 'Revenue settled to creator account iraqlead03@gmail.com via Google Pay / Cards'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              USD ($)
            </span>
          </div>

          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis
                  dataKey={isRtl ? 'date' : 'dateEn'}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, isRtl ? 'المبيعات اليومية' : 'Daily Sales']}
                />
                <Bar
                  dataKey="googlePaySales"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Revenue Breakdown by Category (Donut / PieChart) - Takes 1 col */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-indigo-600" />
                <span>{isRtl ? 'توزيع المبيعات بحسب الأقسام' : 'Sales by Category'}</span>
              </h3>
            </div>
            
            <div className="w-full h-52 relative flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueStreams}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {revenueStreams.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, _name: any, item: any) => [
                      `${val}% (${item.payload.amount})`,
                      item.payload.name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400 font-bold">{isRtl ? 'المبيعات' : 'Revenue'}</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">100%</span>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {revenueStreams.map((stream, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: stream.color }} />
                  <span className="text-slate-700 dark:text-slate-300 truncate">{stream.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono font-bold">
                  <span className="text-slate-500">{stream.amount}</span>
                  <span className="text-slate-900 dark:text-white">{stream.value}%</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Grid: Payment Method Breakdown & Top Books Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Methods Distribution */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span>{isRtl ? 'طرق الدفع المستخدمة' : 'Payment Methods'}</span>
            </h3>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              G-Pay Verified
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRtl
              ? 'يتم استلام جميع المبالغ المودعة عبر Google Pay وبطاقات فيزا وماستركارد مباشرة في حسابك.'
              : 'All funds from Google Pay and Visa/Mastercard are directly settled into your account.'}
          </p>

          <div className="space-y-3.5 pt-1">
            {PAYMENT_METHODS.map((method, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">
                    {isRtl ? method.nameAr : method.nameEn}
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">{method.share}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${method.share}%`, backgroundColor: method.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-1 mt-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isRtl ? 'أمان التحويلات المالية:' : 'Financial Security:'}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isRtl
                ? 'الحماية السحابية المعتمدة من Google مع تشفير كامل لكافة عمليات الدفع بالبطاقات المصرفية.'
                : 'Google Cloud secured with end-to-end tokenization for all debit/credit card settlements.'}
            </p>
          </div>
        </div>

        {/* Top Performing Books Ranking Table - Takes 2 cols */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>{isRtl ? 'الكتب الإلكترونية الأكثر قراءة ومبيعاً' : 'Top Performing E-Books'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isRtl
                  ? 'ترتيب الكتب حسب إجمالي مرات القراءة والإيرادات المحققة عبر Google Pay'
                  : 'Ranking of digital books by engagement reads and cumulative revenue'}
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('books')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>{isRtl ? 'تصفح المكتبة' : 'View Library'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right rtl:text-right ltr:text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-bold">
                <tr>
                  <th className="p-3">{isRtl ? 'عنوان الكتاب' : 'Book Title'}</th>
                  <th className="p-3 text-center">{isRtl ? 'مرات القراءة' : 'Reads'}</th>
                  <th className="p-3 text-center">{isRtl ? 'العائد المحقق' : 'Revenue'}</th>
                  <th className="p-3 text-center">{isRtl ? 'التقييم' : 'Rating'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {TOP_PERFORMING_BOOKS.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-850/70 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate max-w-[200px] sm:max-w-[280px]">
                        {isRtl ? b.name : b.nameEn}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-slate-700 dark:text-slate-300">
                      {b.reads.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ${b.revenue.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold font-mono text-[11px] border border-amber-500/20">
                        ★ {b.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </section>
  );
};
