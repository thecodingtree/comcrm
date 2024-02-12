import Tasks from '@/components/tasks/Tasks';

export default function DashboardPage() {
  return (
    <div className="grid grid-flow-row gap-4">
      <div className="text-3xl font-bold underline">Dashboard Page</div>
      <div>
        <Tasks />
      </div>
    </div>
  );
}
