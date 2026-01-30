'use client'

import { useOnboardingStore } from '@/lib/onboarding-store'
import { SelectionCard } from '../SelectionCard'
import { StepHeader } from '../StepHeader'
import { Clock, Brain } from 'lucide-react'

export function Step6Memory() {
  const { memoryTier, setMemoryTier } = useOnboardingStore()

  return (
    <div>
      <StepHeader
        title="Performance Tier"
        subtitle="Select the depth of context your agent requires."
      />
      
      <div className="space-y-4">
        <SelectionCard
          icon={<Clock className="w-6 h-6" />}
          title="Standard"
          description="Session-based memory (Good for transactional tasks)."
          selected={memoryTier === 'standard'}
          onClick={() => setMemoryTier('standard')}
          variant="large"
        />
        
        <SelectionCard
          icon={<Brain className="w-6 h-6" />}
          title="Professional"
          description="Long-term history (Best for relationship management)."
          selected={memoryTier === 'professional'}
          onClick={() => setMemoryTier('professional')}
          variant="large"
        />
      </div>
    </div>
  )
}
