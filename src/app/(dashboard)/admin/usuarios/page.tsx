'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Users,
  Plus,
  Search,
  Mail,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Shield,
  Heart,
  Brain,
  Target,
} from 'lucide-react'
import { getInitials, translations } from '@/lib/utils'

// Demo users
const users = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@escola.com',
    role: 'PROFESSOR',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 30),
    lastActive: new Date(Date.now() - 3600000),
    sessionsCount: 8,
  },
  {
    id: '2',
    name: 'Joao Santos',
    email: 'joao.santos@escola.com',
    role: 'PROFESSOR',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 45),
    lastActive: new Date(Date.now() - 86400000),
    sessionsCount: 12,
  },
  {
    id: '3',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@humancare.com',
    role: 'TERAPEUTA',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 60),
    lastActive: new Date(),
    sessionsCount: 45,
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@humancare.com',
    role: 'COACH',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 60),
    lastActive: new Date(),
    sessionsCount: 38,
  },
  {
    id: '5',
    name: 'Patricia Lima',
    email: 'patricia.lima@escola.com',
    role: 'PROFESSOR',
    isActive: false,
    createdAt: new Date(Date.now() - 86400000 * 90),
    lastActive: new Date(Date.now() - 86400000 * 15),
    sessionsCount: 3,
  },
  {
    id: '6',
    name: 'Bruno Oliveira',
    email: 'bruno.oliveira@humancare.com',
    role: 'CARE_TEAM',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 20),
    lastActive: new Date(Date.now() - 7200000),
    sessionsCount: 22,
  },
]

const roleIcons = {
  PROFESSOR: Heart,
  TERAPEUTA: Brain,
  COACH: Target,
  CARE_TEAM: Users,
  ADMIN: Shield,
}

const roleColors = {
  PROFESSOR: 'bg-[#6CCFF6]/10 text-[#6CCFF6]',
  TERAPEUTA: 'bg-purple-500/10 text-purple-500',
  COACH: 'bg-[#A4DF00]/10 text-[#A4DF00]',
  CARE_TEAM: 'bg-amber-500/10 text-amber-500',
  ADMIN: 'bg-[#001011]/10 text-[#001011]',
}

export default function AdminUsuariosPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    professors: users.filter((u) => u.role === 'PROFESSOR').length,
    professionals: users.filter((u) => ['TERAPEUTA', 'COACH', 'CARE_TEAM'].includes(u.role)).length,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001011]">Gestao de Usuarios</h2>
          <p className="text-[#757780]">
            Administre professores e profissionais da plataforma
          </p>
        </div>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Convidar Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convidar Novo Usuario</DialogTitle>
              <DialogDescription>
                Envie um convite por email para um novo usuario
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input placeholder="Nome completo" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label>Funcao</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a funcao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROFESSOR">Professor</SelectItem>
                    <SelectItem value="TERAPEUTA">Terapeuta</SelectItem>
                    <SelectItem value="COACH">Coach</SelectItem>
                    <SelectItem value="CARE_TEAM">Time de Cuidado</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowInviteDialog(false)}>
                <Mail className="mr-2 h-4 w-4" />
                Enviar Convite
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#757780]/10">
                <Users className="h-6 w-6 text-[#757780]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">{stats.total}</p>
                <p className="text-sm text-[#757780]">Total de usuarios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A4DF00]/10">
                <UserCheck className="h-6 w-6 text-[#A4DF00]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">{stats.active}</p>
                <p className="text-sm text-[#757780]">Usuarios ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6CCFF6]/10">
                <Heart className="h-6 w-6 text-[#6CCFF6]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">{stats.professors}</p>
                <p className="text-sm text-[#757780]">Professores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#001011]">{stats.professionals}</p>
                <p className="text-sm text-[#757780]">Profissionais</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#757780]" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por funcao" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funcoes</SelectItem>
                <SelectItem value="PROFESSOR">Professores</SelectItem>
                <SelectItem value="TERAPEUTA">Terapeutas</SelectItem>
                <SelectItem value="COACH">Coaches</SelectItem>
                <SelectItem value="CARE_TEAM">Time de Cuidado</SelectItem>
                <SelectItem value="ADMIN">Administradores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
              const roleColor = roleColors[user.role as keyof typeof roleColors]

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-4 rounded-lg border border-[#757780]/20 p-4"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={roleColor}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#001011]">{user.name}</h4>
                      {!user.isActive && (
                        <Badge variant="outline" className="text-red-500">
                          Inativo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#757780]">{user.email}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-[#757780]">
                      <Badge className={roleColor}>
                        <RoleIcon className="mr-1 h-3 w-3" />
                        {translations.userRole[user.role as keyof typeof translations.userRole]}
                      </Badge>
                      <span>{user.sessionsCount} sessoes</span>
                      <span>
                        Ultima atividade:{' '}
                        {user.lastActive.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowEditDialog(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}

            {filteredUsers.length === 0 && (
              <div className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-[#757780]/50" />
                <p className="mt-4 text-[#757780]">Nenhum usuario encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Altere as informacoes do usuario
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label>Funcao</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROFESSOR">Professor</SelectItem>
                    <SelectItem value="TERAPEUTA">Terapeuta</SelectItem>
                    <SelectItem value="COACH">Coach</SelectItem>
                    <SelectItem value="CARE_TEAM">Time de Cuidado</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={selectedUser.isActive ? 'active' : 'inactive'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowEditDialog(false)}>
              Salvar Alteracoes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
