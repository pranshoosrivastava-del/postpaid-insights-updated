import { useState } from 'react';
import { Link } from 'react-router-dom';
import ActionableInsights from './ActionableInsights';

interface MonthRow {
  billDate: string;
  totalBills: number;
  billsValue0: number;
  billedAmount: number;
  lastBillPrincipalDue: number;
  lfApplied: number;
  bfApplied: number;
  cfApplied: number;
  /** Variance vs lender file (e.g. billing total delta). When !== 0, shown as red clickable link. */
  variance: number;
}

const MOCK_DATA: MonthRow[] = [
  { billDate: 'Feb-2026', totalBills: 148200, billsValue0: 9100, billedAmount: 26800000, lastBillPrincipalDue: 22400000, lfApplied: 310000, bfApplied: 162000, cfApplied: 482000, variance: 22707 },
  { billDate: 'Jan-2026', totalBills: 142500, billsValue0: 8420, billedAmount: 24500000, lastBillPrincipalDue: 20100000, lfApplied: 280000, bfApplied: 150000, cfApplied: 450000, variance: 0 },
  { billDate: 'Dec-2025', totalBills: 138800, billsValue0: 7950, billedAmount: 23200000, lastBillPrincipalDue: 19600000, lfApplied: 265000, bfApplied: 142000, cfApplied: 435000, variance: 4100 },
  { billDate: 'Nov-2025', totalBills: 134100, billsValue0: 7680, billedAmount: 21800000, lastBillPrincipalDue: 18200000, lfApplied: 248000, bfApplied: 131000, cfApplied: 412000, variance: 0 },
  { billDate: 'Oct-2025', totalBills: 130500, billsValue0: 7200, billedAmount: 20500000, lastBillPrincipalDue: 17100000, lfApplied: 234000, bfApplied: 126000, cfApplied: 398000, variance: 0 },
  { billDate: 'Sep-2025', totalBills: 126200, billsValue0: 6800, billedAmount: 19100000, lastBillPrincipalDue: 16000000, lfApplied: 218000, bfApplied: 118000, cfApplied: 380000, variance: 0 },
];

const fmt = (n: number) => n.toLocaleString('en-IN');
const fmtCr = (n: number) => `₹${(n / 10000000).toFixed(2)} Cr`;

const BAR_KEYS: { key: keyof MonthRow; label: string; color: string }[] = [
  { key: 'billedAmount', label: 'Billed Amount', color: 'bg-blue-500' },
  { key: 'lastBillPrincipalDue', label: 'Principal Due', color: 'bg-purple-500' },
  { key: 'cfApplied', label: 'CF', color: 'bg-green-500' },
  { key: 'bfApplied', label: 'BF', color: 'bg-yellow-500' },
  { key: 'lfApplied', label: 'LPF', color: 'bg-red-500' },
];

const MOMLenderBilling = () => {
  const [view, setView] = useState<'table' | 'chart'>('table');
  const maxBilled = Math.max(...MOCK_DATA.map((r) => r.billedAmount as number));

  return (
    <div className="space-y-4">
      <ActionableInsights
        insights={[
          {
            type: 'warning',
            title: 'Billing variance',
            description: '₹22,707 total billing variance flagged for Feb-2026.',
            actionText: 'Review Feb Variance',
            actionLink: '/finance-recon/mom-delta/Feb-2026',
          },
          {
            type: 'info',
            title: 'Prior month',
            description: 'Prior month (Jan-2026) is fully reconciled with ₹0 variance.',
            actionText: 'View Jan Data',
            actionLink: '#',
          },
        ]}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">MOM Lender Billing — Historical Trend</h2>
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          <button
            onClick={() => setView('table')}
            className={`px-4 py-2 text-xs font-semibold ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Table View
          </button>
          <button
            onClick={() => setView('chart')}
            className={`px-4 py-2 text-xs font-semibold ${view === 'chart' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Bar Chart View
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Bill Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Total Bills</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Bills (Val=0)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Billed Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Principal Due</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">LF Applied</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">BF Applied</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">CF Applied</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_DATA.map((row) => (
                <tr key={row.billDate} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{row.billDate}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmt(row.totalBills)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-700">{fmt(row.billsValue0)}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-semibold text-blue-600">{fmtCr(row.billedAmount)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmtCr(row.lastBillPrincipalDue)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-red-600">₹{fmt(row.lfApplied)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-yellow-700">₹{fmt(row.bfApplied)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-green-600">₹{fmt(row.cfApplied)}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-semibold">
                    {row.variance === 0 ? (
                      <span className="text-green-600">₹0</span>
                    ) : (
                      <Link
                        to={`/pp-insights/mom-delta/${encodeURIComponent(row.billDate)}`}
                        className="text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-800"
                      >
                        ₹{fmt(row.variance)}
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-4">
            {BAR_KEYS.map((k) => (
              <div key={k.key as string} className="flex items-center gap-2 text-xs text-gray-700">
                <div className={`h-3 w-3 rounded ${k.color}`} />
                {k.label}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[...MOCK_DATA].reverse().map((row) => (
              <div key={row.billDate}>
                <div className="mb-1 text-xs font-semibold text-gray-700">{row.billDate}</div>
                <div className="space-y-1">
                  {BAR_KEYS.map((k) => {
                    const val = row[k.key] as number;
                    const pct = Math.max((val / maxBilled) * 100, 1);
                    return (
                      <div key={k.key as string} className="flex items-center gap-2">
                        <div className="w-20 text-right text-xs text-gray-500">{k.label}</div>
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div className={`h-full ${k.color}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-20 text-xs text-gray-700">{val >= 1_000_000 ? fmtCr(val) : `₹${fmt(val)}`}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MOMLenderBilling;
