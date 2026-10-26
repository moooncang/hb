// 실제 UI 동작으로 Web Audio 출력과 검격 시각표·중복 재생·음소거를 검증한다.
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
    const proof = [], errors = [], checks = [];
    await context.exposeBinding('fxProof', (_source, event) => proof.push(event));
    const instrument = () => {
      window.__starts = []; window.__fxPeak = 0; window.__buses = [];
      const connect = AudioNode.prototype.connect;
      AudioNode.prototype.connect = function (destination, ...args) {
        if (this instanceof GainNode && destination === this.context.destination) {
          const analyser = this.context.createAnalyser(); analyser.fftSize = 2048;
          __buses.push(analyser); connect.call(analyser, destination);
          return connect.call(this, analyser, ...args);
        }
        return connect.call(this, destination, ...args);
      };
      for (const type of [AudioBufferSourceNode, OscillatorNode]) {
        const start = type.prototype.start;
        type.prototype.start = function (...args) {
          const event = { page: location.pathname, delay: (args[0] || 0) - this.context.currentTime, at: performance.now(), duration: this.buffer?.duration || 0, offset: args[1] || 0 };
          __starts.push(event); window.fxProof(event); return start.apply(this, args);
        };
      }
      function sample() {
        const analyser = __buses[1];
        if (analyser) {
          const data = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(data);
          for (const value of data) __fxPeak = Math.max(__fxPeak, Math.abs(value));
        }
        requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);
    };
    await context.addInitScript(instrument);
    const page = await context.newPage(); page.on('pageerror', e => errors.push(e.stack));
    await page.goto(base + '/index.html');
    await page.waitForFunction(() => document.querySelector('#cover').classList.contains('ready'));
    assert.equal(await page.locator('audio').evaluate(a => a.currentSrc), '');
    await page.locator('[data-enter]').click();
    await page.waitForFunction(() => __fxPeak > .015);
    const entry = await page.evaluate(() => ({ starts: __starts }));
    assert.equal(entry.starts.length, 1, '검격 실음원 마스터 한 번 재생');
    assert.equal(entry.starts[0].duration, 2.5, '합성 노이즈 대신 편집한 WAV를 재생');
    assert(entry.starts[0].offset < .3, '오디오 활성화 지연만큼 시각표 보정');
    await page.waitForFunction(() => !document.querySelector('#cover'));
    entry.peak = await page.evaluate(() => __fxPeak);
    assert(entry.peak > .4, '기본 볼륨에서도 검격의 충격이 충분히 출력되어야 함');
    assert(entry.peak < .98, '검격 효과음이 출력 범위를 넘지 않아야 함');
    checks.push('첫 입장 클릭: 실제 검격 WAV 출력·시각표 보정·출력 레벨');
    async function action(selector, expected, label, key = 'Enter') {
      await page.locator(selector).first().focus();
      await page.evaluate(() => { __starts = []; __fxPeak = 0; });
      await page.keyboard.press(key);
      await page.waitForFunction(() => __starts.length > 0);
      // 기본 클릭음과 전용음이 겹치지 않았는지 이벤트 처리가 끝난 뒤 확인.
      await page.waitForTimeout(90);
      const count = await page.evaluate(() => __starts.length);
      assert.equal(count, expected, label + ' 중복 재생'); checks.push(label);
    }
    await action('.menu-btn', 2, '메뉴 열기'); await action('.menu-x', 2, '메뉴 닫기');
    await action('.toggle[data-pick="east"]', 2, '진영 선택');
    const hoverBox = await page.locator('.sound-button').boundingBox();
    await page.mouse.move(hoverBox.x - 30, hoverBox.y + hoverBox.height / 2);
    await page.evaluate(() => { __starts = []; });
    await page.mouse.move(hoverBox.x + hoverBox.width / 2, hoverBox.y + hoverBox.height / 2, { steps: 4 });
    await page.waitForFunction(() => __starts.length > 0);
    assert.equal(await page.evaluate(() => __starts.length), 2, '마우스 접근 시 짧은 호버음 한 번');
    checks.push('실제 포인터 이동에만 호버음');
    await action('.sound-button', 2, '일반 버튼 클릭');
    await page.locator('#sound-volume').evaluate(el => { el.value = '0'; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await action('.sound-close', 2, '사운드 설정 닫기');
    await action('.toggle[data-pick="west"]', 2, '음악 0%에서도 효과음 재생');
    assert((await page.evaluate(() => __fxPeak)) > .001);
    // 일반 페이지 링크가 전환 함수를 거치는지 이전 문서의 source.start 증거로 확인.
    const before = proof.length;
    await page.locator('.top a[href="characters-west.html"]').focus(); await page.keyboard.press('Enter');
    await page.waitForURL('**/characters-west.html');
    assert(proof.slice(before).some(x => x.page.endsWith('/index.html')), '본문/메뉴 링크의 나가는 전환음');
    checks.push('일반 링크의 페이지 전환음');
    await action('.doc[data-open="G"]', 2, '인물 기록 열기');
    await page.waitForFunction(() => document.querySelector('.viewer').classList.contains('in'));
    await action('.v-arrow.next', 2, '다음 컷');
    await action('.sc-cats button:nth-child(2)', 2, '컷 카테고리');
    await action('.sc-cuts button', 2, '컷 썸네일');
    await action('.v-full', 2, '원본 확대'); await action('.lightbox .x', 2, '원본 닫기');
    await action('.v-card', 2, '등장 카드 확대'); await action('.lightbox .x', 2, 'Esc로 확대 닫기', 'Escape');
    await action('.ult-pic[data-n="20"]', 3, '필살기 선택');
    await action('.v-next', 2, '다음 인물');
    await action('.v-close', 2, '기록 닫기'); await page.locator('.viewer').waitFor({ state: 'hidden' });
    await page.goto(base + '/fronts.html');
    await action('.pins [data-front="north"]', 2, '지도 표식');
    await action('.fr-list [data-front="center"]', 2, '전선 목록');
    await page.goto(base + '/order.html');
    await action('[data-fa="murim"]', 2, '세력 선택');
    await action('[data-pw]', 3, '경지·등급 선택');
    await page.goto(base + '/start.html');
    await action('.mode[data-mode="east"]', 3, '시작 모드');
    await action('.sound-button', 2, '사운드 버튼');
    await page.locator('#sound-effects').uncheck();
    await page.locator('.sound-close').click();
    await page.evaluate(() => { __starts = []; });
    await page.locator('.mode[data-mode="west"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => __starts.length), 0, '효과음 끄기를 모든 동작에 적용');
    await page.locator('.sound-button').click(); await page.locator('#sound-effects').check();
    await page.locator('.sound-power').click(); await page.reload();
    await page.locator('.mode[data-mode="east"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => __starts.length), 0, '명시적 음소거를 다음 페이지에서도 유지');
    checks.push('효과음 끄기·전체 음소거 유지');
    const reduced = await browser.newContext({ reducedMotion: 'reduce' });
    const rp = await reduced.newPage(); await rp.goto(base + '/index.html');
    await rp.waitForFunction(() => document.querySelector('#cover').classList.contains('ready'));
    await rp.locator('[data-enter]').click(); await rp.waitForFunction(() => !document.querySelector('#cover'));
    await rp.waitForFunction(() => !document.querySelector('audio').paused);
    await reduced.close(); checks.push('모션 감소 입장');
    for (const input of ['keyboard', 'touch']) {
      const fresh = await browser.newContext(input === 'touch' ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : {});
      await fresh.exposeBinding('fxProof', () => {}); await fresh.addInitScript(instrument);
      const fp = await fresh.newPage(); fp.on('pageerror', e => errors.push(e.stack));
      await fp.goto(base + '/index.html');
      await fp.waitForFunction(() => document.querySelector('#cover').classList.contains('ready'));
      if (input === 'touch') await fp.locator('[data-enter]').tap(); else await fp.keyboard.press('Enter');
      await fp.waitForFunction(() => __fxPeak > .015);
      assert.equal(await fp.evaluate(() => __starts.length), 1, input + ' 첫 동작 검격');
      assert.equal(await fp.evaluate(() => __starts[0].duration), 2.5, input + ' 실제 음원 버퍼');
      await fp.waitForFunction(() => !document.querySelector('#cover'));
      if (input === 'touch') {
        await fp.evaluate(() => { __starts = []; });
        await fp.locator('.menu-btn').tap();
        assert.equal(await fp.evaluate(() => __starts.length), 2, '터치에 호버음이 겹치지 않음');
      }
      await fresh.close(); checks.push(input === 'touch' ? '모바일 첫 터치 검격·메뉴' : '키보드 첫 입장 검격');
    }
    assert.deepEqual(errors, []);
    const report = { passed: true, entryPeak: entry.peak, entryMasterDuration: entry.starts[0].duration, entryPlaybackCount: entry.starts.length, checks, errors };
    fs.writeFileSync(path.join(output, 'effects-results.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
