# 검과 마나의 경계 — 소개 사이트

무협 vs 중세 판타지 전면전 작품 「검과 마나의 경계」의 소개 사이트. 정적 HTML/CSS/JS, GitHub Pages 배포(https://moooncang.github.io/hb/).
기획: 작업 폴더의 `웹사이트 기획/검과 마나의 경계 — 소개 사이트 제작 기획.md`. 디자인 규칙: `DESIGN.md`. 제품 기준: `PRODUCT.md`.

## 페이지
- `index.html` 입장 — 달을 감싸고 도는 월마의 기운 고리 세 겹과 숨 쉬는 번짐, 그 아래 먹판 타이틀·설정 기록 로그·공통 그림 실제 로딩 진행(「등을 켜는 중」). 누르면 아르델의 오러 검격이 화면을 대각선으로 긋고 섬광과 함께 두 조각으로 갈라져 밀려나며, 베인 틈의 금빛이 장면 페이지까지 남는다
- `home.html` 장면 — 타이틀 화면. 오른쪽에 위지란/아르델 원화 전면(진영 토글로 바뀐다, 이름표는 원화 오른쪽 아래), 왼쪽 열에 타이틀판·시작 시점·타이틀 메뉴 명패 4장·진영 토글·세력 판 → 전황 칸 4개 → 17인 얼굴 액자 → 세계 판 → 세력 문장 띠 + 사다리 → 시작 모드
- `characters.html` 인물 — 얼굴 바로 가기 띠, 서방·동방 두 군 + 중립. 고르면 제자리에서 펼쳐지는 감상(설정·관계·상태별 컷·등장 카드, `#A`, `#A/16`)
- `fronts.html` 전선 — 개념도 위 표식(`#north`), 대치 세력·인물, 붉은 천·전쟁 일감·포로 판
- `order.html` 세력·체계 — 문장 12종 목록(`#murim`), 서로 부르는 말, 경지 선·기둥 도해, 상성, 관계 단계
- `start.html` 시작 — 모드 카드 3장(`#east`), 공통 규칙, 프롤로그 틀, 미연결 링크
- 머리·메뉴 마크업은 여섯 파일에 같은 블록을 복사해 둔다(빌드 도구 없음). 단축키 1~5 페이지 이동, Esc 메뉴·감상 닫기

지리: 동대륙 서쪽 끝과 서대륙 동쪽 끝이 맞붙었으므로 지도·장면·인물 모두 **서방 왼쪽, 동방 오른쪽**.

## 그림 자산
- v2 납품 원본 `design/incoming-v2/`(주문서 `design/ui-asset-order-v2.md`, 자리별 고정 크기 + 입장 연출, GPT 이미지 생성) → `tools/build-skin2.ps1`(불투명 판은 JPEG, 커버 안개·검격·섬광·달만 축소) → `assets/skin2/`
- v1 납품 원본 `design/incoming/`(주문서 `design/ui-asset-order.md`) → `tools/build-skin.ps1` → `tools/diet.ps1` → `tools/diet-panels.ps1` → `assets/skin/`. v2로 대체된 v1 부품(버튼·칩·이름패·목록 띠·판·키 비주얼)은 지웠다
- 부품은 늘리지 않는다: 그림 px의 정확히 1/2 크기 상자에 `background-size: 100% 100%`, 글자는 주문서의 글자 영역(% padding)에만. 명패·판은 `aspect-ratio`로 좁은 화면에서 균일 축소, 1100px 아래는 판 그림 대신 질감 바탕(규칙은 `DESIGN.md`). 상태 그림은 `::before`에 겹쳐 두고 투명도로 바꾼다
- 타이틀과 이름은 `main.js`의 `fit()`이 판 폭에 맞춰 글자 크기를 정한다
- 도해 좌표(경지 선 마디, 기둥 x, 지도 표식 %)는 `assets/main.js`에 있다. 그림이 바뀌면 `tools/measure.ps1`로 다시 잰다

## 파일
- `assets/data.js` 17인 / `assets/world.js` 세력·전선·체계·시작 모드·세계 문장·인물 관계 (설정집 문장 그대로, 원고는 슬롯)
- `assets/style.css`, `assets/main.js` (페이지에 있는 구간만 초기화한다)
- `img/l` 큰 이미지(가로 1600) · `img/t` 썸네일(400) · `img/card` 등장 카드 — `tools/build-images.ps1`로 원본에서 생성
- `tools/serve.js` 로컬 확인용 정적 서버 (`node tools/serve.js`)
