'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import {
  QuestCard,
  XPProgressBar,
} from '@/components/ui/rpg-components'
import {
  Target,
  Plus,
  Brain,
  Sparkles,
  Flame,
  Scroll,
  Swords,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Demo data
const missions = [
  {
    id: '1',
    title: 'Praticar respiração consciente',
    description: 'Fazer 3 sessões de respiração 4-7-8 por dia',
    type: 'habit' as const,
    status: 'active' as const,
    dueDate: undefined as Date | undefined,
    streak: 5,
    xp: 30,
    fromNpc: 'Dra. Ana Costa',
  },
  {
    id: '2',
    title: 'Escrever carta de perdão',
    description: 'Escrever uma carta de perdão para si mesma sobre os episódios de autocrítica excessiva',
    type: 'therapy' as const,
    status: 'pending' as const,
    dueDate: new Date(Date.now() + 86400000 * 3),
    xp: 80,
    fromNpc: 'Dra. Ana Costa',
  },
  {
    id: '3',
    title: 'Definir metas do trimestre',
    description: 'Criar OKRs pessoais para o próximo trimestre alinhados com o propósito',
    type: 'coaching' as const,
    status: 'pending' as const,
    dueDate: new Date(Date.now() + 86400000 * 7),
    xp: 100,
    fromNpc: 'Carlos Mendes',
  },
  {
    id: '4',
    title: 'Reflexão semanal',
    description: 'Registrar insights da semana e progresso em direção ao propósito',
    type: 'reflection' as const,
    status: 'active' as const,
    dueDate: new Date(Date.now() + 86400000 * 2),
    streak: 3,
    xp: 40,
  },
  {
    id: '5',
    title: 'Conversar com mentor',
    description: 'Agendar conversa com potencial mentor no mestrado',
    type: 'action' as const,
    status: 'completed' as const,
    dueDate: new Date(Date.now() - 86400000 * 2),
    xp: 60,
    fromNpc: 'Carlos Mendes',
  },
  {
    id: '6',
    title: 'Registro de gatilhos',
    description: 'Identificar e registrar situações que desencadeiam estresse no trabalho',
    type: 'therapy' as const,
    status: 'active' as const,
    dueDate: new Date(Date.now() + 86400000 * 5),
    progress: 60,
    xp: 70,
    fromNpc: 'Dra. Ana Costa',
  },
]

type QuestFilter = 'all' | 'therapy' | 'coaching' | 'habit' | 'reflection'

const questTabs: { key: QuestFilter; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'Todas', icon: Scroll },
  { key: 'therapy', label: 'Terapia', icon: Brain },
  { key: 'coaching', label: 'Coaching', icon: Target },
  { key: 'habit', label: 'Hábitos', icon: Flame },
  { key: 'reflection', label: 'Reflexão', icon: Sparkles },
]

export default function MissoesPage() {
  const [filter, setFilter] = useState<QuestFilter>('all')
  const [showNewMissionDialog, setShowNewMissionDialog] = useState(false)

  const filteredMissions = missions.filter((mission) => {
    if (filter === 'all') return true
    return mission.type === filter
  })

  const stats = {
    total: missions.length,
    completed: missions.filter((m) => m.status === 'completed').length,
    totalXP: missions.filter((m) => m.status === 'completed').reduce((sum, m) => sum + m.xp, 0),
    maxStreak: Math.max(...missions.map(m => m.streak || 0)),
  }

  const completionRate = Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ QUEST LOG HEADER ═══ */}
      <div className="rounded-lg border border-[var(--border-architectural)] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
              <Swords className="h-7 w-7 text-[#B8755C]" />
              Quest Log
            </h2>
            <p className="text-[#8C8580] text-sm mt-1">
              Missões para sua evolução pessoal
            </p>
          </div>
          <Dialog open={showNewMissionDialog} onOpenChange={setShowNewMissionDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Missão
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Missão</DialogTitle>
                <DialogDescription>
                  Adicione uma quest ao seu log
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input placeholder="Ex: Meditar 10 minutos" />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva a missão..." />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DAILY_HABIT">Hábito Diário</SelectItem>
                      <SelectItem value="THERAPY_TASK">Tarefa de Terapia</SelectItem>
                      <SelectItem value="COACHING_TASK">Tarefa de Coaching</SelectItem>
                      <SelectItem value="REFLECTION">Reflexão</SelectItem>
                      <SelectItem value="ACTION">Ação</SelectItem>
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
                  Criar Missão
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* XP + Stats Row */}
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <XPProgressBar currentXP={780} levelXP={1000} level={7} />
          </div>
          <div className="flex items-center gap-3 rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] px-3 py-2">
            <span className="achievement-seal text-[10px]">{stats.completed}</span>
            <div>
              <p className="text-xs font-mono font-bold text-[#1A1A1E]">Missões Completadas</p>
              <p className="text-[10px] font-mono text-[#8C8580]">{stats.totalXP} XP ganhos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] px-3 py-2">
            {stats.maxStreak > 0 && (
              <span className="combo-flame">
                <Flame className="h-3 w-3" />
                {stats.maxStreak}
              </span>
            )}
            <div>
              <p className="text-xs font-mono font-bold text-[#1A1A1E]">Melhor Combo</p>
              <p className="text-[10px] font-mono text-[#8C8580]">{stats.maxStreak} dias seguidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ QUEST CATEGORY TABS ═══ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {questTabs.map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(tab.key)}
            className="text-xs"
          >
            <tab.icon className="mr-1.5 h-3.5 w-3.5" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* ═══ QUEST CARDS ═══ */}
      <div className="space-y-3">
        {filteredMissions.map((mission) => (
          <QuestCard
            key={mission.id}
            title={mission.title}
            description={mission.description}
            type={mission.type}
            status={mission.status}
            xpReward={mission.xp}
            streak={mission.streak}
            fromNpc={mission.fromNpc}
            dueDate={mission.dueDate}
            progress={mission.progress}
            onAction={() => {}}
          />
        ))}

        {filteredMissions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Target className="mx-auto h-12 w-12 text-[#8C8580]/50" />
              <p className="mt-4 text-[#8C8580]">Nenhuma missão encontrada</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowNewMissionDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar primeira missão
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
