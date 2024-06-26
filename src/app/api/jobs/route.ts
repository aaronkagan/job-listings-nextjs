import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const { data, error } = await supabase.from('jobs').select('*');
    if (data) return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
