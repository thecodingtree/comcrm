import AuthWrapper from '../../../components/layouts/AuthWrapper';

export default function AuthLayout({ children }: { children: any }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
