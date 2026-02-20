import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2025', '2026'];

const MOCK = {
  totalBillAmount: 26_800_000,
  lansWithBillGt0: 139_100,
  totalRepaymentAmount: 22_140_000,
  outstandingAmount: 4_660_000,
  customersPaidFull: 118_200,
  customersPartialRepayment: 14_350,
  unreconciledRepaymentsDelta: 47,
};

/** Repayment contribution by mode (for donut). Sum = 100%. */
const REPAYMENT_MODE_DATA = [
  { name: 'Pay Now (Manual App Payment)', value: 28, color: '#0ea5e9' },
  { name: 'Mandate (Auto-Debit)', value: 58, color: '#10b981' },
  { name: 'Collection Link (Agent recovery)', value: 14, color: '#0284c7' },
];

const collectionEfficiency = ((MOCK.totalRepaymentAmount / MOCK.totalBillAmount) * 100).toFixed(1);

const fmt = (n: number) =>
  n >= 10_000_000
    ? `₹${(n / 10_000_000).toFixed(2)} Cr`
    : n >= 100_000
      ? `₹${(n / 100_000).toFixed(2)} L`
      : n.toLocaleString('en-IN');

type MetricType = 'total-bill' | 'bill-gt-0' | 'total-repayment' | 'outstanding' | 'paid-full' | 'partial-paid';

const CARDS: { label: string; value: string; tone: string; icon: string; metricType: MetricType }[] = [
  { label: 'Total Bill Amount', value: fmt(MOCK.totalBillAmount), tone: 'text-blue-600', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', metricType: 'total-bill' },
  { label: 'LANs with Bill > 0', value: MOCK.lansWithBillGt0.toLocaleString('en-IN'), tone: 'text-purple-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', metricType: 'bill-gt-0' },
  { label: 'Total Repayment', value: fmt(MOCK.totalRepaymentAmount), tone: 'text-green-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', metricType: 'total-repayment' },
  { label: 'Outstanding Amount', value: fmt(MOCK.outstandingAmount), tone: 'text-red-600', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', metricType: 'outstanding' },
  { label: 'Customers Paid Full', value: MOCK.customersPaidFull.toLocaleString('en-IN'), tone: 'text-green-600', icon: 'M5 13l4 4L19 7', metricType: 'paid-full' },
  { label: 'Partial Repayment', value: MOCK.customersPartialRepayment.toLocaleString('en-IN'), tone: 'text-yellow-700', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', metricType: 'partial-paid' },
];

const RepaymentSnapshot = () => {
  const [month, setMonth] = useState('Feb');
  const [year, setYear] = useState('2026');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900">Repayment Snapshot</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="rep-month" className="text-sm font-medium text-gray-700">Month</label>
            <select
              id="rep-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="rep-year" className="text-sm font-medium text-gray-700">Year</label>
            <select
              id="rep-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <span className="text-xs text-gray-500">Data for {month} {year}</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">Collection Efficiency</div>
          <div className="text-2xl font-bold text-green-600">{collectionEfficiency}%</div>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
            style={{ width: `${collectionEfficiency}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Total Repayment: {fmt(MOCK.totalRepaymentAmount)}</span>
          <span>Total Billed: {fmt(MOCK.totalBillAmount)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-800">Repayment Contribution by Mode</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={REPAYMENT_MODE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {REPAYMENT_MODE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Share']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
            {REPAYMENT_MODE_DATA.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}: {d.value}%
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Quick filters</h3>
          <p className="text-xs text-gray-500">Click any KPI card below to open the detailed data table for that metric.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.metricType}
            to={`/pp-insights/repayment-details/${card.metricType}`}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] hover:border-blue-200 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 ${card.tone}`}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600">{card.label}</div>
              <div className={`mt-1 text-2xl font-bold ${card.tone}`}>{card.value}</div>
              <div className="mt-1 text-xs text-gray-500">View details →</div>
            </div>
          </Link>
        ))}
        <Link
          to="/pp-insights/repayment-delta"
          className={`flex items-start gap-4 rounded-xl border shadow-sm transition-transform hover:scale-[1.02] ${
            MOCK.unreconciledRepaymentsDelta > 0
              ? 'cursor-pointer border-red-300 bg-red-50/50 p-5 hover:bg-red-50'
              : 'border-gray-200 bg-white p-5'
          }`}
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-red-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">Unreconciled Repayments (Delta)</div>
            <div className={`mt-1 text-2xl font-bold ${MOCK.unreconciledRepaymentsDelta > 0 ? 'text-red-600' : 'text-gray-700'}`}>
              {MOCK.unreconciledRepaymentsDelta}
            </div>
            {MOCK.unreconciledRepaymentsDelta > 0 && (
              <div className="mt-1 text-xs text-red-600">Paytm says paid, Lender file mismatch — click to investigate</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RepaymentSnapshot;
