'use client'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">TIC & Legal</h1>
            <nav className="flex items-center space-x-8">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Inicio</a>
              <a href="/archivo" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Archivo</a>
              <a href="/sobre-nosotros" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Sobre Nosotros</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          <p className="text-xl text-muted-foreground leading-relaxed text-center">
            Mantente al día con las últimas noticias del sector legal y de las telecomunicaciones en España.
          </p>
          {children}
        </div>
      </main>
    </div>
  )
}
