// Mixkit 원본은 임시 폴더에 두고, 이 사이트의 입장 연출에 맞춘 합성본만 배포한다.
// NODE_PATH에 playwright를 두고 node tools/build-entry-audio.cjs
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require('playwright');
const sources = {
  swing: { id: 2792, title: 'Fast sword whoosh' },
  steel: { id: 2789, title: 'Samurai Sword Impact' },
  heavy: { id: 2795, title: 'Heavy sword smashes metal' },
  fracture: { id: 3208, title: 'Breaking apart' }
};
const cache = process.env.HB_SFX_SOURCE || path.join(os.tmpdir(), 'hb-sword-sources');
const output = path.join(__dirname, '../assets/audio/entry-slash.wav');
function wav(channels, sampleRate) {
  const frames = channels[0].length, data = Buffer.alloc(44 + frames * 4);
  data.write('RIFF'); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8);
  data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(2, 22);
  data.writeUInt32LE(sampleRate, 24); data.writeUInt32LE(sampleRate * 4, 28);
  data.writeUInt16LE(4, 32); data.writeUInt16LE(16, 34); data.write('data', 36);
  data.writeUInt32LE(frames * 4, 40);
  for (let i = 0; i < frames; i++) for (let c = 0; c < 2; c++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, channels[c][i])) * 32767), 44 + (i * 2 + c) * 2);
  return data;
}
(async () => {
  fs.mkdirSync(cache, { recursive: true });
  const encoded = {};
  for (const [key, { id }] of Object.entries(sources)) {
    const file = path.join(cache, id + '.wav');
    if (!fs.existsSync(file)) {
      const response = await fetch(`https://assets.mixkit.co/active_storage/sfx/${id}/${id}.wav`);
      if (!response.ok) throw new Error(`Mixkit ${id}: ${response.status}`);
      fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
    }
    encoded[key] = fs.readFileSync(file).toString('base64');
  }
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage();
    const rendered = await page.evaluate(async encoded => {
      const rate = 44100, duration = 2.5, ctx = new OfflineAudioContext(2, rate * duration, rate);
      const buffers = {};
      for (const [key, base64] of Object.entries(encoded)) {
        const bytes = Uint8Array.from(atob(base64), x => x.charCodeAt(0));
        buffers[key] = await ctx.decodeAudioData(bytes.buffer);
      }
      const bus = ctx.createGain(), highpass = ctx.createBiquadFilter(), compressor = ctx.createDynamicsCompressor();
      highpass.type = 'highpass'; highpass.frequency.value = 38; highpass.Q.value = .5;
      compressor.threshold.value = -13; compressor.knee.value = 5; compressor.ratio.value = 3.5;
      compressor.attack.value = .002; compressor.release.value = .09;
      bus.connect(highpass); highpass.connect(compressor); compressor.connect(ctx.destination);
      function layer(key, at, offset, length, speed, volume, options = {}) {
        const source = ctx.createBufferSource(), gain = ctx.createGain(), pan = ctx.createStereoPanner();
        const original = buffers[key], first = Math.round(offset * rate), count = Math.min(Math.round(length * rate), original.length - first);
        const cut = ctx.createBuffer(2, count, rate);
        for (let c = 0; c < 2; c++) {
          const values = original.getChannelData(c).slice(first, first + count);
          if (options.reverse) values.reverse();
          cut.copyToChannel(values, c);
        }
        source.buffer = cut; source.playbackRate.value = speed;
        const end = at + cut.duration / speed;
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(volume, at + (options.attack || .003));
        gain.gain.setValueAtTime(volume, Math.max(at + .01, end - (options.fade || .08)));
        gain.gain.linearRampToValueAtTime(0, end);
        pan.pan.setValueAtTime(options.pan?.[0] || 0, at);
        pan.pan.linearRampToValueAtTime(options.pan?.[1] || 0, end);
        source.connect(gain);
        if (options.lowpass) {
          const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = options.lowpass; filter.Q.value = .6;
          gain.connect(filter); filter.connect(pan);
        } else gain.connect(pan);
        pan.connect(bus); source.start(at); source.stop(end + .005);
      }
      // 준비 → 350ms 칼날 → 650ms 섬광/충격 → 1130ms 화면 분리.
      layer('swing', .13, 0, .12, .55, .18, { reverse: true, attack: .09, pan: [-.2, -.4] });
      layer('swing', .35, 0, .14, .64, .95, { pan: [-.5, .5], fade: .07 });
      layer('swing', .36, 0, .14, .42, .55, { lowpass: 2200, pan: [-.2, .25] });
      layer('steel', .61, .087, .8, 1.05, .94, { fade: .17 });
      layer('heavy', .61, .105, 1.0, .78, .72, { lowpass: 3600, fade: .28 });
      layer('fracture', 1.13, .08, .91, .82, .65, { pan: [-.15, .35], fade: .22 });
      layer('heavy', 1.13, .10, .5, .55, .3, { lowpass: 650, fade: .3 });
      layer('fracture', 1.48, .42, .4, 1.25, .19, { pan: [.4, -.35], fade: .15 });
      const buffer = await ctx.startRendering();
      const channels = [buffer.getChannelData(0), buffer.getChannelData(1)];
      let peak = 0;
      for (const channel of channels) for (const value of channel) peak = Math.max(peak, Math.abs(value));
      const scale = .89 / peak, windows = [];
      for (const channel of channels) for (let i = 0; i < channel.length; i++) {
        const tail = Math.max(0, Math.min(1, (duration - i / rate) / .18));
        channel[i] *= scale * tail;
      }
      for (const [name, from, to] of [['swing', .35, .6], ['impact', .65, 1.05], ['split', 1.13, 1.9]]) {
        let energy = 0, n = 0;
        for (const channel of channels) for (let i = Math.floor(from * rate); i < to * rate; i++) { energy += channel[i] ** 2; n++; }
        windows.push({ name, rms: Math.sqrt(energy / n) });
      }
      return { sampleRate: rate, duration, peak: .89, windows, channels: channels.map(x => Array.from(x)) };
    }, encoded);
    fs.writeFileSync(output, wav(rendered.channels, rendered.sampleRate));
    delete rendered.channels;
    console.log(JSON.stringify({ output, bytes: fs.statSync(output).size, ...rendered }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
