'use client'

import { useState } from 'react'
import { NewsFilters } from './news-filters'
import { NewsGrid } from './news-grid'
import { NEWS_CATEGORIES } from '@/lib/constants'
import { type News } from '@/lib/types'

const initialNews: News[] = [
  {
    id: '1',
    title: 'Telefónica amplía su red 5G',
    content: 'Telefónica ha anunciado la expansión de su red 5G a más ciudades españolas...',
    date: '2025-05-22',
    category: 'Infraestructura',
    url: 'https://example.com/noticia1'
  },
  {
    id: '2',
    title: 'Orange y MásMóvil finalizan su fusión',
    content: 'La fusión entre Orange y MásMóvil ha sido completada después de recibir todas las aprobaciones...',
    date: '2025-05-21',
    category: 'Empresas',
    url: 'https://example.com/noticia2'
  },
  {
    id: '3',
    title: 'Vodafone lanza nuevo servicio IoT',
    content: 'Vodafone ha presentado su nueva plataforma de IoT para empresas...',
    date: '2025-05-20',
    category: 'Innovación',
    url: 'https://example.com/noticia3'
  }
]

export function NewsContainer() {
  const [filteredNews, setFilteredNews] = useState(initialNews)

  const handleFilterChange = (filters: { category: string; date: string }) => {
    let filtered = [...initialNews]
    if (filters.category) {
      filtered = filtered.filter(news => news.category === filters.category)
    }
    if (filters.date) {
      filtered = filtered.filter(news => {
        const newsDate = new Date(news.date).toISOString().split('T')[0]
        return newsDate === filters.date
      })
    }
    setFilteredNews(filtered)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card/50 p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Filtros</h3>
        </div>
        <NewsFilters 
          categories={Array.from(new Set(NEWS_CATEGORIES))}
          onFilterChange={handleFilterChange}
        />
      </div>
      <NewsGrid news={filteredNews} />
    </div>
  )
}
