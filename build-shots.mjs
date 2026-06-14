/* 用本机 Chrome(headless)截图。开发版 index.html + 微信单文件版。
   先重建单文件版,确保 wechat 截图来自最新内容(避免截到旧单文件)。 */
import puppeteer from "puppeteer-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const root = dirname(fileURLToPath(import.meta.url));
/* 单文件版必须先于 wechat 截图重建 */
execSync("node build-inline.mjs", { cwd: root, stdio: "inherit" });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const indexURL = pathToFileURL(join(root, "index.html")).href;
const wechatURL = pathToFileURL(join(root, "dist/yan-ying-research-group-wechat-preview.html")).href;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars"],
});

async function shotSection(page, id, file, navH = 54) {
  await page.evaluate((sid, nh) => {
    const el = document.getElementById(sid);
    const y = el.getBoundingClientRect().top + window.pageYOffset - nh;
    window.scrollTo(0, Math.max(0, y));
  }, id, navH);
  await sleep(1500); // 等 reveal 动画 / 计数动画定格
  await page.screenshot({ path: join(root, file) });
  console.log("shot", file);
}

/* ---- 桌面端 1440 宽 ---- */
const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await desktop.goto(indexURL, { waitUntil: "networkidle0" });
await sleep(1200);

// Hero(置顶)
await desktop.evaluate(() => window.scrollTo(0, 0));
await sleep(800);
await desktop.screenshot({ path: join(root, "screenshot-hero.png") });
console.log("shot screenshot-hero.png");

await shotSection(desktop, "about", "screenshot-about.png");
await shotSection(desktop, "research", "screenshot-research.png");
await shotSection(desktop, "team", "screenshot-team.png");
await shotSection(desktop, "achievements", "screenshot-achievements.png");
await shotSection(desktop, "publications", "screenshot-publications.png");
await shotSection(desktop, "admission", "screenshot-admission.png");
await shotSection(desktop, "contact", "screenshot-contact-or-final-section.png");

/* ---- 移动端 Hero ---- */
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await mobile.goto(indexURL, { waitUntil: "networkidle0" });
await sleep(1200);
await mobile.evaluate(() => window.scrollTo(0, 0));
await sleep(600);
await mobile.screenshot({ path: join(root, "screenshot-mobile-hero.png") });
console.log("shot screenshot-mobile-hero.png");

/* ---- 微信单文件版预览(桌面宽,整页顶部)---- */
const wechat = await browser.newPage();
await wechat.setViewport({ width: 1280, height: 860, deviceScaleFactor: 1 });
await wechat.goto(wechatURL, { waitUntil: "networkidle0" });
await sleep(1500);
await wechat.evaluate(() => window.scrollTo(0, 0));
await sleep(500);
await wechat.screenshot({ path: join(root, "dist/screenshot-wechat-preview.png") });
console.log("shot dist/screenshot-wechat-preview.png");

await browser.close();
console.log("done");
