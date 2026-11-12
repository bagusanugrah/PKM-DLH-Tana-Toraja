import { NextResponse } from 'next/server';
import { fetchAnnouncements } from '@/lib/announcements';

export async function GET() {
  const response = await fetchAnnouncements();
  return NextResponse.json(response);
}
