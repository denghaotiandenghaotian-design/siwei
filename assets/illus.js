/* ============================================================
   思维星球 · 静态插画引擎 (ConceptIllus)  ·  课本插图风 v1
   每个专题 → 一张专属静态 SVG 插图（图形为主 + 细辅助线 + 尺寸标注）
   零外部依赖；与 framework.js 的 MODULE_SPINE 专题名对齐。
   用法：ConceptIllus.render(boxEl, module, boardId, level, topic)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 基础绘图工具（课本插图风） ---------- */
  var INK = '#46506A', AUX = '#B8C0D0', BLUE = '#4C6FFF', ORANGE = '#E2873B',
      GREEN = '#2FD0A6', PINK = '#E0567A', DEEP = '#2B3A67';

  function S(inner) {
    return '<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Microsoft YaHei,sans-serif">' +
      '<rect width="320" height="200" fill="#FBFCFE"/>' + inner + '</svg>';
  }
  function R(x, y, w, h, f, s) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="' + (f || 'none') + '" stroke="' + (s || AUX) + '" stroke-width="2"/>';
  }
  function C(cx, cy, r, f, s) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || 'none') + '" stroke="' + (s || AUX) + '" stroke-width="2"/>';
  }
  function P(cx, cy, r, f) {
    return '<polygon points="' + cx + ',' + (cy - r) + ' ' + (cx + r) + ',' + (cy + r) + ' ' + (cx - r) + ',' + (cy + r) + '" fill="' + (f || BLUE) + '" stroke="' + DEEP + '" stroke-width="1.5"/>';
  }
  function L(x1, y1, x2, y2, c, d) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || AUX) + '" stroke-width="2" ' + (d ? 'stroke-dasharray="5 4"' : '') + '/>';
  }
  function T(x, y, s, size, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + (fill || INK) + '" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>';
  }
  function E(x, y, ch, size) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 22) + '" text-anchor="middle">' + ch + '</text>';
  }
  // 尺寸标注：两点间细线 + 数值（课本风）
  function dim(x1, y1, x2, y2, label) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    return L(x1, y1, x2, y2, AUX, true) + L(x1, y1 - 4, x1, y1 + 4, AUX) + L(x2, y2 - 4, x2, y2 + 4, AUX) +
      '<rect x="' + (mx - 14) + '" y="' + (my - 9) + '" width="28" height="16" rx="3" fill="#fff" stroke="none"/>' +
      T(mx, my + 4, label, 11, DEEP);
  }
  // 行排 emoji 点阵
  function dots(arr, x0, y, gap) {
    var s = '', i;
    for (i = 0; i < arr.length; i++) s += E(x0 + i * (gap || 30), y, arr[i], 22);
    return s;
  }

  /* =========================================================
     number · calc
     ========================================================= */
  function pNumCount() { // 数数与认数
    return S(dots(['🍎','🍎','🍎','🍎','🍎'], 30, 90, 50) +
      L(30, 130, 270, 130, AUX, true) +
      T(30, 150, '1', 13, INK, 'middle') + T(80, 150, '2', 13) + T(130, 150, '3', 13) +
      T(180, 150, '4', 13) + T(230, 150, '5', 13) +
      T(160, 40, '数一数：1 → 2 → 3 → 4 → 5', 14, DEEP));
  }
  function pNumCompare() { // 比大小与序数
    return S(dots(['🟢','🟢','🟢'], 40, 80, 40) + T(70, 120, '3 个', 13, INK) +
      dots(['🔵','🔵','🔵','🔵','🔵'], 170, 80, 40) + T(260, 120, '5 个', 13, INK) +
      T(160, 80, '＜', 30, ORANGE) + T(160, 170, '3 小于 5（第 3 个 vs 第 5 个）', 12, DEEP));
  }
  function pMakeTen() { // 凑十法
    return S(dots(['🔴','🔴','🔴','🔴','🔴','🔴','🔴','🔴'], 30, 70, 26) +
      dots(['🔵','🔵'], 250, 70, 26) +
      T(70, 115, '8', 16, INK) + T(258, 115, '2', 16, INK) +
      L(30, 92, 238, 92, AUX, true) + T(134, 88, '凑成 10', 12, ORANGE) +
      T(160, 160, '8 ＋ 2 ＝ 10', 16, DEEP));
  }
  function pMulArray() { // 表内乘除
    var s = '', r, c;
    for (r = 0; r < 3; r++) for (c = 0; c < 4; c++) s += R(60 + c * 40, 40 + r * 40, 32, 32, BLUE);
    return S(s + T(160, 175, '3 行 × 4 列 ＝ 12 个', 14, DEEP) + dim(60, 30, 220, 30, '4'));
  }
  function pComplement() { // 巧算凑整
    return S(R(30, 40, 60, 40, '#FFE9DA') + T(60, 66, '38', 18, ORANGE) + R(110, 40, 60, 40, '#E6ECFF') + T(140, 66, '25', 18, BLUE) +
      T(200, 66, '＝', 18, INK) + R(225, 40, 50, 40, '#E6ECFF') + T(250, 66, '63', 18, DEEP) +
      L(30, 95, 90, 95, AUX, true) + T(60, 115, '38＋2', 12, ORANGE) + L(90, 95, 170, 95, AUX, true) + T(130, 115, '40＋23', 12, BLUE) +
      T(160, 160, '先凑整：38＋2＝40，再 40＋23', 12, DEEP));
  }
  function pArithSeq() { // 等差数列
    return S(L(30, 100, 290, 100, AUX, true) +
      T(50, 100, '●', 16, BLUE) + T(110, 100, '●', 16, BLUE) + T(170, 100, '●', 16, BLUE) + T(230, 100, '●', 16, BLUE) +
      T(50, 80, '2', 13) + T(110, 80, '4', 13) + T(170, 80, '6', 13) + T(230, 80, '8', 13) +
      T(290, 80, '…', 16) + T(160, 150, '相邻差都是 2（公差＝2）', 13, DEEP));
  }
  function pFraction() { // 分数小数
    return S('<path d="M160,100 m-60,0 a60,60 0 0,1 60,-60 l0,60 z" fill="' + ORANGE + '"/>' +
      '<circle cx="160" cy="100" r="60" fill="none" stroke="' + DEEP + '" stroke-width="2"/>' +
      L(160, 40, 160, 160, AUX, true) + T(160, 100, '1/2', 16, '#fff') +
      T(250, 95, '1/2', 18, DEEP) + T(250, 120, '＝ 0.5', 16, INK));
  }
  function pPercent() {
    return S('<path d="M160,100 m-60,0 a60,60 0 1,1 60,60 l0,-60 z" fill="' + GREEN + '"/>' +
      '<circle cx="160" cy="100" r="60" fill="none" stroke="' + DEEP + '" stroke-width="2"/>' +
      T(160, 106, '75%', 18, '#fff') + T(255, 100, '占 3/4', 15, DEEP));
  }
  function pEasyCalc() { // 简便运算
    return S(T(40, 70, '25 × 44', 18, DEEP) + T(40, 100, '＝25 × 4 × 11', 14, INK) +
      T(40, 135, '＝100 × 11 ＝ 1100', 16, ORANGE) +
      R(190, 45, 100, 30, '#E6ECFF') + T(240, 66, '25×4=100', 13, BLUE) +
      R(190, 95, 100, 30, '#E6ECFF') + T(240, 116, '100×11', 13, BLUE) +
      R(190, 145, 100, 30, '#FFE9DA') + T(240, 166, '=1100', 13, ORANGE));
  }

  /* =========================================================
     number · word
     ========================================================= */
  function pPicExpr() { // 看图列式入门
    return S(dots(['🍎','🍎'], 50, 80, 34) + T(67, 120, '2', 14, INK) +
      T(130, 88, '＋', 22, ORANGE) + dots(['🍎','🍎','🍎'], 170, 80, 34) + T(205, 120, '3', 14, INK) +
      T(255, 88, '＝', 22) + R(255, 60, 40, 40, '#FFE9DA') + T(275, 88, '5', 18, ORANGE));
  }
  function pUnitRate() { // 归一归总
    return S(dots(['🟦','🟦','🟦'], 40, 70, 34) + T(60, 110, '每份 3', 13, INK) +
      T(150, 80, '×', 20, ORANGE) + R(180, 50, 50, 34, '#E6ECFF') + T(205, 72, '5 份', 13, BLUE) +
      T(260, 80, '＝', 18) + R(255, 55, 45, 38, '#FFE9DA') + T(278, 82, '15', 16, ORANGE));
  }
  function pJourney() { // 行程问题
    return S(L(30, 110, 290, 110, AUX, true) + T(30, 100, '起点', 12) + T(290, 100, '终点', 12) +
      T(90, 110, '🚗', 22) + T(160, 90, 'v', 16, BLUE) + T(160, 130, 't', 16, ORANGE) +
      dim(30, 130, 290, 130, 's') + T(160, 170, '路程 s ＝ 速度 v × 时间 t', 14, DEEP));
  }
  function pChickenRabbit() { // 鸡兔同笼
    return S(R(60, 50, 200, 120, '#EAF6F1', DEEP) + T(160, 76, '🐔', 20) + T(160, 110, '🐔', 20) + T(160, 144, '🐰', 20) +
      L(60, 170, 260, 170, AUX, true) + T(160, 190, '8 个头 · 26 只脚（假设法）', 12, DEEP));
  }
  function pAverage() { // 平均数
    var s = '', i; for (i = 0; i < 3; i++) s += R(50 + i * 70, 60, 50, 60, '#E6ECFF');
    return S(s + T(75, 135, '3', 13) + T(145, 135, '5', 13) + T(215, 135, '7', 13) +
      L(40, 145, 240, 145, ORANGE, true) + T(140, 165, '拉平到 5', 13, ORANGE) +
      T(160, 40, '平均数 ＝ 5', 15, DEEP));
  }
  function pWork() { // 工程/经济初步
    return S(R(40, 50, 60, 90, '#E6ECFF') + T(70, 158, '效率', 12, BLUE) +
      R(130, 80, 60, 60, '#FFE9DA') + T(160, 158, '×时间', 12, ORANGE) +
      T(225, 100, '＝', 18) + R(240, 55, 50, 85, '#EAF6F1') + T(265, 158, '总量', 12, GREEN));
  }

  /* =========================================================
     number · numtheory
     ========================================================= */
  function pParityBasic() { // 奇偶初步
    return S(dots(['👟','👟','👟'], 40, 80, 40) + T(80, 120, '3 双 → 成对', 13, INK) +
      dots(['👟','👟','👟','👟','👟'], 180, 80, 34) + T(255, 120, '5 只 → 单出 1', 13, ORANGE) +
      T(160, 165, '能成双的是偶，剩单只是奇', 13, DEEP));
  }
  function pParityNum() { // 奇偶性判断
    return S(R(40, 50, 80, 40, '#E6ECFF') + T(70, 76, '24', 18, BLUE) + T(70, 110, '个位4', 12) +
      R(160, 50, 80, 40, '#FFE9DA') + T(195, 76, '37', 18, ORANGE) + T(195, 110, '个位7', 12) +
      T(90, 150, '偶：个位 0/2/4/6/8', 12, BLUE) + T(235, 150, '奇：个位 1/3/5/7/9', 12, ORANGE));
  }
  function pPrime() { // 质数合数
    var s = '', n, x, y, i = 0, primes = { 2: 1, 3: 1, 5: 1, 7: 1, 11: 1 };
    for (n = 1; n <= 12; n++) { x = 40 + (i % 6) * 45; y = 50 + Math.floor(i / 6) * 60; i++;
      s += C(x, y, 18, primes[n] ? '#FFE9DA' : '#E6ECFF', DEEP) + T(x, y + 5, n, 13, DEEP); }
    return S(s + T(160, 185, '橙圈＝质数（只有1和它本身两个因数）', 12, ORANGE));
  }
  function pDivisible() { // 整除特征
    return S(dots(['🔵','🔵','🔵'], 40, 70, 40) + T(70, 110, '3 个一组', 12) +
      dots(['🔵','🔵','🔵'], 40, 130, 40) + dots(['🔵','🔵','🔵'], 40, 190 - 60, 40) +
      T(170, 90, '9 ÷ 3 ＝ 3', 15, BLUE) + T(170, 130, '无剩余 → 整除', 13, INK) +
      T(170, 165, '末位/数位和判特征', 12, DEEP));
  }
  function pRemainder() { // 余数初步
    return S(dots(['🍪','🍪','🍪','🍪'], 40, 80, 40) + T(70, 120, '4 块', 12) +
      T(150, 90, '÷', 18) + dots(['👦','👦','👦'], 170, 80, 40) + T(230, 120, '3 人', 12) +
      T(150, 150, '每人1块，剩 1 块', 13, ORANGE) + T(150, 175, '余数 ＝ 1', 14, DEEP));
  }

  /* =========================================================
     logic · rule
     ========================================================= */
  function pFindDiff() { // 找不同
    return S(C(70, 80, 22, '#E6ECFF', DEEP) + P(150, 80, 22, BLUE) + C(230, 80, 22, '#E6ECFF', DEEP) +
      R(70, 130, 44, 44, '#E6ECFF', DEEP) + P(150, 152, 22, BLUE) + R(230, 130, 44, 44, '#E6ECFF', DEEP) +
      T(150, 40, '中间的是不同类', 13, ORANGE));
  }
  function pSimplePattern() { // 简单规律
    return S(T(50, 110, '△', 22, BLUE) + T(100, 110, '○', 22, ORANGE) + T(150, 110, '□', 22, GREEN) +
      T(200, 110, '△', 22, BLUE) + T(250, 110, '○', 22, ORANGE) + T(290, 110, '□?', 20, DEEP) +
      T(160, 160, '循环：△ ○ □ △ ○ □ …', 13, INK));
  }
  function pClassifySort() { // 分类排序
    return S(dots(['🔴','🔵','🔴','🔵','🔴','🔵'], 30, 70, 38) +
      T(40, 120, '混', 12) + T(160, 60, '🔴🔴🔴', 13, PINK) + T(160, 100, '🔵🔵🔵', 13, BLUE) +
      T(160, 150, '按颜色分两堆', 13, DEEP));
  }
  function pCycle() { // 周期问题
    return S(dots(['🍎','🍊','🍎','🍊','🍎','🍊'], 25, 90, 42) +
      T(160, 50, '周期 2：🍎🍊', 13, ORANGE) + T(160, 155, '第 7 个？数到周期位置', 12, DEEP));
  }
  function pNumReason() { // 数字推理
    return S(T(45, 100, '2', 20, BLUE) + T(95, 100, '4', 20, BLUE) + T(145, 100, '8', 20, BLUE) +
      T(195, 100, '16', 20, BLUE) + T(250, 100, '32', 20, DEEP) + T(295, 100, '…', 18) +
      T(160, 150, '×2 倍增：2,4,8,16,32', 13, INK));
  }
  function pCondReason() { // 条件推理
    return S(R(40, 50, 80, 90, '#E6ECFF') + T(80, 100, 'A', 18, BLUE) + R(150, 50, 80, 90, '#FFE9DA') + T(190, 100, 'B', 18, ORANGE) +
      T(260, 70, '若 A 则 B', 14, DEEP) + T(260, 100, 'A 成立', 13, GREEN) + T(260, 130, '∴ B 成立', 13, INK));
  }
  function pRecur() { // 归纳递推
    return S(T(60, 80, '1', 16, BLUE) + T(110, 90, '1', 16, BLUE) + T(160, 110, '2', 16, ORANGE) +
      T(210, 140, '3', 16, ORANGE) + T(260, 175, '5', 16, DEEP) + T(290, 185, '…', 16) +
      L(70, 85, 152, 105, AUX, true) + L(120, 95, 168, 125, AUX, true) + L(170, 115, 218, 148, AUX, true) +
      T(160, 40, '前两项相加', 13, DEEP));
  }
  function pModelRule() { // 复杂规律建模
    return S(R(40, 60, 50, 50, BLUE) + R(110, 60, 50, 50, ORANGE) + R(180, 60, 50, 50, GREEN) +
      R(70, 130, 50, 50, ORANGE) + R(140, 130, 50, 50, GREEN) + R(210, 130, 50, 50, BLUE) +
      T(160, 40, '图形位置→数列', 13, DEEP));
  }

  /* =========================================================
     logic · deduce
     ========================================================= */
  function pEliminate() { // 排除法
    return S(R(40, 50, 60, 30, '#E6ECFF') + T(70, 71, '甲', 13) + R(120, 50, 60, 30, '#FFE0E0') + T(150, 71, '乙✗', 13, PINK) +
      R(200, 50, 60, 30, '#E6ECFF') + T(230, 71, '丙', 13) + T(70, 120, '乙 不符 → 划去', 13, PINK) +
      R(40, 140, 60, 30, '#E6ECFF') + T(70, 161, '甲', 13) + R(120, 140, 60, 30, '#FFE0E0') + T(150, 161, '丙✗', 13, PINK) +
      T(160, 185, '再比 → 剩下 甲', 13, DEEP));
  }
  function pQueue() { // 排队推理
    return S(T(50, 110, '👦', 22) + T(110, 110, '👧', 22) + T(170, 110, '🧒', 22) + T(230, 110, '👩', 22) +
      T(50, 145, '1', 12) + T(110, 145, '2', 12) + T(170, 145, '3', 12) + T(230, 145, '4', 12) +
      T(160, 50, '小明在第 3 位', 13, DEEP));
  }
  function pTruthLie() { // 真假话问题
    return S(R(40, 50, 80, 35, '#E6ECFF') + T(80, 73, '甲:我是', 12) + R(140, 50, 80, 35, '#FFE9DA') + T(180, 73, '乙:甲假', 12) +
      R(40, 100, 80, 35, '#E6ECFF') + T(80, 123, '丙:乙真', 12) + T(240, 80, '只有1人说真', 12, DEEP) +
      T(160, 165, '假设甲真→矛盾，则甲假', 12, ORANGE));
  }
  function pRelation() { // 关系判断
    return S(T(60, 120, '🧍', 30) + T(60, 150, '高', 12, BLUE) + T(150, 135, '🧍', 22) + T(150, 158, '中', 12) +
      T(230, 148, '🧍', 14) + T(230, 162, '矮', 12, ORANGE) + L(60, 90, 230, 132, AUX, true) +
      T(160, 50, '高 ＞ 中 ＞ 矮', 13, DEEP));
  }
  function pLogicGrid() { // 逻辑谜题
    return S(R(40, 50, 240, 110, '#fff', AUX) + L(130, 50, 130, 160, AUX, true) + L(40, 105, 280, 105, AUX, true) +
      T(85, 80, 'A', 14) + T(205, 80, 'B', 14) + T(85, 135, 'C', 14) + T(205, 135, 'D', 14) +
      T(160, 185, '行列交叉定位', 12, DEEP));
  }
  function pContra() { // 假设反证
    return S(R(40, 60, 80, 50, '#E6ECFF') + T(80, 92, '假设', 14, BLUE) + R(140, 60, 80, 50, '#FFE0E0') + T(180, 92, '推出矛盾', 14, PINK) +
      T(255, 80, '✗', 20, PINK) + R(40, 130, 80, 50, '#EAF6F1') + T(80, 162, '原命题真', 14, GREEN) +
      T(160, 40, '反证法', 13, DEEP));
  }

  /* =========================================================
     logic · count
     ========================================================= */
  function pEnum() { // 简单枚举
    return S(R(40, 50, 50, 40, '#E6ECFF') + R(105, 50, 50, 40, '#FFE9DA') + R(170, 50, 50, 40, '#EAF6F1') +
      R(40, 105, 50, 40, '#E6ECFF') + R(105, 105, 50, 40, '#FFE9DA') + R(170, 105, 50, 40, '#EAF6F1') +
      T(80, 175, '逐个列出不重复', 13, DEEP));
  }
  function pAddMul() { // 加乘原理初步
    return S(R(40, 70, 40, 40, BLUE) + T(60, 95, 'A', 13, '#fff') + R(110, 70, 40, 40, ORANGE) + T(130, 95, 'B', 13, '#fff') +
      L(80, 90, 110, 90, AUX, true) + L(80, 90, 180, 90, AUX, true) + L(80, 90, 180, 130, AUX, true) + L(80, 90, 110, 130, AUX, true) +
      T(230, 90, '2×2', 16, DEEP) + T(230, 115, '＝4种', 13, INK));
  }
  function pPermute() { // 排列组合
    return S(T(50, 90, 'AB', 18, BLUE) + T(110, 90, 'BA', 18, BLUE) + T(170, 90, 'AC', 18, ORANGE) + T(230, 90, 'CA', 18, ORANGE) +
      T(80, 130, 'BC', 18, GREEN) + T(140, 130, 'CB', 18, GREEN) + T(50, 40, '3选2排列＝6', 13, DEEP));
  }
  function pVenn() { // 容斥原理
    return S(C(120, 100, 45, 'rgba(76,111,255,.25)', BLUE) + C(200, 100, 45, 'rgba(226,135,59,.25)', ORANGE) +
      T(95, 105, 'A', 16, BLUE) + T(225, 105, 'B', 16, ORANGE) + T(160, 105, '∩', 18, DEEP) +
      T(160, 165, '|A∪B| ＝ |A|＋|B|－|A∩B|', 12, DEEP));
  }
  function pHandshake() { // 握手问题
    var s = '', pts = [[80, 60], [160, 50], [240, 70], [90, 140], [230, 150]], i, j;
    for (i = 0; i < pts.length; i++) s += C(pts[i][0], pts[i][1], 14, BLUE, DEEP);
    for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) s += L(pts[i][0], pts[i][1], pts[j][0], pts[j][1], AUX, true);
    return S(s + T(160, 185, '4人两两握手＝C(4,2)＝6次', 12, DEEP));
  }

  /* =========================================================
     logic · strategy
     ========================================================= */
  function pOrder() { // 顺序统筹
    return S(R(40, 70, 70, 36, '#E6ECFF') + T(75, 93, '烧水', 13) + R(130, 70, 70, 36, '#FFE9DA') + T(165, 93, '洗杯', 13) +
      T(75, 135, '同时做', 13, GREEN) + L(40, 88, 130, 88, AUX, true) + T(160, 40, '边烧水边准备', 13, DEEP));
  }
  function pSchedule() { // 统筹优化
    return S(L(40, 60, 280, 60, DEEP, true) + L(40, 110, 200, 110, ORANGE, true) + L(240, 110, 280, 110, AUX, true) +
      T(40, 50, 'A', 12) + T(160, 50, 'B', 12) + T(160, 100, 'C', 12) + T(260, 100, 'D', 12) +
      T(160, 160, '关键路径 A→B→C→D', 13, ORANGE));
  }
  function pMaxMin() { // 最值问题
    return S(R(40, 60, 40, 90, '#E6ECFF') + R(95, 80, 40, 70, '#FFE9DA') + R(150, 50, 40, 100, '#EAF6F1') +
      R(205, 95, 40, 55, '#E6ECFF') + T(170, 165, '最高/最低在哪？', 13, DEEP) + dim(150, 40, 190, 40, 'max'));
  }
  function pPigeon() { // 鸽巢原理
    return S(R(40, 50, 40, 80, '#E6ECFF') + R(100, 50, 40, 80, '#E6ECFF') + R(160, 50, 40, 80, '#E6ECFF') +
      dots(['🕊️','🕊️'], 50, 95, 30) + dots(['🕊️','🕊️'], 110, 95, 30) + dots(['🕊️','🕊️','🕊️'], 165, 95, 28) +
      T(160, 160, '4鸽入3巢→必有巢≥2', 13, DEEP));
  }
  function pGame() { // 博弈策略
    return S(R(40, 50, 70, 40, '#E6ECFF') + T(75, 75, '取1', 13) + R(130, 50, 70, 40, '#FFE9DA') + T(165, 75, '取2', 13) +
      R(40, 110, 70, 40, '#EAF6F1') + T(75, 135, '必胜态', 13, GREEN) + T(220, 90, '后手模仿', 13, DEEP));
  }

  /* =========================================================
     shape · feat
     ========================================================= */
  function pShapeID() { // 认识基本图形
    return S(C(70, 100, 30, '#E6ECFF', DEEP) + T(70, 150, '圆', 13) +
      R(140, 70, 60, 60, '#FFE9DA', DEEP) + T(170, 150, '方', 13) +
      P(250, 100, 28, BLUE) + T(250, 150, '三角', 13));
  }
  function pSymBasic() { // 图形对称
    return S(P(160, 100, 40, BLUE) + L(160, 50, 160, 150, AUX, true) + T(160, 175, '沿虚线对折重合', 12, DEEP));
  }
  function pAxisSym() { // 轴对称图形
    return S(E(110, 95, '🦋', 40) + E(210, 95, '🦋', 40) + L(160, 40, 160, 160, ORANGE, true) +
      T(160, 180, '蝴蝶：左右对称', 12, DEEP));
  }
  function pCenterSym() { // 中心对称
    return S(C(110, 100, 22, BLUE, DEEP) + C(210, 100, 22, ORANGE, DEEP) + T(160, 100, '•', 18, DEEP) +
      L(110, 100, 210, 100, AUX, true) + T(160, 155, '绕中心转180°重合', 12, DEEP));
  }
  function pShapeProp() { // 图形性质与判定
    return S(R(50, 60, 70, 50, '#E6ECFF', DEEP) + T(85, 130, '对边平行', 12) + R(160, 60, 70, 50, '#FFE9DA', DEEP) + T(195, 130, '四边等', 12) +
      T(160, 40, '性质→判定', 13, DEEP));
  }

  /* =========================================================
     shape · trans
     ========================================================= */
  function pTransFlip() { // 平移/翻转
    return S(R(50, 90, 40, 40, BLUE, DEEP) + T(120, 100, '→', 22, ORANGE) + R(150, 90, 40, 40, BLUE, DEEP) +
      R(50, 150, 40, 40, ORANGE, DEEP) + T(120, 160, '⇄', 22, ORANGE) + R(150, 150, 40, 40, '#E6ECFF', DEEP) +
      T(160, 40, '平移：位置变 / 翻转：镜像', 11, DEEP));
  }
  function pClassifyFeat() { // 按特征分类
    return S(P(60, 90, 20, BLUE) + P(110, 90, 20, BLUE) + R(165, 70, 40, 40, ORANGE, DEEP) + R(220, 70, 40, 40, ORANGE, DEEP) +
      T(85, 140, '尖角类', 12) + T(195, 140, '方角类', 12));
  }
  function pRotate() { // 旋转
    return S(R(110, 50, 40, 60, BLUE, DEEP) + T(165, 80, '↻', 26, ORANGE) + R(130, 110, 40, 60, '#E6ECFF', DEEP) +
      T(160, 175, '绕点转一定角度', 12, DEEP));
  }
  function pCutPiece() { // 图形分割与剪拼
    return S(P(70, 100, 35, BLUE) + T(125, 105, '✂', 20, ORANGE) + R(180, 80, 50, 40, '#FFE9DA', DEEP) + R(180, 125, 50, 40, '#FFE9DA', DEEP) +
      T(160, 170, '剪开→拼成方', 12, DEEP));
  }
  function pConstruct() { // 图形操作与构造
    return S(R(60, 60, 50, 50, '#E6ECFF', DEEP) + R(120, 60, 50, 50, '#E6ECFF', DEEP) + R(90, 115, 50, 50, '#FFE9DA', DEEP) +
      T(160, 40, '拼出新形', 13, DEEP));
  }

  /* =========================================================
     shape · count
     ========================================================= */
  function pCountShape() { // 简单计数
    return S(P(80, 80, 22, BLUE) + P(130, 80, 22, BLUE) + P(105, 120, 22, ORANGE) + P(155, 120, 22, ORANGE) +
      T(160, 165, '数出三角形个数', 12, DEEP));
  }
  function pFindSame() { // 找相同
    return S(C(60, 90, 20, BLUE, DEEP) + R(115, 70, 40, 40, ORANGE, DEEP) + C(170, 90, 20, BLUE, DEEP) + R(225, 70, 40, 40, '#E6ECFF', DEEP) +
      T(85, 140, '相同', 12, BLUE) + T(190, 140, '不同', 12, ORANGE));
  }
  function pGridCount() { // 网格计数
    var s = '', r, c; for (r = 0; r < 4; r++) for (c = 0; c < 4; c++) s += R(60 + c * 35, 50 + r * 35, 30, 30, '#E6ECFF', AUX);
    return S(s + T(160, 185, '4×4 ＝ 16 格', 13, DEEP));
  }
  function pRectCount() { // 组合计数(长方形)
    var s = '', r, c; for (r = 0; r < 3; r++) for (c = 0; c < 4; c++) s += R(55 + c * 38, 55 + r * 38, 32, 32, '#E6ECFF', AUX);
    return S(s + T(160, 180, '含组合：共 C(4,2)×C(3,2)=18', 12, DEEP));
  }
  function pCountHard() { // 复杂计数技巧
    return S(C(90, 90, 25, BLUE, DEEP) + C(160, 90, 25, ORANGE, DEEP) + C(125, 140, 25, GREEN, DEEP) +
      L(90, 90, 160, 90, AUX, true) + L(160, 90, 125, 140, AUX, true) + L(125, 140, 90, 90, AUX, true) +
      T(160, 180, '分类/容斥避免漏', 12, DEEP));
  }

  /* =========================================================
     shape · measure
     ========================================================= */
  function pCompareSize() { // 直观比较大小
    return S(R(50, 70, 50, 50, '#E6ECFF', DEEP) + R(140, 50, 90, 90, '#FFE9DA', DEEP) +
      T(75, 145, '小', 13) + T(185, 160, '大', 13, ORANGE));
  }
  function pPeriAreaIn() { // 周长面积入门
    return S(R(60, 60, 80, 60, '#E6ECFF', DEEP) + L(60, 135, 140, 135, ORANGE, true) + L(60, 60, 60, 120, BLUE, true) +
      T(100, 150, '一周长度=周长', 11, ORANGE) + T(100, 40, '内部大小=面积', 11, BLUE));
  }
  function pPerimeter() { // 周长计算
    return S(R(60, 60, 100, 70, '#E6ECFF', DEEP) + dim(60, 50, 160, 50, '10') + dim(170, 60, 170, 130, '7') +
      T(110, 150, '周长＝(10+7)×2', 13, DEEP));
  }
  function pArea() { // 面积计算
    return S(R(60, 60, 100, 70, '#FFE9DA', DEEP) + dim(60, 50, 160, 50, '10') + dim(170, 60, 170, 130, '7') +
      T(110, 150, '面积＝10×7＝70', 13, DEEP));
  }
  function pUnicursal() { // 一笔画
    var s = '', pts = [[80, 100], [160, 60], [240, 100], [160, 140]], i;
    for (i = 0; i < 4; i++) s += C(pts[i][0], pts[i][1], 10, BLUE, DEEP);
    s += L(80, 100, 160, 60, AUX) + L(160, 60, 240, 100, AUX) + L(240, 100, 160, 140, AUX) + L(160, 140, 80, 100, AUX) + L(160, 60, 160, 140, ORANGE, true);
    return S(s + T(160, 175, '奇点≤2 才能一笔画', 12, DEEP));
  }
  function pPick() { // 皮克定理
    var s = '', r, c; for (r = 0; r < 4; r++) for (c = 0; c < 4; c++) s += C(70 + c * 40, 60 + r * 40, 4, DEEP);
    s += R(70, 60, 120, 120, 'rgba(76,111,255,.12)', BLUE);
    return S(s + T(160, 195, 'S ＝ 内点 + 边点/2 − 1', 12, DEEP));
  }

  /* =========================================================
     space · solid
     ========================================================= */
  function pSolidID() { // 立体识别
    return S('<rect x="50" y="70" width="50" height="50" fill="#E6ECFF" stroke="' + DEEP + '"/>' +
      '<ellipse cx="170" cy="95" rx="28" ry="22" fill="#FFE9DA" stroke="' + DEEP + '"/>' +
      '<polygon points="250,70 290,70 270,115" fill="#EAF6F1" stroke="' + DEEP + '"/>' +
      T(75, 145, '立方', 12) + T(170, 140, '球', 12) + T(270, 145, '锥', 12));
  }
  function pOrient() { // 方位认知
    return S(E(160, 70, '⬆️', 24) + E(110, 120, '⬅️', 24) + E(210, 120, '➡️', 24) + E(160, 160, '⬇️', 24) +
      T(160, 40, '上 下 左 右', 13, DEEP));
  }
  function pFacesEV() { // 面·棱·顶点
    return S('<rect x="60" y="70" width="50" height="50" fill="#E6ECFF" stroke="' + DEEP + '"/>' +
      '<rect x="60" y="130" width="50" height="30" fill="#FFE9DA" stroke="' + DEEP + '"/>' +
      T(85, 120, '6面', 12) + T(85, 180, '8顶点', 12) + T(200, 95, '立方体：', 13, DEEP) + T(200, 120, '6面/12棱/8点', 12, BLUE));
  }
  function pStable() { // 立体稳定性
    return S('<polygon points="120,140 200,140 160,80" fill="#EAF6F1" stroke="' + DEEP + '"/>' +
      '<rect x="120" y="140" width="80" height="20" fill="#E6ECFF" stroke="' + DEEP + '"/>' +
      T(160, 60, '底面大更稳', 13, DEEP));
  }
  function pNetID() { // 展开图识别
    return S(R(60, 70, 35, 35, '#E6ECFF', DEEP) + R(60, 110, 35, 35, '#E6ECFF', DEEP) + R(100, 110, 35, 35, '#FFE9DA', DEEP) +
      R(140, 110, 35, 35, '#E6ECFF', DEEP) + R(100, 150, 35, 35, '#E6ECFF', DEEP) + T(160, 90, '一拉→立方', 12, DEEP));
  }
  function pFold() { // 空间折叠
    return S(R(70, 60, 40, 40, '#E6ECFF', DEEP) + R(115, 60, 40, 40, '#FFE9DA', DEEP) + T(175, 75, '→', 20, ORANGE) +
      '<rect x="210" y="60" width="45" height="45" fill="#EAF6F1" stroke="' + DEEP + '"/>' + T(160, 130, '平面折成立体', 12, DEEP));
  }

  /* =========================================================
     space · view
     ========================================================= */
  function pMirrorOrient() { // 镜像方位
    return S(E(110, 100, '🔤', 30) + L(160, 50, 160, 150, ORANGE, true) + E(210, 100, '🔃', 30) +
      T(160, 175, '镜中左右相反', 12, DEEP));
  }
  function pViews() { // 三视图(正/侧/俯)
    return S(R(50, 50, 45, 45, '#E6ECFF', DEEP) + R(110, 50, 45, 45, '#FFE9DA', DEEP) + R(170, 50, 45, 45, '#EAF6F1', DEEP) +
      R(50, 105, 45, 45, '#E6ECFF', DEEP) + R(170, 105, 45, 45, '#EAF6F1', DEEP) +
      T(85, 170, '正', 12) + T(192, 170, '侧', 12) + T(140, 30, '俯', 12));
  }
  function pViewsHard() { // 复杂三视图还原
    return S(R(50, 60, 40, 70, '#E6ECFF', DEEP) + R(100, 60, 40, 40, '#FFE9DA', DEEP) + R(150, 60, 40, 70, '#EAF6F1', DEEP) +
      T(110, 155, '三图→想立体', 12, DEEP) + L(50, 135, 190, 135, ORANGE, true));
  }
  function pNetBuild() { // 展开图构造
    return S(R(60, 80, 30, 30, '#E6ECFF', DEEP) + R(95, 80, 30, 30, '#E6ECFF', DEEP) + R(130, 80, 30, 30, '#E6ECFF', DEEP) +
      R(95, 45, 30, 30, '#FFE9DA', DEEP) + R(95, 115, 30, 30, '#E6ECFF', DEEP) + T(180, 90, '十字→立方', 12, DEEP));
  }

  /* =========================================================
     space · reason
     ========================================================= */
  function pStackCount() { // 数小方块
    var s = '', x, y, z;
    for (z = 0; z < 2; z++) for (y = 0; y < 2; y++) for (x = 0; x < 2; x++)
      s += R(110 + x * 28 - y * 14, 120 - z * 26 - y * 14, 24, 24, z === 0 ? '#E6ECFF' : '#FFE9DA', DEEP);
    return S(s + T(160, 40, '2×2×2 ＝ 8 块', 13, DEEP));
  }
  function pSolidCount() { // 立体计数
    var s = '', x, y;
    for (y = 0; y < 3; y++) for (x = 0; x < 4; x++) s += R(60 + x * 30, 120 - y * 26, 24, 24, y === 2 ? '#FFE9DA' : '#E6ECFF', DEEP);
    return S(s + T(160, 60, '底层4+中层4+顶层4', 12, DEEP) + T(160, 40, '共 12 块', 13, BLUE));
  }
  function pPaintCut() { // 表面涂色切块
    var s = '', x, y, z, c;
    for (z = 0; z < 3; z++) for (y = 0; y < 3; y++) for (x = 0; x < 3; x++) {
      c = (x === 0 || x === 2 || y === 0 || y === 2 || z === 0 || z === 2) ? '#FFB37A' : '#E6ECFF';
      s += R(70 + x * 22, 120 - z * 20 - y * 12, 18, 18, c, DEEP);
    }
    return S(s + T(160, 40, '表面橙，内部白', 13, DEEP) + T(160, 175, '角块/棱块/面块/心块', 11, INK));
  }
  function pCutSolid() { // 切割问题
    return S('<rect x="60" y="70" width="60" height="60" fill="#E6ECFF" stroke="' + DEEP + '"/>' +
      L(90, 70, 90, 130, ORANGE, true) + L(120, 70, 120, 130, ORANGE, true) + T(160, 90, '切2刀', 13, ORANGE) +
      T(160, 120, '→ 3块', 13, DEEP));
  }

  /* =========================================================
     路由：80 个专题 → 专属 builder（键=module|boardId|topic）
     ========================================================= */
  var BUILDERS = {
    'number|calc|数数与认数': pNumCount,
    'number|calc|比大小与序数': pNumCompare,
    'number|calc|凑十法': pMakeTen,
    'number|calc|表内乘除': pMulArray,
    'number|calc|巧算凑整': pComplement,
    'number|calc|等差数列': pArithSeq,
    'number|calc|分数小数': pFraction,
    'number|calc|百分数': pPercent,
    'number|calc|简便运算': pEasyCalc,
    'number|word|看图列式入门': pPicExpr,
    'number|word|归一归总': pUnitRate,
    'number|word|行程问题(路程=速度×时间)': pJourney,
    'number|word|鸡兔同笼(假设法)': pChickenRabbit,
    'number|word|平均数': pAverage,
    'number|word|工程/经济初步': pWork,
    'number|numtheory|奇偶初步': pParityBasic,
    'number|numtheory|奇偶性判断': pParityNum,
    'number|numtheory|质数合数': pPrime,
    'number|numtheory|整除特征': pDivisible,
    'number|numtheory|余数初步': pRemainder,
    'logic|rule|找不同': pFindDiff,
    'logic|rule|简单规律': pSimplePattern,
    'logic|rule|分类排序': pClassifySort,
    'logic|rule|周期问题': pCycle,
    'logic|rule|数字推理': pNumReason,
    'logic|rule|条件推理': pCondReason,
    'logic|rule|归纳递推': pRecur,
    'logic|rule|复杂规律建模': pModelRule,
    'logic|deduce|排除法': pEliminate,
    'logic|deduce|排队推理': pQueue,
    'logic|deduce|真假话问题': pTruthLie,
    'logic|deduce|关系判断': pRelation,
    'logic|deduce|逻辑谜题': pLogicGrid,
    'logic|deduce|假设反证': pContra,
    'logic|count|简单枚举': pEnum,
    'logic|count|加乘原理初步': pAddMul,
    'logic|count|排列组合': pPermute,
    'logic|count|容斥原理': pVenn,
    'logic|count|握手问题': pHandshake,
    'logic|strategy|顺序统筹': pOrder,
    'logic|strategy|统筹优化': pSchedule,
    'logic|strategy|最值问题': pMaxMin,
    'logic|strategy|鸽巢(抽屉)原理': pPigeon,
    'logic|strategy|博弈策略': pGame,
    'shape|feat|认识基本图形': pShapeID,
    'shape|feat|图形对称': pSymBasic,
    'shape|feat|轴对称图形': pAxisSym,
    'shape|feat|中心对称': pCenterSym,
    'shape|feat|图形性质与判定': pShapeProp,
    'shape|trans|平移/翻转': pTransFlip,
    'shape|trans|按特征分类': pClassifyFeat,
    'shape|trans|旋转': pRotate,
    'shape|trans|图形分割与剪拼': pCutPiece,
    'shape|trans|图形操作与构造': pConstruct,
    'shape|count|简单计数': pCountShape,
    'shape|count|找相同': pFindSame,
    'shape|count|网格计数': pGridCount,
    'shape|count|组合计数(长方形)': pRectCount,
    'shape|count|复杂计数技巧': pCountHard,
    'shape|measure|直观比较大小': pCompareSize,
    'shape|measure|周长面积入门': pPeriAreaIn,
    'shape|measure|周长计算': pPerimeter,
    'shape|measure|面积计算': pArea,
    'shape|measure|一笔画': pUnicursal,
    'shape|measure|皮克定理': pPick,
    'space|solid|立体识别': pSolidID,
    'space|solid|方位认知': pOrient,
    'space|solid|面·棱·顶点': pFacesEV,
    'space|solid|立体稳定性': pStable,
    'space|solid|展开图识别': pNetID,
    'space|solid|空间折叠': pFold,
    'space|view|镜像方位': pMirrorOrient,
    'space|view|三视图(正/侧/俯)': pViews,
    'space|view|复杂三视图还原': pViewsHard,
    'space|view|展开图构造': pNetBuild,
    'space|reason|数小方块': pStackCount,
    'space|reason|立体计数': pSolidCount,
    'space|reason|表面涂色切块': pPaintCut,
    'space|reason|切割问题': pCutSolid
  };

  function render(box, m, bId, l, t) {
    var key = m + '|' + bId + '|' + t;
    var fn = BUILDERS[key];
    if (!fn) {
      box.innerHTML = S(T(160, 100, '（该专题暂无插画）', 13, INK));
      return { ok: false };
    }
    box.innerHTML = fn();
    return { ok: true };
  }
  function typeOf(m, bId, t) {
    var fn = BUILDERS[m + '|' + bId + '|' + t];
    return fn ? fn.name || 'illus' : '?';
  }
  function list() { return Object.keys(BUILDERS); }

  window.ConceptIllus = { render: render, typeOf: typeOf, list: list, builders: BUILDERS };
})();
