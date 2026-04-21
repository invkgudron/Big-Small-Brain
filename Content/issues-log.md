---
name: "Issues Log — Medicinal Pharma Brain"
description: Auto-generated frontmatter retrofit
type: issue-log
status: active
date: 2026-04-20
tags: [issue-log, content]
related:
  - "[[Content/_index]]"
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
| 006 | 16/04/2026 | [[Brand/audience]] | Lista de **cidades incompleta** — faltam: Santana de Parnaíba, São Caetano do Sul, Barueri (presentes em [[Research/sales-data]]) | Sincronizado audience.md com lista completa de sales-data.md | ✅ Corrigido |
| 007 | 16/04/2026 | [[Brand/brand-core]] | **Stacks de marketing** (Kit Ganho Extremo, Kit Definição Absoluta, Kit Recuperação) não mapeados para SKUs do catálogo ([[Brand/product-catalog]]) | Tabela de equivalência criada em brand-core.md vinculando stacks aos SKUs correspondentes. | ✅ Corrigido |
| 008 | 16/04/2026 | [[Brand/audience]], [[CONTEXT]] | **Contradição estratégica**: "foco em novos membros" vs "base atual = atletas experientes" | Resolvido: atletas/afiliados = núcleo de conteúdo e prova social; novos membros = público de aquisição ativado pela comunidade. | ✅ Corrigido |
| 009 | 16/04/2026 | [[Brand/product-catalog]] | **2 kits sem SKU** no catálogo: Kit Whey Choc Avelã+Creatina+Lipo-X e Kit Whey Morango+Creatina+Lipo-X aparecem listados mas sem SKU atribuído | SKUs KT3P017-1 e KT3P017-2 atribuídos no catálogo. | ✅ Corrigido |
| 011 | 16/04/2026 | Múltiplos | **Arquivos vazios** que precisavam ser populados. | trends.md, calendar.md, reel-production.md e freepik-prompts.md populados. | ✅ Corrigido |
| 012 | 16/04/2026 | [[Brand/visual-language]] | **Discrepância de HEX**: Azul Principal no arquivo é `#20388a`; comando do usuário especificou `#29388a`. | Confirmado pelo usuário em 17/04/2026: **`#20388a` é o correto**. visual-language.md e elite-performance.md já usam o valor correto. | ✅ Corrigido |
| 013 | 20/04/2026 | `Inbox/_unclassified/` | **Entidade não canônica**: Imagens detectadas para `GARRAFAS_E_ACESSORIOS`, mas não há ID listado em `System/ids.md`. | ID canônico criado no dict e metadados base de histórico para acessórios configurados. | ✅ Corrigido |
| 014 | 20/04/2026 | `Inbox/_unclassified/2026-04-20-daily-intel.md` | **Falta de regra na Taxonomia**: O tipo de conteúdo `intel-report` não tinha uma pasta de arquivamento definitivo. | Relatórios assimilados nos perfis das entidades e arquivados em vez de ocuparem espaço próprio. | ✅ Corrigido |

---

## Pendências

| ID | Descoberto | Arquivo(s) | Problema | Ação necessária | Status |
|----|------------|------------|----------|-----------------|--------|
| 010 | 16/04/2026 | [[Brand/product-catalog]] | **Estoque sem threshold definido** — rastreamento de estoque removido do vault (dados imprecisos) | Descartado — retomar quando houver controle de estoque confiável | 🚫 Descartado |
| 015 | 20/04/2026 | [[Workflows/_index]] | **Falha na execução de entrega:** Proposta de carrossel de 4 slides resultou na geração de apenas 2 imagens. | Implementar checklist de validação de entrega para garantir que todos os itens propostos no "Design Rationale" sejam gerados. | ⏳ Pendente |


---

## Como usar este arquivo

- Sempre que um novo erro for encontrado, adicionar na tabela de **Pendências** com o próximo ID sequencial.
- Quando um item for resolvido, mover para a tabela de **Erros Corrigidos** e atualizar o status para ✅.
- Revisar este arquivo no início de cada sessão de trabalho.
