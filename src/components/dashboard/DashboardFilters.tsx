import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDown, X, Filter, RotateCcw, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { filterOptions, locationHierarchy } from '@/data/mockData';
import type { FilterState } from '@/types/dashboard';

interface MultiSelectFilterProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  icon?: React.ReactNode;
}

function MultiSelectFilter({ label, options, selected, onChange, icon }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const selectAll = () => onChange(options);
  const clearAll = () => onChange([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal bg-header-foreground/5 border-header-foreground/20 text-header-foreground hover:bg-header-foreground/10",
            selected.length > 0 && "bg-accent/20 border-accent/40"
          )}
        >
          {icon}
          {label}
          {selected.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
              {selected.length}
            </span>
          )}
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-popover border shadow-lg" align="start">
        <div className="flex items-center justify-between mb-2 pb-2 border-b">
          <span className="text-sm font-medium">{label}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={selectAll}>
              All
            </Button>
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[200px]">
          <div className="space-y-1">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <Checkbox checked={selected.includes(option)} />
                <Label className="text-sm cursor-pointer">{option}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export function DashboardFilters() {
  const { filters, setFilters, clearFilters } = useDashboardStore();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const states = locationHierarchy.states.map((s) => s.name);
  const selectedStateObjs = locationHierarchy.states.filter((s) => filters.states.includes(s.name));
  const districts = selectedStateObjs.flatMap((s) => s.districts.map((d) => d.name));

  const activeFilterCount = Object.values(filters).filter((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object' && v !== null) {
      return v.start || v.end;
    }
    return false;
  }).length;

  return (
    <div className="py-3 border-t border-header-foreground/10">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 mr-2">
          <Filter className="w-4 h-4 text-header-foreground/60" />
          <span className="text-xs font-medium text-header-foreground/80">Filters:</span>
        </div>

        {/* Time Filters */}
        <MultiSelectFilter
          label="Academic Year"
          options={filterOptions.academicYears}
          selected={filters.academicYears}
          onChange={(v) => setFilters({ academicYears: v })}
        />
        <MultiSelectFilter
          label="Month"
          options={filterOptions.months}
          selected={filters.months}
          onChange={(v) => setFilters({ months: v })}
        />
        <MultiSelectFilter
          label="Week"
          options={filterOptions.weeks}
          selected={filters.weeks}
          onChange={(v) => setFilters({ weeks: v })}
        />

        {/* Date Range */}
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-1.5 text-xs font-normal bg-header-foreground/5 border-header-foreground/20 text-header-foreground hover:bg-header-foreground/10",
                (filters.dateRange.start || filters.dateRange.end) && "bg-accent/20 border-accent/40"
              )}
            >
              <CalendarIcon className="w-3 h-3" />
              {filters.dateRange.start
                ? `${format(new Date(filters.dateRange.start), 'MMM d')} - ${
                    filters.dateRange.end
                      ? format(new Date(filters.dateRange.end), 'MMM d')
                      : '...'
                  }`
                : 'Date Range'}
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border shadow-lg" align="start">
            <Calendar
              mode="range"
              selected={{
                from: filters.dateRange.start ? new Date(filters.dateRange.start) : undefined,
                to: filters.dateRange.end ? new Date(filters.dateRange.end) : undefined,
              }}
              onSelect={(range) => {
                setFilters({
                  dateRange: {
                    start: range?.from?.toISOString() || null,
                    end: range?.to?.toISOString() || null,
                  },
                });
              }}
              className="pointer-events-auto"
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-header-foreground/20 mx-1" />

        {/* Location Filters */}
        <MultiSelectFilter
          label="State"
          options={states}
          selected={filters.states}
          onChange={(v) => setFilters({ states: v, districts: [] })}
        />
        {districts.length > 0 && (
          <MultiSelectFilter
            label="District"
            options={districts}
            selected={filters.districts}
            onChange={(v) => setFilters({ districts: v })}
          />
        )}

        <div className="w-px h-6 bg-header-foreground/20 mx-1" />

        {/* Academic Filters */}
        <MultiSelectFilter
          label="Subject"
          options={filterOptions.subjects}
          selected={filters.subjects}
          onChange={(v) => setFilters({ subjects: v })}
        />
        <MultiSelectFilter
          label="Grade"
          options={filterOptions.grades}
          selected={filters.grades}
          onChange={(v) => setFilters({ grades: v })}
        />
        <MultiSelectFilter
          label="Visit Type"
          options={filterOptions.visitTypes}
          selected={filters.visitTypes}
          onChange={(v) => setFilters({ visitTypes: v })}
        />

        <div className="w-px h-6 bg-header-foreground/20 mx-1" />

        {/* Staff Filters */}
        <MultiSelectFilter
          label="Staff"
          options={filterOptions.staffNames}
          selected={filters.staffNames}
          onChange={(v) => setFilters({ staffNames: v })}
        />
        <MultiSelectFilter
          label="Designation"
          options={filterOptions.designations}
          selected={filters.designations}
          onChange={(v) => setFilters({ designations: v })}
        />

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs text-header-foreground/80 hover:text-header-foreground hover:bg-header-foreground/10"
          >
            <RotateCcw className="w-3 h-3 mr-1.5" />
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>
    </div>
  );
}
