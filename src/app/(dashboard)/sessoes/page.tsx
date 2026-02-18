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
  ChevronRight,
  Play,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Users,
  X,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

// Demo data
const initialSessions = [
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
    notes: 'Sessao muito produtiva. Me senti acolhida.',
    professionalNotes: 'Paciente demonstrou abertura para explorar questoes do passado.',
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
    notes: '',
    professionalNotes: '',
  },
  {
    id: '3',
    type: 'THERAPY',
    status: 'SCHEDULED',
    professional: { name: 'Dra. Ana Costa', role: 'Psicologa' },
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

  // Video call state
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
        s.id === selectedSession.id
          ? { ...s, notes: sessionNotes }
          : s
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
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowUploadDialog(false)
      setTranscriptText('')
      setSuccessMessage('Transcricao analisada com sucesso!')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const handleScheduleSession = () => {
    setShowNewSessionDialog(false)
    setSuccessMessage('Sessao agendada com sucesso!')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-[#B8755C] text-[#1A1A1E] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Sessoes</h2>
          <p className="text-[#8C8580]">
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
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#8C8580]/30 border-dashed rounded-lg cursor-pointer hover:bg-[#8C8580]/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-[#8C8580] mb-2" />
                        <p className="text-sm text-[#8C8580]">
                          Clique para enviar ou arraste o arquivo
                        </p>
                        <p className="text-xs text-[#8C8580]">
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
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleAnalyzeTranscript}
                  disabled={isAnalyzing || !transcriptText.trim()}
                  className="bg-[#B8755C] text-[#1A1A1E] hover:bg-[#93c800]"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#1A1A1E] border-t-transparent" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analisar com IA
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#B8755C] text-[#1A1A1E] hover:bg-[#93c800]">
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewSessionDialog(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleScheduleSession}
                  className="bg-[#B8755C] text-[#1A1A1E] hover:bg-[#93c800]"
                >
                  Agendar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8B9E7C]/10">
                <Calendar className="h-6 w-6 text-[#8B9E7C]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1E]">
                  {sessions.filter(s => s.status === 'SCHEDULED').length}
                </p>
                <p className="text-sm text-[#8C8580]">Sessoes agendadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8755C]/10">
                <CheckCircle className="h-6 w-6 text-[#B8755C]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1E]">
                  {sessions.filter(s => s.status === 'COMPLETED').length}
                </p>
                <p className="text-sm text-[#8C8580]">Sessoes concluidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1E]/10">
                <Brain className="h-6 w-6 text-[#1A1A1E]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1E]">
                  {sessions.filter(s => s.type === 'THERAPY').length}
                </p>
                <p className="text-sm text-[#8C8580]">Terapia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8C8580]/10">
                <Target className="h-6 w-6 text-[#8C8580]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1E]">
                  {sessions.filter(s => s.type === 'COACHING').length}
                </p>
                <p className="text-sm text-[#8C8580]">Coaching</p>
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
                className="rounded-lg border border-[#8C8580]/20 p-4 transition-colors hover:bg-[#8C8580]/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        session.type === 'THERAPY'
                          ? 'bg-[#8B9E7C]/10'
                          : 'bg-[#B8755C]/10'
                      }`}
                    >
                      {session.type === 'THERAPY' ? (
                        <Brain
                          className={`h-6 w-6 ${
                            session.type === 'THERAPY'
                              ? 'text-[#8B9E7C]'
                              : 'text-[#B8755C]'
                          }`}
                        />
                      ) : (
                        <Target className="h-6 w-6 text-[#B8755C]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#1A1A1E]">
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
                      <p className="text-sm text-[#8C8580]">
                        {session.professional.name} - {session.professional.role}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#8C8580]">
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
                      {/* Session notes preview */}
                      {session.notes && (
                        <div className="mt-2 flex items-start gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-[#8B9E7C] mt-0.5" />
                          <p className="text-[#8C8580] italic line-clamp-1">{session.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {session.status === 'SCHEDULED' && (
                      <Button
                        size="sm"
                        onClick={() => handleJoinSession(session)}
                        className="bg-[#B8755C] text-[#1A1A1E] hover:bg-[#93c800]"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Entrar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(session)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {session.status === 'COMPLETED' ? 'Ver Detalhes' : 'Notas'}
                    </Button>
                  </div>
                </div>

                {/* AI Summary for completed sessions */}
                {session.status === 'COMPLETED' && session.aiSummary && (
                  <div className="mt-4 rounded-lg bg-[#B8755C]/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-[#B8755C]" />
                      <span className="text-sm font-medium text-[#1A1A1E]">
                        Resumo da IA
                      </span>
                    </div>
                    <p className="text-sm text-[#8C8580]">{session.aiSummary}</p>
                    {session.aiActionItems && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-[#8C8580]">
                          Acoes identificadas:
                        </p>
                        {session.aiActionItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-[#B8755C]" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-[#8C8580]/30" />
                            )}
                            <span
                              className={
                                item.completed
                                  ? 'text-[#8C8580] line-through'
                                  : 'text-[#1A1A1E]'
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
                <p className="text-[#8C8580]">Nenhuma sessao encontrada</p>
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
              Sessao ao Vivo
            </DialogTitle>
            <DialogDescription>
              {selectedSession?.type === 'THERAPY' ? 'Terapia' : 'Coaching'} com {selectedSession?.professional.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 grid grid-cols-2 gap-4 py-4">
            {/* Professional video */}
            <div className="relative bg-gradient-to-br from-[#1A1A1E] to-[#1A1A1E]/80 rounded-lg flex items-center justify-center aspect-video">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#8B9E7C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-10 w-10 text-[#8B9E7C]" />
                </div>
                <p className="text-white font-medium">{selectedSession?.professional.name}</p>
                <p className="text-white/60 text-sm">{selectedSession?.professional.role}</p>
              </div>
              <Badge className="absolute top-3 left-3 bg-[#B8755C] text-[#1A1A1E]">
                Conectado
              </Badge>
            </div>

            {/* User video */}
            <div className="relative bg-gradient-to-br from-[#8C8580]/50 to-[#8C8580]/30 rounded-lg flex items-center justify-center aspect-video">
              {isVideoOn ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#B8755C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-10 w-10 text-[#B8755C]" />
                  </div>
                  <p className="text-[#1A1A1E] font-medium">Voce</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-12 w-12 text-[#8C8580] mx-auto mb-2" />
                  <p className="text-[#8C8580]">Camera desligada</p>
                </div>
              )}
              {isMuted && (
                <Badge variant="destructive" className="absolute top-3 left-3">
                  <MicOff className="h-3 w-3 mr-1" />
                  Mudo
                </Badge>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 py-4 border-t">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Button
              variant={!isVideoOn ? "destructive" : "outline"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Details/Notes Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Sessao</DialogTitle>
            <DialogDescription>
              {selectedSession?.type === 'THERAPY' ? 'Terapia' : 'Coaching'} com {selectedSession?.professional.name}
              {' - '}{selectedSession && formatDateTime(selectedSession.scheduledAt)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* AI Summary if completed */}
            {selectedSession?.status === 'COMPLETED' && selectedSession?.aiSummary && (
              <div className="rounded-lg bg-[#B8755C]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-[#B8755C]" />
                  <span className="text-sm font-medium text-[#1A1A1E]">Resumo da IA</span>
                </div>
                <p className="text-sm text-[#8C8580]">{selectedSession.aiSummary}</p>
              </div>
            )}

            {/* Professional notes if any */}
            {selectedSession?.professionalNotes && (
              <div className="rounded-lg bg-[#8B9E7C]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-[#8B9E7C]" />
                  <span className="text-sm font-medium text-[#1A1A1E]">
                    Notas do Profissional
                  </span>
                </div>
                <p className="text-sm text-[#8C8580]">{selectedSession.professionalNotes}</p>
              </div>
            )}

            {/* User notes */}
            <div className="space-y-2">
              <Label htmlFor="session-notes" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#8C8580]" />
                Minhas Anotacoes
              </Label>
              <Textarea
                id="session-notes"
                placeholder="Escreva suas anotacoes sobre esta sessao..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-xs text-[#8C8580]">
                Estas anotacoes sao privadas e apenas voce pode ve-las.
              </p>
            </div>

            {/* Action items if completed */}
            {selectedSession?.status === 'COMPLETED' && selectedSession?.aiActionItems && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#8C8580]" />
                  Acoes Identificadas
                </Label>
                <div className="space-y-2">
                  {selectedSession.aiActionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded border border-[#8C8580]/20">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-[#B8755C]" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-[#8C8580]/30" />
                      )}
                      <span className={item.completed ? 'text-[#8C8580] line-through' : 'text-[#1A1A1E]'}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveNotes}
              className="bg-[#B8755C] text-[#1A1A1E] hover:bg-[#93c800]"
            >
              <Send className="mr-2 h-4 w-4" />
              Salvar Notas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
