// 세력·전선·힘의 체계 — 출처: 캐릭터 챗/03 세계·인물 설정집.md §2~§4. 문장은 설정집 그대로, 새 설정을 만들지 않는다.
window.HB.factions = [
  { id: 'daehwi', side: 'east', name: '대휘 황조', hanja: '大徽', note: '황도 휘경. 전쟁의 주체이며 관군이 남부 역류하 전선을 맡는다', chars: ['D'], fronts: ['south'] },
  { id: 'murim', side: 'east', name: '무림맹', note: '정파 연합. 서부전선 본진 천문관을 지킨다. 태허관(도문·검)과 운각사(불문)가 주축이다', chars: ['E', 'B', 'O', 'N', 'F'], fronts: ['center'] },
  { id: 'mugan', side: 'east', name: '무간교', hanja: '無間敎', note: '마교. 총단 천흑산이 북쪽 접경에 있어 격동 때 절반이 무너졌고, 가장 먼저, 가장 오래 서방과 싸웠다', chars: ['A'], fronts: ['north'] },
  { id: 'sagal', side: 'east', name: '사갈련', hanja: '蛇蝎聯', note: '사파 연합. 밀수·청부·용병으로 전쟁 특수를 누리고, 정파가 체면 때문에 못 하는 일을 맡는다', chars: ['C'], fronts: [] },
  { id: 'gardeon', side: 'west', name: '가르데온 왕국', note: '최전선 왕국. 격동 때 동부 영토를 잃었다. 발트로크 성채가 서방 본진이다', chars: ['L', 'G'], fronts: ['center'] },
  { id: 'selbar', side: 'west', name: '셀바르 왕국', note: '동맹 왕국. 남부, 역류하 도하군', chars: ['P'], fronts: ['south'] },
  { id: 'tower', side: 'west', name: '백은 마탑', note: '마법사 집단. 동방 무공을 연구 대상으로 본다', chars: ['H'], fronts: ['center'] },
  { id: 'church', side: 'west', name: '성휘 교단', note: '서방의 국교. 동방의 기를 "마나 없는 사술"로 규정한다', chars: ['I'], fronts: [] },
  { id: 'isbel', side: 'west', name: '이스벨 숲', note: '엘프. 격동으로 숲의 동쪽 절반이 회색지대에 삼켜졌다. 성약군에 들었지만 인간도 믿지 않는다', chars: ['J'], fronts: ['north'] },
  { id: 'bardun', side: 'west', name: '바르둔 산왕국', note: '드워프. 공성병기와 룬 갑주를 댄다. 대가는 격석 채굴권이다', chars: ['K'], fronts: ['center', 'fault'] },
  { id: 'crow', side: 'west', name: '용병단 「잿까마귀」', note: '성약군 고용 용병단. 정규군이 꺼리는 야습·포로 호송·몸값 거래를 맡는다', chars: ['Q'], fronts: [] },
  { id: 'inn', side: 'neutral', name: '쌍등객잔', note: '동방식 종이 등과 서방식 기름 등을 나란히 내건 객잔. 칼은 문밖에 두는 것이 규칙이다', chars: ['M'], fronts: [] }
];
window.HB.fronts = [
  { id: 'north', name: '북부', place: '천흑산 ↔ 이스벨 숲', note: '무간교와 엘프의 전선. 숲을 태우는 쪽과 숲에서 쏘는 쪽이다. 증오가 가장 깊다', east: ['mugan'], west: ['isbel'], chars: ['A', 'J'] },
  { id: 'center', name: '중앙', place: '천문관 ↔ 발트로크 성채', note: '공성전. 성약군이 천문관을 매일 두드린다. 드워프 공성병기와 무림맹의 기관진식이 맞붙는다', east: ['murim'], west: ['gardeon', 'tower', 'bardun'], chars: ['B', 'E', 'N', 'O', 'F', 'G', 'L', 'K', 'H'] },
  { id: 'fault', name: '단층곡', place: '격석 광맥', note: '대군이 들어갈 수 없는 협곡이라 정예끼리 싸운다', east: [], west: ['bardun'], chars: [] },
  { id: 'south', name: '남부', place: '역류하', note: '격동으로 물길이 거꾸로 흐르게 된 강. 셀바르군이 건너와 교두보를 세웠고, 대휘 관군이 밀어내려 한다', east: ['daehwi'], west: ['selbar'], chars: ['D', 'P'] }
];
// 힘의 체계. row = 동방 경지 7단에 맞춘 대략적 대응(설정집 「대응 감각」). 대응이 없는 체계는 row 없이 둔다
window.HB.power = {
  east: [
    { name: '삼류', row: 0 }, { name: '이류', row: 1, chars: ['D', 'F'] }, { name: '일류', row: 2 },
    { name: '절정', row: 3, note: '검기', chars: ['C', 'N'] }, { name: '초절정', row: 4, note: '검강', chars: ['O'] },
    { name: '화경', row: 5, note: '이기어검', chars: ['A', 'B'] }, { name: '현경', row: 6, chars: ['E'] }
  ],
  eastNote: '내공은 갑자(60년 수련분) 단위로 센다. 호흡으로 자연의 기를 단전에 축적하고, 경맥으로 돌려 몸 강화·검기·장력을 낸다',
  west: [
    { name: '기사 · 오러', steps: [{ name: '오러 유저' }, { name: '익스퍼트 초급', row: 2 }, { name: '익스퍼트 중급', row: 3, chars: ['P', 'Q'] }, { name: '익스퍼트 상급', row: 4, note: '오러 블레이드' }, { name: '소드 마스터', row: 5, chars: ['G'] }, { name: '그랜드 소드 마스터', row: 6, chars: ['L'] }] },
    { name: '마법사 · 서클', steps: [{ name: '1~4서클' }, { name: '5서클', row: 3 }, { name: '6서클', row: 4, chars: ['H'] }, { name: '7~8서클', row: 5 }, { name: '9서클', row: 6 }] },
    { name: '사제 · 신성력', steps: [{ name: '사제' }, { name: '주교', chars: ['I'] }, { name: '대주교' }, { name: '성좌' }] },
    { name: '엘프 · 정령 계약', steps: [{ name: '하급' }, { name: '중급' }, { name: '상급', chars: ['J'] }] },
    { name: '드워프 · 룬 각인', steps: [{ name: '룬 각인사', chars: ['K'] }] }
  ],
  westNote: '오러는 마나를 몸 안에 축적해 인간의 힘으로, 마법은 마나를 몸 밖으로 방출해 현상으로 개변, 신성력은 기도로 받은 마나',
  map: '대략 절정 ≈ 익스퍼트 중급 ≈ 5서클, 초절정 ≈ 익스퍼트 상급 ≈ 6서클, 화경 ≈ 소드 마스터 ≈ 7~8서클, 현경 ≈ 그랜드 소드 마스터 ≈ 9서클'
};
window.HB.modes = [
  { id: 'east', name: '무림 측', note: 'ⓤ는 징무령으로 서부전선에 온 동방인이다. 문파·경지·무공·내력은 ⓤ가 정한다. 시작 장소는 천문관, 안내역 후보는 노칠', img: 'B' },
  { id: 'west', name: '서방 측', note: 'ⓤ는 성약군 소속 서방인이다. 기사·마법사·사제·용병 무엇이든, 출신과 등급은 ⓤ가 정한다. 시작 장소는 발트로크 성채, 안내역 후보는 오그딘', img: 'L' },
  { id: 'free', name: '자유모드', note: '소속·위치·전력·출발 상태를 ⓤ가 지정한다. 중립·탈영병·투항자·제3세력 무엇이든 그대로 확정한다', img: '' }
];
