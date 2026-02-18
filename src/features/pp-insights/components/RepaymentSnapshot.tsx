const MOCK = {
  totalBillAmount: 26_800_000,
  lansWithBillGt0: 139_100,
  totalRepaymentAmount: 22_140_000,
  outstandingAmount: 4_660_000,
  customersPaidFull: 118_200,
  customersPartialRepayment: 14_350,
};

const collectionEfficiency = ((MOCK.totalRepaymentAmount / MOCK.totalBillAmount) * 100).toFixed(1);

const fmt = (n: number) =>
  n >= 10_000_000
    ? `₹${(n / 10_000_000).toFixed(2)} Cr`
    : n >= 100_000
      ? `₹${(n / 100_000).toFixed(2)} L`
      : n.toLocaleString('en-IN');

const CARDS: { label: string; value: string; tone: string; icon: string }[] = [
  { label: 'Total Bill Amount', value: fmt(MOCK.totalBillAmount), tone: 'text-blue-600', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { label: 'LANs with Bill > 0', value: MOCK.lansWithBillGt0.toLocaleString('en-IN'), tone: 'text-purple-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Total Repayment', value: fmt(MOCK.totalRepaymentAmount), tone: 'text-green-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Outstanding Amount', value: fmt(MOCK.outstandingAmount), tone: 'text-red-600', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Customers Paid Full', value: MOCK.customersPaidFull.toLocaleString('en-IN'), tone: 'text-green-600', icon: 'M5 13l4 4L19 7' },
  { label: 'Partial Repayment', value: MOCK.customersPartialRepayment.toLocaleString('en-IN'), tone: 'text-yellow-700', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const RepaymentSnapshot = () => (
  <div className="space-y-5">
    <h2 className="text-lg font-bold text-gray-900">Repayment Snapshot</h2>

    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-700">Collection Efficiency</div>
        <div className="text-2xl font-bold text-green-600">{collectionEfficiency}%</div>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
          style={{ width: `${collectionEfficiency}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Total Repayment: {fmt(MOCK.totalRepaymentAmount)}</span>
        <span>Total Billed: {fmt(MOCK.totalBillAmount)}</span>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 ${card.tone}`}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">{card.label}</div>
            <div className={`mt-1 text-2xl font-bold ${card.tone}`}>{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RepaymentSnapshot;
