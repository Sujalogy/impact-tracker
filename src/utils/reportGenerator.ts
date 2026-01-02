import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { stateKPIData, literacyPracticeData, numeracyPracticeData, stateInsights, highlightMetrics, locationHierarchy } from '@/data/mockData';
import type { FilterState } from '@/types/dashboard';

// Color definitions matching LLF brand
const COLORS = {
  primary: [30, 58, 95] as [number, number, number], // Navy
  accent: [32, 149, 142] as [number, number, number], // Teal
  headerBg: [254, 243, 199] as [number, number, number], // Light cream/yellow
  headerText: [185, 28, 28] as [number, number, number], // Dark red
  green: [34, 197, 94] as [number, number, number],
  greenBg: [220, 252, 231] as [number, number, number],
  yellow: [234, 179, 8] as [number, number, number],
  yellowBg: [254, 249, 195] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  redBg: [254, 226, 226] as [number, number, number],
  tableBorder: [209, 213, 219] as [number, number, number],
  tableHeader: [254, 215, 170] as [number, number, number], // Light orange
  white: [255, 255, 255] as [number, number, number],
  black: [0, 0, 0] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
};

function getStatusColor(value: number): { bg: [number, number, number]; text: [number, number, number] } {
  if (value >= 75) return { bg: COLORS.greenBg, text: COLORS.green };
  if (value >= 50) return { bg: COLORS.yellowBg, text: COLORS.yellow };
  return { bg: COLORS.redBg, text: COLORS.red };
}

function getCurrentMonthYear(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function generateDashboardReport(filters: FilterState): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // Helper functions
  const addNewPage = () => {
    doc.addPage();
    yPos = margin;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - margin) {
      addNewPage();
      return true;
    }
    return false;
  };

  const drawLogo = (x: number, y: number) => {
    // Draw logo placeholder with text
    doc.setFillColor(...COLORS.primary);
    doc.roundedRect(x, y, 12, 12, 2, 2, 'F');
    doc.setTextColor(...COLORS.white);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('LLF', x + 6, y + 7, { align: 'center' });
    
    // Logo text
    doc.setTextColor(...COLORS.accent);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('LANGUAGE and', x + 14, y + 4);
    doc.text('LEARNING', x + 14, y + 8);
    doc.text('FOUNDATION', x + 14, y + 12);
    doc.setTextColor(...COLORS.black);
  };

  const drawSectionHeader = (title: string, x: number, y: number, width: number) => {
    const headerHeight = 10;
    
    // Header background with gradient effect
    doc.setFillColor(...COLORS.headerBg);
    doc.roundedRect(x, y, width, headerHeight, 3, 3, 'F');
    
    // Border
    doc.setDrawColor(...COLORS.accent);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, y, width, headerHeight, 3, 3, 'S');
    
    // Title text
    doc.setTextColor(...COLORS.headerText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + width / 2, y + 7, { align: 'center' });
    
    doc.setTextColor(...COLORS.black);
    return y + headerHeight + 5;
  };

  const drawColorLegend = (x: number, y: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    // Green
    doc.setFillColor(...COLORS.green);
    doc.rect(x, y, 4, 4, 'F');
    doc.setTextColor(...COLORS.green);
    doc.text('Green denoting Good', x + 6, y + 3);
    
    // Yellow
    doc.setFillColor(...COLORS.yellow);
    doc.rect(x + 45, y, 4, 4, 'F');
    doc.setTextColor(...COLORS.yellow);
    doc.text('Yellow denoting Average', x + 51, y + 3);
    
    // Red
    doc.setFillColor(...COLORS.red);
    doc.rect(x + 100, y, 4, 4, 'F');
    doc.setTextColor(...COLORS.red);
    doc.text('Red denoting Below Average', x + 106, y + 3);
    
    doc.setTextColor(...COLORS.black);
    return y + 8;
  };

  // ===== PAGE 1: Highlights Summary =====
  drawLogo(margin, yPos);
  
  // Header
  yPos = drawSectionHeader(`Highlights – ${getCurrentMonthYear()}`, margin + 50, yPos, pageWidth - margin * 2 - 50);
  yPos += 5;

  // Content box
  const contentBoxY = yPos;
  const highlights = [
    `Total Classroom Observation (CRO) across the state is ${highlightMetrics[0].value.toLocaleString()}.`,
    `Average Enrollment is higher in Uttar Pradesh (${stateKPIData.find(s => s.stateId === 'uttar_pradesh')?.avgEnrollment}) and lowest in Jharkhand (${stateKPIData.find(s => s.stateId === 'jharkhand')?.avgEnrollment}).`,
    `Average Attendance of Students in the Classroom is ${highlightMetrics.find(h => h.id === 'attendance')?.value}%, Haryana leading with ${stateKPIData.find(s => s.stateId === 'haryana')?.studentAttendance}% and Jharkhand (${stateKPIData.find(s => s.stateId === 'jharkhand')?.studentAttendance}%).`,
    `Joint visit is higher in Haryana (${stateKPIData.find(s => s.stateId === 'haryana')?.jointVisit}%) and lowest in Jharkhand (${stateKPIData.find(s => s.stateId === 'jharkhand')?.jointVisit}%).`,
    `TG Availability in the classroom (in any form: soft or hard copy) is ${highlightMetrics.find(h => h.id === 'tg_availability')?.value}% across the state.`,
    `TG followed (all steps) is ${highlightMetrics.find(h => h.id === 'tg_followed')?.value}%, and year-on-year growth shows a significant positive jump of ${highlightMetrics.find(h => h.id === 'tg_followed')?.trend}% points.`,
    `Assessment tracker completion is ${highlightMetrics.find(h => h.id === 'assessment_tracker')?.value}%. Year-on-year growth showing a significant jump of ${highlightMetrics.find(h => h.id === 'assessment_tracker')?.trend}% points.`,
    `In Uttar Pradesh, Teaching learning material usage is ${stateKPIData.find(s => s.stateId === 'uttar_pradesh')?.tlmUsage}%.`,
    `Student participation in learning activities is ${highlightMetrics.find(h => h.id === 'student_participation')?.value}%.`,
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  highlights.forEach((text, index) => {
    checkPageBreak(12);
    
    // Number
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}.`, margin + 5, yPos);
    
    // Text with wrapping
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - 15);
    
    // Highlight specific values with colors
    doc.text(lines, margin + 12, yPos);
    yPos += lines.length * 5 + 3;
  });

  // Draw box around content
  const contentBoxHeight = yPos - contentBoxY + 5;
  doc.setDrawColor(...COLORS.gray);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, contentBoxY - 5, pageWidth - margin * 2, contentBoxHeight, 3, 3, 'S');

  // ===== PAGE 2: State-wise KPI Table =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader(`Highlights - ${getCurrentMonthYear()}`, margin + 50, yPos, pageWidth - margin * 2 - 50);
  yPos += 5;

  // KPI Table
  const tableData = stateKPIData.map(state => [
    state.stateName.substring(0, 12),
    state.totalCRO.toString(),
    state.avgEnrollment.toString(),
    `${state.studentAttendance}%`,
    `${state.jointVisit}%`,
    `${state.tgAvailability}%`,
    `${state.tgFollowed}%`,
    `${state.tgPartialFollowed}%`,
    `${state.assessmentTracker}%`,
    `${state.tlmUsage}%`,
    `${state.studentParticipation}%`,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [[
      'KPIs',
      ...stateKPIData.map(s => s.stateName.substring(0, 10))
    ]],
    body: [
      ['Total CRO', ...stateKPIData.map(s => s.totalCRO.toString())],
      ['Avg Enrollment', ...stateKPIData.map(s => s.avgEnrollment.toString())],
      ['Attendance %', ...stateKPIData.map(s => `${s.studentAttendance}%`)],
      ['Joint Visit %', ...stateKPIData.map(s => `${s.jointVisit}%`)],
      ['TG Availability', ...stateKPIData.map(s => `${s.tgAvailability}%`)],
      ['TG Followed', ...stateKPIData.map(s => `${s.tgFollowed}%`)],
      ['TG Partial', ...stateKPIData.map(s => `${s.tgPartialFollowed}%`)],
      ['Assessment', ...stateKPIData.map(s => `${s.assessmentTracker}%`)],
      ['TLM Usage', ...stateKPIData.map(s => `${s.tlmUsage}%`)],
      ['Participation', ...stateKPIData.map(s => `${s.studentParticipation}%`)],
    ],
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 0) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;
  drawColorLegend(margin + 20, yPos);

  // ===== PAGE 3: Literacy Practices =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader('Prioritized Practices in Literacy Classes', margin + 50, yPos, pageWidth - margin * 2 - 50);
  yPos += 5;

  // Group literacy data by state for first state only (simplified)
  const literacyByDistrict = literacyPracticeData.slice(0, 5);
  
  autoTable(doc, {
    startY: yPos,
    head: [['District/KPI', 'PP1', 'PP2', 'PP3', 'PP4', 'GP1', 'GP2']],
    body: [
      ...literacyByDistrict.map(d => [
        d.districtName,
        `${d.pp1}%`,
        `${d.pp2}%`,
        `${d.pp3}%`,
        `${d.pp4}%`,
        `${d.gp1}%`,
        `${d.gp2}%`,
      ]),
      ['Grand Total', '56%', '62%', '65%', '26%', '67%', '90%'],
    ],
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      halign: 'center',
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 0) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // PP Descriptions
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const ppDescriptions = [
    'PP1. Asking higher-order comprehension questions during conversations: OLD',
    'PP2. Guiding children in their reading of graded texts: READING',
    'PP3. Applying reading comprehension strategies (prediction, questioning, retelling): DECODING',
    'PP4. Explaining writing tasks with examples and providing individual feedback: WRITING',
    'GP1. Checks for understanding during and at the end of the lesson',
    'GP2. Encouraging/using children\'s home languages in the classrooms',
  ];
  ppDescriptions.forEach(desc => {
    doc.text(desc, margin, yPos);
    yPos += 4;
  });

  yPos += 5;
  drawColorLegend(margin + 20, yPos);

  // ===== PAGE 4: Numeracy Practices =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader('Prioritized Practices in Numeracy Classes', margin + 50, yPos, pageWidth - margin * 2 - 50);
  yPos += 5;

  const numeracyByDistrict = numeracyPracticeData.slice(0, 5);

  autoTable(doc, {
    startY: yPos,
    head: [['District/KPI', 'PP1', 'PP2', 'PP3', 'PP4', 'GP1', 'GP2']],
    body: [
      ...numeracyByDistrict.map(d => [
        d.districtName,
        `${d.pp1}%`,
        `${d.pp2}%`,
        `${d.pp3}%`,
        `${d.pp4}%`,
        `${d.gp1}%`,
        `${d.gp2}%`,
      ]),
      ['Grand Total', '21%', '66%', '56%', '33%', '61%', '90%'],
    ],
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      halign: 'center',
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 0) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // PP Descriptions for Numeracy
  doc.setFontSize(7);
  const numDescriptions = [
    'PP1. Using concrete materials in teaching and learning mathematical concepts and processes',
    'PP2. Including children\'s real-life experiences to explain the concept',
    'PP3. Giving opportunities to children to practice mathematical tasks and provides feedback',
    'PP4. Asking children to explain the mathematical solution they have done and asking "why" and "how"',
    'GP1. Checks for understanding during and/or at the end of the lesson',
    'GP2. Encouraging/using children\'s home languages in the classrooms',
  ];
  numDescriptions.forEach(desc => {
    doc.text(desc, margin, yPos);
    yPos += 4;
  });

  yPos += 5;
  drawColorLegend(margin + 20, yPos);

  // ===== PAGE 5: State Insights =====
  stateInsights.forEach((state, index) => {
    if (index % 2 === 0) {
      addNewPage();
      drawLogo(margin, yPos);
    }
    
    yPos = drawSectionHeader(
      `In ${state.stateName}, Key Observations`,
      margin + 50,
      yPos,
      pageWidth - margin * 2 - 50
    );
    yPos += 5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const insights = [
      `Total visits in this period are ${state.totalVisits.toLocaleString()}.`,
      `Student participation in Classroom Activities: ${state.studentParticipation}%.`,
    ];

    insights.forEach((text, i) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${String.fromCharCode(97 + i)})`, margin + 5, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(text, margin + 12, yPos);
      yPos += 6;
    });

    // MLE Classes section
    yPos += 3;
    doc.setFont('helvetica', 'bold');
    doc.text(`MLE Classes (Total ${state.literacyObservations} Observations)`, margin + 5, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');

    const mleItems = [
      { label: 'Asking higher-order comprehension questions', value: state.literacyPractices.pp1, tag: 'OLD' },
      { label: 'Guiding children in reading of graded texts', value: state.literacyPractices.pp2, tag: 'READING' },
      { label: 'Applying reading comprehension strategies', value: state.literacyPractices.pp3, tag: 'DECODING' },
      { label: 'Explaining writing tasks with feedback on writing', value: state.literacyPractices.pp4, tag: 'WRITING' },
    ];

    mleItems.forEach((item, i) => {
      doc.text(`${String.fromCharCode(105 + i)}.`, margin + 8, yPos);
      doc.text(`${item.label} ${item.value}%.`, margin + 15, yPos);
      
      // Colored tag
      const status = getStatusColor(item.value);
      doc.setFillColor(...status.bg);
      const tagX = margin + 15 + doc.getTextWidth(`${item.label} ${item.value}%. `) + 2;
      doc.roundedRect(tagX, yPos - 3, doc.getTextWidth(item.tag) + 4, 5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text(item.tag, tagX + 2, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 5;
    });

    // Numeracy Classes section
    yPos += 3;
    doc.setFont('helvetica', 'bold');
    doc.text(`Numeracy Classes (Total ${state.numeracyObservations} Observations)`, margin + 5, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');

    const numItems = [
      { label: 'Using concrete materials in teaching', value: state.numeracyPractices.pp1 },
      { label: 'Including children\'s real-life experiences', value: state.numeracyPractices.pp2 },
      { label: 'Giving practice opportunities with feedback', value: state.numeracyPractices.pp3 },
      { label: 'Asking to explain solutions with "why" and "how"', value: state.numeracyPractices.pp4 },
    ];

    numItems.forEach((item, i) => {
      doc.text(`${String.fromCharCode(105 + i)}.`, margin + 8, yPos);
      doc.text(`${item.label} ${item.value}%.`, margin + 15, yPos);
      
      // Colored value highlight
      const status = getStatusColor(item.value);
      const valueX = margin + 15 + doc.getTextWidth(`${item.label} `);
      doc.setFillColor(...status.bg);
      doc.roundedRect(valueX - 1, yPos - 3, doc.getTextWidth(`${item.value}%`) + 2, 5, 1, 1, 'F');
      yPos += 5;
    });

    yPos += 15;
  });

  // Footer on last page
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray);
  doc.text(
    `Generated on ${new Date().toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })} | Language & Learning Foundation`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // Save the PDF
  doc.save(`LLF_Dashboard_Report_${getCurrentMonthYear().replace(' ', '_')}.pdf`);
}
