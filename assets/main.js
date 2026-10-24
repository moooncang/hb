// 검과 마나의 경계 — 메인 흐름 동작: 메뉴, 장면 선택, 인물 확장, 전선 확대, 세력·체계 연결, 시작 모드
(function () {
  'use strict';
  var d = document, HB = window.HB, C = HB.chars;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  function byCode(c) { return C.filter(function (x) { return x.code === c; })[0]; }
  function faction(id) { return HB.factions.filter(function (f) { return f.id === id; })[0]; }
  function front(id) { return HB.fronts.filter(function (f) { return f.id === id; })[0]; }
  function large(c, n) { return 'img/l/' + c + '_' + n + '.jpg'; }
  function thumb(c, n) { return 'img/t/' + c + '_' + n + '.jpg'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function prefetch(src) { var i = new Image(); i.src = src; }
  function aliasHtml(c) { return c.alias ? esc(c.alias) + (c.aliasHanja ? '<span class="hj">' + c.aliasHanja + '</span>' : '') : HB.sides[c.side]; }
  function emb(id) { return '<i class="emb" style="background-image:url(assets/skin/fa-' + id + '.png)" aria-hidden="true"></i>'; }
  function chip(code) {
    var c = byCode(code);
    return '<button type="button" class="chipc' + (c.noImage ? ' none' : '') + '" data-open="' + c.code + '">' +
      (c.noImage ? '<i></i>' : '<img src="' + thumb(c.code, 1) + '" alt="" loading="lazy" style="object-position:' + c.focal + '">') + '<span>' + esc(c.name) + '</span></button>';
  }
  function chips(codes) { return '<div class="chips">' + codes.map(chip).join('') + '</div>'; }
  function setHash(h) { history.replaceState(history.state, '', h ? '#' + h : location.pathname); }
  var EMB = { daehwi: 'daehwi', murim: 'murim', mugan: 'mugan', sagal: 'sagal', gardeon: 'gardeon', selbar: 'selbar', tower: 'tower', church: 'church', isbel: 'isbel', bardun: 'bardun', crow: 'gardeon', inn: 'inn' };
  function fname(id) { var f = faction(id); return '<span>' + emb(EMB[id] || id) + esc(f.name) + '</span>'; }

  // ===== 메뉴 =====
  var menu = $('#menu'), menuBtn = $('.menu-btn'), menuFrom = null;
  function openMenu(on) {
    menu.hidden = !on; menuBtn.setAttribute('aria-expanded', on); d.body.classList.toggle('lock', on);
    if (on) { menuFrom = d.activeElement; $('.menu-x', menu).focus(); } else if (menuFrom) menuFrom.focus();
  }
  menuBtn.addEventListener('click', function () { openMenu(menu.hidden); });
  $('.menu-x', menu).addEventListener('click', function () { openMenu(false); });
  $$('.mi', menu).forEach(function (a) { a.addEventListener('click', function () { openMenu(false); }); });

  // ===== 1. 대표 장면 =====
  var hero = $('.hero');
  $$('.hero-info', hero).forEach(function (box) {
    var side = box.dataset.side, fs = HB.factions.filter(function (f) { return f.side === side; });
    var lead = [].concat.apply([], fs.map(function (f) { return f.chars; })).filter(function (c) { return !byCode(c).noImage; }).slice(0, 4);
    box.innerHTML = '<p class="lbl">' + HB.sides[side] + '</p><div class="fl">' + fs.map(function (f) { return fname(f.id); }).join('') + '</div>' + chips(lead);
  });
  function pick(side) {
    hero.dataset.pick = hero.dataset.pick === side ? '' : side;
    $$('.hero-pick [data-pick]', hero).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.pick === hero.dataset.pick); });
  }
  $$('.hero-pick [data-pick]', hero).forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.pick); }); });

  // ===== 2. 인물 군상 =====
  var cast = $('.cast');
  $$('.cast-col', cast).forEach(function (col) {
    var side = col.dataset.side;
    col.innerHTML = C.filter(function (c) { return c.side === side; }).map(function (c) {
      var img = c.noImage ? '<img src="assets/skin/neutral-placeholder.jpg" alt="쌍등객잔 문 앞. 레나타의 그림은 아직 없다" loading="lazy" decoding="async">'
        : '<img src="' + large(c.code, 1) + '" alt="" loading="lazy" decoding="async" width="1856" height="1280">';
      var plate = '<span class="nameplate ' + (side === 'neutral' ? 'gray' : side) + '"><span class="alias">' + aliasHtml(c) + '</span><span class="name">' + esc(c.name) + '</span></span>';
      var cap = side === 'west' ? '<span class="mark"></span>' + plate : plate + '<span class="mark"></span>';
      return '<button type="button" class="fig" data-open="' + c.code + '" data-fig="' + c.code + '">' +
        '<span class="pic"><span class="framed ' + (side === 'neutral' ? '' : side) + '">' + img + (side === 'neutral' ? '' : '<i class="frame"></i>') + '</span></span>' +
        '<span class="cap">' + cap + '</span><span class="sub">' + esc(c.org) + (c.rank ? ' · ' + esc(c.rank) : '') + '</span></button>';
    }).join('');
  });
  $$('.filters button', cast).forEach(function (b) {
    b.addEventListener('click', function () {
      cast.dataset.f = b.dataset.f;
      $$('.filters button', cast).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    });
  });

  // ===== 인물 확장 감상 (FLIP: 선택한 이미지가 제자리에서 중앙으로 펼쳐진다) =====
  var V = $('.viewer'), vImg = $('.v-img', V), layers = $$('img', vImg), lb = $('.lightbox');
  var cur = { code: null, n: 1, from: null, pushed: false }, layer = 0, token = 0;
  function catOf(n) { return HB.scenes.findIndex(function (s) { return s[1].indexOf(n) >= 0; }); }
  function ar(n) { var dm = HB.dim(n); return dm[0] / dm[1]; }
  function showCut(n, instant) {
    n = Math.max(1, Math.min(25, n)); cur.n = n;
    var c = byCode(cur.code), k = catOf(n), s = HB.scenes[k], my = ++token;
    vImg.style.setProperty('--ar', ar(n));
    $$('.sc-cats button', V).forEach(function (b) { b.setAttribute('aria-selected', +b.dataset.k === k); });
    $('.sc-cuts', V).innerHTML = s[1].map(function (m) { return '<button type="button" data-n="' + m + '" aria-selected="' + (m === n) + '" aria-label="' + s[0] + ' ' + (s[1].indexOf(m) + 1) + '"><img src="' + thumb(c.code, m) + '" alt=""></button>'; }).join('');
    $('.sc-cnt', V).textContent = n + ' / 25';
    setHash(c.code + (n > 1 ? '/' + n : ''));
    var im = new Image();
    im.onload = function () {
      if (my !== token) return;
      var next = layers[1 - layer]; next.src = im.src;
      if (instant) layers.forEach(function (l) { l.style.transition = 'none'; });
      next.classList.add('on'); layers[layer].classList.remove('on'); layer = 1 - layer;
      if (instant) requestAnimationFrame(function () { layers.forEach(function (l) { l.style.transition = ''; }); });
    };
    im.src = large(c.code, n);
    [n - 1, n + 1].forEach(function (m) { if (m >= 1 && m <= 25) prefetch(large(c.code, m)); });
  }
  function render(code) {
    var c = byCode(code); cur.code = code;
    var i = C.indexOf(c), p = C[(i + C.length - 1) % C.length], nx = C[(i + 1) % C.length], sk = c.side === 'neutral' ? 'east' : c.side;
    V.dataset.side = sk;
    $('.v-pos', V).textContent = HB.sides[c.side] + ' · ' + (i + 1) + ' / ' + C.length;
    $('.v-prev', V).textContent = p.name; $('.v-prev', V).dataset.code = p.code;
    $('.v-next', V).textContent = nx.name; $('.v-next', V).dataset.code = nx.code;
    var np = $('.v-id .nameplate', V); np.className = 'nameplate ' + (c.side === 'neutral' ? 'gray' : c.side);
    $('.alias', np).innerHTML = aliasHtml(c); $('.name', np).textContent = c.name;
    $('.v-id .meta', V).innerHTML = '<span>' + HB.sides[c.side] + '</span><span>' + esc(c.org) + '</span>' + (c.rank ? '<span>' + esc(c.rank) + '</span>' : '');
    var a1 = c.side === 'east' ? '동방 별호' : '서방 이명', a2 = c.side === 'east' ? '서방 이명' : '동방 별호';
    var kv = [['진영', HB.sides[c.side]], ['소속', esc(c.org)], ['직책', esc(c.role)], ['경지', esc(c.rank)], ['나이', c.sex + ' · ' + c.age], [a1, c.alias ? aliasHtml(c) : ''], [a2, esc(c.alias2)], ['시그니처', esc(c.sig)], ['말', esc(c.lang)]];
    $$('.sheet', V).forEach(function (el) { el.classList.remove('east', 'west'); el.classList.add(sk); });
    $('.kv', V).innerHTML = kv.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('');
    var groups = [['등장 · 평소', 0, 2], ['감정', 2, 9], ['전투', 9, 13]];
    $('.sc-cats', V).innerHTML = groups.map(function (g) {
      return '<span class="g">' + g[0] + '</span>' + HB.scenes.slice(g[1], g[2]).map(function (s, j) { return '<button type="button" class="chip ' + sk + '" role="tab" data-k="' + (g[1] + j) + '" aria-selected="false">' + s[0] + '</button>'; }).join('');
    }).join('');
    var has = !c.noImage;
    $('.v-stage', V).hidden = !has; $('.v-scenes', V).hidden = !has;
    [p, nx].forEach(function (x) { if (!x.noImage) prefetch(large(x.code, 1)); });
  }
  function figOf(code) { var f = $('[data-fig="' + code + '"]', cast); return f && f.offsetParent ? f : null; }
  function flip(fromRect, toEl, reverse, done) {
    if (reduce || !fromRect) { if (done) done(); return; }
    var to = toEl.getBoundingClientRect(), dx = fromRect.left - to.left, dy = fromRect.top - to.top, sx = fromRect.width / to.width, sy = fromRect.height / to.height;
    var t = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    toEl.style.transition = 'none'; toEl.style.transform = reverse ? 'none' : t;
    toEl.getBoundingClientRect();
    toEl.style.transition = 'transform ' + (reverse ? 420 : 520) + 'ms cubic-bezier(.2,.7,.15,1)';
    toEl.style.transform = reverse ? t : 'none';
    var end = function () { toEl.removeEventListener('transitionend', end); toEl.style.transition = ''; if (!reverse) toEl.style.transform = ''; if (done) done(); };
    toEl.addEventListener('transitionend', end);
    setTimeout(end, reverse ? 480 : 580);
  }
  function open(code, n, fromEl, push) {
    var c = byCode(code); if (!c) return;
    var wasOpen = !V.hidden;
    cur.from = fromEl || figOf(code);
    render(code);
    if (push && !cur.pushed) { history.pushState({ hb: 'char' }, '', '#' + code + (n > 1 ? '/' + n : '')); cur.pushed = true; }
    if (!wasOpen) {
      V.hidden = false; d.body.classList.add('lock'); V.scrollTop = 0;
      var pic = cur.from && $('.pic img', cur.from), rect = pic && !c.noImage ? pic.getBoundingClientRect() : null;
      if (rect && (rect.bottom < 0 || rect.top > innerHeight)) rect = null;
      vImg.style.setProperty('--ar', ar(n));
      if (!c.noImage) showCut(n, true);
      requestAnimationFrame(function () { V.classList.add('in'); flip(rect, vImg, false); });
      $('.v-close', V).focus();
    } else { if (!c.noImage) showCut(n, false); V.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
  }
  function close() {
    if (V.hidden) return;
    var fig = figOf(cur.code), pic = fig && $('.pic img', fig), rect = pic && !byCode(cur.code).noImage && V.scrollTop < 40 ? pic.getBoundingClientRect() : null;
    var finish = function () { V.hidden = true; V.classList.remove('in'); d.body.classList.remove('lock'); layers.forEach(function (l) { l.classList.remove('on'); l.removeAttribute('src'); }); if (fig) fig.focus({ preventScroll: true }); };
    V.classList.remove('in');
    flip(rect, vImg, true, finish);
    cur.pushed = false; setHash('');
  }
  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]'); if (t) { open(t.dataset.open, 1, t.closest('.fig') || null, true); return; }
    if (e.target.closest('.v-close')) { if (cur.pushed) history.back(); else close(); return; }
    var nv = e.target.closest('.v-prev, .v-next'); if (nv) { open(nv.dataset.code, 1, null, false); return; }
    var k = e.target.closest('.sc-cats button'); if (k) { showCut(HB.scenes[+k.dataset.k][1][0]); return; }
    var ct = e.target.closest('.sc-cuts button'); if (ct) { showCut(+ct.dataset.n); return; }
    if (e.target.closest('.v-arrow.prev')) { showCut(cur.n - 1); return; }
    if (e.target.closest('.v-arrow.next')) { showCut(cur.n + 1); return; }
    if (e.target.closest('.v-full')) { openLb(large(cur.code, cur.n), e.target); return; }
    if (e.target.closest('.v-card')) { openLb('img/card/' + cur.code + '.jpg', e.target); return; }
    if (e.target.closest('.lightbox .x') || e.target === lb) { closeLb(); }
  });
  var lbFrom = null;
  function openLb(src, from) { lbFrom = from; $('img', lb).src = src; lb.hidden = false; $('.x', lb).focus(); }
  function closeLb() { lb.hidden = true; $('img', lb).removeAttribute('src'); if (lbFrom) lbFrom.focus(); }
  d.addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(d.activeElement.tagName)) return;
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); else if (!menu.hidden) openMenu(false); else if (!V.hidden) { if (cur.pushed) history.back(); else close(); } return; }
    if (V.hidden || !lb.hidden) return;
    if (e.key === 'ArrowLeft') showCut(cur.n - 1); else if (e.key === 'ArrowRight') showCut(cur.n + 1);
  });

  // ===== 3. 전선: 표식 선택 → 지도 확대 + 대치 세력·인물 =====
  var FR = $('.fronts'), wrap = $('.map-wrap', FR), world = $('.map-world', FR);
  var pos = { north: [53, 12], fault: [56, 28], center: [52, 44], south: [51, 79] };   // 지도 그림 기준 %
  $('.pins', FR).innerHTML = HB.fronts.map(function (f) { var p = pos[f.id]; return '<button type="button" class="pin" data-front="' + f.id + '" aria-pressed="false" style="left:' + p[0] + '%;top:' + p[1] + '%" aria-label="' + f.name + ' ' + esc(f.place) + '"><span>' + f.name + '</span></button>'; }).join('');
  $('.fr-list', FR).innerHTML = HB.fronts.map(function (f) { return '<button type="button" class="btn gray" data-front="' + f.id + '" aria-pressed="false"><b>' + f.name + '</b><small>' + esc(f.place) + '</small></button>'; }).join('');
  function names(ids) { return ids.length ? ids.map(fname).join('') : '<span>—</span>'; }
  function pickFront(id, keepHash) {
    id = FR.dataset.front === id ? '' : id; FR.dataset.front = id;
    $$('[data-front]', FR).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.front === id); });
    var f = front(id);
    if (f) { var p = pos[id]; world.style.transform = 'translate(' + (2 * (50 - p[0])) + '%,' + (2 * (50 - p[1])) + '%) scale(2)'; wrap.classList.add('zoom'); }
    else { world.style.transform = ''; wrap.classList.remove('zoom'); }
    $('.fr-info', FR).innerHTML = f ? '<div><p class="place">' + esc(f.place) + '</p><h4>' + f.name + '</h4></div><p class="note">' + esc(f.note) + '</p>' +
      '<div class="vs"><div class="w">' + names(f.west) + '</div><i>대치</i><div class="e">' + names(f.east) + '</div></div>' +
      (f.chars.length ? chips(f.chars) : '<p class="empty">설정에 지정된 인물 없음</p>') : '<p class="empty">전선을 고르면 대치 세력과 관련 인물이 나타납니다.</p>';
    if (!keepHash) setHash(id ? 'f-' + id : '');
  }
  FR.addEventListener('click', function (e) { var b = e.target.closest('[data-front]'); if (b && b !== FR) pickFront(b.dataset.front); });

  // ===== 4. 세력 =====
  var FA = $('.fa');
  $$('.fa-col', FA).forEach(function (col) {
    $('.fa-list', col).innerHTML = HB.factions.filter(function (f) { return f.side === col.dataset.side; }).map(function (f) {
      return '<button type="button" data-fa="' + f.id + '" aria-pressed="false">' + emb(EMB[f.id]) + '<span>' + esc(f.name) + (f.hanja ? '<small>' + f.hanja + '</small>' : '') + '</span></button>';
    }).join('');
  });
  FA.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fa]'); if (!b) return;
    var id = FA.dataset.pick === b.dataset.fa ? '' : b.dataset.fa;
    if (id) FA.dataset.pick = id; else delete FA.dataset.pick;
    $$('[data-fa]', FA).forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.fa === id); });
    var f = faction(id), info = $('.fa-info', FA);
    info.className = 'fa-info panel ' + (f ? (f.side === 'neutral' ? 'gray' : f.side) : 'gray');
    info.innerHTML = f ? '<h4>' + emb(EMB[f.id]) + esc(f.name) + '</h4><p class="note">' + esc(f.note) + '</p>' +
      '<p class="fronts-rel">관련 전선 · ' + (f.fronts.length ? f.fronts.map(function (x) { return front(x).name + ' ' + front(x).place; }).join(' / ') : '지정 없음') + '</p>' + chips(f.chars)
      : '<p class="empty">세력을 고르면 소속 인물과 관련 전선이 강조됩니다.</p>';
  });

  // ===== 4. 힘의 체계: 동방 선 위 마디 7개, 서방 기둥 5개. 같은 행 = 설정집 「대응 감각」 =====
  var PW = $('.pw'), P = HB.power, PILLAR_X = [11.2, 30.7, 50, 69.4, 88.8];
  function rowY(r) { return 90 - r * 10.5; }
  $('.pw-map', PW).textContent = P.map;
  $$('.pw-note', PW)[0].textContent = P.eastNote; $$('.pw-note', PW)[1].textContent = P.westNote;
  function step(s, key, style) { return '<button type="button" class="pw-st" data-pw="' + key + '" aria-pressed="false"' + (style ? ' style="' + style + '"' : '') + '>' + esc(s.name) + (s.note ? '<small>' + esc(s.note) + '</small>' : '') + '</button>'; }
  $('.pw-line', PW).innerHTML = P.east.map(function (s, i) { return step(s, 'e' + i, 'top:' + rowY(s.row) + '%'); }).join('');
  var pillars = '', stack = '';
  P.west.forEach(function (sys, si) {
    stack += '<div class="col"><div class="ct">' + esc(sys.name) + '</div>' + sys.steps.slice().reverse().map(function (s, j) { return step(s, 'w' + si + '.' + (sys.steps.length - 1 - j)); }).join('') + '</div>';
    sys.steps.forEach(function (s, j) {
      var r = s.row != null ? s.row : j * 1.6;   // 대응 행이 없는 체계는 아래부터 차례로
      pillars += step(s, 'w' + si + '.' + j, 'left:' + PILLAR_X[si] + '%;top:' + rowY(r) + '%');
    });
  });
  $('.pw-pillars', PW).innerHTML = pillars; $('.pw-stack', PW).innerHTML = stack;
  function stepOf(key) { if (key[0] === 'e') return P.east[+key.slice(1)]; var p = key.slice(1).split('.'); return P.west[+p[0]].steps[+p[1]]; }
  PW.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pw]'); if (!b) return;
    var on = b.getAttribute('aria-pressed') !== 'true', key = b.dataset.pw;
    $$('[data-pw]', PW).forEach(function (x) { x.setAttribute('aria-pressed', on && x.dataset.pw === key); });
    var s = on ? stepOf(key) : null, east = key[0] === 'e', sys = on && !east ? P.west[+key.slice(1).split('.')[0]].name : '동방 · 경지', info = $('.pw-info', PW);
    info.className = 'pw-info panel ' + (s ? (east ? 'east' : 'west') : 'gray');
    info.innerHTML = s ? '<h4>' + esc(s.name) + ' <small style="font-family:var(--sans);font-size:13px;opacity:.6">' + esc(sys) + '</small></h4>' +
      (s.note ? '<p class="note">' + esc(s.note) + '</p>' : '') + (s.chars ? chips(s.chars) : '<p class="empty">이 단계에 해당하는 등록 인물 없음</p>')
      : '<p class="empty">단계를 고르면 설명과 해당 인물이 연결됩니다.</p>';
  });

  // ===== 5. 시작 모드 =====
  var ST = $('.start');
  $('.modes', ST).innerHTML = HB.modes.map(function (m) {
    return '<button type="button" class="mode" data-mode="' + m.id + '" aria-pressed="false" style="background-image:url(assets/skin/mode-' + m.id + '-idle.jpg)">' +
      '<small>' + (m.id === 'free' ? '소속 · 위치 자유' : '시작 장소 ' + (m.id === 'east' ? '천문관' : '발트로크 성채')) + '</small><b>' + esc(m.name) + '</b></button>';
  }).join('');
  HB.modes.forEach(function (m) { prefetch('assets/skin/mode-' + m.id + '-selected.jpg'); });
  ST.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mode]'); if (!b) return;
    var id = ST.dataset.mode === b.dataset.mode ? '' : b.dataset.mode; ST.dataset.mode = id;
    $$('[data-mode]', ST).forEach(function (x) { if (x === ST) return; var on = x.dataset.mode === id; x.setAttribute('aria-pressed', on); x.style.backgroundImage = 'url(assets/skin/mode-' + x.dataset.mode + (on ? '-selected' : '-idle') + '.jpg)'; });
    var m = HB.modes.filter(function (x) { return x.id === id; })[0];
    $('.mode-info', ST).innerHTML = m ? '<p class="note">' + esc(m.note) + '</p><div class="pro ' + m.id + '"><div class="slot">슬롯 · ' + esc(m.name) + ' 프롤로그</div></div><div class="links"><button type="button" class="btn gray" aria-disabled="true">작품으로 이동 · 미연결</button></div>' : '';
  });

  // ===== 주소 상태: #A/16 인물, #f-north 전선 =====
  function route(push) {
    var h = decodeURIComponent(location.hash.slice(1)), m = /^([A-Q])(?:\/(\d+))?$/.exec(h);
    if (m && byCode(m[1])) { open(m[1], +m[2] || 1, null, false); cur.pushed = push; return; }
    if (!V.hidden) close();
    if (/^f-/.test(h) && front(h.slice(2)) && FR.dataset.front !== h.slice(2)) { pickFront(h.slice(2), true); $('#fronts').scrollIntoView(); }
  }
  addEventListener('popstate', function () { route(false); });
  route(false);
})();
