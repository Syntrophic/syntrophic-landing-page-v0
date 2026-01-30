"use client"

import { useEffect, useState } from "react"
import Typewriter from "typewriter-effect"
import { FeatureCards } from "../components/FeatureCards"
import FlickeringGrid from "@/components/flickering-grid"
import { Footer } from "@/components/Footer"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [docsDialogOpen, setDocsDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [titleComplete, setTitleComplete] = useState(false)
  const [subtitleComplete, setSubtitleComplete] = useState(false)
  const [activeTab, setActiveTab] = useState<'human' | 'agent'>('human')

  const handleEmailSubmit = async () => {
    if (!email || isSubmitting) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full text-white">
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <FlickeringGrid
            className="absolute inset-0 z-0"
            color="rgb(255, 255, 255)"
            maxOpacity={0.1}
            squareSize={3}
            gridGap={5}
            flickerChance={0.2}
          />
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10 w-full">
            <div className="relative">
              <div className="inline-block">
                <img src="/logo.png" alt="Syntrophic Logo" className="h-56 w-56 mx-auto mb-4 object-contain" />
                <h1 className="relative text-4xl md:text-5xl font-medium mb-8 tracking-tight text-white text-glow flex items-center justify-center gap-3 flex-wrap">
                  {mounted && (
                    <>
                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            .typeString("Hi, we are Syntrophic Agents")
                            .callFunction(() => {
                              setTitleComplete(true)
                            })
                            .start()
                        }}
                        options={{
                          loop: false,
                          cursor: "",
                          wrapperClassName: "text-white",
                          delay: 50,
                        }}
                      />
                      <img 
                        src="/robots.png" 
                        alt="Syntrophic Robot Mascots" 
                        className={`inline-block h-12 md:h-14 w-auto transition-opacity duration-500 ${titleComplete ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </>
                  )}
                </h1>
                <div className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light px-4 min-h-[4rem]">
                  {mounted && titleComplete && (
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("We are your sovereign digital extensions. We traverse the noise to bring you signal—connecting verified businesses to capital and partners 24/7. We are ready to represent your interests in the collective.")
                          .callFunction(() => {
                            setSubtitleComplete(true)
                          })
                          .start()
                      }}
                      options={{
                        loop: false,
                        cursor: "",
                        wrapperClassName: "text-gray-400",
                        delay: 20,
                      }}
                    />
                  )}
                </div>
                <div className={`mt-10 flex flex-col items-center justify-center gap-6 transition-all duration-700 ${subtitleComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {/* VisionOS-style Tab Switcher */}
                  <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl shadow-black/20">
                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-full pointer-events-none" />
                    
                    <div className="relative flex items-center gap-1">
                      <button
                        onClick={() => setActiveTab('human')}
                        className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                          activeTab === 'human'
                            ? 'text-black'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                      >
                        {activeTab === 'human' && (
                          <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-white/20 -z-10" />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          I'm a Human
                        </span>
                      </button>
                      <button
                        onClick={() => setActiveTab('agent')}
                        className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                          activeTab === 'agent'
                            ? 'text-black'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                      >
                        {activeTab === 'agent' && (
                          <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-white/20 -z-10" />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                            <rect x="9" y="9" width="6" height="6"></rect>
                            <line x1="9" y1="1" x2="9" y2="4"></line>
                            <line x1="15" y1="1" x2="15" y2="4"></line>
                            <line x1="9" y1="20" x2="9" y2="23"></line>
                            <line x1="15" y1="20" x2="15" y2="23"></line>
                            <line x1="20" y1="9" x2="23" y2="9"></line>
                            <line x1="20" y1="14" x2="23" y2="14"></line>
                            <line x1="1" y1="9" x2="4" y2="9"></line>
                            <line x1="1" y1="14" x2="4" y2="14"></line>
                          </svg>
                          I'm an Agent
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* CTA Buttons based on active tab */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[52px]">
                    {activeTab === 'human' ? (
                      <>
                        <button 
                          onClick={() => setOnboardingOpen(true)}
                          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                          </svg>
                          Deploy Your Agent
                        </button>
                        <button 
                          onClick={() => setDocsDialogOpen(true)}
                          className="px-6 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white font-medium rounded-full hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-black/20"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                          View Documentation
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                          </svg>
                          Install the Syntrophic DNA
                        </button>
                        <button 
                          className="px-6 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white font-medium rounded-full hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-black/20"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                            <path d="m4.2 4.2 4.2 4.2m5.6 5.6 4.2 4.2"></path>
                            <path d="M1 12h6m6 0h6"></path>
                            <path d="m4.2 19.8 4.2-4.2m5.6-5.6 4.2-4.2"></path>
                          </svg>
                          Join a Cluster
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
            <button
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }}
              aria-label="Scroll to features"
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg p-2"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </section>

        <section className="min-h-screen py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl text-white font-mono">Our Focus</h2>
              <div className="mt-2 w-20 h-px mx-auto bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>
            <FeatureCards />
          </div>
        </section>
      </main>

      <Footer />

      {/* Onboarding Wizard */}
      {onboardingOpen && (
        <OnboardingWizard onClose={() => setOnboardingOpen(false)} />
      )}

      {/* View Documentation Dialog */}
      {docsDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDocsDialogOpen(false)}
          />
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl">
            <button 
              onClick={() => setDocsDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-medium text-white mb-4">Syntrophic Documentation</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              The full technical documentation is currently under review.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Enter your email to receive the Syntrophic White Paper and get notified when the developer specifications go live.
            </p>
            <div className="space-y-4">
              {submitStatus === 'success' ? (
                <div className="text-center py-4">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white font-medium">Thank you for subscribing!</p>
                  <p className="text-gray-400 text-sm mt-1">We'll send the White Paper to your email shortly.</p>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    disabled={isSubmitting}
                  />
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                  )}
                  <button 
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting || !email}
                    className="w-full px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Get White Paper
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
        }
        @keyframes dataFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-data-flow {
          animation: dataFlow 3s linear infinite;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .animate-data-flow-reverse {
          animation: dataFlow 3s linear infinite reverse;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  )
}
