# 严颖课题组 · Yan Ying Research Group — 视觉 Demo(V0.2 重构)

南京信息工程大学 · 自动化学院 · 严颖老师个人课题组介绍官网(给老师预览风格用,非上线版)。

> V0.2:Apple 产品发布页式视觉重构 —— 极简深色、大留白、强字号层级、内联 SVG 抽象视觉(信号光环 + 5 个研究方向各自图形)、克制动效。项目根目录的 `screenshot-hero/research/mobile.png` 为预览截图。

## 本地预览

**方式一(最简单):** 直接双击 `index.html` 用浏览器打开即可。

**方式二(推荐,行为更接近线上):** 用本地服务器
```powershell
# 在项目目录下任选其一
python -m http.server 8000      # 然后访问 http://localhost:8000
# 或
npx serve .
```

## 文件结构
```
yan-ying-research-group-demo/
├── index.html        页面骨架(含分区注释)
├── css/style.css     样式(设计 token 在 :root)
├── js/script.js      内容数据 SITE_DATA + 交互
├── assets/           素材占位目录
├── README.md
└── CLAUDE.md         项目规则
```

## 怎么改内容
- **改文字 / 增删卡片**:只动 `js/script.js` 顶部的 `SITE_DATA` 对象。
- **改配色 / 间距**:只动 `css/style.css` 的 `:root`。
- **换老师照片 / Logo**:替换 HTML 中标了「占位」的位置,把图片放进 `assets/`。

## 内容标注
代码注释里区分了三类信息:
- `来源:个人主页` — 来自老师 NUIST 个人主页的真实信息
- `占位` — 示意性占位
- `待老师确认` — 需老师拍板的内容(尤其是手机/微信是否公开)
