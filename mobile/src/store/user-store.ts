import { create } from 'zustand';
import type { User, LifeMap, DailyTracking, Session, Mission, RPGStats } from '../types';
import { getRPGStats } from '../utils/rpg-calculations';

// Demo user for development
const demoUser: User = {
  id: 'demo-user-1',
  email: 'maria@humancare.com',
  name: 'Maria Silva',
  avatar: null,
  role: 'PROFESSOR',
  phone: '(11) 99999-9999',
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  level: 7,
  xp: 2350,
  streak: 12,
};

// Demo daily tracking
const demoTracking: DailyTracking = {
  id: 'dt-1',
  lifeMapId: 'lm-1',
  date: new Date(),
  thoughts: 'Me senti produtivo hoje.',
  actions: 'Completei 3 missoes.',
  feelings: 'Gratidao e foco.',
  moodScore: 8,
  energyScore: 7,
  stressScore: 3,
  insights: null,
  gratitude: ['Minha familia', 'Meu trabalho', 'Minha saude'],
  challenges: ['Foco durante a tarde'],
  alignedWithPurpose: true,
  alignmentNotes: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Demo sessions
const demoSessions: Session[] = [
  {
    id: 'sess-1',
    clientId: 'demo-user-1',
    professionalId: 'prof-1',
    professional: {
      id: 'prof-1',
      email: 'dr.ana@humancare.com',
      name: 'Dra. Ana Costa',
      role: 'TERAPEUTA',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    type: 'THERAPY',
    status: 'SCHEDULED',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isOnline: true,
    meetingLink: 'https://meet.google.com/abc-xyz',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'sess-2',
    clientId: 'demo-user-1',
    professionalId: 'prof-2',
    professional: {
      id: 'prof-2',
      email: 'carlos@humancare.com',
      name: 'Carlos Mendes',
      role: 'COACH',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    type: 'COACHING',
    status: 'SCHEDULED',
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isOnline: false,
    location: 'Escritorio Human Care',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Demo missions
const demoMissions: Mission[] = [
  {
    id: 'miss-1',
    userId: 'demo-user-1',
    title: 'Meditacao matinal - 10 minutos',
    description: 'Praticar meditacao guiada pela manha ao acordar.',
    type: 'DAILY_HABIT',
    status: 'IN_PROGRESS',
    streak: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'miss-2',
    userId: 'demo-user-1',
    sessionId: 'sess-1',
    title: 'Escrever carta de gratidao',
    description: 'Escrever uma carta expressando gratidao a alguem importante.',
    type: 'THERAPY_TASK',
    status: 'PENDING',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'miss-3',
    userId: 'demo-user-1',
    title: 'Definir 3 metas do trimestre',
    description: 'Definir e registrar 3 metas SMART para o trimestre.',
    type: 'COACHING_TASK',
    status: 'PENDING',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'miss-4',
    userId: 'demo-user-1',
    title: 'Reflexao sobre padroes',
    description: 'Refletir sobre padroes de comportamento identificados na ultima sessao.',
    type: 'REFLECTION',
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface UserState {
  currentUser: User | null;
  lifeMap: LifeMap | null;
  todayTracking: DailyTracking | null;
  upcomingSessions: Session[];
  pendingMissions: Mission[];
  rpgStats: RPGStats;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUser: (user: User | null) => void;
  setLifeMap: (lifeMap: LifeMap | null) => void;
  setTodayTracking: (tracking: DailyTracking | null) => void;
  setUpcomingSessions: (sessions: Session[]) => void;
  setPendingMissions: (missions: Mission[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadDemoData: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  currentUser: demoUser,
  lifeMap: null,
  todayTracking: demoTracking,
  upcomingSessions: demoSessions,
  pendingMissions: demoMissions,
  rpgStats: getRPGStats(demoTracking, 15, 12, 8),
  isLoading: false,
  error: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setLifeMap: (lifeMap) => set({ lifeMap }),
  setTodayTracking: (tracking) =>
    set((state) => ({
      todayTracking: tracking,
      rpgStats: getRPGStats(tracking, 15, 12, 8),
    })),
  setUpcomingSessions: (sessions) => set({ upcomingSessions: sessions }),
  setPendingMissions: (missions) => set({ pendingMissions: missions }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  loadDemoData: () =>
    set({
      currentUser: demoUser,
      todayTracking: demoTracking,
      upcomingSessions: demoSessions,
      pendingMissions: demoMissions,
      rpgStats: getRPGStats(demoTracking, 15, 12, 8),
    }),

  logout: () =>
    set({
      currentUser: null,
      lifeMap: null,
      todayTracking: null,
      upcomingSessions: [],
      pendingMissions: [],
    }),
}));

// Helper hooks
export function useCurrentUser() {
  return useUserStore((state) => state.currentUser);
}

export function useIsAdmin() {
  const user = useCurrentUser();
  return user?.role === 'ADMIN';
}

export function useIsProfessional() {
  const user = useCurrentUser();
  return user?.role === 'TERAPEUTA' || user?.role === 'COACH' || user?.role === 'CARE_TEAM';
}
