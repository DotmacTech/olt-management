import { NextResponse } from 'next/server';
import { PonPort } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('PonPort')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching PON ports:', error);
    return NextResponse.json({ error: 'Failed to fetch PON ports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('PonPort')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating PON port:', error);
    return NextResponse.json({ error: 'Failed to create PON port' }, { status: 500 });
  }
}