'use client'

import { NewsCard } from '@/components/dashboard/news-card'
import { type News } from '@/lib/types'

interface NewsGridProps {
  news: News[]
}

export function NewsGrid({ news }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground/80 max-w-lg mx-auto">
          No hay noticias que coincidan con los filtros seleccionados. Por favor, intenta con otros criterios de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
