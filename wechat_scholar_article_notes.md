# 微信文章阅读记录

* 原文链接：https://mp.weixin.qq.com/s/_sWR_JRHm7M6ujGC3NRkQw
* 文章标题：如何在你的个人学术CV上让Google Scholar Citation自动刷新？
* 公众号 / 作者：先进机电系统测控与运维前沿 / 何超
* 发布时间：2026年4月29日 17:17
* 阅读记录时间：2026-06-12 12:24:27 +08:00

---

## 1. 文章核心观点

这篇文章讲的是：不要直接用 `scholarly` 之类方式频繁抓 Google Scholar，因为容易触发 Google 的反爬限制；更稳定的做法是用第三方搜索/API 服务（SerpAPI 或 Tavily）获取 Google Scholar 作者页的引用数据，再通过 GitHub Actions 定时运行脚本，把引用数写成 Shields.io 可读取的 JSON 文件，最后在个人 CV、GitHub 主页或个人网站 README 中展示一个会自动刷新的 Google Scholar citation badge。

文章重点不在“编辑 Google Scholar 个人主页”，而在“让自己的个人网页 / GitHub README / 学术 CV 上的 Scholar 引用数徽章自动更新”。

## 2. 与 Google Scholar 相关的关键步骤

* 需要进入 Google Scholar 作者主页，主要目的是拿到 URL 中的 `user=` 参数，也就是 `GOOGLE_SCHOLAR_ID`。
* 文章没有要求编辑 Google Scholar 个人资料。
* 文章没有提到填写 Google Scholar 个人主页里的 Homepage / Website 字段。
* 文章没有提到设置 Google Scholar 论文自动更新。
* 文章没有提到学校邮箱验证。
* 文章不是把网站链接放进 Google Scholar 主页，而是把 Google Scholar 作者页链接放到自己网页 / README 的 badge 外链里。
* 核心配置在 GitHub 仓库里完成：
  * 新建 `.github/workflows/google_scholar_crawler.yaml`。
  * 设置定时任务，例如每天运行一次。
  * 在 GitHub Secrets 中配置 `SERP_API_KEY` 或 `TAVILY_API_KEY`。
  * 在 GitHub Secrets 中配置 `GOOGLE_SCHOLAR_ID`。
  * 在仓库中创建 `google_scholar_crawler` 文件夹。
  * 用 Python 脚本请求 SerpAPI 或 Tavily。
  * 生成 `results/gs_data_shieldsio.json`。
  * 推送到 `google-scholar-stats` 分支。
  * 在 README 或网页中用 Shields.io endpoint 引用这个 JSON。

## 3. 这篇文章的方法到底能实现什么

* 它不能把你的课题组网站链接展示在 Google Scholar 个人主页上。
  * Google Scholar 个人主页里的网站链接，需要账号本人登录 Google Scholar 后编辑个人资料中的 Homepage / Website 等字段。
  * 这篇文章没有讲这个操作。

* 它不能直接让你的课题组网站自动同步 Google Scholar 新论文列表。
  * 文章示例主要提取的是作者总引用次数，并生成 citation badge。
  * 它没有实现论文列表解析、论文增量同步、论文详情入库、网页论文区自动渲染等流程。

* 它实际解决的问题是：
  * 在自己的个人学术 CV、GitHub README 或个人网站上，展示一个自动更新的 Google Scholar 引用数徽章。
  * 用 GitHub Actions 定时运行，避免人工手动更新引用次数。
  * 用 SerpAPI / Tavily 绕开直接访问 Scholar 的不稳定性，但这依赖第三方 API 配额。

## 4. 对我的课题组网站项目的启发

现在就能做的事情：

* 如果老师已经有 Google Scholar 主页，可以先拿到 Scholar URL 中的 `user=` ID。
* 可以在课题组网站的教师个人页或首页上放一个 Scholar citation badge。
* 可以新建一个独立的 GitHub Actions 工作流，定时生成 `gs_data_shieldsio.json`。
* 可以在前端页面中读取或嵌入 Shields.io badge，展示老师的 Scholar 总引用数。

需要老师本人操作的事情：

* 如果目标是“Google Scholar 个人主页展示课题组网站链接”，需要老师本人登录 Google Scholar。
* 老师需要编辑 Scholar 个人资料里的 Homepage / Website 字段。
* 如果 Scholar 账号需要学校邮箱验证，也需要老师本人完成。
* 如果要保证论文归属正确，老师可能还要检查 Scholar 个人主页中的论文列表和自动更新设置。

需要后端 / API / 定时任务才能实现的事情：

* 自动同步新论文到课题组网站，不是这篇文章现成解决的，需要额外做数据结构和同步流程。
* 如果要展示论文列表，需要定时获取 Scholar 作者页或其他数据源中的论文条目。
* 需要设计后端或静态构建流程，把论文数据保存成 JSON，再让网站前端渲染。
* 需要处理 Google Scholar 反爬、API 配额、失败重试、缓存和人工校对。
* 更稳妥的方案可能是结合老师的 ORCID、Crossref、Semantic Scholar、Google Scholar 手动导出或学校主页数据源，而不是只依赖 Scholar 页面。

## 5. 必要的短摘录

* “Google Scholar引用的自动实时更新”
* “SERP_API_KEY 和 GOOGLE_SCHOLAR_ID”
* “每天一次的更新需求”
* “在readme.md面设置即可”

---

## 事实判断

* 是否成功打开文章：成功。
* 是否遇到验证/环境异常：没有。
* 文章方法是否属于“Scholar 主页放网站链接”：不是。它是把 Scholar 数据 / Scholar 链接展示到自己的 CV、README 或个人网站里。
* 文章方法是否能实现“网站自动同步 Scholar 新论文”：不能直接实现。它主要实现自动刷新 Google Scholar 引用数徽章；新论文同步需要额外的数据抓取、API、后端或定时任务。
