import { useState } from 'react';
import { Link } from 'react-router-dom';
import LenderEmailModal from './LenderEmailModal';

interface RepaymentRow {
  paytmLan: string;
  lenderLan: string;
  paytm: { repaymentDate: string; amountPaid: number; paymentMode: string; status: string };
  lender: { repaymentDate: string; amountCredited: number; status: string };
}

const MOCK_ROWS: RepaymentRow[] = [
  {
    paytmLan: 'PTM_LN_RP_901',
    lenderLan: 'AB_LN_RP_901',
    paytm: { repaymentDate: '2026-02-15', amountPaid: 52_400, paymentMode: 'UPI', status: 'Paid' },
    lender: { repaymentDate: '2026-02-15', amountCredited: 52_400, status: 'Credited' },
  },
  {
    paytmLan: 'PTM_LN_RP_902',
    lenderLan: 'AB_LN_RP_902',
    paytm: { repaymentDate: '2026-02-14', amountPaid: 38_100, paymentMode: 'NACH', status: 'Paid' },
    lender: { repaymentDate: '2026-02-14', amountCredited: 37_900, status: 'Credited' },
  },
  {
    paytmLan: 'PTM_LN_RP_903',
    lenderLan: 'AB_LN_RP_903',
    paytm: { repaymentDate: '2026-02-13', amountPaid: 91_200, paymentMode: 'UPI', status: 'Paid' },
    lender: { repaymentDate: '2026-02-13', amountCredited: 91_200, status: 'Pending' },
  },
  {
    paytmLan: 'PTM_LN_RP_904',
    lenderLan: 'AB_LN_RP_904',
    paytm: { repaymentDate: '2026-02-12', amountPaid: 24_500, paymentMode: 'NACH', status: 'Paid' },
    lender: { repaymentDate: '2026-02-12', amountCredited: 24_500, status: 'Credited' },
  },
  {
    paytmLan: 'PTM_LN_RP_905',
    lenderLan: 'AB_LN_RP_905',
    paytm: { repaymentDate: '2026-02-11', amountPaid: 67_800, paymentMode: 'UPI', status: 'Paid' },
    lender: { repaymentDate: '2026-02-11', amountCredited: 67_800, status: 'Credited' },
  },
];

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const RepaymentDeltaDetails = () => {
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
        Discrepancy Investigation: Repayment Settlement
        <span className="ml-2 text-sm font-normal text-green-600">
          (Paytm says paid vs Lender file status/amount)
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
        <table className="w-full min-w-[900px] border-collapse">
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
              <th colSpan={4} className="border-b border-r border-gray-200 bg-blue-600 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                PAYTM LMS
              </th>
              <th colSpan={3} className="border-b border-r border-gray-200 bg-slate-600 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                LENDER FILE
              </th>
              <th colSpan={2} className="border-b border-gray-200 bg-red-700 px-2 py-2 text-center text-xs font-semibold uppercase text-white">
                DELTA
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th className="w-12 border-b border-r border-gray-200 px-2 py-2" />
              <th className="border-b border-r border-gray-200 px-3 py-2 text-left text-xs font-medium text-gray-500" />
              <th className="border-b border-r border-gray-200 px-3 py-2 text-left text-xs font-medium text-gray-500" />
              <th className="border-b border-r border-gray-200 bg-blue-100 px-2 py-2 text-center text-xs font-semibold text-gray-700">Repayment Date</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">Amount Paid</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">Payment Mode</th>
              <th className="border-b border-r border-gray-200 bg-blue-50 px-2 py-2 text-center text-xs font-medium text-gray-600">Status</th>
              <th className="border-b border-r border-gray-200 bg-slate-200 px-2 py-2 text-center text-xs font-semibold text-gray-700">Repayment Date</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">Amount Credited</th>
              <th className="border-b border-r border-gray-200 bg-slate-100 px-2 py-2 text-center text-xs font-medium text-gray-600">Status</th>
              <th className="border-b border-r border-gray-200 bg-red-100 px-2 py-2 text-center text-xs font-semibold text-gray-800">Amount Delta</th>
              <th className="border-b border-gray-200 bg-red-50 px-2 py-2 text-center text-xs font-medium text-gray-700">Status Mismatch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-4 py-8 text-center text-sm text-gray-500">
                  No rows match &quot;{searchTerm.trim() || 'your search'}&quot;. Try Paytm LAN or Lender LAN.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => {
                const amountDelta = row.lender.amountCredited - row.paytm.amountPaid;
                const statusMismatch = row.paytm.status !== row.lender.status || (row.paytm.status === 'Paid' && row.lender.status !== 'Credited');
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
                      <Link
                        to={`/pp-insights/customer-360/${encodeURIComponent(row.paytmLan)}`}
                        className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:underline hover:text-blue-800 cursor-pointer"
                      >
                        {row.paytmLan}
                      </Link>
                    </td>
                    <td className="border-r border-gray-200 px-3 py-2.5 text-sm text-gray-900">{row.lenderLan}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{row.paytm.repaymentDate}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.paytm.amountPaid)}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{row.paytm.paymentMode}</td>
                    <td className="border-r border-gray-200 bg-blue-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{row.paytm.status}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{row.lender.repaymentDate}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-right text-sm text-gray-900">{fmt(row.lender.amountCredited)}</td>
                    <td className="border-r border-gray-200 bg-slate-50/50 px-2 py-2.5 text-center text-sm text-gray-900">{row.lender.status}</td>
                    <td className={`border-r border-gray-200 px-2 py-2.5 text-center text-sm font-medium ${amountDelta !== 0 ? 'bg-red-50 text-red-800' : 'text-gray-700'}`}>
                      {amountDelta === 0 ? '0' : amountDelta > 0 ? `+${fmt(amountDelta)}` : fmt(amountDelta)}
                    </td>
                    <td className="border-b border-gray-200 px-2 py-2.5 text-center text-sm">
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${statusMismatch ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {statusMismatch ? 'True' : 'False'}
                      </span>
                    </td>
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
        dimension="Repayment Settlement"
        selectedCount={selectedCount}
        subjectPrefix="Repayment Settlement"
      />
    </div>
  );
};

export default RepaymentDeltaDetails;
