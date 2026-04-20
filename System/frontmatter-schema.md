---
name: Frontmatter Schema
description: Especificação do YAML obrigatório em todo arquivo do vault
type: system
status: active
date: 2026-04-18
tags: [system, schema, metadata]
---

# Frontmatter Schema

Todo arquivo `.md` criado no vault **deve** ter frontmatter YAML. O frontmatter é a base para queries Dataview, filtros, graph view e auto-classificação.

---

## Campos universais (todo arquivo)

```yaml
---
name: <string>             # nome curto humano-legível
description: <string>      # 1 linha descrevendo o que este arquivo contém
type: <enum>               # ver System/content-types.md
status: <enum>             # draft | active | archived | deprecated
date: <YYYY-MM-DD>         # data de criação (não mudar após criação)
updated: <YYYY-MM-DD>      # opcional — preencher a cada edição substantiva
tags: [<tag>, <tag>]       # ver taxonomy.md seção 3
---
```

### Valores permitidos

**`type`** (ver schema completo em [[System/content-types]]):
- `moc` — Map of Content (índice de domínio)
- `system` — meta-regra (só em `System/`)
- `brand-core` — DNA/fundamentos da marca
- `product-sheet` — ficha técnica de produto
- `product-catalog` — catálogo SKU
- `ingredient-reference` — ciência de ingredientes
- `visual-language` — identidade visual
- `theme` — tema derivado
- `audience` — perfil de público
- `post` — publicação registrada
- `campaign` — campanha multi-post
- `template` — template reusável
- `calendar` — calendário editorial
- `email-sequence` — sequência de e-mail
- `decision-log` — log de decisões
- `issue-log` — log de issues
- `sales-data` — dados de venda
- `instagram-insights` — métricas IG
- `competitor-intel` — hub de inteligência competitiva (exec summary + nav)
- `competitor-profile` — perfil individual de marca concorrente
- `competitor-matrix` — matriz comparativa gerada
- `trends` — tendências de mercado
- `survey` — survey/feedback
- `audit` — auditoria estruturada
- `sop` — standard operating procedure
- `script` — código (GAS, JS, etc.)
- `prompt-library` — prompts aprovados
- `reference` — referência externa (mapa de site, etc.)
- `unclassified` — staging em Inbox/

**`status`:**
- `draft` — em construção
- `active` — vigente, em uso
- `archived` — histórico (sem edições futuras)
- `deprecated` — superado por outro arquivo (linkar sucessor em `supersedes`)

---

## Campos por tipo (opcionais mas recomendados)

### type: post
```yaml
post_id: <YYYY-MM-DD-slug>
format: carousel | reel | story | photo
channel: instagram | tiktok | youtube
product_refs: [<id>, ...]       # IDs canônicos — ver System/ids.md
campaign_ref: <campaign-id>     # opcional
template_ref: <template-name>   # opcional
metrics:
  reach: <int>
  likes: <int>
  saves: <int>
  shares: <int>
  comments: <int>
```

### type: campaign
```yaml
campaign_id: <NN-slug>
start_date: <YYYY-MM-DD>
end_date: <YYYY-MM-DD>
objective: <string>
product_refs: [<id>, ...]
channels: [<id>, ...]
```

### type: product-sheet
```yaml
sku: <MPS####-xx>
barcode: <string>
product_family: <whey|creatine|glutamine|anabolic|lipo|multi>
flavor: <string>
weight_g: <int>
price_brl: <number>
origin_country: <string>
supplier: <string>
```

### type: decision-log, issue-log
```yaml
# tabela append — não precisa de campos por entry, apenas:
type: decision-log   # ou issue-log
status: active
```

### type: sales-data, instagram-insights
```yaml
period_start: <YYYY-MM-DD>
period_end: <YYYY-MM-DD>
source: <string>           # ex: "Nuvemshop CSV", "IG Insights export"
last_ingested: <YYYY-MM-DD>
```

### type: template
```yaml
template_name: <string>
format: carousel | reel | email | story
slide_count: <int>          # se carousel/reel
approved_examples: [<post_id>, ...]
```

---

## Campos de relação (opcionais, universais)

```yaml
related: [[[arquivo]], [[arquivo]]]      # cross-references fortes
supersedes: [[arquivo-antigo]]           # se substitui um arquivo
superseded_by: [[arquivo-novo]]          # se foi substituído
source: <URL|path>                       # origem externa (CSV, PDF, URL)
confidence: high | medium | low          # se conteúdo é inferido
expires_at: <YYYY-MM-DD>                 # para conteúdo time-bound (calendar, campaign)
```

---

## Exemplos

### Post publicado
```yaml
---
name: Por que 3W — Magnific Whey
description: Carrossel de 5 slides explicando o blend 3W
type: post
status: active
date: 2026-04-16
tags: [post, carousel, product/whey-3w, channel/instagram]
post_id: 2026-04-16-porque-3w
format: carousel
channel: instagram
product_refs: [MPS0004-CH, MPS0004-MR]
template_ref: carrossel-educativo
---
```

### Ficha técnica
```yaml
---
name: Power Creatine Micronized
description: Ficha técnica oficial — creatina monohidratada 300g
type: product-sheet
status: active
date: 2026-04-16
tags: [product-sheet, product/creatine]
sku: MPS0006
barcode: "0602883735545"
product_family: creatine
flavor: natural
weight_g: 300
origin_country: Alemanha
---
```

### Entrada em Inbox
```yaml
---
name: (gerado automaticamente do filename)
description: Staging — aguardando classificação
type: unclassified
status: draft
date: 2026-04-18
source: <caminho ou URL original>
tags: [unclassified]
---
```

---

## Retrofit dos arquivos existentes

Arquivos criados **antes** desta convenção não têm frontmatter. Plano:

1. **Fase 1 (prioridade)** — arquivos auto-lidos em CLAUDE.md (6 arquivos)
2. **Fase 2** — technical-sheets (8 arquivos)
3. **Fase 3** — restante

A retrofit deve ocorrer em sessões dedicadas, registrada em `decisions-log.md`.

---

## Validação

Regra: **se `type` está ausente ou não está na lista permitida, o arquivo está quebrado.**

Claude deve validar frontmatter ao ler um arquivo e reportar em `issues-log.md` se inválido.
