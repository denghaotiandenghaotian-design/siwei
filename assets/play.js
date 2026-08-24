/* ============================================================
   思维星球 · 游戏化引擎 (Play Layer)
   ------------------------------------------------------------
   统一封装「趣味性」能力，所有页面共享同一份进度（localStorage）：
     · 进度：stars 总星数 / learned 已学会知识点 / streak 连续天数
            / day 每日星星 / solved 闯关答对 / exercises 完成关数
            / badges 已解锁成就 / sound 音效开关
     · 趣味组件：confetti 彩带 / toast 飘字 / praise 吉祥物夸夸
            / sound 音效 / twinkle 星空背景 / initMascot 可点吉祥物
     · 成就系统：BADGES 定义 + checkBadges 自动解锁
     · 助学组件：findQuiz 为某知识点找一道匹配的小题
   所有外部全局（QUESTIONS / MODULE_SPINE）均做存在性判断，
   缺失时对应功能优雅降级，不会抛错。
   用法：在页面 <script> 之前引入本文件，然后调用 TP.* 即可。
   ============================================================ */
(function (global) {
  'use strict';

  const KEY = 'thinkplanet_progress_v1';
  const GOAL = 5; // 每日星星目标

  const PR = {
    stars: 0, learned: {}, streak: { count: 0, last: '' },
    day: {}, solved: 0, exercises: 0, badges: {}, sound: true, lastVisit: ''
  };

  let P = load();

  function load() {
    try {
      const r = localStorage.getItem(KEY);
      if (r) {
        const o = JSON.parse(r);
        return Object.assign({}, JSON.parse(JSON.stringify(PR)), o, {
          learned: o.learned || {},
          streak: o.streak || { count: 0, last: '' },
          day: o.day || {},
          badges: o.badges || {}
        });
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(PR));
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} }

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  /* ---------- 连续打卡 ---------- */
  function bumpStreak() {
    const t = today();
    if (P.streak.last === t) return; // 今天已记过
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yk = y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate();
    P.streak.count = (P.streak.last === yk) ? P.streak.count + 1 : 1;
    P.streak.last = t;
    save();
  }

  /* ---------- 知识点钥匙 ---------- */
  function key(m, b, l, t) { return [m, b, l, t].join('::'); }
  function isLearned(m, b, l, t) { return !!P.learned[key(m, b, l, t)]; }

  /* ---------- 星星 ---------- */
  function todayStars() { const t = today(); return P.day[t] || 0; }
  function awardStars(n, reason) {
    P.stars += n;
    const t = today();
    P.day[t] = (P.day[t] || 0) + n;
    save();
  }

  /* ---------- 学会一个知识点 ---------- */
  function learnTopic(m, b, l, t) {
    bumpStreak();
    let first = false, gained = 0;
    if (!isLearned(m, b, l, t)) {
      P.learned[key(m, b, l, t)] = { m: m, b: b, l: l, t: t, ts: Date.now() };
      first = true; gained = 1; awardStars(1, 'learn');
    }
    const nb = checkBadges();
    save();
    return { first: first, gained: gained, badges: nb };
  }

  function recordSolved(n) { P.solved += (n || 1); bumpStreak(); save(); }
  function recordExercise() { P.exercises += 1; bumpStreak(); save(); }

  /* ---------- 成就系统 ---------- */
  function countLearned(p) { return Object.keys(p.learned || {}).length; }
  function learnedModules(p) {
    const s = {};
    Object.values(p.learned || {}).forEach(function (x) { if (x && x.m) s[x.m] = 1; });
    return s;
  }
  const BADGES = [
    { id: 'first_star', emoji: '⭐', name: '初遇星光', desc: '收集第一颗星星', check: function (p) { return p.stars >= 1; } },
    { id: 'learn_1', emoji: '🌟', name: '点亮知识星', desc: '学会第一个知识点', check: function (p) { return countLearned(p) >= 1; } },
    { id: 'learn_5', emoji: '🪐', name: '小星球主', desc: '学会 5 个知识点', check: function (p) { return countLearned(p) >= 5; } },
    { id: 'learn_15', emoji: '🚀', name: '思维探险家', desc: '学会 15 个知识点', check: function (p) { return countLearned(p) >= 15; } },
    { id: 'learn_40', emoji: '👑', name: '星球大师', desc: '学会 40 个知识点', check: function (p) { return countLearned(p) >= 40; } },
    { id: 'streak_3', emoji: '🔥', name: '小坚持', desc: '连续学习 3 天', check: function (p) { return p.streak.count >= 3; } },
    { id: 'streak_7', emoji: '⚡', name: '七天打卡王', desc: '连续学习 7 天', check: function (p) { return p.streak.count >= 7; } },
    { id: 'quiz_10', emoji: '🎯', name: '闯关新手', desc: '闯关答对 10 题', check: function (p) { return p.solved >= 10; } },
    { id: 'quiz_30', emoji: '🏅', name: '闯关达人', desc: '闯关答对 30 题', check: function (p) { return p.solved >= 30; } },
    { id: 'all_mod', emoji: '🌈', name: '四维全能', desc: '四大思维星球都点亮', check: function (p) {
        const s = learnedModules(p);
        return s.number && s.logic && s.shape && s.space;
      } }
  ];
  function checkBadges() {
    const nb = [];
    BADGES.forEach(function (b) {
      if (!P.badges[b.id] && b.check(P)) { P.badges[b.id] = Date.now(); nb.push(b); }
    });
    if (nb.length) save();
    return nb;
  }
  function badgeList() {
    return BADGES.map(function (b) { return { def: b, unlocked: !!P.badges[b.id] }; });
  }
  // 计算某成就当前进度（用于进度条），返回 {cur, need, pct}
  function badgeProgress(b) {
    let cur = 0, need = 0;
    switch (b.id) {
      case 'first_star': cur = P.stars; need = 1; break;
      case 'learn_1': cur = countLearned(P); need = 1; break;
      case 'learn_5': cur = countLearned(P); need = 5; break;
      case 'learn_15': cur = countLearned(P); need = 15; break;
      case 'learn_40': cur = countLearned(P); need = 40; break;
      case 'streak_3': cur = P.streak.count; need = 3; break;
      case 'streak_7': cur = P.streak.count; need = 7; break;
      case 'quiz_10': cur = P.solved; need = 10; break;
      case 'quiz_30': cur = P.solved; need = 30; break;
      case 'all_mod': cur = Object.keys(learnedModules(P)).length; need = 4; break;
    }
    return { cur: cur, need: need, pct: Math.min(100, Math.round(cur / need * 100)) };
  }

  /* ---------- 视觉：彩带 / 飘字 / 夸夸 ---------- */
  function confetti(n) {
    n = n || 26;
    const colors = ['#4C6FFF', '#FF8A4C', '#2FD0A6', '#9B6DFF', '#FF6BAE', '#FFD86B'];
    for (let c = 0; c < n; c++) {
      const p = document.createElement('div');
      p.className = 'confetti';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[c % colors.length];
      p.style.animationDelay = (Math.random() * 0.35) + 's';
      p.style.width = (7 + Math.random() * 6) + 'px';
      p.style.height = (10 + Math.random() * 8) + 'px';
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 1800); })(p);
    }
  }
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 1900);
  }
  const PRAISES = [
    '你真棒！继续保持～', '哇，又学会一个！', '小思为你点赞 👍',
    '思维力 +1！', '你越来越厉害啦 💪', '这道题难不倒你！',
    '星星被你点亮啦 ✨', '爱思考的小孩最闪亮！', '继续探险吧 🚀'
  ];
  function praise(emoji, msg) {
    emoji = emoji || '🤖';
    msg = msg || PRAISES[Math.floor(Math.random() * PRAISES.length)];
    const box = document.createElement('div');
    box.className = 'tp-praise';
    box.innerHTML = '<svg class="tp-praise-mascot" viewBox="0 0 100 110">' +
      '<line x1="50" y1="20" x2="50" y2="8" stroke="#4C6FFF" stroke-width="3"/>' +
      '<circle cx="50" cy="6" r="4" fill="#FF8A4C"/>' +
      '<circle cx="50" cy="48" r="30" fill="#fff" stroke="#4C6FFF" stroke-width="4"/>' +
      '<circle cx="50" cy="48" r="21" fill="#C9D6FF"/>' +
      '<circle cx="44" cy="44" r="5" fill="#fff"/><circle cx="56" cy="44" r="5" fill="#fff"/>' +
      '<circle cx="44" cy="44" r="2.4" fill="#232745"/><circle cx="56" cy="44" r="2.4" fill="#232745"/>' +
      '<path d="M42 58 Q50 64 58 58" stroke="#232745" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg><div class="tp-praise-bubble"><span class="tp-praise-emoji">' + emoji + '</span>' + msg + '</div>';
    document.body.appendChild(box);
    setTimeout(function () { box.classList.add('hide'); }, 2600);
    setTimeout(function () { box.remove(); }, 3200);
  }

  /* ---------- 音效（WebAudio 合成，无外部文件） ---------- */
  let actx = null;
  function sound(type) {
    if (!P.sound) return;
    try {
      const AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return;
      if (!actx) actx = new AC();
      if (actx.state === 'suspended') actx.resume();
      const o = actx.createOscillator(), g = actx.createGain();
      o.connect(g); g.connect(actx.destination);
      const map = {
        star: [880, 0.14, 'sine'], good: [660, 0.16, 'triangle'],
        bad: [200, 0.22, 'sawtooth'], badge: [990, 0.28, 'sine'],
        click: [520, 0.06, 'square'], pop: [740, 0.10, 'sine']
      };
      const m = map[type] || map.pop;
      o.type = m[2]; o.frequency.value = m[0];
      const t0 = actx.currentTime;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + m[1]);
      o.start(t0); o.stop(t0 + m[1] + 0.03);
    } catch (e) {}
  }
  function toggleSound() { P.sound = !P.sound; save(); return P.sound; }

  /* ---------- 星空背景 ---------- */
  let twinkled = false;
  function twinkle() {
    if (twinkled) return; twinkled = true;
    const wrap = document.createElement('div');
    wrap.className = 'tp-twinkle';
    const glyphs = ['✦', '✧', '·', '⋆', '˚'];
    const N = 34;
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = (Math.random() * 100) + 'vw';
      s.style.top = (Math.random() * 100) + 'vh';
      s.style.fontSize = (8 + Math.random() * 10) + 'px';
      s.style.animationDelay = (Math.random() * 3) + 's';
      s.style.animationDuration = (2.4 + Math.random() * 2.6) + 's';
      wrap.appendChild(s);
    }
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  /* ---------- 可点吉祥物：随机鼓励 ---------- */
  function initMascot() {
    const av = document.querySelector('.app-header .avatar');
    const masc = document.querySelector('.mascot');
    const target = av || masc;
    if (!target) return;
    target.style.cursor = 'pointer';
    target.title = '点我一下，听小思说句话～';
    target.addEventListener('click', function () {
      sound('pop');
      praise('💬', PRAISES[Math.floor(Math.random() * PRAISES.length)]);
    });
  }

  /* ---------- 为知识点找一道匹配小题 ---------- */
  function findQuiz(module, level, topic) {
    if (typeof QUESTIONS === 'undefined' || !QUESTIONS || !QUESTIONS.length) return null;
    const pool = QUESTIONS.filter(function (q) { return q.module === module; });
    function tagMatch(q) {
      return (q.tags || []).some(function (tg) {
        return tg === topic || topic.indexOf(tg) >= 0 || tg.indexOf(topic) >= 0;
      });
    }
    let cand = pool.filter(function (q) { return q.level === level && tagMatch(q); });
    if (!cand.length) cand = pool.filter(tagMatch);
    if (!cand.length) return null;
    const q = cand[Math.floor(Math.random() * cand.length)];
    return {
      question: q.question, visual: q.visual, options: q.options,
      answer: q.answer, explanation: q.explanation, tags: q.tags
    };
  }

  function totalTopics() {
    if (typeof MODULE_SPINE !== 'undefined' && MODULE_SPINE) {
      let n = 0;
      Object.keys(MODULE_SPINE).forEach(function (k) {
        (MODULE_SPINE[k].boards || []).forEach(function (b) {
          ['L1', 'L2', 'L3'].forEach(function (l) { n += (b.tiers[l] || []).length; });
        });
      });
      return n;
    }
    return 79;
  }

  function get() { return P; }
  function reset() { P = JSON.parse(JSON.stringify(PR)); save(); }

  /* 浏览器首次访问时初始化“今日已访问”标记，触发一次 streak 记录 */
  (function initVisit() {
    const t = today();
    if (P.lastVisit !== t) { bumpStreak(); P.lastVisit = t; save(); }
  })();

  global.TP = {
    GOAL: GOAL,
    get: get, reset: reset,
    key: key, isLearned: isLearned,
    todayStars: todayStars, awardStars: awardStars,
    learnTopic: learnTopic, recordSolved: recordSolved, recordExercise: recordExercise,
    bumpStreak: bumpStreak,
    badgeList: badgeList, badgeProgress: badgeProgress, checkBadges: checkBadges,
    confetti: confetti, toast: toast, praise: praise,
    sound: sound, toggleSound: toggleSound,
    twinkle: twinkle, initMascot: initMascot,
    findQuiz: findQuiz, totalTopics: totalTopics,
    countLearned: function () { return countLearned(P); }
  };
})(window);
