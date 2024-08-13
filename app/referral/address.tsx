'use client'

import { FormSection } from "@/components/FormSection"
import { Field } from "@/components/FormSection";

interface AddressProps {
  onPrevious: () => void;
  onContinue: () => void;
}

export default function Address({ onPrevious, onContinue }: AddressProps) {
  const addressFields: Field[] = [
    { name: 'street', label: 'Street Address', type: 'text', placeholder: '123 Main St' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Anytown' },
    { name: 'state', label: 'State', type: 'text', placeholder: 'CA' },
    { name: 'zip', label: 'ZIP Code', type: 'text', placeholder: '12345' },
    { name: 'county', label: 'County', type: 'select', placeholder: 'Select county', 
      options: [
        { value: 'county1', label: 'County 1' },
        { value: 'county2', label: 'County 2' },
        // Add more counties as needed
      ]
    },
  ]

  return (
    <FormSection 
      title="Your Address" 
      fields={addressFields} 
      onPrevious={onPrevious}
      onContinue={onContinue}
    />
  )
}