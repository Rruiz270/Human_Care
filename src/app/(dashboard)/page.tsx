'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUserStore } from '@/store/user-store'
import { FlowingLines, EditorialQuote } from '@/components/ui/decorative-elements'
import {
  AvatarStatusBar,
  InventoryPanel,
  GameplayPhase,
  TopographicMap,
  QuestCard,
  CarePartyMember,
  XPProgressBar,
  CompassRose,
} from '@/components/ui/rpg-components'
import {
  Calendar,
  Target,
  Heart,
  Brain,
  Zap,
  MessageSquare,
  Clock,
  ChevronRight,
  Sparkles,
  Shield,
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
    title: 'Praticar respiração consciente',
    type: 'habit' as const,
    status: 'active' as const,
    xp: 30,
    streak: 5,
    fromNpc: 'Dra. Ana Costa',
  },
  {
    id: '2',
    title: 'Escrever carta de perdão',
    type: 'therapy' as const,
    status: 'active' as const,
    xp: 80,
    dueDate: new Date(Date.now() + 259200000),
    fromNpc: 'Dra. Ana Costa',
  },
  {
    id: '3',
    title: 'Definir metas do trimestre',
    type: 'coaching' as const,
    status: 'pending' as const,
    xp: 100,
    dueDate: new Date(Date.now() + 604800000),
    fromNpc: 'Carlos Mendes',
  },
]

const dailyMissions = [
  { title: 'Respiração 4-7-8', phase: 'morning' as const },
  { title: 'Revisão de metas', phase: 'afternoon' as const },
  { title: 'Journaling noturno', phase: 'night' as const },
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
    <div className="relative space-y-6 animate-fade-in">
      {/* Flowing Lines Background Decoration */}
      <FlowingLines className="pointer-events-none absolute inset-0 z-0 opacity-50" />

      {/* ═══ TOP SECTION: Character HUD ═══ */}
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
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
                Aventureiro
              </p>
            </div>
            <div className="w-full max-w-[180px]">
              <XPProgressBar currentXP={780} levelXP={1000} level={7} />
            </div>
          </div>

          {/* Center: Three Status Bars */}
          <div className="space-y-2.5">
            <AvatarStatusBar
              label="Energia Física"
              value={70}
              maxValue={100}
              color="copper"
              icon={Heart}
            />
            <AvatarStatusBar
              label="Energia Emocional"
              value={40}
              maxValue={100}
              color="sage"
              icon={Brain}
            />
            <AvatarStatusBar
              label="Recursos / Rotina"
              value={80}
              maxValue={100}
              color="gold"
              icon={Clock}
            />
          </div>

          {/* Right: Compass Rose */}
          <div className="flex flex-col items-center justify-center">
            <CompassRose alignment={78} size={80} />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-3 border-t border-[#B8755C]/10 pt-2">
          <p className="text-center text-[11px] italic text-[#8C8580]" style={{ fontFamily: "'Playfair Display', serif" }}>
            &ldquo;O que te limita é o que está te limitando.&rdquo;
          </p>
        </div>
      </div>

      {/* ═══ MIDDLE SECTION: Three-Column Game Layout ═══ */}
      <div className="relative z-10 grid gap-4 lg:grid-cols-3">
        {/* Left: Mini Topographic Map */}
        <div>
          <h3 className="mb-2 text-xs font-mono uppercase tracking-widest text-[#8C8580]">
            Mapa Resumo
          </h3>
          <Link href="/mapa-da-vida">
            <TopographicMap compact />
          </Link>
        </div>

        {/* Center: Inventory Panel */}
        <div>
          <h3 className="mb-2 text-xs font-mono uppercase tracking-widest text-[#8C8580]">
            Inventário
          </h3>
          <InventoryPanel timeAvailable={68} energyQuality={55} />
        </div>

        {/* Right: Gameplay Phase */}
        <div>
          <h3 className="mb-2 text-xs font-mono uppercase tracking-widest text-[#8C8580]">
            Gameplay
          </h3>
          <GameplayPhase missions={dailyMissions} />
        </div>
      </div>

      {/* ═══ BOTTOM SECTION: Active Quests + Party ═══ */}
      <div className="relative z-10 grid gap-6 lg:grid-cols-3">
        {/* Active Quests */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8580]">
              Missões Ativas
            </h3>
            <Link href="/missoes">
              <Button variant="ghost" size="sm" className="text-xs">
                Quest Log <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {pendingMissions.map((mission) => (
              <QuestCard
                key={mission.id}
                title={mission.title}
                type={mission.type}
                status={mission.status}
                xpReward={mission.xp}
                streak={mission.streak}
                fromNpc={mission.fromNpc}
                dueDate={mission.dueDate}
              />
            ))}
          </div>
        </div>

        {/* Care Party + Upcoming Encounters */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-3 text-xs font-mono uppercase tracking-widest text-[#8C8580]">
              Equipe de Cuidado
            </h3>
            <div className="space-y-2">
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

          {/* Upcoming Encounters */}
          <div>
            <h3 className="mb-3 text-xs font-mono uppercase tracking-widest text-[#8C8580]">
              Próximos Encontros
            </h3>
            <div className="space-y-2">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="encounter-card rounded-md border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3"
                  style={{
                    borderLeftColor: session.type === 'THERAPY' ? 'var(--sage)' : 'var(--copper)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    {session.type === 'THERAPY' ? (
                      <Brain className="h-4 w-4 text-[#8B9E7C]" />
                    ) : (
                      <Target className="h-4 w-4 text-[#B8755C]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1E] truncate">
                        {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'}
                      </p>
                      <p className="text-[10px] font-mono text-[#8C8580]">{session.professional}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#8C8580]">
                      {session.scheduledAt.toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link href="/chat-ai" className="flex-1">
              <Button className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D] text-xs">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                O Oráculo
              </Button>
            </Link>
            <Link href="/mapa-da-vida" className="flex-1">
              <Button variant="outline" className="w-full border-[#B8755C]/30 text-xs">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Mapa do Mundo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Quote */}
      <div className="relative z-10">
        <EditorialQuote text="Cada passo na jornada é parte do destino." />
      </div>
    </div>
  )
}
