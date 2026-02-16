'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, Menu } from 'lucide-react'
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
  '/configuracoes': 'Configuracoes',
  '/admin/usuarios': 'Gestao de Usuarios',
}

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const { currentUser } = useUserStore()

  const title = pageTitles[pathname] || 'Human Care'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#757780]/20 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-[#001011]">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#757780]" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-10"
            />
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-[#757780]" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A4DF00] text-[10px] font-bold text-[#001011]">
            3
          </span>
        </Button>

        {/* User */}
        {currentUser && (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser.avatar || undefined} />
              <AvatarFallback className="bg-[#6CCFF6] text-[#001011]">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#001011]">{currentUser.name}</p>
              <p className="text-xs text-[#757780]">
                {currentUser.role === 'ADMIN' ? 'Administrador' : 'Professor'}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
