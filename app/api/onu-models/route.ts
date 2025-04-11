import { NextResponse } from 'next/server';
import { OnuModel } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('OnuModel')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching ONU models:', error);
    return NextResponse.json({ error: 'Failed to fetch ONU models' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('OnuModel')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating ONU model:', error);
    return NextResponse.json({ error: 'Failed to create ONU model' }, { status: 500 });
  }
}