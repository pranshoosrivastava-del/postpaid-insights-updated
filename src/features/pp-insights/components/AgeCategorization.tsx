const MOCK = [
  { bucket: 'TOTAL', accounts: 2_400_000 },
  { bucket: '<1 month', accounts: 135_000 },
  { bucket: '1 month', accounts: 142_000 },
  { bucket: '2 months', accounts: 138_000 },
  { bucket: '3 months', accounts: 145_000 },
  { bucket: '4 months', accounts: 152_000 },
  { bucket: '5+ months', accounts: 1_688_000 },
];

const maxAccounts = Math.max(...MOCK.filter((r) => r.bucket !== 'TOTAL').map((r) => r.accounts));
const fmt = (n: number) => n.toLocaleString('en-IN');

const AgeCategorization = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Vintage (Age) Categorization</h1>
      <p className="mt-1 text-sm text-gray-600">Account age distribution across the active lending base</p>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Age Bucket</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Total Accounts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {MOCK.map((row) => {
            const isTotal = row.bucket === 'TOTAL';
            const pct = isTotal ? 100 : (row.accounts / maxAccounts) * 100;
            return (
              <tr key={row.bucket} className={`hover:bg-gray-50 ${isTotal ? 'bg-blue-50' : ''}`}>
                <td className={`px-4 py-3 text-sm ${isTotal ? 'font-bold text-blue-700' : 'font-medium text-gray-900'}`}>
                  {row.bucket}
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="relative inline-block w-56">
                    <div
                      className={`absolute inset-y-0 left-0 rounded ${isTotal ? 'bg-blue-100' : 'bg-green-100'}`}
                      style={{ width: `${pct}%` }}
                    />
                    <span className={`relative z-10 block px-2 py-1 text-right font-semibold ${isTotal ? 'text-blue-700' : 'text-gray-900'}`}>
                      {fmt(row.accounts)}
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

export default AgeCategorization;
