import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

export type RepaymentMetricType =
  | 'total-bill'
  | 'bill-gt-0'
  | 'total-repayment'
  | 'outstanding'
  | 'paid-full'
  | 'partial-paid';

interface RepaymentRow {
  paytmLan: string;
  lenderLan: string;
  billedPrincipal: number;
  billedCF: number;
  billedLPF: number;
  billedBC: number;
  amountPaid: number;
}

const METRIC_TITLES: Record<RepaymentMetricType, string> = {
  'total-bill': 'Total Bill Amount',
  'bill-gt-0': 'LANs with Bill > 0',
  'total-repayment': 'Total Repayment',
  outstanding: 'Outstanding Amount',
  'paid-full': 'Customers Paid Full',
  'partial-paid': 'Partial Repayment',
};

/** Total Dues = Principal + CF + LPF + BC (strict). */
const totalDues = (r: RepaymentRow) =>
  r.billedPrincipal + r.billedCF + r.billedLPF + r.billedBC;

/** Outstanding = Total Dues - Amount Paid. */
const outstanding = (r: RepaymentRow) => totalDues(r) - r.amountPaid;

/** Robust mock data: mix of paid-full, partial-paid, and no payment. */
const MOCK_ROWS: RepaymentRow[] = [
  { paytmLan: 'PTM_RP_1001', lenderLan: 'AB_RP_1001', billedPrincipal: 45_000, billedCF: 180, billedLPF: 500, billedBC: 0, amountPaid: 45_680 },
  { paytmLan: 'PTM_RP_1002', lenderLan: 'AB_RP_1002', billedPrincipal: 82_000, billedCF: 320, billedLPF: 0, billedBC: 150, amountPaid: 0 },
  { paytmLan: 'PTM_RP_1003', lenderLan: 'AB_RP_1003', billedPrincipal: 28_500, billedCF: 120, billedLPF: 200, billedBC: 50, amountPaid: 28_870 },
  { paytmLan: 'PTM_RP_1004', lenderLan: 'AB_RP_1004', billedPrincipal: 156_000, billedCF: 520, billedLPF: 800, billedBC: 0, amountPaid: 100_000 },
  { paytmLan: 'PTM_RP_1005', lenderLan: 'AB_RP_1005', billedPrincipal: 61_000, billedCF: 240, billedLPF: 350, billedBC: 100, amountPaid: 61_690 },
  { paytmLan: 'PTM_RP_1006', lenderLan: 'AB_RP_1006', billedPrincipal: 0, billedCF: 0, billedLPF: 0, billedBC: 0, amountPaid: 0 },
  { paytmLan: 'PTM_RP_1007', lenderLan: 'AB_RP_1007', billedPrincipal: 92_000, billedCF: 360, billedLPF: 420, billedBC: 80, amountPaid: 92_860 },
  { paytmLan: 'PTM_RP_1008', lenderLan: 'AB_RP_1008', billedPrincipal: 33_000, billedCF: 140, billedLPF: 180, billedBC: 0, amountPaid: 20_000 },
  { paytmLan: 'PTM_RP_1009', lenderLan: 'AB_RP_1009', billedPrincipal: 210_000, billedCF: 580, billedLPF: 600, billedBC: 120, amountPaid: 210_900 },
  { paytmLan: 'PTM_RP_1010', lenderLan: 'AB_RP_1010', billedPrincipal: 18_000, billedCF: 80, billedLPF: 0, billedBC: 0, amountPaid: 18_080 },
];

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const RepaymentDrillDown = () => {
  const { metricType } = useParams<{ metricType: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const resolvedMetric = (metricType as RepaymentMetricType) || 'total-bill';
  const title = METRIC_TITLES[resolvedMetric] ?? resolvedMetric;
  const showPaymentColumns =
    resolvedMetric === 'total-repayment' ||
    resolvedMetric === 'outstanding' ||
    resolvedMetric === 'paid-full' ||
    resolvedMetric === 'partial-paid';

  const filteredByMetric = useMemo(() => {
    const rows = MOCK_ROWS.map((r) => ({
      ...r,
      totalDues: totalDues(r),
      outstandingAmount: outstanding(r),
    }));
    switch (resolvedMetric) {
      case 'total-bill':
        return rows;
      case 'bill-gt-0':
        return rows.filter((r) => r.totalDues > 0);
      case 'total-repayment':
        return rows.filter((r) => r.amountPaid > 0);
      case 'outstanding':
        return rows.filter((r) => r.outstandingAmount > 0);
      case 'paid-full':
        return rows.filter((r) => r.outstandingAmount === 0 && r.totalDues > 0);
      case 'partial-paid':
        return rows.filter((r) => r.amountPaid > 0 && r.outstandingAmount > 0);
      default:
        return rows;
    }
  }, [resolvedMetric]);

  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return filteredByMetric;
    return filteredByMetric.filter(
      (r) =>
        r.paytmLan.toLowerCase().includes(q) ||
        r.lenderLan.toLowerCase().includes(q)
    );
  }, [filteredByMetric, searchTerm]);

  return (
    <div className="min-h-[400px] min-w-0 space-y-4 rounded-lg bg-white p-6 text-gray-900 shadow-md ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/pp-insights"
          state={{ activeView: 'finance', financeTab: 'repayment' }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ← Back to Repayment Snapshot
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        Investigation: {title}
      </h1>

      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="relative max-w-xl">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search by Paytm LAN or Lender LAN..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Search by Paytm LAN or Lender LAN"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Paytm LAN
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Lender LAN
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Billed Principal
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Billed CF
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Billed LPF
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Billed BC
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Total Dues
              </th>
              {showPaymentColumns && (
                <>
                  <th className="border-b border-r border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                    Amount Paid
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                    Outstanding Amount
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={showPaymentColumns ? 9 : 7}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No rows match &quot;{searchTerm.trim() || 'this metric'}&quot;.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr key={row.paytmLan} className="hover:bg-gray-50/80">
                  <td className="border-r border-gray-200 px-4 py-3 font-medium text-blue-600">
                    {row.paytmLan}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {row.lenderLan}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.billedPrincipal)}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.billedCF)}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.billedLPF)}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.billedBC)}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    {fmt(row.totalDues)}
                  </td>
                  {showPaymentColumns && (
                    <>
                      <td className="border-r border-gray-200 px-4 py-3 text-right text-sm text-green-700">
                        {fmt(row.amountPaid)}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 text-right text-sm font-medium text-red-700">
                        {fmt(row.outstandingAmount)}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepaymentDrillDown;
