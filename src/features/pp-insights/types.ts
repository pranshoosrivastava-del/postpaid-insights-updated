export type ReconType = 'auto' | 'manual' | 'query';

export type DashboardViewId =
  | 'cockpit'
  | 'acquisition'
  | 'portfolio'
  | 'collections'
  | 'risk'
  | 'finance'
  | 'customer360'
  | 'watchtower';

export type StageColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'indigo'
  | 'cyan';

export interface NavItem {
  id: DashboardViewId;
  label: string;
}

export interface FunnelSubStage {
  name: string;
  count: number;
  dropRate: number;
  failReasons: string[];
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: StageColor;
  dropoff: number;
  l2Stages: FunnelSubStage[];
}

export interface ReconItem {
  id: string;
  name: string;
  category: string;
  amount: string;
  priority: 'high' | 'medium';
}
