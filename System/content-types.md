---
name: Content Types Schema
description: Schema estrutural de cada content type permitido no vault
type: system
status: active
date: 2026-04-18
tags: [system, schema]
---

# Content Types — Schema

Para cada `type` declarado no frontmatter, este arquivo define:
- **Propósito** — para que serve
- **Localização** — onde vive no vault
- **Estrutura mínima** — seções obrigatórias
- **Campos frontmatter extras** — além dos universais
- **Regras** — invariantes e comportamentos

---

## moc
**Propósito:** Map of Content — índice de domínio.
**Localização:** `<Dominio>/_index.md` ou `System/vault-map.md`
**Estrutura mínima:**
- Seção de orientação ("como navegar")
- Lista de arquivos do domínio agrupados por subtema
- Tabela de entidades canônicas relevantes ao domínio
**Regras:**
- MOC linka conteúdo, não contém conteúdo de negócio
- Atualizar quando arquivo novo é criado no domínio

---

## system
**Propósito:** Regra de arquitetura do vault.
**Localização:** `System/` (exclusivo)
**Estrutura mínima:**
- Título claro do escopo
- Regras numeradas ou em tabela
- Exemplos de aplicação
**Regras:**
- Toda mudança registrada em `decisions-log.md`
- Proibido conter dado de negócio

---

## brand-core
**Propósito:** DNA, pilares, stacks, origem de matéria-prima.
**Localização:** `Brand/brand-core.md` (singleton)
**Estrutura mínima:**
- DNA da marca (tagline, história)
- Pilares
- Ecossistema de produtos (matriz)
- Origem das matérias-primas
- Fabricação
- Contatos
**Regras:**
- Arquivo único. Cresce vertical, não duplica.

---

## product-sheet
**Propósito:** Ficha técnica oficial baseada em rótulo real.
**Localização:** `Brand/technical-sheets/<produto>-<sabor>.md`
**Estrutura mínima:**
- Especificações (SKU, peso, código de barras, sabor)
- Informação nutricional (tabela)
- Ingredientes (lista)
- Instruções de uso
- Advertências e regulatório
- Fabricação
**Frontmatter extra:**
```yaml
sku: <MPS####-xx>
barcode: "<string>"
product_family: <whey|creatine|glutamine|anabolic|lipo|multi>
flavor: <string>
weight_g: <int>
origin_country: <string>
supplier: <string>
```
**Regras:**
- Um arquivo por SKU/sabor
- Sempre citar fonte: "Fonte: Rótulo oficial — LABEL_<PRODUTO>.pdf"
- Linkar `[[Brand/brand-core]]` na seção Fabricação

---

## product-catalog
**Propósito:** Catálogo SKU-centric com preços, kits, status comercial.
**Localização:** `Brand/product-catalog.md` (singleton)

---

## ingredient-reference
**Propósito:** Ciência e dose clínica de ingredientes ativos.
**Localização:** `Brand/ingredient-reference.md` (singleton por agora; split se > 100KB)

---

## visual-language
**Propósito:** Identidade visual raíz — cores, tipografia, logo.
**Localização:** `Brand/visual-language.md` (singleton)

---

## theme
**Propósito:** Tema derivado da identidade visual para uso em entregáveis.
**Localização:** `Brand/themes/<nome>.md`

---

## audience
**Propósito:** Perfil de público, rede de afiliados, comportamento.
**Localização:** `Brand/audience.md` (singleton)

---

## post
**Propósito:** Registro cronológico de publicação.
**Localização:** Seção em `Content/post-history.md` (NÃO arquivo separado)
**Estrutura mínima da seção:**
- Header: `## DD/MM/AAAA — <formato> "<título>" — <produto>`
- Tabela de metadados (formato, canal, produto, template usado)
- Estrutura do post (slide/frame/step)
- Elementos visuais identificados
- Insights de conteúdo

---

## campaign
**Propósito:** Campanha multi-post com começo, meio e fim.
**Localização:** `Content/campaign-<NN>-<slug>.md`
**Estrutura mínima:**
- Objetivo
- Público-alvo
- Produtos em foco
- Cronograma (calendário de posts)
- KPIs esperados
- Links para posts de `post-history.md` após publicação

---

## template
**Propósito:** Template reutilizável de carrossel/reel/e-mail.
**Localização:** Seções em `Content/content-templates.md` (NÃO arquivo separado)

---

## calendar
**Propósito:** Calendário editorial ativo.
**Localização:** `Content/calendar.md` (singleton; rotacionar mensalmente via archive)

---

## email-sequence
**Propósito:** Sequência de e-mail com múltiplas mensagens.
**Localização:** `Content/email-sequence-<objetivo>.md`

---

## decision-log
**Propósito:** Append-only log de decisões tomadas em sessões.
**Localização:** `Content/decisions-log.md` (singleton)
**Estrutura mínima de entrada:**
```
## DD/MM/AAAA — <Título da decisão>
**Decisão:** ...
**Arquivo(s) atualizado(s):** [[...]]
**Motivo:** ...
---
```
**Regras:** nunca editar entradas passadas — criar correção como nova entrada.

---

## issue-log
**Propósito:** Append-only log de erros/pendências com IDs sequenciais.
**Localização:** `Content/issues-log.md` (singleton)
**Estrutura:** tabela com colunas ID, Descoberto, Arquivo, Erro, Correção, Status

---

## sales-data
**Propósito:** Dados consolidados de vendas de CSV/painel.
**Localização:** `Research/sales-data.md` (singleton; particionar por ano se > 50KB)
**Frontmatter extra:**
```yaml
period_start: <YYYY-MM-DD>
period_end: <YYYY-MM-DD>
source: <string>
last_ingested: <YYYY-MM-DD>
```

---

## instagram-insights
**Propósito:** Métricas de Instagram (alcance, engagement, vendas atribuídas).
**Localização:** `Research/instagram-insights.md` (singleton)

---

## competitor-intel
**Propósito:** Hub de inteligência competitiva — resumo executivo + navegação para perfis individuais e matriz gerada.
**Localização:** `Research/competitor-intel.md` (singleton)
**Estrutura mínima:**
- Resumo executivo (mercado + oportunidade/ameaça dominante)
- Índice de perfis individuais (link para cada marca em `Research/competitors/`)
- Link para `Research/competitor-matrix.md` (análise gerada)
- Seção de fontes consolidada

---

## competitor-profile
**Propósito:** Perfil individual de uma marca concorrente específica com foco em aplicar inteligência na própria produção de conteúdo.
**Localização:** `Research/competitors/<brand-slug>.md`
**Estrutura mínima:**
- Ficha rápida (holding, faturamento, presença)
- Visão geral (1 parágrafo)
- Análise de mensagem (tagline, proposta de valor, temas, tom e voz)
- Estratégia de produto (incluindo lançamentos e combos/kits)
- Marketing & Content Tear-down (Hooks que utilizam, Formas de CTA, Padrões de Design, Retenção)
- Pontos fortes & Pontos fracos
- Oportunidades Orgânicas para MP (como traduzir as fraquezas e tópicos virais deles em nossos Reels?)
- Atividade Recente (Intel diário absorvido via script)
**Frontmatter extra:**
```yaml
competitor_id: <slug>        # ID canônico em System/ids.md seção 8
tier: national | international
holding: <string>
revenue_estimate: <string>   # ex: "R$ 2B (2025)", "US$ 3,9B (Glanbia)"
hq_country: <string>
```
**Regras:**
- Um arquivo por marca
- Linkar `[[Research/competitor-intel]]` e `[[Research/competitor-matrix]]` em `related`
- Atualizar MOC `[[Research/competitors/_index]]` ao criar

---

## competitor-matrix
**Propósito:** Análise comparativa consolidada gerada a partir dos perfis individuais (matriz + lacunas + oportunidades + ameaças + recomendações + mapa de posicionamento).
**Localização:** `Research/competitor-matrix.md` (singleton)
**Estrutura mínima:**
- Matriz de mensagem (nacionais)
- Matriz de mensagem (internacionais)
- Análise de lacunas de conteúdo
- Oportunidades para MP
- Ameaças
- Recomendações estratégicas (imediato / médio prazo / longo prazo)
- Mapa de posicionamento
**Regras:**
- Deriva dos perfis individuais — não duplica texto narrativo
- Atualizar sempre que um `competitor-profile` for criado ou mudar tier/posicionamento

---

## trends
**Propósito:** Tendências de mercado e ingredientes emergentes.
**Localização:** `Research/trends.md` (singleton)

---

## survey
**Propósito:** Survey estruturado com perguntas e respostas.
**Localização:** `Research/<escopo>-survey.md`

---

## audit
**Propósito:** Auditoria estruturada (design, brand, SEO, etc.).
**Localização:** `Research/<escopo>-audit.md`
**Estrutura mínima:**
- Data + score
- Pontos fortes
- Gaps por prioridade (P0/P1/P2)
- Ações priorizadas

---

## sop
**Propósito:** Standard Operating Procedure — passo-a-passo operacional.
**Localização:** `Workflows/<nome>-sop.md`

---

## script
**Propósito:** Código executável (Google Apps Script, JS, etc.).
**Localização:** `Workflows/<nome>.<ext>` (não `.md`)
**Documentação acompanha:** `Workflows/<nome>-sop.md` opcional

---

## prompt-library
**Propósito:** Biblioteca de prompts aprovados (Freepik, Canva AI, etc.).
**Localização:** `Workflows/<tool>-prompts.md`

---

## reference
**Propósito:** Mapa/estrutura de sistema externo.
**Localização:** `Research/<dominio>-map.md`

---

## unclassified
**Propósito:** Staging em Inbox aguardando classificação.
**Localização:** `Inbox/`
**Regras:** processar em ≤ 1 sessão após upload; nunca manter por > 7 dias.

---

## Como adicionar novo content type

1. Propor em `decisions-log.md` com motivo
2. Adicionar seção aqui
3. Adicionar ao enum de `frontmatter-schema.md`
4. Atualizar `taxonomy.md` com regra de roteamento
5. Atualizar `ingestion-pipeline.md` com regra de detecção
