// OST + 동작별 효과음. 첫 클릭/입장 키로 오디오를 활성화하며 명시한 음소거는 유지한다.
(function () {
  'use strict';
  var HB = window.HB, d = document;
  var tracks = {
    main: { title: 'RED CLOTH', note: '메인 테마', file: 'red-cloth.mp3' },
    east: { title: '천문관', note: '동방 전선', file: 'tianmen.mp3' },
    west: { title: '발트로크', note: '서방 성채', file: 'valtrock.mp3' }
  };
  function read(storage, key) { try { return JSON.parse(storage.getItem(key)) || {}; } catch (e) { return {}; } }
  function save(storage, key, value) { try { storage.setItem(key, JSON.stringify(value)); } catch (e) { } }
  // Storage 자체를 금지하는 환경에서도 조작은 동작한다.
  var local, session;
  try { local = window.localStorage; session = window.sessionStorage; } catch (e) { }
  var saved = read(local, 'hb-audio'), positions = read(session, 'hb-audio-positions');
  var prefs = {
    enabled: saved.enabled !== false,
    volume: typeof saved.volume === 'number' && isFinite(saved.volume) ? Math.max(0, Math.min(1, saved.volume)) : .28,
    effects: saved.effects !== false,
    fxVolume: typeof saved.fxVolume === 'number' && isFinite(saved.fxVolume) ? Math.max(0, Math.min(1, saved.fxVolume)) : .6,
    selection: saved.selection === 'auto' || tracks[saved.selection] ? saved.selection : 'auto'
  };
  var page = location.pathname.split('/').pop(), base = page === 'characters-east.html' ? 'east' : page === 'characters-west.html' ? 'west' : 'main';
  var scene = base, current = '', context = null, musicGain = null, fxGain = null, noise = null;
  var serial = 0, waiting = prefs.enabled, failed = false, starting = false, departed = false, lastSave = 0;
  var activated = read(session, 'hb-audio-started') === true, audioReady = null, cueSerial = 0, fxEpoch = 0, voices = [], cueTimes = {}, duckUntil = 0;
  var entryBuffer = null, entryTask = null;
  function prepareEntry() {
    if (entryBuffer) return Promise.resolve(true);
    if (entryTask) return entryTask;
    var abort = new AbortController(), timer;
    var decode = fetch('assets/audio/entry-slash.wav', { signal: abort.signal }).then(function (response) {
      if (!response.ok) throw new Error('Entry sound: ' + response.status);
      return response.arrayBuffer();
    }).then(function (bytes) {
      var Decoder = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      return new Decoder(2, 1, 44100).decodeAudioData(bytes);
    });
    // 파일 준비는 입장 전 끝내되, 네트워크 오류가 표지를 붙잡지 않도록 한다.
    var timeout = new Promise(function (resolve) { timer = setTimeout(function () { abort.abort(); resolve(null); }, 5000); });
    entryTask = Promise.race([decode, timeout]).then(function (buffer) {
      clearTimeout(timer); entryBuffer = buffer; if (!buffer) entryTask = null;
      return !!buffer;
    }, function () { clearTimeout(timer); entryTask = null; return false; });
    return entryTask;
  }
  var media = d.createElement('audio');
  media.preload = 'none'; media.loop = true; media.setAttribute('playsinline', '');
  media.hidden = true; d.body.appendChild(media);
  var ui = d.createElement('aside');
  ui.className = 'sound'; ui.setAttribute('aria-label', '사운드');
  ui.innerHTML = '<button type="button" class="sound-button" aria-label="사운드 설정" aria-expanded="false" aria-controls="sound-panel"><span aria-hidden="true"></span></button>' +
    '<section class="sound-panel" id="sound-panel" aria-label="사운드 설정" hidden>' +
    '<div class="sound-head"><b>사운드</b><button type="button" class="sound-close" aria-label="사운드 설정 닫기">×</button></div>' +
    '<p class="sound-track"></p><p class="sound-status" role="status" aria-live="polite"></p>' +
    '<button type="button" class="sound-power" aria-pressed="false">소리 켜기</button>' +
    '<button type="button" class="sound-retry" hidden>음악 다시 재생</button>' +
    '<label class="sound-field" for="sound-track">곡 선택<select id="sound-track"><option value="auto">진영에 맞춰 자동</option><option value="main">RED CLOTH · 메인 테마</option><option value="east">천문관 · 동방 전선</option><option value="west">발트로크 · 서방 성채</option></select></label>' +
    '<label class="sound-field" for="sound-volume"><span>배경음악 <output for="sound-volume"></output></span><input id="sound-volume" type="range" min="0" max="100" step="1"></label>' +
    '<label class="sound-effects"><input type="checkbox" id="sound-effects">효과음</label>' +
    '<label class="sound-field sound-fx-field" for="sound-fx-volume"><span>효과음 볼륨 <output for="sound-fx-volume"></output></span><input id="sound-fx-volume" type="range" min="0" max="100" step="1"></label></section>';
  d.body.appendChild(ui);
  var button = ui.querySelector('.sound-button'), panel = ui.querySelector('.sound-panel'), power = ui.querySelector('.sound-power');
  var select = ui.querySelector('select'), volume = ui.querySelector('#sound-volume'), effects = ui.querySelector('[type="checkbox"]'), fxVolume = ui.querySelector('#sound-fx-volume');
  select.value = prefs.selection; volume.value = Math.round(prefs.volume * 100); effects.checked = prefs.effects; fxVolume.value = Math.round(prefs.fxVolume * 100);
  function wanted() { return prefs.selection === 'auto' ? scene : prefs.selection; }
  function persist() { save(local, 'hb-audio', prefs); }
  function remember() {
    if (current && media.readyState > 0 && isFinite(media.currentTime)) { positions[current] = media.currentTime; save(session, 'hb-audio-positions', positions); }
  }
  function render() {
    var playing = prefs.enabled && !media.paused && (!context || context.state === 'running') && !d.hidden;
    button.dataset.on = String(playing);
    button.setAttribute('aria-label', '사운드 설정 · ' + (playing ? '켜짐' : '꺼짐'));
    power.textContent = prefs.enabled ? '소리 끄기' : '소리 켜기';
    power.setAttribute('aria-pressed', String(prefs.enabled));
    ui.querySelector('.sound-track').textContent = tracks[wanted()].title + ' · ' + tracks[wanted()].note;
    ui.querySelector('.sound-status').textContent = !prefs.enabled ? '소리 꺼짐' : failed ? '음악 연결 실패 · 다음 조작에서 재시도' : waiting ? '입장하거나 클릭하면 소리가 재생됩니다.' : starting ? '불러오는 중' : d.hidden ? '일시 정지' : '재생 중';
    ui.querySelector('[for="sound-volume"] output').textContent = Math.round(prefs.volume * 100) + '%';
    ui.querySelector('[for="sound-fx-volume"] output').textContent = Math.round(prefs.fxVolume * 100) + '%';
    fxVolume.disabled = !prefs.effects;
    ui.querySelector('.sound-retry').hidden = !prefs.enabled || !failed;
  }
  function showPanel(on) {
    panel.hidden = !on; button.setAttribute('aria-expanded', String(on));
    if (on) power.focus();
  }
  function ramp(node, value, seconds) {
    if (!node || !context) return;
    var at = context.currentTime, param = node.gain;
    param.cancelScheduledValues(at); param.setValueAtTime(param.value, at); param.linearRampToValueAtTime(value, at + seconds);
  }
  function level(fade) {
    var audible = prefs.enabled && !d.hidden && !departed;
    var gain = audible ? prefs.volume * (context && context.currentTime < duckUntil ? .35 : 1) : 0;
    if (musicGain) { ramp(musicGain, gain, fade || .06); ramp(fxGain, audible && prefs.effects ? prefs.fxVolume : 0, .015); }
    else media.volume = gain;
  }
  function initContext() {
    if (context) return;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    try {
      context = new AudioContext();
      musicGain = context.createGain(); fxGain = context.createGain();
      musicGain.gain.value = 0; fxGain.gain.value = prefs.enabled && prefs.effects ? prefs.fxVolume : 0;
      context.createMediaElementSource(media).connect(musicGain); musicGain.connect(context.destination); fxGain.connect(context.destination);
      context.addEventListener('statechange', function () {
        if (context.state !== 'running' && prefs.enabled && !d.hidden && !departed) { waiting = true; media.pause(); }
        render();
      });
    } catch (e) { context = null; musicGain = null; fxGain = null; }
  }
  function stopEffects() {
    fxEpoch++; voices.slice().forEach(function (source) { try { source.stop(); } catch (e) {} });
    voices = []; duckUntil = 0;
  }
  function pause() { serial++; starting = false; remember(); media.pause(); stopEffects(); level(); render(); }
  function play() {
    if (!prefs.enabled || !activated || d.hidden || departed) return;
    initContext();
    var id = wanted(), token = ++serial;
    if (id !== current) {
      remember(); media.pause(); current = id;
      if (musicGain) musicGain.gain.value = 0;
      media.src = 'assets/audio/' + tracks[id].file;
    } else if (failed) media.load();
    failed = false; waiting = !!(context && context.state !== 'running'); starting = true; render();
    // resume와 play 모두 사용자 동작의 같은 호출 안에서 시작한다.
    var resumed = context && context.state !== 'running' ? context.resume() : Promise.resolve();
    audioReady = resumed;
    Promise.all([resumed, media.play()]).then(function () {
      if (token !== serial) return;
      starting = false;
      if (!prefs.enabled || d.hidden) { pause(); return; }
      if (departed) { media.pause(); return; } // 나가는 전환 효과음은 pagehide까지 살려 둔다.
      waiting = false; level(.65); render();
    }).catch(function (error) {
      if (token !== serial) return;
      starting = false; media.pause();
      waiting = error.name === 'NotAllowedError'; failed = !waiting;
      render();
    });
  }
  media.addEventListener('loadedmetadata', function () {
    var position = Number(positions[current]);
    if (isFinite(position) && position > 0 && position < media.duration - 2) {
      try { media.currentTime = position; } catch (e) { }
    }
  });
  media.addEventListener('error', function () { if (!prefs.enabled) return; starting = false; failed = true; waiting = false; render(); });
  media.addEventListener('timeupdate', function () { if (Date.now() - lastSave > 2000) { remember(); lastSave = Date.now(); } });
  button.addEventListener('click', function () { showPanel(panel.hidden); });
  ui.querySelector('.sound-close').addEventListener('click', function () { showPanel(false); button.focus(); });
  power.addEventListener('click', function () {
    if (prefs.enabled) { prefs.enabled = false; persist(); pause(); }
    else { prefs.enabled = true; persist(); activate(); cue('confirm'); }
  });
  ui.querySelector('.sound-retry').addEventListener('click', activate);
  select.addEventListener('change', function () { prefs.selection = select.value; persist(); if (prefs.enabled) play(); else render(); cue('select'); });
  volume.addEventListener('input', function () { prefs.volume = +volume.value / 100; persist(); level(); render(); });
  fxVolume.addEventListener('input', function () { prefs.fxVolume = +fxVolume.value / 100; persist(); level(); render(); });
  fxVolume.addEventListener('change', function () { cue('click'); });
  effects.addEventListener('change', function () { prefs.effects = effects.checked; persist(); if (!prefs.effects) stopEffects(); level(); render(); if (prefs.effects) cue('select'); });
  ui.addEventListener('keydown', function (e) {
    // 설정 조작을 표지 입장·페이지 단축키·이미지 넘기기로 전달하지 않는다.
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); showPanel(false); button.focus(); cue('close'); }
  });
  d.addEventListener('click', function (e) { if (!ui.contains(e.target)) showPanel(false); });
  function activate() {
    if (!prefs.enabled || d.hidden || departed) return;
    if (!activated || waiting || failed || (!starting && media.paused) || (context && context.state !== 'running')) {
      activated = true; save(session, 'hb-audio-started', true); play(); level();
    }
  }
  function resumeGesture(e) {
    if (e.type === 'keydown' && (e.repeat || e.metaKey || e.ctrlKey || e.altKey || /^(Tab|Shift|Control|Alt|Meta|Escape)$/.test(e.key))) return;
    // 설정의 끄기 버튼은 재생을 시작했다 곧바로 끄지 않는다.
    if (e.target.closest('.sound-power')) return;
    activate();
  }
  d.addEventListener('click', resumeGesture, true); d.addEventListener('keydown', resumeGesture, true);
  d.addEventListener('visibilitychange', function () { if (d.hidden) pause(); else if (prefs.enabled) play(); });
  addEventListener('pagehide', function () { departed = true; pause(); if (context) context.suspend().catch(function () {}); });
  addEventListener('pageshow', function (e) { if (e.persisted) { departed = false; if (prefs.enabled) play(); } });

  // 모든 새 버튼에도 클릭음이 붙는다. 동작별 소리를 이미 낸 경우 기본음을 겹치지 않는다.
  d.addEventListener('click', function (e) {
    var target = e.target.closest('button, a[href], [role="button"], summary, input[type="checkbox"]');
    if (!target || target.matches(':disabled, [aria-disabled="true"]') || target.closest('[data-sound="off"]') || target.closest('#cover') || target.matches('.v-close')) return;
    var before = cueSerial;
    setTimeout(function () { if (cueSerial === before && !departed) cue(target.matches('.sound-close') ? 'close' : 'click'); }, 0);
  }, true);
  var hoverTarget = null, lastHover = -Infinity, lastPointerMove = -Infinity;
  d.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') lastPointerMove = performance.now(); }, { passive: true });
  d.addEventListener('pointerover', function (e) {
    if (e.pointerType !== 'mouse' || !activated || performance.now() - lastPointerMove > 150 || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var target = e.target.closest('button, a[href], [role="button"], summary');
    if (!target) { hoverTarget = null; return; }
    if (target === hoverTarget || target.contains(e.relatedTarget) || target.matches(':disabled, [aria-disabled="true"]') || target.closest('#cover, [data-sound="off"]')) return;
    hoverTarget = target;
    if (performance.now() - lastHover > 120) { lastHover = performance.now(); cue('hover'); }
  });

  function trackVoice(source, cleanup) {
    voices.push(source);
    source.onended = function () { var index = voices.indexOf(source); if (index >= 0) voices.splice(index, 1); cleanup(); };
  }
  // 필터 노이즈·짧은 비정수 배음으로 종이, 나무, 칼날의 재질을 구분한다.
  function noiseHit(at, duration, frequency, strength, sweep, pan, attack) {
    if (!noise) {
      noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
      var data = noise.getChannelData(0);
      for (var i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    var source = context.createBufferSource(), filter = context.createBiquadFilter(), gain = context.createGain(), stereo = context.createStereoPanner ? context.createStereoPanner() : null;
    source.buffer = noise; filter.type = 'bandpass'; filter.Q.value = .65;
    filter.frequency.setValueAtTime(frequency, at);
    if (sweep) filter.frequency.exponentialRampToValueAtTime(sweep, at + duration);
    gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(strength, at + Math.min(attack || .012, duration / 3));
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(filter); filter.connect(gain);
    if (stereo) {
      stereo.pan.setValueAtTime(Array.isArray(pan) ? pan[0] : pan || 0, at);
      if (Array.isArray(pan)) stereo.pan.linearRampToValueAtTime(pan[1], at + duration);
      gain.connect(stereo); stereo.connect(fxGain);
    } else gain.connect(fxGain);
    trackVoice(source, function () { source.disconnect(); filter.disconnect(); gain.disconnect(); if (stereo) stereo.disconnect(); });
    source.start(at); source.stop(at + duration + .01);
  }
  function tone(at, frequency, duration, strength) {
    var source = context.createOscillator(), gain = context.createGain();
    source.type = 'sine'; source.frequency.setValueAtTime(frequency, at); source.frequency.exponentialRampToValueAtTime(frequency * .7, at + duration);
    gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(strength, at + .004); gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    source.connect(gain); gain.connect(fxGain);
    trackVoice(source, function () { source.disconnect(); gain.disconnect(); });
    source.start(at); source.stop(at + duration + .01);
  }
  function duckMusic(seconds) {
    duckUntil = context.currentTime + seconds;
    var epoch = fxEpoch; level(.08);
    setTimeout(function () { if (fxEpoch === epoch && prefs.enabled && !d.hidden && !departed) { duckUntil = 0; level(.55); } }, seconds * 1000);
  }
  function performCue(kind, elapsed) {
    var at = context.currentTime + .004;
    if (kind === 'entry') {
      if (!entryBuffer) return;
      duckMusic(entryBuffer.duration - elapsed);
      // 실음원 4종을 편집한 검격 마스터. 잠금 해제 지연만큼 파일의 앞을 건너뛴다.
      var strike = context.createBufferSource(); strike.buffer = entryBuffer; strike.connect(fxGain);
      trackVoice(strike, function () { strike.disconnect(); });
      strike.start(at, Math.max(0, elapsed));
    } else if (kind === 'page-aura') {
      noiseHit(at, .31, 500, .34, 3100, [-.4, .4], .03); tone(at + .1, 210, .16, .08);
    } else if (kind === 'page' || kind === 'page-ink') {
      noiseHit(at, .3, 1300, .3, 250, [.3, -.3], .025); noiseHit(at + .08, .2, 350, .13, 800);
    } else if (kind === 'paper' || kind === 'menu') {
      noiseHit(at, .24, 1600, .26, 450, [-.2, .2]); noiseHit(at + .07, .14, 750, .12, 1800);
    } else if (kind === 'cut') {
      noiseHit(at, .12, 1600, .21, 700, [-.15, .15]); tone(at + .03, 240, .055, .07);
    } else if (kind === 'zoom') {
      noiseHit(at, .22, 450, .22, 1600, 0, .04); tone(at + .035, 320, .1, .045);
    } else if (kind === 'close') {
      noiseHit(at, .13, 720, .22, 250); tone(at + .03, 155, .09, .12);
    } else if (kind === 'map') {
      noiseHit(at, .13, 600, .23, 1200); tone(at, 160, .16, .16);
    } else if (kind === 'power' || kind === 'confirm') {
      tone(at, 300, .14, .13); tone(at + .045, 670, .2, .045); noiseHit(at, .065, 950, .19);
    } else if (kind === 'ultimate') {
      noiseHit(at, .25, 600, .33, 2700, [-.25, .25]); tone(at + .06, 120, .21, .19); tone(at + .06, 930, .16, .035);
    } else if (kind === 'hover') {
      noiseHit(at, .035, 1200, .045); tone(at, 350, .035, .018);
    } else { // 클릭, 진영·탭 선택, 모션 감소 입장
      noiseHit(at, .065, kind === 'select' ? 1100 : 700, .22); tone(at, kind === 'select' ? 360 : 220, .075, .13);
    }
  }
  function cue(kind) {
    cueSerial++;
    if (!prefs.enabled || !prefs.effects || !activated || !context || d.hidden || departed || prefs.fxVolume === 0) return;
    var now = performance.now(), prior = cueTimes[kind];
    if (prior != null && now - prior < (kind === 'hover' ? 110 : 45)) return;
    cueTimes[kind] = now;
    var epoch = fxEpoch, outgoing = /^page/.test(kind);
    function emit() {
      if (epoch !== fxEpoch || !prefs.enabled || !prefs.effects || d.hidden || (departed && !outgoing) || context.state !== 'running') return;
      var elapsed = (performance.now() - now) / 1000;
      if (elapsed > (kind === 'entry' ? .3 : .2)) return; // 나중에 풀린 과거 클릭음은 재생하지 않는다.
      performCue(kind, elapsed);
    }
    if (context.state === 'running') emit(); else if (audioReady) audioReady.then(emit).catch(function () {});
  }
  HB.sound = {
    prepareEntry: prepareEntry,
    activate: activate,
    cue: cue,
    scene: function (side) {
      var next = tracks[side] ? side : base;
      if (scene === next) return;
      scene = next;
      if (prefs.selection === 'auto' && prefs.enabled && activated) play(); else render();
    },
    leave: function () { remember(); departed = true; ramp(musicGain, 0, .22); }
  };
  render();
  // 한 번 입장한 세션은 페이지 이동 후에도 이어 듣는다. 새 방문은 첫 동작까지 기다린다.
  if (activated && prefs.enabled) play();
})();
