# Decisões da implementação

- Direção aprovada: marinho, off-white, dourado discreto, tipografia editorial e arquitetura contemporânea. Nome fictício Almeida & Serra mantido a pedido do usuário.
- Não havia aplicação ou documentação de projeto no workspace: foi criado um projeto local autocontido em `outputs/site`.
- Os playbooks citados nas instruções gerais não estavam disponíveis no workspace; nenhum padrão específico ausente foi presumido.
- GSAP e ScrollTrigger atendem à narrativa. Não foi incluído Lenis: a rolagem nativa preserva teclado, âncoras, comportamento do navegador e movimentos reversíveis.
- Desktop com três sequências fixadas curtas. Mobile e movimento reduzido mostram painéis verticais; sem rolagem horizontal acidental.
- O foco de teclado nos links dos painéis traz o painel correspondente para a área visível.
- Textos em DOM sem fragmentação de palavras ou conteúdo duplicado para leitores de tela. Revelações conservam contraste legível, inclusive antes da chegada à viewport.
- Componentes estáticos renderizados no servidor; os únicos componentes interativos são navegação, controlador de animações e formulário.
- A habilidade UI/UX orientou os cuidados de contraste, foco e adaptação. Sugestões genéricas de depoimentos, certificações e resultados foram descartadas por não corresponderem ao briefing.
- A revisão React orientou separação da validação compartilhada e envio no servidor, cleanup dos triggers/listeners e proteção contra refresh após desmontagem.
- Nenhuma especialidade ou perfil foi inventado. O capítulo Atuação descreve princípios de atendimento e marca a pendência de áreas reais. A seção Pessoas explica a ausência de perfis.
- O usuário aprovou a continuação com identidade demonstrativa. Contatos, equipe e integrações externas permanecem pendências explícitas.
- Resend e Turnstile escolhidos por integração HTTP simples e verificação de origem/ação do token. Nenhuma conta, plano ou custo foi contratado.
- O endpoint envia texto simples; não interpola conteúdo do usuário em HTML. Limita o corpo a 16 KiB, valida campos e não registra dados pessoais em logs.
- Validação Zod com `jitless: true` para funcionar sem exigir `unsafe-eval` na política de segurança.
- `SITE_DEMO=true` evita indexar a identidade fictícia. É esperado que a nota SEO do Lighthouse seja reduzida pela política intencional de `noindex` e robots.
- Não foram usados vídeos, sequências de centenas de quadros, conteúdo de terceiros protegido sem licença ou serviços pagos.

Referências técnicas consultadas:

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP matchMedia e cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
- [Next.js Route Handlers](https://nextjs.org/docs/app/guides/backend-for-frontend)
- [Turnstile: validação no servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Resend: enviar e-mail](https://resend.com/docs/api-reference/emails/send-email)

Verificação de normas jurídicas vigentes fica vinculada à preparação de uma publicação real; não foi declarada conformidade jurídica desta demonstração.
