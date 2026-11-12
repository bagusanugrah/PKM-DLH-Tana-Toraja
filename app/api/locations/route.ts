import { NextRequest, NextResponse } from 'next/server';
import { fetchLocations } from '@/lib/locations';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jenis = searchParams.get('jenis') || undefined;
  const response = await fetchLocations(jenis);
  return NextResponse.json(response);
}
