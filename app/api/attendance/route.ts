import { NextResponse } from 'next/server';

// This would be replaced with a real database in a production app
let attendanceRecords: Record<string, string[]> = {};

export async function POST(request: Request) {
  const { eventId, attendeeName } = await request.json();

  if (!eventId || !attendeeName) {
    return NextResponse.json({ success: false, message: 'Missing eventId or attendeeName' }, { status: 400 });
  }

  if (!attendanceRecords[eventId]) {
    attendanceRecords[eventId] = [];
  }

  attendanceRecords[eventId].push(attendeeName);

  console.log(`Attendance marked for ${attendeeName} at event ${eventId}`);

  return NextResponse.json({ success: true, message: 'Attendance marked successfully' });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');

  if (!eventId) {
    return NextResponse.json({ success: false, message: 'Missing eventId' }, { status: 400 });
  }

  const attendees = attendanceRecords[eventId] || [];

  return NextResponse.json({ success: true, attendees });
}