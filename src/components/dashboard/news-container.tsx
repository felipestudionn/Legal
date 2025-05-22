'use client'

import { useState, useEffect } from 'react'
import { NewsFilters } from '@/components/dashboard/news-filters'
import { NewsGrid } from '@/components/dashboard/news-grid'
import { type News } from '@/lib/types'

// Datos locales temporales mientras la API está en mantenimiento
const mockNews: News[] = [
  {
    id: '1',
    title: 'Nueva regulación europea sobre IA',
    content: 'La UE aprueba una nueva normativa sobre Inteligencia Artificial que afectará al sector tecnológico y legal.',
    date: '2025-05-22',
    category: 'Legal',
    url: 'https://example.com/noticia1'
  },
  {
    id: '2',
    title: 'Actualización RGPD para servicios cloud',
    content: 'El Comité Europeo de Protección de Datos publica nuevas directrices sobre el cumplimiento del RGPD en servicios cloud.',
    date: '2025-05-21',
    category: 'Protección de Datos',
    url: 'https://example.com/noticia2'
  },
  {
    id: '3',
    title: 'Nueva ley de telecomunicaciones',
    content: 'El gobierno español anuncia una nueva ley de telecomunicaciones que regulará el despliegue de redes 5G.',
    date: '2025-05-20',
    category: 'Telecomunicaciones',
    url: 'https://example.com/noticia3'
  },
  {
    id: '4',
    title: 'Directiva NIS2 sobre ciberseguridad',
    content: 'La Directiva NIS2 establece nuevos requisitos de ciberseguridad para empresas y organizaciones en sectores críticos.',
    date: '2025-05-19',
    category: 'Compliance',
    url: 'https://example.com/noticia4'
  }
]

export function NewsContainer() {
  const [news, setNews] = useState<News[]>(mockNews)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>(
    Array.from(new Set(mockNews.map(news => news.category)))
  )

  const fetchNews = (category?: string, date?: string) => {
    setLoading(true)
    let filteredNews = [...mockNews]

    if (category) {
      filteredNews = filteredNews.filter(news => news.category === category)
    }
    if (date) {
      filteredNews = filteredNews.filter(news => {
        const newsDate = new Date(news.date).toISOString().split('T')[0]
        return newsDate === date
      })
    }

    setNews(filteredNews)
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleFilterChange = (filters: { category: string; date: string }) => {
    fetchNews(filters.category, filters.date)
  }

  return (
    <div className="space-y-8">
      <div>
        <NewsFilters 
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>
      
      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Cargando noticias...</p>
        </div>
      ) : (
        <NewsGrid news={news} />
      )}
    </div>
  )
}
