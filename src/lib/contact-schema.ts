import { z } from "zod";

// Avoid dynamic code generation so validation works with the site's CSP.
z.config({ jitless: true });
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(100, "Use até 100 caracteres."),
  email: z.email("Informe um e-mail válido.").max(254),
  message: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(2000, "Use até 2.000 caracteres."),
  consent: z.literal(true, { error: "Confirme a leitura do aviso de privacidade." }),
  website: z.string().max(0, "Não foi possível validar a solicitação."),
  token: z.string().max(2048).optional(),
});
