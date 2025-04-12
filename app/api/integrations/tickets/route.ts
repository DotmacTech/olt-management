import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate ticket creation
    console.log('Creating helpdesk ticket:', body);

    const ticketResponse = { ticketId: 'TKT-001234', status: 'created' };

    return NextResponse.json(ticketResponse, { status: 201 });
  } catch (err: any) {
    console.error('Ticket integration error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

