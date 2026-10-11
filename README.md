# Almeida & Serra — experiência institucional de scroll

Website demonstrativo produzido para a direção visual aprovada em 11/10/2026. A identidade é fictícia. Especialidades, equipe, inscrições na OAB, contatos e endereço não foram inventados.

## Executar

Requisitos: Node.js 20.9 ou superior (verificado com 24.19.0), pnpm 11.25 e um navegador atual.

```sh
pnpm install
pnpm dev
```

Abra http://127.0.0.1:3000. No computador em que este projeto foi criado, o script `iniciar.ps1` também encontra o pnpm fornecido pelo Codex:

```powershell
./iniciar.ps1
```

Versão de produção:

```sh
pnpm build
pnpm start
```

## Entrega

- Next.js 16.4 com App Router, React, TypeScript e Tailwind CSS 4.
- GSAP 3.15 e ScrollTrigger: hero fixado, expansão progressiva da fotografia, texto institucional fixado, painéis horizontais e manifesto sincronizado à rolagem.
- Mobile animado: entrada escalonada do título, fotografia com zoom/parallax, linhas institucionais, painéis alternados e revelação de leituras/formulário; sequência vertical sem pinning e menu em diálogo nativo com foco e Escape.
- `prefers-reduced-motion`: elimina pinning e transforms narrativos; conserva conteúdos e funções.
- Header, navegação por âncoras, progresso, três artigos individuais, privacidade e página 404.
- Formulário com validação compartilhada entre cliente e servidor, resumo acessível de erros, preservação dos dados em caso de falha, estados de envio/sucesso/erro e integração preparada para envio real.
- Fontes locais Cormorant Garamond e DM Sans; imagens WebP geradas para este projeto.
- Metadados, Open Graph, favicon, sitemap e robots. Demonstração em `noindex, nofollow` com robots bloqueando rastreamento.
- Headers de segurança, limite de tamanho de requisição, verificação de origem, honeypot, Turnstile e timeouts.

## Estrutura

```text
src/app/                    Páginas, API, metadados e tokens/CSS
src/components/             Navegação, animações, formulário e rodapé
src/lib/site.ts             Identidade, capítulos e conteúdo demonstrativo
src/lib/contact-schema.ts   Validação compartilhada; sem código de envio
src/lib/contact.ts          Verificação antiabuso e envio exclusivamente no servidor
src/fonts/                  Fontes locais e licenças
public/images/              Imagens próprias otimizadas
tests/contact.test.ts        Testes do endpoint com provedores simulados
tests/e2e/site.spec.ts       Fluxos de navegador e acessibilidade
docs/                       Decisões, assets e relatório de validação
```

## Configurar dados reais e envio

Copie `.env.example` para `.env.local` e preencha apenas dados autorizados. `.env.local` está ignorado pelo Git.

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origem exata da aplicação; local `http://127.0.0.1:3000`, ou domínio HTTPS em produção |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail público; habilita link `mailto:` |
| `NEXT_PUBLIC_CONTACT_PHONE` | Telefone público; habilita link `tel:` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número real com país/DDD; habilita link WhatsApp |
| `RESEND_API_KEY` | Credencial privada de envio |
| `CONTACT_FROM` | Remetente em domínio verificado pelo Resend |
| `CONTACT_TO` | Destinatário autorizado |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública do widget |
| `TURNSTILE_SECRET_KEY` | Chave privada de verificação |
| `SITE_DEMO` | `true` por padrão; só mudar após substituir e revisar a identidade demonstrativa |

O formulário só habilita envio quando todas as credenciais necessárias estão presentes. Enquanto isso, **Validar mensagem** verifica os campos localmente e informa que nada foi enviado. O endpoint também retorna 503 nessa condição. Não há banco, armazenamento local ou envio simulado de mensagens.

Cadastre o hostname real no Turnstile. O servidor confere `success`, `hostname` e `action=contact` antes de enviar. O Resend recebe texto simples, resposta direcionada ao e-mail informado e uma chave de idempotência. Não há logs de nomes, mensagens ou credenciais no código.

Os testes de provedor usam respostas fictícias em memória: verificam o contrato, mas não comprovam entrega de um e-mail real. A confirmação real deverá ser testada após configurar as contas.

## Verificações

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
# Em outro terminal:
pnpm test:e2e
```

Os testes de navegador usam Chrome instalado. Para usar Edge: defina `PLAYWRIGHT_CHANNEL=msedge`. Outra máquina precisa de um desses navegadores ou adaptar `playwright.config.ts` para Chromium e instalá-lo com Playwright. Não existe instalação automática de navegador no projeto.

Veja `docs/VERIFICACAO.md` para resultados reais, condições e limitações.

## Publicação pública

Publicação autorizada pelo proprietário em 11/10/2026.

- Código público: https://github.com/brusynbr/almeida-serra-advocacia-demo
- Site de demonstração: https://almeida-serra-advocacia-demo.vercel.app
- Projeto Vercel na equipe Brusyn, conectado ao GitHub; produção usa a branch `main`.
- `SITE_DEMO=true`, origem HTTPS configurada, sem senha ou autenticação Vercel para visitantes.
- Nenhuma credencial de envio incluída. O formulário continua apenas validando, sem enviar mensagens.
- Credenciais, dependências, cache de build e relatórios brutos com caminhos locais não são versionados.

Para futuras publicações:

1. Envie este diretório a um repositório autorizado, excluindo `.env.local`, `node_modules`, `.next` e resultados temporários.
2. Importe o repositório na Vercel usando o preset Next.js e este diretório como raiz.
3. Use `pnpm install --frozen-lockfile` para instalação e `pnpm build` para build. O lockfile está incluído.
4. Configure as variáveis nos ambientes corretos. Credenciais privadas não recebem prefixo `NEXT_PUBLIC_`.
5. Defina a origem HTTPS exata, remetente verificado, destinatário e hostname Turnstile. Alterações em variáveis públicas exigem novo build.
6. Mantenha a versão demonstrativa sem indexação até aprovação de dados e conteúdo.
7. Antes da publicação institucional: incluir dados profissionais reais, revisar artigos e aviso de privacidade, verificar regras vigentes da OAB com o advogado responsável e testar um envio real autorizado.
8. Publique somente após autorização do proprietário.

Dados estruturados profissionais e páginas de especialidades devem ser adicionados quando houver dados confirmados; não há `LegalService`, OAB, endereço ou especialidades fictícias em metadados.
