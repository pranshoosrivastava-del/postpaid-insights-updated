import { useRef, useEffect } from 'react';

interface LenderEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  dimension: string;
  selectedCount: number;
  /** Subject line prefix, e.g. "Daily Dues Discrepancy", "MOM Billing", "Repayment Settlement". Default: "Billing Discrepancy" */
  subjectPrefix?: string;
}

const MONTH_YEAR = new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
const MESSAGE_TEMPLATE = `Hi Team,

We have identified discrepancies in the latest billing file sync for the attached Loan Account Numbers. Please review the delta between our LMS and your generated file and advise at the earliest.

Thanks,
Finance Ops`;

const LenderEmailModal = ({ isOpen, onClose, onSend, dimension, selectedCount, subjectPrefix = 'Billing Discrepancy' }: LenderEmailModalProps) => {
  const subject = `URGENT: ${subjectPrefix} Alert - ${MONTH_YEAR} - ${dimension}`;
  const attachmentName = `Discrepancy_Report_${selectedCount}_LANs.csv`;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lender-email-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="lender-email-modal-title" className="text-lg font-semibold text-gray-900">
            Escalate Discrepancies to SSFB
          </h2>
        </div>
        <div className="space-y-4 px-6 py-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-500">To</label>
            <input
              type="email"
              defaultValue="recon-support@ssfb-lender.com"
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Subject</label>
            <input
              type="text"
              defaultValue={subject}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Message</label>
            <textarea
              rows={6}
              defaultValue={MESSAGE_TEMPLATE}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3">
            <span className="text-xs font-medium uppercase text-gray-500">Attachment</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
                <span className="text-gray-400">📎</span>
                {attachmentName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default LenderEmailModal;
