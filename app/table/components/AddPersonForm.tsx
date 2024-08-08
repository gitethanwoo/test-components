import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { initialData, statuses } from '../utils/constants';

type Person = Omit<typeof initialData[0], 'id'>;

interface AddPersonFormProps {
  onSubmit: (person: Person) => void;
}

function AddPersonForm({ onSubmit }: AddPersonFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Person>({
    name: "",
    status: "prospective_mom",
    zip: "",
    referralDate: "",
    agency: ""
  });

  const handleChange = (field: keyof Person, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      status: "prospective_mom",
      zip: "",
      referralDate: "",
      agency: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>+ Add person</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Person</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">Zip</Label>
            <Input
              id="zip"
              value={formData.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="Enter zip code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referralDate">Referral Date</Label>
            <DatePicker
              date={formData.referralDate ? new Date(formData.referralDate) : undefined}
              setDate={(date) => handleChange('referralDate', date ? format(date, "MM/dd/yy") : '')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency">Agency</Label>
            <Input
              id="agency"
              value={formData.agency}
              onChange={(e) => handleChange('agency', e.target.value)}
              placeholder="Enter agency"
            />
          </div>
          <Button type="submit" className="w-full">Add Person</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPersonForm;