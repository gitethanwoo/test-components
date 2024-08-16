import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MomAwaitingIntake } from '../types';
import AssignCoordinatorDialog from './AssignCoordinatorDialog';
import { Pencil } from 'lucide-react'; // Import the Pencil icon

interface MomIntakeDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMom: MomAwaitingIntake | null;
  onStartIntake: () => void;
  onReferOut: () => void;
  onAssignCoordinator: () => void;
  isSupervisorView: boolean;
  coordinators: any[];
  assignedCoordinator: string | null;
  onCoordinatorAssigned: (coordinatorName: string) => void;
}

const MomIntakeDrawer: React.FC<MomIntakeDrawerProps> = ({ 
  isOpen, 
  onOpenChange, 
  selectedMom, 
  onStartIntake, 
  onReferOut, 
  onAssignCoordinator, 
  isSupervisorView,
  coordinators,
  assignedCoordinator,
  onCoordinatorAssigned
}) => {
  if (!selectedMom) return null;

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const handleAssignCoordinator = (coordinatorName: string) => {
    onCoordinatorAssigned(coordinatorName);
    setIsAssignDialogOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Mom Intake Information</DrawerTitle>
          <DrawerDescription>Details for {selectedMom.name}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-200px)] p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Assigned Coordinator</h3>
                <p>{assignedCoordinator || 'Not assigned'}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAssignDialogOpen(true)}
                title={assignedCoordinator ? "Edit assigned coordinator" : "Assign coordinator"}
              >
                <Pencil className="h-4 w-4 mr-2" />{assignedCoordinator ? 'Edit' : 'Assign'} 
              </Button>
            </div>
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{selectedMom.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date of Birth</h3>
              <p>{selectedMom.dob}</p>
            </div>
            <div>
              <h3 className="font-semibold">Referral Type</h3>
              <p>{selectedMom.referralType}</p>
            </div>
            {selectedMom.referralType === 'agency' && (
              <div>
                <h3 className="font-semibold">Agency Name</h3>
                <p>{selectedMom.agencyName}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold">Housing Status</h3>
              <p>{selectedMom.housing_status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Pregnancy Status</h3>
              <p>{selectedMom.is_mom_pregnant}</p>
            </div>
            <div>
              <h3 className="font-semibold">Employment Status</h3>
              <p>{selectedMom.employment_status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Number of Children</h3>
              <p>{selectedMom.number_of_children}</p>
            </div>
            <div>
              <h3 className="font-semibold">Financial Situation</h3>
              <p>{selectedMom.financial_situation}</p>
            </div>
            <div>
              <h3 className="font-semibold">Known Child Welfare Involvement</h3>
              <ul>
                <li>Assigned Case Manager: {selectedMom.known_child_welfare_involvement.assigned_case_manager ? 'Yes' : 'No'}</li>
                <li>Children Out of Home Placement: {selectedMom.known_child_welfare_involvement.children_out_of_home_placement ? 'Yes' : 'No'}</li>
                <li>Open Investigation: {selectedMom.known_child_welfare_involvement.open_investigation ? 'Yes' : 'No'}</li>
                <li>Domestic Violence: {selectedMom.known_child_welfare_involvement.domestic_violence ? 'Yes' : 'No'}</li>
                <li>Mental Health: {selectedMom.known_child_welfare_involvement.mental_health ? 'Yes' : 'No'}</li>
                <li>Substance Abuse: {selectedMom.known_child_welfare_involvement.substance_abuse ? 'Yes' : 'No'}</li>
                <li>Lack of Social Support: {selectedMom.known_child_welfare_involvement.lack_of_social_support ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Other Needs or Crises</h3>
              <p>{selectedMom.other_needs_or_crises || 'None specified'}</p>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <div className="flex justify-end w-full space-x-2">
            <Button onClick={onReferOut} variant="outline">Refer Out</Button>
            <Button onClick={onStartIntake}>Start Intake</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
      <AssignCoordinatorDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        onAssign={handleAssignCoordinator}
        coordinators={coordinators}
        currentCoordinator={assignedCoordinator}
      />
    </Drawer>
  );
};

export default MomIntakeDrawer;