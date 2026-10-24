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

두 문명이 지형째 맞물린 세계를, 두 벌의 부품으로 만든다. 동방 부품은 회백 종이에 먹이 번진 명패·붓끝으로 끝나는 선·주사색 낙관이고, 서방 부품은 석회색 석판·무광 은 테·아치·방패 문장이다. 회색지대는 두 재질이 톱니처럼 맞물린 띠다. 모든 장식은 `assets/skin/`의 납품 그림이고 사이트는 그 위에 글자만 얹는다(한글·한자·영문은 그림에 없다). 코드 도형(CSS 선·원·그라데이션)으로 장식을 만들지 않는다.

지리: 동대륙 서쪽 끝 ↔ 서대륙 동쪽 끝. 장면·인물·지도·세력 어디서나 **서방 왼쪽, 동방 오른쪽**.

## 구간과 명도

| 구간 | 바탕 | 핵심 장치 |
|---|---|---|
| 장면 | 대표 배경(key-visual) 전면 | 타이틀 먹판 + 붓글씨, 서방/동방 선택 → 배경 카메라 이동, 대표 인물 액자와 세력 판 등장 |
| 인물 | 종이 결(tex-paper) 회백 | 두 군의 시작 높이 차, 액자(frame-east/west), 이름패(name-east/west), 선택 표시(mark), 제자리 확장 감상 |
| 전선 | 먹빛 밤(tex-ink-night) | 개념도(front-map) 위 표식(pin-gray), 선택 시 2배 확대, 먹빛 정보판(panel-front) |
| 세력·체계 | 석재 결(tex-stone) | 세력 문장 12종, 목록 띠(list-east/west), 경지 선(power-east) + 기둥 다섯(power-west) 같은 행 정렬 |
| 시작 | 먹빛 밤 | 모드 카드 3장(idle/selected 교체), 프롤로그 틀(prologue-east/west, 자유는 panel-front) |

## 부품 규칙 (9분할 border-image)

- 주 버튼 `.btn.east/.west` 720×200 → 슬라이스 36 110, 표시 24px 74px. hover/press 그림 교체. 보조 `.btn.gray` 600×160 → 32 100.
- 칩 `.chip.east/.west` 360×96 → 0 48. 선택 상태 그림 교체. `.chip.gray`는 btn-gray를 재사용.
- 둥근 단추 `.rb` 48px + 아이콘 `::after`(icon-*). 동방 받침 위 아이콘은 반전해 먹색으로.
- 이름패 `.nameplate.east` 30 60 30 160(왼쪽 먹획), `.west` 30 160 30 60(오른쪽 방패). 글자는 border 안쪽에만.
- 정보판 `.panel.east/.west/.gray/.front` 56 fill. 원고 판 `.sheet.east/.west`. 프롤로그 `.pro`.
- 액자 `.framed .frame`은 그림 바깥 -3.125% / -2.155%에 겹친다(1936×1360 안쪽 창 1856×1280).
- 늘어나지 않는 그림(낙관·문장·핀·토큰·썸네일 틀)은 background contain.

## 움직임

- 선택 표시 220ms, 이미지 교체 280ms(두 겹 교차, 늦은 요청은 토큰으로 버림), 공간 확대 560ms `cubic-bezier(.2,.7,.15,1)`.
- 인물 열기: 선택한 그림이 제자리에서 중앙으로 펼쳐지는 FLIP. 닫으면 같은 자리로 돌아오고 포커스 복귀.
- 지도: `translate(2(50−x)%, 2(50−y)%) scale(2)`로 표식을 중앙에.
- 모션 감소: 전환 0ms, 같은 최종 상태.

## 글자

- 작품명만 붓글씨(나눔 붓). 메뉴·본문·이름은 붓글씨 금지.
- 이름·별호·구간 제목·메뉴는 Noto Serif KR. 동방 500, 서방 700.
- 본문·라벨·정보는 Pretendard. 설정집 문장 그대로, 원고는 슬롯.

## 하지 않는 것

검정 바탕 + 발광 테두리, 좌측 명단형 인물 선택, 카드 격자 반복, SF HUD·글리치·터미널, 영문 장식 라벨, 가짜 수치(병력·승률·능력치), 붓글씨·두루마리 도배, 금장 프레임을 모든 요소에.
