import type {
  LocationHierarchy,
  StateKPIData,
  LiteracyPracticeData,
  NumeracyPracticeData,
  StateInsight,
  TargetThreshold,
  KPIDefinition,
  HighlightMetric,
} from '@/types/dashboard';

// KPI Definitions
export const kpiDefinitions: KPIDefinition[] = [
  { id: 'attendance', name: 'Student Attendance %', category: 'general' },
  { id: 'joint_visit', name: 'Joint Visit %', category: 'general' },
  { id: 'tg_availability', name: 'TG Availability %', category: 'general' },
  { id: 'tg_followed', name: 'TG Followed (All Steps) %', category: 'general' },
  { id: 'tg_partial', name: 'TG Partial Followed %', category: 'general' },
  { id: 'assessment_tracker', name: 'Assessment Tracker %', category: 'general' },
  { id: 'tlm_usage', name: 'Teaching Learning Material Usage %', category: 'general' },
  { id: 'student_participation', name: 'Student Participation %', category: 'general' },
  { id: 'lit_pp1', name: 'PP1 - Higher-order Comprehension', category: 'literacy', shortCode: 'PP1' },
  { id: 'lit_pp2', name: 'PP2 - Reading Graded Texts', category: 'literacy', shortCode: 'PP2' },
  { id: 'lit_pp3', name: 'PP3 - Reading Comprehension Strategies', category: 'literacy', shortCode: 'PP3' },
  { id: 'lit_pp4', name: 'PP4 - Writing Feedback', category: 'literacy', shortCode: 'PP4' },
  { id: 'lit_gp1', name: 'GP1 - Checks for Understanding', category: 'literacy', shortCode: 'GP1' },
  { id: 'lit_gp2', name: 'GP2 - Home Languages', category: 'literacy', shortCode: 'GP2' },
  { id: 'num_pp1', name: 'PP1 - Concrete Materials', category: 'numeracy', shortCode: 'PP1' },
  { id: 'num_pp2', name: 'PP2 - Real-life Experiences', category: 'numeracy', shortCode: 'PP2' },
  { id: 'num_pp3', name: 'PP3 - Practice Opportunities', category: 'numeracy', shortCode: 'PP3' },
  { id: 'num_pp4', name: 'PP4 - Explain Solutions', category: 'numeracy', shortCode: 'PP4' },
  { id: 'num_gp1', name: 'GP1 - Checks for Understanding', category: 'numeracy', shortCode: 'GP1' },
  { id: 'num_gp2', name: 'GP2 - Home Languages', category: 'numeracy', shortCode: 'GP2' },
];

// Location Hierarchy
export const locationHierarchy: LocationHierarchy = {
  states: [
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      districts: [
        {
          id: 'jaipur',
          name: 'Jaipur',
          stateId: 'rajasthan',
          blocks: [
            { id: 'amber', name: 'Amber', districtId: 'jaipur', clusters: [
              { id: 'amber-c1', name: 'Cluster 1', blockId: 'amber', schools: [
                { id: 'amber-s1', name: 'Govt. Primary School Amber', clusterId: 'amber-c1' },
                { id: 'amber-s2', name: 'Govt. Upper Primary Amber', clusterId: 'amber-c1' },
              ]},
            ]},
            { id: 'sanganer', name: 'Sanganer', districtId: 'jaipur', clusters: [] },
          ],
        },
        { id: 'jodhpur', name: 'Jodhpur', stateId: 'rajasthan', blocks: [] },
        { id: 'udaipur', name: 'Udaipur', stateId: 'rajasthan', blocks: [] },
      ],
    },
    {
      id: 'uttar_pradesh',
      name: 'Uttar Pradesh',
      districts: [
        { id: 'lucknow', name: 'Lucknow', stateId: 'uttar_pradesh', blocks: [] },
        { id: 'varanasi', name: 'Varanasi', stateId: 'uttar_pradesh', blocks: [] },
        { id: 'agra', name: 'Agra', stateId: 'uttar_pradesh', blocks: [] },
      ],
    },
    {
      id: 'haryana',
      name: 'Haryana',
      districts: [
        { id: 'gurugram', name: 'Gurugram', stateId: 'haryana', blocks: [] },
        { id: 'faridabad', name: 'Faridabad', stateId: 'haryana', blocks: [] },
        { id: 'hisar', name: 'Hisar', stateId: 'haryana', blocks: [] },
      ],
    },
    {
      id: 'chhattisgarh',
      name: 'Chhattisgarh',
      districts: [
        { id: 'raipur', name: 'Raipur', stateId: 'chhattisgarh', blocks: [] },
        { id: 'bilaspur', name: 'Bilaspur', stateId: 'chhattisgarh', blocks: [] },
        { id: 'durg', name: 'Durg', stateId: 'chhattisgarh', blocks: [] },
      ],
    },
    {
      id: 'jharkhand',
      name: 'Jharkhand',
      districts: [
        { id: 'ranchi', name: 'Ranchi', stateId: 'jharkhand', blocks: [] },
        { id: 'jamshedpur', name: 'Jamshedpur', stateId: 'jharkhand', blocks: [] },
        { id: 'dhanbad', name: 'Dhanbad', stateId: 'jharkhand', blocks: [] },
      ],
    },
  ],
};

// State KPI Data
export const stateKPIData: StateKPIData[] = [
  {
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    totalCRO: 2456,
    avgEnrollment: 42,
    studentAttendance: 78,
    jointVisit: 65,
    tgAvailability: 82,
    tgFollowed: 71,
    tgPartialFollowed: 18,
    assessmentTracker: 68,
    tlmUsage: 74,
    studentParticipation: 76,
  },
  {
    stateId: 'uttar_pradesh',
    stateName: 'Uttar Pradesh',
    totalCRO: 3892,
    avgEnrollment: 56,
    studentAttendance: 72,
    jointVisit: 58,
    tgAvailability: 76,
    tgFollowed: 64,
    tgPartialFollowed: 22,
    assessmentTracker: 62,
    tlmUsage: 68,
    studentParticipation: 70,
  },
  {
    stateId: 'haryana',
    stateName: 'Haryana',
    totalCRO: 1876,
    avgEnrollment: 38,
    studentAttendance: 81,
    jointVisit: 72,
    tgAvailability: 85,
    tgFollowed: 76,
    tgPartialFollowed: 15,
    assessmentTracker: 74,
    tlmUsage: 79,
    studentParticipation: 82,
  },
  {
    stateId: 'chhattisgarh',
    stateName: 'Chhattisgarh',
    totalCRO: 1543,
    avgEnrollment: 34,
    studentAttendance: 68,
    jointVisit: 52,
    tgAvailability: 71,
    tgFollowed: 58,
    tgPartialFollowed: 28,
    assessmentTracker: 56,
    tlmUsage: 62,
    studentParticipation: 64,
  },
  {
    stateId: 'jharkhand',
    stateName: 'Jharkhand',
    totalCRO: 1234,
    avgEnrollment: 31,
    studentAttendance: 65,
    jointVisit: 48,
    tgAvailability: 68,
    tgFollowed: 54,
    tgPartialFollowed: 32,
    assessmentTracker: 52,
    tlmUsage: 58,
    studentParticipation: 61,
  },
];

// Literacy Practice Data by District
export const literacyPracticeData: LiteracyPracticeData[] = [
  { districtId: 'jaipur', districtName: 'Jaipur', stateId: 'rajasthan', pp1: 72, pp2: 78, pp3: 68, pp4: 74, gp1: 81, gp2: 65 },
  { districtId: 'jodhpur', districtName: 'Jodhpur', stateId: 'rajasthan', pp1: 68, pp2: 74, pp3: 62, pp4: 70, gp1: 76, gp2: 58 },
  { districtId: 'udaipur', districtName: 'Udaipur', stateId: 'rajasthan', pp1: 65, pp2: 71, pp3: 58, pp4: 66, gp1: 72, gp2: 54 },
  { districtId: 'lucknow', districtName: 'Lucknow', stateId: 'uttar_pradesh', pp1: 64, pp2: 70, pp3: 56, pp4: 62, gp1: 74, gp2: 52 },
  { districtId: 'varanasi', districtName: 'Varanasi', stateId: 'uttar_pradesh', pp1: 61, pp2: 67, pp3: 54, pp4: 59, gp1: 71, gp2: 48 },
  { districtId: 'agra', districtName: 'Agra', stateId: 'uttar_pradesh', pp1: 58, pp2: 64, pp3: 51, pp4: 56, gp1: 68, gp2: 45 },
  { districtId: 'gurugram', districtName: 'Gurugram', stateId: 'haryana', pp1: 78, pp2: 84, pp3: 72, pp4: 79, gp1: 86, gp2: 68 },
  { districtId: 'faridabad', districtName: 'Faridabad', stateId: 'haryana', pp1: 74, pp2: 80, pp3: 68, pp4: 75, gp1: 82, gp2: 64 },
  { districtId: 'hisar', districtName: 'Hisar', stateId: 'haryana', pp1: 70, pp2: 76, pp3: 64, pp4: 71, gp1: 78, gp2: 60 },
  { districtId: 'raipur', districtName: 'Raipur', stateId: 'chhattisgarh', pp1: 56, pp2: 62, pp3: 48, pp4: 54, gp1: 66, gp2: 42 },
  { districtId: 'bilaspur', districtName: 'Bilaspur', stateId: 'chhattisgarh', pp1: 52, pp2: 58, pp3: 44, pp4: 50, gp1: 62, gp2: 38 },
  { districtId: 'durg', districtName: 'Durg', stateId: 'chhattisgarh', pp1: 54, pp2: 60, pp3: 46, pp4: 52, gp1: 64, gp2: 40 },
  { districtId: 'ranchi', districtName: 'Ranchi', stateId: 'jharkhand', pp1: 54, pp2: 60, pp3: 46, pp4: 52, gp1: 64, gp2: 40 },
  { districtId: 'jamshedpur', districtName: 'Jamshedpur', stateId: 'jharkhand', pp1: 52, pp2: 58, pp3: 44, pp4: 50, gp1: 62, gp2: 38 },
  { districtId: 'dhanbad', districtName: 'Dhanbad', stateId: 'jharkhand', pp1: 48, pp2: 54, pp3: 40, pp4: 46, gp1: 58, gp2: 34 },
];

// Numeracy Practice Data by District
export const numeracyPracticeData: NumeracyPracticeData[] = [
  { districtId: 'jaipur', districtName: 'Jaipur', stateId: 'rajasthan', pp1: 74, pp2: 76, pp3: 70, pp4: 72, gp1: 79, gp2: 62 },
  { districtId: 'jodhpur', districtName: 'Jodhpur', stateId: 'rajasthan', pp1: 70, pp2: 72, pp3: 66, pp4: 68, gp1: 75, gp2: 58 },
  { districtId: 'udaipur', districtName: 'Udaipur', stateId: 'rajasthan', pp1: 66, pp2: 68, pp3: 62, pp4: 64, gp1: 71, gp2: 54 },
  { districtId: 'lucknow', districtName: 'Lucknow', stateId: 'uttar_pradesh', pp1: 62, pp2: 68, pp3: 58, pp4: 64, gp1: 72, gp2: 50 },
  { districtId: 'varanasi', districtName: 'Varanasi', stateId: 'uttar_pradesh', pp1: 58, pp2: 64, pp3: 54, pp4: 60, gp1: 68, gp2: 46 },
  { districtId: 'agra', districtName: 'Agra', stateId: 'uttar_pradesh', pp1: 55, pp2: 61, pp3: 51, pp4: 57, gp1: 65, gp2: 43 },
  { districtId: 'gurugram', districtName: 'Gurugram', stateId: 'haryana', pp1: 80, pp2: 82, pp3: 76, pp4: 78, gp1: 85, gp2: 66 },
  { districtId: 'faridabad', districtName: 'Faridabad', stateId: 'haryana', pp1: 76, pp2: 78, pp3: 72, pp4: 74, gp1: 81, gp2: 62 },
  { districtId: 'hisar', districtName: 'Hisar', stateId: 'haryana', pp1: 72, pp2: 74, pp3: 68, pp4: 70, gp1: 77, gp2: 58 },
  { districtId: 'raipur', districtName: 'Raipur', stateId: 'chhattisgarh', pp1: 54, pp2: 60, pp3: 48, pp4: 54, gp1: 64, gp2: 40 },
  { districtId: 'bilaspur', districtName: 'Bilaspur', stateId: 'chhattisgarh', pp1: 50, pp2: 56, pp3: 44, pp4: 50, gp1: 60, gp2: 36 },
  { districtId: 'durg', districtName: 'Durg', stateId: 'chhattisgarh', pp1: 52, pp2: 58, pp3: 46, pp4: 52, gp1: 62, gp2: 38 },
  { districtId: 'ranchi', districtName: 'Ranchi', stateId: 'jharkhand', pp1: 52, pp2: 58, pp3: 46, pp4: 52, gp1: 62, gp2: 38 },
  { districtId: 'jamshedpur', districtName: 'Jamshedpur', stateId: 'jharkhand', pp1: 50, pp2: 56, pp3: 44, pp4: 50, gp1: 60, gp2: 36 },
  { districtId: 'dhanbad', districtName: 'Dhanbad', stateId: 'jharkhand', pp1: 46, pp2: 52, pp3: 40, pp4: 46, gp1: 56, gp2: 32 },
];

// State Insights
export const stateInsights: StateInsight[] = [
  {
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    totalVisits: 2456,
    studentParticipation: 76,
    literacyObservations: 1423,
    numeracyObservations: 1033,
    literacyPractices: { pp1: 68, pp2: 74, pp3: 63, pp4: 70 },
    numeracyPractices: { pp1: 70, pp2: 72, pp3: 66, pp4: 68 },
  },
  {
    stateId: 'uttar_pradesh',
    stateName: 'Uttar Pradesh',
    totalVisits: 3892,
    studentParticipation: 70,
    literacyObservations: 2234,
    numeracyObservations: 1658,
    literacyPractices: { pp1: 61, pp2: 67, pp3: 54, pp4: 59 },
    numeracyPractices: { pp1: 58, pp2: 64, pp3: 54, pp4: 60 },
  },
  {
    stateId: 'haryana',
    stateName: 'Haryana',
    totalVisits: 1876,
    studentParticipation: 82,
    literacyObservations: 1087,
    numeracyObservations: 789,
    literacyPractices: { pp1: 74, pp2: 80, pp3: 68, pp4: 75 },
    numeracyPractices: { pp1: 76, pp2: 78, pp3: 72, pp4: 74 },
  },
  {
    stateId: 'chhattisgarh',
    stateName: 'Chhattisgarh',
    totalVisits: 1543,
    studentParticipation: 64,
    literacyObservations: 892,
    numeracyObservations: 651,
    literacyPractices: { pp1: 54, pp2: 60, pp3: 46, pp4: 52 },
    numeracyPractices: { pp1: 52, pp2: 58, pp3: 46, pp4: 52 },
  },
  {
    stateId: 'jharkhand',
    stateName: 'Jharkhand',
    totalVisits: 1234,
    studentParticipation: 61,
    literacyObservations: 714,
    numeracyObservations: 520,
    literacyPractices: { pp1: 51, pp2: 57, pp3: 43, pp4: 49 },
    numeracyPractices: { pp1: 49, pp2: 55, pp3: 43, pp4: 49 },
  },
];

// Default Global Targets
export const defaultTargets: TargetThreshold[] = [
  { id: 't1', level: 'global', locationId: null, locationName: 'Global', kpiId: 'attendance', kpiName: 'Student Attendance %', greenMin: 75, yellowMin: 50, yellowMax: 74, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't2', level: 'global', locationId: null, locationName: 'Global', kpiId: 'joint_visit', kpiName: 'Joint Visit %', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't3', level: 'global', locationId: null, locationName: 'Global', kpiId: 'tg_availability', kpiName: 'TG Availability %', greenMin: 80, yellowMin: 60, yellowMax: 79, redMax: 59, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't4', level: 'global', locationId: null, locationName: 'Global', kpiId: 'tg_followed', kpiName: 'TG Followed (All Steps) %', greenMin: 75, yellowMin: 50, yellowMax: 74, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't5', level: 'global', locationId: null, locationName: 'Global', kpiId: 'tg_partial', kpiName: 'TG Partial Followed %', greenMin: 75, yellowMin: 50, yellowMax: 74, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't6', level: 'global', locationId: null, locationName: 'Global', kpiId: 'assessment_tracker', kpiName: 'Assessment Tracker %', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't7', level: 'global', locationId: null, locationName: 'Global', kpiId: 'tlm_usage', kpiName: 'TLM Usage %', greenMin: 75, yellowMin: 50, yellowMax: 74, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't8', level: 'global', locationId: null, locationName: 'Global', kpiId: 'student_participation', kpiName: 'Student Participation %', greenMin: 75, yellowMin: 50, yellowMax: 74, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  // Literacy practices
  { id: 't9', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_pp1', kpiName: 'PP1 - Higher-order Comprehension', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't10', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_pp2', kpiName: 'PP2 - Reading Graded Texts', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't11', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_pp3', kpiName: 'PP3 - Reading Comprehension', greenMin: 65, yellowMin: 45, yellowMax: 64, redMax: 44, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't12', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_pp4', kpiName: 'PP4 - Writing Feedback', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't13', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_gp1', kpiName: 'GP1 - Checks Understanding', greenMin: 75, yellowMin: 55, yellowMax: 74, redMax: 54, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't14', level: 'global', locationId: null, locationName: 'Global', kpiId: 'lit_gp2', kpiName: 'GP2 - Home Languages', greenMin: 60, yellowMin: 40, yellowMax: 59, redMax: 39, createdAt: '2024-01-01', createdBy: 'System' },
  // Numeracy practices
  { id: 't15', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_pp1', kpiName: 'PP1 - Concrete Materials', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't16', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_pp2', kpiName: 'PP2 - Real-life Experiences', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't17', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_pp3', kpiName: 'PP3 - Practice Opportunities', greenMin: 65, yellowMin: 45, yellowMax: 64, redMax: 44, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't18', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_pp4', kpiName: 'PP4 - Explain Solutions', greenMin: 70, yellowMin: 50, yellowMax: 69, redMax: 49, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't19', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_gp1', kpiName: 'GP1 - Checks Understanding', greenMin: 75, yellowMin: 55, yellowMax: 74, redMax: 54, createdAt: '2024-01-01', createdBy: 'System' },
  { id: 't20', level: 'global', locationId: null, locationName: 'Global', kpiId: 'num_gp2', kpiName: 'GP2 - Home Languages', greenMin: 60, yellowMin: 40, yellowMax: 59, redMax: 39, createdAt: '2024-01-01', createdBy: 'System' },
];

// Highlight Metrics
export const highlightMetrics: HighlightMetric[] = [
  { id: 'total_cro', label: 'Total Classroom Observations', value: 11001, type: 'number' },
  { id: 'avg_enrollment_high', label: 'Average Enrollment', value: 56, subLabel: 'Highest: Uttar Pradesh', type: 'number' },
  { id: 'avg_enrollment_low', label: 'Average Enrollment', value: 31, subLabel: 'Lowest: Jharkhand', type: 'number' },
  { id: 'attendance', label: 'Avg Student Attendance', value: 72.8, type: 'percentage', color: 'yellow' },
  { id: 'joint_visit_high', label: 'Joint Visit', value: 72, subLabel: 'Highest: Gurugram', type: 'percentage', color: 'green' },
  { id: 'joint_visit_low', label: 'Joint Visit', value: 48, subLabel: 'Lowest: Dhanbad', type: 'percentage', color: 'red' },
  { id: 'tg_availability', label: 'TG Availability', value: 76.4, subLabel: '68% Soft / 32% Hard Copy', type: 'percentage', color: 'green' },
  { id: 'tg_followed', label: 'TG Followed (All Steps)', value: 64.6, trend: 8.2, type: 'percentage', color: 'yellow' },
  { id: 'assessment_tracker', label: 'Assessment Tracker', value: 62.4, trend: 5.6, type: 'percentage', color: 'yellow' },
  { id: 'tlm_usage', label: 'TLM Usage', value: 68.2, type: 'percentage', color: 'yellow' },
  { id: 'student_participation', label: 'Student Participation', value: 70.6, type: 'percentage', color: 'yellow' },
];

// Filter Options
export const filterOptions = {
  academicYears: ['2023-24', '2024-25', '2025-26'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  subjects: ['Literacy', 'Numeracy', 'EVS', 'English'],
  grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
  visitTypes: ['Regular', 'Joint Visit', 'Surprise Visit', 'Follow-up'],
  periods: ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'],
  designations: ['Block Resource Person', 'Cluster Resource Person', 'District Coordinator', 'State Coordinator'],
  staffNames: ['Amit Kumar', 'Priya Singh', 'Rajesh Sharma', 'Sunita Verma', 'Vikash Gupta'],
};
