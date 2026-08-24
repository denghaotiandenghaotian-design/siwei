/* ============================================================
   思维星球 · 座位系统 (Seat System) v1.0
   ------------------------------------------------------------
   50 个座位，每人一个专属链接：seat.html?s=01 … s=50
   · 首次打开链接：输入本座位口令完成设备绑定 → 进入系统；
     之后本机免输口令。
   · 换设备打开：需再次输入口令 —— 口令是真正的钥匙。
   · 数据隔离：业务 localStorage key 自动加 sw_<座位号>_ 前缀，
     各座位数据完全独立，互不串档。
   · 防共用为软性防护（清缓存/换浏览器/隐身模式可绕过）；
     真正 100% 一人一号需后端账号体系，静态方案无法做到。
   · 口令重置：修改下方 SEATS 表后重新部署即可（链接不变）。
   用法：所有页面在业务 JS（framework.js / play.js）之前引入本文件。
   ============================================================ */
(function (global) {
  'use strict';

  /* ---- 座位口令表（如需换口令，改这里后重新部署，链接不变）---- */
  var SEATS = {
    "01": "RMYB",
    "02": "PDR3",
    "03": "5SAV",
    "04": "ZFQR",
    "05": "GBVM",
    "06": "R5RR",
    "07": "FUJQ",
    "08": "HZTC",
    "09": "PUC4",
    "10": "RGH9",
    "11": "ZM6T",
    "12": "N53S",
    "13": "6Y58",
    "14": "PPQX",
    "15": "XJS4",
    "16": "59GP",
    "17": "U5F2",
    "18": "EWA8",
    "19": "4FAJ",
    "20": "CW7C",
    "21": "4K2S",
    "22": "NJXD",
    "23": "X5JC",
    "24": "U7KD",
    "25": "EKG6",
    "26": "5R9R",
    "27": "SEZT",
    "28": "84QH",
    "29": "39TB",
    "30": "HWVW",
    "31": "4YXH",
    "32": "P2E2",
    "33": "ZWHH",
    "34": "GQHF",
    "35": "ETAA",
    "36": "KBSZ",
    "37": "DAC5",
    "38": "6DG9",
    "39": "TPPA",
    "40": "B676",
    "41": "78UC",
    "42": "8FDM",
    "43": "353X",
    "44": "EYBS",
    "45": "PPX6",
    "46": "NY3P",
    "47": "78BH",
    "48": "S3FX",
    "49": "SRB9",
    "50": "CDAZ"
  };

  var LS = global.localStorage;

  /* ---- 原生方法引用（座位元数据与代理均基于它，避免二次加前缀）---- */
  var orig = {
    getItem: LS.getItem.bind(LS),
    setItem: LS.setItem.bind(LS),
    removeItem: LS.removeItem.bind(LS)
  };
  var rawGet = function (k) { try { return orig.getItem(k); } catch (e) { return null; } };
  var rawSet = function (k, v) { try { orig.setItem(k, v); } catch (e) {} };
  var rawRemove = function (k) { try { orig.removeItem(k); } catch (e) {} };

  var SEAT_KEY = 'sw_seat_active';          // 本机当前激活的座位号
  var seat = rawGet(SEAT_KEY) || '';
  var ACTIVE = !!(seat && SEATS[seat]);     // 座位号合法且本机已激活

  var proxied = false;

  function enableProxy() {
    if (proxied || !ACTIVE) return;
    proxied = true;
    LS.getItem = function (k) { return orig.getItem('sw_' + seat + '_' + k); };
    LS.setItem = function (k, v) { return orig.setItem('sw_' + seat + '_' + k, v); };
    LS.removeItem = function (k) { return orig.removeItem('sw_' + seat + '_' + k); };
  }
  function disableProxy() {
    if (!proxied) return;
    proxied = false;
    LS.getItem = orig.getItem;
    LS.setItem = orig.setItem;
    LS.removeItem = orig.removeItem;
  }

  var SEAT = {
    SEATS: SEATS,
    version: 'v1.0',
    get seat() { return seat; },
    get active() { return ACTIVE; },
    rawGet: rawGet, rawSet: rawSet, rawRemove: rawRemove,
    ns: function (k) { return 'sw_' + seat + '_' + k; },
    /* 本机是否绑定过该座位 */
    isBound: function (s) { return rawGet('sw_bind_' + s) === '1'; },
    /* 校验口令（大小写不敏感，自动去空格） */
    check: function (s, pass) {
      if (!SEATS[s]) return false;
      return SEATS[s].toUpperCase() === String(pass || '').trim().toUpperCase();
    },
    /* 绑定设备：记住座位号 + 标记已绑 + 启用隔离代理 */
    bind: function (s) {
      if (!SEATS[s]) return false;
      seat = s; ACTIVE = true;
      rawSet(SEAT_KEY, s);
      rawSet('sw_bind_' + s, '1');
      enableProxy();
      return true;
    },
    /* 解绑当前座位（退出） */
    unbind: function () {
      rawRemove(SEAT_KEY);
      ACTIVE = false; seat = '';
      disableProxy();
    }
  };

  if (ACTIVE) enableProxy();

  /* ---- 业务页守卫：未激活的座位一律踢回门禁 ----
     门禁页(seat.html)与分发表(seats-print.html)例外 */
  var path = (global.location && global.location.pathname) || '';
  var isGate = /(seat|seats-print)\.html/i.test(path);
  if (!ACTIVE && !isGate) {
    try { global.location.replace('seat.html'); } catch (e) {}
  }

  global.SEAT = SEAT;
  global.SEAT_SEATS = SEATS; // 供打印分发表读取
})(window);
