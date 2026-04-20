---
name: "Systems Checkup Report — Medicinal Pharma Brain"
description: Auto-generated frontmatter retrofit
type: audit
status: active
date: 2026-04-20
tags: [audit, system]
related:
  - "[[SYSTEMS_CHECKUP_REPORT]]"
---

# Systems Checkup Report — Medicinal Pharma Brain
**Data do diagnóstico:** 18/04/2026
**Responsável:** Claude (Data Systems Engineer)
**Escopo:** Auditoria completa de arquitetura de dados + plano de future-proofing

---

## 1. Estado atual — inventário

| Dimensão | Valor | Observação |
|----------|-------|------------|
| Arquivos `.md` | 28 | distribuídos em 4 pastas top-level |
| Pastas top-level | 4 | Brand, Content, Research, Workflows |
| Subpastas | 2 | Brand/technical-sheets, Brand/themes |
| Arquivos > 10KB | 7 | ingredient-reference (40KB), competitor-intel (49KB), content-templates (20KB), decisions-log (20KB), product-catalog (20KB), email-sequence (15KB), calendar (11KB) |
| Auto-leitura no CLAUDE.md | 6 arquivos | CONTEXT, brand-core, visual-language, audience, instagram-insights, post-history |
| Logs operacionais | 2 | decisions-log, issues-log |
| Frontmatter YAML | 0 arquivos | — |
| IDs canônicos | 0 | tudo referenciado por nome/wiki-link |
| MOC (Map of Content) | 1 parcial | CONTEXT.md atua como hub raiz |
| Dropzone/Inbox | Nenhum | — |
| Archive | Nenhum | — |

---

## 2. Pontos fortes

1. **CLAUDE.md robusto** — define regras de acumulação, memória ativa e convenções de vault.
2. **Rastreabilidade operacional** — `decisions-log.md` e `issues-log.md` capturam histórico com IDs sequenciais.
3. **Referências cruzadas** — uso consistente de wiki-links `[[...]]` entre domínios.
4. **Separação de domínios** — Brand / Content / Research são áreas claras.
5. **Schema de fichas técnicas** — `technical-sheets/*.md` seguem template consistente (6 produtos catalogados).
6. **Contexto vivo** — `CONTEXT.md` funciona como dashboard com links para profundidade.
7. **Logs de datas em DD/MM/AAAA** — convenção respeitada em toda a base.

---

## 3. Riscos críticos para o crescimento (sem intervenção)

### 🔴 P0 — Bloqueadores de escala

| # | Risco | Impacto previsto a 10× volume |
|---|-------|-------------------------------|
| R1 | **Sem Inbox/ dropzone** — conteúdo novo precisa ser classificado manualmente a cada upload | Cada upload vira uma conversa de 3–5 turnos para decidir onde vai |
| R2 | **Sem frontmatter YAML** — impossível filtrar/agregar por tipo, status, data, produto | Nenhuma query Dataview funciona; graph view não consegue clusterizar |
| R3 | **Sem taxonomia documentada** — regras de classificação existem apenas na cabeça do usuário | Inconsistência cresce com cada sessão; arquivos ficam em pastas erradas |
| R4 | **Sem IDs canônicos** — "Whey" pode virar "Magnific Whey", "Whey 3W", "Magnific Whey 3W", "whey-choc-avela" | Broken links se multiplicam; agregações ficam erradas |
| R5 | **Sem pipeline de ingestão automatizado** — Claude precisa decidir manualmente a cada vez | O pedido literal do usuário: "consumir dados mesmo sem descrição" não é atendido |

### 🟡 P1 — Degradação progressiva

| # | Risco | Impacto previsto |
|---|-------|------------------|
| R6 | **Sem archive policy** — calendários/campanhas antigas misturam com ativas | A partir de ~6 meses, dif~ícil distinguir "vigente" de "histórico" |
| R7 | **Sem convenção de naming documentada** — mistura de kebab-case sem data prefix | Ordenação cronológica impossível; duplicatas sem detecção |
| R8 | **Sem MOCs por domínio** — navegação depende de CONTEXT.md que já está denso | A cada 10 arquivos novos, CONTEXT.md precisa ser reescrito |
| R9 | **Sem schema explícito por content type** — o que é uma "research" válida? uma "decisão"? | Claude improvisa a cada adição; formato sai do padrão |
| R10 | **Workflows/ sub-utilizado** — tem 1 arquivo `.gs`, não documenta processos operacionais | Conhecimento operacional fica apenas em CLAUDE.md, que vira monolito |

### 🟢 P2 — Dívidas técnicas menores

| # | Risco | Nota |
|---|-------|------|
| R11 | `ingredient-reference.md` (40KB) e `competitor-intel.md` (49KB) viram difíceis de scanear | Considerar split futuro |
| R12 | Sem changelog de versão no nível do vault | Git não está ativo — mudanças estruturais não têm rastro |
| R13 | `instagram-insights.md` (2.8KB) está leve — pode absorver mais dados analíticos | Crescimento natural |

---

## 4. O pedido do usuário, traduzido em requisitos técnicos

> "Consumir dados eficientemente mesmo sem descrição. Identificar o que foi upado, que tipo de conteúdo é, e a que se relaciona dentro do sistema."

**Requisitos decorrentes:**

| Req | Tradução técnica | Solução |
|-----|-------------------|---------|
| Q1 | Dropzone universal para qualquer upload | `Inbox/` com README |
| Q2 | Detecção de tipo sem input humano | `System/ingestion-pipeline.md` — árvore de decisão por extensão + padrão de conteúdo |
| Q3 | Classificação automática em taxonomia | `System/taxonomy.md` — regras de routing domínio → pasta |
| Q4 | Extração de entidades (produto, pessoa, data, canal) | `System/ids.md` — dicionário canônico para matching |
| Q5 | Metadados estruturados | `System/frontmatter-schema.md` — YAML obrigatório por tipo |
| Q6 | Relacionamento dentro do sistema | `System/relationships.md` — padrões de backlink + MOCs |
| Q7 | Schema validável por tipo | `System/content-types.md` — schema de cada content type |
| Q8 | Regras operacionais para Claude | Update em `CLAUDE.md` — Pipeline de Ingestão |

---

## 5. Arquitetura alvo (after)

```
Medicinal Pharma Brain/
├─ CLAUDE.md                      ← regras operacionais (atualizado)
├─ CONTEXT.md                     ← dashboard raiz (atualizado)
├─ SYSTEMS_CHECKUP_REPORT.md      ← este relatório
│
├─ System/                        ← 🆕 camada meta (schemas, taxonomias, pipelines)
│  ├─ README.md
│  ├─ vault-map.md                ← MOC dos MOCs
│  ├─ taxonomy.md                 ← regras de classificação
│  ├─ frontmatter-schema.md       ← YAML standard
│  ├─ file-naming.md              ← naming conventions
│  ├─ content-types.md            ← schema por tipo
│  ├─ ingestion-pipeline.md       ← 🔑 árvore de decisão para uploads
│  ├─ ids.md                      ← dicionário canônico
│  ├─ archive-policy.md           ← retenção/rotação
│  └─ relationships.md            ← padrões de linkagem
│
├─ Inbox/                         ← 🆕 dropzone universal
│  └─ README.md
│
├─ _archive/                      ← 🆕 retenção de conteúdo time-bound
│  └─ README.md
│
├─ Brand/
│  ├─ _index.md                   ← 🆕 MOC do domínio Brand
│  ├─ brand-core.md
│  ├─ visual-language.md
│  ├─ audience.md
│  ├─ product-catalog.md
│  ├─ ingredient-reference.md
│  ├─ technical-sheets/
│  └─ themes/
│
├─ Content/
│  ├─ _index.md                   ← 🆕 MOC do domínio Content
│  ├─ calendar.md
│  ├─ content-templates.md
│  ├─ post-history.md
│  ├─ decisions-log.md
│  ├─ issues-log.md
│  ├─ campaign-01-origem-performance.md
│  └─ email-sequence-lead-nurture.md
│
├─ Research/
│  ├─ _index.md                   ← 🆕 MOC do domínio Research
│  └─ (arquivos existentes)
│
└─ Workflows/
   ├─ _index.md                   ← 🆕 MOC do domínio Workflows
   └─ create-google-form.gs
```

---

## 6. Princípios de design aplicados

1. **Convention over configuration** — padrões explícitos substituem decisões ad-hoc.
2. **Content-addressable** — todo arquivo tem frontmatter com `type`, `id`, `status`, `date`, `tags`, `related`.
3. **Idempotência na ingestão** — reprocessar o mesmo arquivo duas vezes produz o mesmo resultado.
4. **Graph-first** — toda menção de entidade canônica vira wiki-link.
5. **Fail-loud, fail-fast** — conteúdo não-classificável fica em `Inbox/_unclassified/` com issue auto-criado.
6. **Progressive disclosure** — MOCs em cada domínio; CONTEXT.md só linka os MOCs; cresce linear, não quadrático.
7. **Time-aware** — conteúdo com `expires_at` ou `status: archived` migra para `_archive/` via revisão periódica.

---

## 7. Plano de implementação (esta sessão)

| Ordem | Entregável | Arquivo(s) | Status |
|-------|-----------|------------|--------|
| 1 | Diagnóstico | `SYSTEMS_CHECKUP_REPORT.md` | ✅ (este) |
| 2 | Camada System/ | 10 arquivos | ⏳ em execução |
| 3 | Inbox/ | `Inbox/README.md` | ⏳ |
| 4 | _archive/ | `_archive/README.md` | ⏳ |
| 5 | MOCs por domínio | 4 `_index.md` | ⏳ |
| 6 | Atualizar CLAUDE.md | regras de ingestão | ⏳ |
| 7 | Atualizar CONTEXT.md | referências ao System/ | ⏳ |
| 8 | Memória persistente | decisões arquiteturais | ⏳ |

---

## 8. Próximos passos recomendados (fora do escopo desta sessão)

1. **Inicializar Git** no vault — dá rastreabilidade + rollback sem custo.
2. **Instalar plugin Dataview no Obsidian** — habilita queries sobre frontmatter.
3. **Configurar plugin Templater** — permite preencher frontmatter automaticamente.
4. **Plugin QuickAdd** — atalhos de ingestão para Inbox.
5. **Plugin Paste URL into Selection** + **Auto Link Title** — captura web rápida.
6. **Revisão trimestral** do archive — migrar conteúdo time-bound.
7. **Retrofit gradual dos arquivos existentes** com frontmatter (começar pelos auto-lidos).

---

## 9. Métricas de sucesso

Após implantação, o sistema é considerado saudável quando:

- [ ] 100% dos uploads em `Inbox/` são classificados corretamente sem intervenção humana
- [ ] 0 arquivos com `type` ausente no frontmatter (após retrofit)
- [ ] 100% dos produtos, personas, campanhas e canais referenciados via ID canônico
- [ ] `CONTEXT.md` permanece abaixo de 100 linhas (linka MOCs, não conteúdo)
- [ ] `vault-map.md` fornece caminho até qualquer arquivo em ≤ 3 cliques
- [ ] Pipeline de ingestão reproduzível: mesmo input → mesmo output

---

*Fim do relatório. Próximo: construção da camada System/.*
