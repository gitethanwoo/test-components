"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, VideoIcon, PhoneCall, Mail, FileText, BookOpen } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AdvocateDashboard = () => {
  const [mom] = useState({
    name: "Sarah Johnson",
    program: "Parenting",
    progress: 60,
    nextSession: "2024-08-15T14:00:00",
    image: "/api/placeholder/150/150"
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState('');
  const [contactNotes, setContactNotes] = useState('');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleLogContact = () => {
    setIsDrawerOpen(true);
  };

  const handleSaveContact = () => {
    // Here you would typically save the contact log to your backend
    console.log('Saving contact log:', { contactMethod, contactNotes });
    setIsDrawerOpen(false);
    setContactMethod('');
    setContactNotes('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Advocate Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mom.image} alt={mom.name} />
              <AvatarFallback>{mom.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{mom.name}</h2>
              <p className="text-sm text-gray-500">{mom.program} Program</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${mom.progress}%`}}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{mom.progress}% Complete</p>
            </div>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <h3 className="font-semibold mb-1">Next Session</h3>
            <p className="text-sm">{formatDate(mom.nextSession)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center" onClick={handleLogContact}>
          <MessageCircle className="h-8 w-8 mb-2" />
          <span>Log Contact</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <FileText className="h-8 w-8 mb-2" />
          <span>Session Report</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <BookOpen className="h-8 w-8 mb-2" />
          <span>View Content</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
          <Calendar className="h-8 w-8 mb-2" />
          <span>Schedule</span>
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around">
            <Button variant="ghost" size="icon">
              <PhoneCall className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <VideoIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Log Contact</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="mb-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text</Label>
              </div>
            </RadioGroup>
            <Textarea 
              placeholder="Enter notes about the interaction" 
              value={contactNotes}
              onChange={(e) => setContactNotes(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <DrawerFooter>
            <Button onClick={handleSaveContact}>Save Contact Log</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AdvocateDashboard;