import { NextRequest } from 'next/server';
import { permanentRedirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  permanentRedirect('/dashboard');
}
