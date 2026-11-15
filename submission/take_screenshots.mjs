import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = '/Volumes/DiskD/HACKATHONS/Hackathons 2.0 Nov 2026/Crew-ops/submission/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

const userDataDir = join(tmpdir(), 'chrome-ss-' + Date.now());

const chromeProc = spawn(CHROME, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  `--user-data-dir=${userDataDir}`,
  '--window-size=1600,1050',
  'about:blank'
]);

// Wait for Chrome remote debugging port to open
async function waitPort() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) return await res.json();
    } catch (e) {}
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error('Chrome failed to start on 9222');
}

const vInfo = await waitPort();
console.log('Chrome started with debugger:', vInfo.webSocketDebuggerUrl);

// Create a new tab or use existing
let wsUrl;
try {
  const newTabRes = await fetch('http://127.0.0.1:9222/json/new?http://localhost:3000', { method: 'PUT' });
  const tabInfo = await newTabRes.json();
  wsUrl = tabInfo.webSocketDebuggerUrl;
} catch (e) {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const list = await listRes.json();
  wsUrl = list[0].webSocketDebuggerUrl;
}

const ws = new WebSocket(wsUrl);

let idCounter = 1;
const pending = new Map();

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(msg.error);
    else resolve(msg.result);
  }
};

await new Promise((resolve) => {
  ws.onopen = resolve;
});

function send(method, params = {}) {
  const id = idCounter++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

// Enable Page and Runtime
await send('Page.enable');
await send('Runtime.enable');

console.log('Navigating to http://localhost:3000...');
await send('Page.navigate', { url: 'http://localhost:3000' });

// Wait 4 seconds for full load and data fetching
console.log('Waiting for load and data hydration...');
await new Promise(r => setTimeout(r, 4000));

async function capture(name) {
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  const buf = Buffer.from(ss.data, 'base64');
  const path = join(OUT_DIR, `screenshot_${name}.png`);
  writeFileSync(path, buf);
  console.log(`Saved screenshot_${name}.png (${buf.length} bytes)`);
}

// 1. Console View
console.log('Capturing console...');
await capture('console');

// 2. Flights Timeline View
console.log('Switching to flights view...');
await send('Runtime.evaluate', { expression: `switchOCCView('flights');` });
await new Promise(r => setTimeout(r, 1500));
await capture('flights');

// 3. 72h Predictive Disruption Radar (Intelligence)
console.log('Switching to intelligence view...');
await send('Runtime.evaluate', { expression: `switchOCCView('intelligence');` });
await new Promise(r => setTimeout(r, 1500));
await capture('intelligence');

// 4. Crew & Reserves Roster
console.log('Switching to roster view...');
await send('Runtime.evaluate', { expression: `switchOCCView('roster');` });
await new Promise(r => setTimeout(r, 1500));
await capture('roster');

// 5. Admin Policy Console
console.log('Switching to admin view...');
await send('Runtime.evaluate', { expression: `switchOCCView('admin');` });
await new Promise(r => setTimeout(r, 1500));
await capture('admin');

// Close browser
ws.close();
chromeProc.kill('SIGTERM');
console.log('All screenshots captured successfully!');
