'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { EditorialQuote, IconBadge } from '@/components/ui/decorative-elements'
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
  PieChart,
} from 'lucide-react'

// Demo data for charts
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
  {
    type: 'positive',
    title: 'Melhora no humor',
    description: 'Seu humor medio melhorou 12% nas ultimas 2 semanas',
    icon: TrendingUp,
  },
  {
    type: 'attention',
    title: 'Pico de estresse',
    description: 'Seu nivel de estresse aumenta nas quartas-feiras',
    icon: Brain,
  },
  {
    type: 'positive',
    title: 'Consistencia nos habitos',
    description: 'Voce manteve sua sequencia de respiracao consciente por 5 dias',
    icon: Target,
  },
  {
    type: 'neutral',
    title: 'Padrao de sono',
    description: 'Media de 6.5h de sono - considere aumentar para 7-8h',
    icon: Heart,
  },
]

export default function MetricasPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Metricas e Analises</h2>
        <p className="text-[#8C8580]">
          Acompanhe seu progresso e identifique padroes
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#8C8580]">Humor Medio</p>
                <p className="text-3xl font-mono font-bold text-[#1A1A1E]">7.4</p>
                <div className="flex items-center gap-1 text-sm text-[#8B9E7C]">
                  <TrendingUp className="h-4 w-4" />
                  +0.8 vs mes anterior
                </div>
              </div>
              <IconBadge icon={Heart} variant="sage" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#8C8580]">Energia Media</p>
                <p className="text-3xl font-mono font-bold text-[#1A1A1E]">6.6</p>
                <div className="flex items-center gap-1 text-sm text-[#8C8580]">
                  Estavel
                </div>
              </div>
              <IconBadge icon={Zap} variant="copper" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#8C8580]">Estresse Medio</p>
                <p className="text-3xl font-mono font-bold text-[#1A1A1E]">5.6</p>
                <div className="flex items-center gap-1 text-sm text-[#8B9E7C]">
                  <TrendingDown className="h-4 w-4" />
                  -1.2 vs mes anterior
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#8C8580]">Alinhamento</p>
                <p className="text-3xl font-mono font-bold text-[#1A1A1E]">78%</p>
                <div className="flex items-center gap-1 text-sm text-[#8B9E7C]">
                  <TrendingUp className="h-4 w-4" />
                  +5% vs mes anterior
                </div>
              </div>
              <IconBadge icon={Target} variant="copper" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#8B9E7C]" />
              Evolucao Semanal
            </CardTitle>
            <CardDescription>
              Humor, energia e estresse ao longo da semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyMood.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="w-12 font-medium text-[#1A1A1E]">{day.day}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#B8755C]" />
                        <span className="text-[#8C8580]">{day.mood}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#8B9E7C]" />
                        <span className="text-[#8C8580]">{day.energy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-[#8C8580]">{day.stress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-2 rounded-l bg-[#B8755C]"
                      style={{ width: `${day.mood * 10}%` }}
                    />
                    <div
                      className="h-2 bg-[#8B9E7C]"
                      style={{ width: `${day.energy * 10}%` }}
                    />
                    <div
                      className="h-2 rounded-r bg-amber-500"
                      style={{ width: `${day.stress * 10}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#B8755C]" />
                  <span className="text-[#8C8580]">Humor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#8B9E7C]" />
                  <span className="text-[#8C8580]">Energia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-[#8C8580]">Estresse</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care Ratio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-[#B8755C]" />
              Ratio de Cuidado
            </CardTitle>
            <CardDescription>
              Distribuicao entre os tipos de cuidado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* Simple donut representation */}
              <div className="relative h-48 w-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Professional Care */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#B8755C"
                    strokeWidth="20"
                    strokeDasharray={`${careRatio.professional * 2.51} 251`}
                  />
                  {/* Artificial Care */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#8B9E7C"
                    strokeWidth="20"
                    strokeDasharray={`${careRatio.artificial * 2.51} 251`}
                    strokeDashoffset={`-${careRatio.professional * 2.51}`}
                  />
                  {/* Self Care */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1A1A1E"
                    strokeWidth="20"
                    strokeDasharray={`${careRatio.selfCare * 2.51} 251`}
                    strokeDashoffset={`-${(careRatio.professional + careRatio.artificial) * 2.51}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-mono font-bold text-[#1A1A1E]">100%</p>
                    <p className="text-xs text-[#8C8580]">Total</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#B8755C]" />
                    <span className="text-2xl font-mono font-bold text-[#1A1A1E]">
                      {careRatio.professional}%
                    </span>
                  </div>
                  <p className="text-sm text-[#8C8580]">Profissional</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#8B9E7C]" />
                    <span className="text-2xl font-mono font-bold text-[#1A1A1E]">
                      {careRatio.artificial}%
                    </span>
                  </div>
                  <p className="text-sm text-[#8C8580]">Artificial</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#1A1A1E]" />
                    <span className="text-2xl font-mono font-bold text-[#1A1A1E]">
                      {careRatio.selfCare}%
                    </span>
                  </div>
                  <p className="text-sm text-[#8C8580]">Autocuidado</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#1A1A1E]" />
            Progresso do Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">Sessoes</span>
                <span className="text-sm font-mono text-[#8C8580]">
                  {monthlyProgress.sessions.completed}/{monthlyProgress.sessions.total}
                </span>
              </div>
              <Progress
                value={
                  (monthlyProgress.sessions.completed / monthlyProgress.sessions.total) * 100
                }
                className="h-3"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">Missoes</span>
                <span className="text-sm font-mono text-[#8C8580]">
                  {monthlyProgress.missions.completed}/{monthlyProgress.missions.total}
                </span>
              </div>
              <Progress
                value={
                  (monthlyProgress.missions.completed / monthlyProgress.missions.total) * 100
                }
                className="h-3"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">Registros Diarios</span>
                <span className="text-sm font-mono text-[#8C8580]">
                  {monthlyProgress.dailyTracking.completed}/{monthlyProgress.dailyTracking.total}
                </span>
              </div>
              <Progress
                value={
                  (monthlyProgress.dailyTracking.completed /
                    monthlyProgress.dailyTracking.total) *
                  100
                }
                className="h-3"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">Sequencia de Habitos</span>
                <span className="text-sm font-mono text-[#8C8580]">
                  {monthlyProgress.habits.streak} dias (max: {monthlyProgress.habits.longest})
                </span>
              </div>
              <Progress
                value={(monthlyProgress.habits.streak / monthlyProgress.habits.longest) * 100}
                className="h-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#B8755C]" />
            Insights da IA
          </CardTitle>
          <CardDescription>
            Padroes e tendencias identificados nos seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`rounded-md border p-4 ${
                  insight.type === 'positive'
                    ? 'border-[#8B9E7C]/30 bg-[#8B9E7C]/5'
                    : insight.type === 'attention'
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-[#8C8580]/20 bg-[#8C8580]/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      insight.type === 'positive'
                        ? 'bg-[#8B9E7C]/20'
                        : insight.type === 'attention'
                        ? 'bg-amber-500/20'
                        : 'bg-[#8C8580]/20'
                    }`}
                  >
                    <insight.icon
                      className={`h-5 w-5 ${
                        insight.type === 'positive'
                          ? 'text-[#8B9E7C]'
                          : insight.type === 'attention'
                          ? 'text-amber-500'
                          : 'text-[#8C8580]'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A1A1E]">{insight.title}</h4>
                    <p className="mt-1 text-sm text-[#8C8580]">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditorialQuote text="Os numeros contam historias — aprenda a ouvir a sua." />
    </div>
  )
}
