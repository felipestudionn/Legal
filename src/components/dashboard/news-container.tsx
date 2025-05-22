'use client'

import { useState, useEffect, useCallback } from 'react'
import { NewsFilters } from '@/components/dashboard/news-filters'
import { NewsGrid } from '@/components/dashboard/news-grid'
import { type News } from '@/lib/types'

const API_URL = 'https://legal-zilq.onrender.com'
const MAX_RETRIES = 3
const RETRY_DELAY = 10000 // 10 segundos

// Datos de respaldo en caso de error
const fallbackNews: News[] = [
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
  }
]

export function NewsContainer() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [isWakingUp, setIsWakingUp] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const fetchNewsWithRetry = useCallback(async (category?: string, date?: string) => {
    try {
      const response = await fetch(`${API_URL}/news`)
      
      if (response.status === 503 || response.status === 504) {
        // Servidor en modo sleep o iniciando
        setIsWakingUp(true)
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
            fetchNewsWithRetry(category, date)
          }, RETRY_DELAY)
          return
        }
      }
      
      if (!response.ok) throw new Error('Error al cargar las noticias')
      
      const data = await response.json()
      let filteredNews = data.news

      // Aplicar filtros
      if (category) {
        filteredNews = filteredNews.filter((news: News) => news.category === category)
      }
      if (date) {
        filteredNews = filteredNews.filter((news: News) => {
          const newsDate = new Date(news.date).toISOString().split('T')[0]
          return newsDate === date
        })
      }

      setNews(filteredNews)
      setCategories(Array.from(new Set(data.news.map((news: News) => news.category))) as string[])
      setIsWakingUp(false)
      setRetryCount(0)
      setError('')
    } catch (err) {
      console.error('Error fetching news:', err)
      if (retryCount < MAX_RETRIES) {
        // Reintento automático
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          fetchNewsWithRetry(category, date)
        }, RETRY_DELAY)
      } else {
        // Usar datos de respaldo después de agotar reintentos
        setNews(fallbackNews)
        setCategories(Array.from(new Set(fallbackNews.map(news => news.category))))
        setError('No se pudo conectar con el servidor. Mostrando noticias guardadas.')
      }
    } finally {
      setLoading(false)
    }
  }, [retryCount])

  const handleFilterChange = useCallback((filters: { category: string; date: string }) => {
    setLoading(true)
    fetchNewsWithRetry(filters.category, filters.date)
  }, [fetchNewsWithRetry])

  useEffect(() => {
    fetchNewsWithRetry()
  }, [fetchNewsWithRetry])

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
      
      {isWakingUp && (
        <div className="text-center py-4">
          <p className="text-amber-500">
            Despertando el servidor... 
            {retryCount > 0 && `(Intento ${retryCount} de ${MAX_RETRIES})`}
          </p>
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
