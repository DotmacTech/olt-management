// Handles GET for roles
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('Roles').select('*');
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching roles:', err);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}
