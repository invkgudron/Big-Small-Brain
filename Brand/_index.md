---
name: Brand Index
description: MOC do domínio Brand — identidade, produtos, audiência, ingredientes
type: moc
status: active
date: 2026-04-18
tags: [moc, navigation, brand]
---

# Brand — Index

MOC do domínio `Brand/`. Linka arquivos de identidade, produtos, audiência e ciência de ingredientes.

---

## Identidade

| Arquivo | O que contém |
|---------|--------------|
| [[Brand/brand-core]] | DNA, pilares da qualidade, ecossistema, stacks, origem de matéria-prima, fabricação |
| [[Brand/visual-language]] | Paleta, tipografia, logo, identidade Instagram, graph view |
| [[Brand/audience]] | Persona núcleo, persona aquisição, rede de afiliados, comportamento de compra |

## Temas visuais derivados

| Arquivo | Uso |
|---------|-----|
| [[Brand/themes/elite-performance]] | Tema oficial para decks, carrosséis, e-mails, PDFs |

## Catálogo e referências

| Arquivo | O que contém |
|---------|--------------|
| [[Brand/product-catalog]] | Catálogo completo SKU + preço + kits |
| [[Brand/ingredient-reference]] | Referência científica dos ingredientes ativos |

## Fichas técnicas (`Brand/technical-sheets/`)

Uma ficha por SKU/sabor — fonte: rótulo oficial.

| Produto | ID | Arquivo |
|---------|-----|---------|
| Lipo-X HD Thermogenic | MPS0001 | [[Brand/technical-sheets/lipo-x-hd]] |
| Anabolic Training Maçã Verde | MPS0002-MV | [[Brand/technical-sheets/anabolic-training-maca-verde]] |
| Anabolic Training Morango Ice | MPS0002-MR | [[Brand/technical-sheets/anabolic-training-morango-ice]] |
| Multi AZ Multivitamínico | MPS0003 | [[Brand/technical-sheets/multi-az]] |
| Magnific Whey Chocolate Avelã | MPS0004-CH | [[Brand/technical-sheets/magnific-whey-chocolate-avela]] |
| Magnific Whey Morango | MPS0004-MR | [[Brand/technical-sheets/magnific-whey-morango-chocolate-branco]] |
| L-Glutamine Premium | MPS0005 | [[Brand/technical-sheets/l-glutamine]] |
| Power Creatine Micronized | MPS0006 | [[Brand/technical-sheets/power-creatine]] |

---

## Entidades canônicas do domínio

Ver dicionário completo em [[System/ids]]:
- Produtos (seção 1)
- Personas (seção 2)
- Temas (seção 5)
- Fornecedores (seção 7)
- Ingredientes (seção 9)

---

## Arquivos arquivados

Por enquanto nenhum. Produtos descontinuados vão para `_archive/discontinued/` — ver [[System/archive-policy]].

---

## Invariantes

1. Toda ficha técnica tem `source: Rótulo oficial — LABEL_*.pdf` no frontmatter
2. Toda ficha linka `[[brand-core]]` na seção Fabricação
3. Toda mudança em brand-core / visual-language / audience registrada em [[Content/decisions-log]]
4. Novos SKUs são adicionados **aqui + `product-catalog` + `ids.md` + `vault-map`**

---

*Este MOC cresce quando produto novo aparece, quando persona é detalhada, ou quando ciência de ingrediente é expandida.*
