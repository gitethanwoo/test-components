'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Bell } from 'lucide-react';

interface Report {
  id: number;
  client: string;
  advocate: string;
  date: string;
}

interface Notification {
  id: number;
  client: string;
  need: string;
  isRead: boolean;
}

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInputLabel, setModalInputLabel] = useState('');
  const [modalButtonLabel, setModalButtonLabel] = useState('');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, client: "Crystal Reyes", need: "Housing renovation needed urgently", isRead: false },
    { id: 2, client: "Jane Doe", need: "Immediate financial assistance required", isRead: false },
  ]);

  const fakeReports: Report[] = [
    { id: 1, client: "Crystal Reyes", advocate: "Rasheedah Wynter", date: "07/02/2024" },
    { id: 2, client: "Jane Doe", advocate: "John Smith", date: "07/03/2024" },
  ];

  const handleReviewClick = (report: Report) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  };

  const handlePlusClick = (item: string) => {
    setModalTitle(`Create New ${item.slice(0, -1)}`);
    setModalInputLabel(`${item.slice(0, -1)} Title`);
    setModalButtonLabel(`Create ${item.slice(0, -1)}`);
    setIsModalOpen(true);
  };

  const handleNotificationClick = (notification: Notification) => {
    const report = fakeReports.find(r => r.client === notification.client);
    if (report) {
      handleReviewClick(report);
    }
    setNotifications(notifications.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side navigation */}
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">EMA Dashboard</h1>
        </div>
        <ul className="mt-4">
          {['Dashboard', 'Clients', 'Advocates', 'Reports', 'Events'].map((item) => (
            <li key={item} className="relative px-4 py-2 hover:bg-gray-200 cursor-pointer group">
              <span>{item}</span>
              {item !== 'Dashboard' && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-300 p-1 rounded"
                        onClick={() => handlePlusClick(item)}
                      >
                        <span className="text-gray-500">+</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="transition duration-50">
                      <span>Create New {item.slice(0, -1)}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8 relative">
        {/* Notification Bell */}
        <div className="absolute top-4 right-4">
          <Button variant="outline" className="relative" onClick={() => setIsNotificationModalOpen(true)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Clients</h2>
            <p className="text-3xl font-bold">250</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active Advocates</h2>
            <p className="text-3xl font-bold">50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Completed Sessions</h2>
            <p className="text-3xl font-bold">1,230</p>
          </div>
        </div>

        {/* Session Reports */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Session Reports</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Client</th>
                <th className="text-left">Advocate</th>
                <th className="text-left">Date</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {fakeReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.client}</td>
                  <td>{report.advocate}</td>
                  <td>{report.date}</td>
                  <td>
                    <Button onClick={() => handleReviewClick(report)}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Notification Modal */}
      <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Immediate Needs</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {notifications.length === 0 ? (
              <p>No immediate needs at this time.</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className="mb-2 last:mb-0">
                    <Button 
                      variant="ghost" 
                      className={`w-full text-left ${notification.isRead ? 'text-gray-500' : 'text-black'}`} 
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <span className="font-semibold">{notification.client}</span>: {notification.need}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer */}
      <Drawer direction='right' open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <DrawerHeader>
              <DrawerTitle>Session Report</DrawerTitle>
              <DrawerDescription>Review details for {selectedReport?.client}</DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-[calc(100vh-200px)] p-4">
              {selectedReport && (
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Client</h3>
                      <p>{selectedReport.client}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Advocate</h3>
                      <p>{selectedReport.advocate}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Date</h3>
                      <p>{selectedReport.date}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Course</h3>
                      <p>Parenting</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Lesson Completed</h3>
                      <p>S.P.I.C.E.S.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Session Type</h3>
                      <p>Individual</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Session Notes</h3>
                    <p className="mt-2">Today's lesson is about meeting our needs and the needs of our children. We have to meet our needs if we want to meet the needs of our children. This lesson S.P.I.C.E.S. helps a mother in crisis through the ideology that caring for her own needs will promote and sustain her ability to care for the needs of her children</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Immediate Needs</h3>
                    <p className="mt-2">Client was previously homeless, was able to get housing thru Salvation Army but turned it down to stay in aunt's place that is in need of renovation. Children has special needs and constant 1 on 1 attention. Client was concerned that was not going to have a place after 120 day program w/ salvation army so took aunt't place but now concerned that place will be deemed unfit by the kid's caseworker</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Concerns</h3>
                    <p className="mt-2">
                      Client able to engage in lesson and participate in answering question. Showed up on time for session. Concerned about livable situation at residence. Will look to see what options are available for repairs, sent resources. Mom stated does not want to collect financial for kids but would like to work instead since caring for them is already her job. 
                      Additionally, the client expressed concerns about the safety of the neighborhood, mentioning recent incidents of crime that have made her feel uneasy. She is also worried about the lack of access to quality education and healthcare services in the area. The client mentioned that her children have been struggling with their schoolwork due to the lack of resources and support. She is also facing challenges in finding stable employment that allows her to balance work and childcare responsibilities. The client is feeling overwhelmed by the multiple stressors and is seeking guidance on how to navigate these challenges. She is also concerned about the long-term impact of the current living situation on her children's well-being and development. The client is looking for advice on how to create a more stable and supportive environment for her family.
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Recommendations</h3>
                    <p className="mt-2">Better living situation for them</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Next Session Date</h3>
                    <p className="mt-2">{selectedReport.date}</p>
                  </div>
                </div>
              )}
            </ScrollArea>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </motion.div>
        </DrawerContent>
      </Drawer>

      {/* Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              <label className="block text-sm mt-4 font-medium text-gray-700">{modalInputLabel}</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>{modalButtonLabel}</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;