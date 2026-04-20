---
name: Inbox
description: Dropzone universal — qualquer conteúdo novo entra aqui antes de ser classificado
type: moc
status: active
date: 2026-04-18
tags: [inbox, staging, system]
---

# Inbox — Dropzone Universal

**Esta pasta é o ponto de entrada único do vault.**

Qualquer conteúdo novo — com ou sem descrição do usuário — entra aqui. Claude identifica, classifica e roteia conforme [[System/ingestion-pipeline]].

---

## Como usar

### Caso 1 — Upload com descrição
O usuário cola o arquivo e diz "aqui está o CSV de vendas de abril".
→ Claude já tem o tipo — faz ingestão direta.

### Caso 2 — Upload **sem** descrição
O usuário simplesmente arrasta um arquivo.
→ Claude executa [[System/ingestion-pipeline]]:
1. Detecta tipo bruto (extensão + amostra)
2. Busca sinais (nome, conteúdo, entidades, origem)
3. Calcula score de confiança
4. Se ≥ 70% — classifica automático
5. Se 40–69% — apresenta 2 opções
6. Se < 40% — deixa em `_unclassified/` e abre issue

### Caso 3 — Conteúdo criado em sessão (sem upload)
Conteúdo gerado em conversa **não** passa por Inbox — vai direto para destino conforme [[System/taxonomy]].

---

## Subpastas

| Pasta | Uso |
|-------|-----|
| `_unclassified/` | Staging final para conteúdo com confiança < 40% — aguarda input humano |
| `_draft/` | Conteúdo em construção que ainda não está pronto para ir ao destino |
| `_raw/` | Arquivos originais (CSV, PDF, imagens) mantidos enquanto são processados |

> Subpastas são criadas apenas quando necessário — não precisam existir a vazio.

---

## Ciclo de vida de um item no Inbox

```
[upload] → Inbox/<data>-<nome-original>.<ext>
    ↓
    [ingestion-pipeline roda]
    ↓
    ┌─ confiança ≥ 70% ─→ movido para destino + _archive/_inbox-processed/<YYYY-MM>/
    ├─ confiança 40-69% ─→ pausa, pergunta ao usuário, depois movido
    └─ confiança < 40% ─→ Inbox/_unclassified/ + issue em issues-log.md
```

---

## Regras imutáveis

1. **Nada fica em Inbox/ por mais de 7 dias.** Se passou 7 dias, abrir issue P0.
2. **Arquivos originais são preservados** em `_archive/_inbox-processed/` após processamento — nunca deletar fonte.
3. **Se o upload é duplicata de algo já no vault** (>80% overlap), não reingerir — reportar como issue.
4. **Nomear com data prefix:** `YYYY-MM-DD-<slug-ou-nome-original>.<ext>`
5. **Relatório ao usuário após cada ingestão** — conforme [[System/ingestion-pipeline#Etapa 6]]

---

## Exemplos de uso

### Exemplo 1 — CSV sem descrição
```
Input: Inbox/pedidos_abril.csv

Pipeline:
- Detecta: CSV, encoding UTF-8, separator ';'
- Filename match: "pedidos_*" → sales-data (peso 0.4)
- Content match: colunas "CEP", "cupom", "valor total" → sales-data (peso 0.4)
- Entities: cupons OITAVA, RAFA15, BH10 detectados → tag #channel/afiliados
- Score: 0.85 → classificação automática

Output:
- Dados consolidados anexados em Research/sales-data.md
- Novas métricas em Research/instagram-insights.md
- Arquivo fonte em _archive/_inbox-processed/2026-04/pedidos_abril.csv
- Notificação ao usuário com sumário
```

### Exemplo 2 — Imagem sem descrição
```
Input: Inbox/IMG_2345.png

Pipeline:
- Detecta: imagem PNG 1080x1920 (9:16 — formato de Reel/Story)
- OCR extrai: "PORQUE 3W ??" + "HIDROLISADA"
- Content match: hook + tipo de proteína → post carousel
- Entities: Whey 3W detectado → #product/whey-3w
- Score: 0.75 → classificação automática

Output:
- Imagem movida para _archive/_inbox-processed/2026-04/
- Seção adicionada em Content/post-history.md
- Notificação ao usuário
```

### Exemplo 3 — Conteúdo ambíguo
```
Input: Inbox/anotacoes.txt — "Lipo-X é ótimo para definição"

Pipeline:
- Detecta: texto curto
- Sinais fracos — 1 entidade, sem contexto
- Score: 0.25 → _unclassified/

Output:
- Arquivo em Inbox/_unclassified/2026-04-18-anotacoes.txt
- Issue aberta em issues-log.md
- Claude pergunta: "Isso é uma decisão? Um insight para trends? Nota pessoal?"
```

---

*Inbox é a porta. Tudo que passa por aqui sai identificado e localizado — ou fica em `_unclassified/` esperando você.*
