import { useEffect } from 'react';

export interface IngestionHealthPayload {
  lenderFile: string;
  dwhTable: string;
  frequency: string;
  lastIngestion: string;
  status: 'SUCCESS' | 'DELAYED' | 'INACTIVE' | 'FAILED';
  /** Overall health 0–100 */
  overallHealth: number;
  statusLabel: 'Active' | 'Inactive';
  reasonInactive?: string;
  syncDelay: string;
  datasetMaxDate?: string;
  sourceMaxDate?: string;
  lastSyncTime: string;
  datasetId?: string;
  datasetType?: string;
  vertical?: string;
  subVertical?: string;
  productSpocEmail?: string;
  techSpocEmail?: string;
  sloMinutes?: number;
  totalFields?: number;
  activeFields?: number;
  inactiveFields?: number;
  schemaHealth?: number;
}

interface IngestionHealthModalProps {
  payload: IngestionHealthPayload | null;
  onClose: () => void;
}

const IngestionHealthModal = ({ payload, onClose }: IngestionHealthModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!payload) return null;

  const isInactive = payload.status === 'INACTIVE' || payload.status === 'FAILED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" aria-hidden onClick={onClose} />
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl"
        role="dialog"
        aria-labelledby="ingestion-modal-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <h2 id="ingestion-modal-title" className="text-lg font-bold text-gray-900">
            {payload.lenderFile} — Health Report
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Section 1: Overall Health & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50/50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Overall Health</div>
              <div
                className={`mt-1 text-4xl font-bold ${
                  payload.overallHealth >= 90 ? 'text-green-600' : payload.overallHealth >= 70 ? 'text-amber-600' : 'text-red-600'
                }`}
              >
                {payload.overallHealth}%
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-lg border border-gray-200 bg-gray-50/50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</div>
              <span
                className={`mt-1 inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${
                  payload.statusLabel === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {payload.statusLabel}
              </span>
            </div>
          </div>

          {isInactive && payload.reasonInactive && (
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <div className="text-sm font-bold text-red-800">Critical: Inactivity Reason</div>
              <p className="mt-1 text-sm text-red-700">{payload.reasonInactive}</p>
            </div>
          )}

          {/* Section 2: Sync Performance */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Sync Performance</h3>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-500">Sync Delay</dt>
                <dd className="text-sm font-semibold text-gray-900">{payload.syncDelay}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Last Sync Time</dt>
                <dd className="text-sm font-semibold text-gray-900">{payload.lastSyncTime}</dd>
              </div>
              {payload.datasetMaxDate != null && (
                <div>
                  <dt className="text-xs text-gray-500">Dataset Max Date</dt>
                  <dd className="text-sm font-semibold text-gray-900">{payload.datasetMaxDate}</dd>
                </div>
              )}
              {payload.sourceMaxDate != null && (
                <div>
                  <dt className="text-xs text-gray-500">Source Max Date</dt>
                  <dd className="text-sm font-semibold text-gray-900">{payload.sourceMaxDate}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Section 3: Dataset Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Dataset Information</h3>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {payload.datasetId != null && (
                <>
                  <div>
                    <dt className="text-xs text-gray-500">Dataset ID</dt>
                    <dd className="text-sm font-medium text-gray-900 break-all">{payload.datasetId}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Type</dt>
                    <dd className="text-sm font-medium text-gray-900">{payload.datasetType ?? 'INGEST'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Vertical</dt>
                    <dd className="text-sm font-medium text-gray-900">{payload.vertical ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Sub Vertical</dt>
                    <dd className="text-sm font-medium text-gray-900">{payload.subVertical ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Product SPOC Email</dt>
                    <dd className="text-sm font-medium text-gray-900 break-all">{payload.productSpocEmail ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Tech SPOC Email</dt>
                    <dd className="text-sm font-medium text-gray-900 break-all">{payload.techSpocEmail ?? '—'}</dd>
                  </div>
                  {payload.sloMinutes != null && (
                    <div>
                      <dt className="text-xs text-gray-500">SLO Minutes</dt>
                      <dd className="text-sm font-medium text-gray-900">{payload.sloMinutes}</dd>
                    </div>
                  )}
                </>
              )}
            </dl>
          </div>

          {/* Section 4: Schema Information */}
          {(payload.totalFields != null || payload.schemaHealth != null) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Schema Information</h3>
              <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {payload.totalFields != null && (
                  <div>
                    <dt className="text-xs text-gray-500">Total Fields</dt>
                    <dd className="text-sm font-semibold text-gray-900">{payload.totalFields}</dd>
                  </div>
                )}
                {payload.activeFields != null && (
                  <div>
                    <dt className="text-xs text-gray-500">Active Fields</dt>
                    <dd className="text-sm font-semibold text-gray-900">{payload.activeFields}</dd>
                  </div>
                )}
                {payload.inactiveFields != null && (
                  <div>
                    <dt className="text-xs text-gray-500">Inactive Fields</dt>
                    <dd className="text-sm font-semibold text-gray-900">{payload.inactiveFields}</dd>
                  </div>
                )}
                {payload.schemaHealth != null && (
                  <div>
                    <dt className="text-xs text-gray-500">Schema Health</dt>
                    <dd className="text-sm font-semibold text-green-700">{payload.schemaHealth}%</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngestionHealthModal;
