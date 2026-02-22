import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

interface DPDDetailRow {
  paytmLan: string;
  lenderLan: string;
  dpdAvailableIn: string;
  dpdCounter: number;
}

/** Mock rows for various DPD days so drill-down shows contextually relevant LANs. */
const MOCK_ALL_ROWS: DPDDetailRow[] = [
  { paytmLan: 'PTM_DPD_2001', lenderLan: 'AB_DPD_2001', dpdAvailableIn: 'Only in Paytm LMS', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2002', lenderLan: 'AB_DPD_2002', dpdAvailableIn: 'Only in Lender File', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2003', lenderLan: 'AB_DPD_2003', dpdAvailableIn: 'Mismatch in Both', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2004', lenderLan: 'AB_DPD_2004', dpdAvailableIn: 'Only in Paytm LMS', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2005', lenderLan: 'AB_DPD_2005', dpdAvailableIn: 'Only in Lender File', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2006', lenderLan: 'AB_DPD_2006', dpdAvailableIn: 'Mismatch in Both', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2007', lenderLan: 'AB_DPD_2007', dpdAvailableIn: 'Only in Paytm LMS', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2008', lenderLan: 'AB_DPD_2008', dpdAvailableIn: 'Only in Lender File', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2009', lenderLan: 'AB_DPD_2009', dpdAvailableIn: 'Mismatch in Both', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2010', lenderLan: 'AB_DPD_2010', dpdAvailableIn: 'Only in Paytm LMS', dpdCounter: 30 },
  { paytmLan: 'PTM_DPD_2011', lenderLan: 'AB_DPD_2011', dpdAvailableIn: 'Only in Lender File', dpdCounter: 45 },
  { paytmLan: 'PTM_DPD_2012', lenderLan: 'AB_DPD_2012', dpdAvailableIn: 'Mismatch in Both', dpdCounter: 45 },
  { paytmLan: 'PTM_DPD_2013', lenderLan: 'AB_DPD_2013', dpdAvailableIn: 'Only in Paytm LMS', dpdCounter: 15 },
  { paytmLan: 'PTM_DPD_2014', lenderLan: 'AB_DPD_2014', dpdAvailableIn: 'Only in Lender File', dpdCounter: 15 },
];

const DPDDeltaDetails = () => {
  const { dpdCount } = useParams<{ dpdCount: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const dpdLabel = dpdCount ?? '—';

  const rowsForDay = useMemo(() => {
    const day = dpdCount ? parseInt(dpdCount, 10) : NaN;
    if (!Number.isFinite(day)) return MOCK_ALL_ROWS;
    return MOCK_ALL_ROWS.filter((r) => r.dpdCounter === day);
  }, [dpdCount]);

  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return rowsForDay;
    return rowsForDay.filter(
      (r) =>
        r.paytmLan.toLowerCase().includes(q) ||
        r.lenderLan.toLowerCase().includes(q)
    );
  }, [rowsForDay, searchTerm]);

  return (
    <div className="min-h-[400px] min-w-0 space-y-4 rounded-lg bg-white p-6 text-gray-900 shadow-md ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/pp-insights"
          state={{ activeView: 'dpdRecon' } as { activeView?: string }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ← Back to DPD Recon
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        DPD Discrepancy Investigation: Day {dpdLabel}
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
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Paytm LAN
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Lender LAN
              </th>
              <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                DPD available in (Paytm LMS / Lender file)
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                DPD Counter
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                  {searchTerm.trim()
                    ? `No rows match "${searchTerm.trim()}".`
                    : rowsForDay.length === 0
                      ? `No LANs found for Day ${dpdLabel}.`
                      : 'No rows to display.'}
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr key={row.paytmLan} className="hover:bg-gray-50/80">
                  <td className="border-r border-gray-200 px-4 py-3">
                    <Link
                      to={`/pp-insights/customer-360/${encodeURIComponent(row.paytmLan)}`}
                      className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:underline hover:text-blue-800 cursor-pointer"
                    >
                      {row.paytmLan}
                    </Link>
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {row.lenderLan}
                  </td>
                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-700">
                    {row.dpdAvailableIn}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-900">
                    {row.dpdCounter}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DPDDeltaDetails;
