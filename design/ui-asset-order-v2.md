# 검과 마나의 경계 사이트 그림 납품요구서 v2 — 자리별 고정 크기 + 입장 연출

작성 2026-10-25 · 의뢰 문창놈 · 대상 사이트 https://moooncang.github.io/hb/

v1(`ui-asset-order.md`)의 부품을 사이트가 9분할로 늘려 쓰면서 붓끝·석재 끝이 찌그러졌다. v2는 **쓰이는 자리마다 그 자리의 정확한 비율·크기로 그림을 하나씩** 주문한다. 사이트는 이 그림을 **늘리지 않고 정확히 1/2 크기(고해상도 화면 대응)로만** 놓는다. 모바일에서도 비율을 지킨 채 균일 축소만 한다. 글자는 각 항목의 「글자 영역」에만 얹는다.

v1의 §0 그림체 기준·참고 그림·공통 프롬프트 머리·금지 사항·§1 납품 규격(PNG 투명, 정면 평면, 상태별 동일 위치, 글자 없음)은 그대로 적용한다. 아래 항목은 전부 **새로** 만든다(v1 파일을 늘려 쓰지 않는다). 납품 위치 `design/incoming-v2/`, 파일명 그대로.

v1에서 그대로 쓰는 것(비율 그대로 균일 축소만 하므로 재납품 불필요): `title-plate.png`, `seal-east.png`, `emblem-west.png`, `frame-east.png`, `frame-west.png`, `fa-*.png` 13종, `icon-*.png`, `btn-round-*.png`, `pin-*.png`, `step-*.png`, `thumb-*.png`, `mark-*.png`, `divider-*.png`, `seam-band.png`, `menu-*.png`(전체 메뉴, 420×100으로 균일 축소), `prologue-*.png`(700×200), `mode-*.png`, `key-visual*.png`, `front-map.png`, `neutral-placeholder.png`, `tex-*.png`, `power-*.png`, `viewer-backdrop.png`, `menu-backdrop.png`.

---

## 1. 입장 연출 — 달을 감싼 월마의 기운, 아르델의 오러 검격

화면 구성(사이트가 조립): 어두운 먹빛 바탕 가운데 **달(C-01)**. 달 둘레를 **월마의 기운 고리 세 겹(C-02·C-03·C-05)**이 서로 다른 속도로 천천히 돈다. 바깥은 시계 방향, 안쪽은 반대 방향. 뒤에는 **기운 번짐(C-04)**이 숨 쉬듯 밝아졌다 어두워진다. 달 아래에 타이틀판(`title-plate.png`)과 「아무 키나 누르거나 화면을 눌러 입장」. 누르면 **아르델의 오러 검격(C-06)**이 오른쪽 위에서 왼쪽 아래로 화면을 단칼에 긋고, 그 선을 따라 **섬광(C-07)**이 터지며 화면이 두 조각으로 갈라져(사이트가 자름) 양쪽으로 밀려나고, 베인 틈(C-08)의 금빛이 남은 채 장면 페이지가 드러난다.

### C-01 달 (투명)
- 파일 `cover-moon.png` 1200×1200. 화면 표시 지름 약 600
- 지름 1000의 둥근 달이 캔버스 가운데. 창백한 회백에 옅은 먹 얼룩, 가장자리에 아주 옅은 붉은 기(월식의 기운이 번진 것처럼). 달 바깥은 완전 투명. 글자·문양 없음
```
EAST. A large pale moon disc centered on a transparent canvas, grey-white with faint ink-wash blotches like a mineral paper surface, a very thin reddish haze creeping along the rim as if an eclipse is beginning, soft but crisp edge, no craters drawn realistically, no text. Transparent background.
```

### C-02 월마의 기운 · 바깥 고리 (투명)
- 파일 `cover-ring-outer.png` 1600×1600. 사이트가 60초에 한 바퀴 천천히 돌린다
- 캔버스 중심의 **반지름 640~790 띠** 안에만 그림. 안쪽(달 자리)과 바깥은 완전 투명
- 검붉은 먹 기운이 **시계 방향으로 흐르는 초승달꼴 획** 여러 개가 띠를 따라 이어진 모양. 위·아래 구분이 없어야 하고(어느 각도로 돌려도 같은 인상), 획이 한 군데에 뭉치지 않는다. 붉은 기는 주사(#C0392B)와 검은 먹이 섞인 농담
```
EAST. A circular ring band only (inner radius 640px, outer radius 790px on a 1600px canvas), made of dark ink energy strokes shaped like thin crescents flowing clockwise around the ring, ink black blending into cinnabar red, uneven brush density but no single heavy cluster, radially uniform so it reads the same at any rotation. Everything inside and outside the band fully transparent. No text, no moon.
```

### C-03 월마의 기운 · 안쪽 고리 (투명)
- 파일 `cover-ring-inner.png` 1600×1600. 반대 방향으로 40초에 한 바퀴
- **반지름 540~620 띠**. 바깥 고리보다 가늘고 획이 더 날카로움. 붉은 기 조금 더 진함
```
EAST. A thinner circular ring band only (inner radius 540px, outer radius 620px on a 1600px canvas) of sharp ink-red energy streaks flowing counterclockwise, cinnabar red slightly stronger than black, radially uniform, fully transparent inside and outside the band. No text.
```

### C-04 기운 번짐 (투명)
- 파일 `cover-glow.png` 1600×1600. 사이트가 6초 주기로 투명도를 0.4↔0.9로 숨 쉬게 한다
- 중심에서 바깥으로 부드럽게 사라지는 검붉은 안개. 반지름 400 안쪽은 비우고(달 자리) 450~800에서 가장 진하다가 가장자리에서 투명으로
```
EAST. A soft radial haze of dark red-black ink mist on a transparent canvas: clear in the center (radius 400px), densest between radius 450 and 800, fading to fully transparent at the edge. No hard edges, no text.
```

### C-05 기운 조각 (투명)
- 파일 `cover-sparks.png` 1600×1600. 가장 느리게(90초) 돈다
- 띠 **반지름 600~900** 사이에 흩어진 작은 검붉은 먹점·불티 30~40개. 크기 제각각, 드문드문. 다른 곳 투명
```
EAST. About thirty to forty small scattered ink-red sparks and ink dots of varied sizes floating between radius 600 and 900 on a 1600px transparent canvas, sparse and irregular, nothing in the center. No text.
```

### C-06 아르델의 오러 검격 (투명)
- 파일 `cover-slash.png` 3000×1200. 사이트가 화면 대각선(오른쪽 위→왼쪽 아래, 약 35도)으로 기울여 0.35초 만에 지나가게 한다
- 캔버스를 **왼쪽 끝에서 오른쪽 끝까지 가로지르는 수평 한 줄기 검격**(사이트가 기울인다). 중심선은 흰빛에 가까운 금빛, 바깥으로 금색 오러 깃털이 흩날리고, 진행 방향(오른쪽) 끝은 날카롭게, 뒤(왼쪽)는 길게 흐려지는 꼬리. 오러 색은 낮은 채도 금(#9C8449)에서 밝은 금백(#F3E6B0)까지. 검 자체·인물은 그리지 않는다
```
WEST. A single horizontal aura sword-slash streak spanning the full width of a 3000x1200 transparent canvas: a razor-thin white-gold core line, flanked by feathered golden aura flames that trail off toward the left, the right tip sharp and bright, muted gold (#9C8449) to bright gold-white (#F3E6B0). No sword, no figure, no text. Transparent background.
```

### C-07 검격 섬광 (투명)
- 파일 `cover-flash.png` 1400×1400. 검격이 지나는 순간 중앙에서 0.25초 터졌다 사라짐
- 중심 흰빛 금, 바깥으로 금빛 광선 몇 가닥이 뻗고 가장자리는 투명
```
WEST. A radial burst of white-gold light with a few sharp golden rays on a transparent canvas, bright center fading to fully transparent edges. No text.
```

### C-08 베인 틈 (투명)
- 파일 `cover-cut.png` 3000×160. 갈라진 두 조각 사이에 남는 금빛 틈. 사이트가 35도로 기울인다
- 가로로 긴 가는 금빛 선. 가운데가 가장 밝고 양끝으로 사라짐. 선 둘레에 미세한 금가루
```
WEST. A long thin horizontal line of glowing gold with faint gold dust along it on a 3000x160 transparent canvas, brightest at the center, fading at both ends. No text.
```

---

## 2. 홈 타이틀 화면 (자리별 고정 크기)

화면: 오른쪽에 대표 인물 원화(위지란/아르델) 전면, 왼쪽 열에 타이틀판 → 시작 시점 → 타이틀 메뉴 4장 → 진영 토글 → 세력 판. 원화 오른쪽 아래에 이름표.

### H-01 타이틀 메뉴 명패 (투명) — 2종 × 2상태
- 파일 `tmenu-east-idle.png` `tmenu-east-hover.png` / `tmenu-west-idle.png` `tmenu-west-hover.png` 각 **800×120**. 표시 400×60
- 글자 영역 x 150~650, y 26~94 (사이트가 「인물」「전선」 등을 얹음). 동방: 종이 명패, 왼쪽 끝 먹획·오른쪽 끝 붓끝. 서방: 석판 명패, 양끝 은 테와 작은 아치 리벳. hover는 동방 주사색 점 하나·서방 금 선
- **4장 같은 크기**이므로 한 종류 그림을 네 자리에 쓴다

### H-02 진영 토글 (투명) — 서방·동방 × idle/active
- 파일 `toggle-west-idle.png` `toggle-west-active.png` / `toggle-east-idle.png` `toggle-east-active.png` 각 **320×112**. 표시 160×56
- 글자 영역 x 70~250. 서방 석판·동방 먹종이. active는 테가 밝아지고 동방은 낙관 점·서방은 금 선

### H-03 대표 인물 이름표 (투명) — 2종
- 파일 `hero-name-east.png` **720×160**(글자 영역 x 150~660, 왼쪽에 먹획), `hero-name-west.png` **720×160**(글자 영역 x 60~520, 오른쪽에 방패). 표시 360×80
- 가장 긴 이름 「발데마르 폰 가르데온」(10자)이 들어가는 폭

### H-04 세력 판 (불투명) — 2종
- 파일 `hero-panel-east.png` `hero-panel-west.png` 각 **760×560**. 표시 380×280
- 동방: 회백 종이 판, 가장자리 먹선·모서리 붓 번짐. 서방: 석회색 석판, 은 테·모서리 징. 안쪽 **x 40~720, y 40~520 은 균일한 면**(세력 문장·이름·인물 칩이 올라감)

### H-05 전황 띠 칸 (불투명) — 1종
- 파일 `status-cell.png` **600×200**. 표시 300×100. 네 전선 칸에 같은 그림
- 먹빛 어두운 종이 판, 가는 석재 테. 안쪽 균일. 글자 영역 x 80~560

### H-06 얼굴 띠 액자 (투명 중앙) — 2종
- 파일 `face-frame-east.png`(먹획 두 획이 모서리를 감쌈) `face-frame-west.png`(아치 상단·은 테) 각 **240×240**, 안쪽 200×200 투명. 표시 120×120

---

## 3. 공통 부품 (자리별 고정 크기)

### B-01 주 버튼 — 3종 × 3상태
- 파일 `btn2-east-{idle,hover,press}.png` / `btn2-west-…` / `btn2-gray-…` 각 **480×132**. 표시 240×66
- 쓰이는 곳: 입장하기, 상세 보기, 전선 선택 4개(북부·중앙·단층곡·남부), 작품으로 이동
- 글자 영역 x 90~390, y 30~102. 재질은 v1 A-01~03과 같되 **이 비율로 새로 그림**

### B-02 작은 버튼 — gray × 2상태
- 파일 `btn2-sm-{idle,hover}.png` **320×92**. 표시 160×46. 글자 영역 x 50~270
- 쓰이는 곳: 원본 전체, 등장 카드

### B-03 칩 — 3종 × 2상태
- 파일 `chip2-east-{idle,active}.png` / `chip2-west-…` / `chip2-gray-…` 각 **240×72**. 표시 120×36. 글자 영역 x 30~210
- 쓰이는 곳: 상태 분류 13개(첫등장·평소·기쁨…), 탐색 범위 4개. 「부끄러움」「기운 방출」 5자가 들어가는 폭

### B-04 이름패 — 2종
- 파일 `name2-east.png`(글자 영역 x 170~820, 왼쪽 먹획) `name2-west.png`(글자 영역 x 70~700, 오른쪽 방패) 각 **900×172**. 표시 450×86
- 쓰이는 곳: 인물 군상 17장, 확장 감상 머리. 10자 이름이 들어가는 폭

### B-05 세력 목록 띠 — 2종 × 2상태
- 파일 `list2-east-{idle,active}.png` `list2-west-{idle,active}.png` 각 **760×112**. 표시 380×56
- 동방: 글자 영역 x 40~600, 오른쪽 끝에 문장 자리(원 110) 비움. 서방: 왼쪽 끝 문장 자리, 글자 영역 x 160~720
- 회색지대(쌍등객잔)는 `btn2-gray`를 쓴다

### B-06 정보판 (불투명, 안쪽 균일)
- P-01 전선 정보판 `panel2-front-tall.png` **880×1200**(표시 440×600) — 먹빛 종이 + 가는 석재 테
- P-02 세력·체계 정보판 `panel2-east-wide.png` `panel2-west-wide.png` `panel2-gray-wide.png` 각 **1600×640**(표시 800×320)
- P-03 세계 판(홈) `sheet2-east.png` `sheet2-west.png` 각 **1200×760**(600×380), `panel2-front-wide.png` **2560×520**(1280×260)
- P-04 원고 종이·석판(감상 설정·관계) `paper2-east.png` `slab2-west.png` 각 **1200×1400**(600×700)
- P-05 전선 하단 판 3종 `panel2-east-mid.png` `panel2-west-mid.png` `panel2-front-mid.png` 각 **880×760**(440×380)
- P-06 호칭 판 `panel2-west-short.png` `panel2-east-short.png` 각 **1200×360**(600×180)
- P-07 상성·관계 단계 판 `panel2-front-box.png` `panel2-east-box.png` 각 **1200×560**(600×280)
- 모든 판: 테 두께 20~40px 안쪽은 **균일한 면**. 동방 = 회백 종이·먹선, 서방 = 석회색 석판·은 테, front = 먹빛 종이·가는 석재 테

### B-07 감상 무대 틀 (투명 중앙) — 2종
- 파일 `stage-frame-east.png` `stage-frame-west.png` 각 **2384×1040**, 안쪽 2304×960 투명(인물 컷 비율). 표시 1192×520
- 첫등장(1856×1280) 컷에는 v1 `frame-east/west.png`를 쓴다

---

## 4. 페이지 전환 효과 (투명)

- T-01 먹 번짐 마스크 `wipe-ink-1.png` `wipe-ink-2.png` `wipe-ink-3.png` 각 **1600×1600**: 검은 먹 덩어리 한 개가 캔버스 가운데에, 가장자리는 번지고 갈라진 붓 자국. 사이트가 이 모양을 키워 화면을 덮는 전환(동방 페이지)에 쓴다. 검정 100% + 투명, 회색 중간값 최소화
- T-02 오러 쐐기 마스크 `wipe-aura.png` **1600×1600**: 왼쪽 아래에서 오른쪽 위로 뻗는 날 모양 검은 쐐기 한 개. 서방 페이지 전환
```
A single solid black ink blot with ragged bleeding edges centered on a transparent 1600px canvas, pure black and fully transparent only (no gray halo). No text.
A single solid black blade-shaped wedge sweeping from lower-left to upper-right on a transparent 1600px canvas, pure black and transparent only. No text.
```

---

## 5. 검수 기준
- [ ] 크기·파일명이 이 문서와 일치. 사이트는 1/2로만 줄여 쓰므로 비율이 1px이라도 다르면 안 됨
- [ ] 글자 영역이 비어 있고 균일함. 한글·한자·영문·숫자 없음
- [ ] 고리(C-02·C-03·C-05)는 어느 각도로 돌려도 같은 인상(위·아래 구분 없음), 중심 투명
- [ ] 검격(C-06)은 수평으로 그림(사이트가 기울임). 인물·검 없음
- [ ] 상태별 파일은 모양·위치 동일, 빛·색만 다름
- [ ] 참고 그림(인물 컷 원본)과 같은 작가 그림으로 보임

납품 후 처리(사이트 쪽): 모든 9분할·늘리기 제거, 자리별 고정 크기 배치, 입장 연출(고리 회전·숨 쉬는 번짐·검격·두 조각 분할·틈 잔광) 구현, 먹 번짐·오러 쐐기 페이지 전환, 감상 무대 틀 적용.
