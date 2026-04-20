---
name: Workflows Index
description: MOC do domínio Workflows — automações, SOPs, prompts, scripts
type: moc
status: active
date: 2026-04-18
tags: [moc, navigation, workflows]
---

# Workflows — Index

MOC do domínio `Workflows/`. Processos operacionais, scripts, prompts reutilizáveis.

---

## Scripts

| Arquivo | Propósito |
|---------|-----------|
| [[Workflows/create-google-form.gs]] | Google Apps Script — criação de formulário (survey) |

> Scripts são `.gs`, `.js`, `.py`, etc. — não `.md`. Documentação opcional acompanha em `<nome>-sop.md`.

## SOPs (Standard Operating Procedures)

| Arquivo | Processo |
|---------|----------|
| *(vazio — a documentar conforme processos se consolidam)* | |

## Prompt libraries

| Arquivo | Ferramenta |
|---------|------------|
| *(vazio — criar `freepik-prompts.md` quando prompts aprovados se acumularem)* | |

---

## SOPs recomendados para documentar

Baseado nas operações recorrentes detectadas no vault:

1. **Ingestão de CSV de vendas** (Nuvemshop → `sales-data.md` + `instagram-insights.md`)
2. **Publicação de post** (criar seção em `post-history` + update `calendar`)
3. **Criação de campanha** (template → `campaign-NN-slug.md` + update `calendar`)
4. **Lançamento de SKU novo** (ficha técnica + `product-catalog` + `ids.md` + `vault-map`)
5. **Revisão trimestral de archive** (snapshots + rotação de `calendar`)
6. **Publicação via Freepik** (prompt → imagem → banda azul/vermelha → caption)

---

## Prompt libraries recomendadas

1. `freepik-prompts.md` — prompts que geraram resultados aprovados (rule CLAUDE.md)
2. `canva-ai-prompts.md` — se adotado
3. `claude-skill-prompts.md` — prompts recorrentes para skills do Cowork

---

## Invariantes

1. Todo prompt salvo **foi aprovado** — prompts rejeitados não entram no vault
2. Todo SOP é **passo-a-passo executável** — não é texto descritivo
3. Scripts têm comentário-cabeçalho com: autor, data, entrada esperada, saída esperada

---

## Cadência

| Cadência | Ação |
|----------|------|
| Por evento | Prompt aprovado → append em `<tool>-prompts.md` |
| Por processo recorrente | Consolidar em SOP depois de 3+ execuções |
| Revisão anual | Verificar SOPs ainda vigentes; arquivar obsoletos |

---

*Pasta menor hoje, mas cresce com cada operação padronizada. Objetivo: reduzir dependência de Claude para tarefas repetitivas.*
