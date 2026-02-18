const INCOME = [
  { category: 'Below 2L', count: 485_000, pct: 20.2 },
  { category: '2L-5L', count: 820_000, pct: 34.2 },
  { category: '5L-10L', count: 680_000, pct: 28.3 },
  { category: '10L-20L', count: 310_000, pct: 12.9 },
  { category: '20L+', count: 105_000, pct: 4.4 },
];

const OCCUPATION = [
  { occupation: 'Self Employed', count: 624_000, pct: 26.0 },
  { occupation: 'Private Sector', count: 576_000, pct: 24.0 },
  { occupation: 'Business Sector', count: 360_000, pct: 15.0 },
  { occupation: 'Public Sector', count: 192_000, pct: 8.0 },
  { occupation: 'Professional', count: 168_000, pct: 7.0 },
  { occupation: 'Govt Sector', count: 144_000, pct: 6.0 },
  { occupation: 'Housewife', count: 168_000, pct: 7.0 },
  { occupation: 'Student', count: 120_000, pct: 5.0 },
  { occupation: 'Retired', count: 48_000, pct: 2.0 },
];

const maxIncome = Math.max(...INCOME.map((r) => r.count));
const maxOcc = Math.max(...OCCUPATION.map((r) => r.count));
const fmt = (n: number) => n.toLocaleString('en-IN');

const DemographicsKPI = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Demographics</h1>
      <p className="mt-1 text-sm text-gray-600">Income and Occupation profile of the onboarded customer base</p>
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h3 className="text-sm font-bold text-gray-900">Income Distribution</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-gray-600">Income Category</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase text-gray-600">Customer Count</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase text-gray-600">% Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {INCOME.map((row) => {
              const barPct = (row.count / maxIncome) * 100;
              return (
                <tr key={row.category} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{row.category}</td>
                  <td className="px-4 py-2.5 text-right text-sm">
                    <div className="relative inline-block w-36">
                      <div className="absolute inset-y-0 left-0 rounded bg-green-100" style={{ width: `${barPct}%` }} />
                      <span className="relative z-10 block px-2 py-0.5 text-right font-semibold text-gray-900">{fmt(row.count)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-sm font-semibold text-blue-600">{row.pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h3 className="text-sm font-bold text-gray-900">Occupation Breakdown</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-gray-600">Occupation</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase text-gray-600">Onboarded</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase text-gray-600">% Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {OCCUPATION.map((row) => {
              const barPct = (row.count / maxOcc) * 100;
              return (
                <tr key={row.occupation} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{row.occupation}</td>
                  <td className="px-4 py-2.5 text-right text-sm">
                    <div className="relative inline-block w-36">
                      <div className="absolute inset-y-0 left-0 rounded bg-green-100" style={{ width: `${barPct}%` }} />
                      <span className="relative z-10 block px-2 py-0.5 text-right font-semibold text-gray-900">{fmt(row.count)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-sm font-semibold text-blue-600">{row.pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DemographicsKPI;
