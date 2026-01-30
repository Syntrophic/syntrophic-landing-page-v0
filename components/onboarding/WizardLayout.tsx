'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOnboardingStore } from '@/lib/onboarding-store'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface WizardLayoutProps {
  children: React.ReactNode
  onComplete?: () => void
}

export function WizardLayout({ children, onComplete }: WizardLayoutProps) {
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    validateCurrentStep,
    isSubmitting 
  } = useOnboardingStore()
  
  const isValid = validateCurrentStep()
  const isLastStep = currentStep === totalSteps - 1 // Step 7 is the last before submission
  const isStatusStep = currentStep === totalSteps // Step 8 is the status screen
  
  const handleNext = () => {
    if (isValid) {
      if (isLastStep && onComplete) {
        onComplete()
      } else {
        nextStep()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-900/95 to-gray-950/95 border border-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        {/* Progress Bar */}
        <div className="relative px-8 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-mono">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600 font-mono">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-white/70 to-white/40"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
        
        {/* Content Area */}
        <div className="relative px-8 py-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Footer */}
        {!isStatusStep && (
          <div className="relative px-8 pb-6 pt-2 flex items-center justify-between border-t border-gray-800/40">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isValid || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isLastStep ? 'Confirm & Request Access' : 'Continue'}
                  {!isLastStep && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
