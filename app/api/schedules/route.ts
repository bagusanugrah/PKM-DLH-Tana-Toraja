import { NextRequest, NextResponse } from 'next/server';
import { fetchSchedules } from '@/lib/schedules';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const kecamatan = searchParams.get('kecamatan') || undefined;
  const response = await fetchSchedules(kecamatan);
  return NextResponse.json(response);
}
