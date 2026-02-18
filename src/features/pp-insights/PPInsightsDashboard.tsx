import { useState } from 'react';
import styled from 'styled-components';
import { FUNNEL_STAGES, NAV_ITEMS } from './constants';
import PPInsightsSidebar from './components/PPInsightsSidebar';
import ReconciliationModal from './components/ReconciliationModal';
import PPInsightsThemeBridge from './PPInsightsThemeBridge';
import type { DashboardViewId, ReconType } from './types';

const PageShell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.glass.background};
`;

const ContentPane = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentInner = styled.div`
  margin: 0 auto;
  max-width: 1600px;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PPInsightsDashboard = () => {
  const [activeView, setActiveView] = useState<DashboardViewId>('cockpit');
  const [expandedFunnelStage, setExpandedFunnelStage] = useState<string | null>(null);
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reconComments, setReconComments] = useState('');
  const [selectedReconType, setSelectedReconType] = useState<ReconType>('auto');
  const [selectedReconItems, setSelectedReconItems] = useState<string[]>([]);


  const toggleFunnelStage = (stageId: string) => {
    setExpandedFunnelStage(expandedFunnelStage === stageId ? null : stageId);
  };

  const changeView = (viewId: DashboardViewId) => {
    setActiveView(viewId);
    setExpandedFunnelStage(null);
  };

  const openReconciliationModal = () => {
    setShowReconciliationModal(true);
  };

  const closeReconciliationModal = () => {
    setShowReconciliationModal(false);
    setReconComments('');
    setSelectedReconItems([]);
    setSelectedReconType('auto');
  };

  const processReconciliation = () => {
    if (selectedReconItems.length === 0) {
      alert('Please select at least one item to reconcile');
      return;
    }
    alert(
      `Reconciliation initiated!\n\nType: ${selectedReconType}\nItems: ${selectedReconItems.length}\nComments: ${
        reconComments ? 'Yes' : 'No'
      }`,
    );
    closeReconciliationModal();
  };

  const toggleReconItem = (item: string) => {
    setSelectedReconItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const ExecutiveCockpit = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Executive Cockpit</h1>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total AUM', value: '₹2,847 Cr', change: '+5.2%', positive: true },
          { label: "Today's Disbursements", value: '₹45.2 Cr', change: '+12%', positive: true },
          { label: "Today's Collections", value: '₹38.7 Cr', change: '-8%', positive: false, target: 'Target: ₹42 Cr' },
          { label: 'Active Users', value: '2.4M', change: '+3.1%', positive: true },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:scale-105"
          >
            <div className="mb-2 text-sm text-gray-600">{metric.label}</div>
            <div className="mb-1 text-3xl font-bold text-gray-900">{metric.value}</div>
            {metric.target && <div className="mb-2 text-xs text-gray-500">{metric.target}</div>}
            <div
              className={`flex items-center gap-1 text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={metric.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
                />
              </svg>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">P&L Pulse - January 2026</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <div className="mb-1 text-sm text-gray-600">Estimated Net Revenue</div>
            <div className="text-3xl font-bold text-blue-600">₹12.4 Cr</div>
            <div className="mt-1 text-sm text-green-600">↑ 18% vs Last Month</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">Gross Yield</div>
            <div className="text-2xl font-bold text-gray-900">8.4%</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">Cost of Risk</div>
            <div className="text-2xl font-bold text-gray-900">2.1%</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
          <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Critical Alerts
        </h2>
        <div className="space-y-3">
          {[
            { text: 'Partner B API response time >5s', time: '2m ago', severity: 'red' },
            { text: 'Auto-debit success rate dropped 3% vs yesterday', time: '15m ago', severity: 'yellow' },
          ].map((alert, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-lg border border-${alert.severity}-200 bg-${alert.severity}-50 p-4`}
            >
              <svg className={`mt-0.5 h-5 w-5 text-${alert.severity}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{alert.text}</div>
                <div className="mt-1 text-sm text-gray-500">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AcquisitionFunnel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Acquisition & Funnel Analytics</h1>
          <p className="mt-1 text-gray-600">Two-layer funnel with drill-down failure analysis</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">Filter by Partner</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Export Report</button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">L1: Macro Journey View (Click to expand L2)</h2>
        <div className="space-y-3">
          {FUNNEL_STAGES.map((stage, idx) => (
            <div key={stage.id}>
              <div
                onClick={() => toggleFunnelStage(stage.id)}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors hover:bg-gray-50 ${
                  expandedFunnelStage === stage.id ? `border-${stage.color}-400 bg-${stage.color}-50` : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full bg-${stage.color}-500`} />
                        <span className="font-semibold text-gray-900">{stage.name}</span>
                        <svg
                          className={`h-5 w-5 text-gray-400 transition-transform ${expandedFunnelStage === stage.id ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">{stage.count.toLocaleString()}</span>
                        {idx > 0 && <span className="ml-3 text-sm text-red-600">↓ {stage.dropoff}% drop</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div className={`h-full bg-${stage.color}-500 transition-all duration-500`} style={{ width: `${stage.percentage}%` }} />
                      </div>
                      <span className="w-16 text-right text-sm font-semibold text-gray-700">{stage.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {expandedFunnelStage === stage.id && (
                <div
                  className={`ml-8 mt-3 space-y-2 rounded-lg border-l-4 border-${stage.color}-500 bg-gray-50 p-4 animate-fade-in`}
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    L2: Micro Stages & Drop-off Analysis
                  </div>
                  {stage.l2Stages.map((substage, subIdx) => (
                    <div
                      key={subIdx}
                      className="rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 font-medium text-gray-900">
                            <span
                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-${stage.color}-100 text-xs font-bold text-${stage.color}-700`}
                            >
                              {subIdx + 1}
                            </span>
                            {substage.name}
                          </div>
                          {substage.failReasons.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <div className="text-xs font-semibold text-red-600">Top Failure Reasons:</div>
                              {substage.failReasons.map((reason, rIdx) => (
                                <div key={rIdx} className="ml-2 flex items-center gap-1 text-xs text-gray-600">
                                  <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-lg font-bold text-gray-900">{substage.count.toLocaleString()}</div>
                          {substage.dropRate > 0 ? (
                            <div className="mt-1 flex items-center justify-end gap-1 text-sm font-medium text-red-600">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                              {substage.dropRate}%
                            </div>
                          ) : (
                            <div className="mt-1 text-sm font-medium text-green-600">✓ No drop</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-900">
              <span className="font-semibold">Tip:</span> Click on any L1 stage above to expand and view detailed L2
              micro-stages with failure reasons and drop-off rates.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Today's Top Drop-off Points</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: 'Highest Drop Stage',
              value: 'BRE1 Execution',
              metric: '19.2% rejection',
              detail: 'Primary: Credit Score < 650',
              color: 'red',
            },
            {
              title: 'Critical API Failure',
              value: 'Lender Face Similarity',
              metric: '3.4% failure',
              detail: 'Issue: API Timeout spikes',
              color: 'orange',
            },
            {
              title: 'User Abandonment Peak',
              value: 'Offer Acceptance',
              metric: '10.5% drop',
              detail: 'Reason: Limit perceived as low',
              color: 'yellow',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg border-2 border-${item.color}-300 bg-white p-4 transition-transform hover:scale-105`}
            >
              <div className="mb-1 text-sm text-gray-600">{item.title}</div>
              <div className={`text-lg font-bold text-${item.color}-600`}>{item.value}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{item.metric}</div>
              <div className="mt-2 text-xs text-gray-500">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PortfolioManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management (LMS)</h1>
          <p className="mt-1 text-gray-600">Health monitoring of active lending base</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm text-gray-600">Active LANs</div>
          <div className="text-3xl font-bold text-green-600">2,400,000</div>
          <div className="mt-1 text-sm text-gray-500">84.2% of total</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm text-gray-600">Deactivated LANs</div>
          <div className="text-3xl font-bold text-red-600">450,000</div>
          <div className="mt-1 text-sm text-gray-500">15.8% of total</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 text-sm text-gray-600">Total Created (Lifetime)</div>
          <div className="text-3xl font-bold text-gray-900">2,850,000</div>
          <div className="mt-1 text-sm text-green-600">↑ 135K this month</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Cohort Performance (Vintage Analysis)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cohort Month</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Created</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Active</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">DPD 30+</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">NPA</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">NPA %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  month: 'Jan 2026',
                  created: '135,000',
                  active: '128,000',
                  dpd: '4,200',
                  npa: '675',
                  npaPercent: '0.50%',
                  color: 'green',
                },
                {
                  month: 'Dec 2025',
                  created: '142,000',
                  active: '132,000',
                  dpd: '5,680',
                  npa: '1,420',
                  npaPercent: '1.00%',
                  color: 'green',
                },
                {
                  month: 'Nov 2025',
                  created: '138,000',
                  active: '125,000',
                  dpd: '6,900',
                  npa: '2,760',
                  npaPercent: '2.00%',
                  color: 'yellow',
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.month}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900">{row.created}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-green-600">{row.active}</td>
                  <td className="px-4 py-3 text-right text-sm text-yellow-600">{row.dpd}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-red-600">{row.npa}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span className={`rounded-full bg-${row.color}-100 px-2 py-1 text-xs font-medium text-${row.color}-700`}>
                      {row.npaPercent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CollectionsWarRoom = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Collections War Room</h1>
        <div className="text-sm text-gray-500">Real-time Data</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Auto-Debit Waterfall (Today)</h2>
        <div className="space-y-4">
          {[
            { label: 'Total Mandates Triggered', value: '100,000', width: 100, color: 'blue', note: '' },
            { label: 'Technical Bounces (Bank Issues)', value: '5,000', width: 5, color: 'yellow', note: '→ Retry Queue' },
            {
              label: 'Fund Bounces (Insufficient Balance)',
              value: '15,000',
              width: 15,
              color: 'orange',
              note: '→ Move to Path C',
            },
            { label: 'Successful Collections', value: '80,000', width: 80, color: 'green', note: '' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div className={`font-medium ${item.color === 'green' ? 'text-green-700' : 'text-gray-700'}`}>{item.label}</div>
                  <div className="flex items-center gap-4">
                    {item.note && <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{item.note}</span>}
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full bg-${item.color}-500 transition-all duration-500`} style={{ width: `${item.width}%` }} />
                  </div>
                  <span className="w-12 text-right text-sm text-gray-600">{item.width}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Portfolio Buckets</h2>
        <div className="space-y-4">
          {[
            { bucket: 'Standard (DPD 0)', amount: '₹1,200 Cr', accounts: '180,000', percentage: 75, color: 'green' },
            { bucket: 'SMA-1 (1-30 DPD)', amount: '₹280 Cr', accounts: '35,000', percentage: 14.6, color: 'yellow' },
            { bucket: 'NPA (61+ DPD)', amount: '₹117 Cr', accounts: '10,000', percentage: 4.15, color: 'red' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-semibold text-gray-900">{item.bucket}</div>
                <div className="text-2xl font-bold text-gray-900">{item.amount}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full bg-${item.color}-500 transition-all duration-500`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
                <div className="w-32 text-sm text-gray-600">{item.accounts} accounts</div>
                <div className="w-16 text-right text-sm font-semibold text-gray-900">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RiskAssetQuality = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk & Asset Quality</h1>
          <p className="mt-1 text-gray-600">Early Warning System & Portfolio Health Monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          {
            label: 'Portfolio NPA %',
            value: '4.15%',
            target: 'Target: <3.5%',
            change: '+0.3% vs Last Month',
            color: 'red',
          },
          {
            label: '30+ DPD %',
            value: '8.7%',
            target: 'Industry Avg: 7.5%',
            change: '+0.5%',
            color: 'orange',
          },
          {
            label: 'Write-off Amount (MTD)',
            value: '₹2.8 Cr',
            target: 'Last Month: ₹2.4 Cr',
            change: '+16.7%',
            color: 'gray',
          },
          {
            label: 'Credit Cost (Annualized)',
            value: '2.1%',
            target: 'Budget: 2.5%',
            change: 'Within Target',
            color: 'blue',
            positive: true,
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:scale-105"
          >
            <div className="mb-2 text-sm text-gray-600">{metric.label}</div>
            <div className={`mb-1 text-3xl font-bold text-${metric.color}-600`}>{metric.value}</div>
            <div className="mb-2 text-xs text-gray-500">{metric.target}</div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${metric.positive ? 'text-green-600' : `text-${metric.color}-600`}`}
            >
              {!metric.positive && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Vintage Analysis (Static Pool Method)</h2>
        <p className="mb-4 text-sm text-gray-600">Tracking cohort performance to identify early deterioration signals</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Cohort</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Book Size</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M0</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M1</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M2</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M3</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M6</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">M12</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  month: 'Jan 2026',
                  size: '135,000',
                  m0: '0.5%',
                  m1: '-',
                  m2: '-',
                  m3: '-',
                  m6: '-',
                  m12: '-',
                  status: 'New',
                  color: 'blue',
                  bg: '',
                },
                {
                  month: 'Dec 2025',
                  size: '142,000',
                  m0: '0.6%',
                  m1: '0.9%',
                  m2: '-',
                  m3: '-',
                  m6: '-',
                  m12: '-',
                  status: 'Stable',
                  color: 'green',
                  bg: '',
                },
                {
                  month: 'Nov 2025',
                  size: '138,000',
                  m0: '0.7%',
                  m1: '1.0%',
                  m2: '1.4%',
                  m3: '2.0%',
                  m6: '-',
                  m12: '-',
                  status: 'Good',
                  color: 'green',
                  bg: '',
                },
                {
                  month: 'Oct 2025',
                  size: '145,000',
                  m0: '0.8%',
                  m1: '1.2%',
                  m2: '1.8%',
                  m3: '2.5%',
                  m6: '3.8%',
                  m12: '-',
                  status: 'Watch',
                  color: 'yellow',
                  bg: 'bg-yellow-50',
                },
                {
                  month: 'Sep 2025',
                  size: '132,000',
                  m0: '0.5%',
                  m1: '0.8%',
                  m2: '1.2%',
                  m3: '1.8%',
                  m6: '2.6%',
                  m12: '3.4%',
                  status: 'Good',
                  color: 'green',
                  bg: '',
                },
                {
                  month: 'Aug 2025',
                  size: '128,000',
                  m0: '1.2%',
                  m1: '1.8%',
                  m2: '2.6%',
                  m3: '3.5%',
                  m6: '5.2%',
                  m12: '6.8%',
                  status: 'Alert',
                  color: 'red',
                  bg: 'bg-red-50',
                },
              ].map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-50 ${row.bg}`}>
                  <td className="px-4 py-3 font-medium">{row.month}</td>
                  <td className="px-4 py-3 text-right">{row.size}</td>
                  <td className="px-4 py-3 text-right">{row.m0}</td>
                  <td className="px-4 py-3 text-right">{row.m1}</td>
                  <td className="px-4 py-3 text-right">{row.m2}</td>
                  <td className="px-4 py-3 text-right">{row.m3}</td>
                  <td className="px-4 py-3 text-right">{row.m6}</td>
                  <td className="px-4 py-3 text-right">{row.m12}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded bg-${row.color}-100 px-2 py-1 text-xs text-${row.color}-700`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Flow Rate Analysis (Early Warning)</h2>
        <p className="mb-6 text-sm text-gray-600">Monthly bucket movement tracking</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              stage: 1,
              label: 'Current → DPD 1-30',
              rate: '8.2%',
              desc: 'Monthly flow rate',
              note: '✓ Within acceptable range (7-10%)',
              color: 'green',
            },
            {
              stage: 2,
              label: 'DPD 1-30 → DPD 31-60',
              rate: '35.4%',
              desc: 'Escalation rate',
              note: '⚠ Slightly elevated (Target: <30%)',
              color: 'yellow',
            },
            {
              stage: 3,
              label: 'DPD 31-60 → DPD 61+',
              rate: '52.1%',
              desc: 'NPA flow rate',
              note: '🔴 Critical (Target: <45%)',
              color: 'red',
            },
          ].map((item) => (
            <div
              key={item.stage}
              className={`rounded-lg border-2 border-${item.color}-${item.color === 'green' ? '200' : '300'} bg-gradient-to-br from-${item.color}-50 to-${
                item.color === 'green' ? 'emerald' : item.color === 'yellow' ? 'orange' : 'pink'
              }-50 p-6`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-${item.color}-500 font-bold text-white`}>
                  {item.stage}
                </div>
                <div className="text-sm font-semibold text-gray-700">Stage {item.stage}</div>
              </div>
              <div className="mb-2 text-sm text-gray-600">{item.label}</div>
              <div className={`mb-2 text-4xl font-bold text-${item.color}-600`}>{item.rate}</div>
              <div className="mb-3 text-xs text-gray-500">{item.desc}</div>
              <div className="text-xs text-gray-600">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Fraud Watch & FPD Analysis</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-700">First Payment Default</h3>
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-6">
              <div className="mb-1 text-sm text-gray-600">FPD Rate (This Month)</div>
              <div className="text-4xl font-bold text-red-600">4.2%</div>
              <div className="mt-2 text-xs text-gray-500">Target: &lt;3.5%</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-700">Velocity Checks</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Identity Theft Flags', value: '23 cases', color: 'red' },
                { label: 'Multiple Apps (Same Device)', value: '87 cases', color: 'orange' },
                { label: 'Suspicious Location Changes', value: '45 cases', color: 'yellow' },
              ].map((check, idx) => (
                <div key={idx} className={`flex justify-between rounded border border-${check.color}-200 bg-${check.color}-50 p-3`}>
                  <span className="text-gray-700">{check.label}</span>
                  <span className={`font-semibold text-${check.color}-600`}>{check.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FinanceRecon = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance & Reconciliation</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Bill Cycle:</span>
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>Nov Cycle</option>
              <option>Dec Cycle</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Lender:</span>
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
              <option>All Lenders</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-gray-900">Recovery Pulse & Fee Integrity</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-700">Collection Efficiency Funnel</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Billable', amount: '₹2.4M', width: 100, color: 'blue' },
                { label: 'Paid in Grace (0-7 Days)', amount: '₹1.8M', width: 75, color: 'green' },
                { label: 'Paid via Mandate (Day 3+)', amount: '₹450K', width: 18.75, color: 'purple' },
                { label: 'Overdue', amount: '₹150K', width: 6.25, color: 'red' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span
                      className={`text-lg font-bold text-${
                        item.color === 'green' ? 'green' : item.color === 'purple' ? 'purple' : item.color === 'red' ? 'red' : 'gray'
                      }-600`}
                    >
                      {item.amount}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full bg-${item.color}-500`} style={{ width: `${item.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-700">Fee Recon Breakdown</h3>
            <div className="space-y-4">
              {[
                { fee: 'Convenience Fee', system: '₹45,000', billed: '₹45,000', status: 'Matched', color: 'green' },
                { fee: 'Late Payment Fee', system: '₹28,000', billed: '₹31,000', status: 'Mismatch', color: 'red' },
                { fee: 'Bounce Charges', system: '₹15,000', billed: '₹15,000', status: 'Matched', color: 'green' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.fee}</span>
                    <span className={`rounded bg-${item.color}-100 px-2 py-1 text-xs font-semibold text-${item.color}-700`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="mb-1 text-gray-500">System: {item.system}</div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-gray-500">Billed: {item.billed}</div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div className={`h-full bg-${item.color}-500`} style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-700">Delta Indicators</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-red-600">₹85,420</div>
                <div className="mb-2 text-sm text-gray-700">Unreconciled Principal</div>
                <div className="flex items-center justify-center gap-1 text-xs text-red-600">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+12% from last cycle</span>
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-orange-600">₹12,340</div>
                <div className="mb-2 text-sm text-gray-700">Fee Variance</div>
                <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>-5% from last cycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-gray-900">Lender vs. System Reconciliation</h2>
        <div className="rounded-lg bg-gray-50 p-6">
          <h3 className="mb-1 text-base font-semibold text-gray-900">Ledger Comparison</h3>
          <p className="mb-4 text-sm text-gray-600">Comparing internal system records with lender statements</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Metric</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Our System</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Lender Statement</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">Delta</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  {
                    metric: 'Total Disbursed (Principal)',
                    system: '₹2,450,000',
                    lender: '₹2,450,000',
                    delta: '₹0',
                    status: 'Matched',
                    color: 'green',
                    bg: '',
                  },
                  {
                    metric: 'Total Repaid (Principal)',
                    system: '₹1,875,000',
                    lender: '₹1,890,000',
                    delta: '-₹15,000',
                    status: 'Mismatch',
                    color: 'red',
                    bg: 'bg-red-50',
                  },
                  {
                    metric: 'Outstanding Principal',
                    system: '₹575,000',
                    lender: '₹560,000',
                    delta: '+₹15,000',
                    status: 'Mismatch',
                    color: 'red',
                    bg: 'bg-red-50',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className={`hover:bg-gray-50 ${row.bg}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.metric}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-900">{row.system}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-900">{row.lender}</td>
                    <td className={`px-4 py-3 text-right text-sm font-semibold text-${row.color}-600`}>{row.delta}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`rounded bg-${row.color}-100 px-2 py-1 text-xs font-medium text-${row.color}-700`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
            <div>
              <span className="text-sm text-gray-700">Total Variance: </span>
              <span className="text-lg font-bold text-red-600">₹32,500</span>
              <span className="ml-3 text-sm font-medium text-red-600">3 mismatches detected</span>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Export Report
              </button>
              <button
                onClick={openReconciliationModal}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Reconcile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Customer360 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer 360</h1>
        <div className="flex gap-2">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Block Account</button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">Export Ledger</button>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Rahul Sharma</h2>
            <div className="space-y-1 text-cyan-50">
              <div>Mobile: +91 98765 43210</div>
              <div>Paytm ID: PTM_8372649201</div>
              <div>LAN: AB_LN_2024_847362</div>
              <div>Partner: Aditya Birla Finance</div>
            </div>
          </div>
          <div className="rounded-full bg-green-500 px-4 py-2 font-semibold">ACTIVE</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Financial Ledger</h2>
        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-600">Total Outstanding</div>
          <div className="text-4xl font-bold text-red-600">₹18,450</div>
        </div>
        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-700">Principal Component</div>
            <div className="text-gray-900">₹15,000</div>
          </div>
          <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
            {[
              { label: 'Convenience Fee', amount: '₹450' },
              { label: 'Late Payment Fee', amount: '₹2,500' },
              { label: 'Bounce Charges', amount: '₹500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="text-gray-700">{item.label}</div>
                <div className="text-gray-900">{item.amount}</div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-300 pt-3">
            <div className="flex items-center justify-between">
              <div className="font-bold">Total Due</div>
              <div className="text-lg font-bold">₹18,450</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  const SystemWatchtower = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Watchtower (NOC)</h1>
          <p className="mt-1 text-gray-600">Real-time technical health monitoring</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Real-Time API Health Monitor (Last 15 Minutes)</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Signzy PAN Validation', success: '98.5%', latency: '450ms', status: 'HEALTHY', color: 'green' },
            { name: 'Lender LAN Creation', success: '92.3%', latency: '1,800ms', status: 'CRITICAL', color: 'red' },
            { name: 'UIDAI E-KYC', success: '94.1%', latency: '2,800ms', status: 'WARNING', color: 'yellow' },
            { name: 'Bureau Soft Pull', success: '99.1%', latency: '800ms', status: 'HEALTHY', color: 'green' },
          ].map((api, idx) => (
            <div key={idx} className={`rounded-lg border-2 border-${api.color}-300 bg-${api.color}-50 p-4`}>
              <div className="mb-2 flex items-center justify-between">
                <div className={`h-3 w-3 rounded-full bg-${api.color}-500`} />
                <span className={`text-xs font-bold text-${api.color}-700`}>{api.status}</span>
              </div>
              <div className="mb-3 text-sm font-medium text-gray-900">{api.name}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Success Rate</span>
                  <span className={`font-bold text-${api.color}-600`}>{api.success}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Avg Latency</span>
                  <span className="font-medium text-gray-900">{api.latency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">BRE Version Control & Policy Impact</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-purple-50 p-4">
            <div className="mb-1 text-sm text-gray-600">Current Version</div>
            <div className="text-2xl font-bold text-purple-600">v4.2.8</div>
            <div className="mt-1 text-xs text-gray-500">Deployed: 2026-01-25</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="mb-1 text-sm text-gray-600">Current Approval Rate</div>
            <div className="text-2xl font-bold text-blue-600">78.5%</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-1 text-sm text-gray-600">Previous Rate</div>
            <div className="text-2xl font-bold text-gray-700">80.2%</div>
          </div>
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="mb-1 text-sm text-gray-600">Change Impact</div>
            <div className="text-3xl font-bold text-red-600">-1.7%</div>
            <div className="mt-2 text-xs font-medium text-red-600">⚠ Significant drop detected</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'cockpit':
        return <ExecutiveCockpit />;
      case 'acquisition':
        return <AcquisitionFunnel />;
      case 'portfolio':
        return <PortfolioManagement />;
      case 'collections':
        return <CollectionsWarRoom />;
      case 'risk':
        return <RiskAssetQuality />;
      case 'finance':
        return <FinanceRecon />;
      case 'customer360':
        return <Customer360 />;
      case 'watchtower':
        return <SystemWatchtower />;
      default:
        return <div>Module coming soon...</div>;
    }
  };

  return (
    <PageShell className="pp-insights">
      <PPInsightsThemeBridge />
      <PPInsightsSidebar
        navItems={NAV_ITEMS}
        activeView={activeView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewChange={changeView}
      />

      <ContentPane>
        <ContentInner>{renderContent()}</ContentInner>
      </ContentPane>

      <ReconciliationModal
        isOpen={showReconciliationModal}
        selectedReconType={selectedReconType}
        selectedReconItems={selectedReconItems}
        reconComments={reconComments}
        onClose={closeReconciliationModal}
        onProcess={processReconciliation}
        onTypeChange={setSelectedReconType}
        onToggleItem={toggleReconItem}
        onCommentsChange={setReconComments}
      />
    </PageShell>
  );
};

export default PPInsightsDashboard;
