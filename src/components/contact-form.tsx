"use client";
import { useRef, useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactSchema } from "@/lib/contact-schema";

declare global {
  interface Window { turnstile?: {
    render: (container: HTMLElement, options: { sitekey: string; action: string; theme: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
    reset: (id: string) => void; remove: (id: string) => void;
  } }
}
export function ContactForm({ enabled, siteKey }: { enabled: boolean; siteKey: string }) {
  const form = useRef<HTMLFormElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Record<string,string[] | undefined>>({});
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  useEffect(() => () => { if(widgetId.current) window.turnstile?.remove(widgetId.current); }, []);
  function initWidget() {
    if (widget.current && window.turnstile && !widgetId.current) widgetId.current = window.turnstile.render(widget.current, { sitekey: siteKey, action: "contact", theme: "dark", callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => { setToken(""); setMessage("Não foi possível carregar a verificação de segurança."); setStatus("error"); } });
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const fields = new FormData(event.currentTarget);
    const data = { name: fields.get("name"), email: fields.get("email"), message: fields.get("message"), consent: fields.get("consent") === "on", website: fields.get("website") || "", token };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors); setStatus("error"); setMessage("Verifique os campos indicados antes de continuar.");
      requestAnimationFrame(() => summary.current?.focus()); return;
    }
    setErrors({});
    if (!enabled) { setStatus("error"); setMessage("O envio está indisponível nesta demonstração. Nenhuma mensagem foi enviada."); return; }
    if (!token) { setStatus("error"); setMessage("Conclua a verificação de segurança antes de enviar."); return; }
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(25000) });
      const result = await response.json();
      setStatus(response.ok ? "success" : "error"); setMessage(result.message || "Não foi possível confirmar o envio.");
      if(result.errors) setErrors(result.errors);
      if(response.ok) form.current?.reset();
    } catch { setStatus("error"); setMessage("Não foi possível confirmar o envio. Tente novamente mais tarde."); }
    finally { if(widgetId.current) window.turnstile?.reset(widgetId.current); setToken(""); }
  }
  return <form ref={form} className="contact-form" onSubmit={submit} noValidate aria-busy={status === "sending"}>
    {[["name","Seu nome","Como você prefere ser chamado?"],["email","E-mail","Seu e-mail para retorno"]].map(([name,label,placeholder]) => <div key={name} className="field"><label htmlFor={`contact-${name}`}>{label}</label><input id={`contact-${name}`} name={name} type={name === "email" ? "email" : "text"} autoComplete={name} placeholder={placeholder} required maxLength={name==="email"?254:100} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`${name}-error`:undefined}/>{errors[name]&&<p className="field-error" id={`${name}-error`}>{errors[name]![0]}</p>}</div>)}
    <div className="field"><label htmlFor="contact-message">Como podemos ajudar?</label><textarea id="contact-message" name="message" placeholder="Uma descrição breve e geral é suficiente." rows={3} maxLength={2000} required aria-invalid={!!errors.message} aria-describedby={`message-help${errors.message?" message-error":""}`}/><p id="message-help" className="form-note">Não inclua documentos, dados sensíveis ou detalhes de processos.</p>{errors.message&&<p className="field-error" id="message-error">{errors.message[0]}</p>}</div>
    <div className="honey" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="consent-label" htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent?"consent-error":undefined}/><span>Li o <Link href="/privacidade">aviso de privacidade</Link> e estou ciente do uso dos dados para resposta a este contato.</span></label>
    {errors.consent&&<p className="field-error" id="consent-error">{errors.consent[0]}</p>}
    {enabled&&<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={initWidget} onError={()=>{setStatus("error");setMessage("A verificação de segurança está indisponível.");}}/><div ref={widget} className="mt-6"/></>}
    <button className="send-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : enabled ? "Enviar mensagem" : "Validar mensagem"}{status === "sending" ? <LoaderCircle className="animate-spin" size={18} aria-hidden="true"/> : <ArrowUpRight size={19} aria-hidden="true"/>}</button>
    {!enabled&&<p className="form-note">Formulário demonstrativo: você pode verificar os campos, mas o envio ainda não está habilitado.</p>}
    <div aria-live="polite" aria-atomic="true">{message&&<div ref={summary} tabIndex={-1} className={`form-status ${status}`}>{message}{Object.entries(errors).some(([,value])=>value?.length)&&<ul>{Object.entries(errors).filter(([,value])=>value?.length).map(([key,value])=><li key={key}><a href={`#contact-${key}`}>{value![0]}</a></li>)}</ul>}</div>}</div>
  </form>;
}
