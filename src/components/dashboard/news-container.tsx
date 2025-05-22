'use client'

import { useState } from 'react'
import { NewsFilters } from '@/components/dashboard/news-filters'
import { NewsGrid } from '@/components/dashboard/news-grid'
import { NEWS_CATEGORIES } from '@/lib/constants'
import { type News } from '@/lib/types'

const initialNews: News[] = [
  {
    id: '1',
    title: 'Nueva regulación europea sobre IA',
    content: 'La UE aprueba una nueva normativa sobre Inteligencia Artificial que afectará al sector tecnológico...',
    date: '2025-05-22',
    category: 'Legal',
    url: 'https://example.com/noticia1'
  },
  {
    id: '2',
    title: 'Telefónica amplía su red 5G',
    content: 'Telefónica ha anunciado la expansión de su red 5G cumpliendo con la nueva normativa...',
    date: '2025-05-21',
    category: 'Infraestructura',
    url: 'https://example.com/noticia2'
  },
  {
    id: '3',
    title: 'Nuevas directrices sobre protección de datos',
    content: 'La AEPD publica nuevas directrices sobre el tratamiento de datos en servicios de telecomunicaciones...',
    date: '2025-05-20',
    category: 'Legal',
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
      <div>
        <NewsFilters 
          categories={Array.from(new Set(NEWS_CATEGORIES))}
          onFilterChange={handleFilterChange}
        />
      </div>
      <NewsGrid news={filteredNews} />
    </div>
  )
}
