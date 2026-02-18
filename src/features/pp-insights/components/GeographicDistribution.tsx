const STATES = [
  { state: 'Uttar Pradesh', count: 532_800, pct: 22.2 },
  { state: 'Delhi', count: 285_600, pct: 11.9 },
  { state: 'Rajasthan', count: 259_200, pct: 10.8 },
  { state: 'Maharashtra', count: 256_800, pct: 10.7 },
  { state: 'Telangana', count: 165_600, pct: 6.9 },
  { state: 'Madhya Pradesh', count: 144_000, pct: 6.0 },
  { state: 'Karnataka', count: 124_800, pct: 5.2 },
  { state: 'Gujarat', count: 110_400, pct: 4.6 },
  { state: 'Bihar', count: 91_200, pct: 3.8 },
  { state: 'Tamil Nadu', count: 84_000, pct: 3.5 },
];

const maxCount = Math.max(...STATES.map((s) => s.count));
const fmt = (n: number) => n.toLocaleString('en-IN');

const GeographicDistribution = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Geographic Distribution</h1>
      <p className="mt-1 text-sm text-gray-600">State-wise customer density across the active lending base</p>
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-sm">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-32 w-32 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-lg font-bold text-blue-700">India State Density Map</div>
          <div className="mt-1 text-sm text-blue-600">Integration Pending</div>
          <div className="mt-3 text-xs text-gray-500">
            Install <code className="rounded bg-gray-100 px-1.5 py-0.5">react-simple-maps</code> to enable interactive choropleth
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">State</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Customer Count</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">% Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {STATES.map((row) => {
              const pct = (row.count / maxCount) * 100;
              return (
                <tr key={row.state} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.state}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="relative inline-block w-40">
                      <div className="absolute inset-y-0 left-0 rounded bg-green-100" style={{ width: `${pct}%` }} />
                      <span className="relative z-10 block px-2 py-1 text-right font-semibold text-gray-900">
                        {fmt(row.count)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-blue-600">{row.pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default GeographicDistribution;
