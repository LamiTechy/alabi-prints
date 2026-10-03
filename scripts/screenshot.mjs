/**
 * Boots the production server in-process and captures full-page screenshots
 * with headless Chrome (CDP device metrics → exact viewport width).
 * Usage: node scripts/screenshot.mjs        → .next/shots/*.png
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { createServer } from "node:http";
import next from "next";

const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = Number(process.env.SMOKE_PORT ?? 3112);
const OUT = path.join(process.cwd(), ".next", "shots");
mkdirSync(OUT, { recursive: true });

const app = next({ dev: false, dir: process.cwd() });
await app.prepare();
const handle = app.getRequestHandler();
const server = createServer((req, res) => handle(req, res));
await new Promise((resolve) => server.listen(PORT, resolve));
const base = `http://127.0.0.1:${PORT}`;

const shots = [
  { name: "home-desktop", path: "/", w: 1440, h: 3400 },
  { name: "home-mobile", path: "/", w: 390, h: 3600, mobile: true },
  { name: "services-desktop", path: "/services", w: 1440, h: 3400 },
  { name: "service-detail-mobile", path: "/services/tshirts-apparel", w: 390, h: 3200, mobile: true },
  { name: "portfolio-desktop", path: "/portfolio", w: 1440, h: 2600 },
  { name: "how-it-works-desktop", path: "/how-it-works", w: 1440, h: 3600 },
  { name: "about-desktop", path: "/about", w: 1440, h: 3000 },
  { name: "contact-desktop", path: "/contact", w: 1440, h: 3000 },
  { name: "contact-mobile", path: "/contact", w: 390, h: 3600, mobile: true },
  { name: "admin-login-desktop", path: "/admin/login", w: 1440, h: 1200 },
  { name: "notfound-desktop", path: "/nope", w: 1440, h: 1600 },
];

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--remote-debugging-port=9224",
    `--user-data-dir=${process.cwd()}\\.next\\chrome-profile2`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let list;
for (let i = 0; i < 40; i++) {
  await sleep(500);
  try {
    const res = await fetch("http://127.0.0.1:9224/json");
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

await new Promise((resolve) => (ws.onopen = resolve));
await send("Page.enable");
await send("Runtime.enable");

for (const shot of shots) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: shot.w,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: Boolean(shot.mobile),
  });
  await send("Page.navigate", { url: `${base}${shot.path}` });
  await sleep(2800);
  const heightRes = await send("Runtime.evaluate", {
    expression: "Math.min(document.documentElement.scrollHeight || 1000, 9000)",
    returnByValue: true,
  });
  const height = heightRes.result?.result?.value ?? shot.h;
  await send("Emulation.setDeviceMetricsOverride", {
    width: shot.w,
    height,
    deviceScaleFactor: 1,
    mobile: Boolean(shot.mobile),
  });
  await sleep(600);
  const res = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: shot.w, height, scale: 1 },
  });
  if (res.result?.data) {
    writeFileSync(path.join(OUT, `${shot.name}.png`), Buffer.from(res.result.data, "base64"));
    console.log(`shot: ${shot.name} (${shot.w}x${height})`);
  } else {
    console.log(`FAIL shot: ${shot.name} ${JSON.stringify(res).slice(0, 200)}`);
  }
}

ws.close();
chrome.kill();
server.close();
process.exit(0);
