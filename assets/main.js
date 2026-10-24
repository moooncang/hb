// 검과 마나의 경계 — 인물 선택 / 인물 상세 동작
(function () {
  'use strict';
  var d = document, HB = window.HB, C = HB.chars;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  function byCode(c) { return C.filter(function (x) { return x.code === c; })[0]; }
  function large(c, n) { return 'img/l/' + c + '_' + n + '.jpg'; }
  function thumb(c, n) { return 'img/t/' + c + '_' + n + '.jpg'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function aliasLabel(ch) { return ch.side === 'east' ? '동방 별호' : ch.side === 'west' ? '서방 이명' : ''; }
  function alias2Label(ch) { return ch.side === 'east' ? '서방 이명' : '동방 별호'; }
  function prefetch(src) { var i = new Image(); i.src = src; }
  function replaceHash(h) { history.replaceState(history.state, '', h ? '#' + h : location.pathname + location.search); }

  // 두 겹 이미지 교차 전환. 늦게 도착한 옛 요청은 token으로 버린다. 로딩 실패 시 기존 그림을 유지한다.
  function Swapper(box, fit) {
    var imgs = $$('img', box), cur = 0, token = 0;
    return {
      show: function (src, pos, done) {
        var my = ++token, im = new Image();
        im.onload = function () {
          if (my !== token) return;
          var next = imgs[1 - cur];
          next.src = src; if (pos) next.style.objectPosition = pos;
          next.classList.add('on'); imgs[cur].classList.remove('on'); cur = 1 - cur;
          if (done) done();
        };
        im.onerror = function () { if (my === token && done) done(); };
        im.src = src;
      },
      clear: function () { token++; imgs.forEach(function (i) { i.classList.remove('on'); }); }
    };
  }

  // ===== 인물 선택 =====
  function selectPage(root) {
    var list = $('.list', root), info = $('.sel-info', root), stage = $('.sel-stage', root);
    var sw = Swapper(stage), filter = 'all', committed = null, hoverT = 0;
    var st = {}; try { st = JSON.parse(sessionStorage.getItem('hb.sel') || '{}'); } catch (e) {}
    var counts = { all: C.length, east: 0, west: 0, neutral: 0 };
    C.forEach(function (c) { counts[c.side]++; });
    $$('.filters button', root).forEach(function (b) { b.innerHTML = esc(b.textContent) + ' <small>' + counts[b.dataset.f] + '</small>'; });

    function visible() { return filter === 'all' ? C : C.filter(function (c) { return c.side === filter; }); }
    function renderList() {
      var html = '', lastSide = '';
      visible().forEach(function (c) {
        if (filter === 'all' && c.side !== lastSide) { lastSide = c.side; html += '<li class="grp" data-side="' + c.side + '">' + HB.sides[c.side] + '</li>'; }
        html += '<li><button type="button" class="row" role="option" data-code="' + c.code + '" aria-selected="false" tabindex="-1">' +
          (c.noImage ? '<span class="face none">없음</span>' : '<span class="face"><img src="' + thumb(c.code, 1) + '" alt="" loading="lazy" decoding="async" style="object-position:' + c.focal + '"></span>') +
          '<span><b>' + esc(c.name) + '</b><small>' + esc(c.org) + (c.rank ? ' · ' + esc(c.rank) : '') + '</small></span></button></li>';
      });
      list.innerHTML = html;
    }
    function rows() { return $$('.row', list); }
    function mark(code) {
      rows().forEach(function (r) { var on = r.dataset.code === code; r.setAttribute('aria-selected', on); r.tabIndex = on ? 0 : -1; });
    }
    function preview(code) {
      var c = byCode(code); if (!c) return;
      root.dataset.side = c.side;
      info.classList.add('out');
      if (c.noImage) { sw.clear(); $('.noimg', stage).hidden = false; } else { $('.noimg', stage).hidden = true; sw.show(large(c.code, 1), c.focal); }
      setTimeout(function () {
        $('.alias', info).innerHTML = c.alias ? esc(c.alias) + (c.aliasHanja ? '<span class="hj">' + c.aliasHanja + '</span>' : '') : '<span class="hj">' + HB.sides[c.side] + '</span>';
        $('.name', info).textContent = c.name;
        $('.meta', info).innerHTML = '<span class="side">' + HB.sides[c.side] + '</span><span>' + esc(c.org) + '</span>' + (c.rank ? '<span>' + esc(c.rank) + '</span>' : '');
        var cta = $('.cta', info); cta.href = 'char.html?c=' + c.code;
        info.classList.remove('out');
      }, reduce ? 0 : 120);
      // 인접 인물 미리 읽기
      var v = visible(), i = v.indexOf(c);
      [v[i - 1], v[i + 1]].forEach(function (n) { if (n && !n.noImage) prefetch(large(n.code, 1)); });
    }
    function commit(code, keepScroll) {
      committed = code; mark(code); preview(code); replaceHash(code);
      if (!keepScroll) { var r = $('.row[data-code="' + code + '"]', list); if (r && r.scrollIntoView) r.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    }
    function setFilter(f) {
      filter = f;
      $$('.filters button', root).forEach(function (b) { b.setAttribute('aria-selected', b.dataset.f === f); });
      renderList();
      var v = visible();
      commit(v.some(function (c) { return c.code === committed; }) ? committed : v[0].code);
    }

    // 초기 상태: 주소 해시 > 세션 > 첫 인물
    var h = location.hash.slice(1), first = byCode(h) || byCode(st.code) || C[0];
    filter = st.filter || 'all';
    if (filter !== 'all' && first.side !== filter) filter = 'all';
    committed = first.code;
    setFilter(filter);
    if (st.scroll) list.scrollTop = st.scroll;

    $$('.filters button', root).forEach(function (b) { b.addEventListener('click', function () { setFilter(b.dataset.f); }); });
    list.addEventListener('click', function (e) { var r = e.target.closest('.row'); if (r) commit(r.dataset.code, true); });
    list.addEventListener('mouseover', function (e) {
      var r = e.target.closest('.row'); if (!r || !matchMedia('(hover:hover)').matches) return;
      clearTimeout(hoverT); hoverT = setTimeout(function () { preview(r.dataset.code); }, 120);
    });
    list.addEventListener('mouseleave', function () { clearTimeout(hoverT); preview(committed); });
    list.addEventListener('keydown', function (e) {
      var v = visible(), i = v.findIndex(function (c) { return c.code === committed; }), n = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = Math.min(i + 1, v.length - 1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = Math.max(i - 1, 0);
      else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = v.length - 1;
      else if (e.key === 'Enter') { e.preventDefault(); location.href = $('.cta', info).href; return; }
      if (n < 0) return;
      e.preventDefault(); commit(v[n].code); $('.row[data-code="' + v[n].code + '"]', list).focus();
    });
    addEventListener('pagehide', function () { sessionStorage.setItem('hb.sel', JSON.stringify({ filter: filter, code: committed, scroll: list.scrollTop })); });
  }

  // ===== 인물 상세 =====
  function detailPage(root) {
    var code = new URLSearchParams(location.search).get('c'), c = byCode(code);
    if (!c) { location.replace('characters.html'); return; }
    var i = C.indexOf(c), prev = C[(i + C.length - 1) % C.length], next = C[(i + 1) % C.length];
    root.dataset.side = c.side; d.title = c.name + ' · ' + HB.title;
    $('.hd .back').href = 'characters.html#' + c.code;
    var head = $('.d-head', root);
    $('.alias', head).innerHTML = c.alias ? esc(c.alias) + (c.aliasHanja ? '<span class="hj">' + c.aliasHanja + '</span>' : '') : '<span class="hj">' + HB.sides[c.side] + '</span>';
    $('.name', head).textContent = c.name;
    $('.meta', head).innerHTML = '<span class="side">' + HB.sides[c.side] + '</span><span>' + esc(c.org) + '</span>' + (c.rank ? '<span>' + esc(c.rank) + '</span>' : '');
    var kv = [['진영', HB.sides[c.side]], ['소속', c.org], ['직책', c.role], ['경지', c.rank], ['나이', c.sex + ' · ' + c.age],
      [aliasLabel(c), c.alias ? esc(c.alias) + (c.aliasHanja ? '<span class="hj">' + c.aliasHanja + '</span>' : '') : ''], [alias2Label(c), c.alias2], ['시그니처', c.sig], ['말', c.lang]];
    $('.kv', root).innerHTML = kv.filter(function (p) { return p[0] && p[1]; }).map(function (p) { return '<dt>' + p[0] + '</dt><dd>' + (p[0] === aliasLabel(c) ? p[1] : esc(p[1])) + '</dd>'; }).join('');
    $('.d-nav .p b', root).textContent = prev.name; $('.d-nav .p', root).href = 'char.html?c=' + prev.code;
    $('.d-nav .n b', root).textContent = next.name; $('.d-nav .n', root).href = 'char.html?c=' + next.code;
    [prev, next].forEach(function (x) { if (!x.noImage) prefetch(large(x.code, 1)); });

    // 원고 탭
    $$('.tabs button', root).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.tabs button', root).forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        $$('.panel', root).forEach(function (p) { p.hidden = p.id !== b.getAttribute('aria-controls'); });
      });
    });

    var viewer = $('.viewer', root), scenes = $('.scenes', root), cardBtn = $('.card-btn', root);
    if (c.noImage) { viewer.innerHTML = '<p class="noimg">이미지 없음</p>'; scenes.hidden = true; cardBtn.hidden = true; return; }

    var sw = Swapper(viewer), cur = 0, cats = $('.sc-cats', scenes), cuts = $('.sc-cuts', scenes), cnt = $('.sc-cnt', scenes);
    cats.innerHTML = HB.scenes.map(function (s, k) { return '<button type="button" role="tab" data-k="' + k + '" aria-selected="false">' + s[0] + '</button>'; }).join('');
    function catOf(n) { return HB.scenes.findIndex(function (s) { return s[1].indexOf(n) >= 0; }); }
    function show(n) {
      n = Math.max(1, Math.min(25, n)); cur = n;
      var k = catOf(n), s = HB.scenes[k];
      viewer.dataset.n = n;
      sw.show(large(c.code, n));
      $$('button', cats).forEach(function (b) { b.setAttribute('aria-selected', +b.dataset.k === k); });
      cuts.innerHTML = s[1].map(function (m) { return '<button type="button" data-n="' + m + '" aria-selected="' + (m === n) + '" aria-label="' + s[0] + ' ' + (s[1].indexOf(m) + 1) + '"><img src="' + thumb(c.code, m) + '" alt="" decoding="async"></button>'; }).join('');
      cnt.textContent = n + ' / 25';
      replaceHash(n);
      [n - 1, n + 1].forEach(function (m) { if (m >= 1 && m <= 25) prefetch(large(c.code, m)); });
    }
    cats.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(HB.scenes[+b.dataset.k][1][0]); });
    cuts.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(+b.dataset.n); });
    $('.prev', viewer).addEventListener('click', function () { show(cur - 1); });
    $('.next', viewer).addEventListener('click', function () { show(cur + 1); });

    // 전체 감상 모드 (현재 컷 / 등장 카드)
    var lb = $('.lightbox'), lbImg = $('img', lb), opener = null;
    function openLb(src, from) { opener = from; lbImg.src = src; lb.hidden = false; $('.x', lb).focus(); d.body.style.overflow = 'hidden'; }
    function closeLb() { lb.hidden = true; lbImg.removeAttribute('src'); d.body.style.overflow = ''; if (opener) opener.focus(); }
    $('.zoom', viewer).addEventListener('click', function () { openLb(large(c.code, cur), this); });
    cardBtn.addEventListener('click', function () { openLb('img/card/' + c.code + '.jpg', this); });
    $('.x', lb).addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    d.addEventListener('keydown', function (e) {
      if (/INPUT|TEXTAREA|SELECT/.test(d.activeElement.tagName)) return;
      if (e.key === 'Escape' && !lb.hidden) { closeLb(); return; }
      if (!lb.hidden) return;
      if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
    });
    var h = +location.hash.slice(1);
    show(h >= 1 && h <= 25 ? h : 1);
  }

  var sel = $('[data-select]'), det = $('[data-detail]');
  if (sel) selectPage(sel);
  if (det) detailPage(det);
})();
