import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { version } = await request.json();

    const { data, error } = await supabase.from('FirmwareUpdates').insert({
      device_id: params.id,
      version,
    });

    if (error) throw error;
    return NextResponse.json({ message: 'Firmware update triggered' });
  } catch (err) {
    console.error('Firmware update error:', err);
    return NextResponse.json({ error: 'Firmware update failed' }, { status: 500 });
  }
}
