'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Bell,
  Shield,
  Key,
  Upload,
  Save,
  Globe,
  Moon,
  Sun,
} from 'lucide-react'
import { useUserStore } from '@/store/user-store'
import { getInitials } from '@/lib/utils'

export default function ConfiguracoesPage() {
  const { currentUser } = useUserStore()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#001011]">Configuracoes</h2>
        <p className="text-[#757780]">
          Gerencie suas preferencias e informacoes pessoais
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList>
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificacoes
          </TabsTrigger>
          <TabsTrigger value="privacidade" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacidade
          </TabsTrigger>
        </TabsList>

        {/* Perfil Tab */}
        <TabsContent value="perfil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacoes Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informacoes de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser?.avatar || undefined} />
                  <AvatarFallback className="bg-[#6CCFF6] text-[#001011] text-xl">
                    {getInitials(currentUser?.name || 'U')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Alterar Foto
                  </Button>
                  <p className="mt-2 text-sm text-[#757780]">
                    JPG, PNG ou GIF. Max 2MB.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={currentUser?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={currentUser?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue={currentUser?.phone || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Funcao</Label>
                  <Input
                    id="role"
                    value={
                      currentUser?.role === 'ADMIN'
                        ? 'Administrador'
                        : 'Professor'
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Sobre mim</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre voce..."
                  className="min-h-[100px]"
                />
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alteracoes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Mantenha sua conta segura atualizando sua senha
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificacoes Tab */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificacao</CardTitle>
              <CardDescription>
                Escolha como deseja receber notificacoes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Lembretes de Sessao</p>
                  <p className="text-sm text-[#757780]">
                    Receber lembretes antes das sessoes agendadas
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Missoes Pendentes</p>
                  <p className="text-sm text-[#757780]">
                    Notificacoes sobre missoes proximas do prazo
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Insights da IA</p>
                  <p className="text-sm text-[#757780]">
                    Receber insights e analises personalizadas
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Lembrete Diario</p>
                  <p className="text-sm text-[#757780]">
                    Lembrete para registro de pensamentos e sentimentos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Emails de Marketing</p>
                  <p className="text-sm text-[#757780]">
                    Novidades e atualizacoes da plataforma
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacidade Tab */}
        <TabsContent value="privacidade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguranca dos Dados</CardTitle>
              <CardDescription>
                Informacoes sobre como protegemos seus dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#A4DF00]/10 p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-[#A4DF00]" />
                  <div>
                    <p className="font-medium text-[#001011]">
                      Criptografia AES-256
                    </p>
                    <p className="text-sm text-[#757780]">
                      Todos os seus dados sao criptografados em repouso e em transito
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-[#6CCFF6]/10 p-4">
                <div className="flex items-center gap-3">
                  <Key className="h-6 w-6 text-[#6CCFF6]" />
                  <div>
                    <p className="font-medium text-[#001011]">
                      Acesso Controlado
                    </p>
                    <p className="text-sm text-[#757780]">
                      Apenas profissionais autorizados podem acessar seus dados
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compartilhamento de Dados</CardTitle>
              <CardDescription>
                Controle quem pode ver suas informacoes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Terapeuta</p>
                  <p className="text-sm text-[#757780]">
                    Permitir acesso ao Mapa da Vida completo
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Coach</p>
                  <p className="text-sm text-[#757780]">
                    Permitir acesso a metas e projetos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Time de Cuidado</p>
                  <p className="text-sm text-[#757780]">
                    Permitir acesso ao acompanhamento diario
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#001011]">Analise Anonimizada</p>
                  <p className="text-sm text-[#757780]">
                    Contribuir para pesquisas de forma anonima
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar Dados</CardTitle>
              <CardDescription>
                Baixe uma copia de todos os seus dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                Solicitar Exportacao
              </Button>
              <p className="mt-2 text-sm text-[#757780]">
                Voce recebera um email com o link para download em ate 48 horas
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
              <CardDescription>
                Acoes irreversiveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">
                Excluir Minha Conta
              </Button>
              <p className="mt-2 text-sm text-[#757780]">
                Esta acao excluira permanentemente todos os seus dados
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
