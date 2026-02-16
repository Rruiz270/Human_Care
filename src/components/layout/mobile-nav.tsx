'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Map,
  Calendar,
  MessageSquare,
  Target,
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: LayoutDashboard },
  { name: 'Mapa', href: '/mapa-da-vida', icon: Map },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Missoes', href: '/missoes', icon: Target },
  { name: 'Chat', href: '/chat-ai', icon: MessageSquare },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#757780]/20 bg-white lg:hidden">
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
                  ? 'text-[#A4DF00]'
                  : 'text-[#757780] hover:text-[#001011]'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
