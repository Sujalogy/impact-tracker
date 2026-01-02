import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, Eye, Users, BookCheck, ClipboardCheck, Lightbulb, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { highlightMetrics } from '@/data/mockData';
import type { HighlightMetric } from '@/types/dashboard';

const iconMap: Record<string, React.ReactNode> = {
  total_cro: <Eye className="w-5 h-5" />,
  avg_enrollment_high: <Users className="w-5 h-5" />,
  avg_enrollment_low: <Users className="w-5 h-5" />,
  attendance: <UserCheck className="w-5 h-5" />,
  joint_visit_high: <Users className="w-5 h-5" />,
  joint_visit_low: <Users className="w-5 h-5" />,
  tg_availability: <BookCheck className="w-5 h-5" />,
  tg_followed: <ClipboardCheck className="w-5 h-5" />,
  assessment_tracker: <ClipboardCheck className="w-5 h-5" />,
  tlm_usage: <Lightbulb className="w-5 h-5" />,
  student_participation: <UserCheck className="w-5 h-5" />,
};

function MetricCard({ metric }: { metric: HighlightMetric }) {
  const colorClasses = {
    green: 'bg-status-green-bg text-status-green border-status-green/20',
    yellow: 'bg-status-yellow-bg text-status-yellow border-status-yellow/20',
    red: 'bg-status-red-bg text-status-red border-status-red/20',
  };

  const valueColorClasses = {
    green: 'text-status-green',
    yellow: 'text-status-yellow',
    red: 'text-status-red',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={cn(
          "group relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer border",
          metric.color ? colorClasses[metric.color] : "bg-card border-border"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className={cn(
                "p-2 rounded-lg",
                metric.color ? `bg-current/10` : "bg-muted"
              )}>
                {iconMap[metric.id] || <Eye className="w-5 h-5" />}
              </div>
              {metric.trend && (
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  metric.trend > 0 ? "text-status-green" : "text-status-red"
                )}>
                  {metric.trend > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(metric.trend)}%
                </div>
              )}
            </div>
            <div className="mt-3">
              <div className={cn(
                "text-2xl font-display font-bold",
                metric.color ? valueColorClasses[metric.color] : "text-foreground"
              )}>
                {typeof metric.value === 'number' && metric.type === 'percentage'
                  ? `${metric.value}%`
                  : metric.value.toLocaleString()}
              </div>
              <div className={cn(
                "text-sm font-medium mt-0.5",
                metric.color ? "opacity-80" : "text-muted-foreground"
              )}>
                {metric.label}
              </div>
              {metric.subLabel && (
                <div className={cn(
                  "text-xs mt-1",
                  metric.color ? "opacity-60" : "text-muted-foreground"
                )}>
                  {metric.subLabel}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">{metric.label}</p>
        {metric.subLabel && <p className="text-xs opacity-70">{metric.subLabel}</p>}
        {metric.trend && (
          <p className="text-xs mt-1">
            Year-on-year growth: {metric.trend > 0 ? '+' : ''}{metric.trend}%
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export function HighlightsSection() {
  return (
    <section className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Highlights - Overall Summary
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Key performance metrics across all states
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {highlightMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}
