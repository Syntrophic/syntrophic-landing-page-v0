'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Building2, 
  Rocket, 
  TrendingUp, 
  Briefcase,
  Cloud,
  Server,
  Brain,
  Zap,
  Check,
  X,
  Calendar
} from 'lucide-react'

// Form schema
const formSchema = z.object({
  accountType: z.enum(['individual', 'organization']),
  // Individual fields
  fullName: z.string().optional(),
  email: z.string().optional(),
  linkedinUrl: z.string().optional(),
  // Organization fields
  organizationName: z.string().optional(),
  workEmail: z.string().optional(),
  websiteUrl: z.string().optional(),
  // Role
  role: z.enum(['founder', 'investor', 'service-partner']),
  // Founder fields
  uniqueValueProposition: z.string().optional(),
  currentTraction: z.string().optional(),
  // Investor fields
  sectorsAndGeographies: z.string().optional(),
  checkSizeAndStage: z.string().optional(),
  // Service partner fields
  idealClient: z.string().optional(),
  servicesOffered: z.string().optional(),
  // Other selections
  deployment: z.enum(['cloud', 'private']),
  memoryTier: z.enum(['standard', 'professional']),
  pricingPlan: z.enum(['core', 'professional', 'institutional']),
})

type FormData = z.infer<typeof formSchema>

const TOTAL_STEPS = 8

const pricingPlans = {
  core: {
    name: 'Core',
    description: 'Individuals & early teams',
    features: 'Clean onboarding, basic agent configuration, standard support',
    monthlyPrice: 149,
    yearlyPrice: 1490,
  },
  professional: {
    name: 'Professional',
    description: 'Active founders & investors',
    features: 'Deeper workflow controls, higher usage limits, priority support',
    monthlyPrice: 499,
    yearlyPrice: 4990,
  },
  institutional: {
    name: 'Institutional',
    description: 'Funds & enterprises',
    features: 'Advanced controls, governance-ready setup, white-glove onboarding',
    monthlyPrice: 1750,
    yearlyPrice: 17500,
  },
} as const

interface OnboardingWizardProps {
  onClose: () => void
}

export function OnboardingWizard({ onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: undefined,
      role: undefined,
      deployment: undefined,
      memoryTier: undefined,
      pricingPlan: undefined,
    },
  })

  const { watch, setValue, trigger } = form
  const accountType = watch('accountType')
  const role = watch('role')

  const canProceed = (): boolean => {
    const values = form.getValues()
    switch (step) {
      case 1: return !!values.accountType
      case 2:
        if (values.accountType === 'individual') {
          return !!(values.fullName && values.fullName.length >= 2 && values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        }
        return !!(values.organizationName && values.organizationName.length >= 2 && values.workEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail))
      case 3: return !!values.role
      case 4:
        if (values.role === 'founder') {
          return !!(values.uniqueValueProposition && values.uniqueValueProposition.length >= 10 && values.currentTraction && values.currentTraction.length >= 10)
        } else if (values.role === 'investor') {
          return !!(values.sectorsAndGeographies && values.sectorsAndGeographies.length >= 10 && values.checkSizeAndStage && values.checkSizeAndStage.length >= 10)
        }
        return !!(values.idealClient && values.idealClient.length >= 10 && values.servicesOffered && values.servicesOffered.length >= 10)
      case 5: return !!values.deployment
      case 6: return !!values.memoryTier
      case 7: return !!values.pricingPlan
      default: return true
    }
  }

  const handleNext = async () => {
    if (step === 7) {
      await handleSubmit()
    } else if (canProceed()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const values = form.getValues()
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStep(8)
      setIsComplete(true)
    } catch (error) {
      console.error('Submission error:', error)
      setStep(8)
      setIsComplete(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Selection Card Component
  const SelectionCard = ({ 
    icon, 
    title, 
    description, 
    selected, 
    onClick 
  }: { 
    icon: React.ReactNode
    title: string
    description: string
    selected: boolean
    onClick: () => void 
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative w-full text-left p-5 rounded-xl border transition-all duration-200 group hover:scale-[1.005] active:scale-[0.995]',
        selected
          ? 'bg-white/[0.06] border-white/30 shadow-lg shadow-white/5'
          : 'bg-gray-900/40 border-gray-800/60 hover:border-gray-700/60 hover:bg-gray-800/30'
      )}
    >
      <div className={cn(
        'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
        selected ? 'bg-white border-white' : 'border-gray-600 group-hover:border-gray-500'
      )}>
        {selected && <Check className="w-3 h-3 text-black" />}
      </div>
      
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-colors duration-200',
          selected ? 'bg-white/10 text-white' : 'bg-gray-800/60 text-gray-400 group-hover:text-gray-300'
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0 pr-8">
          <h3 className={cn('font-medium text-base mb-1 transition-colors', selected ? 'text-white' : 'text-gray-200')}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  )

  // Input Field Component
  const InputField = ({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    type = 'text',
    multiline = false 
  }: { 
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    type?: string
    multiline?: boolean 
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/60 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all duration-200 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/60 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all duration-200"
        />
      )}
    </div>
  )

  // Step Header Component
  const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mb-6">
      <h2 className="text-xl font-medium text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <StepHeader title="Account Type" subtitle="Select how you will be using Syntrophic." />
            <div className="space-y-3">
              <SelectionCard
                icon={<User className="w-5 h-5" />}
                title="Individual"
                description="Personal account for founders, investors, or professionals."
                selected={accountType === 'individual'}
                onClick={() => setValue('accountType', 'individual')}
              />
              <SelectionCard
                icon={<Building2 className="w-5 h-5" />}
                title="Organization"
                description="Team account for companies, funds, or advisory firms."
                selected={accountType === 'organization'}
                onClick={() => setValue('accountType', 'organization')}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <StepHeader 
              title={accountType === 'individual' ? 'Your Information' : 'Organization Details'} 
              subtitle={accountType === 'individual' ? 'Tell us about yourself.' : 'Tell us about your organization.'} 
            />
            <div className="space-y-4">
              {accountType === 'individual' ? (
                <>
                  <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={watch('fullName') || ''}
                    onChange={(v) => setValue('fullName', v)}
                  />
                  <InputField
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    value={watch('email') || ''}
                    onChange={(v) => setValue('email', v)}
                  />
                  <InputField
                    label="LinkedIn URL (Optional)"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={watch('linkedinUrl') || ''}
                    onChange={(v) => setValue('linkedinUrl', v)}
                  />
                </>
              ) : (
                <>
                  <InputField
                    label="Organization Name"
                    placeholder="Enter organization name"
                    value={watch('organizationName') || ''}
                    onChange={(v) => setValue('organizationName', v)}
                  />
                  <InputField
                    label="Work Email"
                    placeholder="you@company.com"
                    type="email"
                    value={watch('workEmail') || ''}
                    onChange={(v) => setValue('workEmail', v)}
                  />
                  <InputField
                    label="Website URL (Optional)"
                    placeholder="https://yourcompany.com"
                    value={watch('websiteUrl') || ''}
                    onChange={(v) => setValue('websiteUrl', v)}
                  />
                </>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <StepHeader title="Your Role" subtitle="What best describes your primary role?" />
            <div className="space-y-3">
              <SelectionCard
                icon={<Rocket className="w-5 h-5" />}
                title="Founder"
                description="Building a company and seeking resources, capital, or partnerships."
                selected={role === 'founder'}
                onClick={() => setValue('role', 'founder')}
              />
              <SelectionCard
                icon={<TrendingUp className="w-5 h-5" />}
                title="Investor"
                description="Deploying capital and seeking deal flow or portfolio support."
                selected={role === 'investor'}
                onClick={() => setValue('role', 'investor')}
              />
              <SelectionCard
                icon={<Briefcase className="w-5 h-5" />}
                title="Service Partner"
                description="Providing professional services to startups and investors."
                selected={role === 'service-partner'}
                onClick={() => setValue('role', 'service-partner')}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <StepHeader 
              title="Profile Details" 
              subtitle={
                role === 'founder' ? 'Help us understand your venture.' :
                role === 'investor' ? 'Help us understand your investment focus.' :
                'Help us understand your services.'
              } 
            />
            <div className="space-y-4">
              {role === 'founder' && (
                <>
                  <InputField
                    label="Unique Value Proposition"
                    placeholder="What makes your solution unique?"
                    multiline
                    value={watch('uniqueValueProposition') || ''}
                    onChange={(v) => setValue('uniqueValueProposition', v)}
                  />
                  <InputField
                    label="Current Traction"
                    placeholder="Revenue, users, partnerships, or other milestones"
                    multiline
                    value={watch('currentTraction') || ''}
                    onChange={(v) => setValue('currentTraction', v)}
                  />
                </>
              )}
              {role === 'investor' && (
                <>
                  <InputField
                    label="Target Sectors & Geographies"
                    placeholder="Which industries and regions do you focus on?"
                    multiline
                    value={watch('sectorsAndGeographies') || ''}
                    onChange={(v) => setValue('sectorsAndGeographies', v)}
                  />
                  <InputField
                    label="Check Size & Stage"
                    placeholder="Investment range and preferred company stages"
                    multiline
                    value={watch('checkSizeAndStage') || ''}
                    onChange={(v) => setValue('checkSizeAndStage', v)}
                  />
                </>
              )}
              {role === 'service-partner' && (
                <>
                  <InputField
                    label="Ideal Client Profile"
                    placeholder="What type of clients do you work best with?"
                    multiline
                    value={watch('idealClient') || ''}
                    onChange={(v) => setValue('idealClient', v)}
                  />
                  <InputField
                    label="Services Offered"
                    placeholder="What services do you provide?"
                    multiline
                    value={watch('servicesOffered') || ''}
                    onChange={(v) => setValue('servicesOffered', v)}
                  />
                </>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <StepHeader title="Deployment Model" subtitle="Choose your preferred infrastructure." />
            <div className="space-y-3">
              <SelectionCard
                icon={<Cloud className="w-5 h-5" />}
                title="Cloud Deployment"
                description="Fully managed infrastructure with automatic scaling and updates."
                selected={watch('deployment') === 'cloud'}
                onClick={() => setValue('deployment', 'cloud')}
              />
              <SelectionCard
                icon={<Server className="w-5 h-5" />}
                title="Private Deployment"
                description="Self-hosted solution with full data sovereignty."
                selected={watch('deployment') === 'private'}
                onClick={() => setValue('deployment', 'private')}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div>
            <StepHeader title="Memory Tier" subtitle="Select your agent memory capacity." />
            <div className="space-y-3">
              <SelectionCard
                icon={<Brain className="w-5 h-5" />}
                title="Standard Memory"
                description="Suitable for most use cases with essential context retention."
                selected={watch('memoryTier') === 'standard'}
                onClick={() => setValue('memoryTier', 'standard')}
              />
              <SelectionCard
                icon={<Zap className="w-5 h-5" />}
                title="Professional Memory"
                description="Extended context window for complex, long-running workflows."
                selected={watch('memoryTier') === 'professional'}
                onClick={() => setValue('memoryTier', 'professional')}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div>
            <StepHeader title="Plan Summary" subtitle="Select your Intelligence-as-a-Service tier." />
            <div className="space-y-3">
              {(Object.keys(pricingPlans) as Array<keyof typeof pricingPlans>).map((planKey) => {
                const plan = pricingPlans[planKey]
                const isSelected = watch('pricingPlan') === planKey
                return (
                  <button
                    key={planKey}
                    type="button"
                    onClick={() => setValue('pricingPlan', planKey)}
                    className={cn(
                      'relative w-full text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.005] active:scale-[0.995]',
                      isSelected
                        ? 'bg-white/[0.06] border-white/30'
                        : 'bg-gray-900/40 border-gray-800/60 hover:border-gray-700/60'
                    )}
                  >
                    <div className={cn(
                      'absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                      isSelected ? 'bg-white border-white' : 'border-gray-600'
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-black" />}
                    </div>
                    
                    <div className="pr-10">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={cn('font-medium text-lg transition-colors', isSelected ? 'text-white' : 'text-gray-200')}>
                          {plan.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-400">
                          {plan.description}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{plan.features}</p>
                      <div className="flex items-baseline gap-2">
                        <span className={cn('text-2xl font-semibold', isSelected ? 'text-white' : 'text-gray-300')}>
                          ${plan.monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-gray-600">/month</span>
                        <span className="text-gray-700 mx-1">or</span>
                        <span className="text-gray-400">${plan.yearlyPrice.toLocaleString()}/year</span>
                      </div>
                    </div>
                  </button>
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

      case 8:
        return (
          <div className="text-center py-8">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-2xl font-medium text-white mb-3">You are on the waitlist</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Your application has been received. We are manually onboarding select partners for the Q2 2026 rollout.
            </p>
            
            <div className="space-y-3">
              <a
                href="https://calendly.com/crystalorganizations/30-minute-narek"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                Schedule Priority Demo
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-900/95 to-gray-950/95 border border-gray-800/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        {/* Progress bar */}
        {step < 8 && (
          <div className="relative px-8 pt-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-mono">Step {step} of {TOTAL_STEPS}</span>
              <span className="text-sm text-gray-600 font-mono">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
            </div>
            <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white/70 to-white/40 transition-all duration-400 ease-out"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="relative px-8 py-6 min-h-[400px]">
          {renderStep()}
        </div>
        
        {/* Navigation */}
        {step < 8 && (
          <div className="relative px-8 pb-6 pt-2 flex items-center justify-between border-t border-gray-800/40">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
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
                  {step === 7 ? 'Confirm & Request Access' : 'Continue'}
                  {step !== 7 && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
