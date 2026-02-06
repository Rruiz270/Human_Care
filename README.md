# Human Care

Plataforma holistica de cuidado e desenvolvimento pessoal para professores.

![Human Care](https://img.shields.io/badge/Better%20Tech-Human%20Care-A4DF00)

## Sobre

Human Care e uma plataforma que integra o "Mapa da Vida" - um modelo terapeutico centrado em tres eixos temporais (passado, presente e futuro) - com uma equipe multidisciplinar de cuidado (terapeuta, coach e time de cuidado) e tecnologia de IA para suporte continuo.

### Funcionalidades

- **Mapa da Vida**: Mapeamento completo de passado, presente e futuro
- **Timeline Visual**: Eventos positivos e negativos ao longo da vida
- **Sessoes**: Agendamento e acompanhamento de sessoes com profissionais
- **Analise de Transcricoes**: IA analisa transcricoes de sessoes automaticamente
- **Chat AI 24/7**: Assistente de cuidado pessoal disponivel a qualquer momento
- **Missoes**: Tarefas e habitos para evolucao pessoal
- **Metricas**: Acompanhamento de progresso e ratio de cuidado
- **Dashboard**: Visao geral do bem-estar e proximos passos

### Equipe de Cuidado

- **Terapeuta**: Remove bloqueios do passado (traumas, crencas)
- **Coach**: Pavimenta o caminho futuro (objetivos, metas)
- **Time de Cuidado**: Acompanha no presente (rotina, habitos)

### Tipos de Cuidado

- **Cuidado Profissional**: Sessoes com terapeutas e coaches
- **Cuidado Artificial**: Suporte da IA 24/7
- **Autocuidado**: Praticas e reflexoes pessoais

## Tecnologias

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-4 para analise de transcricoes e chat
- **UI**: Componentes customizados inspirados em shadcn/ui

## Cores Better Tech

| Cor | Hex | Nome |
|-----|-----|------|
| 🔵 | #6CCFF6 | Pale Azure |
| ⬛ | #001011 | Rich Black |
| ⬜ | #757780 | Gray |
| ⚪ | #FFFFFC | Baby Powder |
| 🟢 | #A4DF00 | Yellow Green |

## Instalacao

1. Clone o repositorio:
\`\`\`bash
git clone https://github.com/Rruiz270/Human_Care.git
cd Human_Care
\`\`\`

2. Instale as dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configure as variaveis de ambiente:
\`\`\`bash
cp .env.example .env
# Edite .env com suas configuracoes
\`\`\`

4. Execute as migrations do banco:
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

6. Acesse http://localhost:3000

## Estrutura do Projeto

\`\`\`
human-care/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # Paginas do dashboard
│   │   │   ├── mapa-da-vida/   # Mapa da Vida
│   │   │   ├── sessoes/        # Gestao de sessoes
│   │   │   ├── chat-ai/        # Chat com IA
│   │   │   ├── missoes/        # Tarefas e habitos
│   │   │   ├── metricas/       # Analises e graficos
│   │   │   └── agenda/         # Calendario
│   │   └── api/                # API Routes
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes de UI
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utilitarios
│   │   ├── prisma.ts           # Cliente Prisma
│   │   ├── openai.ts           # Integracao OpenAI
│   │   └── utils.ts            # Funcoes utilitarias
│   ├── store/                  # Estado global (Zustand)
│   ├── hooks/                  # Custom hooks
│   └── types/                  # TypeScript types
└── prisma/
    └── schema.prisma           # Schema do banco
\`\`\`

## Seguranca

- Dados protegidos com criptografia AES-256
- Acesso controlado por funcao
- Comunicacao HTTPS
- Tokens seguros para autenticacao

## Licenca

Propriedade de Better Tech. Todos os direitos reservados.

---

Desenvolvido com ❤️ por Better Tech
