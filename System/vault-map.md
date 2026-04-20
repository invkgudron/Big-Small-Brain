---
name: Vault Map
description: MOC raiz — mapa completo do vault organizado por domínio e propósito
type: moc
status: active
date: 2026-04-18
tags: [moc, navigation, system]
---

# Vault Map — Medicinal Pharma Brain

Mapa-raiz do vault. Cada domínio tem seu próprio `_index.md` (MOC local) — este arquivo linka os MOCs, não os conteúdos individuais.

---

## 🧭 Orientação

- **Novo aqui?** Comece por [[CONTEXT]] para contexto de negócio.
- **Buscando regra de arquitetura?** [[System/README|System/]]
- **Dropando conteúdo novo?** [[Inbox/README|Inbox/]]
- **Procurando histórico?** [[_archive/README|_archive/]]

---

## 🗂 Domínios

### 1. Brand — identidade, produtos, audiência
MOC: [[Brand/_index]]

Contém:
- DNA da marca, tom de voz, posicionamento
- Catálogo completo de produtos + fichas técnicas
- Linguagem visual, tema "Elite Performance"
- Perfil de audiência, rede de afiliados
- Referência científica de ingredientes

### 2. Content — produção, campanhas, templates
MOC: [[Content/_index]]

Contém:
- Calendário editorial ativo
- Campanhas em andamento
- Templates de carrossel, reel, e-mail
- Histórico de publicações (post-history)
- Logs operacionais: decisões, issues

### 3. Research — dados, métricas, inteligência
MOC: [[Research/_index]]

Contém:
- Métricas de Instagram e vendas
- Inteligência competitiva
- Tendências de mercado
- Surveys e feedback
- Auditorias (design system, etc.)

### 4. Workflows — automações, processos operacionais
MOC: [[Workflows/_index]]

Contém:
- Scripts (Google Apps, etc.)
- SOPs operacionais
- Prompts aprovados (Freepik, etc.)
- Processos de produção

---

## ⚙️ Camadas de sistema

### System/ — meta-regras + inteligência ativa
MOC: [[System/README]]

| Arquivo | O que define |
|---------|--------------|
| **[[System/context-engine]]** | **🧠 Jarvis Protocol — montagem dinâmica de contexto** |
| **[[System/intent-classifier]]** | **🎯 task_type + entidade → arquivos core** |
| **[[System/interaction-log]]** | **📊 Acumulador de aprendizado** |
| [[System/taxonomy]] | Qual pasta recebe qual tipo |
| [[System/content-types]] | Schema de cada tipo |
| [[System/frontmatter-schema]] | YAML obrigatório (inclui weight, activation_contexts, connects_to) |
| [[System/file-naming]] | Nome de arquivo |
| [[System/ingestion-pipeline]] | Como classificar upload sem descrição |
| [[System/ids]] | IDs canônicos de entidades |
| [[System/archive-policy]] | Retenção/rotação |
| [[System/relationships]] | Padrões de link |

Design completo: [[JARVIS_ARCHITECTURE]]

### Inbox/ — dropzone
→ [[Inbox/README]]

### _archive/ — histórico
→ [[_archive/README]]

---

## 🧩 Arquivos-raiz (fora de domínio)

| Arquivo | Propósito |
|---------|-----------|
| [[CONTEXT]] | Dashboard de contexto de negócio — auto-lido no início da sessão |
| [[CLAUDE]] | Regras de comportamento de Claude — carregado automaticamente |
| [[SYSTEMS_CHECKUP_REPORT]] | Relatório de diagnóstico da arquitetura (18/04/2026) |

---

## 🔗 Entidades canônicas (atalhos)

Ver dicionário completo em [[System/ids]].

### Produtos (SKU)
- Lipo-X HD — `MPS0001` → [[Brand/technical-sheets/lipo-x-hd]]
- Anabolic Training Maçã Verde — `MPS0002-MV` → [[Brand/technical-sheets/anabolic-training-maca-verde]]
- Anabolic Training Morango Ice — `MPS0002-MR` → [[Brand/technical-sheets/anabolic-training-morango-ice]]
- Multi AZ — `MPS0003` → [[Brand/technical-sheets/multi-az]]
- Magnific Whey Choc Avelã — `MPS0004-CH` → [[Brand/technical-sheets/magnific-whey-chocolate-avela]]
- Magnific Whey Morango — `MPS0004-MR` → [[Brand/technical-sheets/magnific-whey-morango-chocolate-branco]]
- L-Glutamine — `MPS0005` → [[Brand/technical-sheets/l-glutamine]]
- Power Creatine — `MPS0006` → [[Brand/technical-sheets/power-creatine]]

### Personas
- Núcleo: atletas, personal trainers, afiliados
- Aquisição: praticantes 20–35 anos
Ver [[Brand/audience]]

### Canais
- Instagram @medicinalpharma
- Site mpoficial.com
- E-mail marketing
- WhatsApp (11) 94797-7167

---

## 🧪 Regras vivas

1. Todo arquivo novo deve aparecer neste mapa via seu `_index.md` de domínio.
2. Se um arquivo não cabe em nenhum MOC existente, ele provavelmente precisa de nova categoria — registre em `[[Content/decisions-log]]`.
3. `vault-map.md` fica abaixo de 200 linhas. Se crescer, divida por camada.

---

*Última reindexação estrutural: 18/04/2026*
