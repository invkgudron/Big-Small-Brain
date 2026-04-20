/**
 * MEDICINAL PHARMA — Gerador de Formulário Google Forms
 *
 * COMO USAR:
 * 1. Acesse script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o código padrão e cole TODO este script
 * 4. Clique em "Salvar" (ícone de disquete)
 * 5. Clique em "Executar" (botão ▶)
 * 6. Autorize as permissões quando solicitado
 * 7. Após execução, acesse drive.google.com — o formulário estará lá
 */

function criarFormularioMedicinalPharma() {

  // ─── CRIAÇÃO DO FORMULÁRIO ───────────────────────────────────────────────
  var form = FormApp.create('Medicinal Pharma — Visão Estratégica de Marca');

  form.setDescription(
    'Este questionário faz parte do processo de alinhamento estratégico da comunicação visual e digital da Medicinal Pharma. ' +
    'Suas respostas ajudarão a calibrar o posicionamento, as expectativas e a identidade da marca para os próximos ciclos de crescimento.\n\n' +
    'Tempo estimado: 8–12 minutos.'
  );

  form.setCollectEmail(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Obrigado pela sua visão estratégica. Cada resposta vai diretamente para a construção da nova fase da Medicinal Pharma.'
  );

  // ─── SEÇÃO 1 — PERFIL DO RESPONDENTE ────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Seção 1 — Perfil do Respondente')
    .setHelpText('Para contextualizarmos melhor sua perspectiva.');

  // P1
  form.addMultipleChoiceItem()
    .setTitle('P1. Qual é o seu papel dentro da Medicinal Pharma?')
    .setChoiceValues([
      'Sócio / Co-fundador',
      'Investidor',
      'Gestor operacional',
      'Consultor externo'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // P2
  form.addMultipleChoiceItem()
    .setTitle('P2. Há quanto tempo você acompanha a marca Medicinal Pharma?')
    .setChoiceValues([
      'Menos de 6 meses',
      '6 meses a 1 ano',
      '1 a 3 anos',
      'Mais de 3 anos'
    ])
    .setRequired(true);

  // P3
  form.addScaleItem()
    .setTitle('P3. Com que frequência você acompanha os canais de comunicação da marca (Instagram, site, WhatsApp)?')
    .setBounds(1, 5)
    .setLabels('Raramente', 'Diariamente')
    .setRequired(true);

  // ─── SEÇÃO 2 — SATISFAÇÃO COM HISTÓRICO VISUAL ──────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Seção 2 — Satisfação com o Histórico Visual e de Conteúdo')
    .setHelpText('Avalie o que foi feito antes. Sem filtro — precisamos de honestidade.');

  // P4
  form.addScaleItem()
    .setTitle('P4. Como você avalia a identidade visual da Medicinal Pharma até hoje (embalagens, posts, peças)?')
    .setBounds(1, 5)
    .setLabels('Muito fraca, sem identidade clara', 'Forte e reconhecível')
    .setRequired(true);

  // P5
  form.addScaleItem()
    .setTitle('P5. O visual da marca comunica "premium" de forma convincente?')
    .setBounds(1, 5)
    .setLabels('Não transmite premium', 'Transmite com muita clareza')
    .setRequired(true);

  // P6
  form.addScaleItem()
    .setTitle('P6. Como você avalia a CONSISTÊNCIA visual dos posts publicados anteriormente? (uso de cores, fontes, layout)')
    .setBounds(1, 5)
    .setLabels('Inconsistente — cada post parece de uma marca diferente', 'Totalmente consistente')
    .setRequired(true);

  // P7
  form.addMultipleChoiceItem()
    .setTitle('P7. O conteúdo publicado anteriormente comunicava os diferenciais técnicos dos produtos (matéria-prima importada, dosagens, origem)?')
    .setChoiceValues([
      'Sim, de forma clara e frequente',
      'Às vezes, mas sem consistência',
      'Raramente',
      'Não comunicava',
      'Não acompanhei os posts anteriores'
    ])
    .setRequired(true);

  // P8
  form.addCheckboxItem()
    .setTitle('P8. Quais palavras você usaria para descrever o visual da marca como estava? Escolha até 3.')
    .setChoiceValues([
      'Profissional',
      'Amador',
      'Agressivo / Esportivo',
      'Genérico',
      'Premium / Sofisticado',
      'Confuso',
      'Consistente',
      'Desatualizado'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // P9
  form.addParagraphTextItem()
    .setTitle('P9. O que mais incomodava você no conteúdo ou visual anterior da marca?')
    .setHelpText('Seja específico. Ex: as cores mudavam muito, as fotos eram de baixa qualidade, faltava texto técnico...')
    .setRequired(false);

  // ─── SEÇÃO 3 — POSICIONAMENTO ATUAL ─────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Seção 3 — Posicionamento Atual da Marca')
    .setHelpText('Como a Medicinal Pharma é percebida hoje — por quem mais importa.');

  // P10
  form.addMultipleChoiceItem()
    .setTitle('P10. Na sua percepção, qual é o principal diferencial competitivo da Medicinal Pharma hoje?')
    .setChoiceValues([
      'Matéria-prima importada (Alemanha, Japão, Glanbia/Irlanda)',
      'Preço competitivo para a qualidade oferecida',
      'Sabor e experiência de consumo (gourmet)',
      'Credibilidade científica / dosagens corretas',
      'Relacionamento com a comunidade (afiliados, atletas)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // P11
  form.addMultipleChoiceItem()
    .setTitle('P11. Qual segmento de público você acredita que a Medicinal Pharma serve melhor hoje?')
    .setChoiceValues([
      'Iniciantes na academia (primeiros suplementos)',
      'Atletas intermediários comprometidos com resultado',
      'Atletas avançados / competidores',
      'Público feminino focado em definição',
      'Público que busca saúde e bem-estar (não só performance)',
      'Nenhum segmento claramente definido ainda'
    ])
    .setRequired(true);

  // P12
  form.addScaleItem()
    .setTitle('P12. Comparado aos concorrentes diretos (outras marcas nacionais premium), onde a Medicinal Pharma se posiciona?')
    .setBounds(1, 5)
    .setLabels('Muito atrás dos concorrentes', 'Claramente à frente')
    .setRequired(true);

  // P13
  form.addScaleItem()
    .setTitle('P13. O nome e a identidade visual "Medicinal Pharma" transmitem autoridade e confiança?')
    .setBounds(1, 5)
    .setLabels('Não transmite', 'Transmite muito')
    .setRequired(true);

  // P14
  form.addScaleItem()
    .setTitle('P14. A comunicação atual da marca está alinhada com o preço premium praticado nos produtos?')
    .setBounds(1, 5)
    .setLabels('Muito desalinhada — o visual não justifica o preço', 'Totalmente alinhada')
    .setRequired(true);

  // ─── SEÇÃO 4 — EXPECTATIVAS FUTURAS ─────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Seção 4 — Expectativas Futuras')
    .setHelpText('Para onde vamos — e o que você espera ver acontecer.');

  // P15
  form.addCheckboxItem()
    .setTitle('P15. Qual deve ser o principal objetivo da comunicação da Medicinal Pharma nos próximos 12 meses? (Escolha até 2)')
    .setChoiceValues([
      'Aumentar reconhecimento de marca (brand awareness)',
      'Converter mais vendas diretas pelo Instagram',
      'Fortalecer a rede de afiliados e parceiros',
      'Educar o mercado sobre qualidade e diferenciais técnicos',
      'Expandir para novos públicos (ex: público 35+, mulheres, saúde geral)',
      'Consolidar presença em regiões fora do ABC Paulista / SP'
    ])
    .setRequired(true);

  // P16
  form.addMultipleChoiceItem()
    .setTitle('P16. Em termos de estética e visual, qual direção você gostaria de ver a marca seguir?')
    .setChoiceValues([
      'Manter o estilo atual — mais execução, menos mudança',
      'Evoluir para algo mais sofisticado / luxo (menos esportivo, mais premium)',
      'Tornar-se mais técnico e científico (laboratório, dados, precisão)',
      'Mais próxima da comunidade / lifestyle (bastidores, atletas reais)',
      'Mais agressivo e energético (voltado ao treino intenso)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // P17
  form.addCheckboxItem()
    .setTitle('P17. Quais formatos de conteúdo você acredita que trariam mais resultado para a marca? (Escolha até 3)')
    .setChoiceValues([
      'Reels educativos (como o carrossel "Por que 3W?")',
      'Depoimentos e resultados de clientes reais',
      'Conteúdo de bastidores (produção, laboratório, origem dos ingredientes)',
      'Comparativos técnicos com concorrentes',
      'Lives com profissionais (nutricionistas, personal trainers)',
      'Promoções e campanhas de desconto',
      'Conteúdo de atletas e embaixadores usando o produto'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // P18
  form.addMultipleChoiceItem()
    .setTitle('P18. Qual produto você acredita que merece mais destaque na comunicação agora?')
    .setChoiceValues([
      'Magnific Whey 3W (carro-chefe)',
      'Lipo-X HD Termogênico',
      'Anabolic Training Pré-Treino',
      'Power Creatine Micronized',
      'L-Glutamine',
      'Multi AZ Multivitamínico',
      'Os kits e combos (não um produto individual)'
    ])
    .setRequired(true);

  // P19
  form.addMultipleChoiceItem()
    .setTitle('P19. Qual é a sua expectativa de crescimento em vendas via Instagram nos próximos 6 meses?')
    .setChoiceValues([
      'Manter o volume atual',
      'Crescer 20–30%',
      'Crescer 50–100%',
      'Mais que dobrar',
      'Não tenho expectativa numérica — quero construir base antes de vender'
    ])
    .setRequired(true);

  // P20
  form.addTextItem()
    .setTitle('P20. Tem algum concorrente cuja comunicação você admira e gostaria que servisse de referência?')
    .setHelpText('Ex: Growth Supplements, Integral Médica, Optimum Nutrition, GNC...')
    .setRequired(false);

  // ─── SEÇÃO 5 — ESPAÇO LIVRE ──────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Seção 5 — Espaço Livre')
    .setHelpText('O que não perguntamos mas você quer dizer.');

  // P21
  form.addParagraphTextItem()
    .setTitle('P21. Se você pudesse mudar UMA coisa na comunicação da Medicinal Pharma agora, o que seria?')
    .setHelpText('Sem filtro. Pode ser visual, tom de voz, produto, frequência de posts, estratégia...')
    .setRequired(true);

  // P22
  form.addParagraphTextItem()
    .setTitle('P22. Há algo que a marca já fez muito bem e que você não quer que mude?')
    .setRequired(false);

  // P23
  form.addMultipleChoiceItem()
    .setTitle('P23. Você toparia participar de uma conversa de 20 minutos para aprofundar suas respostas?')
    .setChoiceValues([
      'Sim, pode me contatar',
      'Talvez — depende da pauta',
      'Não no momento'
    ])
    .setRequired(true);

  // P24 — contato (sempre visível; instrua no helpText)
  form.addTextItem()
    .setTitle('P24. Se sim, qual o melhor canal para contato?')
    .setHelpText('Deixe em branco se não quiser ser contactado. Ex: WhatsApp (11) 9xxxx-xxxx ou email@exemplo.com')
    .setRequired(false);

  // ─── LOG NO CONSOLE ──────────────────────────────────────────────────────
  Logger.log('✅ Formulário criado com sucesso!');
  Logger.log('🔗 URL de edição: ' + form.getEditUrl());
  Logger.log('📋 URL para responder: ' + form.getPublishedUrl());
}
