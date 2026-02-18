'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUserStore, useIsAdmin } from '@/store/user-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/utils'
import {
  LayoutDashboard,
  Map,
  Calendar,
  MessageSquare,
  Target,
  BarChart3,
  Settings,
  Users,
  LogOut,
  Compass,
  ChevronLeft,
  ChevronRight,
  Shield,
  Video,
  Heart,
  BookOpen,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Quartel General', href: '/', icon: LayoutDashboard },
  { name: 'Mapa do Mundo', href: '/mapa-da-vida', icon: Compass },
  { name: 'Biblioteca', href: '/conteudo', icon: Video },
  { name: 'Calendario', href: '/agenda', icon: Calendar },
  { name: 'Encontros', href: '/sessoes', icon: Heart },
  { name: 'Missoes', href: '/missoes', icon: Target },
  { name: 'O Oraculo', href: '/chat-ai', icon: MessageSquare },
  { name: 'Status do Avatar', href: '/metricas', icon: BarChart3 },
]

const adminNavigation = [
  { name: 'Usuarios', href: '/admin/usuarios', icon: Users },
  { name: 'Conteudo Life Map', href: '/admin/conteudo', icon: BookOpen },
  { name: 'Configuracoes', href: '/configuracoes', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { currentUser, switchToDemo, switchToAdmin } = useUserStore()
  const isAdmin = useIsAdmin()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-[#2C2C2C] text-[#F5F0EB] transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#B8755C]/20">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#B8755C]/40">
                <Compass className="h-6 w-6 text-[#C4956A]" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Life Map</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#B8755C]/60">Arquitetura Humana</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm border border-[#B8755C]/40">
              <Compass className="h-6 w-6 text-[#C4956A]" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#F5F0EB]/60 hover:bg-[#B8755C]/10 hover:text-[#F5F0EB]"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#B8755C] text-[#F5F0EB]'
                    : 'text-[#F5F0EB]/60 hover:bg-[#B8755C]/15 hover:text-[#F5F0EB]'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}

          {/* Admin section */}
          {isAdmin && (
            <>
              <div className="my-4 border-t border-[#B8755C]/20" />
              {!collapsed && (
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8755C]/50">
                  Administracao
                </p>
              )}
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#B8755C] text-[#F5F0EB]'
                        : 'text-[#F5F0EB]/60 hover:bg-[#B8755C]/15 hover:text-[#F5F0EB]'
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-[#B8755C]/20 p-4">
          {/* Demo mode switch */}
          <div className="mb-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={switchToDemo}
              className={cn(
                'flex-1 text-xs rounded-sm',
                !isAdmin ? 'bg-[#B8755C] text-[#F5F0EB]' : 'text-[#F5F0EB]/50 hover:bg-[#B8755C]/15'
              )}
            >
              {!collapsed && 'Professor'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={switchToAdmin}
              className={cn(
                'flex-1 text-xs rounded-sm',
                isAdmin ? 'bg-[#8B9E7C] text-[#F5F0EB]' : 'text-[#F5F0EB]/50 hover:bg-[#B8755C]/15'
              )}
            >
              <Shield className="h-4 w-4" />
              {!collapsed && <span className="ml-1">Admin</span>}
            </Button>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-[#B8755C]/30">
                <AvatarImage src={currentUser.avatar || undefined} />
                <AvatarFallback className="bg-[#B8755C] text-[#F5F0EB] text-sm">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-[#F5F0EB]">{currentUser.name}</p>
                  <p className="truncate text-xs text-[#F5F0EB]/40">{currentUser.email}</p>
                </div>
              )}
            </div>
          )}

          {/* Tagline */}
          {!collapsed && (
            <div className="mt-4 border-t border-[#B8755C]/10 pt-3">
              <p className="text-[10px] italic text-[#B8755C]/40" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;O que te limita e o que esta te limitando.&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
