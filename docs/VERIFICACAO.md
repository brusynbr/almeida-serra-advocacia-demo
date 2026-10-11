# Relatório de verificação — 11/10/2026

## Resultado

Atualização mobile: entrada escalonada, fotografia com zoom/parallax reversível, linhas institucionais e painéis com deslocamentos curtos; leituras e formulário acompanham a rolagem. Sem pinning, sem interceptação de gestos, sem nova dependência. Orientação UI/UX aplicada para manter o conteúdo visível e respeitar movimento reduzido. Build e lint passaram; 9 testes unitários e 6 cenários E2E passaram, incluindo o novo teste de transformação mobile, reversão e troca dinâmica para movimento reduzido. Responsividade verificada de 375 a 1920 px e em paisagem; não equivale a teste em aparelho físico.

Verificações originais executadas localmente em `http://127.0.0.1:3000`, com Node.js 24.19.0 e Chrome instalado. Publicação pública autorizada posteriormente em 11/10/2026; os resultados locais abaixo não são medições do site hospedado. A identidade e o conteúdo seguem demonstrativos por escolha do usuário.

| Verificação executada | Resultado |
| --- | --- |
| Instalação pnpm 11.25.0 | Concluída; lockfile incluído |
| Build Next.js 16.4 | Passou; páginas e rota API geradas |
| TypeScript `tsc --noEmit` | Passou |
| ESLint | Passou sem erros ou avisos |
| Testes do formulário/API | 9 passaram |
| Playwright com Chrome | 5 cenários passaram |
| axe-core | Sem violações nos conjuntos WCAG 2 A/AA, 2.1 AA e 2.2 AA verificados |
| Console nas capturas desktop/mobile | Nenhum erro capturado |
| `pnpm audit --prod` | Nenhuma vulnerabilidade conhecida reportada |

## Fluxos verificados

1. Desktop em 1440 × 900: carregamento, três seções fixadas, hero com scrub, expansão/reversão da fotografia, mudança dos painéis, foco por teclado no último painel, navegação por âncoras e abertura/retorno de um artigo.
2. Mobile em 390 × 844: ausência de pinning, menu em diálogo, fechamento por Escape, restauração de foco, link ao contato, resumo de erros, preenchimento de dados fictícios e validação sem envio.
3. Larguras 375, 390, 768, 1024, 1440 e 1920 px; orientação horizontal 844 × 390: sem overflow horizontal. Os breakpoints e triggers foram exercitados durante redimensionamento.
4. `prefers-reduced-motion: reduce`: nenhum pin; todos os painéis disponíveis em sequência. Auditoria de acessibilidade na homepage e em privacidade e três artigos. Auditoria adicional da homepage mobile com formulário validado.
5. Sitemap, robots, metadados `noindex`, header `X-Frame-Options: DENY`, rejeição de origem externa, endpoint sem credenciais retornando 503 e página 404.

Os testes do endpoint também exercitaram corpo excessivo sem Content-Length, dados inválidos, confirmação de privacidade ausente, honeypot, token Turnstile inválido, hostname incorreto, erro do provedor e confirmação de envio somente após ID do provedor. Chamadas externas nesses testes foram **simuladas em memória**; nenhum e-mail real foi enviado.

## Lighthouse

Lighthouse 13.5.0 sobre o build de produção local, Chrome headless, perfil mobile com throttling simulado e preset desktop. Valores da última execução de cada perfil:

| Métrica | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 90 | 99 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 66 | 66 |
| FCP | 1,0 s | 0,3 s |
| LCP | 3,4 s | 0,9 s |
| TBT | 90 ms | 10 ms |
| CLS | 0 | 0 |

A nota SEO está reduzida porque a demonstração bloqueia indexação (`noindex, nofollow` e `Disallow: /`). Esse é um comportamento intencional, que deve ser removido somente após revisão e substituição dos dados demonstrativos.

O LCP mobile de 3,4 s ainda não atinge a referência de 2,5 s no perfil sintético usado. A meta de 90 em performance foi atingida, mas não se declara desempenho real de Core Web Vitals nem INP: não há dados de usuários reais. Execuções anteriores oscilaram entre 90 e 93 em performance mobile.

Relatórios completos estão na entrega local: `lighthouse-mobile.html`, `lighthouse-desktop.html` e JSONs correspondentes. O JSON `playwright-results.json` contém os resultados dos cenários finais. Esses arquivos brutos não são publicados no Git para preservar caminhos locais; o resumo acima é versionado.

## Correções decorrentes das verificações

- Contraste do dourado em superfícies claras.
- Contraste de textos durante revelações de scroll.
- Identificação correta da origem local no endpoint de contato.
- Nome acessível do link de marca usando seu texto visível.
- Foco por teclado nos painéis horizontais.
- Validação Zod sem geração dinâmica de código, compatível com CSP sem `unsafe-eval`.
- Prioridade explícita da imagem do hero e configuração das qualidades aceitas pelo otimizador.
- Entrada cinematográfica automática restrita ao desktop para manter a abertura mobile imediata.
- Cleanup de listeners, triggers e refresh de fontes após desmontagem.

## Limitações e pendências

- Sem envio real de e-mail verificado: credenciais, domínio de envio e destinatário não foram fornecidos. O formulário demonstrativo não envia dados.
- Sem contatos/WhatsApp reais, especialidades, perfis de equipe, OAB ou endereço. Esses campos dependem de dados autorizados.
- Não foram criadas páginas de especialidades nem dados estruturados profissionais fictícios.
- Normas vigentes da OAB, artigos, identidade profissional e aviso de privacidade precisam de revisão pelo responsável antes de publicação institucional.
- Testes de navegador executados em Chrome; não se declara teste de Safari, Firefox ou aparelhos físicos.
- Testes automáticos de acessibilidade e nota 100 do Lighthouse não equivalem a certificação integral WCAG.
- Não foram realizadas medição de INP em campo, carga concorrente, entrega de e-mail ou testes de caixa de entrada.

As orientações das habilidades UI/UX e revisão React influenciaram a adaptação mobile, contraste, foco, separação de código cliente/servidor e limpeza das animações. A habilidade de verificação foi usada para ligar ações da interface, validação, endpoint e respostas de sucesso/erro.
