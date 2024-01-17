import { BackButton } from '@/components/controls/NavButtons';

export default function MainLayout({ children }: { children: any }) {
  return (
    <div>
      <div className="min-h-4" />
      <BackButton />
      {children}
    </div>
  );
}
