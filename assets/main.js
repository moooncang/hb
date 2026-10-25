// 검과 마나의 경계 — 공통(입장·메뉴·전환·글자 맞춤) + 페이지별 동작. 페이지에 있는 구간만 초기화한다.
(function () {
  'use strict';
  var d = document, HB = window.HB, C = HB.chars, W = HB.world;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  function byCode(c) { return C.filter(function (x) { return x.code === c; })[0]; }
  function faction(id) { return HB.factions.filter(function (f) { return f.id === id; })[0]; }
  function front(id) { return HB.fronts.filter(function (f) { return f.id === id; })[0]; }
  function large(c, n) { return 'img/l/' + c + '_' + n + '.jpg'; }
  function thumb(c, n) { return 'img/t/' + c + '_' + n + '.jpg'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function prefetch(src) { var i = new Image(); i.src = src; return i; }
  function aliasHtml(c) { return c.alias ? esc(c.alias) + (c.aliasHanja ? '<span class="hj">' + c.aliasHanja + '</span>' : '') : HB.sides[c.side]; }
  var EMB = { daehwi: 'daehwi', murim: 'murim', mugan: 'mugan', sagal: 'sagal', gardeon: 'gardeon', selbar: 'selbar', tower: 'tower', church: 'church', isbel: 'isbel', bardun: 'bardun', crow: 'gardeon', inn: 'inn' };
  var FRONT_HJ = { north: '北部', center: '中央', fault: '斷層谷', south: '南部' };   // 표제용 한자(지명 뜻 그대로)
  function emb(id) { return '<i class="emb" style="background-image:url(assets/skin/fa-' + (EMB[id] || id) + '.png)" aria-hidden="true"></i>'; }
  function fname(id) { var f = faction(id); return '<span>' + emb(id) + esc(f.name) + '</span>'; }
  function chip(code) {
    var c = byCode(code);
    return '<button type="button" class="chipc' + (c.noImage ? ' none' : '') + '" data-open="' + c.code + '">' +
      (c.noImage ? '<i></i>' : '<img src="' + thumb(c.code, 1) + '" alt="" loading="lazy" style="object-position:' + c.focal + '">') + '<span>' + esc(c.name) + '</span></button>';
  }
  function chips(codes) { return '<div class="chips">' + codes.map(chip).join('') + '</div>'; }
  function lines(arr) { return arr.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''); }
  function setHash(h) { history.replaceState(history.state, '', h ? '#' + h : location.pathname); }
  function sideOf(c) { return c.side === 'neutral' ? 'gray' : c.side; }
  function faOf(c) { return HB.factions.filter(function (f) { return f.chars.indexOf(c.code) >= 0; })[0]; }
  function frontsOf(c) { return HB.fronts.filter(function (f) { return f.chars.indexOf(c.code) >= 0; }); }
  function orgLine(c) { return esc(c.org) + ' · ' + esc(c.role) + (c.rank ? ' · ' + esc(c.rank) : ''); }

  // ===== 글자 맞춤: .fit 은 부모 content 폭에 맞춰 글자 크기를 줄인다(대표 이름표) =====
  function fit() {
    $$('.fit').forEach(function (el) {
      var box = el.parentElement, cs = getComputedStyle(box), avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (avail <= 0) return;
      el.style.fontSize = '100px';
      var w = el.getBoundingClientRect().width, base = parseFloat(el.dataset.base || 24);
      el.style.fontSize = Math.min(base, 100 * avail / w * 0.96) + 'px';
    });
  }
  var fitT; addEventListener('resize', function () { clearTimeout(fitT); fitT = setTimeout(fit, 80); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(fit);

  // ===== 등장 · 전환(먹 번짐 / 오러 쐐기) =====
  function enter() { d.body.classList.add('in'); fit(); }
  if (d.readyState === 'complete') enter(); else addEventListener('load', enter);
  setTimeout(enter, 1200);
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' }) : null;
  $$('.reveal').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  ['wipe-ink-1', 'wipe-ink-2', 'wipe-ink-3', 'wipe-aura'].forEach(function (n) { prefetch('assets/skin2/' + n + '.png'); });
  var leaving = false;
  function go(href) {
    if (leaving) return;
    if (reduce) { location.href = href; return; }
    leaving = true;
    var w = d.createElement('i');
    w.className = 'wipe ' + (/fronts|start/.test(href) ? 'aura' : 'ink' + (1 + Math.floor(Math.random() * 3)));
    d.body.appendChild(w); w.getBoundingClientRect(); w.classList.add('on');
    setTimeout(function () { location.href = href; }, 500);
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]'); if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || a.getAttribute('aria-disabled') === 'true') { if (a && a.getAttribute('aria-disabled') === 'true') e.preventDefault(); return; }
    var h = a.getAttribute('href'); if (!/^[a-z]+\.html(#.*)?$/.test(h)) return;
    var here = location.pathname.split('/').pop() || 'index.html';
    if (h.split('#')[0] === here && h.indexOf('#') >= 0) return;   // 같은 페이지 안의 구간 이동은 그대로
    e.preventDefault(); go(h);
  });

  // ===== 메뉴 · 단축키 =====
  var menu = $('#menu'), menuBtn = $('.menu-btn'), menuFrom = null;
  function openMenu(on) {
    if (!menu) return;
    menu.hidden = !on; menuBtn.setAttribute('aria-expanded', on); d.body.classList.toggle('lock', on);
    if (on) { menuFrom = d.activeElement; $('.menu-x', menu).focus(); } else if (menuFrom) menuFrom.focus();
  }
  if (menu) {
    menuBtn.addEventListener('click', function () { openMenu(menu.hidden); });
    $('.menu-x', menu).addEventListener('click', function () { openMenu(false); });
    var here = location.pathname.split('/').pop() || 'index.html';
    $$('ol a', menu).forEach(function (a) { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });
  }
  var PAGES = ['index.html', 'characters.html', 'fronts.html', 'order.html', 'start.html'];
  d.addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(d.activeElement.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[1-5]$/.test(e.key) && (!V || V.hidden) && !(cover && cover.parentNode)) { var p = PAGES[+e.key - 1], cur = location.pathname.split('/').pop() || 'index.html'; if (cur !== p) go(p); }
  });

  // ===== 입장: 공통 그림을 실제로 불러온 뒤, 검격으로 갈라 들어간다. 갈라진 두 조각이 화면 밖으로 밀려나면 아래의 장면이 드러난다 =====
  var COVER = ['cover-moon', 'cover-ring-outer', 'cover-ring-inner', 'cover-glow', 'cover-sparks', 'cover-slash', 'cover-flash', 'cover-cut'];
  var SKIN2P = ['btn2-east-idle', 'btn2-east-hover', 'btn2-east-press', 'btn2-west-idle', 'btn2-west-hover', 'btn2-west-press', 'btn2-gray-idle', 'btn2-gray-hover', 'btn2-gray-press', 'btn2-sm-idle', 'btn2-sm-hover',
    'chip2-east-idle', 'chip2-east-active', 'chip2-west-idle', 'chip2-west-active', 'chip2-gray-idle', 'chip2-gray-active', 'toggle-west-idle', 'toggle-west-active', 'toggle-east-idle', 'toggle-east-active',
    'hero-name-east', 'hero-name-west', 'face-frame-east', 'face-frame-west', 'stage-frame-east', 'stage-frame-west', 'wipe-ink-1', 'wipe-ink-2', 'wipe-ink-3', 'wipe-aura'];
  var SKINS = ['seal-east', 'emblem-west', 'frame-east', 'frame-west', 'divider-east', 'divider-west', 'mark-east', 'mark-west', 'seam-band', 'power-east', 'power-west',
    'btn-round-east-idle', 'btn-round-east-hover', 'btn-round-west-idle', 'btn-round-west-hover', 'icon-menu', 'icon-close', 'icon-arrow-left', 'icon-arrow-right',
    'pin-gray-idle', 'pin-gray-active', 'step-east-off', 'step-east-on', 'step-west-off', 'step-west-on', 'thumb-east-idle', 'thumb-east-active', 'thumb-west-idle', 'thumb-west-active',
    'fa-daehwi', 'fa-murim', 'fa-taeheo', 'fa-ungak', 'fa-mugan', 'fa-sagal', 'fa-inn', 'fa-gardeon', 'fa-selbar', 'fa-tower', 'fa-church', 'fa-isbel', 'fa-bardun'];
  var JPGS = ['menu-backdrop', 'viewer-backdrop', 'front-map', 'neutral-placeholder', 'tex-paper', 'tex-stone', 'tex-ink-night', 'prologue-east', 'prologue-west',
    'mode-east-idle', 'mode-west-idle', 'mode-free-idle', 'mode-east-selected', 'mode-west-selected', 'mode-free-selected'];
  var cover = $('.cover'), hero = $('.hero');
  var ART = { title: false, crack: false, slash: false };   // v3 그림(design/ui-asset-order-v3.md)이 assets/skin3 에 들어오면 켠다
  if (hero) { hero.classList.toggle('has-title', ART.title); hero.classList.toggle('has-crack', ART.crack); }
  if (cover) cover.classList.toggle('art', ART.slash);
  $$('.cv-log[data-fronts]').forEach(function (ol) { ol.innerHTML = HB.fronts.map(function (f) { return '<li><b>' + f.name + '</b>' + esc(f.place) + '</li>'; }).join(''); });   // 진행 로그는 전선 넷
  function showHero() { if (hero) requestAnimationFrame(function () { hero.classList.add('in'); }); }
  if (cover && d.documentElement.classList.contains('entered')) { cover.parentNode.removeChild(cover); cover = null; showHero(); }
  else if (cover) {
    d.body.classList.add('lock');
    var list = COVER.concat(SKIN2P).map(function (n) { return 'assets/skin2/' + n + '.png'; })
      .concat(SKINS.map(function (n) { return 'assets/skin/' + n + '.png'; })).concat(JPGS.map(function (n) { return 'assets/skin/' + n + '.jpg'; }))
      .concat(C.filter(function (c) { return !c.noImage; }).map(function (c) { return thumb(c.code, 1); })).concat([large('A', 1), large('G', 1)]);
    var done = 0, total = list.length, bar = $('.cv-bar i', cover), pct = $('[data-pct]', cover), logs = $$('.cv-log li', cover), ready = false, going = false, orbN = 0;
    var tick = function () { done++; var r = done / total; bar.style.width = Math.round(r * 100) + '%'; pct.textContent = done + ' / ' + total; logs.forEach(function (li, i) { if (r >= (i + 1) / (logs.length + 1)) li.classList.add('on'); }); if (done >= total) arm(); };
    var arm = function () { if (ready) return; ready = true; logs.forEach(function (li) { li.classList.add('on'); }); $('.cv-pct span', cover).textContent = '등을 켰다'; cover.classList.add('ready'); };
    var started = false, startAll = function () { if (started) return; started = true; list.forEach(function (src) { var i = new Image(); i.onload = i.onerror = tick; i.src = src; }); };
    COVER.slice(0, 5).forEach(function (n) { var i = new Image(); i.onload = i.onerror = function () { if (++orbN === 5) { cover.classList.add('orb-on'); startAll(); } }; i.src = 'assets/skin2/' + n + '.png'; });
    setTimeout(function () { cover.classList.add('orb-on'); startAll(); }, 4000);
    // 화면을 검격 선(35°)으로 두 조각으로 자른다. 원본은 왼쪽 위 조각, 복제는 오른쪽 아래 조각. 각 조각은 선과 수직인 방향으로 화면 밖까지 밀려난다
    var split = function () {
      var w = innerWidth, h = innerHeight, a = 35 * Math.PI / 180, dx = Math.cos(a), dy = -Math.sin(a), nx = Math.sin(a), ny = Math.cos(a), R = Math.max(w, h) * 2, cx = w / 2, cy = h / 2, D = Math.max(w, h) * 1.15;
      var P = function (x, y) { return x.toFixed(1) + 'px ' + y.toFixed(1) + 'px'; };
      var poly = function (s) { return 'polygon(' + [P(cx - dx * R, cy - dy * R), P(cx + dx * R, cy + dy * R), P(cx + dx * R + s * nx * R, cy + dy * R + s * ny * R), P(cx - dx * R + s * nx * R, cy - dy * R + s * ny * R)].join(',') + ')'; };
      $$('.orb > i', cover).forEach(function (el) { var cs = getComputedStyle(el); el.style.transform = cs.transform; el.style.opacity = cs.opacity; el.style.animation = 'none'; });
      var body = $('.cv-body', cover), fx = $('.cv-fx', cover), clone = body.cloneNode(true);
      [[body, -1, 'a'], [clone, 1, 'b']].forEach(function (p) {
        var half = d.createElement('div'); half.className = 'cv-half';
        half.style.clipPath = half.style.webkitClipPath = poly(p[1]);
        half.style.setProperty('--tx', (p[1] * nx * D) + 'px'); half.style.setProperty('--ty', (p[1] * ny * D) + 'px'); half.style.setProperty('--rot', (p[1] * 1.4) + 'deg');
        var edge = d.createElement('i'); edge.className = 'cv-edge ' + p[2];   // 절단면(v3 그림이 있을 때만 보인다)
        half.appendChild(p[0]); half.appendChild(edge); cover.insertBefore(half, fx);
      });
      cover.getBoundingClientRect();
    };
    var finish = function () { if (cover && cover.parentNode) cover.parentNode.removeChild(cover); cover = null; d.body.classList.remove('lock'); };
    // 시각표(ms, 누른 뒤): 0 숨 고르기 → 450 검격 긋기 700 → 830 섬광 → 1450 두 조각이 1.5초 동안 밀려남 → 2000 장면 등장 → 3100 표지 제거
    var enterNow = function () {
      if (!ready || going) return; going = true;
      try { sessionStorage.setItem('hb-in', '1'); } catch (e) { }
      if (reduce) { finish(); showHero(); return; }
      cover.classList.add('arm'); split();
      setTimeout(function () { cover.classList.add('go'); }, 450);
      setTimeout(showHero, 2000);
      setTimeout(finish, 3100);
    };
    setTimeout(arm, 15000);   // 느린 회선: 15초 뒤에는 열어 준다
    d.addEventListener('keydown', function (e) { if (cover && !e.metaKey && !e.ctrlKey && !e.altKey) enterNow(); });
    cover.addEventListener('click', function (e) { e.preventDefault(); enterNow(); });
  } else showHero();

  // ===== 장면: 두 면이 맞물린 화면. 진영을 고르면 그쪽 면이 넓어지고 중심이 옮겨 간다 =====
  if (hero) {
    var LEAD = { west: 'G', east: 'A' };
    var SEAM = [48, 52, 46, 53, 47, 54, 48, 52, 47], YS = [0, 13, 25, 38, 50, 62, 75, 88, 100];   // 이음새: 손가락처럼 엇갈린 톱니(%)
    var east = $('.plane.east', hero), shade = $('.seam-shade', hero), light = $('.seam-light', hero), horizontal = false;
    var poly = function (shift, off) {
      var pts = SEAM.map(function (x, i) { return horizontal ? (YS[i] + '% ' + (x + shift + off) + '%') : ((x + shift + off) + '% ' + YS[i] + '%'); });
      return 'polygon(' + pts.concat(horizontal ? ['100% 100%', '0% 100%'] : ['100% 100%', '100% 0%']).join(',') + ')';
    };
    var layout = function () {
      horizontal = matchMedia('(max-width: 760px)').matches;
      var s = hero.dataset.pick === 'east' ? -6 : hero.dataset.pick === 'west' ? 6 : 0;   // 조금만 넓어진다(기획서 §4). 균열(.crack)도 같이 옮겨 가고 제목은 제자리
      east.style.clipPath = poly(s, 0); light.style.clipPath = poly(s, -0.28); shade.style.clipPath = poly(s, -1.6);
      hero.style.setProperty('--seam', s + '%');
      var below = $('#hero-below'), narrow = matchMedia('(max-width: 1100px)').matches;
      below.dataset.pick = hero.dataset.pick;
      $$('.finfo', d).forEach(function (f) { var want = narrow ? below : hero; if (f.parentNode !== want) want.appendChild(f); });
    };
    // 마우스 시차: 작은 보조 효과(±1 → 서방 10px, 동방 14px). 터치·모션 감소에서는 없다
    if (!reduce && matchMedia('(hover: hover)').matches) {
      var px = 0, py = 0, tx = 0, ty = 0, raf = null;
      var tickP = function () { tx += (px - tx) * .08; ty += (py - ty) * .08; hero.style.setProperty('--px', tx.toFixed(3)); hero.style.setProperty('--py', ty.toFixed(3)); raf = (Math.abs(px - tx) > .002 || Math.abs(py - ty) > .002) ? requestAnimationFrame(tickP) : null; };
      hero.addEventListener('mousemove', function (e) { var r = hero.getBoundingClientRect(); px = ((e.clientX - r.left) / r.width - .5) * 2; py = ((e.clientY - r.top) / r.height - .5) * 2; if (!raf) raf = requestAnimationFrame(tickP); });
      hero.addEventListener('mouseleave', function () { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(tickP); });
    }
    $$('.finfo', hero).forEach(function (box) {
      var side = box.dataset.side, fs = HB.factions.filter(function (f) { return f.side === side; });
      var lead = [].concat.apply([], fs.map(function (f) { return f.chars; })).filter(function (c) { return !byCode(c).noImage; }).slice(0, 6);
      box.innerHTML = (side === 'east' ? '<i class="stroke east r"></i>' : '') + '<p class="lbl ' + side + '"><i>勢力</i>' + HB.sides[side] + ' <small>' + fs.length + ' 세력</small></p><div class="fl">' + fs.map(function (f) { return fname(f.id); }).join('') + '</div>' + chips(lead);
    });
    $$('.tag', hero).forEach(function (tag) {
      var c = byCode(LEAD[tag.dataset.side]), fa = faOf(c);
      $('.alias', tag).innerHTML = (fa ? emb(fa.id) : '') + aliasHtml(c);
      $('.sub', tag).textContent = c.org + ' · ' + c.role + ' · ' + c.rank;
      var nm = $('.hname', tag); nm.setAttribute('data-open', c.code); $('.fit', nm).textContent = c.name;
    });
    var pick = function (side) {
      side = hero.dataset.pick === side ? '' : side; hero.dataset.pick = side;
      $$('.pick .toggle', hero).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.pick === side); });
      layout();
    };
    $$('.pick .toggle', hero).forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.pick); }); });
    $$('.plane', hero).forEach(function (p) {
      p.addEventListener('click', function () { pick(p.dataset.side); });
      p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(p.dataset.side); } });
    });
    layout(); addEventListener('resize', layout);
    prefetch(large('G', 1));
  }
  // 홈·공통: 설정 문장 슬롯
  $$('[data-season]').forEach(function (el) { el.textContent = W.season; });
  $$('[data-line]').forEach(function (el) { var p = el.dataset.line.split('.'); el.textContent = W[p[0]][+p[1]]; });
  $$('[data-lines]').forEach(function (el) { el.innerHTML = lines(W[el.dataset.lines]); });
  $$('[data-jobs]').forEach(function (el) { el.innerHTML = W.jobs.map(function (j) { return '<span>' + esc(j) + '</span>'; }).join(''); });
  $$('[data-calls]').forEach(function (el) { el.innerHTML = W.names[el.dataset.calls].map(function (n) { return '<li>' + esc(n) + '</li>'; }).join(''); });
  $$('[data-stage]').forEach(function (el) { el.textContent = W.stages[el.dataset.stage]; });
  var row = $('.fronts-row');
  if (row) row.innerHTML = HB.fronts.map(function (f, i) {
    return '<li><a href="fronts.html#' + f.id + '"><small>0' + (i + 1) + ' · ' + esc(f.place) + '</small><b>' + f.name + '<i>' + FRONT_HJ[f.id] + '</i></b><span class="vs">' + f.west.map(emb).join('') + '<i>대치</i>' + f.east.map(emb).join('') + '</span><p>' + esc(f.note) + '</p></a></li>';
  }).join('');
  var faces = $('.faces');
  if (faces) {
    var face = function (c) {
      var fr = c.side === 'neutral' ? 'east' : c.side;
      return '<a class="face" href="characters.html#' + c.code + '"><span class="pic' + (c.noImage ? ' none' : '') + '">' + (c.noImage ? '<i class="ph2">그림 없음</i>' : '<img src="' + thumb(c.code, 1) + '" alt="" style="object-position:' + c.focal + '" loading="lazy">') + '<i class="fframe ' + fr + '"></i></span><b>' + esc(c.name) + '</b><small>' + (c.alias ? esc(c.alias) : HB.sides[c.side]) + '</small></a>';
    };
    $$('.side', faces).forEach(function (col) { col.innerHTML = C.filter(function (c) { return c.side === col.dataset.side; }).map(face).join(''); });
    $('.mid', faces).innerHTML = C.filter(function (c) { return c.side === 'neutral'; }).map(face).join('');
  }
  var embs = $('.embs');
  if (embs) {
    var embl = function (f) { return '<a class="embl" href="order.html#' + f.id + '">' + emb(f.id) + '<b>' + esc(f.name) + '</b></a>'; };
    $$('.side', embs).forEach(function (col) { col.innerHTML = HB.factions.filter(function (f) { return f.side === col.dataset.side; }).map(embl).join(''); });
    $('.mid', embs).innerHTML = HB.factions.filter(function (f) { return f.side === 'neutral'; }).map(embl).join('');
    var P0 = HB.power, who = function (s) { return s.chars ? '<span class="who">' + s.chars.map(function (k) { var c = byCode(k); return '<img src="' + thumb(k, 1) + '" alt="' + esc(c.name) + '" title="' + esc(c.name) + '" style="object-position:' + c.focal + '" loading="lazy">'; }).join('') + '</span>' : ''; };
    var st = function (s) { return '<span class="st">' + esc(s.name) + (s.note ? '<small>' + esc(s.note) + '</small>' : '') + who(s) + '</span>'; };
    $('.ladder').innerHTML = '<div class="colm east"><h4>동방 · 경지</h4>' + P0.east.slice().reverse().map(st).join('') + '</div>' +
      '<div class="colm west"><h4>서방 · 기사</h4>' + P0.west[0].steps.slice().reverse().map(st).join('') + '</div><p class="map">' + esc(P0.map) + '</p>';
  }
  var mini = $('.mini-modes');
  if (mini) mini.innerHTML = HB.modes.map(function (m) {
    return '<a class="mode mini" href="start.html#' + m.id + '" style="background-image:url(assets/skin/mode-' + m.id + '-idle.jpg)"><small>' + (m.id === 'free' ? '소속 · 위치 자유' : '시작 장소 ' + (m.id === 'east' ? '천문관' : '발트로크 성채')) + '</small><b>' + esc(m.name) + '</b></a>';
  }).join('');
  // 입장에서 베인 틈의 잔광은 조각이 밀려나는 동안 함께 사라진다(별도 잔상 없음)

  // ===== 인물 군상 =====
  var cast = $('.cast');
  if (cast) {
    var jb = function (c) { return '<button type="button" data-open="' + c.code + '" data-side="' + c.side + '" aria-label="' + esc(c.name) + '"><img src="' + thumb(c.code, 1) + '" alt="" style="object-position:' + c.focal + '"></button>'; };
    $('.jump', cast).innerHTML = '<span class="lbl west"><i>西</i>서방</span>' + C.filter(function (c) { return c.side === 'west'; }).map(jb).join('') + '<span class="sep"></span><span class="lbl"><i>東</i>동방</span>' + C.filter(function (c) { return c.side === 'east'; }).map(jb).join('');
    $$('.cast-col', cast).forEach(function (col) {
      var side = col.dataset.side, sk = side === 'neutral' ? 'gray' : side;
      col.innerHTML = C.filter(function (c) { return c.side === side; }).map(function (c) {
        var img = c.noImage ? '<img src="assets/skin/neutral-placeholder.jpg" alt="쌍등객잔 문 앞. 레나타의 그림은 아직 없다" loading="lazy" decoding="async">'
          : '<img src="' + large(c.code, 1) + '" alt="" loading="lazy" decoding="async" width="1856" height="1280">';
        var fa = faOf(c);
        return '<button type="button" class="fig" data-open="' + c.code + '" data-fig="' + c.code + '">' +
          '<span class="pic">' + img + '</span>' +
          '<span class="cap"><span class="alias">' + (fa ? emb(fa.id) : '') + aliasHtml(c) + '</span><span class="nm"><span>' + esc(c.name) + '</span><i class="mark"></i></span><i class="stroke ' + (sk === 'gray' ? 'east' : sk) + '"></i>' +
          '<span class="sub">' + orgLine(c) + '</span><span class="sig">' + esc(c.sig) + '</span></span></button>';
      }).join('');
    });
    $$('.filters button', cast).forEach(function (b) {
      b.addEventListener('click', function () { cast.dataset.f = b.dataset.f; $$('.filters button', cast).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); });
    });
  }

  // ===== 인물 확장 감상 =====
  var V = $('.viewer'), vImg = V && $('.v-img', V), layers = V ? $$('img', vImg) : [], lb = $('.lightbox');
  var cur = { code: null, n: 1, from: null, pushed: false }, layer = 0, token = 0;
  function catOf(n) { return HB.scenes.findIndex(function (s) { return s[1].indexOf(n) >= 0; }); }
  function ar(n) { var dm = HB.dim(n); return dm[0] / dm[1]; }
  function showCut(n, instant) {
    n = Math.max(1, Math.min(25, n)); cur.n = n;
    var c = byCode(cur.code), k = catOf(n), s = HB.scenes[k], my = ++token;
    vImg.style.setProperty('--ar', ar(n));
    vImg.classList.toggle('first', n === 1); vImg.classList.toggle('wide', n !== 1);   // 첫등장 컷은 v1 액자, 나머지는 무대 틀
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
    var i = C.indexOf(c), p = C[(i + C.length - 1) % C.length], nx = C[(i + 1) % C.length], sk = sideOf(c), fa = faOf(c);
    V.dataset.side = c.side === 'neutral' ? 'east' : c.side; vImg.dataset.side = V.dataset.side;
    $('.v-pos', V).textContent = HB.sides[c.side] + ' · ' + (i + 1) + ' / ' + C.length;
    $('.v-prev', V).textContent = p.name; $('.v-prev', V).dataset.code = p.code;
    $('.v-next', V).textContent = nx.name; $('.v-next', V).dataset.code = nx.code;
    var id = $('.v-id', V); id.className = 'v-id ' + sk;
    $('.v-name', id).innerHTML = '<p class="alias">' + (fa ? emb(fa.id) : '') + aliasHtml(c) + '</p><h2>' + esc(c.name) + '</h2><i class="stroke ' + (sk === 'gray' ? 'east' : sk) + (sk === 'east' ? '' : '') + '"></i>' +
      '<p class="meta"><span><b>' + HB.sides[c.side] + '</b></span><span>' + esc(c.org) + '</span><span>' + esc(c.role) + '</span>' + (c.rank ? '<span>' + esc(c.rank) + '</span>' : '') + '</p>';
    var a1 = c.side === 'east' ? '동방 별호' : '서방 이명', a2 = c.side === 'east' ? '서방 이명' : '동방 별호';
    var kv = [[a1, c.alias ? aliasHtml(c) : ''], [a2, esc(c.alias2)], ['나이', c.sex + ' · ' + c.age], ['시그니처', esc(c.sig)], ['말', esc(c.lang)]];
    $('.kv', V).innerHTML = kv.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('');
    var rel = HB.relations.filter(function (r) { return r[0] === code || r[1] === code; });
    $('.rel', V).innerHTML = rel.length ? rel.map(function (r) { var o = r[0] === code ? r[1] : r[0]; return '<li>' + chip(o) + '<span>' + esc(r[2]) + '</span></li>'; }).join('') : '<li><span class="empty">설정집에 적힌 관계 없음</span></li>';
    $('[data-stages]', V).textContent = '같은 진영 ' + W.stages.same;
    // 소속 세력과 전선의 설정집 문장(원문 그대로)
    var ctx = (fa ? '<article><p class="nm">' + emb(fa.id) + esc(fa.name) + (fa.hanja ? '<span class="hj">' + fa.hanja + '</span>' : '') + '<small>소속</small></p><p>' + esc(fa.note) + '</p></article>' : '') +
      frontsOf(c).map(function (f) { return '<article><p class="nm">' + esc(f.name) + '<span class="hj">' + FRONT_HJ[f.id] + '</span><small>전선 · ' + esc(f.place) + '</small></p><p>' + esc(f.note) + '</p><p><a href="fronts.html#' + f.id + '">전선에서 보기 →</a></p></article>'; }).join('');
    $('.ctx', V).innerHTML = ctx || '<p class="empty">설정집에 지정된 세력·전선 없음</p>';
    var groups = [['등장 · 평소', 0, 2], ['감정', 2, 9], ['전투', 9, 13]], ck = sk === 'gray' ? 'east' : sk;
    $('.sc-cats', V).innerHTML = groups.map(function (g) {
      return '<span class="g">' + g[0] + '</span>' + HB.scenes.slice(g[1], g[2]).map(function (s, j) { return '<button type="button" class="sk chip2 ' + ck + '" role="tab" data-k="' + (g[1] + j) + '" aria-selected="false"><span>' + s[0] + '</span></button>'; }).join('');
    }).join('');
    var has = !c.noImage;
    $('.v-stage', V).hidden = !has; $('.v-scenes', V).hidden = !has;
    [p, nx].forEach(function (x) { if (!x.noImage) prefetch(large(x.code, 1)); });
  }
  function figOf(code) { var f = cast && $('[data-fig="' + code + '"]', cast); return f && f.offsetParent ? f : null; }
  function flip(fromRect, toEl, reverse, done) {
    if (reduce || !fromRect) { if (done) done(); return; }
    var to = toEl.getBoundingClientRect(), dx = fromRect.left - to.left, dy = fromRect.top - to.top, sx = fromRect.width / to.width, sy = fromRect.height / to.height;
    var t = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    toEl.style.transition = 'none'; toEl.style.transform = reverse ? 'none' : t;
    toEl.getBoundingClientRect();
    toEl.style.transition = 'transform ' + (reverse ? 420 : 560) + 'ms cubic-bezier(.2,.7,.15,1)';
    toEl.style.transform = reverse ? t : 'none';
    var end = function () { toEl.removeEventListener('transitionend', end); toEl.style.transition = ''; if (!reverse) toEl.style.transform = ''; if (done) done(); };
    toEl.addEventListener('transitionend', end);
    setTimeout(end, reverse ? 480 : 620);
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
    if (!V || V.hidden) return;
    var fig = figOf(cur.code), pic = fig && $('.pic img', fig), rect = pic && !byCode(cur.code).noImage && V.scrollTop < 40 ? pic.getBoundingClientRect() : null;
    var finish = function () { V.hidden = true; V.classList.remove('in'); d.body.classList.remove('lock'); layers.forEach(function (l) { l.classList.remove('on'); l.removeAttribute('src'); }); if (fig) fig.focus({ preventScroll: true }); };
    V.classList.remove('in');
    flip(rect, vImg, true, finish);
    cur.pushed = false; setHash('');
  }
  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]'); if (t) { if (V) open(t.dataset.open, 1, t.closest('.fig') || null, true); else go('characters.html#' + t.dataset.open); return; }
    if (!V) return;
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
    if (e.key === 'Escape') { if (lb && !lb.hidden) closeLb(); else if (menu && !menu.hidden) openMenu(false); else if (V && !V.hidden) { if (cur.pushed) history.back(); else close(); } return; }
    if (!V || V.hidden || !lb.hidden) return;
    if (e.key === 'ArrowLeft') showCut(cur.n - 1); else if (e.key === 'ArrowRight') showCut(cur.n + 1);
  });

  // ===== 전선 =====
  var FR = $('.fronts'), wrap = FR && $('.map-wrap', FR), world = FR && $('.map-world', FR);
  var pos = { north: [53, 12], fault: [56, 28], center: [52, 44], south: [51, 79] };   // 지도 그림 기준 %
  if (FR) {
    $('.pins', FR).innerHTML = HB.fronts.map(function (f) { var p = pos[f.id]; return '<button type="button" class="pin" data-front="' + f.id + '" aria-pressed="false" style="left:' + p[0] + '%;top:' + p[1] + '%" aria-label="' + f.name + ' ' + esc(f.place) + '"><span>' + f.name + '</span></button>'; }).join('');
    $('.fr-list', FR).innerHTML = HB.fronts.map(function (f, i) { return '<button type="button" data-front="' + f.id + '" aria-pressed="false"><span><small>0' + (i + 1) + ' · ' + esc(f.place) + '</small><b>' + f.name + '<i>' + FRONT_HJ[f.id] + '</i></b></span><span class="vs">' + f.west.map(emb).join('') + '<i>대치</i>' + f.east.map(emb).join('') + '</span></button>'; }).join('');
    FR.addEventListener('click', function (e) { var b = e.target.closest('[data-front]'); if (b && b !== FR) pickFront(b.dataset.front); });
  }
  function names(ids) { return ids.length ? ids.map(fname).join('') : '<span>—</span>'; }
  function pickFront(id, keepHash) {
    id = FR.dataset.front === id ? '' : id; FR.dataset.front = id;
    $$('[data-front]', FR).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.front === id); });
    var f = front(id), cl = function (v) { return Math.max(-50, Math.min(50, v)); };   // 2배 확대에서 지도 밖이 드러나지 않는 한계
    if (f) { var p = pos[id]; world.style.transform = 'translate(' + cl(2 * (50 - p[0])) + '%,' + cl(2 * (50 - p[1])) + '%) scale(2)'; wrap.classList.add('zoom'); }
    else { world.style.transform = ''; wrap.classList.remove('zoom'); }
    $('.fr-info', FR).innerHTML = f ? '<p class="place">' + esc(f.place) + '</p><h4>' + f.name + ' <span class="hj">' + FRONT_HJ[f.id] + '</span></h4><p class="note">' + esc(f.note) + '</p>' +
      '<div class="vs2"><div class="w">' + names(f.west) + '</div><i>대치</i><div class="e">' + names(f.east) + '</div></div>' +
      (f.chars.length ? chips(f.chars) : '<p class="empty">설정에 지정된 인물 없음</p>') : '<p class="empty">전선을 고르면 대치 세력과 관련 인물이 나타납니다.</p>';
    if (!keepHash) setHash(id || '');
  }

  // ===== 세력 =====
  var FA = $('.fa');
  if (FA) {
    $$('.fa-col', FA).forEach(function (col) {
      $('.fa-list', col).innerHTML = HB.factions.filter(function (f) { return f.side === col.dataset.side; }).map(function (f) {
        return '<button type="button" data-fa="' + f.id + '" aria-pressed="false">' + emb(f.id) + '<span>' + esc(f.name) + (f.hanja ? '<small class="hj">' + f.hanja + '</small>' : '') + '</span></button>';
      }).join('');
    });
    FA.addEventListener('click', function (e) { var b = e.target.closest('[data-fa]'); if (b) pickFaction(b.dataset.fa); });
  }
  function pickFaction(id0) {
    var id = FA.dataset.pick === id0 ? '' : id0;
    if (id) FA.dataset.pick = id; else delete FA.dataset.pick;
    $$('[data-fa]', FA).forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.fa === id); });
    var f = faction(id), info = $('.fa-info', FA);
    info.innerHTML = f ? '<h4>' + emb(f.id) + esc(f.name) + (f.hanja ? '<span class="hj">' + f.hanja + '</span>' : '') + '</h4><p class="note">' + esc(f.note) + '</p>' +
      '<p class="fronts-rel">관련 전선 · ' + (f.fronts.length ? f.fronts.map(function (x) { return '<a href="fronts.html#' + x + '">' + front(x).name + ' ' + esc(front(x).place) + '</a>'; }).join(' / ') : '지정 없음') + '</p>' + chips(f.chars)
      : '<p class="empty">세력을 고르면 소속 인물과 관련 전선이 강조됩니다.</p>';
  }

  // ===== 힘의 체계: 동방 선 위 마디 7개, 서방 기둥 5개. 같은 행 = 설정집 「대응 감각」 =====
  var PW = $('.pw'), P = HB.power, PILLAR_X = [11.2, 30.7, 50, 69.4, 88.8];
  function rowY(r) { return 90 - r * 10.5; }
  if (PW) {
    $('.pw-map', PW).textContent = P.map;
    $$('.pw-note', PW)[0].textContent = P.eastNote; $$('.pw-note', PW)[1].textContent = P.westNote;
    var step = function (s, key, style) { return '<button type="button" class="pw-st" data-pw="' + key + '" aria-pressed="false"' + (style ? ' style="' + style + '"' : '') + '>' + esc(s.name) + (s.note ? '<small>' + esc(s.note) + '</small>' : '') + '</button>'; };
    $('.pw-line', PW).innerHTML = P.east.map(function (s, i) { return step(s, 'e' + i, 'top:' + rowY(s.row) + '%'); }).join('');
    var pillars = '', stack = '';
    P.west.forEach(function (sys, si) {
      stack += '<div class="colm"><div class="ct">' + esc(sys.name) + '</div>' + sys.steps.slice().reverse().map(function (s, j) { return step(s, 'w' + si + '.' + (sys.steps.length - 1 - j)); }).join('') + '</div>';
      sys.steps.forEach(function (s, j) { var r = s.row != null ? s.row : j * 1.6; pillars += step(s, 'w' + si + '.' + j, 'left:' + PILLAR_X[si] + '%;top:' + rowY(r) + '%'); });
    });
    $('.pw-pillars', PW).innerHTML = pillars; $('.pw-stack', PW).innerHTML = stack;
    var stepOf = function (key) { if (key[0] === 'e') return P.east[+key.slice(1)]; var p = key.slice(1).split('.'); return P.west[+p[0]].steps[+p[1]]; };
    PW.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pw]'); if (!b) return;
      var on = b.getAttribute('aria-pressed') !== 'true', key = b.dataset.pw;
      $$('[data-pw]', PW).forEach(function (x) { x.setAttribute('aria-pressed', on && x.dataset.pw === key); });
      var s = on ? stepOf(key) : null, east = key[0] === 'e', sys = on && !east ? P.west[+key.slice(1).split('.')[0]].name : '동방 · 경지', info = $('.pw-info', PW);
      info.innerHTML = s ? '<h4>' + esc(s.name) + '<small>' + esc(sys) + '</small></h4>' +
        (s.note ? '<p class="note">' + esc(s.note) + '</p>' : '') + (s.chars ? chips(s.chars) : '<p class="empty">이 단계에 해당하는 등록 인물 없음</p>')
        : '<p class="empty">단계를 고르면 설명과 해당 인물이 연결됩니다.</p>';
    });
  }

  // ===== 시작 =====
  var ST = $('.start');
  if (ST) {
    $('.modes', ST).innerHTML = HB.modes.map(function (m) {
      return '<button type="button" class="mode" data-mode="' + m.id + '" aria-pressed="false" style="background-image:url(assets/skin/mode-' + m.id + '-idle.jpg)">' +
        '<small>' + (m.id === 'free' ? '소속 · 위치 자유' : '시작 장소 ' + (m.id === 'east' ? '천문관' : '발트로크 성채')) + '</small><b>' + esc(m.name) + '</b></button>';
    }).join('');
    HB.modes.forEach(function (m) { prefetch('assets/skin/mode-' + m.id + '-selected.jpg'); });
    ST.addEventListener('click', function (e) { var b = e.target.closest('.mode[data-mode]'); if (b) pickMode(b.dataset.mode); });
  }
  function pickMode(id0, keepHash) {
    var id = ST.dataset.mode === id0 ? '' : id0; ST.dataset.mode = id;
    $$('.mode[data-mode]', ST).forEach(function (x) { var on = x.dataset.mode === id; x.setAttribute('aria-pressed', on); x.style.backgroundImage = 'url(assets/skin/mode-' + x.dataset.mode + (on ? '-selected' : '-idle') + '.jpg)'; });
    var m = HB.modes.filter(function (x) { return x.id === id; })[0];
    $('.mode-info', ST).innerHTML = m ? '<p class="lbl"><i>始作</i>' + esc(m.name) + '</p><p class="note">' + esc(m.note) + '</p><div class="pro2 ' + m.id + '"><div class="slot">슬롯 · ' + esc(m.name) + ' 프롤로그</div></div><div class="links"><button type="button" class="sk btn2 gray" aria-disabled="true"><span class="two"><b>작품으로 이동</b><small>미연결</small></span></button></div>' : '';
    if (!keepHash) setHash(id || '');
  }

  // ===== 주소 상태: characters #A/16 · fronts #north · order #murim · start #east =====
  function route(push) {
    var h = decodeURIComponent(location.hash.slice(1)), m = /^([A-Q])(?:\/(\d+))?$/.exec(h);
    if (V) { if (m && byCode(m[1])) { open(m[1], +m[2] || 1, null, false); cur.pushed = push; return; } if (!V.hidden) close(); }
    if (FR) { var fid = h.replace(/^f-/, ''); if (front(fid) && FR.dataset.front !== fid) pickFront(fid, true); }
    if (FA && faction(h) && FA.dataset.pick !== h) { pickFaction(h); $('.fa-info', FA).scrollIntoView({ block: 'center' }); }
    if (ST && HB.modes.some(function (x) { return x.id === h; }) && ST.dataset.mode !== h) pickMode(h, true);
  }
  addEventListener('popstate', function () { route(false); });
  route(false);
})();
