// node tools/serve.js 8788 실행 후: NODE_PATH에 playwright를 두고 node tools/test-audio.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.HB_TEST_URL || 'http://localhost:8788';
const output = process.env.HB_TEST_OUTPUT || path.join(require('node:os').tmpdir(), 'hb-audio-review');
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--autoplay-policy=user-gesture-required'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
    await context.addInitScript(() => {
      window.__fxStarts = 0;
      for (const type of [AudioBufferSourceNode, OscillatorNode]) {
        const original = type.prototype.start;
        type.prototype.start = function (...args) { window.__fxStarts++; return original.apply(this, args); };
      }
    });
    const page = await context.newPage(), errors = [], audioRequests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (r.url().endsWith('.mp3')) audioRequests.push(r.url()); });
    const state = () => page.locator('audio').evaluate(a => ({ paused: a.paused, time: a.currentTime, duration: a.duration, src: a.currentSrc }));
    const playing = () => page.waitForFunction(() => { const a = document.querySelector('audio'); return !a.paused && a.currentTime > .2 && document.querySelector('.sound-button').dataset.on === 'true'; });
    const panel = async () => { if (!(await page.locator('#sound-panel').isVisible())) await page.locator('.sound-button').click(); };
    await page.goto(base + '/index.html', { waitUntil: 'load' });
    assert.equal(audioRequests.length, 0, '첫 동작 전 MP3 요청 없음');
    await page.locator('.sound-button').click();
    await page.locator('#sound-track').focus(); await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('#cover').count(), 1, '설정 키보드 조작이 표지를 열면 안 됨');
    await page.selectOption('#sound-track', 'auto');
    await playing();
    const first = await state(); assert(first.duration > 30); assert(first.src.endsWith('red-cloth.mp3'));
    await page.screenshot({ path: path.join(output, 'desktop.png') });
    await page.locator('#sound-volume').evaluate(el => { el.value = '20'; el.dispatchEvent(new Event('input', { bubbles: true })); });
    assert.equal(await page.locator('output[for="sound-volume"]').textContent(), '20%');
    await page.locator('#sound-effects').uncheck();
    let count = await page.evaluate(() => __fxStarts);
    await page.evaluate(() => HB.sound.cue('paper'));
    assert.equal(await page.evaluate(() => __fxStarts), count, '효과음 끄기');
    await page.locator('#sound-effects').check();
    await page.evaluate(() => HB.sound.cue('paper'));
    assert((await page.evaluate(() => __fxStarts)) > count, '효과음 켜기');
    await page.selectOption('#sound-track', 'west'); await playing();
    assert((await state()).src.endsWith('valtrock.mp3'));
    await page.selectOption('#sound-track', 'east'); await playing();
    assert((await state()).src.endsWith('tianmen.mp3'));
    // 빠른 연속 선택에서는 최종 곡만 남는다.
    await page.selectOption('#sound-track', 'west'); await page.selectOption('#sound-track', 'main'); await page.selectOption('#sound-track', 'east'); await playing();
    assert((await state()).src.endsWith('tianmen.mp3'));
    await page.selectOption('#sound-track', 'auto'); await playing();
    await page.locator('.sound-close').click();
    await page.waitForFunction(() => document.querySelector('#cover').classList.contains('ready'), { timeout: 20000 });
    await page.locator('[data-enter]').click();
    await page.waitForFunction(() => !document.querySelector('#cover'));
    await page.locator('.toggle[data-pick="east"]').click(); await playing();
    assert((await state()).src.endsWith('tianmen.mp3'), '동방 선택 → 천문관');
    await page.locator('.toggle[data-pick="west"]').click(); await playing();
    assert((await state()).src.endsWith('valtrock.mp3'), '서방 선택 → 발트로크');
    await page.locator('audio').evaluate(a => { a.currentTime = 32; });
    await page.locator('.top a[href="characters-west.html"]').click();
    await page.waitForURL('**/characters-west.html');
    assert((await state()).src.endsWith('valtrock.mp3'), '새 페이지에서도 곡 이어 듣기를 시도');
    // 엄격한 자동 재생 정책은 새 문서마다 다시 사용자 동작을 요구할 수 있다.
    await panel();
    await playing();
    assert((await state()).time >= 31, '페이지 이동 후 같은 곡 재생 위치 복구');
    assert.equal(await page.locator('#sound-volume').inputValue(), '20', '볼륨 유지');
    await page.locator('.sound-close').click();
    // 화면을 떠나면 정지하고, 돌아오면 사용자 설정을 보존한다.
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
    assert((await state()).paused);
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); });
    await playing();
    await page.setViewportSize({ width: 390, height: 844 }); await panel();
    await page.screenshot({ path: path.join(output, 'mobile.png') });
    let bounds = await page.locator('#sound-panel').boundingBox(); assert(bounds.x >= 0 && bounds.x + bounds.width <= 390);
    assert(bounds.y >= 0 && bounds.y + bounds.height <= 844, '패널 세로 범위');
    await page.keyboard.press('Escape'); assert.equal(await page.locator('#sound-panel').isVisible(), false);
    assert.equal(await page.locator('.sound-button').evaluate(el => el === document.activeElement), true);
    await panel(); await page.locator('.sound-power').click(); assert((await state()).paused);
    await page.locator('.sound-power').click(); await playing();
    await page.locator('.sound-power').click(); assert((await state()).paused);
    await page.reload(); assert((await state()).paused);
    assert.equal(await page.locator('.sound-button').getAttribute('data-on'), 'false', '음소거 유지');
    // 네트워크 오류에서도 조작과 재시도가 가능해야 한다.
    await page.route('**/*.mp3', route => route.abort()); await panel();
    await page.selectOption('#sound-track', 'main'); await page.locator('.sound-power').click();
    await page.locator('.sound-retry').waitFor({ state: 'visible' });
    await page.unroute('**/*.mp3');
    await page.locator('.sound-retry').click(); await playing();
    // 나머지 페이지도 공통 조작부를 빠뜨리지 않았는지 확인.
    for (const file of ['characters-east.html', 'fronts.html', 'order.html', 'start.html']) {
      await page.goto(base + '/' + file); assert.equal(await page.locator('.sound-button').count(), 1);
    }
    assert.deepEqual(errors, []);
    const blocked = await browser.newContext({ viewport: { width: 320, height: 640 } });
    await blocked.addInitScript(() => localStorage.setItem('hb-audio', JSON.stringify({ enabled: true, volume: .15, selection: 'auto' })));
    const fresh = await blocked.newPage();
    await fresh.goto(base + '/index.html?in');
    assert.equal(await fresh.locator('audio').evaluate(a => a.paused), true);
    await fresh.locator('.sound-button').click();
    await fresh.waitForFunction(() => document.querySelector('.sound-button').dataset.on === 'true');
    bounds = await fresh.locator('#sound-panel').boundingBox(); assert(bounds.x >= 0 && bounds.x + bounds.width <= 320);
    assert(bounds.y >= 0 && bounds.y + bounds.height <= 640, '작은 모바일 세로 범위');
    await blocked.close();
    const privateMode = await browser.newContext();
    await privateMode.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }));
    const privatePage = await privateMode.newPage();
    await privatePage.goto(base + '/index.html?in');
    await privatePage.locator('.sound-button').click();
    await privatePage.waitForFunction(() => document.querySelector('.sound-button').dataset.on === 'true');
    await privateMode.close();
    const range = await page.request.get(base + '/assets/audio/tianmen.mp3', { headers: { Range: 'bytes=0-99' } });
    assert.equal(range.status(), 206); assert.equal((await range.body()).length, 100);
    const report = { passed: true, firstTrackDuration: first.duration, tested: ['첫 동작 전 무음/지연 로딩', '설정 키보드와 입장 분리', '3곡 재생/빠른 곡 전환', '효과음 토글', '진영 자동 선곡', '페이지 간 재생 위치/볼륨/무음 유지', '비활성 탭 정지', '320px·390px 모바일/ESC/포커스', '음원 실패 후 재시도', '자동 재생 차단 후 사용자 동작으로 재개', '저장소 차단 환경', '6페이지 연결', 'HTTP Range'], errors };
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
