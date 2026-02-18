'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Play,
  Clock,
  Calendar,
  Video,
  BookOpen,
  Brain,
  Target,
  Heart,
  Users,
  CheckCircle,
  Star,
  Filter,
  Search,
  Plus,
  CalendarPlus,
} from 'lucide-react'

// Demo videos data
const videos = [
  {
    id: '1',
    title: 'Introdução ao Mapa da Vida',
    description: 'Entenda como funciona a metodologia do Mapa da Vida e como ela pode transformar sua jornada de autoconhecimento.',
    duration: '15:30',
    category: 'fundamentos',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Dra. Ana Costa',
    watched: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Trabalhando com Traumas do Passado',
    description: 'Técnicas terapêuticas para identificar e processar experiências traumáticas de forma segura.',
    duration: '28:45',
    category: 'terapia',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Dra. Ana Costa',
    watched: true,
    progress: 65,
  },
  {
    id: '3',
    title: 'Definindo Metas com OKRs',
    description: 'Aprenda a usar a metodologia OKR para definir e alcançar seus objetivos pessoais e profissionais.',
    duration: '22:10',
    category: 'coaching',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Carlos Mendes',
    watched: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Mindfulness para o Dia a Dia',
    description: 'Práticas simples de mindfulness que você pode incorporar na sua rotina diária.',
    duration: '18:20',
    category: 'autocuidado',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Lucia Fernandes',
    watched: false,
    progress: 0,
  },
  {
    id: '5',
    title: 'Comunicação Não-Violenta',
    description: 'Como melhorar seus relacionamentos através da comunicação empática e assertiva.',
    duration: '35:00',
    category: 'relacionamentos',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Dra. Ana Costa',
    watched: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'Gestão do Estresse',
    description: 'Estratégias práticas para identificar gatilhos de estresse e desenvolver resiliência.',
    duration: '24:15',
    category: 'autocuidado',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Carlos Mendes',
    watched: true,
    progress: 100,
  },
  {
    id: '7',
    title: 'Construindo Hábitos Saudáveis',
    description: 'A ciência por trás da formação de hábitos e como criar rotinas que funcionam.',
    duration: '20:00',
    category: 'coaching',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Carlos Mendes',
    watched: false,
    progress: 30,
  },
  {
    id: '8',
    title: 'Autocompaixão e Aceitação',
    description: 'Aprenda a ser mais gentil consigo mesmo e a aceitar suas imperfeições.',
    duration: '19:45',
    category: 'terapia',
    thumbnail: '/api/placeholder/320/180',
    instructor: 'Dra. Ana Costa',
    watched: false,
    progress: 0,
  },
]

// Available time slots for scheduling
const availableSlots = [
  { date: '2026-02-09', time: '09:00', professional: 'Dra. Ana Costa', type: 'THERAPY' },
  { date: '2026-02-09', time: '14:00', professional: 'Carlos Mendes', type: 'COACHING' },
  { date: '2026-02-10', time: '10:00', professional: 'Dra. Ana Costa', type: 'THERAPY' },
  { date: '2026-02-10', time: '15:00', professional: 'Lucia Fernandes', type: 'CARE_TEAM' },
  { date: '2026-02-11', time: '11:00', professional: 'Carlos Mendes', type: 'COACHING' },
  { date: '2026-02-12', time: '09:00', professional: 'Dra. Ana Costa', type: 'THERAPY' },
  { date: '2026-02-12', time: '14:00', professional: 'Lucia Fernandes', type: 'CARE_TEAM' },
  { date: '2026-02-13', time: '10:00', professional: 'Carlos Mendes', type: 'COACHING' },
]

const categories = [
  { value: 'all', label: 'Todos', icon: BookOpen },
  { value: 'fundamentos', label: 'Fundamentos', icon: Star },
  { value: 'terapia', label: 'Terapia', icon: Brain },
  { value: 'coaching', label: 'Coaching', icon: Target },
  { value: 'autocuidado', label: 'Autocuidado', icon: Heart },
  { value: 'relacionamentos', label: 'Relacionamentos', icon: Users },
]

export default function ConteudoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<typeof availableSlots[0] | null>(null)
  const [scheduleNotes, setScheduleNotes] = useState('')
  const [scheduledSessions, setScheduledSessions] = useState<Array<typeof availableSlots[0] & { notes: string }>>([])

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const watchedCount = videos.filter(v => v.watched).length
  const inProgressCount = videos.filter(v => v.progress > 0 && v.progress < 100).length

  const handleScheduleSession = () => {
    if (selectedSlot) {
      setScheduledSessions([...scheduledSessions, { ...selectedSlot, notes: scheduleNotes }])
      setIsScheduleDialogOpen(false)
      setSelectedSlot(null)
      setScheduleNotes('')
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'THERAPY': return 'Terapia'
      case 'COACHING': return 'Coaching'
      case 'CARE_TEAM': return 'Time de Cuidado'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'THERAPY': return 'bg-[#B8755C]/10 text-[#B8755C]'
      case 'COACHING': return 'bg-[#8B9E7C]/10 text-[#8B9E7C]'
      case 'CARE_TEAM': return 'bg-amber-500/10 text-amber-500'
      default: return 'bg-[#8C8580]/10 text-[#8C8580]'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1E]">Conteúdo e Sessões</h1>
          <p className="text-[#8C8580]">Vídeos educativos e agendamento de sessões ao vivo</p>
        </div>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Agendar Sessão ao Vivo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Agendar Sessão ao Vivo</DialogTitle>
              <DialogDescription>
                Escolha um horário disponível para sua próxima sessão
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Horários Disponíveis</Label>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedSlot === slot
                          ? 'border-[#B8755C] bg-[#B8755C]/10'
                          : 'border-[#8C8580]/20 hover:border-[#B8755C]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#1A1A1E]">{formatDate(slot.date)}</p>
                          <p className="text-sm text-[#8C8580]">{slot.time} - {slot.professional}</p>
                        </div>
                        <Badge className={getTypeColor(slot.type)}>
                          {getTypeLabel(slot.type)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedSlot && (
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações para a sessão (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Descreva o que gostaria de trabalhar nesta sessão..."
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleScheduleSession}
                disabled={!selectedSlot}
              >
                Confirmar Agendamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8755C]">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{videos.length}</p>
                <p className="text-sm text-[#8C8580]">Vídeos Disponíveis</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B9E7C]">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{watchedCount}</p>
                <p className="text-sm text-[#8C8580]">Assistidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
                <Play className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{inProgressCount}</p>
                <p className="text-sm text-[#8C8580]">Em Progresso</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{scheduledSessions.length}</p>
                <p className="text-sm text-[#8C8580]">Sessões Agendadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="agendadas">Sessões Agendadas ({scheduledSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8580]" />
              <Input
                placeholder="Buscar vídeos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={selectedCategory === cat.value ? '' : ''}
                  >
                    <Icon className="mr-1 h-4 w-4" />
                    {cat.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden card-hover cursor-pointer group">
                <div
                  className="relative"
                  onClick={() => {
                    setSelectedVideo(video)
                    setIsVideoDialogOpen(true)
                  }}
                >
                  {/* Thumbnail placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#B8755C]/20 to-[#8B9E7C]/20 flex items-center justify-center relative">
                    <Video className="h-12 w-12 text-[#1A1A1E]/20" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-3 bg-white rounded-full shadow-lg">
                          <Play className="h-6 w-6 text-[#1A1A1E] fill-[#1A1A1E]" />
                        </div>
                      </div>
                    </div>
                    {video.watched && video.progress === 100 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#8B9E7C] text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Assistido
                        </Badge>
                      </div>
                    )}
                    {video.progress > 0 && video.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#8C8580]/20">
                        <div
                          className="h-full bg-[#B8755C]"
                          style={{ width: `${video.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === video.category)?.label}
                      </Badge>
                      <span className="text-xs text-[#8C8580] flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {video.duration}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1A1A1E] line-clamp-2 mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-[#8C8580] line-clamp-2 mb-2">
                      {video.description}
                    </p>
                    <p className="text-xs text-[#8C8580]">
                      {video.instructor}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-[#8C8580]">Nenhum vídeo encontrado para os filtros selecionados.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="agendadas" className="space-y-4">
          {scheduledSessions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {scheduledSessions.map((session, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getTypeColor(session.type)}>
                        {getTypeLabel(session.type)}
                      </Badge>
                      <Badge variant="outline" className="text-[#8B9E7C] border-[#8B9E7C]">
                        Confirmada
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{session.professional}</CardTitle>
                    <CardDescription>
                      {formatDate(session.date)} às {session.time}
                    </CardDescription>
                  </CardHeader>
                  {session.notes && (
                    <CardContent>
                      <div className="bg-[#F5F0EB] p-3 rounded-md">
                        <p className="text-sm text-[#8C8580]">
                          <span className="font-medium text-[#1A1A1E]">Suas observações:</span><br />
                          {session.notes}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 text-[#8C8580] mx-auto mb-4" />
              <h3 className="font-semibold text-[#1A1A1E] mb-2">Nenhuma sessão agendada</h3>
              <p className="text-[#8C8580] mb-4">
                Agende uma sessão ao vivo com nossos profissionais para dar continuidade ao seu desenvolvimento.
              </p>
              <Button
                onClick={() => setIsScheduleDialogOpen(true)}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Agendar Primeira Sessão
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedVideo && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedVideo.title}</DialogTitle>
                <DialogDescription>
                  {selectedVideo.instructor} | {selectedVideo.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Video Player Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#1A1A1E] to-[#1A1A1E]/80 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="p-4 bg-white/10 rounded-full inline-block mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                      <Play className="h-12 w-12 text-white fill-white" />
                    </div>
                    <p className="text-white/80 text-sm">Clique para reproduzir</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1E] mb-2">Sobre este vídeo</h4>
                  <p className="text-[#8C8580]">{selectedVideo.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {categories.find(c => c.value === selectedVideo.category)?.label}
                  </Badge>
                  {selectedVideo.progress > 0 && (
                    <Badge variant="outline" className="text-[#B8755C] border-[#B8755C]">
                      {selectedVideo.progress}% concluído
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
