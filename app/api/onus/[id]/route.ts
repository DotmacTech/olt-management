// Get a Specific ONU (GET)
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from('Onu')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching ONU:', err);
    return NextResponse.json({ error: 'ONU not found' }, { status: 404 });
  }
}

//  Update ONU Info (PUT)
export async function PUT({ params, request }: { params: { id: string }, request: Request }) {
  try {
    const body = await request.json();
    const { id } = params;
    const { name, serial_number, model, status, ip_address, mac_address } = body;

    const { data, error } = await supabase
      .from('Onu')
      .update({ name, serial_number, model, status, ip_address, mac_address, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error updating ONU:', err);
    return NextResponse.json({ error: 'Failed to update ONU' }, { status: 500 });
  }
}

// Delete ONU (DELETE)
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data, error } = await supabase
      .from('Onu')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'ONU deleted successfully' });
  } catch (err) {
    console.error('Error deleting ONU:', err);
    return NextResponse.json({ error: 'Failed to delete ONU' }, { status: 500 });
  }
}
