'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { SelectionCard } from '../SelectionCard'
import { StepHeader } from '../StepHeader'
import { Cloud, Shield } from 'lucide-react'

export function Step5Deployment() {
  const { deployment, setDeployment } = useOnboardingStore()

  return (
    <div>
      <StepHeader
        title="Hosting Environment"
        subtitle="Select where your agent's reasoning models will run."
      />
      
      <div className="space-y-4">
        <SelectionCard
          icon={<Cloud className="w-6 h-6" />}
          title="Cloud Managed (AWS)"
          description="High availability and instant scalability."
          selected={deployment === 'cloud'}
          onClick={() => setDeployment('cloud')}
          variant="large"
        />
        
        <SelectionCard
          icon={<Shield className="w-6 h-6" />}
          title="Private Vault (Local)"
          description="Maximum data residency and sovereignty."
          selected={deployment === 'private'}
          onClick={() => setDeployment('private')}
          variant="large"
        />
      </div>
    </div>
  )
}
