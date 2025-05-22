'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface NewsFiltersProps {
  categories: string[]
  onFilterChange: (filters: { category: string; date: string }) => void
}

export function NewsFilters({ categories, onFilterChange }: NewsFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onFilterChange({ 
      category: category === 'all' ? '' : category, 
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '' 
    })
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    onFilterChange({ 
      category: selectedCategory === 'all' ? '' : selectedCategory, 
      date: date ? format(date, 'yyyy-MM-dd') : '' 
    })
  }

  return (
    <div className="mb-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-[250px,250px] gap-6 max-w-[520px] mx-auto">
        <div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-base">
                Todas las categorías
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-base">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 justify-start text-left font-normal text-base bg-white/50 hover:bg-white/80 transition-colors"
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground/70" />
                {selectedDate ? (
                  format(selectedDate, 'PPP', { locale: es })
                ) : (
                  <span className="text-muted-foreground/70">Seleccionar fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
                locale={es}
                className="rounded-md border shadow-md"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {(selectedCategory !== 'all' || selectedDate) && (
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedDate(undefined)
              onFilterChange({ category: '', date: '' })
            }}
            className="hover:bg-white/50 transition-colors"
          >
            <span className="text-muted-foreground/90">Limpiar filtros</span>
          </Button>
        </div>
      )}
    </div>
  )
}
