'use client'

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const steps = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Demographics & Background' },
  { id: 3, title: 'Emergency Contact' },
  { id: 4, title: 'Physical Needs / Living Situation' },
  { id: 5, title: 'Health' },
  { id: 6, title: 'Substance Abuse History' },
  { id: 7, title: 'Psychiatric Treatment' },
  { id: 8, title: 'Child Welfare Involvement' },
  { id: 9, title: 'Additional Needs' },
];

const IntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedAlert, setSavedAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    additionalInfo: '',
  });

  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    const savedFormData = localStorage.getItem('formData');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      localStorage.setItem('currentStep', nextStep.toString());
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      localStorage.setItem('currentStep', prevStep.toString());
    }
  };

  const handleSave = () => {
    localStorage.setItem('currentStep', currentStep.toString());
    localStorage.setItem('formData', JSON.stringify(formData));
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleExit = () => {
    console.log('Exiting form');
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="emergencyName">Emergency Contact Name</Label>
              <Input
                id="emergencyName"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 4:
        return (
          <div className="mb-4">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Input
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex">
      {/* Sidebar */}
      <div className="w-72 bg-muted border-r flex flex-col">
        <h1 className="text-xl font-bold p-4 border-b">Intake Form</h1>
        <nav className="flex-grow p-4 overflow-y-auto">
          <ul className="space-y-2">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`cursor-pointer p-2 rounded text-sm ${
                  step.id === currentStep ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-primary/5'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                {step.title}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button onClick={handleSave} variant="outline" className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        <header className="bg-background border-b p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">{steps[currentStep - 1].title}</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleExit}>
            <X className="h-6 w-6" />
          </Button>
        </header>

        <div className="flex-grow overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6">
            <Progress value={(currentStep / steps.length) * 100} className="mb-8" />
            {renderFormFields()}
          </div>
        </div>

        <footer className="bg-muted p-4 flex justify-between">
          <Button onClick={handlePrevious} disabled={currentStep === 1} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </footer>
      </div>

      {savedAlert && (
        <Alert className="fixed bottom-4 right-4 w-64">
          <AlertDescription>Progress saved successfully!</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default IntakeForm;