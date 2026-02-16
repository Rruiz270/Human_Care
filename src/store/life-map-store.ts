import { create } from 'zustand';
import type {
  LifeMap,
  TimelineEvent,
  FamilyRelation,
  BeliefSystem,
  BodyHealth,
  MindState,
  Identity,
  CurrentRelation,
  Environment,
  Routine,
  Purpose,
  Project,
  OKR,
} from '../types';

// Demo life map data
const demoTimelineEvents: TimelineEvent[] = [
  {
    id: 'te-1',
    lifeMapId: 'lm-1',
    title: 'Formatura na Universidade',
    description: 'Concluiu a graduacao em Psicologia.',
    eventType: 'ACHIEVEMENT',
    ageAtEvent: 23,
    impact: 9,
    isPositive: true,
    isResolved: true,
    relatedPeople: ['Familia', 'Amigos'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'te-2',
    lifeMapId: 'lm-1',
    title: 'Perda de familiar',
    description: 'Perda do avo materno.',
    eventType: 'LOSS',
    ageAtEvent: 28,
    impact: 8,
    isPositive: false,
    isResolved: false,
    relatedPeople: ['Avo', 'Mae'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'te-3',
    lifeMapId: 'lm-1',
    title: 'Casamento',
    description: 'Casou com Joao.',
    eventType: 'MILESTONE',
    ageAtEvent: 30,
    impact: 10,
    isPositive: true,
    isResolved: true,
    relatedPeople: ['Joao'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const demoProjects: Project[] = [
  {
    id: 'proj-1',
    lifeMapId: 'lm-1',
    title: 'Especializacao em Terapia Cognitiva',
    description: 'Pos-graduacao em TCC.',
    status: 'IN_PROGRESS',
    progress: 65,
    category: 'Educacao',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-2',
    lifeMapId: 'lm-1',
    title: 'Maratona em 2026',
    description: 'Treinar e completar uma maratona.',
    status: 'PLANNING',
    progress: 20,
    category: 'Saude',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const demoLifeMap: LifeMap = {
  id: 'lm-1',
  userId: 'demo-user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  pastTimeline: demoTimelineEvents,
  familyRelations: [
    {
      id: 'fr-1',
      lifeMapId: 'lm-1',
      name: 'Ana Maria',
      relationType: 'MOTHER',
      quality: 8,
      description: 'Relacao forte e de apoio.',
      isAlive: true,
      influence: 'Grande influencia positiva na carreira.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  beliefSystems: [
    {
      id: 'bs-1',
      lifeMapId: 'lm-1',
      belief: 'Preciso ser perfeita em tudo',
      origin: 'Expectativas familiares',
      isLimiting: true,
      isWorkedOn: true,
      notes: 'Trabalhando em terapia.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  bodyHealth: {
    id: 'bh-1',
    lifeMapId: 'lm-1',
    sleepHours: 7,
    sleepQuality: 7,
    exerciseFrequency: '3x por semana',
    healthConditions: [],
    medications: [],
    energyLevel: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  mindState: {
    id: 'ms-1',
    lifeMapId: 'lm-1',
    workDescription: 'Psicologa clinica',
    workHoursPerDay: 8,
    stressLevel: 4,
    screenTimeHours: 6,
    mainWorries: ['Equilibrio trabalho-vida', 'Financas'],
    copingMechanisms: ['Meditacao', 'Exercicio', 'Terapia'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  identity: {
    id: 'id-1',
    lifeMapId: 'lm-1',
    selfDescription: 'Profissional dedicada, em busca de equilibrio.',
    values: ['Empatia', 'Crescimento', 'Familia', 'Saude'],
    strengths: ['Comunicacao', 'Escuta ativa', 'Resiliencia'],
    weaknesses: ['Perfeccionismo', 'Dificuldade em delegar'],
    lifePhilosophy: 'Crescer junto com os outros.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  purpose: {
    id: 'purp-1',
    lifeMapId: 'lm-1',
    statement: 'Ajudar pessoas a se conectarem consigo mesmas e viverem com proposito.',
    whyItMatters: 'Acredito que todos merecem uma vida com significado.',
    dreams: ['Abrir uma clinica propria', 'Escrever um livro', 'Viajar pelo mundo'],
    legacy: 'Ser lembrada como alguem que fez diferenca na vida das pessoas.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  projects: demoProjects,
  okrs: [
    {
      id: 'okr-1',
      lifeMapId: 'lm-1',
      objective: 'Melhorar qualidade de vida',
      quarter: 'Q1',
      year: 2026,
      progress: 45,
      keyResults: [
        {
          id: 'kr-1',
          okrId: 'okr-1',
          description: 'Dormir 8h por noite',
          targetValue: 8,
          currentValue: 7,
          unit: 'horas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'kr-2',
          okrId: 'okr-1',
          description: 'Exercitar 4x por semana',
          targetValue: 4,
          currentValue: 3,
          unit: 'vezes/semana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

interface LifeMapState {
  lifeMap: LifeMap | null;
  activeTab: 'past' | 'present' | 'future';
  isLoading: boolean;
  error: string | null;

  setLifeMap: (lifeMap: LifeMap | null) => void;
  setActiveTab: (tab: 'past' | 'present' | 'future') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadDemoData: () => void;
}

export const useLifeMapStore = create<LifeMapState>()((set) => ({
  lifeMap: demoLifeMap,
  activeTab: 'present',
  isLoading: false,
  error: null,

  setLifeMap: (lifeMap) => set({ lifeMap }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  loadDemoData: () => set({ lifeMap: demoLifeMap }),
}));
