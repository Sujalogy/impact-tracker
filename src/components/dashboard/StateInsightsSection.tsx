import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore, getStatusColor } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';
import { stateInsights } from '@/data/mockData';
import { Eye, Users, BookOpen, Calculator } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  subLabel?: string;
}

function StatCard({ label, value, icon, subLabel }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="p-2 rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        {subLabel && <div className="text-xs text-muted-foreground/70">{subLabel}</div>}
      </div>
    </div>
  );
}

interface PracticeRowProps {
  label: string;
  value: number;
  kpiId: string;
  stateId: string;
}

function PracticeRow({ label, value, kpiId, stateId }: PracticeRowProps) {
  const { getApplicableTarget } = useDashboardStore();
  const target = getApplicableTarget(kpiId, stateId);
  const status = getStatusColor(value, target);

  const statusClasses = {
    green: 'bg-status-green text-status-green-bg',
    yellow: 'bg-status-yellow text-status-yellow-bg',
    red: 'bg-status-red text-status-red-bg',
  };

  const barClasses = {
    green: 'bg-status-green',
    yellow: 'bg-status-yellow',
    red: 'bg-status-red',
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-muted-foreground w-8">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barClasses[status])}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded",
        statusClasses[status]
      )}>
        {value}%
      </span>
    </div>
  );
}

export function StateInsightsSection() {
  return (
    <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="mb-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Detailed State/District Insights
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Focus sections for each state showing key metrics and practices
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stateInsights.map((state) => (
          <Card key={state.stateId} className="shadow-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">{state.stateName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-2">
                <StatCard
                  label="Total Visits"
                  value={state.totalVisits.toLocaleString()}
                  icon={<Eye className="w-4 h-4" />}
                />
                <StatCard
                  label="Student Participation"
                  value={`${state.studentParticipation}%`}
                  icon={<Users className="w-4 h-4" />}
                />
              </div>

              {/* Observations */}
              <div className="flex gap-2 text-xs">
                <div className="flex-1 p-2 rounded bg-muted/50 text-center">
                  <BookOpen className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <div className="font-semibold">{state.literacyObservations}</div>
                  <div className="text-muted-foreground">Literacy</div>
                </div>
                <div className="flex-1 p-2 rounded bg-muted/50 text-center">
                  <Calculator className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <div className="font-semibold">{state.numeracyObservations}</div>
                  <div className="text-muted-foreground">Numeracy</div>
                </div>
              </div>

              {/* Literacy Practices */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Literacy Practices
                </div>
                <div className="space-y-2">
                  <PracticeRow label="PP1" value={state.literacyPractices.pp1} kpiId="lit_pp1" stateId={state.stateId} />
                  <PracticeRow label="PP2" value={state.literacyPractices.pp2} kpiId="lit_pp2" stateId={state.stateId} />
                  <PracticeRow label="PP3" value={state.literacyPractices.pp3} kpiId="lit_pp3" stateId={state.stateId} />
                  <PracticeRow label="PP4" value={state.literacyPractices.pp4} kpiId="lit_pp4" stateId={state.stateId} />
                </div>
              </div>

              {/* Numeracy Practices */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Calculator className="w-3 h-3" /> Numeracy Practices
                </div>
                <div className="space-y-2">
                  <PracticeRow label="PP1" value={state.numeracyPractices.pp1} kpiId="num_pp1" stateId={state.stateId} />
                  <PracticeRow label="PP2" value={state.numeracyPractices.pp2} kpiId="num_pp2" stateId={state.stateId} />
                  <PracticeRow label="PP3" value={state.numeracyPractices.pp3} kpiId="num_pp3" stateId={state.stateId} />
                  <PracticeRow label="PP4" value={state.numeracyPractices.pp4} kpiId="num_pp4" stateId={state.stateId} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
