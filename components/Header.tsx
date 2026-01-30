'use client'

interface HeaderProps {
  onDocsClick: () => void
}

export function Header({ onDocsClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Syntrophic Logo" 
            className="h-8 w-8 object-contain"
          />
          <span className="text-white font-medium text-lg">Syntrophic</span>
        </div>

        {/* Right: Navigation Links */}
        <nav className="flex items-center gap-6">
          <button
            onClick={onDocsClick}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Documentation
          </button>
          <a
            href="mailto:info@flagshipgamestudio.com"
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
