/* =========================================================================
   严颖课题组 · Yan Ying Research Group — Demo
   所有可变内容集中在下方 SITE_DATA。改文字只动这里。
   标注约定:
     来源：个人主页 = 来自严颖老师 NUIST 个人主页的真实信息
     占位          = 示意性占位内容
     待老师确认     = 不确定 / 涉及隐私 / 需老师拍板
   ========================================================================= */

const SITE_DATA = {

  /* 关于：研究关键词标签(来源：个人主页关键词) */
  aboutTags: [
    "模式识别", "机器学习", "深度学习", "脑电分析",
    "多维泰勒网", "故障诊断与预测", "优化", "生产计划与调度"
  ],

  /* 研究方向：老师确认的 7 个方向。每个带稳定锚点 id,供 Hero 右侧 Research Focus 跳转。
     id 顺序与本数组一致，不允许两个 focus 跳到同一模块。 */
  research: [
    {
      no: "01",
      id: "research-fault-diagnosis",
      title: "复杂系统故障诊断与预测",
      en: "Fault Diagnosis & Prognosis",
      desc: "暖通、电力、风机这类大系统出故障常常难以提前察觉。我们用模式识别建模运行数据，尽早发现异常，并估计设备还能稳定运行多久。",
      tags: ["暖通空调 HVAC", "电力系统", "风机", "故障预测"]
    },
    {
      no: "02",
      id: "research-bci",
      title: "脑机接口",
      en: "Brain-Computer Interface",
      desc: "脑电信号里藏着状态与健康的线索，却很难靠肉眼读懂。我们用机器学习从 EEG 中识别异常、估计疲劳与情绪，探索脑机接口的应用。",
      tags: ["EEG", "脑机接口", "疲劳 / 情绪估计", "可解释模型"]
    },
    {
      no: "03",
      id: "research-power-load-rainfall",
      title: "发电功率 / 电力负荷 / 降水预测",
      en: "Power · Load · Rainfall Forecasting",
      desc: "发电功率、电力负荷和降水都依赖对未来的判断。我们用时序建模与机器学习方法，做更稳的预测，为调度与决策提供参考。",
      tags: ["发电功率预测", "电力负荷", "降水预测", "时序建模"]
    },
    {
      no: "04",
      id: "research-public-opinion",
      title: "舆情分析",
      en: "Public Opinion Analysis",
      desc: "网络上的声音庞杂而分散。我们用文本分析与机器学习，梳理话题与情绪的走向，帮助更清楚地理解舆论。",
      tags: ["文本分析", "情感分析", "话题演化", "机器学习"]
    },
    {
      no: "05",
      id: "research-optimization",
      title: "优化算法",
      en: "Optimization Algorithms",
      desc: "排程、分配这类问题选择太多，靠经验容易顾此失彼。我们把它写成优化模型，用算法求更省、更稳的方案。",
      tags: ["生产调度", "资源分配", "电力系统优化", "优化算法"]
    },
    {
      no: "06",
      id: "research-mcu-fpga",
      title: "单片机 / FPGA",
      en: "MCU / FPGA",
      desc: "算法最终要落到硬件上跑。我们在单片机与 FPGA 上做信号处理与控制的工程实现，把方法变成能用的系统。",
      tags: ["单片机", "FPGA", "信号处理", "嵌入式控制"]
    },
    {
      no: "07",
      id: "research-robot-uav",
      title: "机器人 / 无人机",
      en: "Robotics / UAV",
      desc: "机器人与无人机需要感知、决策和控制的配合。我们围绕真实平台，做从算法到系统的落地与验证。",
      tags: ["机器人", "无人机", "感知与控制", "系统集成"]
    }
  ],

  /* 团队结构:
       advisor   — 导师严颖(单人)
       masters   — 硕士生 / 在读研究生：普通人员列表，带照片，不按研究方向分组
       undergradGroups — 本科生 / 项目参与学生：按研究方向分块，不带照片(只姓名/身份/方向)
     说明：本科生不放头像、不放照片占位；空的研究方向不显示。
     照片文件存放在 assets/members/<中文姓名>.jpg(已统一裁成 1:1)。 */
  team: {
    advisor: {
      name: "严颖 Ying Yan",
      stage: "副教授 · 硕士生导师",
      note: "康涅狄格大学博士 · 自动化学院",
      highlight: "模式识别 / 机器学习 / 脑电分析 / 复杂系统诊断 / 优化",
      // 导师真实头像(来源:NUIST 官方个人主页),与 About 右侧大照片同一资源；此处圆形小头像，克制呈现
      photo: "assets/yan-ying-portrait.png"
    },

    /* 硕士生 / 在读研究生：照片来源为老师提供的证件照；在读身份统一标注，不编造个人方向 */
    masters: [
      { name: "朱家琦", photo: "assets/members/朱家琦.jpg", stage: "在读研究生" },
      { name: "宗禹胄", photo: "assets/members/宗禹胄.jpg", stage: "在读研究生" },
      { name: "张乐乐", photo: "assets/members/张乐乐.jpg", stage: "在读研究生" },
      { name: "沈培涵", photo: "assets/members/沈培涵.jpg", stage: "在读研究生" },
      { name: "王宇森", photo: "assets/members/王宇森.jpg", stage: "在读研究生" },
      { name: "苗争光", photo: "assets/members/苗争光.jpg", stage: "在读研究生" },
      { name: "陆思语", photo: "assets/members/陆思语.jpg", stage: "在读研究生" },
      { name: "陈刘春", photo: "assets/members/陈刘春.jpg", stage: "在读研究生" },
      // 来源：个人主页(已毕业硕士，暂无照片，用姓名圆标占位)
      { name: "汤云", stage: "硕士 · 已毕业", note: "去向：航天新气象科技有限公司" },
      { name: "招生中", stage: "3–5 人 / 年", note: "欢迎报考，详见招生信息", open: true }
    ],

    /* 本科生 / 项目参与学生：按研究方向分块。只列出有学生的方向，空方向不渲染。
       不放照片、不放头像占位，只显示姓名 / 身份 / 备注。 */
    undergradGroups: [
      {
        dir: "脑机接口",
        students: [
          { name: "刘冠廷", stage: "本科 · 已毕业", note: "香港理工大学 · EEG 图神经网络" },
          { name: "蔡昊洋", stage: "本科 · 已毕业", note: "保送华南理工大学 · NeuroLynx 国家铜奖" },
          { name: "皇甫陈萌", stage: "本科 · 已毕业", note: "保送河海大学 · 驾驶疲劳 EEG 分类" }
        ]
      },
      {
        dir: "发电功率 / 电力负荷 / 降水预测",
        students: [
          { name: "张金皓", stage: "本科 · 项目参与", note: "" },
          { name: "何企涵", stage: "本科生 / 项目参与学生", note: "" }
        ]
      },
      {
        dir: "项目参与 / 交叉实践",
        students: [
          { name: "顾启航", stage: "本科 · 已毕业", note: "保送东南大学 · 雷达信号识别 · IEEE Sensors" },
          { name: "孙健强", stage: "本科 · 已毕业", note: "英国格拉斯哥大学 · 校级优秀毕设一等奖" },
          { name: "更多同学", stage: "本科 · 已毕业", note: "浙大 / 东南 / 西电 / 南邮等，更多去向见个人主页" }
        ]
      }
    ]
  },

  /* 成果数据指标(用于动效计数；数值为摘选，待老师确认) */
  stats: [
    { value: 70, suffix: "+", label: "SCI 论文(含多篇一区 top)" },
    { value: 19, suffix: "+", label: "指导学生竞赛 / 大创获奖" },
    { value: 7, suffix: "", label: "主要研究方向" },
    { value: 1, suffix: "", label: "个人课题组，真诚带学生" }
  ],

  /* 科研成果卡片(论文/获奖来源：个人主页；项目/专利待老师确认补充) */
  achievements: [
    {
      kind: "代表论文 Paper",
      title: "用于 HVAC AHU 故障诊断的自适应多项式组合优化多维泰勒网",
      meta: "Energy and Buildings (2026) · 二区 Top",
      sub: "来源：个人主页"
    },
    {
      kind: "代表论文 Paper",
      title: "面向癫痫检测的可解释梯度评分稀疏多项式网络",
      meta: "Information Sciences (2026) · 一区 Top",
      sub: "来源：个人主页"
    },
    {
      kind: "代表论文 Paper",
      title: "用于癫痫脑电检测的残差多维泰勒网(ResMTN)",
      meta: "Eng. Applications of AI (2026) · 一区 Top",
      sub: "来源：个人主页"
    },
    {
      kind: "获奖 Award",
      title: "基于脑电与可解释机器学习的脑科疾病诊断研究",
      meta: "中国技协 2024 职工技术创新成果二等奖(第一完成人)",
      sub: "来源：个人主页"
    },
    {
      kind: "获奖 Award",
      title: "智能建筑暖通空调系统故障诊断与预测",
      meta: "2023 江苏省自动化学会科学技术奖三等奖(第一完成人)",
      sub: "来源：个人主页"
    },
    {
      kind: "项目 / 专利 Project",
      title: "高价值专利培育与产学研合作",
      meta: "省/市级大创、专利培育大赛多项获奖",
      sub: "来源：个人主页"
    }
  ],

  /* 论文目录(静态数据)。来源：成果区已展示过的代表论文，未编造新论文。
     isNew: true 的第一篇会进入「最新论文播报」展示位。
     以后老师新增论文，只需在此数组追加 / 修改条目，播报位与论文目录会一起更新。
     link 统一用干净 Scholar 链接；如某篇有 DOI,可加 doi 字段，渲染时优先跳 DOI。 */
  papers: [
    {
      title: "用于 HVAC AHU 故障诊断的自适应多项式组合优化多维泰勒网",
      year: "2026",
      venue: "Energy and Buildings · 二区 Top",
      type: "代表论文",
      direction: "复杂系统故障诊断与预测",
      isNew: true,
      link: "https://scholar.google.com/citations?user=lkDrRmoAAAAJ&hl=zh-CN"
    },
    {
      title: "面向癫痫检测的可解释梯度评分稀疏多项式网络",
      year: "2026",
      venue: "Information Sciences · 一区 Top",
      type: "代表论文",
      direction: "脑机接口",
      link: "https://scholar.google.com/citations?user=lkDrRmoAAAAJ&hl=zh-CN"
    },
    {
      title: "用于癫痫脑电检测的残差多维泰勒网(ResMTN)",
      year: "2026",
      venue: "Engineering Applications of AI · 一区 Top",
      type: "代表论文",
      direction: "脑机接口",
      link: "https://scholar.google.com/citations?user=lkDrRmoAAAAJ&hl=zh-CN"
    }
  ],

  /* 招生：要点卡片(来源：个人主页招生要求) */
  admission: [
    { icon: "◆", title: "招生专业", text: "本部 / 创新港 / 雷丁的控制工程专硕、大数据技术与工程专硕、电子信息专硕。" },
    { icon: "◆", title: "招生规模", text: "硕士生 3–5 人 / 年，名额有限，提前沟通更稳妥。" },
    { icon: "◆", title: "我们看重", text: "科研热情、动手能力，以及对交叉学科与真实应用的兴趣。" },
    { icon: "◆", title: "本科生也欢迎", text: "大创、竞赛、毕设都可以一起做，有不少同学因此保研 / 出国深造。" }
  ]
};

/* =========================================================================
   以下为渲染与交互逻辑，通常无需改动
   ========================================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 渲染：关于标签 ---------- */
  function renderAboutTags(el) {
    el.innerHTML = SITE_DATA.aboutTags
      .map(t => `<span class="tag">${t}</span>`).join("");
  }

  /* ---------- 研究方向:5 个抽象视觉(纯 SVG 自制，克制) ----------
     视觉与方向一一对应(按顺序),内容仍来自 SITE_DATA。 */
  const RESEARCH_VISUALS = [
    /* 01 复杂系统故障诊断：系统网络 + 异常点 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <line class="stroke-dim" x1="40" y1="48" x2="96" y2="36"/>
      <line class="stroke-dim" x1="96" y1="36" x2="150" y2="60"/>
      <line class="stroke-dim" x1="40" y1="48" x2="70" y2="104"/>
      <line class="stroke-dim" x1="70" y1="104" x2="128" y2="120"/>
      <line class="stroke-dim" x1="96" y1="36" x2="70" y2="104"/>
      <line class="stroke" x1="150" y1="60" x2="128" y2="120"/>
      <circle class="dot" cx="40" cy="48" r="3.5"/>
      <circle class="dot" cx="96" cy="36" r="3.5"/>
      <circle class="dot" cx="70" cy="104" r="3.5"/>
      <circle class="dot" cx="150" cy="60" r="3.5"/>
      <circle class="glowdot anim-pulse" cx="128" cy="120" r="6"/>
      <circle class="stroke anim-pulse" cx="128" cy="120" r="12" stroke-width="1"/>
    </svg>`,
    /* 02 脑机接口：脑电波 + 神经信号 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <path class="stroke-dim anim-wave" d="M20 50 q 12 -22 24 0 t 24 0 q 10 26 22 -8 t 26 6 q 14 -20 26 2 t 22 0"/>
      <path class="stroke anim-wave" d="M20 90 q 10 -28 22 4 t 24 -10 q 12 30 24 -4 t 24 8 q 12 -18 24 0 t 18 2"/>
      <path class="stroke-dim anim-wave" d="M20 128 q 14 -16 26 2 t 22 -4 q 12 20 24 -2 t 24 4 q 12 -14 24 2 t 16 0"/>
      <circle class="dot-accent anim-pulse" cx="180" cy="90" r="3.5"/>
    </svg>`,
    /* 03 发电功率/电力负荷/降水预测：历史实线 + 未来虚线上行 + 雨丝 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <line class="stroke-dim" x1="22" y1="132" x2="184" y2="132"/>
      <line class="stroke-dim" x1="60" y1="42" x2="55" y2="56"/>
      <line class="stroke-dim" x1="86" y1="36" x2="81" y2="50"/>
      <line class="stroke-dim" x1="112" y1="46" x2="107" y2="60"/>
      <path class="stroke-dim" d="M26 106 L 54 94 L 82 102 L 106 80"/>
      <path class="stroke anim-wave" d="M106 80 L 134 88 L 160 58 L 182 66"/>
      <circle class="dot" cx="54" cy="94" r="3"/>
      <circle class="dot" cx="106" cy="80" r="3.5"/>
      <circle class="dot-accent anim-pulse" cx="182" cy="66" r="4.5"/>
    </svg>`,
    /* 04 舆情分析：一个信源向外扩散到多个节点 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <line class="stroke" x1="68" y1="82" x2="128" y2="42"/>
      <line class="stroke-dim" x1="68" y1="82" x2="140" y2="76"/>
      <line class="stroke-dim" x1="68" y1="82" x2="126" y2="122"/>
      <line class="stroke-dim" x1="128" y1="42" x2="172" y2="56"/>
      <line class="stroke-dim" x1="126" y1="122" x2="170" y2="110"/>
      <circle class="glowdot anim-pulse" cx="68" cy="82" r="6"/>
      <circle class="stroke anim-pulse" cx="68" cy="82" r="13" stroke-width="1"/>
      <circle class="dot" cx="128" cy="42" r="3"/>
      <circle class="dot" cx="140" cy="76" r="3"/>
      <circle class="dot" cx="126" cy="122" r="3"/>
      <circle class="dot-accent" cx="172" cy="56" r="2.8"/>
      <circle class="dot-accent" cx="170" cy="110" r="2.8"/>
    </svg>`,
    /* 05 优化算法：阶梯下降的可行路径 + 时间轴刻度 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <line class="stroke-dim" x1="20" y1="130" x2="184" y2="130"/>
      <line class="stroke-dim" x1="32" y1="126" x2="32" y2="134"/>
      <line class="stroke-dim" x1="76" y1="126" x2="76" y2="134"/>
      <line class="stroke-dim" x1="120" y1="126" x2="120" y2="134"/>
      <line class="stroke-dim" x1="164" y1="126" x2="164" y2="134"/>
      <path class="stroke anim-wave" d="M28 96 L 64 96 L 64 64 L 112 64 L 112 36 L 172 36"/>
      <circle class="dot" cx="28" cy="96" r="3.5"/>
      <circle class="dot" cx="64" cy="64" r="3.5"/>
      <circle class="dot" cx="112" cy="36" r="3.5"/>
      <circle class="dot-accent anim-pulse" cx="172" cy="36" r="4.5"/>
    </svg>`,
    /* 06 单片机/FPGA:芯片封装 + 引脚 + 内核 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <rect class="stroke" x="68" y="50" width="64" height="60" rx="4" fill="none"/>
      <rect class="stroke-dim" x="84" y="66" width="32" height="28" rx="2" fill="none"/>
      <line class="stroke-dim" x1="60" y1="62" x2="68" y2="62"/>
      <line class="stroke-dim" x1="60" y1="80" x2="68" y2="80"/>
      <line class="stroke-dim" x1="60" y1="98" x2="68" y2="98"/>
      <line class="stroke-dim" x1="132" y1="62" x2="140" y2="62"/>
      <line class="stroke-dim" x1="132" y1="80" x2="140" y2="80"/>
      <line class="stroke-dim" x1="132" y1="98" x2="140" y2="98"/>
      <line class="stroke-dim" x1="86" y1="42" x2="86" y2="50"/>
      <line class="stroke-dim" x1="114" y1="42" x2="114" y2="50"/>
      <line class="stroke-dim" x1="86" y1="110" x2="86" y2="118"/>
      <line class="stroke-dim" x1="114" y1="110" x2="114" y2="118"/>
      <circle class="dot-accent anim-pulse" cx="100" cy="80" r="3.6"/>
    </svg>`,
    /* 07 机器人/无人机：四旋翼骨架 + 旋翼环 */
    `<svg class="rmod__svg" viewBox="0 0 200 160" aria-hidden="true">
      <line class="stroke" x1="100" y1="80" x2="58" y2="48"/>
      <line class="stroke" x1="100" y1="80" x2="142" y2="48"/>
      <line class="stroke" x1="100" y1="80" x2="58" y2="112"/>
      <line class="stroke" x1="100" y1="80" x2="142" y2="112"/>
      <circle class="stroke-dim anim-float" cx="58" cy="48" r="12" fill="none"/>
      <circle class="stroke-dim anim-float" cx="142" cy="48" r="12" fill="none"/>
      <circle class="stroke-dim anim-float" cx="58" cy="112" r="12" fill="none"/>
      <circle class="stroke-dim anim-float" cx="142" cy="112" r="12" fill="none"/>
      <circle class="dot" cx="58" cy="48" r="2.6"/>
      <circle class="dot" cx="142" cy="48" r="2.6"/>
      <circle class="dot" cx="58" cy="112" r="2.6"/>
      <circle class="dot" cx="142" cy="112" r="2.6"/>
      <circle class="dot-accent anim-pulse" cx="100" cy="80" r="4.6"/>
    </svg>`
  ];

  /* 研究方向 Apple 式短句标题(展示文案，与方向顺序一一对应；真实方向名见 SITE_DATA) */
  const RESEARCH_TAGLINES = [
    "看见系统异常。",
    "读懂脑电信号。",
    "预测电力与天气变化。",
    "看清舆论的走向。",
    "找到更优的解。",
    "让算法落到硬件系统。",
    "让机器自己行动。"
  ];

  /* ---------- 渲染：研究方向(产品模块，左右交替) ---------- */
  function renderResearch(el) {
    /* 共享渐变定义，只注入一次，供所有 SVG 描边引用 url(#rg) */
    const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9fb2b8"/><stop offset="1" stop-color="#6f8f95"/>
      </linearGradient></defs></svg>`;
    /* 每个研究方向的稳定锚点 id 直接来自 SITE_DATA.research[i].id,供 Hero 右侧 Research Focus 跳转 */
    el.innerHTML = defs + SITE_DATA.research.map((r, i) => {
      /* 奇偶模块方向相反:CSS :nth-child(even) 时图在左，所以图从左、文从右；否则反之。
         图形先进场(无延迟),文字后(delay-1),标签最后一排(delay-2)。 */
      const cssEven = (i % 2 === 1);
      const textReveal   = cssEven ? "reveal-right" : "reveal-left";
      const visualReveal = cssEven ? "reveal-left"  : "reveal-right";
      return `
      <article class="rmod" id="${r.id || ""}">
        <div class="rmod__text ${textReveal} reveal-delay-1">
          <p class="rmod__no">${r.no}</p>
          <h3 class="rmod__title">${RESEARCH_TAGLINES[i] || r.title}</h3>
          <p class="rmod__name">${r.title}</p>
          <p class="rmod__en">${r.en}</p>
          <p class="rmod__desc">${r.desc}</p>
          <div class="rmod__tags reveal-up reveal-delay-2">${r.tags.map(t => `<span class="tag tag--sm">${t}</span>`).join("")}</div>
        </div>
        <div class="rmod__visual ${visualReveal}" aria-hidden="true">
          ${RESEARCH_VISUALS[i] || ""}
        </div>
      </article>`;
    }).join("");
  }

  /* ---------- 渲染：团队 ----------
     三段结构：导师 / 硕士生(列表+照片)/ 本科生按研究方向分组(无照片)。 */
  function renderTeam(el) {
    const t = SITE_DATA.team;

    /* 导师：横向信息行(lead),不放照片，保持原有姓名圆标 */
    const a = t.advisor;
    const advisorHtml = `
      <div class="team__block">
        <h3 class="team__group reveal-up">导师 / Advisor</h3>
        <div class="team__cards">
          <div class="pcard pcard--lead reveal-up reveal-delay-1">
            <div class="pcard__photo pcard__photo--lead" aria-hidden="true">
              <img class="pcard__img" src="${a.photo}" alt="${a.name}" loading="lazy"
                   onerror="this.remove();this.closest('.pcard__photo').classList.add('is-fallback');" />
              <span class="pcard__photo-fb">${initials(a.name)}</span>
            </div>
            <div class="pcard__info">
              <p class="pcard__name">${a.name}</p>
              <p class="pcard__stage">${a.stage}</p>
              <p class="pcard__note">${a.note}</p>
              <p class="pcard__hl">${a.highlight}</p>
            </div>
          </div>
        </div>
      </div>`;

    /* 硕士生 / 在读研究生：普通人员列表，有照片用照片，无照片用姓名圆标。不按方向分组。 */
    const mastersHtml = `
      <div class="team__block">
        <h3 class="team__group reveal-up">硕士生 / 在读研究生</h3>
        <div class="team__cards team__cards--master">
          ${t.masters.map((m, idx) => {
            const avatar = m.photo
              ? `<div class="pcard__photo" aria-hidden="true">
                   <img class="pcard__img" src="${m.photo}" alt="${m.name}" loading="lazy"
                        onerror="this.remove();this.closest('.pcard__photo').classList.add('is-fallback');" />
                   <span class="pcard__photo-fb">${initials(m.name)}</span>
                 </div>`
              : `<div class="pcard__avatar" aria-hidden="true">${initials(m.name)}</div>`;
            return `
            <div class="pcard pcard--member ${m.open ? "pcard--open" : ""} reveal-up reveal-delay-${(idx % 3) + 1}">
              ${avatar}
              <div class="pcard__info">
                <p class="pcard__name">${m.name}</p>
                <p class="pcard__stage">${m.stage}</p>
                ${m.note ? `<p class="pcard__note">${m.note}</p>` : ""}
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>`;

    /* 本科生 / 项目参与学生：按研究方向分块。空方向不会出现在数据里，因此不渲染空块。
       不放照片、不放头像占位，只显示姓名 / 身份 / 备注。 */
    const ugHtml = `
      <div class="team__block">
        <h3 class="team__group reveal-up">本科生 / 项目参与学生</h3>
        <div class="team__ugroups">
          ${t.undergradGroups.map((g, gi) => `
            <div class="ugroup reveal-up reveal-delay-${(gi % 3) + 1}">
              <p class="ugroup__dir">${g.dir}</p>
              <ul class="ugroup__list">
                ${g.students.map(s => `
                  <li class="urow">
                    <span class="urow__name">${s.name}</span>
                    <span class="urow__stage">${s.stage}</span>
                    ${s.note ? `<span class="urow__note">${s.note}</span>` : ""}
                  </li>`).join("")}
              </ul>
            </div>`).join("")}
        </div>
      </div>`;

    el.innerHTML = advisorHtml + mastersHtml + ugHtml;
  }

  function initials(name) {
    const ch = (name || "").trim().charAt(0);
    return ch || "·";
  }

  /* ---------- 渲染：成果卡片 ---------- */
  function renderAchievements(el) {
    el.innerHTML = SITE_DATA.achievements.map((a, i) => `
      <article class="acard reveal-up reveal-delay-${(i % 3) + 1}">
        <span class="acard__kind">${a.kind}</span>
        <h3 class="acard__title">${a.title}</h3>
        <p class="acard__meta">${a.meta}</p>
        <p class="acard__sub">${a.sub}</p>
      </article>`).join("");
  }

  /* ---------- 渲染：数据指标 ---------- */
  function renderStats(el) {
    el.innerHTML = SITE_DATA.stats.map((s, i) => `
      <div class="stat reveal-up reveal-delay-${(i % 4) + 1 > 3 ? 3 : (i % 4) + 1}">
        <span class="stat__num" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
        <span class="stat__label">${s.label}</span>
      </div>`).join("");
  }

  /* ---------- 渲染：招生卡片 ---------- */
  function renderAdmission(el) {
    el.innerHTML = SITE_DATA.admission.map((a, i) => `
      <div class="adcard reveal-up reveal-delay-${(i % 2) + 1}">
        <span class="adcard__icon" aria-hidden="true">${a.icon}</span>
        <h3 class="adcard__title">${a.title}</h3>
        <p class="adcard__text">${a.text}</p>
      </div>`).join("");
  }

  /* 干净的 Google Scholar 链接(只保留 user 与 hl,不含老师原链接里的会话 / 邮箱等多余参数) */
  const SCHOLAR_URL = "https://scholar.google.com/citations?user=lkDrRmoAAAAJ&hl=zh-CN";

  /* ---------- 渲染：最新论文播报(默认取 SITE_DATA.papers 中 isNew 的第一篇) ----------
     有 isNew 论文 → 显示播报；没有 → 移除整块，不留空壳。
     部署版若读到 data/papers.json，setupScholarData 会把内容替换为同步到的最新一篇。 */
  function renderLatestPaper(el) {
    const p = (SITE_DATA.papers || []).find(x => x.isNew === true);
    if (!p) { el.remove(); return; }
    el.innerHTML = `
      <div class="latest reveal-up">
        <div class="latest__main">
          <span class="latest__eyebrow">Latest Update · 最新论文</span>
          <p class="latest__title">${p.title}</p>
          <p class="latest__meta">${[p.year, p.venue, p.direction].filter(Boolean).join(" · ")}</p>
        </div>
        <div class="latest__actions">
          <a class="btn btn--primary" href="#papers-list">查看论文目录</a>
          <a class="btn btn--ghost btn--scholar" href="${SCHOLAR_URL}" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
        </div>
      </div>`;
  }

  /* ---------- 渲染：论文目录(Apple 式轻量列表，非重表格) ----------
     左：年份 / 类型 / 方向标签 · 中：标题(+ 可选 NEW)· 下：期刊 · 右:DOI ↗ 或 Scholar ↗
     list 缺省用 SITE_DATA.papers(静态回退);动态同步数据重渲染时传 visible=true,
     因为此时 IntersectionObserver 已扫过本区，新节点必须自带 is-visible 才不会停在透明态 */
  function renderPapers(el, list, visible) {
    const papers = list || SITE_DATA.papers || [];
    el.innerHTML = papers.map((p, i) => {
      const link = p.doi ? `https://doi.org/${p.doi}` : (p.link || SCHOLAR_URL);
      const linkLabel = p.doi ? "DOI ↗" : "Scholar ↗";
      const newTag = p.isNew ? `<span class="paper__new">NEW</span>` : "";
      return `
      <article class="paper reveal-up reveal-delay-${(i % 3) + 1}${visible ? " is-visible" : ""}">
        <div class="paper__left">
          <span class="paper__year">${esc(p.year) || ""}</span>
          <span class="paper__type">${esc(p.type) || ""}</span>
          ${p.direction ? `<span class="paper__dir">${esc(p.direction)}</span>` : ""}
        </div>
        <div class="paper__mid">
          <h3 class="paper__title">${esc(p.title)}${newTag}</h3>
          ${p.venue ? `<p class="paper__venue">${esc(p.venue)}</p>` : ""}
        </div>
        <a class="paper__link" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>
      </article>`;
    }).join("");
  }

  /* ---------- 渲染:Scholar 引用指标条挂载点 ----------
     初始为空、不占位；只有部署版成功读到 data/google-scholar-stats.json 后,
     由 setupScholarData 注入内容。静态打开时本节点始终为空，页面与从前一致。 */
  function renderScholarStats(el) { el.innerHTML = ""; }

  /* HTML 转义：动态 JSON 数据(来自第三方 API)进 innerHTML 前必须过这层 */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* =========================================================================
     Google Scholar 数据管线前端侧:fetch data/*.json → 成功则增强，失败静默回退
     约定(见 GOOGLE_SCHOLAR_SYNC.md):
       - file:// 打开：浏览器禁止 fetch 本地文件，直接跳过，零控制台报错
       - JSON 404 / 非 ok / status!=="ok" / 数据为空：保持静态渲染，不动页面
       - 成功：注入指标条、用同步论文重渲染目录、更新最新论文播报与尾注
     ========================================================================= */
  function setupScholarData() {
    if (location.protocol === "file:") return;   /* 静态双击打开：用 SITE_DATA 回退 */

    const loadJSON = (path) =>
      fetch(path, { cache: "no-cache" })
        .then(res => (res.ok ? res.json() : null))
        .catch(() => null);

    const fmtDate = (iso) => {
      const d = new Date(iso);
      return isNaN(d) ? "" : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    /* 指标条：总被引 / h-index / i10-index + 同步时间；任一指标缺失则跳过该项 */
    loadJSON("data/google-scholar-stats.json").then(data => {
      try {
        if (!data || data.status !== "ok" || !data.metrics) return;
        const m = data.metrics;
        const items = [
          { num: m.citations_all, label: "总被引 Citations" },
          { num: m.h_index_all, label: "h-index" },
          { num: m.i10_index_all, label: "i10-index" }
        ].filter(x => typeof x.num === "number");
        if (!items.length) return;
        const el = $('[data-render="scholarStats"]');
        if (!el) return;
        const synced = data.synced_at ? fmtDate(data.synced_at) : "";
        el.innerHTML = `
          <div class="sstats">
            <div class="sstats__row">
              ${items.map(x => `
                <div class="sstats__item">
                  <span class="sstats__num">${x.num}</span>
                  <span class="sstats__label">${x.label}</span>
                </div>`).join("")}
            </div>
            <p class="sstats__meta">数据来自 <a href="${esc(data.scholar_url) || SCHOLAR_URL}" target="_blank" rel="noopener noreferrer">Google Scholar</a>${synced ? ` · 最近同步 ${synced}` : ""}</p>
          </div>`;
      } catch (e) { /* 指标条是增强项，任何异常都不影响页面 */ }
    });

    /* 论文目录：同步数据可用则替换静态列表，并更新最新论文播报与尾注 */
    loadJSON("data/papers.json").then(data => {
      try {
        if (!data || data.status !== "ok" || !Array.isArray(data.papers) || !data.papers.length) return;
        const listEl = $("#papers-list");
        if (!listEl) return;
        const papers = data.papers.map((p, i) => ({
          title: p.title || "",
          year: p.year || "",
          venue: [p.venue, typeof p.citations === "number" ? `被引 ${p.citations}` : ""].filter(Boolean).join(" · "),
          type: "论文",
          direction: "",
          link: typeof p.link === "string" && /^https?:\/\//.test(p.link) ? p.link : SCHOLAR_URL,
          isNew: i === 0   /* 同步数据按发表时间排序，第一篇即最新 */
        })).filter(p => p.title);
        if (!papers.length) return;
        renderPapers(listEl, papers, true);

        /* 成果区首个指标：默认静态 70+（SCI 论文）。一旦同步到真实论文列表，
           用 papers.length 如实更新数字与标签：
             - 不沿用「SCI 论文」措辞（无法确认同步条目是否全部为 SCI），改为中性的「论文记录」
             - 不再补「+」（papers.length 是精确条数，不是约数）
             - 静态回退时（pending / 无数据）此处不执行，仍显示老师确认的 70+ / SCI 论文 */
        const statNum = $(".stats .stat__num");
        if (statNum) {
          statNum.dataset.target = String(papers.length);
          statNum.dataset.suffix = "";
          statNum.textContent = String(papers.length);   /* 计数动效可能已跑完，直接定值兜底 */
          const statEl = statNum.closest(".stat");
          const statLabel = statEl ? statEl.querySelector(".stat__label") : null;
          if (statLabel) statLabel.textContent = "论文记录(Google Scholar 同步)";
        }

        /* 最新论文播报：静态块存在时，把内容替换为同步到的最新一篇(textContent,无注入风险) */
        const latestTitle = $(".latest__title");
        const latestMeta = $(".latest__meta");
        if (latestTitle && latestMeta) {
          latestTitle.textContent = papers[0].title;
          latestMeta.textContent = [papers[0].year, papers[0].venue].filter(Boolean).join(" · ");
        }

        /* 尾注：同步数据可用时，把静态预览说明替换为如实的来源与时间标注 */
        const tail = $(".pub__tail");
        if (tail) {
          const synced = data.synced_at ? fmtDate(data.synced_at) : "";
          tail.textContent = `论文数据由 Google Scholar 同步数据生成${synced ? `(最近同步 ${synced})` : ""}。完整信息以 Google Scholar 为准。`;
        }
      } catch (e) { /* 同步数据是增强项，任何异常都保持静态渲染 */ }
    });
  }

  /* ---------- 通用：按 data-render 钩子分发 ---------- */
  const renderers = {
    aboutTags: renderAboutTags,
    research: renderResearch,
    team: renderTeam,
    achievements: renderAchievements,
    stats: renderStats,
    admission: renderAdmission,
    latestPaper: renderLatestPaper,
    papers: renderPapers,
    scholarStats: renderScholarStats
  };

  function mount() {
    $$("[data-render]").forEach(el => {
      const fn = renderers[el.dataset.render];
      if (fn) fn(el);
    });
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- 滚动叙事：进入视口柔和渐显；进入后定格不再变化(避免回灰/闪烁) ---------- */
  function setupScrollReveal() {
    const items = $$(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-fade");
    /* 减少动态效果：全部直接显示，不隐藏任何内容 */
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);   /* 进入即定格，永久保持清晰，不再来回切换 */
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });
    items.forEach(el => io.observe(el));
  }

  /* ---------- 轻微视差：研究区 SVG 随滚动慢速位移(±8px),rAF 节流 ---------- */
  function setupParallax() {
    if (reduceMotion) return;
    const els = $$(".rmod__svg");
    if (!els.length) return;
    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      /* 先批量读，再批量写，避免 scroll 中频繁读写抖动 */
      const offsets = els.map(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return null;
        const ratio = ((r.top + r.height / 2) - vh / 2) / vh;   // -0.5 ~ 0.5
        return Math.max(-8, Math.min(8, -ratio * 16));
      });
      els.forEach((el, i) => {
        if (offsets[i] === null) return;
        el.style.transform = `translate3d(0, ${offsets[i].toFixed(2)}px, 0)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---------- 数字计数动效 ---------- */
  function setupCounters() {
    const nums = $$(".stat__num");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(n => n.textContent = n.dataset.target + (n.dataset.suffix || ""));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        countUp(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  }

  function countUp(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 平滑滚动(考虑吸顶导航高度) ---------- */
  function setupSmoothScroll() {
    const nav = $("#nav");
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (id === "#") return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        const offset = nav.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
        closeMenu();
      });
    });
  }

  /* ---------- 导航：滚动加底、移动端展开 ---------- */
  function setupNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    window.__closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
  }
  function closeMenu() { if (window.__closeMenu) window.__closeMenu(); }

  /* ---------- 初始化 ---------- */
  function init() {
    mount();
    setupNav();
    setupSmoothScroll();
    setupScrollReveal();
    setupCounters();
    setupParallax();
    setupScholarData();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
