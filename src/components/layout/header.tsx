'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, Menu, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/store/user-store'
import { getInitials } from '@/lib/utils'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/mapa-da-vida': 'Mapa da Vida',
  '/agenda': 'Agenda',
  '/sessoes': 'Sessoes',
  '/missoes': 'Missoes',
  '/chat-ai': 'Chat AI',
  '/metricas': 'Metricas',
  '/conteudo': 'Conteudo',
  '/configuracoes': 'Configuracoes',
  '/admin/usuarios': 'Gestao de Usuarios',
}

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const { currentUser } = useUserStore()

  const title = pageTitles[pathname] || 'Life Map'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#B8755C]/15 bg-[#F5F0EB]/80 backdrop-blur-sm px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-[#2C2C2C] hover:bg-[#B8755C]/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1E]">{title}</h1>
          <p className="hidden lg:block text-[10px] font-mono uppercase tracking-[0.15em] text-[#B8755C]/50">Arquitetura Humana</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8755C]/40" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-10 bg-[#F5F1EA] border-[#B8755C]/20 rounded-sm placeholder:text-[#B8755C]/30 focus:border-[#B8755C]/40"
            />
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-[#B8755C]/10">
          <Bell className="h-5 w-5 text-[#4A4A4A]" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B8755C] text-[10px] font-bold text-white">
            3
          </span>
        </Button>

        {/* User */}
        {currentUser && (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#B8755C]/25">
              <AvatarImage src={currentUser.avatar || undefined} />
              <AvatarFallback className="bg-[#B8755C] text-[#F5F0EB] text-sm">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#1A1A1E]">{currentUser.name}</p>
              <p className="text-xs text-[#4A4A4A]/60">
                {currentUser.role === 'ADMIN' ? 'Administrador' : 'Professor'}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
