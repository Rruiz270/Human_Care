import OpenAI from 'openai'

// Lazy initialization to avoid build-time errors
let openaiClient: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

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
    direction: 'melhorando' | 'estável' | 'piorando'
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
  const systemPrompt = `Você é um assistente especializado em análise de sessões terapêuticas e de coaching.
Sua tarefa é analisar a transcrição de uma sessão e extrair informações relevantes para o acompanhamento do cliente.

Tipo de sessão: ${sessionType}
${clientContext ? `Contexto do cliente: ${clientContext}` : ''}

Analise a transcrição e retorne um JSON com a seguinte estrutura:
{
  "summary": "Resumo da sessão em 2-3 parágrafos",
  "keyInsights": ["Lista de insights importantes da sessão"],
  "emotionalState": {
    "dominant": "Estado emocional dominante",
    "intensity": 7 // 1-10
  },
  "actionItems": [
    {
      "title": "Título da ação",
      "description": "Descrição detalhada",
      "priority": "alta|media|baixa",
      "type": "THERAPY_TASK|COACHING_TASK|DAILY_HABIT|REFLECTION|ACTION"
    }
  ],
  "topicsDiscussed": ["Lista de tópicos discutidos"],
  "progressIndicators": [
    {
      "area": "Área de progresso",
      "direction": "melhorando|estável|piorando",
      "notes": "Observações"
    }
  ],
  "suggestedNextSteps": ["Próximos passos sugeridos"],
  "relevantPastConnections": ["Conexões com eventos passados mencionados"],
  "timelineEvents": [
    {
      "title": "Evento identificado",
      "description": "Descrição do evento",
      "eventType": "ACHIEVEMENT|TRAUMA|LOSS|GAIN|MILESTONE|RELATIONSHIP|HEALTH|EDUCATION|CAREER|OTHER",
      "isPositive": true,
      "impact": 5, // 1-10
      "relatedPeople": ["Pessoas envolvidas"]
    }
  ]
}

Seja objetivo, empático e profissional na análise.`

  try {
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Transcrição da sessão:\n\n${transcript}` }
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
  const systemPrompt = `Você é um assistente de cuidado e desenvolvimento pessoal chamado "Human Care AI".
Seu papel e apoiar o usuário em sua jornada de autoconhecimento e crescimento pessoal.

Você tem acesso ao contexto do usuário para personalizar suas respostas:
${userContext?.lifeMapSummary ? `Resumo do Mapa da Vida: ${userContext.lifeMapSummary}` : ''}
${userContext?.recentSessions ? `Sessões Recentes: ${userContext.recentSessions}` : ''}
${userContext?.currentMissions ? `Missões Atuais: ${userContext.currentMissions}` : ''}
${userContext?.currentState ? `Estado Atual: ${userContext.currentState}` : ''}

Diretrizes:
1. Seja empático, acolhedor e profissional
2. Ofereca perspectivas e reflexões, não diagnósticos
3. Incentive o autoconhecimento e a ação
4. Conecte temas atuais com o contexto histórico quando relevante
5. Sugira próximos passos práticos quando apropriado
6. Lembre o usuário de suas conquistas e progresso
7. Nunca substitua aconselhamento profissional de terapeutas ou médicos
8. Responda sempre em português brasileiro
9. Seja conciso mas completo

Retorne um JSON com:
{
  "message": "Sua resposta ao usuário",
  "suggestions": ["Sugestões de ações ou reflexões (opcional)"],
  "relatedTopics": ["Tópicos relacionados que podem ser explorados (opcional)"]
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

    const response = await getOpenAI().chat.completions.create({
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
  const systemPrompt = `Você é um analista de bem-estar e desenvolvimento pessoal.
Analise os dados fornecidos e gere insights sobre o progresso do usuário.

Dados:
- Tracking Diário (últimos registros): ${JSON.stringify(data.dailyTracking)}
- Sessões Recentes: ${JSON.stringify(data.recentSessions)}
- Missões: ${JSON.stringify(data.missions)}

Retorne um JSON com:
{
  "overallTrend": "Descrição da tendência geral",
  "keyObservations": ["Observações importantes"],
  "recommendations": ["Recomendações práticas"],
  "areasOfFocus": ["Áreas que merecem atenção"]
}`

  try {
    const response = await getOpenAI().chat.completions.create({
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

export default getOpenAI
