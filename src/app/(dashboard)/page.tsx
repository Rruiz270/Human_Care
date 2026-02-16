'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useUserStore } from '@/store/user-store'
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
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-[#001011] to-[#1a1a2e] p-6 text-white lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold lg:text-3xl">
              {greeting()}, {currentUser?.name?.split(' ')[0]}!
            </h2>
            <p className="mt-2 text-gray-300">
              Continue sua jornada de autoconhecimento e crescimento pessoal.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/chat-ai">
              <Button className="bg-[#A4DF00] text-[#001011] hover:bg-[#8BC500]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversar com IA
              </Button>
            </Link>
            <Link href="/mapa-da-vida">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Ver Mapa da Vida
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#757780]">
              Humor Medio
            </CardTitle>
            <Heart className="h-4 w-4 text-[#6CCFF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#001011]">7.5/10</div>
            <p className="text-xs text-[#A4DF00]">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              +0.5 vs semana passada
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#757780]">
              Energia
            </CardTitle>
            <Zap className="h-4 w-4 text-[#A4DF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#001011]">6.8/10</div>
            <p className="text-xs text-[#757780]">
              Estavel esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#757780]">
              Sessoes do Mes
            </CardTitle>
            <Calendar className="h-4 w-4 text-[#6CCFF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#001011]">3/4</div>
            <Progress value={75} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#757780]">
              Missoes Concluidas
            </CardTitle>
            <Target className="h-4 w-4 text-[#A4DF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#001011]">12/15</div>
            <Progress value={80} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Proximas Sessoes</CardTitle>
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
                className="flex items-center gap-4 rounded-lg border border-[#757780]/20 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6CCFF6]/10">
                  {session.type === 'THERAPY' ? (
                    <Brain className="h-6 w-6 text-[#6CCFF6]" />
                  ) : (
                    <Target className="h-6 w-6 text-[#A4DF00]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#001011]">
                    {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'}
                  </p>
                  <p className="text-sm text-[#757780]">{session.professional}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#757780]">
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
              <p className="text-center text-sm text-[#757780]">
                Nenhuma sessao agendada
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pending Missions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Missoes Pendentes</CardTitle>
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
                className="flex items-start gap-3 rounded-lg border border-[#757780]/20 p-3"
              >
                <div
                  className={`mt-0.5 h-4 w-4 rounded-full border-2 ${
                    mission.type === 'DAILY_HABIT'
                      ? 'border-[#A4DF00]'
                      : mission.type === 'THERAPY_TASK'
                      ? 'border-[#6CCFF6]'
                      : 'border-[#757780]'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#001011]">
                    {mission.title}
                  </p>
                  <p className="text-xs text-[#757780]">
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
              <Sparkles className="h-5 w-5 text-[#A4DF00]" />
              <CardTitle className="text-lg">Insights da IA</CardTitle>
            </div>
            <CardDescription>
              Analises baseadas nos seus dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-[#757780]/5 p-3"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-[#A4DF00]" />
                <p className="text-sm text-[#001011]">{insight}</p>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ratio de Cuidado</CardTitle>
          <CardDescription>
            Equilibrio entre cuidado profissional, artificial e autocuidado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#001011]">
                  Cuidado Profissional
                </span>
                <span className="text-sm font-bold text-[#6CCFF6]">35%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#757780]/20">
                <div
                  className="h-full bg-[#6CCFF6]"
                  style={{ width: '35%' }}
                />
              </div>
              <p className="text-xs text-[#757780]">
                Sessoes com terapeutas e coaches
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#001011]">
                  Cuidado Artificial
                </span>
                <span className="text-sm font-bold text-[#A4DF00]">25%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#757780]/20">
                <div
                  className="h-full bg-[#A4DF00]"
                  style={{ width: '25%' }}
                />
              </div>
              <p className="text-xs text-[#757780]">
                Interacoes com a IA
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#001011]">
                  Autocuidado
                </span>
                <span className="text-sm font-bold text-[#001011]">40%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#757780]/20">
                <div
                  className="h-full bg-[#001011]"
                  style={{ width: '40%' }}
                />
              </div>
              <p className="text-xs text-[#757780]">
                Praticas e reflexoes pessoais
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
