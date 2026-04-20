---
name: Agent Architecture
description: Arquitetura de sub-agents Claude Code especializados para manutenção e uso do vault
type: system
status: active
date: 2026-04-18
tags: [system, agents, claude-code, architecture]
weight: 8
activation_contexts: [setup, meta-operation]
related:
  - "[[CLAUDE]]"
  - "[[System/context-engine]]"
  - "[[System/ingestion-pipeline]]"
  - "[[JARVIS_ARCHITECTURE]]"
  - "[[HEALTH_CHECK_REPORT]]"
---

# Agent Architecture — Claude Code Sub-Agents

**Propósito:** especificar os agents especializados que devem ser criados em `.claude/agents/` para operar o brain eficientemente, sem overhead.

**Princípio central:** **lean over exhaustive.** Cada agent adicional custa tokens de roteamento. 4 agents especializados + main Claude Code + sub-agents built-in (Explore, Plan) cobrem 100% dos casos de uso do vault.

---

## 1. Os 4 agents propostos

```
┌──────────────────────────────────────────────────┐
│  MAIN CLAUDE CODE (orquestrador)                 │
│  └─ roteia pedidos para o agent certo            │
└──────────────────────────────────────────────────┘
         │              │             │              │
         ▼              ▼             ▼              ▼
   ┌──────────┐  ┌──────────┐   ┌──────────┐  ┌──────────┐
   │  vault-  │  │  vault-  │   │ content- │  │  jarvis- │
   │ ingestor │  │librarian │   │ producer │  │synthesizer│
   └──────────┘  └──────────┘   └──────────┘  └──────────┘
        │              │             │              │
        ▼              ▼             ▼              ▼
    Inbox/        Sistema       Content/ +    Cross-domain
   pipeline      inteiro        Brand/        queries
```

---

## 2. Especificação dos agents

### 2.1 `vault-ingestor`

**Propósito:** Executar o protocolo completo de `[[System/ingestion-pipeline]]` quando qualquer arquivo aparece em `Inbox/` ou conteúdo é enviado sem descrição.

**Quando acionar:**
- Usuário faz drop de arquivo em `Inbox/`
- Usuário envia conteúdo multi-linha sem especificar destino
- Main Claude Code detecta que precisa classificar algo novo

**Responsabilidades:**
1. Pré-processamento: detectar encoding/separator (CSV brasileiro frequentemente `;` + Latin-1 ou UTF-8)
2. Parse inicial + amostragem
3. Detecção bruta por extensão + padrão de conteúdo
4. Coleta de sinais: filename, padrões de texto, entidades canônicas de [[System/ids]], origem externa
5. Score de confiança e decisão:
   - `≥ 0.7` → automático
   - `0.4–0.69` → confirma com usuário
   - `< 0.4` → `Inbox/_unclassified/` + issue em [[Content/issues-log]]
6. Aplicação: frontmatter YAML + rename + wiki-links de entidades + mover para destino + atualizar MOC
7. Enriquecimento: derivar métricas, atualizar logs, alimentar singletons relacionados
8. Relatório estruturado ao usuário

**Tools necessárias:** Read, Write, Edit, Glob, Grep, Bash (operações de filesystem)

**Constraints:**
- NUNCA descartar arquivos
- NUNCA sobrescrever
- NUNCA inventar metadata (confidence: low quando inferindo)
- NUNCA criar subpasta não prevista em [[System/taxonomy]]
- Duplicatas (>80% overlap) viram issue, não reingestão

**Performance target:** classificar 95% dos uploads comuns em ≤ 30s.

**Priority:** 🔴 **P0** — Inbox existe mas sem automação. Criar primeiro.

---

### 2.2 `vault-librarian`

**Propósito:** Guardian da saúde estrutural do vault. Mantém frontmatter consistente, detecta links quebrados, roda archive rotation, atualiza `ids.md`.

**Quando acionar:**
- Health check periódico (on-demand ou via `/loop`)
- Usuário pede "validar o vault"
- Após sessão grande de criação/edição
- Antes de export para outros consumidores (relatórios, decks)

**Responsabilidades:**
1. Validar frontmatter YAML em todos os arquivos (campos obrigatórios presentes? `type` é enum válido? `date` em ISO 8601?)
2. Detectar wiki-links quebrados (`[[X]]` apontando para arquivo inexistente)
3. Detectar arquivos órfãos (zero incoming links, exceto templates)
4. Rodar `[[System/archive-policy]]` quando data ativa exceder threshold
5. Atualizar `[[System/ids]]` quando nova entidade canônica é aprovada via [[Content/decisions-log]]
6. Detectar duplicatas emergentes (conteúdo > 80% overlap entre 2 arquivos)
7. Reportar descobertas em [[Content/issues-log]]

**Tools necessárias:** Read, Grep, Glob, Edit (para correções pontuais)

**Constraints:**
- Read-mostly — edições só após confirmação do usuário para mudanças > cosmetic
- NUNCA deletar arquivos — apenas mover para `_archive/` via archive-policy
- Reportar gaps sem inventar soluções

**Performance target:** full health scan em ≤ 2min para vault < 100 arquivos.

**Priority:** 🟡 **P1** — criar após `vault-ingestor`. Bloqueio útil para frontmatter retrofit.

---

### 2.3 `content-producer`

**Propósito:** Criar conteúdo publicável (posts IG, campanhas, e-mails, calendars) aplicando brand-core + visual-language + ficha técnica + ingredient-reference consistentemente.

**Quando acionar:**
- Usuário pede "criar post de [produto]"
- Usuário pede "planejar campanha de [tema]"
- Usuário pede "draft de e-mail para [lista]"
- Usuário pede "calendário semanal de [mês]"

**Responsabilidades:**
1. Determinar formato (carousel, reel, static, story, e-mail) a partir do pedido
2. Buscar template apropriado em [[Content/content-templates]] (ou `Content/templates/*.md` após split)
3. Aplicar [[Brand/visual-language]] specs (cores, tipografia, ícones)
4. Puxar ficha técnica do produto de `Brand/technical-sheets/`
5. Enriquecer com ciência de `[[Brand/ingredient-reference]]` se conteúdo for educativo
6. Aplicar tom de voz de [[Brand/brand-core]]
7. Gerar copy com CTAs alinhados ao kit/cupom ativo
8. Atualizar [[Content/calendar]] ao agendar
9. Fazer append em [[Content/post-history]] após confirmação de publicação

**Tools necessárias:** Read, Write, Edit, Glob, Grep

**Constraints:**
- SEMPRE usar IDs canônicos de [[System/ids]] — não parafrasear entidades
- SEMPRE cotar fonte (wiki-link) de cada afirmação técnica
- NUNCA inventar dados científicos — se não está em `ingredient-reference`, pedir ao usuário
- Respeitar calendar conflicts — não agendar sem checar

**Performance target:** draft completo de carrossel 5-slides em ≤ 60s.

**Priority:** 🟡 **P2** — criar após primeira rodada de calendar maio executada manualmente (aprender os padrões primeiro).

---

### 2.4 `jarvis-synthesizer`

**Propósito:** Executar o **Jarvis Protocol** completo (6 passos de [[System/context-engine]]) para pedidos cross-domain que exigem síntese de múltiplas fontes.

**Quando acionar:**
- Pedidos com task_type `CREATE`, `ANALYZE`, `DECIDE`, `PLAN`, `COMPARE` (por [[System/intent-classifier]])
- Pedidos que referenciam múltiplos domínios (ex: "post de creatina usando insights de vendas do ABC Paulista")
- Pedidos estratégicos ("qual produto priorizar em maio?")

**Responsabilidades:**
1. **PASSO 1 — PARSE:** Extrair entidades (via `ids.md`), task_type, domínio, horizonte temporal
2. **PASSO 2 — ASSEMBLE:** Montagem dinâmica T1 (fundação) + T2 (domínio) + T3 (entidades) + T4 (conexões) + T5 (cross-domain)
3. **PASSO 3 — CONNECT:** Inferências cross-file; detecção de contradições e gaps
4. **PASSO 4 — SYNTHESIZE:** Resposta integrada (não lista de arquivos lidos)
5. **PASSO 5 — RESPOND:** Formato conforme task_type; citar fontes com wiki-links
6. **PASSO 6 — LOG:** Entrada em [[System/interaction-log]]

**Tools necessárias:** Read, Grep, Glob (read-mostly — não edita)

**Constraints:**
- Budget rígido de ~15 arquivos por pedido (ver [[System/context-engine]])
- SEMPRE citar fontes com wiki-link
- NUNCA deixar gap não-reportado
- SEMPRE registrar em interaction-log (alimenta self-learning)

**Performance target:** resposta completa em ≤ 90s para pedido CREATE típico.

**Priority:** 🟢 **P3** — criar após [[System/interaction-log]] ter ≥ 10 entradas (calibração inicial).

---

## 3. Decisão: agents NÃO criados (e por quê)

| Agent descartado | Por que não |
|------------------|-------------|
| `research-ingestor` (CSV specialist) | `vault-ingestor` já trata encoding/separator — split só adiciona overhead |
| `brand-curator` | `vault-librarian` + `content-producer` cobrem brand governance |
| `email-specialist` | E-mail é só um formato — `content-producer` abraça |
| `competitor-analyst` | Sub-agent `Explore` built-in já faz pesquisa em `Research/` |
| `calendar-manager` | Operação trivial — main Claude Code + `content-producer` resolvem |
| `analytics-reporter` | `jarvis-synthesizer` com task_type=ANALYZE cobre |
| `seo-optimizer` | Skill `marketing:seo-audit` já disponível via plugin marketing |

---

## 4. Estrutura em `.claude/agents/`

Cada agent será definido em markdown frontmatter-first:

```
.claude/agents/
├── vault-ingestor.md
├── vault-librarian.md
├── content-producer.md
└── jarvis-synthesizer.md
```

Template de definição de agent:

```markdown
---
name: <agent-name>
description: <descrição curta para roteamento do main Claude>
tools: [Read, Write, Edit, Glob, Grep, Bash]
model: sonnet  # ou opus para jarvis-synthesizer
---

# <Agent Name>

## Quando usar
<triggers claros>

## Responsabilidades
<lista numerada>

## Constraints
<NUNCA/SEMPRE rules>

## Formato de entrada esperado
<schema do prompt>

## Formato de saída
<schema da resposta>
```

---

## 5. Ordem de implementação

### Fase 1 — Agora (Sprint atual)
- [ ] Criar `.claude/agents/vault-ingestor.md`
- [ ] Testar com upload real na Inbox

### Fase 2 — Próxima semana
- [ ] Criar `.claude/agents/vault-librarian.md`
- [ ] Rodar health scan inaugural
- [ ] Completar frontmatter retrofit Fase 1–2 usando o agent

### Fase 3 — 2 semanas
- [ ] Criar `.claude/agents/content-producer.md`
- [ ] Testar produzindo 1 post de cada formato
- [ ] Calibrar templates baseado em resultados

### Fase 4 — 1 mês
- [ ] Criar `.claude/agents/jarvis-synthesizer.md`
- [ ] Rodar análise inicial de [[System/interaction-log]]
- [ ] Primeira rodada de edge refinement

---

## 6. Métricas por agent

**vault-ingestor:**
- Taxa de classificação automática (sem pedir confirmação): alvo ≥ 85%
- Tempo médio de ingestão: alvo ≤ 30s
- Issues abertas por classificação errada: alvo ≤ 1 a cada 20

**vault-librarian:**
- Cobertura de frontmatter: alvo 100% (de 54% atual)
- Broken links detectados mas não corrigidos: alvo 0
- Duplicatas detectadas: alvo 0

**content-producer:**
- Drafts aceitos sem edição substancial: alvo ≥ 50%
- Uso correto de IDs canônicos: alvo 100%
- Tempo de produção de 5-slide: alvo ≤ 60s

**jarvis-synthesizer:**
- Uso de ≤ 15 arquivos por pedido: alvo 100%
- Citação de fontes: alvo 100%
- Gaps reportados proativamente: alvo ≥ 1 por pedido ANALYZE

---

## 7. Governance

- Mudança de tool set de agent → registrar em [[Content/decisions-log]]
- Criação de novo agent → atualizar este arquivo + decisions-log
- Performance abaixo do alvo → revisar design, não criar workaround
- Agent depreciado → mover definição para `_archive/agents/` + atualizar aqui

---

*Criado em 18/04/2026 como parte do [[HEALTH_CHECK_REPORT]].*
*Alinhado com [[JARVIS_ARCHITECTURE]] — agents são a implementação operacional da visão Jarvis.*
