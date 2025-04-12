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
  } catch (err) {
    console.error('Error fetching OLTs:', err);
    return NextResponse.json({ error: 'Failed to fetch OLTs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Olt = await request.json();
    const { data, error } = await supabase
      .from('Olt')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error creating OLT:', err);
    return NextResponse.json({ error: 'Failed to create OLT' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: Olt = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Missing OLT ID' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('Olt')
      .update(body)
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error updating OLT:', err);
    return NextResponse.json({ error: 'Failed to update OLT' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing OLT ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('Olt')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ message: 'OLT deleted successfully' });
  } catch (err) {
    console.error('Error deleting OLT:', err);
    return NextResponse.json({ error: 'Failed to delete OLT' }, { status: 500 });
  }
}
