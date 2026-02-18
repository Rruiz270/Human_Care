'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RoutineTimeline } from '@/components/ui/rpg-components'
import type { TimeBlock, Activity, RoutineStructure } from '@/types'
import {
  Calendar,
  Clock,
  Plus,
  Settings,
  CheckSquare,
  Square,
  Link2,
  ListTodo,
} from 'lucide-react'

const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// Demo routine structure
const demoRoutine: RoutineStructure = {
  id: 'r1',
  activeDays: [1, 2, 3, 4, 5], // Mon-Fri
  wakeUpTime: '06:30',
  bedTime: '22:30',
  timeBlocks: [
    { id: 'tb1', dayOfWeek: 1, startTime: '06:30', endTime: '07:30', label: 'Rotina Matinal', category: 'morning_routine', color: '#DAA520', activityId: 'ta1' },
    { id: 'tb2', dayOfWeek: 1, startTime: '07:30', endTime: '08:00', label: 'Café da Manhã', category: 'meals', color: '#8B9E7C', activityId: null },
    { id: 'tb3', dayOfWeek: 1, startTime: '08:00', endTime: '10:00', label: 'Trabalho Focado I', category: 'focused_work', color: '#B8755C', activityId: 'ta2' },
    { id: 'tb4', dayOfWeek: 1, startTime: '10:00', endTime: '11:00', label: 'Sessão de Terapia', category: 'therapy', color: '#8B9E7C', activityId: 'ta3' },
    { id: 'tb5', dayOfWeek: 1, startTime: '11:00', endTime: '12:30', label: 'Trabalho Focado II', category: 'focused_work', color: '#B8755C', activityId: null },
    { id: 'tb6', dayOfWeek: 1, startTime: '12:30', endTime: '13:30', label: 'Almoço', category: 'meals', color: '#8B9E7C', activityId: null },
    { id: 'tb7', dayOfWeek: 1, startTime: '14:00', endTime: '16:00', label: 'Tempo de Projeto', category: 'project_time', color: '#6366F1', activityId: 'ta4' },
    { id: 'tb8', dayOfWeek: 1, startTime: '16:00', endTime: '17:00', label: 'Estudo - Mestrado', category: 'study', color: '#0EA5E9', activityId: 'ta5' },
    { id: 'tb9', dayOfWeek: 1, startTime: '17:30', endTime: '18:30', label: 'Academia', category: 'exercise', color: '#DC143C', activityId: 'ta6' },
    { id: 'tb10', dayOfWeek: 1, startTime: '19:00', endTime: '22:00', label: 'Tempo Livre', category: 'free_time', color: '#8C8580', activityId: null },
  ],
  version: 3,
}

// Demo to-do items
const demoTodos: Activity[] = [
  { id: 'ta1', title: 'Meditação 15min', description: null, status: 'COMPLETED', source: 'routine', priority: 'medium', projectId: null, timeBlockId: 'tb1', missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 15, dependsOn: [], tags: ['mindfulness'], completedAt: new Date(), createdAt: new Date() },
  { id: 'ta2', title: 'Revisar relatório mensal', description: null, status: 'IN_PROGRESS', source: 'project', priority: 'high', projectId: 'p3', timeBlockId: 'tb3', missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 86400000), estimatedMinutes: 60, dependsOn: [], tags: ['trabalho'], completedAt: null, createdAt: new Date() },
  { id: 'ta3', title: 'Sessão com Dra. Ana', description: null, status: 'PENDING', source: 'therapy', priority: 'high', projectId: null, timeBlockId: 'tb4', missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 60, dependsOn: [], tags: ['terapia'], completedAt: null, createdAt: new Date() },
  { id: 'ta4', title: 'Preparar apresentação do Produto X', description: null, status: 'PENDING', source: 'project', priority: 'high', projectId: 'p3', timeBlockId: 'tb7', missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 172800000), estimatedMinutes: 120, dependsOn: [], tags: ['produto'], completedAt: null, createdAt: new Date() },
  { id: 'ta5', title: 'Leitura do artigo de psicologia positiva', description: null, status: 'PENDING', source: 'project', priority: 'medium', projectId: 'p1', timeBlockId: 'tb8', missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 60, dependsOn: [], tags: ['mestrado'], completedAt: null, createdAt: new Date() },
  { id: 'ta6', title: 'Treino de musculação', description: null, status: 'PENDING', source: 'routine', priority: 'medium', projectId: null, timeBlockId: 'tb9', missionId: null, scheduledDate: new Date(), dueDate: null, estimatedMinutes: 60, dependsOn: [], tags: ['exercício'], completedAt: null, createdAt: new Date() },
  { id: 'ta7', title: 'Ligar para contador sobre reforma', description: null, status: 'PENDING', source: 'project', priority: 'low', projectId: 'p2', timeBlockId: null, missionId: null, scheduledDate: new Date(), dueDate: new Date(Date.now() + 259200000), estimatedMinutes: 30, dependsOn: [], tags: ['reforma'], completedAt: null, createdAt: new Date() },
  { id: 'ta8', title: 'Registrar pensamentos do dia', description: null, status: 'PENDING', source: 'therapy', priority: 'medium', projectId: null, timeBlockId: null, missionId: 'm1', scheduledDate: new Date(), dueDate: null, estimatedMinutes: 15, dependsOn: [], tags: ['journaling'], completedAt: null, createdAt: new Date() },
]

export default function RotinaPage() {
  const [routine, setRoutine] = useState<RoutineStructure>(demoRoutine)
  const [todos, setTodos] = useState<Activity[]>(demoTodos)
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay()
    return routine.activeDays.includes(today) ? today : routine.activeDays[0]
  })
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkingBlock, setLinkingBlock] = useState<TimeBlock | null>(null)
  const [editWake, setEditWake] = useState(routine.wakeUpTime)
  const [editBed, setEditBed] = useState(routine.bedTime)
  const [editDays, setEditDays] = useState<number[]>(routine.activeDays)
  const [showNewTodo, setShowNewTodo] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const dayBlocks = routine.timeBlocks.filter((b) => b.dayOfWeek === selectedDay)

  const getActivityForBlock = (blockId: string) => {
    return todos.find((t) => t.timeBlockId === blockId)
  }

  const handleToggleTodo = (todoId: string) => {
    setTodos(todos.map((t) =>
      t.id === todoId
        ? { ...t, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED', completedAt: t.status === 'COMPLETED' ? null : new Date() }
        : t
    ))
  }

  const handleLinkActivity = (activityId: string) => {
    if (!linkingBlock) return
    setTodos(todos.map((t) =>
      t.id === activityId ? { ...t, timeBlockId: linkingBlock.id } : t
    ))
    setRoutine({
      ...routine,
      timeBlocks: routine.timeBlocks.map((b) =>
        b.id === linkingBlock.id ? { ...b, activityId } : b
      ),
    })
    setShowLinkDialog(false)
    setLinkingBlock(null)
  }

  const handleSaveRoutine = () => {
    setRoutine({ ...routine, wakeUpTime: editWake, bedTime: editBed, activeDays: editDays, version: routine.version + 1 })
    setShowEditDialog(false)
  }

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return
    const newTodo: Activity = {
      id: `ta-${Date.now()}`,
      title: newTodoTitle,
      description: null,
      status: 'PENDING',
      source: 'manual',
      priority: 'medium',
      projectId: null,
      timeBlockId: null,
      missionId: null,
      scheduledDate: new Date(),
      dueDate: null,
      estimatedMinutes: null,
      dependsOn: [],
      tags: [],
      completedAt: null,
      createdAt: new Date(),
    }
    setTodos([...todos, newTodo])
    setNewTodoTitle('')
    setShowNewTodo(false)
  }

  const handleBlockClick = (block: TimeBlock) => {
    setLinkingBlock(block)
    setShowLinkDialog(true)
  }

  const unlinkedTodos = todos.filter((t) => !t.timeBlockId)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Strip */}
      <div className="rounded-lg border border-[#B8755C]/15 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#B8755C]" />
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1E]">Rotina</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <span
                  key={day}
                  className={`text-[10px] font-mono px-2 py-1 rounded-sm ${
                    routine.activeDays.includes(day)
                      ? 'bg-[#B8755C] text-white'
                      : 'bg-[#F5F0EB] text-[#8C8580]'
                  }`}
                >
                  {dayLabels[day]}
                </span>
              ))}
            </div>
            <div className="text-[10px] font-mono text-[#8C8580] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {routine.wakeUpTime} - {routine.bedTime}
            </div>
            <span className="text-[9px] font-mono text-[#8C8580] bg-[#F5F0EB] px-1.5 py-0.5 rounded-sm">
              v{routine.version}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditDialog(true)}
              className="text-xs border-[#B8755C]/30"
            >
              <Settings className="mr-1 h-3.5 w-3.5" />
              Editar Estrutura
            </Button>
          </div>
        </div>

        {/* Day tabs */}
        <div className="mt-4 flex gap-1">
          {[1, 2, 3, 4, 5, 6, 0].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 rounded-sm px-2 py-2 text-xs font-mono transition-all ${
                selectedDay === day
                  ? 'bg-[#B8755C] text-white'
                  : routine.activeDays.includes(day)
                  ? 'bg-[#F5F0EB] text-[#1A1A1E] hover:bg-[#B8755C]/10'
                  : 'bg-[#F5F0EB]/50 text-[#8C8580]/50'
              }`}
            >
              {dayLabels[day]}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Left: Timeline */}
        <div className="rounded-lg border border-[#B8755C]/15 bg-white p-4">
          <h3 className="text-sm font-semibold text-[#1A1A1E] mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#B8755C]" />
            Linha do Tempo - {dayLabels[selectedDay]}
          </h3>
          <RoutineTimeline
            blocks={dayBlocks}
            wakeUpTime={routine.wakeUpTime}
            bedTime={routine.bedTime}
            onBlockClick={handleBlockClick}
          />
        </div>

        {/* Right: To-Do List */}
        <div className="rounded-lg border border-[#B8755C]/15 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1A1A1E] flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-[#B8755C]" />
              Atividades do Dia
            </h3>
            <span className="text-[10px] font-mono text-[#8C8580]">
              {todos.filter(t => t.status === 'COMPLETED').length}/{todos.length}
            </span>
          </div>

          <div className="space-y-2">
            {todos.map((todo) => {
              const linkedBlock = routine.timeBlocks.find((b) => b.id === todo.timeBlockId)
              return (
                <div
                  key={todo.id}
                  className={`flex items-center gap-2.5 rounded-md border p-2.5 transition-all ${
                    todo.status === 'COMPLETED'
                      ? 'border-[#8B9E7C]/20 bg-[#8B9E7C]/5 opacity-60'
                      : 'border-[#B8755C]/10 hover:border-[#B8755C]/25'
                  }`}
                >
                  <button onClick={() => handleToggleTodo(todo.id)} className="flex-shrink-0">
                    {todo.status === 'COMPLETED' ? (
                      <CheckSquare className="h-4 w-4 text-[#8B9E7C]" />
                    ) : (
                      <Square className="h-4 w-4 text-[#8C8580]" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${todo.status === 'COMPLETED' ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'}`}>
                      {todo.title}
                    </p>
                    {linkedBlock && (
                      <span className="text-[9px] font-mono text-[#8C8580] flex items-center gap-0.5 mt-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {linkedBlock.startTime} - {linkedBlock.endTime}
                      </span>
                    )}
                  </div>
                  {!linkedBlock && todo.status !== 'COMPLETED' && (
                    <button
                      onClick={() => {
                        setLinkingBlock(null)
                        // Find first unlinked block
                        const freeBlock = dayBlocks.find((b) => !b.activityId)
                        if (freeBlock) {
                          handleLinkActivity(todo.id)
                        }
                      }}
                      className="text-[9px] font-mono text-[#B8755C] hover:underline flex items-center gap-0.5 flex-shrink-0"
                    >
                      <Link2 className="h-3 w-3" />
                      Vincular
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* New Activity */}
          {showNewTodo ? (
            <div className="mt-3 flex gap-2">
              <Input
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Nova atividade..."
                className="text-xs"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                autoFocus
              />
              <Button size="sm" onClick={handleAddTodo} className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNewTodo(true)}
              className="mt-3 w-full text-xs border-dashed border-[#B8755C]/30"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Nova Atividade
            </Button>
          )}
        </div>
      </div>

      {/* Edit Routine Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Editar Estrutura da Rotina</DialogTitle>
            <DialogDescription>Configure os horários e dias ativos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Acordar</Label>
                <Input type="time" value={editWake} onChange={(e) => setEditWake(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Dormir</Label>
                <Input type="time" value={editBed} onChange={(e) => setEditBed(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Dias Ativos</Label>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <button
                    key={day}
                    onClick={() =>
                      setEditDays(
                        editDays.includes(day) ? editDays.filter((d) => d !== day) : [...editDays, day]
                      )
                    }
                    className={`flex-1 rounded-sm py-2 text-xs font-mono ${
                      editDays.includes(day) ? 'bg-[#B8755C] text-white' : 'bg-[#F5F0EB] text-[#8C8580]'
                    }`}
                  >
                    {dayLabels[day]}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleSaveRoutine} className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Activity Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={(open) => { setShowLinkDialog(open); if (!open) setLinkingBlock(null) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Vincular Atividade</DialogTitle>
            <DialogDescription>
              {linkingBlock && `Bloco: ${linkingBlock.label} (${linkingBlock.startTime} - ${linkingBlock.endTime})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto">
            {unlinkedTodos.length === 0 ? (
              <p className="text-sm text-[#8C8580] text-center py-4">Todas as atividades já estão vinculadas</p>
            ) : (
              unlinkedTodos.map((todo) => (
                <button
                  key={todo.id}
                  onClick={() => handleLinkActivity(todo.id)}
                  className="w-full flex items-center gap-3 rounded-md border border-[#B8755C]/10 p-3 text-left hover:border-[#B8755C]/30 hover:bg-[#B8755C]/5 transition-all"
                >
                  <ListTodo className="h-4 w-4 text-[#B8755C] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1A1A1E]">{todo.title}</p>
                    <p className="text-[10px] font-mono text-[#8C8580]">{todo.source}</p>
                  </div>
                  <Link2 className="h-3.5 w-3.5 text-[#8C8580]" />
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
