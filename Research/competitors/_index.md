---
name: Competitors MOC
description: Índice dos perfis individuais de concorrentes — 6 nacionais + 5 benchmarks internacionais
type: moc
status: active
date: 2026-04-18
updated: 2026-04-18
tags: [moc, research, competitive-analysis]
weight: 3
related:
  - "[[Research/competitor-intel]]"
  - "[[Research/competitor-matrix]]"
  - "[[Research/_index]]"
  - "[[System/ids#8-concorrentes-benchmarks|IDs canônicos — seção 8]]"
---

# Competitors — MOC

> Índice dos perfis individuais de concorrentes.
> Para resumo executivo e fontes, ver [[Research/competitor-intel]].
> Para matriz comparativa e análise estratégica, ver [[Research/competitor-matrix]].

---

## Como navegar

- Cada arquivo aqui é **um perfil individual** — estrutura padronizada segundo `competitor-profile` em [[System/content-types]]
- IDs canônicos em [[System/ids#8-concorrentes-benchmarks|ids.md seção 8]]
- Análise cruzada (matriz + lacunas + oportunidades + ameaças) vive em [[Research/competitor-matrix]]
- Hub de entrada rápida: [[Research/competitor-intel]]

---

## Concorrentes Nacionais (competição direta)

| Marca | Holding | Escala | Posicionamento |
|-------|---------|--------|----------------|
| [[Research/competitors/integralmedica\|Integralmedica]] | Grupo BRG | R$ 1,25B | Herança BR 40+ anos, líder em creatina |
| [[Research/competitors/growth-supplements\|Growth Supplements]] | Merama | R$ 2B | Maior player — volume + preço + pivô omnichannel |
| [[Research/competitors/dux-human-health\|DUX Human Health]] | DUX Company SA | R$ 1B (proj.) | B Corp + ciência + rebranding para saúde ampla |
| [[Research/competitors/max-titanium\|Max Titanium]] | Supley | N/D | 18k micro-influenciadores + M&A ativo |
| [[Research/competitors/atlhetica-nutrition\|Atlhetica Nutrition]] | — | N/D | 15k farmácias + sabor gourmet (Best Whey) |
| [[Research/competitors/atomic-labs\|Atomic Labs]] | — | N/D | Lifestyle/cultura + design-forward |

## Benchmarks Internacionais

| Marca | Holding | Escala | Relevância para MP |
|-------|---------|--------|-------------------|
| [[Research/competitors/optimum-nutrition\|Optimum Nutrition]] | Glanbia plc (Irlanda) | US$ 3,9B | **Mesmo fornecedor de whey que MP (Glanbia)** |
| [[Research/competitors/transparent-labs\|Transparent Labs]] | — (Utah, EUA) | N/D | Modelo narrativo mais próximo de MP target |
| [[Research/competitors/myprotein\|Myprotein]] | THG plc (UK) | US$ 775M | Ameaça via Amazon BR se câmbio favorecer |
| [[Research/competitors/muscletech\|MuscleTech]] | Iovate Health (Canadá) | ~US$ 200M est. | Herança científica 30 anos |
| [[Research/competitors/scitec-nutrition\|Scitec Nutrition]] | — (Budapeste, HU) | N/D | 700+ SKUs, 135 sabores, 90 países |

---

## Como adicionar novo perfil

1. Criar `Research/competitors/<brand-slug>.md` com frontmatter `type: competitor-profile`
2. Seguir estrutura de [[System/content-types#competitor-profile]]
3. Registrar `competitor_id` em [[System/ids#8-concorrentes-benchmarks|ids.md seção 8]]
4. Adicionar linha neste MOC (tabela apropriada por tier)
5. Atualizar [[Research/competitor-matrix]] com a nova marca
6. Registrar em [[Content/decisions-log]]
