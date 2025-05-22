'use client'

import { useState, useEffect, useCallback } from 'react'
import { NewsFilters } from '@/components/dashboard/news-filters'
import { NewsGrid } from '@/components/dashboard/news-grid'
import { type News } from '@/lib/types'

const API_URL = 'https://legal-news-api.onrender.com'
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
      
      if (response.status === 503 || response.status === 504 || response.status === 404) {
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
    setIsWakingUp(true) // Reiniciar el estado de wake up al cambiar filtros
    setRetryCount(0) // Reiniciar el contador de intentos
    fetchNewsWithRetry(filters.category, filters.date)
  }, [fetchNewsWithRetry])

  useEffect(() => {
    fetchNewsWithRetry()
  }, [fetchNewsWithRetry])

  return (
    <div className="space-y-8">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
          <NewsFilters 
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="min-h-[200px]">
          {isWakingUp ? (
            <div className="text-center py-12 px-4 bg-gradient-to-b from-amber-50/50 to-amber-100/50 rounded-xl border border-amber-200/50 shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-[3px] border-amber-200 border-t-amber-500 mx-auto mb-4"></div>
              <p className="text-amber-700 font-medium text-lg mb-2">
                Despertando el servidor... 
                {retryCount > 0 && ` (Intento ${retryCount} de ${MAX_RETRIES})`}
              </p>
              <p className="text-amber-600/80 text-sm">
                El servidor está iniciándose, esto puede tomar unos segundos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600">{error}</p>
            </div>
          ) : loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando noticias...</p>
            </div>
          ) : (
            <NewsGrid news={news} />
          )}
        </div>
      </div>
    </div>
  )
}
