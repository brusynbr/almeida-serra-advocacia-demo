import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound(){return <main id="conteudo-principal" className="document-page not-found"><p className="eyebrow">404 — PÁGINA NÃO ENCONTRADA</p><h1>Um novo caminho<br/>começa aqui.</h1><p>O endereço solicitado não está disponível.</p><Link className="text-link" href="/"><ArrowLeft size={18} aria-hidden="true"/>Voltar ao início</Link></main>;}
