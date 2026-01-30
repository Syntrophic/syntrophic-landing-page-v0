'use client'

import { useOnboardingStore, pricingPlans, type PricingPlan } from '@/lib/onboarding-store'
import { StepHeader } from '../StepHeader'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Step7Pricing() {
  const { pricingPlan, setPricingPlan } = useOnboardingStore()

  return (
    <div>
      <StepHeader
        title="Plan Summary"
        subtitle="Select your Intelligence-as-a-Service tier."
      />
      
      <div className="space-y-3">
        {(Object.keys(pricingPlans) as PricingPlan[]).map((planKey) => {
          const plan = pricingPlans[planKey]
          const isSelected = pricingPlan === planKey
          
          return (
            <motion.button
              key={planKey}
              onClick={() => setPricingPlan(planKey)}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={cn(
                'relative w-full text-left p-5 rounded-xl border transition-all duration-200',
                isSelected
                  ? 'bg-white/[0.06] border-white/30'
                  : 'bg-gray-900/40 border-gray-800/60 hover:border-gray-700/60'
              )}
            >
              {/* Selected indicator */}
              <div className={cn(
                'absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                isSelected 
                  ? 'bg-white border-white' 
                  : 'border-gray-600'
              )}>
                {isSelected && (
                  <Check className="w-3 h-3 text-black" />
                )}
              </div>
              
              <div className="flex items-start justify-between pr-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={cn(
                      'font-medium text-lg transition-colors',
                      isSelected ? 'text-white' : 'text-gray-200'
                    )}>
                      {plan.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-400">
                      {plan.description}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {plan.features}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={cn(
                      'text-2xl font-semibold',
                      isSelected ? 'text-white' : 'text-gray-300'
                    )}>
                      ${plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/month</span>
                    <span className="text-gray-700 mx-1">or</span>
                    <span className="text-gray-400">
                      ${plan.yearlyPrice.toLocaleString()}/year
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-gray-900/30 border border-gray-800/40">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="text-gray-400 font-medium">Billing Note:</span> Base Platform Fee + Performance Success Fee. 
          You will only be billed upon successful verified matches.
        </p>
      </div>
    </div>
  )
}
