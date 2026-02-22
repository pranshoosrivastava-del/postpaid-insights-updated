import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, AlertCircle, TrendingUp, CheckCircle2, X } from 'lucide-react';

export type InsightType = 'danger' | 'warning' | 'success' | 'info';

export interface ActionableInsightItem {
  type: InsightType;
  title: string;
  description: string;
  actionText: string;
  actionLink?: string;
}

interface ActionableInsightsProps {
  insights: ActionableInsightItem[];
}

const TYPE_CONFIG: Record<
  InsightType,
  { icon: typeof AlertCircle; bg: string; border: string; iconColor: string; titleColor: string }
> = {
  danger: {
    icon: AlertCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-800',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-800',
  },
  info: {
    icon: Lightbulb,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
  },
};

const ActionableInsights = ({ insights }: ActionableInsightsProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || insights.length === 0) return null;

  const showActionLink = (item: ActionableInsightItem) => {
    const t = item.actionText.toLowerCase();
    return !!item.actionLink && t !== 'none required' && t !== 'none';
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-gradient-to-r from-slate-50/90 to-blue-50/20 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-slate-500" aria-hidden />
          <span className="text-xs font-semibold text-slate-700">Smart Insights</span>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600"
          aria-label="Dismiss insights"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 p-3">
        {insights.map((item, idx) => {
          const config = TYPE_CONFIG[item.type];
          const Icon = config.icon;
          const actionEl = showActionLink(item) ? (
            <Link
              to={item.actionLink!}
              className="ml-1 inline-flex items-center rounded border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {item.actionText}
            </Link>
          ) : (
            <span className="ml-1 text-xs text-slate-500">{item.actionText}</span>
          );
          return (
            <div
              key={idx}
              className={`flex min-w-0 flex-1 basis-[280px] items-start gap-2 rounded border ${config.border} ${config.bg} p-2`}
            >
              <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${config.iconColor}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <div className={`text-[10px] font-semibold uppercase tracking-wide ${config.titleColor}`}>
                  {item.title}
                </div>
                <p className="mt-0.5 text-sm text-slate-700">{item.description}</p>
                {actionEl}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionableInsights;
