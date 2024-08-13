'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import MomInformation from './mom-information'
import Address from './address'
import AboutYou from './about-you'

export default function Component() {
  const [step, setStep] = useState(0)

  const getProgress = () => {
    switch (step) {
      case 0:
        return 20
      case 1:
        return 40
      case 2:
        return 60
      // Add more cases for other steps
      default:
        return 0
    }
  }

  const renderFormSection = () => {
    switch (step) {
      case 0:
        return <MomInformation onContinue={() => setStep(1)} />
      case 1:
        return <Address onPrevious={() => setStep(0)} onContinue={() => setStep(2)} />
      case 2:
        return <AboutYou onPrevious={() => setStep(1)} onContinue={() => setStep(3)} />
      // Add more cases for other steps
      default:
        return <MomInformation onContinue={() => setStep(1)} />
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f6f1] p-8 flex justify-center">
      <div className="max-w-[964px] w-full">
        <header className="flex flex-col items-left mb-8">
          <img
            src="/assets/ema-logo.svg"
            alt="EMA Logo"
            className="mb-4"
            width="130"
            height="40"
          />
          <h1 className="text-3xl font-bold">Self Referral Form</h1>
        </header>
        <Progress value={getProgress()} className="w-full mb-8" />
        <div className="flex space-x-8">
          <nav className="w-[280px]">
            <ul className="space-y-4">
              <li className={step === 0 ? "font-bold text-primary" : ""}>Your Information</li>
              <li className={step === 1 ? "font-bold text-primary" : ""}>Your Address</li>
              <li className={step === 2 ? "font-bold text-primary" : ""}>About You</li>
              <li>Mom Information (Continued)</li>
              <li>Intake Details and Signature</li>
            </ul>
          </nav>
          <div className="w-[684px]">
            <p className="mb-8 text-lg text-muted-foreground">
              Are you a mom in crisis? Please submit this form and someone from the ÉMA Team will contact you within
              24-48 hours.
            </p>
            {renderFormSection()}
          </div>
        </div>
      </div>
    </div>
  )
}