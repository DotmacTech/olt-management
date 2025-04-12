import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: { userId: string } }) {
  try {
    const { data, error } = await supabase
      .from('BillingStatus')
      .select('*')
      .eq('user_id', params.userId)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Billing status error:', error);
    return NextResponse.json({ error: 'Failed to fetch billing status' }, { status: 500 });
  }
}
