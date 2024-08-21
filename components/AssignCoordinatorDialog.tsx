"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"

import { AccordionTrigger } from "@/components/ui/accordion"

interface Coordinator {
  name: string;
  workload: {
    prospectiveMoms: number;
    waitingForPreAssessment: number;
    inGroupClass: number;
    waitingToBePaired: number;
    inProgram: number;
    waitingForPostAssessment: number;
  };
}

interface AssignCoordinatorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (coordinatorName: string) => void;
  coordinators?: Coordinator[];
  currentCoordinator: string | null;
}

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  React.ComponentPropsWithoutRef<typeof AccordionTrigger>
>(({ children, ...props }, ref) => (
  <AccordionTrigger {...props} ref={ref} className="p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    {children}
  </AccordionTrigger>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const AssignCoordinatorDialog: React.FC<AssignCoordinatorDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onAssign, 
  coordinators = [], 
  currentCoordinator 
}) => {
  const [selectedCoordinator, setSelectedCoordinator] = useState<string>(currentCoordinator || "");

  const handleAssign = () => {
    if (selectedCoordinator) {
      onAssign(selectedCoordinator);
      onOpenChange(false);
    }
  };

  const getTotalWorkload = (workload: Coordinator['workload']) => 
    Object.values(workload).reduce((a, b) => a + b, 0);

  // Sort coordinators by total workload
  const sortedCoordinators = [...coordinators].sort((a, b) => 
    getTotalWorkload(a.workload) - getTotalWorkload(b.workload)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{currentCoordinator ? "Edit Assigned Coordinator" : "Assign to Coordinator"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <RadioGroup value={selectedCoordinator} onValueChange={setSelectedCoordinator}>
            <Accordion type="single" collapsible>
              {sortedCoordinators.map((coordinator) => (
                <AccordionItem value={coordinator.name} key={coordinator.name} className="mb-2">
                  <div className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md">
                    <RadioGroupItem 
                      value={coordinator.name} 
                      id={coordinator.name}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Label 
                      htmlFor={coordinator.name} 
                      className="flex-grow cursor-pointer py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCoordinator(coordinator.name);
                      }}
                    >
                      {coordinator.name}
                    </Label>
                    
                    <CustomAccordionTrigger>
                    <Badge variant="secondary" className="mr-2">
                      Total Workload: {getTotalWorkload(coordinator.workload)}
                    </Badge>
                    </CustomAccordionTrigger>
                  </div>
                  <AccordionContent>
                    <div className="pl-8 pt-2 pb-2">
                      {Object.entries(coordinator.workload).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1 text-sm">
                          <span>{key}:</span>
                          <span tabIndex={0}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleAssign} disabled={!selectedCoordinator || selectedCoordinator === currentCoordinator}>
            {currentCoordinator ? "Update Assignment" : "Assign"}
          </Button> 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCoordinatorDialog;