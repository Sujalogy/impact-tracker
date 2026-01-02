import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboardStore } from '@/store/dashboardStore';
import { generateDashboardReport } from '@/utils/reportGenerator';
import { FileDown, FileText, Loader2, CheckCircle } from 'lucide-react';

interface DownloadReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadReportModal({ open, onOpenChange }: DownloadReportModalProps) {
  const { filters } = useDashboardStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [sections, setSections] = useState({
    highlights: true,
    stateKPI: true,
    literacyPractices: true,
    numeracyPractices: true,
    stateInsights: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setIsComplete(false);

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      generateDashboardReport(filters);
      setIsComplete(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsComplete(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getCurrentMonthYear = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <FileDown className="w-5 h-5 text-accent" />
            Download Report
          </DialogTitle>
          <DialogDescription>
            Generate and download the dashboard report for {getCurrentMonthYear()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Report Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as 'pdf' | 'excel')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF Document
                  </div>
                </SelectItem>
                <SelectItem value="excel" disabled>
                  <div className="flex items-center gap-2 opacity-50">
                    <FileText className="w-4 h-4" />
                    Excel Spreadsheet (Coming Soon)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Section Selection */}
          <div className="space-y-3">
            <Label>Include Sections</Label>
            <div className="space-y-2 rounded-lg border p-3 bg-muted/30">
              {[
                { key: 'highlights', label: 'Highlights Summary' },
                { key: 'stateKPI', label: 'State-wise KPI Comparison' },
                { key: 'literacyPractices', label: 'Prioritized Practices (Literacy)' },
                { key: 'numeracyPractices', label: 'Prioritized Practices (Numeracy)' },
                { key: 'stateInsights', label: 'State/District Insights' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={sections[key as keyof typeof sections]}
                    onCheckedChange={() => toggleSection(key as keyof typeof sections)}
                  />
                  <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Note */}
          {Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v)) && (
            <div className="text-xs text-muted-foreground p-3 rounded-lg bg-accent/10 border border-accent/20">
              <strong>Note:</strong> Report will include data based on your current filter selections.
            </div>
          )}

          {/* Preview Info */}
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="font-medium text-sm mb-2">Report Preview</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• LLF branded header with logo</p>
              <p>• Color-coded tables (Green/Yellow/Red)</p>
              <p>• Practice descriptions and legends</p>
              <p>• {Object.values(sections).filter(Boolean).length} sections selected</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isGenerating}>
            Cancel
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={isGenerating || Object.values(sections).every((v) => !v)}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : isComplete ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Downloaded!
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                Download Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
