'use client'

import { useState, useEffect } from 'react'
import { NewsFilters } from '@/components/dashboard/news-filters'
import { NewsGrid } from '@/components/dashboard/news-grid'
import { type News } from '@/lib/types'

const API_URL = 'https://legal-zilq.onrender.com'

export function NewsContainer() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  // Función para obtener las noticias
  const fetchNews = async (category?: string, date?: string) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/news`)
      if (!response.ok) throw new Error('Error al cargar las noticias')
      
      const data = await response.json()
      let filteredNews = data.news

      // Aplicar filtros en el cliente
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
      
      // Extraer categorías únicas de las noticias
      const uniqueCategories = Array.from(new Set(data.news.map((news: News) => news.category))) as string[]
      setCategories(uniqueCategories)
    } catch (err) {
      setError('Error al cargar las noticias. Por favor, intenta más tarde.')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  // Cargar noticias al montar el componente
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
