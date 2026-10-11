"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [["O escritório", "escritorio"], ["Atuação", "atuacao"], ["Abordagem", "abordagem"], ["Conteúdo", "conteudo"]];
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const unlock = () => { document.body.style.overflow = ""; button.current?.focus(); };
    element?.addEventListener("close", unlock);
    return () => { element?.removeEventListener("close", unlock); document.body.style.overflow = ""; };
  }, []);
  function open() { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }
  function close() { dialog.current?.close(); }
  return <>
    <header className="site-header">
      <Link href="/" className="wordmark">ALMEIDA <span>&</span> SERRA<small>ADVOCACIA</small><span className="sr-only"> — Início</span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, id]) => <Link key={id} href={`/#${id}`}>{label}</Link>)}</nav>
      <Link className="header-cta" href="/#contato">Entre em contato <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <button ref={button} onClick={open} className="menu-toggle" aria-label="Abrir menu" aria-haspopup="dialog"><Menu aria-hidden="true" size={28} strokeWidth={1} /></button>
    </header>
    <dialog ref={dialog} className="mobile-dialog" aria-labelledby="menu-title">
      <div className="dialog-top"><span id="menu-title" className="eyebrow">ALMEIDA & SERRA</span><button onClick={close} aria-label="Fechar menu"><X size={26} aria-hidden="true" /></button></div>
      <nav aria-label="Navegação mobile">{[...links, ["Contato", "contato"]].map(([label,id],i) => <Link key={id} onClick={close} href={`/#${id}`}><span>0{i+1}</span>{label}<ArrowUpRight aria-hidden="true" size={22}/></Link>)}</nav>
      <p className="dialog-note">Conhecimento. Estratégia. Compromisso.</p>
    </dialog>
  </>;
}
