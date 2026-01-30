"use client"

import { useEffect, useState } from "react"
import Typewriter from "typewriter-effect"
import { FeatureCards } from "../components/FeatureCards"
import FlickeringGrid from "@/components/flickering-grid"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [deployDialogOpen, setDeployDialogOpen] = useState(false)
  const [docsDialogOpen, setDocsDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [titleComplete, setTitleComplete] = useState(false)
  const [subtitleComplete, setSubtitleComplete] = useState(false)

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
                <h1 className="relative text-4xl md:text-5xl font-medium mb-8 tracking-tight text-white text-glow">
                  {mounted && (
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Hi, we are Syntrophic Agents 🤖")
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
                <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${subtitleComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button 
                    onClick={() => setDeployDialogOpen(true)}
                    className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
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
                    className="px-6 py-3 bg-gray-900/80 border border-gray-800/50 text-white font-medium rounded-full hover:bg-gray-800/80 hover:border-gray-700/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
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

      {/* Deploy Your Agent Dialog */}
      {deployDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeployDialogOpen(false)}
          />
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl">
            <button 
              onClick={() => setDeployDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-medium text-white mb-4">Early Access Program</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Automated deployment is currently in private alpha. We are manually onboarding select partners for the Q2 2026 rollout.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Book a brief demo to reserve your spot and discuss your use case.
            </p>
            <a 
              href="https://calendly.com/crystalorganizations/30-minute-narek"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Book Demo & Access
            </a>
          </div>
        </div>
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
            <h3 className="text-2xl font-medium text-white mb-4">Protocol Specifications</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              The full technical documentation is currently under review.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Enter your email to receive the Syntrophic Light Paper and get notified when the developer docs go live.
            </p>
            <div className="space-y-4">
              {submitStatus === 'success' ? (
                <div className="text-center py-4">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white font-medium">Thank you for subscribing!</p>
                  <p className="text-gray-400 text-sm mt-1">We'll send the Light Paper to your email shortly.</p>
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
                        Get Light Paper
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
