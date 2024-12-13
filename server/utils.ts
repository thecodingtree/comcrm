import { auth } from '@/auth';

export async function getAuthedServerSession() {
  return auth();
}
