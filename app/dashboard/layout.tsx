import DashboardLayout from '@/components/layouts/DashboardLayout';
import { BackButton } from '@/components/controls/NavButtons';

export default function MainLayout({ children }: { children: any }) {
  return (
    <DashboardLayout>
      <div>
        <div className="min-h-4" />
        <BackButton />
        {children}
      </div>
    </DashboardLayout>
  );
}
