# Google Scholar 自动同步管线说明

## 这个功能做了什么

把严颖老师 Google Scholar 作者页的公开数据(总被引、h-index、i10-index、论文列表)定期同步成本仓库里的两个 JSON 文件,网页前端读取 JSON 自动展示,并显示最近同步时间:

```
GitHub Actions 定时任务(每周)
  → 调用 SerpAPI(google_scholar_author 引擎)
  → scripts/sync-google-scholar.mjs 解析、生成
  → data/google-scholar-stats.json + data/papers.json
  → 有变化自动 commit 回仓库
  → 部署版网页 fetch 这两个 JSON 渲染;失败自动回退静态数据
```

## 这个功能不是什么

- **不是**把网站"绑定"到 Google Scholar,也**不是** Google 官方的自动推送 —— Google Scholar 没有官方 API。
- **不是**实时更新:数据按 Actions 定时频率刷新(当前每周一次),两次同步之间是静态的。
- 单文件预览版(`dist/yan-ying-research-group-wechat-preview.html`)**没有**自动更新能力,只是构建时刻的静态快照。

## 数据来源

SerpAPI 的 `google_scholar_author` 引擎(<https://serpapi.com/google-scholar-author-api>),抓取的是 Scholar 作者公开页。免费账号每月 100 次搜索额度,每周同步一次绰绰有余。

目标 Scholar 主页:<https://scholar.google.com/citations?user=lkDrRmoAAAAJ&hl=zh-CN>

## 需要配置的 GitHub Secrets

仓库 Settings → Secrets and variables → Actions → New repository secret:

| Secret | 是否必须 | 说明 |
|---|---|---|
| `SERPAPI_KEY` | 必须 | serpapi.com 注册后在 Dashboard 拿到的 API key |
| `GOOGLE_SCHOLAR_ID` | 可选 | Scholar 作者 ID;不配置时脚本回退默认值 `lkDrRmoAAAAJ` |

**API key 安全约定**:key 只存在于 GitHub Secrets / 本地环境变量,只经环境变量传给脚本;不写入 index.html、js/script.js、data/*.json 或任何仓库文件;脚本所有日志输出都做了 `api_key=[REDACTED]` 脱敏。

## 如何手动运行 GitHub Actions

1. 推送本项目到 GitHub 仓库(注意:Actions 只在 GitHub 仓库里生效,本地不会跑)。
2. 配置上面的 Secrets。
3. 仓库页面 → Actions → 左侧选 "Sync Google Scholar" → 右侧 "Run workflow"。
4. 定时任务无需操作,按 `.github/workflows/sync-google-scholar.yml` 里的 cron(每周一早 5 点北京时间)自动跑。

## 如何验证数据更新

- **验证 JSON**:打开仓库里的 `data/google-scholar-stats.json`,看 `status` 是否为 `"ok"`、`synced_at` 是否是最近时间、`metrics.citations_all` 是否有数字。`data/papers.json` 同理看 `papers` 数组。
- **验证网页读取**:部署版(http/https)打开网页 → 论文目录区顶部出现"总被引 / h-index / i10-index + 最近同步 xx"指标条;论文列表换成 Scholar 同步数据,列表尾注变为"论文数据由 Google Scholar 同步数据生成(最近同步 xx)"。
- **本地验证(无 key)**:

  ```bash
  node --check scripts/sync-google-scholar.mjs        # 语法检查
  node scripts/sync-google-scholar.mjs --mock         # 用内置 fixture 生成 JSON,验证全流程
  node scripts/sync-google-scholar.mjs --mock --dry-run  # 只打印不落盘
  node scripts/sync-google-scholar.mjs --init         # 重置为空占位(网页回退静态数据)
  ```

  然后用任意本地静态服务器打开 `index.html` 查看效果。mock 产物的 `source` 标记为 `mock_fixture`,验证完记得 `--init` 重置,不要把 mock 数字当真实数据交付。

## 前端读取与回退逻辑

- 默认渲染 `js/script.js` 里 `SITE_DATA.papers` 的静态论文(和以前完全一样)。
- 页面以 http/https 打开时,JS 尝试 fetch `data/papers.json` 和 `data/google-scholar-stats.json`:
  - JSON 存在、`status === "ok"` 且有数据 → 论文列表 / 指标条切换为同步数据;
  - 加载失败、404、为空、格式错误 → 静默回退静态数据,不报错、不留空白。
- 以 `file://` 双击打开时浏览器禁止 fetch 本地文件,JS 检测到后直接跳过动态加载,使用静态数据,控制台不刷错误。

## 单文件 HTML 的限制

`dist/yan-ying-research-group-wechat-preview.html` 是把 CSS/JS/照片全部内嵌的单文件,用于微信发给老师预览。它构建时不包含 `data/` JSON,打开时(通常是 `file://`)也不会 fetch —— 所以它永远是构建那一刻的静态快照,不会自动更新,但也不会因此报错或坏掉。要看自动更新效果,必须看部署版。

## 以后部署怎么办

任何静态托管都能用这套管线,不需要买云服务器:

- **GitHub Pages(推荐,零成本)**:Actions 更新 `data/*.json` 并 commit 后,Pages 自动重新发布,网页下次刷新就读到新数据。
- **腾讯云(静态网站托管 / COS / 轻量服务器)**:同样适用 —— 仓库数据更新后,加一步部署动作(或定时拉取仓库)把文件同步过去即可。管线本身不依赖任何后端服务。
