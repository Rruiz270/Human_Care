'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IconBadge } from '@/components/ui/decorative-elements'
import {
  Target,
  Plus,
  CheckCircle,
  Circle,
  Clock,
  Brain,
  Sparkles,
  Flame,
  TrendingUp,
  Calendar,
  Filter,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Demo data
const missions = [
  {
    id: '1',
    title: 'Praticar respiracao consciente',
    description: 'Fazer 3 sessoes de respiracao 4-7-8 por dia',
    type: 'DAILY_HABIT',
    status: 'IN_PROGRESS',
    dueDate: null,
    streak: 5,
    fromSession: 'Terapia - Dra. Ana Costa',
  },
  {
    id: '2',
    title: 'Escrever carta de perdao',
    description: 'Escrever uma carta de perdao para si mesma sobre os episodios de autocritica excessiva',
    type: 'THERAPY_TASK',
    status: 'PENDING',
    dueDate: new Date(Date.now() + 86400000 * 3),
    fromSession: 'Terapia - Dra. Ana Costa',
  },
  {
    id: '3',
    title: 'Definir metas do trimestre',
    description: 'Criar OKRs pessoais para o proximo trimestre alinhados com o proposito',
    type: 'COACHING_TASK',
    status: 'PENDING',
    dueDate: new Date(Date.now() + 86400000 * 7),
    fromSession: 'Coaching - Carlos Mendes',
  },
  {
    id: '4',
    title: 'Reflexao semanal',
    description: 'Registrar insights da semana e progresso em direcao ao proposito',
    type: 'REFLECTION',
    status: 'IN_PROGRESS',
    dueDate: new Date(Date.now() + 86400000 * 2),
    streak: 3,
  },
  {
    id: '5',
    title: 'Conversar com mentor',
    description: 'Agendar conversa com potencial mentor no mestrado',
    type: 'ACTION',
    status: 'COMPLETED',
    dueDate: new Date(Date.now() - 86400000 * 2),
    completedAt: new Date(Date.now() - 86400000),
    fromSession: 'Coaching - Carlos Mendes',
  },
  {
    id: '6',
    title: 'Registro de gatilhos',
    description: 'Identificar e registrar situacoes que desencadeiam estresse no trabalho',
    type: 'THERAPY_TASK',
    status: 'IN_PROGRESS',
    dueDate: new Date(Date.now() + 86400000 * 5),
    progress: 60,
    fromSession: 'Terapia - Dra. Ana Costa',
  },
]

const missionTypeColors = {
  THERAPY_TASK: { bg: 'bg-[#B8755C]/10', text: 'text-[#B8755C]', label: 'Terapia' },
  COACHING_TASK: { bg: 'bg-[#8B9E7C]/10', text: 'text-[#8B9E7C]', label: 'Coaching' },
  DAILY_HABIT: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Habito' },
  REFLECTION: { bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'Reflexao' },
  ACTION: { bg: 'bg-[#1A1A1E]/10', text: 'text-[#1A1A1E]', label: 'Acao' },
}

export default function MissoesPage() {
  const [filter, setFilter] = useState<string>('all')
  const [showNewMissionDialog, setShowNewMissionDialog] = useState(false)

  const filteredMissions = missions.filter((mission) => {
    if (filter === 'all') return true
    if (filter === 'pending') return mission.status === 'PENDING'
    if (filter === 'in_progress') return mission.status === 'IN_PROGRESS'
    if (filter === 'completed') return mission.status === 'COMPLETED'
    if (filter === 'habits') return mission.type === 'DAILY_HABIT'
    return true
  })

  const stats = {
    total: missions.length,
    completed: missions.filter((m) => m.status === 'COMPLETED').length,
    pending: missions.filter((m) => m.status === 'PENDING').length,
    inProgress: missions.filter((m) => m.status === 'IN_PROGRESS').length,
  }

  const completionRate = Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Missoes</h2>
          <p className="text-[#8C8580]">
            Tarefas e habitos para sua evolucao pessoal
          </p>
        </div>
        <Dialog open={showNewMissionDialog} onOpenChange={setShowNewMissionDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Missao
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Missao</DialogTitle>
              <DialogDescription>
                Adicione uma tarefa ou habito para acompanhar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Titulo</Label>
                <Input placeholder="Ex: Meditar 10 minutos" />
              </div>
              <div className="space-y-2">
                <Label>Descricao</Label>
                <Textarea placeholder="Descreva a missao..." />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAILY_HABIT">Habito Diario</SelectItem>
                    <SelectItem value="THERAPY_TASK">Tarefa de Terapia</SelectItem>
                    <SelectItem value="COACHING_TASK">Tarefa de Coaching</SelectItem>
                    <SelectItem value="REFLECTION">Reflexao</SelectItem>
                    <SelectItem value="ACTION">Acao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data limite (opcional)</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNewMissionDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewMissionDialog(false)}>
                Criar Missao
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <IconBadge icon={Target} variant="copper" />
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{stats.total}</p>
                <p className="text-sm text-[#8C8580]">Total de missoes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <IconBadge icon={CheckCircle} variant="sage" />
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{stats.completed}</p>
                <p className="text-sm text-[#8C8580]">Concluidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{stats.inProgress}</p>
                <p className="text-sm text-[#8C8580]">Em andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <IconBadge icon={TrendingUp} variant="copper" />
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{completionRate}%</p>
                <p className="text-sm text-[#8C8580]">Taxa de conclusao</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todas
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pendentes
        </Button>
        <Button
          variant={filter === 'in_progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('in_progress')}
        >
          Em andamento
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Concluidas
        </Button>
        <Button
          variant={filter === 'habits' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('habits')}
        >
          <Flame className="mr-2 h-4 w-4" />
          Habitos
        </Button>
      </div>

      {/* Missions List */}
      <div className="space-y-4">
        {filteredMissions.map((mission) => {
          const typeStyle = missionTypeColors[mission.type as keyof typeof missionTypeColors]

          return (
            <Card key={mission.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Status indicator */}
                  <button
                    className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                      mission.status === 'COMPLETED'
                        ? 'border-[#8B9E7C] bg-[#8B9E7C]'
                        : mission.status === 'IN_PROGRESS'
                        ? 'border-[#B8755C]'
                        : 'border-[#8C8580]/30 hover:border-[#8C8580]'
                    }`}
                  >
                    {mission.status === 'COMPLETED' && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`font-semibold ${
                          mission.status === 'COMPLETED'
                            ? 'text-[#8C8580] line-through'
                            : 'text-[#1A1A1E]'
                        }`}
                      >
                        {mission.title}
                      </h4>
                      <Badge className={`${typeStyle.bg} ${typeStyle.text}`}>
                        {mission.type === 'THERAPY_TASK' && (
                          <Brain className="mr-1 h-3 w-3" />
                        )}
                        {mission.type === 'COACHING_TASK' && (
                          <Target className="mr-1 h-3 w-3" />
                        )}
                        {mission.type === 'DAILY_HABIT' && (
                          <Flame className="mr-1 h-3 w-3" />
                        )}
                        {mission.type === 'REFLECTION' && (
                          <Sparkles className="mr-1 h-3 w-3" />
                        )}
                        {typeStyle.label}
                      </Badge>
                      {mission.streak && mission.streak > 0 && (
                        <Badge variant="outline" className="bg-[#B8755C]/10 text-[#B8755C]">
                          <Flame className="mr-1 h-3 w-3" />
                          {mission.streak} dias
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-[#8C8580]">{mission.description}</p>

                    {mission.progress !== undefined && (
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#8C8580]">Progresso</span>
                          <span className="font-mono font-medium text-[#1A1A1E]">
                            {mission.progress}%
                          </span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#8C8580]">
                      {mission.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Vence em {formatDate(mission.dueDate)}
                        </span>
                      )}
                      {mission.fromSession && (
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4" />
                          {mission.fromSession}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {mission.status !== 'COMPLETED' && (
                      <Button size="sm" variant="outline">
                        {mission.type === 'DAILY_HABIT' ? 'Check-in' : 'Concluir'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredMissions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Target className="mx-auto h-12 w-12 text-[#8C8580]/50" />
              <p className="mt-4 text-[#8C8580]">Nenhuma missao encontrada</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowNewMissionDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar primeira missao
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
