import { test } from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../src/lib/contact.ts";

const valid = { name: "Pessoa de Teste", email: "test@example.com", message: "Mensagem fictícia para verificar o fluxo.", consent: true, website: "", token: "test-token" };
const env = { NEXT_PUBLIC_SITE_URL: "https://example.com", RESEND_API_KEY: "test-only", CONTACT_FROM: "Test <test@example.com>", CONTACT_TO: "test@example.com", TURNSTILE_SECRET_KEY: "test-only", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-only" };
function request(data: unknown = valid, origin = "https://example.com") { return new Request("https://example.com/api/contact", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(data) }); }
test("rejects cross-origin requests", async () => { assert.equal((await createContactHandler(env)(request(valid,"https://evil.example"))).status,403); });
test("rejects malformed data and missing privacy acknowledgement", async () => { assert.equal((await createContactHandler(env)(request({...valid,email:"invalid",consent:false}))).status,422); });
test("rejects honeypot without claiming message delivery", async () => { assert.equal((await createContactHandler(env)(request({...valid,website:"spam.example"}))).status,422); });
test("bounds request body even without Content-Length", async () => { assert.equal((await createContactHandler(env)(request({...valid,message:"a".repeat(17000)}))).status,413); });
test("returns unavailable when credentials are absent", async () => { assert.equal((await createContactHandler({NEXT_PUBLIC_SITE_URL:env.NEXT_PUBLIC_SITE_URL})(request())).status,503); });
test("does not send mail on invalid Turnstile response", async () => { let count=0;const mock:typeof fetch=async()=>{count++;return Response.json({success:false});};assert.equal((await createContactHandler(env,mock)(request())).status,403);assert.equal(count,1); });
test("rejects Turnstile tokens from another hostname or action", async()=>{const mock:typeof fetch=async()=>Response.json({success:true,hostname:"evil.example",action:"contact"});assert.equal((await createContactHandler(env,mock)(request())).status,403);});
test("reports a provider failure as an error",async()=>{let count=0;const mock:typeof fetch=async()=>++count===1?Response.json({success:true,hostname:"example.com",action:"contact"}):new Response(null,{status:500});assert.equal((await createContactHandler(env,mock)(request())).status,502);});
test("confirms success only after provider returns an email id (mocked)", async()=>{let count=0;let deliveryBody="";const mock:typeof fetch=async(_url,options)=>{count++;if(count===1)return Response.json({success:true,hostname:"example.com",action:"contact"});deliveryBody=String(options?.body);return Response.json({id:"mock-email-id"});};const response=await createContactHandler(env,mock)(request());assert.equal(response.status,200);assert.equal(count,2);assert.equal(JSON.parse(deliveryBody).reply_to,valid.email);assert.match(JSON.parse(deliveryBody).text,/Pessoa de Teste/);});
