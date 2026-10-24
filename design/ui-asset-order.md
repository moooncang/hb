# 검과 마나의 경계 사이트 그림 납품요구서

작성 2026-10-25 · 의뢰 문창놈 · 대상 사이트 https://moooncang.github.io/hb/ (저장소 moooncang/hb)

지금 사이트의 배경·명패·테두리·지도·버튼은 전부 코드(CSS 도형)로 그려져 있어 빈약합니다. 이 문서는 그 자리를 **작가님 인물 컷 그림체 그대로** 그린 이미지로 채우기 위한 주문서입니다. 아래 순서대로 한 항목씩 생성해서 납품해 주세요.

### 작업 범위 (이미지 생성 담당)
- 할 일은 **이미지 파일 생성과 저장뿐**입니다. 결과는 `design/incoming/`에 문서의 파일명 그대로 저장합니다
- HTML·CSS·JS 등 **코드와 기존 파일은 수정하지 않습니다.** 사이트 적용은 별도 담당이 합니다
- 중간 보고·결과 요약·확인 요청 없이 A-01부터 끝까지 이어서 생성합니다
- 문서와 다르게 만든 파일이 있으면 `design/incoming/NOTES.txt`에 파일명과 이유만 한 줄씩 적습니다

---

## 0. 그림체 기준 (모든 항목 공통, 최우선)

### 참고 그림 (반드시 첨부)
- 동방 인물 원본: `../인물 컷/A_1.png`(위지란, 등불 밤거리) `B_1.png`(담여월, 설산) `E_1.png`(공손헌, 먹구름 산) `N_1.png`(금소요, 동방 실내)
- 서방 인물 원본: `../인물 컷/G_1.png`(아르델, 숲) `I_1.png`(엘로디, 석조 성채) `L_1.png`(발데마르, 성과 첨탑) `K_1.png`(오그딘, 불꽃 공방)
- 완성 등장 카드: `../등장 카드/A_1.png`(동방 먹·금박 장식) `../등장 카드/G_1.png`(서방 남색·금박·방패 장식) — **장식의 분위기 참고용**이며, 이 장식을 잘라 쓰거나 그대로 베끼지 않습니다

위 파일만 그림체 기준입니다. 인터넷의 다른 무협·판타지 그림은 참고하지 않습니다.

### 그림체 요약
- 일본 애니메이션 일러스트. 또렷한 짙은 잉크 선에 굵기 변화, 2~3단 셀 채색과 부드러운 에어브러시 그라데이션, 금속·유리·물에 반짝이는 하이라이트
- 배경은 손그림 애니메이션 배경 질감. 가는 잉크 해칭이 보임. 사진풍 아님
- 동방 쪽은 **먹의 농담, 옅은 종이 결, 비단의 색면, 붓끝처럼 끝나는 선, 열린 구도와 비대칭 여백**
- 서방 쪽은 **석재의 명암, 무광 금속, 직물의 깊이, 아치 비례, 수직선, 문장형 표식, 정돈된 대칭**
- 회색지대(두 문명이 맞닿는 곳)는 두 재질이 불규칙하게 톱니처럼 맞물림

### 색 (헥스값은 가까운 색이면 됨)
- 동방: 먹 #15171A / 흑청 #1F2A36 / 회백 종이 #E8E3D8 / 주사(朱砂) #C0392B / 비단 적 #8A1C1C / 금실 #B89A5A
- 서방: 석회색 #C9C5BB / 석재 암회 #4A4D55 / 깊은 청색 #1F2F4E / 은 #B8BCC4 / 낮은 채도 금 #9C8449
- 회색지대·공통: 회색 #8A8E95 / 종이 등 불빛 #E6B35A / 기름 램프 불빛 #D98A3A / 밤하늘 흑청 #141A22

### 금지
사실적인 사진풍, 3D 렌더, 플라스틱 같은 게임 UI 광택, 납작한 벡터 아이콘, 네온·발광 테두리, SF HUD·회로 무늬, 워터마크·서명, 인물(별도 지시 없는 한), 노출 표현, **한글·한자·영문 글자(별도 지시 없는 한)**

### 공통 프롬프트 머리 (각 항목 프롬프트 앞에 그대로 붙여 주세요)
```
Match the attached reference illustrations exactly in drawing style: Japanese anime illustration, confident dark ink lineart with varied line weight, 2-3 tone cel shading with soft airbrushed gradients, glossy highlights on metal and glass, hand-painted retro anime background texture with fine ink hatching. Two material worlds: EAST (wuxia) = ink wash gradients, faint paper grain, silk color fields, brush-tip line endings, open asymmetric composition, palette ink #15171A, ink-blue #1F2A36, grey-white paper #E8E3D8, cinnabar #C0392B, silk red #8A1C1C, gold thread #B89A5A. WEST (medieval fantasy) = stone shading, matte metal, deep fabric, arch proportions, vertical structure, heraldic marks, ordered symmetry, palette limestone #C9C5BB, dark stone #4A4D55, deep blue #1F2F4E, silver #B8BCC4, muted gold #9C8449. NOT photorealistic, NOT 3D render, NOT glossy plastic game UI, NOT flat vector icon, NO neon glow, NO sci-fi HUD. No watermark, no signature, no people, no text or letters of any language.
```
항목에 「동방」이라고 적힌 것은 머리 뒤에 `Use the EAST material world only.`, 「서방」은 `Use the WEST material world only.`, 「회색지대」는 `Interlock both material worlds like irregular teeth.`를 덧붙입니다.

---

## 1. 납품 규격 (공통)

- 형식: PNG, 투명 배경(진짜 알파). 배경판·종이·석판처럼 꽉 찬 항목만 불투명 허용(항목에 표시)
- 크기: 항목에 적힌 픽셀 그대로(화면 표시 크기의 2배, 고해상도 화면 대응)
- 시점: UI 부품은 **정면 평면 시점**. 원근·기울기 없이 똑바로, 캔버스 가운데, 사방 여백 균일
- 상태가 여러 개인 항목은 **모양·크기·위치가 완전히 같고** 빛·색만 다르게. 상태마다 파일 1개
- 늘어나는 틀(9분할 표시 ★): 네 모서리 장식은 적힌 여백 안에만, 가장자리 변은 무늬가 일정하게 반복, 가운데는 비우거나 균일한 면. 사이트가 크기에 맞게 늘려 씁니다
- 같은 쌍(동방판·서방판)은 **크기와 글자 자리가 같아야** 합니다. 사이트가 같은 자리에 번갈아 씁니다
- 파일명: 항목에 적힌 이름 그대로. 납품 위치 `design/incoming/`

### 글자 정책
- **한글·한자는 그림에 넣지 않습니다.** 생성 그림의 글자는 획이 깨지기 쉽고, 문구는 데이터에서 고치므로 사이트가 실제 글자(웹 폰트)를 위에 얹습니다. 작품명 붓글씨도 사이트가 얹습니다(나눔붓·LXGW WenKai)
- 영문·숫자도 넣지 않습니다. 이 사이트는 영문 라벨을 쓰지 않습니다

---

## 2. 공통 조작부

### A-01 주 버튼 판 · 동방 ★
- 쓰이는 곳: 동방 선택, 상세 보기, 작품으로 이동(무림 측), 등장 카드 감상
- 파일: `btn-east-idle.png` `btn-east-hover.png` `btn-east-press.png`
- 크기 720×200. 모서리 여백 좌우 각 110px, 위아래 각 36px
- 모양: 회백 종이 바탕의 가로 명패. 양끝은 붓으로 그은 먹선이 붓끝처럼 가늘게 끝남. 가운데는 글자 자리로 비움. hover는 먹선이 조금 진해지고 주사색 작은 점 하나, press는 종이가 살짝 눌린 음영
```
EAST. A long horizontal nameplate made of grey-white paper with a single ink brush stroke framing it, brush-tip tapered ends on left and right, faint paper grain, empty center for live text, front view. Transparent background.
```

### A-02 주 버튼 판 · 서방 ★
- 쓰이는 곳: 서방 선택, 상세 보기, 작품으로 이동(서방 측), 등장 카드 감상
- 파일: `btn-west-idle.png` `btn-west-hover.png` `btn-west-press.png`
- 크기 720×200(A-01과 동일). 모서리 여백 좌우 각 110px, 위아래 각 36px
- 모양: 석회색 석판에 무광 은 테를 두른 가로 명판. 양끝에 작은 아치 모양 리벳 장식. 가운데 비움. hover는 은 테가 밝아지고 낮은 채도 금 선 하나, press는 눌린 음영
```
WEST. A long horizontal plaque of pale limestone with a thin matte silver rim and small arched rivet ornaments at both ends only, stone shading, empty center for live text, front view. Transparent background.
```

### A-03 보조 버튼 판 · 회색지대 ★
- 쓰이는 곳: 전체 보기, 닫기, 자유모드, 전선 전체로, 중립 선택
- 파일: `btn-gray-idle.png` `btn-gray-hover.png` `btn-gray-press.png`
- 크기 600×160. 모서리 여백 좌우 100px, 위아래 32px
- 모양: 왼쪽 절반은 석재 테, 오른쪽 절반은 먹선 테가 가운데서 톱니처럼 맞물린 가늘고 긴 판. 가운데 비움
```
GRAY ZONE. A slim horizontal button plate whose left half is a limestone frame with silver rim and right half is an ink brush-stroke frame on paper, the two halves interlocking in the middle like irregular teeth, empty center for text, front view. Transparent background.
```

### A-04 둥근 버튼 받침 2종
- 쓰이는 곳: 이전·다음 화살표, 닫기, 확대, 메뉴
- 파일: `btn-round-east-idle.png` `btn-round-east-hover.png` / `btn-round-west-idle.png` `btn-round-west-hover.png` 각 192×192
- 동방: 먹으로 찍은 원(가장자리 번짐) 안에 회백 종이 면. 서방: 은 테를 두른 둥근 석재 단추, 가운데 깊은 청색 에나멜
```
EAST. A round ink-stamped circle with softly bleeding edge, grey-white paper center left empty, front view. Transparent background.
WEST. A round stone button boss with matte silver rim and deep blue enamel center left empty, small highlight upper left, front view. Transparent background.
```

### A-05 아이콘 10종
- 크기 각 128×128, 투명. 선 굵기 통일. 회백(#E8E3D8) 잉크 선 + 얇은 먹 음영. A-04 받침 위에 얹습니다. 동·서 공용이라 중립적인 선 아이콘으로
- 파일: `icon-arrow-left.png` `icon-arrow-right.png` `icon-arrow-up.png` `icon-arrow-down.png` `icon-close.png` `icon-zoom.png` `icon-menu.png` `icon-card.png`(작은 액자) `icon-map.png`(지도 핀) `icon-sound.png`
```
A single small hand-inked icon of [SUBJECT: e.g. a left arrow], grey-white ink lines with thin dark shading, centered, consistent stroke weight across the set. Transparent background.
```

### A-06 칩·탭 2종 ★
- 쓰이는 곳: 전체·서방·동방·중립 탐색 범위, 상태 분류 13종, 컷 1·2
- 파일: `chip-east-idle.png` `chip-east-active.png` / `chip-west-idle.png` `chip-west-active.png` 각 360×96. 모서리 여백 좌우 48px
- 동방: 작은 종이 꼬리표, 먹선 테. active는 주사색 작은 낙관 점이 왼쪽에 찍힘. 서방: 작은 석재 명찰, 은 테. active는 금 선 테
```
EAST. A small paper tag with a thin ink outline, empty center, front view; active state adds a tiny cinnabar seal dot on the left edge. Transparent background.
WEST. A small limestone name tile with a thin matte silver outline, empty center, front view; active state changes the outline to muted gold. Transparent background.
```

### A-07 장 구분 장식 2종
- 쓰이는 곳: 구간 제목 아래 줄
- 파일: `divider-east.png` 1600×48(가로 반복 가능, 왼쪽에서 오른쪽으로 가늘어지는 먹선 한 획), `divider-west.png` 1600×48(가로 반복 가능, 은색 가는 쌍선 가운데 작은 팔각 별 하나)

### A-08 낙관·문장 2종 (글자 없음)
- 쓰이는 곳: 작품명 옆, 동방·서방 구간 머리 표식
- 파일: `seal-east.png` 240×240 — 주사색 네모 낙관, 안은 **글자 대신** 초승달 한 획(흑월·월식의 달). 살짝 번진 인주
- 파일: `emblem-west.png` 240×240 — 무광 은 팔각 별 문장(가르데온 대공 문장), 가운데 작은 파란 보석
```
EAST. A square cinnabar red seal stamp impression with slightly bled ink edges, inside a single crescent moon brush stroke instead of letters, front view. Transparent background.
WEST. An eight-pointed matte silver star heraldic emblem with a small blue gem at the center, subtle stone-like shading, front view. Transparent background.
```

---

## 3. 머리 · 메뉴 · 타이틀

### B-01 타이틀 바탕 (글자 없음)
- 쓰이는 곳: 첫 화면 작품명 뒤. 작품명 「검과 마나의 경계」는 사이트가 붓글씨 폰트로 얹습니다
- 파일: `title-plate.png` 1800×700, 투명
- 모양: 왼쪽에서 오른쪽으로 길게 번진 먹 한 획(동방)이 오른쪽 끝에서 가늘고 단단한 은빛 수직선·아치 조각(서방)과 만나 끊김. 가운데 넓은 면은 글자 자리라 비움. 위아래 여백 120px 이상
```
GRAY ZONE. A wide horizontal title backdrop: a long ink wash brush stroke sweeping from the left fading into paper grain, meeting at the right end a thin matte silver vertical line and a fragment of a stone arch, the two touching but not blending; large empty center for live calligraphy. Transparent background.
```

### B-02 메뉴 배경 (불투명)
- 쓰이는 곳: 메뉴 버튼을 누르면 뜨는 전체 화면
- 파일: `menu-backdrop.png` 2880×1800
- 모양: 왼쪽 절반은 성채 안 어두운 석벽과 기름 램프, 오른쪽 절반은 동방 군막 안 회백 천장과 종이 등, 가운데가 톱니처럼 맞물림. 가운데 넓게 비어 있어야 함(메뉴 항목이 올라감)

### B-03 메뉴 항목 판 2종
- 파일: `menu-east-idle.png` `menu-east-current.png` / `menu-west-idle.png` `menu-west-current.png` 각 840×200
- 동방: 걸어 둔 종이 명패(위에 작은 못 자국). 서방: 벽에 박은 석판 명패. 오른쪽 글자 자리 비움. current는 각각 주사색 점 / 금 선

---

## 4. 첫 화면 · 대표 장면 (가장 중요)

### C-01 대표 배경 · 가로 (불투명)
- 쓰이는 곳: 첫 화면 전체 배경(PC)
- 파일: `key-visual.png` 3344×1882
- 모양: 두 문명이 지형째 맞물린 **한 장의 넓은 풍경**. 왼쪽 45%는 서방 — 석조 성채(발트로크 성채), 첨탑, 성벽, 밀밭. 오른쪽 45%는 동방 — 기와지붕 관문(천문관), 산세, 대나무숲, 기와 마을. 가운데 10%는 회색지대 — 단층으로 갈라진 협곡, 거꾸로 흐르는 강, 땅에 반쯤 삼켜진 성과 산성이 서로 파고듦. 밤에서 새벽 사이의 빛. 왼쪽 성벽엔 기름 램프, 오른쪽 관문엔 종이 등. **인물 없음, 글자 없음, 깃발 문양 없음.** 왼쪽 아래 35%는 타이틀·버튼 자리라 어둡게 비움(지형은 이어지되 디테일 없음)
```
GRAY ZONE. A single wide landscape where two civilizations are jammed together by a cataclysm: left side a medieval stone fortress city with spires, curtain walls and wheat fields under oil-lamp light; right side an East-Asian tiled-roof gate fortress with mountain ridges, bamboo groves and paper lanterns; the center seam is a torn fault valley with a reversed river and half-swallowed buildings from both sides interlocking like irregular teeth. Pre-dawn light. No people, no text, no flags with symbols. Lower-left 35% kept dark and simple for overlaid title.
```

### C-02 대표 배경 · 세로 (불투명)
- 쓰이는 곳: 첫 화면 배경(휴대폰)
- 파일: `key-visual-tall.png` 1882×3344
- 모양: C-01과 같은 장소를 세로로. 위 40%가 서방 성채(위쪽 하늘), 아래 40%가 동방 관문·산세, 가운데 맞물림. 아래 30%는 타이틀 자리라 어둡게 비움

### C-03 회색지대 띠 (투명)
- 쓰이는 곳: 첫 화면과 인물 구간 사이, 동·서 면이 만나는 경계 장식
- 파일: `seam-band.png` 2400×240, 가로 반복 가능
- 모양: 먹이 번진 종이 조각과 석재 조각이 톱니처럼 맞물린 가로 띠. 위아래 가장자리는 투명하게 흩어짐

### C-04 대표 인물 분리 레이어 (선택, 조건부)
- 쓰이는 곳: 첫 화면 앞쪽 대표 인물(동방 위지란, 서방 아르델)
- **원본 `A_1.png` `G_1.png`의 얼굴·의상·소품을 바꾸지 않고 배경만 투명하게 분리**할 수 있을 때만 납품. 재생성·재해석 금지
- 파일: `hero-A.png`(1856×1280 원본 크기, 인물만) `hero-G.png`(같음)
- 분리 품질이 머리카락 끝까지 깨끗하지 않으면 납품하지 말고 NOTES.txt에 한 줄

---

## 5. 인물 구간

### D-01 인물 액자 2종 (가운데 투명)
- 쓰이는 곳: 인물 군상의 각 그림 테두리(그림 비율 1856:1280)
- 파일: `frame-east.png` 1936×1360(안쪽 1856×1280 완전 투명, 테 두께 40px 이내), `frame-west.png` 1936×1360(같음)
- 동방: 그림 왼쪽 위에서 오른쪽 아래로 흐르는 먹선 두 획이 그림 가장자리를 느슨하게 감쌈. 네 변을 다 두르지 않고 열린 구도. 서방: 위 변이 낮은 아치, 양옆은 수직 석재 기둥선, 아래는 은 테. 네 변 닫힌 구조
```
EAST. An open picture frame drawn with two ink brush strokes that loosely wrap the top-left and bottom-right of a 1856x1280 transparent window, not enclosing all four sides, brush-tip endings, faint paper grain. Transparent background and transparent inside.
WEST. A closed picture frame for a 1856x1280 transparent window: a shallow stone arch along the top edge, vertical stone pillar lines on both sides, a thin matte silver rail along the bottom, calm symmetry. Transparent background and transparent inside.
```

### D-02 이름패 2종 ★
- 쓰이는 곳: 인물 그림 아래 이름·별호 자리
- 파일: `name-east.png` 1000×220(모서리 여백 좌 160·우 60, 위아래 30), `name-west.png` 1000×220(모서리 여백 좌 60·우 160, 위아래 30)
- 동방: 왼쪽에 세로 먹선 한 획 + 오른쪽으로 종이 띠. 서방: 오른쪽에 작은 방패 문장 자리(비움) + 왼쪽으로 석재 띠. 글자 자리 비움

### D-03 선택 표시 2종
- 쓰이는 곳: 인물에 올리거나 고르면 이름 옆에 이어지는 표시
- 파일: `mark-east.png` 320×64(오른쪽으로 가늘어지는 주사색 붓선), `mark-west.png` 320×64(왼쪽으로 좁아지는 은색 쐐기 선)

### D-04 중립 인물 자리 (불투명)
- 쓰이는 곳: 레나타(이미지 미확보) 자리
- 파일: `neutral-placeholder.png` 1856×1280
- 모양: 쌍등객잔 문 앞. 동방식 종이 등과 서방식 기름 등을 나란히 내건 문. 문밖에 칼과 검을 세워 둔 거치대. **인물 없음.** 어둡고 따뜻한 밤

### D-05 상세 감상 바탕 (불투명)
- 쓰이는 곳: 인물을 펼쳤을 때 뒤에 깔리는 전체 화면
- 파일: `viewer-backdrop.png` 2880×1800
- 모양: 아주 옅은 회백 종이 결(왼쪽에서 오른쪽으로 아주 서서히 석회색 석재 결로 바뀜). 무늬는 가까이 봐야 보일 정도로 약하게. 가운데 넓게 비움

### D-06 썸네일 틀 2종
- 쓰이는 곳: 상태별 컷 1·2 썸네일(비율 2304:960)
- 파일: `thumb-east-idle.png` `thumb-east-active.png` / `thumb-west-idle.png` `thumb-west-active.png` 각 240×100, 가운데 투명
- 동방 active는 주사색 점, 서방 active는 금 선

### D-07 원고 종이·석판 2종 (불투명) ★
- 쓰이는 곳: 인물 상세의 원고 영역(원고는 클로드가 씀, 길이 가변)
- 파일: `paper-east.png` 1600×900(모서리 여백 56px), `slab-west.png` 1600×900(모서리 여백 56px)
- 동방: 회백 종이 한 장, 오른쪽 위 작은 먹 번짐. 서방: 석회색 석판, 모서리 은 징 넷. **안쪽은 균일한 면**(글자가 올라감)

---

## 6. 전선 구간

### E-01 전선 개념도 (불투명)
- 쓰이는 곳: 전선 구간의 지도. 사이트가 위에 표식·지명을 얹습니다
- 파일: `front-map.png` 2560×3200(세로형)
- 모양: 먹과 옅은 채색의 **평면 개념도**. 나무 탁자·가죽 액자·두루마리 테두리 없음. 북쪽이 위. 왼쪽이 서방 에르세아(석조 성채·첨탑·숲 표현), 오른쪽이 동방 중원(관문·산세·기와 표현). 가운데를 위에서 아래로 꿰뚫는 불규칙한 회색지대 띠(두 땅이 손가락처럼 엇갈림, 가는 지형선과 해칭). 아래 네 곳의 **상대 위치만** 표현하고 정확한 국경·거리는 정하지 않음:
  - 북부: 오른쪽 위에 검은 산(천흑산), 왼쪽 위에 숲(이스벨 숲), 그 사이 불탄 숲
  - 북부와 중앙 사이: 띠 안에 갈라진 협곡(단층곡)
  - 중앙: 왼쪽에 석조 성채(발트로크), 오른쪽에 기와 관문(천문관), 서로 마주 봄
  - 남부: 거꾸로 흐르는 강(역류하)이 띠를 가로지름, 서쪽 강가에 작은 교두보 야영지
- **글자·지명·깃발 문양·나침반 장식 없음.** 산·강·성은 작게 상징적으로. 전체 톤은 어두운 먹빛 종이
```
GRAY ZONE. A flat conceptual war-front map on dark ink-toned paper, north up, no table or frame or scroll border, no compass rose, no text. Left land: medieval stone fortresses, spires and a forest; right land: East-Asian gate fortresses, mountain ridges and tiled roofs; a jagged grey zone runs top to bottom through the middle with thin terrain lines and hatching where the two lands interlock like fingers. Small symbolic landmarks only: dark mountains upper right, a forest upper left with a burned strip between; a cracked ravine inside the zone below them; a stone fortress and a tiled gate facing each other across the zone in the middle; a river crossing the zone near the bottom with a small camp on its west bank. Hand-painted ink and light wash, fine hatching.
```

### E-02 전선 표식 2종
- 쓰이는 곳: 지도 위 네 전선 표식(사이트가 위치를 잡음)
- 파일: `pin-east-idle.png` `pin-east-active.png`(주사색 낙관 모양 핀) / `pin-west-idle.png` `pin-west-active.png`(은 테 작은 방패 핀) 각 96×128. 회색지대 표식용 `pin-gray-idle.png` `pin-gray-active.png`(두 재질이 반반) 같은 크기

### E-03 지역 확대 배경 (불투명, 선택)
- 쓰이는 곳: 전선을 고르면 지도 안에서 장면으로 바뀌는 그림. 캐릭터 챗 배경 26장 계획(E1 천문관 성루, W1 발트로크 성벽, W5 이스벨 숲, E4 천흑산 총단, K4 단층곡, K5 역류하)과 **같은 장면**이므로, 그 배경이 생성되면 그걸 쓰고 여기서는 만들지 않습니다
- 배경 26장을 먼저 생성한다면 이 사이트용으로 `region-north.png`(천흑산 기슭에서 본 불탄 이스벨 숲) `region-center.png`(천문관 성루와 멀리 발트로크) `region-fault.png`(단층곡) `region-south.png`(역류하 교두보) 각 2400×1350을 **추가로** 납품해도 됩니다

### E-04 전선 정보판 ★
- 쓰이는 곳: 고른 전선의 대치 세력·관련 인물 패널
- 파일: `panel-front.png` 900×1200(모서리 여백 56px), 어두운 먹빛 종이 위 가는 석재 테. 가운데 균일

---

## 7. 세력 · 힘의 체계 구간

### F-01 세력 문장 12종 (글자 없음)
- 쓰이는 곳: 세력 목록의 표식, 전선 정보판의 대치 세력
- 크기 각 320×320, 투명. **12개가 같은 시점·같은 크기감·같은 선 굵기.** 동방 6종은 먹과 주사·금실로 그린 인장 느낌, 서방 6종은 은·청·금 금속 문장(방패형 바탕 통일)
- 아래 모티프는 설정집에 있는 것(★)과 사이트용 제안(제안)으로 나뉩니다. 제안 항목은 작가님 확인 전까지 임시입니다
- 동방
  - `fa-daehwi.png` 대휘 황조 — 금빛 학과 날개(온서경 관모의 황조 문양에서 ★)
  - `fa-murim.png` 무림맹 — 관문(천문관) 위에 세운 검 한 자루(제안)
  - `fa-taeheo.png` 태허관 — 흰 학 날개(담여월 절초의 학 ★)
  - `fa-ungak.png` 운각사 — 호박 염주 원(현오 ★)
  - `fa-mugan.png` 무간교 — 월식 중인 검은 달(흑월장·월식 ★)
  - `fa-sagal.png` 사갈련 — 뱀과 전갈이 얽힌 고리(蛇蝎 ★)
- 서방
  - `fa-gardeon.png` 가르데온 — 팔각 별, 가운데 파란 보석(★)
  - `fa-selbar.png` 셀바르 — 백조(로웨나 흉갑 ★)
  - `fa-tower.png` 백은 마탑 — 은빛 탑과 동심원 서클(제안)
  - `fa-church.png` 성휘 교단 — 가시 테를 두른 금빛 원륜(엘로디 ★)
  - `fa-isbel.png` 이스벨 숲 — 넝쿨이 감긴 활(티아넬 문신·녹궁 ★)
  - `fa-bardun.png` 바르둔 — 룬이 새겨진 망치(오그딘 ★)
- 회색지대: `fa-inn.png` 쌍등객잔 — 종이 등과 기름 램프 한 쌍(★)
```
EAST (6 files). A seal-style faction mark of [SUBJECT], ink and cinnabar with a thread of gold, square seal impression feel, same framing and stroke weight across the set, front view. Transparent background. No text.
WEST (6 files). A heraldic faction mark of [SUBJECT] on a uniform shield-shaped matte silver base with deep blue field and muted gold detail, same framing across the set, front view. Transparent background. No text.
```

### F-02 세력 목록 판 2종 ★
- 파일: `list-east.png` 1200×120(종이 띠 + 왼쪽 먹선, 모서리 여백 좌 120·우 40), `list-west.png` 1200×120(석재 띠 + 오른쪽 은 테, 여백 좌 40·우 120)

### F-03 경지 도해 바탕 · 동방 (투명)
- 쓰이는 곳: 힘의 체계 동방 쪽. 7단계 이름은 사이트가 얹음
- 파일: `power-east.png` 800×1600
- 모양: 아래에서 위로 올라가는 **가는 먹선 한 줄기**(단전에서 경맥을 따라 기가 오르는 흐름). 선 위에 같은 간격의 마디 7개(작은 먹점, 위로 갈수록 진함). 맨 위 마디 뒤에 옅은 보랏빛 번짐(장력). 글자 없음, 인체 없음
```
EAST. A single thin vertical ink line rising from bottom to top like energy traveling up through meridians, with seven evenly spaced small ink nodes along it growing darker toward the top, a faint violet ink bloom behind the top node, no body, no text. Transparent background.
```

### F-04 체계 도해 바탕 · 서방 (투명)
- 쓰이는 곳: 힘의 체계 서방 쪽. 다섯 체계의 단계 이름은 사이트가 얹음
- 파일: `power-west.png` 1600×1600
- 모양: 다섯 개의 세로 석재 기둥(기사·마법사·사제·엘프·드워프 자리) 위에 각각 다른 머리 장식 — 검 날개, 동심원 마법진, 가시 원륜, 넝쿨, 룬 망치. 기둥 안은 비움. 기둥 사이 가는 은선. 글자 없음
```
WEST. Five vertical stone pillars side by side, each crowned with a different small emblem: crossed sword wings, concentric magic circle, thorned halo, vine, rune hammer; pillar bodies left empty, thin silver lines between pillars, calm symmetry, no text. Transparent background.
```

### F-05 단계 토큰 2종
- 쓰이는 곳: 각 단계를 고르면 켜지는 표시
- 파일: `step-east-off.png` `step-east-on.png`(먹점 / 주사색 점) / `step-west-off.png` `step-west-on.png`(석재 원판 / 금 테 원판) 각 96×96

### F-06 정보판 2종 ★
- 쓰이는 곳: 고른 세력·단계의 설명과 인물
- 파일: `panel-east.png` 1400×700(종이, 모서리 여백 56px), `panel-west.png` 1400×700(석판, 모서리 여백 56px)

---

## 8. 시작 구간

### G-01 모드 카드 3종
- 쓰이는 곳: 무림 측 / 서방 측 / 자유모드 선택
- 파일: `mode-east-idle.png` `mode-east-selected.png`(천문관 성루 야경, 종이 등) / `mode-west-idle.png` `mode-west-selected.png`(발트로크 성벽, 기름 램프) / `mode-free-idle.png` `mode-free-selected.png`(회색지대 갈림길, 쌍등객잔 두 불빛이 멀리) 각 1300×1600
- 그림은 카드 위 60%에, 아래 40%는 글자 자리로 어둡게 비움. selected는 각각 주사색 낙관 / 금 선 테 / 두 불빛이 밝아짐. **인물 없음**

### G-02 프롤로그 틀 2종 ★
- 쓰이는 곳: 확정 프롤로그가 들어갈 자리(원고 전까지는 빈 틀)
- 파일: `prologue-east.png` 1400×400(종이, 모서리 여백 56px), `prologue-west.png` 1400×400(석판·양피지, 모서리 여백 56px)

---

## 9. 질감 타일 (불투명, 이음매 없이 반복)

- `tex-paper.png` 1024×1024 — 회백 종이 결, 아주 약한 먹 얼룩
- `tex-stone.png` 1024×1024 — 석회색 석재 결, 아주 약한 균열
- `tex-ink-night.png` 1024×1024 — 흑청 먹빛 밤하늘 번짐
- 무늬는 가까이 봐야 느껴지는 정도. 글자가 올라가도 읽히는 밝기 균일성

---

## 10. 검수 기준 (납품 전 확인)

- [ ] 참고 그림(인물 컷 원본)과 나란히 놓았을 때 같은 작가 그림으로 보임
- [ ] 동방 항목은 먹·종이·비단·붓끝, 서방 항목은 석재·금속·직물·아치. 서로 섞이지 않음(회색지대 항목만 맞물림)
- [ ] 투명 항목의 배경이 진짜 투명(체크무늬를 그린 것 아님)
- [ ] 상태별 파일이 모양·크기·위치 모두 같음. 동·서 쌍은 크기·글자 자리가 같음
- [ ] ★ 항목: 모서리 장식이 지정 여백 안에 있고 변 무늬가 일정
- [ ] 글자 없음(한글·한자·영문·숫자 전부). 깃발 문양·나침반·SF 장식 없음
- [ ] 대표 배경·지도에 인물 없음. 지도에 국경선·거리 표시 없음
- [ ] 파일명·크기가 이 문서와 일치

납품 후 처리(사이트 쪽): 웹용 변환, 9분할 테두리 적용, 글자 얹기(작품명 붓글씨 포함), 지도 표식 좌표 조정, 코드 도형 제거는 사이트 담당이 합니다.
