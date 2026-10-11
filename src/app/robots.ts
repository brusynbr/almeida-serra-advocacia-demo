import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",...(site.demo?{disallow:"/"}:{allow:"/",disallow:"/api/"})},sitemap:`${site.url}/sitemap.xml`};}
