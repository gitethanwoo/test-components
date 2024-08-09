import { NextResponse } from 'next/server';
import { initialData } from '@/app/table/utils/constants';

export async function POST(request: Request) {
  const { recipientId, message } = await request.json();
  const recipient = initialData.find(p => p.id === parseInt(recipientId));
  
  if (recipient) {
    // In a real app, you'd send the message here
    console.log(`Message sent to ${recipient.name}: ${message}`);
    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } else {
    return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
  }
}