---
name: System
description: Camada meta do vault — schemas, taxonomias, pipelines de ingestão, IDs canônicos
type: system
status: active
date: 2026-04-18
---

# System — Camada Meta do Vault

Esta pasta define **como** o vault funciona, não **o que** está nele.

Se o resto do vault é o "cérebro", esta pasta é o "sistema imunológico + nervoso central" — valida entradas, roteia conteúdo, mantém consistência.

---

## Hierarquia de arquivos

| Arquivo | Responsabilidade | Lido por |
|---------|------------------|----------|
| [[System/vault-map\|vault-map.md]] | MOC-raiz. Mapa completo do vault. | Humano + Claude (navegação) |
| **[[System/context-engine\|context-engine.md]]** | 🧠 **Jarvis Protocol — montagem dinâmica de contexto por pedido** | **Claude (todo pedido — substitui memória ativa)** |
| **[[System/intent-classifier\|intent-classifier.md]]** | 🎯 **Tabela task_type + entidade → arquivos** | **Claude (PASSO 1 do context-engine)** |
| **[[System/interaction-log\|interaction-log.md]]** | 📊 **Acumulador de aprendizado — log por sessão** | **Claude (PASSO 6 de todo pedido)** |
| [[System/taxonomy\|taxonomy.md]] | Regras de classificação: que pasta recebe qual tipo | Claude (pipeline de ingestão) |
| [[System/content-types\|content-types.md]] | Schema estrutural de cada content type | Claude (validação + geração) |
| [[System/frontmatter-schema\|frontmatter-schema.md]] | YAML obrigatório e opcional por tipo | Claude (todo arquivo novo) |
| [[System/file-naming\|file-naming.md]] | Convenções de nome de arquivo | Claude (toda criação) |
| [[System/ingestion-pipeline\|ingestion-pipeline.md]] | 🔑 Árvore de decisão para uploads sem descrição | Claude (quando upload em Inbox/) |
| [[System/ids\|ids.md]] | Dicionário canônico de entidades | Claude (extração + matching) |
| [[System/archive-policy\|archive-policy.md]] | Regras de retenção e rotação | Claude (revisão periódica) |
| [[System/relationships\|relationships.md]] | Padrões de backlink e cross-reference | Claude (todo arquivo novo) |

---

## Regras de ouro

1. **Toda mudança nesta pasta é uma mudança de arquitetura.** Registre em `[[Content/decisions-log]]`.
2. **Schemas aqui são lei.** Se um arquivo quebra o schema, é erro — corrija ou ajuste o schema explicitamente.
3. **Não duplique regras entre `CLAUDE.md` e esta pasta.** `CLAUDE.md` = comportamento de Claude. `System/` = estrutura do vault.
4. **Quando em dúvida, consulte `vault-map.md`.** Ele é fonte de verdade para navegação.

---

## Ciclo de manutenção

| Cadência | Ação | Arquivo(s) |
|----------|------|-----------|
| Toda sessão | Verificar se entrada em Inbox/ precisa de ingestão | `ingestion-pipeline.md` |
| Semanal | Revisar `[[Content/issues-log]]` por IDs não-canônicos | `ids.md` |
| Mensal | Revisar arquivos com `status: draft` há > 30 dias | `content-types.md` |
| Trimestral | Executar `archive-policy.md` | `archive-policy.md` |

---

*Entrada recomendada pela primeira vez: [[System/vault-map]]*
