import { DashboardHeader } from './DashboardHeader';
import { HighlightsSection } from './HighlightsSection';
import { StateKPITable } from './StateKPITable';
import { LiteracyPracticesTable } from './LiteracyPracticesTable';
import { NumeracyPracticesTable } from './NumeracyPracticesTable';
import { StateInsightsSection } from './StateInsightsSection';
import { AdminPanel } from './AdminPanel';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <AdminPanel />

      <main className="container py-6 space-y-8">
        {/* Export Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
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
          <p className="mt-1">© 2024 All rights reserved</p>
        </footer>
      </main>
    </div>
  );
}
