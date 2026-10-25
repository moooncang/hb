---
name: 검과 마나의 경계 — 두 재질의 맞물림
description: 서방은 석재·은·청, 동방은 종이·먹·주사. 그림 자산(assets/skin) 위에 글자만 얹는 소개 사이트. 구간마다 명도가 바뀌고, 선택하면 그 자리가 커진다.
colors:
  ink: "#141A22"
  ink-2: "#1D2430"
  paper: "#ECE9E2"
  paper-2: "#E2DED5"
  stone: "#D9D6CE"
  fg-dark: "#F1EFEA"
  fg2-dark: "#B9BCC4"
  fg-light: "#15171A"
  fg2-light: "#5E626A"
  east: "#C0392B"
  west: "#1F2F4E"
  west-gold: "#9C8449"
  silver: "#B8BCC4"
  gray: "#8A8E95"
typography:
  title:
    fontFamily: "Nanum Brush Script, Noto Serif KR, serif"
    fontSize: "8.2cqw of the title plate (desktop one line, mobile two lines)"
    fontWeight: 400
    lineHeight: 1
  heading:
    fontFamily: "Noto Serif KR, serif"
    fontSize: "clamp(30px, 3.4vw, 46px)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  name-east:
    fontFamily: "Noto Serif KR, serif"
    fontWeight: 500
    note: "별호는 주사색, 넓은 자간"
  name-west:
    fontFamily: "Noto Serif KR, serif"
    fontWeight: 700
    note: "이명은 깊은 청색, 자간 .22em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, sans-serif"
    fontSize: "15–16px"
    lineHeight: 1.7
  label:
    fontSize: "12–13px"
    fontWeight: 700
    letterSpacing: ".06–.16em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  top: "64px (mobile 56px)"
  section: "72px top / 96px bottom"
---

# 검과 마나의 경계 디자인 기준 (1차, 그림 자산 조립)

## 콘셉트

두 문명이 지형째 맞물린 세계를, 두 벌의 부품으로 만든다. 동방 부품은 회백 종이에 먹이 번진 명패·붓끝으로 끝나는 선·주사색 낙관이고, 서방 부품은 석회색 석판·무광 은 테·아치·방패 문장이다. 회색지대는 두 재질이 톱니처럼 맞물린 띠다. 모든 장식은 `assets/skin/`(v1)·`assets/skin2/`(v2, 자리별 고정 크기)의 납품 그림이고 사이트는 그 위에 글자만 얹는다(한글·한자·영문은 그림에 없다). 코드 도형(CSS 선·원·그라데이션)으로 장식을 만들지 않는다.

지리: 동대륙 서쪽 끝 ↔ 서대륙 동쪽 끝. 장면·인물·지도·세력 어디서나 **서방 왼쪽, 동방 오른쪽**.

## 페이지와 명도

페이지는 여섯이다(index 입장 / home 장면 / characters 인물 / fronts 전선 / order 세력·체계 / start 시작). 입장 페이지가 공통 그림을 먼저 불러오므로 다음 페이지는 한 번에 그려진다. 홈은 장면 아래에 전황 띠·얼굴 띠·세계 판·문장 띠·모드를 쌓아 밀도를 만든다. 다른 페이지도 본 구간 아래에 설정 판(붉은 천·전쟁 일감·포로 / 호칭·상성·관계 단계)을 둔다.

### 부품 상자 규칙 (v2 — 늘리지 않는다)
그림 부품은 쓰이는 자리마다 그 자리의 정확한 비율로 납품받아(`design/ui-asset-order-v2.md`) **정확히 1/2 크기**로만 놓는다. 9분할·border-image·비균일 늘리기는 쓰지 않는다. 작은 부품(`.btn2` 240×66, `.btn2.sm` 160×46, `.chip2` 120×36, `.toggle` 160×56, `.rb` 48, 얼굴 액자 120)은 px 고정이고, 명패·판(`.tplate` 400×60, `.hname` 360×80, `.name2` 450×86, `.list2` 380×56, `.mi` 420×100, `.pro2` 700×200, `.p2.*`)은 `width:100% + max-width + aspect-ratio`로 좁은 화면에서 **균일 축소**만 한다. 글자는 주문서의 「글자 영역」(% padding)에만 놓고, 판 안쪽 글자가 넘치면 `.bd` 안에서만 스크롤한다. 1100px 아래에서는 넓은 판 그림 대신 질감 바탕(`.p2` → tex-paper/stone/ink)으로 바꾼다. 상태 전환은 `::before`에 겹친 상태 그림의 투명도로 한다. 이름패는 한 줄 이름만 넣고 별호·문장은 판 밖 위에 둔다. 타이틀·이름은 `fit()`이 폭에 맞춘다.

## 구간과 명도

| 구간 | 바탕 | 핵심 장치 |
|---|---|---|
| 입장 | 먹빛 밤 | 달(cover-moon) + 월마의 기운 고리 세 겹(바깥 시계 60s · 안쪽 반시계 40s · 불티 90s) + 숨 쉬는 번짐(6s). 누르면 오러 검격(35°) → 섬광 → 화면 두 조각 → 베인 틈 잔광 → 장면 |
| 장면 | 대표 인물 원화(A_1/G_1) 오른쪽 전면 | 왼쪽 열: 타이틀 먹판 + 붓글씨 → 시작 시점 → 타이틀 메뉴 명패 4장(tmenu) → 진영 토글(toggle) → 세력 판(hero-panel). 원화 오른쪽 아래 이름표(hero-name). 아래로 전황 칸(status-cell) → 얼굴 액자(face-frame) → 세계 판(sheet2, panel2-front-wide) → 문장 띠 → 모드 |
| 인물 | 종이 결(tex-paper) 회백 | 두 군의 시작 높이 차, 액자(frame-east/west), 이름패(name2-east/west), 선택 표시(mark), 제자리 확장 감상(무대 틀 stage-frame, 원고 종이 paper2/석판 slab2) |
| 전선 | 먹빛 밤(tex-ink-night) | 개념도(front-map) 위 표식(pin-gray), 선택 시 2배 확대(이동 ±50% 한계), 전선 버튼(btn2-gray) + 먹빛 정보판(panel2-front-tall), 하단 판 셋(panel2-*-mid) |
| 세력·체계 | 석재 결(tex-stone) | 세력 문장 12종, 목록 띠(list2-east/west, 회색지대는 btn2-gray), 정보판(panel2-*-wide), 호칭 판(panel2-*-short), 경지 선(power-east) + 기둥 다섯(power-west) 같은 행 정렬, 상성·관계 판(panel2-*-box) |
| 시작 | 먹빛 밤 | 모드 카드 3장(idle/selected 교체), 프롤로그 틀(prologue-east/west 700×200, 자유는 panel2-front-box) |

## 부품 규칙 (v2 고정 크기, `assets/skin2`)

- 모든 `.sk`/`.p2`는 `background: center / 100% 100%`에 상자 비율 = 그림 비율. 그림 px의 1/2가 표시 크기.
- 주 버튼 `.btn2.east/.west/.gray` 480×132 → 240×66, 글자 영역 x 90~390(padding 0 45px). hover는 `::before`, press는 `:active` 그림. 두 줄 글자는 `.two`(b 15px + small 10px).
- 작은 버튼 `.btn2.sm` 320×92 → 160×46. 칩 `.chip2.east/.west/.gray` 240×72 → 120×36(글자 x 30~210). 토글 `.toggle` 320×112 → 160×56.
- 타이틀 메뉴 `.tplate` 800×120 → 400×60(글자 18.75%~81.25%). 대표 이름표 `.hname.east` 글자 x 150~660 / `.west` x 60~520. 이름패 `.name2.east` x 170~820(왼쪽 먹획) / `.west` x 70~700(오른쪽 방패). 중립은 동방 패에 회색 별호.
- 목록 띠 `.list2.east` 글자 x 40~600 + 문장 오른쪽 / `.west` 문장 왼쪽 + 글자 x 160~720. 전체 메뉴 `.mi` 840×200 → 420×100(v1).
- 판 `.p2.hp` 380×280 / `.cell` 300×100 / `.front-tall` 440×600 / `.wide` 800×320 / `.sheet` 600×380 / `.front-wide` 1280×260 / `.paper`·`.slab` 600×700 / `.mid` 440×380 / `.short` 600×180 / `.box` 600×280. 안쪽 여백은 테(20~40px 원본) 바깥을 피한 % 값. 격자 열은 `minmax(0, W)`로 두어 1100~1360px에서 균일 축소.
- 둥근 단추 `.rb` 48px + 아이콘 `::after`(icon-*). 동방 받침 위 아이콘은 반전해 먹색으로.
- 액자 `.framed .frame` -3.125% / -2.155%(1936×1360, 창 1856×1280). 감상 무대 틀 `.v-img.wide .sframe` -4.167% / -1.736%(2384×1040, 창 2304×960), 첫등장 컷은 v1 액자.
- 얼굴 액자 `.fframe` 240 → 120, 안쪽 100 투명 위에 얼굴 100.
- 늘어나지 않는 그림(낙관·문장·핀·토큰·썸네일 틀·구분선)은 background contain, 이음 띠(seam-band)는 cover.

## 움직임

- 선택 표시 220ms, 이미지 교체 280ms(두 겹 교차, 늦은 요청은 토큰으로 버림), 공간 확대 560ms `cubic-bezier(.2,.7,.15,1)`.
- 인물 열기: 선택한 그림이 제자리에서 중앙으로 펼쳐지는 FLIP. 닫으면 같은 자리로 돌아오고 포커스 복귀.
- 지도: `translate(2(50−x)%, 2(50−y)%) scale(2)`로 표식을 중앙에(이동은 ±50%에서 멈춰 지도 밖이 보이지 않게).
- 입장: 달·고리 다섯 장이 다 오면 궤도가 900ms에 켜지고, 그 뒤에 나머지 그림을 받는다(진행 막대). 누르면 `split()`이 `.cv-body`를 35° 선으로 자른 두 `.cv-half`(clip-path polygon, 복제본은 고리 각도를 멈춰 맞춤)로 만들고 `.go`: 검격 420ms(오른쪽 위→왼쪽 아래, scaleX(-1)로 날 끝이 앞) → 섬광 150ms부터 560ms → 베인 틈 230ms부터 → 두 조각 280ms부터 760ms 밀려남 → 980ms에 장면으로. 장면 페이지는 sessionStorage `hb-cut`을 보고 베인 틈 잔광(`.cut-after`)을 1.5초 남긴다.
- 페이지 전환 `go()`: 먹 번짐 마스크(wipe-ink-1~3 중 하나, 동방·장면 페이지) 또는 오러 쐐기(wipe-aura, 전선·시작)가 `mask-size` 0 → 320vmax로 520ms 자라 화면을 덮고 500ms에 이동. 새 페이지는 body가 360ms에 켜진다.
- 모션 감소: 전환 0ms, 같은 최종 상태, 고리 정지, 입장은 바로 이동.

## 글자

- 작품명만 붓글씨(나눔 붓). 메뉴·본문·이름은 붓글씨 금지.
- 이름·별호·구간 제목·메뉴는 Noto Serif KR. 동방 500, 서방 700.
- 본문·라벨·정보는 Pretendard. 설정집 문장 그대로, 원고는 슬롯.

## 하지 않는 것

검정 바탕 + 발광 테두리, 좌측 명단형 인물 선택, 카드 격자 반복, SF HUD·글리치·터미널, 영문 장식 라벨, 가짜 수치(병력·승률·능력치), 붓글씨·두루마리 도배, 금장 프레임을 모든 요소에.
