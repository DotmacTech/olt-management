import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Simulate discovery
    const dummyDevices = [
      {
        name: 'OLT-001',
        ip_address: '192.168.1.10',
        mac_address: '00:1A:2B:3C:4D:5E',
        status: 'active',
        model: 'Huawei MA5800'
      }
    ];

    const { data, error } = await supabase
      .from('Devices')
      .insert(dummyDevices)
      .select();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Discovery error:', err);
    return NextResponse.json({ error: 'Discovery failed' }, { status: 500 });
  }
}
