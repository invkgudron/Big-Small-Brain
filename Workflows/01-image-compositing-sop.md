---
name: SOP - Compositing de Imagens 3D
description: Procedimento operacional padrão para criação de assets mantendo 100% da fidelidade do rótulo
type: sop
status: active
date: 2026-04-20
tags: [workflows, sop, ai-generation, compositing]
---

# SOP — Compositing de Imagens 3D

Este procedimento garante a manutenção de 100% da precisão técnica em peças visuais geradas por Inteligência Artificial, sobrepondo os renders 3D perfeitamente cortados (com fundo transparente) sobre os fundos (backgrounds) criados via IA, evitando qualquer alteração no texto ou textura do produto original.

## Ferramentas Pré-Requisitos
- Python 3.10+
- Biblioteca Pillow (`pip install pillow`)

## Workflow de Produção

### 1. Geração de Backgrounds Vazios (via Agente AI)
Ao invés de pedir para a IA gerar a imagem final com o produto, peça para ela gerar **Backgrounds Vazios** ("Empty Studio Backgrounds"). O prompt deve referenciar que o ambiente deve estar limpo e preparado para a inserção de um produto (ex. "Empty minimalist studio background", "no objects, empty stage"). 
- O arquivo deve ficar na área de trabalho da IA (cérebro) ou descarregado numa pasta.

### 2. Posicionamento do Render Transparente 
Garanta que os renders transparentes (em extensão `.png` com canal RGBA) do produto existam na pasta `Inbox/NOME_DO_PRODUTO`.

### 3. Configuração do Schema JSON
Abra o arquivo `Workflows\compositing_config.json`. Este arquivo atua como o "cérebro" das composições, permitindo registrar layouts ilimitados.
Registre os caminhos do `render` e os padrões do `background` desejados. 
Ajuste parâmetros visuais: `scale_factor` (0.0 até 1.0), e os eixos de `y_offset` para posicionamento dinâmico no produto na cena.

### 4. Execução do Engine
O script `Workflows\01_python_asset_compositing.py` é agora apenas o "motor" que lê esse JSON e trabalha sozinho. 
Rodar a composição inteira se tornou mais versátil.
```bash
python "Workflows\01_python_asset_compositing.py"
```

Os resultados sairão automaticamente na pasta `assets` prontos para associação nos `.md` de posts.

> **Regra de Ouro:**
> O Render 3D do Blender é a "Single Source of Truth" do design industrial da Medicina Pharma. Nenhuma inteligência generativa deverá alterá-lo no nível de pixel na embalagem.
