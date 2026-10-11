import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop scroll story, reverse scroll, anchors, articles and console", async ({page}) => {
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.setViewportSize({width:1440,height:900});await page.goto("/");
  await expect(page.locator("h1")).toContainText("Excelência jurídica");
  await expect(page.locator(".hero-photo img")).toBeVisible();
  await expect.poll(()=>page.locator(".pin-spacer").count()).toBe(3);
  await page.waitForTimeout(1300);
  await page.screenshot({path:"test-results/desktop-hero.png"});
  const original=await page.locator(".hero-photo").evaluate(el=>getComputedStyle(el).clipPath);
  await page.evaluate(()=>scrollTo(0,700));await page.waitForTimeout(900);
  const expanded=await page.locator(".hero-photo").evaluate(el=>getComputedStyle(el).clipPath);
  expect(expanded).not.toBe(original);
  await page.screenshot({path:"test-results/desktop-transition.png"});
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(900);
  expect(await page.locator(".hero-photo").evaluate(el=>getComputedStyle(el).clipPath)).toBe(original);
  await page.getByRole("navigation",{name:"Navegação principal"}).getByRole("link",{name:"O escritório"}).click();
  await expect(page).toHaveURL(/#escritorio/);await expect(page.locator("#about-title")).toBeInViewport();
  await page.screenshot({path:"test-results/desktop-about.png"});
  await page.evaluate(()=>{const el=document.querySelector("#atuacao")!;scrollTo(0,el.getBoundingClientRect().top+scrollY+1000);});await page.waitForTimeout(900);
  expect(await page.locator(".practice-track").evaluate(el=>getComputedStyle(el).transform)).not.toBe("none");
  await page.screenshot({path:"test-results/desktop-panels.png"});
  await page.locator(".practice-panel").last().getByRole("link").focus();
  await expect(page.locator(".practice-panel").last().getByRole("link")).toBeInViewport();
  await page.getByRole("link",{name:"Entre em contato",exact:true}).first().click();
  await expect(page.locator("#contact-title")).toBeInViewport();
  await page.locator("#conteudo").scrollIntoViewIfNeeded();
  await page.getByRole("link").filter({hasText:"O que organizar antes da primeira conversa"}).click();
  await expect(page.locator("h1")).toHaveText("O que organizar antes da primeira conversa");
  await page.getByRole("link",{name:"Voltar às leituras"}).click();
  await expect(page).toHaveURL(/#conteudo/);
  expect(errors).toEqual([]);
});

test("mobile menu keyboard behavior, links and form validation", async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto("/");await page.waitForTimeout(1200);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.screenshot({path:"test-results/mobile-hero.png",fullPage:true});
  await page.getByRole("button",{name:"Abrir menu"}).click();await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");await expect(page.getByRole("dialog")).not.toBeVisible();await expect(page.getByRole("button",{name:"Abrir menu"})).toBeFocused();
  await page.getByRole("button",{name:"Abrir menu"}).click();await page.getByRole("navigation",{name:"Navegação mobile"}).getByRole("link",{name:"Contato"}).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();await expect(page.locator("#contact-title")).toBeInViewport();
  await page.getByRole("button",{name:"Validar mensagem"}).click();await expect(page.locator("#name-error")).toBeVisible();await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator(".form-status")).toBeFocused();
  await page.getByLabel("Seu nome",{exact:true}).fill("Pessoa de Teste");await page.getByLabel("E-mail",{exact:true}).fill("test@example.com");await page.getByLabel("Como podemos ajudar?").fill("Uma mensagem fictícia de demonstração.");await page.locator("#contact-consent").check();
  await page.getByRole("button",{name:"Validar mensagem"}).click();await expect(page.locator(".form-status")).toContainText("Nenhuma mensagem foi enviada");
  await page.screenshot({path:"test-results/mobile-contact.png"});
  const accessible=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze();expect(accessible.violations).toEqual([]);
  const response=await page.request.post("/api/contact",{headers:{origin:"http://127.0.0.1:3000"},data:{name:"Pessoa de Teste",email:"test@example.com",message:"Mensagem fictícia para teste.",consent:true,website:""}});expect(response.status()).toBe(503);
});

test("responsive widths and viewport resizing",async({page})=>{
  await page.goto("/");
  for(const width of [375,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});await page.waitForTimeout(650);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`).toBe(true);}
  await page.setViewportSize({width:844,height:390});await page.waitForTimeout(700);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("mobile scroll animations reverse and respect reduced motion",async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto("/");await page.waitForTimeout(1100);
  const image=page.locator(".hero-photo img");
  const initial=await image.evaluate(el=>getComputedStyle(el).transform);
  await page.evaluate(()=>scrollTo(0,650));await page.waitForTimeout(800);
  expect(await image.evaluate(el=>getComputedStyle(el).transform)).not.toBe(initial);
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(800);
  expect(await image.evaluate(el=>getComputedStyle(el).transform)).toBe(initial);
  const panel=page.locator(".panel-copy").first();
  const before=await panel.evaluate(el=>getComputedStyle(el).transform);
  await page.locator(".practice-panel").first().scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  expect(await panel.evaluate(el=>getComputedStyle(el).transform)).not.toBe(before);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.emulateMedia({reducedMotion:"reduce"});await page.waitForTimeout(500);
  expect(await panel.evaluate(el=>getComputedStyle(el).transform)).toBe("none");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("reduced motion exposes all panels without pinning, accessible pages",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});await page.setViewportSize({width:1440,height:900});await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for(const panel of await page.locator(".practice-panel").all()){await panel.scrollIntoViewIfNeeded();await expect(panel).toBeInViewport();}
  await page.screenshot({path:"test-results/reduced-motion.png",fullPage:true});
  await page.evaluate(()=>scrollTo(0,0));
  const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze();expect(results.violations).toEqual([]);
  for(const path of ["/privacidade","/conteudo/primeira-conversa","/conteudo/comunicacao-clara","/conteudo/privacidade-no-atendimento"]){await page.goto(path);await expect(page.locator("h1")).toBeVisible();const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze();expect(result.violations).toEqual([]);}
  await page.goto("/pagina-inexistente");await expect(page.locator("h1")).toContainText("Um novo caminho");
});

test("SEO and security endpoints",async({request})=>{
  const robots=await request.get("/robots.txt");expect(robots.status()).toBe(200);expect(await robots.text()).toContain("Disallow: /");
  const sitemap=await request.get("/sitemap.xml");expect(sitemap.status()).toBe(200);expect(await sitemap.text()).toContain("/conteudo/primeira-conversa");
  const home=await request.get("/");expect(home.headers()["x-frame-options"]).toBe("DENY");expect(await home.text()).toContain("noindex");
  const rejected=await request.post("/api/contact",{headers:{origin:"https://evil.example"},data:{}});expect(rejected.status()).toBe(403);
});
