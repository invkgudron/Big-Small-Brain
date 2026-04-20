---
name: File Naming Conventions
description: Regras de nomenclatura de arquivos no vault
type: system
status: active
date: 2026-04-18
tags: [system, convention]
---

# File Naming Conventions

---

## Regra geral

**`kebab-case.md`** — minúsculas, palavras separadas por hífen, sem acentos, sem espaços.

✅ `magnific-whey-chocolate-avela.md`
❌ `Magnific Whey Chocolate Avelã.md`
❌ `magnificWheyChocoAvela.md`
❌ `magnific_whey_chocolate_avela.md`

---

## Prefixos especiais

| Prefixo | Significado | Exemplos |
|---------|-------------|----------|
| `_index.md` | MOC do domínio (Map of Content) | `Brand/_index.md` |
| `_archive/` | Pasta de arquivo histórico | `_archive/2026-Q1/` |
| Nenhum | Arquivo de conteúdo regular | `brand-core.md` |

> **Por quê `_`?** Obsidian ordena underscore antes de letras — MOCs ficam no topo.

---

## Sufixos especiais

| Sufixo | Significado | Exemplo |
|--------|-------------|---------|
| `-log.md` | Append-only log (decisões, issues) | `decisions-log.md` |
| `-audit.md` | Auditoria estruturada | `design-system-audit.md` |
| `-sop.md` | Standard Operating Procedure | `content-publishing-sop.md` |
| `-survey.md` | Survey/feedback estruturado | `investor-brand-survey.md` |
| `-map.md` | Mapa/estrutura externa | `website-map.md` |
| `-prompts.md` | Biblioteca de prompts | `freepik-prompts.md` |

---

## Nomenclatura por tipo de conteúdo

### Posts publicados
**Não criar arquivo individual.** Posts vão em `post-history.md` como seção datada.

Seção: `## DD/MM/AAAA — <formato> "<título curto>" — <produto>`

### Campanhas
`campaign-<NN>-<slug>.md`

- `NN` = número sequencial de 2 dígitos (01, 02, 03…)
- `slug` = 2–4 palavras kebab-case

Exemplos:
- ✅ `campaign-01-origem-performance.md`
- ✅ `campaign-02-kit-ganho-maio.md`

### Fichas técnicas
`<produto>-<sabor-se-aplicavel>.md` em `Brand/technical-sheets/`

Exemplos:
- ✅ `power-creatine.md`
- ✅ `magnific-whey-chocolate-avela.md`
- ✅ `magnific-whey-morango-chocolate-branco.md`

### Temas visuais
`<nome-do-tema>.md` em `Brand/themes/`

Exemplo: ✅ `elite-performance.md`

### Pesquisa / auditoria
`<escopo>-<tipo>.md` em `Research/`

Exemplos:
- ✅ `design-system-audit.md`
- ✅ `investor-brand-survey.md`
- ✅ `competitor-intel.md`
- ✅ `instagram-insights.md`

### Sequência de e-mail
`email-sequence-<objetivo>.md` em `Content/`

Exemplo: ✅ `email-sequence-lead-nurture.md`

### Logs
`<tipo>-log.md` em `Content/` (append)

Exemplos:
- ✅ `decisions-log.md`
- ✅ `issues-log.md`

### Inbox items
`<YYYY-MM-DD>-<slug-ou-nome-original>.<ext>` em `Inbox/`

Exemplos:
- ✅ `2026-04-18-screenshot-ig-insights.png`
- ✅ `2026-04-18-pedido-csv-nuvemshop.csv`

### Arquivos em `_archive/`
Manter nome original + prefixo de período:
`_archive/2026-Q1/campaign-01-origem-performance.md`

---

## Regras de slug

Para transformar um título em slug:

1. Tudo minúsculo
2. Remover acentos: `ã→a`, `ç→c`, `ô→o` etc.
3. Substituir espaços por `-`
4. Remover caracteres especiais exceto `-`
5. Máximo 50 caracteres
6. Sem `-` duplos ou no início/fim

| Input | Slug |
|-------|------|
| "Por que usar 3W?" | `por-que-usar-3w` |
| "Kit Ganho Extremo — Maio" | `kit-ganho-extremo-maio` |
| "Recuperação Muscular & Imunidade" | `recuperacao-muscular-imunidade` |

---

## Colisões de nome

Se dois arquivos teriam o mesmo nome:

1. Adicionar discriminador: `<nome>-<variant>.md`
2. Exemplo: `anabolic-training-maca-verde.md` vs `anabolic-training-morango-ice.md`
3. Nunca numerar (`nome-1.md`, `nome-2.md`) — força a encontrar discriminador semântico

---

## Arquivos fora de padrão

Arquivos existentes que não seguem esta convenção não precisam ser renomeados retroativamente. Novas criações **devem** seguir.

Casos permitidos como exceção (documentados aqui):
- `CLAUDE.md` — convenção do harness
- `CONTEXT.md` — convenção adotada em 16/04/2026
- `SYSTEMS_CHECKUP_REPORT.md` — relatório único, nome descritivo
- `MEMORY.md` (na pasta de memory) — convenção do harness
