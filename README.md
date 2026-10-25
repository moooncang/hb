# 검과 마나의 경계 — 소개 사이트

무협 vs 중세 판타지 전면전 작품 「검과 마나의 경계」의 소개 사이트. 정적 HTML/CSS/JS, GitHub Pages 배포(https://moooncang.github.io/hb/).
기획: 작업 폴더의 `웹사이트 기획/검과 마나의 경계 — 소개 사이트 제작 기획.md`. 디자인 규칙: `DESIGN.md`. 제품 기준: `PRODUCT.md`.

## 페이지
- `index.html` 입장 — 대표 배경 위 타이틀 먹판. 공통 그림 100장을 실제로 불러온 뒤(진행 표시) 「입장하기」가 열린다. Enter 로도 입장
- `home.html` 장면 — 대표 배경에서 서방/동방 선택(배경 카메라 이동 + 대표 인물 액자 + 세력 판) → 전황 띠(네 전선) → 17인 얼굴 띠 → 세계 판(격동·회색지대·전쟁의 이유) → 세력 문장 띠 + 경지/기사 사다리 → 시작 모드
- `characters.html` 인물 — 얼굴 바로 가기 띠, 서방·동방 두 군 + 중립. 고르면 제자리에서 펼쳐지는 감상(설정·관계·상태별 컷·등장 카드, `#A`, `#A/16`)
- `fronts.html` 전선 — 개념도 위 표식(`#north`), 대치 세력·인물, 붉은 천·전쟁 일감·포로 판
- `order.html` 세력·체계 — 문장 12종 목록(`#murim`), 서로 부르는 말, 경지 선·기둥 도해, 상성, 관계 단계
- `start.html` 시작 — 모드 카드 3장(`#east`), 공통 규칙, 프롤로그 틀, 미연결 링크
- 머리·메뉴 마크업은 여섯 파일에 같은 블록을 복사해 둔다(빌드 도구 없음). 단축키 1~5 페이지 이동, Esc 메뉴·감상 닫기

지리: 동대륙 서쪽 끝과 서대륙 동쪽 끝이 맞붙었으므로 지도·장면·인물 모두 **서방 왼쪽, 동방 오른쪽**.

## 그림 자산
- 납품 원본 `design/incoming/`(주문서 `design/ui-asset-order.md`, GPT 이미지 생성) → `tools/build-skin.ps1` → `tools/diet.ps1`(표식 축소) → `tools/diet-panels.ps1`(판 투명 여백 자르고 JPEG) → `assets/skin/`
- 부품은 CSS border-image 9분할. 테두리 두께는 `tools/measure-plates.ps1`로 잰 "밝은 면" 바깥 두께 × 축척이고, 글자는 밝은 면 안에만 놓는다(규칙은 `DESIGN.md`). 상태 그림은 `::before`에 겹쳐 두고 투명도로 바꾼다
- 타이틀과 이름은 `main.js`의 `fit()`이 판 폭에 맞춰 글자 크기를 정한다
- 도해 좌표(경지 선 마디, 기둥 x, 지도 표식 %)는 `assets/main.js`에 있다. 그림이 바뀌면 `tools/measure.ps1`로 다시 잰다

## 파일
- `assets/data.js` 17인 / `assets/world.js` 세력·전선·체계·시작 모드·세계 문장·인물 관계 (설정집 문장 그대로, 원고는 슬롯)
- `assets/style.css`, `assets/main.js` (페이지에 있는 구간만 초기화한다)
- `img/l` 큰 이미지(가로 1600) · `img/t` 썸네일(400) · `img/card` 등장 카드 — `tools/build-images.ps1`로 원본에서 생성
- `tools/serve.js` 로컬 확인용 정적 서버 (`node tools/serve.js`)
