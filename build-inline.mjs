/* 构建微信单文件版:内联 CSS + JS,并把老师照片与成员照片转 base64 内嵌。
   生成 dist/yan-ying-research-group-wechat-preview.html
   单独发微信打开不丢样式、不丢照片。 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(root, "css/style.css"), "utf8");
let js = readFileSync(join(root, "js/script.js"), "utf8");
let html = readFileSync(join(root, "index.html"), "utf8");

function dataURI(absPath, mime) {
  const b64 = readFileSync(absPath).toString("base64");
  return `data:${mime};base64,${b64}`;
}

/* 1) 成员照片:把 JS 里所有 assets/members/<name>.jpg 替换成 base64 */
const membersDir = join(root, "assets/members");
for (const f of readdirSync(membersDir)) {
  if (!/\.(jpg|jpeg|png)$/i.test(f)) continue;
  const mime = /\.png$/i.test(f) ? "image/png" : "image/jpeg";
  const uri = dataURI(join(membersDir, f), mime);
  // 替换 JS 字符串里出现的相对路径(中文文件名,做字面替换)
  js = js.split(`assets/members/${f}`).join(uri);
}

/* 2) 老师照片:HTML(About 大图)与 JS(Team 导师圆形头像)里的 assets/yan-ying-portrait.png -> base64 */
const portraitURI = dataURI(join(root, "assets/yan-ying-portrait.png"), "image/png");
html = html.split("assets/yan-ying-portrait.png").join(portraitURI);
js = js.split("assets/yan-ying-portrait.png").join(portraitURI);

/* 3) 内联 CSS:把 <link rel=stylesheet> 换成 <style>
      用函数式替换,避免替换串里的 $$ 被 String.replace 当成特殊符号($$ -> $) */
html = html.replace(
  /<link rel="stylesheet" href="css\/style\.css"\s*\/>/,
  () => `<style>\n${css}\n</style>`
);

/* 4) 内联 JS:把 <script src> 换成内联脚本(同样用函数式替换,保护 JS 里的 $$) */
html = html.replace(
  /<script src="js\/script\.js"><\/script>/,
  () => `<script>\n${js}\n</script>`
);

/* 5) 写出(带 BOM,微信/部分编辑器更稳) */
const out = join(root, "dist/yan-ying-research-group-wechat-preview.html");
writeFileSync(out, "﻿" + html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log(`built ${out} (${kb} KB)`);
console.log(`inlined photos: portrait + ${readdirSync(membersDir).filter(f=>/\.(jpg|jpeg|png)$/i.test(f)).length} members`);
