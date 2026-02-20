import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LenderEmailModal from './LenderEmailModal';

interface DailyDuesRow {
  paytmLan: string;
  lenderLan: string;
  paytm: { principalDue: number; cfDue: number; gstDue: number; bounceDue: number; lpfDue: number };
  lender: { principalDue: number; cfDue: number; gstDue: number; bounceDue: number; lpfDue: number };
}

const MOCK_ROWS: DailyDuesRow[] = [
  {
    paytmLan: 'PTM_LN_DD_801',
    lenderLan: 'AB_LN_DD_801',
    paytm: { principalDue: 45_000, cfDue: 180, gstDue: 32, bounceDue: 0, lpfDue: 500 },
    lender: { principalDue: 44_800, cfDue: 180, gstDue: 32, bounceDue: 0, lpfDue: 520 },
  },
  {
    paytmLan: 'PTM_LN_DD_802',
    lenderLan: 'AB_LN_DD_802',
    paytm: { principalDue: 82_000, cfDue: 320, gstDue: 58, bounceDue: 150, lpfDue: 0 },
    lender: { principalDue: 82_000, cfDue: 315, gstDue: 57, bounceDue: 150, lpfDue: 0 },
  },
  {
    paytmLan: 'PTM_LN_DD_803',
    lenderLan: 'AB_LN_DD_803',
    paytm: { principalDue: 28_500, cfDue: 120, gstDue: 22, bounceDue: 50, lpfDue: 200 },
    lender: { principalDue: 28_500, cfDue: 120, gstDue: 22, bounceDue: 55, lpfDue: 200 },
  },
  {
    paytmLan: 'PTM_LN_DD_804',
    lenderLan: 'AB_LN_DD_804',
    paytm: { principalDue: 156_000, cfDue: 520, gstDue: 94, bounceDue: 0, lpfDue: 800 },
    lender: { principalDue: 155_200, cfDue: 520, gstDue: 94, bounceDue: 0, lpfDue: 800 },
  },
  {
    paytmLan: 'PTM_LN_DD_805',
    lenderLan: 'AB_LN_DD_805',
    paytm: { principalDue: 61_000, cfDue: 240, gstDue: 43, bounceDue: 100, lpfDue: 350 },
    lender: { principalDue: 61_000, cfDue: 245, gstDue: 44, bounceDue: 100, lpfDue: 340 },
  },
];

const fmt = (n: number) =>
  n >= 1_000_000 ? `₹${(n / 1_000_000).toFixed(2)}M` : `₹${n.toLocaleString('en-IN')}`;

const sum = (p: DailyDuesRow['paytm']) => p.principalDue + p.cfDue + p.gstDue + p.bounceDue + p.lpfDue;

const DailyDuesDeltaDetails = () => {
  const { dimension } = useParams<{ dimension: string }>();
  const dimensionName = dimension ? decodeURIComponent(dimension) : '—';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const filteredRows = MOCK_ROWS.filter((row) => {
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
        Discrepancy Investigation: Daily Dues - {dimensionName}
        <span className="ml-2 text-sm font-normal text-green-600">
          (TOTAL DUE = Principal Due + CF + GST + Bounce + LPF)
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
              <th className="min-w-[90px] whitespace-nowrap border-b border-r border-gray-200 bg-blue-100 px-2 py-2 text-center text-xs font-semibold text-gray-700">Principal Due</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">CF Due</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">GST Due</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">Bounce Due</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">LPF Due</th>
              <th className="min-w-[90px] whitespace-nowrap border-b border-r border-gray-200 bg-slate-200 px-2 py-2 text-center text-xs font-semibold text-gray-700">Principal Due</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">CF Due</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">GST Due</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">Bounce Due</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">LPF Due</th>
              <th className="min-w-[80px] whitespace-nowrap border-b border-r border-gray-200 bg-red-100 px-2 py-2 text-center text-xs font-semibold text-gray-800">Principal Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">CF Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">GST Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">Bounce Δ</th>
              <th className="border-b border-r border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">LPF Δ</th>
              <th className="border-b border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">Total Δ</th>
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
                const paytmTotal = sum(row.paytm);
                const lenderTotal = sum(row.lender);
                const dP = row.lender.principalDue - row.paytm.principalDue;
                const dCf = row.lender.cfDue - row.paytm.cfDue;
                const dGst = row.lender.gstDue - row.paytm.gstDue;
                const dBounce = row.lender.bounceDue - row.paytm.bounceDue;
                const dLpf = row.lender.lpfDue - row.paytm.lpfDue;
                const totalDelta = lenderTotal - paytmTotal;
                const deltas = [dP, dCf, dGst, dBounce, dLpf, totalDelta];
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
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.paytm.principalDue)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.cfDue)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.gstDue)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.bounceDue)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.paytm.lpfDue)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.lender.principalDue)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.cfDue)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.gstDue)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.bounceDue)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{fmt(row.lender.lpfDue)}</td>
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
        dimension={dimensionName}
        selectedCount={selectedCount}
        subjectPrefix="Daily Dues Discrepancy"
      />
    </div>
  );
};

export default DailyDuesDeltaDetails;
