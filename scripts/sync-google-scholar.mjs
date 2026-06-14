/* =========================================================================
   Google Scholar 数据同步脚本(SerpAPI google_scholar_author 引擎)

   产物(原子写入,失败不破坏旧文件):
     data/google-scholar-stats.json  引用数 / h-index / i10-index
     data/papers.json                论文列表(按发表时间排序,最多 MAX_PAPERS 篇)

   环境变量:
     SERPAPI_KEY        SerpAPI 密钥(只从环境变量 / GitHub Secrets 读取,
                        绝不写入任何产物文件,绝不打印到日志)
     GOOGLE_SCHOLAR_ID  Scholar 作者 ID,缺省回退 lkDrRmoAAAAJ(严颖老师)

   用法:
     node scripts/sync-google-scholar.mjs           真实同步(需 SERPAPI_KEY)
     node scripts/sync-google-scholar.mjs --mock    用内置 fixture 验证全流程,不发网络请求
     node scripts/sync-google-scholar.mjs --dry-run 只打印将写入的 JSON,不落盘(可与 --mock 连用)
     node scripts/sync-google-scholar.mjs --init    写入空占位 JSON(status: pending),用于初始化 / 重置
   ========================================================================= */

import { writeFileSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "data");
const STATS_FILE = join(DATA_DIR, "google-scholar-stats.json");
const PAPERS_FILE = join(DATA_DIR, "papers.json");
const MAX_PAPERS = 20;

const SCHOLAR_ID = process.env.GOOGLE_SCHOLAR_ID || "lkDrRmoAAAAJ";
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=zh-CN`;

const args = new Set(process.argv.slice(2));
const MOCK = args.has("--mock");
const DRY_RUN = args.has("--dry-run");
const INIT = args.has("--init");

/* ---------- 工具 ---------- */

/* 先写临时文件再 rename,避免写一半进程被杀导致 JSON 残废 */
function atomicWriteJSON(file, obj) {
  const text = JSON.stringify(obj, null, 2) + "\n";
  if (DRY_RUN) {
    console.log(`[dry-run] 将写入 ${file}:\n${text}`);
    return;
  }
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const tmp = file + ".tmp";
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, file);
  console.log(`已写入 ${file}`);
}

/* 任何要进日志的文本先脱敏:即使第三方响应里意外回显了 key 也不外泄 */
function redact(text) {
  let out = String(text);
  if (process.env.SERPAPI_KEY) out = out.split(process.env.SERPAPI_KEY).join("[REDACTED]");
  return out.replace(/api_key=[^&\s"']+/gi, "api_key=[REDACTED]");
}

function toIntOrNull(v) {
  const n = typeof v === "string" ? parseInt(v, 10) : v;
  return Number.isFinite(n) ? n : null;
}

/* ---------- 解析 SerpAPI 响应(字段全部按可缺失处理,不编造数据) ---------- */

/* cited_by.table 形如 [{citations:{all,since_2019}},{h_index:{...}},{i10_index:{...}}];
   行顺序与 since 年份(since_2019/since_2020…)都不假设固定 */
function parseMetrics(payload) {
  const metrics = {
    citations_all: null, citations_since_2019: null,
    h_index_all: null, h_index_since_2019: null,
    i10_index_all: null, i10_index_since_2019: null
  };
  const table = payload?.cited_by?.table;
  if (!Array.isArray(table)) return metrics;
  for (const row of table) {
    if (!row || typeof row !== "object") continue;
    for (const [key, val] of Object.entries(row)) {
      if (!val || typeof val !== "object") continue;
      const base = key === "citations" ? "citations"
        : key === "h_index" ? "h_index"
        : key === "i10_index" ? "i10_index" : null;
      if (!base) continue;
      metrics[`${base}_all`] = toIntOrNull(val.all);
      const sinceKey = Object.keys(val).find(k => k.startsWith("since_"));
      if (sinceKey) metrics[`${base}_since_2019`] = toIntOrNull(val[sinceKey]);
    }
  }
  return metrics;
}

function parsePapers(payload) {
  const articles = Array.isArray(payload?.articles) ? payload.articles : [];
  return articles.slice(0, MAX_PAPERS).map((a, i) => ({
    title: typeof a?.title === "string" ? a.title : "",
    authors: typeof a?.authors === "string" ? a.authors : "",
    year: a?.year != null ? String(a.year) : "",
    venue: typeof a?.publication === "string" ? a.publication : "",
    citations: toIntOrNull(a?.cited_by?.value),
    link: typeof a?.link === "string" && /^https?:\/\//.test(a.link) ? a.link : SCHOLAR_URL,
    source: "google_scholar",
    rank: i + 1
  })).filter(p => p.title);
}

/* ---------- 内置 mock fixture(结构对齐 SerpAPI google_scholar_author 真实响应) ---------- */

const MOCK_PAYLOAD = {
  author: { name: "Mock Author", affiliations: "Mock University" },
  cited_by: {
    table: [
      { citations: { all: 321, since_2019: 280 } },
      { h_index: { all: 10, since_2019: 9 } },
      { i10_index: { all: 11, since_2019: 10 } }
    ]
  },
  articles: [
    {
      title: "Mock Paper A: adaptive polynomial network for fault diagnosis",
      authors: "M Author, B Coauthor",
      publication: "Mock Journal of Testing 12 (3), 45-67, 2026",
      year: "2026",
      cited_by: { value: 8 },
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=MOCK"
    },
    {
      title: "Mock Paper B: interpretable EEG detection",
      authors: "M Author, C Coauthor",
      publication: "Mock Transactions 7 (1), 1-15, 2025",
      year: "2025",
      cited_by: { value: 21 },
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=MOCK2"
    }
  ]
};

/* ---------- 获取数据 ---------- */

async function fetchFromSerpAPI() {
  const key = process.env.SERPAPI_KEY;
  if (!key) {
    console.error(
      "缺少 SERPAPI_KEY 环境变量,无法真实同步。\n" +
      "  - 本地验证流程:node scripts/sync-google-scholar.mjs --mock\n" +
      "  - 真实同步:在 GitHub 仓库 Settings → Secrets → Actions 配置 SERPAPI_KEY(可选 GOOGLE_SCHOLAR_ID),\n" +
      "    或本地设置环境变量后重跑。现有 data/*.json 未被修改。"
    );
    process.exit(1);
  }
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_scholar_author");
  url.searchParams.set("author_id", SCHOLAR_ID);
  url.searchParams.set("hl", "zh-CN");
  url.searchParams.set("sort", "pubdate");
  url.searchParams.set("num", String(MAX_PAPERS));
  url.searchParams.set("api_key", key);

  console.log(`请求 SerpAPI google_scholar_author,author_id=${SCHOLAR_ID} ...`);
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`SerpAPI HTTP ${res.status}:${redact(body).slice(0, 500)}`);
  }
  let payload;
  try { payload = JSON.parse(body); }
  catch { throw new Error(`SerpAPI 返回非 JSON:${redact(body).slice(0, 300)}`); }
  if (payload.error) throw new Error(`SerpAPI 业务错误:${redact(payload.error)}`);
  return payload;
}

/* ---------- 组装产物 ---------- */

function buildOutputs(payload, source) {
  const syncedAt = new Date().toISOString();
  const common = {
    status: "ok",
    source,
    scholar_id: SCHOLAR_ID,
    scholar_url: SCHOLAR_URL,
    synced_at: syncedAt
  };
  return {
    stats: { ...common, metrics: parseMetrics(payload) },
    papers: { ...common, papers: parsePapers(payload) }
  };
}

function buildPlaceholders() {
  const common = {
    status: "pending",
    source: "placeholder",
    scholar_id: SCHOLAR_ID,
    scholar_url: SCHOLAR_URL,
    synced_at: null
  };
  return {
    stats: {
      ...common,
      metrics: {
        citations_all: null, citations_since_2019: null,
        h_index_all: null, h_index_since_2019: null,
        i10_index_all: null, i10_index_since_2019: null
      }
    },
    papers: { ...common, papers: [] }
  };
}

/* ---------- 主流程 ---------- */

async function main() {
  let outputs;
  if (INIT) {
    console.log("初始化占位 JSON(status: pending,前端会自动回退静态数据)...");
    outputs = buildPlaceholders();
  } else if (MOCK) {
    console.log("mock 模式:使用内置 fixture,不发任何网络请求,产物 source 标记为 mock_fixture。");
    outputs = buildOutputs(MOCK_PAYLOAD, "mock_fixture");
  } else {
    const payload = await fetchFromSerpAPI();
    outputs = buildOutputs(payload, "serpapi_google_scholar_author");
    const m = outputs.stats.metrics;
    console.log(`解析结果:citations=${m.citations_all} h-index=${m.h_index_all} i10-index=${m.i10_index_all} papers=${outputs.papers.papers.length}`);
    if (m.citations_all === null && outputs.papers.papers.length === 0) {
      /* 关键字段全空说明返回结构和预期不一致:保留响应顶层键名进日志便于排查,不写坏旧文件 */
      throw new Error(`SerpAPI 响应解析为空,响应顶层字段:${redact(Object.keys(payload || {}).join(", "))}`);
    }
  }
  atomicWriteJSON(STATS_FILE, outputs.stats);
  atomicWriteJSON(PAPERS_FILE, outputs.papers);
  console.log("完成。");
}

main().catch(err => {
  console.error(`同步失败:${redact(err?.message || err)}`);
  console.error("现有 data/*.json 未被修改。");
  process.exit(1);
});
