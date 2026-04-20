---
name: Content Index
description: MOC do domínio Content — produção, templates, campanhas, logs
type: moc
status: active
date: 2026-04-18
tags: [moc, navigation, content]
---

# Content — Index

MOC do domínio `Content/`. Produção editorial ativa, templates reutilizáveis, calendário, logs operacionais.

---

## Produção ativa

| Arquivo | O que contém |
|---------|--------------|
| [[Content/calendar]] | Calendário editorial — grade ativa (mês corrente + próximo) |
| [[Content/post-history]] | Registro cronológico de publicações (append-only) |

## Campanhas

| Arquivo | Período | Status |
|---------|---------|--------|
| [[Content/campaign-01-origem-performance]] | (ver arquivo) | active |

> Campanhas encerradas migram para `_archive/campaigns/` — ver [[System/archive-policy]].

## Sequências de e-mail

| Arquivo | Objetivo |
|---------|----------|
| [[Content/email-sequence-lead-nurture]] | Lead nurture — 6 e-mails, foco em primeira compra |

## Templates reutilizáveis

| Arquivo | O que contém |
|---------|--------------|
| [[Content/content-templates]] | Templates de carrossel educativo, reel educativo, banco de hooks, framework por produto |

---

## Logs operacionais (append-only, permanentes)

| Arquivo | Propósito |
|---------|-----------|
| [[Content/decisions-log]] | Histórico de decisões tomadas em sessões |
| [[Content/issues-log]] | Erros, inconsistências e pendências — com IDs sequenciais |

---

## Entidades canônicas do domínio

- Campanhas (seção 4 de [[System/ids]])
- Canais (seção 3 de [[System/ids]])
- Temas (seção 5 de [[System/ids]])

---

## Invariantes

1. **Posts publicados** são **seções** em `post-history.md`, não arquivos separados
2. **Templates** são **seções** em `content-templates.md`, não arquivos separados
3. Novos posts referenciam template usado + produto(s) + campanha (se aplicável)
4. Toda decisão registrada em [[Content/decisions-log]] com data e motivo
5. Todo erro registrado em [[Content/issues-log]] com ID sequencial

---

## Cadência

| Cadência | Ação |
|----------|------|
| Fim de cada sessão | Append em `decisions-log` (decisões) + `post-history` (conteúdo) |
| Publicação | Append em `post-history` + update em `calendar` (status: published) |
| Fim de campanha | Consolidar métricas + mover para `_archive/campaigns/` |
| Virada de mês | Rotacionar `calendar` do mês anterior para `_archive/<YYYY-QN>/` |

---

*Domínio de maior velocidade. Cresce toda semana.*
