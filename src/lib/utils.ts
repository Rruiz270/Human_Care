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

// Better Tech Colors
export const colors = {
  paleAzure: '#6CCFF6',
  richBlack: '#001011',
  gray: '#757780',
  babyPowder: '#FFFFFC',
  yellowGreen: '#A4DF00',
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
    COMPLETED: 'Concluida',
    CANCELLED: 'Cancelada',
    NO_SHOW: 'Nao Compareceu'
  },
  projectStatus: {
    PLANNING: 'Planejando',
    IN_PROGRESS: 'Em Andamento',
    ON_HOLD: 'Pausado',
    COMPLETED: 'Concluido',
    CANCELLED: 'Cancelado'
  },
  missionStatus: {
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Andamento',
    COMPLETED: 'Concluida',
    CANCELLED: 'Cancelada'
  },
  missionType: {
    THERAPY_TASK: 'Tarefa Terapeutica',
    COACHING_TASK: 'Tarefa de Coaching',
    DAILY_HABIT: 'Habito Diario',
    REFLECTION: 'Reflexao',
    ACTION: 'Acao'
  },
  timelineEventType: {
    ACHIEVEMENT: 'Conquista',
    TRAUMA: 'Trauma',
    LOSS: 'Perda',
    GAIN: 'Ganho',
    MILESTONE: 'Marco',
    RELATIONSHIP: 'Relacionamento',
    HEALTH: 'Saude',
    EDUCATION: 'Educacao',
    CAREER: 'Carreira',
    OTHER: 'Outro'
  },
  relationType: {
    FATHER: 'Pai',
    MOTHER: 'Mae',
    SIBLING: 'Irmao/Irma',
    SPOUSE: 'Conjuge',
    CHILD: 'Filho(a)',
    GRANDPARENT: 'Avo/Avo',
    UNCLE_AUNT: 'Tio(a)',
    COUSIN: 'Primo(a)',
    FRIEND: 'Amigo(a)',
    OTHER: 'Outro'
  },
  currentRelationType: {
    ROMANTIC: 'Romantico',
    FAMILY: 'Familiar',
    PROFESSIONAL: 'Profissional',
    FRIENDSHIP: 'Amizade',
    MENTORSHIP: 'Mentoria',
    OTHER: 'Outro'
  }
} as const
