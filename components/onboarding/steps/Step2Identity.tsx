'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { InputField } from '../InputField'
import { StepHeader } from '../StepHeader'

export function Step2Identity() {
  const { 
    accountType,
    fullName,
    email,
    linkedinUrl,
    organizationName,
    workEmail,
    websiteUrl,
    setIdentityField 
  } = useOnboardingStore()

  if (accountType === 'individual') {
    return (
      <div>
        <StepHeader
          title="Identity Details"
          subtitle="We use this to verify your standing in the Trust Graph."
        />
        
        <div className="space-y-5">
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(value) => setIdentityField('fullName', value)}
            required
          />
          
          <InputField
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChange={(value) => setIdentityField('email', value)}
            type="email"
            required
          />
          
          <InputField
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/johndoe"
            value={linkedinUrl}
            onChange={(value) => setIdentityField('linkedinUrl', value)}
            type="url"
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <StepHeader
        title="Identity Details"
        subtitle="We use this to verify your standing in the Trust Graph."
      />
      
      <div className="space-y-5">
        <InputField
          label="Organization Name"
          placeholder="Acme Capital Partners"
          value={organizationName}
          onChange={(value) => setIdentityField('organizationName', value)}
          required
        />
        
        <InputField
          label="Work Email"
          placeholder="contact@acmecapital.com"
          value={workEmail}
          onChange={(value) => setIdentityField('workEmail', value)}
          type="email"
          required
        />
        
        <InputField
          label="Website URL"
          placeholder="https://acmecapital.com"
          value={websiteUrl}
          onChange={(value) => setIdentityField('websiteUrl', value)}
          type="url"
        />
      </div>
    </div>
  )
}
