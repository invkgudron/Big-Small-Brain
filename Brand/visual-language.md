---
name: Visual Language
description: Paleta de cores, tipografia, logo, identidade visual Instagram, graph view, tema Elite Performance
type: visual-language
status: active
date: 2026-04-16
updated: 2026-04-18
tags: [brand, visual, design, colors, typography]
weight: 8
activation_contexts: [post-creation, visual-production, brand-identity, campaign-planning, create]
connects_to:
  - "[[Brand/brand-core]]"
  - "[[Content/content-templates]]"
  - "[[Brand/themes/elite-performance]]"
  - "[[Content/post-history]]"
related:
  - "[[Brand/brand-core]]"
  - "[[Brand/themes/elite-performance]]"
  - "[[Research/design-system-audit]]"
---

# Visual Language

## Cores

| Nome           | Hex / Referência | Uso                                      |
| -------------- | ---------------- | ---------------------------------------- |
| Azul Principal | `#20388a`        | Cor dominante da marca                   |
| Vermelho       | `#d20a11`        | Destaque, energia, urgência              |
| Azul Aço       | `#90a9c2`        | Cor de apoio, backgrounds secundários    |
| Dourado MP     | `#C9A84C` (Gold Gradient) | Títulos, destaques premium, xBall Italic |
| Azul Profundo  | `#0D1B4B`        | Overlays de caixa de copy (85% opacidade), dark backgrounds |

## Tipografia

| Fonte | Uso | Estilo |
|-------|-----|--------|
| Montserrat | Tipografia principal, corpo de texto | Regular / Bold |
| xBall Italic | Títulos — aplicado em dourado | Itálico Bold |
| xBall | Apoio — subtítulos, destaques | Bold |

## Logo — Versões de Aplicação

**Três versões:**
1. **Ícone** — escudo geométrico com águia (solo, sem texto)
2. **Escrito** — cursiva "Medicinal Pharma" (solo, sem ícone)
3. **Completo** — ícone + escrito (versão primária)

**Versões de cor:**
- Azul sobre fundo branco
- Azul + dourado sobre fundo branco
- Branco sobre fundo azul
- Branco + dourado sobre fundo azul

## Significado dos Elementos

**Ícone (escudo + águia):**
Denso, geométrico, comunica solidez. Autoridade e proteção. Uma instituição poderosa e vigilante que protege e sustenta a performance e a saúde.

**Escrito (cursiva "Medicinal Pharma"):**
O lado mais humano e acessível da marca. Fluido, oposto ao ícone rígido. Cuidado humano e tradição aliados à agilidade e ao bem-estar moderno.

## Auditoria do Design System

Ver análise estruturada completa em [[Research/design-system-audit]] (17/04/2026 — score 62/100).

**Hex confirmado em 17/04/2026** — Azul Principal é `#20388a`. Ver histórico em [[Content/issues-log]] (ID 012).

---

## Tema Oficial — Elite Performance

Tema customizado derivado desta linguagem visual, pronto para aplicação em apresentações, decks, carrosséis e e-mails:
→ [[Brand/themes/elite-performance]]

---

## Graph View — Arquitetura de Visualização do Brain

Sistema de cores para o Obsidian Graph View. Cada grupo reflete a natureza e a prioridade do conteúdo.

| Cor | Grupo | Lógica |
|-----|-------|--------|
| Azul (tom do branding) | `path:Brand/technical-sheets` | Fichas técnicas são o coração da informação — cor reflete a identidade principal da marca |
| Verde | `path:Workflows` | Tarefas diárias — verde para destacar e lembrar que precisam de atenção constante |
| Amarelo | `path:Research` | Base de todas as decisões estratégicas — amarelo para destacar importância |
| Magenta | `file:visual-language` | Cor favorita — "Eu que mando nessa linguagem visual." |

---

## Identidade Visual dos Produtos

- Embalagens em branco com cores da marca (azul, vermelho, dourado)
- Selo "Matéria Prima Importada" (escudo vermelho/branco) presente nas embalagens
- Informações técnicas em destaque no front da embalagem (dose, ativos principais)

---

## Linguagem Visual — Instagram / Carrossel

Padrão visual extraído de posts aprovados. Referência: [[Content/post-history]].

### Layout base — Carrossel Educativo

```
┌──────────────────────────────────┐
│▓▓▓│                         │░░░│
│▓▓▓│   [PRODUTO EM AÇÃO]      │░░░│
│▓▓▓│                         │░░░│
│▓▓▓│  ┌─────────────────────┐ │░░░│
│▓▓▓│  │ TIPO: copy técnico  │ │░░░│
│▓▓▓│  └─────────────────────┘ │░░░│
│▓▓▓│                    [MP]  │░░░│
└──────────────────────────────────┘
  ▓ = banda azul #20388a
  ░ = banda vermelha #d20a11
```

### Elementos recorrentes

| Elemento | Descrição | Uso |
|----------|-----------|-----|
| Bandas diagonais | Azul `#20388a` esquerda + Vermelho `#d20a11` direita | Todos os slides — identidade imediata |
| Textura de fundo | Palavra-chave do produto repetida em cinza claro (tipografia) | Slide de hook |
| Caixa de copy | Fundo azul escuro semi-transparente, sem borda | Slides técnicos |
| Keyword dourada | Tipo ou atributo principal destacado em gold gradient | Dentro da caixa de copy |
| Copy técnico | Branco, Bold, All-Caps, máximo 3 linhas | Benefício direto — sem jargão vazio |
| Logo MP | Ícone branco (escudo + águia), canto alternado | Todos os slides |
| Produto | Cut-out sem fundo, splash/efeito de produto em ação | Slides de produto |
| Seal "Matéria Prima Importada" | Escudo vermelho/branco | Close-ups de embalagem |

### Hierarquia tipográfica nos slides técnicos

1. **Tipo/atributo** → xBall Italic + dourado (ex: "HIDROLISADA:")
2. **Descrição** → Montserrat Bold + branco + All-Caps
3. **URL/CTA** → xBall Italic + dourado (ex: "MPOFICIAL.COM")

---

## Diretrizes de Geração de Imagens (AI)

Ao gerar assets visuais usando IA, as seguintes regras são MANDATÓRIAS:

1. **Fidelidade do Rótulo:** NUNCA alterar a posição, conteúdo ou proporção dos elementos nos rótulos dos produtos (conforme renders fornecidos em `Inbox/`). Texto, estruturas químicas e selos devem ser preservados exatamente como nos arquivos originais.
2. **Ambiente over Design:** O foco da geração de IA deve ser no cenário, iluminação, reflexos e fumaça/ambientação técnica. O design do produto em si é imutável.
3. **Estética de Referência:** Studio lighting premium, backgrounds em gradiente azul marinho (#20388a), texturas de alta performance (mármore, carbono, superfícies foscas).
4. **Identidade Visual:** Respeitar a tipografia Montserrat e xBall Italic nos elementos de overlay que a IA adicionar ao cenário, mas não ao produto.

*Nota: O usuário validou em 20/04/2026 que texturas e direções de luz estão excelentes, mas a precisão do rótulo é crítica.*
