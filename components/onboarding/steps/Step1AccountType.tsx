'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { SelectionCard } from '../SelectionCard'
import { StepHeader } from '../StepHeader'
import { User, Building2 } from 'lucide-react'

export function Step1AccountType() {
  const { accountType, setAccountType } = useOnboardingStore()

  return (
    <div>
      <StepHeader
        title="Account Type"
        subtitle="How will you be operating within the network?"
      />
      
      <div className="space-y-4">
        <SelectionCard
          icon={<User className="w-6 h-6" />}
          title="Individual"
          description="For sole proprietors and independent operators."
          selected={accountType === 'individual'}
          onClick={() => setAccountType('individual')}
          variant="large"
        />
        
        <SelectionCard
          icon={<Building2 className="w-6 h-6" />}
          title="Organization"
          description="For funds, companies, and institutions."
          selected={accountType === 'organization'}
          onClick={() => setAccountType('organization')}
          variant="large"
        />
      </div>
    </div>
  )
}
