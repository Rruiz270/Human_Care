'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Compass,
  Calendar,
  MessageSquare,
  Target,
} from 'lucide-react'

const navigation = [
  { name: 'QG', href: '/', icon: LayoutDashboard },
  { name: 'Mapa', href: '/mapa-da-vida', icon: Compass },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Missões', href: '/missoes', icon: Target },
  { name: 'Oráculo', href: '/chat-ai', icon: MessageSquare },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#B8755C]/15 bg-[#F5F0EB]/90 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-[#B8755C]'
                  : 'text-[#4A4A4A]/50 hover:text-[#2C2C2C]'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
