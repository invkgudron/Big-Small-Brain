---
name: Relationships Pattern
description: Padrões de cross-reference, backlinks e navegação entre arquivos
type: system
status: active
date: 2026-04-18
tags: [system, graph, navigation]
---

# Relationships — Padrões de Link e Cross-reference

O poder de um second brain está na **densidade de relações** entre arquivos. Este arquivo define como essas relações são criadas e mantidas.

---

## 1. Tipos de relação

| Tipo | Uso | Expressão |
|------|-----|-----------|
| **Menção** | Citação natural no corpo do texto | `[[Brand/power-creatine\|Creatina]]` |
| **Referência forte** | Relação explícita no frontmatter | `related: [[[arquivo]]]` |
| **Composição** | "contém" — kit contém produto | Lista com wiki-links |
| **Supersession** | Substituição por versão nova | `supersedes: [[antigo]]` / `superseded_by: [[novo]]` |
| **Hierarquia** | MOC → conteúdo | `_index.md` lista arquivos do domínio |
| **Fonte** | Origem externa do dado | `source: <URL|path>` |
| **Backlink implícito** | Gerado automaticamente pelo Obsidian | — |

---

## 2. Regras de link

### Ao mencionar produto
Sempre usar wiki-link para a ficha técnica, com alias em português natural:

✅ `[[Brand/technical-sheets/power-creatine|Creatina]]`
❌ `Creatina` (sem link)
❌ `[creatine](Brand/technical-sheets/power-creatine.md)` (markdown link perde backlink)

### Ao mencionar ingrediente ativo
Link para `ingredient-reference.md` com âncora:

✅ `[[Brand/ingredient-reference#Beta-Alanina|Beta-Alanina]]`

### Ao mencionar persona/canal/tema
Link para o arquivo canônico, não parafrasear:

✅ `[[Brand/audience|núcleo de atletas]]`

### Ao referenciar post publicado
Link para a seção exata em `post-history.md`:

✅ `[[Content/post-history#16/04/2026 — Carrossel "Por que 3W?"|carrossel 3W]]`

### Ao referenciar decisão
Se a decisão é âncora da ação atual, linkar a entrada:

✅ `Ver [[Content/decisions-log#17/04/2026 — Template de Reels Educativos|decisão de 17/04]]`

### Ao referenciar issue
Formato: `ver [[Content/issues-log|issue #012]]` (o Obsidian abre no arquivo)

---

## 3. Padrão de frontmatter `related`

Usar `related:` quando:
- Dois arquivos são co-necessários para entender um contexto
- A ligação não é óbvia pela leitura do corpo
- Um terceiro arquivo precisa encontrar ambos via graph

Não usar `related:` quando:
- A relação já está evidente por wiki-link no corpo
- Seria relação fraca de "menção passageira"

Exemplo válido:
```yaml
type: campaign
related:
  - [[Brand/technical-sheets/magnific-whey-chocolate-avela]]
  - [[Content/content-templates]]
  - [[Research/instagram-insights]]
```

---

## 4. Convenção de direção

| Relação | Direção |
|---------|---------|
| Campanha → Post | Campanha lista posts em corpo; post tem `campaign_ref` no frontmatter |
| Template → Post aprovado | Template referencia post como exemplo; post linka template usado |
| Ficha técnica → Catálogo | Ficha linka catálogo; catálogo linka todas as fichas |
| Produto → Ingrediente | Produto linka ingrediente no corpo; ingrediente lista produtos que usam (em `ingredient-reference.md`) |
| Persona → Cupom | `audience.md` lista cupons; cupons não têm arquivo próprio |
| Decisão → Arquivo afetado | Decisão linka arquivos; arquivo atualizado **não** precisa linkar decisão |

---

## 5. MOC — Map of Content

Cada domínio tem `_index.md`:

**Estrutura mínima de um MOC:**

```markdown
---
name: <Domínio> Index
description: MOC do domínio <Domínio>
type: moc
status: active
date: <YYYY-MM-DD>
tags: [moc, navigation]
---

# <Domínio> Index

## Por subtema

### <Subtema A>
- [[arquivo-1]] — 1 linha
- [[arquivo-2]] — 1 linha

### <Subtema B>
- [[arquivo-3]] — 1 linha

## Entidades canônicas do domínio
Link para seção relevante de [[System/ids]].

## Arquivos ativos x arquivados
- Ativos: listados acima
- Arquivados: ver [[_archive/README]]
```

---

## 6. Densidade mínima recomendada

Um arquivo saudável tem:
- ≥ 2 wiki-links de saída (para outros arquivos do vault)
- ≥ 1 wiki-link de entrada (backlink — validar via Graph View)
- Tags canônicas no frontmatter (ver `taxonomy.md` seção 3)

Arquivo-órfão (0 backlinks, 0 wiki-links de saída) = **red flag**. Deve aparecer em issue.

---

## 7. Graph View

Ver [[Brand/visual-language#Graph View — Arquitetura de Visualização do Brain]] para sistema de cores.

Consultas úteis (via Obsidian Graph View config):

```
path:Brand/technical-sheets       → cor Azul
path:Workflows                    → cor Verde
path:Research                     → cor Amarelo
file:visual-language              → cor Magenta
path:System                       → cor Cinza (meta)
path:Inbox                        → cor Laranja (staging)
path:_archive                     → cor Preto/Cinza escuro (histórico)
```

---

## 8. Quebra de link — detecção e correção

Links quebrados surgem quando:
- Arquivo renomeado sem atualizar referências
- Arquivo movido para `_archive/` sem redirect
- Alias de wiki-link refere a arquivo inexistente

**Detecção manual (trimestral):**
- Obsidian → Community Plugins → "Broken Links" plugin
- Ou grep em busca de `[[.*]]` e validar cada ocorrência contra arquivos existentes

**Correção:**
- Se o alvo foi arquivado: atualizar link para `_archive/...`
- Se o alvo foi renomeado: atualizar link
- Se o alvo foi deletado: remover link + registrar em `issues-log.md`

---

## 9. Nunca fazer

1. ❌ Usar link absoluto com caminho completo (`[Brand/power-creatine](C:\...)`)
2. ❌ Parafrasear entidade canônica (ex: "creatina brasileira" quando o produto é alemão)
3. ❌ Criar link para arquivo não-existente como placeholder sem criar o arquivo stub
4. ❌ Usar markdown link em vez de wiki-link para arquivos internos do vault
