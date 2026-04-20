---
name: Interaction Log
description: Acumulador de aprendizado — registra pedido, contexto usado, conexões, gaps e outcome por sessão
type: system
status: active
date: 2026-04-18
updated: 2026-04-19
tags: [system, jarvis, learning, log]
weight: 8
related:
  - "[[System/context-engine]]"
  - "[[JARVIS_ARCHITECTURE]]"
---

# Interaction Log — Acumulador de Aprendizado

**Propósito:** Registro estruturado de cada interação significativa com o brain.
Após 10+ entradas, analisar padrões para:
1. Atualizar `connects_to` nos frontmatters (quais arquivos são sempre lidos juntos?)
2. Identificar gaps recorrentes (o que o brain não sabe mas precisa?)
3. Calibrar `activation_contexts` (quais task_types puxam cada arquivo com mais frequência?)
4. Identificar pedidos multi-deliverable mais comuns → criar Skills automatizadas

**Formato de entrada:**
```markdown
## YYYY-MM-DD | task_type | domínio | entidades principais
**Resumo:** <1 linha do pedido>
**Contexto:** [T1: ...] [T2: ...] [T3: ...] [T4: ...] [T5: ...]
**Conexões:** [lista de cross-file insights gerados]
**Gap:** [dado que faltou no brain]
**Outcome:** aceito | modificado | rejeitado
**Feedback:** <se usuário corrigiu, validou, ou redirecionou algo>
```

---

## Análise de Padrões (atualizar mensalmente)

### Co-ocorrência de arquivos (quais são lidos juntos?)
*(preencher após 10+ entradas)*

| Par de arquivos | Vezes lidos juntos | Candidato a connects_to? |
|----------------|-------------------|--------------------------|
| — | — | — |

### Gaps mais frequentes
*(preencher após 10+ entradas)*

| Gap | Frequência | Ação recomendada |
|-----|-----------|-----------------|
| — | — | — |

### Task types mais frequentes
*(preencher após 10+ entradas)*

| Task type | Frequência | Domínio principal |
|-----------|-----------|------------------|
| — | — | — |

---

## Entradas

---

### 2026-04-19 | REFACTOR | research | competitor-intel, 11 concorrentes, matriz competitiva

**Resumo:** Split do monolítico `Research/competitor-intel.md` (697L, 49KB) em arquitetura granular: 11 perfis individuais + matriz gerada + MOC + hub lean. Executa P0 #2 do Health Check 18/04.

**Contexto:**
- T1: CONTEXT.md, System/ids.md, Content/issues-log.md (pré-start)
- T2: System/taxonomy, System/content-types, System/frontmatter-schema, System/file-naming
- T3: Research/competitor-intel.md (697L — fonte do split), Research/_index.md (MOC a atualizar)
- T4: HEALTH_CHECK_REPORT (escopo do P0), memory/project_health_check_2026_04.md
- T5: Content/decisions-log.md (registro), System/interaction-log.md (este log)

**Conexões feitas:**
- System/ids.md seção 7 (Glanbia fornecedor) × seção 8 (optimum-nutrition) → cross-link registrado; MP e ON compartilham Glanbia — narrativa estratégica #1
- Padrão de split de `sales-data` (>50KB → particionar) × `competitor-intel` (49KB → split por entidade) → aplicar mesma heurística de content-types
- `competitor-profile.related` × `Brand/brand-core` × `Brand/audience` → insights estratégicos por marca apontam para arquivos Brand específicos
- `Research/competitors/_index.md` como MOC × `Templates/` órfãos padrão detectado no health check — segue mesmo padrão de navegação

**Gap:**
- Nenhum dos 11 perfis tem `post_refs` ainda (posts que mencionam cada marca — estrutura futura)
- Dataview queries por `tier: national` não rodadas ainda (bloqueadas por config do Templater/Dataview)
- Mapa de posicionamento permanece como ASCII art — imagem renderizada seria melhor (TODO visual)
- Insight "mesmo fornecedor que ON" poderia virar template de post — pendente

**Outcome:** aceito (usuário pediu explicitamente o split como Request 2)

**Feedback:**
- Padrão validado: hub lean (exec summary + nav) + análise gerada (matriz) + perfis individuais — replicável para outros domínios monolíticos
- Wiki-links preservados: nenhum link quebrado em CONTEXT/brand-core após o split (hub mantém path original)
- Decisão correta: `competitor-matrix.md` separado do hub evita que toda edição de matriz force re-leitura do exec summary

---

### 2026-04-18 | META | system | vault-architecture, context-engine, ingestion-pipeline

**Resumo:** Sessão de arquitetura de dados — diagnóstico, construção da camada System/, ingestion pipeline, frontmatter retrofit, e design do Jarvis Protocol.

**Contexto:**
- T1: CONTEXT.md, System/ids.md
- T2: todos os arquivos do vault (auditoria completa)
- T3: brand-core, visual-language, audience, instagram-insights, post-history (retrofit)
- T4: decisions-log, issues-log, product-catalog, competitor-intel, trends, calendar
- T5: Research/claude-code-insights.md (análise de padrões de uso)

**Conexões feitas:**
- claude-code-insights × CLAUDE.md → 4 regras já implementadas; 3 pedidos de slash commands na "No Horizonte" section → informaram o design das Skills no roadmap
- Sistema de 5 camadas (Jarvis) derivado dos padrões: "bundles multi-deliverable", "interrupção decisiva quando escopo errado", "confia na execução mas monitora qualidade"
- post-history × content-templates → sempre co-lidos para CREATE → candidatos a `connects_to` mútuos
- audience × instagram-insights × sales-data → trio indissociável para qualquer ANALYZE de público → candidatos a connects_to
- brand-core × ingredient-reference → conexão necessária para qualquer conteúdo científico → candidatos a connects_to

**Gap:**
- competitor-intel está incompleto (49KB mas conteúdo da maioria das marcas pouco detalhado)
- trends.md leve — pouco dado de ingredientes emergentes
- Nenhum arquivo de freepik-prompts.md ainda (Workflows/ vazio de prompts)
- Sem métricas de engagement por post individual em post-history (só estrutura do post, não resultado)

**Outcome:** aceito (sessão de arquitetura — usuário solicitou e aprovou)

**Feedback:**
- Usuário referenciou Jarvis (Iron Man) como modelo mental → sistema deve sintetizar, não listar
- Pedido explícito: "the brain needs to be able to identify what was uploaded, what type of content it is, and what it is related to within the system" → ingestion-pipeline implementado
- Pedido: "self-learning assistant" → interaction-log + edge refinement mensal

---

### 2026-04-18 | ANALYZE+CREATE | system | health-check, color-system, agent-architecture

**Resumo:** Database optimization review — auditoria completa de saúde, design do color system no graph view, arquitetura de 4 sub-agents. 3 entregáveis criados: HEALTH_CHECK_REPORT.md, System/color-system.md, System/agent-architecture.md + update em `.obsidian/graph.json`.

**Contexto:**
- T1: CONTEXT.md, System/ids.md, Content/issues-log.md
- T2: SYSTEMS_CHECKUP_REPORT, JARVIS_ARCHITECTURE, System/vault-map, System/taxonomy, System/content-types, System/frontmatter-schema, System/context-engine, System/interaction-log
- T3: Brand/brand-core (exemplo de arquivo com frontmatter rico), Brand/_index (padrão MOC), Research/competitor-intel (split candidate)
- T4: .obsidian/graph.json, .obsidian/community-plugins.json, .claude/settings.local.json
- T5: Delegação para Explore agent com auditoria cruzada de 9 pares de overlap + orphans + dead links

**Conexões feitas:**
- `graph.json` vazio × JARVIS memory sobre "color system" → memória era conceitual, não implementação — corrigido
- Frontmatter coverage (54%) × Dataview instalado → retrofit é pré-requisito para qualquer query funcional
- `competitor-intel.md` (697L, 49KB) × pattern de split documentado em content-types (sales-data > 50KB) → aplicar mesma regra: split por marca
- `.claude/agents/` vazio × regra de acumulação × pipeline de ingestão → agentes operacionais são o próximo layer após infra
- Templates/ órfãos × _index.md MOCs sem ref de template → 30min de trabalho fecha o loop

**Gap:**
- Nenhum agent criado ainda (só design) — próxima sessão: implementar vault-ingestor
- CSS snippets para file explorer colorido não implementados (documentados como futuro)
- Dataview queries de teste não rodadas ainda (bloqueadas pelo retrofit de frontmatter)

**Outcome:** aceito (sessão dedicada ao health check com escopo claro do usuário)

**Feedback:**
- Usuário solicitou explicitamente agents "sem gastar muitos recursos" → resposta priorizou lean set (4 agents) em vez de exhaustive (8+)
- Usuário quer "categorias entendidas ao bater o olho" → cores aplicadas diretamente no graph.json, não só documentadas
- Padrão de entrega que funcionou: report + doc técnico + config aplicado em 1 sessão

---

### 2026-04-18 | META | system | plugins, frontmatter, templates

**Resumo:** Instalação de Dataview + Templater. Frontmatter retrofit nos 5 arquivos auto-lidos. Criação de 5 templates em Templates/.

**Contexto:**
- T1: CONTEXT.md, System/ids.md
- T2: System/frontmatter-schema.md
- T3: brand-core, visual-language, audience, instagram-insights, post-history (retrofit)
- T4: content-templates (referência para criar Templates/)
- T5: —

**Conexões feitas:**
- frontmatter-schema × Dataview → queries Dataview só funcionam com frontmatter YAML presente → retrofit Fase 1 é pré-requisito para qualquer query útil
- Templates/ × Templater → templates criados com `tp.date.now()` e `tp.file.title` para auto-preenchimento
- product-sheet template × brand-core § fabricação → template já embute dados fixos de Bioghen (fabricante) para não repetir manualmente

**Gap:**
- Fase 2 (retrofit de technical-sheets) ainda não executada
- Templater precisa ser configurado em Settings antes de funcionar (passo manual do usuário)
- Nenhuma query Dataview de teste criada ainda

**Outcome:** aceito

**Feedback:** usuário quer próximos passos concretos após instalar plugins → resposta focada em configuração imediata + queries de teste

---

## Como usar este log para aprendizado

### A cada 10 entradas: análise de co-ocorrência
```
1. Listar todos os pares de arquivos que aparecem no mesmo "Contexto:"
2. Contar frequência de cada par
3. Para pares com frequência > 5: adicionar ao connects_to do arquivo de menor weight
4. Registrar a atualização em decisions-log.md
```

### A cada mês: revisão de gaps
```
1. Listar todos os gaps únicos das entradas do mês
2. Para gaps que aparecem > 3 vezes: criar arquivo ou seção para resolver
3. Para gaps que aparecem 1 vez: adicionar a issues-log.md como pendência baixa
```

### A cada trimestre: calibração de activation_contexts
```
1. Para cada task_type, listar quais arquivos apareceram em T2/T3 mais frequentemente
2. Se um arquivo aparece em task_type X mas não tem X no seu activation_contexts: adicionar
3. Se um arquivo raramente aparece para nenhum task_type: verificar se weight está correto
```

### Como detectar "edge forte" (conexão a solidificar)
Um edge é forte quando:
- Dois arquivos aparecem juntos em > 60% das entradas de um task_type
- A conexão entre eles produziu um insight que não existia em nenhum arquivo isolado
- O usuário aceitou a resposta sem modificação quando essa conexão foi usada

Quando edge forte detectado:
```
1. Adicionar A.connects_to: [[B]] e B.connects_to: [[A]] nos frontmatters
2. Registrar em decisions-log.md: "Edge solidificado: A ↔ B, baseado em N interações"
```

---

*Este arquivo é o sistema nervoso do aprendizado. Quanto mais rico, mais preciso o Jarvis.*
*Análise automática futura: script Python periódico que lê este arquivo e sugere updates de connects_to*
