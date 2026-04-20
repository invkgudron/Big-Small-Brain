---
name: Health Check Report
description: Auditoria completa de saúde do vault — duplicatas, merge/split, agents, color system (18/04/2026)
type: audit
status: active
date: 2026-04-18
tags: [audit, health-check, optimization, architecture]
related:
  - "[[SYSTEMS_CHECKUP_REPORT]]"
  - "[[JARVIS_ARCHITECTURE]]"
  - "[[System/vault-map]]"
  - "[[System/color-system]]"
  - "[[System/agent-architecture]]"
---

# Health Check Report — Medicinal Pharma Brain

**Data:** 18/04/2026
**Escopo:** Database optimization specialist review — health, duplicatas, merge candidates, agent architecture, color system
**Versão anterior:** [[SYSTEMS_CHECKUP_REPORT]] (inicial, 18/04/2026 — focada em arquitetura)
**Esta auditoria:** foca em *saúde operacional* após 2 semanas de uso

---

## 1. TL;DR — Status Geral

| Dimensão | Score | Status |
|----------|:-----:|:------:|
| Arquitetura | 9.5/10 | ✅ Excelente |
| Taxonomia | 9/10 | ✅ Sólida |
| Frontmatter coverage | 5.4/10 | 🟡 54% (26 arquivos sem YAML) |
| Duplicação | 9/10 | ✅ Zero duplicata real |
| Graph density | 8/10 | ✅ 100% links resolvem, 0 órfãos reais |
| Split-candidates | 6/10 | 🟡 5 arquivos > 300 linhas |
| Color system | 0/10 | ❌ `colorGroups: []` no graph.json |
| Agents dedicados | 0/10 | ❌ Nenhum agent em `.claude/agents/` |

**Vault score global:** 7.1/10 — **saudável, com 3 frentes de finishing**: frontmatter, color system, agents.

---

## 2. Inventário (snapshot 18/04/2026)

| Métrica | Valor |
|---------|------:|
| Arquivos `.md` | 56 |
| Pastas top-level | 8 (Brand, Content, Research, Workflows, System, Templates, Inbox, _archive) |
| Subpastas | 2 (Brand/technical-sheets, Brand/themes) |
| Arquivos > 300 linhas | 5 |
| Arquivos > 100 linhas | 23 |
| MOCs (_index + vault-map + CONTEXT) | 6 |
| Wiki-links quebrados | 0 |
| Arquivos órfãos (sem incoming link) | 4 (todos templates — intencional) |
| Frontmatter presente | 30 / 56 (54%) |

---

## 3. DUPLICATAS — Investigação Cruzada

**Verdict geral:** ✅ **ZERO duplicatas reais.** O vault é bem particionado por audiência (estratégica vs operacional) e por canal.

| Par investigado | Overlap real? | Veredicto |
|-----------------|:-------------:|-----------|
| `brand-core` ↔ `product-catalog` | Parcial (listas de produto) | **KEEP BOTH.** brand-core = narrativa estratégica; product-catalog = ledger SKU transacional. Funções distintas. |
| `product-catalog` ↔ `technical-sheets/*` | Parcial (tabelas nutricionais) | **KEEP BOTH.** Catálogo = comparativo rápido; sheets = fonte canônica por SKU. Adicionar link bidirecional explícito. |
| `brand-core` ↔ `CONTEXT` | Mínimo (seção "Empresa") | **KEEP BOTH.** CONTEXT = MOC de navegação; brand-core = referência de profundidade. |
| `instagram-insights` ↔ `sales-data` | Parcial (mesmo período CSV) | **KEEP BOTH.** Insights = resumo de canal; sales-data = ledger de pedidos. |
| `calendar` ↔ `campaign-01-origem-performance` | Ortogonal | **KEEP BOTH.** Calendar = cronograma de execução; campaign = brief estratégico. |
| `content-templates` ↔ `email-sequence-lead-nurture` | Canais diferentes | **KEEP BOTH.** Templates = IG carousel/reel; email-sequence = e-mail. |
| `SYSTEMS_CHECKUP_REPORT` ↔ `JARVIS_ARCHITECTURE` ↔ `System/README` | Escopos complementares | **KEEP ALL 3.** Diagnóstico vs visão vs guia. |
| `taxonomy` ↔ `file-naming` ↔ `content-types` | Camadas de regra distintas | **KEEP ALL 3.** Routing vs nome vs schema. |
| `trends` ↔ `competitor-intel` | Distinto | **KEEP BOTH.** Trends = mercado genérico; competitor = marca específica. |

**Observações pontuais:**
- `issues-log.md` está magro (40 linhas, 5 erros corrigidos + 6 pendências) — **considerar merge com decisions-log.md** quando crescer a >60 linhas sem compensar, criando `operations-log.md` com duas seções.
- Templates (5 arquivos em `Templates/`) são todos órfãos no grafo — **intencional** (são usados por Templater, não referenciados em texto). Adicionar referência em cada `_index.md` para descoberta.

---

## 4. MERGE CANDIDATES (reduzir leituras Claude Code)

Prioridade: **baixa.** O vault já está próximo do ótimo.

| Candidato | Motivo | Prioridade |
|-----------|--------|:----------:|
| `issues-log.md` + `decisions-log.md` → `operations-log.md` | Ambos logs operacionais pequenos. Merge poupa 1 arquivo na leitura. | 🟡 Monitorar — fazer quando issues-log crescer |
| `taxonomy.md` + `file-naming.md` → seção única em `content-types.md` | 3 arquivos pequenos de regra. Merge reduz overhead ao criar arquivo novo. | 🟢 Opcional — atualmente funcional |
| `trends.md` + `competitor-intel.md` → `market-intel.md` | Ambos market intelligence, ambos estão magros. | ❌ **Não fazer** — competitor-intel já tem 697 linhas, merge seria contraproducente |

**Recomendação:** **NÃO fazer merges agora.** O custo de reescrita supera o benefício. Reavaliar em 3 meses conforme arquivos evoluem.

---

## 5. SPLIT CANDIDATES (arquivos grandes demais)

Prioridade: **média.** Arquivos > 300 linhas ficam difíceis de scanear em modo carrossel.

| Arquivo | Linhas | KB | Estratégia de split | Prioridade |
|---------|------:|---:|---------------------|:----------:|
| **`Research/competitor-intel.md`** | 697 | 49KB | `Research/competitors/` → 1 arquivo por marca (`integralmedica.md`, `growth.md`, `max-titanium.md`, `dux.md`, `atomic-labs.md`, `probiotica.md`) + `competitor-intel.md` como índice/resumo executivo | 🔴 **P0** |
| **`Brand/ingredient-reference.md`** | 448 | 40KB | `Brand/ingredients/` → 1 arquivo por família (amino-acids, stimulants, vitamins, minerals) + `ingredient-reference.md` como índice | 🟡 P1 |
| **`Brand/product-catalog.md`** | 448 | 20KB | Extrair `Brand/product-comparison.md` (matriz side-by-side) — catálogo fica como ledger | 🟢 P2 |
| **`Content/content-templates.md`** | 429 | 20KB | `Content/templates/` → 1 por formato (`carousel.md`, `reel.md`, `static.md`, `story.md`, `cta.md`) | 🟡 P1 |
| **`Content/email-sequence-lead-nurture.md`** | 427 | 15KB | Manter (é um recurso coeso de 21 dias) — extrair apenas `Content/email-snippets.md` de copy reusável | 🟢 P2 |
| **`Content/decisions-log.md`** | 398 | 26KB | Monitorar — split em `decisions-log-2025.md` + `decisions-log-2026.md` quando > 500 linhas | 🟢 P2 |

**Impacto estimado do P0 (split competitor-intel):** redução de ~35% no overhead de leitura quando a pergunta é sobre uma marca específica.

---

## 6. FRONTMATTER GAP — 26 arquivos sem YAML

**Por pasta (missing count):**
- `Brand/` → 10 (inclui todos 8 technical-sheets + product-catalog + ingredient-reference + visual-language + elite-performance)
- `Content/` → 4 (calendar, content-templates, decisions-log, email-sequence)
- `Research/` → 7 (tudo exceto `instagram-insights`)
- Raíz → 2 (CLAUDE.md, SYSTEMS_CHECKUP_REPORT.md)

**Priorização de retrofit:**

| Fase | Arquivos | Bloqueia | Tempo |
|:----:|----------|----------|:-----:|
| 1 | 8 technical-sheets | Dataview queries de produto | 30min |
| 2 | 7 Research/ files | Queries cross-Research | 30min |
| 3 | 4 Content/ files | Queries de campanha | 20min |
| 4 | 3 Brand/ restantes | Complete brand set | 15min |
| 5 | CLAUDE.md + SYSTEMS_CHECKUP | Não-bloqueante | 5min |

**Bloqueio atual:** Dataview instalado mas **nenhuma query funcional** até retrofit Fase 1 completar.

---

## 7. COLOR SYSTEM (Obsidian Graph View)

**Estado atual:** `graph.json → colorGroups: []` — **nenhuma cor configurada.**

A memória registrada como "Graph View Color System" (Azul=fichas, Verde=workflows, Amarelo=research, Magenta=visual-language) era **planejamento conceitual não implementado**.

**Solução implementada neste relatório:** ver [[System/color-system]] — 11 grupos de cor aplicados, derivados da paleta oficial MP.

**Resumo do sistema novo:**

| Categoria | Cor | HEX | Query |
|-----------|:---:|:---:|-------|
| Brand — identidade | 🔵 Azul Principal MP | #20388a | `path:Brand/` |
| Content — produção | 🟢 Verde esmeralda | #10b981 | `path:Content/` |
| Research — descoberta | 🟡 Amarelo âmbar | #eab308 | `path:Research/` |
| Workflows — automação | 🟣 Roxo | #a855f7 | `path:Workflows/` |
| System — meta | ⚫ Grafite | #475569 | `path:System/` |
| Inbox — triagem | 🟠 Laranja | #f97316 | `path:Inbox/` |
| Archive — histórico | 🟥 Vinho | #7f1d1d | `path:_archive/` |
| Technical sheets | 🟦 Azul aço MP | #90a9c2 | `path:Brand/technical-sheets/` |
| Visual / Themes | 💗 Magenta | #d946ef | `path:Brand/themes/` OR `path:visual-language` |
| MOCs (hubs navegação) | 🟡 Dourado MP | #f59e0b | `file:_index` OR `file:vault-map` OR `file:CONTEXT` |
| Root docs críticos | 🔴 Vermelho MP | #d20a11 | `file:CLAUDE` OR `file:SYSTEMS_CHECKUP` OR `file:JARVIS` OR `file:HEALTH_CHECK` |

**Regra Obsidian:** último match vence — cores específicas (technical-sheets, MOCs, root) sobrepõem cores de domínio.

**Aplicado em:** `.obsidian/graph.json` neste relatório.

---

## 8. AGENT ARCHITECTURE — Proposta

**Estado atual:** `.claude/agents/` **vazio.** Claude Code está usando apenas o agent principal + sub-agents built-in (Explore, Plan, general-purpose).

**Proposta: 4 agents especializados** (lean, baixo consumo de recursos).

| # | Agent | Domínio | Função principal | Tools |
|---|-------|---------|------------------|-------|
| 1 | **vault-ingestor** | Inbox/ | Executa `System/ingestion-pipeline.md` — detecta tipo, classifica, move, aplica frontmatter, cria wiki-links de entidades, atualiza MOC | Read, Write, Edit, Glob, Grep, Bash (file ops) |
| 2 | **vault-librarian** | Sistema inteiro | Valida frontmatter, detecta broken links, rota archive por `archive-policy.md`, atualiza `ids.md` quando nova entidade canônica aprovada, detecta duplicatas ao longo do tempo | Read, Grep, Glob, Edit |
| 3 | **content-producer** | Content/ + Brand/ | Cria posts a partir de templates, atualiza calendar, faz append em post-history, aplica visual-language, puxa ficha técnica + ingredient-reference para conteúdo científico | Read, Write, Edit, Glob, Grep |
| 4 | **jarvis-synthesizer** | Cross-domínio | Executa os 6 passos do Jarvis Protocol (`System/context-engine.md`) para pedidos CREATE/ANALYZE/DECIDE/PLAN/COMPARE. Faz a montagem dinâmica T1–T5, roda connection engine, detecta contradições e gaps | Read, Grep, Glob |

**Justificativa do lean set (4 vs 8+):**
- CLAUDE.md já centraliza regras → não preciso de um agent por tipo de conteúdo
- Sub-agents built-in (Explore, Plan) cobrem exploração aberta
- Cada agent tem domínio claro → baixa overlap → baixo custo de roteamento
- Agent #4 (jarvis-synthesizer) é o workhorse para pedidos complexos; #1–3 são operacionais
- Pedidos simples (retrieve, lookup) não precisam de agent dedicado — main Claude Code resolve

**Agents NÃO recomendados agora (overhead > valor):**
- ❌ `research-ingestor` específico para CSV — consolidar em `vault-ingestor`
- ❌ `brand-curator` dedicado — `vault-librarian` cobre
- ❌ `email-specialist` — `content-producer` cobre
- ❌ `competitor-analyst` — sub-agent Explore built-in já faz isto

**Roadmap de ativação:**
- **Fase 1 (agora):** criar `vault-ingestor` (Inbox existe e não tem automação)
- **Fase 2 (1 semana):** criar `vault-librarian` (frontmatter retrofit é o catalyst)
- **Fase 3 (2 semanas):** criar `content-producer` (após calendar de maio rodar)
- **Fase 4 (1 mês):** criar `jarvis-synthesizer` (após interaction-log ter 10+ entradas para calibrar)

Design detalhado: [[System/agent-architecture]]

---

## 9. ORFÃOS E DEAD LINKS

**Orfãos (0 incoming links):** 4 arquivos.

| Arquivo | Status |
|---------|--------|
| `Templates/inbox-item.md` | 🟡 intencional (usado por Templater) — adicionar ref em `[[Inbox/README]]` |
| `Templates/post-entry.md` | 🟡 intencional — adicionar ref em `[[Content/_index]]` |
| `Templates/product-sheet.md` | 🟡 intencional — adicionar ref em `[[Brand/_index]]` |
| `Templates/research-file.md` | 🟡 intencional — adicionar ref em `[[Research/_index]]` |

**Real orphans:** 0. ✅

**Dead links:** 0. ✅

---

## 10. AÇÕES PRIORIZADAS

### P0 — Fazer agora (esta sessão ou próxima)
1. ✅ **Sistema de cores no graph view** — IMPLEMENTADO neste relatório
2. ✅ **Doc do color system** — criado em `[[System/color-system]]`
3. ✅ **Doc da agent architecture** — criado em `[[System/agent-architecture]]`

### P1 — Próxima semana
4. ⏳ **Retrofit frontmatter Fase 1** — 8 technical-sheets (desbloqueia Dataview queries)
5. ⏳ **Split competitor-intel.md** — criar `Research/competitors/` com 1 arquivo por marca
6. ⏳ **Criar agent `vault-ingestor`** (`.claude/agents/vault-ingestor.md`)
7. ⏳ **Adicionar refs de Templates/** nos 4 `_index.md` (elimina orfandade visual)

### P2 — Próximas 2 semanas
8. ⏳ **Retrofit frontmatter Fase 2–3** — Research + Content faltantes
9. ⏳ **Split content-templates.md** — criar `Content/templates/` por formato
10. ⏳ **Criar agent `vault-librarian`**

### P3 — Mês
11. ⏳ **Retrofit frontmatter Fase 4–5** — conclusão
12. ⏳ **Criar agent `content-producer`** (após calendar maio rodar)
13. ⏳ **Criar Dataview queries** de teste em `[[System/README]]`

### Monitorar (não agir)
- `issues-log.md` + `decisions-log.md` merge — aguardar crescimento
- `decisions-log.md` split por ano — aguardar > 500 linhas
- `trends.md` + `ingredient-reference.md` crescimento — ambos leves hoje

---

## 11. MÉTRICAS DE SUCESSO — 30 dias

Ao final do mês (18/05/2026), vault saudável quando:

- [ ] 100% dos arquivos com frontmatter (56/56)
- [ ] `competitor-intel.md` split em `Research/competitors/` (6 arquivos)
- [ ] `content-templates.md` split em `Content/templates/` (5 arquivos)
- [ ] Color system aplicado e visível em graph view
- [ ] 4 agents ativos em `.claude/agents/`
- [ ] Pelo menos 10 entradas em `System/interaction-log.md`
- [ ] 1 análise de co-ocorrência rodada (edge refinement Fase 1)
- [ ] Zero wiki-links quebrados (manter 100%)
- [ ] Zero arquivos > 500 linhas

---

## 12. Apêndices

### A. Distribuição por tamanho

| Faixa | Count | Arquivos notáveis |
|-------|------:|-------------------|
| 0–50 linhas | 7 | Templates, issues-log, READMEs curtos |
| 51–100 linhas | 15 | Technical-sheets, audience, _index MOCs |
| 101–200 linhas | 16 | brand-core, calendar, visual-language, sales-data, ids |
| 201–300 linhas | 13 | context-engine, campaign-01, JARVIS_ARCHITECTURE |
| 301–500 linhas | 4 | decisions-log, email-sequence, content-templates, product-catalog, ingredient-reference |
| 501+ linhas | 1 | **competitor-intel (697L)** |

### B. Frontmatter types atualmente em uso

`moc`, `system`, `brand-core`, `audience`, `visual-language`, `product-sheet` (só em alguns), `post-log`, `instagram-insights`, `campaign`, `post`, `unclassified`, `audit` (este arquivo)

Ver enum completo permitido em [[System/frontmatter-schema]].

### C. Pastas ainda vazias (vigiar)

- `Brand/themes/` — apenas `elite-performance.md`. OK (temas são raros).
- `Workflows/` — apenas `create-google-form.gs` + `_index.md`. Próximo item: `freepik-prompts.md` (mencionado em CLAUDE.md regra de acumulação mas ainda não existe).
- `_archive/` — apenas README. Começará a preencher com rotação de calendários em maio.

---

*Relatório gerado por Database Optimization Specialist em 18/04/2026. Próxima auditoria: 18/05/2026.*
*Rastreamento: adicionado em `[[Content/decisions-log]]` com ID sequencial.*
