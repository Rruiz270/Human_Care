'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Video,
  Brain,
  Target,
  Plus,
  Users,
} from 'lucide-react'

// Demo data for calendar events
const events = [
  {
    id: '1',
    title: 'Terapia - Dra. Ana Costa',
    type: 'THERAPY',
    date: new Date(Date.now() + 86400000),
    time: '14:00',
    duration: 60,
    isOnline: true,
  },
  {
    id: '2',
    title: 'Coaching - Carlos Mendes',
    type: 'COACHING',
    date: new Date(Date.now() + 86400000 * 4),
    time: '10:00',
    duration: 45,
    isOnline: true,
  },
  {
    id: '3',
    title: 'Check-in Time de Cuidado',
    type: 'CARE_TEAM',
    date: new Date(Date.now() + 86400000 * 7),
    time: '16:00',
    duration: 30,
    isOnline: true,
  },
]

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const monthNames = [
  'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const hasEvent = (day: number) => {
    return events.some((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001011]">Agenda</h2>
          <p className="text-[#757780]">
            Visualize e gerencie suas sessoes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agendar Sessao
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-sm font-medium text-[#757780]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  disabled={day === null}
                  onClick={() => {
                    if (day) {
                      const date = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                      )
                      setSelectedDate(date)
                    }
                  }}
                  className={`
                    relative aspect-square rounded-lg p-2 text-sm transition-colors
                    ${day === null ? 'cursor-default' : 'hover:bg-[#757780]/10'}
                    ${
                      isToday(day || 0)
                        ? 'bg-[#A4DF00] text-[#001011] font-bold hover:bg-[#8BC500]'
                        : ''
                    }
                    ${
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentDate.getMonth()
                        ? 'ring-2 ring-[#6CCFF6]'
                        : ''
                    }
                  `}
                >
                  {day}
                  {day && hasEvent(day) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          isToday(day) ? 'bg-[#001011]' : 'bg-[#6CCFF6]'
                        }`}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Selected date events */}
            {selectedDate && (
              <div className="mt-6 border-t border-[#757780]/20 pt-4">
                <h4 className="font-medium text-[#001011] mb-3">
                  Eventos em {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
                </h4>
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map((event) => (
                      <div
                        key={event.id}
                        className={`flex items-center gap-3 rounded-lg p-3 ${
                          event.type === 'THERAPY'
                            ? 'bg-[#6CCFF6]/10'
                            : event.type === 'COACHING'
                            ? 'bg-[#A4DF00]/10'
                            : 'bg-[#757780]/10'
                        }`}
                      >
                        {event.type === 'THERAPY' ? (
                          <Brain className="h-5 w-5 text-[#6CCFF6]" />
                        ) : event.type === 'COACHING' ? (
                          <Target className="h-5 w-5 text-[#A4DF00]" />
                        ) : (
                          <Users className="h-5 w-5 text-[#757780]" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-[#001011]">{event.title}</p>
                          <p className="text-sm text-[#757780]">
                            {event.time} - {event.duration} min
                          </p>
                        </div>
                        {event.isOnline && (
                          <Badge variant="secondary">
                            <Video className="mr-1 h-3 w-3" />
                            Online
                          </Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#757780]">Nenhum evento nesta data</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-[#6CCFF6]" />
              Proximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-[#757780]/20 p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  {event.type === 'THERAPY' ? (
                    <Brain className="h-4 w-4 text-[#6CCFF6]" />
                  ) : event.type === 'COACHING' ? (
                    <Target className="h-4 w-4 text-[#A4DF00]" />
                  ) : (
                    <Users className="h-4 w-4 text-[#757780]" />
                  )}
                  <span className="font-medium text-[#001011] text-sm">
                    {event.type === 'THERAPY'
                      ? 'Terapia'
                      : event.type === 'COACHING'
                      ? 'Coaching'
                      : 'Check-in'}
                  </span>
                </div>
                <p className="text-sm text-[#757780] mb-2">{event.title}</p>
                <div className="flex items-center gap-3 text-xs text-[#757780]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <p className="text-sm text-[#757780] text-center py-4">
                Nenhum evento agendado
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
