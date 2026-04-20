---
name: Archive Policy
description: Regras de retenção, rotação e arquivamento de conteúdo time-bound
type: system
status: active
date: 2026-04-18
tags: [system, archive, retention]
---

# Archive Policy — Retenção e Rotação

Objetivo: manter o vault navegável mesmo quando o volume de conteúdo cresce 10×–100×.

---

## Princípio central

> **Conteúdo vivo** fica nas pastas de domínio.
> **Conteúdo histórico** migra para `_archive/` com trilha de acesso.

Um arquivo é **vivo** enquanto:
- Tem impacto em decisões futuras, **ou**
- É referenciado por conteúdo ativo, **ou**
- Está dentro de sua janela de relevância (ver abaixo)

---

## Janelas de relevância por tipo

| Tipo | Vivo por | Gatilho de archive |
|------|----------|--------------------|
| `calendar` | mês corrente + próximo | Virada de mês → arquivar grade anterior |
| `campaign` | do `start_date` ao `end_date + 30 dias` | 30 dias após o fim |
| `post` (post-history) | permanente (append-only log) | **nunca arquiva linha** — mas pode splitar por trimestre se o arquivo > 100KB |
| `email-sequence` | enquanto ativo | Quando substituído por nova versão (status → `deprecated`) |
| `decision-log` | permanente | **nunca arquiva** |
| `issue-log` | permanente | **nunca arquiva** (corrigidos ficam na tabela "Erros Corrigidos") |
| `sales-data` | trimestre corrente + 3 anteriores | Snapshot trimestral arquivado |
| `instagram-insights` | trimestre corrente + 3 anteriores | Snapshot trimestral arquivado |
| `audit` | permanente | Auditoria antiga é referência histórica — manter |
| `competitor-intel` | permanente | Cresce append-only por marca |
| `trends` | permanente | Cresce append-only |
| `survey` | permanente | Cresce append-only |
| `template` | enquanto ativo | Quando substituído — `deprecated` + link para sucessor |
| `product-sheet` | enquanto produto existe | Quando produto é descontinuado — mover para `_archive/discontinued/` |
| `brand-core`, `visual-language`, `audience`, `ingredient-reference`, `product-catalog` | permanente | Versões antigas não são arquivadas — mudanças são registradas em `decisions-log` |

---

## Estrutura de `_archive/`

```
_archive/
├── README.md
├── 2026-Q1/                        ← snapshots trimestrais
│   ├── sales-data-snapshot.md
│   ├── instagram-insights-snapshot.md
│   └── calendar-jan-mar.md
├── 2026-Q2/
│   └── ...
├── campaigns/                      ← campanhas encerradas
│   └── campaign-01-origem-performance-encerrada.md
├── deprecated/                     ← arquivos superados por sucessor
│   └── ...
└── discontinued/                   ← produtos descontinuados
    └── ...
```

---

## Operações de archive

### Arquivar um arquivo
1. Atualizar `status: archived` no frontmatter
2. Adicionar `archived_at: YYYY-MM-DD` e `archived_reason: <motivo>` no frontmatter
3. Mover para o subdiretório correto de `_archive/`
4. Atualizar todos os wiki-links quebrados (usar Obsidian "Update links when file is moved"; se não estiver ativo, buscar referências com Grep)
5. Registrar em `decisions-log.md`:
   ```
   ## DD/MM/AAAA — Archived: <arquivo>
   **Motivo:** ...
   **Novo caminho:** [[_archive/.../arquivo]]
   ```

### Rotacionar arquivo singleton grande (ex: sales-data)
1. Criar snapshot em `_archive/<período>/<arquivo>-snapshot.md` copiando estado atual
2. Adicionar no frontmatter do snapshot:
   ```yaml
   type: <tipo-original>
   status: archived
   archived_at: <data>
   period_start: <início>
   period_end: <fim>
   snapshot_of: [[arquivo-original]]
   ```
3. Limpar dados antigos no arquivo vivo (manter sumário + link para snapshot)
4. Registrar em `decisions-log.md`

### Splitar post-history por trimestre (quando > 100KB)
1. Criar `_archive/<YYYY-QN>/post-history-<YYYY-QN>.md`
2. Mover seções do trimestre para o arquivo de archive
3. No `post-history.md` vivo, adicionar nota:
   ```
   > Histórico anterior a <data>: [[_archive/YYYY-QN/post-history-YYYY-QN]]
   ```

---

## Cadência de revisão

| Frequência | Ação | Responsável |
|------------|------|-------------|
| Diária (em sessão) | Move itens processados do Inbox/ para `_archive/_inbox-processed/<YYYY-MM>/` | Claude (automático no pipeline) |
| Mensal | Arquiva `calendar.md` do mês anterior; cria novo mês | Usuário + Claude |
| Trimestral | Snapshot de `sales-data.md` e `instagram-insights.md`; split de `post-history.md` se > 100KB | Usuário + Claude (revisão dedicada) |
| Anual | Revisão do diretório `_archive/` — consolidar Q1–Q4 em anuais se útil | Usuário |

---

## Regras imutáveis

1. **Nunca deletar** do vault. Archive é a operação irreversível mais forte permitida.
2. **Sempre preservar metadata** no archive — `archived_at`, `archived_reason`, `snapshot_of`, `supersedes`.
3. **Nunca quebrar link** sem redirecionar — atualizar referências ou deixar stub no caminho antigo.
4. **Decisões de archive ficam em `decisions-log.md`** — sem exceção.
5. **`_archive/` nunca é lido em auto-leitura** (ver `CLAUDE.md` — memória ativa).

---

## Buscas no archive

Como o archive **não** é auto-lido, para recuperar conteúdo histórico:

1. **Via `vault-map.md`** → seção `_archive/`
2. **Via wiki-link** se sucessor linkar o antigo (`supersedes`)
3. **Via grep** no vault completo
4. **Via frontmatter query** — `type: <tipo>` + `status: archived`
