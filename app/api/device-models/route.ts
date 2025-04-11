import { NextResponse } from 'next/server';
import { DeviceModel } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('DeviceModel')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching device models:', error);
    return NextResponse.json({ error: 'Failed to fetch device models' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('DeviceModel')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating device model:', error);
    return NextResponse.json({ error: 'Failed to create device model' }, { status: 500 });
  }
}