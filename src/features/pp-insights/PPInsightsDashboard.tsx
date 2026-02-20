import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FUNNEL_STAGES, NAV_ITEMS } from './constants';
import PPInsightsSidebar from './components/PPInsightsSidebar';
import ReconciliationModal from './components/ReconciliationModal';
import BillGenRecon from './components/BillGenRecon';
import BillGenDeltaDetails from './components/BillGenDeltaDetails';
import DailyDuesDeltaDetails from './components/DailyDuesDeltaDetails';
import MomDeltaDetails from './components/MomDeltaDetails';
import RepaymentDeltaDetails from './components/RepaymentDeltaDetails';
import RepaymentDrillDown from './components/RepaymentDrillDown';
import MOMLenderBilling from './components/MOMLenderBilling';
import DailyDuesRecon from './components/DailyDuesRecon';
import RepaymentSnapshot from './components/RepaymentSnapshot';
import DPDRecon from './components/DPDRecon';
import PortfolioMaster from './components/PortfolioMaster';
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
  const location = useLocation();
  const [activeView, setActiveView] = useState<DashboardViewId>(() => {
    const state = (location.state as { activeView?: DashboardViewId } | null) ?? {};
    return state.activeView === 'finance' ? 'finance' : 'cockpit';
  });
  const [expandedFunnelStage, setExpandedFunnelStage] = useState<string | null>(null);
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reconComments, setReconComments] = useState('');
  const [selectedReconType, setSelectedReconType] = useState<ReconType>('auto');
  const [selectedReconItems, setSelectedReconItems] = useState<string[]>([]);
  const [financeTab, setFinanceTab] = useState<'overview' | 'billgen' | 'mom' | 'daily' | 'repayment'>(() => {
    const state = (location.state as { financeTab?: 'repayment' } | null) ?? {};
    return state.financeTab === 'repayment' ? 'repayment' : 'overview';
  });

  useEffect(() => {
    const state = (location.state as { activeView?: DashboardViewId; financeTab?: typeof financeTab } | null) ?? {};
    if (state.activeView === 'finance') setActiveView('finance');
    if (state.financeTab === 'repayment') setFinanceTab('repayment');
  }, [location.pathname, location.state]);

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

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Today's Repayment Flow</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              path: 'Path A',
              label: 'Auto-Debit',
              amount: '₹28.2 Cr',
              txns: '52,400 transactions',
              bg: 'bg-blue-50',
              border: 'border-blue-200',
              pathBg: 'bg-blue-600',
              amountColor: 'text-blue-700',
            },
            {
              path: 'Path B',
              label: 'Manual App Payment',
              amount: '₹7.5 Cr',
              txns: '8,200 transactions',
              bg: 'bg-green-50',
              border: 'border-green-200',
              pathBg: 'bg-green-600',
              amountColor: 'text-green-700',
            },
            {
              path: 'Path C',
              label: 'Collection Links',
              amount: '₹3.0 Cr',
              txns: '4,100 transactions',
              bg: 'bg-yellow-50',
              border: 'border-yellow-200',
              pathBg: 'bg-yellow-500',
              amountColor: 'text-yellow-700',
            },
          ].map((flow) => (
            <div key={flow.path} className={`rounded-xl border ${flow.border} ${flow.bg} p-5`}>
              <span className={`inline-block rounded px-2 py-1 text-xs font-bold text-white ${flow.pathBg}`}>
                {flow.path}
              </span>
              <div className="mt-2 text-base font-bold text-gray-900">{flow.label}</div>
              <div className={`mt-1 text-2xl font-bold ${flow.amountColor}`}>{flow.amount}</div>
              <div className="mt-1 text-xs text-gray-500">{flow.txns}</div>
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

  const FinanceRecon = () => {
    const ledgerVarianceRows = [
      {
        metric: 'Principal Repaid',
        ourSystem: '₹1,875,000',
        lenderBook: '₹1,890,000',
        variance: '-₹15,000',
        status: 'Mismatch',
        owner: 'Finance Ops',
      },
      {
        metric: 'Late Fee Collection',
        ourSystem: '₹28,000',
        lenderBook: '₹31,000',
        variance: '-₹3,000',
        status: 'Mismatch',
        owner: 'Partner Team',
      },
      {
        metric: 'Bounce Charges',
        ourSystem: '₹15,000',
        lenderBook: '₹15,000',
        variance: '₹0',
        status: 'Matched',
        owner: 'System',
      },
      {
        metric: 'GST Allocation',
        ourSystem: '₹12,430',
        lenderBook: '₹12,220',
        variance: '+₹210',
        status: 'Review',
        owner: 'Tax Desk',
      },
    ];

    const FINANCE_TABS: { id: typeof financeTab; label: string }[] = [
      { id: 'overview', label: 'Overview' },
      { id: 'billgen', label: 'Bill Gen Recon' },
      { id: 'mom', label: 'MOM Lender Billing' },
      { id: 'daily', label: 'Daily Dues Recon' },
      { id: 'repayment', label: 'Repayment Snapshot' },
    ];

    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance & Reconciliation</h1>
          <p className="mt-1 text-sm text-gray-600">Recovery Yield & Fee Integrity</p>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-gray-200">
          {FINANCE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFinanceTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors ${
                financeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {financeTab === 'billgen' && <BillGenRecon />}
        {financeTab === 'mom' && <MOMLenderBilling />}
        {financeTab === 'daily' && <DailyDuesRecon />}
        {financeTab === 'repayment' && <RepaymentSnapshot />}

        {financeTab === 'overview' && <>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Collection Efficiency Funnel</h3>
            <div className="space-y-3">
              {[
                { label: 'Total Billable', value: '₹2.4M', width: 100, bar: 'bg-blue-500' },
                { label: 'Paid in Grace', value: '₹1.8M', width: 75, bar: 'bg-green-500' },
                { label: 'Paid via Mandate', value: '₹450K', width: 18.75, bar: 'bg-blue-500' },
                { label: 'Overdue', value: '₹150K', width: 6.25, bar: 'bg-red-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full ${item.bar}`} style={{ width: `${item.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Recovery Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Mandate Success', value: '72.1%', bar: 72.1, tone: 'text-green-600' },
                { label: 'Manual Collection', value: '18.4%', bar: 18.4, tone: 'text-blue-600' },
                { label: 'Failed & Pending', value: '9.5%', bar: 9.5, tone: 'text-red-600' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600">{item.label}</span>
                    <span className={`font-semibold ${item.tone}`}>{item.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-blue-500" style={{ width: `${item.bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Delta Indicators</h3>
            <div className="space-y-4 text-center">
              <div>
                <div className="text-xs text-gray-500">New Variance</div>
                <div className="text-3xl font-bold text-red-600">₹85,420</div>
                <div className="text-xs text-red-600">+12% from last cycle</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Fee Difference</div>
                <div className="text-2xl font-bold text-orange-600">₹12,340</div>
                <div className="text-xs text-green-600">-5% from last cycle</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Active Escalations & Deltas</h3>
          <p className="mb-4 text-xs text-gray-500">Total value of discrepancies across Finance & Recon. Click a row to open the drill-down.</p>
          <div className="space-y-2">
            <Link
              to="/pp-insights/bill-delta-details/Principal"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors hover:bg-blue-50 hover:border-blue-200"
            >
              <span className="text-sm font-medium text-gray-900">Billing Deltas</span>
              <span className="text-sm font-bold text-red-600">₹22,707</span>
            </Link>
            <Link
              to="/pp-insights/daily-dues-delta/Feb-2026%20Bill%20Cycle%20(T-1)"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors hover:bg-blue-50 hover:border-blue-200"
            >
              <span className="text-sm font-medium text-gray-900">Daily Dues Deltas</span>
              <span className="text-sm font-bold text-red-600">₹5,200</span>
            </Link>
            <Link
              to="/pp-insights/mom-delta/Feb-2026"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors hover:bg-blue-50 hover:border-blue-200"
            >
              <span className="text-sm font-medium text-gray-900">MOM Billing Variance</span>
              <span className="text-sm font-bold text-red-600">₹22,707</span>
            </Link>
            <Link
              to="/pp-insights/repayment-delta"
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors hover:bg-blue-50 hover:border-blue-200"
            >
              <span className="text-sm font-medium text-gray-900">Repayment Settlement Deltas</span>
              <span className="text-sm font-bold text-red-600">47 records</span>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">L1 Ledger Variance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase text-gray-600">Metric</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Our System</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Lender Book</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Variance</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold uppercase text-gray-600">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase text-gray-600">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ledgerVarianceRows.map((row) => (
                  <tr key={row.metric} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">{row.metric}</td>
                    <td className="px-3 py-2 text-right text-sm text-gray-900">{row.ourSystem}</td>
                    <td className="px-3 py-2 text-right text-sm text-gray-900">{row.lenderBook}</td>
                    <td className={`px-3 py-2 text-right text-sm font-semibold ${row.variance.includes('-') ? 'text-red-600' : row.variance === '₹0' ? 'text-green-600' : 'text-yellow-700'}`}>
                      {row.variance}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          row.status === 'Matched'
                            ? 'bg-green-100 text-green-700'
                            : row.status === 'Mismatch'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700">{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Mandate Execution & Repayment Recon</h3>
            <div className="space-y-3">
              {[
                { day: 'D+0', triggered: '40,000', success: 76 },
                { day: 'D+1', triggered: '35,500', success: 68 },
                { day: 'D+2', triggered: '30,000', success: 61 },
                { day: 'D+3', triggered: '24,200', success: 54 },
                { day: 'D+4', triggered: '18,900', success: 49 },
                { day: 'D+5', triggered: '13,100', success: 44 },
              ].map((item) => (
                <div key={item.day}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-gray-500">Triggers: {item.triggered}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-blue-500" style={{ width: `${item.success}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 text-xs">
              <span className="font-semibold text-blue-600">72.1% recovery efficiency</span>
              <span className="font-semibold text-green-600">+2.2% vs last cycle</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Failure Leakage & Recovery Action</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase text-gray-600">Issue Bucket</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Count</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold uppercase text-gray-600">Recovery</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold uppercase text-gray-600">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { bucket: 'Insufficient Balance', count: 4532, recovery: '42%', severity: 'Medium' },
                    { bucket: 'Mandate Failure', count: 1298, recovery: '18%', severity: 'High' },
                    { bucket: 'Fraud/Chargeback', count: 214, recovery: '6%', severity: 'High' },
                    { bucket: 'Network Timeout', count: 889, recovery: '71%', severity: 'Low' },
                  ].map((row) => (
                    <tr key={row.bucket}>
                      <td className="px-3 py-2 text-sm text-gray-900">{row.bucket}</td>
                      <td className="px-3 py-2 text-right text-sm text-gray-700">{row.count.toLocaleString()}</td>
                      <td className="px-3 py-2 text-center text-sm text-blue-600">{row.recovery}</td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`rounded px-2 py-1 text-xs font-semibold ${
                            row.severity === 'High' ? 'bg-red-100 text-red-700' : row.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">DPD & NPA Dashboard</h3>
            <div className="space-y-3">
              {[
                { label: 'Performing (0 DPD)', pct: 81, tone: 'bg-gray-900' },
                { label: 'SMA-1 (1-30)', pct: 11, tone: 'bg-blue-500' },
                { label: 'SMA-2 (31-60)', pct: 5, tone: 'bg-yellow-500' },
                { label: 'NPA (61+)', pct: 3, tone: 'bg-red-500' },
              ].map((bucket) => (
                <div key={bucket.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600">{bucket.label}</span>
                    <span className="font-semibold text-gray-900">{bucket.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full ${bucket.tone}`} style={{ width: `${bucket.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-3 text-xs">
              <span className="font-semibold text-gray-900">12,480 accounts in delinquency flow</span>
              <span className="font-semibold text-red-600">NPA ratio: 3.0%</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Non-Recoverable & Write-off Dashboard</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase text-gray-600">Bucket</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Cases</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Amount</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold uppercase text-gray-600">Write-off %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { bucket: 'Legal Hold', cases: 134, amount: '₹24.8L', wo: '18.2%' },
                    { bucket: 'Fraud Confirmed', cases: 68, amount: '₹19.4L', wo: '42.8%' },
                    { bucket: 'Field Exhausted', cases: 411, amount: '₹57.2L', wo: '26.1%' },
                    { bucket: 'Deceased/Hardship', cases: 27, amount: '₹4.1L', wo: '11.6%' },
                  ].map((row) => (
                    <tr key={row.bucket}>
                      <td className="px-3 py-2 text-sm text-gray-900">{row.bucket}</td>
                      <td className="px-3 py-2 text-right text-sm text-gray-700">{row.cases}</td>
                      <td className="px-3 py-2 text-right text-sm text-gray-900">{row.amount}</td>
                      <td className="px-3 py-2 text-right text-sm text-red-600">{row.wo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={openReconciliationModal}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold hover:bg-gray-50"
              >
                Reconcile
              </button>
            </div>
          </div>
        </div>
        </>}
      </div>
    );
  };

  const Customer360 = () => (
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

      <div className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Rahul Sharma</h2>
            <div className="space-y-1 text-sm text-cyan-100">
              <div>Mobile: +91 98765 43210</div>
              <div>Paytm ID: PTM_8372649201</div>
              <div>LAN: AB_LN_2024_847362</div>
              <div>Partner: Aditya Birla Finance</div>
            </div>
          </div>
          <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold">ACTIVE</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-gray-900">Financial Ledger</h2>
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
            {
              amount: '₹5,000',
              source: 'Manual App',
              reason: null,
              date: '2026-01-15',
              status: 'Success',
            },
            {
              amount: '₹10,000',
              source: 'Auto Debit',
              reason: 'Insufficient Funds',
              date: '2026-01-07',
              status: 'Failed',
            },
            {
              amount: '₹8,200',
              source: 'UPI AutoPay',
              reason: null,
              date: '2025-12-15',
              status: 'Success',
            },
            {
              amount: '₹8,200',
              source: 'Auto Debit',
              reason: 'Bank Server Down',
              date: '2025-12-03',
              status: 'Failed',
            },
            {
              amount: '₹6,500',
              source: 'Manual App',
              reason: null,
              date: '2025-11-14',
              status: 'Success',
            },
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
      case 'dpdRecon':
        return <DPDRecon />;
      case 'customer360':
        return <Customer360 />;
      case 'watchtower':
        return <SystemWatchtower />;
      case 'portfolioMaster':
        return <PortfolioMaster />;
      default:
        return <div>Module coming soon...</div>;
    }
  };

  return (
    <PageShell className="pp-insights">
      <PPInsightsThemeBridge />
      <Routes>
        <Route
          path="bill-delta-details/:dimension"
          element={
            <ContentPane>
              <ContentInner>
                <BillGenDeltaDetails />
              </ContentInner>
            </ContentPane>
          }
        />
        <Route
          path="daily-dues-delta/:dimension"
          element={
            <ContentPane>
              <ContentInner>
                <DailyDuesDeltaDetails />
              </ContentInner>
            </ContentPane>
          }
        />
        <Route
          path="mom-delta/:month"
          element={
            <ContentPane>
              <ContentInner>
                <MomDeltaDetails />
              </ContentInner>
            </ContentPane>
          }
        />
        <Route
          path="repayment-delta"
          element={
            <ContentPane>
              <ContentInner>
                <RepaymentDeltaDetails />
              </ContentInner>
            </ContentPane>
          }
        />
        <Route
          path="repayment-details/:metricType"
          element={
            <ContentPane>
              <ContentInner>
                <RepaymentDrillDown />
              </ContentInner>
            </ContentPane>
          }
        />
        <Route
          path="*"
          element={
            <>
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
            </>
          }
        />
      </Routes>

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
