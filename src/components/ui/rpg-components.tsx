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
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
