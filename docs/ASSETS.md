# Assets e direção visual

## Imagens

`public/images/architecture.webp`: imagem original gerada com a ferramenta integrada de imagem, exclusivamente para esta proposta. Não retrata o endereço real de um escritório.

`public/images/detail.webp`: recorte da imagem original, otimizado em WebP. Não foi usada a captura de uma interface como fotografia do website.

Prompt usado:

> Photorealistic architectural editorial photograph for an approved premium Brazilian law firm website. A serene modern civic-style building of warm ivory limestone and black glass with very tall rectilinear proportions, viewed from a low angle at blue hour, restrained warm amber interior lighting, fine stone texture, quiet reflecting pool and subtle tree at right, no people. Asymmetric composition with building taking the right 65 percent and dark deep navy empty sky on the left 35 percent for website typography overlay. Sophisticated architectural magazine photography, realistic materials, crisp details, quiet dignity. Wide landscape 3:2 or 16:9 high resolution. No text, logos, watermarks, justice symbols, classical columns. This is just a clean website photography asset, no UI or mockup.

Os arquivos WebP estão no projeto e não dependem do diretório de geração do Codex.

## Fontes

Cormorant Garamond (editorial) e DM Sans (texto/UI), distribuídas pelo Google Fonts sob SIL Open Font License. Arquivos Latin WOFF2 servidos localmente com `next/font/local`, sem chamadas a serviços externos durante a navegação. As licenças acompanham os arquivos em `src/fonts`.

## Ícones

Lucide React, ícones lineares consistentes. Ícones junto a texto são decorativos e possuem `aria-hidden`; botões só com ícone possuem nome acessível.
