'use client'

import { useState } from 'react';
import { FormSection, Field } from "@/components/FormSection"
import MultiFileUpload from "@/components/MultiFileUpload";

interface MomInformationProps {
  onContinue: () => void;
}

export default function MomInformation({ onContinue }: MomInformationProps) {
  const [files, setFiles] = useState<File[]>([]);

  const momInformationFields: Field[] = [
    { name: 'name', label: 'Mom Name', type: 'text', placeholder: 'Enter mom\'s name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '999-999-9999' },
    { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'Select date' },
  ]

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  return (
    <FormSection 
      title="Mom Information" 
      fields={momInformationFields} 
      onContinue={onContinue}
    >
      <MultiFileUpload onFilesChange={handleFilesChange} />
    </FormSection>
  )
}