'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Upload,
  FileText,
  Brain,
  Target,
  Sparkles,
  Plus,
  ChevronRight,
  Play,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

// Demo data
const sessions = [
  {
    id: '1',
    type: 'THERAPY',
    status: 'COMPLETED',
    professional: { name: 'Dra. Ana Costa', role: 'Psicologa' },
    scheduledAt: new Date(Date.now() - 86400000 * 7),
    duration: 60,
    isOnline: true,
    aiSummary: 'Sessao focada em trabalhar questoes relacionadas ao estresse no trabalho. Identificamos conexoes com padroes de cobranca internalizados na infancia.',
    aiActionItems: [
      { title: 'Praticar auto-compaixao', completed: true },
      { title: 'Registrar gatilhos de estresse', completed: false },
    ],
  },
  {
    id: '2',
    type: 'COACHING',
    status: 'COMPLETED',
    professional: { name: 'Carlos Mendes', role: 'Coach de Carreira' },
    scheduledAt: new Date(Date.now() - 86400000 * 3),
    duration: 45,
    isOnline: true,
    aiSummary: 'Definimos metas para o proximo trimestre e revisamos o progresso do mestrado. Alinhamento com o proposito de vida esta forte.',
    aiActionItems: [
      { title: 'Criar cronograma semanal', completed: true },
      { title: 'Pesquisar oportunidades de networking', completed: false },
    ],
  },
  {
    id: '3',
    type: 'THERAPY',
    status: 'SCHEDULED',
    professional: { name: 'Dra. Ana Costa', role: 'Psicologa' },
    scheduledAt: new Date(Date.now() + 86400000),
    duration: 60,
    isOnline: true,
  },
  {
    id: '4',
    type: 'COACHING',
    status: 'SCHEDULED',
    professional: { name: 'Carlos Mendes', role: 'Coach de Carreira' },
    scheduledAt: new Date(Date.now() + 86400000 * 4),
    duration: 45,
    isOnline: true,
  },
]

export default function SessoesPage() {
  const [activeTab, setActiveTab] = useState('todas')
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedSession, setSelectedSession] = useState<typeof sessions[0] | null>(null)

  const filteredSessions = sessions.filter((session) => {
    if (activeTab === 'todas') return true
    if (activeTab === 'agendadas') return session.status === 'SCHEDULED'
    if (activeTab === 'concluidas') return session.status === 'COMPLETED'
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001011]">Sessoes</h2>
          <p className="text-[#757780]">
            Gerencie suas sessoes de terapia, coaching e acompanhamento
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Transcricao
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload de Transcricao</DialogTitle>
                <DialogDescription>
                  Envie a transcricao de uma sessao para analise automatica da IA
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Sessao</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a sessao" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessions.filter(s => s.status === 'COMPLETED').map((session) => (
                        <SelectItem key={session.id} value={session.id}>
                          {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'} - {formatDateTime(session.scheduledAt)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Arquivo de Transcricao</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#757780]/30 border-dashed rounded-lg cursor-pointer hover:bg-[#757780]/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-[#757780] mb-2" />
                        <p className="text-sm text-[#757780]">
                          Clique para enviar ou arraste o arquivo
                        </p>
                        <p className="text-xs text-[#757780]">
                          TXT, DOC, PDF (max 10MB)
                        </p>
                      </div>
                      <input type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ou cole a transcricao</Label>
                  <Textarea
                    placeholder="Cole o texto da transcricao aqui..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowUploadDialog(false)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analisar com IA
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agendar Sessao
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Nova Sessao</DialogTitle>
                <DialogDescription>
                  Agende uma sessao com seu terapeuta ou coach
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Tipo de Sessao</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="THERAPY">Terapia</SelectItem>
                      <SelectItem value="COACHING">Coaching</SelectItem>
                      <SelectItem value="CARE_TEAM_CHECKIN">Check-in Time de Cuidado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Profissional</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dra. Ana Costa - Psicologa</SelectItem>
                      <SelectItem value="2">Carlos Mendes - Coach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Horario</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select defaultValue="online">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online (Video)</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Observacoes (opcional)</Label>
                  <Textarea placeholder="Algo que gostaria de abordar na sessao..." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowNewSessionDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowNewSessionDialog(false)}>
                  Agendar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6CCFF6]/10">
                <Calendar className="h-6 w-6 text-[#6CCFF6]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">
                  {sessions.filter(s => s.status === 'SCHEDULED').length}
                </p>
                <p className="text-sm text-[#757780]">Sessoes agendadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A4DF00]/10">
                <CheckCircle className="h-6 w-6 text-[#A4DF00]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">
                  {sessions.filter(s => s.status === 'COMPLETED').length}
                </p>
                <p className="text-sm text-[#757780]">Sessoes concluidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#001011]/10">
                <Brain className="h-6 w-6 text-[#001011]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">
                  {sessions.filter(s => s.type === 'THERAPY').length}
                </p>
                <p className="text-sm text-[#757780]">Terapia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#757780]/10">
                <Target className="h-6 w-6 text-[#757780]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">
                  {sessions.filter(s => s.type === 'COACHING').length}
                </p>
                <p className="text-sm text-[#757780]">Coaching</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
              <TabsTrigger value="concluidas">Concluidas</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-lg border border-[#757780]/20 p-4 transition-colors hover:bg-[#757780]/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        session.type === 'THERAPY'
                          ? 'bg-[#6CCFF6]/10'
                          : 'bg-[#A4DF00]/10'
                      }`}
                    >
                      {session.type === 'THERAPY' ? (
                        <Brain
                          className={`h-6 w-6 ${
                            session.type === 'THERAPY'
                              ? 'text-[#6CCFF6]'
                              : 'text-[#A4DF00]'
                          }`}
                        />
                      ) : (
                        <Target className="h-6 w-6 text-[#A4DF00]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#001011]">
                          {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'}
                        </h4>
                        <Badge
                          variant={
                            session.status === 'SCHEDULED'
                              ? 'secondary'
                              : session.status === 'COMPLETED'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {session.status === 'SCHEDULED' && 'Agendada'}
                          {session.status === 'COMPLETED' && 'Concluida'}
                          {session.status === 'CANCELLED' && 'Cancelada'}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#757780]">
                        {session.professional.name} - {session.professional.role}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#757780]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateTime(session.scheduledAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          {session.isOnline ? (
                            <>
                              <Video className="h-4 w-4" />
                              Online
                            </>
                          ) : (
                            <>
                              <MapPin className="h-4 w-4" />
                              Presencial
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {session.status === 'SCHEDULED' && (
                      <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Entrar
                      </Button>
                    )}
                    {session.status === 'COMPLETED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSession(session)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </div>

                {/* AI Summary for completed sessions */}
                {session.status === 'COMPLETED' && session.aiSummary && (
                  <div className="mt-4 rounded-lg bg-[#A4DF00]/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-[#A4DF00]" />
                      <span className="text-sm font-medium text-[#001011]">
                        Resumo da IA
                      </span>
                    </div>
                    <p className="text-sm text-[#757780]">{session.aiSummary}</p>
                    {session.aiActionItems && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-[#757780]">
                          Acoes identificadas:
                        </p>
                        {session.aiActionItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-[#A4DF00]" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-[#757780]/30" />
                            )}
                            <span
                              className={
                                item.completed
                                  ? 'text-[#757780] line-through'
                                  : 'text-[#001011]'
                              }
                            >
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {filteredSessions.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-[#757780]">Nenhuma sessao encontrada</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
