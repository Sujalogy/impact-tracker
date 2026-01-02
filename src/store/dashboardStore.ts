import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, FilterState, TargetThreshold, TargetLevel } from '@/types/dashboard';
import { defaultTargets } from '@/data/mockData';

interface DashboardStore {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, role: 'admin' | 'user') => void;
  logout: () => void;

  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;

  // Targets
  targets: TargetThreshold[];
  addTarget: (target: TargetThreshold) => void;
  updateTarget: (id: string, target: Partial<TargetThreshold>) => void;
  deleteTarget: (id: string) => void;
  getApplicableTarget: (kpiId: string, stateId?: string, districtId?: string, blockId?: string) => TargetThreshold | undefined;

  // Admin Panel
  isAdminPanelOpen: boolean;
  setAdminPanelOpen: (open: boolean) => void;
}

const initialFilters: FilterState = {
  academicYears: [],
  months: [],
  weeks: [],
  dates: [],
  dateRange: { start: null, end: null },
  states: [],
  districts: [],
  blocks: [],
  clusters: [],
  schools: [],
  staffNames: [],
  designations: [],
  subjects: [],
  grades: [],
  visitTypes: [],
  periods: [],
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (username, role) => set({ user: { username, role }, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Filters
      filters: initialFilters,
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      clearFilters: () => set({ filters: initialFilters }),

      // Targets
      targets: defaultTargets,
      addTarget: (target) => set((state) => ({ targets: [...state.targets, target] })),
      updateTarget: (id, targetUpdate) =>
        set((state) => ({
          targets: state.targets.map((t) => (t.id === id ? { ...t, ...targetUpdate } : t)),
        })),
      deleteTarget: (id) => set((state) => ({ targets: state.targets.filter((t) => t.id !== id) })),
      getApplicableTarget: (kpiId, stateId, districtId, blockId) => {
        const { targets } = get();
        
        // Priority: Block > District > State > Global
        if (blockId) {
          const blockTarget = targets.find((t) => t.kpiId === kpiId && t.level === 'block' && t.locationId === blockId);
          if (blockTarget) return blockTarget;
        }
        
        if (districtId) {
          const districtTarget = targets.find((t) => t.kpiId === kpiId && t.level === 'district' && t.locationId === districtId);
          if (districtTarget) return districtTarget;
        }
        
        if (stateId) {
          const stateTarget = targets.find((t) => t.kpiId === kpiId && t.level === 'state' && t.locationId === stateId);
          if (stateTarget) return stateTarget;
        }
        
        return targets.find((t) => t.kpiId === kpiId && t.level === 'global');
      },

      // Admin Panel
      isAdminPanelOpen: false,
      setAdminPanelOpen: (open) => set({ isAdminPanelOpen: open }),
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        filters: state.filters,
        targets: state.targets,
      }),
    }
  )
);

// Helper function to get status color based on value and target
export function getStatusColor(value: number, target?: TargetThreshold): 'green' | 'yellow' | 'red' {
  if (!target) {
    // Default thresholds
    if (value >= 75) return 'green';
    if (value >= 50) return 'yellow';
    return 'red';
  }

  if (value >= target.greenMin) return 'green';
  if (value >= target.yellowMin) return 'yellow';
  return 'red';
}

// Get level badge text
export function getLevelBadge(level: TargetLevel): string {
  switch (level) {
    case 'global': return 'G';
    case 'state': return 'S';
    case 'district': return 'D';
    case 'block': return 'B';
    default: return 'G';
  }
}
