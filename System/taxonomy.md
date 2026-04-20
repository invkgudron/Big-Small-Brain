---
name: Taxonomy
description: Regras de classificação — que pasta recebe qual tipo de conteúdo
type: system
status: active
date: 2026-04-18
tags: [system, classification, routing]
---

# Taxonomy — Regras de Classificação

Cada conteúdo novo é roteado pela seguinte hierarquia de decisão. A regra é **determinística**: a mesma entrada sempre produz o mesmo destino.

---

## 1. Domínios top-level

| Domínio | Escopo |
|---------|--------|
| **Brand/** | Tudo que define quem a marca é: produto, identidade, audiência, ingredientes |
| **Content/** | Tudo que é produzido para publicar: posts, campanhas, templates, e-mails, calendário, decisões de conteúdo |
| **Research/** | Tudo que informa decisões: dados, insights, auditorias, competidores, tendências, surveys |
| **Workflows/** | Tudo que automatiza ou padroniza um processo operacional: scripts, SOPs, prompts aprovados |
| **System/** | Meta — regras do próprio vault. Nunca conteúdo de negócio aqui. |
| **Inbox/** | Staging — conteúdo não-classificado aguardando ingestão |
| **_archive/** | Histórico time-bound arquivado |

---

## 2. Matriz de roteamento por intenção

| Se o conteúdo é... | Vai para... | Subpasta / arquivo |
|--------------------|-------------|--------------------|
| Ficha técnica de produto (rótulo, composição) | `Brand/technical-sheets/` | 1 arquivo por SKU/sabor |
| DNA, pilares, stacks, origem de matéria-prima | `Brand/` | `brand-core.md` (append) |
| Paleta, tipografia, logo, design tokens | `Brand/` | `visual-language.md` (append) |
| Tema visual derivado (para decks/carrosséis) | `Brand/themes/` | 1 arquivo por tema |
| Perfil de público, cupons, afiliados, geografia | `Brand/` | `audience.md` (append ou seção) |
| Catálogo: SKU + preço + kit + estoque | `Brand/` | `product-catalog.md` |
| Ingrediente ativo: efeito, dose clínica, estudo | `Brand/` | `ingredient-reference.md` |
| Perfil de fornecedor / parceiro (detalhes corporativos) | `Brand/suppliers/` | 1 arquivo por fornecedor |
| Post publicado (carrossel, reel, story) | `Content/` | `post-history.md` (append — seção por data) |
| Campanha (multi-post, período definido) | `Content/` | `campaign-NN-slug.md` |
| Template reutilizável (carrossel, reel, e-mail) | `Content/` | `content-templates.md` |
| Calendário editorial (grade semanal/mensal) | `Content/` | `calendar.md` |
| Sequência de e-mail | `Content/` | `email-sequence-<slug>.md` |
| Decisão tomada na sessão | `Content/` | `decisions-log.md` (append) |
| Erro/inconsistência/pendência | `Content/` | `issues-log.md` (append — nova linha com ID) |
| Dados de vendas (CSV, relatório, métricas) | `Research/` | `sales-data.md` (update) |
| Métricas de IG (alcance, engagement) | `Research/` | `instagram-insights.md` (append) |
| Perfil de concorrente individual | `Research/competitors/` | 1 arquivo por marca (`<brand-slug>.md`) |
| Matriz de análise competitiva (gerada) | `Research/` | `competitor-matrix.md` (singleton) |
| Hub de inteligência competitiva | `Research/` | `competitor-intel.md` (singleton — exec summary + nav) |
| Tendência de mercado, ingrediente emergente | `Research/` | `trends.md` (append) |
| Survey, feedback estruturado | `Research/` | `<tipo>-survey.md` |
| Auditoria (design, SEO, brand, etc.) | `Research/` | `<escopo>-audit.md` |
| Mapa de site / estrutura externa | `Research/` | `website-map.md` ou `<dominio>-map.md` |
| Prompt aprovado (Freepik, Canva AI, etc.) | `Workflows/` | `freepik-prompts.md` (append) |
| Script de automação | `Workflows/` | `<nome>.gs` ou `<nome>.js` |
| SOP / processo operacional | `Workflows/` | `<nome>-sop.md` |
| Regra de sistema (novo schema, nova convenção) | `System/` | arquivo específico |

---

## 3. Tags canônicas

Tags são complementares ao roteamento — permitem queries cross-pasta.

### Tags de dimensão
- `#product/<id>` — ex: `#product/whey-3w`, `#product/creatine`
- `#persona/<id>` — ex: `#persona/nucleo`, `#persona/aquisicao`
- `#channel/<id>` — ex: `#channel/instagram`, `#channel/email`, `#channel/whatsapp`
- `#campaign/<id>` — ex: `#campaign/origem-performance`
- `#theme/<id>` — ex: `#theme/elite-performance`

### Tags de tipo (redundantes com frontmatter mas úteis)
- `#type/post`, `#type/campaign`, `#type/template`, `#type/decision`, `#type/research`

### Tags de status
- `#status/draft`, `#status/active`, `#status/archived`, `#status/deprecated`

---

## 4. Heurísticas de desempate

Quando o conteúdo pode caber em 2+ categorias:

| Dilema | Resolução |
|--------|-----------|
| Post histórico vs. template | Se foi publicado → `post-history`. Se é reusável → `content-templates`. Ambos → copia para os dois, com link. |
| Concorrente vs. tendência | Se é sobre **marca específica** → `competitor-intel`. Se é padrão de mercado → `trends`. |
| Decisão vs. issue | Algo a **fazer**/corrigir → `issues-log`. Algo **resolvido**/direção tomada → `decisions-log`. |
| Ficha técnica vs. catálogo | Rótulo oficial (nutricional, composição) → `technical-sheets/`. SKU + preço + kit → `product-catalog`. |
| Ingrediente específico vs. ficha | Efeito/ciência de um ativo → `ingredient-reference`. Como aparece em um produto → `technical-sheets/`. |

---

## 5. Regras de exclusão

Nunca criar:
- ❌ Arquivo em `System/` que contenha dado de negócio
- ❌ Arquivo em `Inbox/` que já esteja classificado (mover para destino)
- ❌ Arquivo top-level fora de CONTEXT / CLAUDE / SYSTEMS_CHECKUP_REPORT
- ❌ Subpasta não documentada neste arquivo
- ❌ Mais de um arquivo para a mesma entidade canônica

---

## 6. Quando nenhuma regra se encaixa

1. Deixar em `Inbox/_unclassified/`
2. Abrir entry em `[[Content/issues-log]]` com ID sequencial
3. Pedir input do usuário
4. Após decisão: atualizar **esta taxonomia** (`System/taxonomy.md`) com a nova regra
5. Mover o arquivo para o destino correto

---

*A taxonomia evolui. Cada nova regra é uma decisão registrada.*
