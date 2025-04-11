import { NextResponse } from 'next/server';
import { Olt } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Olt')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching OLTs:', error);
    return NextResponse.json({ error: 'Failed to fetch OLTs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('Olt')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating OLT:', error);
    return NextResponse.json({ error: 'Failed to create OLT' }, { status: 500 });
  }
}