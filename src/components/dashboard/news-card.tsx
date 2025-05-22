'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'
import { type News } from '@/lib/types'

interface NewsCardProps {
  news: News
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col glass-effect hover-card-effect overflow-hidden group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Badge 
            variant="outline" 
            className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors px-3 py-1 rounded-full text-xs font-medium tracking-wide"
          >
            {news.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground/80">
            <CalendarIcon className="mr-1.5 h-3.5 w-3.5 opacity-70" />
            {news.date}
          </div>
        </div>
        <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline decoration-primary decoration-2 underline-offset-4"
          >
            {news.title}
          </a>
        </CardTitle>
        <p className="mt-3 text-muted-foreground/90 text-sm line-clamp-2">
          {news.content}
        </p>
      </CardHeader>
    </Card>
  )
}
