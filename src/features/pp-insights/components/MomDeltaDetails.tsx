import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LenderEmailModal from './LenderEmailModal';

interface MomDeltaRow {
  paytmLan: string;
  lenderLan: string;
  paytm: { principal: number; cf: number; gstOnCf: number; bounceCharge: number; lpf: number };
  lender: { principal: number; cf: number; gstOnCf: number; bounceCharge: number; lpf: number };
}

const MOCK_ROWS_BY_MONTH: Record<string, MomDeltaRow[]> = {
  'Feb-2026': [
    { paytmLan: 'PTM_LN_MOM_F01', lenderLan: 'AB_LN_MOM_F01', paytm: { principal: 185_000, cf: 620, gstOnCf: 112, bounceCharge: 0, lpf: 400 }, lender: { principal: 184_200, cf: 620, gstOnCf: 112, bounceCharge: 0, lpf: 420 } },
    { paytmLan: 'PTM_LN_MOM_F02', lenderLan: 'AB_LN_MOM_F02', paytm: { principal: 92_000, cf: 340, gstOnCf: 61, bounceCharge: 80, lpf: 0 }, lender: { principal: 92_000, cf: 335, gstOnCf: 60, bounceCharge: 80, lpf: 0 } },
    { paytmLan: 'PTM_LN_MOM_F03', lenderLan: 'AB_LN_MOM_F03', paytm: { principal: 210_000, cf: 580, gstOnCf: 104, bounceCharge: 120, lpf: 550 }, lender: { principal: 209_500, cf: 580, gstOnCf: 104, bounceCharge: 125, lpf: 550 } },
    { paytmLan: 'PTM_LN_MOM_F04', lenderLan: 'AB_LN_MOM_F04', paytm: { principal: 68_000, cf: 260, gstOnCf: 47, bounceCharge: 50, lpf: 180 }, lender: { principal: 68_000, cf: 265, gstOnCf: 48, bounceCharge: 50, lpf: 175 } },
    { paytmLan: 'PTM_LN_MOM_F05', lenderLan: 'AB_LN_MOM_F05', paytm: { principal: 145_000, cf: 480, gstOnCf: 86, bounceCharge: 0, lpf: 320 }, lender: { principal: 144_800, cf: 480, gstOnCf: 86, bounceCharge: 0, lpf: 320 } },
  ],
  'Jan-2026': [
    { paytmLan: 'PTM_LN_MOM_J01', lenderLan: 'AB_LN_MOM_J01', paytm: { principal: 172_000, cf: 560, gstOnCf: 101, bounceCharge: 0, lpf: 380 }, lender: { principal: 172_000, cf: 560, gstOnCf: 101, bounceCharge: 0, lpf: 380 } },
    { paytmLan: 'PTM_LN_MOM_J02', lenderLan: 'AB_LN_MOM_J02', paytm: { principal: 88_000, cf: 310, gstOnCf: 56, bounceCharge: 60, lpf: 150 }, lender: { principal: 87_500, cf: 310, gstOnCf: 56, bounceCharge: 65, lpf: 150 } },
  ],
};

const fmt = (n: number) =>
  n >= 1_000_000 ? `₹${(n / 1_000_000).toFixed(2)}M` : `₹${n.toLocaleString('en-IN')}`;

const MomDeltaDetails = () => {
  const { month } = useParams<{ month: string }>();
  const monthName = month ? decodeURIComponent(month) : '—';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const allRows = monthName in MOCK_ROWS_BY_MONTH ? MOCK_ROWS_BY_MONTH[monthName] : MOCK_ROWS_BY_MONTH['Feb-2026'];
  const filteredRows = allRows.filter((row) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return row.paytmLan.toLowerCase().includes(q) || row.lenderLan.toLowerCase().includes(q);
  });

  const toggleRow = (paytmLan: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(paytmLan)) next.delete(paytmLan);
      else next.add(paytmLan);
      return next;
    });
  };

  const toggleAll = () => {
    const visibleIds = filteredRows.map((r) => r.paytmLan);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
    if (allVisibleSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        visibleIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        visibleIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const selectedCount = selectedIds.size;
  const allVisibleSelected =
    filteredRows.length > 0 && filteredRows.every((r) => selectedIds.has(r.paytmLan));

  return (
    <div className="min-h-[400px] min-w-0 space-y-4 rounded-lg bg-white p-6 text-gray-900 shadow-md ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/pp-insights"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ← Back to Finance Recon
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">
        Discrepancy Investigation: MOM Billing - {monthName}
        <span className="ml-2 text-sm font-normal text-green-600">
          (Principal, CF, GST, Bounce, LPF for this month)
        </span>
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

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-gray-600">
          {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          type="button"
          onClick={() => setEmailModalOpen(true)}
          disabled={selectedCount === 0}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ✉️ Escalate Selected to Lender
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-12 border-b border-r border-gray-200 px-2 py-2.5">
                <input
                  type="checkbox"
                  checked={filteredRows.length > 0 && allVisibleSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="border-b border-r border-gray-200 px-3 py-2.5 text-left text-xs font-semibold uppercase text-gray-600">Paytm LAN</th>
              <th className="border-b border-r border-gray-200 px-3 py-2.5 text-left text-xs font-semibold uppercase text-gray-600">Lender LAN</th>
              <th colSpan={5} className="border-b border-r border-gray-200 bg-blue-600 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                PAYTM LMS
              </th>
              <th colSpan={5} className="border-b border-r border-gray-200 bg-slate-600 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                LENDER FILE
              </th>
              <th colSpan={6} className="border-b border-gray-200 bg-red-700 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                DELTA
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th className="w-12 border-b border-r border-gray-200 px-2 py-2" />
              <th className="border-b border-r border-gray-200 px-3 py-2 text-left text-xs font-medium text-gray-500" />
              <th className="border-b border-r border-gray-200 px-3 py-2 text-left text-xs font-medium text-gray-500" />
              <th className="min-w-[100px] whitespace-nowrap border-b border-r border-gray-200 bg-blue-100 px-2 py-2 text-center text-xs font-semibold text-gray-700">Principal</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">CF</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">GST on CF</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">Bounce</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">LPF</th>
              <th className="min-w-[100px] whitespace-nowrap border-b border-r border-gray-200 bg-slate-200 px-2 py-2 text-center text-xs font-semibold text-gray-700">Principal</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">CF</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">GST on CF</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">Bounce</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">LPF</th>
              <th className="min-w-[90px] whitespace-nowrap border-b border-r border-gray-200 bg-red-100 px-2 py-2 text-center text-xs font-semibold text-gray-800">Principal Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">CF Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">GST Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">Bounce Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">LPF Δ</th>
              <th className="border-b border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">TOTAL Δ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={23} className="px-4 py-8 text-center text-sm text-gray-500">
                  No rows match &quot;{searchTerm.trim() || 'your search'}&quot;. Try Paytm LAN or Lender LAN.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => {
                const principalD = row.lender.principal - row.paytm.principal;
                const cfD = row.lender.cf - row.paytm.cf;
                const gstD = row.lender.gstOnCf - row.paytm.gstOnCf;
                const bounceD = row.lender.bounceCharge - row.paytm.bounceCharge;
                const lpfD = row.lender.lpf - row.paytm.lpf;
                const totalDelta = principalD + cfD + gstD + bounceD + lpfD;
                const deltas = [principalD, cfD, gstD, bounceD, lpfD, totalDelta];
                const selected = selectedIds.has(row.paytmLan);
                return (
                  <tr key={row.paytmLan} className="hover:bg-gray-50/80">
                    <td className="w-12 border-r border-gray-200 px-2 py-2.5">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleRow(row.paytmLan)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2.5">
                      <span className="cursor-pointer font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800">
                        {row.paytmLan}
                      </span>
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2.5 text-sm text-gray-900">{row.lenderLan}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.paytm.principal)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.cf)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.gstOnCf)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.bounceCharge)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.lpf)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.lender.principal)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.cf)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.gstOnCf)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.bounceCharge)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.lpf)}</td>
                    {deltas.map((d, i) => (
                      <td
                        key={i}
                        className={`border-r border-gray-200 px-2 py-2.5 text-center text-sm font-medium last:border-r-0 ${d !== 0 ? 'bg-red-50 text-red-800' : 'text-gray-700'}`}
                      >
                        {d === 0 ? '0' : d > 0 ? `+${fmt(d)}` : fmt(d)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <LenderEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSend={() => {
          setEmailModalOpen(false);
          setSelectedIds(new Set());
        }}
        dimension={monthName}
        selectedCount={selectedCount}
        subjectPrefix="MOM Billing"
      />
    </div>
  );
};

export default MomDeltaDetails;
