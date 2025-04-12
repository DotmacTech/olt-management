import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST({ params }: { params: { id: string } }) {
  try {
    const { data: backup, error } = await supabase
      .from('DeviceBackups')
      .select('backup_data')
      .eq('device_id', params.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !backup) throw error;
    return NextResponse.json({ message: 'Restored config', config: backup.backup_data });
  } catch (err) {
    console.error('Restore error:', err);
    return NextResponse.json({ error: 'Restore failed' }, { status: 500 });
  }
}
