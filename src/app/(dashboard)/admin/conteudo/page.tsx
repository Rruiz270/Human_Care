'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Grid3X3, Maximize2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================
// SLIDE COMPONENTS - Visual HTML recreations of the PDF slides
// ============================================================

function SlideWrapper({ children, bg = 'bg-[#F5F0EB]', dark = false }: { children: React.ReactNode; bg?: string; dark?: boolean }) {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg border', bg, dark ? 'text-[#F5F0EB]' : 'text-[#1A1A1E]')} style={{ aspectRatio: '16/9' }}>
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#8C8580 1px, transparent 1px), linear-gradient(90deg, #8C8580 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      {/* Corner marks */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#8C8580]/20" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#8C8580]/20" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#8C8580]/20" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#8C8580]/20" />
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-10">
        {children}
      </div>
      {/* Compass watermark */}
      <div className="absolute bottom-4 right-4 opacity-10">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1"/>
          <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="18" y1="2" x2="18" y2="34" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="2" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="0.5"/>
          <polygon points="18,4 20,14 18,12 16,14" fill="currentColor"/>
        </svg>
      </div>
    </div>
  )
}

function SlideTag({ text }: { text: string }) {
  return <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C8580] mb-2">{text}</p>
}

function SlideNum({ n }: { n: string }) {
  return <p className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.15em] text-[#8C8580]/50">Arquitetura Humana - Slide {n}</p>
}

// ======= SLIDE 00: COVER =======
function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex h-full items-center">
        <div className="flex-1 flex items-center justify-center pr-8">
          {/* Chaos to order illustration */}
          <svg viewBox="0 0 400 200" className="w-full max-w-md opacity-80">
            {/* Tangled lines (chaos) */}
            <g stroke="#1A1A1E" strokeWidth="1.5" fill="none" opacity="0.7">
              <path d="M40,100 C60,40 80,160 100,80 C120,0 90,180 130,100 C150,20 110,170 160,90"/>
              <path d="M50,90 C70,150 90,30 110,110 C130,190 100,10 140,100"/>
              <path d="M30,110 C80,30 60,170 120,70 C140,30 110,160 150,100"/>
              <path d="M45,80 C65,160 95,40 115,120 C135,60 105,140 155,95"/>
            </g>
            {/* Copper accent lines */}
            <g stroke="#B8755C" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M60,95 C100,60 130,130 160,100"/>
              <path d="M55,105 C95,140 125,70 155,100"/>
            </g>
            {/* Transition to order - arrow */}
            <g stroke="#8B9E7C" strokeWidth="1.5" fill="none" opacity="0.6">
              <path d="M160,100 C200,100 240,100 380,100"/>
            </g>
            <polygon points="380,100 370,95 370,105" fill="#8B9E7C" opacity="0.6"/>
            {/* Sage green flowing lines */}
            <g stroke="#8B9E7C" strokeWidth="1" fill="none" opacity="0.3">
              <path d="M160,95 C200,90 240,95 380,97"/>
              <path d="M160,105 C200,110 240,105 380,103"/>
            </g>
          </svg>
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-serif italic leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            O Modelo <em className="text-[#B8755C]">Life Map</em>:
          </h1>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Desbloqueando o Potencial Humano
          </h2>
          <p className="text-sm text-[#8C8580] max-w-md leading-relaxed">
            Uma estrutura de cuidado integrado para navegar a disrupcao transformacional e converter consciencia em performance.
          </p>
        </div>
      </div>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs italic text-[#8C8580]" style={{ fontFamily: "'Playfair Display', serif" }}>
        O que te limita e o que esta te limitando.
      </p>
    </SlideWrapper>
  )
}

// ======= SLIDE 01: DISRUPCAO TRANSFORMACIONAL =======
function SlideDisrupcao() {
  return (
    <SlideWrapper>
      <div className="flex h-full gap-8">
        {/* Left: Building reflection visual */}
        <div className="w-2/5 relative">
          <div className="absolute inset-0 flex flex-col">
            {/* Building (top) */}
            <div className="flex-1 bg-gradient-to-b from-[#3D3D3D] to-[#6D6D6D] rounded-t-sm relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-px p-2 opacity-30">
                {Array.from({length: 24}).map((_, i) => (
                  <div key={i} className="bg-[#F5F0EB]/20 rounded-sm" />
                ))}
              </div>
              <p className="absolute bottom-2 left-2 text-[8px] text-[#F5F0EB]/40 uppercase tracking-widest">Reflexo Estrutural:</p>
              <p className="absolute bottom-2 right-2 text-[8px] text-[#F5F0EB]/40 uppercase">Instabilidade e Fragmentacao</p>
            </div>
            {/* Water line */}
            <div className="h-1 bg-[#8C8580]/30" />
            {/* Reflection (bottom - flipped, distorted) */}
            <div className="flex-1 bg-gradient-to-t from-[#3D3D3D]/40 to-[#6D6D6D]/60 rounded-b-sm relative overflow-hidden opacity-60" style={{ transform: 'scaleY(-1)' }}>
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-px p-2 opacity-20">
                {Array.from({length: 24}).map((_, i) => (
                  <div key={i} className="bg-[#F5F0EB]/20 rounded-sm" style={{ transform: `skewX(${(i % 3 - 1) * 3}deg)` }} />
                ))}
              </div>
            </div>
          </div>
          {/* Dimension lines */}
          <div className="absolute -top-2 left-0 right-0 flex items-center">
            <div className="flex-1 h-px bg-[#8C8580]/30" />
            <span className="px-2 text-[8px] text-[#8C8580]/50">200</span>
            <div className="flex-1 h-px bg-[#8C8580]/30" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">O Contexto: A Disrupcao Transformacional</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#B8755C" strokeWidth="1.5" fill="none"/><line x1="10" y1="4" x2="10" y2="10" stroke="#B8755C" strokeWidth="1.5"/><line x1="10" y1="10" x2="14" y2="10" stroke="#B8755C" strokeWidth="1.5"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm text-[#B8755C]">O Cenario</p>
                <p className="text-xs text-[#3D3D3D] leading-relaxed">O mundo exige uma velocidade de adaptacao gigantesca. Vivemos uma disrupcao coletiva onde as ferramentas tradicionais de desenvolvimento ja nao dao conta do ritmo atual.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="12" width="4" height="6" stroke="#B8755C" strokeWidth="1" fill="none"/><rect x="4" y="6" width="4" height="6" stroke="#B8755C" strokeWidth="1" fill="none" opacity="0.5"/><line x1="6" y1="4" x2="6" y2="2" stroke="#B8755C" strokeWidth="1" opacity="0.3"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm">O Colapso</p>
                <p className="text-xs text-[#3D3D3D] leading-relaxed">Organizacoes e sistemas estao falhando. Nao e apenas burnout; e um colapso estrutural das relacoes humanas.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" stroke="#8C8580" strokeWidth="1" fill="none"/><circle cx="10" cy="10" r="3" stroke="#8C8580" strokeWidth="1" fill="none"/><circle cx="10" cy="10" r="1" fill="#8C8580"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm">Os Sintomas Visiveis</p>
                <p className="text-xs text-[#3D3D3D] leading-relaxed">Fofoca de corredor e inseguranca. Reunioes improdutivas que drenam a vida. A exigencia de &apos;fazer mais&apos; esbarrando em bloqueios invisiveis.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="4" stroke="#B8755C" strokeWidth="1" fill="none"/><path d="M4,18 C4,13 16,13 16,18" stroke="#B8755C" strokeWidth="1" fill="none"/><circle cx="14" cy="5" r="2" stroke="#8B9E7C" strokeWidth="0.5" fill="none"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm text-[#B8755C]">A Realidade</p>
                <p className="text-xs text-[#3D3D3D] leading-relaxed">Profissionais querem entregar, mas operam com um sistema operacional interno defasado para a pressao atual.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideNum n="01" />
    </SlideWrapper>
  )
}

// ======= SLIDE 02: SABOTADOR INVISIVEL =======
function SlideSabotador() {
  return (
    <SlideWrapper>
      <div className="flex h-full gap-8">
        {/* Left: Coffee cup illustration */}
        <div className="w-2/5 relative flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-[250px]">
            {/* Coffee cup */}
            <g transform="translate(80, 20) rotate(-25, 70, 60)">
              <ellipse cx="70" cy="30" rx="55" ry="15" fill="#8C8580" opacity="0.3"/>
              <path d="M15,30 L25,120 L115,120 L125,30" fill="#A08070" stroke="#6D6D6D" strokeWidth="1.5"/>
              <ellipse cx="70" cy="30" rx="55" ry="15" fill="#6B4E3D" stroke="#6D6D6D" strokeWidth="1"/>
              {/* Handle */}
              <path d="M125,50 C155,50 155,100 125,100" fill="none" stroke="#6D6D6D" strokeWidth="2"/>
            </g>
            {/* Spilling coffee */}
            <path d="M120,80 C140,120 100,160 130,200 C110,220 80,240 100,270" fill="#3D2B1F" opacity="0.6" stroke="none"/>
            <path d="M130,90 C160,130 130,170 150,210 C140,230 120,250 130,280" fill="#3D2B1F" opacity="0.4" stroke="none"/>
            {/* Shadow/dark pool at bottom */}
            <ellipse cx="140" cy="280" rx="80" ry="15" fill="#1A1A1E" opacity="0.3"/>
            {/* Labels */}
            <text x="220" y="80" className="text-[8px] uppercase tracking-widest" fill="#8C8580" opacity="0.6">Peso do Passado</text>
            <text x="220" y="250" className="text-[8px] uppercase tracking-widest" fill="#8C8580" opacity="0.6">Sombra Invisivel</text>
            {/* Dimension arrows */}
            <line x1="200" y1="75" x2="200" y2="245" stroke="#8C8580" strokeWidth="0.5" opacity="0.3"/>
          </svg>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold leading-tight">
            O Sabotador Invisivel: Por que<br/>&lsquo;Todo Mundo Tem Trauma&rsquo;
          </h2>

          <div className="space-y-3">
            <div>
              <p className="font-bold text-sm">A Mecanica do Bloqueio:</p>
              <p className="text-xs text-[#3D3D3D] leading-relaxed">O problema nao e falta de habilidade tecnica, e a biografia emocional. Trauma e um mecanismo de economia de energia do cerebro — uma reacao automatica a um gatilho.</p>
            </div>
            <div>
              <p className="font-bold text-sm">A Metafora do Cafe:</p>
              <p className="text-xs text-[#3D3D3D] leading-relaxed">Derrubar cafe no computador e um problema pequeno. Mas se voce teve um pai que jogou cafe no seu rosto, a xicara e uma ameaca. O mesmo evento neutro no corporativo pode acionar uma resposta de &quot;luta ou fuga&quot; baseada em historias antigas.</p>
            </div>
            <div>
              <p className="font-bold text-sm">O Custo:</p>
              <p className="text-xs text-[#3D3D3D] leading-relaxed">Quando um gatilho e ativado, a capacidade cognitiva cai. O profissional reage ao passado, nao ao presente.</p>
            </div>
          </div>

          <div className="mt-2 rounded-md bg-[#B8755C]/10 border border-[#B8755C]/20 p-3">
            <p className="text-xs italic text-[#B8755C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Se voce continuar assumindo que esta tudo bem, vai continuar tudo mal. Sem ver o limite, a transformacao nao acontece.
            </p>
          </div>
        </div>
      </div>
      <SlideNum n="02" />
    </SlideWrapper>
  )
}

// ======= SLIDE 03: FILOSOFIA LIFE MAP =======
function SlideFilosofia() {
  return (
    <SlideWrapper>
      <SlideTag text="Architectural Humanism" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">
        A Filosofia Life Map: Compreender a Vida para Compreender a Pessoa
      </h2>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Central compass/circle diagram */}
          <svg viewBox="0 0 500 320" className="w-full max-w-2xl">
            {/* Outer ring */}
            <circle cx="250" cy="160" r="110" fill="none" stroke="#B8755C" strokeWidth="3" opacity="0.6"/>
            <circle cx="250" cy="160" r="95" fill="none" stroke="#8B9E7C" strokeWidth="2" opacity="0.4"/>
            <circle cx="250" cy="160" r="70" fill="none" stroke="#8C8580" strokeWidth="1" opacity="0.3"/>
            {/* Center - Individuo */}
            <circle cx="250" cy="160" r="35" fill="#F5F0EB" stroke="#1A1A1E" strokeWidth="1.5"/>
            <text x="250" y="164" textAnchor="middle" className="text-xs font-medium" fill="#1A1A1E">Individuo</text>
            {/* Compass rose in center */}
            <line x1="250" y1="130" x2="250" y2="190" stroke="#B8755C" strokeWidth="0.5" opacity="0.3"/>
            <line x1="220" y1="160" x2="280" y2="160" stroke="#B8755C" strokeWidth="0.5" opacity="0.3"/>
            {/* Decorative segments on outer ring */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(angle => (
              <line key={angle} x1={250 + 105 * Math.cos(angle * Math.PI / 180)} y1={160 + 105 * Math.sin(angle * Math.PI / 180)}
                x2={250 + 115 * Math.cos(angle * Math.PI / 180)} y2={160 + 115 * Math.sin(angle * Math.PI / 180)}
                stroke="#B8755C" strokeWidth="1" opacity="0.3"/>
            ))}

            {/* LEFT: MAP */}
            <g>
              <line x1="140" y1="160" x2="180" y2="160" stroke="#8C8580" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrowL)"/>
              {/* Compass icon */}
              <circle cx="60" cy="90" r="14" fill="none" stroke="#1A1A1E" strokeWidth="1"/>
              <line x1="60" y1="78" x2="60" y2="102" stroke="#1A1A1E" strokeWidth="0.5"/>
              <line x1="48" y1="90" x2="72" y2="90" stroke="#1A1A1E" strokeWidth="0.5"/>
              <text x="88" y="95" className="text-sm font-bold" fill="#1A1A1E">MAP</text>
              <text x="88" y="108" className="text-[10px]" fill="#8C8580">(A Navegacao)</text>
              {/* Items */}
              <circle cx="40" cy="140" r="6" fill="none" stroke="#8C8580" strokeWidth="1"/>
              <text x="52" y="144" className="text-[10px]" fill="#1A1A1E">Inventario do Passado</text>
              <text x="52" y="178" className="text-[10px]" fill="#1A1A1E">Direcao do Futuro</text>
              <polygon points="40,172 45,178 35,178" fill="#B8755C" opacity="0.6"/>
              <text x="52" y="212" className="text-[10px]" fill="#1A1A1E">Consciencia</text>
              <circle cx="40" cy="208" r="6" fill="none" stroke="#8B9E7C" strokeWidth="1"/>
            </g>

            {/* RIGHT: MANAGER */}
            <g>
              <line x1="320" y1="160" x2="360" y2="160" stroke="#8C8580" strokeWidth="1" strokeDasharray="4 2"/>
              {/* Gear icon */}
              <circle cx="440" cy="90" r="12" fill="none" stroke="#1A1A1E" strokeWidth="1.5"/>
              <circle cx="440" cy="90" r="5" fill="none" stroke="#1A1A1E" strokeWidth="1"/>
              <text x="390" y="95" className="text-sm font-bold" textAnchor="end" fill="#1A1A1E">MANAGER</text>
              <text x="390" y="108" className="text-[10px]" textAnchor="end" fill="#8C8580">(A Gestao)</text>
              {/* Items */}
              <text x="380" y="144" className="text-[10px]" textAnchor="end" fill="#1A1A1E">Orquestracao do Presente</text>
              <text x="380" y="178" className="text-[10px]" textAnchor="end" fill="#1A1A1E">Rotina</text>
              <text x="380" y="212" className="text-[10px]" textAnchor="end" fill="#1A1A1E">Intencionalidade</text>
            </g>

            {/* Arrows pointing inward */}
            <defs>
              <marker id="arrowL" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0,0 6,2 0,4" fill="#8C8580"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* Bottom quote */}
      <div className="mt-auto border-t border-[#8C8580]/20 pt-3 text-center">
        <p className="text-xs italic text-[#8C8580]" style={{ fontFamily: "'Playfair Display', serif" }}>
          O presente e uma fabrica de passado. O modo como vivemos hoje e o material que formara a historia de amanha.
        </p>
      </div>
    </SlideWrapper>
  )
}

// ======= SLIDE 04: COMPONENTE MAP - FOG OF WAR =======
function SlideMapFog() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4">O Componente &lsquo;Map&rsquo;: Navegando a Nevoa de Guerra</h2>

      <div className="flex-1 relative">
        <svg viewBox="0 0 800 300" className="w-full h-full">
          {/* Fog/cloud background */}
          <defs>
            <radialGradient id="fog1" cx="50%" cy="50%"><stop offset="0%" stopColor="#8C8580" stopOpacity="0.2"/><stop offset="100%" stopColor="#8C8580" stopOpacity="0"/></radialGradient>
            <radialGradient id="fog2" cx="50%" cy="50%"><stop offset="0%" stopColor="#B8755C" stopOpacity="0.1"/><stop offset="100%" stopColor="#B8755C" stopOpacity="0"/></radialGradient>
          </defs>
          <ellipse cx="400" cy="130" rx="250" ry="100" fill="url(#fog1)"/>
          <ellipse cx="350" cy="110" rx="180" ry="80" fill="url(#fog2)"/>

          {/* Mountains */}
          <g opacity="0.3" fill="none" stroke="#1A1A1E" strokeWidth="1">
            <path d="M250,250 L320,100 L350,130 L400,60 L450,120 L490,80 L550,250"/>
            <path d="M350,250 L400,150 L430,180 L470,110 L520,170 L560,130 L620,250"/>
          </g>

          {/* Trees */}
          <g opacity="0.2" fill="#8B9E7C">
            <path d="M200,250 L210,210 L195,215 L207,185 L193,190 L205,160 L215,160 L207,190 L220,185 L210,215 L225,210 L215,250"/>
            <path d="M230,250 L240,220 L228,223 L238,200 L228,203 L236,180 L244,180 L240,203 L250,200 L242,223 L252,220 L244,250"/>
          </g>

          {/* Path: winding road from left to right */}
          <path d="M60,200 C120,200 150,140 250,150 C350,160 300,220 400,180 C500,140 450,100 550,120 C650,140 680,160 740,160" fill="none" stroke="#B8755C" strokeWidth="3" opacity="0.7"/>
          <path d="M60,200 C120,200 150,140 250,150 C350,160 300,220 400,180 C500,140 450,100 550,120 C650,140 680,160 740,160" fill="none" stroke="#8B9E7C" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4"/>

          {/* Ponto Zero */}
          <circle cx="60" cy="200" r="10" fill="#1A1A1E"/>
          <circle cx="60" cy="200" r="14" fill="none" stroke="#1A1A1E" strokeWidth="1" opacity="0.5"/>
          <text x="60" y="235" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A1E">Ponto Zero</text>
          <text x="60" y="247" textAnchor="middle" className="text-[8px]" fill="#8C8580">(Origem)</text>

          {/* Ponto A */}
          <circle cx="250" cy="150" r="12" fill="#1A1A1E" stroke="#F5F0EB" strokeWidth="2"/>
          <g transform="translate(235, 138)">
            <circle cx="15" cy="12" r="8" fill="none" stroke="#F5F0EB" strokeWidth="1"/>
          </g>
          <text x="250" y="185" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A1E">Ponto A</text>
          <text x="250" y="197" textAnchor="middle" className="text-[8px]" fill="#8C8580">(Presente / Inventario)</text>

          {/* Ponto B */}
          <circle cx="740" cy="160" r="14" fill="none" stroke="#1A1A1E" strokeWidth="2" strokeDasharray="4 2"/>
          <circle cx="740" cy="160" r="6" fill="none" stroke="#1A1A1E" strokeWidth="1"/>
          <text x="740" y="195" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A1E">Ponto B</text>
          <text x="740" y="207" textAnchor="middle" className="text-[8px]" fill="#8C8580">(Futuro / Proposito Movel)</text>

          {/* Compass icon at Ponto B */}
          <g transform="translate(720, 125)">
            <circle cx="15" cy="15" r="12" fill="none" stroke="#8C8580" strokeWidth="1"/>
            <polygon points="15,5 17,13 15,11 13,13" fill="#8C8580"/>
          </g>
        </svg>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-xs text-[#3D3D3D]"><strong>A Jornada:</strong> Entre A e B existe o desconhecido. Como em um RPG, descobrimos o mapa andando. Se o caminho pela floresta esta bloqueado, precisamos voltar e equipar itens de montanha.</p>
        <p className="text-xs text-[#3D3D3D]"><strong>Objetivo:</strong> Transformar uma vida reativa em uma vida intencional.</p>
      </div>
      <SlideNum n="04" />
    </SlideWrapper>
  )
}

// ======= SLIDE 05: MANAGER - RESOURCE MENU =======
function SlideManager() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6">O Componente &lsquo;Manager&rsquo;: O Menu de Recursos do Presente</h2>

      <div className="flex h-full gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <p className="font-bold text-sm">O Hardware:</p>
            <p className="text-xs text-[#3D3D3D]">&quot;Sem corpo, nao tem mente.&quot; A consciencia depende da fisiologia.</p>
          </div>
          <div>
            <p className="font-bold text-sm">Gestao de Necessidades:</p>
            <p className="text-xs text-[#3D3D3D]">Sono, lazer, alimentacao, conexoes. Nao sao luxos, sao requisitos operacionais.</p>
          </div>
          <div>
            <p className="font-bold text-sm">Gestao da Rotina:</p>
            <p className="text-xs text-[#3D3D3D]">A distribuicao inteligente do tempo para atender as necessidades e mover-se do Ponto A ao B.</p>
          </div>
          <div>
            <p className="font-bold text-sm">O Painel de Controle:</p>
            <p className="text-xs text-[#3D3D3D]">O Manager e quem olha para a barra de energia e decide se e possivel entrar na proxima batalha ou se e preciso descansar.</p>
          </div>
        </div>

        {/* Right: Game UI bars */}
        <div className="w-2/5 flex flex-col justify-center space-y-6">
          {/* Health/Energy bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="none" stroke="#B8755C" strokeWidth="1.5"/><path d="M5,7 L7,5 L9,7" fill="none" stroke="#B8755C" strokeWidth="1"/></svg>
                <span className="text-[10px] font-medium">Health/Energy</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8,3 L9.5,6 L13,6.5 L10.5,9 L11,12.5 L8,11 L5,12.5 L5.5,9 L3,6.5 L6.5,6 Z" fill="#B8755C" opacity="0.5"/></svg>
            </div>
            <div className="h-6 w-full rounded-sm border border-[#8C8580]/30 bg-[#8C8580]/10 overflow-hidden">
              <div className="h-full rounded-sm" style={{ width: '70%', background: 'linear-gradient(90deg, #B8755C 0%, #C4956A 100%)' }} />
            </div>
            <p className="text-right text-[10px] font-mono text-[#8C8580]">ENERGIA</p>
          </div>

          {/* XP bar */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="none" stroke="#8B9E7C" strokeWidth="1.5"/><circle cx="7" cy="7" r="2" fill="#8B9E7C" opacity="0.5"/></svg>
              <span className="text-[10px] font-medium">XP/Experience</span>
            </div>
            <div className="h-6 w-full rounded-sm border border-[#8C8580]/30 bg-[#8C8580]/10 overflow-hidden">
              <div className="h-full rounded-sm" style={{ width: '55%', background: 'linear-gradient(90deg, #8B9E7C 0%, #A8B89A 100%)' }} />
            </div>
            <p className="text-right text-[10px] font-mono text-[#8C8580]">EXPERIENCIA</p>
          </div>

          {/* Inventory icons */}
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-[#8C8580] uppercase tracking-widest">Inventario</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'SONO', icon: 'M4,14 L4,6 C4,4 8,4 8,6 L8,14' },
                { label: 'NUTRICAO', icon: 'M8,3 C8,3 12,5 10,8 C9,10 7,10 6,8 C4,5 8,3 8,3' },
                { label: 'ROTINA', icon: 'M3,3 L13,3 L13,13 L3,13 Z M3,6 L13,6 M7,3 L7,6' },
                { label: 'CONEXOES', icon: 'M8,3 C6,3 4,5 4,7 C4,10 8,13 8,13 C8,13 12,10 12,7 C12,5 10,3 8,3' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#8C8580]/30 bg-[#F5F0EB]">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d={item.icon} fill="none" stroke="#8C8580" strokeWidth="1.2"/></svg>
                  </div>
                  <span className="text-[7px] font-mono text-[#8C8580]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SlideNum n="05" />
    </SlideWrapper>
  )
}

// ======= SLIDE 06: EQUACAO TEMPO X ENERGIA =======
function SlideEquacao() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-8">A Fisica da Performance: A Equacao Tempo x Energia</h2>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Big equation */}
        <div className="flex items-center gap-3 sm:gap-6 mb-8">
          <div className="border-2 border-[#B8755C] rounded-sm px-4 py-3 text-center">
            <p className="text-lg sm:text-2xl font-serif font-bold">Tempo</p>
            <p className="text-lg sm:text-2xl font-serif font-bold">Disponivel</p>
            <p className="text-xs text-[#8C8580]">(24h)</p>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#B8755C]">+</span>
          <div className="border-2 border-[#8B9E7C] rounded-sm px-4 py-3 text-center">
            <p className="text-lg sm:text-2xl font-serif font-bold">Energia de</p>
            <p className="text-lg sm:text-2xl font-serif font-bold">Qualidade</p>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#1A1A1E]">=</span>
          <div className="border-2 border-[#1A1A1E] rounded-sm px-4 py-3 text-center">
            <p className="text-lg sm:text-2xl font-serif font-bold">Presenca &amp;</p>
            <p className="text-lg sm:text-2xl font-serif font-bold">Resultado</p>
          </div>
        </div>

        {/* Three boxes */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="border border-[#8C8580]/30 rounded-sm p-3 bg-[#8C8580]/5">
            <p className="font-bold text-xs mb-1">A Moeda Universal:</p>
            <p className="text-[10px] text-[#3D3D3D] leading-relaxed">O Tempo e a unica coisa que todos tem em comum. E a estrutura da experiencia.</p>
          </div>
          <div className="border border-[#B8755C]/30 rounded-sm p-3 bg-[#B8755C]/5">
            <p className="font-bold text-xs mb-1">A Variavel de Qualidade:</p>
            <p className="text-[10px] text-[#3D3D3D] leading-relaxed">Energia. Tempo sem energia e tempo perdido. &ldquo;O gold vira latao.&rdquo; Emocoes negativas e traumas drenam a bateria.</p>
          </div>
          <div className="border border-[#8B9E7C]/30 rounded-sm p-3 bg-[#8B9E7C]/5">
            <p className="font-bold text-xs mb-1">A Recuperacao:</p>
            <p className="text-[10px] text-[#3D3D3D] leading-relaxed">A energia sutil (mental/emocional) so e recuperada atraves do sono de qualidade.</p>
          </div>
        </div>
      </div>

      <p className="text-xs italic text-[#8C8580] text-center mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Saude mental e, na pratica, a gestao eficiente da relacao tempo-energia-vida.
      </p>
      <SlideNum n="06" />
    </SlideWrapper>
  )
}

// ======= SLIDE 07: FISIOLOGIA DO DESPERDICIO =======
function SlideFisiologia() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">A Fisiologia do Desperdicio: Como a emocao drena o cognitivo</h2>

      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Brain diagram */}
        <div className="relative w-2/5 flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-[250px]">
            {/* Brain outline */}
            <path d="M150,40 C200,40 250,70 260,120 C270,170 240,220 200,240 C180,250 160,250 150,245 C140,250 120,250 100,240 C60,220 30,170 40,120 C50,70 100,40 150,40" fill="#E8E0D8" stroke="#8C8580" strokeWidth="1.5"/>
            {/* Brain folds */}
            <path d="M100,80 C120,90 140,75 160,85 C180,95 200,80 220,90" fill="none" stroke="#8C8580" strokeWidth="1" opacity="0.4"/>
            <path d="M80,120 C110,110 130,125 150,115 C170,125 190,110 220,120" fill="none" stroke="#8C8580" strokeWidth="1" opacity="0.4"/>
            <path d="M90,160 C120,150 140,165 160,155 C180,165 200,150 230,160" fill="none" stroke="#8C8580" strokeWidth="1" opacity="0.4"/>
            {/* Amygdala - highlighted */}
            <ellipse cx="150" cy="200" rx="30" ry="20" fill="#B8755C" opacity="0.5" stroke="#B8755C" strokeWidth="1.5"/>
            <text x="150" y="204" textAnchor="middle" className="text-[9px] font-medium" fill="#1A1A1E">Amygdala</text>
            {/* Shutdown zone (dimmed prefrontal cortex) */}
            <path d="M120,50 C140,45 160,45 180,50 C200,55 220,70 230,90 L200,90 C190,75 170,65 150,65 C130,65 110,75 100,90 L70,90 C80,70 100,55 120,50" fill="#3D3D3D" opacity="0.15"/>
            <text x="200" y="65" className="text-[8px]" fill="#3D3D3D">Shutdown/Dimmed</text>
            {/* Arrow from amygdala down */}
            <path d="M150,220 L150,280" stroke="#B8755C" strokeWidth="2" markerEnd="url(#arrowDown)"/>
            <text x="100" y="250" className="text-[8px] font-medium" fill="#B8755C">Cortisol /</text>
            <text x="100" y="260" className="text-[8px] font-medium" fill="#B8755C">Fight or Flight</text>
            <defs>
              <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="6" orient="auto">
                <polygon points="0,0 8,0 4,6" fill="#B8755C"/>
              </marker>
            </defs>
          </svg>
        </div>

        {/* Right: descriptions */}
        <div className="flex-1 space-y-5">
          <div>
            <p className="font-bold text-sm text-[#B8755C]">1. O Mecanismo</p>
            <p className="text-xs text-[#3D3D3D] leading-relaxed">Quando acionados emocionalmente, o corpo entra em modo de sobrevivencia. O processamento cognitivo e reduzido.</p>
          </div>
          <div>
            <p className="font-bold text-sm">2. O Custo</p>
            <p className="text-xs text-[#3D3D3D] leading-relaxed">Emocoes intensas drenam a energia qualitativa (recuperavel apenas com sono REM).</p>
          </div>
          <div>
            <p className="font-bold text-sm">3. O Ciclo Vicioso</p>
            <p className="text-xs text-[#3D3D3D] leading-relaxed">O cerebro cria mecanismos de defesa (ironia, silencio, ataque) para economizar energia, mantendo a pessoa presa no trauma.</p>
          </div>
        </div>
      </div>
      <SlideNum n="07" />
    </SlideWrapper>
  )
}

// ======= SLIDE 08: CORRENTE (CHAIN) =======
function SlideCorrente() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-4">O Impacto Coletivo: A Metafora da Corrente</h2>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 800 200" className="w-full max-w-3xl">
          {/* Chain links */}
          {[0,1,2,3,4].map(i => {
            const x = 80 + i * 160
            const isBreaking = i === 2
            return (
              <g key={i}>
                {/* Link shape - rounded rectangle */}
                <rect x={x - 50} y={50} width={100} height={100} rx="30" ry="30"
                  fill={isBreaking ? '#B8755C' : '#8C8580'} opacity={isBreaking ? 0.3 : 0.15}
                  stroke={isBreaking ? '#B8755C' : '#6D6D6D'} strokeWidth={isBreaking ? 2 : 1.5}/>
                {/* Inner hole */}
                <rect x={x - 25} y={70} width={50} height={60} rx="15" ry="15"
                  fill="#F5F0EB" stroke={isBreaking ? '#B8755C' : '#6D6D6D'} strokeWidth={1}/>
                {/* Cracks on breaking link */}
                {isBreaking && (
                  <g stroke="#B8755C" strokeWidth="1.5" opacity="0.7">
                    <line x1={x} y1={50} x2={x-5} y2={35}/>
                    <line x1={x} y1={50} x2={x+8} y2={38}/>
                    <line x1={x} y1={150} x2={x-5} y2={165}/>
                    <line x1={x} y1={150} x2={x+8} y2={162}/>
                    <line x1={x-50} y1={100} x2={x-60} y2={95}/>
                    <line x1={x+50} y1={100} x2={x+60} y2={95}/>
                  </g>
                )}
              </g>
            )
          })}
          {/* Connecting bars between links */}
          {[0,1,3].map(i => {
            const x1 = 80 + i * 160 + 50
            const x2 = 80 + (i+1) * 160 - 50
            return (
              <g key={`bar-${i}`}>
                <rect x={x1} y={80} width={x2-x1} height={15} rx="4" fill="#6D6D6D" opacity="0.2"/>
                <rect x={x1} y={105} width={x2-x1} height={15} rx="4" fill="#6D6D6D" opacity="0.2"/>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="space-y-3 mt-2">
        <p className="text-xs"><strong>A Regra:</strong> &ldquo;A forca de uma corrente e definida pela forca do seu elo mais fraco.&rdquo;</p>
        <p className="text-xs"><strong>O Custo Oculto:</strong> Se um individuo falha por questoes emocionais nao tratadas (o elo fraco), o coletivo paga a conta.</p>
        <p className="text-xs"><strong>Interdependencia:</strong> Uma organizacao e um centro de relacoes humanas. &ldquo;Quanto mais voce performar, mais eu performo.&rdquo;</p>
      </div>
      <SlideNum n="08" />
    </SlideWrapper>
  )
}

// ======= SLIDE 09: ESTRUTURA CUIDADO INTEGRADO (DOME) =======
function SlideCuidadoIntegrado() {
  return (
    <SlideWrapper>
      <SlideTag text="Editorial New" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-4">A Estrutura de Cuidado Integrado</h2>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 600 350" className="w-full max-w-xl">
          {/* Base - Time de Cuidado */}
          <rect x="100" y="260" width="400" height="50" rx="4" fill="#E8E0D8" stroke="#8C8580" strokeWidth="1.5"/>
          <text x="300" y="282" textAnchor="middle" className="text-xs font-bold" fill="#1A1A1E">1. Time de Cuidado</text>
          <text x="300" y="298" textAnchor="middle" className="text-[9px]" fill="#8C8580">(Camada Horizontal / Continuidade)</text>

          {/* Dome - Conselho Multidisciplinar */}
          <path d="M120,260 C120,120 480,120 480,260" fill="#8B9E7C" opacity="0.15" stroke="#8B9E7C" strokeWidth="1.5"/>
          <text x="300" y="170" textAnchor="middle" className="text-xs font-bold" fill="#1A1A1E">3. Conselho Multidisciplinar</text>
          <text x="300" y="185" textAnchor="middle" className="text-[9px]" fill="#8C8580">(A Visao do Todo)</text>

          {/* Middle - Especialistas label */}
          <text x="300" y="215" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A1E">2. Especialistas</text>

          {/* Left arrow - Terapia (down) */}
          <g transform="translate(200, 200)">
            <path d="M30,0 L30,45 L0,45 L40,70 L80,45 L50,45 L50,0 Z" fill="#B8755C" opacity="0.5" stroke="#B8755C" strokeWidth="1"/>
          </g>
          <text x="140" y="235" className="text-[9px]" fill="#8C8580">(Terapia/Cura)</text>

          {/* Right arrow - Coaching (up) */}
          <g transform="translate(340, 200)">
            <path d="M40,70 L40,25 L10,25 L40,0 L70,25 L40,25 L40,70 Z" fill="#8B9E7C" opacity="0.5" stroke="#8B9E7C" strokeWidth="1"/>
          </g>
          <text x="420" y="235" className="text-[9px]" fill="#8C8580">(Coaching/Expansao)</text>

          {/* Side labels */}
          <text x="60" y="215" textAnchor="middle" className="text-[9px] font-bold" fill="#1A1A1E">2. Especialistas</text>
          <text x="540" y="215" textAnchor="middle" className="text-[9px] font-bold" fill="#1A1A1E">2. Especialistas</text>
          {/* Brackets */}
          <path d="M80,195 C70,195 70,235 80,235" fill="none" stroke="#8C8580" strokeWidth="1"/>
          <path d="M520,195 C530,195 530,235 520,235" fill="none" stroke="#8C8580" strokeWidth="1"/>
        </svg>
      </div>

      <p className="text-xs text-center text-[#3D3D3D] mt-2">
        Um <strong>sistema</strong> desenhado para sustentar a transformacao com seguranca e visao ampla. Nao e apenas suporte, e estrategia de performance. Garante que o individuo nunca esteja <strong>a deriva</strong>.
      </p>
      <SlideNum n="08" />
    </SlideWrapper>
  )
}

// ======= SLIDE 10: TIME DE CUIDADO (HORIZONTAL) =======
function SlideTimeCuidado() {
  return (
    <SlideWrapper>
      <SlideTag text="Editorial New" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">1. O Time de Cuidado: A Camada Horizontal</h2>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 700 200" className="w-full max-w-2xl">
          {/* HERO line (top - copper) */}
          <text x="30" y="55" className="text-xs font-bold" fill="#B8755C">HERO</text>
          <line x1="80" y1="50" x2="650" y2="50" stroke="#B8755C" strokeWidth="2" opacity="0.3"/>
          <polygon points="650,50 640,45 640,55" fill="#B8755C" opacity="0.3"/>
          {/* Hero dots */}
          {[160, 280, 400, 520].map(x => (
            <circle key={`h-${x}`} cx={x} cy={50} r="8" fill="#B8755C" opacity="0.6"/>
          ))}

          {/* GUIDE line (bottom - sage) */}
          <text x="30" y="135" className="text-xs font-bold" fill="#8B9E7C">GUIDE</text>
          <line x1="80" y1="130" x2="650" y2="130" stroke="#8B9E7C" strokeWidth="2" opacity="0.3"/>
          <polygon points="650,130 640,125 640,135" fill="#8B9E7C" opacity="0.3"/>
          {/* Guide dots */}
          {[200, 320, 440, 560].map(x => (
            <circle key={`g-${x}`} cx={x} cy={130} r="8" fill="#8B9E7C" opacity="0.6"/>
          ))}

          {/* Connecting dotted lines between hero and guide */}
          {[180, 300, 420, 540].map(x => (
            <line key={`c-${x}`} x1={x} y1={55} x2={x} y2={125} stroke="#8C8580" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4"/>
          ))}

          {/* Timeline bar at bottom */}
          <rect x="80" y="155" width="570" height="8" rx="2" fill="#8C8580" opacity="0.1" stroke="#8C8580" strokeWidth="0.5"/>
          {[120, 180, 240, 300, 360, 420, 480, 540, 600].map(x => (
            <circle key={`t-${x}`} cx={x} cy={159} r="2" fill="#8C8580" opacity="0.3"/>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <p className="font-bold text-xs">Funcao:</p>
          <p className="text-[10px] text-[#3D3D3D]">Acompanhamento continuo (Walk-alongside).</p>
        </div>
        <div>
          <p className="font-bold text-xs">O Papel:</p>
          <p className="text-[10px] text-[#3D3D3D]">Integra as frentes, prepara o terreno para os especialistas e mantem o &ldquo;Life Map&rdquo; atualizado.</p>
        </div>
        <div>
          <p className="font-bold text-xs">O Registro:</p>
          <p className="text-[10px] text-[#3D3D3D]">E quem guarda a historia e garante que o contexto nao se perca.</p>
        </div>
      </div>
      <SlideNum n="09" />
    </SlideWrapper>
  )
}

// ======= SLIDE 11: VERTICAIS SIMBIOTICAS =======
function SlideVerticais() {
  return (
    <SlideWrapper>
      <SlideTag text="Editorial New" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">2. As Verticais Simbioticas: &lsquo;As Duas Maos&rsquo;</h2>

      <div className="flex-1 flex items-center justify-center gap-12">
        {/* Terapia - Down Arrow */}
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 120 160" className="w-28 h-36">
            <path d="M60,0 L60,100 L20,100 L60,155 L100,100 L60,100" fill="#B8755C" opacity="0.5" stroke="#B8755C" strokeWidth="1.5"/>
            {/* Inner arrow pattern */}
            <path d="M60,20 L60,80 L35,80 L60,120 L85,80 L60,80" fill="none" stroke="#B8755C" strokeWidth="0.5" opacity="0.3"/>
            <path d="M60,35 L60,65 L45,65 L60,95 L75,65 L60,65" fill="none" stroke="#B8755C" strokeWidth="0.5" opacity="0.2"/>
          </svg>
          <div className="text-center">
            <p className="font-bold text-base">Terapia</p>
            <p className="text-sm text-[#8C8580]">(Para Dentro)</p>
            <p className="text-xs text-[#3D3D3D] mt-1">Foco em emocoes,<br/>passado, traumas e cura.</p>
          </div>
        </div>

        {/* Coaching - Up Arrow */}
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 120 160" className="w-28 h-36">
            <path d="M60,160 L60,60 L20,60 L60,5 L100,60 L60,60" fill="#8B9E7C" opacity="0.5" stroke="#8B9E7C" strokeWidth="1.5"/>
            {/* Inner arrow pattern */}
            <path d="M60,140 L60,80 L35,80 L60,40 L85,80 L60,80" fill="none" stroke="#8B9E7C" strokeWidth="0.5" opacity="0.3"/>
            <path d="M60,125 L60,95 L45,95 L60,65 L75,95 L60,95" fill="none" stroke="#8B9E7C" strokeWidth="0.5" opacity="0.2"/>
          </svg>
          <div className="text-center">
            <p className="font-bold text-base">Coaching</p>
            <p className="text-sm text-[#8C8580]">(Para Fora)</p>
            <p className="text-xs text-[#3D3D3D] mt-1">Foco em visao, futuro,<br/>acao e novas habilidades.</p>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-[#8C8580]/20 pt-3">
        <p className="text-xs text-center text-[#3D3D3D]">
          <strong>A Simbiose:</strong> &ldquo;Nao se cozinha com uma mao e limpa com a outra. Usa-se as duas para tudo.&rdquo; O bloqueio que impede a visao de futuro geralmente esta enraizado no passado.
        </p>
      </div>
      <SlideNum n="10" />
    </SlideWrapper>
  )
}

// ======= SLIDE 12: CONSELHO MULTIDISCIPLINAR =======
function SlideConselho() {
  return (
    <SlideWrapper>
      <SlideTag text="Editorial New" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-4">3. O Conselho Multidisciplinar: A Visao do Todo</h2>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 500 300" className="w-full max-w-lg">
          {/* Orbital rings */}
          <ellipse cx="250" cy="150" rx="180" ry="80" fill="none" stroke="#8C8580" strokeWidth="0.5" opacity="0.3" transform="rotate(-15, 250, 150)"/>
          <ellipse cx="250" cy="150" rx="150" ry="60" fill="none" stroke="#8C8580" strokeWidth="0.5" opacity="0.3" transform="rotate(20, 250, 150)"/>
          <ellipse cx="250" cy="150" rx="120" ry="50" fill="none" stroke="#8C8580" strokeWidth="0.5" opacity="0.3" transform="rotate(-5, 250, 150)"/>

          {/* Center: O Humano */}
          <circle cx="250" cy="150" r="30" fill="#3D3D3D"/>
          <text x="250" y="147" textAnchor="middle" className="text-[10px] font-bold" fill="#F5F0EB">O Humano</text>

          {/* Orbiting spheres */}
          <circle cx="160" cy="110" r="18" fill="#B8755C" opacity="0.7"/>
          <text x="160" y="114" textAnchor="middle" className="text-[8px] font-bold" fill="#F5F0EB">Financeiro</text>

          <circle cx="340" cy="90" r="16" fill="#8B9E7C" opacity="0.7"/>
          <text x="340" y="94" textAnchor="middle" className="text-[8px] font-bold" fill="#F5F0EB">Lideranca</text>

          <circle cx="330" cy="210" r="20" fill="#6D6D6D" opacity="0.7"/>
          <text x="330" y="214" textAnchor="middle" className="text-[8px] font-bold" fill="#F5F0EB">Emocional</text>

          <circle cx="180" cy="200" r="12" fill="#8B9E7C" opacity="0.5"/>
          <circle cx="280" cy="70" r="10" fill="#8C8580" opacity="0.5"/>

          {/* Zoom Out label */}
          <text x="400" y="130" className="text-[9px] italic" fill="#8C8580">Zoom Out</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <div>
          <p className="font-bold text-xs">O Principio:</p>
          <p className="text-[10px] text-[#3D3D3D]">&ldquo;Nunca deixar que uma parte cuide do todo; o todo cuida da parte.&rdquo;</p>
        </div>
        <div>
          <p className="font-bold text-xs">A Funcao:</p>
          <p className="text-[10px] text-[#3D3D3D]">Um grupo que se responsabiliza pelo ser humano integral, nao apenas por uma disciplina isolada.</p>
        </div>
        <div>
          <p className="font-bold text-xs">Estrategia:</p>
          <p className="text-[10px] text-[#3D3D3D]">Define rotas alternativas quando o progresso trava. Evita reducionismo e garante a integridade do processo evolutivo.</p>
        </div>
      </div>
      <SlideNum n="11" />
    </SlideWrapper>
  )
}

// ======= SLIDE 13: ECOSSISTEMA LIFE MAP =======
function SlideEcossistema() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">O Ecossistema Life Map: Integracao Total</h2>

      {/* Legend */}
      <div className="flex gap-4 mb-2 text-[9px]">
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 bg-[#B8755C] rounded-full"/> Terapeuta (Vertical Down)</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 bg-[#8C8580] rounded-full"/> Care Team (Horizontal)</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 bg-[#8B9E7C] rounded-full"/> Coaching (Vertical Up)</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 800 320" className="w-full">
          {/* Timeline (left) */}
          <line x1="30" y1="160" x2="220" y2="160" stroke="#B8755C" strokeWidth="3" opacity="0.6"/>
          {['Birth', 'Childhood', 'Achievements', 'Trauma/Losses'].map((label, i) => (
            <g key={label}>
              <circle cx={50 + i * 55} cy={160} r={5} fill="#B8755C" opacity="0.6" stroke="#F5F0EB" strokeWidth="1.5"/>
              <text x={50 + i * 55} y={180} textAnchor="middle" className="text-[7px]" fill="#8C8580">{label}</text>
            </g>
          ))}
          <text x="120" y="140" textAnchor="middle" className="text-[9px] font-bold" fill="#1A1A1E">Timeline</text>

          {/* Central diamond / pentagon - Self */}
          <polygon points="350,60 450,120 430,220 270,220 250,120" fill="none" stroke="#1A1A1E" strokeWidth="1.5"/>
          {/* Inner circle - Awareness */}
          <circle cx="350" cy="145" r="50" fill="none" stroke="#8C8580" strokeWidth="1"/>
          {/* Inner triangle - Body/Mind/Self */}
          <polygon points="350,110 320,165 380,165" fill="none" stroke="#8B9E7C" strokeWidth="1"/>
          <text x="350" y="150" textAnchor="middle" className="text-[8px] font-bold" fill="#1A1A1E">Self</text>
          <text x="330" y="142" textAnchor="middle" className="text-[6px]" fill="#8C8580">Body</text>
          <text x="370" y="142" textAnchor="middle" className="text-[6px]" fill="#8C8580">Mind</text>
          <text x="350" y="115" textAnchor="middle" className="text-[7px] font-medium" fill="#1A1A1E">Awareness</text>
          <text x="350" y="78" textAnchor="middle" className="text-[7px]" fill="#1A1A1E">Relationships</text>
          <text x="290" y="200" className="text-[7px]" fill="#1A1A1E">Environment</text>
          <text x="310" y="240" className="text-[7px]" fill="#1A1A1E">Needs</text>
          <text x="340" y="255" className="text-[7px]" fill="#1A1A1E">Routine</text>

          {/* Purpose (right) */}
          <circle cx="700" cy="160" r="12" fill="#B8755C" stroke="#1A1A1E" strokeWidth="2"/>
          <text x="700" y="164" textAnchor="middle" className="text-[7px] font-bold" fill="#F5F0EB">P</text>
          <text x="700" y="185" textAnchor="middle" className="text-[9px] font-bold" fill="#1A1A1E">Purpose</text>

          {/* Connection lines from center to purpose */}
          {[
            { label: 'Projects', y: 60, color: '#B8755C' },
            { label: 'Dreams', y: 80, color: '#B8755C' },
            { label: 'Thoughts', y: 100, color: '#B8755C' },
            { label: 'Actions', y: 120, color: '#B8755C' },
            { label: 'Happenings', y: 140, color: '#8C8580' },
            { label: 'Markers', y: 190, color: '#8B9E7C' },
            { label: 'Feelings', y: 210, color: '#8B9E7C' },
            { label: 'Needs', y: 230, color: '#8B9E7C' },
            { label: 'Routine', y: 250, color: '#8B9E7C' },
          ].map((item, i) => (
            <g key={item.label}>
              <line x1="450" y1={item.y + 20} x2="688" y2="160" stroke={item.color} strokeWidth="0.8" opacity="0.4"/>
              <circle cx={500 + i * 20} cy={item.y + 15} r="3" fill={item.color} opacity="0.6"/>
              <text x={510 + i * 18} y={item.y + 10} className="text-[7px]" fill="#1A1A1E">{item.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <SlideNum n="07" />
    </SlideWrapper>
  )
}

// ======= SLIDE 14: IA VS HUMANIDADE =======
function SlideIA() {
  return (
    <SlideWrapper>
      <SlideTag text="Editorial New" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">A Nova Fronteira: Cuidado como Motor de Resultado</h2>

      <div className="flex-1 flex items-center justify-center gap-8">
        {/* AI side */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            {/* Robot/Tech illustration */}
            <svg viewBox="0 0 160 160" className="w-full">
              {/* Circuit board pattern */}
              <rect x="30" y="30" width="100" height="100" fill="none" stroke="#8C8580" strokeWidth="1" rx="4"/>
              <g stroke="#8C8580" strokeWidth="0.5" opacity="0.5">
                <line x1="50" y1="30" x2="50" y2="130"/><line x1="80" y1="30" x2="80" y2="130"/>
                <line x1="110" y1="30" x2="110" y2="130"/><line x1="30" y1="50" x2="130" y2="50"/>
                <line x1="30" y1="80" x2="130" y2="80"/><line x1="30" y1="110" x2="130" y2="110"/>
              </g>
              {/* Nodes */}
              <circle cx="50" cy="50" r="4" fill="#B8755C" opacity="0.5"/>
              <circle cx="80" cy="80" r="6" fill="#1A1A1E" opacity="0.5"/>
              <circle cx="110" cy="50" r="3" fill="#8B9E7C" opacity="0.5"/>
              <circle cx="50" cy="110" r="5" fill="#8C8580" opacity="0.5"/>
              <circle cx="110" cy="110" r="4" fill="#B8755C" opacity="0.3"/>
              {/* Data text */}
              <text x="15" y="25" className="text-[5px] font-mono" fill="#8C8580" opacity="0.5">10101101</text>
              <text x="90" y="25" className="text-[5px] font-mono" fill="#8C8580" opacity="0.5">01001110</text>
            </svg>
          </div>
          <p className="font-bold text-sm text-center">O Fator IA:</p>
          <p className="text-xs text-[#3D3D3D] text-center max-w-xs">A Inteligencia Artificial superara humanos em tarefas mecanicas e &ldquo;coisas de robo&rdquo;.</p>
        </div>

        {/* Human side */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            {/* Human/organic illustration */}
            <svg viewBox="0 0 160 160" className="w-full">
              {/* Organic swirl */}
              <g fill="none" strokeWidth="2" opacity="0.5">
                <path d="M80,30 C120,30 140,60 130,80 C120,100 100,90 80,100 C60,110 40,100 30,80 C20,60 40,30 80,30" stroke="#B8755C"/>
                <path d="M80,40 C110,40 130,65 120,80 C110,95 95,85 80,95 C65,105 50,95 40,80 C30,65 50,40 80,40" stroke="#8B9E7C"/>
                <path d="M80,50 C100,50 115,70 110,80 C105,90 90,82 80,90 C70,98 58,90 52,80 C46,70 60,50 80,50" stroke="#8C8580"/>
              </g>
              {/* Hearts */}
              <g fill="#B8755C" opacity="0.4">
                <path d="M50,35 C48,30 40,30 40,37 C40,44 50,50 50,50 C50,50 60,44 60,37 C60,30 52,30 50,35" transform="scale(0.6) translate(20, 10)"/>
                <path d="M50,35 C48,30 40,30 40,37 C40,44 50,50 50,50 C50,50 60,44 60,37 C60,30 52,30 50,35" transform="scale(0.5) translate(200, 200)"/>
              </g>
              {/* Brain icon */}
              <circle cx="80" cy="80" r="15" fill="none" stroke="#8C8580" strokeWidth="1"/>
              <path d="M72,80 C72,74 80,70 80,76 C80,70 88,74 88,80" fill="none" stroke="#8C8580" strokeWidth="1"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center">O Diferencial Humano:</p>
          <p className="text-xs text-[#3D3D3D] text-center max-w-xs">O que sobra e o que e estritamente humano — relacoes, empatia, maturidade emocional e presenca.</p>
        </div>
      </div>

      <div className="mt-auto border-t border-[#8C8580]/20 pt-3">
        <p className="text-xs text-center italic text-[#B8755C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          <strong>A Tese:</strong> Cuidado nao e um beneficio de RH. E uma estrategia central de ROI. &ldquo;Cuidador artificial&rdquo; nao funciona; a tecnologia deve apoiar o humano, nao substitui-lo.
        </p>
      </div>
      <SlideNum n="13" />
    </SlideWrapper>
  )
}

// ======= SLIDE 15: EQUACAO PERFORMANCE (GOLD vs LATAO) =======
function SlidePerformance() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-6">A Equacao da Performance</h2>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* Big equation */}
        <div className="flex items-center gap-4 text-xl sm:text-2xl font-serif">
          <span className="border-b-2 border-[#1A1A1E]/30 pb-1">Tempo Disponivel</span>
          <span className="font-bold">X</span>
          <span className="border-b-2 border-[#1A1A1E]/30 pb-1">Qualidade de Energia</span>
          <span className="font-bold">=</span>
          <span className="border-b-2 border-[#1A1A1E]/30 pb-1">Performance Real</span>
        </div>

        {/* Gold bar */}
        <div className="w-full max-w-xl space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Alta Energia</span>
            <span className="text-sm font-bold text-[#B8755C]">Ouro (Potencial Realizado)</span>
          </div>
          <div className="h-8 w-full rounded-sm overflow-hidden" style={{ background: 'linear-gradient(90deg, #B8860B, #DAA520, #FFD700, #DAA520)' }} />
        </div>

        {/* Bronze/brass bar */}
        <div className="w-full max-w-xl space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Baixa Energia<br/><span className="text-[10px] font-normal text-[#8C8580]">(Stress/Defensiva)</span></span>
            <span className="text-sm font-bold text-[#8C8580]">Latao (Desperdicio)</span>
          </div>
          <div className="h-8 w-3/4 rounded-sm overflow-hidden" style={{ background: 'linear-gradient(90deg, #8B7355, #A0926B, #8B7355)' }} />
        </div>

        {/* Three boxes */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xl mt-4">
          <div className="border border-[#8C8580]/20 p-3 rounded-sm">
            <p className="font-bold text-xs">O Mito da Disponibilidade:</p>
            <p className="text-[10px] text-[#3D3D3D]">Nao adianta ter tempo e nao ter energia.</p>
          </div>
          <div className="border border-[#8C8580]/20 p-3 rounded-sm">
            <p className="font-bold text-xs">A Transformacao:</p>
            <p className="text-[10px] text-[#3D3D3D]">Se voce dedica tempo mas esta &ldquo;na amigdala&rdquo;, a qualidade da entrega cai. O ouro vira latao.</p>
          </div>
          <div className="border border-[#8C8580]/20 p-3 rounded-sm">
            <p className="font-bold text-xs">O Colapso:</p>
            <p className="text-[10px] text-[#3D3D3D]">Burnout e o colapso da relacao Tempo-Energia-Vida.</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

// ======= SLIDE 16: MANAGER TATICO (ENERGY BARS WITH %) =======
function SlideManagerTatico() {
  return (
    <SlideWrapper>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-center mb-2">O MANAGER: A Gestao Tatica da Realidade</h2>
      <p className="text-center text-sm text-[#8C8580] mb-6">O Menu do Jogo: O controle do que acontece &lsquo;Agora&rsquo;.</p>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg space-y-5">
          {/* Human silhouette frame */}
          <div className="border-2 border-[#1A1A1E]/20 rounded-lg p-6 space-y-5 relative">
            {/* Energy bars */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Energia Fisica</span>
                <span>70%</span>
              </div>
              <div className="h-7 w-full rounded-sm bg-[#8C8580]/10 border border-[#8C8580]/20 overflow-hidden">
                <div className="h-full rounded-sm flex items-center justify-center text-[10px] font-mono text-white" style={{ width: '70%', background: 'linear-gradient(90deg, #B8860B, #DAA520)' }}>70%</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Energia Sutil/Emocional</span>
                <span className="text-red-500">40%</span>
              </div>
              <div className="h-7 w-full rounded-sm bg-[#8C8580]/10 border border-[#8C8580]/20 overflow-hidden">
                <div className="h-full rounded-sm flex items-center justify-center text-[10px] font-mono text-white" style={{ width: '40%', background: 'linear-gradient(90deg, #B8755C, #C4956A)' }}>40%</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>Recursos/Rotina</span>
                <span>80%</span>
              </div>
              <div className="h-7 w-full rounded-sm bg-[#8C8580]/10 border border-[#8C8580]/20 overflow-hidden">
                <div className="h-full rounded-sm flex items-center justify-center text-[10px] font-mono text-white" style={{ width: '80%', background: 'linear-gradient(90deg, #5B7AA0, #7BA0C4)' }}>80%</div>
              </div>
            </div>

            {/* Compass & battery decorations */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#8C8580" strokeWidth="1"/><polygon points="12,4 13,10 12,9 11,10" fill="#8C8580"/></svg>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="8" width="14" height="10" rx="1" fill="none" stroke="#8C8580" strokeWidth="1"/><rect x="18" y="11" width="3" height="4" rx="0.5" fill="#8C8580" opacity="0.5"/><line x1="8" y1="13" x2="8" y2="13" stroke="#8B9E7C" strokeWidth="3"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="font-bold text-xs">Os Ativos:</p>
          <p className="text-[10px] text-[#3D3D3D]">- Energia: Fisica (Nutricao) e Sutil (Sono/Emocao).<br/>- Rotina: Distribuicao das 24h.<br/>- Necessidades: Lazer, conexao e proposito.</p>
        </div>
        <div>
          <p className="font-bold text-xs">Funcao:</p>
          <p className="text-[10px] text-[#3D3D3D] font-semibold">Garantir combustivel suficiente para a travessia de A para B.</p>
        </div>
      </div>
    </SlideWrapper>
  )
}

// ======= SLIDE 17: MANIFESTO FINAL =======
function SlideManifesto() {
  return (
    <SlideWrapper bg="bg-[#2C2C2C]" dark>
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Door illustration */}
        <div className="relative">
          <svg viewBox="0 0 200 250" className="w-32">
            {/* Door frame */}
            <rect x="40" y="30" width="120" height="200" rx="4" fill="none" stroke="#B8755C" strokeWidth="2" opacity="0.4"/>
            {/* Arch top */}
            <path d="M40,80 C40,30 160,30 160,80" fill="none" stroke="#B8755C" strokeWidth="2" opacity="0.4"/>
            {/* Light gradient from door */}
            <defs>
              <radialGradient id="doorlight" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#DAA520" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#DAA520" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect x="50" y="40" width="100" height="180" fill="url(#doorlight)"/>
            {/* Person silhouette */}
            <g opacity="0.5">
              <circle cx="100" cy="120" r="8" fill="#F5F0EB"/>
              <path d="M90,130 L85,190 L95,190 L100,150 L105,190 L115,190 L110,130 Z" fill="#F5F0EB"/>
            </g>
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F0EB]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Evolucao e Mandatoria.
        </h2>

        <p className="text-sm text-[#F5F0EB]/70 max-w-md">
          O que te limita e o que te mantem vivo.<br/>
          Para ir alem, precisamos da coragem de olhar para o mapa desconhecido.
        </p>

        <div className="border border-[#B8755C]/30 rounded-sm px-6 py-4 max-w-lg">
          <p className="text-xs text-[#F5F0EB]/60">Onde Estamos: <span className="text-[#F5F0EB]">Em meio a disrupcao.</span></p>
          <p className="text-xs text-[#F5F0EB]/60 mt-1">O Que Precisamos: <span className="text-[#F5F0EB]">Desbloqueio de potencial atraves da consciencia (Map) e gestao (Manager).</span></p>
          <p className="text-xs text-[#F5F0EB]/60 mt-1">O Proximo Degrau: <span className="text-[#F5F0EB]">A evolucao do &ldquo;eu&rdquo; e a evolucao do &ldquo;entorno&rdquo;.</span></p>
        </div>

        <p className="text-lg italic text-[#B8755C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;O proximo nivel de performance exige o proximo nivel de humanidade.&rdquo;
        </p>

        <p className="text-sm font-bold tracking-widest text-[#F5F0EB]/50">Life Map Model</p>
      </div>
    </SlideWrapper>
  )
}

// ======= SLIDE 18: CASO ESTUDO =======
function SlideCasoEstudo() {
  return (
    <SlideWrapper>
      <SlideTag text="Architectural Humanism" />
      <h2 className="text-lg sm:text-xl font-serif font-bold text-center mb-4">Estudo de Caso: O Ruido da Inseguranca vs. A Realidade</h2>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 600 250" className="w-full max-w-xl">
          {/* Axes */}
          <line x1="60" y1="20" x2="60" y2="220" stroke="#8C8580" strokeWidth="1"/>
          <line x1="60" y1="220" x2="560" y2="220" stroke="#8C8580" strokeWidth="1"/>

          {/* Red noise line (subjective perception) */}
          <path d="M80,100 C100,60 120,140 140,80 C160,120 180,50 200,110 C220,70 240,130 260,60 C280,100 300,40 320,90 C340,50 360,120 380,70 C400,110 420,55 440,85 C460,60 480,100 500,70 C520,90 540,65 550,80" fill="none" stroke="#C0392B" strokeWidth="2" opacity="0.7"/>
          {/* Red background wash */}
          <path d="M80,100 C100,60 120,140 140,80 C160,120 180,50 200,110 C220,70 240,130 260,60 C280,100 300,40 320,90 C340,50 360,120 380,70 C400,110 420,55 440,85 C460,60 480,100 500,70 C520,90 540,65 550,80 L550,220 L80,220 Z" fill="#C0392B" opacity="0.05"/>

          {/* Blue steady line (objective reality) */}
          <path d="M80,190 C150,185 200,180 250,175 C300,168 350,160 400,150 C450,140 500,130 550,115" fill="none" stroke="#2980B9" strokeWidth="2.5" opacity="0.7"/>

          {/* Labels */}
          <text x="55" y="70" textAnchor="end" className="text-[8px] font-bold" fill="#C0392B">Percepcao Subjetiva</text>
          <text x="55" y="80" textAnchor="end" className="text-[7px]" fill="#C0392B">(Medo/Inseguranca)</text>
          <text x="55" y="175" textAnchor="end" className="text-[8px] font-bold" fill="#2980B9">Realidade Objetiva</text>
          <text x="55" y="185" textAnchor="end" className="text-[7px]" fill="#2980B9">(Dados de Venda/</text>
          <text x="55" y="195" textAnchor="end" className="text-[7px]" fill="#2980B9">Performance)</text>
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-2">
        <div>
          <p className="font-bold text-[10px]">O Cenario:</p>
          <p className="text-[9px] text-[#3D3D3D]">Colaboradora sente iminencia de demissao.</p>
        </div>
        <div>
          <p className="font-bold text-[10px]">A Realidade:</p>
          <p className="text-[9px] text-[#3D3D3D]">Metas batidas, empresa saudavel.</p>
        </div>
        <div>
          <p className="font-bold text-[10px]">O Diagnostico:</p>
          <p className="text-[9px] text-[#3D3D3D]">Gatilho emocional (historico de abandono) projetado na lideranca.</p>
        </div>
        <div>
          <p className="font-bold text-[10px]">Resultado:</p>
          <p className="text-[9px] text-[#3D3D3D]">Identificacao do ruido economiza semanas de baixa produtividade.</p>
        </div>
      </div>
    </SlideWrapper>
  )
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

const allSlides = [
  { id: 'cover', title: 'Capa: O Modelo Life Map', component: SlideCover },
  { id: 'disrupcao', title: 'Slide 01: A Disrupcao Transformacional', component: SlideDisrupcao },
  { id: 'sabotador', title: 'Slide 02: O Sabotador Invisivel', component: SlideSabotador },
  { id: 'filosofia', title: 'Slide 03: A Filosofia Life Map', component: SlideFilosofia },
  { id: 'map-fog', title: 'Slide 04: O Componente Map', component: SlideMapFog },
  { id: 'manager', title: 'Slide 05: O Componente Manager', component: SlideManager },
  { id: 'equacao', title: 'Slide 06: Equacao Tempo x Energia', component: SlideEquacao },
  { id: 'fisiologia', title: 'Slide 07: Fisiologia do Desperdicio', component: SlideFisiologia },
  { id: 'corrente', title: 'Slide 08: A Metafora da Corrente', component: SlideCorrente },
  { id: 'cuidado', title: 'Slide 08: Estrutura de Cuidado Integrado', component: SlideCuidadoIntegrado },
  { id: 'time', title: 'Slide 09: Time de Cuidado', component: SlideTimeCuidado },
  { id: 'verticais', title: 'Slide 10: As Verticais Simbioticas', component: SlideVerticais },
  { id: 'conselho', title: 'Slide 11: Conselho Multidisciplinar', component: SlideConselho },
  { id: 'ecossistema', title: 'Slide 07: Ecossistema Life Map', component: SlideEcossistema },
  { id: 'performance', title: 'A Equacao da Performance', component: SlidePerformance },
  { id: 'manager-tatico', title: 'O Manager Tatico', component: SlideManagerTatico },
  { id: 'caso', title: 'Estudo de Caso', component: SlideCasoEstudo },
  { id: 'ia', title: 'Slide 13: IA vs. Humanidade', component: SlideIA },
  { id: 'manifesto', title: 'Manifesto Final', component: SlideManifesto },
]

export default function AdminConteudoPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const SlideComponent = allSlides[currentSlide].component

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Conteudo Life Map</h2>
          <p className="text-[#8C8580]">{allSlides.length} slides — Apresentacao completa do modelo</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === 'single' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('single')}>
            {isFullscreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
            Apresentacao
          </Button>
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
            <Grid3X3 className="mr-2 h-4 w-4" />
            Grade
          </Button>
        </div>
      </div>

      {viewMode === 'single' && (
        <>
          {/* Slide viewer */}
          <div className={cn('transition-all', isFullscreen && 'fixed inset-0 z-50 bg-[#1A1A1E] p-4 flex items-center justify-center')}>
            <div className="w-full max-w-5xl mx-auto">
              <SlideComponent />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" disabled={currentSlide === 0} onClick={() => setCurrentSlide(s => s - 1)}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-[#8C8580]">{currentSlide + 1} / {allSlides.length}</span>
              <span className="text-xs text-[#8C8580] hidden sm:inline">— {allSlides[currentSlide].title}</span>
            </div>
            <Button variant="outline" size="sm" disabled={currentSlide === allSlides.length - 1} onClick={() => setCurrentSlide(s => s + 1)}>
              Proximo <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Slide thumbnails */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {allSlides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  'flex-shrink-0 rounded-sm border px-2 py-1 text-[10px] transition-colors',
                  i === currentSlide
                    ? 'border-[#B8755C] bg-[#B8755C]/10 text-[#B8755C] font-medium'
                    : 'border-[#8C8580]/20 text-[#8C8580] hover:border-[#B8755C]/40'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {viewMode === 'grid' && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {allSlides.map((slide, i) => {
            const C = slide.component
            return (
              <button
                key={slide.id}
                onClick={() => { setCurrentSlide(i); setViewMode('single') }}
                className="text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="rounded-lg border border-[#8C8580]/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="pointer-events-none" style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
                    <C />
                  </div>
                </div>
                <p className="mt-1 text-[10px] text-[#8C8580]">{slide.title}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
