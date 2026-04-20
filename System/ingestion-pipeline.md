---
name: Ingestion Pipeline
description: Árvore de decisão para classificar e rotear conteúdo novo em Inbox/
type: system
status: active
date: 2026-04-18
tags: [system, pipeline, automation, classification]
---

# Ingestion Pipeline — Árvore de Decisão

**Este é o protocolo que Claude executa quando qualquer conteúdo entra em `Inbox/` ou quando o usuário envia algo sem descrição.**

Objetivo: identificar (1) o que é, (2) a que tipo pertence, (3) a que se relaciona, (4) onde deve morar. Sem depender de descrição humana.

---

## Etapa 0 — Pré-processamento

Antes de classificar, **sempre**:

1. **Detectar encoding e separador** se for texto estruturado (CSV, TSV): UTF-8, Latin-1, UTF-16; `,` vs `;`.
   → Regra já existente em `CLAUDE.md` — obrigatória para CSVs BR/PT.
2. **Contar linhas/registros** e reportar ao usuário.
3. **Extrair metadados técnicos** — tamanho, tipo MIME, data de modificação.
4. **🔴 SCRUB DE PII (GDPR/LGPD)** — Se o conteúdo contiver nomes reais de clientes, endereços completos ou e-mails originários de extratos financeiros (como Nuvemshop), substitua-os imediatamente por identificadores anônimos (`Cliente Anonimizado`, `Cliente #123`) ANTES de sintetizar os dados em qualquer Markdown do Vault. Nomes reais são estritamente proibidos em plain-text.

---

## Etapa 1 — Detecção do tipo bruto

Pela extensão + análise do conteúdo:

| Extensão / padrão | Tipo bruto | Ação preliminar |
|-------------------|------------|-----------------|
| `.md` | texto estruturado | ler integralmente |
| `.txt` | texto livre | ler integralmente |
| `.csv`, `.tsv` | dados tabulares | detectar encoding/separator, amostrar 20 linhas |
| `.json`, `.ndjson` | dados estruturados | parse + amostrar schema |
| `.xlsx`, `.xls` | planilha | listar sheets, amostrar primeira |
| `.pdf` | documento | ler primeiras/últimas páginas; OCR se necessário |
| `.docx` | documento | ler integralmente |
| `.png`, `.jpg`, `.jpeg`, `.webp` | imagem | descrever visualmente; extrair texto com OCR se houver |
| `.mp4`, `.mov`, `.gif` | vídeo | capturar primeiro/último frame; transcrever áudio se tiver |
| `.mp3`, `.wav` | áudio | transcrever |
| `.eml`, `.msg` | e-mail | extrair from/to/subject/body |
| `.gs`, `.js`, `.ts`, `.py` | script | ler integralmente |
| `.html` | página web | extrair título + texto; listar links |
| URL (string) | web | fetch + extrair título/meta |

---

## Etapa 2 — Sinais de classificação (bottom-up)

Executar **em paralelo**:

### Sinal A — Nome do arquivo
Padrões no filename:
- `label_*`, `LABEL_*`, `rótulo_*` → `product-sheet`
- `pedidos_*`, `vendas_*`, `sales_*`, `orders_*` → `sales-data`
- `ig_*`, `instagram_*`, `insights_*` → `instagram-insights`
- `audit*`, `audit*.pdf` → `audit`
- `survey*`, `questionario*` → `survey`
- `prompt*` → `prompt-library`
- `template*` → `template`
- `calendar*`, `calendario*` → `calendar`
- `campaign*`, `campanha*` → `campaign`
- `competitor*`, `concorrente*` → `competitor-intel`
- `trend*`, `tendencia*` → `trends`

### Sinal B — Conteúdo interno
Padrões de texto:
- Contém "SKU", "Peso líquido", "Código de barras", "ANVISA" → `product-sheet`
- Contém "pedido", "CEP", "cupom", "valor total", "método de pagamento" → `sales-data`
- Contém "alcance", "impressões", "seguidores", "engajamento" → `instagram-insights`
- Contém "slide 1", "slide 2", "hook", "CTA" → `post` ou `template`
- Contém "briefing", "objetivo", "público-alvo", "período" → `campaign`
- Contém "assunto:", "corpo:", "CTA:", múltiplas mensagens numeradas → `email-sequence`
- Contém tabela markdown com "ID | Descoberto | Erro" → `issue-log`
- Contém "## DD/MM/AAAA — <algo>" cabeçalhos → `decision-log` ou `post-history`
- Contém "benchmark", "concorrente X", análise side-by-side → `competitor-intel`
- Contém "estudo clínico", "dose ergogênica", "mg/kg" → `ingredient-reference`
- Contém "#xxxxxx" (hex), "Montserrat", "logo" → `visual-language` ou `theme`

### Sinal C — Entidades detectadas
Usar [[System/ids]] para matching:
- Produtos (SKU, nome): presente? → tag `#product/<id>`
- Personas (núcleo/aquisição): presente? → tag `#persona/<id>`
- Canais (IG/e-mail/WhatsApp/Site): presente? → tag `#channel/<id>`
- Campanhas: presente? → tag `#campaign/<id>`
- Cupons (OITAVA, RAFA15, PRIMEIRA10, BH10, etc.): presente? → ligação com `audience.md`

### Sinal D — Origem externa
- Arquivo veio de Nuvemshop → `sales-data`
- Screenshot de Instagram → `instagram-insights` ou `post` (dependendo do que mostra)
- PDF de rótulo/embalagem → `product-sheet`
- E-mail de investidor/cliente → `survey` ou contexto de `audience`
- Export de Canva/Figma → referência visual em `post-history` ou `content-templates`
- Resposta de agente externo (competitor brief, pesquisa) → `competitor-intel` ou `trends`

---

## Etapa 3 — Scoring de confiança

Combinar sinais:

```
confidence = (
  0.4 * filename_match
  + 0.4 * content_pattern_match
  + 0.2 * entity_match
)
```

| Score | Ação |
|-------|------|
| ≥ 0.7 | Classificar automaticamente. Aplicar frontmatter e mover. Notificar usuário com resumo. |
| 0.4 – 0.69 | Apresentar 2 opções prováveis ao usuário. Pedir confirmação rápida. |
| < 0.4 | Pedir descrição explícita. Manter em `Inbox/_unclassified/`. Criar issue em `issues-log`. |

---

## Etapa 4 — Aplicação

Independente do score:

1. **Gerar frontmatter** completo conforme [[System/frontmatter-schema]]
2. **Renomear** conforme [[System/file-naming]]
3. **Extrair entidades** e criar wiki-links `[[...]]` para IDs canônicos conhecidos
4. **Adicionar tags** canônicas
5. **Mover** para pasta de destino ([[System/taxonomy]])
6. **Atualizar MOC** do domínio — incluir o novo arquivo no `_index.md` correspondente
7. **Registrar em log**:
   - Se é decisão estrutural → `decisions-log.md`
   - Se é dado apenas → seção `## Ingestão — DD/MM/AAAA` em `post-history.md` ou no arquivo singleton correspondente

---

## Etapa 5 — Enriquecimento pós-ingestão

Para cada tipo, ação enriquecedora após parsing:

| Tipo detectado | Enriquecimento |
|----------------|----------------|
| `sales-data` | Calcular métricas consolidadas (ticket médio, top produtos, cupons ativos). Atualizar `instagram-insights.md` com seção "Vendas — última ingestão". |
| `instagram-insights` | Identificar posts de maior alcance; cross-ref com `post-history.md`; atualizar `trends.md` se padrão novo. |
| `product-sheet` | Criar entrada em `product-catalog.md` se SKU novo. Atualizar `ids.md` se necessário. |
| `post` | Append seção em `post-history.md` com template correspondente. Atualizar `calendar.md` marcando como publicado. |
| `competitor-intel` | Cross-ref com `trends.md` se detectar padrão de mercado. |
| `survey` | Extrair insights acionáveis; criar entries em `audience.md` ou `trends.md`. |
| `audit` | Gerar ações priorizadas em `issues-log.md` com IDs sequenciais. |

---

## Etapa 6 — Reportar ao usuário

Formato padrão de resposta após ingestão:

```
✅ Ingeri: <nome do arquivo original>

**Identificado como:** <type>  (confiança: <N>%)
**Sinais:** <lista dos sinais que levaram à classificação>
**Entidades detectadas:** <IDs canônicos>
**Destino:** <caminho final no vault>
**Relações criadas:** <wiki-links inseridos>
**Atualizações colaterais:** <MOCs atualizados, logs alimentados>

Algo a ajustar antes de eu arquivar a fonte em `_archive/_inbox-processed/`?
```

---

## Regras imutáveis

1. **Nunca descartar conteúdo não-classificado.** Sempre mover para `Inbox/_unclassified/` e registrar issue.
2. **Nunca sobrescrever arquivo existente** — usar discriminador de nome ou fazer append.
3. **Nunca inventar metadados** — campos incertos ficam com valor `unknown` ou são omitidos.
4. **Nunca criar subpasta não prevista** em [[System/taxonomy]] sem consulta explícita.
5. **Duplicatas:** se novo arquivo replica conteúdo existente (>80% overlap), reportar como issue e parar — não ingerir.

---

## Pseudocódigo de referência

```
function ingest(file):
    raw = preprocess(file)              # encoding, separator, OCR, etc.
    signals = {
        filename: match_filename(file.name),
        content: match_content_patterns(raw),
        entities: extract_entities(raw, ids_dict),
        origin: infer_origin(file.metadata)
    }
    type, confidence = classify(signals)

    if confidence < 0.4:
        move_to("Inbox/_unclassified/")
        create_issue(file)
        ask_user()
        return

    if 0.4 <= confidence < 0.7:
        propose_options_to_user()
        return

    # confidence >= 0.7
    frontmatter = generate_frontmatter(type, signals)
    filename_final = rename(file, type)
    dest = route(type)                  # per taxonomy
    entities = extract_entities(raw, ids_dict)
    content_final = inject_wikilinks(raw, entities)

    write(dest/filename_final, frontmatter + content_final)
    update_moc(dest.domain)
    enrich(type)
    report_to_user()
    archive_source()
```

---

*Este pipeline é a lei. Se algo parece não caber, é sinal de que o sistema precisa evoluir — não de que se deve improvisar.*
