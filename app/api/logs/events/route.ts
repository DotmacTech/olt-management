import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('SystemEvents')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
