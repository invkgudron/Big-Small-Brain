---
name: Color System
description: Sistema de cores do graph view Obsidian — categorias visuais para entender o vault ao bater o olho
type: system
status: active
date: 2026-04-18
tags: [system, obsidian, graph, visual, color]
weight: 7
activation_contexts: [graph-view, visual-navigation, onboarding]
related:
  - "[[Brand/visual-language]]"
  - "[[System/taxonomy]]"
  - "[[HEALTH_CHECK_REPORT]]"
---

# Color System — Obsidian Graph View

**Propósito:** cada arquivo no graph view tem cor baseada na sua categoria — identidade visual consistente com a paleta oficial da Medicinal Pharma + convenções de UX para hubs de navegação.

**Aplicado em:** `.obsidian/graph.json → colorGroups[]`

---

## 1. Princípios de design

1. **Cor = semântica, não decoração.** Uma cor identifica *que tipo de informação* o arquivo carrega.
2. **Paleta MP primeiro.** Azul/vermelho/dourado/azul-aço são da identidade oficial. Secundárias (verde, amarelo, roxo, laranja, vinho, magenta, grafite) foram escolhidas para contraste máximo no grafo.
3. **Herança por domínio.** Todos arquivos em uma pasta herdam a cor daquela pasta, a menos que uma regra específica sobreponha.
4. **Último match vence.** Obsidian avalia colorGroups top-down; regras específicas vêm **depois** das genéricas.
5. **Hubs se destacam.** MOCs e root docs usam cores de alto contraste (dourado e vermelho) para serem vistos imediatamente.

---

## 2. Mapa de categorias → cores

### Domínios (regras genéricas)

| Domínio | Cor | HEX | RGB decimal | Racional |
|---------|:---:|:---:|:-----------:|----------|
| `Brand/` | 🔵 Azul Principal MP | `#20388a` | 2111626 | Cor primária da marca — identidade core |
| `Content/` | 🟢 Verde esmeralda | `#10b981` | 1096065 | Verde = produção / growth / output ativo |
| `Research/` | 🟡 Amarelo âmbar | `#eab308` | 15381256 | Amarelo = descoberta / insight / análise |
| `Workflows/` | 🟣 Roxo | `#a855f7` | 11032055 | Roxo = automação / código / processo |
| `System/` | ⚫ Grafite | `#475569` | 4674921 | Cinza = meta / infraestrutura / regra |
| `Templates/` | ⚫ Grafite | `#475569` | 4674921 | Mesma cor de System — são moldes, não conteúdo |
| `Inbox/` | 🟠 Laranja | `#f97316` | 16347926 | Laranja = triagem / atenção / não-classificado |
| `_archive/` | 🟥 Vinho | `#7f1d1d` | 8330525 | Vinho = histórico / inativo / só-leitura |

### Overrides específicos (regras específicas vencem)

| Escopo | Cor | HEX | RGB | Motivo do override |
|--------|:---:|:---:|:---:|--------------------|
| `Brand/technical-sheets/` | 🟦 Azul aço MP | `#90a9c2` | 9480642 | Subcategoria Brand — fichas de rótulo oficial distintas da narrativa estratégica |
| `Brand/themes/*` + `visual-language.md` | 💗 Magenta | `#d946ef` | 14239471 | Identidade visual/temas — cor de destaque (cor favorita no graph view) |
| MOCs (`_index`, `vault-map`, `CONTEXT`) | 🟡 Dourado MP | `#f59e0b` | 16096779 | Hubs de navegação — dourado oficial MP (xBall Italic) indica "mapa" |
| Root docs críticos (`CLAUDE`, `SYSTEMS_CHECKUP`, `JARVIS_ARCHITECTURE`, `HEALTH_CHECK_REPORT`) | 🔴 Vermelho MP | `#d20a11` | 13765137 | Vermelho MP = alta prioridade de leitura / documento-fonte |

---

## 3. Ordem das regras no graph.json

Obsidian avalia top-down, último match vence. Ordem correta:

```
1. path:"Brand"                    → azul
2. path:"Content"                  → verde
3. path:"Research"                 → amarelo
4. path:"Workflows"                → roxo
5. path:"System"                   → grafite
6. path:"Inbox"                    → laranja
7. path:"_archive"                 → vinho
8. path:"Templates"                → grafite
9. path:"Brand/technical-sheets"   → azul aço      (sobrepõe Brand)
10. path:"Brand/themes" OR file:visual-language → magenta (sobrepõe Brand)
11. file:_index OR file:vault-map OR file:"CONTEXT.md" → dourado (sobrepõe todos)
12. file:CLAUDE OR SYSTEMS_CHECKUP OR JARVIS OR HEALTH_CHECK → vermelho (topo da hierarquia)
```

---

## 4. O que cada cor significa quando você abre o grafo

| Você vê... | Interpretação imediata |
|-----------|----------------------|
| 🔴 nó vermelho | Documento-fonte crítico — ler antes de decidir algo estrutural |
| 🟡 nó dourado | Hub de navegação (MOC) — entrada do domínio |
| 🔵 nó azul | Arquivo de identidade da marca (core, audience, catalog) |
| 🟦 nó azul-aço | Ficha técnica de produto específico |
| 💗 nó magenta | Linguagem visual / tema — afeta design de entregáveis |
| 🟢 nó verde | Conteúdo em produção — posts, campanhas, templates, calendar |
| 🟡 nó amarelo-âmbar | Dado / insight / auditoria — feeds para decisão |
| 🟣 nó roxo | Automação — script, SOP, prompt |
| ⚫ nó grafite | Meta-regra do vault ou template |
| 🟠 nó laranja | Precisa de triagem — na Inbox, ainda não classificado |
| 🟥 nó vinho | Arquivado — histórico, só leitura |

---

## 5. Expandindo para CSS snippets (futuro)

Graph view cobre **navegação visual.** Para o file explorer, recomenda-se futuramente criar CSS snippets em `.obsidian/snippets/` que apliquem cor às pastas:

```css
/* .obsidian/snippets/folder-colors.css */
.nav-folder-title[data-path="Brand"] { color: #20388a; font-weight: bold; }
.nav-folder-title[data-path="Content"] { color: #10b981; font-weight: bold; }
.nav-folder-title[data-path="Research"] { color: #eab308; font-weight: bold; }
.nav-folder-title[data-path="Workflows"] { color: #a855f7; font-weight: bold; }
.nav-folder-title[data-path="System"] { color: #475569; font-weight: bold; }
.nav-folder-title[data-path="Inbox"] { color: #f97316; font-weight: bold; }
.nav-folder-title[data-path="_archive"] { color: #7f1d1d; font-weight: bold; }
.nav-folder-title[data-path="Brand/technical-sheets"] { color: #90a9c2; }
.nav-folder-title[data-path="Brand/themes"] { color: #d946ef; }
```

**Status:** não implementado. Ativar em sessão dedicada com decision-log entry.

---

## 6. Como testar se está funcionando

1. Abrir graph view no Obsidian (atalho: Ctrl/Cmd+G, ou ícone do grafo na sidebar esquerda)
2. Clicar em **Display → Color groups** no painel do graph view
3. Verificar que os 12 grupos aparecem listados com as cores corretas
4. Ao dar zoom, nós devem aparecer coloridos por categoria

Se um arquivo não tiver cor esperada:
- Verificar se está na pasta correta conforme [[System/taxonomy]]
- Verificar se tem frontmatter `type:` correto (para futuros refinamentos baseados em frontmatter)
- Reportar em [[Content/issues-log]] com ID sequencial

---

## 7. Evolução do color system

Novas categorias só são adicionadas **após**:
1. Discussão registrada em [[Content/decisions-log]]
2. Atualização de `[[System/taxonomy]]` (se for nova pasta)
3. Atualização deste arquivo
4. Edição de `.obsidian/graph.json` com nova regra

---

*Criado em 18/04/2026 como parte do [[HEALTH_CHECK_REPORT]].*
*Paleta alinhada com [[Brand/visual-language]].*
