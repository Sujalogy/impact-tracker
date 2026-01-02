import { useDashboardStore, getStatusColor, getLevelBadge } from '@/store/dashboardStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { literacyPracticeData, locationHierarchy } from '@/data/mockData';

interface StatusCellProps {
  value: number;
  kpiId: string;
  stateId?: string;
  districtId?: string;
}

function StatusCell({ value, kpiId, stateId, districtId }: StatusCellProps) {
  const { getApplicableTarget } = useDashboardStore();
  const target = getApplicableTarget(kpiId, stateId, districtId);
  const status = getStatusColor(value, target);

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

export function LiteracyPracticesTable() {
  // Group by state for display
  const groupedData = literacyPracticeData.reduce((acc, district) => {
    if (!acc[district.stateId]) {
      const state = locationHierarchy.states.find(s => s.id === district.stateId);
      acc[district.stateId] = {
        stateName: state?.name || district.stateId,
        districts: [],
      };
    }
    acc[district.stateId].districts.push(district);
    return acc;
  }, {} as Record<string, { stateName: string; districts: typeof literacyPracticeData }>);

  return (
    <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="mb-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Prioritized Practices in Literacy Classes
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          District-wise performance on literacy teaching practices
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="text-xs">PP1: Higher-order Comprehension</Badge>
          <Badge variant="outline" className="text-xs">PP2: Reading Graded Texts</Badge>
          <Badge variant="outline" className="text-xs">PP3: Reading Comprehension Strategies</Badge>
          <Badge variant="outline" className="text-xs">PP4: Writing Feedback</Badge>
          <Badge variant="outline" className="text-xs">GP1: Checks Understanding</Badge>
          <Badge variant="outline" className="text-xs">GP2: Home Languages</Badge>
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header hover:bg-table-header">
                <TableHead className="font-semibold sticky left-0 bg-table-header z-10 min-w-[160px]">State / District</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">PP1</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">PP2</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">PP3</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">PP4</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">GP1</TableHead>
                <TableHead className="text-center font-semibold min-w-[80px]">GP2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedData).map(([stateId, { stateName, districts }]) => (
                <>
                  <TableRow key={stateId} className="bg-muted/50 hover:bg-muted/70">
                    <TableCell colSpan={7} className="font-semibold text-foreground sticky left-0 bg-muted/50 z-10">
                      {stateName}
                    </TableCell>
                  </TableRow>
                  {districts.map((district) => (
                    <TableRow key={district.districtId} className="hover:bg-table-hover transition-colors">
                      <TableCell className="pl-6 font-medium sticky left-0 bg-card z-10">
                        {district.districtName}
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.pp1} kpiId="lit_pp1" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.pp2} kpiId="lit_pp2" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.pp3} kpiId="lit_pp3" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.pp4} kpiId="lit_pp4" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.gp1} kpiId="lit_gp1" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusCell value={district.gp2} kpiId="lit_gp2" stateId={district.stateId} districtId={district.districtId} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
