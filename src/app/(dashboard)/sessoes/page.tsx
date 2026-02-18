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
  DialogFooter,
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
  Play,
  CheckCircle,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Users,
  Scroll,
  Swords,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { CarePartyDiagram, CarePartyMember } from '@/components/ui/rpg-components'

// Demo data
const initialSessions = [
  {
    id: '1',
    type: 'THERAPY',
    status: 'COMPLETED',
    professional: { name: 'Dra. Ana Costa', role: 'Psicóloga' },
    scheduledAt: new Date(Date.now() - 86400000 * 7),
    duration: 60,
    isOnline: true,
    aiSummary: 'Sessão focada em trabalhar questões relacionadas ao estresse no trabalho. Identificamos conexões com padrões de cobrança internalizados na infância.',
    aiActionItems: [
      { title: 'Praticar auto-compaixão', completed: true },
      { title: 'Registrar gatilhos de estresse', completed: false },
    ],
    notes: 'Sessão muito produtiva. Me senti acolhida.',
    professionalNotes: 'Paciente demonstrou abertura para explorar questões do passado.',
  },
  {
    id: '2',
    type: 'COACHING',
    status: 'COMPLETED',
    professional: { name: 'Carlos Mendes', role: 'Coach de Carreira' },
    scheduledAt: new Date(Date.now() - 86400000 * 3),
    duration: 45,
    isOnline: true,
    aiSummary: 'Definimos metas para o próximo trimestre e revisamos o progresso do mestrado. Alinhamento com o propósito de vida está forte.',
    aiActionItems: [
      { title: 'Criar cronograma semanal', completed: true },
      { title: 'Pesquisar oportunidades de networking', completed: false },
    ],
    notes: '',
    professionalNotes: '',
  },
  {
    id: '3',
    type: 'THERAPY',
    status: 'SCHEDULED',
    professional: { name: 'Dra. Ana Costa', role: 'Psicóloga' },
    scheduledAt: new Date(Date.now() + 86400000),
    duration: 60,
    isOnline: true,
    notes: 'Gostaria de falar sobre ansiedade com prazos.',
    professionalNotes: '',
  },
  {
    id: '4',
    type: 'COACHING',
    status: 'SCHEDULED',
    professional: { name: 'Carlos Mendes', role: 'Coach de Carreira' },
    scheduledAt: new Date(Date.now() + 86400000 * 4),
    duration: 45,
    isOnline: true,
    notes: '',
    professionalNotes: '',
  },
]

export default function SessoesPage() {
  const [activeTab, setActiveTab] = useState('todas')
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showVideoCallDialog, setShowVideoCallDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedSession, setSelectedSession] = useState<typeof initialSessions[0] | null>(null)
  const [sessions, setSessions] = useState(initialSessions)
  const [sessionNotes, setSessionNotes] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [transcriptText, setTranscriptText] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  const filteredSessions = sessions.filter((session) => {
    if (activeTab === 'todas') return true
    if (activeTab === 'agendadas') return session.status === 'SCHEDULED'
    if (activeTab === 'concluidas') return session.status === 'COMPLETED'
    return true
  })

  const handleJoinSession = (session: typeof initialSessions[0]) => {
    setSelectedSession(session)
    setShowVideoCallDialog(true)
  }

  const handleEndCall = () => {
    setShowVideoCallDialog(false)
    setSelectedSession(null)
    setIsMuted(false)
    setIsVideoOn(true)
  }

  const handleViewDetails = (session: typeof initialSessions[0]) => {
    setSelectedSession(session)
    setSessionNotes(session.notes || '')
    setShowDetailsDialog(true)
  }

  const handleSaveNotes = () => {
    if (selectedSession) {
      setSessions(sessions.map(s =>
        s.id === selectedSession.id ? { ...s, notes: sessionNotes } : s
      ))
      setShowDetailsDialog(false)
      setSuccessMessage('Notas salvas com sucesso!')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleAnalyzeTranscript = () => {
    if (!transcriptText.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowUploadDialog(false)
      setTranscriptText('')
      setSuccessMessage('Transcrição analisada com sucesso!')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const handleScheduleSession = () => {
    setShowNewSessionDialog(false)
    setSuccessMessage('Encontro agendado com sucesso!')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-[#B8755C] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium text-sm">{successMessage}</span>
        </div>
      )}

      {/* ═══ PARTY OVERVIEW ═══ */}
      <div className="rounded-lg border border-[var(--border-architectural)] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
              <Swords className="h-6 w-6 text-[#B8755C]" />
              Encontros
            </h2>
            <p className="text-sm text-[#8C8580] mt-1">
              Conselho Multidisciplinar — Vetores de Cuidado
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Transcrição
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload de Transcrição</DialogTitle>
                  <DialogDescription>
                    Envie a transcrição para relatório de inteligência da IA
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Encontro</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o encontro" />
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
                    <Label>Arquivo</Label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#8C8580]/30 border-dashed rounded-lg cursor-pointer hover:bg-[#8C8580]/5">
                        <Upload className="h-6 w-6 text-[#8C8580] mb-1" />
                        <p className="text-xs text-[#8C8580]">Arraste ou clique</p>
                        <p className="text-[10px] text-[#8C8580]">TXT, DOC, PDF (max 10MB)</p>
                        <input type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Ou cole a transcrição</Label>
                    <Textarea
                      placeholder="Cole o texto aqui..."
                      className="min-h-[100px]"
                      value={transcriptText}
                      onChange={(e) => setTranscriptText(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancelar</Button>
                  <Button onClick={handleAnalyzeTranscript} disabled={isAnalyzing || !transcriptText.trim()}>
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analisar
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agendar Encontro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agendar Novo Encontro</DialogTitle>
                  <DialogDescription>Agende com seu terapeuta ou coach</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="THERAPY">Terapia</SelectItem>
                        <SelectItem value="COACHING">Coaching</SelectItem>
                        <SelectItem value="CARE_TEAM_CHECKIN">Check-in Care Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Profissional</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Dra. Ana Costa - Psicóloga</SelectItem>
                        <SelectItem value="2">Carlos Mendes - Coach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Data</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>Horário</Label><Input type="time" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Formato</Label>
                    <Select defaultValue="online">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online (Video)</SelectItem>
                        <SelectItem value="presencial">Presencial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preparação para o encontro (opcional)</Label>
                    <Textarea placeholder="Temas que gostaria de abordar..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewSessionDialog(false)}>Cancelar</Button>
                  <Button onClick={handleScheduleSession}>Agendar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Care Party Cross Diagram */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[200px_1fr]">
          <CarePartyDiagram />
          <div className="grid gap-2 sm:grid-cols-2">
            <CarePartyMember
              name="Dra. Ana Costa"
              role="therapist"
              roleLabel="Terapeuta ↓ DOWN"
              avatarInitials="AC"
              lastSession="10 Jan"
              nextSession="Amanhã"
            />
            <CarePartyMember
              name="Carlos Mendes"
              role="coach"
              roleLabel="Coach ↑ UP"
              avatarInitials="CM"
              lastSession="14 Jan"
              nextSession="Em 4 dias"
            />
            <CarePartyMember
              name="Equipe HC"
              role="care_team"
              roleLabel="Care Team ↔ HORIZONTAL"
              avatarInitials="HC"
            />
            <CarePartyMember
              name="Você"
              role="self"
              roleLabel="Self ● CENTER"
              avatarInitials="EU"
            />
          </div>
        </div>
      </div>

      {/* ═══ ENCOUNTER STATS ═══ */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="inventory-item flex items-center gap-3">
          <Calendar className="h-5 w-5 text-[#8B9E7C]" />
          <div>
            <p className="text-xl font-mono font-bold text-[#1A1A1E]">{sessions.filter(s => s.status === 'SCHEDULED').length}</p>
            <p className="text-[10px] font-mono text-[#8C8580]">Agendados</p>
          </div>
        </div>
        <div className="inventory-item flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-[#B8755C]" />
          <div>
            <p className="text-xl font-mono font-bold text-[#1A1A1E]">{sessions.filter(s => s.status === 'COMPLETED').length}</p>
            <p className="text-[10px] font-mono text-[#8C8580]">Concluídos</p>
          </div>
        </div>
        <div className="inventory-item flex items-center gap-3">
          <Brain className="h-5 w-5 text-[#8B9E7C]" />
          <div>
            <p className="text-xl font-mono font-bold text-[#1A1A1E]">{sessions.filter(s => s.type === 'THERAPY').length}</p>
            <p className="text-[10px] font-mono text-[#8C8580]">Terapia</p>
          </div>
        </div>
        <div className="inventory-item flex items-center gap-3">
          <Target className="h-5 w-5 text-[#B8755C]" />
          <div>
            <p className="text-xl font-mono font-bold text-[#1A1A1E]">{sessions.filter(s => s.type === 'COACHING').length}</p>
            <p className="text-[10px] font-mono text-[#8C8580]">Coaching</p>
          </div>
        </div>
      </div>

      {/* ═══ ENCOUNTER REPORTS ═══ */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas">Todos</TabsTrigger>
              <TabsTrigger value="agendadas">Agendados</TabsTrigger>
              <TabsTrigger value="concluidas">Relatórios</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`encounter-card rounded-lg border border-[#8C8580]/20 p-4 transition-colors hover:bg-[#8C8580]/5 ${
                  session.type === 'THERAPY' ? 'encounter-card-therapy' : 'encounter-card-coaching'
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    {/* Party member avatar */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-white text-xs font-bold ${
                      session.type === 'THERAPY' ? 'border-[#8B9E7C] bg-[#8B9E7C]' : 'border-[#B8755C] bg-[#B8755C]'
                    }`}>
                      {session.professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-semibold text-[#1A1A1E] text-sm">
                          {session.type === 'THERAPY' ? 'Terapia' : 'Coaching'}
                        </h4>
                        <Badge
                          variant={session.status === 'SCHEDULED' ? 'secondary' : session.status === 'COMPLETED' ? 'default' : 'destructive'}
                          className="text-[10px]"
                        >
                          {session.status === 'SCHEDULED' && 'Agendado'}
                          {session.status === 'COMPLETED' && 'Relatório Pronto'}
                          {session.status === 'CANCELLED' && 'Cancelado'}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#8C8580]">{session.professional.name} — {session.professional.role}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#8C8580]">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateTime(session.scheduledAt)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.duration} min</span>
                        <span className="flex items-center gap-1">
                          {session.isOnline ? <><Video className="h-3 w-3" />Online</> : <><MapPin className="h-3 w-3" />Presencial</>}
                        </span>
                      </div>
                      {session.notes && (
                        <div className="mt-1.5 flex items-start gap-1.5 text-xs">
                          <MessageSquare className="h-3 w-3 text-[#8B9E7C] mt-0.5" />
                          <p className="text-[#8C8580] italic line-clamp-1">{session.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {session.status === 'SCHEDULED' && (
                      <Button size="sm" onClick={() => handleJoinSession(session)}>
                        <Play className="mr-1.5 h-3.5 w-3.5" />
                        Entrar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(session)}>
                      <Scroll className="mr-1.5 h-3.5 w-3.5" />
                      {session.status === 'COMPLETED' ? 'Relatório' : 'Notas'}
                    </Button>
                  </div>
                </div>

                {/* AI Intelligence Report */}
                {session.status === 'COMPLETED' && session.aiSummary && (
                  <div className="mt-3 oracle-message p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#B8755C]" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8755C]">
                        Relatório de Inteligência
                      </span>
                    </div>
                    <p className="text-xs text-[#8C8580]">{session.aiSummary}</p>
                    {session.aiActionItems && (
                      <div className="mt-2 space-y-1">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
                          Quests recebidas:
                        </p>
                        {session.aiActionItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            {item.completed ? (
                              <span className="achievement-seal h-4 w-4 text-[8px]">✓</span>
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-[#8C8580]/30" />
                            )}
                            <span className={item.completed ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'}>
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
                <p className="text-[#8C8580]">Nenhum encontro encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Call Dialog */}
      <Dialog open={showVideoCallDialog} onOpenChange={setShowVideoCallDialog}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-[#B8755C]" />
              Encontro ao Vivo
            </DialogTitle>
            <DialogDescription>
              {selectedSession?.type === 'THERAPY' ? 'Terapia' : 'Coaching'} com {selectedSession?.professional.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 grid grid-cols-2 gap-4 py-4">
            <div className="relative bg-gradient-to-br from-[#1A1A1E] to-[#1A1A1E]/80 rounded-lg flex items-center justify-center aspect-video">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B9E7C]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-8 w-8 text-[#8B9E7C]" />
                </div>
                <p className="text-white font-medium text-sm">{selectedSession?.professional.name}</p>
                <p className="text-white/60 text-xs">{selectedSession?.professional.role}</p>
              </div>
              <Badge className="absolute top-3 left-3 bg-[#8B9E7C] text-white text-[10px]">Conectado</Badge>
            </div>
            <div className="relative bg-gradient-to-br from-[#8C8580]/50 to-[#8C8580]/30 rounded-lg flex items-center justify-center aspect-video">
              {isVideoOn ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#B8755C]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-8 w-8 text-[#B8755C]" />
                  </div>
                  <p className="text-[#1A1A1E] font-medium text-sm">Você</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-10 w-10 text-[#8C8580] mx-auto mb-1" />
                  <p className="text-[#8C8580] text-xs">Câmera desligada</p>
                </div>
              )}
              {isMuted && (
                <Badge variant="destructive" className="absolute top-3 left-3 text-[10px]">
                  <MicOff className="h-3 w-3 mr-1" />Mudo
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 py-4 border-t">
            <Button variant={isMuted ? "destructive" : "outline"} size="lg" className="rounded-full w-12 h-12" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button variant={!isVideoOn ? "destructive" : "outline"} size="lg" className="rounded-full w-12 h-12" onClick={() => setIsVideoOn(!isVideoOn)}>
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button variant="destructive" size="lg" className="rounded-full w-12 h-12" onClick={handleEndCall}>
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Relatório do Encontro</DialogTitle>
            <DialogDescription>
              {selectedSession?.type === 'THERAPY' ? 'Terapia' : 'Coaching'} com {selectedSession?.professional.name}
              {' - '}{selectedSession && formatDateTime(selectedSession.scheduledAt)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedSession?.status === 'COMPLETED' && selectedSession?.aiSummary && (
              <div className="oracle-message p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-[#B8755C]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B8755C]">Relatório de Inteligência</span>
                </div>
                <p className="text-sm text-[#8C8580]">{selectedSession.aiSummary}</p>
              </div>
            )}
            {selectedSession?.professionalNotes && (
              <div className="rounded-lg bg-[#8B9E7C]/5 border border-[#8B9E7C]/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-[#8B9E7C]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8B9E7C]">Notas do Profissional</span>
                </div>
                <p className="text-sm text-[#8C8580]">{selectedSession.professionalNotes}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="session-notes" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                <MessageSquare className="h-4 w-4 text-[#8C8580]" />
                Diário do Aventureiro
              </Label>
              <Textarea
                id="session-notes"
                placeholder="Suas anotações sobre este encontro..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-[10px] font-mono text-[#8C8580]">Notas privadas</p>
            </div>
            {selectedSession?.status === 'COMPLETED' && selectedSession?.aiActionItems && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                  <Target className="h-4 w-4 text-[#8C8580]" />
                  Quests Recebidas
                </Label>
                <div className="space-y-1.5">
                  {selectedSession.aiActionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded border border-[#8C8580]/20">
                      {item.completed ? (
                        <span className="achievement-seal h-5 w-5 text-[10px]">✓</span>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-[#8C8580]/30" />
                      )}
                      <span className={`text-sm ${item.completed ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'}`}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Cancelar</Button>
            <Button onClick={handleSaveNotes}>
              <Send className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
