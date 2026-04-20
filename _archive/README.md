---
name: Archive
description: Histórico arquivado — conteúdo time-bound fora do ciclo de auto-leitura
type: moc
status: active
date: 2026-04-18
tags: [archive, system]
---

# _archive — Histórico do Vault

Esta pasta guarda conteúdo **histórico** — fora da janela de relevância mas preservado para referência.

**Não é auto-lida.** Para acessar, use busca explícita ou siga wiki-link de `supersedes` / `snapshot_of`.

Ver regras completas em [[System/archive-policy]].

---

## Estrutura

| Subpasta | Conteúdo |
|----------|----------|
| `<YYYY-QN>/` | Snapshots trimestrais (sales-data, instagram-insights, calendar) |
| `campaigns/` | Campanhas encerradas |
| `deprecated/` | Arquivos superados por versão nova |
| `discontinued/` | Produtos fora de linha |
| `_inbox-processed/<YYYY-MM>/` | Arquivos originais de uploads já ingeridos |

---

## Regras

1. Nada é deletado. Archive é irreversível apenas no sentido "sai do fluxo ativo".
2. Frontmatter obrigatório após archive:
   ```yaml
   status: archived
   archived_at: <YYYY-MM-DD>
   archived_reason: <motivo curto>
   snapshot_of: [[arquivo-vivo]]   # se for snapshot
   supersedes: [[arquivo-antigo]]  # se for substituto (no item vivo)
   superseded_by: [[arquivo-novo]] # no item arquivado
   ```
3. Wiki-links do conteúdo vivo para o archive são **permitidos e encorajados** — permitem navegar o histórico.
4. Revisão anual: consolidar trimestres em anuais se fizer sentido (`2026-QN/` → `2026-anual/`).

---

## Cadência

- **Diário (automático):** `_inbox-processed/<YYYY-MM>/` recebe fontes de uploads processados
- **Mensal:** `calendar.md` do mês anterior rotaciona para `_archive/<YYYY-QN>/calendar-<mes>.md`
- **Trimestral:** snapshot de `sales-data.md` e `instagram-insights.md`
- **Por evento:** campanha encerrada → `campaigns/`
- **Anual:** revisão da estrutura do archive

---

## Como buscar conteúdo arquivado

1. **Via sucessor** — se o arquivo vivo tem `supersedes: [[archive/...]]`, é o caminho mais rápido
2. **Via [[System/vault-map]]** — seção "_archive/"
3. **Via grep global** no vault
4. **Via query Dataview** (quando plugin ativo):
   ```dataview
   TABLE status, archived_at, archived_reason
   FROM "_archive"
   WHERE type = "<tipo>"
   SORT archived_at DESC
   ```

---

*Esta pasta cresce lento e constante. É o registro histórico do cérebro.*
