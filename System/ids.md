---
name: Canonical IDs
description: Dicionário canônico de entidades do sistema (produtos, personas, canais, campanhas, temas, cupons)
type: system
status: active
date: 2026-04-18
tags: [system, ids, entities]
---

# Canonical IDs — Dicionário de Entidades

Toda entidade referenciada no vault tem **um** ID canônico. Sinônimos não criam novas entradas — são registrados aqui como aliases.

**Regra:** se uma menção não tem ID canônico, vira issue antes de virar conteúdo.

---

## 1. Produtos

| ID canônico | SKU | Nome comercial | Aliases aceitos | Arquivo |
|-------------|-----|----------------|-----------------|---------|
| `lipo-x-hd` | MPS0001 | Lipo-X HD Thermogenic | Lipo-X, LipoX, Lipo HD, termogênico MP | [[Brand/technical-sheets/lipo-x-hd]] |
| `anabolic-maca-verde` | MPS0002-MV | Anabolic Training Maçã Verde Ice | Pré-treino Maçã Verde, Anabolic MV | [[Brand/technical-sheets/anabolic-training-maca-verde]] |
| `anabolic-morango-ice` | MPS0002-MR | Anabolic Training Morango Ice | Pré-treino Morango, Anabolic MR | [[Brand/technical-sheets/anabolic-training-morango-ice]] |
| `multi-az` | MPS0003 | Multi AZ Extreme Multivitaminic | Multi AZ, Multivitamínico MP | [[Brand/technical-sheets/multi-az]] |
| `whey-choc-avela` | MPS0004-CH | Magnific Whey Gourmet 3W Chocolate com Avelã | Whey Chocolate Avelã, Magnific Chocolate | [[Brand/technical-sheets/magnific-whey-chocolate-avela]] |
| `whey-morango` | MPS0004-MR | Magnific Whey Gourmet 3W Morango com Chocolate Branco | Whey Morango, Magnific Morango, Morango ChocBranco | [[Brand/technical-sheets/magnific-whey-morango-chocolate-branco]] |
| `l-glutamine` | MPS0005 | L-Glutamine Premium | Glutamina, Glutamine | [[Brand/technical-sheets/l-glutamine]] |
| `power-creatine` | MPS0006 | Power Creatine Micronized | Creatina, Power Creatina, Creatina Micronizada | [[Brand/technical-sheets/power-creatine]] |

### 1.1 Acessórios

| ID canônico | SKU | Nome comercial | Aliases aceitos | Arquivo |
|-------------|-----|----------------|-----------------|---------|
| `acessorio-garrafa-mp` | — | Garrafa Medicinal Pharma | Garrafa, Shaker MP | `_archive/_inbox-processed/2026-04/01_PRODUTOS/GARRAFAS_E_ACESSORIOS` |

### Famílias de produto
- `whey-3w` → família (inclui whey-choc-avela + whey-morango)
- `creatine` → família (power-creatine)
- `glutamine` → família (l-glutamine)
- `anabolic` → família (anabolic-maca-verde + anabolic-morango-ice)
- `lipo` → família (lipo-x-hd)
- `multi` → família (multi-az)

### Kits (stacks)
| ID | Nome | Composição |
|----|------|------------|
| `kit-ganho-extremo` | Kit Ganho Extremo | whey-3w + creatine + anabolic |
| `kit-definicao-absoluta` | Kit Definição Absoluta | lipo + multi-az |
| `kit-recuperacao` | Kit Recuperação | whey-3w + l-glutamine |

---

## 2. Personas

| ID | Nome | Descrição |
|----|------|-----------|
| `nucleo` | Núcleo (conteúdo) | Atletas experientes, personal trainers, afiliados. Validam o produto e geram prova social. |
| `aquisicao` | Público de aquisição | Novos praticantes 20–35 anos, ativados por indicação e cupons. |

---

## 3. Canais

| ID | Canal | Handle/URL |
|----|-------|------------|
| `instagram` | Instagram | @medicinalpharma |
| `site` | Site oficial | mpoficial.com |
| `email` | E-mail marketing | — |
| `whatsapp` | WhatsApp | (11) 94797-7167 |
| `sac` | SAC telefônico | (11) 2768-2273 |
| `sac-email` | SAC e-mail | sac@medicinalpharma.com |

---

## 4. Campanhas

| ID | Nome | Status | Arquivo |
|----|------|--------|---------|
| `campaign-01-origem-performance` | Origem da Performance | active | [[Content/campaign-01-origem-performance]] |

> Novas campanhas: criar ID com padrão `campaign-<NN>-<slug>`.

---

## 5. Temas visuais

| ID | Nome | Arquivo |
|----|------|---------|
| `elite-performance` | Elite Performance | [[Brand/themes/elite-performance]] |

---

## 6. Cupons (afiliados e promocionais)

| ID / Código | Tipo | Notas |
|-------------|------|-------|
| `PRIMEIRA10` | Boas-vindas | 10% OFF primeira compra (permanente) |
| `OITAVA` | Afiliado | Maior volume histórico (4 pedidos, R$1.198) |
| `RAFA15` | Afiliado | 15% desconto fixo |
| `BREJACOB` | Afiliado | 3 pedidos |
| `ADRIANO_SIMPSONPERSONAL` | Personal trainer | — |
| `PAULOLIMAMR` | Afiliado | — |
| `VITOR08` | Afiliado | — |
| `BH10` | Regional | Cupom Belo Horizonte |
| `GERSON15` | Afiliado | — |
| `DENISJIUJITSU` | Atleta jiu-jitsu | — |
| `GENIUM` | — | — |
| `LIPE` | — | — |

Ver rede completa em [[Brand/audience]].

---

## 7. Fornecedores / matérias-primas

| ID | Entidade | Origem | Produto associado |
|----|----------|--------|-------------------|
| `glanbia` | [[Brand/suppliers/glanbia|Glanbia plc]] | Irlanda (Origem Proteína: EUA) | whey-3w |
| `creapure` | [[Brand/suppliers/creapure|Creapure (AlzChem)]] | Alemanha | creatine |
| `glutamine-jp` | Fornecedor de glutamina (Japão) | Japão | glutamine |
| `bioghen` | Bioghen Suplementos Nutricionais Ltda | Brasil (SP) | fabricante de todos os produtos |

CNPJ Bioghen: 19.416.061/0001-62
CNPJ Distribuidor: 39.893.591/0001-09

---

## 8. Concorrentes / benchmarks

Ver hub em [[Research/competitor-intel]] · matriz em [[Research/competitor-matrix]] · MOC em [[Research/competitors/_index]].

### Nacionais (competição direta)

| ID canônico | Marca | Holding | Arquivo |
|-------------|-------|---------|---------|
| `integralmedica` | Integralmedica | Grupo BRG | [[Research/competitors/integralmedica]] |
| `growth-supplements` | Growth Supplements | Merama | [[Research/competitors/growth-supplements]] |
| `dux-human-health` | DUX Human Health | DUX Company SA | [[Research/competitors/dux-human-health]] |
| `max-titanium` | Max Titanium | Supley | [[Research/competitors/max-titanium]] |
| `atlhetica-nutrition` | Atlhetica Nutrition | — | [[Research/competitors/atlhetica-nutrition]] |
| `atomic-labs` | Atomic Labs | — | [[Research/competitors/atomic-labs]] |

### Internacionais (benchmarks + ameaças por importação)

| ID canônico | Marca | Holding | Arquivo |
|-------------|-------|---------|---------|
| `optimum-nutrition` | Optimum Nutrition | Glanbia plc (Irlanda) | [[Research/competitors/optimum-nutrition]] |
| `transparent-labs` | Transparent Labs | — (Utah, EUA) | [[Research/competitors/transparent-labs]] |
| `myprotein` | Myprotein | THG plc (UK) | [[Research/competitors/myprotein]] |
| `muscletech` | MuscleTech | Iovate Health Sciences (Canadá) | [[Research/competitors/muscletech]] |
| `scitec-nutrition` | Scitec Nutrition | — (Budapeste, Hungria) | [[Research/competitors/scitec-nutrition]] |

> Nota: `optimum-nutrition` compartilha holding (Glanbia) com fornecedor `glanbia` da seção 7 — MP e ON têm origem de matéria-prima comum para whey.

---

## 9. Ingredientes ativos canônicos

Ver ciência completa em [[Brand/ingredient-reference]].

Core (alta frequência em posts):
- `beta-alanina` — anabolic
- `l-arginina` — anabolic
- `taurina` — anabolic
- `cafeina` — anabolic, lipo
- `carnitina` — lipo
- `cromo` — lipo
- `vitamina-b12` — lipo, multi-az
- `creatina-monohidratada` — creatine
- `whey-concentrada` — whey-3w
- `whey-isolada` — whey-3w
- `whey-hidrolisada` — whey-3w
- `l-glutamina` — glutamine

---

## 10. Como usar este dicionário

### No frontmatter
```yaml
product_refs: [whey-choc-avela, creatine]
persona: nucleo
channels: [instagram]
```

### No corpo do texto
Sempre wiki-link para o arquivo canônico: `[[Brand/technical-sheets/power-creatine|Creatina]]`

### Em tags
`#product/creatine` | `#persona/nucleo` | `#channel/instagram`

---

## 11. Adicionando entidade nova

1. Abrir issue em `issues-log.md`
2. Propor ID seguindo o padrão do grupo
3. Registrar em `decisions-log.md`
4. Adicionar entrada aqui
5. Se aplicável, atualizar `vault-map.md` nos atalhos

---

*IDs não mudam. Se uma entidade for renomeada, o ID antigo fica como alias permanente.*
