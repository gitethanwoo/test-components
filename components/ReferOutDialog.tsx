import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ReferOutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSendReferral: (agency: string, reason: string) => void;
}

const ReferOutDialog: React.FC<ReferOutDialogProps> = ({ isOpen, onOpenChange, onSendReferral }) => {
  const [selectedAgency, setSelectedAgency] = useState('');
  const [referralReason, setReferralReason] = useState('');

  const handleSendReferral = () => {
    onSendReferral(selectedAgency, referralReason);
    setSelectedAgency('');
    setReferralReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refer Out a Mom</DialogTitle>
          <DialogDescription>
            Select an agency and provide a reason for referral.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedAgency}>
          <SelectTrigger>
            <SelectValue placeholder="Select an agency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agency1">Agency 1</SelectItem>
            <SelectItem value="agency2">Agency 2</SelectItem>
            <SelectItem value="agency3">Agency 3</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Reason for referral"
          value={referralReason}
          onChange={(e) => setReferralReason(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSendReferral} disabled={!selectedAgency || !referralReason}>
            Send
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReferOutDialog;