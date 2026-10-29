// 시작 대화(프롤로그) → assets/prologues.js. 원고는 ../캐릭터 챗/시작 설정/프롤로그(*).md, 글자는 그대로 옮긴다.
// 그림 주소(cjivip.uk/mvs/b/배경, /c/인물컷)는 사이트 안의 파생본(img/bg, img/l)으로 바꾼다. 배경 파생본은 tools/build-bg.ps1.
// 모르는 줄이 나오면 멈춘다(원고가 바뀌어 조용히 빠지는 일이 없게). node tools/build-prologues.cjs
const fs = require('fs'), path = require('path');
const site = path.join(__dirname, '..');
const src = path.join(site, '..', '캐릭터 챗', '시작 설정');
const MODES = { east: '프롤로그(동방측).md', west: '프롤로그(서방측).md', free: '프롤로그(자유모드).md' };   // world.js HB.modes id → 원고

function parse(text, file) {
  const out = [], lines = text.replace(/\r/g, '').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim(); let m;
    if (!l) continue;
    if (l.startsWith('```')) { const body = []; while (++i < lines.length && !lines[i].trim().startsWith('```')) body.push(lines[i].replace(/\s+$/, '')); if (i >= lines.length) throw new Error(file + ': 닫히지 않은 상태창'); out.push({ st: body.join('\n') }); continue; }
    if ((m = /^!\[\]\(https:\/\/cjivip\.uk\/mvs\/b\/([A-Z]+\d+)\.png\)$/.exec(l))) { out.push({ bg: m[1] }); continue; }
    if ((m = /^!\[\]\(https:\/\/cjivip\.uk\/mvs\/c\/([A-Q])_(\d+)\.png\)$/.exec(l))) { out.push({ cut: [m[1], +m[2]] }); continue; }
    if ((m = /^\*\*([^*]+)\*\*｜(.+)$/.exec(l))) { out.push({ who: m[1], say: m[2] }); continue; }
    if ((m = /^\*([^*].*[^*])\*$/.exec(l))) { out.push({ n: m[1] }); continue; }
    throw new Error(file + ' ' + (i + 1) + '줄: 모르는 형식 — ' + l.slice(0, 40));
  }
  return out;
}

const data = {};
for (const id in MODES) {
  const file = MODES[id], text = fs.readFileSync(path.join(src, file), 'utf8');
  const blocks = parse(text, file);
  // 자체 확인: 원고의 글자(서식 기호·그림 주소 제외)가 하나도 빠지지 않았는지
  const strip = s => s.replace(/!\[\]\([^)]*\)/g, '').replace(/```/g, '').replace(/\*\*([^*]+)\*\*｜/g, '$1').replace(/\*/g, '').replace(/\s+/g, '');
  const got = blocks.map(b => b.n || (b.who ? b.who + b.say : '') || b.st || '').join('');
  if (strip(text) !== got.replace(/\s+/g, '')) throw new Error(file + ': 옮긴 글자가 원고와 다르다');
  if (!blocks.some(b => b.bg)) throw new Error(file + ': 배경 그림 없음');
  data[id] = blocks;
  console.log(id.padEnd(5), file, blocks.length + '덩이', blocks.map(b => Object.keys(b)[0]).join(' '));
}
const js = '// 자동 생성: tools/build-prologues.cjs (원고: 캐릭터 챗/시작 설정/프롤로그(*).md). 직접 고치지 말고 원고를 고친 뒤 다시 돌린다.\n' +
  '// 덩이: bg 배경 그림(img/bg) · n 지문 · cut 인물 컷[부호, 번호](img/l) · who/say 대사 · st 상태창\n' +
  'window.HB.prologues = ' + JSON.stringify(data, null, 1) + ';\n';
fs.writeFileSync(path.join(site, 'assets', 'prologues.js'), js);
console.log('assets/prologues.js 작성');
