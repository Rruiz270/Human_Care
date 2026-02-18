'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useUserStore } from '@/store/user-store'
import { FlowingLines, EditorialQuote, IconBadge, SectionDivider } from '@/components/ui/decorative-elements'
import {
  Calendar,
  Target,
  TrendingUp,
  Heart,
  Brain,
  Zap,
  MessageSquare,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

// Demo data
const upcomingSessions = [
  {
    id: '1',
    type: 'THERAPY',
    professional: 'Dra. Ana Costa',
    scheduledAt: new Date(Date.now() + 86400000),
    isOnline: true,
  },
  {
    id: '2',
    type: 'COACHING',
    professional: 'Carlos Mendes',
    scheduledAt: new Date(Date.now() + 172800000),
    isOnline: true,
  },
]

const pendingMissions = [
  {
    id: '1',
    title: 'Praticar respiracao consciente',
    type: 'DAILY_HABIT',
    dueDate: new Date(),
  },
  {
    id: '2',
    title: 'Escrever carta de perdao',
    type: 'THERAPY_TASK',
    dueDate: new Date(Date.now() + 259200000),
  },
  {
    id: '3',
    title: 'Definir metas do trimestre',
    type: 'COACHING_TASK',
    dueDate: new Date(Date.now() + 604800000),
  },
]

const recentInsights = [
  'Padrao de estresse identificado nas segundas-feiras',
  'Melhora significativa na qualidade do sono',
  'Progresso nas metas de carreira',
]

export default function DashboardPage() {
  const { currentUser } = useUserStore()

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div className="relative space-y-8 animate-fade-in">
      {/* Flowing Lines Background Decoration */}
      <FlowingLines className="pointer-events-none absolute inset-0 z-0 opacity-50" />

      {/* Welcome Section */}
      <div className="relative z-10 rounded-2xl border border-[#B8755C]/15 bg-white p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">
              {greeting()}, {currentUser?.name?.split(' ')[0]}!
            </h2>
            <p className="mt-2 text-[#8C8580]">
              Continue sua jornada de autoconhecimento e crescimento pessoal.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/chat-ai">
              <Button className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversar com IA
              </Button>
            </Link>
            <Link href="/mapa-da-vida">
              <Button variant="outline" className="border-[#B8755C]/30 text-[#1A1A1E] hover:bg-[#B8755C]/5">
                Ver Mapa da Vida
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8C8580]">
              Humor Medio
            </CardTitle>
            <IconBadge icon={Heart} variant="copper" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold text-[#1A1A1E]">7.5/10</div>
            <p className="text-xs text-[#B8755C]">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              +0.5 vs semana passada
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8C8580]">
              Energia
            </CardTitle>
            <IconBadge icon={Zap} variant="copper" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold text-[#1A1A1E]">6.8/10</div>
            <p className="text-xs text-[#8C8580]">
              Estavel esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8C8580]">
              Sessoes do Mes
            </CardTitle>
            <IconBadge icon={Calendar} variant="sage" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold text-[#1A1A1E]">3/4</div>
            <Progress value={75} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8C8580]">
              Missoes Concluidas
            </CardTitle>
            <IconBadge icon={Target} variant="copper" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-bold text-[#1A1A1E]">12/15</div>
            <Progress value={80} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid gap-6 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-serif font-bold text-[#1A1A1E]">Proximas Sessoes</CardTitle>
              <Link href="/agenda">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-4 rounded-lg border border-[#8C8580]/20 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8B9E7C]/10">
                  {session.type === 'THERAPY' ? (
                    <Brain className="h-6 w-6 text-[#8B9E7C]" />
                  ) : (
                    <Target className="h-6 w-6 text-[#B8755C]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1A1A1E]">
                    {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'}
                  </p>
                  <p className="text-sm text-[#8C8580]">{session.professional}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#8C8580]">
                    <Clock className="h-3 w-3" />
                    {session.scheduledAt.toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {session.isOnline && (
                  <Badge variant="secondary">Online</Badge>
                )}
              </div>
            ))}
            {upcomingSessions.length === 0 && (
              <p className="text-center text-sm text-[#8C8580]">
                Nenhuma sessao agendada
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pending Missions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-serif font-bold text-[#1A1A1E]">Missoes Pendentes</CardTitle>
              <Link href="/missoes">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMissions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-start gap-3 rounded-lg border border-[#8C8580]/20 p-6"
              >
                <div
                  className={`mt-0.5 h-4 w-4 rounded-full border-2 ${
                    mission.type === 'DAILY_HABIT'
                      ? 'border-[#B8755C]'
                      : mission.type === 'THERAPY_TASK'
                      ? 'border-[#8B9E7C]'
                      : 'border-[#8C8580]'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1A1E]">
                    {mission.title}
                  </p>
                  <p className="text-xs text-[#8C8580]">
                    Vence em{' '}
                    {mission.dueDate.toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#B8755C]" />
              <CardTitle className="text-3xl font-serif font-bold text-[#1A1A1E]">Insights da IA</CardTitle>
            </div>
            <CardDescription>
              Analises baseadas nos seus dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-[#8C8580]/5 p-6"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#B8755C]" />
                <p className="text-sm text-[#1A1A1E]">{insight}</p>
              </div>
            ))}
            <Link href="/chat-ai">
              <Button variant="outline" className="mt-2 w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Explorar mais com IA
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Care Ratio */}
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle className="text-3xl font-serif font-bold text-[#1A1A1E]">Ratio de Cuidado</CardTitle>
          <CardDescription>
            Equilibrio entre cuidado profissional, artificial e autocuidado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">
                  Cuidado Profissional
                </span>
                <span className="text-sm font-bold text-[#8B9E7C]">35%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#8C8580]/20">
                <div
                  className="h-full bg-[#8B9E7C]"
                  style={{ width: '35%' }}
                />
              </div>
              <p className="text-xs text-[#8C8580]">
                Sessoes com terapeutas e coaches
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">
                  Cuidado Artificial
                </span>
                <span className="text-sm font-bold text-[#B8755C]">25%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#8C8580]/20">
                <div
                  className="h-full bg-[#B8755C]"
                  style={{ width: '25%' }}
                />
              </div>
              <p className="text-xs text-[#8C8580]">
                Interacoes com a IA
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1E]">
                  Autocuidado
                </span>
                <span className="text-sm font-bold text-[#1A1A1E]">40%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#8C8580]/20">
                <div
                  className="h-full bg-[#1A1A1E]"
                  style={{ width: '40%' }}
                />
              </div>
              <p className="text-xs text-[#8C8580]">
                Praticas e reflexoes pessoais
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editorial Quote */}
      <div className="relative z-10">
        <EditorialQuote text="Cada passo na jornada e parte do destino." />
      </div>
    </div>
  )
}
