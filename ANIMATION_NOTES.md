# 滚动叙事动画说明 · V0.9（Animation Notes）

本轮只升级动画"叙事节奏",未改背景 SVG、定位、数据、照片、配色体系。纯 CSS transition + IntersectionObserver，无任何第三方动画库。

## 1. 借鉴了 NANFU Global 的哪些动画逻辑
参考 https://www.nanfu.global/ 的"scroll to explore / 滚动叙事"节奏，只学**逻辑**、不抄视觉：
- **section-by-section 讲故事**：内容随滚动一层层出现，不是一次性堆出来。
- **图文错峰进入**：视觉图形先到、说明文字后到、参数/标签最后一排到。
- **逐步揭示**：标题 → 视觉 → 文案 → 标签的节奏，像发布页逐帧展开。
- **克制的分屏叙事**：研究区左右两栏分别从两侧进场。
没有借鉴：电池产品视觉、南孚品牌色、商业广告语气、强销售感、炫光特效。

## 2. 哪些区块有 reveal
- **Hero**：加载即播的入场序列（见第 5 节），不走滚动 reveal。
- **About**：左侧文字 `reveal-left`、右侧照片 `reveal-right`。
- **Research**：每个方向模块——图形从一侧 / 文字从另一侧（奇偶相反），标签 `reveal-up` 最后进；SVG 带轻微视差。
- **Team**：分组标题 `reveal-up`，成员卡片 `reveal-fade` 逐个 stagger。
- **成果**：区标题 `reveal-up`，统计数字与成果卡片 `reveal-fade` 逐个 stagger（数字计数动效保留）。
- **招生**：标题、正文、CTA `reveal-up`，要点卡片 `reveal-fade` stagger，引语 `reveal-fade`。
- **联系**：区标题 `reveal-up`，4 张链接卡片 `reveal-fade` 逐个出现。

动画类：`.reveal` `.reveal-up` `.reveal-left` `.reveal-right` `.reveal-fade` + `.reveal-delay-1/2/3`。
- 初始：`opacity:0` + `translate3d(...)` + `blur(4px)`。
- 可见：加 `.is-visible` → `opacity:1` + 回原位 + `blur(0)`。
- 时长 0.9s，缓动 `cubic-bezier(.16,1,.3,1)`，stagger 100–320ms。

## 3. 进入视口 / 离开视区怎么处理
单个 IntersectionObserver（`threshold:0.12, rootMargin:"0px 0px -8% 0px"`）：
- 进入视口：`el.classList.toggle("is-visible", true)` → 渐显。
- 离开视区：`toggle("is-visible", false)` → 渐隐。
- 因此向下滑时下方内容慢慢出现、上方内容慢慢退场；**反向滚动会再次出现**（不是一次性）。

## 4. reduced-motion 怎么处理
同时在 CSS 与 JS 两层兜底：
- CSS：`@media (prefers-reduced-motion: reduce)` 下，所有 reveal 类 `opacity:1 / transform:none / filter:none / transition:none`，并 `*{animation:none!important}`。
- JS：检测到 `prefers-reduced-motion` 时，直接给所有 reveal 元素加 `.is-visible`（内容全部显示、不隐藏），并**跳过视差**。
结果：关动效用户看到的是完整静态页面，无位移、无 blur、无视差，内容一个不少。

## 5. Hero 入场序列（加载即播，一次性）
纯 CSS keyframes + `animation-delay`，顺序：
1. 顶部导航 `navDrop`（轻微下落淡入）；
2. eyebrow `heroSlideL`（从左淡入，0.15s）；
3. 中文主标题 `heroSlideL`（从左显现，0.30s）；
4. 英文 `heroRise`（0.55s）；
5. 核心主张 `heroRise`（0.72s）；
6. CTA 按钮组 `heroRise`（0.90s）；
7. 右侧 Research Focus 列表逐行 `heroRise`（1.04s 起，每行 +90ms）。
气质：慢、克制、无弹跳/旋转/粒子/闪烁；时长 0.85–1.1s。

## 6. 轻微视差（parallax）
- 仅研究区 5 个 SVG 图形，随滚动慢速纵向位移，**限幅 ±8px**。
- `scroll` 事件 passive + `requestAnimationFrame` 节流；每帧先批量读 `getBoundingClientRect`、再批量写 `transform`，避免读写抖动。
- reduced-motion 下完全关闭。

## 7. 后续如果要更像产品发布页，可以怎么继续增强
- **pinned / sticky 叙事**：研究区某个方向滚动时图形钉住、文字分步替换（需 sticky + 分步 reveal）。
- **标题逐字 / 逐词进入**：把主标题拆成 span，做更精细的 stagger（注意中文断字与无障碍）。
- **数字/参数 scrub**：统计数字随滚动进度联动，而非进入即一次性计数。
- **图形 draw-on 与滚动绑定**：SVG 描边 `stroke-dashoffset` 跟随滚动进度，而非固定时长。
- **scroll snap**：给大区块加 `scroll-snap`，强化 section-by-section 的"翻页"叙事感。
- 若动画复杂度上升，可考虑只在桌面端启用、移动端降级，保持性能与克制。
