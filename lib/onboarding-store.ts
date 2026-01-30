import { create } from 'zustand'
import { z } from 'zod'

// Account types
export type AccountType = 'individual' | 'organization'
export type RoleType = 'founder' | 'investor' | 'service-partner'
export type DeploymentType = 'cloud' | 'private'
export type MemoryTier = 'standard' | 'professional'
export type PricingPlan = 'core' | 'professional' | 'institutional'

// Zod schemas for validation
export const individualIdentitySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  linkedinUrl: z.string().url('Valid LinkedIn URL is required').optional().or(z.literal('')),
})

export const organizationIdentitySchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  workEmail: z.string().email('Valid work email is required'),
  websiteUrl: z.string().url('Valid website URL is required').optional().or(z.literal('')),
})

export const founderProfileSchema = z.object({
  uniqueValueProposition: z.string().min(10, 'Please describe your unique value proposition'),
  currentTraction: z.string().min(10, 'Please describe your current traction'),
})

export const investorProfileSchema = z.object({
  sectorsAndGeographies: z.string().min(10, 'Please describe your target sectors'),
  checkSizeAndStage: z.string().min(10, 'Please describe your investment criteria'),
})

export const servicePartnerProfileSchema = z.object({
  idealClient: z.string().min(10, 'Please describe your ideal client'),
  servicesOffered: z.string().min(10, 'Please describe your services'),
})

// Complete onboarding schema
export const onboardingSchema = z.object({
  accountType: z.enum(['individual', 'organization']),
  identity: z.union([individualIdentitySchema, organizationIdentitySchema]),
  role: z.enum(['founder', 'investor', 'service-partner']),
  profile: z.union([founderProfileSchema, investorProfileSchema, servicePartnerProfileSchema]),
  deployment: z.enum(['cloud', 'private']),
  memoryTier: z.enum(['standard', 'professional']),
  pricingPlan: z.enum(['core', 'professional', 'institutional']),
})

// Pricing data
export const pricingPlans = {
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

// Store state interface
interface OnboardingState {
  currentStep: number
  totalSteps: number
  
  // Step 1: Account Type
  accountType: AccountType | null
  
  // Step 2: Identity (conditional fields based on account type)
  fullName: string
  email: string
  linkedinUrl: string
  organizationName: string
  workEmail: string
  websiteUrl: string
  
  // Step 3: Role
  role: RoleType | null
  
  // Step 4: Profile (conditional fields based on role)
  uniqueValueProposition: string
  currentTraction: string
  sectorsAndGeographies: string
  checkSizeAndStage: string
  idealClient: string
  servicesOffered: string
  
  // Step 5: Deployment
  deployment: DeploymentType | null
  
  // Step 6: Memory Tier
  memoryTier: MemoryTier | null
  
  // Step 7: Pricing Plan
  pricingPlan: PricingPlan | null
  
  // Step 8: Status
  isSubmitting: boolean
  isComplete: boolean
  
  // Actions
  setAccountType: (type: AccountType) => void
  setIdentityField: (field: string, value: string) => void
  setRole: (role: RoleType) => void
  setProfileField: (field: string, value: string) => void
  setDeployment: (deployment: DeploymentType) => void
  setMemoryTier: (tier: MemoryTier) => void
  setPricingPlan: (plan: PricingPlan) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  setSubmitting: (submitting: boolean) => void
  setComplete: (complete: boolean) => void
  reset: () => void
  
  // Validation helpers
  validateCurrentStep: () => boolean
  getFormData: () => Record<string, unknown>
}

const initialState = {
  currentStep: 1,
  totalSteps: 8,
  accountType: null,
  fullName: '',
  email: '',
  linkedinUrl: '',
  organizationName: '',
  workEmail: '',
  websiteUrl: '',
  role: null,
  uniqueValueProposition: '',
  currentTraction: '',
  sectorsAndGeographies: '',
  checkSizeAndStage: '',
  idealClient: '',
  servicesOffered: '',
  deployment: null,
  memoryTier: null,
  pricingPlan: null,
  isSubmitting: false,
  isComplete: false,
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,
  
  setAccountType: (type) => set({ accountType: type }),
  
  setIdentityField: (field, value) => set({ [field]: value }),
  
  setRole: (role) => set({ role }),
  
  setProfileField: (field, value) => set({ [field]: value }),
  
  setDeployment: (deployment) => set({ deployment }),
  
  setMemoryTier: (tier) => set({ memoryTier: tier }),
  
  setPricingPlan: (plan) => set({ pricingPlan: plan }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  
  goToStep: (step) => set({ currentStep: step }),
  
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  
  setComplete: (complete) => set({ isComplete: complete }),
  
  reset: () => set(initialState),
  
  validateCurrentStep: () => {
    const state = get()
    
    switch (state.currentStep) {
      case 1:
        return state.accountType !== null
      case 2:
        if (state.accountType === 'individual') {
          return state.fullName.length >= 2 && 
                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
        } else {
          return state.organizationName.length >= 2 && 
                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.workEmail)
        }
      case 3:
        return state.role !== null
      case 4:
        if (state.role === 'founder') {
          return state.uniqueValueProposition.length >= 10 && 
                 state.currentTraction.length >= 10
        } else if (state.role === 'investor') {
          return state.sectorsAndGeographies.length >= 10 && 
                 state.checkSizeAndStage.length >= 10
        } else {
          return state.idealClient.length >= 10 && 
                 state.servicesOffered.length >= 10
        }
      case 5:
        return state.deployment !== null
      case 6:
        return state.memoryTier !== null
      case 7:
        return state.pricingPlan !== null
      default:
        return true
    }
  },
  
  getFormData: () => {
    const state = get()
    
    const identityData = state.accountType === 'individual'
      ? { fullName: state.fullName, email: state.email, linkedinUrl: state.linkedinUrl }
      : { organizationName: state.organizationName, workEmail: state.workEmail, websiteUrl: state.websiteUrl }
    
    let profileData = {}
    if (state.role === 'founder') {
      profileData = { uniqueValueProposition: state.uniqueValueProposition, currentTraction: state.currentTraction }
    } else if (state.role === 'investor') {
      profileData = { sectorsAndGeographies: state.sectorsAndGeographies, checkSizeAndStage: state.checkSizeAndStage }
    } else {
      profileData = { idealClient: state.idealClient, servicesOffered: state.servicesOffered }
    }
    
    return {
      accountType: state.accountType,
      identity: identityData,
      role: state.role,
      profile: profileData,
      deployment: state.deployment,
      memoryTier: state.memoryTier,
      pricingPlan: state.pricingPlan,
    }
  },
}))
