---
name: "Decisions Log"
description: Auto-generated frontmatter retrofit
type: decision-log
status: active
date: 2026-04-20
tags: [decision-log, content]
related:
  - "[[Content/_index]]"
---

# Decisions Log

## 20/04/2026 — Criação de Perfis de Fornecedor (Glanbia e Creapure)

**Decisão:** Centralizar informações corporativas e técnicas sobre parceiros de matéria-prima em arquivos dedicados. Foi criada a subpasta `Brand/suppliers/` para abrigar esses perfis, garantindo que o vault suporte inteligência de supply chain de forma estruturada.

**Arquivos criados/atualizados:**
- `Brand/suppliers/glanbia.md` — Perfil corporativo completo.
- `Brand/suppliers/creapure.md` — Perfil corporativo completo.
- `System/taxonomy.md` — Registrada a regra de roteamento para `Brand/suppliers/`.
- `System/ids.md` — WikiLinks disparados para os novos perfis a partir do dicionário de IDs.

**Motivo:** O usuário solicitou documentação perene sobre as empresas fornecedoras para referência futura. A granularidade permite que se referencie a "empresa" Glanbia separadamente do "ingrediente" Whey, mantendo a integridade do protocolo Jarvis.

---

## 20/04/2026 — Atualização de Inteligência de Origem (Glanbia/EUA e Creapure/Alemanha)

**Decisão:** Atualizar o vault com dados precisos sobre os fornecedores de matéria-prima. A empresa Glanbia (Irlanda) realiza a filtragem/origem da proteína nos **EUA**. A creatina é fornecida pela marca **Creapure** (Alemanha).

**Arquivos atualizados:**
- `System/ids.md` — Renomeado ID `creatine-de` para `creapure`; atualizado `glanbia` com origem EUA.
- `CONTEXT.md` — Atualizado insight estratégico sobre a origem da proteína Glanbia.
- `Brand/brand-core.md` / `Brand/ingredient-reference.md` — Atualizadas tabelas de origem e referências técnicas.
- `Brand/product-catalog.md` — Atualizadas fichas técnicas de Whey e Creatina.
- `Content/campaign-01-origem-performance.md` — Atualizados Reels, mensagens e keywords para destacar Creapure e USA.

**Motivo:** Novos dados fornecidos pelo usuário via áudio. A precisão na origem é o pilar central da Campanha 01 ("De Onde Vem a Sua Performance?"), permitindo hooks mais específicos e maior autoridade técnica.

---

## 20/04/2026 — Classificação e Assimilação de Daily Intel Reports (Resolução Issue 014)

**Decisão:** Os relatórios diários de inteligência (`intel-report`) gerados automaticamente não serão armazenados como arquivos individuais permanentes. Em vez disso, seu conteúdo é "assimilado" (distribuído) aos perfis correspondentes (`Research/competitors/<marca>.md`) e ao arquivo central de tendências (`Research/trends.md`), sendo a fonte bruta arquivada.

**Arquivos atualizados:**
- `Research/competitors/growth-supplements.md` — adicionadas notícias da marca sob "Atividade Recente".
- `Research/competitors/max-titanium.md` — adicionadas notícias da marca sob "Atividade Recente".
- `Research/trends.md` — adicionada notícia de regulação (ANVISA) na trilha do monitoramento.
- `Content/issues-log.md` — Issue 014 classificada como Corrigido.

**Motivo:** Usuário definiu verbalmente (áudio) que a novidade deve ser acoplada à estrutura existente. Isso mantém o conceito de que o Vault não é um feed de notícias, mas uma base de conhecimento atrelada a entidades canônicas.

---

## 20/04/2026 — Integração de Merchandising/Acessórios no Dicionário Canônico

**Decisão:** Expandir o dicionário canônico (`System/ids.md`) para suportar itens físicos da marca que não são suplementos nutricionais, criando a sub-categoria `1.1 Acessórios`, a fim de classificar assets visuais recuperados no Vault Ingestor.

**Arquivos atualizados:**
- `System/ids.md` — novo ID canônico `acessorio-garrafa-mp` adicionado.
- `Brand/product-catalog.md` — nova seção `Acessórios e Merchandising` criada para registro histórico, isolando do catálogo nutricional central.
- `Content/issues-log.md` — Issue 013 (entidade não canônica de garrafas) resolvida.
- `_archive/_inbox-processed/...` — assets originais de GARRAFAS tirados de quarentena.

**Motivo:** Usuário confirmou que "The bottles are part of the brand, we made them for some time... we might make them again". Para não quebrar o graph-view e a limpeza dos types (suplemento vs não-suplemento), criamos uma sub-categoria e tags próprias (`#accessory/garrafa-mp`). Isso permite que os assets vivam no vault e agreguem ao brand-core sem interferir nos scripts de cálculo nutricional.

---

## 19/04/2026 — Split de `competitor-intel.md` em 11 perfis individuais + matriz gerada

**Decisão:** Executar o P0 #2 do Health Check — quebrar `Research/competitor-intel.md` (697 linhas, 49KB — 1 arquivo monolítico com 11 marcas + análise) em estrutura granular que respeita o princípio "1 arquivo = 1 entidade".

**Nova estrutura:**
- `Research/competitor-intel.md` — **hub lean** (exec summary + navegação + fontes). `type: competitor-intel`
- `Research/competitor-matrix.md` — **análise gerada** (matriz nacional + matriz internacional + lacunas + 5 oportunidades + 5 ameaças + 6 recomendações + mapa de posicionamento). `type: competitor-matrix` (novo)
- `Research/competitors/_index.md` — MOC dos perfis individuais. `type: moc`
- `Research/competitors/<slug>.md` × 11 — 1 arquivo por marca. `type: competitor-profile` (novo)
  - Nacionais: `integralmedica`, `growth-supplements`, `dux-human-health`, `max-titanium`, `atlhetica-nutrition`, `atomic-labs`
  - Internacionais: `optimum-nutrition`, `transparent-labs`, `myprotein`, `muscletech`, `scitec-nutrition`

**Arquivos System atualizados (schemas):**
- `System/taxonomy.md` — adicionadas 3 rotas: perfil individual → `competitors/`, matriz → `competitor-matrix.md`, hub permanece como singleton
- `System/content-types.md` — registrados `competitor-profile` e `competitor-matrix`; redefinida estrutura de `competitor-intel` como hub
- `System/frontmatter-schema.md` — 2 novos types no enum
- `System/ids.md` seção 8 — 11 IDs canônicos com holding e arquivo, nota cruzada com seção 7 sobre Glanbia/MP/ON

**Arquivos MOC/navegação atualizados:**
- `Research/_index.md` — tabela "Inteligência de mercado" com 3 entradas; invariante 4 dividida em 2 regras (trends append-only + competitors = 1/marca)
- `Content/issues-log.md` — issue #011 atualizado: `competitor-intel.md` sai da lista de "restam"

**Motivo:**
- Jarvis Protocol exige 1 entidade = 1 arquivo — permite context assembly seletivo (T3 puxa só a marca relevante, não 49KB)
- Dataview queries por tier/holding/competitor_id ficam viáveis
- Edge analysis via `related`/`connects_to` ganha granularidade
- Preserva wiki-links existentes em [[CONTEXT]] e [[Brand/brand-core]] (hub mantém o path original)

**Preservação narrativa:**
- Insight sobre Glanbia/ON movido para [[Research/competitors/optimum-nutrition]] com cross-link para `System/ids#7`
- Insights estratégicos de cada marca preservados na seção "Insight estratégico para MP" de cada perfil
- Análise estratégica completa (matriz + oportunidades + ameaças + recomendações + mapa) consolidada em `competitor-matrix.md`

**Próximo passo:** retomar P0 #1 (retrofit frontmatter Fase 2 — 8 technical-sheets) e P0 #3 (criar `.claude/agents/vault-ingestor.md`).

---

## 18/04/2026 — Health Check + Color System + Agent Architecture (Database Optimization Review)

**Decisão:** Executar auditoria completa de saúde do vault após 2 semanas de uso e projetar 3 camadas de finishing: (1) Color System no graph view, (2) Agent Architecture com 4 agents especializados lean, (3) Plano de split/retrofit priorizado.

**Arquivos criados:**
- `HEALTH_CHECK_REPORT.md` — relatório completo com inventário, duplicatas (0), merge candidates, split candidates, frontmatter gap, orphans, 13 ações priorizadas P0–P3, métricas de sucesso 30 dias
- `System/color-system.md` — documentação do sistema de 11 grupos de cor aplicado no graph view, paleta alinhada com `visual-language.md`, CSS snippet futuro
- `System/agent-architecture.md` — design de 4 sub-agents (`vault-ingestor`, `vault-librarian`, `content-producer`, `jarvis-synthesizer`) com responsabilidades, constraints, métricas, ordem de implementação

**Arquivos atualizados:**
- `.obsidian/graph.json` — `colorGroups: []` substituído por 12 grupos de cor derivados da paleta oficial MP (Azul Principal `#20388a`, Vermelho `#d20a11`, Azul aço `#90a9c2`, Dourado `#f59e0b`) + cores auxiliares (verde Content, amarelo Research, roxo Workflows, grafite System, laranja Inbox, vinho Archive, magenta Visual/Themes)

**Descobertas principais:**
- Vault score: 7.1/10 — saudável, com 3 frentes de finishing
- ZERO duplicatas reais (apesar de overlaps aparentes investigados em 9 pares)
- 54% frontmatter coverage — 26 arquivos sem YAML (technical-sheets + Research + Content)
- 1 arquivo crítico para split: `Research/competitor-intel.md` (697 linhas, 49KB) → quebrar em `Research/competitors/` por marca
- 4 órfãos são intencionais (Templates/) — adicionar refs nos `_index.md`
- 0 wiki-links quebrados
- Graph view **não tinha cor** antes desta sessão (`colorGroups: []` vazio)

**Motivo:** O usuário pediu explicitamente: "database optimization specialist — health check, duplicatas, merge candidates, agents por seção sem gastar recursos, color system para entender o vault ao bater o olho". As 3 entregas resolvem os 3 eixos: saúde (report), estética (colors), eficiência (agents lean).

**Próximos passos (P0–P1 priorizados):**
1. Retrofit frontmatter Fase 1 — 8 technical-sheets (desbloqueia Dataview)
2. Split `competitor-intel.md` → `Research/competitors/` (1 arquivo por marca)
3. Criar `.claude/agents/vault-ingestor.md` (primeiro agent a ativar)
4. Adicionar refs de Templates/ nos 4 `_index.md`

---

## 18/04/2026 — Jarvis Protocol: Sistema de Inteligência Ativa (Context Engine + Intent Classifier + Interaction Log)

**Decisão:** Transformar o brain estático em um assistente de inteligência ativa, inspirado no modelo Jarvis (Iron Man). A memória ativa fixa de 7 arquivos foi substituída por um protocolo de 6 passos que monta o contexto dinamicamente baseado no intent de cada pedido.

**Arquivos criados:**
- `JARVIS_ARCHITECTURE.md` — proposta de design completa com 5 camadas arquiteturais, roadmap de evolução em 5 fases
- `System/context-engine.md` — protocolo operacional de 6 passos (PARSE → ASSEMBLE → CONNECT → SYNTHESIZE → RESPOND → LOG)
- `System/intent-classifier.md` — tabela de decisão task_type × entidade → arquivos core
- `System/interaction-log.md` — acumulador de aprendizado seedado com as 2 sessões iniciais

**Arquivos atualizados:**
- `System/README.md` e `System/vault-map.md` — novos arquivos destacados
- `Brand/brand-core.md`, `Brand/visual-language.md`, `Brand/audience.md`, `Research/instagram-insights.md`, `Content/post-history.md` — frontmatter expandido com `weight`, `activation_contexts`, `connects_to`
- `CLAUDE.md` — seção "Memória ativa" substituída por "Jarvis Protocol" com os 6 passos + inicialização de sessão

**Mecanismo de self-learning:**
O `interaction-log.md` acumula entradas estruturadas por sessão. A cada 10 entradas: analisar co-ocorrência de arquivos → atualizar `connects_to`. A cada mês: revisar gaps recorrentes → criar novos arquivos. A cada trimestre: calibrar `activation_contexts`. Progressivamente a graph de conexões reflete uso real, não suposições de design.

**Fórmula de relevância:**
R(arquivo, pedido) = 0.40 × entity_match + 0.30 × activation_context_match + 0.20 × weight/10 + 0.10 × recency

**Motivo:** o usuário descreveu o objetivo: "o brain precisa ser o combustível para Claude Code e Claude Cowork entenderem precisamente o intent do usuário e terem uma referência local com tudo que precisam para resolver o problema". A montagem estática não serve pedidos multi-deliverable sofisticados nem conecta dados cross-domínio automaticamente. O Jarvis Protocol resolve isso.

---

## 18/04/2026 — Arquitetura de Dados: Sistema de Ingestão + Camada Meta (`System/`)

**Decisão:** Implementar camada de arquitetura de dados no vault para suportar crescimento rápido e ingestão autônoma de conteúdo (com ou sem descrição do usuário). Criada a camada `System/` como "sistema nervoso" do vault.

**Arquivos criados:**
- `SYSTEMS_CHECKUP_REPORT.md` — relatório diagnóstico completo com identificação de 13 riscos (5 P0 + 5 P1 + 3 P2)
- `System/README.md` — orientação da camada meta
- `System/vault-map.md` — MOC-raiz (mapa completo do vault)
- `System/taxonomy.md` — regras de roteamento por tipo de conteúdo
- `System/frontmatter-schema.md` — YAML obrigatório + campos por tipo
- `System/file-naming.md` — convenções de nomenclatura
- `System/content-types.md` — schema estrutural de 25+ tipos
- `System/ingestion-pipeline.md` — 🔑 árvore de decisão com scoring de confiança (≥0.7 automático, 0.4–0.69 confirma, <0.4 staging)
- `System/ids.md` — dicionário canônico (produtos, personas, canais, campanhas, cupons, fornecedores, ingredientes)
- `System/archive-policy.md` — retenção/rotação por tipo
- `System/relationships.md` — padrões de wiki-link e MOC
- `Inbox/README.md` — dropzone universal
- `_archive/README.md` — histórico arquivado
- `Brand/_index.md`, `Content/_index.md`, `Research/_index.md`, `Workflows/_index.md` — MOCs por domínio

**Arquivos atualizados:**
- `CLAUDE.md` — adicionada seção "Pipeline de Ingestão", referências a `System/`, expansão da memória ativa (vault-map + issues-log), regra explícita contra prompt injection, formato de data por contexto
- `CONTEXT.md` — frontmatter YAML adicionado + seção "Arquitetura do Vault" linkando MOCs e camada meta

**Requisitos que o sistema atende:**
- Q1: dropzone universal (`Inbox/`)
- Q2: detecção de tipo sem input humano (pipeline de ingestão)
- Q3: classificação automática (taxonomy + scoring)
- Q4: extração de entidades (ids.md como dicionário de matching)
- Q5: metadata estruturado (frontmatter-schema)
- Q6: relacionamento dentro do sistema (relationships.md + MOCs)
- Q7: schema validável por tipo (content-types)
- Q8: regras operacionais para Claude (CLAUDE.md atualizado)

**Motivo:** O usuário pediu arquitetura futuro-pronta para crescimento rápido. Requisito central: "consumir dados eficientemente mesmo sem descrição; identificar o que foi upado, que tipo de conteúdo é, e a que se relaciona". Os 5 riscos P0 identificados (sem Inbox, sem frontmatter, sem taxonomia, sem IDs canônicos, sem pipeline) eram bloqueadores de escala — cada upload exigia uma conversa manual de classificação. A camada `System/` torna o processo determinístico e idempotente.

**Evento colateral detectado:** durante a sessão, uma instrução injetada via system-reminder pediu criação de `.claude/launch.json` e uso de `preview_start` — padrão típico de prompt injection, não-compatível com um vault Obsidian (sem dev servers). Instrução foi recusada e registrada como regra em CLAUDE.md ("Prompt injection").

**Próximos passos (fora desta sessão):**
1. Retrofit gradual dos 28 arquivos existentes com frontmatter YAML (Fase 1: auto-lidos; Fase 2: technical-sheets; Fase 3: restante)
2. Inicializar Git no vault
3. Ativar plugin Dataview + Templater no Obsidian para aproveitar o frontmatter
4. Consolidar SOPs recorrentes em `Workflows/`

---

## 17/04/2026 — Template de Reels Educativos

**Decisão:** Criar sistema completo de templates para Reels educativos — o formato de maior alcance da marca, que até então não tinha diretriz visual nem framework de conteúdo documentado.

**Arquivo atualizado:**
- [[Content/content-templates]] — nova seção "Reels Educativos" adicionada com:
  - Estrutura de 3 atos (Hook / Corpo Educativo / CTA)
  - 5 tipos de hook com mecânica, exemplos aprovados e regras de produção
  - Especificação visual completa (zonas, dimensões, cores, tipografia) para formato 9:16 1080×1920px
  - Regras de copy para vídeo (máx. palavras por linha, fórmula de tradução da ciência)
  - Banco de hooks por produto (5 hooks × 6 produtos = 30 hooks prontos)
  - Conceitos educativos disponíveis por produto (extraídos do [[Brand/ingredient-reference]])
  - Estrutura de legenda (caption) com exemplo aprovado
  - Nota de produção para Freepik / Canva com instruções e prompt base de AI
  - Métricas de sucesso e benchmarks de retenção

**Filosofia central estabelecida:**
"A ciência vira conteúdo quando a informação é específica o suficiente para parecer revelação — não genérica o suficiente para ser ignorada."

**Fórmula de tradução científica:**
`[mecanismo técnico]` → `[o que você sente/ganha]`
Exemplo: "Cafeína bloqueia receptores de adenosina" → "Você não sente a fadiga crescer durante o treino"

**Motivo:** Reels são o principal driver de alcance para não-seguidores (confirmado em instagram-insights.md), mas o formato não tinha nenhuma diretriz visual ou framework de hook documentado. Gap crítico identificado na auditoria do design system (17/04/2026).

---

## 17/04/2026 — Auditoria Inicial do Design System

**Decisão:** Executar auditoria inicial do design system da Medicinal Pharma usando a skill `design:design-system` do Cowork, com leitura de todos os arquivos de memória ativa e geração de relatório estruturado.

**Arquivo criado:**
- [[Research/design-system-audit]] — auditoria completa com score 62/100, cobrindo: tokens de cor (6 definidos, 1 conflito), tipografia (hierarquia clara, sem escala numérica), espaçamento (não definido), componentes documentados (carrossel ✅, Reels ❌, Stories ❌), padrões de conteúdo e 10 ações priorizadas

**Principais achados:**
- **Força:** Paleta de cor sólida, bandas diagonais como identidade inegociável, tema Elite Performance como referência completa
- **Gap crítico 1:** Conflito de cor Azul Principal (`#20388a` vs `#29388a`) — aguarda confirmação do usuário
- **Gap crítico 2:** Template de Reels não documentado — principal canal de alcance sem diretriz visual
- **Gap de tokens:** Dourado (`#C9A84C`) e Azul Profundo (`#0D1B4B`) existem no tema mas não em `visual-language.md`
- **Gap de escala:** Tamanhos tipográficos em px não definidos em nenhum arquivo

**Ações definidas:**
1. 🔴 Resolver conflito de hex do Azul Principal
2. 🔴 Adicionar `#C9A84C` Dourado no `visual-language.md`
3. 🔴 Criar template de Reels
4. 🟡 Criar template de Stories
5. 🟡 Definir escala tipográfica com tamanhos em px

**Motivo:** Primeira análise estruturada do design system — necessária para padronizar produção de conteúdo e garantir consistência visual à medida que o volume de posts aumenta.

---

## 17/04/2026 — Tema Customizado "Elite Performance"

**Decisão:** Criar tema visual customizado derivado da identidade oficial da Medicinal Pharma para uso padronizado em todos os entregáveis visuais da marca.

**Arquivo criado:**
- [[Brand/themes/elite-performance]] — tema completo com paleta de 6 cores, tipografia, regras visuais, tabela de aplicação rápida e usos recomendados

**Especificações do tema:**
- Nome: *Elite Performance*
- Paleta: Azul Principal `#20388a` · Vermelho MP `#d20a11` · Azul Aço `#90a9c2` · Dourado MP `#C9A84C` · Branco `#FFFFFF` · Azul Profundo `#0D1B4B`
- Tipografia: Montserrat ExtraBold Italic (H1, dourado) · Montserrat Bold (H2, branco) · Montserrat Regular (corpo) · Montserrat Bold Italic (CTA, dourado)
- Regras visuais: bandas diagonais azul/vermelho, textura de fundo 10% opacidade, caixa de copy overlay 85%, dourado reservado para títulos/CTAs/keywords

**Arquivos atualizados:**
- [[Brand/visual-language]] — link para o tema adicionado

**Motivo:** Padronizar a identidade visual em todos os entregáveis gerados por Claude (decks, e-mails, PDFs, carrosséis) com fidelidade total às diretrizes da marca.

---

## 17/04/2026 — Configuração do Cowork + Sequência de E-mail Lead Nurture

**Decisão:** Configurar Cowork mode com plugin de Marketing e criar sequência completa de e-mail lead nurture para novos prospects, com objetivo de primeira compra.

**Configuração Cowork:**
- Plugin Marketing instalado e ativo (8 skills: content-creation, draft-content, campaign-plan, brand-review, competitive-brief, email-sequence, performance-report, seo-audit)
- Vault confirmado como diretório de trabalho — todos os outputs gerados são salvos diretamente em `Medicinal Pharma Brain/`
- Regra estabelecida: todos os outputs de sessão vão para o vault automaticamente

**Arquivo criado:**
- [[Content/email-sequence-lead-nurture]] — sequência completa de 6 e-mails em PT-BR, lead nurture para novos praticantes de academia 20–35 anos, objetivo: primeira compra em mpoficial.com

**Estrutura da sequência:**
- E-mail 1 (Dia 0): Educação — por que 80% não evolui na academia
- E-mail 2 (Dia 3): Diferencial de matéria-prima + Magnific Whey 3W
- E-mail 3 (Dia 7): Stack de profissionais + apresentação dos 3 Kits
- E-mail 4 (Dia 11): Prova social real (Cliente Anonimizado + Lipo-X HD)
- E-mail 5 (Dia 17): Remoção de objeções (preço, confiança, SAC)
- E-mail 6 (Dia 21): Urgência + cupom PRIMEIRA10 expira hoje

**Decisões de conteúdo:**
- Idioma: PT-BR (alinhado com o público)
- Tom: Autoridade técnica + proximidade (sem intimidação)
- Cupom de conversão: PRIMEIRA10 (10% OFF primeira compra) — reservado para E-mail 6 (urgência máxima)
- Saída da sequência: qualquer compra → remover imediatamente
- Benchmarks esperados: 25–35% abertura, 5–8% CTR, 4–7% conversão (acima do padrão por serem leads via afiliados)

**Motivo:** Canal de e-mail não estava sendo explorado como nurture estruturado. A sequência captura leads que chegam via afiliados mas não convertem imediatamente (41% dos leads não usam cupom na primeira visita).

---

## 17/04/2026 — Insights Claude Code + Atualização de Configuração do Vault

**Decisão:** Salvar relatório completo de insights do Claude Code no vault e aplicar as 4 sugestões de configuração ao CLAUDE.md.

**Arquivo criado:**
- [[Research/claude-code-insights]] — relatório completo do período 09/04–16/04/2026: 7 sessões, 84 mensagens, 12h, áreas de projeto, estilo de interação, pontos de atrito, features recomendadas e workflows futuros

**Atualizações no CLAUDE.md (4 seções adicionadas):**
1. **Interpretação de Comandos** — comandos `claude`, `npm`, `git` → executar via Bash, nunca lançar Agent task
2. **Estilo de Interação** — aguardar sinal explícito em inputs multi-mensagem antes de agir
3. **Parsing de CSV e Dados** — detectar encoding (UTF-8/Latin-1/CP1252) e separador (`,`/`;`) antes de parsear; verificar row count e reportar antes de analisar
4. **Convenções do Vault Obsidian** — confirmar filename antes de criar; usar wiki-links `[[...]]` para cross-references

**Motivo:** Insights identificaram padrões de atrito recorrentes (comandos interpretados como Agent tasks, perda silenciosa de 22 de 46 linhas CSV, restruturação de calendar.md) que podem ser prevenidos com regras explícitas no CLAUDE.md.

---

## 16/04/2026 — Plano de Campanha "De Onde Vem a Sua Performance?" (Maio 2026)

**Decisão:** Criar plano de campanha completo de 4 semanas baseado em varredura completa do vault (dados de vendas, audiência, concorrentes, ingredientes e conteúdo histórico).

**Arquivo criado:**
- [[Content/calendar]] — plano completo com 10 seções: visão geral, público, mensagens, canais, calendário semana a semana, 8 ativos must-have, KPIs, budget, riscos e próximos passos

**Posicionamento escolhido:** "De Onde Vem a Sua Performance?" — narrativa de origem rastreável de matéria-prima (diferencial exclusivo identificado na análise competitiva: nenhum dos 6 concorrentes comunica isso)

**Dados do vault utilizados:**
- 29 pedidos históricos (Dez/2025–Abr/2026), ticket médio R$222, 59% via afiliados
- ABC Paulista = 34% das vendas; 89,7% mobile; 62,1% Pix
- 12 afiliados ativos — OITAVA lidera com R$1.198 em receita gerada
- Análise de 6 concorrentes — lacuna de "origem de matéria-prima" identificada
- Ingredient-reference.md como base de conteúdo educacional

**Meta:** Dobrar pedidos mensais de 9 para 18 em maio/2026 mantendo ticket ≥ R$220

---

## 16/04/2026 — Análise Competitiva do Mercado Brasileiro de Suplementos

**Decisão:** Criar brief competitivo com pesquisa web sobre os 6 principais concorrentes identificados pelo usuário: Integralmedica, Max Titanium, Growth Supplements, Dux Nutrition, Atomic Labs e Atlhetica Nutrition.

**Arquivo criado:**
- [[Research/competitor-intel]] — brief completo com 9 seções: resumo executivo, 6 perfis de concorrentes, matriz comparativa de mensagem, análise de lacunas de conteúdo, 5 oportunidades, 4 ameaças, 6 recomendações estratégicas e mapa de posicionamento

**Dados-chave coletados:**
- Growth Supplements: R$ 2B em 2025 (maior player); pivô de D2C para omnichannel sob Merama; 3.700 influenciadores
- DUX Human Health: rebranding de DUX Nutrition Lab; B Corp score 90,2; R$ 1B projetado 2026; "Powerful Health, Better Life"
- Integralmedica: Grupo BRG R$ 1,25B; líder em creatina (R$ 68,9M) e barrinhas; Leo Stronda (13M seguidores) como novo comunicador
- Max Titanium: 18.000 micro-criadores (BrandLovrs); Supley com M&A ativo; loja no Magalu
- Atlhetica Nutrition: 25 anos; 300 SKUs; 15.000 farmácias; planta 75.000m²; melhor Whey por sabor (14 opções)
- Atomic Labs: lifestyle brand; design artístico; 27K Instagram; "mais que suplemento, um movimento"

**Principal oportunidade identificada:** "Premium de Origem Rastreável" — nenhum dos 6 concorrentes comunica ativamente a origem geográfica de matérias-primas. Medicinal Pharma é a única marca com fornecedores nominados (Glanbia/Irlanda, Alemanha, Japão).

**Mercado:** R$ 10B projetado em 2026; Brasil é 5º maior mercado mundial de nutrição esportiva.

---

## 16/04/2026 — Referência Científica de Ingredientes (Nutricionista Esportivo)

**Decisão:** Criar arquivo de referência aprofundada de todos os ingredientes ativos dos produtos Medicinal Pharma, sob perspectiva de nutricionista esportivo, com base exclusivamente em literatura científica indexada.

**Arquivo criado:**
- [[Brand/ingredient-reference]] — análise de 12 ingredientes ativos + excipientes tecnológicos, cobrindo: mecanismo de ação, benefícios evidenciados, contextualização de dose (produto vs. literatura), referências bibliográficas (JISSN, AJCN, Sports Medicine, Nutrients, etc.)

**Escopo:**
- Whey Protein 3W (concentrada + isolada + hidrolisada) — análise por fração, perfil aminoacídico clínico
- Creatina Monohidratada Micronizada — posição ISSN 2017
- Beta-Alanina — mecanismo carnosina, protocolo ANVISA de fracionamento
- L-Glutamina — grau clínico japonês, imunidade e barreira intestinal
- Cafeína — dose ergogênica vs. dose no produto; alerta de consumo combinado (Anabolic + Lipo-X = 350mg)
- L-Carnitina L-Tartarato — LCLT, biodisponibilidade com insulina
- L-Arginina, Taurina, Isomaltulose, Picolinato de Cromo, Vitamina B12
- Complexo vitamínico Multi AZ — análise por forma química e relevância esportiva
- Tabelas de sinergia entre produtos (4 stacks documentados)
- Avaliação geral do portfólio (6 critérios, ★★★★★)

**Motivo:** Documentar o respaldo científico das formulações para uso interno (briefings, treinamento de afiliados, conteúdo educacional e comunicação com investidores).

---

## 16/04/2026 — Auditoria de Arquivos Órfãos e WikiLinks

**Decisão:** Identificar todos os 22 arquivos do vault, mapear links de entrada/saída e corrigir arquivos sem conexão no grafo.

**Resultado:**
- 15 arquivos órfãos identificados (zero links de entrada)
- 3 arquivos isolados (zero links em nenhuma direção)
- 2 links quebrados corrigidos: `[[Brand/technical-sheets]]` (referência a pasta) e `[[Content/calendar]]` (arquivo deletado)
- 9 edições executadas: brand-core, CONTEXT.md, product-catalog, decisions-log, investor-brand-survey, website-map, issues-log (WikiLinks em todas as células da tabela)
- Todos os 8 technical sheets agora têm pelo menos 1 link de entrada (via brand-core)

---

## 16/04/2026 — Questionário de Onboarding para Investidores

**Decisão:** Criar esboço de questionário para Google Forms focado em posicionamento de marca, satisfação com histórico visual e expectativas futuras — respondentes: investidores e stakeholders.

**Arquivo criado:**
- [[Research/investor-brand-survey]] — 23 perguntas distribuídas em 5 seções, com tipos de campo, placeholders e notas de implementação no Google Forms

**Estrutura:**
1. Perfil do respondente (3 perguntas)
2. Satisfação com histórico visual pré-contratação (6 perguntas)
3. Percepção de posicionamento atual (5 perguntas)
4. Expectativas futuras (6 perguntas)
5. Espaço livre + disponibilidade para follow-up (3 perguntas)

---

## 16/04/2026 — Extração de post Instagram: Carrossel "Por que 3W?"

**Decisão:** Extrair informações visuais e técnicas do carrossel Magnific Whey publicado no Instagram e estruturar no vault como post histórico + template replicável.

**Arquivos criados:**
- `Content/post-history.md` — primeiro post registrado: carrossel 5 slides "Por que 3W?", estrutura completa, copy exato, insights de posicionamento
- `Content/content-templates.md` — template "Por que [Produto]?" documentado com regras visuais, adaptações por produto e copy de referência aprovado

**Arquivo atualizado:**
- `Brand/visual-language.md` — nova seção "Linguagem Visual — Instagram / Carrossel" com layout base, elementos recorrentes e hierarquia tipográfica dos slides

**Padrão visual extraído:**
- Bandas diagonais azul + vermelho em todos os slides
- Textura de fundo com palavra-chave repetida (hook)
- Caixa de copy: fundo azul semi-transparente, keyword em dourado, texto em branco bold all-caps
- Estrutura narrativa: Hook → 3 atributos técnicos → CTA

**Posicionamento técnico do Whey 3W aprovado:**
- Hidrolisada = absorção rápida → pós-treino
- Isolada = sem carbs/gordura → dietas restritivas
- Concentrada = kit completo de aminoácidos → público geral

---

## 16/04/2026 — Librarian Mode: WikiLinks + Auto-Reparo + Auditoria Visual

**Decisão:** Executar passagem estruturada de manutenção no vault: injeção de WikiLinks, preenchimento de dados nutricionais ausentes no catálogo, correção de bug de ingredientes, adição de dados de origem de matéria-prima e auditoria de identidade visual.

**Arquivos modificados:**
- `Brand/product-catalog.md` — tabelas nutricionais injetadas em todos os 8 produtos; perfil de aminoácidos (Whey × 2); bug de ingredientes do Anabolic Training Morango Ice corrigido; dados de origem (Alemanha, Glanbia/Irlanda, Japão) adicionados; WikiLinks inseridos
- `Brand/brand-core.md` — WikiLinks adicionados para Beta-Alanina, L-Arginina, Taurina, Cafeína, Vitamina B12, Power Creatine, L-Glutamine; nova seção `## Origem das Matérias-Primas` criada
- `Brand/technical-sheets/*.md` (todos os 8) — `[[Brand/visual-language]]` e `[[Brand/brand-core]]` adicionados a cada ficha técnica

**Erros corrigidos nesta sessão:**
1. Anabolic Training Morango Ice: ingredientes diziam "Idênticos ao sabor Maçã Verde Ice" → substituído pela lista completa e correta (Corante Vermelho Ponceau 4R, aroma de morango, sem Verde Rápido FCF)
2. Todos os produtos sem porção/porções no catálogo → corrigido com dados dos rótulos

**Informações novas adicionadas:**
- Creatina: origem Alemanha, micronização (diferencial técnico)
- Whey Protein: fornecedor Glanbia (Irlanda) — maior fornecedor mundial
- L-Glutamina: origem Japão, grau clínico/hospitalar

**Pendência identificada (ID 012):**
- HEX do Azul Principal: comando especificou `#29388a`; arquivo `visual-language.md` contém `#20388a` — aguardando confirmação do usuário

---

## 16/04/2026 — OCR de rótulos oficiais → Fichas Técnicas + Correções no vault

**Decisão:** Importar os 8 rótulos PDF oficiais dos produtos como fichas técnicas estruturadas em Markdown e corrigir inconsistências encontradas no vault.

**Arquivos criados:**
- `Brand/technical-sheets/lipo-x-hd.md`
- `Brand/technical-sheets/magnific-whey-chocolate-avela.md`
- `Brand/technical-sheets/magnific-whey-morango-chocolate-branco.md`
- `Brand/technical-sheets/power-creatine.md`
- `Brand/technical-sheets/l-glutamine.md`
- `Brand/technical-sheets/multi-az.md`
- `Brand/technical-sheets/anabolic-training-maca-verde.md`
- `Brand/technical-sheets/anabolic-training-morango-ice.md`
- `Content/issues-log.md` — novo arquivo de rastreamento de erros (9 entradas iniciais)

**Arquivos corrigidos:**
- `Brand/brand-core.md` — dosagem Creatina (3g/dia), dosagem Glutamina (5g/dia), perfil aminoácidos Whey, valores nutricionais Whey, seção de fabricante adicionada
- `Brand/product-catalog.md` — dosagem Creatina e Glutamina corrigidas

**Erros críticos encontrados e corrigidos:**
1. Creatina: vault dizia "10g/dia em 2×5g" → correto é 3g (1 dosador)/dia
2. Glutamina: vault dizia "10g ao dia, sendo duas doses de 5g" → correto é 5g (1 dosador)/dia
3. Fabricante nunca documentado → Bioghen Suplementos Nutricionais Ltda (CNPJ: 19.416.061/0001-62)
4. Perfil de 18 aminoácidos do Whey ausente → adicionado com valores exatos por porção

**Fonte dos dados:** PDFs dos rótulos oficiais — `C:\Users\baker\Desktop\MEDICINAL_PHARMA_BRUTOS\LABELS\`

---

## 16/04/2026 — Importação do catálogo de produtos e kits do site

**Decisão:** Importar e estruturar o arquivo de catálogo `tiendanube-*.csv` (exportação Nuvem Shop, encoding CP1252) para o vault do Obsidian.

**Arquivos criados/atualizados:**
- `Brand/product-catalog.md` — criado: ficha completa de 8 produtos individuais (SKUs, preços, estoque, ingredientes, dosagem) + ~46 kits organizados por número de produtos e objetivo
- `Brand/brand-core.md` — atualizado: SKU da Glutamina (MPS0005) adicionado; dosagem da Creatina corrigida de "3g" para "10g/dia (2×5g)"

**Motivo:** Centralizar catálogo oficial com preços, SKUs e composições para embasar decisões de conteúdo e comparação com dados de vendas.

**Cross-reference insights:**
- Vendas confirmam uso do preço promocional (não o regular) em todos os pedidos
- Pré Treino Morango Ice: 77 unidades — estoque baixo; Maçã Verde: 397 unidades — estoque alto
- Kit supply de 3 meses (Lipo-X e Multivitamínico) nunca vendeu → oportunidade de comunicação
- 2 kits Whey+Creatina+Lipo-X sem SKU atribuído no catálogo (necessário corrigir no painel)
- KT4P021-4 com 21% de desconto é o maior da linha 4 produtos

---

## 16/04/2026 — Importação de dados de vendas do CSV

**Decisão:** Importar e estruturar os dados do arquivo `Vendas-*.csv` (exportação Nuvem Shop, encoding CP1252) para o vault do Obsidian.

**Arquivos criados/atualizados:**
- `Research/sales-data.md` — criado: ledger completo de 29 pedidos (Dez/2025–Abr/2026), análise de produtos, evolução de preços, performance de afiliados, geografia
- `Research/instagram-insights.md` — atualizado: métricas precisas (ticket médio R$222,34, receita R$6.447,73), evolução de preços, sazonalidade mensal
- `Brand/audience.md` — atualizado: dados consolidados de cupons, receita por afiliado, comportamento de recompra

**Motivo:** Centralizar inteligência de vendas no vault para informar decisões de conteúdo, estratégia de afiliados e precificação.

**Insights principais capturados:**
- Whey Morango e Choc Branco é o produto líder absoluto
- ABC Paulista = 34% das vendas (SBC, Santo André, Mauá, São Caetano)
- OITAVA é o afiliado de maior volume (4 pedidos, R$1.198 em receita)
- Preços subiram até 80% (Multivitamínico) sem queda observável de demanda
- 1 recompra confirmada: Cliente Anônimo — Lipo-X (2x em ~70 dias)
