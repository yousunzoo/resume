// Drive Chrome via CDP (Node 23 built-in WebSocket) to render the LIVE desktop
// page as a single continuous PDF at desktop width using SCREEN media, so the
// output matches the PC screen exactly (lg: two-column layout, real colors).
import fs from "node:fs";

const DBG = "http://localhost:9222";
const OUT = process.argv[2] || "이력서_유선주.pdf";
const WIDTH_PX = 1280;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Find the page target that has our URL loaded.
async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`${DBG}/json`)).json();
      const t = list.find((x) => x.type === "page" && x.url.includes("localhost:7070"));
      if (t?.webSocketDebuggerUrl) return t.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("no debuggable page target found");
}

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH_PX, height: 1200, deviceScaleFactor: 2, mobile: false,
});
// Reload so layout settles at the desktop width, then wait for network/fonts.
await send("Page.reload", { ignoreCache: false });
await sleep(3500);

// Hide dev-only / screen-only chrome (no-print links, Next.js dev badge) so the
// SCREEN-media render is clean, then measure full content height at desktop width.
const { result } = await send("Runtime.evaluate", {
  expression: `(() => {
    const s = document.createElement('style');
    s.textContent = \`
      .no-print { display: none !important; }
      section[aria-labelledby="proj-title"] { display: none !important; }
      nextjs-portal, [data-next-badge-root], [data-nextjs-dev-tools-button],
      #__next-build-watcher, [data-nextjs-toast] { display: none !important; }
    \`;
    document.head.appendChild(s);
    return Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  })()`,
  returnByValue: true,
});
const heightPx = result.value;
console.log("desktop width:", WIDTH_PX, "px · full height:", heightPx, "px");

// Render with SCREEN media => exact PC-screen appearance (not print stylesheet).
await send("Emulation.setEmulatedMedia", { media: "screen" });

const pdf = await send("Page.printToPDF", {
  printBackground: true,
  preferCSSPageSize: false,
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  scale: 1,
  paperWidth: WIDTH_PX / 96,
  paperHeight: (heightPx + 96) / 96, // safety buffer so nothing spills to a 2nd page
});

fs.writeFileSync(OUT, Buffer.from(pdf.data, "base64"));
console.log("wrote", OUT);
ws.close();
process.exit(0);
