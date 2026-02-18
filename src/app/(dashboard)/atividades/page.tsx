'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ActivityCard } from '@/components/ui/rpg-components'
import type { Activity, ActivitySource } from '@/types'
import {
  ListTodo,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Timer,
  Play,
  Pause,
  Square,
  X,
} from 'lucide-react'

// Demo activities
const demoActivities: Activity[] = [
  {
    id: 'a1', title: 'Revisar relatório mensal', description: 'Análise completa do relatório de desempenho do mês anterior',
    status: 'IN_PROGRESS', source: 'project', priority: 'high', projectId: 'p3', timeBlockId: 'tb3',
    missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 86400000), estimatedMinutes: 60,
    dependsOn: [], tags: ['trabalho', 'relatório'], completedAt: null, createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: 'a2', title: 'Sessão com Dra. Ana Costa', description: 'Sessão semanal de terapia - foco em ansiedade',
    status: 'PENDING', source: 'therapy', priority: 'high', projectId: null, timeBlockId: 'tb4',
    missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 60,
    dependsOn: [], tags: ['terapia', 'saúde mental'], completedAt: null, createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'a3', title: 'Preparar apresentação do Produto X', description: 'Slides para reunião com stakeholders',
    status: 'PENDING', source: 'project', priority: 'urgent', projectId: 'p3', timeBlockId: 'tb7',
    missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 172800000), estimatedMinutes: 120,
    dependsOn: ['a1'], tags: ['produto', 'apresentação'], completedAt: null, createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: 'a4', title: 'Meditação matinal', description: null,
    status: 'COMPLETED', source: 'routine', priority: 'medium', projectId: null, timeBlockId: 'tb1',
    missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 15,
    dependsOn: [], tags: ['mindfulness'], completedAt: new Date(Date.now() - 3600000), createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'a5', title: 'Leitura artigo psicologia positiva', description: 'Cap. 3 do livro referência para dissertação',
    status: 'PENDING', source: 'project', priority: 'medium', projectId: 'p1', timeBlockId: 'tb8',
    missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 604800000), estimatedMinutes: 60,
    dependsOn: [], tags: ['mestrado', 'leitura'], completedAt: null, createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: 'a6', title: 'Treino de musculação', description: 'Treino A - peito/tríceps/ombro',
    status: 'PENDING', source: 'routine', priority: 'medium', projectId: null, timeBlockId: 'tb9',
    missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 60,
    dependsOn: [], tags: ['exercício', 'saúde'], completedAt: null, createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'a7', title: 'Coaching: Definir metas Q2', description: 'Sessão com Carlos para alinhamento de metas do trimestre',
    status: 'PENDING', source: 'coaching', priority: 'high', projectId: null, timeBlockId: null,
    missionId: 'm3', scheduledDate: new Date(Date.now() + 172800000), dueDate: new Date(Date.now() + 259200000), estimatedMinutes: 90,
    dependsOn: [], tags: ['coaching', 'metas'], completedAt: null, createdAt: new Date(Date.now() - 432000000),
  },
  {
    id: 'a8', title: 'Ligar para contador (reforma)', description: 'Solicitar orçamento atualizado para reforma do banheiro',
    status: 'OVERDUE', source: 'project', priority: 'low', projectId: 'p2', timeBlockId: null,
    missionId: null, scheduledDate: new Date(Date.now() - 86400000), dueDate: new Date(Date.now() - 86400000), estimatedMinutes: 30,
    dependsOn: [], tags: ['reforma', 'financeiro'], completedAt: null, createdAt: new Date(Date.now() - 604800000),
  },
  {
    id: 'a9', title: 'Registrar pensamentos do dia', description: 'Journaling noturno - registro de pensamentos e sentimentos',
    status: 'PENDING', source: 'therapy', priority: 'medium', projectId: null, timeBlockId: null,
    missionId: 'm1', scheduledDate: new Date(), dueDate: null, estimatedMinutes: 15,
    dependsOn: [], tags: ['journaling', 'terapia'], completedAt: null, createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'a10', title: 'Revisar plano financeiro', description: 'Análise dos gastos do mês e ajuste do plano de pagamento de dívidas',
    status: 'BLOCKED', source: 'project', priority: 'medium', projectId: 'p5', timeBlockId: null,
    missionId: null, scheduledDate: new Date(Date.now() + 86400000), dueDate: new Date(Date.now() + 432000000), estimatedMinutes: 45,
    dependsOn: ['a8'], tags: ['finanças'], completedAt: null, createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: 'a11', title: 'Yoga / Alongamento', description: null,
    status: 'COMPLETED', source: 'free', priority: 'low', projectId: null, timeBlockId: null,
    missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 30,
    dependsOn: [], tags: ['bem-estar'], completedAt: new Date(Date.now() - 7200000), createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'a12', title: 'Preparar material para piloto escolar', description: 'Montar kit de apresentação para diretores das 3 escolas piloto',
    status: 'PENDING', source: 'project', priority: 'high', projectId: 'p4', timeBlockId: null,
    missionId: null, scheduledDate: new Date(Date.now() + 259200000), dueDate: new Date(Date.now() + 604800000), estimatedMinutes: 180,
    dependsOn: [], tags: ['escola', 'piloto'], completedAt: null, createdAt: new Date(Date.now() - 172800000),
  },
]

const projectNames: Record<string, string> = {
  p1: 'Mestrado Psicologia',
  p2: 'Reforma Apto',
  p3: 'Produto X',
  p4: 'Bem-Estar Escolar',
  p5: 'Reestruturação Financeira',
}

export default function AtividadesPage() {
  const [activities, setActivities] = useState<Activity[]>(demoActivities)
  const [activeTab, setActiveTab] = useState('hoje')
  const [sourceFilter, setSourceFilter] = useState<ActivitySource | 'all'>('all')
  const [executingActivity, setExecutingActivity] = useState<Activity | null>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newActivity, setNewActivity] = useState({
    title: '', description: '', source: 'manual' as ActivitySource, priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    projectId: '', dueDate: '', estimatedMinutes: '',
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const isToday = (d: Date | null | undefined) => {
    if (!d) return false
    const date = new Date(d)
    date.setHours(0, 0, 0, 0)
    return date.getTime() === today.getTime()
  }

  const filterBySource = (list: Activity[]) => {
    if (sourceFilter === 'all') return list
    return list.filter((a) => a.source === sourceFilter)
  }

  const getFilteredActivities = () => {
    let filtered: Activity[]
    switch (activeTab) {
      case 'hoje':
        filtered = activities.filter((a) =>
          isToday(a.scheduledDate) || isToday(a.dueDate) || (a.status === 'IN_PROGRESS')
        )
        break
      case 'proximas':
        filtered = activities.filter((a) => {
          if (a.status === 'COMPLETED') return false
          const sd = a.scheduledDate ? new Date(a.scheduledDate) : null
          return sd && sd > tomorrow
        })
        break
      case 'atrasadas':
        filtered = activities.filter((a) => a.status === 'OVERDUE')
        break
      case 'projeto':
        filtered = activities.filter((a) => a.projectId)
        break
      default:
        filtered = activities
    }
    return filterBySource(filtered)
  }

  const stats = {
    completedToday: activities.filter((a) => a.status === 'COMPLETED' && a.completedAt && isToday(a.completedAt)).length,
    pending: activities.filter((a) => a.status === 'PENDING' || a.status === 'IN_PROGRESS').length,
    overdue: activities.filter((a) => a.status === 'OVERDUE').length,
    timeInvested: activities
      .filter((a) => a.status === 'COMPLETED' && a.completedAt && isToday(a.completedAt) && a.estimatedMinutes)
      .reduce((acc, a) => acc + (a.estimatedMinutes || 0), 0),
  }

  const handleStartActivity = (id: string) => {
    setActivities(activities.map((a) => a.id === id ? { ...a, status: 'IN_PROGRESS' as const } : a))
  }

  const handleCompleteActivity = (id: string) => {
    setActivities(activities.map((a) =>
      a.id === id ? { ...a, status: 'COMPLETED' as const, completedAt: new Date() } : a
    ))
  }

  const handleCreateActivity = () => {
    const activity: Activity = {
      id: `a-${Date.now()}`,
      title: newActivity.title,
      description: newActivity.description || null,
      status: 'PENDING',
      source: newActivity.source,
      priority: newActivity.priority,
      projectId: newActivity.projectId || null,
      timeBlockId: null,
      missionId: null,
      scheduledDate: new Date(),
      dueDate: newActivity.dueDate ? new Date(newActivity.dueDate) : null,
      estimatedMinutes: newActivity.estimatedMinutes ? parseInt(newActivity.estimatedMinutes) : null,
      dependsOn: [],
      tags: [],
      completedAt: null,
      createdAt: new Date(),
    }
    setActivities([activity, ...activities])
    setShowNewDialog(false)
    setNewActivity({ title: '', description: '', source: 'manual', priority: 'medium', projectId: '', dueDate: '', estimatedMinutes: '' })
  }

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const sourceFilters: { key: ActivitySource | 'all'; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'project', label: 'Projetos' },
    { key: 'routine', label: 'Rotina' },
    { key: 'therapy', label: 'Terapia' },
    { key: 'coaching', label: 'Coaching' },
    { key: 'free', label: 'Tempo Livre' },
  ]

  const filteredActivities = getFilteredActivities()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ListTodo className="h-6 w-6 text-[#B8755C]" />
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1E]">Atividades</h2>
        </div>
        <Button onClick={() => setShowNewDialog(true)} className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
          <Plus className="mr-1.5 h-4 w-4" />
          Nova Atividade
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-[#8B9E7C]/20 bg-white p-3 text-center">
          <CheckCircle2 className="mx-auto h-5 w-5 text-[#8B9E7C] mb-1" />
          <p className="text-xl font-mono font-bold text-[#1A1A1E]">{stats.completedToday}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Concluídas Hoje</p>
        </div>
        <div className="rounded-lg border border-[#B8755C]/20 bg-white p-3 text-center">
          <Clock className="mx-auto h-5 w-5 text-[#B8755C] mb-1" />
          <p className="text-xl font-mono font-bold text-[#1A1A1E]">{stats.pending}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Pendentes</p>
        </div>
        <div className="rounded-lg border border-[#DC143C]/20 bg-white p-3 text-center">
          <AlertTriangle className="mx-auto h-5 w-5 text-[#DC143C] mb-1" />
          <p className="text-xl font-mono font-bold text-[#DC143C]">{stats.overdue}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Atrasadas</p>
        </div>
        <div className="rounded-lg border border-[#DAA520]/20 bg-white p-3 text-center">
          <Timer className="mx-auto h-5 w-5 text-[#DAA520] mb-1" />
          <p className="text-xl font-mono font-bold text-[#1A1A1E]">{Math.round(stats.timeInvested / 60)}h{stats.timeInvested % 60}m</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Tempo Investido</p>
        </div>
      </div>

      {/* Tab Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#F5F0EB]">
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="proximas">Próximas</TabsTrigger>
          <TabsTrigger value="atrasadas">Atrasadas</TabsTrigger>
          <TabsTrigger value="projeto">Por Projeto</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Source Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {sourceFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setSourceFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-mono transition-all ${
              sourceFilter === f.key
                ? 'bg-[#B8755C] text-white'
                : 'bg-[#F5F0EB] text-[#8C8580] hover:bg-[#B8755C]/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            projectName={activity.projectId ? projectNames[activity.projectId] : undefined}
            timeBlockLabel={activity.timeBlockId ? `Bloco ${activity.timeBlockId}` : undefined}
            dependencyName={
              activity.dependsOn.length > 0
                ? activities.find((a) => a.id === activity.dependsOn[0])?.title
                : undefined
            }
            onStart={() => handleStartActivity(activity.id)}
            onComplete={() => handleCompleteActivity(activity.id)}
            onClick={() => setExecutingActivity(activity)}
          />
        ))}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12 text-[#8C8580]">
            <ListTodo className="mx-auto h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">Nenhuma atividade nesta categoria</p>
          </div>
        )}
      </div>

      {/* Activity Execution Dialog */}
      <Dialog open={!!executingActivity} onOpenChange={(open) => { if (!open) { setExecutingActivity(null); setTimerRunning(false); setTimerSeconds(0) } }}>
        <DialogContent className="max-w-md">
          {executingActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif">{executingActivity.title}</DialogTitle>
                <DialogDescription>{executingActivity.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {/* Timer */}
                <div className="text-center rounded-lg border border-[#B8755C]/20 bg-[#B8755C]/5 p-6">
                  <p className="text-4xl font-mono font-bold text-[#1A1A1E]">{formatTimer(timerSeconds)}</p>
                  {executingActivity.estimatedMinutes && (
                    <p className="text-[10px] font-mono text-[#8C8580] mt-1">
                      Estimado: {executingActivity.estimatedMinutes}min
                    </p>
                  )}
                  <div className="mt-4 flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        if (!timerRunning) {
                          setTimerRunning(true)
                          const interval = setInterval(() => {
                            setTimerSeconds((prev) => prev + 1)
                          }, 1000)
                          // Store interval id in a way accessible to stop
                          ;(window as unknown as Record<string, unknown>).__timerInterval = interval
                        } else {
                          setTimerRunning(false)
                          clearInterval((window as unknown as Record<string, unknown>).__timerInterval as number)
                        }
                      }}
                      className="bg-[#B8755C] text-white hover:bg-[#A0634D]"
                    >
                      {timerRunning ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
                      {timerRunning ? 'Pausar' : 'Iniciar'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTimerRunning(false)
                        clearInterval((window as unknown as Record<string, unknown>).__timerInterval as number)
                        setTimerSeconds(0)
                      }}
                      className="border-[#8C8580]/30"
                    >
                      <Square className="mr-1 h-4 w-4" />
                      Parar
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-xs">
                  {executingActivity.projectId && (
                    <p className="text-[#8C8580]">Projeto: <span className="text-[#B8755C]">{projectNames[executingActivity.projectId]}</span></p>
                  )}
                  <p className="text-[#8C8580]">Fonte: <span className="text-[#1A1A1E]">{executingActivity.source}</span></p>
                  <p className="text-[#8C8580]">Prioridade: <span className="text-[#1A1A1E]">{executingActivity.priority}</span></p>
                </div>

                <Button
                  onClick={() => {
                    handleCompleteActivity(executingActivity.id)
                    setExecutingActivity(null)
                    setTimerRunning(false)
                    clearInterval((window as unknown as Record<string, unknown>).__timerInterval as number)
                    setTimerSeconds(0)
                  }}
                  className="w-full bg-[#8B9E7C] text-white hover:bg-[#7A8D6B]"
                >
                  <CheckCircle2 className="mr-1.5 h-4 w-4" />
                  Marcar como Concluída
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Activity Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Nova Atividade</DialogTitle>
            <DialogDescription>Crie uma nova atividade para acompanhar</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Título</Label>
              <Input
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                placeholder="Nome da atividade"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                placeholder="Descreva a atividade..."
                className="mt-1"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Fonte</Label>
                <select
                  value={newActivity.source}
                  onChange={(e) => setNewActivity({ ...newActivity, source: e.target.value as ActivitySource })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="manual">Manual</option>
                  <option value="project">Projeto</option>
                  <option value="routine">Rotina</option>
                  <option value="therapy">Terapia</option>
                  <option value="coaching">Coaching</option>
                  <option value="free">Tempo Livre</option>
                </select>
              </div>
              <div>
                <Label>Prioridade</Label>
                <select
                  value={newActivity.priority}
                  onChange={(e) => setNewActivity({ ...newActivity, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Prazo</Label>
                <Input
                  type="date"
                  value={newActivity.dueDate}
                  onChange={(e) => setNewActivity({ ...newActivity, dueDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Tempo Estimado (min)</Label>
                <Input
                  type="number"
                  value={newActivity.estimatedMinutes}
                  onChange={(e) => setNewActivity({ ...newActivity, estimatedMinutes: e.target.value })}
                  placeholder="60"
                  className="mt-1"
                />
              </div>
            </div>
            {newActivity.source === 'project' && (
              <div>
                <Label>Projeto</Label>
                <select
                  value={newActivity.projectId}
                  onChange={(e) => setNewActivity({ ...newActivity, projectId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione...</option>
                  {Object.entries(projectNames).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            )}
            <Button
              onClick={handleCreateActivity}
              disabled={!newActivity.title}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Criar Atividade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
