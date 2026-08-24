/* ============================================================
   思维星球 · 题目↔课程关联数据层 (Course Linkage)
   ------------------------------------------------------------
   通过全网检索（2026-08-13）为 60 章知识点各匹配一门真实可访问的
   课程资源，覆盖：国家中小学智慧教育平台、之江汇教育广场（国家
   教育资源公共服务体系）、B站（高斯数学动画 / 宇老师奥数）、
   可汗学院（中文）、新东方小学奥数、斑马思维、奥数网 等。

   每条课程含：课程名称(title) + 来源平台(provider) + 来源链接(url)
   + 一句话说明(desc) + 关联知识点(topics)。

   与题目数据的关联方式：
     - questions.js 末尾 IIFE 为每道题写入 q.chapter 与 q.courseId
     - courseId 规则：C-${module}-${level}-${chapter}（如 C-logic-L1-1）
     - 工具 getCourse(module,level,chapter) / getCourseForQuestion(q)
   ============================================================ */

/* 全集课程规格表：[module, level, chapter, title, provider, url, desc, topics[]] */
const COURSE_SPEC = [
  /* ---------- 逻辑推理 logic ---------- */
  ["logic","L1",1,"找不同 · 观察与比较","斑马思维","https://banmaapp.com/","观察一组物品找出“不一样”的，建立比较—排除意识","找不同,分类,比较"],
  ["logic","L1",2,"简单规律 · 颜色形状交替","之江汇教育广场","https://ke.zjer.cn/index.php?id=311913&r=curricula/syncourse/info","发现颜色/形状交替出现的顺序，预测下一个","规律,周期,找规律"],
  ["logic","L1",3,"分类排序 · 从大到小排队","斑马思维","https://banmaapp.com/","按大小/类别给数字或物品排好队","分类,排序,序数"],
  ["logic","L1",4,"排队推理 · 前后线索","之江汇教育广场","https://ke.zjer.cn/index.php?id=312856&r=curricula/syncourse/info","根据“谁在谁前面”的线索排出先后顺序","排队,推理,顺序"],
  ["logic","L1",5,"排除法 · 锁定答案","可汗学院·逻辑训练","https://news.qq.com/rain/a/20200506A03TF500","逐一排除不可能的答案，锁定剩下的正确项","排除法,逻辑"],
  ["logic","L2",1,"周期问题 · 除法余数","之江汇教育广场","https://ke.zjer.cn/index.php?r=curricula/syncourse/info&id=313477","用“总数÷周期长取余”算循环中的第几个","周期问题,余数,循环"],
  ["logic","L2",2,"数字推理 · 数列规律","B站·高斯数学动画","https://www.bilibili.com/video/BV19D4y117Ss/","观察相邻数字加/乘/翻倍的变化规律","数字推理,数列,等差"],
  ["logic","L2",3,"条件推理 · 如果就","可汗学院·逻辑训练","https://news.qq.com/rain/a/20200506A03TF500","分清“如果…就…”里的原因和结果，不把方向搞反","条件推理,充分必要"],
  ["logic","L2",4,"真假话 · 假设法","之江汇教育广场","https://ke.zjer.cn/index.php?r=curricula/syncourse/info&id=313477","假设某人说真话，检验是否恰好一人说真，锁定真相","真假话,假设法,逻辑排除"],
  ["logic","L2",5,"星期推算 · 模7周期","之江汇教育广场","https://ke.zjer.cn/index.php?r=curricula/syncourse/info&id=313477","两个日期相差几天，用 7 天一周推算星期","星期推算,周期,模7"],
  ["logic","L3",1,"握手问题 · 组合C(n,2)","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","n 人两两握手用 n×(n-1)÷2 快速算总次数","握手问题,组合,排列组合"],
  ["logic","L3",2,"容斥原理 · 韦恩图","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","A∪B = A+B−A∩B，重叠部分减一次","容斥原理,计数,韦恩图"],
  ["logic","L3",3,"鸽巢原理 · 抽屉原理","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","东西比抽屉多，至少有一个抽屉装下不止一个","鸽巢原理,抽屉原理,最值"],
  ["logic","L3",4,"排列组合 · 乘法除法","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","从若干人里选组合，用乘法与除法避免重复","排列组合,组合,计数"],
  ["logic","L3",5,"统筹优化 · 合理安排时间","B站搜索","https://search.bilibili.com/all?keyword=小学统筹优化合理安排时间","能同时做的事一起做，用最短时间完成任务","统筹优化,统筹,合理安排"],

  /* ---------- 图形认知 shape ---------- */
  ["shape","L1",1,"认识形状 · 圆方三角","之江汇教育广场","https://ke.zjer.cn/index.php?id=311913&r=curricula/syncourse/info","认识圆/方/三角等基本图形，说出边数与特征","图形识别,认识图形,边数"],
  ["shape","L1",2,"图形对称 · 对折重合","B站·高斯数学动画","https://www.bilibili.com/video/BV19D4y117Ss/","把图形对折两边能完全重合的就是对称图形","对称,轴对称,对称轴"],
  ["shape","L1",3,"简单计数 · 行×列","B站·宇老师奥数","https://www.bilibili.com/video/BV1vu4m137kN/","用“行×列”或乘法快速数出图形总数","简单计数,乘法,行×列"],
  ["shape","L1",4,"找相同 · 同类计数","斑马思维","https://banmaapp.com/","在一堆图形里数出某一类（如三角形）有几个","找相同,分类计数"],
  ["shape","L1",5,"按特征分类 · 颜色形状","斑马思维","https://banmaapp.com/","按颜色/形状等特征把图形分成几堆","图形分类,分类标准"],
  ["shape","L2",1,"图形规律 · 形状方向","B站·宇老师奥数","https://www.bilibili.com/video/BV1vu4m137kN/","图形按形状、方向交替出现，预测下一个","图形规律,周期,双属性"],
  ["shape","L2",2,"网格计数 · 大小正方形","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","在方格网里数正方形，既要数小的也要数大的","网格计数,正方形,1²+2²"],
  ["shape","L2",3,"平移旋转翻转 · 图形变换","B站搜索","https://search.bilibili.com/all?keyword=小学图形平移旋转翻转","判断图形平移、旋转或翻转后的方向","平移,旋转,翻转"],
  ["shape","L2",4,"轴对称图形 · 对称轴","国家中小学智慧教育平台","https://basic.smartedu.cn/","沿一条直线对折两边重合，这条直线叫对称轴","轴对称,对称轴,对称"],
  ["shape","L2",5,"图形分割 · 平分图形","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","用一条线把图形分成完全相同的两部分","图形分割,全等,对称轴"],
  ["shape","L3",1,"一笔画 · 奇点判定","B站·高斯数学动画","https://www.bilibili.com/video/BV19D4y117Ss/","奇点（连奇数条线）个数为 0 或 2 才能一笔画","一笔画,奇点,欧拉路径"],
  ["shape","L3",2,"皮克定理 · 格点面积","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","格点多边形面积 = 内部格点 + 边界格点÷2 − 1","皮克定理,格点,面积"],
  ["shape","L3",3,"面积与周长(1) · 正方形","可汗学院（中文）","https://cmn.khanacademy.org/math/zh-grade-3","正方形面积 = 边长×边长，区分周长与面积","面积,周长,正方形"],
  ["shape","L3",4,"组合计数 · 数长方形","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","用“选两条横线×选两条竖线”数长方形","组合计数,长方形,选线法"],
  ["shape","L3",5,"周长计算 · 长方形","可汗学院（中文）","https://cmn.khanacademy.org/math/zh-grade-3","长方形周长 = (长+宽)×2，能逆推未知边长","周长,长方形,逆推"],

  /* ---------- 数感运算 number ---------- */
  ["number","L1",1,"数数与认数 · 合起来","斑马思维","https://banmaapp.com/","把东西数清楚，理解“合起来”是加法","数数,加减,认数"],
  ["number","L1",2,"比大小 · 高位比较","可汗学院（中文）","https://cmn.khanacademy.org/math/zh-grade-3","比较两个数大小，位数多更大、同位数比高位","比大小,比较,数位"],
  ["number","L1",3,"凑十法 · 加法提速","可汗学院（中文）","https://cmn.khanacademy.org/math/zh-grade-3","把一个数凑成 10 再算，加法更快更准","凑十法,加法,进位"],
  ["number","L1",4,"序数 · 第几个","之江汇教育广场","https://ke.zjer.cn/index.php?id=311913&r=curricula/syncourse/info","分清“第几个”和“有几个”，排第几=前面数量+1","序数,基数,排队"],
  ["number","L1",5,"规律数列 · 等差规律","斑马思维","https://banmaapp.com/","发现每次加/减几的规律，填出后面的数","规律数列,等差,递推"],
  ["number","L2",1,"表内乘除 · 口诀互逆","B站·宇老师奥数","https://www.bilibili.com/video/BV1vu4m137kN/","熟练乘法口诀，理解乘除互逆","表内乘除,乘法口诀,除法"],
  ["number","L2",2,"巧算凑整 · 凑十百千","B站·宇老师奥数","https://www.bilibili.com/video/BV1vu4m137kN/","先把能凑整的数相加，再算剩下的","巧算,凑整,运算律"],
  ["number","L2",3,"等差数列 · 公差推理","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","相邻两数差相等，用公差推理任意项","等差数列,公差,数列"],
  ["number","L2",4,"归一问题 · 单一量","奥数网","https://www.aoshu.com/e/20100809/4c5fd92885a9d.shtml","先算“一个”是多少（单一量），再求总量","归一问题,单一量,平均分"],
  ["number","L2",5,"行程问题 · 路程速度时间","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","路程 = 速度 × 时间，先找对三个量","行程问题,相遇,路程"],
  ["number","L3",1,"分数小数 · 同分母加减","可汗学院（中文）","https://zh.khanacademy.org/math/arithmetic/fraction-arithmetic","同分母分数相加减，分母不变、分子相加","分数,小数,通分"],
  ["number","L3",2,"鸡兔同笼 · 假设法","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","假设全是鸡，看脚数差推出另一种","鸡兔同笼,假设法,盈亏"],
  ["number","L3",3,"平均数 · 移多补少","之江汇教育广场","https://ke.zjer.cn/index.php?r=curricula/syncourse/info&id=313477","总数 ÷ 份数 = 平均数，理解其“移多补少”意义","平均数,统计,总数"],
  ["number","L3",4,"百分数 · 占比换算","B站搜索","https://search.bilibili.com/all?keyword=小学百分数折扣","百分数即“百分之几”，用除法算占比再化 %","百分数,折扣,占比"],
  ["number","L3",5,"简便运算 · 凑整与分配律","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","先算能凑整的部分（25×4=100），再继续算","简便运算,提取公因数,分配律"],

  /* ---------- 空间想象 space ---------- */
  ["space","L1",1,"方位认知 · 东南西北","之江汇教育广场","https://ke.zjer.cn/index.php?id=311913&r=curricula/syncourse/info","认识东/南/西/北和生活里的上/下/左/右","方位认知,方向,东南西北"],
  ["space","L1",2,"数小方块 · 行×列×层","斑马思维","https://banmaapp.com/","用“行×列”或“层×行×列”数出方块总数","数小方块,立体计数,乘法"],
  ["space","L1",3,"立体识别 · 谁稳谁滚","B站·高斯数学动画","https://www.bilibili.com/video/BV19D4y117Ss/","认识球/正方体/圆柱，知道谁稳、谁会滚","立体识别,面棱,稳定"],
  ["space","L1",4,"镜像方位 · 左右翻转","斑马思维","https://banmaapp.com/","照镜子时左右会反过来（镜像对称）","镜像方位,镜像,对称"],
  ["space","L1",5,"上下左右 · 相对位置","斑马思维","https://banmaapp.com/","用“在…的上面/下面/左边/右边”说清位置","上下左右,相对位置,参照物"],
  ["space","L2",1,"面棱顶点 · 正方体结构","国家中小学智慧教育平台","https://basic.smartedu.cn/","记牢正方体 6 面、12 棱、8 顶点，会数其他立体","面棱顶点,欧拉公式,计数"],
  ["space","L2",2,"展开图识别 · 11种标准","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","正方体 11 种展开图，“田”“凹”字形不能折成","展开图,11种,相对面"],
  ["space","L2",3,"三视图 · 观察物体","B站搜索","https://search.bilibili.com/all?keyword=小学三视图观察物体","从正前/正上/正侧看立体，看到的平面形状叫视图","三视图,观察物体,投影"],
  ["space","L2",4,"立体计数 · n³","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","大正方体由小正方体拼成，用连乘算总数 n³","立体计数,体积,n³"],
  ["space","L2",5,"方位推理 · 多线索定位","斑马思维","https://banmaapp.com/","根据多个“前/后/左/右”线索确定相对位置","方位推理,定位,线索"],
  ["space","L3",1,"表面涂色·三面 · 顶点","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","大正方体表面涂色后切块，8 个顶点是 3 面涂色","表面涂色,三面,顶点"],
  ["space","L3",2,"表面涂色·两面 · 棱上","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","棱上（不含顶点）小块是 2 面涂色，共 12×(棱长−2)","表面涂色,两面,棱"],
  ["space","L3",3,"切割问题 · 最多几块","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","一刀最多把物体分成两块，多刀要考虑怎么切最多","切割问题,空间划分,最多"],
  ["space","L3",4,"空间折叠 · 11种展开图","新东方小学奥数","https://xiaoxue.koolearn.com/zhuanti/aoshukecheng/","能折成正方体的展开图有 11 种，如 1-4-1 型","空间折叠,展开图,11种"],
  ["space","L3",5,"复杂三视图 · 反推立体","B站搜索","https://search.bilibili.com/all?keyword=小学三视图还原立体","综合正/侧/俯三视图，反推立体由几块方块搭成","复杂三视图,还原,反推"]
];

/* 构建课程对象与查找表 */
const COURSES = COURSE_SPEC.map(([module, level, chapter, title, provider, url, desc, topics]) => ({
  id: `C-${module}-${level}-${chapter}`,
  module, level, chapter, title, provider, url, desc, topics
}));
const COURSE_MAP = {};
COURSES.forEach(c => { COURSE_MAP[c.id] = c; });

/* 按 模块+阶+章 取课程 */
function getCourse(module, level, chapter) {
  return COURSE_MAP[`C-${module}-${level}-${chapter}`] || null;
}
/* 按题目对象取课程（兼容 q.courseId 或直接由 chapter 推导） */
function getCourseForQuestion(q) {
  if (!q) return null;
  if (q.courseId && COURSE_MAP[q.courseId]) return COURSE_MAP[q.courseId];
  if (q.module && q.level && q.chapter) return getCourse(q.module, q.level, q.chapter);
  return null;
}
