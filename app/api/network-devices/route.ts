// app/api/network-devices/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Create Supabase client directly in this file
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Fetch OLTs
    const { data: olts, error: oltError } = await supabase
      .from('Olt')
      .select('id, name, latitude, longitude');
      
    if (oltError) {
      console.error('Failed to fetch OLTs:', oltError);
      return NextResponse.json({ 
        error: 'Failed to fetch OLT devices', 
        details: oltError.message 
      }, { status: 500 });
    }
    
    // Fetch ONUs
    const { data: onus, error: onuError } = await supabase
      .from('Onu')
      .select('id, name, latitude, longitude');
      
    if (onuError) {
      console.error('Failed to fetch ONUs:', onuError);
      return NextResponse.json({ 
        error: 'Failed to fetch ONU devices', 
        details: onuError.message 
      }, { status: 500 });
    }
    
    // Process OLT devices
    const oltDevices = (olts || []).map((d) => ({ 
      ...d, 
      type: 'OLT',
      children: [] // Will hold references to connected ONUs
    }));
    
    // Process ONU devices - for visual purposes assign each ONU to a random OLT
    const onuDevices = (onus || []).map((d) => ({ 
      ...d, 
      type: 'ONU',
      // For visualization, assign to a random OLT if there are any
      parent_id: oltDevices.length > 0 ? oltDevices[Math.floor(Math.random() * oltDevices.length)].id : null
    }));
    
    // Create connections data
    const connections = [];
    
    onuDevices.forEach(onu => {
      if (onu.parent_id && onu.latitude && onu.longitude) {
        const parentOlt = oltDevices.find(olt => olt.id === onu.parent_id);
        if (parentOlt && parentOlt.latitude && parentOlt.longitude) {
          connections.push({
            id: `${parentOlt.id}-${onu.id}`,
            source: {
              id: parentOlt.id,
              position: [parentOlt.latitude, parentOlt.longitude]
            },
            target: {
              id: onu.id,
              position: [onu.latitude, onu.longitude]
            }
          });
          
          // Add ONU to parent's children array
          parentOlt.children.push(onu.id);
        }
      }
    });
    
    const devices = [...oltDevices, ...onuDevices];
    
    // Return the data
    return NextResponse.json({
      devices,
      connections,
      debug: {
        oltCount: oltDevices.length,
        onuCount: onuDevices.length,
        connectionCount: connections.length
      }
    });
    
  } catch (err) {
    console.error('Unhandled error in network devices API:', err);
    return NextResponse.json({ 
      error: 'Failed to fetch network devices', 
      details: err.message 
    }, { status: 500 });
  }
}