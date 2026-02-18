'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EditorialQuote } from '@/components/ui/decorative-elements'
import {
  AvatarStatusBar,
  XPProgressBar,
} from '@/components/ui/rpg-components'
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Brain,
  Zap,
  Target,
  Calendar,
  Sparkles,
  BarChart3,
  Flame,
  Shield,
  Clock,
  Award,
} from 'lucide-react'

// Demo data
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

const careRatio = {
  professional: 35,
  artificial: 25,
  selfCare: 40,
}

const insights = [
  { type: 'positive', title: 'Melhora no humor', description: 'Seu humor médio melhorou 12% nas últimas 2 semanas', icon: TrendingUp },
  { type: 'attention', title: 'Pico de estresse', description: 'Seu nível de estresse aumenta nas quartas-feiras', icon: Brain },
  { type: 'positive', title: 'Consistência nos hábitos', description: 'Você manteve sua sequência de respiração consciente por 5 dias', icon: Target },
  { type: 'neutral', title: 'Padrão de sono', description: 'Média de 6.5h de sono - considere aumentar para 7-8h', icon: Heart },
]

export default function MetricasPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ═══ PERFORMANCE EQUATION HEADER ═══ */}
      <div className="rounded-lg border border-[var(--border-architectural)] bg-white p-4 lg:p-6">
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#B8755C]" />
          Status do Avatar
        </h2>
        <p className="text-sm text-[#8C8580] mt-1">
          A Equação da Performance
        </p>

        {/* Performance Equation Display */}
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
          {/* Gold vs Brass comparison */}
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

      {/* ═══ FULL CHARACTER SHEET ═══ */}
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

            {/* Trends */}
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

        {/* Weekly Evolution */}
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

      {/* ═══ CARE RATIO AS PARTY BALANCE ═══ */}
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
            {/* Donut chart */}
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

      {/* ═══ MONTHLY ACHIEVEMENTS ═══ */}
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
                <Flame className="h-3 w-3" />
                {monthlyProgress.habits.streak}
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

      {/* ═══ AI INSIGHTS ═══ */}
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
                  insight.type === 'positive'
                    ? 'border-[#8B9E7C]/30 bg-[#8B9E7C]/5'
                    : insight.type === 'attention'
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-[#8C8580]/20 bg-[#8C8580]/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      insight.type === 'positive'
                        ? 'bg-[#8B9E7C]/20'
                        : insight.type === 'attention'
                        ? 'bg-amber-500/20'
                        : 'bg-[#8C8580]/20'
                    }`}
                  >
                    <insight.icon
                      className={`h-4 w-4 ${
                        insight.type === 'positive'
                          ? 'text-[#8B9E7C]'
                          : insight.type === 'attention'
                          ? 'text-amber-500'
                          : 'text-[#8C8580]'
                      }`}
                    />
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
    </div>
  )
}
