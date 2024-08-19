import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Report } from '@/app/types';

interface SessionReportDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReport: Report | null;
  onMarkAsReviewed: (reportId: number) => void;
}

const SessionReportDrawer: React.FC<SessionReportDrawerProps> = ({ isOpen, onOpenChange, selectedReport, onMarkAsReviewed }) => {
  if (!selectedReport) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Session Report</DrawerTitle>
          <DrawerDescription>Details for {selectedReport.client}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-200px)] p-4">
          <div className="space-y-4">
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
            <div>
              <h3 className="font-semibold">Session Notes</h3>
              <p>Today's lesson is about meeting our needs and the needs of our children. We have to meet our needs if we want to meet the needs of our children. This lesson S.P.I.C.E.S. helps a mother in crisis through the ideology that caring for her own needs will promote and sustain her ability to care for the needs of her children</p>
            </div>
            <div>
              <h3 className="font-semibold">Immediate Needs</h3>
              <p>Client was previously homeless, was able to get housing thru Salvation Army but turned it down to stay in aunt's place that is in need of renovation. Children has special needs and constant 1 on 1 attention. Client was concerned that was not going to have a place after 120 day program w/ salvation army so took aunt't place but now concerned that place will be deemed unfit by the kid's caseworker</p>
            </div>
            <div>
              <h3 className="font-semibold">Concerns</h3>
              <p>Client able to engage in lesson and participate in answering question. Showed up on time for session. Concerned about livable situation at residence. Will look to see what options are available for repairs, sent resources. Mom stated does not want to collect financial for kids but would like to work instead since caring for them is already her job.</p>
              <p>Additionally, the client expressed concerns about the safety of the neighborhood, mentioning recent incidents of crime that have made her feel uneasy. She is also worried about the lack of access to quality education and healthcare services in the area. The client mentioned that her children have been struggling with their schoolwork due to the lack of resources and support. She is also facing challenges in finding stable employment that allows her to balance work and childcare responsibilities.</p>
              <p>The client is feeling overwhelmed by the multiple stressors and is seeking guidance on how to navigate these challenges. She is also concerned about the long-term impact of the current living situation on her children's well-being and development. The client is looking for advice on how to create a more stable and supportive environment for her family.</p>
            </div>
            <div>
              <h3 className="font-semibold">Recommendations</h3>
              <p>Better living situation for them</p>
            </div>
            <div>
              <h3 className="font-semibold">Next Session Date</h3>
              <p>{selectedReport.date}</p>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter className="flex justify-between">
          <Button onClick={() => onMarkAsReviewed(selectedReport.id)} variant="default">
            Mark as Reviewed
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SessionReportDrawer;