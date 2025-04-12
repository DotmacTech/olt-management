import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

export async function GET() {
  try {
    const { data, error } = await supabase.from('Users').select('*');
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching users:', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: User = await request.json();

    const { data, error } = await supabase
      .from('Users')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
