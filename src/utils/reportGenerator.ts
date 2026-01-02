import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { stateKPIData, literacyPracticeData, numeracyPracticeData, stateInsights, highlightMetrics } from '@/data/mockData';
import type { FilterState } from '@/types/dashboard';

// Color definitions matching LLF brand
const COLORS = {
  primary: [30, 58, 95] as [number, number, number],
  accent: [32, 149, 142] as [number, number, number],
  headerBg: [254, 243, 199] as [number, number, number],
  headerText: [185, 28, 28] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  greenBg: [220, 252, 231] as [number, number, number],
  yellow: [234, 179, 8] as [number, number, number],
  yellowBg: [254, 249, 195] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  redBg: [254, 226, 226] as [number, number, number],
  tableBorder: [209, 213, 219] as [number, number, number],
  tableHeader: [254, 215, 170] as [number, number, number],
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
  // Create PDF in LANDSCAPE mode
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  const addNewPage = () => {
    doc.addPage('a4', 'l'); // landscape
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
    doc.setFillColor(...COLORS.primary);
    doc.roundedRect(x, y, 12, 12, 2, 2, 'F');
    doc.setTextColor(...COLORS.white);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('LLF', x + 6, y + 7, { align: 'center' });
    
    doc.setTextColor(...COLORS.accent);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('LANGUAGE and', x + 14, y + 4);
    doc.text('LEARNING', x + 14, y + 8);
    doc.text('FOUNDATION', x + 14, y + 12);
    doc.setTextColor(...COLORS.black);
  };

  const drawSectionHeader = (title: string, x: number, y: number, width: number) => {
    const headerHeight = 12;
    
    doc.setFillColor(...COLORS.headerBg);
    doc.roundedRect(x, y, width, headerHeight, 3, 3, 'F');
    
    doc.setDrawColor(...COLORS.headerText);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, y, width, headerHeight, 3, 3, 'S');
    
    doc.setTextColor(...COLORS.headerText);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + width / 2, y + 8, { align: 'center' });
    
    doc.setTextColor(...COLORS.black);
    return y + headerHeight + 5;
  };

  const drawColorLegend = (x: number, y: number) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    doc.setFillColor(...COLORS.green);
    doc.rect(x, y, 5, 5, 'F');
    doc.setTextColor(...COLORS.black);
    doc.text('Green denoting Good', x + 7, y + 3.5);
    
    doc.setFillColor(...COLORS.yellow);
    doc.rect(x + 60, y, 5, 5, 'F');
    doc.text('Yellow denoting Average', x + 67, y + 3.5);
    
    doc.setFillColor(...COLORS.red);
    doc.rect(x + 130, y, 5, 5, 'F');
    doc.text('Red denoting Below Average', x + 137, y + 3.5);
    
    doc.setTextColor(...COLORS.black);
    return y + 10;
  };

  // ===== PAGE 1: Highlights Summary =====
  drawLogo(margin, yPos);
  yPos = drawSectionHeader(
    `Highlights – ${getCurrentMonthYear()}`,
    margin + 60,
    yPos,
    pageWidth - margin * 2 - 60
  );

  // Highlights in a bordered box
  const boxStartY = yPos;
  doc.setDrawColor(...COLORS.gray);
  doc.setLineWidth(0.5);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const highlights = [
    `1. Total Classroom Observation (CRO) across the state is ${highlightMetrics[0].value.toLocaleString()}.`,
    `2. Average Enrollment is higher in Uttar Pradesh (${stateKPIData.find(s => s.stateId === 'uttar_pradesh')?.avgEnrollment}) and lowest in Jharkhand (${stateKPIData.find(s => s.stateId === 'jharkhand')?.avgEnrollment}).`,
    `3. Average Attendance of Students in the Classroom is 72%, Haryana leading with ${stateKPIData.find(s => s.stateId === 'haryana')?.studentAttendance}% and Jharkhand (${stateKPIData.find(s => s.stateId === 'jharkhand')?.studentAttendance}%).`,
    `4. Joint visit is higher in Haryana (72%) and lowest in Jharkhand (48%).`,
    `5. TG Availability in the classroom (in any form: soft or hard copy) is 76% across the state.`,
    `6. TG followed (all steps) is 65%, and year-on-year growth shows a significant positive jump of 8% points.`,
    `7. Assessment tracker completion is 62%. Year-on-year growth showing a significant jump of 6% points.`,
    `8. In Uttar Pradesh, Teaching learning material usage is ${stateKPIData.find(s => s.stateId === 'uttar_pradesh')?.tlmUsage}%.`,
    `9. Student participation in learning activities is 71%.`,
  ];

  highlights.forEach((text) => {
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - 10);
    doc.text(lines, margin + 5, yPos);
    yPos += lines.length * 5 + 2;
  });

  doc.roundedRect(margin, boxStartY - 3, pageWidth - margin * 2, yPos - boxStartY + 5, 3, 3, 'S');

  // ===== PAGE 2: State KPI Table (Landscape) =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader(
    `Highlights - ${getCurrentMonthYear()}`,
    margin + 60,
    yPos,
    pageWidth - margin * 2 - 60
  );

  autoTable(doc, {
    startY: yPos,
    head: [['KPIs', 'Rajasthan', 'Uttar Pradesh', 'Haryana', 'Chhattisgarh', 'Jharkhand']],
    body: [
      ['Total Classroom Observation', ...stateKPIData.map(s => s.totalCRO.toString())],
      ['Average Enrollment', ...stateKPIData.map(s => s.avgEnrollment.toString())],
      ['Student Present (Attendance %)', ...stateKPIData.map(s => `${s.studentAttendance}%`)],
      ['Joint Visit (%)', ...stateKPIData.map(s => `${s.jointVisit}%`)],
      ['TG "Availability" in Classroom', ...stateKPIData.map(s => `${s.tgAvailability}%`)],
      ['TG "Followed" (All Steps)', ...stateKPIData.map(s => `${s.tgFollowed}%`)],
      ['TG "Partial Followed"', ...stateKPIData.map(s => `${s.tgPartialFollowed}%`)],
      ['Assessment Tracker', ...stateKPIData.map(s => `${s.assessmentTracker}%`)],
      ['Teaching Learning Material (usage)', ...stateKPIData.map(s => `${s.tlmUsage}%`)],
      ['Student Participation', ...stateKPIData.map(s => `${s.studentParticipation}%`)],
    ],
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      halign: 'center',
      valign: 'middle',
      lineColor: COLORS.tableBorder,
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
      fontSize: 10,
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold', cellWidth: 60 },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 0) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
            data.cell.styles.textColor = status.text;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;
  drawColorLegend(pageWidth / 2 - 110, yPos);

  // ===== PAGE 3: Literacy Practices =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader(
    'Prioritized Practices in Literacy Classes',
    margin + 60,
    yPos,
    pageWidth - margin * 2 - 60
  );

  const literacyStates = Array.from(new Set(literacyPracticeData.map(d => d.stateId)))
    .slice(0, 4);
  
  const literacyTableData = literacyStates.flatMap(stateId => {
    const stateData = literacyPracticeData.filter(d => d.stateId === stateId);
    const stateName = stateData[0]?.districtName.split(' ')[0] || stateId;
    
    return stateData.slice(0, 3).map((d, idx) => [
      idx === 0 ? stateName : '',
      d.districtName,
      `${d.pp1}%`,
      `${d.pp2}%`,
      `${d.pp3}%`,
      `${d.pp4}%`,
      `${d.gp1}%`,
      `${d.gp2}%`,
    ]);
  });

  literacyTableData.push(['', 'Grand Total', '56%', '62%', '65%', '26%', '67%', '90%']);

  autoTable(doc, {
    startY: yPos,
    head: [['State', 'District/KPI', 'PP1', 'PP2', 'PP3', 'PP4', 'GP1', 'GP2']],
    body: literacyTableData,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      halign: 'center',
      lineColor: COLORS.tableBorder,
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold', cellWidth: 30 },
      1: { halign: 'left', fontStyle: 'bold', cellWidth: 50 },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 1) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
            data.cell.styles.textColor = status.text;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Practice descriptions
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const literacyDesc = [
    'PP1. Asking higher-order comprehension questions during conversations: OLD',
    'PP2. Guiding children in their reading of graded texts: READING',
    'PP3. Applying reading comprehension strategies (prediction, questioning, retelling) using graded text: DECODING',
    'PP4. Explaining writing tasks with examples and providing individual feedback on writing: WRITING',
    'GP1. Checks for understanding during and at the end of the lesson',
    'GP2. Encouraging/using children\'s home languages in the classrooms',
  ];

  const col1X = margin;
  const col2X = pageWidth / 2;
  literacyDesc.forEach((desc, idx) => {
    const x = idx < 3 ? col1X : col2X;
    const y = yPos + (idx % 3) * 4;
    doc.text(desc, x, y);
  });

  yPos += 15;
  drawColorLegend(pageWidth / 2 - 110, yPos);

  // ===== PAGE 4: Numeracy Practices =====
  addNewPage();
  drawLogo(margin, yPos);
  yPos = drawSectionHeader(
    'Prioritized Practices in Numeracy Classes',
    margin + 60,
    yPos,
    pageWidth - margin * 2 - 60
  );

  const numeracyStates = Array.from(new Set(numeracyPracticeData.map(d => d.stateId)))
    .slice(0, 4);
  
  const numeracyTableData = numeracyStates.flatMap(stateId => {
    const stateData = numeracyPracticeData.filter(d => d.stateId === stateId);
    const stateName = stateData[0]?.districtName.split(' ')[0] || stateId;
    
    return stateData.slice(0, 3).map((d, idx) => [
      idx === 0 ? stateName : '',
      d.districtName,
      `${d.pp1}%`,
      `${d.pp2}%`,
      `${d.pp3}%`,
      `${d.pp4}%`,
      `${d.gp1}%`,
      `${d.gp2}%`,
    ]);
  });

  numeracyTableData.push(['', 'Grand Total', '21%', '66%', '56%', '33%', '61%', '90%']);

  autoTable(doc, {
    startY: yPos,
    head: [['State', 'District/KPI', 'PP1', 'PP2', 'PP3', 'PP4', 'GP1', 'GP2']],
    body: numeracyTableData,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      halign: 'center',
      lineColor: COLORS.tableBorder,
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.black,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold', cellWidth: 30 },
      1: { halign: 'left', fontStyle: 'bold', cellWidth: 50 },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index > 1) {
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes('%')) {
          const value = parseInt(cellText.replace('%', ''));
          if (!isNaN(value)) {
            const status = getStatusColor(value);
            data.cell.styles.fillColor = status.bg;
            data.cell.styles.textColor = status.text;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  const numeracyDesc = [
    'PP1. Using concrete materials in teaching and learning mathematical concepts and processes',
    'PP2. Including children\'s real-life experiences to explain the concept',
    'PP3. Giving opportunities to children to practice mathematical tasks and provides feedback',
    'PP4. Asking children to explain the mathematical solution they have done and asking children "why" and "how" questions to deepen the concepts/processes/reasoning',
    'GP1. Checks for understanding during and/or at the end of the lesson',
    'GP2. Encouraging/using children\'s home languages in the classrooms',
  ];

  numeracyDesc.forEach((desc, idx) => {
    const x = idx < 3 ? col1X : col2X;
    const y = yPos + (idx % 3) * 4;
    doc.text(desc, x, y);
  });

  yPos += 15;
  drawColorLegend(pageWidth / 2 - 110, yPos);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray);
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pages} | Generated on ${new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      })} | Language & Learning Foundation`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  doc.save(`LLF_Dashboard_Report_${getCurrentMonthYear().replace(' ', '_')}.pdf`);
}