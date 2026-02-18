const MOCK = [
  { status: 'ACTIVE', count: 2_400_000 },
  { status: 'CLOSED', count: 380_000 },
  { status: 'FROZEN', count: 45_000 },
  { status: 'VKYC_SOFTBLOCKED', count: 12_800 },
  { status: 'N/A', count: 5_200 },
];

const maxCount = Math.max(...MOCK.map((r) => r.count));
const fmt = (n: number) => n.toLocaleString('en-IN');

const statusColor: Record<string, string> = {
  ACTIVE: 'text-green-700',
  CLOSED: 'text-gray-700',
  FROZEN: 'text-blue-700',
  VKYC_SOFTBLOCKED: 'text-yellow-700',
  'N/A': 'text-gray-500',
};

const LoanAccountStatus = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Account Status</h1>
      <p className="mt-1 text-sm text-gray-600">User vs Loan Account Status distribution across the portfolio</p>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Loan Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Unique Customers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {MOCK.map((row) => {
            const pct = (row.count / maxCount) * 100;
            return (
              <tr key={row.status} className="hover:bg-gray-50">
                <td className={`px-4 py-3 text-sm font-semibold ${statusColor[row.status] || 'text-gray-900'}`}>
                  {row.status}
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="relative inline-block w-48">
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

export default LoanAccountStatus;
