import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { ScrollExperience } from "@/components/scroll-experience";
import { ContactForm } from "@/components/contact-form";
import { chapters, articles, site } from "@/lib/site";
import { contactConfigured } from "@/lib/contact";

export default function Home() {
  return <main id="conteudo-principal"><ScrollExperience>
    <section className="hero-scene" aria-labelledby="hero-title">
      <div className="hero-photo"><Image src="/images/architecture.webp" alt="Composição arquitetônica demonstrativa: fachada de pedra e vidro ao entardecer" fill sizes="100vw" loading="eager" fetchPriority="high" quality={85}/></div>
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow hero-label">CONHECIMENTO QUE ORIENTA.</p>
        <h1 id="hero-title">Excelência jurídica<br/>em cada <em>decisão.</em></h1>
        <p className="hero-description">Conhecimento técnico, ética profissional<br className="desktop-break"/> e atendimento personalizado.</p>
        <a className="text-link" href="#escritorio"><span className="gold-rule"/>Conheça o escritório <ArrowRight size={21} strokeWidth={1} aria-hidden="true"/></a>
        <a href="#escritorio" className="scroll-cue"><ArrowDown size={19} aria-hidden="true" strokeWidth={1}/><span>ROLE PARA EXPLORAR</span></a>
      </div>
      <div className="transition-copy" aria-hidden="true"><span className="gold-rule"/><p>Cada decisão<br/>começa com escuta.</p></div>
      <span className="hero-index" aria-hidden="true">01 — 08</span>
    </section>

    <section id="escritorio" className="about-section light-section" aria-labelledby="about-title">
      <div className="section-label"><span>01</span><i/>O ESCRITÓRIO</div>
      <div className="about-grid"><h2 id="about-title" className="about-heading"><span className="line">Precisão na análise.</span><span className="line">Clareza em</span><span className="line"><em>cada etapa.</em></span></h2>
        <div className="about-copy"><span className="gold-rule"/><p>O direito se conecta à vida, aos negócios e às decisões que importam.</p><p>Esta proposta institucional traduz uma advocacia pautada pela escuta, pelo rigor técnico e pela comunicação clara. Um olhar atento para o contexto de cada pessoa.</p><a href="#abordagem" className="text-link dark-link">Nossa forma de atuar <ArrowUpRight size={20} strokeWidth={1} aria-hidden="true"/></a></div>
      </div>
      <div className="about-image reveal"><Image src="/images/detail.webp" alt="Detalhe de pedra natural e vidro na composição arquitetônica" fill sizes="(max-width: 768px) 100vw, 85vw"/><span>ATENÇÃO AO CONTEXTO. RESPEITO ÀS PESSOAS.</span></div>
    </section>

    <section id="atuacao" className="practice-section" aria-labelledby="practice-title">
      <div className="practice-heading"><div className="section-label"><span>02</span><i/>ATUAÇÃO</div><p id="practice-title">Uma atuação que começa pela escuta.</p><span className="practice-note">Áreas jurídicas serão incluídas após confirmação do escritório.</span></div>
      <div className="practice-window"><div className="practice-track">{chapters.map(chapter => <article className="practice-panel" key={chapter.number}>
        <div className="panel-copy"><span className="eyebrow">{chapter.number} / {chapter.eyebrow}</span><h2>{chapter.title}</h2><p>{chapter.description}</p><div className="panel-detail"><span className="gold-rule"/>{chapter.detail}</div><a href="#contato" className="text-link">Entre em contato <ArrowUpRight size={20} aria-hidden="true"/></a></div>
        <div className="panel-photo"><Image src="/images/architecture.webp" alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" style={{objectPosition:chapter.position}}/><span className="panel-number" aria-hidden="true">{chapter.number}</span></div>
      </article>)}</div></div>
    </section>

    <section className="manifesto light-section" aria-labelledby="manifesto-title"><div className="section-label"><span>03</span><i/>PRINCÍPIOS</div>
      <h2 id="manifesto-title"><span className="manifesto-word">Conhecimento.</span><span className="manifesto-word"><em>Estratégia.</em></span><span className="manifesto-word">Compromisso.</span></h2>
      <div className="manifesto-bottom"><span className="gold-rule"/><p>O cuidado está na forma de ouvir.<br/>A confiança, na forma de conduzir.</p><span className="manifesto-monogram" aria-hidden="true">A<span>&</span>S</span></div>
    </section>

    <section id="abordagem" className="approach-section" aria-labelledby="approach-title"><div className="approach-photo"><Image src="/images/detail.webp" alt="Luz suave sobre uma superfície de pedra natural" fill sizes="(max-width: 768px) 100vw, 45vw"/></div>
      <div className="approach-content"><div className="section-label"><span>04</span><i/>NOSSA ABORDAGEM</div><h2 id="approach-title" className="reveal">Antes do caminho,<br/><em>compreender.</em></h2>
        <div className="approach-steps">{[["Escuta", "Conhecer o contexto, as necessidades e as expectativas."],["Análise", "Examinar as informações com atenção e responsabilidade."],["Diálogo", "Explicar os próximos passos com clareza e objetividade."]].map(([title,text],i)=><div className="approach-step reveal" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div>
    </section>

    <section id="equipe" className="team-section light-section" aria-labelledby="team-title"><div className="section-label"><span>05</span><i/>PESSOAS</div><div className="team-grid"><h2 id="team-title" className="reveal">O conhecimento tem valor.<br/><em>O cuidado tem presença.</em></h2><div className="team-copy"><p>Uma relação profissional se constrói com atenção, respeito e responsabilidade.</p><p className="demo-note">Os perfis da equipe, fotografias e inscrições na OAB serão apresentados quando fornecidos pelo escritório.</p></div></div></section>

    <section id="conteudo" className="insights-section light-section" aria-labelledby="insights-title"><div className="section-label"><span>06</span><i> </i>CONTEÚDO</div><div className="insights-top"><h2 id="insights-title" className="reveal">Informação para<br/><em>uma conversa melhor.</em></h2><p>Uma seleção de leituras introdutórias.<br/><span className="demo-note">Conteúdos demonstrativos para revisão.</span></p></div>
      <div className="article-list">{articles.map((article,i)=><Link key={article.slug} href={`/conteudo/${article.slug}`} className="article-row"><span className="article-index">0{i+1}</span><div><span className="eyebrow">{article.category} · {article.readTime}</span><h3>{article.title}</h3><p>{article.excerpt}</p></div><ArrowUpRight size={30} strokeWidth={1} aria-hidden="true"/></Link>)}</div>
    </section>

    <section id="contato" className="contact-section" aria-labelledby="contact-title"><div className="section-label"><span>07</span><i/>CONTATO</div><div className="contact-grid"><div><h2 id="contact-title" className="reveal">Toda boa decisão<br/>começa com<br/><em>uma conversa.</em></h2><p className="contact-intro">Conte-nos como podemos entrar em contato.<br/>Compartilhe apenas informações gerais.</p>
      <div className="contact-details">{site.email&&<a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={18} aria-hidden="true"/></a>}{site.phone&&<a href={`tel:${site.phone.replace(/[^+\d]/g,"")}`}>{site.phone}</a>}{site.whatsapp&&<a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${site.whatsapp}`}>Converse pelo WhatsApp <ArrowUpRight size={18} aria-hidden="true"/></a>}{!site.email&&!site.phone&&!site.whatsapp&&<p className="demo-note">Os canais de contato serão adicionados após confirmação.</p>}</div>
      </div><ContactForm enabled={contactConfigured()} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}/></div>
    </section>
  </ScrollExperience></main>;
}
