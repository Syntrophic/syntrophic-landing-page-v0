export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-900 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© {currentYear} Syntrophic. All rights reserved.</p>
        <p className="text-sm text-gray-500">Contact: info@syntrophic.co</p>
      </div>
    </footer>
  )
}
