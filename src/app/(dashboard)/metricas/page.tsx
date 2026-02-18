'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/dialog'
import { EditorialQuote } from '@/components/ui/decorative-elements'
import {
  AvatarStatusBar,
  XPProgressBar,
  FeelingBubble,
  ThoughtCard,
} from '@/components/ui/rpg-components'
import type { FeelingEntry, ThoughtEntry, ThoughtCategory } from '@/types'
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Brain,
  Zap,
  Target,
  Sparkles,
  BarChart3,
  Flame,
  Shield,
  Clock,
  Award,
  Plus,
  SmilePlus,
  PenLine,
} from 'lucide-react'

// Demo data for Tab 1 (Meu Avatar)
const weeklyMood = [
  { day: 'Seg', mood: 6, energy: 5, stress: 7 },
  { day: 'Ter', mood: 7, energy: 6, stress: 6 },
  { day: 'Qua', mood: 6, energy: 7, stress: 8 },
  { day: 'Qui', mood: 8, energy: 7, stress: 5 },
  { day: 'Sex', mood: 7, energy: 6, stress: 6 },
  { day: 'Sab', mood: 8, energy: 8, stress: 4 },
  { day: 'Dom', mood: 8, energy: 7, stress: 3 },
]

const monthlyProgress = {
  sessions: { completed: 6, total: 8 },
  missions: { completed: 12, total: 15 },
  dailyTracking: { completed: 22, total: 30 },
  habits: { streak: 5, longest: 12 },
}

const careRatio = { professional: 35, artificial: 25, selfCare: 40 }

const insights = [
  { type: 'positive', title: 'Melhora no humor', description: 'Seu humor médio melhorou 12% nas últimas 2 semanas', icon: TrendingUp },
  { type: 'attention', title: 'Pico de estresse', description: 'Seu nível de estresse aumenta nas quartas-feiras', icon: Brain },
  { type: 'positive', title: 'Consistência nos hábitos', description: 'Você manteve sua sequência de respiração consciente por 5 dias', icon: Target },
  { type: 'neutral', title: 'Padrão de sono', description: 'Média de 6.5h de sono - considere aumentar para 7-8h', icon: Heart },
]

// Demo data for Tab 2 (Sentimentos)
const demoFeelings: FeelingEntry[] = [
  { id: 'f1', feeling: 'Ansiedade', intensity: 4, trigger: 'Reunião importante amanhã', linkedEventId: null, bodyLocation: 'Peito', notes: null, timestamp: new Date(Date.now() - 3600000) },
  { id: 'f2', feeling: 'Gratidão', intensity: 3, trigger: 'Conversa com amigo próximo', linkedEventId: null, bodyLocation: null, notes: 'Momento de leveza', timestamp: new Date(Date.now() - 14400000) },
  { id: 'f3', feeling: 'Frustração', intensity: 3, trigger: 'Projeto atrasado', linkedEventId: null, bodyLocation: 'Ombros', notes: null, timestamp: new Date(Date.now() - 86400000) },
  { id: 'f4', feeling: 'Alegria', intensity: 5, trigger: 'Resultado positivo do mestrado', linkedEventId: null, bodyLocation: null, notes: 'Nota máxima na avaliação', timestamp: new Date(Date.now() - 172800000) },
  { id: 'f5', feeling: 'Paz', intensity: 2, trigger: 'Meditação matinal', linkedEventId: null, bodyLocation: 'Corpo inteiro', notes: null, timestamp: new Date(Date.now() - 259200000) },
  { id: 'f6', feeling: 'Medo', intensity: 4, trigger: 'Incerteza sobre o futuro financeiro', linkedEventId: null, bodyLocation: 'Estômago', notes: null, timestamp: new Date(Date.now() - 345600000) },
  { id: 'f7', feeling: 'Esperança', intensity: 3, trigger: 'Sessão de coaching', linkedEventId: null, bodyLocation: null, notes: 'Novos caminhos se abrindo', timestamp: new Date(Date.now() - 432000000) },
  { id: 'f8', feeling: 'Tristeza', intensity: 2, trigger: 'Saudade da família', linkedEventId: null, bodyLocation: 'Coração', notes: null, timestamp: new Date(Date.now() - 518400000) },
]

// Demo data for Tab 3 (Pensamentos)
const demoThoughts: ThoughtEntry[] = [
  { id: 't1', thought: 'Eu nunca vou conseguir terminar esse mestrado a tempo.', category: 'limiting', linkedFeelingId: 'f1', challengeResponse: 'Já completei 45% do progresso e estou dentro do cronograma. Posso dividir em etapas menores.', notes: null, timestamp: new Date(Date.now() - 7200000) },
  { id: 't2', thought: 'Cada dia que passo focado é um investimento no meu futuro.', category: 'empowering', linkedFeelingId: 'f2', challengeResponse: null, notes: null, timestamp: new Date(Date.now() - 86400000) },
  { id: 't3', thought: 'Se o projeto falhar, será culpa minha.', category: 'automatic', linkedFeelingId: 'f3', challengeResponse: 'Projetos são trabalhos em equipe. Estou fazendo minha parte e posso pedir ajuda quando necessário.', notes: null, timestamp: new Date(Date.now() - 172800000) },
  { id: 't4', thought: 'A terapia está me ajudando a entender padrões que eu não via antes.', category: 'reflective', linkedFeelingId: null, challengeResponse: null, notes: 'Insight da sessão com Dra. Ana', timestamp: new Date(Date.now() - 259200000) },
  { id: 't5', thought: 'Eu deveria estar mais avançado na minha carreira nessa idade.', category: 'limiting', linkedFeelingId: 'f6', challengeResponse: 'Comparação com os outros não reflete minha jornada única. Estou construindo algo sólido.', notes: null, timestamp: new Date(Date.now() - 345600000) },
  { id: 't6', thought: 'Minha capacidade de resiliência aumentou muito nos últimos meses.', category: 'empowering', linkedFeelingId: 'f7', challengeResponse: null, notes: null, timestamp: new Date(Date.now() - 432000000) },
]

const commonFeelings = [
  'Ansiedade', 'Alegria', 'Tristeza', 'Raiva', 'Gratidão',
  'Frustração', 'Medo', 'Esperança', 'Paz', 'Culpa',
]

export default function MetricasPage() {
  const [feelings, setFeelings] = useState<FeelingEntry[]>(demoFeelings)
  const [thoughts, setThoughts] = useState<ThoughtEntry[]>(demoThoughts)
  const [showFeelingDialog, setShowFeelingDialog] = useState(false)
  const [showThoughtDialog, setShowThoughtDialog] = useState(false)
  const [newFeeling, setNewFeeling] = useState({
    feeling: '', intensity: 3, trigger: '', bodyLocation: '', notes: '',
  })
  const [newThought, setNewThought] = useState({
    thought: '', category: 'automatic' as ThoughtCategory, linkedFeelingId: '', challengeResponse: '',
  })

  const handleCreateFeeling = () => {
    if (!newFeeling.feeling) return
    const entry: FeelingEntry = {
      id: `f-${Date.now()}`,
      feeling: newFeeling.feeling,
      intensity: newFeeling.intensity,
      trigger: newFeeling.trigger || null,
      linkedEventId: null,
      bodyLocation: newFeeling.bodyLocation || null,
      notes: newFeeling.notes || null,
      timestamp: new Date(),
    }
    setFeelings([entry, ...feelings])
    setShowFeelingDialog(false)
    setNewFeeling({ feeling: '', intensity: 3, trigger: '', bodyLocation: '', notes: '' })
  }

  const handleCreateThought = () => {
    if (!newThought.thought) return
    const entry: ThoughtEntry = {
      id: `t-${Date.now()}`,
      thought: newThought.thought,
      category: newThought.category,
      linkedFeelingId: newThought.linkedFeelingId || null,
      challengeResponse: newThought.challengeResponse || null,
      notes: null,
      timestamp: new Date(),
    }
    setThoughts([entry, ...thoughts])
    setShowThoughtDialog(false)
    setNewThought({ thought: '', category: 'automatic', linkedFeelingId: '', challengeResponse: '' })
  }

  // Feeling frequency for chart
  const feelingFrequency = feelings.reduce((acc, f) => {
    acc[f.feeling] = (acc[f.feeling] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const maxFreq = Math.max(...Object.values(feelingFrequency), 1)

  // Thought category distribution
  const thoughtCategories = thoughts.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const totalThoughts = thoughts.length || 1

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="avatar">
        <TabsList className="bg-[#F5F0EB] w-full justify-start">
          <TabsTrigger value="avatar" className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" />
            Meu Avatar
          </TabsTrigger>
          <TabsTrigger value="sentimentos" className="flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            Meus Sentimentos
          </TabsTrigger>
          <TabsTrigger value="pensamentos" className="flex items-center gap-1.5">
            <Brain className="h-4 w-4" />
            Meus Pensamentos
          </TabsTrigger>
        </TabsList>

        {/* ═══ TAB 1: MEU AVATAR ═══ */}
        <TabsContent value="avatar" className="space-y-6 mt-6">
          {/* Performance Equation Header */}
          <div className="rounded-lg border border-[var(--border-architectural)] bg-white p-4 lg:p-6">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#B8755C]" />
              Status do Avatar
            </h2>
            <p className="text-sm text-[#8C8580] mt-1">A Equação da Performance</p>
            <div className="mt-4 rounded-lg border border-[#B8755C]/20 bg-[#B8755C]/5 p-4">
              <div className="grid grid-cols-3 gap-3 items-center text-center">
                <div>
                  <Clock className="mx-auto mb-1 h-6 w-6 text-[#B8755C]" />
                  <p className="text-2xl font-mono font-bold text-[#1A1A1E]">68%</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Tempo Disponível</p>
                </div>
                <div>
                  <p className="text-3xl font-mono font-bold text-[#B8755C]">x</p>
                </div>
                <div>
                  <Zap className="mx-auto mb-1 h-6 w-6 text-[#DAA520]" />
                  <p className="text-2xl font-mono font-bold text-[#1A1A1E]">55%</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Qualidade de Energia</p>
                </div>
              </div>
              <div className="mt-3 border-t border-[#B8755C]/20 pt-3 text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Performance Real</p>
                <p className="text-3xl font-mono font-bold text-[#1A1A1E]">37%</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-[#DAA520]/30 bg-gradient-to-r from-[#DAA520]/10 to-[#FFD700]/10 p-2 text-center">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#DAA520]">Alta Energia = Ouro</p>
                  <div className="mt-1 rpg-status-bar h-3">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#FFD700]" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="rounded-md border border-[#B8755C]/30 bg-gradient-to-r from-[#8B5A3E]/10 to-[#B8755C]/10 p-2 text-center">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#B8755C]">Baixa Energia = Latão</p>
                  <div className="mt-1 rpg-status-bar h-3">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#8B5A3E] via-[#B8755C] to-[#C4956A]" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Character Sheet + Weekly Evolution */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-[#8B9E7C]" />
                  Atributos do Avatar
                </CardTitle>
                <CardDescription>Ficha de personagem completa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <AvatarStatusBar label="Humor" value={74} maxValue={100} color="sage" icon={Heart} />
                <AvatarStatusBar label="Energia" value={66} maxValue={100} color="copper" icon={Zap} />
                <AvatarStatusBar label="Estresse" value={56} maxValue={100} color="danger" icon={Brain} />
                <AvatarStatusBar label="Alinhamento" value={78} maxValue={100} color="gold" icon={Target} />
                <div className="mt-3 space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">Tendências</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-[#8B9E7C]" />
                      <span className="text-[#8B9E7C]">Humor +0.8</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingDown className="h-3.5 w-3.5 text-[#8B9E7C]" />
                      <span className="text-[#8B9E7C]">Estresse -1.2</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8C8580]">— Energia estável</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-[#8B9E7C]" />
                      <span className="text-[#8B9E7C]">Alinhamento +5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-[#B8755C]" />
                  Evolução Semanal
                </CardTitle>
                <CardDescription>Humor, energia e estresse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyMood.map((day, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="w-8 font-mono font-medium text-[#1A1A1E]">{day.day}</span>
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <span className="text-[#B8755C]">{day.mood}</span>
                          <span className="text-[#8B9E7C]">{day.energy}</span>
                          <span className="text-amber-500">{day.stress}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        <div className="h-1.5 rounded-l bg-[#B8755C]" style={{ width: `${day.mood * 10}%` }} />
                        <div className="h-1.5 bg-[#8B9E7C]" style={{ width: `${day.energy * 10}%` }} />
                        <div className="h-1.5 rounded-r bg-amber-500" style={{ width: `${day.stress * 10}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-[#B8755C]" /> Humor</div>
                    <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-[#8B9E7C]" /> Energia</div>
                    <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-amber-500" /> Estresse</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Care Ratio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-[#B8755C]" />
                Balanço da Party
              </CardTitle>
              <CardDescription>Contribuição de cada vetor de cuidado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative h-44 w-44">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#B8755C" strokeWidth="18" strokeDasharray={`${careRatio.professional * 2.51} 251`} />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B9E7C" strokeWidth="18" strokeDasharray={`${careRatio.artificial * 2.51} 251`} strokeDashoffset={`-${careRatio.professional * 2.51}`} />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#DAA520" strokeWidth="18" strokeDasharray={`${careRatio.selfCare * 2.51} 251`} strokeDashoffset={`-${(careRatio.professional + careRatio.artificial) * 2.51}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-mono font-bold text-[#1A1A1E]">100%</p>
                      <p className="text-[10px] font-mono text-[#8C8580]">Party</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-3 gap-3">
                  <div className="text-center rounded-md border border-[#B8755C]/20 bg-[#B8755C]/5 p-2">
                    <p className="text-xl font-mono font-bold text-[#1A1A1E]">{careRatio.professional}%</p>
                    <p className="text-[10px] font-mono text-[#B8755C]">Profissional</p>
                  </div>
                  <div className="text-center rounded-md border border-[#8B9E7C]/20 bg-[#8B9E7C]/5 p-2">
                    <p className="text-xl font-mono font-bold text-[#1A1A1E]">{careRatio.artificial}%</p>
                    <p className="text-[10px] font-mono text-[#8B9E7C]">IA / Oráculo</p>
                  </div>
                  <div className="text-center rounded-md border border-[#DAA520]/20 bg-[#DAA520]/5 p-2">
                    <p className="text-xl font-mono font-bold text-[#1A1A1E]">{careRatio.selfCare}%</p>
                    <p className="text-[10px] font-mono text-[#DAA520]">Autocuidado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-[#DAA520]" />
                Conquistas do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3 text-center">
                  <span className="achievement-seal mb-2 mx-auto block w-fit">{monthlyProgress.sessions.completed}</span>
                  <p className="text-xs font-mono font-bold text-[#1A1A1E]">Encontros</p>
                  <p className="text-[10px] font-mono text-[#8C8580]">{monthlyProgress.sessions.completed}/{monthlyProgress.sessions.total}</p>
                  <div className="mt-1.5 rpg-status-bar h-2">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#6E8160] via-[#8B9E7C] to-[#A3B596]" style={{ width: `${(monthlyProgress.sessions.completed / monthlyProgress.sessions.total) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3 text-center">
                  <span className="achievement-seal mb-2 mx-auto block w-fit">{monthlyProgress.missions.completed}</span>
                  <p className="text-xs font-mono font-bold text-[#1A1A1E]">Missões</p>
                  <p className="text-[10px] font-mono text-[#8C8580]">{monthlyProgress.missions.completed}/{monthlyProgress.missions.total}</p>
                  <div className="mt-1.5 rpg-status-bar h-2">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#8B5A3E] via-[#B8755C] to-[#C4956A]" style={{ width: `${(monthlyProgress.missions.completed / monthlyProgress.missions.total) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3 text-center">
                  <span className="achievement-seal mb-2 mx-auto block w-fit">{monthlyProgress.dailyTracking.completed}</span>
                  <p className="text-xs font-mono font-bold text-[#1A1A1E]">Registros</p>
                  <p className="text-[10px] font-mono text-[#8C8580]">{monthlyProgress.dailyTracking.completed}/{monthlyProgress.dailyTracking.total}</p>
                  <div className="mt-1.5 rpg-status-bar h-2">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#FFD700]" style={{ width: `${(monthlyProgress.dailyTracking.completed / monthlyProgress.dailyTracking.total) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3 text-center">
                  <span className="combo-flame mb-2 mx-auto block w-fit">
                    <Flame className="h-3 w-3" />{monthlyProgress.habits.streak}
                  </span>
                  <p className="text-xs font-mono font-bold text-[#1A1A1E]">Record Combo</p>
                  <p className="text-[10px] font-mono text-[#8C8580]">max: {monthlyProgress.habits.longest} dias</p>
                  <div className="mt-1.5 rpg-status-bar h-2">
                    <div className="rpg-status-bar-fill bg-gradient-to-r from-[#FF6347] to-[#FF4500]" style={{ width: `${(monthlyProgress.habits.streak / monthlyProgress.habits.longest) * 100}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-[#B8755C]" />
                Insights do Oráculo
              </CardTitle>
              <CardDescription>Padrões e tendências nos seus dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`rounded-md border p-3 ${
                      insight.type === 'positive' ? 'border-[#8B9E7C]/30 bg-[#8B9E7C]/5'
                        : insight.type === 'attention' ? 'border-amber-500/30 bg-amber-500/5'
                        : 'border-[#8C8580]/20 bg-[#8C8580]/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        insight.type === 'positive' ? 'bg-[#8B9E7C]/20'
                          : insight.type === 'attention' ? 'bg-amber-500/20'
                          : 'bg-[#8C8580]/20'
                      }`}>
                        <insight.icon className={`h-4 w-4 ${
                          insight.type === 'positive' ? 'text-[#8B9E7C]'
                            : insight.type === 'attention' ? 'text-amber-500'
                            : 'text-[#8C8580]'
                        }`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#1A1A1E]">{insight.title}</h4>
                        <p className="mt-0.5 text-xs text-[#8C8580]">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <EditorialQuote text="Os números contam histórias — aprenda a ouvir a sua." />
        </TabsContent>

        {/* ═══ TAB 2: MEUS SENTIMENTOS ═══ */}
        <TabsContent value="sentimentos" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#B8755C]" />
              Meus Sentimentos
            </h2>
            <Button onClick={() => setShowFeelingDialog(true)} className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
              <SmilePlus className="mr-1.5 h-4 w-4" />
              Registrar Sentimento
            </Button>
          </div>

          {/* Recent Feelings Timeline */}
          <div className="space-y-3">
            {feelings.map((feeling) => (
              <FeelingBubble key={feeling.id} entry={feeling} />
            ))}
          </div>

          {/* Feeling Frequency Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-[#B8755C]" />
                Frequência de Sentimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(feelingFrequency)
                  .sort(([, a], [, b]) => b - a)
                  .map(([feeling, count]) => (
                    <div key={feeling} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-[#1A1A1E] truncate">{feeling}</span>
                      <div className="flex-1 h-4 bg-[#F5F0EB] rounded-sm overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#B8755C] to-[#C4956A] rounded-sm"
                          style={{ width: `${(count / maxFreq) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-[#8C8580] w-6 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ═══ TAB 3: MEUS PENSAMENTOS ═══ */}
        <TabsContent value="pensamentos" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#B8755C]" />
              Meus Pensamentos
            </h2>
            <Button onClick={() => setShowThoughtDialog(true)} className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
              <PenLine className="mr-1.5 h-4 w-4" />
              Registrar Pensamento
            </Button>
          </div>

          {/* Category Distribution Mini-Donut */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-8">
                <div className="relative h-24 w-24">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {(() => {
                      const cats = [
                        { key: 'automatic', color: '#DAA520' },
                        { key: 'reflective', color: '#8B9E7C' },
                        { key: 'limiting', color: '#DC143C' },
                        { key: 'empowering', color: '#B8755C' },
                      ]
                      let offset = 0
                      return cats.map(({ key, color }) => {
                        const pct = ((thoughtCategories[key] || 0) / totalThoughts) * 100
                        const dash = pct * 2.51
                        const el = (
                          <circle
                            key={key}
                            cx="50" cy="50" r="40" fill="transparent"
                            stroke={color} strokeWidth="14"
                            strokeDasharray={`${dash} 251`}
                            strokeDashoffset={`-${offset}`}
                          />
                        )
                        offset += dash
                        return el
                      })
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-mono font-bold text-[#1A1A1E]">{thoughts.length}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { key: 'automatic', label: 'Automático', color: '#DAA520' },
                    { key: 'reflective', label: 'Reflexivo', color: '#8B9E7C' },
                    { key: 'limiting', label: 'Limitante', color: '#DC143C' },
                    { key: 'empowering', label: 'Fortalecedor', color: '#B8755C' },
                  ].map(({ key, label, color }) => (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[#1A1A1E]">{label}</span>
                      <span className="text-[#8C8580] font-mono">{thoughtCategories[key] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Thoughts */}
          <div className="space-y-3">
            {thoughts.map((thought) => {
              const linkedFeeling = thought.linkedFeelingId
                ? feelings.find((f) => f.id === thought.linkedFeelingId)?.feeling
                : undefined
              return (
                <ThoughtCard key={thought.id} entry={thought} linkedFeeling={linkedFeeling} />
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Register Feeling Dialog */}
      <Dialog open={showFeelingDialog} onOpenChange={setShowFeelingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Registrar Sentimento</DialogTitle>
            <DialogDescription>Como você está se sentindo agora?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Sentimento</Label>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {commonFeelings.map((f) => (
                  <button
                    key={f}
                    onClick={() => setNewFeeling({ ...newFeeling, feeling: f })}
                    className={`rounded-md px-2 py-2 text-[10px] font-mono transition-all ${
                      newFeeling.feeling === f
                        ? 'bg-[#B8755C] text-white'
                        : 'bg-[#F5F0EB] text-[#8C8580] hover:bg-[#B8755C]/10'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Intensidade: {newFeeling.intensity}</Label>
              <input
                type="range"
                min="1"
                max="5"
                value={newFeeling.intensity}
                onChange={(e) => setNewFeeling({ ...newFeeling, intensity: parseInt(e.target.value) })}
                className="mt-2 w-full accent-[#B8755C]"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#8C8580]">
                <span>1 - Leve</span>
                <span>5 - Intenso</span>
              </div>
            </div>
            <div>
              <Label>Gatilho</Label>
              <Input
                value={newFeeling.trigger}
                onChange={(e) => setNewFeeling({ ...newFeeling, trigger: e.target.value })}
                placeholder="O que disparou esse sentimento?"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Localização no Corpo</Label>
              <Input
                value={newFeeling.bodyLocation}
                onChange={(e) => setNewFeeling({ ...newFeeling, bodyLocation: e.target.value })}
                placeholder="Ex: Peito, estômago, ombros..."
                className="mt-1"
              />
            </div>
            <div>
              <Label>Notas</Label>
              <Textarea
                value={newFeeling.notes}
                onChange={(e) => setNewFeeling({ ...newFeeling, notes: e.target.value })}
                placeholder="Observações adicionais..."
                className="mt-1"
                rows={2}
              />
            </div>
            <Button
              onClick={handleCreateFeeling}
              disabled={!newFeeling.feeling}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Registrar Sentimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Thought Dialog */}
      <Dialog open={showThoughtDialog} onOpenChange={setShowThoughtDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Registrar Pensamento</DialogTitle>
            <DialogDescription>Capture e desafie seus pensamentos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Pensamento</Label>
              <Textarea
                value={newThought.thought}
                onChange={(e) => setNewThought({ ...newThought, thought: e.target.value })}
                placeholder="Qual pensamento passou pela sua mente?"
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <select
                value={newThought.category}
                onChange={(e) => setNewThought({ ...newThought, category: e.target.value as ThoughtCategory })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="automatic">Automático</option>
                <option value="reflective">Reflexivo</option>
                <option value="limiting">Limitante</option>
                <option value="empowering">Fortalecedor</option>
              </select>
            </div>
            <div>
              <Label>Vincular a Sentimento</Label>
              <select
                value={newThought.linkedFeelingId}
                onChange={(e) => setNewThought({ ...newThought, linkedFeelingId: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Nenhum</option>
                {feelings.slice(0, 5).map((f) => (
                  <option key={f.id} value={f.id}>{f.feeling} - {new Date(f.timestamp).toLocaleDateString('pt-BR')}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Desafio / Resposta (TCC)</Label>
              <Textarea
                value={newThought.challengeResponse}
                onChange={(e) => setNewThought({ ...newThought, challengeResponse: e.target.value })}
                placeholder="Qual evidência contradiz esse pensamento?"
                className="mt-1"
                rows={2}
              />
            </div>
            <Button
              onClick={handleCreateThought}
              disabled={!newThought.thought}
              className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
            >
              Registrar Pensamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
