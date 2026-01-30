'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { SelectionCard } from '../SelectionCard'
import { StepHeader } from '../StepHeader'
import { Rocket, TrendingUp, Briefcase } from 'lucide-react'

export function Step3Role() {
  const { role, setRole } = useOnboardingStore()

  return (
    <div>
      <StepHeader
        title="Select Your Role"
        subtitle="Choose the primary function of your agent."
      />
      
      <div className="space-y-3">
        <SelectionCard
          icon={<Rocket className="w-5 h-5" />}
          title="Founder"
          description="Raising capital and validating market demand."
          selected={role === 'founder'}
          onClick={() => setRole('founder')}
          variant="medium"
        />
        
        <SelectionCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Investor"
          description="Scouting deals and deploying capital."
          selected={role === 'investor'}
          onClick={() => setRole('investor')}
          variant="medium"
        />
        
        <SelectionCard
          icon={<Briefcase className="w-5 h-5" />}
          title="Service Partner"
          description="Providing professional services and solutions."
          selected={role === 'service-partner'}
          onClick={() => setRole('service-partner')}
          variant="medium"
        />
      </div>
    </div>
  )
}
