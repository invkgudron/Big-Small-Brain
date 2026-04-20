---
name: Intent Classifier
description: Tabela de decisão — mapeamento de pedido → task type → arquivos → formato de saída
type: system
status: active
date: 2026-04-18
tags: [system, jarvis, classification, intent]
weight: 9
related:
  - "[[System/context-engine]]"
  - "[[System/ids]]"
  - "[[System/taxonomy]]"
---

# Intent Classifier

Tabela de referência rápida usada no PASSO 1 do `[[System/context-engine]]`.

---

## 1. Mapeamento task_type × arquivos core

### CREATE — criar conteúdo novo

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Post Instagram (carrossel) | "carrossel", "slides", "post" | content-templates, post-history, visual-language |
| Post Instagram (reel) | "reel", "vídeo", "roteiro" | content-templates § reels, visual-language |
| Story | "story", "storie" | content-templates § stories, visual-language |
| Caption | "caption", "legenda", "texto do post" | post-history (estilo), content-templates § legenda |
| Campanha | "campanha", "plano", "série de posts" | campaign (ativo), calendar, content-templates |
| E-mail | "e-mail", "newsletter", "sequência" | email-sequence (ativo), content-templates |
| Briefing criativo | "brief", "briefing", "orientação" | brand-core, visual-language, audience |
| Ficha técnica | "ficha", "especificações", "rótulo" | Templates/product-sheet, brand-core § fabricação |

### ANALYZE — analisar dados

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Performance de vendas | "vendas", "pedidos", "receita", "ticket" | sales-data, instagram-insights |
| Engagement Instagram | "alcance", "engajamento", "curtidas", "saves" | instagram-insights, post-history |
| Afiliados / cupons | "afiliado", "cupom", "parceiro", "OITAVA" | audience § afiliados, sales-data |
| Produto específico | nome/SKU de produto | technical-sheet × sales-data × post-history |
| Competidores | "concorrente", "mercado", "vs", "benchmark" | competitor-intel, trends, brand-core |
| Tendências | "tendência", "ingrediente novo", "mercado" | trends, competitor-intel, ingredient-reference |
| Público | "público", "quem compra", "perfil", "persona" | audience, sales-data, instagram-insights |

### DECIDE — tomar decisão

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Produto para focar | "qual produto", "priorizar", "investir em" | sales-data, instagram-insights, product-catalog |
| Preço | "preço", "valor", "ajuste", "markup" | sales-data § evolução de preços, product-catalog |
| Canal / formato | "onde postar", "instagram ou e-mail", "formato" | instagram-insights, post-history, audience |
| Afiliado / parceria | "afiliado", "parceiro", "cupom" | audience § afiliados, sales-data |
| Campanha | "lançar", "campanha nova", "quando" | calendar, decisions-log, instagram-insights |
| Stack / kit | "kit", "stack", "combo" | brand-core § stacks, sales-data § kits |

### PLAN — planejar

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Calendário editorial | "calendário", "grade", "semana", "mês" | calendar, campaign (ativo), post-history |
| Campanha nova | "nova campanha", "lançamento", "estratégia" | decisions-log, instagram-insights, audience |
| Sequência de e-mail | "nurture", "funil", "e-mail sequence" | email-sequence, audience § comportamento |
| Cronograma de produto | "lançar produto", "novo SKU" | product-catalog, brand-core, decisions-log |

### RETRIEVE — buscar informação

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Dado de produto | "quanto custa", "qual o SKU", "ingredientes" | technical-sheet × product-catalog |
| Dado de público | "quem compra", "geolocalização", "ticket médio" | audience, sales-data |
| Precedente | "já fizemos", "a gente definiu", "você se lembra" | decisions-log, post-history |
| Issue aberta | "pendência", "bug", "problema" | issues-log |
| Ciência de ingrediente | "como funciona", "mecanismo", "estudo" | ingredient-reference, technical-sheet |
| Regra do vault | "como funciona o brain", "qual convenção" | System/taxonomy, System/file-naming, System/content-types |

### COMPARE — comparar

| Sub-tipo | Sinais extras | Arquivos T2 garantidos |
|----------|---------------|----------------------|
| Produtos MP entre si | "diferença entre Whey e Creatina" | technical-sheets dos dois + brand-core § ecossistema |
| MP vs. concorrente | "MP vs. Optimum", "como somos vs. X" | competitor-intel, brand-core, ingredient-reference |
| Formato de conteúdo | "carrossel vs. reel", "qual performa melhor" | instagram-insights, post-history |
| Canais | "IG vs. e-mail", "onde investir" | instagram-insights, email-sequence, audience |

---

## 2. Mapeamento de entidade → arquivos específicos

| Entidade detectada | Arquivos que ela ativa (T3) |
|-------------------|----------------------------|
| `power-creatine` / "creatina" | `Brand/technical-sheets/power-creatine.md` + `ingredient-reference § creatina-monohidratada` |
| `whey-choc-avela` / `whey-morango` / "whey" / "magnific" | `Brand/technical-sheets/magnific-whey-*.md` + `ingredient-reference § whey-*` |
| `l-glutamine` / "glutamina" | `Brand/technical-sheets/l-glutamine.md` + `ingredient-reference § l-glutamina` |
| `lipo-x-hd` / "lipo" / "termogênico" | `Brand/technical-sheets/lipo-x-hd.md` + `ingredient-reference § cafeina, carnitina` |
| `anabolic-maca-verde` / `anabolic-morango-ice` / "pré-treino" / "anabolic" | `Brand/technical-sheets/anabolic-*.md` + `ingredient-reference § beta-alanina, taurina` |
| `multi-az` / "multivitamínico" / "multi" | `Brand/technical-sheets/multi-az.md` |
| `kit-ganho-extremo` | `brand-core § stacks` + `product-catalog § kit` + technical-sheets de whey, creatina, anabolic |
| `kit-definicao-absoluta` | `brand-core § stacks` + technical-sheets de lipo, multi-az |
| `kit-recuperacao` | `brand-core § stacks` + technical-sheets de whey, glutamina |
| `nucleo` / "atleta", "personal", "afiliado" | `Brand/audience.md § perfil primário` + `instagram-insights` |
| `aquisicao` / "iniciante", "novo praticante" | `Brand/audience.md § público de aquisição` + `sales-data` |
| `instagram` / "post", "reel", "carrossel" | `Content/content-templates.md` + `Brand/visual-language.md` |
| `email` / "newsletter", "e-mail" | `Content/email-sequence-lead-nurture.md` |
| `abc-paulista` / "ABC", "São Bernardo", "Santo André", "SBC" | `Brand/audience.md § distribuição geográfica` + `Research/sales-data § pedidos SP` |
| `OITAVA` / "afiliado OITAVA" | `Brand/audience.md § afiliados` + `Research/sales-data § cupom OITAVA` |
| `campaign-01-origem-performance` / "campanha" (sem especificar) | `Content/campaign-01-origem-performance.md` + `Content/calendar.md` |
| `glanbia` / "fornecedor whey" | `Brand/brand-core.md § origem` |
| `bioghen` / "fabricante" | `Brand/brand-core.md § fabricação` |
| `beta-alanina` / "beta alanina" | `Brand/ingredient-reference.md § Beta-Alanina` + `anabolic technical-sheets` |
| `cafeina` / "cafeína" | `Brand/ingredient-reference.md § Cafeína` + `lipo-x-hd, anabolic technical-sheets` |
| `creatina-monohidratada` | `Brand/ingredient-reference.md § Creatina Monohidratada` + `power-creatine` |
| qualquer HEX / "#20388a" / "azul principal" | `Brand/visual-language.md` + `Brand/themes/elite-performance.md` |

---

## 3. Sinais de urgência e adaptação

| Sinal | Adaptação |
|-------|-----------|
| "preciso agora", "urgente", "pra hoje" | Comprimir síntese — priorizar entregável sobre explicação |
| "me explica", "como funciona", "por quê" | Expandir contexto científico / estratégico — incluir ingredient-reference e decisions-log |
| "só me fala o número", "resposta rápida" | RETRIEVE puro — 1–3 arquivos, resposta em 1 parágrafo |
| "vamos fazer tudo", "sessão completa" | Multi-deliverable — decompor em sub-pedidos, executar em sequência com log entre cada um |
| "você lembra quando", "a gente decidiu" | Priorizar decisions-log e post-history sobre arquivos brand |
| "tá certo isso?", "confirma pra mim" | VERIFY mode — ler o arquivo canônico + comparar com o que foi dito |

---

## 4. Composição multi-domínio

Pedidos que cruzam 2+ domínios:

| Pedido | Domínios | Sequência de assembly |
|--------|----------|----------------------|
| "criar post baseado nos dados de vendas" | content + research | Parsear entidades de research primeiro → usar como contexto para CREATE |
| "planejar campanha de acordo com tendências" | content + research | Ler trends + competitor-intel → alimentar PLAN |
| "decidir qual produto focar com base na audiência" | brand + research | audience + sales-data → DECIDE × product-catalog |
| "escrever e-mail usando o tom de voz certo" | content + brand | brand-core + visual-language → CREATE email |
| "como a Creatina se compara com o que o concorrente faz" | brand + research | power-creatine + competitor-intel → COMPARE |

Para multi-domínio: **RESEARCH precede CREATE** (dados informam conteúdo). **BRAND precede CONTENT** (identidade informa produção).

---

## 5. Pedidos multi-deliverable

Quando o pedido inclui conjunção "e", "mais", "também", "além de":

```
Detectar cada sub-pedido
→ Para cada um: PARSE separado → ASSEMBLE separado → CONNECT compartilhado
→ Executar sequencialmente (não em paralelo — manter coerência)
→ LOG unificado com todos os sub-pedidos
```

Exemplo: "cria o carrossel de creatina E atualiza o calendário com a data de publicação"
- Sub-pedido 1: CREATE carrossel (power-creatine × content-templates × audience)
- Sub-pedido 2: WRITE calendar (calendar.md + resultado do sub-pedido 1)
- Executar 1 primeiro, depois 2

---

*Tabela de referência — usada no PASSO 1 de [[System/context-engine]]*
*Atualizar quando novo produto, canal, persona ou tipo de pedido aparecer*
