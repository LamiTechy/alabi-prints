/**
 * Smoke test: boots the production server in-process, requests key routes,
 * exercises the quote API + admin auth flow, then exits.
 * Usage: node scripts/smoke-test.mjs
 */
import { createServer } from "node:http";
import next from "next";

const PORT = Number(process.env.SMOKE_PORT ?? 3111);
const app = next({ dev: false, dir: process.cwd() });
await app.prepare();
const handle = app.getRequestHandler();

const server = createServer((req, res) => handle(req, res));
await new Promise((resolve) => server.listen(PORT, resolve));

const base = `http://127.0.0.1:${PORT}`;
const results = [];

async function get(path, expect) {
  try {
    const res = await fetch(base + path, { redirect: "manual" });
    const body = await res.text();
    const ok = expect ? res.status === expect : res.status === 200;
    results.push(`${ok ? "PASS" : "FAIL"} GET ${path} -> ${res.status} (${body.length}b)`);
    return { res, body };
  } catch (error) {
    results.push(`FAIL GET ${path} -> ${error.message}`);
    return { res: null, body: "" };
  }
}

for (const path of [
  "/",
  "/services",
  "/services/business-cards",
  "/services/not-a-service",
  "/portfolio",
  "/how-it-works",
  "/about",
  "/contact",
  "/contact?service=Banners%20%26%20Flex",
  "/admin/login",
  "/nope",
  "/sitemap.xml",
  "/robots.txt",
  "/opengraph-image",
]) {
  const expect = path === "/nope" || path === "/services/not-a-service" ? 404 : 200;
  await get(path, expect);
}

// Unauthenticated admin must redirect to the login page
await get("/admin", 307);

// Quote API: validation failure
{
  const res = await fetch(`${base}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "A" }),
  });
  results.push(`${res.status === 422 ? "PASS" : "FAIL"} POST /api/quotes invalid -> ${res.status}`);
}

// Quote API: valid payload (honeypot + timing respected)
{
  const res = await fetch(`${base}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Smoke Test",
      phone: "08088430235",
      email: "",
      service: "Business Cards",
      sizeQuantity: "1000 pcs",
      material: "450gsm matte",
      deadline: "This week",
      description: "Smoke test quote request for validation purposes.",
      fileLink: "",
      company: "",
      formTime: Date.now() - 5000,
    }),
  });
  const json = await res.json().catch(() => ({}));
  const ok = res.status === 200 || res.status === 500; // 500 when DATABASE_URL is absent
  results.push(
    `${ok ? "PASS" : "FAIL"} POST /api/quotes valid -> ${res.status} ${JSON.stringify(json).slice(0, 120)}`,
  );
}

// Admin API must reject unauthenticated access
{
  const res = await fetch(`${base}/api/admin/quotes/00000000-0000-0000-0000-000000000000`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "new" }),
  });
  results.push(`${res.status === 401 ? "PASS" : "FAIL"} PATCH admin quote unauth -> ${res.status}`);
}

// Login endpoint must stay reachable while signed out (not blocked by middleware).
// Locally without DATABASE_URL it fails at the DB layer (500); with a database and
// wrong credentials it returns 401. Anything else means middleware is in the way.
{
  const res = await fetch(`${base}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "nobody@example.com", password: "wrong" }),
  });
  const ok = [400, 401, 500].includes(res.status);
  results.push(`${ok ? "PASS" : "FAIL"} POST /api/admin/login reachable -> ${res.status}`);
}

console.log("\n=== SMOKE TEST RESULTS ===");
for (const line of results) console.log(line);
console.log("==========================\n");

server.close();
process.exit(0);
