'use client'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full glass-effect">
        <div className="container flex h-20 items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text tracking-tight">TIC & Legal</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Inicio</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Archivo</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</a>
          </nav>
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
