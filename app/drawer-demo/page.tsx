'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Bell } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SessionReportDrawer from '../components/SessionReportDrawer';
import MomIntakeDrawer from '../components/MomIntakeDrawer';
import NotificationModal from '../components/NotificationModal';
import IntakeDialog from '../components/IntakeDialog';
import ReferOutDialog from '../components/ReferOutDialog';
import { Report, Notification, MomAwaitingIntake } from '../types';
import { Switch } from "@/components/ui/switch";

const Dashboard = () => {
  const fakeReports: Report[] = [
    {
      id: 1,
      client: "Crystal Reyes",
      advocate: "Rasheedah Wynter",
      date: "07/02/2024",
      course: "Parenting",
      lessonCompleted: "S.P.I.C.E.S.",
      sessionType: "Individual",
      sessionNotes: "Today's lesson is about meeting our needs and the needs of our children. We have to meet our needs if we want to meet the needs of our children. This lesson S.P.I.C.E.S. helps a mother in crisis through the ideology that caring for her own needs will promote and sustain her ability to care for the needs of her children",
      immediateNeeds: "Client was previously homeless, was able to get housing thru Salvation Army but turned it down to stay in aunt's place that is in need of renovation. Children has special needs and constant 1 on 1 attention. Client was concerned that was not going to have a place after 120 day program w/ salvation army so took aunt't place but now concerned that place will be deemed unfit by the kid's caseworker",
      concerns: "Client able to engage in lesson and participate in answering question. Showed up on time for session. Concerned about livable situation at residence. Will look to see what options are available for repairs, sent resources. Mom stated does not want to collect financial for kids but would like to work instead since caring for them is already her job. Additionally, the client expressed concerns about the safety of the neighborhood, mentioning recent incidents of crime that have made her feel uneasy. She is also worried about the lack of access to quality education and healthcare services in the area. The client mentioned that her children have been struggling with their schoolwork due to the lack of resources and support. She is also facing challenges in finding stable employment that allows her to balance work and childcare responsibilities. The client is feeling overwhelmed by the multiple stressors and is seeking guidance on how to navigate these challenges. She is also concerned about the long-term impact of the current living situation on her children's well-being and development. The client is looking for advice on how to create a more stable and supportive environment for her family.",
      recommendations: "Better living situation for them",
      nextSessionDate: "07/09/2024",
    },
    { 
      id: 2, 
      client: "Jane Doe", 
      advocate: "John Smith", 
      date: "07/03/2024",
      course: "",
      lessonCompleted: "",
      sessionType: "",
      sessionNotes: "",
      immediateNeeds: "",
      concerns: "",
      recommendations: "",
      nextSessionDate: "",
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, client: "Crystal Reyes", need: "Housing renovation needed urgently", isRead: false },
    { id: 2, client: "Jane Doe", need: "Immediate financial assistance required", isRead: false },
  ]);
  const [isMomDrawerOpen, setIsMomDrawerOpen] = useState(false);
  const [selectedMom, setSelectedMom] = useState<MomAwaitingIntake | null>(null);
  const [isIntakeDialogOpen, setIsIntakeDialogOpen] = useState(false);
  const [isReferOutDialogOpen, setIsReferOutDialogOpen] = useState(false);
  const [referralReason, setReferralReason] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalInputLabel, setModalInputLabel] = useState('');
  const [modalButtonLabel, setModalButtonLabel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>(fakeReports);
  const [isSupervisorView, setIsSupervisorView] = useState(false);

  const momsAwaitingIntake: MomAwaitingIntake[] = [
    {
      id: 1,
      name: "Alice Johnson",
      dob: "1990-05-15",
      referralType: "agency",
      agencyName: "CPS",
      housing_status: "unstable",
      is_mom_pregnant: "no",
      employment_status: "unemployed",
      number_of_children: 2,
      financial_situation: "low_income",
      known_child_welfare_involvement: {
        assigned_case_manager: false,
        children_out_of_home_placement: false,
        open_investigation: false,
        domestic_violence: false,
        mental_health: false,
        substance_abuse: false,
        lack_of_social_support: false,
      },
      other_needs_or_crises: "",
    },
    // Add more moms as needed
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

  const handleMomClick = (mom: MomAwaitingIntake) => {
    setSelectedMom(mom);
    setIsMomDrawerOpen(true);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleStartIntake = () => {
    setIsIntakeDialogOpen(true);
  };

  const handleReferOut = () => {
    setIsReferOutDialogOpen(true);
  };

  const handleSendIntakeForm = () => {
    // Logic to send intake form
    setIsIntakeDialogOpen(false);
  };

  const handleFillOutForm = () => {
    // Logic to fill out form
    setIsIntakeDialogOpen(false);
  };

  const handleSendReferral = () => {
    // Logic to send referral
    setIsReferOutDialogOpen(false);
    setReferralReason('');
    setSelectedAgency('');
  };

  const handleMarkAsReviewed = (reportId: number) => {
    setReports(reports.filter(report => report.id !== reportId));
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side navigation */}
      <nav className="w-64 bg-white shadow-md flex flex-col">
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
        <div className="p-4 flex items-center">
          <Switch
            checked={isSupervisorView}
            onCheckedChange={setIsSupervisorView}
            id="supervisor-mode"
          />
          <label htmlFor="supervisor-mode" className="ml-2 text-sm text-gray-600">
            Supervisor View
          </label>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8 relative max-w-screen-xl mx-auto">
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

        {/* Session Reports */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
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
              {reports.map((report) => (
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

        {/* Moms Awaiting Intake */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Moms Awaiting Intake</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Date of Birth</th>
                <th className="text-left">Referred by</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {momsAwaitingIntake.map((mom) => (
                <tr key={mom.id}>
                  <td>{mom.name}</td>
                  <td>{mom.dob}</td>
                  <td>{mom.referralType === 'agency' ? mom.agencyName : 'Self'}</td>
                  <td>
                    <Button onClick={() => handleMomClick(mom)}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <SessionReportDrawer 
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        selectedReport={selectedReport}
        onMarkAsReviewed={handleMarkAsReviewed}
      />

      <MomIntakeDrawer 
        isOpen={isMomDrawerOpen}
        onOpenChange={setIsMomDrawerOpen}
        selectedMom={selectedMom}
        onStartIntake={() => setIsIntakeDialogOpen(true)}
        onReferOut={() => setIsReferOutDialogOpen(true)}
        isSupervisorView={isSupervisorView}
      />

      <NotificationModal 
        isOpen={isNotificationModalOpen}
        onOpenChange={setIsNotificationModalOpen}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      <IntakeDialog 
        isOpen={isIntakeDialogOpen}
        onOpenChange={setIsIntakeDialogOpen}
        onSendIntakeForm={handleSendIntakeForm}
        onFillOutForm={handleFillOutForm}
      />

      <ReferOutDialog 
        isOpen={isReferOutDialogOpen}
        onOpenChange={setIsReferOutDialogOpen}
        onSendReferral={handleSendReferral}
      />
    </div>
  )
}

export default Dashboard;