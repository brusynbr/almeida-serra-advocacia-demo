import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const editorial = localFont({ src: "../fonts/cormorant-latin.woff2", variable: "--font-editorial", display: "swap" });
const sans = localFont({ src: "../fonts/dm-sans-latin.woff2", variable: "--font-sans", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Almeida & Serra — Advocacia | Proposta demonstrativa", template: "%s | Almeida & Serra" },
  description: "Proposta demonstrativa de uma experiência institucional de advocacia. Conhecimento técnico, ética e comunicação clara.",
  robots: { index: !site.demo, follow: !site.demo },
  openGraph: { title: "Almeida & Serra — Advocacia", description: "Excelência jurídica em cada decisão. Identidade demonstrativa.", locale: "pt_BR", type: "website", images: [{ url: "/images/architecture.webp", width: 1536, height: 1024 }] },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${editorial.variable} ${sans.variable}`}>
    <a className="skip-link" href="#conteudo-principal">Ir para o conteúdo</a>
    <Header />{children}<Footer />
  </body></html>;
}
