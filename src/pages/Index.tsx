import { useDashboardStore } from '@/store/dashboardStore';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const isAuthenticated = useDashboardStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
};

export default Index;
