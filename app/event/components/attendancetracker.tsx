import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { QRCodeSVG } from 'qrcode.react';
import { Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Attendee {
  id: string;
  name: string;
}

interface AttendanceTrackerProps {
  eventId: string;
  isVirtual: boolean;
  attendees: Attendee[];
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ eventId, isVirtual, attendees }) => {
  const router = useRouter();
  const [attendanceCode, setAttendanceCode] = useState<string>('');
  const [manualAttendance, setManualAttendance] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isVirtual) {
      generateAttendanceCode();
    }
    initializeManualAttendance();
  }, [attendees, isVirtual]);

  const initializeManualAttendance = () => {
    const initial: Record<string, boolean> = {};
    attendees.forEach(attendee => {
      initial[attendee.id] = false;
    });
    setManualAttendance(initial);
  };

  const generateAttendanceCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setAttendanceCode(code);
  };

  const handleManualAttendance = (attendeeId: string) => {
    setManualAttendance(prev => ({
      ...prev,
      [attendeeId]: !prev[attendeeId]
    }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(attendanceCode);
    // You might want to show a toast notification here
  };

  const submitAttendance = () => {
    // Logic to submit attendance to the backend
    console.log("Submitting attendance:", manualAttendance);
  };

  const getQRCodeUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/event/${eventId}/attendance`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Attendance Tracker</h2>
      
      {isVirtual ? (
        <div className="space-y-2">
          <p>Attendance Code: {attendanceCode}</p>
          <Button onClick={handleCopyCode} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" /> Copy Code
          </Button>
          <p>Share this code with participants to mark their attendance.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p>Scan QR Code to mark attendance:</p>
          <QRCodeSVG value={getQRCodeUrl()} />
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Manual Attendance</h3>
        {attendees.map(attendee => (
          <div key={attendee.id} className="flex items-center justify-between">
            <span>{attendee.name}</span>
            <Switch
              checked={manualAttendance[attendee.id]}
              onCheckedChange={() => handleManualAttendance(attendee.id)}
            />
          </div>
        ))}
      </div>

      <Button onClick={submitAttendance}>Submit Attendance</Button>
    </div>
  );
};

export default AttendanceTracker;