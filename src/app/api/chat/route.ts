import { NextRequest, NextResponse } from 'next/server'
import { chatWithAI } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, message, conversationHistory = [] } = body

    if (!userId || !message) {
      return NextResponse.json(
        { success: false, error: 'userId e message são obrigatórios' },
        { status: 400 }
      )
    }

    // Get user context
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        lifeMap: {
          include: {
            purpose: true,
            dailyTracking: {
              orderBy: { date: 'desc' },
              take: 7,
            },
            projects: {
              where: { status: 'IN_PROGRESS' },
            },
          },
        },
        sessionsAsClient: {
          orderBy: { scheduledAt: 'desc' },
          take: 3,
          where: { status: 'COMPLETED' },
          select: {
            type: true,
            aiSummary: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Build user context for AI
    const userContext: {
      lifeMapSummary?: string
      recentSessions?: string
      currentMissions?: string
      currentState?: string
    } = {}

    if (user.lifeMap) {
      // Purpose summary
      if (user.lifeMap.purpose) {
        userContext.lifeMapSummary = `Propósito: ${user.lifeMap.purpose.statement}`
      }

      // Recent mood/state
      if (user.lifeMap.dailyTracking.length > 0) {
        const recentTracking = user.lifeMap.dailyTracking[0]
        userContext.currentState = `Humor recente: ${recentTracking.moodScore}/10, Energia: ${recentTracking.energyScore}/10, Estresse: ${recentTracking.stressScore}/10`
      }

      // Projects
      if (user.lifeMap.projects.length > 0) {
        userContext.currentMissions = `Projetos em andamento: ${user.lifeMap.projects.map((p: { title: string; progress: number }) => `${p.title} (${p.progress}%)`).join(', ')}`
      }
    }

    // Recent sessions
    if (user.sessionsAsClient.length > 0) {
      userContext.recentSessions = user.sessionsAsClient
        .map((s: { type: string; aiSummary: string | null }) => `${s.type}: ${s.aiSummary || 'Sem resumo'}`)
        .join('\n')
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        userId,
        role: 'USER',
        content: message,
      },
    })

    // Get AI response
    const aiResponse = await chatWithAI(message, conversationHistory, userContext)

    // Save AI response
    await prisma.chatMessage.create({
      data: {
        userId,
        role: 'ASSISTANT',
        content: aiResponse.message,
        context: {
          suggestions: aiResponse.suggestions,
          relatedTopics: aiResponse.relatedTopics,
        },
      },
    })

    // Update artificial care metrics
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (user.lifeMap) {
      await prisma.careMetrics.upsert({
        where: {
          lifeMapId_date: {
            lifeMapId: user.lifeMap.id,
            date: today,
          },
        },
        update: {
          artificialCareMinutes: {
            increment: 1,
          },
        },
        create: {
          lifeMapId: user.lifeMap.id,
          date: today,
          artificialCareMinutes: 1,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: aiResponse,
    })
  } catch (error) {
    console.error('Error in chat:', error)
    return NextResponse.json(
      { success: false, error: 'Erro no chat com IA' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId é obrigatório' },
        { status: 400 }
      )
    }

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      data: messages.reverse(),
    })
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar histórico' },
      { status: 500 }
    )
  }
}
