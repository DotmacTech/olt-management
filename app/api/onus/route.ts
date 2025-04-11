import { NextResponse } from 'next/server';
import { Onu } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Onu')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ONUs:', error);
    return NextResponse.json({ error: 'Failed to fetch ONUs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('Onu')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating ONU:', error);
    return NextResponse.json({ error: 'Failed to create ONU' }, { status: 500 });
  }
}