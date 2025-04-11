import { NextResponse } from 'next/server';
import { ServiceProfile } from '@/types';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('ServiceProfile')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching service profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch service profiles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('ServiceProfile')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating service profile:', error);
    return NextResponse.json({ error: 'Failed to create service profile' }, { status: 500 });
  }
}