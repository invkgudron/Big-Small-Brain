---
name: Context Engine
description: Protocolo de montagem dinâmica de contexto — o núcleo do Jarvis Protocol
type: system
status: active
date: 2026-04-18
tags: [system, jarvis, context, intelligence]
weight: 10
activation_contexts: [session-start, post-creation, campaign-planning, data-analysis, decide, plan, retrieve, compare, create]
related:
  - "[[System/intent-classifier]]"
  - "[[System/ids]]"
  - "[[System/interaction-log]]"
  - "[[JARVIS_ARCHITECTURE]]"
---

# Context Engine — Protocolo de Montagem Dinâmica

**Este arquivo substitui a lista estática de "memória ativa" do CLAUDE.md.**

Quando um pedido chega, execute este protocolo — não leia 7 arquivos fixos. Leia os arquivos certos para *este* pedido específico.

---

## PASSO 1 — PARSE (< 5 segundos, antes de ler qualquer arquivo)

Extrair do pedido do usuário:

### 1A. Entidades
Comparar cada termo do pedido contra `[[System/ids]]`:

```
Para cada palavra/frase no pedido:
  → É produto? → resolver ID canônico (ex: "creatina" → power-creatine, MPS0006)
  → É persona? → nucleo | aquisicao
  → É canal? → instagram | email | whatsapp | site
  → É campanha? → campaign-01-origem-performance | ...
  → É cupom/afiliado? → OITAVA | RAFA15 | BH10 | ...
  → É ingrediente? → creatina-monohidratada | beta-alanina | ...
  → É geografia? → abc-paulista | sp-capital | belo-horizonte | ...
  → É kit/stack? → kit-ganho-extremo | kit-definicao-absoluta | kit-recuperacao
```

### 1B. Tipo de tarefa (task_type)
| Sinais no pedido | task_type |
|-----------------|-----------|
| criar, fazer, escrever, montar, gerar, redigir, produzir | `CREATE` |
| analisar, avaliar, como está, performance, resultado | `ANALYZE` |
| decidir, qual, recomenda, melhor, compara, vs | `DECIDE` |
| planejar, calendário, próximo, programar, agendar | `PLAN` |
| o que é, explica, mostra, busca, quero saber | `RETRIEVE` |
| diferença, comparar, side-by-side | `COMPARE` |
| salvar, registrar, atualizar, append | `WRITE` |

### 1C. Domínio
| Domínio | Sinais | Arquivos primários |
|---------|--------|------------------|
| `brand` | produto, ingrediente, identidade, marca, paleta | Brand/ |
| `content` | post, campanha, carrossel, reel, caption, e-mail | Content/ |
| `research` | dados, métricas, concorrente, tendência, vendas | Research/ |
| `ops` | workflow, processo, script, automação | Workflows/ |

### 1D. Horizonte temporal
- `now` — pedido imediato sem referência a período
- `this-week` — "essa semana", "próximos dias"
- `this-month` — "maio", "esse mês"
- `historical` — "histórico", "desde quando", "em dezembro"

---

## PASSO 2 — ASSEMBLE (montar o contexto)

Usando o resultado do PASSO 1, selecionar arquivos por tier:

### Tier 1 — Fundação (sempre, todo pedido)
```
✓ System/ids.md            ← resolver qualquer entidade que apareça
✓ CONTEXT.md               ← estado atual do negócio, campanha ativa, calendário
```
*(context-engine.md está na memória de trabalho — não precisa ser relido)*

### Tier 2 — Domínio primário (top 3 por activation_context_match)
Ordenar todos os arquivos do domínio pelo score:
```
score = 0.4 × entity_match + 0.3 × activation_context_match + 0.2 × weight/10 + 0.1 × recency
```
Selecionar os 3 com score mais alto.

### Tier 3 — Entidades detectadas
Para cada entidade resolvida em 1A, incluir:

| Tipo de entidade | Arquivos incluídos |
|-----------------|-------------------|
| Produto (ex: power-creatine) | Brand/technical-sheets/<produto>.md + seção relevante de ingredient-reference + linha relevante de product-catalog |
| Persona (nucleo/aquisicao) | Brand/audience.md |
| Canal (instagram) | Content/content-templates.md + Brand/visual-language.md |
| Canal (email) | Content/email-sequence-<relevante>.md |
| Campanha | Content/campaign-<id>.md |
| Afiliado/cupom | Brand/audience.md § Rede de Afiliados |
| Ingrediente | Brand/ingredient-reference.md § <ingrediente> |
| Kit/stack | Brand/brand-core.md § Stacks |

### Tier 4 — Conexões (1 hop a partir do T3)
Para cada arquivo em T3, verificar seu `connects_to` no frontmatter.
Incluir os que ainda não estão no contexto e têm `weight ≥ 7`.

### Tier 5 — Cross-domain (se score > 0.6)
Se task_type = `CREATE` e domínio = `content`:
  → incluir `Research/instagram-insights.md` (performance dos posts anteriores informa o novo)

Se task_type = `ANALYZE` e entidade inclui produto:
  → incluir `Research/competitor-intel.md` (posicionamento relativo)

Se task_type = `DECIDE`:
  → incluir `Content/decisions-log.md` (precedentes de decisões similares)

---

## PASSO 3 — CONNECT (o núcleo do Jarvis)

**Não ler os arquivos em sequência. Conectar os dados em paralelo.**

Para cada par de arquivos relevantes, procurar conexões que não existem em nenhum deles isoladamente:

### Conexões padrão por task_type

#### CREATE (post/campanha/e-mail)
```
product-sheet × ingredient-reference → hook científico (mecanismo → benefício sentido)
post-history × content-templates    → que ângulo não foi usado recentemente?
audience × instagram-insights       → que segmento converte melhor esse produto?
visual-language × content-templates → specs visuais corretas para o formato
campaign (ativa) × post             → este post serve qual fase da campanha?
competitor-intel × brand-core       → qual diferencial comunicar neste post?
```

#### ANALYZE (métricas/performance)
```
sales-data × audience               → quem compra mais, quando, com que cupom?
instagram-insights × post-history   → qual formato/produto gerou mais engajamento?
sales-data × product-catalog        → evolução de preço vs. volume de vendas
competitor-intel × trends           → o mercado vai onde? MP está posicionada?
```

#### DECIDE (escolhas estratégicas)
```
decisions-log × pedido atual        → já decidimos algo similar? qual foi o resultado?
audience × sales-data               → a decisão afeta qual segmento mais?
issues-log × pedido atual           → há blockers conhecidos para esta decisão?
competitor-intel × brand-core       → a decisão fortalece ou enfraquece nosso diferencial?
```

#### PLAN (calendário/campanha)
```
calendar × campaign (ativa)         → o plano se encaixa na campanha vigente?
audience × instagram-insights       → quais dias/formatos têm melhor performance?
product-catalog × sales-data        → quais produtos precisam de conteúdo urgente?
decisions-log × plan                → há restrições já decididas que afetam o plano?
```

### Detecção de contradição
Durante a leitura, se dois arquivos tiverem dados conflitantes sobre a mesma entidade:
```
→ PARAR antes de responder
→ Reportar: "Encontrei contradição: [arquivo A] diz X, [arquivo B] diz Y sobre [entidade]"
→ Pedir resolução antes de usar o dado
→ Criar entry em issues-log.md com ID sequencial
```

### Detecção de gap
Se o pedido precisa de dado que não existe no brain:
```
→ Não inventar o dado
→ Reportar: "Não tenho [dado específico] no vault. Fontes para obter: [sugestão concreta]"
→ Criar entry em issues-log.md como pendência
→ Continuar com o que existe, marcando claramente o gap na resposta
```

---

## PASSO 4 — SYNTHESIZE

**Composição de inteligência unificada — nunca uma lista de "arquivo X diz..."**

### Estrutura de síntese por task_type

#### CREATE
```
1. Hook (baseado em: ingredient-reference + post-history gap + audience)
2. Corpo (baseado em: product-sheet + content-templates + visual-language)
3. CTA (baseado em: campaign ativa + audience channel preference)
4. Specs visuais (baseado em: visual-language + content-templates)
5. Nota de contexto: por que esta abordagem agora (dados que sustentam)
```

#### ANALYZE
```
1. Headline numérica (dado mais importante)
2. Tabela comparativa (cross-source)
3. Padrão detectado (conexão não-óbvia entre fontes)
4. Recomendação acionável (1 parágrafo)
5. Gap: o que falta para análise completa
```

#### DECIDE
```
1. Contexto da decisão (o que se sabe)
2. Opção A (dados que a sustentam)
3. Opção B (dados que a sustentam)
4. Recomendação (com razão baseada em dados do vault)
5. Precedente (decisions-log: já decidimos algo parecido?)
```

### Formato de citação obrigatório
Toda afirmação derivada de um arquivo específico deve linkar a fonte:
- ✅ "creatina é o #2 produto por frequência `(↗ [[Research/instagram-insights]])`"
- ❌ "creatina vende bem" (sem fonte)

---

## PASSO 5 — RESPOND

Entregar a síntese no formato correto para o task_type (ver JARVIS_ARCHITECTURE § Camada 4).

Ao final de toda resposta, incluir:

```
---
📎 Contexto usado: [lista compacta dos arquivos T1-T5 lidos]
🔗 Conexões feitas: [lista das cross-file insights]
⚠️ Gaps detectados: [o que faltava no brain para responder completamente]
```

---

## PASSO 6 — LOG

Após responder, criar ou atualizar a entrada de hoje em `[[System/interaction-log]]`:

```markdown
## YYYY-MM-DD | <task_type> | <domínio> | <entidades>
**Resumo do pedido:** <1 linha>
**Contexto usado:** [lista dos arquivos lidos por tier]
**Conexões feitas:** [lista das inferências cross-file]
**Gaps detectados:** [o que faltava]
**Outcome:** aceito | modificado | rejeitado
**Feedback:** <se usuário corrigiu ou validou algo específico>
```

---

## Regras de failsafe

1. **Se PASSO 1 não detectar entidade nenhuma** → tratar como `RETRIEVE` genérico de `CONTEXT.md` + pedir mais contexto.
2. **Se budget de contexto estourar (>15 arquivos relevantes)** → priorizar T1+T2+T3 e informar o que ficou de fora.
3. **Se task_type for ambíguo** → escolher o mais provável, executar, e perguntar ao final se o formato está certo.
4. **Se arquivo de T3 não existir** → reportar gap, não inventar conteúdo.
5. **Se o pedido for multi-deliverable** → decompor em sub-pedidos, cada um com seu próprio PARSE, e executar em paralelo.

---

## Exemplo completo — "criar post de creatina para o ABC Paulista"

```
PASSO 1 — PARSE
  Entidades: power-creatine (MPS0006), abc-paulista, instagram, nucleo
  Task type: CREATE
  Domínio: content
  Horizonte: now

PASSO 2 — ASSEMBLE
  T1: ids.md, CONTEXT.md
  T2: content-templates (score 0.87), post-history (0.82), visual-language (0.79)
  T3: technical-sheets/power-creatine.md, audience.md § ABC Paulista
  T4: brand-core § stacks (via power-creatine.connects_to), ingredient-reference § creatina-monohidratada
  T5: instagram-insights (CREATE × content → regra ativa)
  Total: 10 arquivos

PASSO 3 — CONNECT
  power-creatine × ingredient-reference → hook: "puxa água para dentro da célula muscular = força, não inchaço" (mecanismo → benefício sentido)
  audience × instagram-insights → ABC Paulista = 34% vendas, mobile-first, afiliado OITAVA ativo (cupom de alta confiança = contexto de comunidade)
  post-history → último post de creatina foi há 3 semanas (ângulo: "força" — usar ângulo "recuperação" desta vez)
  brand-core § stacks → creatina = Kit Ganho Extremo (upsell natural: Whey + Creatina + Anabolic)
  Contradição: nenhuma
  Gap: competitor-intel § creatina vazio — não posso comparar vs. concorrentes

PASSO 4 — SYNTHESIZE
  Hook: "VOCÊ TOMA CREATINA — MAS SABE O QUE ELA FAZ DENTRO DO SEU MÚSCULO?"
  Slide 2: mecanismo (agua intra-muscular = força real, não retenção)
  Slide 3: origem (Alemanha, grau farmacêutico, rastreável)
  Slide 4: dose (3g × 1/dia, sem protocolo de saturação)
  CTA: Kit Ganho Extremo — MPOFICIAL.COM / cupom OITAVA (afiliado ativo no ABC)
  Gap: sem dado de concorrentes para este produto

PASSO 5 — RESPOND
  [draft completo do carrossel + specs visuais]
  📎 Contexto usado: power-creatine, audience, content-templates, post-history, visual-language, ingredient-reference, instagram-insights, brand-core, ids, CONTEXT
  🔗 Conexões: creatina × ABC Paulista × afiliado OITAVA; mecanismo → benefício; kit-ganho-extremo como upsell
  ⚠️ Gap: sem posicionamento de concorrentes para creatina

PASSO 6 — LOG
  [entrada em interaction-log.md]
```

---

*Este protocolo é executado a cada pedido. A memória ativa estática em CLAUDE.md foi substituída por este engine.*
*Referência de design: [[JARVIS_ARCHITECTURE]]*
