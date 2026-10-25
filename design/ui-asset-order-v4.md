# 검과 마나의 경계 사이트 그림 납품요구서 v4 — 인물 기록(두루마리 · 양피지 서류)

작성 2026-10-26 · 의뢰 문창놈 · 대상 사이트 https://moooncang.github.io/hb/

v2 §0·§1(그림체 기준, PNG 투명, 정면 평면, 글자 없음, 크기 1px도 다르면 안 됨)을 그대로 적용한다. 사이트는 늘리지 않고 **1/2 크기 또는 비율을 지킨 균일 축소**로만 놓는다. 종이 띠(E-04·W-04)만 세로로 **이어 붙여(repeat)** 쓴다. 납품 위치 `design/incoming-v4/`, 파일명 그대로.

## 개념 — 상대편이 모아 둔 기록

인물 페이지를 둘로 나눈다.
- **서방 인물 페이지 = 동방의 기록.** 동방이 서방 인물에 관해 모아 둔 **두루마리**. 호칭은 동방 별호(「금관」 등)로 적는다.
- **동방 인물 페이지 = 서방의 기록.** 서방이 동방 인물에 관해 모아 둔 **양피지 서류**. 호칭은 서방 이명(「천흑의 마녀」 등)으로 적는다.

각 페이지는 인물마다 **기록 한 장(카드)**을 세로로 쌓고, 누르면 **긴 기록(상세)**이 펼쳐진다. 카드는 가로(데스크톱)와 세로(모바일) 두 모양, 긴 기록은 위 끝·종이 띠·아래 끝 세 장을 쌓아 길이를 맞춘다. 그림(인물 컷)과 글자는 사이트가 얹는다. **그림 안에 글자·문양·도장 글씨를 넣지 않는다.**

---

## 1. 동방의 기록 — 두루마리 (서방 인물 페이지)

재질: 회백 종이, 비단 테(짙은 남청 바탕에 옅은 운문), 검은 옻칠 나무 축과 붉은 끈. 어두운 먹빛 방 안의 탁자 위에 펼친 느낌이지만 **바탕은 그리지 않는다**(투명).

### E-01 가로 두루마리 카드 (투명 바깥)
- 파일 `scroll-card.png` **2200×1040**. 표시 1100×520
- 왼쪽 축 x 0~150(나무 봉 + 끈 매듭), 오른쪽 축 x 2050~2200. 종이 면 x 150~2050 / y 60~980. 위아래 비단 테 y 0~60, 980~1040. 축 바깥·모서리는 투명
- **그림 자리 x 220~1080, y 160~754** (860×594, 인물 컷 1856:1280 비율). 이 자리는 종이 면과 같은 균일한 면이면 된다(사이트가 그림을 얹는다). 둘레에 가는 먹선 한 줄 가능
- **글자 자리 x 1160~1980, y 150~900.** 균일한 면
```
EAST. A horizontal Chinese-style handscroll fully unrolled on a transparent 2200x1040 canvas: black lacquered wooden rollers with red cord knots at the far left (x 0-150) and far right (x 2050-2200), dark indigo silk borders with faint cloud pattern along the top (y 0-60) and bottom (y 980-1040), and a uniform pale grey-white paper face between (x 150-2050, y 60-980). A thin ink rule may outline a rectangle at x 220-1080, y 160-754. No text, no stamps, no drawings on the paper. Everything outside the scroll fully transparent.
```

### E-02 세로 두루마리 카드 (투명 바깥) — 모바일
- 파일 `scroll-card-v.png` **1000×1800**. 표시 500×900(화면 폭에 맞춰 균일 축소)
- 위 축 y 0~120(봉·끈·걸고리), 아래 축 y 1680~1800. 비단 테 x 0~50, 950~1000. 종이 면 x 50~950 / y 120~1680
- **그림 자리 x 100~900, y 200~752** (800×552). **글자 자리 x 110~890, y 820~1620**
```
EAST. A vertical hanging scroll on a transparent 1000x1800 canvas: top roller with cord and hook (y 0-120), bottom roller (y 1680-1800), dark indigo silk borders down both sides (x 0-50, 950-1000), uniform pale paper face between. A thin ink rule may outline a rectangle at x 100-900, y 200-752. No text, no stamps. Outside the scroll fully transparent.
```

### E-03 긴 두루마리 · 위 끝 (투명 바깥)
- 파일 `scroll-top.png` **2400×400**. 표시 1200×200
- 위 축(y 0~120)과 비단 윗테(y 120~200), 그 아래 y 200~400은 **종이 면**. 좌우 비단 세로 테 x 0~120, 2280~2400. 종이 면 x 120~2280
- 아래 끝(y 400)은 E-04의 위 끝과 **색·결이 똑같이** 이어진다
```
EAST. The top end of a long vertical scroll on a transparent 2400x400 canvas: top roller with cord (y 0-120), dark indigo silk header (y 120-200), then uniform pale paper (y 200-400) with indigo silk side borders at x 0-120 and x 2280-2400. The bottom edge must continue seamlessly into a plain paper strip. No text.
```

### E-04 긴 두루마리 · 종이 띠 (이어 붙임)
- 파일 `scroll-paper.png` **2400×800**. 표시 1200×400, 세로로 반복
- 좌우 비단 세로 테 x 0~120, 2280~2400. 가운데 x 120~2280은 **균일한 종이 면**(옅은 결만). **위 끝과 아래 끝이 똑같아서** 여러 장을 세로로 이어 붙여도 티가 나지 않아야 한다. 얼룩·무늬·그림자 없음
```
EAST. A seamlessly tileable vertical strip of a long scroll on a 2400x800 canvas: dark indigo silk side borders (x 0-120, 2280-2400) and a uniform pale paper face between with only a very faint fiber texture, no blotches, no pattern, no shading; the top and bottom edges identical so copies stack without a visible seam. No text.
```

### E-05 긴 두루마리 · 아래 끝 (투명 바깥)
- 파일 `scroll-bottom.png` **2400×400**. 표시 1200×200
- 위 y 0~200 종이 면(E-04와 이어짐), 비단 아랫테 y 200~280, 아래 축 y 280~400
```
EAST. The bottom end of a long vertical scroll on a transparent 2400x400 canvas: plain paper (y 0-200) continuing seamlessly from a paper strip, indigo silk footer (y 200-280), bottom roller with cord (y 280-400), silk side borders at x 0-120 and 2280-2400. No text.
```

---

## 2. 서방의 기록 — 양피지 서류 (동방 인물 페이지)

재질: 누런 양피지(가장자리 그을리고 찢김), 짙은 갈색 가죽 서류철, 무광 은 테와 붉은 밀랍 인장(**인장 면은 매끈, 문양 없음**), 리본 끈. 바탕은 투명.

### W-01 가로 서류 카드 (투명 바깥)
- 파일 `dossier-card.png` **2200×1040**. 표시 1100×520
- 가죽 서류철 x 0~2200 / y 0~1040(모서리 둥글게 닳음), 그 위에 양피지 한 장 x 120~2080 / y 60~980(모서리 살짝 말림, 왼쪽 위에 붉은 밀랍 인장과 리본, 인장은 그림·글자 자리를 피해 x 130~260 / y 70~200)
- **그림 자리 x 220~1080, y 160~754.** 둘레에 가는 잉크 선 한 줄 가능. **글자 자리 x 1160~1980, y 150~900.** 균일한 면
```
WEST. A single parchment sheet lying on a dark brown leather folder, on a transparent 2200x1040 canvas: the folder fills the canvas with worn rounded corners, the parchment (x 120-2080, y 60-980) is aged yellow with scorched torn edges and slightly curled corners, a smooth red wax seal with a ribbon sits at the top-left (x 130-260, y 70-200). A thin ink rule may outline a rectangle at x 220-1080, y 160-754. The rest of the parchment face is uniform. No text, no emblem on the seal.
```

### W-02 세로 서류 카드 (투명 바깥) — 모바일
- 파일 `dossier-card-v.png` **1000×1800**. 표시 500×900
- 가죽 서류철 전체, 양피지 x 50~950 / y 60~1740, 인장·리본 왼쪽 위 x 60~190 / y 70~200
- **그림 자리 x 100~900, y 200~752. 글자 자리 x 110~890, y 820~1620**
```
WEST. A tall parchment sheet on a dark leather folder on a transparent 1000x1800 canvas, aged yellow with scorched torn edges, a smooth red wax seal with ribbon at the top-left (x 60-190, y 70-200). A thin ink rule may outline a rectangle at x 100-900, y 200-752. Uniform parchment face elsewhere. No text.
```

### W-03 긴 서류 · 위 끝 (투명 바깥)
- 파일 `dossier-top.png` **2400×400**. 표시 1200×200
- 가죽 서류철 x 0~2400(위 모서리), 양피지 위 가장자리(그을리고 찢긴 y 60~200), 밀랍 인장과 리본 왼쪽 위(x 150~300, y 80~220), 그 아래 y 200~400 **균일한 양피지 면** x 120~2280. 아래 끝은 W-04와 똑같이 이어진다
```
WEST. The top of a long parchment document on a dark leather folder, transparent 2400x400 canvas: scorched torn parchment top edge (y 60-200), a smooth red wax seal with ribbon at the top-left (x 150-300, y 80-220), then uniform aged parchment (y 200-400, x 120-2280) with the leather folder visible at x 0-120 and 2280-2400. Bottom edge continues seamlessly into a plain parchment strip. No text.
```

### W-04 긴 서류 · 양피지 띠 (이어 붙임)
- 파일 `dossier-paper.png` **2400×800**. 표시 1200×400, 세로로 반복
- 좌우 가죽 x 0~120, 2280~2400. 가운데 **균일한 양피지 면**. 위 끝과 아래 끝이 똑같다
```
WEST. A seamlessly tileable vertical strip, 2400x800: dark leather folder at the sides (x 0-120, 2280-2400), uniform aged parchment between with only faint grain, no blotches, no shading; top and bottom edges identical so copies stack without a visible seam. No text.
```

### W-05 긴 서류 · 아래 끝 (투명 바깥)
- 파일 `dossier-bottom.png` **2400×400**. 표시 1200×200
- 위 y 0~200 양피지 면(W-04와 이어짐), 아래 가장자리 그을리고 찢김(y 200~340), 가죽 서류철 아래 모서리
```
WEST. The bottom of a long parchment document on a dark leather folder, transparent 2400x400 canvas: plain parchment (y 0-200) continuing seamlessly from a parchment strip, scorched torn bottom edge (y 200-340), leather folder bottom edge with worn corners. No text.
```

---

## 3. 검수 기준
- [ ] 크기·파일명 일치. 카드 두 종류는 그림 자리·글자 자리가 **균일한 면**이고 그 좌표가 위와 같다
- [ ] E-04·W-04는 위 끝과 아래 끝이 같다(두 장을 세로로 붙여 보고 이음이 보이지 않아야 한다). E-03·W-03의 아래 끝, E-05·W-05의 위 끝도 그 띠와 같다
- [ ] 글자·문양·도장 글씨 없음. 인장은 매끈한 밀랍
- [ ] 동방 두루마리는 남청 비단·옻칠 축·붉은 끈, 서방 서류는 양피지·가죽·밀랍·리본. 금장 테두리 남발 없음

납품 후 처리(사이트 쪽): `tools/build-skin4.ps1` → `assets/skin4/`, `assets/main.js`의 `ART.doc`을 켜면 기록 카드와 긴 기록이 그림으로 바뀐다(그 전까지는 종이·석재 질감 판).
