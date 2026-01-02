// src/utils/filterUtils.ts
import type { FilterState } from '@/types/dashboard';
import type { StateKPIData, LiteracyPracticeData, NumeracyPracticeData, StateInsight } from '@/types/dashboard';
import { locationHierarchy } from '@/data/mockData';

/**
 * Applies filters to state KPI data
 */
export function filterStateKPIData(data: StateKPIData[], filters: FilterState): StateKPIData[] {
  if (filters.states.length === 0) return data;
  
  const stateIds = filters.states.map(stateName => {
    const state = locationHierarchy.states.find(s => s.name === stateName);
    return state?.id;
  }).filter(Boolean);
  
  return data.filter(state => stateIds.includes(state.stateId));
}

/**
 * Applies filters to literacy practice data
 */
export function filterLiteracyData(data: LiteracyPracticeData[], filters: FilterState): LiteracyPracticeData[] {
  let filtered = [...data];
  
  // Filter by states
  if (filters.states.length > 0) {
    const stateIds = filters.states.map(stateName => {
      const state = locationHierarchy.states.find(s => s.name === stateName);
      return state?.id;
    }).filter(Boolean);
    
    filtered = filtered.filter(d => stateIds.includes(d.stateId));
  }
  
  // Filter by districts
  if (filters.districts.length > 0) {
    const districtIds = filters.districts.map(districtName => {
      for (const state of locationHierarchy.states) {
        const district = state.districts.find(d => d.name === districtName);
        if (district) return district.id;
      }
      return null;
    }).filter(Boolean);
    
    filtered = filtered.filter(d => districtIds.includes(d.districtId));
  }
  
  return filtered;
}

/**
 * Applies filters to numeracy practice data
 */
export function filterNumeracyData(data: NumeracyPracticeData[], filters: FilterState): NumeracyPracticeData[] {
  let filtered = [...data];
  
  // Filter by states
  if (filters.states.length > 0) {
    const stateIds = filters.states.map(stateName => {
      const state = locationHierarchy.states.find(s => s.name === stateName);
      return state?.id;
    }).filter(Boolean);
    
    filtered = filtered.filter(d => stateIds.includes(d.stateId));
  }
  
  // Filter by districts
  if (filters.districts.length > 0) {
    const districtIds = filters.districts.map(districtName => {
      for (const state of locationHierarchy.states) {
        const district = state.districts.find(d => d.name === districtName);
        if (district) return district.id;
      }
      return null;
    }).filter(Boolean);
    
    filtered = filtered.filter(d => districtIds.includes(d.districtId));
  }
  
  return filtered;
}

/**
 * Applies filters to state insights
 */
export function filterStateInsights(data: StateInsight[], filters: FilterState): StateInsight[] {
  if (filters.states.length === 0) return data;
  
  const stateIds = filters.states.map(stateName => {
    const state = locationHierarchy.states.find(s => s.name === stateName);
    return state?.id;
  }).filter(Boolean);
  
  return data.filter(insight => stateIds.includes(insight.stateId));
}

/**
 * Checks if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.states.length > 0 ||
    filters.districts.length > 0 ||
    filters.blocks.length > 0 ||
    filters.subjects.length > 0 ||
    filters.grades.length > 0 ||
    filters.visitTypes.length > 0 ||
    filters.academicYears.length > 0 ||
    filters.months.length > 0 ||
    filters.weeks.length > 0 ||
    filters.staffNames.length > 0 ||
    filters.designations.length > 0 ||
    filters.periods.length > 0 ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null
  );
}

/**
 * Get active filter summary text
 */
export function getActiveFilterSummary(filters: FilterState): string {
  const parts: string[] = [];
  
  if (filters.states.length > 0) {
    parts.push(`States: ${filters.states.join(', ')}`);
  }
  if (filters.districts.length > 0) {
    parts.push(`Districts: ${filters.districts.join(', ')}`);
  }
  if (filters.subjects.length > 0) {
    parts.push(`Subjects: ${filters.subjects.join(', ')}`);
  }
  if (filters.months.length > 0) {
    parts.push(`Months: ${filters.months.join(', ')}`);
  }
  
  return parts.length > 0 ? parts.join(' | ') : 'All data';
}