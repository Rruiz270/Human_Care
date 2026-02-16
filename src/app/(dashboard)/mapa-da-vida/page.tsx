'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Home,
  Target,
  Star,
  AlertCircle,
  Plus,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

// Demo data for timeline
const timelineEvents = [
  {
    id: '1',
    title: 'Nascimento',
    eventType: 'MILESTONE',
    ageAtEvent: 0,
    isPositive: true,
    impact: 10,
    description: 'Nasceu em Sao Paulo',
  },
  {
    id: '2',
    title: 'Inicio da escola',
    eventType: 'EDUCATION',
    ageAtEvent: 6,
    isPositive: true,
    impact: 7,
    description: 'Primeiro dia na escola primaria',
  },
  {
    id: '3',
    title: 'Perda do avo',
    eventType: 'LOSS',
    ageAtEvent: 12,
    isPositive: false,
    impact: 8,
    description: 'Falecimento do avo paterno',
  },
  {
    id: '4',
    title: 'Formatura pedagogia',
    eventType: 'ACHIEVEMENT',
    ageAtEvent: 23,
    isPositive: true,
    impact: 9,
    description: 'Conclusao da graduacao em Pedagogia',
  },
  {
    id: '5',
    title: 'Primeiro emprego como professor',
    eventType: 'CAREER',
    ageAtEvent: 24,
    isPositive: true,
    impact: 8,
    description: 'Inicio da carreira docente',
  },
  {
    id: '6',
    title: 'Burnout',
    eventType: 'HEALTH',
    ageAtEvent: 30,
    isPositive: false,
    impact: 7,
    description: 'Episodio de esgotamento profissional',
  },
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

export default function MapaDaVidaPage() {
  const [activeTab, setActiveTab] = useState('passado')
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001011]">Mapa da Vida</h2>
          <p className="text-[#757780]">
            Visualize sua jornada completa - passado, presente e futuro
          </p>
        </div>
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Evento na Timeline</DialogTitle>
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
                    <SelectItem value="TRAUMA">Trauma</SelectItem>
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
                Salvar Evento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="passado" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Passado
          </TabsTrigger>
          <TabsTrigger value="presente" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Presente
          </TabsTrigger>
          <TabsTrigger value="futuro" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Futuro
          </TabsTrigger>
        </TabsList>

        {/* PASSADO TAB */}
        <TabsContent value="passado" className="space-y-6">
          {/* Timeline Visual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#6CCFF6]" />
                Linha do Tempo
              </CardTitle>
              <CardDescription>
                Eventos importantes da sua historia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#757780]/20" />

                {/* Events */}
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative pl-10">
                      {/* Event dot */}
                      <div
                        className={`absolute left-2 top-2 h-5 w-5 rounded-full border-4 ${
                          event.isPositive
                            ? 'border-[#6CCFF6] bg-white'
                            : 'border-red-500 bg-white'
                        }`}
                      />

                      <div
                        className={`rounded-lg border p-4 ${
                          event.isPositive
                            ? 'border-[#6CCFF6]/30 bg-[#6CCFF6]/5'
                            : 'border-red-500/30 bg-red-500/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-[#001011]">
                                {event.title}
                              </h4>
                              <Badge
                                variant={event.isPositive ? 'secondary' : 'destructive'}
                              >
                                {event.eventType === 'ACHIEVEMENT' && 'Conquista'}
                                {event.eventType === 'TRAUMA' && 'Trauma'}
                                {event.eventType === 'LOSS' && 'Perda'}
                                {event.eventType === 'MILESTONE' && 'Marco'}
                                {event.eventType === 'EDUCATION' && 'Educacao'}
                                {event.eventType === 'CAREER' && 'Carreira'}
                                {event.eventType === 'HEALTH' && 'Saude'}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-[#757780]">
                              {event.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-[#001011]">
                              {event.ageAtEvent} anos
                            </span>
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#757780]">
                              Impacto:
                              <span className="font-semibold text-[#001011]">
                                {event.impact}/10
                              </span>
                            </div>
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
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#A4DF00]" />
                Relacoes Familiares
              </CardTitle>
              <CardDescription>
                Mapeamento das relacoes que moldaram sua historia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {familyRelations.map((relation) => (
                  <div
                    key={relation.id}
                    className="rounded-lg border border-[#757780]/20 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#001011]">{relation.name}</h4>
                        <p className="text-sm text-[#757780]">
                          {relation.relationType === 'FATHER' && 'Pai'}
                          {relation.relationType === 'MOTHER' && 'Mae'}
                          {relation.relationType === 'SIBLING' && 'Irmao(a)'}
                          {relation.relationType === 'SPOUSE' && 'Conjuge'}
                          {relation.relationType === 'CHILD' && 'Filho(a)'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#001011]">
                          {relation.quality}
                        </div>
                        <p className="text-xs text-[#757780]">Qualidade</p>
                      </div>
                    </div>
                    <Progress value={relation.quality * 10} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRESENTE TAB */}
        <TabsContent value="presente" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Body Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Corpo
                </CardTitle>
                <CardDescription>Estado fisico atual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-[#757780]/5 p-3">
                    <p className="text-sm text-[#757780]">Peso</p>
                    <p className="text-xl font-bold text-[#001011]">
                      {bodyHealthData.weight} kg
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#757780]/5 p-3">
                    <p className="text-sm text-[#757780]">Altura</p>
                    <p className="text-xl font-bold text-[#001011]">
                      {bodyHealthData.height} m
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#757780]">Horas de sono</span>
                    <span className="font-semibold">{bodyHealthData.sleepHours}h</span>
                  </div>
                  <Progress value={bodyHealthData.sleepHours * 12.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#757780]">Qualidade do sono</span>
                    <span className="font-semibold">{bodyHealthData.sleepQuality}/10</span>
                  </div>
                  <Progress value={bodyHealthData.sleepQuality * 10} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#757780]">Nivel de energia</span>
                    <span className="font-semibold">{bodyHealthData.energyLevel}/10</span>
                  </div>
                  <Progress value={bodyHealthData.energyLevel * 10} className="h-2" />
                </div>
                <div className="rounded-lg border border-[#757780]/20 p-3">
                  <p className="text-sm text-[#757780]">Frequencia de exercicios</p>
                  <p className="font-medium text-[#001011]">
                    {bodyHealthData.exerciseFrequency}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mind State */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#6CCFF6]" />
                  Mente
                </CardTitle>
                <CardDescription>Estado mental e exposicao diaria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-[#757780]/20 p-3">
                  <p className="text-sm text-[#757780]">Trabalho</p>
                  <p className="font-medium text-[#001011]">
                    {mindStateData.workDescription}
                  </p>
                  <p className="mt-1 text-sm text-[#757780]">
                    {mindStateData.workHoursPerDay}h por dia
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#757780]">Nivel de estresse</span>
                    <span className="font-semibold text-amber-600">
                      {mindStateData.stressLevel}/10
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#757780]/20">
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${mindStateData.stressLevel * 10}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-[#757780]/5 p-3">
                  <p className="text-sm text-[#757780]">Tempo de tela</p>
                  <p className="text-xl font-bold text-[#001011]">
                    {mindStateData.screenTimeHours}h/dia
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-[#757780]">
                    Principais preocupacoes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mindStateData.mainWorries.map((worry, index) => (
                      <Badge key={index} variant="outline">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        {worry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FUTURO TAB */}
        <TabsContent value="futuro" className="space-y-6">
          {/* Purpose */}
          <Card className="border-[#A4DF00]/30 bg-gradient-to-br from-[#A4DF00]/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#A4DF00]" />
                Proposito
              </CardTitle>
              <CardDescription>Sua razao de ser</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-lg font-medium text-[#001011]">
                  &quot;{purposeData.statement}&quot;
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-[#757780]">Sonhos</p>
                <div className="space-y-2">
                  {purposeData.dreams.map((dream, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-[#757780]/20 p-3"
                    >
                      <Star className="h-4 w-4 text-[#A4DF00]" />
                      <span className="text-[#001011]">{dream}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-[#001011] p-4 text-white">
                <p className="text-sm text-gray-400">Legado</p>
                <p className="mt-1">{purposeData.legacy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#6CCFF6]" />
                    Projetos
                  </CardTitle>
                  <CardDescription>Iniciativas em andamento</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Projeto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-[#757780]/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-[#001011]">
                            {project.title}
                          </h4>
                          <Badge
                            variant={
                              project.status === 'IN_PROGRESS'
                                ? 'default'
                                : 'outline'
                            }
                          >
                            {project.status === 'IN_PROGRESS'
                              ? 'Em andamento'
                              : 'Planejando'}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#757780]">{project.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#001011]">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                    <Progress value={project.progress} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
