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
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="space-y-2 min-w-[200px]">
          <label className="text-xs font-medium text-muted-foreground">Categoría</label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 min-w-[200px]">
          <label className="text-xs font-medium text-muted-foreground">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, 'PPP', { locale: es })
                ) : (
                  <span>Seleccionar fecha</span>
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
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {(selectedCategory !== 'all' || selectedDate) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCategory('all')
            setSelectedDate(undefined)
            onFilterChange({ category: '', date: '' })
          }}
          className="ml-auto"
        >
          <span className="text-muted-foreground">Limpiar filtros</span>
        </Button>
      )}
    </div>
  )
}
