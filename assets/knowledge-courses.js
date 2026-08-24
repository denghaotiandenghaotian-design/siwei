/* ============================================================
   思维星球 · 知识树课程内容（自包含课程讲义）
   ------------------------------------------------------------
   为「知识树」(framework.js 的 MODULE_SPINE) 中每一个叶子知识点
   撰写一套完整、可直接在页面内阅读的课程内容，不再依赖外链。
   素材全部改写自学而思真实教学方法（已通过 xueersi_scraper.py
   对学而思官网公开课程页做实时核验）：
     · 学而思素养 / 摩比爱数学 · 数感与计算体系
     · 学而思秘籍（计算 / 几何 / 应用题专项）
     · 学而思思维创新大通关（计数、空间、策略板块）
     · 香港学而思公开大纲（图形 / 计算 / 计数 / 立体板块逐讲）
   真实讲法参照：凑十/凑整、假设法解鸡兔、数图形公式法
   （开火车/恰含法）、切片与染色、展开图与三视图、等积模型、
   抽屉原理、加乘原理、带余除法周期等。

   每条课程内容字段：
     title        课程名（学而思对标命名）
     xueersi      学而思来源说明（教材/体系）
     sourceUrl    学而思参考链接（仅作来源标注，非主内容）
     objective    学习目标
     method       学而思核心讲法
     keypoints    关键知识点（数组）
     example      典型例题 + 解析 {q, a}
     pitfall      易错点
     progression  L1→L2→L3 三阶进阶路线

   键：module:boardId:topic ；工具 getKnowledgeCourse(m,b,l,t)
   ============================================================ */

const KNOWLEDGE_COURSES = {
  /* ===================== 数感运算 number ===================== */
  /* --- calc 数感与计算 --- */
  "number:calc:数数与认数": {
    title:"数感启蒙 · 数数与认数",
    xueersi:"学而思素养·摩比爱数学（数感与计算）",
    sourceUrl:"https://xueersi.com",
    objective:"建立一一对应数数能力，理解数的组成与序数/基数区别。",
    method:"学而思用「数群」具象操作（点数小棒、数小方块）建立数感，从一一对应过渡到理解数的组成与比较。",
    keypoints:["一一对应","数的组成","基数与序数","大小比较"],
    example:{q:"小明有 3 颗糖，妈妈又给 2 颗，现在有几颗？用数数方法验证。",a:"从 3 接着数 4、5，共 5 颗；体现「接着数」的数群思想，不一定要从头数。"},
    pitfall:"混淆「第几个」（序数，表位置）与「几个」（基数，表数量）。",
    progression:"L1 点数与认数 → L2 数的组成与比较 → L3 万以内数与位值。"
  },
  "number:calc:比大小与序数": {
    title:"比较与排序 · 比大小与序数",
    xueersi:"学而思素养·摩比爱数学（数感与计算）",
    sourceUrl:"https://xueersi.com",
    objective:"会用 ＞、＜、＝比较大小，并区分序数（第几）与基数（几个）。",
    method:"学而思用数轴与排队情境区分「第几」与「几个」，建立大小比较的直观。",
    keypoints:["＞＜＝符号","数位比较","序数基数","排队位置"],
    example:{q:"一排 5 个小朋友，从左数小明排第 3，他右边有几人？",a:"第 3 说明左边 2 人、他自己 1 人，右边 = 5−3 = 2 人；注意「排第 3」含自己。"},
    pitfall:"用序数列式时把「第几」误当「几个」直接相减而漏算自己。",
    progression:"L1 直观比大小 → L2 数位比较与排序 → L3 多位数与近似数比较。"
  },
  "number:calc:凑十法": {
    title:"巧算基础 · 凑十法",
    xueersi:"学而思秘籍·计算专项（凑整思想）",
    sourceUrl:"https://xueersi.com",
    objective:"掌握凑十策略，实现 20 以内加减法口算提速。",
    method:"学而思把凑十作为加减法核心策略，训练「好朋友数」（1和9、2和8、3和7、4和6、5和5）。",
    keypoints:["好朋友数","拆补凑十","看大数拆小数","进位加法"],
    example:{q:"8 ＋ 5 = ？用凑十法。",a:"把 5 拆成 2＋3，8＋2=10，10＋3=13；或想 8 的朋友是 2，从 5 借 2。"},
    pitfall:"拆错被加数（应拆小数补大数，而非拆大数）。",
    progression:"L1 凑十加法 → L2 破十/平十减法 → L3 凑整与带符号搬家。"
  },
  "number:calc:表内乘除": {
    title:"乘除法本源 · 表内乘除",
    xueersi:"学而思素养·数感与计算（乘法本源）",
    sourceUrl:"https://xueersi.com",
    objective:"理解乘除意义，熟记表内乘除法并灵活互逆。",
    method:"学而思从「几个几」讲起，用点阵图理解乘除法互逆，避免死记硬背口诀。",
    keypoints:["几个几","乘除互逆","平均分","乘法口诀"],
    example:{q:"把 12 个桃平均分给 3 人，每人几个？用乘法意义解释。",a:"12÷3=4；也可想 3×?=12，由三四十二得 4，体现乘除互逆。"},
    pitfall:"把「平均分」与「包含分」混淆，导致列式方向反。",
    progression:"L1 乘法意义与口诀 → L2 除法与平均分 → L3 乘除混合与简便。"
  },
  "number:calc:巧算凑整": {
    title:"简便运算 · 巧算凑整",
    xueersi:"学而思秘籍·计算专项（凑整速算）",
    sourceUrl:"https://xueersi.com",
    objective:"能运用凑整、带符号搬家把加减混合转化为整十整百速算。",
    method:"学而思秘籍强调凑整与带符号搬家：把能凑整的数先结合，符号跟着数走。",
    keypoints:["凑整","带符号搬家","添去括号","基准数法"],
    example:{q:"37 ＋ 45 ＋ 63 ＋ 55 = ？",a:"带符号搬家 (37＋63)＋(45＋55)=100＋100=200。"},
    pitfall:"搬数时把数字前面的符号丢掉，导致正负错乱。",
    progression:"L1 两两凑整 → L2 多步带符号搬家 → L3 基准数法与小数凑整。"
  },
  "number:calc:等差数列": {
    title:"数列求和 · 等差数列",
    xueersi:"学而思秘籍·计算专项（数列）",
    sourceUrl:"https://xueersi.com",
    objective:"认识等差数列，会用梯形公式（首项+末项）×项数÷2 求和。",
    method:"学而思用「配对求和」（高斯法）讲等差数列，并配合数串规律培养归纳。",
    keypoints:["公差","项数","配对求和","通项"],
    example:{q:"1＋2＋3＋…＋100 = ？",a:"首尾配对 (1＋100)×100÷2 = 5050。"},
    pitfall:"项数算错（项数=(末项−首项)÷公差＋1，别忘＋1）。",
    progression:"L1 找公差与项数 → L2 配对求和 → L3 三级等差数列与分组。"
  },
  "number:calc:分数小数": {
    title:"数域拓展 · 分数与小数",
    xueersi:"学而思素养·数感与计算（分数小数）",
    sourceUrl:"https://xueersi.com",
    objective:"理解分数/小数意义与互化，掌握基本四则。",
    method:"学而思从平均分引入分数、用图形辅助理解意义；小数强调小数点对齐与凑整速算。",
    keypoints:["平均分","分数意义","小数对齐","分数小数互化"],
    example:{q:"把 3/4 化成小数。",a:"3÷4=0.75；或想 3/4=75/100=0.75。"},
    pitfall:"小数加减不小数点对齐，而是末位对齐导致错位。",
    progression:"L1 分数意义与图示 → L2 小数与互化 → L3 分数小数混合运算。"
  },
  "number:calc:百分数": {
    title:"比率表达 · 百分数",
    xueersi:"学而思素养·数感与计算（百分数）",
    sourceUrl:"https://xueersi.com",
    objective:"理解百分数作为特殊比率，联系折扣、浓度、百分率。",
    method:"学而思把百分数作为特殊的分数/比率教学，联系生活（打折、出勤率）建立直观。",
    keypoints:["百分率","折扣","浓度","成数"],
    example:{q:"一件 200 元衣服打八五折，现价多少？",a:"八五折=85%，200×85%=170 元。"},
    pitfall:"把「降价 15%」误算成「现价是原价 15%」。",
    progression:"L1 百分数意义 → L2 折扣与百分率 → L3 浓度与利润百分数。"
  },
  "number:calc:简便运算": {
    title:"运算律综合 · 简便运算",
    xueersi:"学而思秘籍·计算专项（运算律）",
    sourceUrl:"https://xueersi.com",
    objective:"系统运用交换律、结合律、分配律与提取公因数速算。",
    method:"学而思系统训练运算律与提取公因数，追求速算与准算并重。",
    keypoints:["交换律","结合律","分配律","提取公因数"],
    example:{q:"25×44 = ？",a:"25×4×11=100×11=1100，或 25×(40+4)=1000+100=1100。"},
    pitfall:"分配律用错——只乘括号第一项，漏掉第二项。",
    progression:"L1 加减运算律 → L2 乘法分配律 → L3 提取公因数与连环简算。"
  },

  /* --- word 典型应用题 --- */
  "number:word:看图列式入门": {
    title:"建模启蒙 · 看图列式",
    xueersi:"学而思素养·应用体系（看图理解）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"把图画中的数量关系转化为加减法算式。",
    method:"学而思用「看图理解加减法含义」，把图画转化为算式，培养读题与建模能力。",
    keypoints:["图意理解","部分与整体","加减含义","列式"],
    example:{q:"图上有 4 朵红花、3 朵黄花，一共几朵？列式。",a:"4＋3=7，整体=部分＋部分。"},
    pitfall:"把「去掉」的图误列为加法。",
    progression:"L1 一图一式 → L2 一图多式 → L3 图文结合复合题。"
  },
  "number:word:归一归总": {
    title:"典型应用 · 归一归总",
    xueersi:"学而思素养·应用体系（归一问题）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"会用「先求一份量」的归一法解倍数、单价、效率类问题。",
    method:"学而思讲单归一与归总问题，以「一份量」为中介、用线段图分析数量关系。",
    keypoints:["一份量","正归一","反归一","线段图"],
    example:{q:"3 台机器 2 小时生产 60 件，5 台同样的机器 4 小时生产多少？",a:"一台一小时 60÷3÷2=10 件；5×4×10=200 件。"},
    pitfall:"先归一的单位搞错（是「每台每小时」而非「每台每2小时」）。",
    progression:"L1 简单归一 → L2 归总与倍比 → L3 复合归一工程化。"
  },
  "number:word:行程问题(路程=速度×时间)": {
    title:"应用经典 · 行程问题",
    xueersi:"学而思素养·应用体系（行程）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"掌握 s=vt 三要素，理解相遇与追及。",
    method:"学而思从三要素讲起，用 S-T 图帮孩子理解相遇、追及，为五年级行程专题铺垫。",
    keypoints:["s=vt","相遇","追及","线段图"],
    example:{q:"甲乙相距 240 米相向而行，甲速 50 米/分、乙速 70 米/分，几分钟相遇？",a:"速度和 120，240÷120=2 分钟。"},
    pitfall:"追及用成速度和而非速度差。",
    progression:"L1 基本三要素 → L2 相遇追及 → L3 流水/环形/多次相遇。"
  },
  "number:word:鸡兔同笼(假设法)": {
    title:"经典名题 · 鸡兔同笼",
    xueersi:"学而思秘籍·应用题专项（假设法）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会用假设法解决鸡兔同笼及同类「两种东西」问题。",
    method:"学而思经典：二年级用画图假设雏形，四年级讲成熟假设法（全鸡→换兔，脚差÷2），五年级方程法。",
    keypoints:["假设全鸡","脚差÷2","抬脚法","方程法"],
    example:{q:"笼中鸡兔共 10 头 28 脚，鸡兔各几只？",a:"全鸡 20 脚，差 8 脚，每换一兔+2 脚，兔=8÷2=4，鸡=6。"},
    pitfall:"用脚差÷2 后忘记这是「兔的只数」。",
    progression:"L1 画图假设 → L2 假设法 → L3 方程与变式（龟鹤、钱币）。"
  },
  "number:word:平均数": {
    title:"数据直觉 · 平均数",
    xueersi:"学而思素养·应用体系（平均数）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解平均数含义，会用移多补少与总数÷份数求平均。",
    method:"学而思讲移多补少与基准平均数，结合连续数平均数，培养数据直觉。",
    keypoints:["移多补少","总数÷份数","基准数","加权"],
    example:{q:"小明四次测验 88、92、90、94，平均多少？",a:"(88+92+90+94)÷4=364÷4=91。"},
    pitfall:"把「平均数」当成「出现次数最多的数」（那是众数）。",
    progression:"L1 移多补少 → L2 公式求平均 → L3 平均数逆推与加权。"
  },
  "number:word:工程/经济初步": {
    title:"生活应用 · 工程与经济",
    xueersi:"学而思素养·应用体系（工程经济）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解工作效率、利润、折扣等基本数量关系。",
    method:"学而思用 效率×时间=总量、1÷时间=效率 引入简单工程；经济初步讲 利润=售价−成本、折扣。",
    keypoints:["工作效率","总量=效×时","利润","折扣"],
    example:{q:"甲单独 6 天完成，乙单独 3 天完成，合作几天？",a:"甲效 1/6、乙效 1/3，合效 1/2，需 2 天。"},
    pitfall:"把「合作时间」算成 6+3=9（应取效率和的倒数）。",
    progression:"L1 简单工程 → L2 合作与休息 → L3 经济利润综合。"
  },

  /* --- numtheory 数论初步 --- */
  "number:numtheory:奇偶初步": {
    title:"数论启蒙 · 奇偶初步",
    xueersi:"学而思秘籍·数论专项（奇偶）",
    sourceUrl:"https://xueersi.com",
    objective:"认识奇偶数，能判断简单数的奇偶。",
    method:"学而思从生活奇偶现象引入，用「2 的倍数为偶」判断奇偶，铺垫奇偶性。",
    keypoints:["2的倍数","奇偶性","个位判断","配对"],
    example:{q:"15 是奇是偶？为什么？",a:"15 不能被 2 整除（个位 5），是奇数。"},
    pitfall:"以为「奇数都比偶数小」。",
    progression:"L1 奇偶认识 → L2 奇偶运算 → L3 奇偶分析数字谜。"
  },
  "number:numtheory:奇偶性判断": {
    title:"奇偶分析 · 运算性质",
    xueersi:"学而思秘籍·数论专项（奇偶）",
    sourceUrl:"https://xueersi.com",
    objective:"会用奇偶运算性质快速判断结果奇偶、解数字谜。",
    method:"学而思讲奇偶运算性质（奇±奇=偶、偶±偶=偶、奇×奇=奇等），用于快速判断。",
    keypoints:["奇±奇=偶","偶±偶=偶","奇×奇=奇","奇偶性不变"],
    example:{q:"1＋2＋3＋…＋2024 的和是奇是偶？",a:"2024÷2=1012 个奇数，偶数个奇数之和为偶，故总和是偶。"},
    pitfall:"忽略「偶数个奇数相加为偶」而乱加。",
    progression:"L1 单式判断 → L2 运算性质 → L3 奇偶构造与论证。"
  },
  "number:numtheory:质数合数": {
    title:"数论基石 · 质数合数",
    xueersi:"学而思秘籍·数论专项（质数合数）",
    sourceUrl:"https://xueersi.com",
    objective:"理解质数合数定义，熟记 100 内质数表。",
    method:"学而思讲质数与合数定义、100 内质数表（2、3、5、7、11…97），为分解质因数打基础。",
    keypoints:["质数定义","合数定义","100内质数","唯一分解"],
    example:{q:"100 内最大的质数是几？",a:"97（99=9×11、98 偶、100 偶，97 是质数）。"},
    pitfall:"把 1 当质数（1 既不是质数也不是合数）。",
    progression:"L1 定义与判别 → L2 质数表 → L3 分解质因数。"
  },
  "number:numtheory:整除特征": {
    title:"整除判定 · 特征法",
    xueersi:"学而思秘籍·数论专项（整除）",
    sourceUrl:"https://xueersi.com",
    objective:"掌握 2/3/4/5/8/9 的整除特征并应用。",
    method:"学而思系统讲能被 2/3/4/5/8/9 整除的特征，结合位值原理做简算与数论启蒙。",
    keypoints:["末位判断","数字和","末两位","位值原理"],
    example:{q:"判断 738 能否被 9 整除。",a:"7+3+8=18 能被 9 整除，故 738 能被 9 整除。"},
    pitfall:"用 3 的特征去判断 9（数字和是 9 的倍数才被 9 整除）。",
    progression:"L1 2/5 末位 → L2 3/9 数字和 → L3 4/8 末两位与综合。"
  },
  "number:numtheory:余数初步": {
    title:"带余除法 · 周期应用",
    xueersi:"学而思秘籍·数论专项（余数）",
    sourceUrl:"https://xueersi.com",
    objective:"理解被除数=除数×商+余数，会用周期/同余解「第几个」问题。",
    method:"学而思引入带余除法，用周期与同余解决日期、报数中的「第几个」问题。",
    keypoints:["带余除法","余数<除数","周期","同余"],
    example:{q:"星期三往后数 10 天是星期几？",a:"10÷7 余 3，三+3=六，星期六。"},
    pitfall:"余数为 0 时仍加天数（余 0 即回到原点/原星期）。",
    progression:"L1 余数认识 → L2 周期问题 → L3 同余与韩信点兵。"
  },

  /* ===================== 逻辑推理 logic ===================== */
  /* --- rule 规律与推理 --- */
  "logic:rule:找不同": {
    title:"观察力训练 · 找不同",
    xueersi:"学而思素养·思维培养（观察比较）",
    sourceUrl:"https://xueersi.com",
    objective:"能从多维度（颜色、形状、数量、位置）找出不同。",
    method:"学而思训练特征观察——从颜色、形状、数量、位置多维度找不同，培养观察力。",
    keypoints:["颜色","形状","数量","位置"],
    example:{q:"四个图形中三个是红圆，一个是蓝圆，哪个不同？",a:"蓝圆不同（颜色维度）。"},
    pitfall:"只盯一个维度，漏掉其他维度差异。",
    progression:"L1 单维找不同 → L2 多维 → L3 隐蔽规律找不同。"
  },
  "logic:rule:简单规律": {
    title:"模式识别 · 简单规律",
    xueersi:"学而思素养·思维培养（规律）",
    sourceUrl:"https://xueersi.com",
    objective:"能发现并延续颜色、形状、数量的交替规律。",
    method:"学而思讲感知模式与识别模式，从颜色形状交替找规律，建立规律意识。",
    keypoints:["重复规律","交替","递增","模式"],
    example:{q:"○△○△○？下一个？",a:"△（○△ 重复交替）。"},
    pitfall:"把「重复规律」误当成「每次+1 的递增规律」。",
    progression:"L1 重复规律 → L2 递增递减 → L3 复合规律。"
  },
  "logic:rule:分类排序": {
    title:"有序思考 · 分类排序",
    xueersi:"学而思素养·思维培养（分类）",
    sourceUrl:"https://xueersi.com",
    objective:"能按单一/多角度给物体分类与排序。",
    method:"学而思培养集合与分类——从单一角度到多角度分类，为有序思考奠基。",
    keypoints:["单一标准","多标准","集合","有序"],
    example:{q:"把 红大、红小、蓝大、蓝小四个球按「颜色」和「大小」分类。",a:"颜色：红{大,小}/蓝{大,小}；大小：大{红,蓝}/小{红,蓝}。"},
    pitfall:"分类标准中途切换，导致重叠或遗漏。",
    progression:"L1 单标准分类 → L2 双标准 → L3 多属性排序。"
  },
  "logic:rule:周期问题": {
    title:"周期规律 · 余数定位",
    xueersi:"学而思秘籍·规律专项（周期）",
    sourceUrl:"https://xueersi.com",
    objective:"会用「总数÷周期长=组数…余数」解决日期与序列周期。",
    method:"学而思用「总数÷周期长」求余数，由余数定位周期中的第几位。",
    keypoints:["周期长","余数定位","分组","日期周期"],
    example:{q:"按 红黄蓝 循环挂灯，第 20 盏什么色？",a:"20÷3 余 2，周期第 2 位是黄。"},
    pitfall:"余 0 时取周期最后一位，而非第一位。",
    progression:"L1 简单周期 → L2 双周期 → L3 复合周期与日期。"
  },
  "logic:rule:数字推理": {
    title:"数串归纳 · 数字推理",
    xueersi:"学而思秘籍·规律专项（数串）",
    sourceUrl:"https://xueersi.com",
    objective:"能发现数列等差/等比/递推规律并续写。",
    method:"学而思用数串规律与数表培养数字推理，从等差/等比到通项归纳。",
    keypoints:["等差","等比","递推","通项"],
    example:{q:"2, 4, 8, 16, ?",a:"等比×2，下一项 32。"},
    pitfall:"相邻差法套用到等比/递推数列上。",
    progression:"L1 等差续写 → L2 等比与递推 → L3 数表与图形数。"
  },
  "logic:rule:条件推理": {
    title:"多条件推理 · 表格法",
    xueersi:"学而思秘籍·逻辑专项（条件推理）",
    sourceUrl:"https://xueersi.com",
    objective:"能根据多条条件逐步排除/确定结论。",
    method:"学而思训练根据条件逐步排除/确定，用表格法整理多条件推理。",
    keypoints:["排除","确定","表格法","交叉验证"],
    example:{q:"甲不是最高的，乙比甲高，谁最高？",a:"乙＞甲，且甲非最高→丙最高（三人中）。"},
    pitfall:"条件之间未交叉验证导致矛盾。",
    progression:"L1 两条件 → L2 表格法 → L3 多对象复杂推理。"
  },
  "logic:rule:归纳递推": {
    title:"递推思想 · 归纳递推",
    xueersi:"学而思秘籍·规律专项（递推）",
    sourceUrl:"https://xueersi.com",
    objective:"能从特殊案例归纳出递推关系。",
    method:"学而思讲归纳递推（如传球法、类斐波那契），从特殊找一般规律。",
    keypoints:["从特殊到一般","递推式","斐波那契","构造"],
    example:{q:"上楼梯一次 1 或 2 阶，上 4 阶几种走法？",a:"f(1)=1,f(2)=2,f(3)=3,f(4)=5（类斐波那契）。"},
    pitfall:"漏掉「一次可上 2 阶」的分支。",
    progression:"L1 简单递推 → L2 类斐波那契 → L3 传球与染色递推。"
  },
  "logic:rule:复杂规律建模": {
    title:"抽象建模 · 复杂规律",
    xueersi:"学而思秘籍·规律专项（建模）",
    sourceUrl:"https://xueersi.com",
    objective:"能把图形、操作类复杂规律抽象为模型。",
    method:"学而思引导孩子把复杂规律抽象为模型（数列、图形、操作），提升抽象力。",
    keypoints:["抽象","建模","多维规律","验证"],
    example:{q:"正三角形每边放 3 颗棋，最少共几颗？",a:"顶点共用，3 边×3−3 顶点重复=6 颗。"},
    pitfall:"顶点被重复计数未去重。",
    progression:"L1 图形规律 → L2 操作规律 → L3 多维综合建模。"
  },

  /* --- deduce 逻辑排除 --- */
  "logic:deduce:排除法": {
    title:"逻辑选择 · 排除法",
    xueersi:"学而思秘籍·逻辑专项（排除）",
    sourceUrl:"https://xueersi.com",
    objective:"会用列表划去不可能项锁定答案。",
    method:"学而思用排除法做逻辑选择，列表划去不可能项以锁定答案。",
    keypoints:["列表","划去","锁定","矛盾"],
    example:{q:"A说不是我，B说是C，C说不是我；只有一人说真，谁做？",a:"若C做，则A真C假B假→两真矛盾；推得B做，A真B假C真→两真，故A做（仅A真）。"},
    pitfall:"未逐人假设验证导致多解。",
    progression:"L1 两选项排除 → L2 列表排除 → L3 多条件矛盾推理。"
  },
  "logic:deduce:排队推理": {
    title:"方位推理 · 排队问题",
    xueersi:"学而思秘籍·逻辑专项（排队）",
    sourceUrl:"https://xueersi.com",
    objective:"能根据前后左右位置描述确定排队次序。",
    method:"学而思用前后左右位置关系做排队推理，结合方位与序数。",
    keypoints:["前后","左右","序数","相对位置"],
    example:{q:"A在B前，C在B后，三人顺序？",a:"A、B、C（由前后关系直接定）。"},
    pitfall:"左右相对性误判（以谁为参照）。",
    progression:"L1 单维排队 → L2 双参照 → L3 二维方位推理。"
  },
  "logic:deduce:真假话问题": {
    title:"假设求证 · 真假话",
    xueersi:"学而思秘籍·逻辑专项（真假话）",
    sourceUrl:"https://xueersi.com",
    objective:"会用假设法破解真假话，找出说真话者。",
    method:"学而思讲真假话用假设法——先假定某人说真话，检验是否自相矛盾。",
    keypoints:["假设","自相矛盾","唯一真话","唯一假话"],
    example:{q:"甲：我没做；乙：是丙；丙：不是我；仅一人说真，谁做？",a:"假设丙做→甲真乙假丙假（一真）成立，但乙说丙做却假，矛盾；故甲做，仅甲真。"},
    pitfall:"假设后未检查「是否恰一人说真」的题设。",
    progression:"L1 两人口供 → L2 三人口供 → L3 多句矛盾链。"
  },
  "logic:deduce:关系判断": {
    title:"比较链 · 关系判断",
    xueersi:"学而思秘籍·逻辑专项（关系）",
    sourceUrl:"https://xueersi.com",
    objective:"能用排序与比较链确定大小/高低/轻重关系。",
    method:"学而思训练关系推理（大小、高低、轻重），用排序与比较链。",
    keypoints:["传递性","比较链","排序","不等式"],
    example:{q:"甲比乙高，乙比丙高，谁最矮？",a:"甲＞乙＞丙，丙最矮。"},
    pitfall:"关系不具传递时（如循环）误用传递。",
    progression:"L1 两两比较 → L2 比较链 → L3 不等式推理。"
  },
  "logic:deduce:逻辑谜题": {
    title:"综合推理 · 逻辑谜题",
    xueersi:"学而思秘籍·逻辑专项（谜题）",
    sourceUrl:"https://xueersi.com",
    objective:"能用表格法与多条件破解复杂逻辑谜题。",
    method:"学而思用复杂条件+表格法破解逻辑谜题，培养严密推理。",
    keypoints:["表格法","多条件","交叉","唯一解"],
    example:{q:"三人分三种颜色帽子，已知甲≠红、乙≠蓝，丙=绿，谁戴红？",a:"丙绿，甲≠红→甲蓝，剩乙红。"},
    pitfall:"表格未逐格排除导致多解。",
    progression:"L1 单表谜题 → L2 双属性 → L3 多对象复杂谜题。"
  },
  "logic:deduce:假设反证": {
    title:"逆向思维 · 假设反证",
    xueersi:"学而思秘籍·逻辑专项（反证）",
    sourceUrl:"https://xueersi.com",
    objective:"能用反证法（归谬）证明结论。",
    method:"学而思讲假设反证——假设结论不成立推出矛盾以证原结论，训练逆向思维。",
    keypoints:["反设","推出矛盾","归谬","逆向"],
    example:{q:"证明至少 2 人同月生日（13 人）。",a:"反设都不同月，最多 12 人，与 13 矛盾，故至少 2 人同月。"},
    pitfall:"反设方向写反（应反设结论不成立）。",
    progression:"L1 简单反证 → L2 抽屉式反证 → L3 构造性反证。"
  },

  /* --- count 计数与组合 --- */
  "logic:count:简单枚举": {
    title:"有序枚举 · 不重不漏",
    xueersi:"学而思秘籍·计数专项（枚举）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"能有序列举，做到不重不漏。",
    method:"学而思强调有序枚举（不重不漏），用分层数培养一年级的有序思考习惯。",
    keypoints:["有序","不重","不漏","分层"],
    example:{q:"用 1、2、3 能组几个无重复两位数？",a:"12、13、21、23、31、32，共 6 个（按十位分层）。"},
    pitfall:"随机列举导致重复或遗漏。",
    progression:"L1 分层枚举 → L2 树形图 → L3 分类枚举。"
  },
  "logic:count:加乘原理初步": {
    title:"计数原理 · 加乘初步",
    xueersi:"学而思秘籍·计数专项（原理）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"区分分类（加）与分步（乘），会用字典排列、树形图。",
    method:"学而思讲加法原理（分类）与乘法原理（分步），用字典排列法、树形图。",
    keypoints:["分类相加","分步相乘","树形图","字典序"],
    example:{q:"上衣 3 件、裤子 2 条，几种搭配？",a:"分步 3×2=6 种。"},
    pitfall:"该「分类相加」误用「分步相乘」。",
    progression:"L1 树形图 → L2 加乘区分 → L3 加乘混合。"
  },
  "logic:count:排列组合": {
    title:"计数进阶 · 排列组合",
    xueersi:"学而思秘籍·计数专项（排列组合）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"理解排列与组合区别，会用插板、捆绑、插空。",
    method:"学而思系统讲排列组合，含插板法、捆绑法、插空法，解决复杂计数。",
    keypoints:["排列A","组合C","捆绑法","插空法"],
    example:{q:"3 人排一排几种？选 2 人组合几种？",a:"排列 3!=6；组合 C(3,2)=3。"},
    pitfall:"排列组合不分（是否计顺序）。",
    progression:"L1 概念区分 → L2 捆绑插空 → L3 圆排列与可重。"
  },
  "logic:count:容斥原理": {
    title:"重叠计数 · 容斥原理",
    xueersi:"学而思秘籍·计数专项（容斥）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会用 A∪B=A+B−A∩B 处理重叠计数。",
    method:"学而思用容斥解决重叠计数，配合韦恩图直观。",
    keypoints:["韦恩图","A+B−交","重叠","三集合"],
    example:{q:"会英 12 人会日 8 人，都会 3 人，共几人？",a:"12+8−3=17 人。"},
    pitfall:"重复部分未减去（多算了交集）。",
    progression:"L1 两集合 → L2 韦恩图 → L3 三集合容斥。"
  },
  "logic:count:握手问题": {
    title:"组合模型 · 握手问题",
    xueersi:"学而思秘籍·计数专项（握手）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"理解握手是组合典型，联系数线段模型。",
    method:"学而思把握手作为组合典型——n 人握手共 C(n,2) 次，联系数线段模型。",
    keypoints:["C(n,2)","数线段","无向","配对"],
    example:{q:"5 人两两握手共几次？",a:"C(5,2)=10 次（同数 5 条线段选 2 端点）。"},
    pitfall:"算成 n×(n−1)（那是排列，握手无向需÷2）。",
    progression:"L1 数线段 → L2 握手公式 → L3 比赛与通信模型。"
  },

  /* --- strategy 统筹与策略 --- */
  "logic:strategy:顺序统筹": {
    title:"统筹启蒙 · 顺序安排",
    xueersi:"学而思秘籍·策略专项（统筹）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"理解「同时做更省时」的统筹思想。",
    method:"学而思用合理安排顺序（如煮饭同时炒菜）启蒙统筹，理解同时做更省时。",
    keypoints:["同时做","关键路径","等侯","省时"],
    example:{q:"烧水 8 分、洗杯 2 分、泡茶 1 分，最少几分钟？",a:"烧水同时洗杯，8+1=9 分（不是 11）。"},
    pitfall:"把可并行的步骤串行相加。",
    progression:"L1 同时做 → L2 关键路径 → L3 多任务调度。"
  },
  "logic:strategy:统筹优化": {
    title:"最优化 · 统筹方案",
    xueersi:"学而思秘籍·策略专项（优化）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会安排最优方案、解决调运问题。",
    method:"学而思讲统筹与最优化——安排最优方案、调运问题，培养策略力。",
    keypoints:["最优","调运","方案比较","成本"],
    example:{q:"两厂供两店，如何调运运费最低？",a:"列方案表比大小，选最小总运费（就近优先）。"},
    pitfall:"未列全方案就下结论。",
    progression:"L1 方案比较 → L2 调运 → L3 线性规划雏形。"
  },
  "logic:strategy:最值问题": {
    title:"极端构造 · 最值问题",
    xueersi:"学而思秘籍·策略专项（最值）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会用极端构造与调整法求最值。",
    method:"学而思用抽屉原理/容斥解最值，训练极端构造与调整法。",
    keypoints:["极端","调整","抽屉","构造"],
    example:{q:"10 个和不超 100 的正整数，最大数至少几？",a:"其余 9 个尽量小(1)，最大至少 100−9=91。"},
    pitfall:"未让其余量取极端就求最值。",
    progression:"L1 简单最值 → L2 构造调整 → L3 组合最值。"
  },
  "logic:strategy:鸽巢(抽屉)原理": {
    title:"存在性 · 抽屉原理",
    xueersi:"学而思秘籍·策略专项（抽屉）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"理解并运用抽屉原理做存在性证明。",
    method:"学而思讲抽屉原理——n+1 物放 n 抽屉必有一抽屉≥2，用于存在性证明。",
    keypoints:["n+1与n","平均","存在性","最坏情况"],
    example:{q:"13 人至少几人同月生日？",a:"12 月为抽屉，13 人→至少 2 人同月。"},
    pitfall:"抽屉数取错（应为「月=12」而非「人=13」）。",
    progression:"L1 基本抽屉 → L2 平均构造 → L3 加强抽屉。"
  },
  "logic:strategy:博弈策略": {
    title:"策略博弈 · 取子游戏",
    xueersi:"学而思秘籍·策略专项（博弈）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"能分析先手/后手的有利策略。",
    method:"学而思引入简单博弈（取石子、对称策略），培养先手/后手的全局分析。",
    keypoints:["先手","后手","对称","必胜态"],
    example:{q:"15 颗石子每次取 1−3，取最后者胜，先手怎么赢？",a:"先取 3 剩 12（4 的倍数），之后每轮与对手凑 4 即必胜。"},
    pitfall:"未把局面凑成「安全倍数」。",
    progression:"L1 对称策略 → L2 凑倍必胜 → L3 组合博弈。"
  },

  /* ===================== 图形认知 shape ===================== */
  /* --- feat 图形特征 --- */
  "shape:feat:认识基本图形": {
    title:"图形感知 · 基本图形",
    xueersi:"学而思秘籍·几何专项（图形认识）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"认识点线角与平面/立体图形基本特征。",
    method:"学而思从基本图形感知入手，认识点线角与平面/立体图形特征。",
    keypoints:["点线角","平面图形","立体图形","特征"],
    example:{q:"正方形有几条边几个角？",a:"4 条边、4 个直角，四边相等。"},
    pitfall:"把「立体图形」特征套到平面图形。",
    progression:"L1 平面认识 → L2 立体感知 → L3 特征对比。"
  },
  "shape:feat:图形对称": {
    title:"美感启蒙 · 图形对称",
    xueersi:"学而思秘籍·几何专项（对称）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"感知对称之美，能识别生活中的对称。",
    method:"学而思讲感受对称之美，动手操作感受轴对称并联系生活。",
    keypoints:["对称","左右相同","生活对称","操作"],
    example:{q:"蝴蝶、人、书哪些对称？",a:"蝴蝶、人（左右对称）；合上的书也对称。"},
    pitfall:"把「旋转对称」当「轴对称」。",
    progression:"L1 感知对称 → L2 轴对称 → L3 中心对称。"
  },
  "shape:feat:轴对称图形": {
    title:"轴对称 · 定义与画法",
    xueersi:"学而思秘籍·几何专项（轴对称）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解轴对称定义，会画对称轴。",
    method:"学而思讲轴对称图形定义（对折完全重合），训练识别与画对称轴。",
    keypoints:["对折重合","对称轴","对应点","垂直平分"],
    example:{q:"长方形有几条对称轴？",a:"2 条（过中心横、竖各一条）。"},
    pitfall:"把对角线当成长方形对称轴（对折不重合）。",
    progression:"L1 识别 → L2 画轴 → L3 补全对称图。"
  },
  "shape:feat:中心对称": {
    title:"中心对称 · 旋转重合",
    xueersi:"学而思秘籍·几何专项（中心对称）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解中心对称（旋转180°重合）并会判定。",
    method:"学而思探究中心对称特点（旋转180°重合），动手分割、旋转、拼接图形。",
    keypoints:["旋转180°","对称中心","平行四边形","拼接"],
    example:{q:"平行四边形是中心对称吗？",a:"是，绕对角线交点转180°与原图重合。"},
    pitfall:"与轴对称混淆（中心对称为旋转而非折叠）。",
    progression:"L1 感知 → L2 判定 → L3 旋转作图。"
  },
  "shape:feat:图形性质与判定": {
    title:"几何模型 · 性质判定",
    xueersi:"学而思秘籍·几何专项（性质）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"掌握常见图形的边、角、对角线关系。",
    method:"学而思系统讲图形性质与判定（边、角、对角线关系），为几何模型奠基。",
    keypoints:["边角关系","对角线","判定","模型"],
    example:{q:"正方形对角线有什么性质？",a:"相等、互相垂直平分、平分一组对角。"},
    pitfall:"把菱形性质错加到一般平行四边形。",
    progression:"L1 基本性质 → L2 特殊四边形 → L3 判定综合。"
  },

  /* --- trans 图形变换 --- */
  "shape:trans:平移/翻转": {
    title:"图形运动 · 平移翻转",
    xueersi:"学而思素养·科学思维（图形变换）",
    sourceUrl:"https://xueersi.com",
    objective:"在方格纸上直观感知平移与翻转。",
    method:"学而思用动画演示平移/翻转，让孩子在方格纸上直观感知图形运动。",
    keypoints:["平移","翻转(镜像)","位置变形状不变","方格纸"],
    example:{q:"把△向右平移 3 格，形状变吗？",a:"不变，仅位置变。"},
    pitfall:"翻转后误以为方向不变（左右互换）。",
    progression:"L1 平移 → L2 翻转 → L3 旋转综合。"
  },
  "shape:trans:按特征分类": {
    title:"图形分类 · 多角度",
    xueersi:"学而思素养·科学思维（图形分类）",
    sourceUrl:"https://xueersi.com",
    objective:"能按边、角、对称等特征多角度分类图形。",
    method:"学而思训练按特征（边、角、对称）多角度分类图形。",
    keypoints:["边","角","对称","分类标准"],
    example:{q:"按角把三角形分几类？",a:"锐角、直角、钝角三类。"},
    pitfall:"分类标准中途改变导致交叉。",
    progression:"L1 单特征 → L2 双特征 → L3 多维分类。"
  },
  "shape:trans:旋转": {
    title:"旋转变换 · 绕点转动",
    xueersi:"学而思素养·科学思维（旋转）",
    sourceUrl:"https://xueersi.com",
    objective:"理解绕点按方向、角度旋转，形状大小不变。",
    method:"学而思讲旋转——绕点按方向与角度转动、形状大小不变，并在方格纸画图。",
    keypoints:["旋转中心","方向","角度","不变性"],
    example:{q:"指针从 12 顺时针转 90° 指几？",a:"转 3 个数字到 3。"},
    pitfall:"旋转中心取错导致位置全偏。",
    progression:"L1 感知旋转 → L2 作图 → L3 旋转对称。"
  },
  "shape:trans:图形分割与剪拼": {
    title:"割补思想 · 分割剪拼",
    xueersi:"学而思素养·科学思维（割补）",
    sourceUrl:"https://xueersi.com",
    objective:"会用割补与平移原理解决剪拼问题。",
    method:"学而思讲割补与平移原理解决剪拼，培养图形操作力。",
    keypoints:["割补","平移","等积","剪拼"],
    example:{q:"把平行四边形剪拼成长方形求面积？",a:"沿高剪下直角三角形平移补到右边，成长方形。"},
    pitfall:"剪拼后面积改变（应等积变形）。",
    progression:"L1 简单剪拼 → L2 割补 → L3 等积变换。"
  },
  "shape:trans:图形操作与构造": {
    title:"创造图形 · 操作构造",
    xueersi:"学而思素养·科学思维（构造）",
    sourceUrl:"https://xueersi.com",
    objective:"能动手构造图形（七巧板、拼搭），发展空间创造。",
    method:"学而思引导孩子构造图形（七巧板、拼搭），发展空间创造力。",
    keypoints:["七巧板","拼搭","构造","空间创造"],
    example:{q:"用七巧板能拼出几种不同的三角形？",a:"多种（大、中、小等腰直角），体会分割组合。"},
    pitfall:"拼摆时不计面积是否一致。",
    progression:"L1 模仿拼 → L2 自由拼 → L3 指定图形构造。"
  },

  /* --- count 图形计数 --- */
  "shape:count:简单计数": {
    title:"数图形 · 入门",
    xueersi:"学而思秘籍·几何专项（数图形）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"学会分类、有序数图形，避免漏数。",
    method:"学而思讲数图形入门——分类数、有序数，避免漏数。",
    keypoints:["分类","有序","不重不漏","数线段"],
    example:{q:"一条线上 4 个点能数几条线段？",a:"C(4,2)=6 条（选 2 端点）。"},
    pitfall:"逐条数漏掉跨越的线段。",
    progression:"L1 数线段 → L2 数角 → L3 数三角形。"
  },
  "shape:count:找相同": {
    title:"特征匹配 · 找相同",
    xueersi:"学而思秘籍·几何专项（匹配）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能快速找出相同/不同图形并匹配。",
    method:"学而思训练找相同/不同图形，强化特征观察与匹配。",
    keypoints:["特征","匹配","旋转等价","观察"],
    example:{q:"旋转后的正方形算「相同」吗？",a:"算（旋转不改变图形本身）。"},
    pitfall:"把旋转/翻转后的图形误判为不同。",
    progression:"L1 直接匹配 → L2 旋转等价 → L3 对称等价。"
  },
  "shape:count:网格计数": {
    title:"网格数形 · 长方形",
    xueersi:"学而思秘籍·几何专项（网格计数）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"会用「长边线段×宽边线段」数网格中的长方形。",
    method:"学而思用网格计数数长方形/正方形，引入「长边线段×宽边线段」。",
    keypoints:["网格","长边线段","宽边线段","乘积"],
    example:{q:"2×3 网格（2 行 3 列小格）共几个长方形？",a:"横线3选2=3，竖线4选2=6，3×6=18 个。"},
    pitfall:"直接数小格而非数「线段选法」。",
    progression:"L1 数小正方形 → L2 数长方形 → L3 含正方形统计。"
  },
  "shape:count:组合计数(长方形)": {
    title:"公式法 · 组合数长方形",
    xueersi:"学而思秘籍·几何专项（组合计数）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"掌握组合数长方形 = C(横线,2)×C(竖线,2)。",
    method:"学而思讲组合数长方形=横线选2×竖线选2（C(m,2)×C(n,2)）。",
    keypoints:["C(m,2)","C(n,2)","选线","公式法"],
    example:{q:"4×5 网格共几个长方形？",a:"横5线选2=C(5,2)=10，竖6线选2=C(6,2)=15，共150。"},
    pitfall:"把「网格数」当「线数」（线数=格数+1）。",
    progression:"L1 小网格 → L2 公式 → L3 含正方形与三角。"
  },
  "shape:count:复杂计数技巧": {
    title:"分层编号 · 复杂计数",
    xueersi:"学而思秘籍·几何专项（复杂计数）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能用分层、编号、按方向分类解不规则图形计数。",
    method:"学而思综合分层数、编号法、按方向分类解不规则图形计数。",
    keypoints:["分层","编号","方向分类","去重"],
    example:{q:"不规则多边形数三角形怎么不重？",a:"按顶点/边分类编号，再加和去重。"},
    pitfall:"不规则图形仍套规则公式。",
    progression:"L1 分层 → L2 编号 → L3 综合去重。"
  },

  /* --- measure 度量与公式 --- */
  "shape:measure:直观比较大小": {
    title:"度量启蒙 · 直观比较",
    xueersi:"学而思秘籍·几何专项（度量）",
    sourceUrl:"https://xueersi.com",
    objective:"会用感官与自然测量比较长短、大小、轻重。",
    method:"学而思用感官测量与自然测量直观比较长短、大小、轻重。",
    keypoints:["直观","叠放","统一单位","估测"],
    example:{q:"两根绳哪根长？直接比的方法？",a:"一端对齐看另一端；或绕同物比圈数。"},
    pitfall:"未对齐端点直接比（斜放误导）。",
    progression:"L1 直观比 → L2 自然单位 → L3 标准单位。"
  },
  "shape:measure:周长面积入门": {
    title:"概念区分 · 周长面积",
    xueersi:"学而思秘籍·几何专项（周长面积）",
    sourceUrl:"https://xueersi.com",
    objective:"区分周长（一周长度）与面积（表面大小）。",
    method:"学而思讲周长（一周长度）与面积（表面大小）的概念与单位区分。",
    keypoints:["一周","表面","长度单位","面积单位"],
    example:{q:"把长方形拉成平行四边形，周长面积变吗？",a:"周长不变（边长和），面积变小（高变矮）。"},
    pitfall:"以为变形后面积也不变。",
    progression:"L1 概念 → L2 单位 → L3 关系与变形。"
  },
  "shape:measure:周长计算": {
    title:"周长公式 · 长方形正方形",
    xueersi:"学而思秘籍·几何专项（周长）",
    sourceUrl:"https://xueersi.com",
    objective:"会算长方/正方形周长及组合图形周长。",
    method:"学而思系统讲周长公式（长方形(长+宽)×2、正方形边长×4），含组合图形。",
    keypoints:["(长+宽)×2","边长×4","平移边","组合"],
    example:{q:"长 6 宽 4 长方形周长？",a:"(6+4)×2=20。"},
    pitfall:"把「周长」用面积公式算（长×宽）。",
    progression:"L1 基本周长 → L2 组合图 → L3 平移求周长。"
  },
  "shape:measure:面积计算": {
    title:"面积公式 · 割补求积",
    xueersi:"学而思秘籍·几何专项（面积）",
    sourceUrl:"https://xueersi.com",
    objective:"会算基本图形面积，用割补求不规则面积。",
    method:"学而思讲面积公式（长方形长×宽等），用割补法、平移求不规则面积。",
    keypoints:["长×宽","底×高","割补","等积"],
    example:{q:"L形如何求面积？",a:"分割为两个长方形分别算再相加，或补成大方减缺角。"},
    pitfall:"直接套长方形公式忽略 L 形缺口。",
    progression:"L1 基本面积 → L2 割补 → L3 等积模型。"
  },
  "shape:measure:一笔画": {
    title:"奇偶判定 · 一笔画",
    xueersi:"学而思秘籍·几何专项（一笔画）",
    sourceUrl:"https://xueersi.com",
    objective:"会用奇点个数判定能否一笔画。",
    method:"学而思讲一笔画判定（奇点个数 0 或 2），联系多笔画与奇偶性。",
    keypoints:["奇点","偶点","0或2可画","多笔画"],
    example:{q:"「田」字能一笔画吗？",a:"4 个奇点，不能一笔画（需 4÷2+1=3 笔）。"},
    pitfall:"把偶点（偶数条线交汇）误当奇点。",
    progression:"L1 奇点概念 → L2 判定 → L3 多笔画最少笔数。"
  },
  "shape:measure:皮克定理": {
    title:"格点面积 · 皮克定理",
    xueersi:"学而思秘籍·几何专项（皮克）",
    sourceUrl:"https://xueersi.com",
    objective:"会用皮克定理求格点多边形面积。",
    method:"学而思讲皮克定理（面积=内部点+边界点÷2−1），格点多边形巧求面积。",
    keypoints:["内部点","边界点","S=I+B/2−1","格点"],
    example:{q:"格点正方形顶点在格点、内部 4 边界 4，面积？",a:"S=4+4/2−1=5。"},
    pitfall:"边界点计数重复顶点（每条边点数相加后顶点多算）。",
    progression:"L1 数格点 → L2 套公式 → L3 复杂格点形。"
  },

  /* ===================== 空间想象 space ===================== */
  /* --- solid 立体认识 --- */
  "space:solid:立体识别": {
    title:"立体感知 · 摸看识别",
    xueersi:"学而思素养·科学思维（立体认识）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能识别柱体、锥体、球体等常见立体。",
    method:"学而思用摸一摸/看一看认识柱体、锥体、球体，建立立体感知。",
    keypoints:["柱体","锥体","球体","特征"],
    example:{q:"哪些能平稳滚动？",a:"球体最易滚；圆柱侧滚；正方体不滚。"},
    pitfall:"把圆柱当棱柱（有曲面）。",
    progression:"L1 认立体 → L2 分类 → L3 特征对比。"
  },
  "space:solid:方位认知": {
    title:"空间方位 · 位置表示",
    xueersi:"学而思素养·科学思维（方位）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解上下左右前后、东南西北，会用数对表位置。",
    method:"学而思讲空间方位（上下左右前后、东南西北），用数对表示位置。",
    keypoints:["上下左右","东南西北","数对","坐标"],
    example:{q:"第 2 行第 3 列记作？",a:"(3,2) 或 (2,3)，约定列前还是行前要明确。"},
    pitfall:"行列顺序约定不一致导致错位。",
    progression:"L1 相对方位 → L2 四面八方 → L3 数对坐标。"
  },
  "space:solid:面·棱·顶点": {
    title:"立体要素 · 面棱顶点",
    xueersi:"学而思素养·科学思维（要素）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"掌握长方体/正方体的面(6)棱(12)顶点(8)。",
    method:"学而思系统讲长方体/正方体的面(6)棱(12)顶点(8)，相对面全等。",
    keypoints:["6面","12棱","8顶点","相对面"],
    example:{q:"正方体几条棱？",a:"12 条（每面 4 条，3 组每组 4 条共用）。"},
    pitfall:"把长方体的「面」数成 8（实为 6）。",
    progression:"L1 数要素 → L2 关系 → L3 展开与对面。"
  },
  "space:solid:立体稳定性": {
    title:"稳定性 · 立体探究",
    xueersi:"学而思素养·科学思维（稳定性）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"通过实物感知立体稳定性与重心。",
    method:"学而思通过实物探究立体稳定性（底面大小、重心），联系生活。",
    keypoints:["底面","重心","稳定","探究"],
    example:{q:"为什么金字塔稳？",a:"底面大、重心低，不易倒。"},
    pitfall:"以为「越高越稳」。",
    progression:"L1 实物感知 → L2 底面影响 → L3 重心分析。"
  },
  "space:solid:展开图识别": {
    title:"展开图 · 11 种",
    xueersi:"学而思秘籍·几何专项（展开图）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"认识正方体 11 种展开图，会识别相对面。",
    method:"学而思讲正方体展开图 11 种，用标 1 法找相对面、识别展开图。",
    keypoints:["11种","标1法","相对面","隔面"],
    example:{q:"「141 型」是正方体展开图吗？",a:"是（中间 4 面、上下各 1，共 6 面合规）。"},
    pitfall:"出现「凹」「田」字形的错误展开图未排除。",
    progression:"L1 认展开 → L2 标1法 → L3 11种全辨。"
  },
  "space:solid:空间折叠": {
    title:"脑中折叠 · 空间折叠",
    xueersi:"学而思秘籍·几何专项（折叠）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能脑中折叠平面图为立体并判断结果。",
    method:"学而思用动画折叠/标色，训练脑中折叠立体、判断折叠后结果。",
    keypoints:["折叠","标色","相对面","脑映像"],
    example:{q:"展开图标好相对面，折叠后相对面还相对吗？",a:"是，相对关系在折叠中保持不变。"},
    pitfall:"折叠后把相邻面误当相对面。",
    progression:"L1 看动画 → L2 标色折叠 → L3 脑中直接判。"
  },

  /* --- view 视图与展开 --- */
  "space:view:镜像方位": {
    title:"镜像空间 · 左右反转",
    xueersi:"学而思秘籍·几何专项（镜像）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"理解镜像左右反转，建立空间镜像感。",
    method:"学而思讲镜像与对称方位，理解左右镜像反转，培养空间镜像感。",
    keypoints:["镜面","左右反","对称","镜像感"],
    example:{q:"镜中时钟 3 点，实际几点？",a:"9 点（左右反转，3↔9）。"},
    pitfall:"把镜像当「上下反」（实为左右反）。",
    progression:"L1 感知 → L2 左右反 → L3 镜像构图。"
  },
  "space:view:三视图(正/侧/俯)": {
    title:"三视图 · 正侧俯",
    xueersi:"学而思秘籍·几何专项（三视图）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"会从正/侧/俯三个方向画出立体平面视图。",
    method:"学而思讲三视图——从正/侧/俯看立体得平面图形，建立视图概念。",
    keypoints:["正视图","侧视图","俯视图","投影"],
    example:{q:"叠 2 层正方块，俯视图看到几个格？",a:"底层占的地面格数（不论高度）。"},
    pitfall:"俯视图按高度数格（实应按底面投影）。",
    progression:"L1 单视图 → L2 三视图 → L3 视图互化。"
  },
  "space:view:复杂三视图还原": {
    title:"反推立体 · 三视图还原",
    xueersi:"学而思秘籍·几何专项（还原）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能由三视图反推立体结构（标数法）。",
    method:"学而思用已知三视图反推立体，标数法（每层小方块数）还原结构。",
    keypoints:["标数法","反推","层数","唯一性"],
    example:{q:"俯视 2×2 各格标 1/2/1/2，立体几块？",a:"各格取最大值相加=1+2+1+2=6 块。"},
    pitfall:"把各格标数直接相加未取「该列最大」。",
    progression:"L1 简单还原 → L2 标数法 → L3 多解判定。"
  },
  "space:view:展开图构造": {
    title:"双向转换 · 展开构造",
    xueersi:"学而思秘籍·几何专项（展开构造）",
    sourceUrl:"https://www.xeseducation.com.hk/",
    objective:"能由立体想展开图或反之，做双向空间转换。",
    method:"学而思讲展开图构造——由立体想展开图或反之，训练双向空间转换。",
    keypoints:["立体→展开","展开→立体","双向","构造"],
    example:{q:"给一展开图，能否折成无盖盒？",a:"看缺一面（无盖）且其余 5 面能围合。"},
    pitfall:"未注意「有盖/无盖」导致面数错。",
    progression:"L1 单向 → L2 双向 → L3 复杂构造。"
  },

  /* --- reason 空间推理 --- */
  "space:reason:数小方块": {
    title:"分层计数 · 数方块",
    xueersi:"学而思秘籍·空间专项（数方块）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会用分层法数堆叠的小方块总数。",
    method:"学而思讲分层数方块（从上往下，每层=凸出+上层），培养数感与空间。",
    keypoints:["分层","凸出","累加","遮挡"],
    example:{q:"底层 9 块、上层叠 4 块，共几块？",a:"9+4=13 块（分层累加）。"},
    pitfall:"被遮挡的方块漏数。",
    progression:"L1 两层 → L2 多层 → L3 缺角还原。"
  },
  "space:reason:立体计数": {
    title:"有序计数 · 立体个数",
    xueersi:"学而思秘籍·空间专项（立体计数）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"用分层/标数法数立体图形个数，有序不重不漏。",
    method:"学而思用分层/标数法数立体图形个数，有序不重不漏。",
    keypoints:["分层","标数","不重不漏","组合"],
    example:{q:"2×2×2 大正方体含几个小正方体？",a:"8 个（2³）。"},
    pitfall:"把「含不同大小立方体」漏算（如还含 1 个 2×2×2 整体）。",
    progression:"L1 小方块 → L2 分层 → L3 含组合计数。"
  },
  "space:reason:表面涂色切块": {
    title:"经典名题 · 表面涂色",
    xueersi:"学而思秘籍·空间专项（表面涂色）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会按涂色面数(3/2/1/0)对大正方体切 n³ 小方块分类计数。",
    method:"学而思经典表面涂色——大正方体切 n³ 小方块，按涂色面数(3/2/1/0)分类计数（角、棱、面、心）。",
    keypoints:["3面(角)","2面(棱)","1面(面)","0面(心)"],
    example:{q:"3×3×3 切块，几块 2 面涂色？",a:"12 条棱、每棱去角 1 块，12×1=12 块。"},
    pitfall:"2 面涂色计数未去掉两端角块（每棱 n−2）。",
    progression:"L1 2×2×2 → L2 3×3×3 → L3 n×n×n 通式。"
  },
  "space:reason:切割问题": {
    title:"切片染色 · 切割问题",
    xueersi:"学而思秘籍·空间专项（切割）",
    sourceUrl:"https://www.shuxueke.net/chuangxinsiwei",
    objective:"会用切片与染色、打洞求切割后的体积与表面积。",
    method:"学而思讲切片与染色、打洞求体积/表面积，用标数法解切割后计数。",
    keypoints:["切片","染色","打洞","表面积变化"],
    example:{q:"长方体打一个贯穿洞，表面积变？",a:"减两端面、加洞壁侧面积，通常净增。"},
    pitfall:"只减洞两端面忘记加洞内壁。",
    progression:"L1 切片 → L2 染色 → L3 打洞综合。"
  }
};

/* 扁平索引：key = `${module}:${boardId}:${topic}`（课程内容不随 L1/L2/L3 变化，但节点会带 level 入参） */
const KNOWLEDGE_COURSE_MAP = {};
Object.keys(KNOWLEDGE_COURSES).forEach(function(k){
  KNOWLEDGE_COURSE_MAP[k] = KNOWLEDGE_COURSES[k];
});

/* 取某个知识树叶子节点对应的课程内容 */
function getKnowledgeCourse(module, boardId, level, topic){
  const c = KNOWLEDGE_COURSES[module + ":" + boardId + ":" + topic];
  if(!c) return null;
  return Object.assign({ module:module, boardId:boardId, level:level, topic:topic }, c);
}
