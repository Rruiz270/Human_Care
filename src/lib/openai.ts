import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface TranscriptAnalysis {
  summary: string
  keyInsights: string[]
  emotionalState: {
    dominant: string
    intensity: number // 1-10
  }
  actionItems: {
    title: string
    description: string
    priority: 'alta' | 'media' | 'baixa'
    type: 'THERAPY_TASK' | 'COACHING_TASK' | 'DAILY_HABIT' | 'REFLECTION' | 'ACTION'
  }[]
  topicsDiscussed: string[]
  progressIndicators: {
    area: string
    direction: 'melhorando' | 'estavel' | 'piorando'
    notes: string
  }[]
  suggestedNextSteps: string[]
  relevantPastConnections: string[]
  timelineEvents?: {
    title: string
    description: string
    eventType: string
    isPositive: boolean
    impact: number
    relatedPeople: string[]
  }[]
}

export async function analyzeTranscript(
  transcript: string,
  sessionType: string,
  clientContext?: string
): Promise<TranscriptAnalysis> {
  const systemPrompt = `Voce e um assistente especializado em analise de sessoes terapeuticas e de coaching.
Sua tarefa e analisar a transcricao de uma sessao e extrair informacoes relevantes para o acompanhamento do cliente.

Tipo de sessao: ${sessionType}
${clientContext ? `Contexto do cliente: ${clientContext}` : ''}

Analise a transcricao e retorne um JSON com a seguinte estrutura:
{
  "summary": "Resumo da sessao em 2-3 paragrafos",
  "keyInsights": ["Lista de insights importantes da sessao"],
  "emotionalState": {
    "dominant": "Estado emocional dominante",
    "intensity": 7 // 1-10
  },
  "actionItems": [
    {
      "title": "Titulo da acao",
      "description": "Descricao detalhada",
      "priority": "alta|media|baixa",
      "type": "THERAPY_TASK|COACHING_TASK|DAILY_HABIT|REFLECTION|ACTION"
    }
  ],
  "topicsDiscussed": ["Lista de topicos discutidos"],
  "progressIndicators": [
    {
      "area": "Area de progresso",
      "direction": "melhorando|estavel|piorando",
      "notes": "Observacoes"
    }
  ],
  "suggestedNextSteps": ["Proximos passos sugeridos"],
  "relevantPastConnections": ["Conexoes com eventos passados mencionados"],
  "timelineEvents": [
    {
      "title": "Evento identificado",
      "description": "Descricao do evento",
      "eventType": "ACHIEVEMENT|TRAUMA|LOSS|GAIN|MILESTONE|RELATIONSHIP|HEALTH|EDUCATION|CAREER|OTHER",
      "isPositive": true,
      "impact": 5, // 1-10
      "relatedPeople": ["Pessoas envolvidas"]
    }
  ]
}

Seja objetivo, empatico e profissional na analise.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Transcricao da sessao:\n\n${transcript}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    return JSON.parse(content) as TranscriptAnalysis
  } catch (error) {
    console.error('Error analyzing transcript:', error)
    throw error
  }
}

export interface ChatResponse {
  message: string
  suggestions?: string[]
  relatedTopics?: string[]
}

export async function chatWithAI(
  userMessage: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  userContext?: {
    lifeMapSummary?: string
    recentSessions?: string
    currentMissions?: string
    currentState?: string
  }
): Promise<ChatResponse> {
  const systemPrompt = `Voce e um assistente de cuidado e desenvolvimento pessoal chamado "Human Care AI".
Seu papel e apoiar o usuario em sua jornada de autoconhecimento e crescimento pessoal.

Voce tem acesso ao contexto do usuario para personalizar suas respostas:
${userContext?.lifeMapSummary ? `Resumo do Mapa da Vida: ${userContext.lifeMapSummary}` : ''}
${userContext?.recentSessions ? `Sessoes Recentes: ${userContext.recentSessions}` : ''}
${userContext?.currentMissions ? `Missoes Atuais: ${userContext.currentMissions}` : ''}
${userContext?.currentState ? `Estado Atual: ${userContext.currentState}` : ''}

Diretrizes:
1. Seja empatico, acolhedor e profissional
2. Ofereca perspectivas e reflexoes, nao diagnosticos
3. Incentive o autoconhecimento e a acao
4. Conecte temas atuais com o contexto historico quando relevante
5. Sugira proximos passos praticos quando apropriado
6. Lembre o usuario de suas conquistas e progresso
7. Nunca substitua aconselhamento profissional de terapeutas ou medicos
8. Responda sempre em portugues brasileiro
9. Seja conciso mas completo

Retorne um JSON com:
{
  "message": "Sua resposta ao usuario",
  "suggestions": ["Sugestoes de acoes ou reflexoes (opcional)"],
  "relatedTopics": ["Topicos relacionados que podem ser explorados (opcional)"]
}`

  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ]

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    return JSON.parse(content) as ChatResponse
  } catch (error) {
    console.error('Error in AI chat:', error)
    throw error
  }
}

export async function generateInsights(data: {
  dailyTracking: { date: string; moodScore: number; energyScore: number; stressScore: number }[]
  recentSessions: { type: string; summary: string }[]
  missions: { title: string; status: string }[]
}): Promise<{
  overallTrend: string
  keyObservations: string[]
  recommendations: string[]
  areasOfFocus: string[]
}> {
  const systemPrompt = `Voce e um analista de bem-estar e desenvolvimento pessoal.
Analise os dados fornecidos e gere insights sobre o progresso do usuario.

Dados:
- Tracking Diario (ultimos registros): ${JSON.stringify(data.dailyTracking)}
- Sessoes Recentes: ${JSON.stringify(data.recentSessions)}
- Missoes: ${JSON.stringify(data.missions)}

Retorne um JSON com:
{
  "overallTrend": "Descricao da tendencia geral",
  "keyObservations": ["Observacoes importantes"],
  "recommendations": ["Recomendacoes praticas"],
  "areasOfFocus": ["Areas que merecem atencao"]
}`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Por favor, analise os dados e gere insights.' }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating insights:', error)
    throw error
  }
}

export default openai
