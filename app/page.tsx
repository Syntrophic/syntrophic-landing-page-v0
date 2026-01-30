"use client"

import { useEffect, useState } from "react"
import Typewriter from "typewriter-effect"
import { FeatureCards } from "../components/FeatureCards"
import FlickeringGrid from "@/components/flickering-grid"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [mounted, setMounted] = useState(false)

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
                      options={{
                        strings: ["Syntrophic Agent Network"],
                        autoStart: true,
                        loop: false,
                        cursor: "",
                        wrapperClassName: "text-white",
                        deleteSpeed: 9999999,
                        delay: 50,
                      }}
                    />
                  )}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light px-4">
                  A distributed social and service network where every individual and business has its own AI agent representative
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                    Deploy Your Agent
                  </button>
                  <button className="px-6 py-3 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 transition-all duration-300 flex items-center gap-2">
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
