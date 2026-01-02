import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Plus, Download, Upload, History, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { kpiDefinitions, locationHierarchy } from '@/data/mockData';
import type { TargetLevel, TargetThreshold } from '@/types/dashboard';

export function AdminPanel() {
  const { isAdminPanelOpen, setAdminPanelOpen, targets, addTarget, updateTarget, deleteTarget } = useDashboardStore();
  const [activeTab, setActiveTab] = useState('configure');
  const [editingTarget, setEditingTarget] = useState<TargetThreshold | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for new/edit target
  const [formLevel, setFormLevel] = useState<TargetLevel>('global');
  const [formLocationId, setFormLocationId] = useState<string>('');
  const [formKpiId, setFormKpiId] = useState<string>('');
  const [formGreenMin, setFormGreenMin] = useState<number>(75);
  const [formYellowMin, setFormYellowMin] = useState<number>(50);
  const [formYellowMax, setFormYellowMax] = useState<number>(74);

  const resetForm = () => {
    setFormLevel('global');
    setFormLocationId('');
    setFormKpiId('');
    setFormGreenMin(75);
    setFormYellowMin(50);
    setFormYellowMax(74);
    setEditingTarget(null);
  };

  const handleEditTarget = (target: TargetThreshold) => {
    setEditingTarget(target);
    setFormLevel(target.level);
    setFormLocationId(target.locationId || '');
    setFormKpiId(target.kpiId);
    setFormGreenMin(target.greenMin);
    setFormYellowMin(target.yellowMin);
    setFormYellowMax(target.yellowMax);
    setActiveTab('configure');
  };

  const handleSaveTarget = () => {
    const kpi = kpiDefinitions.find(k => k.id === formKpiId);
    if (!kpi) return;

    let locationName = 'Global';
    if (formLevel === 'state') {
      locationName = locationHierarchy.states.find(s => s.id === formLocationId)?.name || formLocationId;
    } else if (formLevel === 'district') {
      for (const state of locationHierarchy.states) {
        const district = state.districts.find(d => d.id === formLocationId);
        if (district) {
          locationName = district.name;
          break;
        }
      }
    } else if (formLevel === 'block') {
      for (const state of locationHierarchy.states) {
        for (const district of state.districts) {
          const block = district.blocks.find(b => b.id === formLocationId);
          if (block) {
            locationName = block.name;
            break;
          }
        }
      }
    }

    const targetData: TargetThreshold = {
      id: editingTarget?.id || `t${Date.now()}`,
      level: formLevel,
      locationId: formLevel === 'global' ? null : formLocationId,
      locationName,
      kpiId: formKpiId,
      kpiName: kpi.name,
      greenMin: formGreenMin,
      yellowMin: formYellowMin,
      yellowMax: formYellowMax,
      redMax: formYellowMin - 1,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'Admin',
    };

    if (editingTarget) {
      updateTarget(editingTarget.id, targetData);
    } else {
      addTarget(targetData);
    }

    resetForm();
  };

  const getLocationOptions = () => {
    switch (formLevel) {
      case 'state':
        return locationHierarchy.states.map(s => ({ id: s.id, name: s.name }));
      case 'district':
        return locationHierarchy.states.flatMap(s => 
          s.districts.map(d => ({ id: d.id, name: `${d.name} (${s.name})` }))
        );
      case 'block':
        return locationHierarchy.states.flatMap(s =>
          s.districts.flatMap(d =>
            d.blocks.map(b => ({ id: b.id, name: `${b.name} (${d.name}, ${s.name})` }))
          )
        );
      default:
        return [];
    }
  };

  const filteredTargets = targets.filter(t =>
    t.kpiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const levelColors: Record<TargetLevel, string> = {
    global: 'bg-primary/10 text-primary',
    state: 'bg-accent/10 text-accent',
    district: 'bg-status-yellow-bg text-status-yellow',
    block: 'bg-status-green-bg text-status-green',
  };

  return (
    <Dialog open={isAdminPanelOpen} onOpenChange={setAdminPanelOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-display">Admin Settings</DialogTitle>
              <DialogDescription>Manage performance targets and thresholds</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 border-b">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger value="configure" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Configure Targets
              </TabsTrigger>
              <TabsTrigger value="manage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                <Pencil className="w-4 h-4 mr-2" />
                Manage Targets
              </TabsTrigger>
              <TabsTrigger value="bulk" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent">
                <History className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(90vh-200px)]">
            {/* Configure Targets Tab */}
            <TabsContent value="configure" className="p-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingTarget ? 'Edit Target' : 'Create New Target'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Level Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Level</Label>
                      <Select value={formLevel} onValueChange={(v) => {
                        setFormLevel(v as TargetLevel);
                        setFormLocationId('');
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global (Default)</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="district">District</SelectItem>
                          <SelectItem value="block">Block</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formLevel !== 'global' && (
                      <div className="space-y-2">
                        <Label>Select {formLevel.charAt(0).toUpperCase() + formLevel.slice(1)}</Label>
                        <Select value={formLocationId} onValueChange={setFormLocationId}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${formLevel}...`} />
                          </SelectTrigger>
                          <SelectContent>
                            {getLocationOptions().map(loc => (
                              <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* KPI Selection */}
                  <div className="space-y-2">
                    <Label>Select KPI / Metric</Label>
                    <Select value={formKpiId} onValueChange={setFormKpiId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select KPI..." />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">General</div>
                        {kpiDefinitions.filter(k => k.category === 'general').map(kpi => (
                          <SelectItem key={kpi.id} value={kpi.id}>{kpi.name}</SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Literacy</div>
                        {kpiDefinitions.filter(k => k.category === 'literacy').map(kpi => (
                          <SelectItem key={kpi.id} value={kpi.id}>{kpi.name}</SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Numeracy</div>
                        {kpiDefinitions.filter(k => k.category === 'numeracy').map(kpi => (
                          <SelectItem key={kpi.id} value={kpi.id}>{kpi.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Threshold Settings */}
                  <div className="p-4 rounded-lg border bg-muted/30 space-y-4">
                    <h4 className="font-medium">Threshold Configuration</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-status-green" />
                          Green (Good): ≥
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={formGreenMin}
                            onChange={(e) => setFormGreenMin(Number(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-status-yellow" />
                          Yellow (Average):
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={formYellowMin}
                            onChange={(e) => setFormYellowMin(Number(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="number"
                            value={formYellowMax}
                            onChange={(e) => setFormYellowMax(Number(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-status-red" />
                          Red (Below): &lt;
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={formYellowMin}
                            disabled
                            className="w-20 bg-muted"
                          />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button onClick={handleSaveTarget} disabled={!formKpiId || (formLevel !== 'global' && !formLocationId)}>
                      {editingTarget ? 'Update Target' : 'Save Target'}
                    </Button>
                    {editingTarget && (
                      <Button variant="outline" onClick={resetForm}>
                        Cancel Edit
                      </Button>
                    )}
                    <Button variant="ghost" onClick={resetForm}>
                      Use Global Default
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Manage Targets Tab */}
            <TabsContent value="manage" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search targets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Badge variant="outline">{filteredTargets.length} targets</Badge>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-table-header">
                        <TableHead>Location</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>KPI</TableHead>
                        <TableHead className="text-center">Green</TableHead>
                        <TableHead className="text-center">Yellow</TableHead>
                        <TableHead className="text-center">Red</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTargets.map((target) => (
                        <TableRow key={target.id} className="hover:bg-table-hover">
                          <TableCell className="font-medium">{target.locationName}</TableCell>
                          <TableCell>
                            <Badge className={cn("text-xs", levelColors[target.level])}>
                              {target.level.charAt(0).toUpperCase() + target.level.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{target.kpiName}</TableCell>
                          <TableCell className="text-center">
                            <span className="status-green px-2 py-0.5 rounded text-xs font-medium">
                              ≥{target.greenMin}%
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="status-yellow px-2 py-0.5 rounded text-xs font-medium">
                              {target.yellowMin}-{target.yellowMax}%
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="status-red px-2 py-0.5 rounded text-xs font-medium">
                              &lt;{target.yellowMin}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEditTarget(target)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => deleteTarget(target.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Bulk Upload Tab */}
            <TabsContent value="bulk" className="p-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Upload Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-8 border-2 border-dashed rounded-lg text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your CSV/Excel file here, or click to browse
                    </p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Download the CSV template to see the required format
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="p-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Target History & Audit Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Created', target: 'Student Attendance (Global)', user: 'System', date: '2024-01-01' },
                      { action: 'Updated', target: 'TG Followed (Rajasthan)', user: 'Admin', date: '2024-06-15' },
                      { action: 'Created', target: 'Joint Visit (Jaipur)', user: 'Admin', date: '2024-08-20' },
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Badge variant={log.action === 'Created' ? 'default' : 'secondary'}>
                            {log.action}
                          </Badge>
                          <span className="font-medium">{log.target}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {log.user} • {log.date}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Export Audit Log
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
