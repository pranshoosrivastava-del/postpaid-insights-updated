import type { FunnelStage, NavItem, ReconItem, ReconType } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'cockpit', label: 'Executive Cockpit' },
  { id: 'acquisition', label: 'Acquisition & Funnel' },
  { id: 'portfolio', label: 'Portfolio Management' },
  { id: 'collections', label: 'Collections War Room' },
  { id: 'risk', label: 'Risk & Asset Quality' },
  {
    id: 'finance',
    label: 'Finance & Recon',
    children: [
      { id: 'finance', label: 'Overview' },
      { id: 'dpdRecon', label: 'DPD Recon' },
    ],
  },
  { id: 'customer360', label: 'Customer 360' },
  { id: 'watchtower', label: 'System Watchtower' },
  { id: 'portfolioMaster', label: 'Portfolio Analytics' },
];

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: 'traffic',
    name: 'Traffic',
    count: 500000,
    percentage: 100,
    color: 'blue',
    dropoff: 0,
    l2Stages: [
      { name: 'App Open', count: 500000, dropRate: 0, failReasons: [] },
      { name: 'Icon Click', count: 425000, dropRate: 15, failReasons: ['Dropped at Banner', 'Session Timeout'] },
      { name: 'Device Binding', count: 410000, dropRate: 3.5, failReasons: ['Device Binding Failed', 'SSFB Whitelist Rejection'] },
    ],
  },
  {
    id: 'kyc',
    name: 'KYC Prep',
    count: 410000,
    percentage: 82,
    color: 'green',
    dropoff: 18,
    l2Stages: [
      { name: 'Lead Creation', count: 410000, dropRate: 0, failReasons: [] },
      {
        name: 'PAN Validation (Signzy)',
        count: 385000,
        dropRate: 6.1,
        failReasons: ['Duplicate PAN (Dedupe)', 'Invalid PAN Format', 'Signzy API Timeout'],
      },
      { name: 'Email Domain Check', count: 370000, dropRate: 3.9, failReasons: ['Disposable Email', 'Invalid Domain'] },
      { name: 'Income Declaration', count: 365000, dropRate: 1.4, failReasons: ['User Abandoned'] },
    ],
  },
  {
    id: 'bureau',
    name: 'Bureau & Policy 1',
    count: 365000,
    percentage: 73,
    color: 'purple',
    dropoff: 9,
    l2Stages: [
      { name: 'Bureau Soft Pull', count: 365000, dropRate: 0, failReasons: [] },
      {
        name: 'BRE1 Execution',
        count: 295000,
        dropRate: 19.2,
        failReasons: ['Credit Score < 650', 'No Credit History', 'High Existing Obligations', 'Policy Gating Criteria'],
      },
      { name: 'Lender PAN Validation', count: 285000, dropRate: 3.4, failReasons: ['Lender API Timeout', 'PAN Mismatch'] },
    ],
  },
  {
    id: 'offer',
    name: 'Offer & Liveliness',
    count: 285000,
    percentage: 57,
    color: 'yellow',
    dropoff: 16,
    l2Stages: [
      { name: 'PQ Offer Display', count: 285000, dropRate: 0, failReasons: [] },
      { name: 'Offer Acceptance', count: 255000, dropRate: 10.5, failReasons: ['User Rejected Offer', 'Limit Too Low'] },
      { name: 'Selfie Capture', count: 240000, dropRate: 5.9, failReasons: ['Camera Permission Denied', 'Poor Image Quality'] },
      {
        name: 'Liveliness Check',
        count: 225000,
        dropRate: 6.3,
        failReasons: ['Eye Blink Failed', 'Face Coverage < 70%', 'Max Retries Exceeded (12/day)'],
      },
    ],
  },
  {
    id: 'ekyc',
    name: 'E-KYC Procurement',
    count: 225000,
    percentage: 45,
    color: 'orange',
    dropoff: 12,
    l2Stages: [
      { name: 'Aadhaar OTP Redirect', count: 225000, dropRate: 0, failReasons: [] },
      { name: 'UIDAI OTP Verification', count: 210000, dropRate: 6.7, failReasons: ['Incorrect OTP', 'OTP Expired', 'UIDAI Service Down'] },
      {
        name: 'Lender Retail Dedupe',
        count: 198000,
        dropRate: 5.7,
        failReasons: ['NPA Status with Lender', 'Suspended Account', 'ETB High Risk'],
      },
    ],
  },
  {
    id: 'risk_validation',
    name: 'Risk Validations',
    count: 198000,
    percentage: 39.6,
    color: 'red',
    dropoff: 5.4,
    l2Stages: [
      { name: 'Name Match (Paytm)', count: 198000, dropRate: 0, failReasons: [] },
      { name: 'Selfie Match (>70%)', count: 185000, dropRate: 6.6, failReasons: ['Face Similarity < 70%', 'Multiple Retry Failures'] },
      {
        name: 'Aadhaar-PAN Linkage',
        count: 178000,
        dropRate: 3.8,
        failReasons: ['Not Linked with UIDAI', 'Lender API Failure'],
      },
      { name: 'Lender Face Similarity', count: 172000, dropRate: 3.4, failReasons: ['Lender Threshold Not Met', 'API Timeout'] },
    ],
  },
  {
    id: 'address',
    name: 'Address & Serviceability',
    count: 172000,
    percentage: 34.4,
    color: 'pink',
    dropoff: 5.2,
    l2Stages: [
      { name: 'Communication Address', count: 172000, dropRate: 0, failReasons: [] },
      { name: 'Pin Code Serviceability', count: 165000, dropRate: 4.1, failReasons: ['Pin Not Serviceable', 'Fraud-Prone Area'] },
      {
        name: 'Lender BRE2 (AML/Hunter)',
        count: 158000,
        dropRate: 4.2,
        failReasons: ['Hunter Hit', 'AML Red Flag', 'Fraud Score High'],
      },
    ],
  },
  {
    id: 'mandate',
    name: 'Bank & Mandate',
    count: 158000,
    percentage: 31.6,
    color: 'indigo',
    dropoff: 2.8,
    l2Stages: [
      { name: 'Bank Selection', count: 158000, dropRate: 0, failReasons: [] },
      { name: 'Penny Drop', count: 152000, dropRate: 3.8, failReasons: ['Name Mismatch', 'Invalid Account', 'Bank API Down'] },
      { name: 'UPI Mandate Init', count: 148000, dropRate: 2.6, failReasons: ['Mandate Declined', 'PG Failure', 'User Cancelled'] },
    ],
  },
  {
    id: 'activation',
    name: 'Legal & Activation',
    count: 148000,
    percentage: 29.6,
    color: 'cyan',
    dropoff: 2,
    l2Stages: [
      { name: 'Review Limit (KFS)', count: 148000, dropRate: 0, failReasons: [] },
      { name: 'Click Wrap Agreement', count: 145000, dropRate: 2, failReasons: ['User Abandoned', 'Terms Not Accepted'] },
      { name: 'E-Sign (Legality API)', count: 142000, dropRate: 2.1, failReasons: ['E-Sign Failed', 'Legality API Timeout'] },
      {
        name: 'LAN Creation',
        count: 138000,
        dropRate: 2.8,
        failReasons: ['Lender LAN Creation Failed', 'Customer Creation API Error'],
      },
      { name: 'UPI Line Onboarding', count: 135000, dropRate: 2.2, failReasons: ['UPI Registration Failed'] },
    ],
  },
];

export const RECON_ITEMS: ReconItem[] = [
  { id: 'principal', name: 'Total Repaid Principal Variance', category: 'Principal', amount: '₹15,000', priority: 'high' },
  { id: 'fees', name: 'Lender Share of Fees Variance', category: 'Fees', amount: '₹2,500', priority: 'medium' },
  { id: 'outstanding', name: 'Outstanding Principal Variance', category: 'Principal', amount: '+₹15,000', priority: 'high' },
];

export const RECON_TYPE_OPTIONS: Array<{ value: ReconType; label: string }> = [
  { value: 'auto', label: 'Auto Reconciliation (System Adjustment)' },
  { value: 'manual', label: 'Manual Review Required' },
  { value: 'query', label: 'Query with Lender' },
];
