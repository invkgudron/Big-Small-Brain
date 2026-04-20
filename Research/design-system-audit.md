---
name: "Design System Audit — Medicinal Pharma"
description: Auto-generated frontmatter retrofit
type: audit
status: active
date: 2026-04-20
tags: [audit, research]
related:
  - "[[SYSTEMS_CHECKUP_REPORT]]"
---

# Design System Audit — Medicinal Pharma
**Data:** 17/04/2026 | Gerado por Claude / Cowork (skill: design:design-system)

> Relacionado a: [[Brand/visual-language]] · [[Brand/themes/elite-performance]] · [[Content/content-templates]] · [[Content/post-history]] · [[Brand/brand-core]]

---

## Resumo Executivo

| Métrica | Status |
|---------|--------|
| Tokens de cor | ✅ Bem definidos (6 cores), ✅ conflito de hex resolvido (17/04/2026) |
| Tipografia | ✅ Hierarquia clara, ⚠️ Sem escala numérica de tamanhos |
| Espaçamento | ❌ Não definido |
| Componentes digitais | ⚠️ 1 template aprovado (carrossel), múltiplos formatos ausentes |
| Padrões de conteúdo | ⚠️ Apenas "Por que [Produto]?" documentado |
| Documentação geral | ⚠️ Parcial — forte em identidade, fraca em especificação técnica |
| **Score geral** | **71 / 100** *(atualizado 17/04/2026 — Reels template criado, hex resolvido)* |

---

## 1. Tokens de Design

### 1.1 Cores

| Token | Hex | Arquivo de referência | Status |
|-------|-----|----------------------|--------|
| Azul Principal | `#20388a` | visual-language.md + elite-performance.md | ✅ Definido |
| Vermelho MP | `#d20a11` | visual-language.md + elite-performance.md | ✅ Definido |
| Azul Aço | `#90a9c2` | visual-language.md + elite-performance.md | ✅ Definido |
| Dourado MP | `#C9A84C` | elite-performance.md | ⚠️ Hex só no tema — visual-language.md diz apenas "Gold Gradient" |
| Branco | `#FFFFFF` | elite-performance.md | ⚠️ Não declarado em visual-language.md |
| Azul Profundo | `#0D1B4B` | elite-performance.md | ⚠️ Só no tema — ausente no arquivo base |

**✅ Conflito resolvido (ID 012) — 17/04/2026:**
- Azul Principal confirmado pelo usuário: **`#20388a`** é o correto.
- `#29388a` era um erro de digitação — descartado.

**Ação recomendada:** Consolidar os 6 tokens de cor em `visual-language.md` com hex explícito e nomes de token padronizados. ✅ Já iniciado — Dourado e Azul Profundo adicionados nesta sessão.

---

### 1.2 Tipografia

| Papel | Fonte | Estilo | Cor padrão | Status |
|-------|-------|--------|------------|--------|
| H1 / Título | Montserrat ExtraBold Italic (xBall Italic) | Bold Itálico | `#C9A84C` Dourado | ✅ |
| H2 / Subtítulo | Montserrat Bold (xBall) | Bold | `#FFFFFF` Branco | ✅ |
| Corpo de texto | Montserrat Regular | Regular | `#FFFFFF` / `#0D1B4B` | ✅ |
| CTA / URL | Montserrat Bold Italic | Bold Itálico | `#C9A84C` Dourado | ✅ |
| Label técnico | Montserrat Bold All-Caps | Bold | `#FFFFFF` | ✅ |

**Lacunas identificadas:**
- ❌ **Escala de tamanhos não definida** — nenhum arquivo especifica tamanhos em pt, px ou rem
- ❌ **Line-height e letter-spacing ausentes**
- ⚠️ **xBall não é disponível em todas as plataformas** — Montserrat é o substituto aprovado, mas a regra de fallback não está documentada em `visual-language.md` (apenas no `elite-performance.md`)

---

### 1.3 Espaçamento

| Status | Detalhe |
|--------|---------|
| ❌ Não definido | Nenhum arquivo define grid, margens, padding ou escala de espaçamento |
| ⚠️ Valores implícitos | Caixa de copy: "sem borda, cantos levemente arredondados" — sem valor numérico |
| ⚠️ Opacidades definidas | Textura de fundo: 10% · Overlay de caixa: 85% — documentados no tema |

---

### 1.4 Outros tokens ausentes

| Token | Status |
|-------|--------|
| Border radius | ❌ "Levemente arredondados" — sem px |
| Sombras / elevação | ❌ Não definido |
| Animação / motion | ❌ Não definido |
| Grid de layout | ❌ Não definido |
| Safe zone do logo | ❌ Não documentada |

---

## 2. Componentes Documentados

### 2.1 ✅ Carrossel Educativo — "Por que [Produto]?"
**Score: 9/10** — O componente mais maduro do sistema.

| Elemento | Status |
|----------|--------|
| Estrutura de slides (5 slides) | ✅ Documentado |
| Regras visuais por slide | ✅ Documentado |
| Hierarquia tipográfica | ✅ Documentado |
| Copy de referência aprovado | ✅ Documentado (Whey 3W) |
| Adaptações por produto (6 produtos) | ✅ Documentado |
| Variantes de layout | ⚠️ Apenas 1 variante (educativo) |
| Especificações de tamanho (px) | ❌ Ausente |

---

### 2.2 ⚠️ Componentes não documentados mas necessários

| Componente | Prioridade | Motivo |
|------------|-----------|--------|
| **Template de Reels** | ✅ Resolvido | Template completo criado em [[Content/content-templates]] — 5 tipos de hook, spec visual, banco de 30 hooks por produto (17/04/2026) |
| **Stories (produto/promo)** | 🔴 Alta | Formato de alta conversão, sem diretriz visual |
| **Post estático (feed)** | 🟡 Média | Formato simples mas sem template |
| **Highlight cover (ícones)** | 🟡 Média | Interface do perfil — visibilidade permanente |
| **Capa de campanha** | 🟡 Média | Diferente do carrossel educativo — sem diretriz |
| **Template de anúncio pago** | 🟡 Média | Se houver tráfego pago, precisa de spec |
| **Bio / perfil** | 🟢 Baixa | Texto fixo, mas formato não documentado |
| **Template de DM / resposta** | 🟢 Baixa | Voz da marca em atendimento |

---

## 3. Padrões de Conteúdo

| Padrão | Status |
|--------|--------|
| Educativo — atributos de produto | ✅ Documentado (carrossel "Por que?") |
| Email lead nurture (6 emails) | ✅ Documentado |
| Prova social / depoimento | ❌ Não documentado |
| Lançamento de produto | ❌ Não documentado |
| Promoção / urgência | ❌ Não documentado |
| Stack / combinação de produtos | ❌ Não documentado |
| Conteúdo de afiliado | ❌ Não documentado |
| Reels hook pattern | ❌ Não documentado |
| Sazonalidade (Ano Novo, Carnaval, etc.) | ❌ Não documentado |

---

## 4. Consistência entre Arquivos

| Arquivo | Completude | Notas |
|---------|-----------|-------|
| `Brand/visual-language.md` | ⚠️ 70% | Base sólida, mas faltam: hex do dourado, Azul Profundo, escala tipográfica |
| `Brand/themes/elite-performance.md` | ✅ 90% | O mais completo — todas as regras com hex, fontes e uso |
| `Content/content-templates.md` | ✅ 85% | Template aprovado bem documentado; faltam mais variantes |
| `Content/post-history.md` | ✅ 80% | Registro histórico bom; faltam campos de resultado/métricas |
| `Brand/brand-core.md` | ✅ 95% | Excelente — produto, ciência, origem, fabricante |
| `Brand/audience.md` | ✅ 90% | Dados robustos de comportamento e compra |

---

## 5. Pontos Fortes

1. **Paleta de cores com identidade forte** — azul + vermelho + dourado cria visual imediatamente reconhecível e consistente em todos os materiais aprovados
2. **Padrão de bandas diagonais** — elemento inegociável, aplicado em 100% do conteúdo aprovado — grande diferencial visual
3. **Tema Elite Performance** — documento de referência completo que consolida tokens, tipografia e regras em um único local
4. **Hierarquia tipográfica clara** — os 5 papéis (H1, H2, corpo, CTA, label) estão bem definidos com cor, peso e uso
5. **Template de carrossel aprovado e replicável** — adaptações por produto documentadas para todos os 6 SKUs
6. **Identidade emocional coerente** — Autoridade + Precisão + Premium + Performance alinhados com produto e público

---

## 6. Ações Prioritárias

### ✅ Críticos resolvidos (17/04/2026)

1. ~~**Resolver conflito do Azul Principal**~~ → ✅ `#20388a` confirmado pelo usuário. issues-log ID 012 fechado.
2. ~~**Adicionar hex do Dourado em `visual-language.md`**~~ → ✅ `#C9A84C` + Azul Profundo `#0D1B4B` adicionados.
3. ~~**Documentar template de Reels**~~ → ✅ Template completo em [[Content/content-templates]] — 3 atos, 5 tipos de hook, spec visual 9:16, banco de 30 hooks.

### 🟡 Importante (próximas 2 semanas)

4. **Criar template de Stories** — formato de alta conversão
5. **Definir escala tipográfica com tamanhos** — pelo menos para Instagram (1080px): H1, corpo, CTA em px
6. **Adicionar Azul Profundo (`#0D1B4B`) em `visual-language.md`** — token usado mas não declarado no arquivo base

### 🟢 Evolução futura

7. **Documentar padrões de prova social e lançamento**
8. **Criar regras de grid/feed** — estratégia de composição visual do perfil como um todo
9. **Definir highlight covers com especificação visual**
10. **Documentar tom de voz para DM e comentários**

---

## 7. Score por Categoria

| Categoria | Score |
|-----------|-------|
| Tokens de cor | 85/100 *(hex resolvido, Dourado e Azul Profundo adicionados)* |
| Tipografia | 65/100 |
| Espaçamento | 10/100 |
| Componentes documentados | 72/100 *(Reels template criado)* |
| Padrões de conteúdo | 60/100 *(Reels framework + 30 hooks documentados)* |
| Consistência entre arquivos | 80/100 |
| **Total geral** | **71/100** *(atualizado 17/04/2026)* |

---

## Próximo passo sugerido

Os 3 gaps críticos foram resolvidos nesta sessão. O próximo salto de score vem de:
1. **Template de Stories** — segundo formato de maior conversão, ainda sem diretriz
2. **Escala tipográfica em px** — tamanhos de fonte para Instagram (1080px base) não definidos
3. **Padrões de conteúdo faltantes** — prova social, lançamento de produto, stack/protocolo completo

---

*Gerado em 17/04/2026 — Claude / Cowork — skill: design:design-system*
*Baseado em: visual-language.md · elite-performance.md · content-templates.md · post-history.md · brand-core.md · audience.md · instagram-insights.md · decisions-log.md*
