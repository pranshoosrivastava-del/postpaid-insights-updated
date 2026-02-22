import { useState } from 'react';
import IngestionHealthModal, { type IngestionHealthPayload } from './IngestionHealthModal';

const PIPELINES: IngestionHealthPayload[] = [
  {
    lenderFile: 'Daily Loan account snapshot',
    dwhTable: 'ssfb_paytm.account_details_snapshot_v3',
    frequency: 'Daily',
    lastIngestion: 'Feb 18, 2026, 06:00:12',
    status: 'SUCCESS',
    overallHealth: 94,
    statusLabel: 'Active',
    syncDelay: '0h',
    datasetMaxDate: '2026-02-18',
    sourceMaxDate: '2026-02-18',
    lastSyncTime: 'Feb 18, 2026, 06:00:12',
    datasetId: 'ssfb_account_snapshot_v3',
    datasetType: 'INGEST',
    vertical: 'Lending',
    subVertical: 'Postpaid',
    productSpocEmail: 'finance-ops@company.com',
    techSpocEmail: 'data-eng@company.com',
    sloMinutes: 240,
    totalFields: 42,
    activeFields: 42,
    inactiveFields: 0,
    schemaHealth: 100,
  },
  {
    lenderFile: 'Daily Loan account snapshot (append & merge)',
    dwhTable: 'ssfb_paytm.account_details_apend_snapshot_v3',
    frequency: 'Daily',
    lastIngestion: 'Feb 18, 2026, 09:36:00',
    status: 'DELAYED',
    overallHealth: 85,
    statusLabel: 'Active',
    syncDelay: '3.6h',
    datasetMaxDate: '2026-02-18',
    sourceMaxDate: '2026-02-18',
    lastSyncTime: 'Feb 18, 2026, 09:36:00',
    datasetId: 'ssfb_account_append_v3',
    datasetType: 'INGEST',
    vertical: 'Lending',
    subVertical: 'Postpaid',
    productSpocEmail: 'finance-ops@company.com',
    techSpocEmail: 'data-eng@company.com',
    sloMinutes: 240,
    totalFields: 38,
    activeFields: 37,
    inactiveFields: 1,
    schemaHealth: 97,
  },
  {
    lenderFile: 'Daily Transaction file',
    dwhTable: 'ssfb_paytm.transaction_data_snapshot_v3',
    frequency: 'Daily',
    lastIngestion: 'Feb 18, 2026, 06:30:45',
    status: 'SUCCESS',
    overallHealth: 99,
    statusLabel: 'Active',
    syncDelay: '0.5h',
    datasetMaxDate: '2026-02-18',
    sourceMaxDate: '2026-02-18',
    lastSyncTime: 'Feb 18, 2026, 06:30:45',
    datasetId: 'ssfb_transaction_snapshot_v3',
    datasetType: 'INGEST',
    vertical: 'Lending',
    subVertical: 'Postpaid',
    productSpocEmail: 'finance-ops@company.com',
    techSpocEmail: 'data-eng@company.com',
    sloMinutes: 240,
    totalFields: 28,
    activeFields: 28,
    inactiveFields: 0,
    schemaHealth: 100,
  },
  {
    lenderFile: 'Monthly Bills file',
    dwhTable: 'ssfb_paytm.bill_snapshot_v3',
    frequency: 'Monthly',
    lastIngestion: 'N/A',
    status: 'FAILED',
    overallHealth: 0,
    statusLabel: 'Inactive',
    reasonInactive: 'Error: Monthly file not found at lender SFTP dropzone. Pipeline paused.',
    syncDelay: 'N/A',
    lastSyncTime: 'N/A',
    datasetId: 'ssfb_bill_snapshot_v3',
    datasetType: 'INGEST',
    vertical: 'Lending',
    subVertical: 'Postpaid',
    productSpocEmail: 'finance-ops@company.com',
    techSpocEmail: 'data-eng@company.com',
    sloMinutes: 1440,
    totalFields: 56,
    activeFields: 56,
    inactiveFields: 0,
    schemaHealth: 100,
  },
];

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return 'bg-green-100 text-green-800';
    case 'DELAYED':
      return 'bg-amber-100 text-amber-800';
    case 'INACTIVE':
    case 'FAILED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DataIngestionWidget = () => {
  const [selected, setSelected] = useState<IngestionHealthPayload | null>(null);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Ingestion Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Lender File
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  DWH Table
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Frequency
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Last Ingestion
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {PIPELINES.map((row, idx) => (
                <tr
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(row)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(row);
                    }
                  }}
                  className="cursor-pointer hover:bg-blue-50/80 focus:bg-blue-50/80 focus:outline-none"
                >
                  <td className="px-3 py-2.5 text-sm font-medium text-gray-900">{row.lenderFile}</td>
                  <td className="px-3 py-2.5 text-xs font-mono text-gray-700">{row.dwhTable}</td>
                  <td className="px-3 py-2.5 text-sm text-gray-700">{row.frequency}</td>
                  <td className="px-3 py-2.5 text-sm text-gray-700">{row.lastIngestion}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(row.status)}`}
                    >
                      {row.status === 'FAILED' ? 'Inactive/Failed' : row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">Click a row to view the full DWH health report.</p>
      </div>

      <IngestionHealthModal payload={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default DataIngestionWidget;
