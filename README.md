# 검과 마나의 경계 — 소개 사이트

무협 vs 중세 판타지 전면전 작품 「검과 마나의 경계」의 소개 사이트. 정적 HTML/CSS/JS, GitHub Pages 배포.

## 화면
- `characters.html` — 인물 선택. 진영 필터, 명단, 큰 이미지. 주소 해시(`#A`)로 선택 인물 공유
- `char.html?c=A` — 인물 상세. 13개 장면 분류 × 컷 전환, 전체 보기, 등장 카드 감상, 원고/설정/관계 탭. 해시(`#16`)로 컷 공유
- `index.html` — 홈이 생기기 전까지 인물 화면으로 보낸다

## 구조
- `assets/data.js` — 17인 데이터(설정집 기준). 원고 문구는 넣지 않고 슬롯으로 둔다
- `assets/style.css`, `assets/main.js` — 공통 스타일·동작
- `img/l` 큰 이미지(가로 1600) · `img/t` 썸네일(가로 400) · `img/card` 등장 카드. `tools/build-images.ps1`로 원본에서 생성
- `tools/serve.js` — 로컬 확인용 정적 서버 (`node tools/serve.js`)

기획: 작업 폴더의 `웹사이트 기획/검과 마나의 경계 — 소개 사이트 제작 기획.md`
