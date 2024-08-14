'use client'

import { FormSection } from "@/components/FormSection"
import { Field } from "@/components/FormSection";
import { CustomRadioGroup } from "@/components/CustomRadioGroup";

interface IntakeMethodProps {
  onPrevious: () => void;
  onContinue: () => void;
}

export default function IntakeMethod({ onPrevious, onContinue }: IntakeMethodProps) {
  const intakeMethodFields: Field[] = [
    { 
      name: 'hearAboutUs', 
      label: 'How did you hear about us?', 
      type: 'select', 
      placeholder: 'Select an option',
      options: [
        { value: 'socialMedia', label: 'Social Media' },
        { value: 'friend', label: 'Friend or Family' },
        { value: 'healthcare', label: 'Healthcare Provider' },
        { value: 'other', label: 'Other' },
      ]
    },
    { 
      name: 'preferredIntakeMethod', 
      label: 'What is your preferred intake method?', 
      type: 'custom',
      component: CustomRadioGroup,
      options: ['In Person', 'Virtual', 'Either'],
      subtext: 'Someone from the EMA team will follow up to schedule an intake and assessment.'
    },
  ] as const;

  return (
    <FormSection 
      title="Intake Method" 
      fields={intakeMethodFields} 
      onPrevious={onPrevious}
      onContinue={onContinue}
      continueButtonText="Submit"
    />
  )
}