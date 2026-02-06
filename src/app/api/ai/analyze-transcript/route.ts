import { NextRequest, NextResponse } from 'next/server'
import { analyzeTranscript } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, transcript, sessionType } = body

    if (!sessionId || !transcript) {
      return NextResponse.json(
        { success: false, error: 'sessionId e transcript sao obrigatorios' },
        { status: 400 }
      )
    }

    // Get session and client context
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        client: {
          include: {
            lifeMap: {
              include: {
                purpose: true,
                projects: {
                  where: { status: 'IN_PROGRESS' },
                },
              },
            },
          },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Sessao nao encontrada' },
        { status: 404 }
      )
    }

    // Build client context
    let clientContext = ''
    if (session.client.lifeMap) {
      const { purpose, projects } = session.client.lifeMap
      if (purpose) {
        clientContext += `Proposito: ${purpose.statement}\n`
      }
      if (projects.length > 0) {
        clientContext += `Projetos em andamento: ${projects.map((p: { title: string }) => p.title).join(', ')}\n`
      }
    }

    // Analyze transcript with AI
    const analysis = await analyzeTranscript(
      transcript,
      sessionType || session.type,
      clientContext
    )

    // Update session with analysis
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        transcript,
        aiAnalysis: analysis as any,
        aiSummary: analysis.summary,
        aiActionItems: analysis.actionItems as any,
        aiInsights: {
          keyInsights: analysis.keyInsights,
          emotionalState: analysis.emotionalState,
          topicsDiscussed: analysis.topicsDiscussed,
          progressIndicators: analysis.progressIndicators,
        } as any,
        status: 'COMPLETED',
      },
    })

    // Create missions from action items
    if (analysis.actionItems && analysis.actionItems.length > 0) {
      await prisma.mission.createMany({
        data: analysis.actionItems.map((item) => ({
          sessionId,
          title: item.title,
          description: item.description,
          type: item.type,
          status: 'PENDING',
        })),
      })
    }

    // Create timeline events if any were identified
    if (analysis.timelineEvents && analysis.timelineEvents.length > 0) {
      const lifeMapId = session.client.lifeMap?.id
      if (lifeMapId) {
        await prisma.timelineEvent.createMany({
          data: analysis.timelineEvents.map((event) => ({
            lifeMapId,
            title: event.title,
            description: event.description,
            eventType: event.eventType as any,
            isPositive: event.isPositive,
            impact: event.impact,
            relatedPeople: event.relatedPeople,
          })),
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        message: 'Transcricao analisada com sucesso',
      },
    })
  } catch (error) {
    console.error('Error analyzing transcript:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao analisar transcricao' },
      { status: 500 }
    )
  }
}
