import { useState } from 'react';
import { Link } from 'react-router-dom';

const MONTHS = ['Jan-2026', 'Feb-2026'];

const DIMENSIONS = [
  'Total Bills',
  'Bills Value = 0',
  'Bills Value > 0',
  'Total Bill Amount',
  'Total CF Amount',
  'Accounts with CF',
  'Total BF Amount',
  'Accounts with BF',
  'Total LPF Amount',
  'Accounts with LPF',
];

const MOCK_DATA: Record<string, { ssfb: number; lms: number }[]> = {
  'Jan-2026': [
    { ssfb: 142500, lms: 142500 },
    { ssfb: 8420, lms: 8420 },
    { ssfb: 134080, lms: 134080 },
    { ssfb: 24500000, lms: 24500000 },
    { ssfb: 450000, lms: 448500 },
    { ssfb: 134080, lms: 134080 },
    { ssfb: 150000, lms: 153200 },
    { ssfb: 4120, lms: 4120 },
    { ssfb: 280000, lms: 280000 },
    { ssfb: 6890, lms: 6890 },
  ],
  'Feb-2026': [
    { ssfb: 148200, lms: 148200 },
    { ssfb: 9100, lms: 9050 },
    { ssfb: 139100, lms: 139150 },
    { ssfb: 26800000, lms: 26800000 },
    { ssfb: 482000, lms: 482000 },
    { ssfb: 139100, lms: 139100 },
    { ssfb: 162000, lms: 162000 },
    { ssfb: 4350, lms: 4350 },
    { ssfb: 310000, lms: 315200 },
    { ssfb: 7240, lms: 7240 },
  ],
};

const fmt = (n: number) =>
  n >= 1_000_000
    ? `₹${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? n.toLocaleString('en-IN')
      : n.toString();

const BillGenRecon = () => {
  const [month, setMonth] = useState(MONTHS[1]);
  const rows = MOCK_DATA[month];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Bill Gen Recon — Monthly Snapshot</h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Month</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Dimension</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">SSFB File (Lender)</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Paytm LMS</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {DIMENSIONS.map((dim, idx) => {
              const r = rows[idx];
              const diff = r.ssfb - r.lms;
              return (
                <tr key={dim} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-sm text-gray-700">{month}</td>
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{dim}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmt(r.ssfb)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmt(r.lms)}</td>
                  <td
                    className={`px-4 py-2.5 text-right text-sm font-semibold ${
                      diff === 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {diff === 0 ? (
                      '0'
                    ) : (
                      <Link
                        to={`/pp-insights/bill-delta-details/${encodeURIComponent(dim)}`}
                        className="font-bold text-red-700 underline decoration-red-300 underline-offset-2 hover:text-red-900"
                      >
                        {diff > 0 ? `+${fmt(diff)}` : `-${fmt(Math.abs(diff))}`}
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillGenRecon;
