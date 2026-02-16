import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      lifeMapId,
      title,
      description,
      eventType,
      eventDate,
      ageAtEvent,
      impact = 5,
      isPositive,
      relatedPeople = [],
    } = body

    if (!lifeMapId || !title || isPositive === undefined) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const event = await prisma.timelineEvent.create({
      data: {
        lifeMapId,
        title,
        description,
        eventType: eventType || 'OTHER',
        eventDate: eventDate ? new Date(eventDate) : null,
        ageAtEvent,
        impact,
        isPositive,
        relatedPeople,
      },
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error) {
    console.error('Error creating timeline event:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar evento na timeline' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do evento e obrigatorio' },
        { status: 400 }
      )
    }

    const event = await prisma.timelineEvent.update({
      where: { id },
      data: {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      },
    })

    return NextResponse.json({ success: true, data: event })
  } catch (error) {
    console.error('Error updating timeline event:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar evento' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do evento e obrigatorio' },
        { status: 400 }
      )
    }

    await prisma.timelineEvent.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Evento excluido' })
  } catch (error) {
    console.error('Error deleting timeline event:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir evento' },
      { status: 500 }
    )
  }
}
