'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#001011]">Metricas e Analises</h2>
        <p className="text-[#757780]">
          Acompanhe seu progresso e identifique padroes
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#757780]">Humor Medio</p>
                <p className="text-3xl font-bold text-[#001011]">7.4</p>
                <div className="flex items-center gap-1 text-sm text-[#A4DF00]">
                  <TrendingUp className="h-4 w-4" />
                  +0.8 vs mes anterior
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6CCFF6]/10">
                <Heart className="h-6 w-6 text-[#6CCFF6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#757780]">Energia Media</p>
                <p className="text-3xl font-bold text-[#001011]">6.6</p>
                <div className="flex items-center gap-1 text-sm text-[#757780]">
                  Estavel
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A4DF00]/10">
                <Zap className="h-6 w-6 text-[#A4DF00]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#757780]">Estresse Medio</p>
                <p className="text-3xl font-bold text-[#001011]">5.6</p>
                <div className="flex items-center gap-1 text-sm text-[#A4DF00]">
                  <TrendingDown className="h-4 w-4" />
                  -1.2 vs mes anterior
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <Brain className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#757780]">Alinhamento</p>
                <p className="text-3xl font-bold text-[#001011]">78%</p>
                <div className="flex items-center gap-1 text-sm text-[#A4DF00]">
                  <TrendingUp className="h-4 w-4" />
                  +5% vs mes anterior
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#001011]/10">
                <Target className="h-6 w-6 text-[#001011]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#6CCFF6]" />
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
                    <span className="w-12 font-medium text-[#001011]">{day.day}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#6CCFF6]" />
                        <span className="text-[#757780]">{day.mood}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#A4DF00]" />
                        <span className="text-[#757780]">{day.energy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-[#757780]">{day.stress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-2 rounded-l bg-[#6CCFF6]"
                      style={{ width: `${day.mood * 10}%` }}
                    />
                    <div
                      className="h-2 bg-[#A4DF00]"
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
                  <div className="h-3 w-3 rounded-full bg-[#6CCFF6]" />
                  <span className="text-[#757780]">Humor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#A4DF00]" />
                  <span className="text-[#757780]">Energia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-[#757780]">Estresse</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care Ratio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-[#A4DF00]" />
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
                    stroke="#6CCFF6"
                    strokeWidth="20"
                    strokeDasharray={`${careRatio.professional * 2.51} 251`}
                  />
                  {/* Artificial Care */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#A4DF00"
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
                    stroke="#001011"
                    strokeWidth="20"
                    strokeDasharray={`${careRatio.selfCare * 2.51} 251`}
                    strokeDashoffset={`-${(careRatio.professional + careRatio.artificial) * 2.51}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#001011]">100%</p>
                    <p className="text-xs text-[#757780]">Total</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#6CCFF6]" />
                    <span className="text-2xl font-bold text-[#001011]">
                      {careRatio.professional}%
                    </span>
                  </div>
                  <p className="text-sm text-[#757780]">Profissional</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#A4DF00]" />
                    <span className="text-2xl font-bold text-[#001011]">
                      {careRatio.artificial}%
                    </span>
                  </div>
                  <p className="text-sm text-[#757780]">Artificial</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#001011]" />
                    <span className="text-2xl font-bold text-[#001011]">
                      {careRatio.selfCare}%
                    </span>
                  </div>
                  <p className="text-sm text-[#757780]">Autocuidado</p>
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
            <Calendar className="h-5 w-5 text-[#001011]" />
            Progresso do Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#001011]">Sessoes</span>
                <span className="text-sm text-[#757780]">
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
                <span className="text-sm font-medium text-[#001011]">Missoes</span>
                <span className="text-sm text-[#757780]">
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
                <span className="text-sm font-medium text-[#001011]">Registros Diarios</span>
                <span className="text-sm text-[#757780]">
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
                <span className="text-sm font-medium text-[#001011]">Sequencia de Habitos</span>
                <span className="text-sm text-[#757780]">
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
            <Sparkles className="h-5 w-5 text-[#A4DF00]" />
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
                className={`rounded-lg border p-4 ${
                  insight.type === 'positive'
                    ? 'border-[#A4DF00]/30 bg-[#A4DF00]/5'
                    : insight.type === 'attention'
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-[#757780]/20 bg-[#757780]/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      insight.type === 'positive'
                        ? 'bg-[#A4DF00]/20'
                        : insight.type === 'attention'
                        ? 'bg-amber-500/20'
                        : 'bg-[#757780]/20'
                    }`}
                  >
                    <insight.icon
                      className={`h-5 w-5 ${
                        insight.type === 'positive'
                          ? 'text-[#A4DF00]'
                          : insight.type === 'attention'
                          ? 'text-amber-500'
                          : 'text-[#757780]'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001011]">{insight.title}</h4>
                    <p className="mt-1 text-sm text-[#757780]">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
