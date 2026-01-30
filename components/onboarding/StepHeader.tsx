'use client'

interface StepHeaderProps {
  title: string
  subtitle: string
}

export function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">
        {title}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  )
}
