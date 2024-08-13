'use client'

import { FormSection } from "@/components/FormSection"

interface MomInformationProps {
  onContinue: () => void;
}

export default function MomInformation({ onContinue }: MomInformationProps) {
  const momInformationFields = [
    { name: 'name', label: 'Mom Name', type: 'text', placeholder: 'Enter mom\'s name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '999-999-9999' },
    { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: '06/06/1996' },
  ]

  return (
    <FormSection 
      title="Mom Information" 
      fields={momInformationFields} 
      onContinue={onContinue}
    />
  )
}