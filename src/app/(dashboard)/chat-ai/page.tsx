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
    content: `Ola! Sou seu assistente de cuidado pessoal. Estou aqui para ajudar voce na sua jornada de autoconhecimento e desenvolvimento.

Tenho acesso ao seu Mapa da Vida e posso:
- Ajudar voce a refletir sobre seus sentimentos e pensamentos
- Analisar padroes no seu bem-estar
- Sugerir acoes praticas baseadas no seu contexto
- Acompanhar seu progresso em relacao ao seu proposito

Como posso ajudar voce hoje?`,
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

    // Simulate AI response
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
      return `Entendo que voce quer explorar seus sentimentos. Baseado nos seus registros recentes, percebi que:

**Padroes observados:**
- Seu humor tem oscilado entre 6 e 8 nos ultimos dias
- O nivel de estresse aumentou levemente no inicio da semana
- Sua energia esta estavel, mas poderia ser melhor

**Reflexao:**
Como voce se sente em relacao ao trabalho ultimamente? Seus registros mostram que os picos de estresse coincidem com os dias de maior carga de trabalho.

Quer explorar mais esse assunto ou prefere falar sobre estrategias para lidar com isso?`
    }

    if (lowerInput.includes('progresso') || lowerInput.includes('metas')) {
      return `Vamos analisar seu progresso:

**Missoes Concluidas:** 12 de 15 (80%)
**OKRs do Trimestre:** 45% concluido

**Destaques positivos:**
- Voce tem mantido consistencia nas praticas de autocuidado
- O projeto do mestrado esta avancando conforme planejado
- Suas sessoes de terapia estao trazendo insights valiosos

**Areas de atencao:**
- A missao "Definir metas do trimestre" ainda esta pendente
- O exercicio fisico pode ser intensificado

Gostaria de revisar algum objetivo especifico ou definir novas metas?`
    }

    if (lowerInput.includes('estresse') || lowerInput.includes('ansiedade')) {
      return `Percebi que o estresse e uma preocupacao sua. Vamos trabalhar nisso juntos.

**Analise do seu contexto:**
- Nivel de estresse atual: 7/10 (acima do ideal)
- Principais gatilhos identificados: pressao no trabalho, falta de tempo
- Horas de sono: 6.5h (recomendado: 7-8h)

**Sugestoes praticas para hoje:**
1. **Respiracao 4-7-8**: Pratique 3 vezes ao longo do dia
2. **Pausa consciente**: 5 minutos sem tela a cada 2 horas
3. **Caminhada**: Mesmo que curta, movimento ajuda a liberar tensao

**Reflexao:**
O que costuma te ajudar mais quando voce sente estresse? Podemos criar um plano personalizado.`
    }

    return `Obrigado por compartilhar isso comigo. Baseado no seu Mapa da Vida e historico:

**O que observo:**
- Voce esta em uma fase de transformacao importante
- Ha conexoes entre o que voce esta vivendo e alguns padroes do passado
- Seu proposito de "transformar vidas atraves da educacao" continua sendo sua bussola

**Minhas sugestoes:**
1. Continue registrando seus pensamentos e sentimentos diariamente
2. Explore essa questao na proxima sessao com seu terapeuta
3. Lembre-se das suas conquistas recentes

Quer que eu aprofunde em algum aspecto especifico?`
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Chat com IA</h2>
        <p className="text-[#8C8580]">
          Seu assistente de cuidado e desenvolvimento pessoal 24/7
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Suggested Prompts - Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Sugestoes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt.prompt)}
                  className="flex w-full items-center gap-2 rounded-md border border-[#8C8580]/20 p-3 text-left text-sm transition-colors hover:bg-[#8C8580]/5"
                >
                  <prompt.icon className="h-4 w-4 text-[#8B9E7C]" />
                  <span className="text-[#1A1A1E]">{prompt.title}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="flex h-[600px] flex-col">
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
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
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-[#8C8580]/20 text-[#1A1A1E]'
                            : 'border-l-3 border-l-[#B8755C] bg-[#F5F0EB] text-[#1A1A1E]'
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
                            className="flex items-center gap-1 text-xs text-[#8C8580] hover:text-[#1A1A1E]"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="h-3 w-3" />
                                Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Copiar
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.role === 'assistant' && (
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="cursor-pointer border-[#8B9E7C]/40 text-[#8B9E7C] hover:bg-[#8B9E7C]/10"
                              onClick={() => handleSend(suggestion)}
                            >
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
                    <div className="flex items-center gap-2 rounded-2xl bg-[#8C8580]/10 px-4 py-3">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#8C8580]" />
                      <span className="text-sm text-[#8C8580]">Pensando...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input Area */}
            <div className="border-t border-[#8C8580]/20 p-4">
              <div className="flex gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
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
              <p className="mt-2 text-center text-xs text-[#8C8580]">
                A IA tem acesso ao seu Mapa da Vida para oferecer respostas personalizadas
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
