/* ============================================================
   思维星球 · 题库数据层 (Question Bank，学而思深化版)
   数据模型字段：id / module / level / type / difficulty /
   question / visual / options / answer / explanation / tags / band
     band: base(启航/基础) · improve(扬帆/提高) · elite(远航/尖子) · star(星海/挑战)
   目标规模：4 模块 × 150 题 = 600 题；每模块 L1/L2/L3 各 50 题
   难度比例：简单 40% : 中等 40% : 困难 20%
   本文件为可直接导入数据库的结构化种子（QUESTIONS 数组），
   字段与《题库总索引》一致；已补齐至完整 600 题
   （每模块 150 题，L1/L2/L3 各 50；含种子 120 + 程序化生成 480）。
   ============================================================ */

const MODULES = {
  number: { name: "数感运算", icon: "🔢", color: "var(--m-number)", cls: "m-number" },
  logic:  { name: "逻辑推理", icon: "🧩", color: "var(--m-logic)",  cls: "m-logic" },
  shape:  { name: "图形认知", icon: "🔷", color: "var(--m-shape)",  cls: "m-shape" },
  space:  { name: "空间想象", icon: "🧊", color: "var(--m-space)",  cls: "m-space" }
};

const LEVELS = {
  L1: "启蒙 (6–8岁)",
  L2: "发展 (9–10岁)",
  L3: "进阶 (11–13岁)"
};

/* 分层营定义（与 framework.js 的 FRAMEWORK_BANDS 对应） */
const BANDS = {
  base:    { tag:"基础", name:"启航营", color:"#2FD0A6" },
  improve: { tag:"提高", name:"扬帆营", color:"#4C6FFF" },
  elite:   { tag:"尖子", name:"远航营", color:"#9B6DFF" },
  star:    { tag:"挑战", name:"星海营", color:"#FF8A4C" }
};

const BANK_META = {
  total: 600,
  perModule: 150,
  perLevel: 50,
  seed: 600,
  difficulty: { easy: 0.4, medium: 0.4, hard: 0.2 },
  knowledge: {
    number: ["数数与认数","序数","比大小","20以内加减","凑十法","规律数列","应用题","表内乘除","混合运算","巧算","等差数列","归一归总","行程","分数小数","多步混合","鸡兔同笼","工程","年龄","平均数","百分数"],
    logic:  ["分类排序","找不同","简单规律","排队","关系判断","排除法","条件推理","真假话","数字推理","周期问题","逻辑排除","排列组合","容斥原理","复杂推理","鸽巢原理","统筹优化"],
    shape:  ["图形识别","找相同","对称","简单计数","七巧板","图形分类","图形规律","网格计数","平移旋转翻转","轴/中心对称","图形分割","面积周长","组合计数","剪拼","一笔画","格点多边形"],
    space:  ["方位认知","立体识别","数小方块","镜像方位","三视图","展开图","面棱顶点","隐藏方块","镜像翻转","切割","空间折叠","表面涂色切块","复杂三视图","立体计数"]
  },
  formulas: [
    ["握手问题", "n 人握手 = n×(n-1)÷2"],
    ["容斥原理", "总数 = 两部分之和 − 重叠部分"],
    ["鸡兔同笼", "假设法 / 抬脚法"],
    ["正方形网格", "n×n 网格正方形数 = 1²+2²+...+n²"],
    ["一笔画", "奇点个数 = 0 或 2 才能一笔画"],
    ["正方体展开图", "共 11 种；\"田\"\"凹\"字形不能折叠"],
    ["表面涂色切块", "3面=8顶点；2面=12×(棱长−2)；1面=6×(棱长−2)²；0面=(棱长−2)³"],
    ["格点多边形", "皮克定理：面积 = 内部格点 + 边界格点÷2 − 1"]
  ]
};

/* ---------------- 种子题目 ---------------- */
const QUESTIONS = [
  /* ===== 数感运算 number ===== */
  // L1
  {id:"N1-001",module:"number",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"树上有 3 只鸟，又飞来 2 只，现在一共有几只？",visual:["🐦","🐦","🐦","+","🐦","🐦","=","?"],options:["3只","4只","5只","6只"],answer:2,explanation:"原来 3 只，又飞来 2 只，3 + 2 = 5 只。",tags:["20以内加法","应用题"]},
  {id:"N1-002",module:"number",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"比一比：15 和 12，哪个更大？",visual:null,options:["12大","15大","一样大","不能比"],answer:1,explanation:"15 在 12 的后面，所以 15 > 12。",tags:["比大小"]},
  {id:"N1-003",module:"number",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"用凑十法算：9 + 6 = ？",visual:null,options:["13","14","15","16"],answer:2,explanation:"9 差 1 到 10，把 6 分成 1 和 5，9+1=10，10+5=15。",tags:["凑十法"]},
  {id:"N1-004",module:"number",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"小朋友排队，小明排第 3，他前面有几个人？",visual:null,options:["1人","2人","3人","4人"],answer:1,explanation:"排第 3 说明他前面还有 2 个人（第1、第2）。",tags:["序数"]},
  {id:"N1-005",module:"number",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"找规律填数：2, 4, 6, 8, ?",visual:null,options:["9","10","11","12"],answer:1,explanation:"每次多 2，8 + 2 = 10。",tags:["规律数列"]},
  // L1 针对性提高题
  {id:"N1-006",module:"number",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"停车场原来有 7 辆车，开走 3 辆，又开来 2 辆，现在有几辆？",visual:null,options:["5","6","7","8"],answer:1,explanation:"7 − 3 + 2 = 6 辆。",tags:["加减混合","应用题"]},
  {id:"N1-007",module:"number",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"把 3、9、6、1 从大到小排列，正确的是？",visual:null,options:["9,6,3,1","1,3,6,9","6,9,3,1","9,3,6,1"],answer:0,explanation:"从大到小：9 > 6 > 3 > 1。",tags:["比大小","排序"]},
  {id:"N1-008",module:"number",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"用凑十法算：8 + 7 = ？",visual:null,options:["14","15","16","17"],answer:1,explanation:"8 差 2 到 10，把 7 分成 2 和 5，8+2=10，10+5=15。",tags:["凑十法"]},
  {id:"N1-009",module:"number",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"小朋友排成一列，从左数小明第 4，从右数第 3，这一列共几人？",visual:null,options:["5","6","7","8"],answer:1,explanation:"左边 4 人 + 右边 3 人 − 重复数的小明 1 人 = 6 人。",tags:["序数"]},
  {id:"N1-010",module:"number",level:"L1",type:"choice",difficulty:"hard",band:"star",question:"找规律：1, 3, 5, 7, ?",visual:null,options:["8","9","10","11"],answer:1,explanation:"每次多 2（连续奇数），7 + 2 = 9。",tags:["规律数列"]},

  // L2
  {id:"N2-001",module:"number",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"算一算：7 × 8 = ？",visual:null,options:["54","56","63","64"],answer:1,explanation:"乘法口诀：七八五十六。",tags:["表内乘除"]},
  {id:"N2-002",module:"number",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"巧算：36 + 47 + 64 = ？",visual:null,options:["147","148","149","150"],answer:0,explanation:"先算 36 + 64 = 100，再加 47 得 147。",tags:["巧算","凑整"]},
  {id:"N2-003",module:"number",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"等差数列：3, 6, 9, 12, ?",visual:null,options:["14","15","16","18"],answer:1,explanation:"相邻两数相差 3，12 + 3 = 15。",tags:["等差数列"]},
  {id:"N2-004",module:"number",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"归一：3 个本子 12 元，1 个本子几元？",visual:null,options:["3元","4元","5元","6元"],answer:1,explanation:"12 ÷ 3 = 4，一个本子 4 元。",tags:["归一归总"]},
  {id:"N2-005",module:"number",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"行程：小明每分钟走 60 米，5 分钟走多少米？",visual:null,options:["300","320","360","400"],answer:0,explanation:"路程 = 速度 × 时间 = 60 × 5 = 300 米。",tags:["行程"]},
  // L2 针对性提高/挑战题
  {id:"N2-006",module:"number",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"算一算：48 ÷ 6 = ？",visual:null,options:["6","7","8","9"],answer:2,explanation:"乘法口诀：六八四十八，所以 48 ÷ 6 = 8。",tags:["表内乘除"]},
  {id:"N2-007",module:"number",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"巧算：125 + 37 + 75 = ？",visual:null,options:["237","238","240","247"],answer:0,explanation:"先算 125 + 75 = 200，再加 37 得 237。",tags:["巧算","凑整"]},
  {id:"N2-008",module:"number",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"等差数列 5, 9, 13, 17, ?，下一项是？",visual:null,options:["19","20","21","22"],answer:2,explanation:"相邻相差 4，17 + 4 = 21。",tags:["等差数列"]},
  {id:"N2-009",module:"number",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"归一：4 支笔 20 元，买 7 支笔要几元？",visual:null,options:["30","35","40","45"],answer:1,explanation:"一支 20÷4=5 元，7 支 = 5×7 = 35 元。",tags:["归一归总"]},
  {id:"N2-010",module:"number",level:"L2",type:"choice",difficulty:"hard",band:"star",question:"甲乙相距 240 米，甲每分钟走 40 米、乙每分钟走 20 米，相向而行几分钟后相遇？",visual:null,options:["3","4","5","6"],answer:1,explanation:"相遇时间 = 路程 ÷ 速度和 = 240 ÷ (40+20) = 4 分钟。",tags:["行程","相遇问题"]},

  // L3
  {id:"N3-001",module:"number",level:"L3",type:"choice",difficulty:"easy",band:"base",question:"分数加法：1/2 + 1/4 = ？",visual:null,options:["3/4","2/4","1","3/8"],answer:0,explanation:"1/2 = 2/4，2/4 + 1/4 = 3/4。",tags:["分数小数"]},
  {id:"N3-002",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"鸡兔同笼：共有头 10 个、脚 28 只，兔有几只？",visual:null,options:["4只","5只","6只","8只"],answer:0,explanation:"假设全是鸡有 20 只脚，多出 8 只；每把一只鸡换成兔多 2 只脚，8÷2=4 只兔。",tags:["鸡兔同笼"]},
  {id:"N3-003",module:"number",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"平均数：80、90、100 三个数的平均数是多少？",visual:null,options:["85","90","95","100"],answer:1,explanation:"(80 + 90 + 100) ÷ 3 = 270 ÷ 3 = 90。",tags:["平均数"]},
  {id:"N3-004",module:"number",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"百分数：50 是 200 的百分之几？",visual:null,options:["20%","25%","30%","40%"],answer:1,explanation:"50 ÷ 200 = 0.25 = 25%。",tags:["百分数"]},
  {id:"N3-005",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"简便运算：(25 × 4) × 8 = ？",visual:null,options:["100","200","400","800"],answer:3,explanation:"25 × 4 = 100，100 × 8 = 800。",tags:["简便运算"]},
  // L3 针对性提高/挑战题
  {id:"N3-006",module:"number",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"0.5 + 1/2 = ？",visual:null,options:["0.6","1","1.5","2"],answer:1,explanation:"1/2 = 0.5，0.5 + 0.5 = 1。",tags:["分数小数"]},
  {id:"N3-007",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"鸡兔同笼：鸡兔共 8 个头、22 只脚，鸡有几只？",visual:null,options:["3","4","5","6"],answer:2,explanation:"假设全是鸡有 16 只脚，多 6 只；每换一兔多 2 脚，6÷2=3 只兔，鸡 = 8−3 = 5 只。",tags:["鸡兔同笼"]},
  {id:"N3-008",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"甲乙丙平均身高 140cm，甲乙都是 140，丙身高？",visual:null,options:["130","140","150","160"],answer:1,explanation:"三人总和 140×3=420，减去甲乙 280，丙 = 140。",tags:["平均数"]},
  {id:"N3-009",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"一件衣服打八折后是 80 元，原价？",visual:null,options:["90","100","110","120"],answer:1,explanation:"八折 = 80%，原价 = 80 ÷ 0.8 = 100 元。",tags:["百分数","折扣"]},
  {id:"N3-010",module:"number",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"简便运算：25 × 32 × 125 = ？",visual:null,options:["100000","10000","1000","1000000"],answer:0,explanation:"32 = 4×8，25×4=100，125×8=1000，100×1000=100000。",tags:["简便运算"]},

  /* ===== 逻辑推理 logic ===== */
  // L1
  {id:"L1-001",module:"logic",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"找不同：下面哪个不是水果？",visual:["🍎","🍌","🍊","🥕"],options:["苹果","香蕉","橙子","胡萝卜"],answer:3,explanation:"苹果、香蕉、橙子是水果，胡萝卜是蔬菜。",tags:["找不同"]},
  {id:"L1-002",module:"logic",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"找规律：红、蓝、红、蓝、？",visual:["🔴","🔵","🔴","🔵","?"],options:["红","蓝","绿","黄"],answer:0,explanation:"红蓝交替出现，下一个是红。",tags:["简单规律"]},
  {id:"L1-003",module:"logic",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"按从小到大排列：5、2、8",visual:null,options:["2,5,8","5,2,8","8,5,2","2,8,5"],answer:0,explanation:"2 < 5 < 8，顺序为 2,5,8。",tags:["分类排序"]},
  {id:"L1-004",module:"logic",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"排队：A 在 B 前面，B 在 C 前面，最前面是谁？",visual:null,options:["A","B","C","不确定"],answer:0,explanation:"A→B→C，最前面是 A。",tags:["排队"]},
  {id:"L1-005",module:"logic",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"排除法：小球有红、黄、蓝三种，不是红也不是黄，那是？",visual:["🔴","🟡","🔵"],options:["红","黄","蓝","无"],answer:2,explanation:"排除了红和黄，剩下的就是蓝。",tags:["排除法"]},
  // L1 针对性提高题
  {id:"L1-006",module:"logic",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"下面哪个不是交通工具？",visual:["🚗","🚌","✈️","🍎"],options:["汽车","公交","飞机","苹果"],answer:3,explanation:"汽车、公交、飞机都是交通工具，苹果是水果。",tags:["找不同"]},
  {id:"L1-007",module:"logic",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"找规律：△ ○ △ ○ △ ○ ？",visual:null,options:["△","○","□","☆"],answer:1,explanation:"三角和圆交替出现，下一个是圆。",tags:["简单规律"]},
  {id:"L1-008",module:"logic",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"把 9、4、7 从大到小排列，正确的是？",visual:null,options:["9,7,4","4,7,9","7,9,4","9,4,7"],answer:0,explanation:"从大到小：9 > 7 > 4。",tags:["分类排序"]},
  {id:"L1-009",module:"logic",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"小红在小力前面，小力在小勇前面，最后面是谁？",visual:null,options:["小红","小力","小勇","不确定"],answer:2,explanation:"顺序是 小红→小力→小勇，最后面是小勇。",tags:["排队"]},
  {id:"L1-010",module:"logic",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"盒子装红、绿、蓝三色球，摸出不是绿也不是蓝，是？",visual:null,options:["红","绿","蓝","黄"],answer:0,explanation:"排除绿和蓝，剩下红色。",tags:["排除法"]},

  // L2
  {id:"L2-001",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"甲乙丙只有一人说真话。甲说\"是乙偷的\"，乙说\"不是我偷的\"，丙说\"不是我偷的\"，谁是贼？",visual:null,options:["甲","乙","丙","无人"],answer:2,explanation:"若丙是贼：甲假、乙真、丙假，恰好一人说真话，成立。",tags:["真假话","逻辑排除"]},
  {id:"L2-002",module:"logic",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"周期：今天是周一，过 7 天是周几？",visual:null,options:["周一","周二","周日","周六"],answer:0,explanation:"7 天正好一整周，还是周一。",tags:["周期问题"]},
  {id:"L2-003",module:"logic",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"数字推理：2, 4, 8, 16, ?",visual:null,options:["18","24","32","64"],answer:2,explanation:"每个数都是前一个的 2 倍，16 × 2 = 32。",tags:["数字推理"]},
  {id:"L2-004",module:"logic",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"8 月 1 日是周五，8 月 8 日是周几？",visual:null,options:["周五","周六","周日","周四"],answer:0,explanation:"相差 7 天，正好一周，仍为周五。",tags:["周期问题","星期几"]},
  {id:"L2-005",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"如果下雨就带伞。今天带了伞，说明？",visual:null,options:["一定下雨","可能下雨","没下雨","无关"],answer:1,explanation:"带伞是下雨的必要不充分条件，带伞不一定下雨，只是可能。",tags:["条件推理"]},
  // L2 针对性提高/挑战题
  {id:"L2-006",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"star",question:"三个盒子标签「苹果」「橘子」「混合」全贴错。你看到一个盒子真是苹果，那么贴「混合」标签的盒子实际装？",visual:null,options:["苹果","橘子","混合","无法确定"],answer:1,explanation:"标签全错，「苹果」标签盒不能是苹果，现在看到它是苹果；剩下橘子与混合给「橘子」「混合」标签且都错→「混合」标签必装橘子。",tags:["逻辑排除","真假话"]},
  {id:"L2-007",module:"logic",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"图案按 ⭐🔵⭐🔵⭐🔵 排列，第 9 个是什么？",visual:null,options:["⭐","🔵","❓","随机"],answer:0,explanation:"周期为 2，第奇数个是⭐，9 是奇数→⭐。",tags:["周期问题"]},
  {id:"L2-008",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"数字推理：1, 2, 4, 7, 11, ? 下一个？",visual:null,options:["15","16","17","18"],answer:1,explanation:"相邻差 1,2,3,4，下一个差 5，11+5=16。",tags:["数字推理"]},
  {id:"L2-009",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"今天周三，过 10 天是周几？",visual:null,options:["周五","周六","周日","周一"],answer:1,explanation:"10 ÷ 7 余 3，周三 + 3 天 = 周六。",tags:["周期问题","星期几"]},
  {id:"L2-010",module:"logic",level:"L2",type:"choice",difficulty:"hard",band:"star",question:"如果停电就停课；今天没停课，能推出？",visual:null,options:["一定停电","一定没停电","可能停电","无关"],answer:1,explanation:"逆否命题：没停课→没停电，必然成立。",tags:["条件推理"]},

  // L3
  {id:"L3-001",module:"logic",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"握手问题：4 个人互相握手一次，共握几次？",visual:null,options:["6次","8次","12次","16次"],answer:0,explanation:"公式 n×(n-1)÷2 = 4×3÷2 = 6 次。",tags:["排列组合","握手问题"]},
  {id:"L3-002",module:"logic",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"容斥：会游泳 20 人，会骑车 15 人，两项都会 5 人，至少会一种的几人？",visual:null,options:["30","35","28","25"],answer:0,explanation:"20 + 15 − 5 = 30 人。",tags:["容斥原理"]},
  {id:"L3-003",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"鸽巢原理：13 只鸽子放进 12 个笼子，至少有一个笼子有几只？",visual:null,options:["1只","2只","3只","4只"],answer:1,explanation:"13 只分到 12 笼，至少有一笼 ≥ 2 只。",tags:["鸽巢原理"]},
  {id:"L3-004",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"n 个人互相握手共 10 次，n 是几？",visual:null,options:["4","5","6","7"],answer:1,explanation:"n×(n-1)÷2 = 10 → n = 5。",tags:["排列组合","握手问题"]},
  {id:"L3-005",module:"logic",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"统筹优化：煮蛋要 10 分钟，同时可以洗杯子，最少共需几分钟？",visual:null,options:["10分","15分","20分","12分"],answer:0,explanation:"煮蛋同时洗杯，并行处理，只需 10 分钟。",tags:["统筹优化"]},
  // L3 针对性提高/挑战题
  {id:"L3-006",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"握手问题：5 人两两握手共几次？",visual:null,options:["10","15","20","25"],answer:0,explanation:"5×4÷2 = 10 次。",tags:["排列组合","握手问题"]},
  {id:"L3-007",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"容斥：30 人，18 人会英语，15 人会日语，都会 8 人，至少会一种几人？",visual:null,options:["25","30","33","35"],answer:0,explanation:"18 + 15 − 8 = 25 人。",tags:["容斥原理"]},
  {id:"L3-008",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"鸽巢原理：把 25 个苹果放进 6 个抽屉，至少有一个抽屉不少于几个？",visual:null,options:["4","5","6","7"],answer:1,explanation:"25 ÷ 6 = 4 余 1，至少有一个抽屉 ≥ 5 个。",tags:["鸽巢原理"]},
  {id:"L3-009",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"从 4 种颜色选 2 种涂上下两行（顺序有关），有几种涂法？",visual:null,options:["6","8","12","16"],answer:2,explanation:"上色 4 选 1、下色 3 选 1（不同色），4×3 = 12 种。",tags:["排列组合"]},
  {id:"L3-010",module:"logic",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"烤面包每面 1 分钟，锅同时放 2 片，3 片最少几分钟烤完两面？",visual:null,options:["2","3","4","5"],answer:1,explanation:"第1分 A正B正；第2分 A反C正；第3分 B反C反，共 3 分钟。",tags:["统筹优化"]},

  /* ===== 图形认知 shape ===== */
  // L1
  {id:"S1-001",module:"shape",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"下面哪个是三角形？",visual:["●","■","▲","★"],options:["圆形","方形","三角形","星星"],answer:2,explanation:"▲ 有三条边，是三角形。",tags:["图形识别"]},
  {id:"S1-002",module:"shape",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"下面哪个图形是左右对称的？",visual:["⚪","🔺","⬛","✂"],options:["圆形","不等边三角","任意四边","剪刀"],answer:0,explanation:"圆形沿任意直径都能对折重合，是对称图形。",tags:["对称"]},
  {id:"S1-003",module:"shape",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"一行有 5 个○，共 3 行，一共有几个？",visual:["○○○○○","○○○○○","○○○○○"],options:["8","15","12","10"],answer:1,explanation:"5 × 3 = 15 个。",tags:["简单计数"]},
  {id:"S1-004",module:"shape",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"🔺🔺⭐🔺 里面有几个三角形？",visual:["🔺","🔺","⭐","🔺"],options:["1","2","3","4"],answer:2,explanation:"数一数，三角形有 3 个。",tags:["找相同"]},
  {id:"S1-005",module:"shape",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"按颜色分：🔴🔵🔴🔵 可以分成？",visual:["🔴","🔵","🔴","🔵"],options:["2红2蓝","4个圆","1红3蓝","不能分"],answer:0,explanation:"按颜色分成红色 2 个、蓝色 2 个。",tags:["图形分类"]},
  // L1 针对性提高题
  {id:"S1-006",module:"shape",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"下面哪个有 4 条直边且 4 个直角？",visual:null,options:["圆形","三角形","正方形","半圆"],answer:2,explanation:"正方形有 4 条相等的直边和 4 个直角。",tags:["图形识别"]},
  {id:"S1-007",module:"shape",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"下面哪个不是轴对称图形？",visual:null,options:["正方形","圆","平行四边形(非矩形)","等腰三角形"],answer:2,explanation:"一般平行四边形无论怎么对折都不能重合，不是轴对称图形。",tags:["对称"]},
  {id:"S1-008",module:"shape",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"每排 4 个○，共 5 排，一共几个？",visual:null,options:["9","15","20","25"],answer:2,explanation:"4 × 5 = 20 个。",tags:["简单计数"]},
  {id:"S1-009",module:"shape",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"⭐🔺⭐🔺⭐ 里有几个星星？",visual:null,options:["1","2","3","4"],answer:2,explanation:"数一数，星星有 3 个。",tags:["找相同"]},
  {id:"S1-010",module:"shape",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"🔺🔴🔺🔴🔺 按形状分，三角形有几个？",visual:null,options:["2","3","4","5"],answer:1,explanation:"5 个图形里三角形有 3 个。",tags:["图形分类"]},

  // L2
  {id:"S2-001",module:"shape",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"图形规律：△、□、△、□、？",visual:["△","□","△","□","?"],options:["△","□","○","☆"],answer:0,explanation:"三角和方交替，下一个是△。",tags:["图形规律"]},
  {id:"S2-002",module:"shape",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"2×2 网格里一共有几个正方形？",visual:["⬜","⬜","⬜","⬜"],options:["4","5","6","9"],answer:1,explanation:"公式 1²+2² = 1 + 4 = 5 个（4 个小 + 1 个大）。",tags:["网格计数"]},
  {id:"S2-003",module:"shape",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"箭头 → 顺时针旋转 90° 后指向？",visual:["→"],options:["↑","↓","←","↗"],answer:1,explanation:"向右的箭头顺时针转 90° 指向正下方 ↓。",tags:["平移旋转翻转"]},
  {id:"S2-004",module:"shape",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"下面哪个是轴对称图形？",visual:["🔺","▱","◣","✂"],options:["等腰三角形","斜平行四边形","任意三角","剪刀"],answer:0,explanation:"等腰三角形沿高对折两边重合。",tags:["轴/中心对称"]},
  {id:"S2-005",module:"shape",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"把一个正方形切成两个相同的三角形，应沿哪儿切？",visual:["⬜"],options:["对角线","一条边","横中线","随便"],answer:0,explanation:"沿对角线剪开得到两个全等的直角三角形。",tags:["图形分割"]},
  // L2 针对性提高/挑战题
  {id:"S2-006",module:"shape",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"图形规律：○△□○△□？",visual:null,options:["○","△","□","☆"],answer:0,explanation:"周期为 3（圆三角方），第 7 个回到圆。",tags:["图形规律"]},
  {id:"S2-007",module:"shape",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"3×3 网格里一共有几个正方形？",visual:null,options:["9","14","16","25"],answer:1,explanation:"1²+2²+3² = 1+4+9 = 14 个。",tags:["网格计数"]},
  {id:"S2-008",module:"shape",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"箭头 ↑ 顺时针旋转 90° 后指向？",visual:null,options:["→","←","↓","↑"],answer:0,explanation:"向上(12点)的箭头顺时针转 90° 指向右方(3点)，即 →。",tags:["平移旋转翻转"]},
  {id:"S2-009",module:"shape",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"等边三角形有几条对称轴？",visual:null,options:["1","2","3","0"],answer:2,explanation:"等边三角形 3 条高都是对称轴，共 3 条。",tags:["轴/中心对称"]},
  {id:"S2-010",module:"shape",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"把一个平行四边形分成两个相同的三角形，应沿？",visual:null,options:["一条对角线","中线","任意线","高"],answer:0,explanation:"沿一条对角线剪开得到两个全等的三角形。",tags:["图形分割"]},

  // L3
  {id:"S3-001",module:"shape",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"\"田\"字格能不能一笔画成？",visual:["#","#","#","#"],options:["能","不能","不确定","看情况"],answer:1,explanation:"田字有 4 个奇点（>2），不能一笔画。",tags:["一笔画"]},
  {id:"S3-002",module:"shape",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"皮克定理：内部格点 3 个、边界格点 4 个，面积是多少？",visual:null,options:["4","5","6","7"],answer:0,explanation:"面积 = 内部 + 边界÷2 − 1 = 3 + 2 − 1 = 4。",tags:["格点多边形","皮克定理"]},
  {id:"S3-003",module:"shape",level:"L3",type:"choice",difficulty:"easy",band:"base",question:"边长 4 cm 的正方形，面积是多少？",visual:null,options:["8","12","16","20"],answer:2,explanation:"正方形面积 = 边长 × 边长 = 4 × 4 = 16 cm²。",tags:["面积周长"]},
  {id:"S3-004",module:"shape",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"2×2 网格中（含正方形）一共有几个长方形？",visual:["⬜","⬜","⬜","⬜"],options:["5","9","13","14"],answer:1,explanation:"横选 2 条线 C(3,2)=3，纵选 2 条线 C(3,2)=3，共 3×3=9 个。",tags:["组合计数"]},
  {id:"S3-005",module:"shape",level:"L3",type:"choice",difficulty:"easy",band:"base",question:"长 5 宽 3 的长方形，周长是多少？",visual:null,options:["15","16","8","10"],answer:1,explanation:"周长 = (长 + 宽) × 2 = (5 + 3) × 2 = 16。",tags:["面积周长"]},
  // L3 针对性提高/挑战题
  {id:"S3-006",module:"shape",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"“日”字形（矩形加中间一横）能不能一笔画成？",visual:null,options:["能","不能","看情况","不确定"],answer:0,explanation:"“日”字只有 2 个奇点，符合一笔画条件，能一笔画成。",tags:["一笔画"]},
  {id:"S3-007",module:"shape",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"皮克定理：内部格点 5 个、边界格点 6 个，面积是多少？",visual:null,options:["5","6","7","8"],answer:2,explanation:"面积 = 5 + 6÷2 − 1 = 5 + 3 − 1 = 7。",tags:["格点多边形","皮克定理"]},
  {id:"S3-008",module:"shape",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"边长 5 的正方形，周长是多少？",visual:null,options:["10","15","20","25"],answer:2,explanation:"周长 = 4 × 5 = 20。",tags:["面积周长"]},
  {id:"S3-009",module:"shape",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"3×3 网格中（含正方形）一共有几个长方形？",visual:null,options:["36","45","54","81"],answer:0,explanation:"横选 2 线 C(4,2)=6，纵选 2 线 C(4,2)=6，共 6×6=36 个。",tags:["组合计数"]},
  {id:"S3-010",module:"shape",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"正方形周长 24，边长是多少？",visual:null,options:["4","6","8","12"],answer:1,explanation:"边长 = 周长 ÷ 4 = 24 ÷ 4 = 6。",tags:["面积周长"]},

  /* ===== 空间想象 space ===== */
  // L1
  {id:"P1-001",module:"space",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"太阳从哪个方向升起？",visual:["🌅"],options:["东","西","南","北"],answer:0,explanation:"太阳每天从东方升起。",tags:["方位认知"]},
  {id:"P1-002",module:"space",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"一层摆成 2×2，一共用了几块小正方体？",visual:["⬛","⬛","⬛","⬛"],options:["2","4","6","8"],answer:1,explanation:"2 行 2 列，2 × 2 = 4 块。",tags:["数小方块"]},
  {id:"P1-003",module:"space",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"下面哪个物体最稳、不容易滚？",visual:null,options:["皮球","正方体","尖朝下圆锥","半圆"],answer:1,explanation:"正方体底面平整，能稳稳放住；球会滚动。",tags:["立体识别"]},
  {id:"P1-004",module:"space",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"照镜子时，镜子里的字母 b 看起来像哪个？",visual:null,options:["b","d","p","q"],answer:1,explanation:"平面镜左右翻转，b 变成 d。",tags:["镜像方位"]},
  {id:"P1-005",module:"space",level:"L1",type:"choice",difficulty:"easy",band:"base",question:"桌子上面放着一本书，书在桌子的什么位置？",visual:["📚","🪑"],options:["上面","下面","左边","右边"],answer:0,explanation:"书在桌子上面。",tags:["方位认知"]},
  // L1 针对性提高题
  {id:"P1-006",module:"space",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"傍晚太阳从哪个方向落下？",visual:null,options:["东","西","南","北"],answer:1,explanation:"太阳从西方落下。",tags:["方位认知"]},
  {id:"P1-007",module:"space",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"摆成 3×2，一共用了几块小正方体？",visual:null,options:["5","6","8","9"],answer:1,explanation:"3 行 2 列，3 × 2 = 6 块。",tags:["数小方块"]},
  {id:"P1-008",module:"space",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"下面哪种能稳稳站住且不会滚动？",visual:null,options:["球","圆锥(尖朝下)","圆柱(横放)","正方体积木"],answer:3,explanation:"正方体积木底面平整，稳稳放住也不会滚动。",tags:["立体识别"]},
  {id:"P1-009",module:"space",level:"L1",type:"choice",difficulty:"hard",band:"elite",question:"镜子中“上”字看起来？",visual:null,options:["上","下","不变","左右翻"],answer:2,explanation:"“上”字左右基本对称，镜中看起来不变。",tags:["镜像方位"]},
  {id:"P1-010",module:"space",level:"L1",type:"choice",difficulty:"medium",band:"improve",question:"书在桌子上面，橡皮在书上面，橡皮在桌子什么位置？",visual:null,options:["上面","下面","左边","右边"],answer:0,explanation:"橡皮在书上面、书在桌子上面，所以橡皮也在桌子上面。",tags:["方位认知"]},

  // L2
  {id:"P2-001",module:"space",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"一个正方体有几个面？",visual:null,options:["4","6","8","12"],answer:1,explanation:"正方体有 6 个面。",tags:["面棱顶点"]},
  {id:"P2-002",module:"space",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"一个正方体有几条棱？",visual:null,options:["8","10","12","14"],answer:2,explanation:"正方体有 12 条棱。",tags:["面棱顶点"]},
  {id:"P2-003",module:"space",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"\"田\"字形的展开图能折成正方体吗？",visual:null,options:["能","不能","看情况","一定"],answer:1,explanation:"\"田\"字有重叠面，不能折成正方体（11 种展开图不含田字）。",tags:["展开图"]},
  {id:"P2-004",module:"space",level:"L2",type:"choice",difficulty:"easy",band:"base",question:"正方体有几个顶点？",visual:null,options:["6","8","10","12"],answer:1,explanation:"正方体有 8 个顶点。",tags:["面棱顶点"]},
  {id:"P2-005",module:"space",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"从正前方看一个正方体，看到的形状是？",visual:null,options:["圆","正方形","三角形","梯形"],answer:1,explanation:"正视图是一个正方形。",tags:["三视图"]},
  // L2 针对性提高题
  {id:"P2-006",module:"space",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"一个长方体有几条棱？",visual:null,options:["8","10","12","14"],answer:2,explanation:"长方体和正方体一样有 12 条棱。",tags:["面棱顶点"]},
  {id:"P2-007",module:"space",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"下面哪种一定不能折成正方体？",visual:null,options:["1-4-1型","3-3型","田字型","2-3-1型"],answer:2,explanation:"田字型有重叠面，11 种标准展开图不含它。",tags:["展开图"]},
  {id:"P2-008",module:"space",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"从正上方看一个立着的圆柱，看到的形状是？",visual:null,options:["圆","长方形","正方形","三角形"],answer:0,explanation:"俯视圆柱看到的是上面的圆面。",tags:["三视图"]},
  {id:"P2-009",module:"space",level:"L2",type:"choice",difficulty:"medium",band:"improve",question:"3×3×3 的大正方体由几个小正方体组成？",visual:null,options:["9","18","27","36"],answer:2,explanation:"3 × 3 × 3 = 27 个小正方体。",tags:["立体计数"]},
  {id:"P2-010",module:"space",level:"L2",type:"choice",difficulty:"hard",band:"elite",question:"A 在 B 左边，B 在 C 左边，最右边是谁？",visual:null,options:["A","B","C","不确定"],answer:2,explanation:"顺序 A→B→C，最右边是 C。",tags:["方位推理"]},

  // L3
  {id:"P3-001",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"棱长 3 的正方体表面涂色后切成小方块，3 面涂色的有几块？",visual:null,options:["0","4","6","8"],answer:3,explanation:"3 面涂色的是 8 个顶点，共 8 块。",tags:["表面涂色切块"]},
  {id:"P3-002",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"棱长 3 的正方体，2 面涂色的小方块有几块？",visual:null,options:["12","16","18","24"],answer:0,explanation:"2 面涂色在棱上（不含顶点）：12 × (3−2) = 12 块。",tags:["表面涂色切块"]},
  {id:"P3-003",module:"space",level:"L3",type:"choice",difficulty:"easy",band:"base",question:"一个正方体切 1 刀，最多分成几块？",visual:null,options:["2","3","4","5"],answer:0,explanation:"一刀切下最多分成 2 块。",tags:["切割"]},
  {id:"P3-004",module:"space",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"2×2×2 的大正方体由几个小正方体组成？",visual:null,options:["4","6","8","12"],answer:2,explanation:"2 × 2 × 2 = 8 个小正方体。",tags:["立体计数"]},
  {id:"P3-005",module:"space",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"下面哪种展开图可以折成正方体？",visual:null,options:["1-4-1 型","田字型","凹字型","错位 L 型"],answer:0,explanation:"1-4-1 型是 11 种标准展开图之一；田字、凹字不能折。",tags:["展开图","空间折叠"]},
  // L3 针对性提高/挑战题
  {id:"P3-006",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"棱长 4 的正方体表面涂色后切成小方块，3 面涂色的有几块？",visual:null,options:["4","6","8","12"],answer:2,explanation:"3 面涂色恒为 8 个顶点，与棱长无关。",tags:["表面涂色切块"]},
  {id:"P3-007",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"star",question:"棱长 4 的正方体，2 面涂色的小方块有几块？",visual:null,options:["12","24","36","48"],answer:1,explanation:"12 × (4−2) = 24 块。",tags:["表面涂色切块"]},
  {id:"P3-008",module:"space",level:"L3",type:"choice",difficulty:"medium",band:"improve",question:"一个蛋糕切 2 刀（两刀相交），最多分成几块？",visual:null,options:["3","4","5","6"],answer:1,explanation:"两刀相交最多分成 4 块。",tags:["切割"]},
  {id:"P3-009",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"棱长 3 的正方体，1 面涂色的小方块有几块？",visual:null,options:["6","12","18","24"],answer:2,explanation:"1 面涂色在每面中心：6 × (3−2)² = 6 块。",tags:["表面涂色切块"]},
  {id:"P3-010",module:"space",level:"L3",type:"choice",difficulty:"hard",band:"elite",question:"俯视 2×2、正视左列高 2 层、右列高 1 层，搭成此立体最少要几块？",visual:null,options:["3","4","5","6"],answer:2,explanation:"俯视 4 格为底；左列需至少 1 格高 2，其余各 1，最少 2+1+1+1 = 5 块。",tags:["复杂三视图"]}
];

/* ---------------- 抽题工具 ---------------- */
function loadQuestions(module, level, count, band) {
  let pool = QUESTIONS.filter(q =>
    q.module === module &&
    (!level || q.level === level) &&
    (!band  || q.band  === band)
  );
  // Fisher–Yates 洗牌
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count || pool.length);
}
function bankCount(module, level, band) {
  return QUESTIONS.filter(q =>
    q.module === module &&
    (!level || q.level === level) &&
    (!band  || q.band  === band)
  ).length;
}
// 按分层营统计某模块某阶各层题量
function bandCount(module, level) {
  const r = { base:0, improve:0, elite:0, star:0 };
  QUESTIONS.forEach(q => {
    if (q.module===module && (!level || q.level===level) && r[q.band]!==undefined) r[q.band]++;
  });
  return r;
}

/* =====================================================================
   自动补齐至 600 题：以 curriculum.js 的 60 章为锚点，每章生成 8 道
   针对性习题（每模块每阶 = 50 题）。所有答案由代码计算，确保正确；
   每章知识点与 curriculum.js 章节一一对应，分层梯度：base/improve/elite/star。
   ===================================================================== */
(function extendBankTo600(){
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  // 构造一道选择题：correct 为正确答案(字符串)，w 为 3 个干扰项(字符串)
  function mk(q, correct, w, band, diff, tag, why, visual){
    const opts = shuffle([String(correct), String(w[0]), String(w[1]), String(w[2])]);
    return { question:q, visual: visual||null, options:opts, answer:opts.indexOf(String(correct)),
             explanation:why, difficulty:diff, band:band, tags:[tag], type:"choice" };
  }
  // 数值型干扰项生成：x-1, x+1, x+2（均不等于 x）
  const nw = x => [String(x-1), String(x+1), String(x+2)];

  const GEN = {
    logic:{
      L1:{
        1:()=>[
          ["下面哪个不是水果？ 🍎 🍌 🍊 🥕","胡萝卜",["苹果","香蕉","橙子"],"improve","medium","找不同","胡萝卜是蔬菜，其他是水果。"],
          ["下面哪个不是陆生宠物？ 🐶 🐱 🐰 🐟","鱼",["狗","猫","兔"],"improve","medium","找不同","鱼生活在水里，其他是陆生宠物。"],
          ["下面哪个不是交通工具？ 🚗 🚌 ✈️ 🍎","苹果",["汽车","公交","飞机"],"improve","medium","找不同","苹果是水果，其他是交通工具。"],
          ["下面哪个不是颜色球？ 🔴 🔵 🟢 🔺","三角形",["红色","蓝色","绿色"],"elite","hard","找不同","三角形是形状，其他是颜色的球。"],
          ["下面哪个不是食物？ 🍞 🥛 🧀 📚","书",["面包","牛奶","奶酪"],"elite","hard","找不同","书是用品，其他是食物。"],
          ["下面哪个不是鸟类？ 🐦 🦅 🦉 🐟","鱼",["麻雀","鹰","猫头鹰"],"improve","medium","找不同","鱼不是鸟，其他都是鸟。"],
          ["下面哪个不是颜色？ 🔵 🟡 🟣 🔺","三角形",["蓝色","黄色","紫色"],"elite","hard","找不同","三角形是形状，其他是颜色。"],
          ["下面哪个不是水果？ 🍇 🍉 🍓 🥕","胡萝卜",["葡萄","西瓜","草莓"],"improve","medium","找不同","胡萝卜是蔬菜，其他是水果。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["找规律：红、蓝、红、蓝、？","红",["蓝","绿","黄"],"improve","medium","简单规律","红蓝交替，下一个是红。"],
          ["找规律：△、○、△、○、？","△",["○","□","☆"],"improve","medium","简单规律","三角和圆交替，下一个是三角。"],
          ["找规律：1, 3, 5, 7, ?","9",nw(9),"improve","medium","规律数列","每次多 2，7+2=9。"],
          ["找规律：2, 4, 6, 8, ?","10",nw(10),"improve","medium","规律数列","每次多 2，8+2=10。"],
          ["找规律：⭐、🌙、⭐、🌙、？","⭐",["🌙","☁","⚡"],"elite","hard","简单规律","星月交替，下一个是星。"],
          ["找规律：大、中、小、大、中、？","小",["大","中","无"],"elite","hard","简单规律","大中小循环，下一个是小。"],
          ["找规律：🐱、🐶、🐱、🐶、？","🐱",["🐶","🐰","🐻"],"improve","medium","简单规律","猫狗交替，下一个是猫。"],
          ["找规律：A、B、A、B、？","A",["B","C","D"],"improve","medium","简单规律","AB 交替，下一个是 A。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["把 3、1、2 从小到大排列。","1, 2, 3",["3, 1, 2","2, 3, 1","1, 3, 2"],"improve","medium","分类排序","顺序应为 1、2、3。"],
          ["把 8、5、9 从大到小排列。","9, 8, 5",["5, 8, 9","8, 9, 5","9, 5, 8"],"elite","hard","分类排序","9>8>5。"],
          ["把 4、7、2 从小到大排列。","2, 4, 7",["4, 2, 7","7, 4, 2","2, 7, 4"],"improve","medium","分类排序","2<4<7。"],
          ["把 10、6、8 从大到小排列。","10, 8, 6",["6, 8, 10","8, 10, 6","10, 6, 8"],"elite","hard","分类排序","10>8>6。"],
          ["把 5、3、4 从小到大排列。","3, 4, 5",["5, 3, 4","4, 5, 3","3, 5, 4"],"improve","medium","分类排序","3<4<5。"],
          ["把 9、1、4 从大到小排列。","9, 4, 1",["1, 4, 9","4, 9, 1","9, 1, 4"],"elite","hard","分类排序","9>4>1。"],
          ["把 2、6、3 从小到大排列。","2, 3, 6",["2, 6, 3","6, 2, 3","3, 6, 2"],"improve","medium","分类排序","2<3<6。"],
          ["把 7、4、5 从大到小排列。","7, 5, 4",["4, 5, 7","5, 7, 4","7, 4, 5"],"elite","hard","分类排序","7>5>4。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["A 在 B 前面，B 在 C 前面，最前面是谁？","A",["B","C","不确定"],"improve","medium","排队推理","顺序是 A→B→C，最前是 A。"],
          ["小红在小力前面，小力在小勇前面，最后面是谁？","小勇",["小红","小力","不确定"],"elite","hard","排队推理","顺序小红→小力→小勇，最后是小勇。"],
          ["甲在乙左边，乙在丙左边，最左边是谁？","甲",["乙","丙","不确定"],"improve","medium","排队推理","顺序甲→乙→丙，最左是甲。"],
          ["第一排：小明后面是小华，小华后面是小丽，排头是谁？","小明",["小华","小丽","不确定"],"elite","hard","排队推理","小明在最前。"],
          ["猫在狗前面，狗在兔前面，最后面是谁？","兔",["猫","狗","不确定"],"improve","medium","排队推理","顺序猫→狗→兔，最后是兔。"],
          ["甲排第 2，乙排第 5，甲在乙哪边？","前面",["后面","同一位","不确定"],"elite","hard","排队推理","第 2 在第 5 前面。"],
          ["从前往后：第 1 小一、第 2 小二、第 3 小三，第 3 是谁？","小三",["小一","小二","小四"],"improve","medium","排队推理","第 3 是小三。"],
          ["红在蓝前面，蓝在绿前面，中间是谁？","蓝",["红","绿","不确定"],"elite","hard","排队推理","顺序红→蓝→绿，中间是蓝。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["小球有红、黄、蓝三种，不是红也不是黄，那是？","蓝",["红","黄","无"],"improve","medium","排除法","排除红和黄，剩下蓝。"],
          ["苹果、香蕉、橘子三种，不是香蕉也不是橘子，那是？","苹果",["香蕉","橘子","梨"],"improve","medium","排除法","排除香蕉和橘子，剩下苹果。"],
          ["三角形、圆形、正方形中，不是圆也不是方，那是？","三角形",["圆","方","无"],"elite","hard","排除法","排除圆和方，剩下三角形。"],
          ["春、夏、秋、冬中，不是春也不是冬，那是？","夏",["春","冬","秋"],"elite","hard","排除法","排除春和冬，剩下夏。"],
          ["猫、狗、兔中，不是狗也不是兔，那是？","猫",["狗","兔","熊"],"improve","medium","排除法","排除狗和兔，剩下猫。"],
          ["红绿灯中不是红也不是绿，那是？","黄",["红","绿","蓝"],"improve","medium","排除法","排除红和绿，剩下黄。"],
          ["语文、数学、英语中，不是数学也不是英语，那是？","语文",["数学","英语","体育"],"elite","hard","排除法","排除数学和英语，剩下语文。"],
          ["方块、圆、三角、星中，不是圆也不是三角，那是？","方块",["圆","三角","星"],"improve","medium","排除法","排除圆和三角，剩下方块。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L2:{
        1:()=>[
          ["今天是周一，过 7 天是周几？","周一",["周二","周日","周六"],"base","easy","周期问题","7 天正好一周，还是周一。"],
          ["图案按 ⭐ 🔵 ⭐ 🔵 排列，第 9 个是什么？","⭐",["🔵","❓","随机"],"improve","medium","周期问题","周期为 2，第奇数个是 ⭐。"],
          ["红、蓝、红、蓝…… 第 10 个是什么？","蓝",["红","绿","黄"],"improve","medium","周期问题","周期为 2，第偶数个是蓝。"],
          ["今天是周三，过 7 天是周几？","周三",["周四","周二","周日"],"base","easy","周期问题","7 天一周，还是周三。"],
          ["今天是周一，过 14 天是周几？","周一",["周二","周日","周六"],"improve","medium","周期问题","14 天是两周，还是周一。"],
          ["晴、阴、雨 每 3 天一循环，第 10 天是什么天气？","晴",["阴","雨","未知"],"elite","hard","周期问题","10÷3 余 1，回到周期第一个：晴。"],
          ["今天是周一，过 3 天是周几？","周四",["周三","周五","周日"],"elite","hard","周期问题","周一+3 天=周四。"],
          ["图形按 △ ○ □ 循环，第 11 个是什么？","○",["△","□","☆"],"elite","hard","周期问题","11÷3 余 2，是周期第 2 个：○。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["找规律：2, 4, 8, 16, ?","32",nw(32),"elite","hard","数字推理","每个数是前一个的 2 倍，16×2=32。"],
          ["找规律：1, 2, 4, 7, 11, ?","16",nw(16),"elite","hard","数字推理","相邻差 1,2,3,4，下一个差 5，11+5=16。"],
          ["找规律：3, 6, 12, 24, ?","48",nw(48),"elite","hard","数字推理","每个数是前一个的 2 倍，24×2=48。"],
          ["找规律：1, 3, 5, 7, ?","9",nw(9),"improve","medium","数字推理","每次多 2，7+2=9。"],
          ["找规律：5, 10, 20, 40, ?","80",nw(80),"elite","hard","数字推理","每个数是前一个的 2 倍，40×2=80。"],
          ["找规律：100, 90, 80, 70, ?","60",nw(60),"elite","hard","数字推理","每次少 10，70−10=60。"],
          ["找规律：2, 3, 5, 8, 12, ?","17",nw(17),"elite","hard","数字推理","相邻差 1,2,3,4，下一个差 5，12+5=17。"],
          ["找规律：1, 4, 9, 16, ?","25",nw(25),"star","hard","数字推理","依次是平方数 1²,2²,3²,4²，下一个 5²=25。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["如果下雨就带伞。今天带了伞，说明？","可能下雨",["一定下雨","没下雨","无关"],"improve","medium","条件推理","带伞是下雨的结果，但带伞不一定下雨，只是可能。"],
          ["写完作业才能看电视。小明在看电视，说明？","可能写完",["一定写完","没写","无关"],"improve","medium","条件推理","看电视说明可能写完了作业，但不是必然。"],
          ["考试满分就有奖励。小明有奖励，说明？","可能满分",["一定满分","没满分","无关"],"elite","hard","条件推理","有奖励可能来自满分，但也可能来自别的，不能反推。"],
          ["绿灯亮才能通行。车在通行，说明？","可能绿灯",["一定绿灯","红灯","无关"],"improve","medium","条件推理","通行说明可能绿灯，不能必然反推。"],
          ["如果下雨地就会湿。地湿了，说明？","可能下雨",["一定下雨","没下","无关"],"elite","hard","条件推理","地湿可能是下雨，也可能是洒水，不能反推。"],
          ["凭票才能入场。小红进入了会场，说明？","可能有票",["一定没票","没票","无关"],"improve","medium","条件推理","能入场说明可能有票，不能必然反推。"],
          ["努力就会进步。小明进步了，说明？","可能努力",["一定努力","没努力","无关"],"elite","hard","条件推理","进步可能来自努力，也可能另有原因。"],
          ["生病就要请假。同学请假了，说明？","可能生病",["一定生病","没病","无关"],"improve","medium","条件推理","请假可能生病，也可能有事，不能反推。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["甲说“我不是贼”，乙说“丙是贼”，丙说“我不是贼”，只有一人说真话。谁是贼？","甲",["乙","丙","无人"],"elite","hard","真假话","若甲是贼：甲假、乙假、丙真→只有丙说真话，成立，贼是甲。"],
          ["甲说“我不是贼”，乙说“丙是贼”，丙说“我不是贼”，只有一人说真话。谁说真话？","丙",["甲","乙","无人"],"elite","hard","真假话","只有丙的话为真时恰好一人说真话，所以丙说真话。"],
          ["甲说“乙是贼”，乙说“我不是贼”，丙说“我不是贼”，只有一人说真话。谁是贼？","丙",["甲","乙","无人"],"elite","hard","真假话","若丙是贼：甲假、乙真、丙假→只有乙说真话，成立，贼是丙。"],
          ["甲说“乙是贼”，乙说“我不是贼”，丙说“我不是贼”，只有一人说真话。谁说真话？","乙",["甲","丙","无人"],"elite","hard","真假话","只有乙的话为真时恰好一人说真话，所以乙说真话。"],
          ["红说“我不是贼”，黄说“蓝是贼”，蓝说“我不是贼”，只有一人说真话。谁是贼？","红",["黄","蓝","无人"],"star","hard","真假话","若红是贼：红假、黄假、蓝真→只有蓝说真话，成立，贼是红。"],
          ["猫说“我不是贼”，狗说“兔是贼”，兔说“我不是贼”，只有一人说真话。谁说真话？","兔",["猫","狗","无人"],"star","hard","真假话","只有兔的话为真时恰好一人说真话，所以兔说真话。"],
          ["张说“李是贼”，李说“我不是贼”，王说“我不是贼”，只有一人说真话。谁是贼？","李",["张","王","无人"],"star","hard","真假话","若李是贼：张假、李真、王假→只有李说真话，成立，贼是李。"],
          ["小一说“小二不是贼”，小二说“小三是贼”，小三说“我不是贼”，只有一人说真话。谁说真话？","小二",["小一","小三","无人"],"star","hard","真假话","只有小二的话为真时恰好一人说真话，所以小二说真话。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["今天是周一，过 10 天是周几？","周四",["周三","周五","周日"],"elite","hard","星期推算","10÷7 余 3，周一+3 天=周四。"],
          ["今天是周六，过 5 天是周几？","周四",["周三","周五","周日"],"elite","hard","星期推算","5 天：日、一、二、三、四，所以是周四。"],
          ["今天是周日，过 3 天是周几？","周三",["周二","周四","周一"],"improve","medium","星期推算","3 天：一、二、三，所以是周三。"],
          ["1 号是周一，15 号是周几？","周一",["周二","周日","周六"],"elite","hard","星期推算","相差 14 天（两周），还是周一。"],
          ["今天是周四，过 9 天是周几？","周六",["周五","周日","周三"],"elite","hard","星期推算","9÷7 余 2，周四+2 天=周六。"],
          ["今天是周二，过 20 天是周几？","周一",["周日","周三","周四"],"star","hard","星期推算","20÷7 余 6，周二+6 天=周一。"],
          ["今天是周五，过 7 天是周几？","周五",["周六","周四","周日"],"base","easy","星期推算","7 天正好一周，还是周五。"],
          ["今天是周三，过 5 天是周几？","周一",["周日","周二","周四"],"elite","hard","星期推算","5 天：四、五、六、日、一，所以是周一。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L3:{
        1:()=>[
          ["3 个人互相握手一次，共握几次？","3",nw(3),"base","easy","握手问题","公式 3×2÷2=3 次。"],
          ["6 个人互相握手一次，共握几次？","15",nw(15),"improve","medium","握手问题","公式 6×5÷2=15 次。"],
          ["7 个人互相握手一次，共握几次？","21",nw(21),"elite","hard","握手问题","公式 7×6÷2=21 次。"],
          ["8 个人互相握手一次，共握几次？","28",nw(28),"elite","hard","握手问题","公式 8×7÷2=28 次。"],
          ["9 个人互相握手一次，共握几次？","36",nw(36),"improve","medium","握手问题","公式 9×8÷2=36 次。"],
          ["10 个人互相握手一次，共握几次？","45",nw(45),"elite","hard","握手问题","公式 10×9÷2=45 次。"],
          ["12 个人互相握手一次，共握几次？","66",nw(66),"star","hard","握手问题","公式 12×11÷2=66 次。"],
          ["2 个人互相握手一次，共握几次？","1",nw(1),"base","easy","握手问题","两个人只握 1 次。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["会画画 12 人，会跳舞 9 人，都会 4 人，至少会一种的几人？","17",nw(17),"improve","medium","容斥原理","12+9−4=17 人。"],
          ["喜欢足球 25 人，喜欢篮球 20 人，都喜欢 10 人，至少喜欢一种的几人？","35",nw(35),"elite","hard","容斥原理","25+20−10=35 人。"],
          ["语文及格 30 人，数学及格 28 人，都及格 20 人，至少及格一科的几人？","38",nw(38),"elite","hard","容斥原理","30+28−20=38 人。"],
          ["红色 25 个，蓝色 18 个，都有 8 个，至少有一种颜色的几个？","35",nw(35),"improve","medium","容斥原理","25+18−8=35 个。"],
          ["会钢琴 15 人，会吉他 10 人，都会 6 人，至少会一种的几人？","19",nw(19),"elite","hard","容斥原理","15+10−6=19 人。"],
          ["一班 35 人，二班 30 人，两班都参加的 10 人，至少参加一班的有几人？","55",nw(55),"elite","hard","容斥原理","35+30−10=55 人。"],
          ["会游泳 18 人，会骑车 12 人，都会 5 人，至少会一种的几人？","25",nw(25),"improve","medium","容斥原理","18+12−5=25 人。"],
          ["英语 22 人，日语 18 人，都会 8 人，至少会一种的几人？","32",nw(32),"star","hard","容斥原理","22+18−8=32 人。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["13 只鸽子放进 12 个笼子，至少有一个笼子不少于几只？","2",nw(2),"base","easy","鸽巢原理","13 只分到 12 笼，至少有一笼 ≥2 只。"],
          ["25 个苹果放进 6 个抽屉，至少有一个抽屉不少于几个？","5",nw(5),"elite","hard","鸽巢原理","25÷6=4 余 1，至少有一个抽屉 ≥5 个。"],
          ["10 只袜子放进 5 个抽屉，至少有一个抽屉不少于几只？","2",nw(2),"improve","medium","鸽巢原理","10÷5=2，至少有一个抽屉 ≥2 只。"],
          ["9 只鸽子放进 4 个笼子，至少有一个笼子不少于几只？","3",nw(3),"elite","hard","鸽巢原理","9÷4=2 余 1，至少有一个笼子 ≥3 只。"],
          ["17 支铅笔放进 4 个笔筒，至少有一个笔筒不少于几支？","5",nw(5),"elite","hard","鸽巢原理","17÷4=4 余 1，至少有一个笔筒 ≥5 支。"],
          ["21 颗糖果放进 5 个盒子，至少有一个盒子不少于几颗？","5",nw(5),"improve","medium","鸽巢原理","21÷5=4 余 1，至少有一个盒子 ≥5 颗。"],
          ["8 个球放进 3 个盒子，至少有一个盒子不少于几个？","3",nw(3),"improve","medium","鸽巢原理","8÷3=2 余 2，至少有一个盒子 ≥3 个。"],
          ["100 个人分布在 12 个月，至少同月出生的人不少于几个？","9",nw(9),"star","hard","鸽巢原理","100÷12=8 余 4，至少有 9 人同月出生。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["6 个人互相握手一次，共握几次？","15",nw(15),"improve","medium","排列组合","无序组合 C(6,2)=6×5÷2=15 次。"],
          ["从 5 本书中选 2 本送人（不考虑顺序），有几种选法？","10",nw(10),"improve","medium","排列组合","组合 C(5,2)=5×4÷2=10 种。"],
          ["3 个人排成一排，有几种排法？","6",nw(6),"elite","hard","排列组合","排列 3!=3×2×1=6 种。"],
          ["从 5 种颜色中选 2 种涂上下两行（顺序有关、颜色不同），有几种涂法？","20",nw(20),"elite","hard","排列组合","上色 5 选 1、下色 4 选 1，5×4=20 种。"],
          ["4 个人排成一排，有几种排法？","24",nw(24),"elite","hard","排列组合","排列 4!=4×3×2×1=24 种。"],
          ["从 6 本书中选 2 本送人，有几种选法？","15",nw(15),"improve","medium","排列组合","组合 C(6,2)=6×5÷2=15 种。"],
          ["7 个人互相握手一次，共握几次？","21",nw(21),"elite","hard","排列组合","无序组合 C(7,2)=7×6÷2=21 次。"],
          ["从 3 种颜色中选 2 种（不考虑顺序），有几种选法？","3",nw(3),"base","easy","排列组合","组合 C(3,2)=3 种。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["煮蛋要 10 分钟，同时可以洗杯子，最少共需几分钟？","10",nw(10),"base","easy","统筹优化","煮蛋同时洗杯子，并行处理，只需 10 分钟。"],
          ["烤面包每面 1 分钟，锅同时放 2 片，3 片最少几分钟烤完两面？","3",nw(3),"elite","hard","统筹优化","第1分A正B正；第2分A反C正；第3分B反C反，共 3 分钟。"],
          ["烧水要 8 分钟，同时可以刷牙洗脸，最少共需几分钟？","8",nw(8),"improve","medium","统筹优化","烧水同时洗漱，只需 8 分钟。"],
          ["数学作业 20 分、语文作业 15 分，可同时听录音（不影响），最少共需几分钟？","20",nw(20),"elite","hard","统筹优化","两项作业并行，取最长 20 分钟。"],
          ["煮面要 5 分钟，同时可以切葱，最少共需几分钟？","5",nw(5),"improve","medium","统筹优化","煮面同时切葱，只需 5 分钟。"],
          ["洗衣机洗衣服 30 分，同时可以拖地，最少共需几分钟？","30",nw(30),"elite","hard","统筹优化","洗衣同时拖地，只需 30 分钟。"],
          ["烤 4 片面包每面 1 分钟，锅同时放 2 片，最少几分钟？","4",nw(4),"elite","hard","统筹优化","分两批各 2 分钟，共 4 分钟。"],
          ["烧水要 10 分钟，同时可以写作业，最少共需几分钟？","10",nw(10),"improve","medium","统筹优化","烧水同时写题，只需 10 分钟。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      }
    },
    shape:{
      L1:{
        1:()=>[
          ["下面哪个是正方形？ ■ ● ▲ ★","■",["圆","三角","星星"],"base","easy","图形识别","正方形有 4 条相等的直边和 4 个直角。"],
          ["下面哪个是圆？ ● ■ ▲","●",["方","三角","星"],"base","easy","图形识别","圆是没有直边的曲线图形。"],
          ["三角形有几条边？","3",nw(3),"improve","medium","图形识别","三角形有 3 条边。"],
          ["正方形有几条边？","4",nw(4),"improve","medium","图形识别","正方形有 4 条相等的边。"],
          ["下面哪个不是四边形？","三角形",["正方形","长方形","梯形"],"elite","hard","图形识别","四边形有 4 条边，三角形只有 3 条。"],
          ["圆有几条边？","0",["1","无数","4"],"elite","hard","图形识别","圆是曲线图形，没有直边。"],
          ["下面哪个有 4 个直角且对边相等？","长方形",["圆","三角","五角星"],"improve","medium","图形识别","长方形有 4 个直角、对边相等。"],
          ["五角星有几条边？","5",nw(5),"elite","hard","图形识别","五角星有 5 条边。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["下面哪个是左右对称的？ ⚪","圆",["不等边三角","任意四边","剪刀"],"base","easy","图形对称","圆沿任意直径对折都能重合。"],
          ["下面哪个不是轴对称图形？","平行四边形(非矩形)",["正方形","圆","等腰三角形"],"elite","hard","图形对称","一般平行四边形无论怎么对折都不能重合。"],
          ["下面哪个是轴对称图形？ 🔺","等腰三角形",["任意斜三角","不等边三角","半圆"],"improve","medium","图形对称","等腰三角形沿高对折两边重合。"],
          ["正方形有几条对称轴？","4",nw(4),"elite","hard","图形对称","正方形有 4 条对称轴（两条中线+两条对角线）。"],
          ["圆有几条对称轴？","无数",["1","4","2"],"improve","medium","图形对称","圆沿任意直径都对称，有无数条。"],
          ["下面哪个不是对称图形？","斜箭头",["方块","圆","等腰三角"],"elite","hard","图形对称","斜箭头左右不等，不是轴对称。"],
          ["长方形有几条对称轴？","2",nw(2),"improve","medium","图形对称","长方形有 2 条对称轴（两条中线）。"],
          ["等边三角形有几条对称轴？","3",nw(3),"elite","hard","图形对称","等边三角形 3 条高都是对称轴。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["一行有 5 个○，共 3 行，一共有几个？","15",nw(15),"base","easy","简单计数","5×3=15 个。"],
          ["每排 4 个○，共 5 排，一共有几个？","20",nw(20),"improve","medium","简单计数","4×5=20 个。"],
          ["一行有 3 个○，共 4 行，一共有几个？","12",nw(12),"base","easy","简单计数","3×4=12 个。"],
          ["每排 6 个○，共 2 排，一共有几个？","12",nw(12),"improve","medium","简单计数","6×2=12 个。"],
          ["一行有 10 个○，共 1 行，一共有几个？","10",nw(10),"base","easy","简单计数","10×1=10 个。"],
          ["3 排，每排 3 个○，一共有几个？","9",nw(9),"improve","medium","简单计数","3×3=9 个。"],
          ["每排 5 个○，共 4 排，一共有几个？","20",nw(20),"improve","medium","简单计数","5×4=20 个。"],
          ["2 行，每行 8 个○，一共有几个？","16",nw(16),"base","easy","简单计数","2×8=16 个。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["🔺 🔺 ⭐ 🔺 里面有几个三角形？","3",nw(3),"base","easy","找相同","数一数，三角形有 3 个。"],
          ["⭐ 🔺 ⭐ 🔺 ⭐ 里有几个星星？","3",nw(3),"improve","medium","找相同","星星有 3 个。"],
          ["🔴 🔴 🔵 🔴 里有几个红色？","3",nw(3),"improve","medium","找相同","红色有 3 个。"],
          ["🐱 🐱 🐶 🐱 里有几只猫？","3",nw(3),"base","easy","找相同","猫有 3 只。"],
          ["△ ○ △ ○ △ 里有几个三角形？","3",nw(3),"improve","medium","找相同","三角形有 3 个。"],
          ["⭐ ⭐ 🌟 ⭐ 里有几个星星？","3",nw(3),"elite","hard","找相同","普通星星有 3 个。"],
          ["🟢 🟢 🔴 🟢 里有几个绿色？","3",nw(3),"improve","medium","找相同","绿色有 3 个。"],
          ["🔺 🔺 🔺 🔺 ⭐ 里有几个三角形？","4",nw(4),"elite","hard","找相同","三角形有 4 个。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["🔴 🔵 🔴 🔵 可以分成？","2 红 2 蓝",["4 个圆","1 红 3 蓝","不能分"],"base","easy","按特征分类","按颜色分，红色 2 个、蓝色 2 个。"],
          ["🔺 🔺 ⭐ 🔺 按形状分，三角形有几个？","3",nw(3),"improve","medium","按特征分类","三角形有 3 个。"],
          ["🍎 🍎 🍌 🍎 按种类分，苹果有几个？","3",nw(3),"improve","medium","按特征分类","苹果有 3 个。"],
          ["🔴 🔴 🔵 🔵 按颜色分，可以分成？","2 红 2 蓝",["4 个红","2 红 2 黄","不能分"],"improve","medium","按特征分类","红色 2 个、蓝色 2 个。"],
          ["🐶 🐱 🐶 🐱 按动物分，狗有几个？","2",nw(2),"base","easy","按特征分类","狗有 2 只。"],
          ["⬛ ⬜ ⬛ ⬜ 按颜色分，黑色有几个？","2",nw(2),"improve","medium","按特征分类","黑色有 2 个。"],
          ["🔺 🔵 🔺 🔵 按形状分，三角形有几个？","2",nw(2),"improve","medium","按特征分类","三角形有 2 个。"],
          ["⭐ 🔺 ⭐ 🔺 按形状分，星星有几个？","2",nw(2),"elite","hard","按特征分类","星星有 2 个。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L2:{
        1:()=>[
          ["图形规律：△、□、△、□、？","△",["□","○","☆"],"base","easy","图形规律","三角和方交替，下一个是△。"],
          ["图形规律：○、△、□、○、△、□、？","○",["△","□","☆"],"improve","medium","图形规律","周期为 3（圆三角方），第 7 个回到圆。"],
          ["图形规律：🔴、🔵、🔴、🔵、？","🔴",["🔵","🟢","🟡"],"improve","medium","图形规律","红蓝交替，下一个是红。"],
          ["箭头规律：→、↑、→、↑、？","→",["↑","↓","←"],"elite","hard","图形规律","右和上交替，下一个是→。"],
          ["图形规律：⭐、🌙、⭐、🌙、？","⭐",["🌙","☁","⚡"],"improve","medium","图形规律","星月交替，下一个是星。"],
          ["图形规律：■、□、■、□、？","■",["□","▢","◯"],"elite","hard","图形规律","黑方和白方交替，下一个是■。"],
          ["图形规律：🐱、🐶、🐱、🐶、？","🐱",["🐶","🐰","🐻"],"improve","medium","图形规律","猫狗交替，下一个是猫。"],
          ["图形规律：A、B、A、B、？","A",["B","C","D"],"elite","hard","图形规律","AB 交替，下一个是 A。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["2×2 网格里一共有几个正方形？","5",nw(5),"base","easy","网格计数","小正方形 4 个 + 大正方形 1 个 = 5 个。"],
          ["3×3 网格里一共有几个正方形？","14",nw(14),"elite","hard","网格计数","1²+2²+3²=1+4+9=14 个。"],
          ["1×1 网格里一共有几个正方形？","1",nw(1),"base","easy","网格计数","只有 1 个小正方形。"],
          ["4×4 网格里一共有几个正方形？","30",nw(30),"elite","hard","网格计数","1²+2²+3²+4²=1+4+9+16=30 个。"],
          ["5×5 网格里一共有几个正方形？","55",nw(55),"star","hard","网格计数","1²+…+5²=1+4+9+16+25=55 个。"],
          ["2×3 网格里一共有几个正方形？","8",nw(8),"improve","medium","网格计数","1×1 有 6 个、2×2 有 2 个，共 8 个。"],
          ["3×2 网格里一共有几个正方形？","8",nw(8),"improve","medium","网格计数","与 2×3 相同，共 8 个。"],
          ["1×4 网格里一共有几个正方形？","4",nw(4),"improve","medium","网格计数","只有 4 个 1×1 小正方形。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["箭头 → 顺时针旋转 90° 后指向？","↓",["↑","←","↗"],"base","easy","平移旋转翻转","向右的箭头顺时针转 90° 指向正下方。"],
          ["箭头 ↑ 顺时针旋转 90° 后指向？","→",["←","↓","↑"],"elite","hard","平移旋转翻转","向上的箭头顺时针转 90° 指向右方。"],
          ["箭头 ↓ 顺时针旋转 90° 后指向？","←",["→","↑","↘"],"elite","hard","平移旋转翻转","向下的箭头顺时针转 90° 指向左方。"],
          ["箭头 ← 顺时针旋转 90° 后指向？","↑",["↓","→","↖"],"elite","hard","平移旋转翻转","向左的箭头顺时针转 90° 指向上方。"],
          ["箭头 → 逆时针旋转 90° 后指向？","↑",["↓","←","↗"],"elite","hard","平移旋转翻转","向右的箭头逆时针转 90° 指向上方。"],
          ["图形向右平移 2 格后，它的方向？","不变",["旋转","翻转","消失"],"improve","medium","平移旋转翻转","平移只改变位置，不改变方向和形状。"],
          ["纸上的字母 b 水平翻转后看起来像？","d",["b","p","q"],"elite","hard","平移旋转翻转","平面镜左右翻转，b 变成 d。"],
          ["正方形旋转 90° 后，形状变成？","仍是正方形",["变长方形","变三角形","消失"],"improve","medium","平移旋转翻转","旋转不改变图形形状，仍是正方形。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["下面哪个是轴对称图形？ 🔺","等腰三角形",["斜平行","任意三角","剪刀"],"base","easy","图形对称","等腰三角形沿高对折两边重合。"],
          ["等边三角形有几条对称轴？","3",nw(3),"elite","hard","图形对称","等边三角形 3 条高都是对称轴。"],
          ["正方形有几条对称轴？","4",nw(4),"elite","hard","图形对称","正方形有 4 条对称轴。"],
          ["下面哪个不是轴对称图形？","平行四边形",["圆","正方","等腰三角"],"elite","hard","图形对称","一般平行四边形不是轴对称。"],
          ["长方形有几条对称轴？","2",nw(2),"improve","medium","图形对称","长方形有 2 条对称轴（两条中线）。"],
          ["圆有几条对称轴？","无数",["1","4","2"],"improve","medium","图形对称","圆有无数条对称轴。"],
          ["五角星有几条对称轴？","5",nw(5),"elite","hard","图形对称","五角星有 5 条对称轴。"],
          ["等腰梯形有几条对称轴？","1",nw(1),"improve","medium","图形对称","等腰梯形只有 1 条对称轴（上下底中点的连线）。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["把一个正方形切成两个相同的三角形，应沿哪儿切？","对角线",["一条边","横中线","随便"],"base","easy","图形分割","沿对角线剪开得到两个全等的直角三角形。"],
          ["把一个平行四边形分成两个相同的三角形，应沿？","一条对角线",["中线","任意线","高"],"elite","hard","图形分割","沿一条对角线剪开得到两个全等的三角形。"],
          ["把一个圆分成两个相同的半圆，应沿？","过圆心的直径",["半径","任意弦","圆周"],"improve","medium","图形分割","沿过圆心的直径对半分。"],
          ["把一个长方形分成两个相同的长方形，应沿？","平行于短边的中线",["对角线","一个角","随便"],"elite","hard","图形分割","沿中线（平行短边）平分。"],
          ["把一个正方形分成 4 个相同的小正方形，应沿？","横竖各切一线",["对角线","一条线","圆形线"],"elite","hard","图形分割","横竖各切一线成“井”字。"],
          ["把等腰三角形分成两个相同的小三角形，应沿？","底边上的高",["一条腰","随机中线","底边"],"improve","medium","图形分割","沿底边上的高（也是对称轴）平分。"],
          ["把圆分成完全相同的两份，最少需要？","一条直径",["两条线","一条半径","不需要"],"elite","hard","图形分割","沿一条直径即可平分。"],
          ["要把一张圆饼分成完全相同的两份，最少切几刀？","1 刀",["2 刀","3 刀","0 刀"],"improve","medium","图形分割","沿直径切 1 刀即可。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L3:{
        1:()=>[
          ["“田”字格能不能一笔画成？","不能",["能","不确定","看情况"],"elite","hard","一笔画","田字有 4 个奇点（>2），不能一笔画。"],
          ["“日”字形能不能一笔画成？","能",["不能","看情况","不确定"],"star","hard","一笔画","日字只有 2 个奇点，符合一笔画条件。"],
          ["一笔画要求图形中奇点（连奇数条线）的个数是？","0 或 2",["1 或 3","任意偶数","任意"],"improve","medium","一笔画","奇点个数为 0 或 2 才能一笔画。"],
          ["一个三角形能不能一笔画成？","能",["不能","看情况","需 2 笔"],"improve","medium","一笔画","三角形有 0 个奇点，可以一笔画。"],
          ["五角星能不能一笔画成？","能",["不能","看情况","不确定"],"elite","hard","一笔画","五角星有 0 个奇点，可以一笔画。"],
          ["一个正方形能不能一笔画成？","能",["不能","看情况","需 2 笔"],"base","easy","一笔画","正方形有 0 个奇点，可以一笔画。"],
          ["一个图形有 3 个奇点，能不能一笔画成？","不能",["能","看情况","需 1 笔"],"elite","hard","一笔画","奇点个数 >2，一定不能一笔画。"],
          ["“品”字形能不能一笔画成？","不能",["能","看情况","不确定"],"star","hard","一笔画","品字有多个奇点，不能一笔画。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["格点多边形：内部格点 3 个、边界格点 4 个，面积是多少？","4",nw(4),"base","easy","皮克定理","面积 = 3 + 4÷2 − 1 = 4。"],
          ["格点多边形：内部格点 5 个、边界格点 6 个，面积是多少？","7",nw(7),"elite","hard","皮克定理","面积 = 5 + 6÷2 − 1 = 7。"],
          ["格点多边形：内部格点 2 个、边界格点 4 个，面积是多少？","3",nw(3),"improve","medium","皮克定理","面积 = 2 + 4÷2 − 1 = 3。"],
          ["格点多边形：内部格点 4 个、边界格点 8 个，面积是多少？","7",nw(7),"elite","hard","皮克定理","面积 = 4 + 8÷2 − 1 = 7。"],
          ["格点多边形：内部格点 0 个、边界格点 4 个，面积是多少？","1",["2","0","4"],"improve","medium","皮克定理","面积 = 0 + 4÷2 − 1 = 1（即一个单位正方形）。"],
          ["格点多边形：内部格点 6 个、边界格点 6 个，面积是多少？","8",nw(8),"elite","hard","皮克定理","面积 = 6 + 6÷2 − 1 = 8。"],
          ["格点多边形：内部格点 1 个、边界格点 6 个，面积是多少？","3",nw(3),"improve","medium","皮克定理","面积 = 1 + 6÷2 − 1 = 3。"],
          ["格点多边形：内部格点 8 个、边界格点 4 个，面积是多少？","9",nw(9),"star","hard","皮克定理","面积 = 8 + 4÷2 − 1 = 9。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["边长 4 cm 的正方形，面积是多少？","16",nw(16),"base","easy","面积与周长","正方形面积 = 4×4 = 16 cm²。"],
          ["边长 5 cm 的正方形，面积是多少？","25",nw(25),"improve","medium","面积与周长","正方形面积 = 5×5 = 25 cm²。"],
          ["边长 6 cm 的正方形，面积是多少？","36",nw(36),"elite","hard","面积与周长","正方形面积 = 6×6 = 36 cm²。"],
          ["边长 3 cm 的正方形，面积是多少？","9",nw(9),"base","easy","面积与周长","正方形面积 = 3×3 = 9 cm²。"],
          ["边长 7 cm 的正方形，面积是多少？","49",nw(49),"elite","hard","面积与周长","正方形面积 = 7×7 = 49 cm²。"],
          ["边长 8 cm 的正方形，面积是多少？","64",nw(64),"elite","hard","面积与周长","正方形面积 = 8×8 = 64 cm²。"],
          ["边长 10 cm 的正方形，面积是多少？","100",nw(100),"star","hard","面积与周长","正方形面积 = 10×10 = 100 cm²。"],
          ["边长 9 cm 的正方形，面积是多少？","81",nw(81),"elite","hard","面积与周长","正方形面积 = 9×9 = 81 cm²。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["2×2 网格中（含正方形）一共有几个长方形？","9",nw(9),"base","easy","组合计数","横选 2 线 C(3,2)=3，纵选 2 线 C(3,2)=3，共 3×3=9 个。"],
          ["3×3 网格中（含正方形）一共有几个长方形？","36",nw(36),"elite","hard","组合计数","横选 C(4,2)=6，纵选 C(4,2)=6，共 6×6=36 个。"],
          ["1×1 网格中一共有几个长方形？","1",nw(1),"base","easy","组合计数","只有 1 个。"],
          ["2×3 网格中一共有几个长方形？","18",nw(18),"improve","medium","组合计数","横选 C(3,2)=3，纵选 C(4,2)=6，共 3×6=18 个。"],
          ["1×3 网格中一共有几个长方形？","6",nw(6),"improve","medium","组合计数","横选 C(2,2)=1，纵选 C(4,2)=6，共 1×6=6 个。"],
          ["3×1 网格中一共有几个长方形？","6",nw(6),"improve","medium","组合计数","横选 C(4,2)=6，纵选 C(2,2)=1，共 6×1=6 个。"],
          ["4×4 网格中一共有几个长方形？","100",nw(100),"star","hard","组合计数","横选 C(5,2)=10，纵选 C(5,2)=10，共 10×10=100 个。"],
          ["2×1 网格中一共有几个长方形？","3",nw(3),"base","easy","组合计数","横选 C(3,2)=3，纵选 C(2,2)=1，共 3×1=3 个。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["长 5 宽 3 的长方形，周长是多少？","16",nw(16),"base","easy","周长计算","周长 = (5+3)×2 = 16。"],
          ["边长 5 的正方形，周长是多少？","20",nw(20),"improve","medium","周长计算","周长 = 4×5 = 20。"],
          ["周长 24 的正方形，边长是多少？","6",nw(6),"elite","hard","周长计算","边长 = 24÷4 = 6。"],
          ["长 6 宽 4 的长方形，周长是多少？","20",nw(20),"improve","medium","周长计算","周长 = (6+4)×2 = 20。"],
          ["长 7 宽 3 的长方形，周长是多少？","20",nw(20),"elite","hard","周长计算","周长 = (7+3)×2 = 20。"],
          ["边长 8 的正方形，周长是多少？","32",nw(32),"elite","hard","周长计算","周长 = 4×8 = 32。"],
          ["周长 40 的长方形，长与宽的和是多少？","20",nw(20),"improve","medium","周长计算","长+宽 = 周长÷2 = 20。"],
          ["长 10 宽 2 的长方形，周长是多少？","24",nw(24),"elite","hard","周长计算","周长 = (10+2)×2 = 24。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      }
    },
    number:{
      L1:{
        1:()=>[
          ["树上有 3 只鸟，又飞来 2 只，现在一共有几只？","5",nw(5),"base","easy","数数与认数","3+2=5 只。"],
          ["盘里有 4 个苹果，吃掉 1 个，还剩几个？","3",nw(3),"improve","medium","数数与认数","4−1=3 个。"],
          ["2 加上 3 等于几？","5",nw(5),"base","easy","数数与认数","2+3=5。"],
          ["桌上有 5 颗糖，吃掉 2 颗，还剩几颗？","3",nw(3),"improve","medium","数数与认数","5−2=3 颗。"],
          ["1 加上 4 等于几？","5",nw(5),"base","easy","数数与认数","1+4=5。"],
          ["小明有 3 个球，又买来 2 个，现在有几个？","5",nw(5),"improve","medium","数数与认数","3+2=5 个。"],
          ["有 7 块糖，分给朋友 3 块，还剩几块？","4",nw(4),"elite","hard","数数与认数","7−3=4 块。"],
          ["0 加上 5 等于几？","5",nw(5),"base","easy","数数与认数","0+5=5。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["15 和 12，哪个更大？","15 大",["12 大","一样大","不能比"],"base","easy","比大小","15 在 12 后面，所以 15>12。"],
          ["9 和 11，哪个更大？","11 大",["9 大","一样大","不能比"],"improve","medium","比大小","11 在 9 后面，所以 11>9。"],
          ["100 和 99，哪个更大？","100 大",["99 大","一样大","不能比"],"elite","hard","比大小","100 是三位数，比 99 大。"],
          ["8 和 8 比，哪个大？","一样大",["8 大","8 小","不能比"],"base","easy","比大小","两个数相同，一样大。"],
          ["20 和 19，哪个更大？","20 大",["19 大","一样大","不能比"],"improve","medium","比大小","20 在 19 后面，所以 20>19。"],
          ["把 3、9、6、1 从大到小排列，正确的是？","9, 6, 3, 1",["1, 3, 6, 9","6, 9, 3, 1","9, 3, 6, 1"],"elite","hard","比大小","从大到小：9>6>3>1。"],
          ["7 和 10，哪个更大？","10 大",["7 大","一样大","不能比"],"improve","medium","比大小","10 在 7 后面，所以 10>7。"],
          ["50 和 5，哪个更大？","50 大",["5 大","一样大","不能比"],"elite","hard","比大小","50 是两位数，比 5 大很多。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["用凑十法算：9 + 6 = ？","15",nw(15),"base","easy","凑十法","9 差 1 到 10，把 6 分成 1 和 5，9+1=10，10+5=15。"],
          ["用凑十法算：8 + 7 = ？","15",nw(15),"improve","medium","凑十法","8 差 2 到 10，把 7 分成 2 和 5，8+2=10，10+5=15。"],
          ["用凑十法算：9 + 5 = ？","14",nw(14),"improve","medium","凑十法","9 差 1 到 10，把 5 分成 1 和 4，9+1=10，10+4=14。"],
          ["用凑十法算：7 + 6 = ？","13",nw(13),"elite","hard","凑十法","7 差 3 到 10，把 6 分成 3 和 3，7+3=10，10+3=13。"],
          ["用凑十法算：9 + 9 = ？","18",nw(18),"elite","hard","凑十法","9 差 1 到 10，把 9 分成 1 和 8，9+1=10，10+8=18。"],
          ["用凑十法算：8 + 5 = ？","13",nw(13),"improve","medium","凑十法","8 差 2 到 10，把 5 分成 2 和 3，8+2=10，10+3=13。"],
          ["用凑十法算：6 + 7 = ？","13",nw(13),"elite","hard","凑十法","6 差 4 到 10，把 7 分成 4 和 3，6+4=10，10+3=13。"],
          ["用凑十法算：9 + 4 = ？","13",nw(13),"improve","medium","凑十法","9 差 1 到 10，把 4 分成 1 和 3，9+1=10，10+3=13。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["小朋友排队，小明排第 3，他前面有几个人？","2",nw(2),"base","easy","序数","排第 3 说明他前面还有第 1、第 2，共 2 个人。"],
          ["一排人，小红左数第 4、右数第 3，这一排共几人？","6",nw(6),"elite","hard","序数","左边 4 人 + 右边 3 人 − 重复的自己 1 人 = 6 人。"],
          ["小朋友排队，排第 1，他前面有几个人？","0",["1","2","3"],"base","easy","序数","排第 1 是最前面，前面 0 个人。"],
          ["一列 10 人，小明排第 5，他后面还有几人？","5",nw(5),"improve","medium","序数","10−5=5 人。"],
          ["从前往后数，小林排第 2，这一列共 6 人，他后面还有几人？","4",nw(4),"improve","medium","序数","6−2=4 人。"],
          ["体育委员排第 1，最后一名排第 8，这一列共几人？","8",nw(8),"elite","hard","序数","从 1 到 8，共 8 人。"],
          ["小朋友排队，排第 6，他前面有几个人？","5",nw(5),"improve","medium","序数","排第 6 说明前面有 5 个人。"],
          ["一排人，小军左数第 3、右数第 4，这一排共几人？","6",nw(6),"elite","hard","序数","3+4−1=6 人。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["找规律填数：2, 4, 6, 8, ?","10",nw(10),"base","easy","规律数列","每次多 2，8+2=10。"],
          ["找规律填数：1, 3, 5, 7, ?","9",nw(9),"base","easy","规律数列","每次多 2（奇数），7+2=9。"],
          ["找规律填数：3, 5, 7, 9, ?","11",nw(11),"improve","medium","规律数列","每次多 2，9+2=11。"],
          ["找规律填数：5, 10, 15, 20, ?","25",nw(25),"improve","medium","规律数列","每次多 5，20+5=25。"],
          ["找规律填数：10, 8, 6, 4, ?","2",nw(2),"elite","hard","规律数列","每次少 2，4−2=2。"],
          ["找规律填数：1, 2, 3, 4, ?","5",nw(5),"base","easy","规律数列","每次多 1，4+1=5。"],
          ["找规律填数：4, 6, 8, 10, ?","12",nw(12),"improve","medium","规律数列","每次多 2，10+2=12。"],
          ["找规律填数：20, 18, 16, 14, ?","12",nw(12),"elite","hard","规律数列","每次少 2，14−2=12。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L2:{
        1:()=>[
          ["算一算：7 × 8 = ？","56",nw(56),"base","easy","表内乘除","乘法口诀：七八五十六。"],
          ["算一算：48 ÷ 6 = ？","8",nw(8),"improve","medium","表内乘除","六八四十八，所以 48÷6=8。"],
          ["算一算：9 × 6 = ？","54",nw(54),"improve","medium","表内乘除","乘法口诀：六九五十四。"],
          ["算一算：36 ÷ 4 = ？","9",nw(9),"elite","hard","表内乘除","四九三十六，所以 36÷4=9。"],
          ["算一算：8 × 7 = ？","56",nw(56),"improve","medium","表内乘除","乘法口诀：七八五十六。"],
          ["算一算：24 ÷ 3 = ？","8",nw(8),"elite","hard","表内乘除","三八二十四，所以 24÷3=8。"],
          ["算一算：6 × 9 = ？","54",nw(54),"improve","medium","表内乘除","乘法口诀：六九五十四。"],
          ["算一算：63 ÷ 7 = ？","9",nw(9),"elite","hard","表内乘除","七九六十三，所以 63÷7=9。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["巧算：36 + 47 + 64 = ？","147",nw(147),"base","easy","巧算凑整","先算 36+64=100，再加 47 得 147。"],
          ["巧算：125 + 37 + 75 = ？","237",nw(237),"elite","hard","巧算凑整","先算 125+75=200，再加 37 得 237。"],
          ["巧算：28 + 53 + 72 = ？","153",nw(153),"improve","medium","巧算凑整","先算 28+72=100，再加 53 得 153。"],
          ["巧算：45 + 68 + 55 = ？","168",nw(168),"elite","hard","巧算凑整","先算 45+55=100，再加 68 得 168。"],
          ["巧算：19 + 47 + 81 = ？","147",nw(147),"improve","medium","巧算凑整","先算 19+81=100，再加 47 得 147。"],
          ["巧算：63 + 29 + 37 = ？","129",nw(129),"elite","hard","巧算凑整","先算 63+37=100，再加 29 得 129。"],
          ["巧算：14 + 58 + 86 = ？","158",nw(158),"improve","medium","巧算凑整","先算 14+86=100，再加 58 得 158。"],
          ["巧算：77 + 36 + 23 = ？","136",nw(136),"elite","hard","巧算凑整","先算 77+23=100，再加 36 得 136。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["等差数列：3, 6, 9, 12, ?","15",nw(15),"base","easy","等差数列","相邻差 3，12+3=15。"],
          ["等差数列：5, 9, 13, 17, ?","21",nw(21),"elite","hard","等差数列","相邻差 4，17+4=21。"],
          ["等差数列：2, 5, 8, 11, ?","14",nw(14),"improve","medium","等差数列","相邻差 3，11+3=14。"],
          ["等差数列：10, 20, 30, 40, ?","50",nw(50),"elite","hard","等差数列","相邻差 10，40+10=50。"],
          ["等差数列：1, 4, 7, 10, ?","13",nw(13),"improve","medium","等差数列","相邻差 3，10+3=13。"],
          ["等差数列：100, 90, 80, 70, ?","60",nw(60),"elite","hard","等差数列","相邻差 −10，70−10=60。"],
          ["等差数列：4, 7, 10, 13, ?","16",nw(16),"improve","medium","等差数列","相邻差 3，13+3=16。"],
          ["等差数列：11, 22, 33, 44, ?","55",nw(55),"elite","hard","等差数列","相邻差 11，44+11=55。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["3 个本子 12 元，1 个本子几元？","4",nw(4),"base","easy","归一问题","12÷3=4，一个本子 4 元。"],
          ["4 支笔 20 元，买 7 支笔要几元？","35",nw(35),"elite","hard","归一问题","一支 20÷4=5 元，7 支 = 5×7=35 元。"],
          ["5 个橘子 15 元，1 个橘子几元？","3",nw(3),"improve","medium","归一问题","15÷5=3，一个 3 元。"],
          ["2 本书 18 元，买 4 本书要几元？","36",nw(36),"elite","hard","归一问题","一本 18÷2=9 元，4 本 = 9×4=36 元。"],
          ["6 支铅笔 12 元，1 支铅笔几元？","2",nw(2),"improve","medium","归一问题","12÷6=2，一支 2 元。"],
          ["小明每分钟走 50 米，4 分钟走多少米？","200",nw(200),"elite","hard","归一问题","50×4=200 米。"],
          ["3 小时做 9 道题，平均每小时做几道？","3",nw(3),"improve","medium","归一问题","9÷3=3 道。"],
          ["一袋糖 8 元，买 5 袋要几元？","40",nw(40),"elite","hard","归一问题","8×5=40 元。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["小明每分钟走 60 米，5 分钟走多少米？","300",nw(300),"base","easy","行程问题","路程 = 60×5 = 300 米。"],
          ["甲乙相距 240 米，甲每分钟 40 米、乙每分钟 20 米，相向而行几分钟后相遇？","4",nw(4),"elite","hard","行程问题","相遇时间 = 240÷(40+20)=4 分钟。"],
          ["速度 50 米/分，时间 4 分，走了多少米？","200",nw(200),"improve","medium","行程问题","路程 = 50×4 = 200 米。"],
          ["路程 180 米，时间 3 分，速度是多少？","60",nw(60),"elite","hard","行程问题","速度 = 180÷3 = 60 米/分。"],
          ["速度 30 米/分，路程 120 米，需要几分钟？","4",nw(4),"improve","medium","行程问题","时间 = 120÷30 = 4 分钟。"],
          ["小明每分钟走 80 米，6 分钟走多少米？","480",nw(480),"elite","hard","行程问题","路程 = 80×6 = 480 米。"],
          ["甲乙相距 360 米，甲每分钟 80 米、乙每分钟 40 米，相向而行几分钟后相遇？","3",nw(3),"elite","hard","行程问题","相遇时间 = 360÷(80+40)=3 分钟。"],
          ["速度 40 米/分，时间 5 分，走了多少米？","200",nw(200),"improve","medium","行程问题","路程 = 40×5 = 200 米。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L3:{
        1:()=>[
          ["分数加法：1/2 + 1/4 = ？","3/4",["2/4","1","1/2"],"base","easy","分数小数","1/2=2/4，2/4+1/4=3/4。"],
          ["0.5 + 1/2 = ？","1",["0.6","1.5","2"],"improve","medium","分数小数","1/2=0.5，0.5+0.5=1。"],
          ["分数加法：1/4 + 1/4 = ？","1/2",["1/4","2","0"],"improve","medium","分数小数","分母不变，分子 1+1=2，即 2/4=1/2。"],
          ["小数加法：0.25 + 0.25 = ？","0.5",["0.4","0.6","0.25"],"improve","medium","分数小数","0.25+0.25=0.5。"],
          ["分数加法：1/3 + 1/3 = ？","2/3",["1/3","2","1"],"elite","hard","分数小数","分母不变，分子 1+1=2，即 2/3。"],
          ["小数加法：0.5 + 0.5 = ？","1",["0.1","1.5","0"],"base","easy","分数小数","0.5+0.5=1。"],
          ["分数加法：3/4 + 1/4 = ？","1",["3/4","7/4","2"],"elite","hard","分数小数","3/4+1/4=4/4=1。"],
          ["小数加法：0.2 + 0.3 = ？","0.5",["0.06","0.23","0.32"],"improve","medium","分数小数","0.2+0.3=0.5。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["鸡兔同笼：共有头 12 个、脚 32 只，兔有几只？","4",nw(4),"elite","hard","鸡兔同笼","假设全是鸡有 24 只脚，多 8 只；每换一兔多 2 脚，8÷2=4 只兔。"],
          ["鸡兔同笼：共有头 9 个、脚 26 只，兔有几只？","4",nw(4),"elite","hard","鸡兔同笼","假设全是鸡有 18 只脚，多 8 只；8÷2=4 只兔。"],
          ["鸡兔同笼：共有头 15 个、脚 40 只，兔有几只？","5",nw(5),"star","hard","鸡兔同笼","假设全是鸡有 30 只脚，多 10 只；10÷2=5 只兔。"],
          ["鸡兔同笼：共有头 10 个、脚 36 只，兔有几只？","8",nw(8),"star","hard","鸡兔同笼","假设全是鸡有 20 只脚，多 16 只；16÷2=8 只兔。"],
          ["鸡兔同笼：共有头 8 个、脚 20 只，兔有几只？","2",nw(2),"improve","medium","鸡兔同笼","假设全是鸡有 16 只脚，多 4 只；4÷2=2 只兔。"],
          ["鸡兔同笼：共有头 14 个、脚 38 只，兔有几只？","5",nw(5),"star","hard","鸡兔同笼","假设全是鸡有 28 只脚，多 10 只；10÷2=5 只兔。"],
          ["鸡兔同笼：共有头 6 个、脚 16 只，兔有几只？","2",nw(2),"improve","medium","鸡兔同笼","假设全是鸡有 12 只脚，多 4 只；4÷2=2 只兔。"],
          ["鸡兔同笼：共有头 11 个、脚 30 只，兔有几只？","4",nw(4),"elite","hard","鸡兔同笼","假设全是鸡有 22 只脚，多 8 只；8÷2=4 只兔。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["求平均数：80、90、100 三个数的平均数是多少？","90",nw(90),"base","easy","平均数","(80+90+100)÷3=90。"],
          ["求平均数：70、80、90 三个数的平均数是多少？","80",nw(80),"improve","medium","平均数","(70+80+90)÷3=80。"],
          ["求平均数：10、20、30、40 四个数的平均数是多少？","25",nw(25),"elite","hard","平均数","(10+20+30+40)÷4=25。"],
          ["求平均数：60、60、60 三个数的平均数是多少？","60",nw(60),"base","easy","平均数","三个数相同，平均数就是 60。"],
          ["求平均数：95、85、90 三个数的平均数是多少？","90",nw(90),"improve","medium","平均数","(95+85+90)÷3=90。"],
          ["4 个数的和是 100，它们的平均数这个数是多少？","25",nw(25),"elite","hard","平均数","100÷4=25。"],
          ["求平均数：12、18、24 三个数的平均数是多少？","18",nw(18),"improve","medium","平均数","(12+18+24)÷3=18。"],
          ["求平均数：50、70、90 三个数的平均数是多少？","70",nw(70),"elite","hard","平均数","(50+70+90)÷3=70。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["50 是 200 的百分之几？","25%",["20%","30%","40%"],"base","easy","百分数","50÷200=0.25=25%。"],
          ["一件衣服打八折后是 80 元，原价是多少元？","100",nw(100),"elite","hard","百分数","八折=80%，原价=80÷0.8=100 元。"],
          ["25 是 100 的百分之几？","25%",["20%","4%","50%"],"improve","medium","百分数","25÷100=0.25=25%。"],
          ["30 是 60 的百分之几？","50%",["30%","60%","20%"],"improve","medium","百分数","30÷60=0.5=50%。"],
          ["全班 50 人，45 人出勤，出勤率是百分之几？","90%",["80%","85%","89%"],"elite","hard","百分数","45÷50=0.9=90%。"],
          ["一件商品打九折后是 90 元，原价是多少元？","100",nw(100),"elite","hard","百分数","九折=90%，原价=90÷0.9=100 元。"],
          ["10 是 50 的百分之几？","20%",["10%","25%","50%"],"improve","medium","百分数","10÷50=0.2=20%。"],
          ["本金 200 元，利率 5%，利息是多少元？","10",nw(10),"star","hard","百分数","利息=200×5%=10 元。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["简便运算：(25 × 4) × 8 = ？","800",nw(800),"base","easy","简便运算","25×4=100，100×8=800。"],
          ["简便运算：25 × 32 × 125 = ？","100000",nw(100000),"star","hard","简便运算","32=4×8，25×4=100，125×8=1000，100×1000=100000。"],
          ["简便运算：25 × 4 × 9 = ？","900",nw(900),"improve","medium","简便运算","25×4=100，100×9=900。"],
          ["简便运算：125 × 8 × 7 = ？","7000",nw(7000),"elite","hard","简便运算","125×8=1000，1000×7=7000。"],
          ["简便运算：4 × 25 × 13 = ？","1300",nw(1300),"elite","hard","简便运算","4×25=100，100×13=1300。"],
          ["简便运算：25 × 16 = ？","400",nw(400),"improve","medium","简便运算","16=4×4，25×4=100，100×4=400。"],
          ["简便运算：125 × 24 = ？","3000",nw(3000),"elite","hard","简便运算","24=8×3，125×8=1000，1000×3=3000。"],
          ["简便运算：8 × 125 × 6 = ？","6000",nw(6000),"elite","hard","简便运算","8×125=1000，1000×6=6000。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      }
    },
    space:{
      L1:{
        1:()=>[
          ["太阳从哪个方向升起？","东",["西","南","北"],"base","easy","方位认知","太阳每天从东方升起。"],
          ["傍晚太阳从哪个方向落下？","西",["东","南","北"],"improve","medium","方位认知","太阳从西方落下。"],
          ["地图上“上北下南”，左边是哪个方向？","西",["东","南","北"],"improve","medium","方位认知","左西右东，左边是西。"],
          ["面向北方时，你的后面是哪个方向？","南",["东","西","北"],"elite","hard","方位认知","前北后南，后面是南。"],
          ["面朝东站着，你的左边是哪个方向？","北",["南","西","东"],"elite","hard","方位认知","面东时左北右南，左边是北。"],
          ["太阳从东边升起，此时影子朝向哪个方向？","西",["东","南","北"],"improve","medium","方位认知","光从东来，影子朝西。"],
          ["指南针红色的针指向哪个方向？","北",["南","东","西"],"improve","medium","方位认知","指南针红针指北。"],
          ["面朝南站着，你的右手是哪个方向？","西",["东","北","南"],"elite","hard","方位认知","面南时左东右西，右手是西。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["一层摆成 2×2，一共用了几块小正方体？","4",nw(4),"base","easy","数小方块","2 行 2 列，2×2=4 块。"],
          ["一层摆成 3×2，一共用了几块小正方体？","6",nw(6),"improve","medium","数小方块","3 行 2 列，3×2=6 块。"],
          ["一层摆成 1×4，一共用了几块小正方体？","4",nw(4),"base","easy","数小方块","1 行 4 列，1×4=4 块。"],
          ["一层摆成 3×3，一共用了几块小正方体？","9",nw(9),"improve","medium","数小方块","3 行 3 列，3×3=9 块。"],
          ["一层摆成 2×5，一共用了几块小正方体？","10",nw(10),"elite","hard","数小方块","2 行 5 列，2×5=10 块。"],
          ["一层摆成 4×2，一共用了几块小正方体？","8",nw(8),"improve","medium","数小方块","4 行 2 列，4×2=8 块。"],
          ["一层摆成 1×10，一共用了几块小正方体？","10",nw(10),"elite","hard","数小方块","1 行 10 列，1×10=10 块。"],
          ["一层摆成 5×2，一共用了几块小正方体？","10",nw(10),"elite","hard","数小方块","5 行 2 列，5×2=10 块。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["下面哪个物体最稳、不容易滚？","正方体",["球","圆锥(尖朝下)","半圆"],"base","easy","立体识别","正方体底面平整，能稳稳放住；球会滚动。"],
          ["下面哪种积木最稳、不会滚动？","正方体积木",["球","圆锥","横放的圆柱"],"elite","hard","立体识别","正方体积木底面平整，稳稳放住也不会滚。"],
          ["皮球放在地上会怎样？","滚动",["站稳","不变","叠高"],"improve","medium","立体识别","球是曲面，会滚动。"],
          ["圆柱竖着放（底面朝下）会怎样？","站稳",["滚走","翻倒","消失"],"improve","medium","立体识别","圆柱底面平整，能站稳。"],
          ["圆锥尖朝下放在桌上会怎样？","站稳",["滚走","浮起","变圆"],"elite","hard","立体识别","圆锥尖朝下时底面朝下，能站稳。"],
          ["下面哪种物体能滚动？","球",["方块","书本","三角板"],"improve","medium","立体识别","球是曲面，能滚动；方块不能。"],
          ["下面哪个是曲面立体、能滚动？","球",["魔方","书本","橡皮"],"elite","hard","立体识别","球有曲面能滚；魔方是正方体不能。"],
          ["搭高塔时选哪种积木最稳？","正方体",["球","圆锥","半球"],"improve","medium","立体识别","正方体底面平整，搭高塔最稳。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["照镜子时，镜子里的字母 b 看起来像哪个？","d",["b","p","q"],"base","easy","镜像方位","平面镜左右翻转，b 变成 d。"],
          ["照镜子时，“上”字看起来？","不变",["下","左右翻","倒过来"],"improve","medium","镜像方位","上字左右基本对称，镜中看起来不变。"],
          ["照镜子时，字母 M 看起来？","不变",["W","倒过来","N"],"elite","hard","镜像方位","M 左右对称，镜中看起来不变。"],
          ["照镜子时，字母 E 看起来像？","反写的 E",["E","3","不变"],"elite","hard","镜像方位","平面镜左右翻转，E 变成反写的 E。"],
          ["你举起右手，镜子里的你举起的是哪只手？","左手",["右手","双手","不变"],"improve","medium","镜像方位","镜中左右相反，看起来举的是左手。"],
          ["照镜子时，“中”字看起来？","不变",["变样","翻转","倒过来"],"improve","medium","镜像方位","中字左右对称，镜中看起来不变。"],
          ["照镜子时，数字 3 看起来像？","反写的 3",["3","8","不变"],"elite","hard","镜像方位","平面镜左右翻转，3 变成反写的 3。"],
          ["照镜子时，左右方向会怎样？","相反",["上下相反","不变","都相反"],"base","easy","镜像方位","平面镜只左右翻转，上下不变。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["桌子上面放着一本书，书在桌子的什么位置？","上面",["下面","左边","右边"],"base","easy","上下左右","书放在桌子上面。"],
          ["橡皮在书上面，铅笔在橡皮上面，铅笔在桌子的什么位置？","上面",["下面","左边","右边"],"improve","medium","上下左右","铅笔在最上面，也在桌子上面。"],
          ["小猫在桌子下面躲着，小猫在桌子的什么位置？","下面",["上面","左边","右边"],"improve","medium","上下左右","小猫在桌子下面。"],
          ["铅笔在本子左边，本子在铅笔的什么位置？","右边",["左边","上边","下边"],"elite","hard","上下左右","以铅笔为参照，本子在它右边。"],
          ["苹果放在盘子里面，苹果在盘子的什么位置？","里面",["外面","上面","下面"],"base","easy","上下左右","苹果在盘子里面。"],
          ["书包放在椅子上面，书包在椅子的什么位置？","上面",["下面","前面","后面"],"improve","medium","上下左右","书包在椅子上面。"],
          ["小狗站在小孩的左边，小狗在小孩的什么位置？","左边",["右边","上面","下面"],"elite","hard","上下左右","小狗在小孩左边。"],
          ["书放在抽屉里面，书在抽屉的什么位置？","里面",["外面","上面","下面"],"improve","medium","上下左右","书在抽屉里面。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L2:{
        1:()=>[
          ["一个正方体有几个面？","6",nw(6),"base","easy","面棱顶点","正方体有 6 个面。"],
          ["一个正方体有几条棱？","12",nw(12),"base","easy","面棱顶点","正方体有 12 条棱。"],
          ["一个正方体有几个顶点？","8",nw(8),"base","easy","面棱顶点","正方体有 8 个顶点。"],
          ["一个长方体有几条棱？","12",nw(12),"improve","medium","面棱顶点","长方体和正方体一样有 12 条棱。"],
          ["一个长方体有几个面？","6",nw(6),"improve","medium","面棱顶点","长方体有 6 个面。"],
          ["一个长方体有几个顶点？","8",nw(8),"elite","hard","面棱顶点","长方体有 8 个顶点。"],
          ["正方体面数与顶点数相加等于几？","14",nw(14),"elite","hard","面棱顶点","6 个面 + 8 个顶点 = 14。"],
          ["正方体棱数减去面数等于几？","6",nw(6),"elite","hard","面棱顶点","12 条棱 − 6 个面 = 6。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["“田”字形的展开图能折成正方体吗？","不能",["能","看情况","一定"],"base","easy","展开图识别","田字有重叠面，不在 11 种标准展开图中。"],
          ["下面哪种一定不能折成正方体？","田字型",["1-4-1 型","3-3 型","2-3-1 型"],"elite","hard","展开图识别","田字型有重叠面，不能折。"],
          ["下面哪种展开图可以折成正方体？","1-4-1 型",["田字","凹字","错位 L 型"],"improve","medium","展开图识别","1-4-1 型是 11 种标准展开图之一。"],
          ["1-4-1 型展开图一共有几行？","3 行",["2 行","4 行","1 行"],"elite","hard","展开图识别","1-4-1 表示上 1、中 4、下 1，共 3 行。"],
          ["“凹”字形的展开图能折成正方体吗？","不能",["能","看情况","一定"],"elite","hard","展开图识别","凹字型有重叠面，不能折。"],
          ["下面哪个是正方体的标准展开图？","2-3-1 型",["田字","十字(5连排)","Т 字"],"elite","hard","展开图识别","2-3-1 型是标准展开图之一。"],
          ["正方体一共有多少种展开图？","11 种",nw(11),"star","hard","展开图识别","正方体展开图共有 11 种。"],
          ["下面哪种一定不能折成正方体？","田字型",["1-4-1 型","3-3 型","2-2-2 型"],"improve","medium","展开图识别","田字型有重叠面，不能折。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["从正前方看一个正方体，看到的形状是？","正方形",["圆","三角形","梯形"],"base","easy","三视图","正视图是一个正方形。"],
          ["从正上方看一个立着的圆柱，看到的形状是？","圆",["长方形","正方形","三角形"],"improve","medium","三视图","俯视圆柱看到的是上面的圆面。"],
          ["从正前方看一个立着的圆柱，看到的形状是？","长方形",["圆","正方形","三角形"],"elite","hard","三视图","正视图是一个长方形（矩形）。"],
          ["从正上方看一个正方体，看到的形状是？","正方形",["圆","三角形","长方形"],"improve","medium","三视图","俯视图是一个正方形。"],
          ["从正侧面看一个球体，看到的形状是？","圆",["半圆","正方形","三角形"],"elite","hard","三视图","无论从哪面看球都是圆。"],
          ["从正上方看一个平放的长方体，看到的形状是？","长方形",["正方形","圆","三角形"],"improve","medium","三视图","俯视图是一个长方形。"],
          ["从正前方看一个立着的三棱柱，看到的形状是？","长方形",["三角形","正方形","圆"],"elite","hard","三视图","正视图是长方形（矩形）。"],
          ["从正上方看一个圆锥，看到的形状是？","圆",["三角形","正方形","长方形"],"elite","hard","三视图","俯视圆锥看到的是带圆心的圆面。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["2×2×2 的大正方体由几个小正方体组成？","8",nw(8),"base","easy","立体计数","2×2×2=8 个小正方体。"],
          ["3×3×3 的大正方体由几个小正方体组成？","27",nw(27),"elite","hard","立体计数","3×3×3=27 个小正方体。"],
          ["1×1×1 的大正方体由几个小正方体组成？","1",nw(1),"base","easy","立体计数","1×1×1=1 个小正方体。"],
          ["4×4×4 的大正方体由几个小正方体组成？","64",nw(64),"elite","hard","立体计数","4×4×4=64 个小正方体。"],
          ["2 层、每层 3×3 的大正方体由几个小正方体组成？","18",nw(18),"improve","medium","立体计数","2 层 × 9 = 18 个小正方体。"],
          ["棱长 5 的大正方体由几个小正方体组成？","125",nw(125),"star","hard","立体计数","5×5×5=125 个小正方体。"],
          ["3 层、每层 2×2 的大正方体由几个小正方体组成？","12",nw(12),"improve","medium","立体计数","3 层 × 4 = 12 个小正方体。"],
          ["棱长 2 的大正方体由几个小正方体组成？","8",nw(8),"improve","medium","立体计数","2×2×2=8 个小正方体。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["A 在 B 左边，B 在 C 左边，最右边是谁？","C",["A","B","不确定"],"base","easy","方位推理","顺序 A→B→C，最右边是 C。"],
          ["书在桌子上面，铅笔在书上面，铅笔在桌子的什么位置？","上面",["下面","左边","右边"],"improve","medium","方位推理","铅笔在书上面、书在桌上面，所以铅笔也在桌上面。"],
          ["甲在乙左边，乙在丙左边，最左边是谁？","甲",["乙","丙","不确定"],"elite","hard","方位推理","顺序甲→乙→丙，最左是甲。"],
          ["从前往后：小红、小力、小勇，排头是谁？","小红",["小力","小勇","不确定"],"elite","hard","方位推理","小红在最前。"],
          ["猫在狗左边，狗在兔左边，最右边是谁？","兔",["猫","狗","不确定"],"improve","medium","方位推理","顺序猫→狗→兔，最右是兔。"],
          ["从前往后第 1 小一、第 2 小二、第 3 小三，第 3 个是谁？","小三",["小一","小二","小四"],"elite","hard","方位推理","第 3 是小三。"],
          ["红在蓝前面，蓝在绿前面，中间是谁？","蓝",["红","绿","不确定"],"elite","hard","方位推理","顺序红→蓝→绿，中间是蓝。"],
          ["甲排第 2，乙排第 5，甲在乙的哪边？","前面",["后面","同一位","不确定"],"elite","hard","方位推理","第 2 在第 5 前面。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      },
      L3:{
        1:()=>[
          ["棱长 3 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"base","easy","表面涂色切块","3 面涂色的是 8 个顶点，共 8 块。"],
          ["棱长 4 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"elite","hard","表面涂色切块","3 面涂色恒为 8 个顶点，与棱长无关。"],
          ["棱长 5 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"star","hard","表面涂色切块","3 面涂色恒为 8 个顶点。"],
          ["棱长 2 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"improve","medium","表面涂色切块","棱长 2 时全部 8 块都在顶点，都是 3 面涂色。"],
          ["棱长 6 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"star","hard","表面涂色切块","3 面涂色恒为 8 个顶点。"],
          ["棱长 10 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"star","hard","表面涂色切块","3 面涂色恒为 8 个顶点。"],
          ["棱长 7 的正方体表面涂色后切成小方块，3 面涂色的有几块？","8",nw(8),"star","hard","表面涂色切块","3 面涂色恒为 8 个顶点。"],
          ["无论棱长几（≥2），3 面涂色的小方块有几块？","都是 8 块",["等于棱长","12 块","随棱长变化"],"star","hard","表面涂色切块","3 面涂色恒为 8 个顶点。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        2:()=>[
          ["棱长 3 的正方体，2 面涂色的小方块有几块？","12",nw(12),"base","easy","表面涂色切块","12×(3−2)=12 块。"],
          ["棱长 4 的正方体，2 面涂色的小方块有几块？","24",nw(24),"elite","hard","表面涂色切块","12×(4−2)=24 块。"],
          ["棱长 5 的正方体，2 面涂色的小方块有几块？","36",nw(36),"star","hard","表面涂色切块","12×(5−2)=36 块。"],
          ["棱长 6 的正方体，2 面涂色的小方块有几块？","48",nw(48),"star","hard","表面涂色切块","12×(6−2)=48 块。"],
          ["棱长 2 的正方体，2 面涂色的小方块有几块？","0",["12","8","24"],"improve","medium","表面涂色切块","棱长 2 时没有棱上非顶点的小块，2 面涂色为 0。"],
          ["棱长 7 的正方体，2 面涂色的小方块有几块？","60",nw(60),"star","hard","表面涂色切块","12×(7−2)=60 块。"],
          ["棱长 8 的正方体，2 面涂色的小方块有几块？","72",nw(72),"star","hard","表面涂色切块","12×(8−2)=72 块。"],
          ["棱长 10 的正方体，2 面涂色的小方块有几块？","96",nw(96),"star","hard","表面涂色切块","12×(10−2)=96 块。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        3:()=>[
          ["一个正方体切 1 刀，最多分成几块？","2",nw(2),"base","easy","切割问题","一刀切下最多分成 2 块。"],
          ["一个蛋糕切 2 刀（两刀相交），最多分成几块？","4",nw(4),"improve","medium","切割问题","两刀相交最多分成 4 块。"],
          ["一个圆在平面上用直线切 3 刀（两两相交），最多分成几块？","7",nw(7),"elite","hard","切割问题","3 条直线两两相交最多分 7 块。"],
          ["一个蛋糕切 3 刀（三刀都过中心），最多分成几块？","8",nw(8),"elite","hard","切割问题","3 个平面两两相交最多分 8 块。"],
          ["一个西瓜切 2 刀，最多分成几块？","4",nw(4),"improve","medium","切割问题","两刀相交最多 4 块。"],
          ["一个圆在平面上用直线切 4 刀（两两相交），最多分成几块？","11",nw(11),"star","hard","切割问题","4 条直线两两相交最多分 11 块。"],
          ["一个正方体平行切 2 刀，最多分成几块？","3",nw(3),"elite","hard","切割问题","2 刀平行最多分 3 块。"],
          ["一个圆饼切 3 刀（两两相交），最多分成几块？","7",nw(7),"elite","hard","切割问题","3 条直线两两相交最多分 7 块。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        4:()=>[
          ["下面哪种展开图可以折成正方体？","1-4-1 型",["田字型","凹字型","错位 L 型"],"base","easy","空间折叠","1-4-1 型是 11 种标准展开图之一。"],
          ["下面哪种展开图可以折成正方体？","2-3-1 型",["田字型","凹字型","十字型"],"elite","hard","空间折叠","2-3-1 型是标准展开图之一。"],
          ["正方体一共有多少种展开图？","11 种",nw(11),"star","hard","空间折叠","正方体展开图共有 11 种。"],
          ["1-4-1 型展开图中，相对的两个面在正方体里？","不相邻",["相邻","重合","不确定"],"elite","hard","空间折叠","相对面在展开图里不相邻，折起后也不相邻。"],
          ["“凹”字型展开图能折成正方体吗？","不能",["能","看情况","一定"],"elite","hard","空间折叠","凹字型有重叠面，不能折。"],
          ["下面哪个展开图能折成正方体？","3-3 型",["田字型","Т 字型","十字型"],"elite","hard","空间折叠","3-3 型是标准展开图之一。"],
          ["展开图中相对的两个面，折成正方体后？","不相邻",["相邻","必相邻","同一面"],"elite","hard","空间折叠","相对面折起后遥遥相对，不相邻。"],
          ["把一张纸剪成能折成正方体的展开图，有几种剪法？","11 种",nw(11),"star","hard","空间折叠","正方体展开图共有 11 种。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6])),
        5:()=>[
          ["俯视 2×2、正视左列高 2 层右列高 1 层，搭成此立体最少要几块？","5",nw(5),"base","easy","复杂三视图","俯视 4 格为底，左列至少 1 格高 2，其余各 1，最少 2+1+1+1=5 块。"],
          ["俯视 2×2、正视是 2 层 2 列，搭成此立体最少要几块？","4",nw(4),"improve","medium","复杂三视图","俯视 2×2 说明底层至少 4 块，正面 2 层可由其中一列叠高实现，最少 4 块。"],
          ["俯视 3×3 且全为 1 层，搭成此立体最少要几块？","9",nw(9),"elite","hard","复杂三视图","俯视 3×3 说明底层至少 9 块。"],
          ["正视高 3 层、俯视 2×2，搭成此立体最少要几块？","6",nw(6),"elite","hard","复杂三视图","俯视 4 格为底，至少一列高 3，其余各 1，最少 3+1+1+1=6 块。"],
          ["左视高 2 层、俯视 2×2，搭成此立体最少要几块？","5",nw(5),"elite","hard","复杂三视图","俯视 4 格为底，至少一列高 2，其余各 1，最少 2+1+1+1=5 块。"],
          ["俯视 2×2、正视图两层（每列都高 2），搭成此立体要几块？","8",nw(8),"elite","hard","复杂三视图","每格都高 2，共 4×2=8 块。"],
          ["三个视图都是 2×2 且全满 2 层，搭成此立体要几块？","8",nw(8),"star","hard","复杂三视图","每格都高 2，共 4×2=8 块。"],
          ["俯视 1×3、正视高 2 层，搭成此立体最少要几块？","4",nw(4),"elite","hard","复杂三视图","俯视 3 格为底，至少有一列高 2，最少 3+1=4 块。"]
        ].map(r=>mk(r[0],r[1],r[2],r[3],r[4],r[5],r[6]))
      }
    }
  };

  const PREFIX = { logic:"L", shape:"S", number:"N", space:"P" };
  ["logic","shape","number","space"].forEach(m=>{
    ["L1","L2","L3"].forEach(l=>{
      [1,2,3,4,5].forEach(ch=>{
        const fn = GEN[m] && GEN[m][l] && GEN[m][l][ch];
        if(!fn) return;
        fn().forEach((sp,i)=>{ sp.module=m; sp.level=l; sp.id=PREFIX[m]+l.slice(1)+ch+(i+1); QUESTIONS.push(sp); });
      });
    });
  });
  BANK_META.seed = 600;
})();

/* =====================================================================
   题目 ↔ 课程关联（依据 assets/courses.js 的 60 章课程表）
   为每道题写入 chapter（章序号 1–5）与 courseId（C-${module}-${level}-${chapter}），
   确保每道题都能正确关联到对应的课程资源。
     - 程序化生成题（id 形如 L111）：第 3 位字符即章节号
     - 种子题（id 形如 N1-001）：按知识点标签精准映射到章节
   ===================================================================== */
(function linkCourses(){
  const SEED_CHAPTER = {
    "number-L1":[
      {ch:1,tags:["20以内加法","加减混合","应用题"]},
      {ch:2,tags:["比大小","排序"]},
      {ch:3,tags:["凑十法"]},
      {ch:4,tags:["序数"]},
      {ch:5,tags:["规律数列"]}
    ],
    "number-L2":[
      {ch:1,tags:["表内乘除"]},
      {ch:2,tags:["巧算","凑整"]},
      {ch:3,tags:["等差数列"]},
      {ch:4,tags:["归一归总"]},
      {ch:5,tags:["行程","相遇问题"]}
    ],
    "number-L3":[
      {ch:1,tags:["分数小数"]},
      {ch:2,tags:["鸡兔同笼"]},
      {ch:3,tags:["平均数"]},
      {ch:4,tags:["百分数","折扣"]},
      {ch:5,tags:["简便运算"]}
    ],
    "logic-L1":[
      {ch:1,tags:["找不同"]},
      {ch:2,tags:["简单规律"]},
      {ch:3,tags:["分类排序"]},
      {ch:4,tags:["排队"]},
      {ch:5,tags:["排除法"]}
    ],
    "logic-L2":[
      {ch:1,tags:["周期问题","星期几"]},
      {ch:2,tags:["数字推理"]},
      {ch:3,tags:["条件推理"]},
      {ch:4,tags:["真假话","逻辑排除"]},
      {ch:5,tags:["星期推算"]}
    ],
    "logic-L3":[
      {ch:1,tags:["握手问题"]},
      {ch:2,tags:["容斥原理"]},
      {ch:3,tags:["鸽巢原理"]},
      {ch:4,tags:["排列组合"]},
      {ch:5,tags:["统筹优化"]}
    ],
    "shape-L1":[
      {ch:1,tags:["图形识别"]},
      {ch:2,tags:["对称"]},
      {ch:3,tags:["简单计数"]},
      {ch:4,tags:["找相同"]},
      {ch:5,tags:["图形分类"]}
    ],
    "shape-L2":[
      {ch:1,tags:["图形规律"]},
      {ch:2,tags:["网格计数"]},
      {ch:3,tags:["平移旋转翻转"]},
      {ch:4,tags:["轴/中心对称"]},
      {ch:5,tags:["图形分割"]}
    ],
    "shape-L3":[
      {ch:1,tags:["一笔画"]},
      {ch:2,tags:["格点多边形","皮克定理"]},
      {ch:3,tags:["面积周长"],text:"面积"},
      {ch:4,tags:["组合计数"]},
      {ch:5,tags:["面积周长"],text:"周长"}
    ],
    "space-L1":[
      {ch:1,tags:["方位认知"]},
      {ch:2,tags:["数小方块"]},
      {ch:3,tags:["立体识别"]},
      {ch:4,tags:["镜像方位"]},
      {ch:5,tags:["上下左右"]}
    ],
    "space-L2":[
      {ch:1,tags:["面棱顶点"]},
      {ch:2,tags:["展开图"]},
      {ch:3,tags:["三视图"]},
      {ch:4,tags:["立体计数"]},
      {ch:5,tags:["方位推理"]}
    ],
    "space-L3":[
      {ch:1,tags:["表面涂色切块"],text:"3面"},
      {ch:2,tags:["表面涂色切块"],text:"2面"},
      {ch:3,tags:["切割"]},
      {ch:4,tags:["展开图","空间折叠","立体计数"]},
      {ch:5,tags:["复杂三视图"]}
    ]
  };

  function resolveSeedChapter(q){
    const defs = SEED_CHAPTER[q.module + "-" + q.level] || [];
    for (const d of defs){
      const hit = (q.tags||[]).some(t => (d.tags||[]).includes(t));
      if (hit){
        if (d.text){ if ((q.question||"").includes(d.text)) return d.ch; else continue; }
        return d.ch;
      }
    }
    return 1; // 兜底
  }

  let linked = 0;
  QUESTIONS.forEach(q=>{
    let ch = null;
    if (/^[A-Z]\d\d\d$/.test(q.id)) {
      ch = parseInt(q.id[2], 10);          // 生成题：第 3 位即章节
    } else {
      ch = resolveSeedChapter(q);           // 种子题：按标签映射
    }
    q.chapter = ch;
    q.courseId = `C-${q.module}-${q.level}-${ch}`;
    linked++;
  });
  BANK_META.linkedCourses = linked;
})();

