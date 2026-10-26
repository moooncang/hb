// 로컬 확인용 정적 서버: node tools/serve.js [port]
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), port = +process.argv[2] || 8787;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };
http.createServer((req, res) => {
  let p = path.normalize(path.join(root, decodeURIComponent(req.url.split('?')[0])));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    const headers = { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' };
    // 음원 중간 재개와 탐색을 실제 배포와 같은 byte range로 확인한다.
    if (path.extname(p) === '.mp3') {
      headers['Accept-Ranges'] = 'bytes';
      const range = req.headers.range;
      if (range) {
        const m = /^bytes=(\d*)-(\d*)$/.exec(range);
        const start = m && m[1] ? +m[1] : m && m[2] ? Math.max(0, buf.length - +m[2]) : 0;
        const end = m && m[1] && m[2] ? Math.min(+m[2], buf.length - 1) : buf.length - 1;
        if (!m || (!m[1] && !m[2]) || start > end || start >= buf.length) {
          res.writeHead(416, { ...headers, 'Content-Range': 'bytes */' + buf.length }); return res.end();
        }
        res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${buf.length}`, 'Content-Length': end - start + 1 });
        return res.end(buf.subarray(start, end + 1));
      }
    }
    res.writeHead(200, { ...headers, 'Content-Length': buf.length });
    res.end(buf);
  });
}).listen(port, () => console.log('http://localhost:' + port));
