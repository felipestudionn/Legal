'use client'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-semibold text-primary">TIC & Legal</h1>
        </div>
      </header>
      <main className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Noticias del sector</h2>
            <p className="text-lg text-muted-foreground">
              Mantente al día con las últimas noticias del sector legal y de las telecomunicaciones en España.
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
