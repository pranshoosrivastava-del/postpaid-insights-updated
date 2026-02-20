import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface DPDRow {
  dpdCount: number;
  paytmLmsCount: number;
  lenderFileCount: number;
}

/** Delta = Lender file count - Paytm LMS count. Sorted descending by DPD Count. */
const MOCK_ROWS: DPDRow[] = [
  { dpdCount: 90, paytmLmsCount: 4700, lenderFileCount: 4700 },
  { dpdCount: 61, paytmLmsCount: 3050, lenderFileCount: 3100 },
  { dpdCount: 45, paytmLmsCount: 6820, lenderFileCount: 6800 },
  { dpdCount: 30, paytmLmsCount: 15620, lenderFileCount: 15400 },
  { dpdCount: 15, paytmLmsCount: 8200, lenderFileCount: 8180 },
  { dpdCount: 7, paytmLmsCount: 4200, lenderFileCount: 4200 },
  { dpdCount: 1, paytmLmsCount: 118200, lenderFileCount: 118200 },
];

const fmt = (n: number) => n.toLocaleString('en-IN');

const DPDRecon = () => {
  const sortedRows = useMemo(
    () => [...MOCK_ROWS].sort((a, b) => b.dpdCount - a.dpdCount),
    []
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">DPD Recon</h1>
        <p className="mt-1 text-sm text-gray-600">
          Live DPD mismatches: Lender file vs Paytm LMS. Click a non-zero Delta to investigate.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[500px] border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                DPD Count
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Paytm LMS
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Lender File
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Delta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedRows.map((row) => {
              const delta = row.lenderFileCount - row.paytmLmsCount;
              const hasDelta = delta !== 0;
              return (
                <tr key={row.dpdCount} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.dpdCount}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.paytmLmsCount)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900">
                    {fmt(row.lenderFileCount)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {hasDelta ? (
                      <Link
                        to={`/pp-insights/dpd-delta-details/${row.dpdCount}`}
                        className="inline-block rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 font-bold text-red-700 shadow-sm hover:bg-red-100 hover:border-red-400"
                      >
                        {delta > 0 ? `+${fmt(delta)}` : fmt(delta)}
                      </Link>
                    ) : (
                      <span className="text-green-600/90">{fmt(0)}</span>
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

export default DPDRecon;
