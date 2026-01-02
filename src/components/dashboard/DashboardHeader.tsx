import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { BookOpen, Settings, LogOut } from 'lucide-react';
import { DashboardFilters } from './DashboardFilters';

export function DashboardHeader() {
  const { user, logout, setAdminPanelOpen } = useDashboardStore();

  return (
    <header className="sticky top-0 z-50 gradient-header border-b border-primary/20">
      <div className="px-4 lg:px-6">
        {/* Top Row - Logo and Actions */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-accent shadow-sm">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-display font-semibold text-header-foreground">
                Language & Learning Foundation
              </h1>
              <p className="text-xs text-header-foreground/70">
                Educational Monitoring Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-header-foreground/10">
              <span className="text-sm text-header-foreground/70">Logged in as:</span>
              <span className="text-sm font-medium text-header-foreground">{user?.username}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                user?.role === 'admin' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-header-foreground/20 text-header-foreground'
              }`}>
                {user?.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>

            {user?.role === 'admin' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAdminPanelOpen(true)}
                className="bg-header-foreground/10 border-header-foreground/20 text-header-foreground hover:bg-header-foreground/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Admin Settings</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-header-foreground hover:bg-header-foreground/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <DashboardFilters />
      </div>
    </header>
  );
}
