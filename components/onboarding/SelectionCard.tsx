'use client'

import { cn } from '@/lib/utils'

interface SelectionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  selected: boolean
  onClick: () => void
  variant?: 'large' | 'medium' | 'small'
}

export function SelectionCard({ 
  icon, 
  title, 
  description, 
  selected, 
  onClick,
  variant = 'large'
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-full text-left rounded-xl border transition-all duration-200 overflow-hidden group hover:scale-[1.01] active:scale-[0.99]',
        variant === 'large' && 'p-6',
        variant === 'medium' && 'p-5',
        variant === 'small' && 'p-4',
        selected
          ? 'bg-white/[0.06] border-white/30 shadow-lg shadow-white/5'
          : 'bg-gray-900/40 border-gray-800/60 hover:border-gray-700/60 hover:bg-gray-800/30'
      )}
    >
      {/* Selected indicator glow */}
      {selected && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none opacity-100 transition-opacity duration-200"
        />
      )}
      
      {/* Checkmark indicator */}
      <div className={cn(
        'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
        selected 
          ? 'bg-white border-white' 
          : 'border-gray-600 group-hover:border-gray-500'
      )}>
        {selected && (
          <svg
            className="w-3 h-3 text-black scale-100 transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      
      {/* Content */}
      <div className="relative flex items-start gap-4">
        <div className={cn(
          'flex-shrink-0 rounded-lg flex items-center justify-center transition-colors duration-200',
          variant === 'large' && 'w-12 h-12',
          variant === 'medium' && 'w-10 h-10',
          variant === 'small' && 'w-9 h-9',
          selected
            ? 'bg-white/10 text-white'
            : 'bg-gray-800/60 text-gray-400 group-hover:text-gray-300'
        )}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0 pr-8">
          <h3 className={cn(
            'font-medium transition-colors duration-200',
            variant === 'large' && 'text-lg mb-1.5',
            variant === 'medium' && 'text-base mb-1',
            variant === 'small' && 'text-sm mb-0.5',
            selected ? 'text-white' : 'text-gray-200'
          )}>
            {title}
          </h3>
          <p className={cn(
            'text-gray-500 leading-relaxed',
            variant === 'large' && 'text-sm',
            variant === 'medium' && 'text-sm',
            variant === 'small' && 'text-xs'
          )}>
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}
