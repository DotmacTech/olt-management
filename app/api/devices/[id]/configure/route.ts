import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { config_template } = await request.json();

    const { data, error } = await supabase.from('DeviceConfigs').insert({
      device_id: params.id,
      config_template,
    });

    if (error) throw error;
    return NextResponse.json({ message: 'Configuration applied' });
  } catch (err) {
    console.error('Configuration error:', err);
    return NextResponse.json({ error: 'Failed to configure device' }, { status: 500 });
  }
}
