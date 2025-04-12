import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(_: Request, { params }: { params: { userId: string } }) {
  try {
    const { data, error } = await supabase
      .from('BillingStatus')
      .update({
        status: 'suspended',
        suspended_at: new Date(),
      })
      .eq('user_id', params.userId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Suspend error:', error);
    return NextResponse.json({ error: 'Failed to suspend service' }, { status: 500 });
  }
}
