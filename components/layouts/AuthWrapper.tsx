import { Container } from '@mantine/core';

export default function AuthLayout({ children }: { children: any }) {
  return (
    <Container size={420} my={40}>
      {children}
    </Container>
  );
}
