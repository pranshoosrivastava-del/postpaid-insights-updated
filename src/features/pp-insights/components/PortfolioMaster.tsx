import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Map, ChevronDown } from 'lucide-react';
import ActionableInsights from './ActionableInsights';

// ─── Data ─────────────────────────────────────────────────────────────────
const ACCOUNT_STATUS_DATA = [
  { name: 'ACTIVE', value: 314366, color: '#0ea5e9' },
  { name: 'CLOSED', value: 17977, color: '#64748b' },
  { name: 'FROZEN', value: 6801, color: '#f59e0b' },
  { name: 'VKYC_SOFTBLOCKED', value: 1930, color: '#ef4444' },
  { name: 'N/A', value: 123, color: '#94a3b8' },
];

const LIMIT_SPREAD_LABELS = [
  '500-1000',
  '1000-1500',
  '1500-2000',
  '2K-5K',
  '5K-10K',
  '10K-15K',
  '15K-20K',
  '20K-30K',
  '30K-40K',
  '40K-50K',
  '50K+',
  'N/A',
];
const LIMIT_SPREAD_VALUES = [92000, 153000, 98000, 72000, 45000, 28000, 18000, 12000, 8000, 5000, 3000, 366];
const CREDIT_LIMIT_DATA = LIMIT_SPREAD_LABELS.map((name, i) => ({ name, count: LIMIT_SPREAD_VALUES[i] }));

const VINTAGE_DATA = [
  { bucket: '<1 month', count: 80000 },
  { bucket: '1 month', count: 64000 },
  { bucket: '2 months', count: 103000 },
  { bucket: '3 months', count: 51000 },
  { bucket: '4 months', count: 21000 },
  { bucket: '5+ months', count: 1000 },
];

const TOP_STATES = [
  { state: 'UP', pct: 22.2 },
  { state: 'Delhi', pct: 11.9 },
  { state: 'Rajasthan', pct: 10.8 },
  { state: 'Maharashtra', pct: 10.7 },
  { state: 'Telangana', pct: 6.9 },
];

const INCOME_DATA = [
  { label: 'Below 2L', pct: 19 },
  { label: '2L-5L', pct: 35.8 },
  { label: '5L-10L', pct: 24.2 },
  { label: '10L-20L', pct: 8.5 },
  { label: '20L+', pct: 12.4 },
];

const OCCUPATION_DATA = [
  { label: 'Self Employed', pct: 56.6 },
  { label: 'Private Sector', pct: 32.8 },
  { label: 'Business Sector', pct: 9.1 },
  { label: 'Public Sector', pct: 4.8 },
  { label: 'Professional', pct: 4.7 },
];

const LENDER_OPTIONS = ['All', 'SSFB'];

// ─── Format helpers ───────────────────────────────────────────────────────
const formatCount = (n: number) => n.toLocaleString('en-IN');

// ─── Widget: Donut (Account Status) ────────────────────────────────────────
const AccountStatusDonut = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">Account Status</h3>
    <div className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={ACCOUNT_STATUS_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
          >
            {ACCOUNT_STATUS_DATA.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCount(value), 'Count']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-slate-500">Total Active</span>
        <span className="text-lg font-bold text-blue-600">314,366</span>
      </div>
    </div>
  </div>
);

// ─── Widget: Credit Limit Spread (Bar, col-span-2) ─────────────────────────
const CreditLimitSpreadBar = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">Credit Limit Spread</h3>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={CREDIT_LIMIT_DATA} margin={{ top: 12, right: 12, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#64748b" />
        <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1000}k`} />
        <Tooltip
          formatter={(value: number) => [formatCount(value), 'Customers']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Customers" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// ─── Widget: Portfolio Vintage (Area) ──────────────────────────────────────
const PortfolioVintageArea = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">Portfolio Vintage / Age</h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={VINTAGE_DATA} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <defs>
          <linearGradient id="vintageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="bucket" tick={{ fontSize: 11 }} stroke="#64748b" />
        <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `${v / 1000}k`} />
        <Tooltip
          formatter={(value: number) => [formatCount(value), 'Count']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Area type="monotone" dataKey="count" stroke="#0ea5e9" fill="url(#vintageGrad)" strokeWidth={2} name="Count" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// ─── Widget: Geographic (Map placeholder + Top 5 States) ───────────────────
const GeographicWidget = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">Geographic Density</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <Map className="h-10 w-10 text-blue-400" strokeWidth={1.5} />
          <span className="text-xs font-medium">Interactive India Map</span>
          <span className="text-[10px]">Integration Pending</span>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-600">Top 5 States</p>
        <ul className="space-y-2">
          {TOP_STATES.map((row) => (
            <li key={row.state} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-xs font-medium text-slate-700">{row.state}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${Math.min(100, (row.pct / 22.2) * 100)}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-semibold text-blue-600">{row.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ─── Widget: Horizontal bars (Income / Occupation) ─────────────────────────
const DemographicsBars = ({ title, data }: { title: string; data: { label: string; pct: number }[] }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
    <div className="space-y-3">
      {data.map((row) => (
        <div key={row.label} className="group flex items-center gap-3">
          <span className="w-24 shrink-0 text-xs font-medium text-slate-700">{row.label}</span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
            <div
              className="h-full rounded-md bg-blue-500 transition-all"
              style={{ width: `${row.pct}%` }}
              title={`${row.pct}%`}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-xs font-semibold text-blue-600">{row.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────
const PortfolioMaster = () => {
  const [lender, setLender] = useState(LENDER_OPTIONS[1]);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="pp-insights space-y-6">
      {/* Global Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm font-semibold text-slate-700">Global Filters</span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Select Lender: {lender}
            <ChevronDown className={`h-4 w-4 transition ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {LENDER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setLender(opt);
                    setFilterOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm ${lender === opt ? 'bg-blue-50 font-semibold text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ActionableInsights
        insights={[
          {
            type: 'info',
            title: 'Limit band concentration',
            description: '75% of the Active Base is concentrated in the ₹1K-₹5K limit band. High headroom for limit enhancement.',
            actionText: 'View Eligible Cohort',
            actionLink: '#',
          },
          {
            type: 'warning',
            title: 'Geographic concentration risk',
            description: 'UP and Delhi contribute to >34% of the total portfolio.',
            actionText: 'View Geo Distribution',
            actionLink: '#',
          },
        ]}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AccountStatusDonut />
        <CreditLimitSpreadBar />
        <PortfolioVintageArea />
        <GeographicWidget />
        <DemographicsBars title="Demographics — Income" data={INCOME_DATA} />
        <DemographicsBars title="Demographics — Occupation" data={OCCUPATION_DATA} />
      </div>
    </div>
  );
};

export default PortfolioMaster;
