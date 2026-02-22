import { useState } from 'react';
import { Link } from 'react-router-dom';
import ActionableInsights from './ActionableInsights';

interface DueComponent {
  label: string;
  paytm: number;
  lender: number;
}

interface DueRow {
  id: string;
  label: string;
  paytmTotal: number;
  lenderTotal: number;
  components: DueComponent[];
}

const MOCK_DATA: DueRow[] = [
  {
    id: 'cycle-feb',
    label: 'Feb-2026 Bill Cycle (T-1)',
    paytmTotal: 2_684_500,
    lenderTotal: 2_691_200,
    components: [
      { label: 'Principal Billed', paytm: 2_450_000, lender: 2_450_000 },
      { label: 'Convenience Fees (CF)', paytm: 48_200, lender: 48_200 },
      { label: 'GST on CF', paytm: 8_676, lender: 8_676 },
      { label: 'Bounce Fee (BF)', paytm: 16_200, lender: 19_400 },
      { label: 'Late Payment Fees (LPF)', paytm: 161_424, lender: 164_924 },
    ],
  },
  {
    id: 'cycle-jan',
    label: 'Jan-2026 Bill Cycle (T-1)',
    paytmTotal: 2_498_000,
    lenderTotal: 2_498_000,
    components: [
      { label: 'Principal Billed', paytm: 2_280_000, lender: 2_280_000 },
      { label: 'Convenience Fees (CF)', paytm: 45_000, lender: 45_000 },
      { label: 'GST on CF', paytm: 8_100, lender: 8_100 },
      { label: 'Bounce Fee (BF)', paytm: 15_000, lender: 15_000 },
      { label: 'Late Payment Fees (LPF)', paytm: 149_900, lender: 149_900 },
    ],
  },
];

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const DailyDuesRecon = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Daily Dues Recon (T-1)</h2>
      <p className="text-sm text-gray-600">
        TOTAL DUE = Principal Billed + CF + GST on CF + BF + LPF. Click a row to drill into sub-components.
      </p>

      <ActionableInsights
        insights={[
          {
            type: 'danger',
            title: 'T-1 variance',
            description: '₹6,700 variance in Feb-2026 T-1 cycle. Driven entirely by Bounce Fee (-₹3,200) and LPF (-₹3,500) mismatches.',
            actionText: 'Escalate T-1 Delta',
            actionLink: '/finance-recon/daily-dues-delta/total',
          },
        ]}
      />

      <div className="space-y-3">
        {MOCK_DATA.map((row) => {
          const diff = row.paytmTotal - row.lenderTotal;
          const isOpen = expanded === row.id;
          return (
            <div key={row.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setExpanded(isOpen ? null : row.id)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-50"
              >
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">{row.label}</div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-right text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Paytm</div>
                    <div className="font-semibold text-gray-900">{fmt(row.paytmTotal)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Lender</div>
                    <div className="font-semibold text-gray-900">{fmt(row.lenderTotal)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Variance</div>
                    {diff === 0 ? (
                      <div className="font-bold text-green-600">₹0</div>
                    ) : (
                      <Link
                        to={`/pp-insights/daily-dues-delta/${encodeURIComponent(row.label)}`}
                        className="font-bold text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-800"
                      >
                        {fmt(diff)}
                      </Link>
                    )}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-2 text-left text-xs font-semibold uppercase text-gray-600">Component</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-gray-600">Paytm</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-gray-600">Lender</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-gray-600">Diff</th>
                        <th className="px-4 py-2 text-center text-xs font-semibold uppercase text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {row.components.map((c) => {
                        const cd = c.paytm - c.lender;
                        const dimensionSlug = `${row.label} - ${c.label}`;
                        return (
                          <tr key={c.label} className="hover:bg-white">
                            <td className="px-6 py-2 text-sm text-gray-700">{c.label}</td>
                            <td className="px-4 py-2 text-right text-sm text-gray-900">{fmt(c.paytm)}</td>
                            <td className="px-4 py-2 text-right text-sm text-gray-900">{fmt(c.lender)}</td>
                            <td className="px-4 py-2 text-right text-sm font-semibold">
                              {cd === 0 ? (
                                <span className="text-green-600">₹0</span>
                              ) : (
                                <Link
                                  to={`/pp-insights/daily-dues-delta/${encodeURIComponent(dimensionSlug)}`}
                                  className="text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-800"
                                >
                                  {fmt(cd)}
                                </Link>
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span
                                className={`rounded px-2 py-1 text-xs font-semibold ${
                                  cd === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {cd === 0 ? 'Match' : 'Mismatch'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyDuesRecon;
