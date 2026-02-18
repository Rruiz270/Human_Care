'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectCard } from '@/components/ui/rpg-components'
import type { ProjectEnhanced, ProjectMilestone, Activity } from '@/types'
import {
  Plus,
  FolderKanban,
  CheckCircle2,
  Circle,
  Clock,
  BarChart3,
  Target,
  Calendar,
} from 'lucide-react'

// Demo data
const demoProjects: ProjectEnhanced[] = [
  {
    id: 'p1',
    lifeMapId: 'lm1',
    title: 'Mestrado em Psicologia Positiva',
    description: 'Programa de mestrado focado em psicologia positiva aplicada ao bem-estar organizacional e pessoal.',
    status: 'IN_PROGRESS',
    startDate: new Date('2025-03-01'),
    targetDate: new Date('2027-06-30'),
    completedAt: null,
    progress: 45,
    category: 'Educação',
    scope: 'personal',
    activities: [],
    milestones: [
      { id: 'pm1', projectId: 'p1', title: 'Revisão bibliográfica', dueDate: new Date('2025-08-01'), isCompleted: true },
      { id: 'pm2', projectId: 'p1', title: 'Qualificação', dueDate: new Date('2026-03-01'), isCompleted: true },
      { id: 'pm3', projectId: 'p1', title: 'Coleta de dados', dueDate: new Date('2026-09-01'), isCompleted: false },
      { id: 'pm4', projectId: 'p1', title: 'Análise dos resultados', dueDate: new Date('2027-01-01'), isCompleted: false },
      { id: 'pm5', projectId: 'p1', title: 'Defesa da dissertação', dueDate: new Date('2027-06-30'), isCompleted: false },
    ],
    linkedMissionIds: ['m1', 'm2'],
    weeklyTimeInvested: 480,
    tags: ['educação', 'psicologia', 'mestrado'],
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date(),
  },
  {
    id: 'p2',
    lifeMapId: 'lm1',
    title: 'Reforma do Apartamento',
    description: 'Planejamento e execução da reforma completa do apartamento, incluindo cozinha, banheiros e sala.',
    status: 'PLANNING',
    startDate: new Date('2026-01-15'),
    targetDate: new Date('2026-07-01'),
    completedAt: null,
    progress: 10,
    category: 'Pessoal',
    scope: 'personal',
    activities: [],
    milestones: [
      { id: 'pm6', projectId: 'p2', title: 'Orçamento aprovado', dueDate: new Date('2026-02-28'), isCompleted: true },
      { id: 'pm7', projectId: 'p2', title: 'Início das obras', dueDate: new Date('2026-04-01'), isCompleted: false },
      { id: 'pm8', projectId: 'p2', title: 'Finalização', dueDate: new Date('2026-07-01'), isCompleted: false },
    ],
    linkedMissionIds: [],
    weeklyTimeInvested: 120,
    tags: ['casa', 'reforma'],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'p3',
    lifeMapId: 'lm1',
    title: 'Lançamento do Produto X',
    description: 'Desenvolvimento e lançamento de novo produto digital para o mercado educacional corporativo.',
    status: 'IN_PROGRESS',
    startDate: new Date('2025-09-01'),
    targetDate: new Date('2026-06-01'),
    completedAt: null,
    progress: 60,
    category: 'Tecnologia',
    scope: 'professional',
    activities: [],
    milestones: [
      { id: 'pm9', projectId: 'p3', title: 'MVP concluído', dueDate: new Date('2025-12-01'), isCompleted: true },
      { id: 'pm10', projectId: 'p3', title: 'Beta testing', dueDate: new Date('2026-02-01'), isCompleted: true },
      { id: 'pm11', projectId: 'p3', title: 'Ajustes pós-beta', dueDate: new Date('2026-03-15'), isCompleted: true },
      { id: 'pm12', projectId: 'p3', title: 'Marketing preparado', dueDate: new Date('2026-04-15'), isCompleted: false },
      { id: 'pm13', projectId: 'p3', title: 'Lançamento oficial', dueDate: new Date('2026-06-01'), isCompleted: false },
    ],
    linkedMissionIds: ['m3'],
    weeklyTimeInvested: 720,
    tags: ['produto', 'edtech', 'lançamento'],
    createdAt: new Date('2025-09-01'),
    updatedAt: new Date(),
  },
  {
    id: 'p4',
    lifeMapId: 'lm1',
    title: 'Programa de Bem-Estar Escolar',
    description: 'Implementação de programa de saúde mental e bem-estar para escolas da rede municipal.',
    status: 'IN_PROGRESS',
    startDate: new Date('2025-08-01'),
    targetDate: new Date('2026-12-01'),
    completedAt: null,
    progress: 30,
    category: 'Saúde',
    scope: 'personal',
    activities: [],
    milestones: [
      { id: 'pm14', projectId: 'p4', title: 'Diagnóstico inicial', dueDate: new Date('2025-10-01'), isCompleted: true },
      { id: 'pm15', projectId: 'p4', title: 'Piloto em 3 escolas', dueDate: new Date('2026-03-01'), isCompleted: false },
      { id: 'pm16', projectId: 'p4', title: 'Avaliação do piloto', dueDate: new Date('2026-06-01'), isCompleted: false },
      { id: 'pm17', projectId: 'p4', title: 'Expansão para rede', dueDate: new Date('2026-12-01'), isCompleted: false },
    ],
    linkedMissionIds: ['m4'],
    weeklyTimeInvested: 300,
    tags: ['saúde', 'educação', 'social'],
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date(),
  },
  {
    id: 'p5',
    lifeMapId: 'lm1',
    title: 'Reestruturação Financeira',
    description: 'Reorganização completa das finanças pessoais com foco em investimentos e eliminação de dívidas.',
    status: 'IN_PROGRESS',
    startDate: new Date('2026-01-01'),
    targetDate: new Date('2026-12-31'),
    completedAt: null,
    progress: 20,
    category: 'Financeiro',
    scope: 'personal',
    activities: [],
    milestones: [
      { id: 'pm18', projectId: 'p5', title: 'Mapeamento de dívidas', dueDate: new Date('2026-01-31'), isCompleted: true },
      { id: 'pm19', projectId: 'p5', title: 'Plano de pagamento', dueDate: new Date('2026-03-01'), isCompleted: false },
      { id: 'pm20', projectId: 'p5', title: 'Reserva de emergência', dueDate: new Date('2026-06-01'), isCompleted: false },
      { id: 'pm21', projectId: 'p5', title: 'Início dos investimentos', dueDate: new Date('2026-09-01'), isCompleted: false },
      { id: 'pm22', projectId: 'p5', title: 'Meta anual atingida', dueDate: new Date('2026-12-31'), isCompleted: false },
    ],
    linkedMissionIds: [],
    weeklyTimeInvested: 90,
    tags: ['finanças', 'investimentos'],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  },
]

export default function ProjetosPage() {
  const [projects, setProjects] = useState<ProjectEnhanced[]>(demoProjects)
  const [selectedScope, setSelectedScope] = useState<'all' | 'personal' | 'professional'>('all')
  const [selectedProject, setSelectedProject] = useState<ProjectEnhanced | null>(null)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    scope: 'personal' as 'personal' | 'professional',
    targetDate: '',
    milestone1: '',
    milestone2: '',
    milestone3: '',
  })

  const filteredProjects = projects.filter((p) => {
    if (selectedScope === 'all') return true
    return p.scope === selectedScope
  })

  const handleCreateProject = () => {
    const milestones: ProjectMilestone[] = [newProject.milestone1, newProject.milestone2, newProject.milestone3]
      .filter(Boolean)
      .map((title, i) => ({
        id: `new-pm-${Date.now()}-${i}`,
        projectId: `new-p-${Date.now()}`,
        title,
        dueDate: null,
        isCompleted: false,
      }))

    const project: ProjectEnhanced = {
      id: `new-p-${Date.now()}`,
      lifeMapId: 'lm1',
      title: newProject.title,
      description: newProject.description || null,
      status: 'PLANNING',
      startDate: new Date(),
      targetDate: newProject.targetDate ? new Date(newProject.targetDate) : null,
      completedAt: null,
      progress: 0,
      category: newProject.category || null,
      scope: newProject.scope,
      activities: [],
      milestones,
      linkedMissionIds: [],
      weeklyTimeInvested: 0,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProjects([project, ...projects])
    setShowNewDialog(false)
    setNewProject({ title: '', description: '', category: '', scope: 'personal', targetDate: '', milestone1: '', milestone2: '', milestone3: '' })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderKanban className="h-6 w-6 text-[#B8755C]" />
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1E]">Projetos</h2>
        </div>
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#B8755C] text-white hover:bg-[#A0634D]">
              <Plus className="mr-1.5 h-4 w-4" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">Novo Projeto</DialogTitle>
              <DialogDescription>Crie um novo projeto para acompanhar</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Nome do projeto"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Descreva o projeto..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Categoria</Label>
                  <Input
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    placeholder="Ex: Educação"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Escopo</Label>
                  <select
                    value={newProject.scope}
                    onChange={(e) => setNewProject({ ...newProject, scope: e.target.value as 'personal' | 'professional' })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="personal">Pessoal</option>
                    <option value="professional">Profissional</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Data Alvo</Label>
                <Input
                  type="date"
                  value={newProject.targetDate}
                  onChange={(e) => setNewProject({ ...newProject, targetDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Marcos Iniciais</Label>
                <div className="space-y-2 mt-1">
                  <Input
                    value={newProject.milestone1}
                    onChange={(e) => setNewProject({ ...newProject, milestone1: e.target.value })}
                    placeholder="Marco 1"
                  />
                  <Input
                    value={newProject.milestone2}
                    onChange={(e) => setNewProject({ ...newProject, milestone2: e.target.value })}
                    placeholder="Marco 2"
                  />
                  <Input
                    value={newProject.milestone3}
                    onChange={(e) => setNewProject({ ...newProject, milestone3: e.target.value })}
                    placeholder="Marco 3"
                  />
                </div>
              </div>
              <Button
                onClick={handleCreateProject}
                disabled={!newProject.title}
                className="w-full bg-[#B8755C] text-white hover:bg-[#A0634D]"
              >
                Criar Projeto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scope Tabs */}
      <Tabs value={selectedScope} onValueChange={(v) => setSelectedScope(v as typeof selectedScope)}>
        <TabsList className="bg-[#F5F0EB]">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="personal">Pessoais</TabsTrigger>
          <TabsTrigger value="professional">Profissionais</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Project Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-[#8C8580]">
          <FolderKanban className="mx-auto h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">Nenhum projeto nesta categoria</p>
        </div>
      )}

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                {/* Progress */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="#F5F0EB" strokeWidth="5" />
                      <circle
                        cx="40" cy="40" r="35" fill="none"
                        stroke="#B8755C" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 35}
                        strokeDashoffset={2 * Math.PI * 35 - (selectedProject.progress / 100) * 2 * Math.PI * 35}
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-mono font-bold text-[#1A1A1E]">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1E]">Progresso Geral</p>
                    <p className="text-xs text-[#8C8580]">
                      {Math.round(selectedProject.weeklyTimeInvested / 60)}h investidas esta semana
                    </p>
                    {selectedProject.targetDate && (
                      <p className="text-xs text-[#8C8580] mt-0.5">
                        Meta: {new Date(selectedProject.targetDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1E] flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-[#B8755C]" />
                    Marcos
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-3 rounded-md border border-[#B8755C]/10 p-2.5">
                        {milestone.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-[#8B9E7C] flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-[#8C8580] flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${milestone.isCompleted ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'}`}>
                            {milestone.title}
                          </p>
                        </div>
                        {milestone.dueDate && (
                          <span className="text-[10px] font-mono text-[#8C8580]">
                            {new Date(milestone.dueDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Invested Chart */}
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1E] flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-[#B8755C]" />
                    Tempo Investido (Últimas 4 Semanas)
                  </h4>
                  <div className="flex items-end gap-2 h-20">
                    {[65, 80, 55, selectedProject.weeklyTimeInvested / 10].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#B8755C] to-[#C4956A]"
                          style={{ height: `${Math.min(100, val)}%` }}
                        />
                        <span className="text-[9px] font-mono text-[#8C8580]">S{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#F5F0EB] text-[#8C8580]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
