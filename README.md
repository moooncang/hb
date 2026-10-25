# 검과 마나의 경계 — 소개 사이트

무협 vs 중세 판타지 전면전 작품 「검과 마나의 경계」의 소개 사이트. 정적 HTML/CSS/JS, GitHub Pages 배포(https://moooncang.github.io/hb/).
기획: 작업 폴더의 `웹사이트 기획/검과 마나의 경계 — 소개 사이트 제작 기획.md`. 디자인 규칙: `DESIGN.md`. 제품 기준: `PRODUCT.md`.

## 페이지 (ILEON처럼 페이지를 나눈다)
- `index.html` 장면 — 대표 배경 위 타이틀, 서방/동방 선택(배경 카메라 이동 + 대표 인물 액자 + 세력 판), 아래에 네 페이지로 가는 문
- `characters.html` 인물 — 서방·동방 두 군 + 중립. 고르면 제자리에서 펼쳐지는 감상(`#A`, `#A/16`)
- `fronts.html` 전선 — 개념도 위 표식. 고르면 2배 확대 + 대치 세력·인물(`#north`)
- `order.html` 세력·체계 — 문장 12종 목록, 경지 선·기둥 도해(같은 행 = 설정집 「대응 감각」)
- `start.html` 시작 — 모드 카드 3장, 프롤로그 틀, 미연결 링크
- 머리·메뉴 마크업은 다섯 파일에 같은 블록을 복사해 둔다(빌드 도구 없음). 고칠 때 다섯 군데 같이 고친다

지리: 동대륙 서쪽 끝과 서대륙 동쪽 끝이 맞붙었으므로 지도·장면·인물 모두 **서방 왼쪽, 동방 오른쪽**.

## 그림 자산
- 납품 원본 `design/incoming/`(주문서 `design/ui-asset-order.md`, GPT 이미지 생성) → `tools/build-skin.ps1` → `assets/skin/`(불투명 배경은 JPEG, 투명 부품은 PNG). 자산을 다시 받으면 스크립트만 다시 돌린다
- 부품은 CSS border-image 9분할로 늘려 쓰고 글자는 사이트가 얹는다. 상자 규칙(content-box, 고정 글자 상자 높이)은 `DESIGN.md`
- 도해 좌표(경지 선 마디, 기둥 x, 지도 표식 %)는 `assets/main.js`와 `style.css`에 있다. 그림이 바뀌면 `tools/measure.ps1`로 다시 잰다

## 파일
- `assets/data.js` 17인 / `assets/world.js` 세력·전선·체계·시작 모드 (설정집 문장 그대로, 원고는 슬롯)
- `assets/style.css`, `assets/main.js` (페이지에 있는 구간만 초기화한다)
- `img/l` 큰 이미지(가로 1600) · `img/t` 썸네일(400) · `img/card` 등장 카드 — `tools/build-images.ps1`로 원본에서 생성
- `tools/serve.js` 로컬 확인용 정적 서버 (`node tools/serve.js`)
