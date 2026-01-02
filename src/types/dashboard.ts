// Dashboard Types

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
}

export interface LocationHierarchy {
  states: State[];
}

export interface State {
  id: string;
  name: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
  stateId: string;
  blocks: Block[];
}

export interface Block {
  id: string;
  name: string;
  districtId: string;
  clusters: Cluster[];
}

export interface Cluster {
  id: string;
  name: string;
  blockId: string;
  schools: School[];
}

export interface School {
  id: string;
  name: string;
  clusterId: string;
}

export type TargetLevel = 'global' | 'state' | 'district' | 'block';

export interface TargetThreshold {
  id: string;
  level: TargetLevel;
  locationId: string | null; // null for global
  locationName: string;
  kpiId: string;
  kpiName: string;
  greenMin: number;
  yellowMin: number;
  yellowMax: number;
  redMax: number;
  createdAt: string;
  createdBy: string;
}

export interface KPIDefinition {
  id: string;
  name: string;
  category: 'general' | 'literacy' | 'numeracy';
  shortCode?: string;
}

export interface StateKPIData {
  stateId: string;
  stateName: string;
  totalCRO: number;
  avgEnrollment: number;
  studentAttendance: number;
  jointVisit: number;
  tgAvailability: number;
  tgFollowed: number;
  tgPartialFollowed: number;
  assessmentTracker: number;
  tlmUsage: number;
  studentParticipation: number;
}

export interface LiteracyPracticeData {
  districtId: string;
  districtName: string;
  stateId: string;
  pp1: number; // Higher-order comprehension
  pp2: number; // Reading graded texts
  pp3: number; // Reading comprehension strategies
  pp4: number; // Writing feedback
  gp1: number; // Checks for understanding
  gp2: number; // Home languages
}

export interface NumeracyPracticeData {
  districtId: string;
  districtName: string;
  stateId: string;
  pp1: number; // Concrete materials
  pp2: number; // Real-life experiences
  pp3: number; // Practice opportunities
  pp4: number; // Explain solutions
  gp1: number; // Checks for understanding
  gp2: number; // Home languages
}

export interface StateInsight {
  stateId: string;
  stateName: string;
  totalVisits: number;
  studentParticipation: number;
  literacyObservations: number;
  numeracyObservations: number;
  literacyPractices: {
    pp1: number;
    pp2: number;
    pp3: number;
    pp4: number;
  };
  numeracyPractices: {
    pp1: number;
    pp2: number;
    pp3: number;
    pp4: number;
  };
}

export interface FilterState {
  academicYears: string[];
  months: string[];
  weeks: string[];
  dates: string[];
  dateRange: { start: string | null; end: string | null };
  states: string[];
  districts: string[];
  blocks: string[];
  clusters: string[];
  schools: string[];
  staffNames: string[];
  designations: string[];
  subjects: string[];
  grades: string[];
  visitTypes: string[];
  periods: string[];
}

export interface HighlightMetric {
  id: string;
  label: string;
  value: number | string;
  subLabel?: string;
  trend?: number; // YoY growth percentage
  type: 'number' | 'percentage';
  color?: 'green' | 'yellow' | 'red';
}
