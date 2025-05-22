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
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
            {news.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {news.date}
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
          <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {news.title}
          </a>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
