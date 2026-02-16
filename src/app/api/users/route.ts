import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const isActive = searchParams.get('isActive')

    const users = await prisma.user.findMany({
      where: {
        ...(role && { role: role as any }),
        ...(isActive !== null && { isActive: isActive === 'true' }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar usuarios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, role = 'PROFESSOR', phone } = body

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Email e nome sao obrigatorios' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Usuario ja existe com este email' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
        phone,
      },
    })

    // Create LifeMap for professors
    if (role === 'PROFESSOR') {
      await prisma.lifeMap.create({
        data: {
          userId: user.id,
        },
      })
    }

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar usuario' },
      { status: 500 }
    )
  }
}
