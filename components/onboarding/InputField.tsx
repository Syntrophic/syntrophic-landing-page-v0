'use client'

import { cn } from '@/lib/utils'

interface InputFieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'url'
  multiline?: boolean
  rows?: number
  required?: boolean
  error?: string
}

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 3,
  required = false,
  error,
}: InputFieldProps) {
  const inputClasses = cn(
    'w-full px-4 py-3 bg-gray-900/60 border rounded-lg text-white placeholder-gray-600',
    'focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-gray-600',
    'transition-all duration-200',
    error ? 'border-red-500/50' : 'border-gray-800/80 hover:border-gray-700/80'
  )

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-gray-600 ml-1">*</span>}
      </label>
      
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(inputClasses, 'resize-none')}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
