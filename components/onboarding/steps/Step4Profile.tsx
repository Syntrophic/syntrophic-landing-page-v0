'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { InputField } from '../InputField'
import { StepHeader } from '../StepHeader'

export function Step4Profile() {
  const { 
    role,
    uniqueValueProposition,
    currentTraction,
    sectorsAndGeographies,
    checkSizeAndStage,
    idealClient,
    servicesOffered,
    setProfileField 
  } = useOnboardingStore()

  if (role === 'founder') {
    return (
      <div>
        <StepHeader
          title="Profile Details"
          subtitle="Help your agent understand your goals."
        />
        
        <div className="space-y-5">
          <InputField
            label="What is your unique value proposition or 'unfair advantage'?"
            placeholder="Describe what makes your venture unique..."
            value={uniqueValueProposition}
            onChange={(value) => setProfileField('uniqueValueProposition', value)}
            multiline
            rows={3}
            required
          />
          
          <InputField
            label="What is your current traction or development stage?"
            placeholder="Revenue, users, partnerships, product stage..."
            value={currentTraction}
            onChange={(value) => setProfileField('currentTraction', value)}
            multiline
            rows={3}
            required
          />
        </div>
      </div>
    )
  }

  if (role === 'investor') {
    return (
      <div>
        <StepHeader
          title="Profile Details"
          subtitle="Help your agent understand your goals."
        />
        
        <div className="space-y-5">
          <InputField
            label="What sectors and geographies do you target?"
            placeholder="Fintech, AI/ML, B2B SaaS, North America, Europe..."
            value={sectorsAndGeographies}
            onChange={(value) => setProfileField('sectorsAndGeographies', value)}
            multiline
            rows={3}
            required
          />
          
          <InputField
            label="What is your typical check size or investment stage?"
            placeholder="$500K-$2M, Seed to Series A..."
            value={checkSizeAndStage}
            onChange={(value) => setProfileField('checkSizeAndStage', value)}
            multiline
            rows={3}
            required
          />
        </div>
      </div>
    )
  }

  // Service Partner
  return (
    <div>
      <StepHeader
        title="Profile Details"
        subtitle="Help your agent understand your goals."
      />
      
      <div className="space-y-5">
        <InputField
          label="Who is your ideal client?"
          placeholder="Early-stage startups, Growth-stage companies..."
          value={idealClient}
          onChange={(value) => setProfileField('idealClient', value)}
          multiline
          rows={3}
          required
        />
        
        <InputField
          label="What specific services or solutions do you offer?"
          placeholder="Legal, accounting, marketing, software development..."
          value={servicesOffered}
          onChange={(value) => setProfileField('servicesOffered', value)}
          multiline
          rows={3}
          required
        />
      </div>
    </div>
  )
}
