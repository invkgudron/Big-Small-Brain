# Claude Code Insights — Medicinal Pharma Brain

**Gerado em:** 17/04/2026
**Período analisado:** 09/04/2026 a 16/04/2026
**Sessões:** 7 · **Mensagens:** 84 · **Horas:** 12h · **Commits:** 0

---

## Resumo Executivo

**O que está funcionando:** O vault está sendo usado de forma sofisticada — scaffolding de knowledge bases de marca para clientes pharma, análise cruzada de dados Instagram + vendas com relatórios em PT-BR, e desenvolvimento de componentes TypeScript com testes. A decisão de estabelecer CONTEXT.md e CLAUDE.md como arquivos fundacionais está configurando o Claude para sucesso de longo prazo.

**O que está atrapalhando:** Claude às vezes interpreta comandos shell como tarefas de Agent e pula para scaffolding quando o objetivo era configuração. O problema de encoding no CSV da Nuvemshop silenciosamente perdeu metade das linhas. Nomes de arquivo ambíguos (calendar.md vs campaign-plan.md) geraram retrabalho.

**Ganhos rápidos:** Custom Skills para workflows repetidos + Hooks para verificação de integridade de dados em ingestão de CSVs.

**Workflows ambiciosos:** Pipeline autônomo de inteligência de marca + fábrica de componentes test-driven com agents paralelos.

---

## Áreas do Projeto

| Área | Sessões |
|------|---------|
| Obsidian Vault & Brand Knowledge Management | 2 |
| MCP Server Configuration | 2 |
| Marketing Data Analysis & Reporting | 1 |
| TypeScript Component Development & Testing | 2 |
| Session Initialization & Workflow Setup | 1 |

### Detalhes

**Obsidian Vault & Brand Knowledge Management** — Organização de vaults para marcas pharma/suplementos, incluindo referências de ingredientes, briefs competitivos e planos de campanha com estruturas de calendário. Claude Code usado para scaffolding de estrutura de pastas, população de CONTEXT.md e CLAUDE.md, importação de dados PDF/CSV e criação de knowledge bases com wiki-links.

**MCP Server Configuration** — Tentativas de configurar integração Obsidian MCP para workflows de brand knowledge. Sessões com atrito onde Claude interpretou comandos CLI como tarefas de Agent e selecionou configurações de pacote erradas (REST API vs filesystem), exigindo retentativas antes do setup correto.

**Marketing Data Analysis & Reporting** — Análise de engajamento Instagram e cross-análise de vendas para marca de suplementos, produzindo relatório executivo em PT-BR. Claude usou scripts Python via Bash para parsear CSV da Nuvemshop, mas problemas de encoding/separador exigiram correção do usuário antes de capturar o dataset completo.

**TypeScript Component Development & Testing** — Construção de componente ToolInvocationBadge com 31 testes passando, mapeando nomes de ferramentas para labels amigáveis. Claude também diagnosticou e corrigiu problemas de CSS min-height para centralização vertical, e documentou sistemas de auth e schemas de User em CLAUDE.md.

**Session Initialization & Workflow Setup** — Tentativa de configurar comportamento de inicialização automática de sessão para Claude Code. Sessão encerrada sem conclusão pois Claude começou a scaffoldar pastas/arquivos em vez de ajustar hooks de configuração, levando a uma interrupção.

---

## Estilo de Interação

Trabalho primariamente em **território de content/knowledge management** (65 arquivos Markdown vs apenas 10 TypeScript), usando Claude Code como construtor de workspace estruturado — organizando vaults Obsidian, populando knowledge bases de marca e gerando relatórios executivos em PT-BR.

Requests tendem a ser **bundles multi-deliverable** em vez de tarefas únicas: *'organize o vault com referências de ingredientes, briefs competitivos E um calendário de campanha de maio'* ou *'crie CLAUDE.md, explique auth, descreva o schema de User E centralize conteúdo verticalmente.'*

**Interrupção decisiva quando Claude interpreta errado.** Duas vezes foi digitado o que claramente era um comando shell ou request de config, e quando Claude lançou tasks de Agent ou começou scaffolding, houve interrupção em vez de deixar terminar. Modelo mental claro do que se quer, mas nem sempre explicado upfront.

**Zero commits em 12 horas e 7 sessões** reforça que é trabalho exploratório e orientado a conteúdo, não código entregue. Uso pesado de Write (38) sobre Edit (22), consistente com geração greenfield em vez de iteração em arquivos existentes.

> **Padrão chave:** Requests amplos multi-deliverable com confiança na execução, mas interrupção rápida quando Claude interpreta escopo errado.

---

## Pontos de Atrito

### 1. Comandos interpretados como tarefas de agent
- `claude mcp add obsidian` digitado como comando shell → Claude lançou Agent tool, forçando interrupção e reinício
- Solicitação de configuração de hooks de inicialização de sessão → Claude começou scaffolding de pastas/arquivos

### 2. Defaults de data handling causando retrabalho
- Script Python leu CSV Nuvemshop com encoding/separador errado → capturou apenas 24 de 46 linhas
- Claude despejou plano de campanha inteiro em arquivo `calendar.md` único → rejeitado, exigiu reestruturação completa

### 3. Ação prematura em input incompleto
- Durante setup Obsidian MCP, Claude avançou assumindo que o input estava completo enquanto o usuário ainda colava conteúdo multi-mensagem
- Configuração MCP inicial usou pacote errado (REST API vs filesystem) → múltiplas retentativas

---

## Coisas Impressionantes

**Vaults de Brand Knowledge Estruturados** — Sistemas de conhecimento sofisticados baseados em Obsidian para marcas pharma e suplementos, combinando configuração MCP, ingestão de PDF/CSV e estrutura markdown com wiki-links. Abordagem de estabelecer CONTEXT.md e CLAUDE.md como arquivos fundacionais.

**Desenvolvimento de Componentes Test-Driven** — Componente ToolInvocationBadge com 31 testes passando ao lado da implementação. Parear um fix concreto de UI (centralização vertical) com um novo componente testado na mesma sessão demonstra escopo eficiente de trabalho frontend.

**Análise de Dados Cross-Source com Relatório** — Dados Instagram + Nuvemshop combinados em relatório executivo PT-BR, capturando problema de encoding CSV que silenciosamente teria descartado metade das linhas. Disposição para verificar o pipeline de dados antes de confiar na análise.

---

## Sugestões Implementadas

> Ver seção de atualizações do CLAUDE.md abaixo. As 4 adições foram aplicadas ao arquivo.

### Adições ao CLAUDE.md

**CSV/Data Parsing** — Detectar encoding (UTF-8, Latin-1, UTF-16) e separador (`,` vs `;`) antes de parsear. Verificar row count após parsing antes de prosseguir com análise.

**Command Interpretation** — Comandos que começam com `claude `, `npm `, `git ` → executar via Bash, NÃO lançar Agent task ou scaffoldar arquivos.

**File Naming & Structure** — Confirmar filename e localização antes de criar arquivos se o tipo de conteúdo não for claro. Seguir estrutura de pastas existente do vault, usar wiki-links.

**Input Patience** — Quando o usuário está colando conteúdo multi-linha ou multi-mensagem, aguardar sinal explícito ('done', 'go', ou prompt claro) antes de agir.

---

## Features para Testar

### MCP Servers
Conectar Claude ao Obsidian, databases e APIs externas via Model Context Protocol.
```bash
claude mcp add obsidian-filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/your/ObsidianVault
```

### Custom Skills
Prompts reutilizáveis definidos como arquivos markdown, acionados com um único `/command`. Criar `/brand-report` ou `/campaign-plan` para padronizar naming de arquivos, estrutura e formatação PT-BR.

Exemplo de estrutura:
```markdown
# .claude/skills/campaign-plan/SKILL.md
---
name: campaign-plan
description: Generate a monthly campaign plan for the brand vault
---
Create a campaign plan at `campaigns/<month>-<year>-plan.md` (NOT calendar.md).
Include: objectives, audience, content pillars, weekly breakdown, KPIs.
Use wiki-links [[...]] for brand references. Output in PT-BR if brand is BR-based.
```

### Hooks
Comandos shell que executam automaticamente em eventos de ciclo de vida específicos.
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "npm run typecheck 2>&1 | tail -20"}]
    }]
  }
}
```

---

## Padrões de Uso Recomendados

### Confirmar intenção antes de scaffolding
Quando pedir para 'configurar' ou 'set up' algo, fazer uma pergunta de esclarecimento antes de criar arquivos.

> *Prompt copiável:* "Before doing anything, confirm: am I configuring existing infrastructure, running a CLI command you pasted, or creating new scaffolding? Ask me if unsure, then proceed."

### Verificar integridade de dados na ingestão
Para qualquer importação CSV/PDF/dados, reportar row counts e uma amostra antes de analisar.

> *Prompt copiável:* "Parse the CSV, then STOP and report: encoding detected, separator used, row count, and first 3 rows. Wait for my OK before any analysis or aggregation."

### Usar Task Agents para exploração do vault
Para varreduras de vault-wide (encontrar notas órfãs, auditar estrutura, verificar cross-references), usar um sub-agent focado em vez de leituras sequenciais.

> *Prompt copiável:* "Use a task agent to audit my Obsidian vault: list all notes missing wiki-links, find orphan notes (no backlinks), and flag any files whose name doesn't match their content type. Report findings before making changes."

---

## No Horizonte

### Pipeline Autônomo de Brand Intelligence
Em vez de prompting manual para cada análise Instagram, cross-referência de vendas e relatório PT-BR, um agent agendado poderia ingerir CSVs Nuvemshop e dados sociais semanalmente, auto-detectar problemas de encoding e publicar briefings diretamente no vault Obsidian. Sub-agents paralelos analisariam simultaneamente engajamento, velocidade de vendas e posicionamento competitivo.

**Como tentar:** Claude Code headless mode (`claude -p`) com cron ou GitHub Actions, combinado com Obsidian MCP server e Task agents para streams de análise paralelas.

### Fábrica de Componentes Test-Driven
Sessão ToolInvocationBadge provou que Claude pode construir componentes com 31 testes passando em uma passagem — agora imaginar um loop onde 10 componentes são descritos e Claude itera cada um contra Vitest até verde, em paralelo.

### Slash Commands para Workflows Repetidos
Custom slash commands e convenções CLAUDE.md poderiam codificar workflows como invocações confiáveis de um único comando, eliminando ambiguidades de naming de arquivo e mix-ups de configuração MCP.

Exemplos:
- `/new-brand-vault <brand-name>` — scaffold completo com CONTEXT.md, CLAUDE.md, referências, briefs
- `/setup-obsidian-mcp` — config correta do pacote filesystem MCP com validação de conexão
- `/campaign-plan <month>` — plano mensal estruturado com sub-arquivo de calendário separado
- `/brand-report` — análise Instagram+vendas com parsing CSV robusto para encoding

---

## Curiosidade da Sessão

**"Usuário digitou um comando CLI, Claude lançou um AI agent"**

Quando o usuário tentou executar `claude mcp add obsidian` como comando shell, Claude interpretou e lançou uma tarefa de Agent — provocando interrupção imediata. Um caso clássico de AI sendo excessivamente "prestativa" com algo que era apenas para ser digitado no terminal.

---

*Fonte: Claude Code /insights · Período 09/04/2026–16/04/2026*
*Arquivo gerado em: 17/04/2026*
