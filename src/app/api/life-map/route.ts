import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId e obrigatorio' },
        { status: 400 }
      )
    }

    const lifeMap = await prisma.lifeMap.findUnique({
      where: { userId },
      include: {
        pastTimeline: {
          orderBy: { ageAtEvent: 'asc' },
        },
        familyRelations: true,
        beliefSystems: true,
        bodyHealth: true,
        mindState: true,
        identity: true,
        currentRelations: true,
        environments: true,
        routines: {
          orderBy: { version: 'desc' },
          take: 1,
        },
        purpose: true,
        projects: {
          orderBy: { createdAt: 'desc' },
        },
        okrs: {
          include: {
            keyResults: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        dailyTracking: {
          orderBy: { date: 'desc' },
          take: 30,
        },
      },
    })

    if (!lifeMap) {
      return NextResponse.json(
        { success: false, error: 'Mapa da vida nao encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: lifeMap })
  } catch (error) {
    console.error('Error fetching life map:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar mapa da vida' },
      { status: 500 }
    )
  }
}
