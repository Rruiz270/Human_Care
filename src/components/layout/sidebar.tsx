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
  Heart,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Mapa da Vida', href: '/mapa-da-vida', icon: Map },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Sessoes', href: '/sessoes', icon: Heart },
  { name: 'Missoes', href: '/missoes', icon: Target },
  { name: 'Chat AI', href: '/chat-ai', icon: MessageSquare },
  { name: 'Metricas', href: '/metricas', icon: BarChart3 },
]

const adminNavigation = [
  { name: 'Usuarios', href: '/admin/usuarios', icon: Users },
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
        'fixed left-0 top-0 z-40 h-screen bg-[#001011] text-white transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A4DF00]">
                <Heart className="h-6 w-6 text-[#001011]" />
              </div>
              <span className="text-xl font-bold">Human Care</span>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#A4DF00]">
              <Heart className="h-6 w-6 text-[#001011]" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/10"
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
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#A4DF00] text-[#001011]'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
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
              <div className="my-4 border-t border-white/10" />
              {!collapsed && (
                <p className="px-3 text-xs font-semibold uppercase text-gray-400">
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
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#A4DF00] text-[#001011]'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
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
        <div className="border-t border-white/10 p-4">
          {/* Demo mode switch */}
          <div className="mb-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={switchToDemo}
              className={cn(
                'flex-1 text-xs',
                !isAdmin ? 'bg-[#6CCFF6] text-[#001011]' : 'text-gray-400 hover:bg-white/10'
              )}
            >
              {!collapsed && 'Professor'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={switchToAdmin}
              className={cn(
                'flex-1 text-xs',
                isAdmin ? 'bg-[#6CCFF6] text-[#001011]' : 'text-gray-400 hover:bg-white/10'
              )}
            >
              <Shield className="h-4 w-4" />
              {!collapsed && <span className="ml-1">Admin</span>}
            </Button>
          </div>

          {currentUser && (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar || undefined} />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{currentUser.name}</p>
                  <p className="truncate text-xs text-gray-400">{currentUser.email}</p>
                </div>
              )}
            </div>
          )}

          {/* Encryption notice */}
          {!collapsed && (
            <div className="mt-4 rounded-lg bg-white/5 p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#A4DF00]" />
                <span className="text-xs text-gray-400">
                  Dados protegidos com criptografia AES-256
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
