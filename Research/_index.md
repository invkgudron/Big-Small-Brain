---
name: Research Index
description: MOC do domínio Research — dados, métricas, inteligência, auditorias
type: moc
status: active
date: 2026-04-18
tags: [moc, navigation, research]
---

# Research — Index

MOC do domínio `Research/`. Dados brutos e consolidados, inteligência competitiva, tendências, auditorias.

---

## Dados de negócio

| Arquivo | Cobertura | Última ingestão |
|---------|-----------|-----------------|
| [[Research/sales-data]] | Pedidos Dez/2025 – Abr/2026 (29 pedidos, R$6.447,73) | Abril 2026 |
| [[Research/instagram-insights]] | Alcance, vendas atribuídas, top produtos | Abril 2026 |

## Inteligência de mercado

| Arquivo | Escopo |
|---------|--------|
| [[Research/competitor-intel]] | Hub de inteligência competitiva — resumo executivo + navegação |
| [[Research/competitors/_index]] | MOC dos 11 perfis individuais (6 nacionais + 5 internacionais) |
| [[Research/competitor-matrix]] | Matriz comparativa + lacunas + oportunidades + ameaças + recomendações + mapa |
| [[Research/trends]] | Tendências de mercado e ingredientes |
| [[Research/investor-brand-survey]] | Questionário de percepção de marca (investidores) |

## Estrutura externa

| Arquivo | O que mapeia |
|---------|--------------|
| [[Research/website-map]] | Estrutura de mpoficial.com |

## Auditorias

| Arquivo | Escopo | Score / Data |
|---------|--------|--------------|
| [[Research/design-system-audit]] | Design system | 62/100 — 17/04/2026 |

## Insights internos

| Arquivo | Uso |
|---------|-----|
| [[Research/claude-code-insights]] | Notas sobre uso do Claude Code no projeto |

---

## Entidades canônicas

- Cupons (seção 6 de [[System/ids]])
- Concorrentes (seção 8 de [[System/ids]] — em expansão)

---

## Invariantes

1. **`sales-data` e `instagram-insights` são singletons** — snapshot trimestral migra para `_archive/<YYYY-QN>/`
2. **Toda métrica tem fonte** — frontmatter com `source` + `period_start/period_end`
3. **Auditorias geram issues** — cada gap vira entrada em [[Content/issues-log]] com ID
4. **`trends` cresce append-only** — uma seção por tendência
5. **Concorrentes = 1 arquivo por marca em `competitors/`** — `competitor-intel.md` é hub lean (exec summary + nav), `competitor-matrix.md` é análise gerada; nunca append narrativo dentro do hub

---

## Cadência

| Cadência | Ação |
|----------|------|
| Ingestão de CSV de vendas | Update `sales-data` + derivar métricas em `instagram-insights` |
| Export de IG Insights | Update `instagram-insights` |
| Trimestral | Snapshot de `sales-data` + `instagram-insights` → `_archive/<YYYY-QN>/` |
| Por evento | Nova auditoria → novo `<escopo>-audit.md` |

---

*Este domínio é a base de decisões estratégicas. Todo dado tem procedência e todo insight tem âncora.*
