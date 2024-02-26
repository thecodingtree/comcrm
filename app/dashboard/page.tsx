import DashboardTasks from '@/components/dashboard/DashboardTasks';
import DashboardNotes from '@/components/dashboard/DashboardNotes';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="p-4">
        <DashboardTasks />
      </div>
      <div>
        <Separator />
      </div>
      <div className="p-4">
        <DashboardNotes />
      </div>
    </div>
  );
}
