'use client'

import React from 'react'
import { type LucideIcon } from 'lucide-react'

// FlowingLines - SVG with organic bezier curves in copper and sage
export function FlowingLines({ className = '' }: { className?: string }) {
  return (
    <div className={`flowing-line ${className}`}>
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 200 C150 100, 350 300, 550 180 S850 100, 1050 250 S1250 150, 1400 200"
          stroke="#B8755C"
          strokeWidth="1.5"
          strokeOpacity="0.12"
          fill="none"
        />
        <path
          d="M-50 250 C200 350, 400 150, 600 280 S900 200, 1100 300 S1300 200, 1400 280"
          stroke="#8B9E7C"
          strokeWidth="1"
          strokeOpacity="0.10"
          fill="none"
        />
        <path
          d="M-50 150 C100 50, 300 200, 500 120 S700 50, 900 180 S1100 80, 1400 150"
          stroke="#B8755C"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          fill="none"
        />
        <circle cx="550" cy="180" r="3" fill="#B8755C" fillOpacity="0.15" />
        <circle cx="900" cy="180" r="2" fill="#8B9E7C" fillOpacity="0.15" />
        <circle cx="250" cy="260" r="2.5" fill="#B8755C" fillOpacity="0.10" />
      </svg>
    </div>
  )
}

// EditorialQuote - Italic Playfair Display blockquote with left copper border
export function EditorialQuote({ text, author }: { text: string; author?: string }) {
  return (
    <blockquote className="editorial-quote">
      <p>&ldquo;{text}&rdquo;</p>
      {author && (
        <footer className="mt-2 text-sm font-sans not-italic text-[#8C8580]">
          &mdash; {author}
        </footer>
      )}
    </blockquote>
  )
}

// IconBadge - 40px circle (copper bg, white icon)
export function IconBadge({
  icon: Icon,
  variant = 'copper',
  size = 'md',
}: {
  icon: LucideIcon
  variant?: 'copper' | 'sage'
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  const bgColor = variant === 'copper' ? 'bg-[#B8755C]' : 'bg-[#8B9E7C]'

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} flex items-center justify-center rounded-full flex-shrink-0`}
    >
      <Icon className={`${iconSizes[size]} text-white`} />
    </div>
  )
}

// SectionDivider - Thin horizontal line with small architectural grid marks
export function SectionDivider() {
  return <div className="section-divider" />
}

// LifeMapDiagram - The three-panel MAP | MANAGER | VISION diagram
export function LifeMapDiagram() {
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-[#B8755C]/15 bg-white p-6 lg:p-8">
      {/* Subtle background lines */}
      <div className="absolute inset-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <path
            d="M0 100 C200 60, 400 140, 600 80 S800 120, 1000 100"
            stroke="#B8755C"
            strokeWidth="0.5"
            strokeOpacity="0.15"
            fill="none"
          />
          <path
            d="M0 120 C150 160, 350 80, 550 140 S750 60, 1000 120"
            stroke="#8B9E7C"
            strokeWidth="0.5"
            strokeOpacity="0.12"
            fill="none"
          />
        </svg>
      </div>

      {/* Three panels */}
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* MAPA */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B8755C] bg-[#B8755C]/10">
            <svg className="h-8 w-8 text-[#B8755C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-[#1A1A1E]">MAPA</h3>
          <p className="text-xs font-mono uppercase tracking-widest text-[#8C8580] mb-3">Passado &middot; Presente &middot; Futuro</p>
          <p className="text-sm text-[#8C8580]">
            Registre sua historia de vida, relacoes familiares e eventos significativos
          </p>
        </div>

        {/* GESTOR */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#8B9E7C] bg-[#8B9E7C]/10">
            <svg className="h-8 w-8 text-[#8B9E7C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-[#1A1A1E]">GESTOR</h3>
          <p className="text-xs font-mono uppercase tracking-widest text-[#8C8580] mb-3">Time de Cuidado</p>
          <p className="text-sm text-[#8C8580]">
            Terapeuta, coach e equipe trabalhando juntos pelo seu desenvolvimento
          </p>
        </div>

        {/* VISAO */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B8755C] bg-[#B8755C]/10">
            <svg className="h-8 w-8 text-[#B8755C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-[#1A1A1E]">VISAO</h3>
          <p className="text-xs font-mono uppercase tracking-widest text-[#8C8580] mb-3">Proposito &middot; Metas &middot; OKRs</p>
          <p className="text-sm text-[#8C8580]">
            Defina seu proposito de vida e acompanhe seu progresso com clareza
          </p>
        </div>
      </div>

      {/* Connecting lines between panels (desktop) */}
      <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block pointer-events-none">
        <svg className="mx-auto" width="100%" height="2" viewBox="0 0 800 2">
          <line x1="200" y1="1" x2="350" y2="1" stroke="#B8755C" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
          <line x1="450" y1="1" x2="600" y2="1" stroke="#8B9E7C" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
        </svg>
      </div>
    </div>
  )
}
