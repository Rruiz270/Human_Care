'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useUserStore } from '@/store/user-store'
import { getInitials } from '@/lib/utils'
import {
  Send,
  Sparkles,
  Lightbulb,
  Heart,
  Brain,
  Target,
  RefreshCw,
  Copy,
  Check,
  Compass,
  Scroll,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
  timestamp: Date
}

const suggestedPrompts = [
  {
    icon: Heart,
    title: 'Como estou me sentindo?',
    prompt: 'Me ajude a refletir sobre como estou me sentindo hoje e o que pode estar influenciando meu estado emocional.',
  },
  {
    icon: Brain,
    title: 'Analisar padrao',
    prompt: 'Baseado no meu historico, voce consegue identificar algum padrao nos meus niveis de estresse?',
  },
  {
    icon: Target,
    title: 'Progresso nas metas',
    prompt: 'Como esta meu progresso em relacao aos meus objetivos e proposito de vida?',
  },
  {
    icon: Lightbulb,
    title: 'Sugestoes para hoje',
    prompt: 'O que voce sugere que eu faca hoje para melhorar meu bem-estar?',
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Saudacoes, aventureiro. Eu sou o Oraculo — guardiao do conhecimento do seu Mapa da Vida.

Tenho visao sobre sua jornada e posso:
- Revelar padroes ocultos nos seus sentimentos e pensamentos
- Analisar as trilhas do seu progresso
- Sugerir caminhos baseados no seu contexto
- Acompanhar seu avanco em direcao ao Ponto B

Que sabedoria busca hoje?`,
    suggestions: [
      'Quero falar sobre como me sinto hoje',
      'Analise meu progresso recente',
      'Me de dicas para reduzir estresse',
    ],
    timestamp: new Date(),
  },
]

export default function ChatAIPage() {
  const { currentUser } = useUserStore()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(messageText),
        suggestions: [
          'Conte-me mais sobre isso',
          'Quais sao os proximos passos?',
          'Como posso melhorar?',
        ],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('sentindo') || lowerInput.includes('sinto')) {
      return `Entendo que voce quer explorar seus sentimentos. Consultando os registros do seu Mapa...

**Padroes observados:**
- Seu humor tem oscilado entre 6 e 8 nos ultimos dias
- O nivel de estresse aumentou levemente no inicio da semana
- Sua energia esta estavel, mas poderia ser melhor

**Reflexao do Oraculo:**
Como voce se sente em relacao ao trabalho ultimamente? Seus registros mostram que os picos de estresse coincidem com os dias de maior carga.

Quer explorar mais esse territorio ou prefere falar sobre estrategias de combate?`
    }

    if (lowerInput.includes('progresso') || lowerInput.includes('metas')) {
      return `Consultando o Quest Log...

**Missoes Completadas:** 12 de 15 (80%) — +720 XP
**Alinhamento com Ponto B:** 78%

**Conquistas desbloqueadas:**
- Consistencia nas praticas de autocuidado
- O projeto do mestrado avanca conforme o mapa
- Encontros de terapia trazendo insights valiosos

**Atencao do Oraculo:**
- A quest "Definir metas do trimestre" ainda esta pendente
- O atributo "Exercicio Fisico" pode ser fortalecido

Gostaria de revisar algum objetivo especifico?`
    }

    if (lowerInput.includes('estresse') || lowerInput.includes('ansiedade')) {
      return `O Oraculo percebe tensao nos seus registros. Vamos trabalhar nisso.

**Diagnostico:**
- Estresse atual: 7/10 (debuff ativo)
- Gatilhos identificados: pressao no trabalho, falta de tempo
- Sono: 6.5h (abaixo do recomendado)

**Pergaminhos de cura sugeridos:**
1. **Respiracao 4-7-8**: 3 vezes ao longo do dia (+15 HP)
2. **Pausa consciente**: 5 min sem tela a cada 2h (+10 MP)
3. **Caminhada**: Movimento libera tensao (+20 Energia)

**Sabedoria antiga:**
O que costuma restaurar sua energia quando o estresse ataca? Podemos criar um plano personalizado de defesa.`
    }

    return `O Oraculo ouviu sua mensagem. Consultando o Mapa da Vida...

**Visao revelada:**
- Voce esta em uma fase de transformacao importante
- Ha conexoes entre o que vive agora e padroes do territorio passado
- Seu proposito de "transformar vidas atraves da educacao" continua como bussola apontando para o Ponto B

**Caminhos sugeridos:**
1. Continue registrando pensamentos e sentimentos (Quest Diaria)
2. Explore essa questao no proximo encontro com seu terapeuta
3. Lembre-se das conquistas recentes no seu Quest Log

Deseja que eu aprofunde em algum territorio especifico?`
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1E] flex items-center gap-2">
          <Compass className="h-7 w-7 text-[#B8755C]" />
          O Oraculo
        </h2>
        <p className="text-sm text-[#8C8580]">
          Guardiao do conhecimento — Disponivel 24/7
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Suggested Prompts - Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-[#8C8580]">
                Caminhos a explorar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.prompt)}
                  className="flex w-full items-center gap-2 rounded-md border border-[#8C8580]/20 p-2.5 text-left text-xs transition-colors hover:bg-[#B8755C]/5 hover:border-[#B8755C]/30"
                >
                  <prompt.icon className="h-3.5 w-3.5 text-[#B8755C]" />
                  <span className="text-[#1A1A1E]">{prompt.title}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="flex h-[600px] flex-col topo-bg">
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.role === 'assistant'
                            ? 'bg-[#B8755C] text-white'
                            : 'bg-[#8B9E7C] text-white'
                        }
                      >
                        {message.role === 'assistant' ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          getInitials(currentUser?.name || 'U')
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`flex max-w-[80%] flex-col gap-2 ${
                        message.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {/* Message label */}
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8580]">
                        {message.role === 'assistant' ? 'Oraculo' : 'Diario do Aventureiro'}
                      </span>

                      <div
                        className={`px-4 py-3 ${
                          message.role === 'user'
                            ? 'journal-entry rounded-2xl text-[#1A1A1E]'
                            : 'oracle-message'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                      </div>

                      {/* Actions */}
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(message.content, message.id)}
                            className="flex items-center gap-1 text-[10px] font-mono text-[#8C8580] hover:text-[#1A1A1E]"
                          >
                            {copiedId === message.id ? (
                              <><Check className="h-3 w-3" /> Copiado</>
                            ) : (
                              <><Copy className="h-3 w-3" /> Copiar</>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Suggestions as paths */}
                      {message.suggestions && message.role === 'assistant' && (
                        <div className="flex flex-wrap gap-1.5">
                          {message.suggestions.map((suggestion, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="cursor-pointer border-[#B8755C]/30 text-[#B8755C] hover:bg-[#B8755C]/10 text-[10px]"
                              onClick={() => handleSend(suggestion)}
                            >
                              <Scroll className="mr-1 h-2.5 w-2.5" />
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#B8755C] text-white">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 oracle-message px-4 py-3">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#B8755C]" />
                      <span className="text-xs font-mono text-[#8C8580]">O Oraculo consulta o mapa...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input Area */}
            <div className="border-t border-[#B8755C]/15 bg-[var(--parchment-light)] p-4">
              <div className="flex gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva no seu diario..."
                  className="min-h-[44px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="h-[44px] w-[44px] p-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-2 text-center text-[10px] font-mono text-[#8C8580]">
                O Oraculo tem acesso ao seu Mapa da Vida para oferecer visoes personalizadas
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
