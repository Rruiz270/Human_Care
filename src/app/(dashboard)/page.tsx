'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useUserStore } from '@/store/user-store'
import { FlowingLines } from '@/components/ui/decorative-elements'
import {
  AvatarStatusBar,
  XPProgressBar,
  CompassRose,
  CarePartyMember,
} from '@/components/ui/rpg-components'
import type { FeelingEntry, ThoughtEntry, ThoughtCategory, TimeBlock } from '@/types'
import {
  Calendar,
  Target,
  Heart,
  Brain,
  Zap,
  MessageSquare,
  Clock,
  ChevronRight,
  Play,
  SmilePlus,
  PenLine,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  TrendingUp,
  AlertTriangle,
  Compass,
} from 'lucide-react'
import Link from 'next/link'

// Demo: current/next time block
const currentTimeBlock: TimeBlock = {
  id: 'tb-now',
  dayOfWeek: new Date().getDay(),
  startTime: (() => {
    const h = new Date().getHours()
    return `${h.toString().padStart(2, '0')}:00`
  })(),
  endTime: (() => {
    const h = new Date().getHours() + 1
    return `${h.toString().padStart(2, '0')}:00`
  })(),
  label: 'Trabalho Focado',
  category: 'focused_work',
  color: '#B8755C',
  activityId: 'a1',
}

const nextTimeBlock: TimeBlock = {
  id: 'tb-next',
  dayOfWeek: new Date().getDay(),
  startTime: (() => {
    const h = new Date().getHours() + 1
    return `${h.toString().padStart(2, '0')}:00`
  })(),
  endTime: (() => {
    const h = new Date().getHours() + 2
    return `${h.toString().padStart(2, '0')}:00`
  })(),
  label: 'Sessão de Terapia',
  category: 'therapy',
  color: '#8B9E7C',
  activityId: 'a2',
}

// Demo upcoming deadlines
const upcomingDeadlines = [
  { title: 'Apresentação Produto X', project: 'Produto X', dueDate: new Date(Date.now() + 172800000), urgency: 'high' as const },
  { title: 'Coleta de dados (Mestrado)', project: 'Mestrado', dueDate: new Date(Date.now() + 604800000), urgency: 'medium' as const },
  { title: 'Piloto escolar', project: 'Bem-Estar Escolar', dueDate: new Date(Date.now() + 1209600000), urgency: 'low' as const },
]

// Demo recent activities
const recentActivities = [
  { title: 'Meditação matinal', completedAt: new Date(Date.now() - 3600000) },
  { title: 'Yoga / Alongamento', completedAt: new Date(Date.now() - 7200000) },
  { title: 'Revisão relatório (parcial)', completedAt: new Date(Date.now() - 86400000) },
]

// Demo next events
const nextEvents = [
  { title: 'Sessão com Dra. Ana', type: 'Terapia', when: 'Hoje, 10:00' },
  { title: 'Coaching com Carlos', type: 'Coaching', when: 'Qui, 14:00' },
  { title: 'Check-in Care Team', type: 'Care Team', when: 'Sex, 16:00' },
]

const commonFeelings = [
  'Ansiedade', 'Alegria', 'Tristeza', 'Raiva', 'Gratidão',
  'Frustração', 'Medo', 'Esperança', 'Paz', 'Culpa',
]

export default function DashboardPage() {
  const { currentUser } = useUserStore()
  const [showFeelingDialog, setShowFeelingDialog] = useState(false)
  const [showThoughtDialog, setShowThoughtDialog] = useState(false)
  const [showCheckinDialog, setShowCheckinDialog] = useState(false)
  const [newFeeling, setNewFeeling] = useState({ feeling: '', intensity: 3, trigger: '' })
  const [newThought, setNewThought] = useState({ thought: '', category: 'automatic' as ThoughtCategory })
  const [checkinMood, setCheckinMood] = useState(7)
  const [checkinEnergy, setCheckinEnergy] = useState(6)
  const [checkinNotes, setCheckinNotes] = useState('')

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const urgencyColors = { high: 'border-l-[#DC143C]', medium: 'border-l-[#DAA520]', low: 'border-l-[#8B9E7C]' }

  return (
    <div className="relative space-y-6 animate-fade-in">
      <FlowingLines className="pointer-events-none absolute inset-0 z-0 opacity-50" />

      {/* ═══ SECTION 1: CHARACTER HUD ═══ */}
      <div className="relative z-10 rounded-lg border border-[#B8755C]/15 bg-white p-4 lg:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_2fr_auto]">
          {/* Left: Avatar + Level + XP */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B8755C] bg-[#B8755C]/10 text-2xl font-serif font-bold text-[#B8755C]">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#DAA520] text-[10px] font-bold text-white">
                7
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm font-serif font-bold text-[#1A1A1E]">
                {greeting()}, {currentUser?.name?.split(' ')[0]}!
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Aventureiro</p>
            </div>
            <div className="w-full max-w-[180px]">
              <XPProgressBar currentXP={780} levelXP={1000} level={7} />
            </div>
          </div>

          {/* Center: Three Status Bars */}
          <div className="space-y-2.5">
            <AvatarStatusBar label="Energia Física" value={70} maxValue={100} color="copper" icon={Heart} />
            <AvatarStatusBar label="Energia Emocional" value={40} maxValue={100} color="sage" icon={Brain} />
            <AvatarStatusBar label="Recursos / Rotina" value={80} maxValue={100} color="gold" icon={Clock} />
          </div>

          {/* Right: Compass Rose */}
          <div className="flex flex-col items-center justify-center">
            <CompassRose alignment={78} size={80} />
          </div>
        </div>
      </div>

      {/* ═══ SECTION 2: "AGORA" — PRIMARY ACTION ZONE ═══ */}
      <div className="relative z-10 rounded-lg border-2 border-[#B8755C]/30 bg-gradient-to-r from-[#B8755C]/5 to-[#DAA520]/5 p-5 lg:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#B8755C] animate-pulse" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8755C]">Agora</h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-1.5 rounded-full" style={{ backgroundColor: currentTimeBlock.color }} />
              <div>
                <h4 className="text-lg font-serif font-bold text-[#1A1A1E]">{currentTimeBlock.label}</h4>
                <p className="text-sm font-mono text-[#8C8580]">
                  {currentTimeBlock.startTime} - {currentTimeBlock.endTime}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#8C8580] ml-[18px]">
              Atividade vinculada: <span className="text-[#B8755C]">Revisar relatório mensal</span>
            </p>

            {/* Next block preview */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[#8C8580]">
              <Clock className="h-3.5 w-3.5" />
              <span>Próximo: <strong className="text-[#1A1A1E]">{nextTimeBlock.label}</strong> às {nextTimeBlock.startTime}</span>
            </div>
          </div>

          <div className="flex items-center">
            <Link href="/rotina">
              <Button className="bg-[#B8755C] text-white hover:bg-[#A0634D] px-8 py-6 text-base shadow-md">
                <Play className="mr-2 h-5 w-5" />
                Executar Bloco
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 3: QUICK REGISTRATION STRIP ═══ */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={() => setShowFeelingDialog(true)}
          className="border-[#B8755C]/20 hover:bg-[#B8755C]/5 py-4"
        >
          <SmilePlus className="mr-1.5 h-4 w-4 text-[#B8755C]" />
          <span className="text-xs">Registrar Sentimento</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowThoughtDialog(true)}
          className="border-[#B8755C]/20 hover:bg-[#B8755C]/5 py-4"
        >
          <PenLine className="mr-1.5 h-4 w-4 text-[#B8755C]" />
          <span className="text-xs">Registrar Pensamento</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowCheckinDialog(true)}
          className="border-[#B8755C]/20 hover:bg-[#B8755C]/5 py-4"
        >
          <CheckCircle2 className="mr-1.5 h-4 w-4 text-[#B8755C]" />
          <span className="text-xs">Check-in Rápido</span>
        </Button>
      </div>

      {/* ═══ SECTION 4: THREE-COLUMN INFO GRID ═══ */}
      <div className="relative z-10 grid gap-4 lg:grid-cols-3">
        {/* Col 1: Próximas Entregas */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-[#B8755C]" />
              Próximas Entregas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingDeadlines.map((item, i) => (
              <div key={i} className={`rounded-md border p-2.5 border-l-[3px] ${urgencyColors[item.urgency]}`}>
                <p className="text-xs font-semibold text-[#1A1A1E]">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-mono text-[#B8755C] bg-[#B8755C]/5 px-1 py-0.5 rounded-sm">{item.project}</span>
                  <span className="text-[9px] font-mono text-[#8C8580]">
                    {new Date(item.dueDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Col 2: Atividades Recentes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#8B9E7C]" />
                Atividades Recentes
              </span>
              <Link href="/atividades" className="text-[10px] font-mono text-[#B8755C] hover:underline">
                Ver todas
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivities.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-md border border-[#8B9E7C]/15 p-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#8B9E7C] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#1A1A1E] truncate">{item.title}</p>
                  <p className="text-[9px] font-mono text-[#8C8580]">
                    {item.completedAt.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Col 3: Próximos Eventos */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[#DAA520]" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nextEvents.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-md border border-[#DAA520]/15 p-2.5">
                {item.type === 'Terapia' ? (
                  <Brain className="h-3.5 w-3.5 text-[#8B9E7C] flex-shrink-0" />
                ) : item.type === 'Coaching' ? (
                  <Target className="h-3.5 w-3.5 text-[#B8755C] flex-shrink-0" />
                ) : (
                  <Heart className="h-3.5 w-3.5 text-[#DAA520] flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#1A1A1E] truncate">{item.title}</p>
                  <p className="text-[9px] font-mono text-[#8C8580]">{item.when}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ═══ SECTION 5: CENTRO DE CONSULTA ═══ */}
      <div className="relative z-10">
        <h3 className="mb-3 text-xs font-mono uppercase tracking-widest text-[#8C8580]">Centro de Consulta</h3>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Link href="/projetos">
            <div className="rounded-lg border border-[#B8755C]/15 bg-white p-3 hover:shadow-sm transition-all cursor-pointer">
              <FolderKanban className="h-5 w-5 text-[#B8755C] mb-2" />
              <p className="text-xs font-semibold text-[#1A1A1E]">5 projetos ativos</p>
              <p className="text-[9px] font-mono text-[#8C8580]">Próxima entrega: 3 dias</p>
            </div>
          </Link>
          <Link href="/missoes">
            <div className="rounded-lg border border-[#B8755C]/15 bg-white p-3 hover:shadow-sm transition-all cursor-pointer">
              <Target className="h-5 w-5 text-[#DAA520] mb-2" />
              <p className="text-xs font-semibold text-[#1A1A1E]">3 missões abertas</p>
              <p className="text-[9px] font-mono text-[#8C8580]">12/15 concluídas no mês</p>
            </div>
          </Link>
          <Link href="/rotina">
            <div className="rounded-lg border border-[#B8755C]/15 bg-white p-3 hover:shadow-sm transition-all cursor-pointer">
              <Calendar className="h-5 w-5 text-[#8B9E7C] mb-2" />
              <p className="text-xs font-semibold text-[#1A1A1E]">60% da rotina</p>
              <p className="text-[9px] font-mono text-[#8C8580]">4/10 blocos concluídos</p>
            </div>
          </Link>
          <Link href="/atividades">
            <div className="rounded-lg border border-[#B8755C]/15 bg-white p-3 hover:shadow-sm transition-all cursor-pointer">
              <ListTodo className="h-5 w-5 text-[#B8755C] mb-2" />
              <p className="text-xs font-semibold text-[#1A1A1E]">18h investidas</p>
              <p className="text-[9px] font-mono text-[#8C8580]">Esta semana</p>
            </div>
          </Link>
          <Link href="/metricas">
            <div className="rounded-lg border border-[#B8755C]/15 bg-white p-3 hover:shadow-sm transition-all cursor-pointer">
              <TrendingUp className="h-5 w-5 text-[#8B9E7C] mb-2" />
              <p className="text-xs font-semibold text-[#1A1A1E]">Humor: +12%</p>
              <p className="text-[9px] font-mono text-[#8C8580]">Tendência semanal</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ═══ SECTION 6: CARE PARTY (compacted) ═══ */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8580]">Equipe de Cuidado</h3>
          <Link href="/sessoes">
            <Button variant="ghost" size="sm" className="text-xs text-[#B8755C]">
              Encontros <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <CarePartyMember
            name="Dra. Ana Costa"
            role="therapist"
            roleLabel="Terapeuta ↓ DOWN"
            avatarInitials="AC"
            lastSession="10 Jan"
            nextSession="Amanhã"
          />
          <CarePartyMember
            name="Carlos Mendes"
            role="coach"
            roleLabel="Coach ↑ UP"
            avatarInitials="CM"
            lastSession="14 Jan"
            nextSession="Em 4 dias"
          />
          <CarePartyMember
            name="Equipe HC"
            role="care_team"
            roleLabel="Care Team ↔"
            avatarInitials="HC"
          />
        </div>
      </div>

      {/* ═══ DIALOGS ═══ */}

      {/* Feeling Dialog */}
      <Dialog open={showFeelingDialog} onOpenChange={setShowFeelingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Registrar Sentimento</DialogTitle>
            <DialogDescription>Como você está se sentindo?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-5 gap-1.5">
              {commonFeelings.map((f) => (
                <button
                  key={f}
                  onClick={() => setNewFeeling({ ...newFeeling, feeling: f })}
                  className={`rounded-md px-2 py-2 text-[10px] font-mono transition-all ${
                    newFeeling.feeling === f ? 'bg-[#B8755C] text-white' : 'bg-[#F5F0EB] text-[#8C8580] hover:bg-[#B8755C]/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div>
              <Label>Intensidade: {newFeeling.intensity}</Label>
              <input type="range" min="1" max="5" value={newFeeling.intensity}
                onChange={(e) => setNewFeeling({ ...newFeeling, intensity: parseInt(e.target.value) })}
                className="w-full accent-[#B8755C]" />
            </div>
            <Input
              value={newFeeling.trigger}
              onChange={(e) => setNewFeeling({ ...newFeeling, trigger: e.target.value })}
              placeholder="Gatilho (opcional)"
            />
            <Button
              disabled={!newFeeling.feeling}
              onClick={() => { setShowFeelingDialog(false); setNewFeeling({ feeling: '', intensity: 3, trigger: '' }) }}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Registrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thought Dialog */}
      <Dialog open={showThoughtDialog} onOpenChange={setShowThoughtDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Registrar Pensamento</DialogTitle>
            <DialogDescription>Capture seus pensamentos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              value={newThought.thought}
              onChange={(e) => setNewThought({ ...newThought, thought: e.target.value })}
              placeholder="Qual pensamento está na sua mente?"
              rows={3}
            />
            <select
              value={newThought.category}
              onChange={(e) => setNewThought({ ...newThought, category: e.target.value as ThoughtCategory })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="automatic">Automático</option>
              <option value="reflective">Reflexivo</option>
              <option value="limiting">Limitante</option>
              <option value="empowering">Fortalecedor</option>
            </select>
            <Button
              disabled={!newThought.thought}
              onClick={() => { setShowThoughtDialog(false); setNewThought({ thought: '', category: 'automatic' }) }}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Registrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check-in Dialog */}
      <Dialog open={showCheckinDialog} onOpenChange={setShowCheckinDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Check-in Rápido</DialogTitle>
            <DialogDescription>Como está o seu dia?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Humor: {checkinMood}/10</Label>
              <input type="range" min="1" max="10" value={checkinMood}
                onChange={(e) => setCheckinMood(parseInt(e.target.value))}
                className="w-full accent-[#B8755C]" />
            </div>
            <div>
              <Label>Energia: {checkinEnergy}/10</Label>
              <input type="range" min="1" max="10" value={checkinEnergy}
                onChange={(e) => setCheckinEnergy(parseInt(e.target.value))}
                className="w-full accent-[#DAA520]" />
            </div>
            <Textarea
              value={checkinNotes}
              onChange={(e) => setCheckinNotes(e.target.value)}
              placeholder="Notas rápidas sobre o dia..."
              rows={2}
            />
            <Button
              onClick={() => { setShowCheckinDialog(false); setCheckinNotes('') }}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Salvar Check-in
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
