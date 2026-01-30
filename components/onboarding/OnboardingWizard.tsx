'use client'

import { useState } from 'react'
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
  Calendar
} from 'lucide-react'

interface OnboardingWizardProps {
  onClose: () => void
}

type AccountType = 'individual' | 'organization'
type Role = 'founder' | 'investor' | 'service-partner'
type Deployment = 'cloud' | 'private'
type MemoryTier = 'standard' | 'professional'
type PricingPlan = 'core' | 'professional' | 'institutional'

interface FormData {
  accountType: AccountType
  fullName: string
  email: string
  linkedinUrl: string
  organizationName: string
  workEmail: string
  websiteUrl: string
  role: Role
  uniqueValueProposition: string
  currentTraction: string
  sectorsAndGeographies: string
  checkSizeAndStage: string
  idealClient: string
  servicesOffered: string
  deployment: Deployment
  memoryTier: MemoryTier
  pricingPlan: PricingPlan
}

const initialFormData: FormData = {
  accountType: 'individual',
  fullName: '',
  email: '',
  linkedinUrl: '',
  organizationName: '',
  workEmail: '',
  websiteUrl: '',
  role: 'founder',
  uniqueValueProposition: '',
  currentTraction: '',
  sectorsAndGeographies: '',
  checkSizeAndStage: '',
  idealClient: '',
  servicesOffered: '',
  deployment: 'cloud',
  memoryTier: 'standard',
  pricingPlan: 'core'
}

export function OnboardingWizard({ onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.accountType
      case 2:
        if (formData.accountType === 'individual') {
          return formData.fullName.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        }
        return formData.organizationName.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)
      case 3:
        return !!formData.role
      case 4:
        if (formData.role === 'founder') {
          return formData.uniqueValueProposition.length >= 10 && formData.currentTraction.length >= 10
        } else if (formData.role === 'investor') {
          return formData.sectorsAndGeographies.length >= 10 && formData.checkSizeAndStage.length >= 10
        }
        return formData.idealClient.length >= 10 && formData.servicesOffered.length >= 10
      case 5:
        return !!formData.deployment
      case 6:
        return !!formData.memoryTier
      case 7:
        return !!formData.pricingPlan
      default:
        return true
    }
  }

  const canProceed = validateStep(step)

  const handleNext = async () => {
    if (step === 7) {
      await handleSubmit()
    } else if (canProceed) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const submitData = {
        accountType: formData.accountType,
        identity: formData.accountType === 'individual' 
          ? {
              fullName: formData.fullName,
              email: formData.email,
              linkedinUrl: formData.linkedinUrl,
            }
          : {
              organizationName: formData.organizationName,
              workEmail: formData.workEmail,
              websiteUrl: formData.websiteUrl,
            },
        role: formData.role,
        profile: formData.role === 'founder'
          ? {
              uniqueValueProposition: formData.uniqueValueProposition,
              currentTraction: formData.currentTraction,
            }
          : formData.role === 'investor'
          ? {
              sectorsAndGeographies: formData.sectorsAndGeographies,
              checkSizeAndStage: formData.checkSizeAndStage,
            }
          : {
              idealClient: formData.idealClient,
              servicesOffered: formData.servicesOffered,
            },
        deployment: formData.deployment,
        memoryTier: formData.memoryTier,
        pricingPlan: formData.pricingPlan,
      }

      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })
      setStep(8)
    } catch (error) {
      console.error('Submission error:', error)
      setStep(8)
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
          <h3 className={cn(
            'text-base font-medium mb-1.5',
            selected ? 'text-white' : 'text-gray-200'
          )}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </button>
  )

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    placeholder,
    type = 'text',
    rows
  }: { 
    label: string
    value: string
    onChange: (val: string) => void
    placeholder?: string
    type?: string
    rows?: number
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-700 transition-all duration-200 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-700 transition-all duration-200"
        />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-900/95 to-gray-950/95 border border-gray-800/60 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        {/* Progress Bar */}
        <div className="relative px-8 pt-6 pb-4 border-b border-gray-800/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-mono">
              Step {step} of 7
            </span>
            <span className="text-sm text-gray-600 font-mono">
              {Math.round((step / 7) * 100)}%
            </span>
          </div>
          <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white/70 to-white/40 transition-all duration-400"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Content Area */}
        <div className="relative px-8 py-8 min-h-[400px]">
          {/* Step 1: Account Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Choose Account Type</h2>
                <p className="text-gray-400">Are you joining as an individual or organization?</p>
              </div>
              <div className="space-y-3">
                <SelectionCard
                  icon={<User className="w-6 h-6" />}
                  title="Individual Agent"
                  description="Deploy as a solo agent operator"
                  selected={formData.accountType === 'individual'}
                  onClick={() => updateForm({ accountType: 'individual' })}
                />
                <SelectionCard
                  icon={<Building2 className="w-6 h-6" />}
                  title="Organization"
                  description="Deploy agents across your organization"
                  selected={formData.accountType === 'organization'}
                  onClick={() => updateForm({ accountType: 'organization' })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Identity */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {formData.accountType === 'individual' ? 'Your Information' : 'Organization Information'}
                </h2>
                <p className="text-gray-400">Tell us who you are</p>
              </div>
              <div className="space-y-4">
                {formData.accountType === 'individual' ? (
                  <>
                    <InputField
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(val) => updateForm({ fullName: val })}
                      placeholder="John Doe"
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(val) => updateForm({ email: val })}
                      placeholder="your@email.com"
                    />
                    <InputField
                      label="LinkedIn Profile (optional)"
                      value={formData.linkedinUrl}
                      onChange={(val) => updateForm({ linkedinUrl: val })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      label="Organization Name"
                      value={formData.organizationName}
                      onChange={(val) => updateForm({ organizationName: val })}
                      placeholder="Your Company"
                    />
                    <InputField
                      label="Work Email"
                      type="email"
                      value={formData.workEmail}
                      onChange={(val) => updateForm({ workEmail: val })}
                      placeholder="contact@company.com"
                    />
                    <InputField
                      label="Website (optional)"
                      value={formData.websiteUrl}
                      onChange={(val) => updateForm({ websiteUrl: val })}
                      placeholder="https://yourcompany.com"
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Role */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">What's Your Role?</h2>
                <p className="text-gray-400">Help us understand how you'll use Syntrophic Agents</p>
              </div>
              <div className="space-y-3">
                <SelectionCard
                  icon={<Rocket className="w-6 h-6" />}
                  title="Founder"
                  description="Building AI products and services"
                  selected={formData.role === 'founder'}
                  onClick={() => updateForm({ role: 'founder' })}
                />
                <SelectionCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Investor"
                  description="Evaluating AI infrastructure"
                  selected={formData.role === 'investor'}
                  onClick={() => updateForm({ role: 'investor' })}
                />
                <SelectionCard
                  icon={<Briefcase className="w-6 h-6" />}
                  title="Service Partner"
                  description="Offering AI solutions to clients"
                  selected={formData.role === 'service-partner'}
                  onClick={() => updateForm({ role: 'service-partner' })}
                />
              </div>
            </div>
          )}

          {/* Step 4: Profile Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Tell Us More</h2>
                <p className="text-gray-400">
                  {formData.role === 'founder' && 'Share your vision and traction'}
                  {formData.role === 'investor' && 'What are you looking for?'}
                  {formData.role === 'service-partner' && 'Describe your services'}
                </p>
              </div>
              <div className="space-y-4">
                {formData.role === 'founder' && (
                  <>
                    <InputField
                      label="What's your unique value proposition?"
                      value={formData.uniqueValueProposition}
                      onChange={(val) => updateForm({ uniqueValueProposition: val })}
                      placeholder="Describe what makes your AI product unique..."
                      rows={3}
                    />
                    <InputField
                      label="What's your current traction?"
                      value={formData.currentTraction}
                      onChange={(val) => updateForm({ currentTraction: val })}
                      placeholder="Users, revenue, partnerships, or other metrics..."
                      rows={3}
                    />
                  </>
                )}
                {formData.role === 'investor' && (
                  <>
                    <InputField
                      label="Sectors & Geographies of Interest"
                      value={formData.sectorsAndGeographies}
                      onChange={(val) => updateForm({ sectorsAndGeographies: val })}
                      placeholder="e.g., Healthcare in US/EU, B2B SaaS in Asia..."
                      rows={3}
                    />
                    <InputField
                      label="Check Size & Stage Preference"
                      value={formData.checkSizeAndStage}
                      onChange={(val) => updateForm({ checkSizeAndStage: val })}
                      placeholder="e.g., Seed-Series A, $500K-$5M checks..."
                      rows={3}
                    />
                  </>
                )}
                {formData.role === 'service-partner' && (
                  <>
                    <InputField
                      label="Who's your ideal client?"
                      value={formData.idealClient}
                      onChange={(val) => updateForm({ idealClient: val })}
                      placeholder="Enterprise companies, mid-market, startups..."
                      rows={3}
                    />
                    <InputField
                      label="What services do you offer?"
                      value={formData.servicesOffered}
                      onChange={(val) => updateForm({ servicesOffered: val })}
                      placeholder="Consulting, custom implementation, managed services..."
                      rows={3}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Deployment */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Deployment Type</h2>
                <p className="text-gray-400">How do you want to run your agents?</p>
              </div>
              <div className="space-y-3">
                <SelectionCard
                  icon={<Cloud className="w-6 h-6" />}
                  title="Cloud Managed"
                  description="Run on Syntrophic's AWS infrastructure"
                  selected={formData.deployment === 'cloud'}
                  onClick={() => updateForm({ deployment: 'cloud' })}
                />
                <SelectionCard
                  icon={<Server className="w-6 h-6" />}
                  title="Private Vault"
                  description="Deploy locally with complete control"
                  selected={formData.deployment === 'private'}
                  onClick={() => updateForm({ deployment: 'private' })}
                />
              </div>
            </div>
          )}

          {/* Step 6: Memory Tier */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Memory & Learning</h2>
                <p className="text-gray-400">Choose your agent's memory capacity</p>
              </div>
              <div className="space-y-3">
                <SelectionCard
                  icon={<Brain className="w-6 h-6" />}
                  title="Standard"
                  description="Up to 100K tokens, suitable for most use cases"
                  selected={formData.memoryTier === 'standard'}
                  onClick={() => updateForm({ memoryTier: 'standard' })}
                />
                <SelectionCard
                  icon={<Zap className="w-6 h-6" />}
                  title="Professional"
                  description="Up to 1M tokens, for complex conversations"
                  selected={formData.memoryTier === 'professional'}
                  onClick={() => updateForm({ memoryTier: 'professional' })}
                />
              </div>
            </div>
          )}

          {/* Step 7: Pricing */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Select Your Plan</h2>
                <p className="text-gray-400">Choose the right pricing tier for your needs</p>
              </div>
              <div className="space-y-3">
                <SelectionCard
                  icon={<Check className="w-6 h-6" />}
                  title="Core"
                  description="$0/month - Essential agent deployment"
                  selected={formData.pricingPlan === 'core'}
                  onClick={() => updateForm({ pricingPlan: 'core' })}
                />
                <SelectionCard
                  icon={<Zap className="w-6 h-6" />}
                  title="Professional"
                  description="Custom pricing - Advanced features & support"
                  selected={formData.pricingPlan === 'professional'}
                  onClick={() => updateForm({ pricingPlan: 'professional' })}
                />
                <SelectionCard
                  icon={<Calendar className="w-6 h-6" />}
                  title="Institutional"
                  description="Custom pricing - Enterprise solutions"
                  selected={formData.pricingPlan === 'institutional'}
                  onClick={() => updateForm({ pricingPlan: 'institutional' })}
                />
              </div>
            </div>
          )}

          {/* Step 8: Complete */}
          {step === 8 && (
            <div className="flex flex-col items-center justify-center min-h-[400px] py-8">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4 text-center">Request Submitted!</h2>
              <p className="text-gray-400 text-center max-w-sm mb-2">
                Your agent deployment request has been queued for priority verification.
              </p>
              <p className="text-gray-500 text-center text-sm max-w-sm">
                We'll reach out within 24-48 hours to confirm your setup and get you running.
              </p>
            </div>
          )}
        </div>
        
        {/* Navigation Footer */}
        {step < 8 && (
          <div className="relative px-8 pb-6 pt-4 flex items-center justify-between border-t border-gray-800/40">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
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
                  {step < 7 && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        )}

        {/* Close button */}
        {step === 8 && (
          <div className="relative px-8 pb-6 pt-4 flex items-center justify-center border-t border-gray-800/40">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
