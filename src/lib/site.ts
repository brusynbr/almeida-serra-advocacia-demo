export const site = {
  name: "Almeida & Serra",
  demo: process.env.SITE_DEMO !== "false",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
};

export const chapters = [
  { number: "01", title: "Análise individualizada", eyebrow: "COMPREENDER", description: "Cada contexto exige uma leitura cuidadosa. A escuta e a organização das informações são o ponto de partida de uma atuação responsável.", detail: "Atenção ao contexto. Precisão nos detalhes.", position: "70% 40%" },
  { number: "02", title: "Orientação clara", eyebrow: "ESCLARECER", description: "Informações compreensíveis para decisões conscientes. Uma comunicação objetiva aproxima o conhecimento técnico das necessidades de cada pessoa.", detail: "Complexidade jurídica. Comunicação simples.", position: "90% 60%" },
  { number: "03", title: "Acompanhamento próximo", eyebrow: "CONSTRUIR", description: "Alinhamento de expectativas e diálogo ao longo de cada etapa. Compromisso significa também manter a clareza sobre o caminho a percorrer.", detail: "Presença em cada etapa. Respeito em cada conversa.", position: "55% 80%" },
];

export const articles = [
  { slug: "primeira-conversa", category: "RELACIONAMENTO", title: "O que organizar antes da primeira conversa", excerpt: "Informações objetivas ajudam a compreender o contexto e tornam o atendimento mais produtivo.", readTime: "3 min", paragraphs: [
    "Uma primeira conversa começa pela compreensão do contexto. Organizar uma breve sequência dos acontecimentos ajuda a apresentar a situação com clareza, sem antecipar conclusões sobre o caso.",
    "Anote os fatos relevantes, as datas que conhece e as dúvidas que deseja esclarecer. Se houver documentos, prepare uma relação do que está disponível. O profissional indicará quais arquivos devem ser compartilhados e por qual canal.",
    "Evite enviar documentos pessoais, informações financeiras ou detalhes sensíveis por formulários públicos. Antes de encaminhar arquivos, confirme o destinatário e as condições de segurança do canal.",
    "A avaliação depende das circunstâncias e dos documentos de cada situação. Este texto demonstrativo é informativo e não substitui orientação jurídica individualizada."
  ] },
  { slug: "comunicacao-clara", category: "NOSSA ABORDAGEM", title: "Clareza também faz parte do cuidado", excerpt: "Uma boa conversa envolve escuta, contexto e espaço para perguntas.", readTime: "2 min", paragraphs: [
    "Termos técnicos podem criar distância. Uma comunicação profissional deve permitir que as pessoas compreendam as informações apresentadas e possam esclarecer suas dúvidas.",
    "É útil combinar os canais de contato, a forma de atualização e os próximos passos. Esse alinhamento ajuda a manter expectativas claras, respeitando os limites de cada situação.",
    "Perguntar é parte do diálogo. Antes de tomar uma decisão, busque entender o que foi explicado e sinalize pontos que ainda não estejam claros.",
    "Este conteúdo é demonstrativo e apresenta princípios de comunicação. Não constitui análise de um caso nem orientação jurídica individualizada."
  ] },
  { slug: "privacidade-no-atendimento", category: "INFORMAÇÃO", title: "Privacidade desde o primeiro contato", excerpt: "Compartilhar apenas o necessário é um bom começo para uma relação de confiança.", readTime: "2 min", paragraphs: [
    "O primeiro contato pode ser objetivo: nome, um canal de retorno e uma descrição geral da necessidade. Informações sensíveis merecem um ambiente apropriado para seu compartilhamento.",
    "Não inclua números de documentos, dados de saúde, senhas ou informações de terceiros em formulários abertos. Solicite um canal adequado para documentos e detalhes que precisem de confidencialidade.",
    "Confirme os dados do destinatário antes de enviar uma mensagem. Em caso de dúvida sobre a origem de uma solicitação, entre em contato por um canal institucional conhecido.",
    "Este artigo demonstrativo apresenta cuidados gerais de comunicação e deverá ser revisado pelo responsável antes de uma publicação institucional."
  ] },
];
