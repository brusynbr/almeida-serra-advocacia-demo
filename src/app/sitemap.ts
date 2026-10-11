import type { MetadataRoute } from "next";
import { articles, site } from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap{return ["","/privacidade",...articles.map(a=>`/conteudo/${a.slug}`)].map(path=>({url:`${site.url}${path}`,changeFrequency:"monthly",priority:path?0.5:1}));}
