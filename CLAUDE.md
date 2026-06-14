# yan-ying-research-group-demo

严颖课题组 / Yan Ying Research Group 个人团队介绍官网 —— 给老师预览风格的视觉初版 Demo。

## 项目定位
- 这是**严颖老师个人团队 / 课题组**的介绍官网,不是「金牛湖脑机实验室官网」。
- 金牛湖脑机实验室(https://io.buerka.cn/)只作风格/结构参考,绝不能当主标题。
- 第一版只是 Demo,用于预览视觉风格,不是上线版。

## 技术约束
- 纯 HTML + CSS + 原生 JavaScript,不用任何框架/付费库。
- 能直接双击 `index.html` 本地打开,也可用本地服务器预览。
- 不做:后台 / 登录 / 新闻系统 / 复杂双语切换。
- 论文 / 引用数据自动同步:不做自建后端,采用「GitHub Actions 定时跑 `scripts/sync-google-scholar.mjs`(SerpAPI)→ 生成 `data/*.json` → 前端 fetch 渲染、失败回退 SITE_DATA」的静态管线,详见 `GOOGLE_SCHOLAR_SYNC.md`。API key 只放 GitHub Secrets,绝不进前端 / data JSON / 日志。

## 文件结构约定
```
yan-ying-research-group-demo/
├── index.html        页面骨架 + 分区注释
├── css/style.css     全部样式(设计变量集中在 :root)
├── js/script.js      可变内容集中在顶部 SITE_DATA 对象 + 交互逻辑
├── assets/           图片/素材占位(后续替换处)
├── data/             Scholar 同步产物 JSON(google-scholar-stats.json / papers.json),由脚本生成,不手改
├── scripts/          数据管线脚本(sync-google-scholar.mjs)
├── .github/workflows/ GitHub Actions 定时同步工作流
├── GOOGLE_SCHOLAR_SYNC.md  Scholar 自动同步管线说明
├── README.md         预览方式说明
└── CLAUDE.md         本文件
```

## 内容维护约定
- **所有可变文字内容集中在 `js/script.js` 顶部的 `SITE_DATA` 对象**,改内容只动这里。
- 静态结构(Hero/关于/联系)写在 HTML 里,用 `<!-- 区块 -->` 注释清晰分区。
- 信息分三类,代码注释必须标明:
  - 来自老师个人主页的真实信息 —— 标 `来源: 个人主页`
  - 占位内容 —— 标 `占位`
  - 不确定/敏感信息 —— 标 `待老师确认`
- 不编造具体学生经历、论文数据;缺失处写「待补充」。

## 视觉规范(V0.2 重构后基线 —— Apple 产品发布页式)
- 极少颜色:只用黑 `--bg`、深灰 `--bg-soft/--bg-elev`、白字 `--text`、Apple 灰阶次级文字。
- 唯一交互强调色 `--blue`(Apple 蓝),只用于链接 / 主按钮;`--grad`(蓝青)只给 SVG 描边低透明度装饰。
- 大留白、强字号层级、一屏一个重点、文案短而有力;段落用 `--maxw-text` 控制行宽。
- 区块分隔靠留白与极细 hairline(`--line/--line-soft`),不靠粗边框、不发光、不堆玻璃拟态。
- 禁止:赛博霓虹、廉价饱和蓝、发光边框、网格背景、到处渐变、数据看板感、模板感。
- 抽象视觉一律用内联 SVG / CSS 自制(Hero 信号光环;5 个研究方向各一个独立 SVG),不用网络图片。
- 研究方向 = 5 个「研究产品模块」,左右交替、大间距;SVG 与方向顺序一一对应,见 `script.js` 的 `RESEARCH_VISUALS`。
- 设计 token 集中在 `css/style.css` 的 `:root`,改配色 / 间距只动这里。

## 动画规范(慢、轻、少)
- IntersectionObserver 滚动淡入上移(`--ease-slow`,时长偏长)。
- 导航点击平滑滚动(考虑吸顶导航高度偏移)。
- SVG 视觉:缓慢呼吸 / 描边画入 / 异常点脉冲,克制为主。
- `prefers-reduced-motion` 下关闭所有动画并直接点亮所有 reveal。

## 验证方式
- 改完在浏览器打开 `index.html`,检查桌面端 + 手机端(开发者工具切换)两套视图。
- 控制台无报错。
