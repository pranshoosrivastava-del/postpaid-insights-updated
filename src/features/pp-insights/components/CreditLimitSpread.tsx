const MOCK = [
  { category: '500-1000', count: 42_100 },
  { category: '1000-1500', count: 68_500 },
  { category: '1500-2000', count: 95_200 },
  { category: '2K-5K', count: 310_000 },
  { category: '5K-10K', count: 485_000 },
  { category: '10K-15K', count: 620_000 },
  { category: '15K-20K', count: 380_000 },
  { category: '20K-30K', count: 245_000 },
  { category: '30K-40K', count: 98_000 },
  { category: '40K-50K', count: 32_000 },
  { category: '50K+', count: 18_500 },
  { category: 'N/A', count: 5_700 },
];

const maxCount = Math.max(...MOCK.map((r) => r.count));
const fmt = (n: number) => n.toLocaleString('en-IN');

const CreditLimitSpread = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Credit Limit Categorization</h1>
      <p className="mt-1 text-sm text-gray-600">Distribution of sanctioned credit limits across the active base</p>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Category (Limit Range)</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600"># Unique Customers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {MOCK.map((row) => {
            const pct = (row.count / maxCount) * 100;
            return (
              <tr key={row.category} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.category}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="relative inline-block w-56">
                    <div
                      className="absolute inset-y-0 left-0 rounded bg-green-100"
                      style={{ width: `${pct}%` }}
                    />
                    <span className="relative z-10 block px-2 py-1 text-right font-semibold text-gray-900">
                      {fmt(row.count)}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default CreditLimitSpread;
