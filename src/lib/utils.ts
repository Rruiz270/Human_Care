import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateAge(birthDate: Date | string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Life Map Editorial Colors
export const colors = {
  copper: '#B8755C',
  copperLight: '#C4956A',
  copperDark: '#8B5A3E',
  sage: '#8B9E7C',
  sageLight: '#A3B596',
  sageDark: '#6E8160',
  ink: '#1A1A1E',
  stone: '#8C8580',
  parchment: '#F5F0EB',
  parchmentLight: '#FAF8F5',
  parchmentDark: '#E8E0D6',
} as const

// Portuguese translations for enums
export const translations = {
  userRole: {
    ADMIN: 'Administrador',
    PROFESSOR: 'Professor',
    TERAPEUTA: 'Terapeuta',
    COACH: 'Coach',
    CARE_TEAM: 'Time de Cuidado'
  },
  sessionType: {
    THERAPY: 'Terapia',
    COACHING: 'Coaching',
    CARE_TEAM_CHECKIN: 'Check-in do Time de Cuidado',
    COUPLES_THERAPY: 'Terapia de Casal',
    WORKSHOP: 'Workshop',
    OTHER: 'Outro'
  },
  sessionStatus: {
    SCHEDULED: 'Agendada',
    IN_PROGRESS: 'Em Andamento',
    COMPLETED: 'Concluída',
    CANCELLED: 'Cancelada',
    NO_SHOW: 'Não Compareceu'
  },
  projectStatus: {
    PLANNING: 'Planejando',
    IN_PROGRESS: 'Em Andamento',
    ON_HOLD: 'Pausado',
    COMPLETED: 'Concluído',
    CANCELLED: 'Cancelado'
  },
  missionStatus: {
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Andamento',
    COMPLETED: 'Concluída',
    CANCELLED: 'Cancelada'
  },
  missionType: {
    THERAPY_TASK: 'Tarefa Terapêutica',
    COACHING_TASK: 'Tarefa de Coaching',
    DAILY_HABIT: 'Hábito Diário',
    REFLECTION: 'Reflexão',
    ACTION: 'Ação'
  },
  timelineEventType: {
    ACHIEVEMENT: 'Conquista',
    TRAUMA: 'Trauma',
    LOSS: 'Perda',
    GAIN: 'Ganho',
    MILESTONE: 'Marco',
    RELATIONSHIP: 'Relacionamento',
    HEALTH: 'Saúde',
    EDUCATION: 'Educação',
    CAREER: 'Carreira',
    OTHER: 'Outro'
  },
  relationType: {
    FATHER: 'Pai',
    MOTHER: 'Mãe',
    SIBLING: 'Irmão/Irmã',
    SPOUSE: 'Cônjuge',
    CHILD: 'Filho(a)',
    GRANDPARENT: 'Avô/Avó',
    UNCLE_AUNT: 'Tio(a)',
    COUSIN: 'Primo(a)',
    FRIEND: 'Amigo(a)',
    OTHER: 'Outro'
  },
  currentRelationType: {
    ROMANTIC: 'Romântico',
    FAMILY: 'Familiar',
    PROFESSIONAL: 'Profissional',
    FRIENDSHIP: 'Amizade',
    MENTORSHIP: 'Mentoria',
    OTHER: 'Outro'
  }
} as const
