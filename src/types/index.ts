// Type definitions for Human Care application

export type UserRole = 'ADMIN' | 'PROFESSOR' | 'TERAPEUTA' | 'COACH' | 'CARE_TEAM'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string | null
  role: UserRole
  phone?: string | null
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface LifeMap {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  // Relations
  pastTimeline?: TimelineEvent[]
  familyRelations?: FamilyRelation[]
  beliefSystems?: BeliefSystem[]
  bodyHealth?: BodyHealth | null
  mindState?: MindState | null
  identity?: Identity | null
  currentRelations?: CurrentRelation[]
  environments?: Environment[]
  routines?: Routine[]
  purpose?: Purpose | null
  projects?: Project[]
  okrs?: OKR[]
  dailyTracking?: DailyTracking[]
}

export type TimelineEventType =
  | 'ACHIEVEMENT'
  | 'TRAUMA'
  | 'LOSS'
  | 'GAIN'
  | 'MILESTONE'
  | 'RELATIONSHIP'
  | 'HEALTH'
  | 'EDUCATION'
  | 'CAREER'
  | 'OTHER'

export interface TimelineEvent {
  id: string
  lifeMapId: string
  title: string
  description?: string | null
  eventType: TimelineEventType
  eventDate?: Date | null
  ageAtEvent?: number | null
  impact: number
  isPositive: boolean
  isResolved: boolean
  relatedPeople: string[]
  createdAt: Date
  updatedAt: Date
}

export type RelationType =
  | 'FATHER'
  | 'MOTHER'
  | 'SIBLING'
  | 'SPOUSE'
  | 'CHILD'
  | 'GRANDPARENT'
  | 'UNCLE_AUNT'
  | 'COUSIN'
  | 'FRIEND'
  | 'OTHER'

export interface FamilyRelation {
  id: string
  lifeMapId: string
  name: string
  relationType: RelationType
  quality: number
  description?: string | null
  isAlive: boolean
  influence?: string | null
  blocks?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BeliefSystem {
  id: string
  lifeMapId: string
  belief: string
  origin?: string | null
  isLimiting: boolean
  isWorkedOn: boolean
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BodyHealth {
  id: string
  lifeMapId: string
  weight?: number | null
  height?: number | null
  sleepHours?: number | null
  sleepQuality?: number | null
  exerciseFrequency?: string | null
  healthConditions: string[]
  medications: string[]
  dietDescription?: string | null
  energyLevel?: number | null
  createdAt: Date
  updatedAt: Date
}

export interface MindState {
  id: string
  lifeMapId: string
  workDescription?: string | null
  workHoursPerDay?: number | null
  stressLevel?: number | null
  screenTimeHours?: number | null
  socialMediaUsage?: string | null
  mainWorries: string[]
  copingMechanisms: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Identity {
  id: string
  lifeMapId: string
  selfDescription?: string | null
  values: string[]
  strengths: string[]
  weaknesses: string[]
  lifePhilosophy?: string | null
  createdAt: Date
  updatedAt: Date
}

export type CurrentRelationType =
  | 'ROMANTIC'
  | 'FAMILY'
  | 'PROFESSIONAL'
  | 'FRIENDSHIP'
  | 'MENTORSHIP'
  | 'OTHER'

export interface CurrentRelation {
  id: string
  lifeMapId: string
  name: string
  relationType: CurrentRelationType
  quality: number
  frequency?: string | null
  description?: string | null
  challenges?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Environment {
  id: string
  lifeMapId: string
  name: string
  type: string
  satisfaction: number
  timeSpent?: string | null
  description?: string | null
  improvements?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface RoutineActivity {
  time: string
  activity: string
  category: string
}

export interface Routine {
  id: string
  lifeMapId: string
  dayOfWeek?: number | null
  wakeUpTime?: string | null
  bedTime?: string | null
  activities: RoutineActivity[]
  notes?: string | null
  version: number
  createdAt: Date
  updatedAt: Date
}

export interface Purpose {
  id: string
  lifeMapId: string
  statement: string
  whyItMatters?: string | null
  dreams: string[]
  legacy?: string | null
  createdAt: Date
  updatedAt: Date
}

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED'

export interface Project {
  id: string
  lifeMapId: string
  title: string
  description?: string | null
  status: ProjectStatus
  startDate?: Date | null
  targetDate?: Date | null
  completedAt?: Date | null
  progress: number
  category?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface KeyResult {
  id: string
  okrId: string
  description: string
  targetValue: number
  currentValue: number
  unit?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface OKR {
  id: string
  lifeMapId: string
  objective: string
  quarter?: string | null
  year?: number | null
  keyResults?: KeyResult[]
  progress: number
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface DailyTracking {
  id: string
  lifeMapId: string
  date: Date
  thoughts?: string | null
  actions?: string | null
  feelings?: string | null
  moodScore?: number | null
  energyScore?: number | null
  stressScore?: number | null
  insights?: string | null
  gratitude: string[]
  challenges: string[]
  alignedWithPurpose: boolean
  alignmentNotes?: string | null
  createdAt: Date
  updatedAt: Date
}

export type SessionType =
  | 'THERAPY'
  | 'COACHING'
  | 'CARE_TEAM_CHECKIN'
  | 'COUPLES_THERAPY'
  | 'WORKSHOP'
  | 'OTHER'

export type SessionStatus =
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export interface Session {
  id: string
  clientId: string
  client?: User
  professionalId: string
  professional?: User
  type: SessionType
  status: SessionStatus
  scheduledAt: Date
  startedAt?: Date | null
  endedAt?: Date | null
  duration?: number | null
  isOnline: boolean
  meetingLink?: string | null
  location?: string | null
  transcript?: string | null
  transcriptFile?: string | null
  aiAnalysis?: Record<string, unknown> | null
  aiSummary?: string | null
  aiActionItems?: Record<string, unknown>[] | null
  aiInsights?: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
}

export type MissionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type MissionType = 'THERAPY_TASK' | 'COACHING_TASK' | 'DAILY_HABIT' | 'REFLECTION' | 'ACTION'

export interface Mission {
  id: string
  sessionId?: string | null
  title: string
  description?: string | null
  type: MissionType
  status: MissionStatus
  dueDate?: Date | null
  completedAt?: Date | null
  checkIns?: Record<string, unknown>[] | null
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  userId: string
  role: 'USER' | 'ASSISTANT' | 'SYSTEM'
  content: string
  context?: Record<string, unknown> | null
  createdAt: Date
}

export interface CareMetrics {
  id: string
  lifeMapId: string
  date: Date
  professionalCareHours: number
  artificialCareMinutes: number
  selfCareMinutes: number
  therapySessions: number
  coachingSessions: number
  careTeamCheckIns: number
  purposeAlignment?: number | null
  overallWellbeing?: number | null
  createdAt: Date
}

// ═══ NEW FEATURE TYPES ═══

// Time Block for routine structure
export interface TimeBlock {
  id: string
  dayOfWeek: number // 0=Sun, 1=Mon, ..., 6=Sat
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  label: string
  category: 'morning_routine' | 'focused_work' | 'therapy' | 'coaching' | 'project_time' | 'exercise' | 'meals' | 'free_time' | 'rest' | 'study'
  color: string
  activityId?: string | null
}

export interface RoutineStructure {
  id: string
  activeDays: number[] // [1,2,3,4,5] = Mon-Fri
  wakeUpTime: string // "06:30"
  bedTime: string // "22:30"
  timeBlocks: TimeBlock[]
  version: number
}

// Activity types
export type ActivityStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' | 'BLOCKED'
export type ActivitySource = 'project' | 'routine' | 'therapy' | 'coaching' | 'free' | 'manual'

export interface Activity {
  id: string
  title: string
  description?: string | null
  status: ActivityStatus
  source: ActivitySource
  priority: 'low' | 'medium' | 'high' | 'urgent'
  projectId?: string | null
  timeBlockId?: string | null
  missionId?: string | null
  scheduledDate?: Date | null
  dueDate?: Date | null
  estimatedMinutes?: number | null
  dependsOn: string[]
  tags: string[]
  completedAt?: Date | null
  createdAt: Date
}

// Enhanced Project types
export interface ProjectMilestone {
  id: string
  projectId: string
  title: string
  dueDate?: Date | null
  isCompleted: boolean
}

export interface ProjectEnhanced extends Project {
  scope: 'personal' | 'professional'
  activities: Activity[]
  milestones: ProjectMilestone[]
  linkedMissionIds: string[]
  weeklyTimeInvested: number // minutes
  tags: string[]
}

// Feelings & Thoughts (Status do Avatar expansion)
export interface FeelingEntry {
  id: string
  feeling: string
  intensity: number // 1-5
  trigger?: string | null
  linkedEventId?: string | null
  bodyLocation?: string | null
  notes?: string | null
  timestamp: Date
}

export type ThoughtCategory = 'automatic' | 'reflective' | 'limiting' | 'empowering'

export interface ThoughtEntry {
  id: string
  thought: string
  category: ThoughtCategory
  linkedFeelingId?: string | null
  challengeResponse?: string | null
  notes?: string | null
  timestamp: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface CreateUserInput {
  email: string
  name: string
  role?: UserRole
  phone?: string
}

export interface CreateSessionInput {
  clientId: string
  professionalId: string
  type: SessionType
  scheduledAt: Date
  isOnline?: boolean
  meetingLink?: string
  location?: string
}

export interface CreateTimelineEventInput {
  lifeMapId: string
  title: string
  description?: string
  eventType: TimelineEventType
  eventDate?: Date
  ageAtEvent?: number
  impact?: number
  isPositive: boolean
  relatedPeople?: string[]
}

// Dashboard data types
export interface DashboardStats {
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  pendingMissions: number
  completedMissions: number
  averageMood: number
  averageEnergy: number
  careRatio: {
    professional: number
    artificial: number
    selfCare: number
  }
}

export interface TimelineChartData {
  date: string
  mood: number
  energy: number
  stress: number
}
