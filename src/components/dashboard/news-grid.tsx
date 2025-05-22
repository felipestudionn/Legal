'use client'

import { NewsCard } from './news-card'
import { type News } from '@/lib/types'

interface NewsGridProps {
  news: News[]
}

export function NewsGrid({ news }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No hay noticias que coincidan con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
