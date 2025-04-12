// Run Remote Diagnostics (GET)
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    // Simulate diagnostics process (you can replace this with actual logic)
    const diagnosticsResult = 'Diagnostics completed: No issues found';

    const { data, error } = await supabase
      .from('Onu')
      .update({ last_diagnostics: diagnosticsResult })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: diagnosticsResult, data });
  } catch (err) {
    console.error('Error running diagnostics:', err);
    return NextResponse.json({ error: 'Failed to run diagnostics' }, { status: 500 });
  }
}
