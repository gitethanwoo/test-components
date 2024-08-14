'use client'

import { FormSection } from "@/components/FormSection"
import { Field } from "@/components/FormSection";

interface MomInformationProps {
  onContinue: () => void;
}

export default function MomInformation({ onContinue }: MomInformationProps) {
  const momInformationFields: Field[] = [
    { name: 'name', label: 'Mom Name', type: 'text', placeholder: 'Enter mom\'s name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '999-999-9999' },
    { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'Select date' },
  ]

  return (
    <FormSection 
      title="Mom Information" 
      fields={momInformationFields} 
      onContinue={onContinue}
    />
  )
}