'use client'

import { FormSection } from "@/components/FormSection"
import { Field } from "@/components/FormSection";
import { CustomRadioGroup } from "@/components/CustomRadioGroup";

interface AboutYouProps {
  onPrevious: () => void;
  onContinue: () => void;
}

export default function AboutYou({ onPrevious, onContinue }: AboutYouProps) {
  const aboutYouFields: Field[] = [
    { name: 'housingStatus', label: 'Housing Status', type: 'select', placeholder: 'Select housing status', 
      options: [
        { value: 'status1', label: 'Status 1' },
        { value: 'status2', label: 'Status 2' },
        // Add more statuses as needed
      ]
    },
    { 
      name: 'pregnant', 
      label: 'Are you currently pregnant?', 
      type: 'custom',
      component: CustomRadioGroup,
      options: ['Yes', 'No', 'Unknown']
    },
    { name: 'employmentStatus', label: 'Employment Status', type: 'select', placeholder: 'Select employment status', 
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'unemployed', label: 'Unemployed' },
        // Add more statuses as needed
      ]
    },
    { name: 'numberOfChildren', label: 'Number of Children', type: 'select', placeholder: 'Select number of children', 
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        // Add more options as needed
      ]
    },
    { name: 'financialSituation', label: 'Financial Situation', type: 'select', placeholder: 'Select financial situation', 
      options: [
        { value: 'situation1', label: 'Situation 1' },
        { value: 'situation2', label: 'Situation 2' },
        // Add more situations as needed
      ]
    },
    { name: 'localAgency', label: 'Are you working with another local agency?', type: 'text', placeholder: 'Agency name, if applicable' },
    { name: 'childWelfare', label: 'Known Child Welfare Involvement?', type: 'checkbox', options: [
        { value: 'caseManager', label: 'I have an assigned Case Manager and is working on a reunification plan with Child Welfare Authorities.' },
        { value: 'childrenOutOfHome', label: 'My child(ren) are living out of the home with a relative or non-relative' },
        { value: 'openInvestigation', label: 'I have an open investigation and children are at-risk of being removed from my care' },
        { value: 'domesticViolence', label: 'Domestic Violence' },
        { value: 'mentalHealth', label: 'Mental Health' },
        { value: 'substanceAbuse', label: 'Substance Abuse' },
        { value: 'lackOfSupport', label: 'Lack of social support in place' },
      ]
    },
    { name: 'otherNeeds', label: 'Please describe any other needs or crises.', type: 'textarea', placeholder: 'Describe here' },
  ] as const;

  return (
    <FormSection 
      title="About You" 
      fields={aboutYouFields} 
      onPrevious={onPrevious}
      onContinue={onContinue}
    />
  )
}