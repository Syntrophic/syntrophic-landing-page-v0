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

// Selection Card Component - moved outside to prevent recreations
function SelectionCard({ 
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
}) {
  return (
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
}

// Input Field Component - moved outside to prevent recreations
function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder,
  type = 'text',
  rows,
  minLength,
  maxLength,
  error,
  onBlur,
  autoComplete,
  inputMode
}: { 
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  type?: string
  rows?: number
  minLength?: number
  maxLength?: number
  error?: string
  onBlur?: () => void
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric'
}) {
  const showCounter = minLength || maxLength
  const hasError = !!error
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {showCounter && rows && (
          <span className={cn(
            'text-xs font-mono transition-colors',
            minLength && value.length < minLength ? 'text-gray-600' : 'text-gray-500'
          )}>
            {value.length}/{minLength}
          </span>
        )}
      </div>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 bg-gray-900/60 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 resize-none',
            hasError 
              ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70' 
              : 'border-gray-800 focus:ring-white/20 focus:border-gray-700'
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={cn(
            'w-full px-4 py-3 bg-gray-900/60 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200',
            hasError 
              ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70' 
              : 'border-gray-800 focus:ring-white/20 focus:border-gray-700'
          )}
        />
      )}
      {hasError && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="6" cy="6" r="5" opacity="0.2"/>
            <path d="M6 3v3m0 2h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export function OnboardingWizard({ onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationProgress, setConfirmationProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear errors for updated fields
    const updatedKeys = Object.keys(updates)
    if (updatedKeys.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev }
        updatedKeys.forEach(key => delete newErrors[key])
        return newErrors
      })
    }
  }

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
      case 'organizationName':
        if (value.length < 2) return 'Must be at least 2 characters'
        break
      case 'email':
      case 'workEmail':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        break
      case 'uniqueValueProposition':
      case 'currentTraction':
      case 'sectorsAndGeographies':
      case 'checkSizeAndStage':
      case 'idealClient':
      case 'servicesOffered':
        if (value.length < 20) return 'Please provide at least 20 characters'
        break
    }
    return undefined
  }

  const handleFieldBlur = (field: string, value: string) => {
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }))
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
          return formData.uniqueValueProposition.length >= 20 && formData.currentTraction.length >= 20
        } else if (formData.role === 'investor') {
          return formData.sectorsAndGeographies.length >= 20 && formData.checkSizeAndStage.length >= 20
        }
        return formData.idealClient.length >= 20 && formData.servicesOffered.length >= 20
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
      setIsSubmitting(false)
      
      // Animate progress bar over 2 seconds
      const duration = 2000
      const interval = 20
      const increment = 100 / (duration / interval)
      
      const timer = setInterval(() => {
        setConfirmationProgress(prev => {
          const next = prev + increment
          if (next >= 100) {
            clearInterval(timer)
            setShowSuccess(true)
            return 100
          }
          return next
        })
      }, interval)
    } catch (error) {
      console.error('Submission error:', error)
      setStep(8)
      setShowSuccess(true)
      setIsSubmitting(false)
    }
  }

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
              Step {step} of 8
            </span>
            <span className="text-sm text-gray-600 font-mono">
              {Math.round((step / 8) * 100)}%
            </span>
          </div>
          <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white/70 to-white/40 transition-all duration-400"
              style={{ width: `${(step / 8) * 100}%` }}
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
                  description="Deploy agents representing your organization"
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
                      onBlur={() => handleFieldBlur('fullName', formData.fullName)}
                      placeholder="John Doe"
                      error={errors.fullName}
                      autoComplete="name"
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(val) => updateForm({ email: val })}
                      onBlur={() => handleFieldBlur('email', formData.email)}
                      placeholder="your@email.com"
                      error={errors.email}
                      autoComplete="email"
                      inputMode="email"
                    />
                    <InputField
                      label="LinkedIn Profile (optional)"
                      value={formData.linkedinUrl}
                      onChange={(val) => updateForm({ linkedinUrl: val })}
                      placeholder="https://linkedin.com/in/yourprofile"
                      autoComplete="url"
                      inputMode="url"
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      label="Organization Name"
                      value={formData.organizationName}
                      onChange={(val) => updateForm({ organizationName: val })}
                      onBlur={() => handleFieldBlur('organizationName', formData.organizationName)}
                      placeholder="Your Company"
                      error={errors.organizationName}
                      autoComplete="organization"
                    />
                    <InputField
                      label="Work Email"
                      type="email"
                      value={formData.workEmail}
                      onChange={(val) => updateForm({ workEmail: val })}
                      onBlur={() => handleFieldBlur('workEmail', formData.workEmail)}
                      placeholder="contact@company.com"
                      error={errors.workEmail}
                      autoComplete="email"
                      inputMode="email"
                    />
                    <InputField
                      label="Website (optional)"
                      value={formData.websiteUrl}
                      onChange={(val) => updateForm({ websiteUrl: val })}
                      placeholder="https://yourcompany.com"
                      autoComplete="url"
                      inputMode="url"
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
                  description="Startup founders building products and raising capital"
                  selected={formData.role === 'founder'}
                  onClick={() => updateForm({ role: 'founder' })}
                />
                <SelectionCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Investor"
                  description="VCs and Angels scouting deals and deploying capital"
                  selected={formData.role === 'investor'}
                  onClick={() => updateForm({ role: 'investor' })}
                />
                <SelectionCard
                  icon={<Briefcase className="w-6 h-6" />}
                  title="Service Provider"
                  description="Providing professional services and solutions"
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
                      onBlur={() => handleFieldBlur('uniqueValueProposition', formData.uniqueValueProposition)}
                      placeholder="Describe what makes your AI product unique..."
                      rows={3}
                      minLength={20}
                      error={errors.uniqueValueProposition}
                    />
                    <InputField
                      label="What's your current traction?"
                      value={formData.currentTraction}
                      onChange={(val) => updateForm({ currentTraction: val })}
                      onBlur={() => handleFieldBlur('currentTraction', formData.currentTraction)}
                      placeholder="Users, revenue, partnerships, or other metrics..."
                      rows={3}
                      minLength={20}
                      error={errors.currentTraction}
                    />
                  </>
                )}
                {formData.role === 'investor' && (
                  <>
                    <InputField
                      label="Sectors & Geographies of Interest"
                      value={formData.sectorsAndGeographies}
                      onChange={(val) => updateForm({ sectorsAndGeographies: val })}
                      onBlur={() => handleFieldBlur('sectorsAndGeographies', formData.sectorsAndGeographies)}
                      placeholder="e.g., Healthcare in US/EU, B2B SaaS in Asia..."
                      rows={3}
                      minLength={20}
                      error={errors.sectorsAndGeographies}
                    />
                    <InputField
                      label="Check Size & Stage Preference"
                      value={formData.checkSizeAndStage}
                      onChange={(val) => updateForm({ checkSizeAndStage: val })}
                      onBlur={() => handleFieldBlur('checkSizeAndStage', formData.checkSizeAndStage)}
                      placeholder="e.g., Seed-Series A, $500K-$5M checks..."
                      rows={3}
                      minLength={20}
                      error={errors.checkSizeAndStage}
                    />
                  </>
                )}
                {formData.role === 'service-partner' && (
                  <>
                    <InputField
                      label="Who's your ideal client?"
                      value={formData.idealClient}
                      onChange={(val) => updateForm({ idealClient: val })}
                      onBlur={() => handleFieldBlur('idealClient', formData.idealClient)}
                      placeholder="Enterprise companies, mid-market, startups..."
                      rows={3}
                      minLength={20}
                      error={errors.idealClient}
                    />
                    <InputField
                      label="What services do you offer?"
                      value={formData.servicesOffered}
                      onChange={(val) => updateForm({ servicesOffered: val })}
                      onBlur={() => handleFieldBlur('servicesOffered', formData.servicesOffered)}
                      placeholder="Consulting, custom implementation, managed services..."
                      rows={3}
                      minLength={20}
                      error={errors.servicesOffered}
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

          {/* Step 8: Confirmation & Complete */}
          {step === 8 && (
            <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
              {!showSuccess ? (
                <>
                  {/* Agent Icon with subtle animation */}
                  <div className="mb-8">
                    <div className="relative w-24 h-24 mx-auto">
                      {/* Outer ring pulse */}
                      <div className="absolute inset-0 bg-white/5 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                      {/* Static outer ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full" />
                      {/* Inner icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src="/robots.png" 
                          alt="Agent" 
                          className="w-16 h-16 object-contain opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Processing text */}
                  <h2 className="text-2xl font-medium text-white mb-3 text-center">Submitting Request</h2>
                  <p className="text-gray-400 text-center text-sm mb-8 max-w-xs">
                    Configuring your agent deployment...
                  </p>
                  
                  {/* Progress bar - Apple style */}
                  <div className="w-full max-w-xs">
                    <div className="h-1 bg-gray-800/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${confirmationProgress}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Success state */}
                  <div className="mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full flex items-center justify-center">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-medium text-white mb-3 text-center">Request Submitted</h2>
                  <p className="text-gray-400 text-center max-w-sm mb-2 leading-relaxed">
                    Your agent deployment request has been queued for priority verification.
                  </p>
                  <p className="text-gray-500 text-center text-sm max-w-sm leading-relaxed">
                    We'll reach out within 24-48 hours to confirm your setup and get you running.
                  </p>
                </>
              )}
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
        {step === 8 && showSuccess && (
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
