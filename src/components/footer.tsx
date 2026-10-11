import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function Footer() {
  return <footer className="site-footer"><div className="footer-top">
    <Link href="/" className="wordmark">ALMEIDA <span>&</span> SERRA<small>ADVOCACIA</small></Link>
    <div className="footer-links"><Link href="/#escritorio">O escritório</Link><Link href="/#contato">Contato <ArrowUpRight size={14} aria-hidden="true"/></Link><Link href="/privacidade">Privacidade</Link></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Almeida & Serra.</span><span>{site.demo ? "Identidade e conteúdo demonstrativos." : "Advocacia. Comunicação institucional."}</span><a href="#conteudo-principal">Voltar ao início ↑</a></div></footer>;
}
