'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Compass,
  Brain,
  Clock,
  Link2,
  Users,
  Target,
  Heart,
  Eye,
  Zap,
  Shield,
  BarChart3,
  Lightbulb,
  ArrowDown,
  ArrowUp,
  Cpu,
  Flag,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ContentSection = {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  presentation: string
  slides: {
    title: string
    content: string[]
    quote?: string
    keyPoints?: { label: string; text: string }[]
  }[]
}

const contentSections: ContentSection[] = [
  {
    id: 'disrupcao',
    title: 'A Disrupcao Transformacional',
    subtitle: 'O contexto que exige uma nova abordagem',
    icon: Zap,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    presentation: 'Care Results / Cuidado e Performance',
    slides: [
      {
        title: 'O Cenario',
        content: [
          'O mundo exige uma velocidade de adaptacao gigantesca. Vivemos uma disrupcao coletiva onde as ferramentas tradicionais de desenvolvimento ja nao dao conta do ritmo atual.',
        ],
        keyPoints: [
          { label: 'O Colapso', text: 'Organizacoes e sistemas estao falhando. Nao e apenas burnout; e um colapso estrutural das relacoes humanas.' },
          { label: 'Os Sintomas Visiveis', text: 'Fofoca de corredor e inseguranca. Reunioes improdutivas que drenam a vida. A exigencia de "fazer mais" esbarrando em bloqueios invisiveis.' },
          { label: 'A Realidade', text: 'Profissionais querem entregar, mas operam com um sistema operacional interno defasado para a pressao atual.' },
        ],
      },
      {
        title: 'Desenvolvimento Tradicional vs. Realidade Atual',
        content: [
          'O desenvolvimento tradicional era linear, lento e previsivel. A realidade atual e caotica, exponencial e veloz.',
        ],
        keyPoints: [
          { label: 'A Velocidade da Adaptacao', text: 'O mundo exige uma velocidade de adaptacao gigantesca nos papeis profissional, parental e humano.' },
          { label: 'O Colapso do Sistema', text: 'Tentamos rodar um novo software (alta adaptabilidade) em um hardware antigo e nao cuidado.' },
          { label: 'O Sintoma', text: 'A necessidade de "fazer mais" esbarra em limitacoes invisiveis e na deterioracao das relacoes.' },
        ],
      },
    ],
  },
  {
    id: 'sabotador',
    title: 'O Sabotador Invisivel: Trauma',
    subtitle: 'Por que todo mundo tem trauma e como ele afeta a performance',
    icon: Brain,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    presentation: 'Care Results / Cuidado e Performance',
    slides: [
      {
        title: 'A Mecanica do Bloqueio',
        content: [
          'O problema nao e falta de habilidade tecnica, e a biografia emocional. Trauma e um mecanismo de economia de energia do cerebro — uma reacao automatica a um gatilho.',
        ],
        keyPoints: [
          { label: 'A Metafora do Cafe', text: 'Derrubar cafe no computador e um problema pequeno. Mas se voce teve um pai que jogou cafe no seu rosto, a xicara e uma ameaca. O mesmo evento neutro no corporativo pode acionar uma resposta de "luta ou fuga" baseada em historias antigas.' },
          { label: 'O Custo', text: 'Quando um gatilho e ativado, a capacidade cognitiva cai. O profissional reage ao passado, nao ao presente.' },
        ],
        quote: 'Se voce continuar assumindo que esta tudo bem, vai continuar tudo mal. Sem ver o limite, a transformacao nao acontece.',
      },
      {
        title: 'A Fisiologia do Desperdicio',
        content: [
          'Como a emocao drena o cognitivo: quando acionados emocionalmente, o corpo entra em modo de sobrevivencia. O processamento cognitivo e reduzido.',
        ],
        keyPoints: [
          { label: 'O Mecanismo', text: 'Cortisol / Fight or Flight — a amigdala assume o controle. Shutdown cognitivo (neocortex dimmed).' },
          { label: 'O Custo', text: 'Emocoes intensas drenam a energia qualitativa (recuperavel apenas com sono REM).' },
          { label: 'O Ciclo Vicioso', text: 'O cerebro cria mecanismos de defesa (ironia, silencio, ataque) para economizar energia, mantendo a pessoa presa no trauma.' },
        ],
      },
      {
        title: 'Sabotagem Inconsciente nas Organizacoes',
        content: [
          'Quando a pressao aumenta e o cuidado nao existe, surgem dinamicas emocionais nao reconhecidas.',
        ],
        keyPoints: [
          { label: 'Sabotagem Inconsciente', text: 'Pessoas travam na execucao.' },
          { label: 'Atrito Relacional', text: 'Reclamacoes e falta de confianca.' },
          { label: 'Dreno de Energia', text: 'O tempo vital e consumido pelo ruido.' },
        ],
        quote: 'Muita gente nao esta consciente de que emocoes e historia pessoal podem ser um fator limitante da expressao profissional.',
      },
    ],
  },
  {
    id: 'filosofia',
    title: 'A Filosofia Life Map',
    subtitle: 'Compreender a vida para compreender a pessoa',
    icon: Compass,
    color: 'text-[#B8755C]',
    bgColor: 'bg-[#B8755C]/5',
    borderColor: 'border-[#B8755C]/20',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'MAP + MANAGER: Os Dois Pilares',
        content: [
          'O Life Map opera em dois eixos complementares que envolvem o individuo no centro.',
        ],
        keyPoints: [
          { label: 'MAP (A Navegacao)', text: 'Inventario do Passado, Direcao do Futuro, Consciencia. O componente estrategico.' },
          { label: 'MANAGER (A Gestao)', text: 'Orquestracao do Presente, Rotina, Intencionalidade. O componente tatico.' },
        ],
        quote: 'O presente e uma fabrica de passado. O modo como vivemos hoje e o material que formara a historia de amanha.',
      },
      {
        title: 'A Tese Central',
        content: [
          'Sem enxergar o limite, a transformacao nao acontece. Projetamos a culpa no sistema, no chefe ou na familia, enquanto o nucleo emocional permanece intacto.',
        ],
        quote: 'O que te limita e exatamente o que esta te limitando.',
      },
    ],
  },
  {
    id: 'componente-map',
    title: 'O Componente Map: Navegando a Nevoa de Guerra',
    subtitle: 'Ponto Zero → Ponto A → Ponto B',
    icon: Target,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    presentation: 'Care Results / Desbloqueando Potencial',
    slides: [
      {
        title: 'A Jornada: De A a B',
        content: [
          'Entre A e B existe o desconhecido. Como em um RPG, descobrimos o mapa andando. Se o caminho pela floresta esta bloqueado, precisamos voltar e equipar itens de montanha.',
        ],
        keyPoints: [
          { label: 'Ponto Zero (Origem)', text: 'O passado — de onde voce vem.' },
          { label: 'Ponto A (Presente/Inventario)', text: 'Onde voce esta agora. "You Are Here."' },
          { label: 'Ponto B (Futuro/Proposito Movel)', text: 'O futuro e uma direcao, nao um destino fixo. Ele guia a acao presente.' },
        ],
        quote: 'Objetivo: Transformar uma vida reativa em uma vida intencional.',
      },
      {
        title: 'O MAPA: Navegando do Ponto A ao Ponto B',
        content: [
          'Conectar Passado (Ponto 0), Presente (Ponto A) e Futuro (Ponto B). Revelar o terreno.',
        ],
        keyPoints: [
          { label: 'Ponto 0 a Ponto A: Consciencia', text: 'Mapear o passado explica as reacoes de hoje.' },
          { label: 'Ponto A a Ponto B: Intencionalidade', text: 'O futuro e uma direcao, nao um destino fixo. Ele guia a acao presente.' },
          { label: 'A Metafora RPG', text: 'Entre A e B existe o desconhecido (Fog of War). E preciso adaptar a rota e descobrir o mapa enquanto se caminha.' },
        ],
      },
    ],
  },
  {
    id: 'componente-manager',
    title: 'O Componente Manager: Recursos do Presente',
    subtitle: 'O menu de recursos e gestao tatica da realidade',
    icon: BarChart3,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    presentation: 'Care Results / Cuidado e Performance',
    slides: [
      {
        title: 'O Hardware Humano',
        content: [
          '"Sem corpo, nao tem mente." A consciencia depende da fisiologia.',
        ],
        keyPoints: [
          { label: 'Gestao de Necessidades', text: 'Sono, lazer, alimentacao, conexoes. Nao sao luxos, sao requisitos operacionais.' },
          { label: 'Gestao da Rotina', text: 'A distribuicao inteligente do tempo para atender as necessidades e mover-se do Ponto A ao B.' },
          { label: 'O Painel de Controle', text: 'O Manager e quem olha para a barra de energia e decide se e possivel entrar na proxima batalha ou se e preciso descansar.' },
        ],
      },
      {
        title: 'O Manager: Gestao Tatica da Realidade',
        content: [
          'O Menu do Jogo: O controle do que acontece "Agora".',
        ],
        keyPoints: [
          { label: 'Energia Fisica (70%)', text: 'Nutricao e exercicio.' },
          { label: 'Energia Sutil/Emocional (40%)', text: 'Sono e processamento emocional.' },
          { label: 'Recursos/Rotina (80%)', text: 'Distribuicao das 24h, lazer, conexao e proposito.' },
        ],
        quote: 'Funcao: Garantir combustivel suficiente para a travessia de A para B.',
      },
    ],
  },
  {
    id: 'equacao',
    title: 'A Equacao Tempo x Energia',
    subtitle: 'A fisica da performance humana',
    icon: Clock,
    color: 'text-[#1A1A1E]',
    bgColor: 'bg-[#1A1A1E]/5',
    borderColor: 'border-[#1A1A1E]/20',
    presentation: 'Care Results / Cuidado e Performance',
    slides: [
      {
        title: 'Tempo Disponivel + Energia de Qualidade = Presenca & Resultado',
        content: [
          'A formula fundamental que governa toda a performance humana.',
        ],
        keyPoints: [
          { label: 'A Moeda Universal', text: 'O Tempo e a unica coisa que todos tem em comum. E a estrutura da experiencia.' },
          { label: 'A Variavel de Qualidade', text: 'Energia. Tempo sem energia e tempo perdido. "O gold vira latao." Emocoes negativas e traumas drenam a bateria.' },
          { label: 'A Recuperacao', text: 'A energia sutil (mental/emocional) so e recuperada atraves do sono de qualidade.' },
        ],
        quote: 'Saude mental e, na pratica, a gestao eficiente da relacao tempo-energia-vida.',
      },
      {
        title: 'A Equacao da Performance',
        content: [
          'Tempo Disponivel x Qualidade de Energia = Performance Real',
        ],
        keyPoints: [
          { label: 'Alta Energia = Ouro', text: 'Potencial Realizado.' },
          { label: 'Baixa Energia = Latao', text: 'Desperdicio. Stress e modo defensivo.' },
          { label: 'O Mito da Disponibilidade', text: 'Nao adianta ter tempo e nao ter energia.' },
          { label: 'O Colapso', text: 'Burnout e o colapso da relacao Tempo-Energia-Vida.' },
        ],
      },
    ],
  },
  {
    id: 'corrente',
    title: 'O Impacto Coletivo: A Metafora da Corrente',
    subtitle: 'A forca de uma corrente e definida pelo seu elo mais fraco',
    icon: Link2,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    presentation: 'Care Results / Cuidado e Performance',
    slides: [
      {
        title: 'A Corrente e o Elo Mais Fraco',
        content: [
          '"A forca de uma corrente e definida pela forca do seu elo mais fraco."',
        ],
        keyPoints: [
          { label: 'A Forca do Coletivo', text: 'Uma organizacao e um centro de relacoes humanas. A forca de uma corrente se da pela forca do seu elo mais fraco.' },
          { label: 'O Impacto', text: 'Se um membro do time reage com medo ou agressividade (gatilho), a inteligencia coletiva da sala cai.' },
          { label: 'A Conta', text: '"Todo mundo paga essa conta com a propria vida." Projetos falhos sao o custo dos traumas nao tratados.' },
        ],
        quote: '"Quanto mais voce performar, mais eu performo." — Interdependencia.',
      },
    ],
  },
  {
    id: 'cuidado-integrado',
    title: 'A Estrutura de Cuidado Integrado',
    subtitle: 'As 3 camadas do sistema de transformacao',
    icon: Shield,
    color: 'text-[#8B9E7C]',
    bgColor: 'bg-[#8B9E7C]/10',
    borderColor: 'border-[#8B9E7C]/30',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'A Arquitetura do Cuidado',
        content: [
          'Um sistema desenhado para sustentar a transformacao com continuidade e visao ampla. Nao e uma intervencao pontual; e uma estrutura de suporte.',
        ],
        keyPoints: [
          { label: '1. Time de Cuidado (Horizontal)', text: 'Acompanhamento continuo. Walk-alongside. Seguram o contexto e integram as frentes.' },
          { label: '2. Especialistas (Verticais)', text: 'Terapia (para dentro: cura, emocoes, passado) + Coaching (para fora: visao, futuro, habilidades).' },
          { label: '3. Conselho Multidisciplinar', text: 'A Visao do Todo. Financeiro, Lideranca, Emocional — nunca deixar uma parte cuidar do todo.' },
        ],
        quote: 'Um sistema desenhado para sustentar a transformacao com seguranca e visao ampla. Garante que o individuo nunca esteja a deriva.',
      },
    ],
  },
  {
    id: 'time-cuidado',
    title: 'Camada 1: O Time de Cuidado (Horizontal)',
    subtitle: 'Hero e Guide — o acompanhamento continuo',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    presentation: 'Cuidado e Performance / Desbloqueando Potencial',
    slides: [
      {
        title: 'Funcao e Papel',
        content: [
          'Acompanhamento continuo. Eles "caminham junto".',
        ],
        keyPoints: [
          { label: 'Funcao', text: 'Acompanhamento continuo (Walk-alongside).' },
          { label: 'O Papel', text: 'Integra as frentes, prepara o terreno para os especialistas e mantem o "Life Map" atualizado.' },
          { label: 'O Registro', text: 'E quem guarda a historia e garante que o contexto nao se perca.' },
          { label: 'Integracao', text: 'O elo vital entre a Terapia e o Coaching. Seguram o contexto e integram as frentes. Eles sabem quem voce e para evitar explicacoes repetitivas.' },
        ],
      },
    ],
  },
  {
    id: 'verticais',
    title: 'Camada 2: As Verticais Simbioticas',
    subtitle: 'Terapia + Coaching = As Duas Maos',
    icon: Users,
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'As Duas Maos',
        content: [
          '"Nao se cozinha com uma mao e limpa com a outra. Usa-se as duas para tudo." O bloqueio que impede a visao de futuro geralmente esta enraizado no passado.',
        ],
        keyPoints: [
          { label: 'Terapia (Para Dentro)', text: 'Foco em emocoes, passado, traumas e cura. Vertical Para Baixo: Olhar para dentro.' },
          { label: 'Coaching (Para Fora)', text: 'Foco em visao, futuro, acao e novas habilidades. Vertical Para Cima: Olhar para fora.' },
          { label: 'A Simbiose', text: 'Voce usa ambas as maos para maxima eficiencia. Cura e Realizacao devem acontecer ao mesmo tempo.' },
        ],
      },
    ],
  },
  {
    id: 'conselho',
    title: 'Camada 3: O Conselho Multidisciplinar',
    subtitle: 'A Visao do Todo — nunca deixar uma parte cuidar do todo',
    icon: Eye,
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'A Visao do Todo',
        content: [
          'Um grupo que se responsabiliza pelo ser humano integral, nao apenas por uma disciplina isolada.',
        ],
        keyPoints: [
          { label: 'O Principio', text: '"Nunca deixar que uma parte cuide do todo; o todo cuida da parte."' },
          { label: 'A Funcao', text: 'Inteligencia coletiva que observa de longe e se responsabiliza pelo individuo como um ser integral.' },
          { label: 'Estrategia', text: 'Define rotas alternativas quando o progresso trava. Evita reducionismo e garante a integridade do processo evolutivo. Ajuste de rota quando as verticais travam.' },
        ],
      },
    ],
  },
  {
    id: 'ecossistema',
    title: 'O Ecossistema Life Map: Integracao Total',
    subtitle: 'Timeline → Self → Purpose — a visao completa',
    icon: Compass,
    color: 'text-[#B8755C]',
    bgColor: 'bg-[#B8755C]/5',
    borderColor: 'border-[#B8755C]/20',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'A Integracao Total',
        content: [
          'O diagrama completo do Life Map conecta Timeline (Passado) ao Self (Presente) ao Purpose (Futuro) atraves de multiplas dimensoes.',
        ],
        keyPoints: [
          { label: 'Timeline', text: 'Birth → Childhood → Achievements → Trauma/Losses' },
          { label: 'Self (Centro)', text: 'Body + Mind → Awareness → Relationships → Environment → Needs → Routine' },
          { label: 'Purpose (Direcao)', text: 'Projects, Dreams, Thoughts, Actions, Happenings, Markers, Feelings, Needs, Routine — todos convergem para o Proposito.' },
          { label: 'Care Directions', text: 'Terapeuta (Vertical Down), Care Team (Horizontal), Coaching (Vertical Up).' },
        ],
      },
    ],
  },
  {
    id: 'caso-estudo',
    title: 'Estudo de Caso: O Ruido da Inseguranca',
    subtitle: 'Quando a percepcao subjetiva distorce a realidade objetiva',
    icon: Lightbulb,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    presentation: 'Cuidado e Performance',
    slides: [
      {
        title: 'O Ruido da Inseguranca vs. A Realidade',
        content: [
          'Um caso real que demonstra o poder do cuidado integrado na identificacao e resolucao de bloqueios invisiveis.',
        ],
        keyPoints: [
          { label: 'O Cenario', text: 'Colaboradora sente iminencia de demissao.' },
          { label: 'A Realidade', text: 'Metas batidas, empresa saudavel.' },
          { label: 'O Diagnostico', text: 'Gatilho emocional (historico de abandono) projetado na lideranca.' },
          { label: 'Resultado da Intervencao', text: 'Identificacao do ruido economiza semanas de baixa produtividade.' },
        ],
      },
    ],
  },
  {
    id: 'ia-humanidade',
    title: 'A Nova Fronteira: IA vs. Humanidade',
    subtitle: 'Cuidado como motor de resultado — o diferencial humano',
    icon: Cpu,
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'O Futuro da Performance',
        content: [
          'A Inteligencia Artificial superara humanos em tarefas mecanicas e "coisas de robo". O que sobra e o que e estritamente humano.',
        ],
        keyPoints: [
          { label: 'O Papel da IA', text: 'Assumir o "trabalho de robo" (logica pura, processos mecanicos).' },
          { label: 'O Diferencial Humano', text: 'Empatia, relacoes complexas, maturidade emocional. A IA nao pode ser um "cuidador artificial".' },
          { label: 'A Oportunidade', text: 'O Life Map desbloqueia o humano para ocupar o espaco que a IA nao alcanca.' },
        ],
        quote: 'Cuidado nao e um beneficio de RH. E uma estrategia central de ROI. "Cuidador artificial" nao funciona; a tecnologia deve apoiar o humano, nao substitui-lo.',
      },
      {
        title: 'A Nova Tese de Mercado: Cuidado Gera Resultado',
        content: [
          'Uma redefinicao fundamental do papel do cuidado nas organizacoes.',
        ],
        keyPoints: [
          { label: 'Redefinicao', text: 'Cuidado deixa de ser "soft skill" para ser motor de performance.' },
          { label: 'Evolucao', text: '"Quanto mais voce performar, mais eu performo." A evolucao emocional do time dita o crescimento da empresa.' },
          { label: 'Urgencia', text: 'Se nao fizermos isso agora, perdemos tempo. E tempo e o unico recurso nao renovavel.' },
        ],
      },
    ],
  },
  {
    id: 'manifesto',
    title: 'Manifesto Final: A Urgencia do Agora',
    subtitle: 'Evolucao e mandatoria',
    icon: Flag,
    color: 'text-[#1A1A1E]',
    bgColor: 'bg-[#1A1A1E]/5',
    borderColor: 'border-[#1A1A1E]/15',
    presentation: 'Todas as apresentacoes',
    slides: [
      {
        title: 'A Urgencia',
        content: [
          'Onde Estamos: Em meio a disrupcao.',
          'O Que Precisamos: Desbloqueio de potencial atraves da consciencia (Map) e gestao (Manager).',
          'O Proximo Degrau: A evolucao do "eu" e a evolucao do "entorno".',
        ],
        quote: '"O que te limita e o que esta te limitando. O proximo nivel de performance exige o proximo nivel de humanidade."',
      },
      {
        title: 'Evolucao e Mandatoria',
        content: [
          'O que te limita e o que te mantem vivo. Para ir alem, precisamos da coragem de olhar para o mapa desconhecido.',
        ],
        quote: '"Para compreender uma pessoa, e preciso compreender a vida dela." — Bruno Schuarts',
      },
    ],
  },
]

const presentationIndex = [
  {
    name: 'Life Map: Care Results / Desbloqueando o Potencial Humano',
    slides: 15,
    lang: 'PT',
    description: 'Visao geral do modelo Life Map com os conceitos fundamentais.',
  },
  {
    name: 'Life Map: Cuidado e Performance',
    slides: 20,
    lang: 'PT',
    description: 'Versao corporativa aprofundada com fisiologia, estudo de caso e tese de mercado.',
  },
  {
    name: 'Life Map: Desbloqueando Potencial (v2)',
    slides: 15,
    lang: 'PT',
    description: 'Variante visual com ilustracoes estilizadas tipo blueprint.',
  },
  {
    name: 'Life Map: Desbloqueando o Potencial Humano (v3)',
    slides: 15,
    lang: 'PT',
    description: 'Terceira variante com visual mais limpo e simetrico.',
  },
  {
    name: 'Life Map: Engenharia do Potencial Humano',
    slides: 15,
    lang: 'PT',
    description: 'Angulo de engenharia — o potencial humano como sistema projetavel.',
  },
  {
    name: 'Life Map: Navigating Chaos, Unlocking Potential',
    slides: 15,
    lang: 'EN',
    description: 'English version focusing on navigating chaos and unlocking potential.',
  },
  {
    name: 'Life Map: Performance Architecture',
    slides: 15,
    lang: 'EN',
    description: 'English version with focus on performance architecture framework.',
  },
  {
    name: 'Life Map: Results',
    slides: 15,
    lang: 'EN',
    description: 'Results-oriented English presentation.',
  },
  {
    name: 'Life Map: Unlocking Human Potential',
    slides: 20,
    lang: 'EN',
    description: 'Complete English presentation — the full methodology.',
  },
]

function ContentCard({ section }: { section: ContentSection }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = section.icon

  return (
    <Card className={cn('transition-all duration-300', section.borderColor, expanded && 'ring-1 ring-[#B8755C]/30')}>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md', section.bgColor)}>
            <Icon className={cn('h-6 w-6', section.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-serif text-[#1A1A1E]">{section.title}</CardTitle>
            </div>
            <p className="mt-1 text-sm text-[#8C8580]">{section.subtitle}</p>
            <Badge variant="outline" className="mt-2 text-[10px]">
              {section.presentation}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-6 border-t border-[#8C8580]/10 pt-6">
            {section.slides.map((slide, i) => (
              <div key={i} className="space-y-4">
                <h4 className="flex items-center gap-2 text-base font-semibold text-[#1A1A1E]">
                  <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white', section.color.replace('text-', 'bg-').replace('/5', '').replace('/10', ''))}>
                    {i + 1}
                  </span>
                  {slide.title}
                </h4>

                {slide.content.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-[#3D3D3D] pl-8">
                    {p}
                  </p>
                ))}

                {slide.keyPoints && (
                  <div className="ml-8 space-y-3">
                    {slide.keyPoints.map((kp, k) => (
                      <div key={k} className={cn('rounded-md border-l-4 p-3', section.borderColor, section.bgColor)}>
                        <p className="text-sm">
                          <span className="font-semibold text-[#1A1A1E]">{kp.label}: </span>
                          <span className="text-[#3D3D3D]">{kp.text}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.quote && (
                  <blockquote className="ml-8 border-l-4 border-[#B8755C]/40 bg-[#B8755C]/5 px-4 py-3 italic text-[#1A1A1E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <p className="text-sm">{slide.quote}</p>
                  </blockquote>
                )}

                {i < section.slides.length - 1 && (
                  <hr className="ml-8 border-[#8C8580]/10" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function AdminConteudoPage() {
  const [expandAll, setExpandAll] = useState(false)
  const [activeTab, setActiveTab] = useState<'topics' | 'presentations'>('topics')

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1E]">Conteudo Life Map</h2>
          <p className="text-[#8C8580]">
            Biblioteca completa do modelo — organizada por topicos
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'topics' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('topics')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Por Topicos
          </Button>
          <Button
            variant={activeTab === 'presentations' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('presentations')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Apresentacoes
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8755C]/10">
                <BookOpen className="h-5 w-5 text-[#B8755C]" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{contentSections.length}</p>
                <p className="text-sm text-[#8C8580]">Topicos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B9E7C]/10">
                <BarChart3 className="h-5 w-5 text-[#8B9E7C]" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{presentationIndex.length}</p>
                <p className="text-sm text-[#8C8580]">Apresentacoes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Flag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{presentationIndex.filter(p => p.lang === 'PT').length}</p>
                <p className="text-sm text-[#8C8580]">Portugues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Flag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-mono font-bold text-[#1A1A1E]">{presentationIndex.filter(p => p.lang === 'EN').length}</p>
                <p className="text-sm text-[#8C8580]">English</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeTab === 'topics' && (
        <>
          {/* Expand All */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandAll(!expandAll)}
              className="text-[#8C8580]"
            >
              {expandAll ? 'Recolher Todos' : 'Expandir Todos'}
            </Button>
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            {contentSections.map((section) => (
              <ContentCard key={section.id} section={section} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'presentations' && (
        <div className="space-y-4">
          {presentationIndex.map((pres, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-[#B8755C]/10">
                    <BookOpen className="h-6 w-6 text-[#B8755C]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-semibold text-[#1A1A1E]">{pres.name}</h3>
                      <Badge variant={pres.lang === 'PT' ? 'default' : 'secondary'} className="text-[10px]">
                        {pres.lang}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-[#8C8580]">{pres.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-[#8C8580]">
                      <span className="font-mono">{pres.slides} slides</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Footer Quote */}
      <Card className="bg-[#2C2C2C] text-[#F5F0EB]">
        <CardContent className="py-8 text-center">
          <p className="text-lg italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            &ldquo;O que te limita e o que esta te limitando. O proximo nivel de performance exige o proximo nivel de humanidade.&rdquo;
          </p>
          <p className="mt-3 text-sm text-[#B8755C]">Life Map Model — Arquitetura Humana</p>
        </CardContent>
      </Card>
    </div>
  )
}
