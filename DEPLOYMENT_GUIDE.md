# 上线部署指南 · DEPLOYMENT GUIDE

严颖课题组 / Yan Ying Research Group 官网的上线说明。目标：**尽快把网站发布到一个公开网址，让别人可以了解课题组的工作。**

本网站是**纯静态站点**（HTML + CSS + 原生 JS），不需要后端、不需要数据库、不需要服务器进程，任何静态托管都能直接用。

---

## 一、正式部署入口

- **正式上线入口是 `index.html`**（项目根目录那一个）。
- 部署时**上传整个项目目录**（或把交付 zip 解压后的完整目录整体上传），保持目录结构不变，让 `index.html` 能找到同级的 `css/ js/ assets/ data/`。
- 所有资源路径都是**相对路径**，所以无论部署到根域名还是子目录都能正常加载。

### 部署需要的文件（最小集合）

```
index.html          ← 入口
css/style.css
js/script.js
assets/             ← 老师肖像 + 成员照片
data/*.json         ← Scholar 同步产物（未配置时为 pending 占位，页面照常显示）
```

### 可选但建议一起带上（用于后续自动更新）

```
scripts/sync-google-scholar.mjs
.github/workflows/sync-google-scholar.yml
package.json
GOOGLE_SCHOLAR_SYNC.md
DEPLOYMENT_GUIDE.md
```

### 不要作为部署入口的文件

- **`dist/yan-ying-research-group-wechat-preview.html`**：这是把 CSS / JS / 照片全部内嵌的**单文件版，只用于发微信给老师预览**。它是构建时刻的静态快照，不会自动更新、也读不到 `data/*.json`，**不要拿它当正式上线入口**。
- `dist/yan-ying-research-group-demo-package.zip`：交付打包，不是部署产物。
- `backup-*/`、`_dbg-*`、`screenshot-*.png`、`_inspect.mjs` 等：开发调试残留，部署时可以不上传。

---

## 二、推荐上线方式（先快后稳）

### 第一步：先用免费静态托管快速上线（推荐）

三选一，都能在十几分钟内拿到公开网址，**零成本**：

| 平台 | 适合场景 | 操作概要 |
|---|---|---|
| **GitHub Pages**（最推荐） | 配合本项目的 Scholar 自动同步管线最顺 | 把项目推到 GitHub 仓库 → Settings → Pages → 选 `main` 分支根目录 → 拿到 `https://<用户名>.github.io/<仓库名>/` |
| **Netlify** | 不想用命令行，拖拽即可 | netlify.com 登录 → 把项目文件夹（或 zip 解压后的目录）拖进 “Deploy” → 自动分配网址 |
| **Vercel** | 习惯 Vercel 的话 | vercel.com 导入 GitHub 仓库或上传目录 → 自动部署 |

> 推荐 **GitHub Pages**：因为 Scholar 自动同步用的就是 GitHub Actions，放在同一个仓库里，数据更新后 Pages 会自动重新发布，链路最短。

### 第二步：以后正式长期用，再迁移腾讯云（可选）

如果将来要长期、正式运营，或想用自有域名 / 备案 / 国内访问更快，可以再迁移到腾讯云：

- **腾讯云静态网站托管 / COS**：同样上传整个目录即可，纯静态站点无需服务器。
- **腾讯云轻量应用服务器**：放一个静态文件服务器（如 Nginx）指向项目目录。
- Scholar 同步管线**不依赖部署平台**：可继续用 GitHub Actions 更新 `data/*.json`，再加一步把仓库文件同步到腾讯云即可。

迁移不是必须的，先用免费托管上线、让别人能看到，是当前第一优先级。

---

## 三、Google Scholar 自动更新（后续配置，不影响先上线）

网站**默认就能正常展示**所有静态内容（研究方向、团队、成果、论文目录、招生、联系方式）。Scholar 自动更新是**锦上添花的增强项**，没配置也不会报错、不会留白。

详细原理见 `GOOGLE_SCHOLAR_SYNC.md`，这里只列上线相关的关键点：

### 要开启自动更新，需要在 GitHub 仓库配置 Secrets

仓库 → Settings → Secrets and variables → Actions → New repository secret：

| Secret | 是否必须 | 值 |
|---|---|---|
| `SERPAPI_KEY` | 必须 | 在 serpapi.com 注册后拿到的 API key（免费账号每月 100 次额度，每周同步一次足够） |
| `GOOGLE_SCHOLAR_ID` | 建议填 | `lkDrRmoAAAAJ`（严颖老师 Scholar 作者 ID；不填时脚本也会回退到这个默认值） |

> **API key 安全约定**：key 只放 GitHub Secrets，绝不写进 `index.html`、`js/script.js`、`data/*.json` 或任何提交到仓库的文件。

### 如果暂时不配置 Scholar key

- 网站**照常上线、照常展示**所有静态内容，**不受任何影响**。
- 论文目录用 `js/script.js` 里的内置静态数据；论文区顶部的「总被引 / h-index / i10-index」指标条**自动隐藏、不占位**。
- `data/google-scholar-stats.json` 与 `data/papers.json` 当前是 `status: "pending"` 占位状态，前端检测到非 `ok` 状态会**静默跳过**，页面正常。
- 等以后配置好 key、Actions 跑过一次后，指标条和最新论文会自动出现，无需改代码。

---

## 四、上线前自检清单

- [x] `index.html` 可作为入口，资源用相对路径，目录结构完整。
- [x] `css/ js/ assets/ data/` 路径正确，本地双击 `index.html` 与本地服务器打开均正常。
- [x] `data/*.json` 处于 `pending` 占位状态时页面不报错（前端静默回退静态数据）。
- [x] 单文件版仅用于微信预览，不作为部署入口。
- [ ] 选定托管平台（GitHub Pages / Netlify / Vercel）并上传完整目录。
- [ ] （可选）配置 `SERPAPI_KEY`、`GOOGLE_SCHOLAR_ID`，开启 Scholar 自动更新。

---

## 五、最短上线流程（建议路径）

1. 注册 / 登录 GitHub，新建一个仓库。
2. 把**整个项目目录**推送上去（或在 Netlify 直接拖拽上传目录，跳过 git）。
3. 打开 GitHub Pages（或等 Netlify 自动部署），拿到公开网址。
4. 用手机和电脑各打开一次确认显示正常。
5. 把网址发给需要了解课题组的人。
6. （以后有空再）配置 `SERPAPI_KEY` 开启 Scholar 自动更新。

完成第 3 步就已经「上线、别人能看」了，后面都是可选优化。
