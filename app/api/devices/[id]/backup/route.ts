import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST({ params }: { params: { id: string } }) {
  try {
    const dummyBackup = {
      device_id: params.id,
      backup_data: JSON.stringify({ config: 'full device config here' }),
    };

    const { data, error } = await supabase.from('DeviceBackups').insert(dummyBackup);

    if (error) throw error;
    return NextResponse.json({ message: 'Backup completed' });
  } catch (err) {
    console.error('Backup error:', err);
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 });
  }
}
