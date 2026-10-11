"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="conteudo-principal" className="document-page not-found"><p className="eyebrow">ERRO TEMPORÁRIO</p><h1>Vamos tentar novamente.</h1><p>Não foi possível carregar esta página agora.</p><button className="send-button text-navy!" onClick={reset}>Recarregar conteúdo</button></main>;}
