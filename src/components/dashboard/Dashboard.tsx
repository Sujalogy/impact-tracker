import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { HighlightsSection } from './HighlightsSection';
import { StateKPITable } from './StateKPITable';
import { LiteracyPracticesTable } from './LiteracyPracticesTable';
import { NumeracyPracticesTable } from './NumeracyPracticesTable';
import { StateInsightsSection } from './StateInsightsSection';
import { AdminPanel } from './AdminPanel';
import { DownloadReportModal } from './DownloadReportModal';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export function Dashboard() {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <AdminPanel />
      <DownloadReportModal open={isReportModalOpen} onOpenChange={setReportModalOpen} />

      <main className="container py-6 space-y-8">
        {/* Export Button */}
        <div className="flex justify-end">
          <Button 
            onClick={() => setReportModalOpen(true)}
            className="gap-2 gradient-accent text-accent-foreground shadow-md hover:opacity-90"
          >
            <FileDown className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        <HighlightsSection />
        <StateKPITable />
        <LiteracyPracticesTable />
        <NumeracyPracticesTable />
        <StateInsightsSection />

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-sm text-muted-foreground border-t">
          <p>Language & Learning Foundation • Educational Monitoring Dashboard</p>
          <p className="mt-1">© 2025 All rights reserved</p>
        </footer>
      </main>
    </div>
  );
}
