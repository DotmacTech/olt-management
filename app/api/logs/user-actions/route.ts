import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('UserActions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('Failed to fetch user actions:', err);
    return NextResponse.json({ error: 'Failed to fetch user actions' }, { status: 500 });
  }
}
