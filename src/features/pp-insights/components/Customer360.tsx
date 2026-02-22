import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Mock customer 360 payload: 10 categories. */
const CUSTOMER_360_DATA = {
  leadDetails: {
    'Application Id': 'cac37f6d',
    'Created Time': 'Feb 03, 2026, 10:56:21',
    'Customer Id': '22066124',
    'Is Replay Allowed': 'false',
    'Is Reset Allowed': 'false',
    'Lead Id': '698186fdf3c266c2792341ce',
    'Product Type': 'loc',
    'Solution Sub Type': 'SSFB',
    'Solution Type': 'LOC',
    State: 'LEAD_SUCCESSFULLY_CLOSED',
    'Workflow Name': 'LOC_SSFB_PO_VKYC',
  },
  customerDetails: {
    Dob: '19******14',
    Email: 'pra*************************com',
    'F Name': 'P******O',
    'L Name': 'S********A',
    'Marital Status': 'MARRIED',
    'Mobile No': '88******49',
    'Mother Name': 'M****************a',
    'Nsdl Name': 'PR***************VA',
    Occupation: 'PRIVATE SECTOR',
    Pan: 'EF******7G',
    'Yearly Income': '2500000',
  },
  addressDetails: {
    'Is Kyc Address Same As Current': 'TRUE',
    Address: 'D-244, Cherry county, Noida extension, UP, 201316',
    City: 'Noida extension',
    Pincode: '201316',
    State: 'UP',
  },
  bureauDetails: {
    'Bre Bureau Type': 'EXPERIAN',
    'Bre Credit Score': '841',
    'Credit State': 'COMPLETE_PROFILE_FETCHED',
    'Report Number': '1759219302420_899075209',
  },
  kycDetails: {
    'Ekyc Document Id': 'FDCCDFCDDBAAEEEDCDACDBDA',
    'Face Similarity Score': '95.31',
    'Is Vkyc Required': 'true',
    'Lender Kyc Type': '31',
    'Name Similarity Score': '1.00',
    Uid: '11********94',
  },
  lmsAccount: {
    'Account Limit': '60000',
    'Lender Account Number': '4961760456265865',
    'Lms Product Type': 'POSTPAID',
    'Loan Account Number': 'PYTMPPSSFB501719946',
    'Loan Amount': '60000',
    'Wallet Merchant Id': 'SURYOD33549547449946',
  },
  mandateDetails: {
    'Bank Name': 'AXIS BANK',
    Ifsc: 'UTIB0000673',
    'Mandate Mode': 'UPI',
    'Mandate Status': 'SUCCESS',
    'Mandate Sub Status': 'ACTIVE',
    'Payment Gateway': 'AOA_ROUTER',
  },
  offers: {
    'Convenience Fee': '1',
    'Loan Amount': '60000',
    'Product Id': '501',
  },
  consents: {
    'Tnc Identifier': '0dbcf084e8cb4a809ef3ecf67c6ecbfa',
    'Kfs Identifier': '9f0721cf0bd345eaa0d60eb0e70c8b00',
    'Ip Address': '106.194.123.68',
  },
  leadTimeline: [
    { state: 'BASIC_DETAILS_CAPTURED', time: 'Sep 30, 2025, 13:31:41' },
    { state: 'BUREAU_IN_PROGRESS', time: 'Sep 30, 2025, 13:31:41' },
    { state: 'SELFIE_CAPTURED', time: 'Sep 30, 2025, 13:32:01' },
    { state: 'KYC_VALIDATION_SUCCESS', time: 'Sep 30, 2025, 13:37:01' },
    { state: 'LENDER_BRE_APPROVE_SUCCESS', time: 'Oct 14, 2025, 20:58:15' },
    { state: 'MANDATE_SUCCESS', time: 'Oct 14, 2025, 21:02:55' },
    { state: 'ESIGN_SUCCESS', time: 'Oct 14, 2025, 21:07:38' },
    { state: 'LMS_ACCOUNT_ACTIVATION_SUCCESS', time: 'Oct 14, 2025, 21:07:46' },
    { state: 'LEAD_SUCCESSFULLY_CLOSED', time: 'Oct 14, 2025, 21:07:54' },
  ],
};

const KeyValueCard = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, string>;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">{title}</h3>
    <dl className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-wrap justify-between gap-x-3 gap-y-0">
          <dt className="text-xs text-gray-500">{key}</dt>
          <dd className="min-w-0 text-right text-sm font-medium text-gray-900 break-words">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const Customer360 = () => {
  const { paytmLan: paytmLanParam } = useParams<{ paytmLan?: string }>();
  const [searchInput, setSearchInput] = useState('');
  const [resolvedLan, setResolvedLan] = useState<string | null>(null);

  useEffect(() => {
    if (paytmLanParam) {
      const decoded = decodeURIComponent(paytmLanParam);
      setSearchInput(decoded);
      setResolvedLan(decoded);
    } else {
      setSearchInput('');
      setResolvedLan(null);
    }
  }, [paytmLanParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) setResolvedLan(trimmed);
  };

  const showProfile = !!resolvedLan;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer 360</h1>
        <div className="flex gap-2">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Block Account
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Export Ledger
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="customer-360-lan" className="mb-2 block text-sm font-semibold text-gray-700">
          Search by Paytm LAN (Loan Account Number)
        </label>
        <div className="flex gap-2">
          <input
            id="customer-360-lan"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="e.g. PTM_LN_2025_771001"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Load Profile
          </button>
        </div>
        {paytmLanParam && (
          <p className="mt-2 text-xs text-gray-500">
            Opened with LAN from link: {decodeURIComponent(paytmLanParam)}
          </p>
        )}
      </form>

      {!showProfile && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <p className="text-gray-600">Enter a Paytm LAN above and click Load Profile to view the customer 360 view.</p>
        </div>
      )}

      {showProfile && (
        <>
          <div className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-2xl font-bold md:text-3xl">Rahul Sharma</h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold">ACTIVE</span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                  VKYC: DONE
                </span>
              </div>
            </div>
            <div className="mt-4 border-t border-white/20 pt-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 md:grid-cols-4">
                <div>
                  <div className="text-sm text-blue-200">Mobile</div>
                  <div className="text-base font-semibold text-white">+91 98765 43210</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Paytm ID</div>
                  <div className="text-base font-semibold text-white">PTM_8372649201</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">LAN</div>
                  <div className="text-base font-semibold text-white break-all">{resolvedLan}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Partner</div>
                  <div className="text-base font-semibold text-white">Aditya Birla Finance</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Sanctioned Limit</div>
                  <div className="text-base font-semibold text-white">₹60,000</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Available Limit</div>
                  <div className="text-base font-semibold text-white">₹41,550</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">Current DPD</div>
                  <div className="text-base font-semibold text-white">0</div>
                </div>
                <div>
                  <div className="text-sm text-blue-200">DPD Date</div>
                  <div className="text-base font-semibold text-white">N/A</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">Feb 2026 Bill details</h2>
            <div className="mb-1 text-sm text-gray-500">Total Outstanding</div>
            <div className="mb-6 text-4xl font-bold text-red-600">₹18,450</div>

            <div className="space-y-0 divide-y divide-gray-200">
              <div className="flex items-center justify-between py-3">
                <div className="font-medium text-gray-900">Principal Component</div>
                <div className="font-medium text-gray-900">₹15,000</div>
              </div>
              {[
                { label: 'Convenience Fee', amount: '₹450' },
                { label: 'Late Payment Fee', amount: '₹2,500' },
                { label: 'Bounce Charges', amount: '₹500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 pl-6">
                  <div className="text-sm text-gray-600">{item.label}</div>
                  <div className="text-sm text-gray-900">{item.amount}</div>
                </div>
              ))}
              <div className="flex items-center justify-between py-3">
                <div className="text-base font-bold text-gray-900">Total Due</div>
                <div className="text-lg font-bold text-gray-900">₹18,450</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Repayment Behavior Log</h2>
            <div className="space-y-4">
              {[
                { amount: '₹5,000', source: 'Manual App', reason: null, date: '2026-01-15', status: 'Success' },
                { amount: '₹10,000', source: 'Auto Debit', reason: 'Insufficient Funds', date: '2026-01-07', status: 'Failed' },
                { amount: '₹8,200', source: 'UPI AutoPay', reason: null, date: '2025-12-15', status: 'Success' },
                { amount: '₹8,200', source: 'Auto Debit', reason: 'Bank Server Down', date: '2025-12-03', status: 'Failed' },
                { amount: '₹6,500', source: 'Manual App', reason: null, date: '2025-11-14', status: 'Success' },
              ].map((entry) => (
                <div
                  key={entry.date + entry.amount}
                  className={`flex items-start gap-4 rounded-lg border p-4 ${
                    entry.status === 'Failed' ? 'border-red-100 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div
                    className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                      entry.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {entry.status === 'Success' ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">{entry.amount}</div>
                    <div className="text-sm text-gray-600">Source: {entry.source}</div>
                    {entry.reason && (
                      <div className="mt-0.5 text-sm text-red-600">Reason: {entry.reason}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{entry.date}</div>
                    <span
                      className={`mt-1 inline-block rounded px-2 py-1 text-xs font-semibold ${
                        entry.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer data grid: 10 categories */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <KeyValueCard
                title="Customer Profile"
                data={{
                  ...CUSTOMER_360_DATA.customerDetails,
                  ...CUSTOMER_360_DATA.addressDetails,
                }}
              />
              <KeyValueCard
                title="Account & Loan Details"
                data={{
                  ...CUSTOMER_360_DATA.lmsAccount,
                  ...CUSTOMER_360_DATA.offers,
                }}
              />
              <KeyValueCard
                title="Bureau & KYC"
                data={{
                  ...CUSTOMER_360_DATA.bureauDetails,
                  ...CUSTOMER_360_DATA.kycDetails,
                }}
              />
              <KeyValueCard
                title="Mandate & Consents"
                data={{
                  ...CUSTOMER_360_DATA.mandateDetails,
                  ...CUSTOMER_360_DATA.consents,
                }}
              />
              <KeyValueCard title="Lead Meta Data" data={CUSTOMER_360_DATA.leadDetails} />
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Onboarding Journey
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div
                    className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"
                    aria-hidden
                  />
                  <ul className="space-y-0">
                    {CUSTOMER_360_DATA.leadTimeline.map((step, idx) => {
                      const isSuccess = step.state.includes('SUCCESS');
                      return (
                        <li key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                          <div
                            className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                              isSuccess
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isSuccess && (
                              <svg
                                className="h-3.5 w-3.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {step.state}
                            </div>
                            <div className="text-xs text-gray-500">{step.time}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Customer360;
