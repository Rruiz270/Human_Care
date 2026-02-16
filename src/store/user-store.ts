'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, LifeMap } from '@/types'

// Demo user for development (no authentication required)
const demoUser: User = {
  id: 'demo-user-1',
  email: 'professor@humancare.com',
  name: 'Maria Silva',
  avatar: null,
  role: 'PROFESSOR',
  phone: '(11) 99999-9999',
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
}

const demoAdmin: User = {
  id: 'demo-admin-1',
  email: 'admin@humancare.com',
  name: 'Admin Human Care',
  avatar: null,
  role: 'ADMIN',
  phone: '(11) 88888-8888',
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
}

interface UserState {
  currentUser: User | null
  lifeMap: LifeMap | null
  isLoading: boolean
  error: string | null

  // Actions
  setCurrentUser: (user: User | null) => void
  setLifeMap: (lifeMap: LifeMap | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  switchToDemo: () => void
  switchToAdmin: () => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: demoUser, // Start with demo user (no auth required)
      lifeMap: null,
      isLoading: false,
      error: null,

      setCurrentUser: (user) => set({ currentUser: user }),
      setLifeMap: (lifeMap) => set({ lifeMap }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      switchToDemo: () => set({ currentUser: demoUser }),
      switchToAdmin: () => set({ currentUser: demoAdmin }),

      logout: () => set({ currentUser: null, lifeMap: null }),
    }),
    {
      name: 'human-care-user',
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
    }
  )
)

// Hook for easy access
export function useCurrentUser() {
  return useUserStore((state) => state.currentUser)
}

export function useIsAdmin() {
  const user = useCurrentUser()
  return user?.role === 'ADMIN'
}

export function useIsProfessional() {
  const user = useCurrentUser()
  return user?.role === 'TERAPEUTA' || user?.role === 'COACH' || user?.role === 'CARE_TEAM'
}
