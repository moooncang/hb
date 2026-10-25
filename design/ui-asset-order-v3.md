# 검과 마나의 경계 사이트 그림 납품요구서 v3 — 장면 제목·균열 + 입장 검격(세밀)

작성 2026-10-26 · 의뢰 문창놈 · 대상 사이트 https://moooncang.github.io/hb/

v2(`ui-asset-order-v2.md`)의 §0 그림체 기준·참고 그림·공통 프롬프트 머리·금지 사항·§1 납품 규격(PNG 투명, 정면 평면, 글자 없음, 크기 1px도 다르면 안 됨)은 그대로 적용한다. 단, 이번 T-01~T-03은 **글자 그 자체가 그림**인 유일한 예외다.
사이트는 모든 그림을 **늘리지 않고 1/2 크기(또는 비율을 지킨 균일 축소)**로만 놓는다. 납품 위치 `design/incoming-v3/`, 파일명 그대로. v3의 S-01~S-08은 v2의 C-06·C-07·C-08(검격·섬광·베인 틈)을 대체한다. v2의 C-01~C-05(달·고리·번짐·불티)는 그대로 쓴다.

현재 사이트는 제목을 글꼴(Noto Serif KR 900 세로쓰기)로, 균열을 얇은 빛선·그림자로, 검격을 v2 그림 한 장으로 대신 보여 주고 있다. 납품되면 그 자리에 그대로 들어간다.

---

## 1. 장면(홈) — 이음새 위의 제목과 균열

화면 구성(사이트가 조립): 서방 원화(아르델)가 왼쪽, 동방 원화(위지란)가 오른쪽에 톱니처럼 맞물려 있고, 맞물린 선 위에 **균열(T-04)**이 세로로 서며 그 위에 **세로 제목(T-01)**이 놓인다. 진영을 고르면 균열이 좌우로 6% 옮겨 가고 제목은 제자리에 남는다. 760px 아래 화면에서는 두 원화가 위아래로 맞물리므로 **가로 균열(T-05)**과 **가로 제목(T-02)**을 쓴다. 입장 표지의 달 위에는 **먹 제목(T-03)**이 올라간다.

### T-01 세로 제목 (투명)
- 파일 `title-v.png` **560×2200**. 표시 280×1100(높이는 화면 높이의 78%까지 균일 축소)
- 「검과 마나의 경계」 일곱 자를 **위에서 아래로 한 줄**(검·과·마·나·의·경·계). 띄어쓰기 자리는 글자 반 자 정도의 틈
- 글자는 **회백 종이색(#EEEAE1)**, 가장자리에 먹이 살짝 번진 질감, 획 끝 두세 곳에만 아주 옅은 주사색 기운. 굵고 단단한 명조 뼈대에 붓의 끝맺음이 섞인 글씨(서예체·흘림체 아님, 읽기 우선)
- 글자 묶음은 캔버스 가운데 x 120~440, y 100~2100 안. 그 밖은 완전 투명. 낙관(붉은 도장)은 사이트가 아래에 따로 붙이므로 **그리지 않는다**
- 어두운 원화 두 장 사이의 검은 틈 위에 놓이므로, 글자만으로 읽혀야 한다(테두리 상자·배경 없음)
```
Vertical Korean title lettering "검과 마나의 경계" written top-to-bottom in one column on a transparent 560x2200 canvas, letters in pale paper white (#EEEAE1) with slightly ink-bled edges, heavy solid serif-like bone structure with brush-finished stroke ends, a faint cinnabar tint at two or three stroke tips only, no background, no box, no seal, no other text. Legible first, calligraphic second.
```

### T-02 가로 제목 (투명)
- 파일 `title-h.png` **2200×560**. 표시 1100×280(폭은 화면 폭의 86%까지 균일 축소). 모바일 장면용
- T-01과 **같은 글씨를 가로로** 한 줄. 글자 묶음 x 100~2100, y 120~440
```
The same Korean title lettering "검과 마나의 경계" as a single horizontal line on a transparent 2200x560 canvas, identical letterforms and paper-white ink-bled finish, no background, no seal, no other text.
```

### T-03 먹 제목 (투명)
- 파일 `title-ink.png` **1400×320**. 표시 700×160(달 지름에 맞춰 균일 축소). 입장 표지의 달 위
- 같은 글씨를 **먹색(#15171A)**으로. 창백한 달 위에 올라가므로 가장자리 번짐은 더 옅게
```
The same Korean title lettering "검과 마나의 경계" horizontally in deep ink black (#15171A) on a transparent 1400x320 canvas, crisp edges with only a hint of ink bleed, no background, no seal, no other text.
```

### T-04 균열 (투명 가장자리) — 두 땅이 맞물린 틈
- 파일 `seam-crack.png` **800×2400**. 표시 400×1200(화면 높이에 맞춰 균일 축소, 위아래는 잘려도 됨)
- 세로로 긴 띠. **왼쪽은 서방 석재**(석회색 돌 단면, 갈라진 금, 은빛 광물 알갱이), **오른쪽은 동방 종이·먹**(찢긴 회백 종이결, 먹 번짐, 비단 올). 두 재질이 **손가락처럼 엇갈려 맞물리고**, 그 사이에 **검은 틈**이 위에서 아래까지 이어진다. 틈 깊은 곳에 아주 옅은 따뜻한 빛(장면이 비치는 느낌), 발광 선·네온은 금지
- **x 160~640은 완전 불투명**(이 안에서 두 원화의 경계가 가려진다). x<80, x>720은 완전 투명, 그 사이는 찢기고 부서진 가장자리로 투명해진다. 위아래 끝(y 0, y 2400)까지 그림이 이어진다(잘라 써도 끊기지 않게)
- 틈은 **곧은 선이 아니라 톱니·지그재그**. 다만 폭 160~640 중앙 ±60 안에서만 흔들린다(제목이 그 위에 선다)
- 색은 석회색·먹·회백 세 가지. 금색·붉은색은 거의 없다(제목의 주사색 한 점이 돋보이도록)
```
A tall vertical seam on a transparent 800x2400 canvas: on the left, a cross-section of grey western stone with cracks and faint silver mineral grains; on the right, torn pale eastern paper with ink bleed and silk threads; the two materials interlock like fingers along a jagged black chasm running top to bottom through the middle, a faint warm light deep inside the chasm, no glowing neon lines. The central band x 160-640 fully opaque, torn/crumbled edges fading to fully transparent beyond x<80 and x>720, artwork continuing to the top and bottom edges. Palette: limestone grey, ink black, paper white only. No text.
```

### T-05 가로 균열 (투명 가장자리)
- 파일 `seam-crack-h.png` **2400×800**. 표시 1200×400(화면 폭에 맞춰 균일 축소). 모바일 장면용
- T-04를 **가로로** 그린 것. **위쪽이 서방 석재, 아래쪽이 동방 종이**. y 160~640 불투명, y<80·y>720 투명, 좌우 끝까지 이어짐
```
The same interlocking seam drawn horizontally on a transparent 2400x800 canvas: western grey stone above, torn eastern paper below, a jagged black chasm running left to right through the middle, band y 160-640 fully opaque, fading to transparent beyond y<80 and y>720, artwork continuing to the left and right edges. No text.
```

---

## 2. 입장 검격 (세밀) — 아르델의 오러가 화면을 가르고, 두 조각이 천천히 벌어진다

연출 순서(사이트가 조립, 누른 뒤 약 3.1초):

| 시각(ms) | 일어나는 일 | 쓰는 그림 |
|---|---|---|
| 0~450 | 숨 고르기. 달의 기운이 밝아지고 고리가 멈춘다. 안내 글이 사라진다 | C-04 |
| 450~1150 | **검격이 그어진다**: 오른쪽 위에서 왼쪽 아래로 35°, 붓이 그어지듯 핵(S-01)이 먼저, 오러(S-02)가 60ms 뒤따라 드러난다. 끝이 가늘게 빠진다 | S-01 S-02 |
| 830~1700 | 검격이 화면 중심을 지나는 순간 **섬광(S-04)**이 피어오르고 **충격파(S-05)**가 한 번 퍼진다 | S-04 S-05 |
| 1150~1450 | 멈춤. 오러는 사그라지고 **잔광(S-03)**과 핵의 선만 남는다 | S-03 S-01 |
| 1450~2950 | **두 조각이 선과 수직으로 천천히 밀려난다**(1.5초, 느리게 시작해 빨라짐). 각 조각의 잘린 면(S-06·S-07)이 보이고, 틈으로 아래의 장면이 드러나며, **파편(S-08)**이 틈에서 흩어진다 | S-06 S-07 S-08 S-03 |
| 2000 | 장면의 제목·메뉴가 올라온다 | — |
| 3100 | 표지 제거 | — |

모든 S 그림은 **수평으로** 그린다(사이트가 35° 기울인다). 검·인물·글자는 그리지 않는다. 오러 색은 낮은 채도 금(#9C8449)에서 밝은 금백(#F3E6B0). 「아르델 레인홀트 — 새벽검」의 오러이므로 **새벽빛처럼 차갑고 맑은 금**, 불꽃이나 번개가 아니다.

### S-01 검격 핵 (투명)
- 파일 `slash-core.png` **3000×400**. 표시 1500×200(화면 대각선 길이에 맞춰 균일 확대·축소)
- 캔버스 가운데를 **왼쪽 끝에서 오른쪽 끝까지 가로지르는 한 줄기 핵**만. 오른쪽 끝이 가장 가늘고 날카롭다(진행 방향). 중심 2~6px는 거의 흰 금백, 바깥 20px까지 금빛이 급히 사라진다. 그 밖은 투명. 깃털·불티 없음
- 사이트가 오른쪽에서 왼쪽으로 **점점 드러내며** 긋고, 베인 선으로 남긴다
```
WEST. A single razor-thin horizontal line of cold dawn-gold light spanning the full width of a transparent 3000x400 canvas, 2-6px near-white core (#F3E6B0) with a tight gold falloff within 20px, sharpest and thinnest at the right end, no feathers, no sparks, no sword, no text. Everything else fully transparent.
```

### S-02 검격 오러 (투명)
- 파일 `slash-aura.png` **3000×1200**. 표시 1500×600
- S-01과 **같은 중심선 위치(y 600)**에, 핵은 그리지 않고 **오러 깃털만**: 중심선 양쪽으로 금빛 깃털이 흩날리고, 왼쪽(뒤)으로 길게 흐려지는 꼬리, 오른쪽(앞) 끝은 짧고 날카롭다. 깃털은 비백(飛白)처럼 갈라진 붓결
- 사이트가 핵보다 60ms 늦게 드러낸 뒤 0.5초 만에 지운다
```
WEST. Only the feathered aura of a horizontal sword slash on a transparent 3000x1200 canvas: streaks of cold gold flame-like feathers flaring from an invisible centerline at y=600, trailing long and fading toward the left, short and sharp toward the right tip, split dry-brush texture, no core line, no sword, no text. Fully transparent background.
```

### S-03 검격 잔광 (투명)
- 파일 `slash-haze.png` **3000×1600**. 표시 1500×800
- 중심선(y 800)을 따라 **넓고 부드러운 금빛 안개**. 가운데가 가장 밝고 위아래 400px 안에서 투명으로. 질감 없음, 테두리 없음
- 검격 뒤에 남아 조각이 벌어지는 동안 천천히 사라진다
```
WEST. A wide soft band of cold gold haze along the horizontal centerline (y=800) of a transparent 3000x1600 canvas, brightest at the center, fading to fully transparent within 400px above and below, no texture, no hard edges, no text.
```

### S-04 섬광 (투명)
- 파일 `flash-burst.png` **1600×1600**. 표시 800×800(사이트가 0.5배에서 1.6배로 키우며 터뜨린다)
- 중심 흰 금빛 핵, 바깥으로 **가늘고 긴 금빛 광선 여섯~여덟 가닥**(길이 제각각), 그 위에 **가로로 긴 렌즈 줄기** 하나(사이트가 검격 방향으로 기울인다). 가장자리는 투명
```
WEST. A radial burst of white-gold light on a transparent 1600x1600 canvas: bright core, six to eight thin long gold rays of varied length, one long horizontal lens streak across the center, all fading to fully transparent at the edges. No text.
```

### S-05 충격파 (투명)
- 파일 `shock-ring.png` **1600×1600**. 표시 800×800(0.2배에서 2.5배로 퍼지며 사라진다)
- 캔버스 중심의 **반지름 700~780 띠**에만 그림: 가는 금빛 고리, 바깥쪽 가장자리는 먹이 튄 듯 거칠고 안쪽은 매끈. 안과 밖은 완전 투명
```
WEST. A thin ring of cold gold light occupying only the band between radius 700 and 780 on a transparent 1600x1600 canvas, smooth inner edge, rough ink-splashed outer edge, fully transparent inside and outside the band. No text.
```

### S-06 절단면 · 위 조각 (투명)
- 파일 `cut-edge-a.png` **3000×240**. 표시 1500×120
- 위 조각(왼쪽 위 조각)의 **아랫변**에 붙는 잘린 면. **아래쪽 가장자리(y 200~240)에 금빛 테두리**, 그 위로(y 120~200) 찢긴 회백 종이 섬유와 먹 번짐이 위로 갈수록 투명해진다. y<120은 투명
- 사이트가 35°로 기울여 조각의 베인 변에 붙인다. 조각이 밀려날 때 함께 움직인다
```
A long horizontal cut face on a transparent 3000x240 canvas: a glowing cold-gold rim along the bottom edge (y 200-240), above it torn pale paper fibers and ink bleed fading upward to fully transparent by y=120, nothing above. No text.
```

### S-07 절단면 · 아래 조각 (투명)
- 파일 `cut-edge-b.png` **3000×240**. 표시 1500×120
- 아래 조각(오른쪽 아래 조각)의 **윗변**에 붙는 잘린 면. **위쪽 가장자리(y 0~40)에 금빛 테두리**, 그 아래(y 40~120) 부서진 석회색 돌 부스러기와 은빛 알갱이가 아래로 갈수록 투명해진다. y>120은 투명
```
A long horizontal cut face on a transparent 3000x240 canvas: a glowing cold-gold rim along the top edge (y 0-40), below it crumbled grey stone chips and faint silver grains fading downward to fully transparent by y=120, nothing below. No text.
```

### S-08 파편 (투명)
- 파일 `cut-dust.png` **3000×1000**. 표시 1500×500
- 중심선(y 500) 주변 ±300에 **금가루·금빛 작은 조각 40~60개와 먹 점 20개**가 드문드문. 크기 제각각, 흐른 자국 없음(사이트가 움직인다). 그 밖은 투명
```
Forty to sixty small scattered specks of cold gold dust and tiny gold shards plus about twenty ink dots floating within 300px of the horizontal centerline of a transparent 3000x1000 canvas, varied sizes, sparse, no motion trails, no text.
```

---

## 3. 검수 기준
- [ ] 크기·파일명이 이 문서와 일치
- [ ] T-01~T-03은 글자만 있고 배경·상자·낙관이 없다. 같은 글씨체 세 장
- [ ] T-04·T-05는 지정한 띠(160~640)가 완전 불투명이고 바깥(<80, >720)이 완전 투명이다. 틈의 흔들림이 중앙 ±60 안이다
- [ ] S-01~S-03·S-06~S-08은 중심선이 캔버스 정중앙(세로 절반)이다. S-01은 오른쪽 끝이 가장 가늘다
- [ ] S-04·S-05는 가장자리가 투명이고, S-05는 지정 반지름 띠 밖이 비어 있다
- [ ] 금은 차가운 새벽빛 금(#9C8449~#F3E6B0). 불꽃·번개·네온 아님. 검·인물·글자 없음

납품 후 처리(사이트 쪽): `tools/build-skin3.ps1`로 `assets/skin3/`에 넣고, `assets/main.js`의 `ART` 표시를 켠다(제목·균열·검격 층이 그림으로 바뀐다). 연출 시각표는 그대로 두고 그림만 교체한다.
