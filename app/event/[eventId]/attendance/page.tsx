'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AttendancePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [attendeeName, setAttendeeName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId, attendeeName }),
      });
      
      if (response.ok) {
        setMessage("You're marked as present. Thank you!");
        setAttendeeName('');
      } else {
        setMessage('Failed to mark attendance. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mark Your Attendance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <Button type="submit" className="w-full">I'm Here</Button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AttendancePage;