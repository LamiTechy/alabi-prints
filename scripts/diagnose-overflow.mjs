/**
 * Launches headless Chrome, emulates a 390px mobile viewport and reports
 * elements that overflow horizontally.  Usage: node scripts/diagnose-overflow.mjs [path]
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = Number(process.env.SMOKE_PORT ?? 3113);
const route = process.argv[2] ?? "/";

const { createServer } = await import("node:http");
const { default: next } = await import("next");

const app = next({ dev: false, dir: process.cwd() });
await app.prepare();
const handle = app.getRequestHandler();
const server = createServer((req, res) => handle(req, res));
await new Promise((resolve) => server.listen(PORT, resolve));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--remote-debugging-port=9223",
    "--user-data-dir=" + process.cwd() + "\\.next\\chrome-profile",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let list;
for (let i = 0; i < 40; i++) {
  await sleep(500);
  try {
    const res = await fetch("http://127.0.0.1:9223/json");
    list = await res.json();
    if (list.length) break;
  } catch {
    /* retry */
  }
}

const target = list?.find((t) => t.type === "page");
if (!target) {
  console.error("no chrome target");
  chrome.kill();
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await new Promise((resolve) => ws.onopen = resolve);

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Page.enable");
await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${route}` });
await sleep(3500);

const evalRes = await send("Runtime.evaluate", {
  expression: `(() => {
    const docW = document.documentElement.clientWidth;
    const scrollW = document.documentElement.scrollWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .map(el => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, cls: (el.getAttribute('class') || '').slice(0, 90), right: Math.round(r.right), w: Math.round(r.width) };
      })
      .filter(x => x.right > docW + 1 || x.w > docW + 1)
      .slice(0, 25);
    return JSON.stringify({ docW, scrollW, offenders }, null, 1);
  })()`,
  returnByValue: true,
});

console.log(`route=${route}`);
console.log(evalRes.result?.value ?? JSON.stringify(evalRes));

ws.close();
chrome.kill();
server.close();
process.exit(0);
