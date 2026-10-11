import { contactSchema } from "./contact-schema.ts";
type Environment = Record<string, string | undefined>;
export function contactConfigured(env: Environment = process.env) {
  return Boolean(env.RESEND_API_KEY && env.CONTACT_FROM && env.CONTACT_TO && env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export function createContactHandler(env: Environment = process.env, requestFetch: typeof fetch = fetch) {
  return async function handle(request: Request) {
    const respond = (message: string, status: number) => Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
    const origin = request.headers.get("origin");
    const allowedOrigin = new URL(env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000").origin;
    if (!origin || origin !== allowedOrigin) return respond("Origem da solicitação não autorizada.", 403);
    if (!request.headers.get("content-type")?.includes("application/json")) return respond("Formato não suportado.", 415);
    // Read a bounded stream so a missing or forged Content-Length cannot bypass limits.
    const reader = request.body?.getReader();
    if (!reader) return respond("Solicitação vazia.", 400);
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 16384) { await reader.cancel(); return respond("Mensagem muito longa.", 413); }
        chunks.push(value);
      }
    } catch { return respond("Não foi possível ler a solicitação.", 400); }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    let raw: unknown;
    try { raw = JSON.parse(new TextDecoder().decode(body)); } catch { return respond("Solicitação inválida.", 400); }
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) return Response.json({ message: "Verifique os campos indicados.", errors: parsed.error.flatten().fieldErrors }, { status: 422, headers: { "Cache-Control": "no-store" } });
    if (!contactConfigured(env)) return respond("O canal de envio ainda não está disponível. Nenhuma mensagem foi enviada.", 503);
    const data = parsed.data;
    if (!data.token) return respond("Conclua a verificação de segurança.", 422);
    try {
      const verification = await requestFetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!, response: data.token }), signal: AbortSignal.timeout(8000),
      });
      if (!verification.ok) return respond("A verificação de segurança está indisponível. Tente novamente.", 502);
      const verified: { success?: boolean; hostname?: string; action?: string } = await verification.json();
      if (!verified.success || verified.hostname !== new URL(allowedOrigin).hostname || verified.action !== "contact") return respond("A verificação expirou ou não é válida. Tente novamente.", 403);
      const delivery = await requestFetch("https://api.resend.com/emails", { method: "POST", headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${await tokenDigest(data.token)}`,
      }, body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: data.email,
        subject: "Novo contato pelo website", text: `Nome: ${data.name}\nE-mail: ${data.email}\n\n${data.message}\n\nAviso de privacidade confirmado no formulário.`,
      }), signal: AbortSignal.timeout(10000) });
      if (!delivery.ok) return respond("Não foi possível enviar agora. Tente novamente mais tarde.", 502);
      const result: { id?: string } = await delivery.json();
      if (!result.id) return respond("O serviço não confirmou o envio. Tente novamente mais tarde.", 502);
      return respond("Mensagem encaminhada. Obrigado pelo contato.", 200);
    } catch { return respond("O serviço de envio está temporariamente indisponível. Tente novamente mais tarde.", 502); }
  };
}
async function tokenDigest(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}
