export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-900 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Syntrophic" className="h-6 w-6 object-contain" />
          <p className="text-sm text-gray-500">© {currentYear} Syntrophic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
