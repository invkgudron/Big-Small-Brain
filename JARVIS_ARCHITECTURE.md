---
name: Jarvis Architecture
description: Proposta de arquitetura para transformar o second brain estático em um assistente de inteligência ativa — conexão dinâmica de dados para Claude Code e Cowork
type: system
status: active
date: 2026-04-18
tags: [system, architecture, ai, jarvis, intelligence]
related:
  - "[[System/context-engine]]"
  - "[[System/intent-classifier]]"
  - "[[System/interaction-log]]"
  - "[[SYSTEMS_CHECKUP_REPORT]]"
---

# Jarvis Architecture — Medicinal Pharma Brain

> *"Jarvis não lê o manual quando Tony pede uma arma. Jarvis já sabe as especificações do traje, a missão atual, o nível de ameaça e os recursos de energia — e sintetiza 'ative o Mark VII' a partir de tudo isso simultaneamente."*

---

## 1. O Problema: Storage Inteligente vs. Inteligência Ativa

O estado atual do brain é um **repositório de qualidade excepcional** — taxonomia correta, IDs canônicos, schemas de frontmatter, pipeline de ingestão. Mas ainda reage de forma linear:

```
Pedido do usuário
      ↓
Claude lê 7 arquivos fixos (memória ativa)
      ↓
Claude tenta responder com o que encontrou
```

**O que falta:** a conexão entre os nós de dados no momento do pedido. Os arquivos existem. Os dados existem. As relações existem como wiki-links estáticos. Mas quando você diz "quero criar um post de creatina para o ABC Paulista", Claude lê brand-core.md e instagram-insights.md de forma sequencial — não os **conecta** em uma inteligência unificada sobre esse pedido específico.

**O resultado desejado:**

```
"post de creatina para ABC Paulista"
      ↓
JARVIS sintetiza em paralelo:
  → power-creatine: "puxa água pro músculo = força, não inchaço" (hook)
  → audience: ABC Paulista = 34% das vendas, mobile-first, Pix, afiliado OITAVA ativo
  → post-history: último post de creatina foi X — não repetir esse ângulo
  → content-templates: carrossel 5 slides, banda azul/vermelho, keyword dourada
  → ingredient-reference: creatina monohidratada, origem Alemanha, dose 3g (cientificamente validada)
  → competitor-intel: concorrentes focam em "performance" genérica — diferencial MP é rastreabilidade
  → campaign-01: campanha ativa é "Origem da Performance" — creatina encaixa em qual fase?
      ↓
Resposta única e integrada — não uma lista de arquivos lidos
```

Isso é a diferença entre um banco de dados e um assistente.

---

## 2. Arquitetura em 5 Camadas

```
┌─────────────────────────────────────────────────────────┐
│  CAMADA 5 — SELF-LEARNING (evolução do brain)           │
│  interaction-log → analysis → edge updates              │
├─────────────────────────────────────────────────────────┤
│  CAMADA 4 — SYNTHESIS (resposta integrada)              │
│  multi-source → cross-file insight → format by task     │
├─────────────────────────────────────────────────────────┤
│  CAMADA 3 — CONNECTION ENGINE (o núcleo do Jarvis)      │
│  entity resolution → graph traversal → gap detection    │
├─────────────────────────────────────────────────────────┤
│  CAMADA 2 — CONTEXT ASSEMBLY (montagem dinâmica)        │
│  activation_contexts + weight → ranked file list        │
├─────────────────────────────────────────────────────────┤
│  CAMADA 1 — INTENT PARSING (o que o usuário quer?)      │
│  entities + task type + domain + time horizon           │
└─────────────────────────────────────────────────────────┘
```

---

### Camada 1 — Intent Parsing

Antes de tocar qualquer arquivo, parse o pedido:

| Dimensão | Exemplos | Fonte de verdade |
|----------|----------|-----------------|
| **Entidades** | "Creatina", "OITAVA", "ABC Paulista", "Kit Ganho" | `System/ids.md` |
| **Tipo de tarefa** | create / analyze / decide / plan / retrieve / compare | `System/intent-classifier.md` |
| **Domínio** | brand / content / research / operations | `System/taxonomy.md` |
| **Horizonte temporal** | agora / esta semana / histórico | contexto do pedido |
| **Urgência** | "preciso hoje", "quando puder" | sinais linguísticos |

**Sinais concretos por tipo de tarefa:**

| Palavras-gatilho | Task type |
|-----------------|-----------|
| criar, fazer, escrever, montar, gerar | `CREATE` |
| analisar, comparar, como está, performance | `ANALYZE` |
| decidir, qual, recomenda, melhor opção | `DECIDE` |
| planejar, calendário, próxima semana | `PLAN` |
| o que é, explica, me mostra, buscar | `RETRIEVE` |
| diferença entre, vs, comparado com | `COMPARE` |

---

### Camada 2 — Context Assembly

**Fórmula de relevância** para cada arquivo no vault:

```
R(arquivo, pedido) =
  0.40 × entity_match(arquivo, entidades_detectadas)
  + 0.30 × activation_context_match(arquivo, task_type)
  + 0.20 × weight(arquivo) / 10
  + 0.10 × recency(arquivo)
```

**Budget de contexto** (Claude lê ~15 arquivos com eficiência):

| Tier | Critério | Arquivos | Sempre? |
|------|----------|----------|---------|
| T1 — Fundação | ids.md, context-engine, CONTEXT | 3 | Sim |
| T2 — Domínio | top 3 arquivos do domínio primário | 3 | Por domínio |
| T3 — Entidade | ficha técnica + dados para cada entidade detectada | 2–4 | Por entidade |
| T4 — Conexão | connects_to de T3 não já incluídos | 2–3 | Se R > 0.5 |
| T5 — Cross-domain | 1–2 arquivos de domínio adjacente | 1–2 | Se R > 0.6 |

**Total típico: 11–15 arquivos por pedido**, dinamicamente selecionados.

---

### Camada 3 — Connection Engine

Esta é a camada que diferencia o Jarvis do simple retrieval.

**O que ela faz:**

1. **Entity Resolution:** "Creatina" → `power-creatine` (MPS0006) → [ficha técnica + catálogo + ingredient-reference § creatina + sales-data § MPS0006 + post-history § creatina]

2. **Graph Traversal:** Para cada arquivo selecionado, seguir `connects_to` mais 1 hop. Ex: `power-creatine → brand-core → kit-ganho-extremo → audience`

3. **Cross-file Inference:** Combinar dados de fontes diferentes para produzir insights que não existem em nenhum arquivo isolado:
   - `sales-data` (creatina = #2 por frequência) + `audience` (ABC Paulista = 34%) + `post-history` (último post creatina = X semanas atrás) → "creatina é produto de alta rotatividade no seu principal mercado e está sem post dedicado há X semanas — timing ideal para um carrossel educativo focado em resultado"

4. **Contradiction Detection:** Se dois arquivos têm dados conflitantes sobre a mesma entidade → flag antes de responder (ex: preço desatualizado em product-catalog vs. sales-data)

5. **Gap Detection:** Se o pedido precisa de algo não existente no brain → reportar explicitamente:
   - "Não tenho dados de engajamento específico para posts de creatina — recomendo registrar métricas do próximo post em post-history.md para alimentar esse gap"

---

### Camada 4 — Synthesis

**Não é uma lista de arquivos lidos. É uma resposta que os integra.**

Por tipo de tarefa:

| Task type | Formato de saída | Exemplo |
|-----------|-----------------|---------|
| `CREATE` | Draft completo + fontes usadas | Carrossel 5 slides pronto com copy, specs visuais, hook da ciência |
| `ANALYZE` | Tabela + insight acionável | Métricas cruzadas + recomendação em 1 parágrafo |
| `DECIDE` | 2–3 opções + recomendação com razão | "Opção A: [dados que a sustentam] — Recomendo porque [conexão com audience + sales]" |
| `PLAN` | Timeline + dependências + riscos | Calendário com posts, campanha e gaps identificados |
| `RETRIEVE` | Resposta direta + contexto mínimo | Dado + arquivo de origem + links relacionados |
| `COMPARE` | Tabela comparativa + posicionamento | Side-by-side com conclusão de diferenciação |

**Regra de citação:** toda afirmação que vem de um arquivo específico carrega o link: "a creatina é o #2 produto por frequência `([[Research/instagram-insights]])`"

---

### Camada 5 — Self-Learning

**O brain aprende de 3 formas:**

#### 5.1 Interaction Log (imediato)
Cada sessão gera uma entrada estruturada em `System/interaction-log.md`:
```
Pedido → contexto usado → conexões feitas → gaps → outcome
```

#### 5.2 Edge Refinement (mensal)
Análise do interaction-log revela padrões:
- Quais arquivos são lidos juntos com mais frequência? → atualizar `connects_to`
- Quais gaps aparecem repetidamente? → criar novo arquivo ou expandir existente
- Quais combinações produzem respostas aceitas? → fortalecer essas arestas

#### 5.3 Activation Context Calibration (trimestral)
Revisar `activation_contexts` de cada arquivo:
- Arquivo X está sendo puxado para task_types que não esperávamos? → adicionar ao seu activation_contexts
- Arquivo Y nunca é usado? → ou tem weight errado ou está desatualizado

---

## 3. Modelo de Conexão de Dados — O Grafo de Conhecimento

```
                        [brand-core]
                       /     |      \
          [visual-language]  |  [ingredient-reference]
                |            |            |
        [content-templates]  |    [technical-sheets/]
                |        \   |   /
          [post-history]  [ids.md]
                |        /   |   \
           [calendar]   /    |    \
                       /     |     \
              [audience]  [sales-data]  [competitor-intel]
                 |             |              |
         [instagram-insights]  |         [trends]
                          \    |
                       [interaction-log]
                              |
                        [context-engine]
```

**Regras de travessia:**
1. Toda entidade canônica (produto, persona, canal) é um nó
2. Toda conexão tem peso (`connects_to` com score de co-ocorrência)
3. T1 (fundação) sempre incluída — é a âncora do grafo
4. A travessia para após 2 hops para evitar over-fetch
5. O interaction-log retroalimenta os pesos das arestas

---

## 4. Roadmap de Evolução

### Fase 1 — Ativa agora (esta sessão)
- [x] Context Engine protocol (`System/context-engine.md`)
- [x] Intent Classifier (`System/intent-classifier.md`)
- [x] Interaction Log seedado (`System/interaction-log.md`)
- [x] Frontmatter com `activation_contexts`, `connects_to`, `weight` nos arquivos core
- [x] CLAUDE.md com o Jarvis Protocol substituindo memória ativa estática

### Fase 2 — Próximas sessões (manual)
- [ ] Retrofit `activation_contexts` e `connects_to` nos 8 technical-sheets
- [ ] Primeiro ciclo de edge refinement (analisar interaction-log após 10 sessões)
- [ ] `/new-post` skill que executa o pipeline de criação completo
- [ ] `/campaign-brief` skill que conecta audience + insights + templates automaticamente

### Fase 3 — Curto prazo (1–2 meses)
- [ ] Plugin Obsidian MCP ativo — Claude lê o vault diretamente via filesystem
- [ ] Git inicializado no vault — rastreamento de evolução do grafo
- [ ] Scripts Python/Node para análise periódica do interaction-log e update automático de `connects_to`
- [ ] Plugin Dataview queries para visualizar o grafo de conexões em tempo real

### Fase 4 — Médio prazo (3–6 meses)
- [ ] Agente autônomo semanal: ingere CSV Nuvemshop + IG exports → atualiza sales-data, instagram-insights, audience automaticamente
- [ ] Detecção automática de contradições (script varre vault, flag issues)
- [ ] Vector embeddings locais (Ollama + nomic-embed) para similarity search entre notas — substitui a `connects_to` manual por conexões semânticas descobertas automaticamente

### Fase 5 — Longo prazo (6–12 meses)
- [ ] Brain como servidor MCP próprio — qualquer ferramenta (Claude, Cursor, etc.) conecta ao brain via protocolo padronizado
- [ ] Loop de aprendizado autônomo: pedido → resposta → feedback → update do grafo → resposta melhor
- [ ] Memória episódica: "em janeiro você tentou X e não funcionou, tente Y desta vez"

---

## 5. O que isso significa na prática

**Antes (hoje):**
> "criar post de creatina"
> → Claude lê brand-core, visual-language, audience, instagram-insights, post-history (7 fixos)
> → Claude responde o melhor que pode com o que encontrou

**Depois (Jarvis):**
> "criar post de creatina"
> → Intent: CREATE | Domain: content | Entities: [power-creatine, instagram, nucleo]
> → T1: ids.md, context-engine, CONTEXT
> → T2: content-templates, post-history, visual-language
> → T3: power-creatine (ficha), ingredient-reference § creatina-monohidratada
> → T4: brand-core § stacks (creatina é Kit Ganho Extremo), audience § ABC Paulista
> → T5: instagram-insights § top produtos, sales-data § MPS0006 performance
> → Conexão: "creatina = #2 em frequência, sem post dedicado há 3 semanas, ABC Paulista é seu top mercado e OITAVA é o afiliado mais ativo lá — hook científico: 'puxa água para dentro da célula muscular = força real, não inchaço' — diferencial vs. concorrente: origem Alemanha, rastreável"
> → Draft completo: 5 slides com copy, specs visuais, hook de abertura, CTA, sugestão de timing

**A diferença não é o número de arquivos lidos. É o que se faz com a conexão entre eles.**

---

*Implementação técnica: ver `[[System/context-engine]]`, `[[System/intent-classifier]]`, `[[System/interaction-log]]`*
*Protocolo operacional: ver `[[CLAUDE.md]]` seção "Jarvis Protocol"*
