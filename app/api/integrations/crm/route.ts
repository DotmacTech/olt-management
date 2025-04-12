import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate external CRM API call
    console.log('Pushing to CRM:', body);

    // Example: simulate success
    const crmResponse = { success: true, crm_id: 'CRM12345' };

    return NextResponse.json(crmResponse, { status: 200 });
  } catch (err: any) {
    console.error('CRM integration error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
