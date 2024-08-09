'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useParams, useSearchParams } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import TimezoneSelect from 'react-timezone-select';
import AttendanceTracker from '@/app/event/components/attendancetracker';

interface Attendee {
  id: number;
  name: string;
}

interface Event {
  name: string;
  date: string;
  location: string;
  description: string;
  attendees: Attendee[];
  type: string;
  capacity: number;
  virtualLink: string;
  reminderDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  emaCenter: string;
}

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<Event>({
    name: '',
    date: '',
    location: '',
    description: '',
    attendees: [],
    type: '',
    capacity: 0,
    virtualLink: '',
    reminderDate: '',
    startTime: '',
    endTime: '',
    timezone: '',
    emaCenter: ''
  });
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [showAttendanceTracker, setShowAttendanceTracker] = useState(false);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAttendees = useCallback(async () => {
    if (!eventId) return;
    try {
      const response = await fetch(`/api/attendance?eventId=${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setAttendees(data.attendees);
      }
    } catch (error) {
      console.error('Failed to fetch attendees:', error);
    }
  }, [eventId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAttendees();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (!isEditing) {
      fetchAttendees();
      const intervalId = setInterval(fetchAttendees, 1000); // Poll every 10 seconds
      return () => clearInterval(intervalId);
    }
  }, [isEditing, fetchAttendees]);

  useEffect(() => {
    if (eventId && !isEditing) {
      fetchAttendees();
    }
  }, [eventId, isEditing]);

  useEffect(() => {
    if (eventId) {
      const name = searchParams.get('name') || '';
      const date = searchParams.get('date') || '';
      setEvent(prevEvent => ({ 
        ...prevEvent, 
        name, 
        date,
        // Set default values for other fields if needed
      }));
    }
  }, [eventId, searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }
  ): void => {
    const { name, value } = 'target' in e ? e.target : e;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleSelectChange = (value: string): void => {
    setEvent(prevEvent => ({ ...prevEvent, type: value }));
  };

  const handleTimezoneChange = (selectedTimezone: any) => {
    setEvent(prevEvent => ({ ...prevEvent, timezone: selectedTimezone.value }));
  };

  const handleSave = (): void => {
    // Save event logic
    setIsEditing(false);
  };

  const handleAttendanceCapture = (attendeeId: number, isPresent: boolean): void => {
    // Update attendance logic
  };

  const sendReminders = (): void => {
    // Logic to send reminders to attendees
    console.log('Sending reminders to attendees');
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">
            {isEditing ? (
              <Input
                name="name"
                value={event.name}
                onChange={handleInputChange}
                placeholder="Event Name"
              />
            ) : (
              event.name
            )}
          </h1>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Date</Label>
              {isEditing ? (
                <Input
                  type="date"
                  name="date"
                  value={event.date}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{event.date}</p>
              )}
            </div>
            <div>
              <Label>Location</Label>
              {isEditing ? (
                <Input
                  name="location"
                  value={event.location}
                  onChange={handleInputChange}
                  placeholder="Event Location"
                />
              ) : (
                <p>{event.location}</p>
              )}
            </div>
            <div>
              <Label>Description</Label>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={event.description}
                  onChange={handleInputChange}
                  placeholder="Event Description"
                />
              ) : (
                <p>{event.description}</p>
              )}
            </div>
            <div>
              <Label>Event Type</Label>
              {isEditing ? (
                <Select onValueChange={handleSelectChange} value={event.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="training">Training Session</SelectItem>
                    <SelectItem value="support">Support Group</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p>{event.type}</p>
              )}
            </div>
            <div>
              <Label>Capacity</Label>
              {isEditing ? (
                <Input
                  type="number"
                  name="capacity"
                  value={event.capacity}
                  onChange={handleInputChange}
                  placeholder="Maximum attendees"
                />
              ) : (
                <p>{event.capacity}</p>
              )}
            </div>
            <div>
              <Label>Virtual Meeting Link</Label>
              {isEditing ? (
                <Input
                  name="virtualLink"
                  value={event.virtualLink}
                  onChange={handleInputChange}
                  placeholder="Virtual meeting link"
                />
              ) : (
                <p>{event.virtualLink}</p>
              )}
            </div>
            <div>
              <Label>Reminder Date</Label>
              {isEditing ? (
                <Input
                  type="date"
                  name="reminderDate"
                  value={event.reminderDate}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{event.reminderDate}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Time</Label>
                {isEditing ? (
                  <Select name="startTime" value={event.startTime} onValueChange={(value) => handleInputChange({ name: 'startTime', value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {`${hour.toString().padStart(2, '0')}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{event.startTime}</p>
                )}
              </div>
              <div>
                <Label>End Time</Label>
                {isEditing ? (
                  <Select name="endTime" value={event.endTime} onValueChange={(value) => handleInputChange({ name: 'endTime', value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {`${hour.toString().padStart(2, '0')}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{event.endTime}</p>
                )}
              </div>
              <div>
                <Label>Timezone</Label>
                {isEditing ? (
                  <TimezoneSelect
                    value={event.timezone}
                    onChange={handleTimezoneChange}
                  />
                ) : (
                  <p>{event.timezone}</p>
                )}
              </div>
            </div>
            <div>
              <Label>EMA Center</Label>
              {isEditing ? (
                <Select name="emaCenter" value={event.emaCenter} onValueChange={(value) => handleInputChange({ name: 'emaCenter', value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select EMA center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="miami">Miami</SelectItem>
                    <SelectItem value="nyc">NYC</SelectItem>
                    <SelectItem value="la">LA</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p>{event.emaCenter}</p>
              )}
            </div>
            {!isEditing && (
              <div>
                <div className="flex justify-between items-center">
                  <Label>Attendees</Label>
                  <Button onClick={handleRefresh} disabled={isRefreshing}>
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </div>
                <ul>
                  {attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))}
                </ul>
                <Button onClick={() => setShowAttendanceTracker(!showAttendanceTracker)}>
                  {showAttendanceTracker ? 'Hide' : 'Show'} Attendance Tracker
                </Button>
                {showAttendanceTracker && (
                  <AttendanceTracker
                    eventId={eventId}
                    isVirtual={!!event.virtualLink}
                    attendees={attendees.map((name, id) => ({ id: id.toString(), name }))}
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <Button onClick={handleSave}>Save Event</Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)}>Edit Event</Button>
              <Button onClick={sendReminders}>Send Reminders</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventDetailPage;