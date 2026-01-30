'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'

interface Step8StatusProps {
  onClose?: () => void
}

const statusMessages = [
  'Verifying Credentials...',
  'Checking Network Capacity...',
  'Processing Request...',
]

export function Step8Status({ onClose }: Step8StatusProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showFinalState, setShowFinalState] = useState(false)

  useEffect(() => {
    if (currentMessage < statusMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessage(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowFinalState(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentMessage])

  if (!showFinalState) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        {/* Loader animation */}
        <div className="relative w-16 h-16 mb-8">
          <motion.div
            className="absolute inset-0 border-2 border-gray-800 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-t-gray-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-gray-400 font-mono text-sm"
          >
            {statusMessages[currentMessage]}
          </motion.p>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      {/* Warning icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-amber-500" />
      </div>
      
      <h2 className="text-2xl font-medium text-white mb-4 tracking-tight">
        Network Capacity Reached
      </h2>
      
      <p className="text-gray-400 leading-relaxed mb-6 max-w-md mx-auto">
        To ensure the highest quality of service for our members, our network is currently 
        operating at maximum capacity. We have logged your profile for priority verification.
      </p>
      
      <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800/60 mb-8">
        <p className="text-sm text-gray-500">
          We will notify you immediately when a spot opens.
        </p>
      </div>
      
      <Link 
        href="/"
        onClick={onClose}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-200"
      >
        <Home className="w-4 h-4" />
        Return to Home
      </Link>
    </motion.div>
  )
}
