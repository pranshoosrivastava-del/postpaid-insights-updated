const MONTHS = ['Feb-26', 'Jan-26', 'Dec-25'];

interface DPDRow {
  month: string;
  bucket: string;
  lenderCount: number;
  lmsCount: number;
}

const MOCK: DPDRow[] = [
  { month: 'Feb-26', bucket: '0', lenderCount: 118200, lmsCount: 118200 },
  { month: 'Feb-26', bucket: '1-30', lenderCount: 15400, lmsCount: 15620 },
  { month: 'Feb-26', bucket: '31-60', lenderCount: 6800, lmsCount: 6800 },
  { month: 'Feb-26', bucket: '61-90', lenderCount: 3100, lmsCount: 3050 },
  { month: 'Feb-26', bucket: '90+', lenderCount: 4700, lmsCount: 4700 },
  { month: 'Jan-26', bucket: '0', lenderCount: 112500, lmsCount: 112500 },
  { month: 'Jan-26', bucket: '1-30', lenderCount: 14200, lmsCount: 14200 },
  { month: 'Jan-26', bucket: '31-60', lenderCount: 6300, lmsCount: 6400 },
  { month: 'Jan-26', bucket: '61-90', lenderCount: 2800, lmsCount: 2800 },
  { month: 'Jan-26', bucket: '90+', lenderCount: 4200, lmsCount: 4200 },
  { month: 'Dec-25', bucket: '0', lenderCount: 108900, lmsCount: 108900 },
  { month: 'Dec-25', bucket: '1-30', lenderCount: 13600, lmsCount: 13600 },
  { month: 'Dec-25', bucket: '31-60', lenderCount: 5900, lmsCount: 5900 },
  { month: 'Dec-25', bucket: '61-90', lenderCount: 2600, lmsCount: 2600 },
  { month: 'Dec-25', bucket: '90+', lenderCount: 3900, lmsCount: 3900 },
];

const fmt = (n: number) => n.toLocaleString('en-IN');

const DPDRecon = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">DPD Recon</h1>
      <p className="mt-1 text-sm text-gray-600">Month-on-Month Days Past Due reconciliation between Lender File and Paytm LMS</p>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Month</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">DPD Bucket</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Lender File Count</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Paytm LMS Count</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Difference</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {MONTHS.map((month) =>
            MOCK.filter((r) => r.month === month).map((row, idx) => {
              const diff = row.lenderCount - row.lmsCount;
              return (
                <tr key={`${row.month}-${row.bucket}`} className="hover:bg-gray-50">
                  {idx === 0 ? (
                    <td className="px-4 py-2.5 text-sm font-semibold text-gray-900" rowSpan={5}>
                      {row.month}
                    </td>
                  ) : null}
                  <td className="px-4 py-2.5 text-sm text-gray-700">{row.bucket}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmt(row.lenderCount)}</td>
                  <td className="px-4 py-2.5 text-right text-sm text-gray-900">{fmt(row.lmsCount)}</td>
                  <td
                    className={`px-4 py-2.5 text-right text-sm font-semibold ${
                      diff === 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {diff === 0 ? '0' : diff > 0 ? `+${fmt(diff)}` : fmt(diff)}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default DPDRecon;
