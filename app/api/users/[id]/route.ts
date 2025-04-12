// Handles GET, PUT, DELETE by ID
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase.from('Users').select('*').eq('id', params.id).single();
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error(`Error fetching user ${params.id}:`, err);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('Users')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error(`Error updating user ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from('Users').delete().eq('id', params.id);
    if (error) throw error;

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error deleting user ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
