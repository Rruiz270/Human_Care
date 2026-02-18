'use client'

import React from 'react'
import {
  Heart,
  Brain,
  Clock,
  Zap,
  Flame,
  Star,
  Shield,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  User,
  MapPin,
  Target,
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Circle,
  AlertCircle,
  Link2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TimeBlock, Activity, FeelingEntry, ThoughtEntry, ProjectEnhanced } from '@/types'

/* ───────────────────────────────────────────────
   1. AvatarStatusBar
   RPG-style horizontal bar (HP/MP style)
   ─────────────────────────────────────────────── */
export function AvatarStatusBar({
  label,
  value,
  maxValue = 100,
  color = 'copper',
  icon: Icon,
}: {
  label: string
  value: number
  maxValue?: number
  color?: 'copper' | 'sage' | 'gold' | 'danger'
  icon?: LucideIcon
}) {
  const pct = Math.min(100, Math.max(0, (value / maxValue) * 100))
  const gradients: Record<string, string> = {
    copper: 'from-[#8B5A3E] via-[#B8755C] to-[#C4956A]',
    sage: 'from-[#6E8160] via-[#8B9E7C] to-[#A3B596]',
    gold: 'from-[#B8860B] via-[#DAA520] to-[#FFD700]',
    danger: 'from-[#8B0000] via-[#DC143C] to-[#FF6347]',
  }
  const effectiveColor = pct < 30 ? 'danger' : color

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="h-3.5 w-3.5 text-[#8C8580]" />}
          <span className="text-xs font-mono uppercase tracking-wider text-[#8C8580]">
            {label}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-[#1A1A1E]">
          {value}/{maxValue}
        </span>
      </div>
      <div className="rpg-status-bar">
        <div
          className={`rpg-status-bar-fill bg-gradient-to-r ${gradients[effectiveColor]}`}
          style={{ width: `${pct}%` }}
        />
        <span className="rpg-status-bar-text">{Math.round(pct)}%</span>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   2. InventoryPanel
   Time x Energy balance with scale metaphor
   ─────────────────────────────────────────────── */
export function InventoryPanel({
  timeAvailable = 68,
  energyQuality = 55,
}: {
  timeAvailable?: number
  energyQuality?: number
}) {
  const performance = Math.round((timeAvailable * energyQuality) / 100)

  return (
    <div className="rounded-lg border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-4">
      <h4 className="mb-3 text-center text-xs font-mono uppercase tracking-widest text-[#8C8580]">
        Inventario
      </h4>

      <div className="flex items-center gap-3">
        {/* Time */}
        <div className="flex-1 text-center">
          <Clock className="mx-auto mb-1 h-6 w-6 text-[#B8755C]" />
          <p className="text-lg font-mono font-bold text-[#1A1A1E]">{timeAvailable}%</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
            Tempo Disponível
          </p>
        </div>

        {/* Scale icon */}
        <div className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#B8755C]">
            <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="4" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="2" />
            <path d="M4 10 L2 18 L10 18 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
            <path d="M28 10 L22 18 L30 18 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
            <rect x="12" y="20" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
            <rect x="10" y="24" width="12" height="2" rx="1" fill="currentColor" />
          </svg>
          <span className="text-[8px] font-mono uppercase tracking-wider text-[#8C8580] mt-1">X</span>
        </div>

        {/* Energy */}
        <div className="flex-1 text-center">
          <Zap className="mx-auto mb-1 h-6 w-6 text-[#DAA520]" />
          <p className="text-lg font-mono font-bold text-[#1A1A1E]">{energyQuality}%</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
            Qualidade de Energia
          </p>
        </div>
      </div>

      {/* Performance equation */}
      <div className="mt-3 rounded border border-[#B8755C]/20 bg-[#B8755C]/5 p-2 text-center">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
          Performance Real
        </p>
        <p className="text-xl font-mono font-bold text-[#1A1A1E]">{performance}%</p>
        <p className="text-[9px] font-mono text-[#8C8580]">
          Tempo x Energia = Performance
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   3. GameplayPhase
   Morning / Afternoon / Night phases
   ─────────────────────────────────────────────── */
export function GameplayPhase({
  missions = [],
}: {
  missions?: { title: string; phase: 'morning' | 'afternoon' | 'night' }[]
}) {
  const hour = new Date().getHours()
  const currentPhase: 'morning' | 'afternoon' | 'night' =
    hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'night'

  const phases = [
    {
      key: 'morning' as const,
      label: 'Manha',
      subtitle: 'Planejamento Estrategico',
      icon: '🌅',
      time: '6h - 12h',
    },
    {
      key: 'afternoon' as const,
      label: 'Tarde',
      subtitle: 'Execucao Focada',
      icon: '☀️',
      time: '12h - 18h',
    },
    {
      key: 'night' as const,
      label: 'Noite',
      subtitle: 'Descompressao',
      icon: '🌙',
      time: '18h - 6h',
    },
  ]

  return (
    <div className="rounded-lg border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-4">
      <h4 className="mb-3 text-center text-xs font-mono uppercase tracking-widest text-[#8C8580]">
        Gameplay - Rotina Diária
      </h4>
      <div className="space-y-2">
        {phases.map((phase) => {
          const isActive = currentPhase === phase.key
          const phaseMissions = missions.filter((m) => m.phase === phase.key)
          return (
            <div
              key={phase.key}
              className={`rounded-md border p-2.5 transition-all ${
                isActive
                  ? 'border-[#B8755C] bg-[#B8755C]/10 shadow-sm'
                  : 'border-[var(--border-architectural)] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{phase.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-[#1A1A1E]' : 'text-[#8C8580]'}`}>
                      {phase.label}
                    </p>
                    <p className="text-[10px] font-mono text-[#8C8580]">{phase.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#8C8580]">{phase.time}</span>
                  {isActive && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#B8755C] animate-pulse" />
                  )}
                </div>
              </div>
              {phaseMissions.length > 0 && (
                <div className="mt-1.5 space-y-1">
                  {phaseMissions.map((m, i) => (
                    <p key={i} className="text-xs text-[#8C8580] pl-7">• {m.title}</p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   4. TopographicMap
   SVG map with Ponto 0, A, B and fog of war
   ─────────────────────────────────────────────── */
export function TopographicMap({
  compact = false,
  onWaypointClick,
}: {
  compact?: boolean
  onWaypointClick?: (point: 'ponto0' | 'pontoA' | 'pontoB') => void
}) {
  const h = compact ? 180 : 320
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-[var(--border-architectural)]">
      <svg
        viewBox={`0 0 800 ${h}`}
        className="w-full"
        style={{ height: compact ? 180 : 320 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="fogGrad" x1="0.55" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="rgba(44,44,44,0.15)" />
            <stop offset="100%" stopColor="rgba(44,44,44,0.55)" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8755C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B8755C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Parchment background */}
        <rect width="800" height={h} fill="#F5F0EB" />

        {/* Contour lines */}
        {[0.15, 0.3, 0.45, 0.6, 0.75].map((y, i) => (
          <path
            key={i}
            d={`M0 ${h * y} C${100 + i * 30} ${h * y - 20 + i * 5}, ${250 + i * 20} ${h * y + 15 - i * 3}, ${400 + i * 10} ${h * y - 10 + i * 8} S${600 - i * 15} ${h * y + 20 - i * 5}, 800 ${h * y + i * 5}`}
            stroke="#B8755C"
            strokeWidth="0.6"
            strokeOpacity={0.12 - i * 0.015}
            fill="none"
            className="map-contour"
          />
        ))}

        {/* Sepia zone (past — left) */}
        <rect x="0" y="0" width="280" height={h} fill="#B8755C" fillOpacity="0.03" />

        {/* Path: Ponto 0 → Ponto A (solid) */}
        <path
          d={`M100 ${h * 0.5} C200 ${h * 0.35}, 300 ${h * 0.55}, 400 ${h * 0.45}`}
          stroke="#B8755C"
          strokeWidth="2"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Path: Ponto A → Ponto B (dashed through fog) */}
        <path
          d={`M400 ${h * 0.45} C500 ${h * 0.35}, 600 ${h * 0.5}, 700 ${h * 0.4}`}
          stroke="#B8755C"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeDasharray="8 6"
          fill="none"
        />

        {/* Fog of War overlay */}
        <rect x="0" y="0" width="800" height={h} fill="url(#fogGrad)" className="fog-of-war" />

        {/* Ponto 0 (Origin) */}
        <g
          className="cursor-pointer"
          onClick={() => onWaypointClick?.('ponto0')}
        >
          <circle cx="100" cy={h * 0.5} r="10" fill="#8B9E7C" fillOpacity="0.2" stroke="#8B9E7C" strokeWidth="1.5" />
          <circle cx="100" cy={h * 0.5} r="4" fill="#8B9E7C" />
          {!compact && (
            <text x="100" y={h * 0.5 + 22} textAnchor="middle" className="text-[10px] font-mono fill-[#8B9E7C]">
              PONTO 0
            </text>
          )}
        </g>

        {/* Ponto A (You Are Here — pulsing) */}
        <g
          className="cursor-pointer"
          onClick={() => onWaypointClick?.('pontoA')}
        >
          <circle cx="400" cy={h * 0.45} r="18" fill="url(#pulseGrad)" className="animate-pulse" />
          <circle cx="400" cy={h * 0.45} r="8" fill="#B8755C" stroke="white" strokeWidth="2" />
          {!compact && (
            <>
              <text x="400" y={h * 0.45 + 30} textAnchor="middle" className="text-[10px] font-mono fill-[#B8755C] font-bold">
                PONTO A
              </text>
              <text x="400" y={h * 0.45 + 42} textAnchor="middle" className="text-[8px] font-mono fill-[#8C8580]">
                Voce esta aqui
              </text>
            </>
          )}
        </g>

        {/* Ponto B (Destination — glowing) */}
        <g
          className="cursor-pointer"
          onClick={() => onWaypointClick?.('pontoB')}
          filter="url(#glowFilter)"
        >
          <circle cx="700" cy={h * 0.4} r="12" fill="#DAA520" fillOpacity="0.3" stroke="#DAA520" strokeWidth="1.5" />
          <polygon
            points="700,{y1} 694,{y2} 706,{y2}"
            fill="#DAA520"
            transform={`translate(0,0)`}
          />
          <circle cx="700" cy={h * 0.4} r="5" fill="#DAA520" className="glow-beacon" />
          {!compact && (
            <>
              <text x="700" y={h * 0.4 + 24} textAnchor="middle" className="text-[10px] font-mono fill-[#DAA520] font-bold">
                PONTO B
              </text>
              <text x="700" y={h * 0.4 + 36} textAnchor="middle" className="text-[8px] font-mono fill-[#8C8580]">
                Propósito
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  )
}

/* ───────────────────────────────────────────────
   5. QuestCard
   RPG quest/mission card
   ─────────────────────────────────────────────── */
export function QuestCard({
  title,
  description,
  type,
  status,
  xpReward = 50,
  streak,
  fromNpc,
  dueDate,
  progress,
  onAction,
}: {
  title: string
  description?: string
  type: 'therapy' | 'coaching' | 'habit' | 'reflection' | 'action'
  status: 'pending' | 'active' | 'completed'
  xpReward?: number
  streak?: number
  fromNpc?: string
  dueDate?: Date
  progress?: number
  onAction?: () => void
}) {
  const typeConfig = {
    therapy: { icon: Brain, label: 'Terapia', color: 'text-[#8B9E7C]', bg: 'bg-[#8B9E7C]/10' },
    coaching: { icon: Target, label: 'Coaching', color: 'text-[#B8755C]', bg: 'bg-[#B8755C]/10' },
    habit: { icon: Flame, label: 'Habito', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    reflection: { icon: Star, label: 'Reflexao', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    action: { icon: Zap, label: 'Acao', color: 'text-[#1A1A1E]', bg: 'bg-[#1A1A1E]/10' },
  }

  const cfg = typeConfig[type]
  const TypeIcon = cfg.icon

  const statusClass =
    status === 'completed'
      ? 'quest-scroll quest-scroll-completed'
      : status === 'active'
      ? 'quest-scroll quest-scroll-active'
      : 'quest-scroll'

  return (
    <div className={statusClass}>
      {/* Top decoration */}
      <div className="quest-scroll-border" />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4
                className={`font-serif font-semibold ${
                  status === 'completed' ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'
                }`}
              >
                {title}
              </h4>
              <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-mono ${cfg.bg} ${cfg.color}`}>
                <TypeIcon className="h-3 w-3" />
                {cfg.label}
              </span>
            </div>

            {description && (
              <p className="mt-1 text-sm text-[#8C8580] line-clamp-2">{description}</p>
            )}

            {/* Progress bar */}
            {progress !== undefined && (
              <div className="mt-2">
                <div className="rpg-status-bar h-2">
                  <div
                    className="rpg-status-bar-fill bg-gradient-to-r from-[#8B5A3E] via-[#B8755C] to-[#C4956A]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#8C8580]">
              {fromNpc && <span>NPC: {fromNpc}</span>}
              {dueDate && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dueDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            {/* XP badge */}
            <span className="xp-badge">+{xpReward} XP</span>

            {/* Streak */}
            {streak && streak > 0 && (
              <span className="combo-flame">
                <Flame className="h-3 w-3" />
                {streak}
              </span>
            )}

            {/* Completion seal */}
            {status === 'completed' && (
              <span className="achievement-seal">✓</span>
            )}
          </div>
        </div>

        {/* Action */}
        {status !== 'completed' && onAction && (
          <button
            onClick={onAction}
            className="mt-2 w-full rounded-sm border border-[#B8755C]/30 bg-[#B8755C]/5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[#B8755C] transition-colors hover:bg-[#B8755C]/10"
          >
            {type === 'habit' ? 'Check-in' : 'Concluir Missão'}
          </button>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   6. CarePartyMember
   Character card for care team member
   ─────────────────────────────────────────────── */
export function CarePartyMember({
  name,
  role,
  roleLabel,
  lastSession,
  nextSession,
  avatarInitials,
}: {
  name: string
  role: 'coach' | 'therapist' | 'care_team' | 'self'
  roleLabel: string
  lastSession?: string
  nextSession?: string
  avatarInitials: string
}) {
  const roleConfig = {
    coach: { icon: ArrowUp, color: 'border-[#B8755C]', bg: 'bg-[#B8755C]', direction: 'UP' },
    therapist: { icon: ArrowDown, color: 'border-[#8B9E7C]', bg: 'bg-[#8B9E7C]', direction: 'DOWN' },
    care_team: { icon: ArrowLeftRight, color: 'border-[#DAA520]', bg: 'bg-[#DAA520]', direction: 'HORIZONTAL' },
    self: { icon: User, color: 'border-[#1A1A1E]', bg: 'bg-[#1A1A1E]', direction: 'CENTER' },
  }

  const cfg = roleConfig[role]
  const DirIcon = cfg.icon

  return (
    <div className="encounter-card rounded-lg border border-[var(--border-architectural)] bg-[var(--parchment-light)] p-3">
      <div className="flex items-center gap-3">
        {/* Avatar with role border */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${cfg.color} ${cfg.bg} text-white text-sm font-bold`}>
          {avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1E] truncate">{name}</p>
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#8C8580]">
            <DirIcon className="h-3 w-3" />
            {roleLabel}
          </div>
        </div>
      </div>
      {(lastSession || nextSession) && (
        <div className="mt-2 space-y-0.5 text-[10px] font-mono text-[#8C8580]">
          {lastSession && <p>Último: {lastSession}</p>}
          {nextSession && <p className="text-[#B8755C]">Próximo: {nextSession}</p>}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────────────────────────────
   7. XPProgressBar
   Experience bar with level indicator
   ─────────────────────────────────────────────── */
export function XPProgressBar({
  currentXP = 780,
  levelXP = 1000,
  level = 7,
  milestones = [],
}: {
  currentXP?: number
  levelXP?: number
  level?: number
  milestones?: { position: number; label: string }[]
}) {
  const pct = Math.min(100, (currentXP / levelXP) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DAA520] text-xs font-bold text-white">
            {level}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#8C8580]">
            Nível {level}
          </span>
        </div>
        <span className="text-xs font-mono text-[#8C8580]">
          {currentXP}/{levelXP} XP
        </span>
      </div>
      <div className="xp-bar">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
        {milestones.map((m, i) => (
          <div
            key={i}
            className="xp-bar-milestone"
            style={{ left: `${m.position}%` }}
            title={m.label}
          />
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   8. CompassRose
   Decorative SVG compass with animated needle
   ─────────────────────────────────────────────── */
export function CompassRose({
  alignment = 78,
  size = 80,
}: {
  alignment?: number
  size?: number
}) {
  // Map 0–100 alignment to needle rotation (-90° to +90°; 0%=-90° left, 100%=0° north)
  const rotation = -90 + (alignment / 100) * 90

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="compass-needle-container"
      >
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#B8755C" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#B8755C" strokeWidth="0.5" strokeOpacity="0.15" />

        {/* Cardinal marks */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="6"
            x2="50"
            y2="12"
            stroke="#B8755C"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* Minor marks */}
        {[45, 135, 225, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="8"
            x2="50"
            y2="12"
            stroke="#B8755C"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* N label */}
        <text x="50" y="20" textAnchor="middle" className="text-[8px] font-mono fill-[#B8755C] font-bold">N</text>

        {/* Needle */}
        <g transform={`rotate(${rotation} 50 50)`} className="compass-needle">
          <polygon points="50,14 47,50 53,50" fill="#B8755C" />
          <polygon points="50,86 47,50 53,50" fill="#8C8580" fillOpacity="0.3" />
        </g>

        {/* Center */}
        <circle cx="50" cy="50" r="4" fill="#B8755C" />
        <circle cx="50" cy="50" r="2" fill="white" />
      </svg>
      <span className="text-[10px] font-mono text-[#8C8580]">{alignment}% alinhado</span>
    </div>
  )
}

/* ───────────────────────────────────────────────
   9. MapMarker
   Map pin for timeline events
   ─────────────────────────────────────────────── */
export function MapMarker({
  x,
  y,
  label,
  isPositive,
  onClick,
}: {
  x: number
  y: number
  label: string
  isPositive: boolean
  onClick?: () => void
}) {
  const color = isPositive ? '#8B9E7C' : '#B8755C'
  return (
    <g className="map-pin cursor-pointer" onClick={onClick} transform={`translate(${x}, ${y})`}>
      <circle r="6" fill={color} fillOpacity="0.3" />
      <circle r="3" fill={color} />
      <title>{label}</title>
    </g>
  )
}

/* ───────────────────────────────────────────────
   10. CarePartyDiagram (Cross pattern)
   ─────────────────────────────────────────────── */
export function CarePartyDiagram() {
  return (
    <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Cross lines */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#B8755C" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#B8755C" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />

        {/* Coach (UP) */}
        <g>
          <circle cx="100" cy="30" r="18" fill="#B8755C" fillOpacity="0.15" stroke="#B8755C" strokeWidth="1" />
          <text x="100" y="26" textAnchor="middle" className="text-[7px] font-mono fill-[#B8755C] font-bold">COACH</text>
          <text x="100" y="36" textAnchor="middle" className="text-[6px] font-mono fill-[#8C8580]">↑ UP</text>
        </g>

        {/* Terapeuta (DOWN) */}
        <g>
          <circle cx="100" cy="170" r="18" fill="#8B9E7C" fillOpacity="0.15" stroke="#8B9E7C" strokeWidth="1" />
          <text x="100" y="166" textAnchor="middle" className="text-[7px] font-mono fill-[#8B9E7C] font-bold">TERAPEUTA</text>
          <text x="100" y="176" textAnchor="middle" className="text-[6px] font-mono fill-[#8C8580]">↓ DOWN</text>
        </g>

        {/* Care Team (HORIZONTAL LEFT) */}
        <g>
          <circle cx="30" cy="100" r="18" fill="#DAA520" fillOpacity="0.15" stroke="#DAA520" strokeWidth="1" />
          <text x="30" y="97" textAnchor="middle" className="text-[6px] font-mono fill-[#DAA520] font-bold">CARE</text>
          <text x="30" y="106" textAnchor="middle" className="text-[6px] font-mono fill-[#8C8580]">← →</text>
        </g>

        {/* Self (CENTER) */}
        <g>
          <circle cx="100" cy="100" r="22" fill="#1A1A1E" fillOpacity="0.08" stroke="#1A1A1E" strokeWidth="1.5" />
          <text x="100" y="97" textAnchor="middle" className="text-[7px] font-mono fill-[#1A1A1E] font-bold">VOCE</text>
          <text x="100" y="107" textAnchor="middle" className="text-[6px] font-mono fill-[#8C8580]">CENTER</text>
        </g>

        {/* Arrows from center */}
        <line x1="100" y1="78" x2="100" y2="52" stroke="#B8755C" strokeWidth="1" markerEnd="" />
        <line x1="100" y1="122" x2="100" y2="148" stroke="#8B9E7C" strokeWidth="1" />
        <line x1="78" y1="100" x2="52" y2="100" stroke="#DAA520" strokeWidth="1" />
      </svg>
    </div>
  )
}

/* ───────────────────────────────────────────────
   11. TimeBlockCard
   Colored time block with category, time range, linked activity
   ─────────────────────────────────────────────── */
export function TimeBlockCard({
  block,
  isActive = false,
  linkedActivity,
  onClick,
}: {
  block: TimeBlock
  isActive?: boolean
  linkedActivity?: string
  onClick?: () => void
}) {
  const categoryLabels: Record<string, string> = {
    morning_routine: 'Rotina Matinal',
    focused_work: 'Trabalho Focado',
    therapy: 'Terapia',
    coaching: 'Coaching',
    project_time: 'Tempo de Projeto',
    exercise: 'Exercício',
    meals: 'Refeição',
    free_time: 'Tempo Livre',
    rest: 'Descanso',
    study: 'Estudo',
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-md border p-3 cursor-pointer transition-all ${
        isActive
          ? 'border-[#B8755C] bg-[#B8755C]/10 shadow-sm ring-1 ring-[#B8755C]/30'
          : 'border-[#B8755C]/15 bg-white hover:border-[#B8755C]/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-1.5 rounded-full"
          style={{ backgroundColor: block.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1A1A1E] truncate">{block.label}</p>
            {isActive && (
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#B8755C] animate-pulse" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-mono text-[#8C8580]">
              {block.startTime} - {block.endTime}
            </span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
              style={{ backgroundColor: `${block.color}20`, color: block.color }}
            >
              {categoryLabels[block.category] || block.category}
            </span>
          </div>
          {linkedActivity && (
            <p className="mt-1 text-[10px] text-[#8C8580] flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              {linkedActivity}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   12. ActivityCard
   Activity with source badge, priority indicator, status, project link
   ─────────────────────────────────────────────── */
export function ActivityCard({
  activity,
  projectName,
  timeBlockLabel,
  dependencyName,
  onStart,
  onComplete,
  onClick,
}: {
  activity: Activity
  projectName?: string
  timeBlockLabel?: string
  dependencyName?: string
  onStart?: () => void
  onComplete?: () => void
  onClick?: () => void
}) {
  const sourceConfig: Record<string, { label: string; color: string; bg: string }> = {
    project: { label: 'Projeto', color: 'text-[#B8755C]', bg: 'bg-[#B8755C]/10' },
    routine: { label: 'Rotina', color: 'text-[#8B9E7C]', bg: 'bg-[#8B9E7C]/10' },
    therapy: { label: 'Terapia', color: 'text-purple-600', bg: 'bg-purple-600/10' },
    coaching: { label: 'Coaching', color: 'text-[#DAA520]', bg: 'bg-[#DAA520]/10' },
    free: { label: 'Tempo Livre', color: 'text-sky-600', bg: 'bg-sky-600/10' },
    manual: { label: 'Manual', color: 'text-[#8C8580]', bg: 'bg-[#8C8580]/10' },
  }

  const priorityColors: Record<string, string> = {
    low: '#8B9E7C',
    medium: '#DAA520',
    high: '#B8755C',
    urgent: '#DC143C',
  }

  const statusConfig: Record<string, { label: string; icon: typeof CheckCircle2; color: string }> = {
    PENDING: { label: 'Pendente', icon: Circle, color: 'text-[#8C8580]' },
    IN_PROGRESS: { label: 'Em Andamento', icon: Clock, color: 'text-[#B8755C]' },
    COMPLETED: { label: 'Concluída', icon: CheckCircle2, color: 'text-[#8B9E7C]' },
    OVERDUE: { label: 'Atrasada', icon: AlertCircle, color: 'text-[#DC143C]' },
    BLOCKED: { label: 'Bloqueada', icon: Shield, color: 'text-[#8C8580]' },
  }

  const src = sourceConfig[activity.source] || sourceConfig.manual
  const st = statusConfig[activity.status] || statusConfig.PENDING
  const StatusIcon = st.icon

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border bg-white p-4 transition-all cursor-pointer hover:shadow-sm ${
        activity.status === 'COMPLETED' ? 'opacity-60' : ''
      }`}
      style={{ borderLeftColor: priorityColors[activity.priority], borderLeftWidth: '3px' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-mono ${src.bg} ${src.color}`}>
              {src.label}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono ${st.color}`}>
              <StatusIcon className="h-3 w-3" />
              {st.label}
            </span>
          </div>
          <h4 className={`mt-1.5 text-sm font-semibold ${
            activity.status === 'COMPLETED' ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'
          }`}>
            {activity.title}
          </h4>
          {activity.description && (
            <p className="mt-0.5 text-xs text-[#8C8580] line-clamp-2">{activity.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {projectName && (
              <span className="text-[10px] font-mono text-[#B8755C] bg-[#B8755C]/5 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                <FolderKanban className="h-3 w-3" />
                {projectName}
              </span>
            )}
            {timeBlockLabel && (
              <span className="text-[10px] font-mono text-[#8B9E7C] bg-[#8B9E7C]/5 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeBlockLabel}
              </span>
            )}
            {activity.dueDate && (
              <span className="text-[10px] font-mono text-[#8C8580]">
                Prazo: {new Date(activity.dueDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
              </span>
            )}
            {activity.estimatedMinutes && (
              <span className="text-[10px] font-mono text-[#8C8580]">
                ~{activity.estimatedMinutes}min
              </span>
            )}
          </div>
          {dependencyName && (
            <p className="mt-1.5 text-[10px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block">
              Depende de: {dependencyName}
            </p>
          )}
        </div>
        {activity.status !== 'COMPLETED' && activity.status !== 'BLOCKED' && (
          <div className="flex flex-col gap-1.5">
            {activity.status === 'PENDING' && onStart && (
              <button
                onClick={(e) => { e.stopPropagation(); onStart() }}
                className="rounded-sm border border-[#B8755C]/30 bg-[#B8755C]/5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#B8755C] hover:bg-[#B8755C]/10"
              >
                Iniciar
              </button>
            )}
            {onComplete && (
              <button
                onClick={(e) => { e.stopPropagation(); onComplete() }}
                className="rounded-sm border border-[#8B9E7C]/30 bg-[#8B9E7C]/5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8B9E7C] hover:bg-[#8B9E7C]/10"
              >
                Concluir
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   13. ProjectCard
   Project overview with progress ring SVG, milestones, time invested
   ─────────────────────────────────────────────── */
export function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectEnhanced
  onClick?: () => void
}) {
  const statusColors: Record<string, { label: string; color: string; bg: string }> = {
    PLANNING: { label: 'Planejamento', color: 'text-sky-600', bg: 'bg-sky-600/10' },
    IN_PROGRESS: { label: 'Em Andamento', color: 'text-[#B8755C]', bg: 'bg-[#B8755C]/10' },
    ON_HOLD: { label: 'Pausado', color: 'text-amber-600', bg: 'bg-amber-600/10' },
    COMPLETED: { label: 'Concluído', color: 'text-[#8B9E7C]', bg: 'bg-[#8B9E7C]/10' },
    CANCELLED: { label: 'Cancelado', color: 'text-[#8C8580]', bg: 'bg-[#8C8580]/10' },
  }

  const scopeConfig: Record<string, { label: string; color: string }> = {
    personal: { label: 'Pessoal', color: 'text-purple-600 bg-purple-600/10' },
    professional: { label: 'Profissional', color: 'text-[#B8755C] bg-[#B8755C]/10' },
  }

  const st = statusColors[project.status] || statusColors.PLANNING
  const sc = scopeConfig[project.scope] || scopeConfig.personal
  const completedMilestones = project.milestones.filter(m => m.isCompleted).length
  const circumference = 2 * Math.PI * 28
  const dashOffset = circumference - (project.progress / 100) * circumference

  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-[#B8755C]/15 bg-white p-4 cursor-pointer transition-all hover:shadow-md hover:border-[#B8755C]/30"
    >
      <div className="flex items-start gap-4">
        {/* Progress Ring */}
        <div className="relative flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#F5F0EB" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="28" fill="none"
              stroke="#B8755C" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-mono font-bold text-[#1A1A1E]">{project.progress}%</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[#1A1A1E] truncate">{project.title}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {project.category && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-[#8C8580]/10 text-[#8C8580]">
                {project.category}
              </span>
            )}
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm ${sc.color}`}>
              {sc.label}
            </span>
            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm ${st.bg} ${st.color}`}>
              {st.label}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-[#8C8580]">
            <span>{completedMilestones}/{project.milestones.length} marcos</span>
            <span>{Math.round(project.weeklyTimeInvested / 60)}h esta semana</span>
          </div>
          {project.targetDate && (
            <p className="mt-1 text-[10px] font-mono text-[#8C8580]">
              Meta: {new Date(project.targetDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   14. FeelingBubble
   Circular feeling indicator with intensity ring (1-5 color gradient)
   ─────────────────────────────────────────────── */
export function FeelingBubble({
  entry,
  onClick,
}: {
  entry: FeelingEntry
  onClick?: () => void
}) {
  const intensityColors = ['#8B9E7C', '#8B9E7C', '#DAA520', '#B8755C', '#DC143C']
  const color = intensityColors[Math.min(entry.intensity - 1, 4)]
  const circumference = 2 * Math.PI * 24
  const dashOffset = circumference - (entry.intensity / 5) * circumference

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-[#B8755C]/15 bg-white p-3 cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="relative flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="#F5F0EB" strokeWidth="3" />
          <circle
            cx="28" cy="28" r="24" fill="none"
            stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 28 28)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-mono font-bold" style={{ color }}>{entry.intensity}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1A1A1E]">{entry.feeling}</p>
        {entry.trigger && (
          <p className="text-[10px] text-[#8C8580] mt-0.5 truncate">Gatilho: {entry.trigger}</p>
        )}
        {entry.bodyLocation && (
          <p className="text-[10px] text-[#8C8580] truncate">Corpo: {entry.bodyLocation}</p>
        )}
        <p className="text-[10px] font-mono text-[#8C8580] mt-0.5">
          {new Date(entry.timestamp).toLocaleString('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   15. ThoughtCard
   Journal-entry styled card for thought records
   ─────────────────────────────────────────────── */
export function ThoughtCard({
  entry,
  linkedFeeling,
  onClick,
}: {
  entry: ThoughtEntry
  linkedFeeling?: string
  onClick?: () => void
}) {
  const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
    automatic: { label: 'Automático', color: 'text-amber-600', bg: 'bg-amber-600/10' },
    reflective: { label: 'Reflexivo', color: 'text-[#8B9E7C]', bg: 'bg-[#8B9E7C]/10' },
    limiting: { label: 'Limitante', color: 'text-[#DC143C]', bg: 'bg-[#DC143C]/10' },
    empowering: { label: 'Fortalecedor', color: 'text-[#DAA520]', bg: 'bg-[#DAA520]/10' },
  }

  const cat = categoryConfig[entry.category] || categoryConfig.automatic

  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-[#B8755C]/15 bg-white p-4 cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
        <span className="text-[10px] font-mono text-[#8C8580]">
          {new Date(entry.timestamp).toLocaleString('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className="text-sm text-[#1A1A1E] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
        &ldquo;{entry.thought}&rdquo;
      </p>
      {linkedFeeling && (
        <p className="mt-2 text-[10px] font-mono text-purple-600 bg-purple-600/5 px-1.5 py-0.5 rounded-sm inline-block">
          Sentimento: {linkedFeeling}
        </p>
      )}
      {entry.challengeResponse && (
        <div className="mt-2 rounded-md border border-[#8B9E7C]/20 bg-[#8B9E7C]/5 p-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B9E7C] mb-0.5">Desafio / Resposta</p>
          <p className="text-xs text-[#1A1A1E]">{entry.challengeResponse}</p>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────────────────────────────
   16. RoutineTimeline
   Vertical timeline of today's time blocks with current time indicator
   ─────────────────────────────────────────────── */
export function RoutineTimeline({
  blocks,
  wakeUpTime = '06:30',
  bedTime = '22:30',
  onBlockClick,
}: {
  blocks: TimeBlock[]
  wakeUpTime?: string
  bedTime?: string
  onBlockClick?: (block: TimeBlock) => void
}) {
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  }

  const wakeMin = timeToMinutes(wakeUpTime)
  const bedMin = timeToMinutes(bedTime)
  const totalMin = bedMin - wakeMin

  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()
  const currentPct = Math.max(0, Math.min(100, ((currentMin - wakeMin) / totalMin) * 100))
  const isWithinDay = currentMin >= wakeMin && currentMin <= bedMin

  const sortedBlocks = [...blocks].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))

  return (
    <div className="relative">
      {/* Time labels */}
      <div className="flex justify-between text-[10px] font-mono text-[#8C8580] mb-2">
        <span>{wakeUpTime}</span>
        <span>{bedTime}</span>
      </div>

      {/* Timeline track */}
      <div className="relative h-auto min-h-[300px] border-l-2 border-[#B8755C]/20 ml-3">
        {/* Current time indicator */}
        {isWithinDay && (
          <div
            className="absolute -left-[5px] z-10 flex items-center"
            style={{ top: `${currentPct}%` }}
          >
            <div className="h-2 w-2 rounded-full bg-[#DC143C] animate-pulse" />
            <div className="ml-1 h-[1px] w-full bg-[#DC143C]/40" />
          </div>
        )}

        {/* Blocks */}
        <div className="space-y-1 pl-5 py-2">
          {sortedBlocks.map((block) => {
            const blockStart = timeToMinutes(block.startTime)
            const isCurrent = isWithinDay && currentMin >= blockStart && currentMin < timeToMinutes(block.endTime)
            return (
              <div
                key={block.id}
                onClick={() => onBlockClick?.(block)}
                className={`rounded-md border p-2.5 cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-[#B8755C] bg-[#B8755C]/10 shadow-sm'
                    : 'border-[#B8755C]/10 hover:border-[#B8755C]/25'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full" style={{ backgroundColor: block.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1E] truncate">{block.label}</p>
                    <p className="text-[10px] font-mono text-[#8C8580]">{block.startTime} - {block.endTime}</p>
                  </div>
                  {isCurrent && (
                    <span className="h-2 w-2 rounded-full bg-[#B8755C] animate-pulse flex-shrink-0" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
