/* ============================================================
   思维星球 · 系统化知识框架 (Knowledge Framework)
   以「学而思思维/数学体系」为纲，对现有 4 大模块做系统化映射：
     · 每个模块 → 若干「知识板块 board」→ 各板块在 L1/L2/L3 的专题名称
     · 与 curriculum.js 的章节知识点、questions.js 的标签完全对齐
   另定义：
     · 4 个「进阶分层营」(base/improve/elite/star) —— 难度维度的分层课程模块
     · 6 维「思维能力轴」(ABILITY) —— 用于看板雷达图与能力评估
   本文件是整套课程体系的“骨架”，课程体系页与知识地图页均消费它。
   ============================================================ */

const FRAMEWORK_META = {
  version: "学而思深化版 v2.0",
  source: "参考学而思思维(数学)培优体系：计算 / 几何 / 应用题 / 计数 / 数论 / 组合逻辑",
  gradient: "L1 启蒙(6–8) → L2 发展(9–10) → L3 进阶(11–13)，难度螺旋上升、横向四模块并行。",
  note: "分层营(启航/扬帆/远航/星海)为“难度维度”，与“年龄阶(L1–L3)”正交，可在任意阶内按孩子水平选层练习。"
};

/* ---------------- 模块知识树（学而思体系映射） ---------------- */
const MODULE_SPINE = {
  number: {
    name: "数感运算", icon: "🔢", cls: "m-number", color: "var(--m-number)",
    xueersi: "计算 · 数论 · 典型应用题",
    boards: [
      { id: "calc", name: "数感与计算",
        tiers: { L1: ["数数与认数","比大小与序数","凑十法"],
                 L2: ["表内乘除","巧算凑整","等差数列"],
                 L3: ["分数小数","百分数","简便运算"] } },
      { id: "word", name: "典型应用题",
        tiers: { L1: ["看图列式入门"],
                 L2: ["归一归总","行程问题(路程=速度×时间)"],
                 L3: ["鸡兔同笼(假设法)","平均数","工程/经济初步"] } },
      { id: "numtheory", name: "数论初步",
        tiers: { L1: ["奇偶初步"],
                 L2: ["奇偶性判断"],
                 L3: ["质数合数","整除特征","余数初步"] } }
    ]
  },
  logic: {
    name: "逻辑推理", icon: "🧩", cls: "m-logic", color: "var(--m-logic)",
    xueersi: "组合 · 逻辑 · 计数",
    boards: [
      { id: "rule", name: "规律与推理",
        tiers: { L1: ["找不同","简单规律","分类排序"],
                 L2: ["周期问题","数字推理","条件推理"],
                 L3: ["归纳递推","复杂规律建模"] } },
      { id: "deduce", name: "逻辑排除",
        tiers: { L1: ["排除法","排队推理"],
                 L2: ["真假话问题","关系判断"],
                 L3: ["逻辑谜题","假设反证"] } },
      { id: "count", name: "计数与组合",
        tiers: { L1: ["简单枚举"],
                 L2: ["加乘原理初步"],
                 L3: ["排列组合","容斥原理","握手问题"] } },
      { id: "strategy", name: "统筹与策略",
        tiers: { L1: ["顺序统筹"],
                 L2: ["统筹优化"],
                 L3: ["最值问题","鸽巢(抽屉)原理","博弈策略"] } }
    ]
  },
  shape: {
    name: "图形认知", icon: "🔷", cls: "m-shape", color: "var(--m-shape)",
    xueersi: "几何 · 平面",
    boards: [
      { id: "feat", name: "图形特征",
        tiers: { L1: ["认识基本图形","图形对称"],
                 L2: ["轴对称图形","中心对称"],
                 L3: ["图形性质与判定"] } },
      { id: "trans", name: "图形变换",
        tiers: { L1: ["平移/翻转","按特征分类"],
                 L2: ["旋转","图形分割与剪拼"],
                 L3: ["图形操作与构造"] } },
      { id: "count", name: "图形计数",
        tiers: { L1: ["简单计数","找相同"],
                 L2: ["网格计数","组合计数(长方形)"],
                 L3: ["复杂计数技巧"] } },
      { id: "measure", name: "度量与公式",
        tiers: { L1: ["直观比较大小"],
                 L2: ["周长面积入门"],
                 L3: ["周长计算","面积计算","一笔画","皮克定理"] } }
    ]
  },
  space: {
    name: "空间想象", icon: "🧊", cls: "m-space", color: "var(--m-space)",
    xueersi: "几何 · 立体",
    boards: [
      { id: "solid", name: "立体认识",
        tiers: { L1: ["立体识别","方位认知"],
                 L2: ["面·棱·顶点","立体稳定性"],
                 L3: ["展开图识别","空间折叠"] } },
      { id: "view", name: "视图与展开",
        tiers: { L1: ["镜像方位"],
                 L2: ["三视图(正/侧/俯)"],
                 L3: ["复杂三视图还原","展开图构造"] } },
      { id: "reason", name: "空间推理",
        tiers: { L1: ["数小方块"],
                 L2: ["立体计数"],
                 L3: ["表面涂色切块","切割问题"] } }
    ]
  }
};

/* ---------------- 进阶分层课程模块（难度维度） ---------------- */
const FRAMEWORK_BANDS = [
  { id:"base",    name:"启航营", tag:"基础", color:"#2FD0A6",
    desc:"打牢概念，会做课本级基础题，建立信心与兴趣。" },
  { id:"improve", name:"扬帆营", tag:"提高", color:"#4C6FFF",
    desc:"掌握方法，能做变式题与中等综合题，熟练套路。" },
  { id:"elite",   name:"远航营", tag:"尖子", color:"#9B6DFF",
    desc:"综合应用，解决多步、复合型挑战题，举一反三。" },
  { id:"star",    name:"星海营", tag:"挑战", color:"#FF8A4C",
    desc:"拓展思维，挑战竞赛级开放题与策略题，突破上限。" }
];
// 难度 → 分层营 的默认映射（用于给题库题目标注 band）
const DIFF_TO_BAND = { easy:"base", medium:"improve", hard:"elite", star:"star" };
const BAND_NAME = { base:"启航营", improve:"扬帆营", elite:"远航营", star:"星海营" };

/* ---------------- 六维思维能力轴（看板雷达 / 能力评估） ---------------- */
const ABILITY = [
  { id:"observe",  name:"观察力", desc:"快速捕捉图形、数字、线索的关键特征。" },
  { id:"reason",   name:"推理力", desc:"由已知推出未知，进行条件与逻辑演绎。" },
  { id:"compute",  name:"运算力", desc:"准确、灵活地进行数与式的计算。" },
  { id:"spatial",  name:"空间力", desc:"在脑中旋转、折叠、还原立体图形。" },
  { id:"abstract", name:"抽象力", desc:"把生活问题转化为数学模型。" },
  { id:"strategy", name:"策略力", desc:"选择最优解法，统筹与决策。" }
];

/* ---------------- 工具函数 ---------------- */
function getSpine(module){ return MODULE_SPINE[module]; }
function getBoards(module){ return (MODULE_SPINE[module] && MODULE_SPINE[module].boards) || []; }
function bandOf(diff){ return DIFF_TO_BAND[diff] || "improve"; }
function bandMeta(id){ return FRAMEWORK_BANDS.find(b=>b.id===id) || FRAMEWORK_BANDS[1]; }
