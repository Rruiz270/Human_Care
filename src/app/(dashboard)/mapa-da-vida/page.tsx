'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Clock,
  Heart,
  Brain,
  Users,
  Target,
  Star,
  AlertCircle,
  Plus,
  Sparkles,
  MapPin,
  Shield,
  Zap,
  Eye,
} from 'lucide-react'
import { EditorialQuote } from '@/components/ui/decorative-elements'
import {
  AvatarStatusBar,
  InventoryPanel,
  GameplayPhase,
  TopographicMap,
} from '@/components/ui/rpg-components'

// Demo data for timeline
const timelineEvents = [
  { id: '1', title: 'Nascimento', eventType: 'MILESTONE', ageAtEvent: 0, isPositive: true, impact: 10, description: 'Nasceu em Sao Paulo' },
  { id: '2', title: 'Inicio da escola', eventType: 'EDUCATION', ageAtEvent: 6, isPositive: true, impact: 7, description: 'Primeiro dia na escola primaria' },
  { id: '3', title: 'Perda do avo', eventType: 'LOSS', ageAtEvent: 12, isPositive: false, impact: 8, description: 'Falecimento do avo paterno' },
  { id: '4', title: 'Formatura pedagogia', eventType: 'ACHIEVEMENT', ageAtEvent: 23, isPositive: true, impact: 9, description: 'Conclusao da graduacao em Pedagogia' },
  { id: '5', title: 'Primeiro emprego como professor', eventType: 'CAREER', ageAtEvent: 24, isPositive: true, impact: 8, description: 'Inicio da carreira docente' },
  { id: '6', title: 'Burnout', eventType: 'HEALTH', ageAtEvent: 30, isPositive: false, impact: 7, description: 'Episodio de esgotamento profissional' },
]

const familyRelations = [
  { id: '1', name: 'Jose (Pai)', relationType: 'FATHER', quality: 6, isAlive: true },
  { id: '2', name: 'Maria (Mae)', relationType: 'MOTHER', quality: 8, isAlive: true },
  { id: '3', name: 'Pedro (Irmao)', relationType: 'SIBLING', quality: 7, isAlive: true },
  { id: '4', name: 'Carlos (Marido)', relationType: 'SPOUSE', quality: 8, isAlive: true },
  { id: '5', name: 'Ana (Filha)', relationType: 'CHILD', quality: 10, isAlive: true },
]

const bodyHealthData = {
  weight: 65,
  height: 1.65,
  sleepHours: 6.5,
  sleepQuality: 6,
  exerciseFrequency: '2x por semana',
  energyLevel: 6,
}

const mindStateData = {
  workDescription: 'Professora de ensino fundamental',
  workHoursPerDay: 8,
  stressLevel: 7,
  screenTimeHours: 4,
  mainWorries: ['Pressao no trabalho', 'Falta de tempo', 'Preocupacoes financeiras'],
}

const purposeData = {
  statement: 'Transformar vidas atraves da educacao, inspirando alunos a descobrirem seu potencial.',
  dreams: ['Escrever um livro sobre educacao', 'Abrir uma escola inovadora', 'Viajar para 20 paises'],
  legacy: 'Ser lembrada como uma professora que fez diferenca na vida de seus alunos.',
}

const projects = [
  { id: '1', title: 'Mestrado em Educacao', status: 'IN_PROGRESS', progress: 45, category: 'Carreira' },
  { id: '2', title: 'Curso de ingles', status: 'IN_PROGRESS', progress: 30, category: 'Desenvolvimento' },
  { id: '3', title: 'Reforma da casa', status: 'PLANNING', progress: 10, category: 'Pessoal' },
]

type MapZone = 'overview' | 'past' | 'present' | 'future'

export default function MapaDaVidaPage() {
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [activeZone, setActiveZone] = useState<MapZone>('overview')
  const [selectedEvent, setSelectedEvent] = useState<typeof timelineEvents[0] | null>(null)

  const handleWaypointClick = (point: 'ponto0' | 'pontoA' | 'pontoB') => {
    if (point === 'ponto0') setActiveZone('past')
    else if (point === 'pontoA') setActiveZone('present')
    else setActiveZone('future')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Mapa do Mundo</h2>
          <p className="text-[#8C8580]">
            Navegue pelo territorio da sua vida — Ponto 0 ao Ponto B
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                Novo Marcador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Marcador no Mapa</DialogTitle>
                <DialogDescription>
                  Registre um momento importante da sua vida
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titulo</Label>
                  <Input id="title" placeholder="Ex: Formatura, Casamento, etc" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Evento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACHIEVEMENT">Conquista</SelectItem>
                      <SelectItem value="TRAUMA">Trauma / Bloqueio</SelectItem>
                      <SelectItem value="LOSS">Perda</SelectItem>
                      <SelectItem value="GAIN">Ganho</SelectItem>
                      <SelectItem value="MILESTONE">Marco</SelectItem>
                      <SelectItem value="RELATIONSHIP">Relacionamento</SelectItem>
                      <SelectItem value="HEALTH">Saude</SelectItem>
                      <SelectItem value="EDUCATION">Educacao</SelectItem>
                      <SelectItem value="CAREER">Carreira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input id="age" type="number" placeholder="Ex: 25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="impact">Impacto (1-10)</Label>
                    <Input id="impact" type="number" min="1" max="10" placeholder="Ex: 8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descricao</Label>
                  <Textarea id="description" placeholder="Descreva o evento..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPositive" className="rounded" />
                  <Label htmlFor="isPositive">Este foi um evento positivo</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowAddEventDialog(false)}>
                  Salvar Marcador
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ═══ FULL-WIDTH TOPOGRAPHIC MAP ═══ */}
      <TopographicMap compact={false} onWaypointClick={handleWaypointClick} />

      {/* Zone Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { key: 'overview' as MapZone, label: 'Visao Geral', icon: Eye },
          { key: 'past' as MapZone, label: 'Territorio Conhecido', icon: Clock },
          { key: 'present' as MapZone, label: 'Base Operacional', icon: Shield },
          { key: 'future' as MapZone, label: 'Territorio Desconhecido', icon: Sparkles },
        ].map((zone) => (
          <Button
            key={zone.key}
            variant={activeZone === zone.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveZone(zone.key)}
            className="text-xs"
          >
            <zone.icon className="mr-1.5 h-3.5 w-3.5" />
            {zone.label}
          </Button>
        ))}
      </div>

      {/* ═══ TERRITORY: PAST (Territorio Conhecido) ═══ */}
      {(activeZone === 'overview' || activeZone === 'past') && (
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#8B9E7C] flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#8B9E7C]" />
            Territorio Conhecido — Passado
          </h3>

          {/* Timeline as Map Markers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-[#8B9E7C]" />
                Marcadores no Mapa
              </CardTitle>
              <CardDescription>
                Eventos plotados no territorio da sua historia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#8C8580]/20" />
                <div className="space-y-4">
                  {timelineEvents.map((event) => (
                    <div key={event.id} className="relative pl-10">
                      <div
                        className={`absolute left-2 top-2 h-5 w-5 rounded-full border-4 ${
                          event.isPositive
                            ? 'border-[#8B9E7C] bg-white'
                            : 'border-[#B8755C] bg-white'
                        }`}
                      />
                      <div
                        className={`rounded-lg border p-3 cursor-pointer transition-colors hover:shadow-sm ${
                          event.isPositive
                            ? 'border-[#8B9E7C]/30 bg-[#8B9E7C]/5 hover:bg-[#8B9E7C]/10'
                            : 'border-[#B8755C]/30 bg-[#B8755C]/5 hover:bg-[#B8755C]/10'
                        }`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-[#1A1A1E] text-sm">{event.title}</h4>
                              <Badge variant={event.isPositive ? 'secondary' : 'destructive'} className="text-[10px]">
                                {event.isPositive ? (
                                  <Star className="mr-1 h-2.5 w-2.5" />
                                ) : (
                                  <AlertCircle className="mr-1 h-2.5 w-2.5" />
                                )}
                                {event.eventType === 'ACHIEVEMENT' && 'Conquista'}
                                {event.eventType === 'TRAUMA' && 'Bloqueio'}
                                {event.eventType === 'LOSS' && 'Perda'}
                                {event.eventType === 'MILESTONE' && 'Marco'}
                                {event.eventType === 'EDUCATION' && 'Educacao'}
                                {event.eventType === 'CAREER' && 'Carreira'}
                                {event.eventType === 'HEALTH' && 'Debuff'}
                              </Badge>
                            </div>
                            <p className="mt-0.5 text-xs text-[#8C8580]">{event.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-mono font-bold text-[#1A1A1E]">
                              {event.ageAtEvent}
                            </span>
                            <p className="text-[10px] font-mono text-[#8C8580]">anos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Relations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-[#B8755C]" />
                Companheiros de Jornada
              </CardTitle>
              <CardDescription>NPCs que moldaram sua historia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {familyRelations.map((relation) => (
                  <div key={relation.id} className="encounter-card rounded-lg border border-[#8C8580]/20 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-[#1A1A1E]">{relation.name}</h4>
                        <p className="text-[10px] font-mono text-[#8C8580]">
                          {relation.relationType === 'FATHER' && 'Pai'}
                          {relation.relationType === 'MOTHER' && 'Mae'}
                          {relation.relationType === 'SIBLING' && 'Irmao(a)'}
                          {relation.relationType === 'SPOUSE' && 'Conjuge'}
                          {relation.relationType === 'CHILD' && 'Filho(a)'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-mono font-bold text-[#1A1A1E]">{relation.quality}</span>
                        <p className="text-[10px] font-mono text-[#8C8580]">/10</p>
                      </div>
                    </div>
                    <div className="mt-2 rpg-status-bar h-2">
                      <div
                        className="rpg-status-bar-fill bg-gradient-to-r from-[#6E8160] via-[#8B9E7C] to-[#A3B596]"
                        style={{ width: `${relation.quality * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ═══ TERRITORY: PRESENT (Base Operacional) ═══ */}
      {(activeZone === 'overview' || activeZone === 'present') && (
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8755C] flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#B8755C] animate-pulse" />
            Base Operacional — Status do Avatar
          </h3>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Body Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-red-500" />
                  Corpo (HP)
                </CardTitle>
                <CardDescription>Status fisico do avatar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <AvatarStatusBar label="Sono" value={Math.round(bodyHealthData.sleepQuality * 10)} color="sage" icon={Clock} />
                <AvatarStatusBar label="Energia Fisica" value={bodyHealthData.energyLevel * 10} color="copper" icon={Zap} />

                <div className="grid grid-cols-2 gap-3">
                  <div className="inventory-item">
                    <p className="text-[10px] font-mono text-[#8C8580]">Peso</p>
                    <p className="text-lg font-mono font-bold text-[#1A1A1E]">{bodyHealthData.weight} kg</p>
                  </div>
                  <div className="inventory-item">
                    <p className="text-[10px] font-mono text-[#8C8580]">Altura</p>
                    <p className="text-lg font-mono font-bold text-[#1A1A1E]">{bodyHealthData.height} m</p>
                  </div>
                </div>

                <div className="inventory-item">
                  <p className="text-[10px] font-mono text-[#8C8580]">Exercicios</p>
                  <p className="text-sm font-medium text-[#1A1A1E]">{bodyHealthData.exerciseFrequency}</p>
                </div>
              </CardContent>
            </Card>

            {/* Mind Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-[#8B9E7C]" />
                  Mente (MP)
                </CardTitle>
                <CardDescription>Status mental e exposicao</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <AvatarStatusBar
                  label="Estresse"
                  value={mindStateData.stressLevel * 10}
                  color="danger"
                  icon={AlertCircle}
                />

                <div className="inventory-item">
                  <p className="text-[10px] font-mono text-[#8C8580]">Trabalho</p>
                  <p className="text-sm font-medium text-[#1A1A1E]">{mindStateData.workDescription}</p>
                  <p className="text-xs text-[#8C8580]">{mindStateData.workHoursPerDay}h por dia</p>
                </div>

                <div className="inventory-item">
                  <p className="text-[10px] font-mono text-[#8C8580]">Tempo de Tela</p>
                  <p className="text-lg font-mono font-bold text-[#1A1A1E]">{mindStateData.screenTimeHours}h/dia</p>
                </div>

                <div>
                  <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
                    Gatilhos / Debuffs
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {mindStateData.mainWorries.map((worry, index) => (
                      <Badge key={index} variant="outline" className="text-[10px] border-[#B8755C]/30 text-[#B8755C]">
                        <Shield className="mr-1 h-2.5 w-2.5" />
                        {worry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory section */}
          <div className="grid gap-4 lg:grid-cols-2">
            <InventoryPanel timeAvailable={68} energyQuality={55} />
            <GameplayPhase missions={[
              { title: 'Respiracao 4-7-8', phase: 'morning' },
              { title: 'Revisao de metas', phase: 'afternoon' },
              { title: 'Journaling', phase: 'night' },
            ]} />
          </div>
        </div>
      )}

      {/* ═══ TERRITORY: FUTURE (Territorio Desconhecido) ═══ */}
      {(activeZone === 'overview' || activeZone === 'future') && (
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#DAA520] flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#DAA520] glow-beacon" />
            Territorio Desconhecido — Fog of War
          </h3>

          {/* Purpose as distant beacon */}
          <Card className="border-[#DAA520]/30 bg-gradient-to-br from-[#DAA520]/5 to-transparent relative overflow-hidden">
            {/* Fog overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2C2C2C]/10 pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-[#DAA520]" />
                Proposito — Ponto B
              </CardTitle>
              <CardDescription>O farol no fim da nevoa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-white/80 p-4 shadow-sm border border-[#DAA520]/20">
                <p className="text-lg font-serif font-medium text-[#1A1A1E]">
                  &quot;{purposeData.statement}&quot;
                </p>
              </div>

              {/* Dreams as constellations */}
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
                  Constelacoes (Sonhos)
                </p>
                <div className="space-y-2">
                  {purposeData.dreams.map((dream, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-md border border-[#DAA520]/20 bg-[#DAA520]/5 p-2.5">
                      <Star className="h-4 w-4 text-[#DAA520]" />
                      <span className="text-sm text-[#1A1A1E]">{dream}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legacy */}
              <div className="rounded-lg bg-[#1A1A1E] p-4 text-white">
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Legado</p>
                <p className="text-sm">{purposeData.legacy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Projects as paths through fog */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-[#8B9E7C]" />
                    Caminhos na Nevoa
                  </CardTitle>
                  <CardDescription>Projetos sendo explorados</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Caminho
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="quest-scroll">
                    <div className="quest-scroll-border" />
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-[#1A1A1E]">{project.title}</h4>
                            <Badge variant={project.status === 'IN_PROGRESS' ? 'default' : 'outline'} className="text-[10px]">
                              {project.status === 'IN_PROGRESS' ? 'Explorando' : 'Planejando Rota'}
                            </Badge>
                          </div>
                          <p className="text-[10px] font-mono text-[#8C8580]">{project.category}</p>
                        </div>
                        <span className="text-lg font-mono font-bold text-[#1A1A1E]">{project.progress}%</span>
                      </div>
                      <div className="mt-2 rpg-status-bar h-2">
                        <div
                          className="rpg-status-bar-fill bg-gradient-to-r from-[#6E8160] via-[#8B9E7C] to-[#A3B596]"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className={`h-5 w-5 ${selectedEvent.isPositive ? 'text-[#8B9E7C]' : 'text-[#B8755C]'}`} />
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  Idade: {selectedEvent.ageAtEvent} anos — Impacto: {selectedEvent.impact}/10
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-[#1A1A1E]">{selectedEvent.description}</p>
                <div className="mt-3">
                  <Badge variant={selectedEvent.isPositive ? 'secondary' : 'destructive'}>
                    {selectedEvent.isPositive ? 'Evento Positivo' : 'Bloqueio / Debuff'}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Editorial Quote */}
      <EditorialQuote text="O mapa nao e o territorio, mas sem mapa nao ha jornada." />
    </div>
  )
}
