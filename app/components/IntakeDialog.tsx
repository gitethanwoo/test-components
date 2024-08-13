import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IntakeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSendIntakeForm: () => void;
  onFillOutForm: () => void;
}

const IntakeDialog: React.FC<IntakeDialogProps> = ({ isOpen, onOpenChange, onSendIntakeForm, onFillOutForm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Intake Process</DialogTitle>
          <DialogDescription>
            Choose how you want to proceed with the intake process.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button onClick={onSendIntakeForm}>Send intake form to mom</Button>
          <Button onClick={onFillOutForm} variant="outline">Fill out form</Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntakeDialog;