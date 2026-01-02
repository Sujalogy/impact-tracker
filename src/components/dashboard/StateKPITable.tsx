import { useDashboardStore, getStatusColor, getLevelBadge } from '@/store/dashboardStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { stateKPIData } from '@/data/mockData';
import type { TargetThreshold } from '@/types/dashboard';
import { filterStateKPIData } from '@/utils/filterUtils';

interface StatusCellProps {
  value: number;
  kpiId: string;
  stateId?: string;
}

function StatusCell({ value, kpiId, stateId }: StatusCellProps) {
  const { getApplicableTarget } = useDashboardStore();
  const target = getApplicableTarget(kpiId, stateId);
  const status = getStatusColor(value, target);
  const filters = useDashboardStore((state) => state.filters);
  const filteredData = filterStateKPIData(stateKPIData, filters);

  const statusClasses = {
    green: 'bg-status-green-bg text-status-green',
    yellow: 'bg-status-yellow-bg text-status-yellow',
    red: 'bg-status-red-bg text-status-red',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded font-medium text-sm",
          statusClasses[status]
        )}>
          {value}%
          {target && (
            <span className="text-[10px] opacity-60">
              {getLevelBadge(target.level)}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-1">
          <p className="font-medium">Current Value: {value}%</p>
          {target && (
            <>
              <p className="text-xs">Target Level: {target.level.charAt(0).toUpperCase() + target.level.slice(1)}</p>
              <p className="text-xs">Green: ≥{target.greenMin}% | Yellow: {target.yellowMin}-{target.yellowMax}% | Red: &lt;{target.yellowMin}%</p>
            </>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function StateKPITable() {
  return (
    <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="mb-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          State-wise KPI Comparison
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Performance comparison across all states with color-coded thresholds
        </p>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header hover:bg-table-header">
                <TableHead className="font-semibold sticky left-0 bg-table-header z-10 min-w-[140px]">State</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">Total CRO</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">Avg Enrollment</TableHead>
                <TableHead className="text-center font-semibold min-w-[100px]">Attendance %</TableHead>
                <TableHead className="text-center font-semibold min-w-[100px]">Joint Visit %</TableHead>
                <TableHead className="text-center font-semibold min-w-[110px]">TG Availability</TableHead>
                <TableHead className="text-center font-semibold min-w-[120px]">TG Followed</TableHead>
                <TableHead className="text-center font-semibold min-w-[100px]">TG Partial</TableHead>
                <TableHead className="text-center font-semibold min-w-[120px]">Assessment Tracker</TableHead>
                <TableHead className="text-center font-semibold min-w-[100px]">TLM Usage</TableHead>
                <TableHead className="text-center font-semibold min-w-[120px]">Student Participation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stateKPIData.map((state) => (
                <TableRow key={state.stateId} className="hover:bg-table-hover transition-colors">
                  <TableCell className="font-medium sticky left-0 bg-card z-10">
                    {state.stateName}
                  </TableCell>
                  <TableCell className="text-center font-semibold">{state.totalCRO.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{state.avgEnrollment}</TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.studentAttendance} kpiId="attendance" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.jointVisit} kpiId="joint_visit" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.tgAvailability} kpiId="tg_availability" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.tgFollowed} kpiId="tg_followed" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.tgPartialFollowed} kpiId="tg_partial" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.assessmentTracker} kpiId="assessment_tracker" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.tlmUsage} kpiId="tlm_usage" stateId={state.stateId} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusCell value={state.studentParticipation} kpiId="student_participation" stateId={state.stateId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
