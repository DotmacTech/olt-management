import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: { userId: string } }) {
  try {
    const { data, error } = await supabase
      .from('BillingUsage')
      .select('*')
      .eq('user_id', params.userId);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Billing usage error:', error);
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 });
  }
}
