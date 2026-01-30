'use client'

import { useEffect } from 'react'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { WizardLayout } from './WizardLayout'
import { Step1AccountType } from './steps/Step1AccountType'
import { Step2Identity } from './steps/Step2Identity'
import { Step3Role } from './steps/Step3Role'
import { Step4Profile } from './steps/Step4Profile'
import { Step5Deployment } from './steps/Step5Deployment'
import { Step6Memory } from './steps/Step6Memory'
import { Step7Pricing } from './steps/Step7Pricing'
import { Step8Status } from './steps/Step8Status'

interface OnboardingWizardProps {
  onClose: () => void
}

export function OnboardingWizard({ onClose }: OnboardingWizardProps) {
  const { 
    currentStep, 
    nextStep,
    setSubmitting,
    getFormData,
    reset 
  } = useOnboardingStore()

  // Reset store when component unmounts
  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const handleComplete = async () => {
    setSubmitting(true)
    
    try {
      const formData = getFormData()
      
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      // Move to status step regardless of API result
      nextStep()
    } catch (error) {
      console.error('Onboarding submission error:', error)
      // Still move to status step to show waitlist message
      nextStep()
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1AccountType />
      case 2:
        return <Step2Identity />
      case 3:
        return <Step3Role />
      case 4:
        return <Step4Profile />
      case 5:
        return <Step5Deployment />
      case 6:
        return <Step6Memory />
      case 7:
        return <Step7Pricing />
      case 8:
        return <Step8Status onClose={handleClose} />
      default:
        return <Step1AccountType />
    }
  }

  return (
    <WizardLayout onComplete={handleComplete}>
      {renderStep()}
    </WizardLayout>
  )
}
