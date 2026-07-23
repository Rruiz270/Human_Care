# Human Care

Plataforma holística de cuidado e desenvolvimento pessoal para professores, integrando o modelo terapêutico "Mapa da Vida" (passado/presente/futuro), uma equipe multidisciplinar de cuidado (terapeuta, coach, time de cuidado) e IA para suporte contínuo (chat 24/7 e análise de transcrições de sessões).

## Stack

- **Linguagem**: TypeScript (strict) + React 19
- **Framework**: Next.js 16.1.6 (App Router). Nota: o README menciona Next 14, mas o `package.json` fixa **16.1.6** — vale a versão do `package.json`.
- **Estilo**: Tailwind CSS v4 (via `@tailwindcss/postcss`), componentes Radix UI (estilo shadcn), lucide-react, recharts, tailwind-merge
- **Estado/forms**: zustand 5, react-hook-form + zod 4, date-fns
- **Banco**: PostgreSQL via **Prisma ORM 5.22** (`prisma/schema.prisma`)
- **IA**: SDK `openai` 6 (análise de transcrições e chat)
- **Deploy**: Vercel (App Router; sem `vercel.json`, config padrão)
- **Package manager**: npm (`package-lock.json`)
- **Mobile**: app Expo/React Native separado em `mobile/` (Expo ~54, React Navigation 7, TanStack Query, Skia) — projeto próprio, com seu próprio `package.json`/lockfile.

## Comandos

Web (raiz):

```bash
npm install        # instala deps (dispara postinstall: prisma generate)
npm run dev        # dev server (localhost:3000)
npm run build      # prisma generate && next build
npm run start      # produção
npm run lint       # eslint
npx prisma migrate dev   # aplicar/gerar migrations (PostgreSQL)
npx prisma studio        # inspecionar o banco
```

Mobile (`cd mobile`): `npm start` (expo) | `npm run ios` | `npm run android` | `npm run web`. Não há suíte de testes configurada em nenhum dos projetos.

## Estrutura

- `src/app/` — App Router
  - `(dashboard)/` — área logada: `mapa-da-vida/`, `sessoes/`, `agenda/`, `chat-ai/`, `missoes/`, `atividades/`, `rotina/`, `metricas/`, `projetos/`, `conteudo/`, `admin/`, `configuracoes/` + `layout.tsx`/`page.tsx`
  - `api/` — route handlers: `chat/`, `life-map/`, `sessions/`, `ai/`, `users/`
  - `layout.tsx`, `globals.css`
- `src/components/` — `ui/` (primitivos) + `layout/`
- `src/lib/` — `prisma.ts` (client singleton), `openai.ts` (integração IA), `utils.ts`
- `src/hooks/`, `src/store/` (zustand), `src/types/`
- `prisma/schema.prisma` — modelos (User com papéis `ADMIN`/`PROFESSOR`/`TERAPEUTA`/`COACH`/`CARE_TEAM`, LifeMap, Session, Invite, Note, ChatMessage, CareTeamAssignment…)
- `mobile/` — app Expo separado

## Convenções de código

- TypeScript `strict`. ESLint via `eslint-config-next` (flat config em `eslint.config.mjs`).
- Componentes Radix + Tailwind v4 (padrão shadcn); use `tailwind-merge`/`clsx` para composição de classes.
- Acessar o banco sempre pelo singleton em `src/lib/prisma.ts` (evita múltiplas conexões em dev).
- Validação de entrada com `zod`.

## Variáveis de ambiente

Não há `.env.example` no repo — criar `.env.local` (web) com, no mínimo (NUNCA commitar valores):

- `DATABASE_URL` — conexão PostgreSQL (exigida por `prisma/schema.prisma`)
- `OPENAI_API_KEY` — usada em `src/lib/openai.ts` / rotas de IA

Em produção, configurar essas variáveis no painel da Vercel. O app mobile pode precisar de vars `EXPO_PUBLIC_*` apontando para a API — definir conforme a integração.

## CI/CD & Deploy

- **Deploy**: Vercel com auto-deploy da `main` (convenção do stack). Garantir que `DATABASE_URL` e `OPENAI_API_KEY` estão configuradas no projeto Vercel; o build roda `prisma generate` automaticamente.
- **CI**: não há workflows em `.github/workflows/`. Recomendação em PR — workflow mínimo:
  1. `npm ci`
  2. `npx prisma generate`
  3. `npm run lint`
  4. `npx tsc --noEmit`
  5. `npm run build`

## Boas práticas de PR

- Branches `feat/…`, `fix/…`, `chore/…`; Conventional Commits.
- PRs pequenos. Checklist:
  - [ ] `npm run build` passa (inclui `prisma generate`)
  - [ ] `npm run lint` e `tsc --noEmit` sem erros
  - [ ] Nenhum segredo/`.env.local` commitado
  - [ ] Screenshots para mudanças de UI
  - [ ] **Migrations Prisma** incluídas e com plano de rollback; nunca editar migrations já aplicadas
- ≥1 review; **squash merge**; `main` sempre deployável.

## Testes

Não há testes automatizados. Recomendação proporcional: Vitest + Testing Library para componentes de `ui/` e helpers de `lib/`; testes de integração para os route handlers de `api/` (especialmente `ai/` e `chat/`, mockando o SDK OpenAI).

## Segurança & dados

- **Dados extremamente sensíveis (saúde/LGPD)**: Mapa da Vida, transcrições de sessões terapêuticas, chat, notas clínicas. Tratar como dado sensível de saúde — consentimento explícito, criptografia, acesso estrito por papel, retenção mínima, sem PII em logs.
- **Transcrições enviadas à OpenAI**: garantir base legal, anonimização quando possível e ciência do usuário de que a IA processa o conteúdo.
- Nunca commitar `.env.local`, `DATABASE_URL` ou `OPENAI_API_KEY`.
- Respeitar o RBAC do schema (papéis de profissional vs. professor) em todas as rotas de API.
- `npm audit` periódico (web e mobile).

## Gotchas

- **Versão do Next**: README diz 14, `package.json` diz **16.1.6** (React 19). Siga o `package.json`.
- `prisma generate` roda em `postinstall` e no `build` — se faltar `DATABASE_URL` o build/local pode falhar ao conectar; para só gerar o client basta o schema, mas migrations exigem o banco.
- Rotas de grupo `(dashboard)` não afetam a URL (route group) — não confundir com segmento de path.
- O app `mobile/` é um projeto Expo independente: `cd mobile` antes de instalar/rodar; não misturar suas deps com as da web.
- Tailwind v4 usa o plugin `@tailwindcss/postcss` (config diferente do Tailwind 3) — cuidado ao portar CSS/config de outros repos.
