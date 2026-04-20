---
name: "Issues Log — Medicinal Pharma Brain"
description: Auto-generated frontmatter retrofit
type: issue-log
status: active
date: 2026-04-20
tags: [issue-log, content]
---

# Issues Log — Medicinal Pharma Brain

Registro de erros, inconsistências e pendências encontradas no vault.
Atualizar o status à medida que os itens forem resolvidos.

**Status possíveis:** `Pendente` | `Corrigido` | `Descartado`

---

## Erros Corrigidos

| ID | Descoberto | Arquivo(s) | Erro | Correção aplicada | Status |
|----|-----------|------------|------|-------------------|--------|
| 001 | 16/04/2026 | [[Brand/brand-core]], [[Brand/product-catalog]] | Dosagem da **Creatina** incorreta: vault dizia "10g/dia em 2×5g". Rótulo oficial: **3g (1 dosador) × 1/dia** × 100 porções | Corrigido em ambos os arquivos | ✅ Corrigido |
| 002 | 16/04/2026 | [[Brand/brand-core]], [[Brand/product-catalog]] | Dosagem da **Glutamina** incorreta: vault dizia "10g ao dia, sendo duas doses de 5g". Rótulo oficial: **5g (1 dosador) × 1/dia** × 60 porções | Corrigido em ambos os arquivos | ✅ Corrigido |
| 003 | 16/04/2026 | [[Brand/brand-core]] | **Fabricante** dos produtos não constava no vault. Todos os 8 produtos são fabricados por **Bioghen Suplementos Nutricionais Ltda** (CNPJ: 19.416.061/0001-62) | Adicionado em brand-core | ✅ Corrigido |
| 004 | 16/04/2026 | [[Brand/brand-core]], [[Brand/product-catalog]] | **Perfil completo de aminoácidos** do Whey ausente (18 aminoácidos com valores em mg) | Adicionado nas fichas técnicas e brand-core | ✅ Corrigido |
| 005 | 16/04/2026 | [[Brand/brand-core]], [[Brand/product-catalog]] | **Valores nutricionais exatos** do Whey ausentes (kcal, carbs, gordura, sódio por porção) | Adicionado nas fichas técnicas | ✅ Corrigido |

---

## Pendências

| ID  | Descoberto | Arquivo(s)                      | Problema                                                                                                                                                    | Ação necessária                                                                                                                                                                                       | Status         |
| --- | ---------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 006 | 16/04/2026 | [[Brand/audience]]              | Lista de **cidades incompleta** — faltam: Santana de Parnaíba, São Caetano do Sul, Barueri (presentes em [[Research/sales-data]])                           | Sincronizar audience.md com lista completa de sales-data.md                                                                                                                                           | ⏳ Pendente     |
| 007 | 16/04/2026 | [[Brand/brand-core]]            | **Stacks de marketing** (Kit Ganho Extremo, Kit Definição Absoluta, Kit Recuperação) não mapeados para SKUs do catálogo ([[Brand/product-catalog]])         | Criar tabela de equivalência: nome do stack → SKU(s) correspondente(s)                                                                                                                                | ⏳ Pendente     |
| 008 | 16/04/2026 | [[Brand/audience]], [[CONTEXT]] | **Contradição estratégica**: "foco em novos membros" vs "base atual = atletas experientes"                                                                  | Resolvido: atletas/afiliados = núcleo de conteúdo e prova social; novos membros = público de aquisição ativado pela comunidade. Arquivos atualizados.                                                 | ✅ Corrigido    |
| 009 | 16/04/2026 | [[Brand/product-catalog]]       | **2 kits sem SKU** no catálogo: Kit Whey Choc Avelã+Creatina+Lipo-X e Kit Whey Morango+Creatina+Lipo-X aparecem listados mas sem SKU atribuído              | Corrigir no painel da Nuvem Shop e atualizar product-catalog.md                                                                                                                                       | ⏳ Pendente     |
| 010 | 16/04/2026 | [[Brand/product-catalog]]       | **Estoque sem threshold definido** — rastreamento de estoque removido do vault (dados imprecisos)                                                           | Descartado — retomar quando houver controle de estoque confiável                                                                                                                                      | 🚫 Descartado  |
| 011 | 16/04/2026 | Múltiplos                       | **7 arquivos vazios deletados** — serão recriados à medida que conteúdo for produzido                                                                       | [[Content/post-history]], [[Content/content-templates]] e [[Research/competitor-intel]] (split 18/04/2026 — 11 perfis + matriz) recriados com conteúdo real. Restam: trends.md, calendar.md, reel-production.md, freepik-prompts.md | ⏳ Em andamento |
| 012 | 16/04/2026 | [[Brand/visual-language]]       | **Discrepância de HEX**: Azul Principal no arquivo é `#20388a`; comando do usuário especificou `#29388a`. Arquivo mantido como autoritativo até confirmação | Confirmado pelo usuário em 17/04/2026: **`#20388a` é o correto**. `visual-language.md` e `elite-performance.md` já usam o valor correto — nenhuma alteração necessária.                               | ✅ Corrigido    |

---

## Como usar este arquivo

- Sempre que um novo erro for encontrado, adicionar na tabela de **Pendências** com o próximo ID sequencial.
- Quando um item for resolvido, mover para a tabela de **Erros Corrigidos** e atualizar o status para ✅.
- Revisar este arquivo no início de cada sessão de trabalho.
