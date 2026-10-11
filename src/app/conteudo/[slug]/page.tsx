import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles, site } from "@/lib/site";
export function generateStaticParams(){return articles.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const article=articles.find(article=>article.slug===slug);
  return {title:article?.title,description:article?.excerpt,alternates:{canonical:`/conteudo/${slug}`}};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const article=articles.find(article=>article.slug===slug);if(!article)notFound();
  return <main id="conteudo-principal" className="document-page"><Link className="back-link" href="/#conteudo"><ArrowLeft size={16} aria-hidden="true"/>Voltar às leituras</Link><article><p className="eyebrow">{article.category} · LEITURA DE {article.readTime.toUpperCase()}</p><h1>{article.title}</h1><div className="document-body">{site.demo&&<p className="demo-note">Conteúdo demonstrativo. Revisão profissional pendente antes da publicação.</p>}{article.paragraphs.map(paragraph=><p key={paragraph.slice(0,30)}>{paragraph}</p>)}<Link className="text-link dark-link" href="/#contato">Entre em contato <ArrowUpRight size={19} aria-hidden="true"/></Link></div></article></main>;
}
