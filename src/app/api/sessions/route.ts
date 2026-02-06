import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const professionalId = searchParams.get('professionalId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const sessions = await prisma.session.findMany({
      where: {
        ...(clientId && { clientId }),
        ...(professionalId && { professionalId }),
        ...(status && { status: status as any }),
        ...(type && { type: type as any }),
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        missions: true,
      },
      orderBy: {
        scheduledAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar sessoes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clientId,
      professionalId,
      type,
      scheduledAt,
      isOnline = true,
      meetingLink,
      location,
    } = body

    if (!clientId || !professionalId || !type || !scheduledAt) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const session = await prisma.session.create({
      data: {
        clientId,
        professionalId,
        type,
        scheduledAt: new Date(scheduledAt),
        isOnline,
        meetingLink,
        location,
        status: 'SCHEDULED',
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        professional: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: session }, { status: 201 })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar sessao' },
      { status: 500 }
    )
  }
}
