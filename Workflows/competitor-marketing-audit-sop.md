---
name: Marketing-Led Competitor Intel SOP
description: Procedimento operacional padrão (SOP) para traduzir atividade de concorrência orgânica em valor imediato na criação de conteúdo da Medicinal Pharma.
type: sop
status: active
date: 2026-04-20
tags: [sop, workflow, marketing, intelligence]
related:
  - "[[System/content-types]]"
  - "[[Research/competitors/_index]]"
  - "[[Workflows/scripts/daily_intel_collector.py|Daily Intel Script]]"
---

# SOP — Marketing-Led Competitor Intel

**Objetivo:** Transformar a "pesquisa de concorrência" de um bloco estático de negócios em um banco contínuo de referências úteis e oportunidades de conteúdo para a equipe de Marketing da Medicinal Pharma.

**Quando rodar:**  
- **Diariamente (Aproximadamente 10 minutos)**, antes do briefing da criação de conteúdo ou do início da esteira orgânica.

---

## 1. O Fluxo Diário (Daily Hooks Harvesting)

Todos os dias, a estratégia é captar o que está ressoando no momento, acionando a atenção da nossa audiência no formato orgânico (Instagram, TikTok).

### Passo 1: Executar e Assimilar Notícias
1. Rode o script `Workflows/run-daily-intel.bat`.
2. O sistema gerará o novo arquivo `Daily Intel Tracker` mapeando novidades gerais (Lançamentos de produtos, Matérias Regulatórias da ANVISA, Novos Ingredientes).
3. Leia o arquivo em sua `Inbox/`.
4. *Assimile*: Copie a notícia relevante e solte diretamente no respectivo arquivo da concorrência (`Research/competitors/<marca>.md`) sob "**Atividade Recente**".
5. Se a notícia fala de novos preceitos ("ANVISA questiona X"), jogue em `Research/trends.md`.
6. Concluído o roteamento, puxe a pasta original para `_archive`.

### Passo 2: O Pente-fino Orgânico Rápido (5 minutos)
Diferente da Ad-Library (Tráfego Pago), nós pescamos diretamente nos painéis orgânicos.
- Entre nos perfis principais listados no MOC de competidores (ex: Growth, Max Titanium, DUX, Atomic Labs).
- Ignore publicações institucionais.
- Analise os 3 últimos Reels com alta visualização (Acima da média geral do perfil):
  - Qual é a **primeira frase dita (Hook)** ou texto visual nos 3 segundos iniciais?
  - Como o *Creator/Atleta* chamou a atenção? Que CTA (Call-to-Action) final fez chover comentários?

### Passo 3: Catalogar o "Tear-down"
Abra o perfil do competidor associado e atualize imediatamente a seção **Marketing & Content Tear-down** ou **Oportunidades Orgânicas para MP**:
- **Exemplo de anotação validada**: 
  > *Atomic Labs está captando muita atenção com Reels focados em "Experiência de Preparação (ASMR) do Pré-Treino" em vez de explicar o rótulo.*
  > **→ Ação para Medicinal Pharma:** Replicar esse hook ASMR estético usando o Dourado e o Azul aço premium do Anabolic Training no nosso próximo shoot!

---

## 2. Aplicação do Conhecimento (Action-Oriented)

A inteligência da Medicinal Pharma é voltada à ação. Sempre que preencher um `competitor-profile`, certifique-se de preencher a caixa de extração:

> **Oportunidade Orgânica Imediata:**  
> Ao invés de lutar pela mesma audiência massiva com o *Mesmo Discurso*, como nós quebramos a expectativa usando o pilar da Identidade/Origem? 

- **Growth/Max Titanium aborda:** "A Creatina com a maior rede de influenciadores e preço limpo".
- **Medicinal Pharma (Spin-off de conteúdo diário):** "Você já perguntou onde os milhares de influenciadores reais buscam comprovação de origem da creatina que eles consomem? A diferença está na micronização da matéria prima alemã".

*Ao não utilizarmos Ads no curto prazo, sua única e absoluta prioridade competitiva é entender por que o cliente do competidor assiste aos vídeos deles, qual objeção mental é respondida, e como produziremos Reels e Postagens que superem essa oferta orgânica em sofisticação.*
