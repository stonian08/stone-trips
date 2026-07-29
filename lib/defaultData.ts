import { TripDay } from "./types";

export const STORAGE_KEY = "stone-trips-v1-stage3-days";
export const CONTENT_ID = "amsterdam-2026";

export const defaultDays: TripDay[] = [
  {
    day: 1,
    date: "2026.08.06 (목)",
    title: "Arrival in Amsterdam",
    subtitle: "Start of Our Journey",
    summary: "인천에서 암스테르담까지 이동하고 호텔에 체크인하는 날",
    route: "ICN → CDG → AMS → Amsterdam Centraal → ibis Amsterdam Centre",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    transport: "AF0267 → CDG 환승 → AF8346(KLM) → NS 열차 → 도보",
    tip: "파리 환승 시 쇼핑보다 Terminal 2F 이동과 쉥겐 입국심사를 우선하세요.",
    highlights: ["파리 환승", "스키폴공항 입국", "암스테르담 중앙역 첫인상"],
    food: [{ name: "도착 후 간단한 식사", type: "저녁", note: "중앙역 또는 호텔 인근에서 가볍게", mapUrl: "https://www.google.com/maps/search/?api=1&query=restaurants+near+ibis+Amsterdam+Centre" }],
    reservations: [
      { name: "AF0267 / AF8346", time: "11:40 / 20:15", code: "", note: "항공권·좌석·수하물 확인" },
      { name: "ibis Amsterdam Centre", time: "23:20 전후", code: "", note: "2박 체크인" }
    ],
    budget: [{ label: "공항→시내 교통", amount: "€6 내외" }, { label: "간식·생수", amount: "€5~10" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=Amsterdam+Airport+Schiphol&destination=ibis+Amsterdam+Centre&travelmode=transit",
    notes: "도착 후 무리하지 말고 휴대폰 충전과 다음 날 예약만 확인합니다.",
    checklist: ["여권·수하물 확인", "호텔 체크인", "OVpay 사용 준비", "다음 날 예약 확인"],
    schedule: [
      { id: "d1-1", time: "08:30", title: "인천공항 도착", description: "체크인과 출국 수속", icon: "🧳" },
      { id: "d1-2", time: "11:40", title: "인천 출발", description: "AF0267 · 파리 샤를드골공항 이동", icon: "✈️" },
      { id: "d1-3", time: "18:40", title: "파리 도착", description: "Terminal 2E 도착 후 환승", icon: "🛬" },
      { id: "d1-4", time: "20:15", title: "파리 출발", description: "AF8346(KLM) · Terminal 2F", icon: "🔄" },
      { id: "d1-5", time: "21:25", title: "스키폴공항 도착", description: "입국심사와 수하물 수령", icon: "🇳🇱" },
      { id: "d1-6", time: "23:20", title: "호텔 체크인", description: "ibis Amsterdam Centre", icon: "🏨" }
    ]
  },
  {
    day: 2,
    date: "2026.08.07 (금)",
    title: "Historic Amsterdam",
    subtitle: "Old City & Canal Life",
    summary: "담 광장과 왕궁, 꽃시장, 렘브란트광장을 따라 암스테르담 구시가지를 걷는 날",
    route: "ibis → Amsterdam Centraal → Dam Square → Royal Palace → Flower Market → Rembrandtplein → Blue Amsterdam → ibis",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    transport: "도보 중심 + 필요 시 트램",
    tip: "왕궁 운영 여부와 입장 시간을 전날 확인하고, 구시가지는 도보 이동이 가장 편합니다.",
    highlights: ["Amsterdam Centraal", "담 광장", "암스테르담 왕궁", "꽃시장", "렘브란트광장", "Blue Amsterdam 전망"],
    food: [
      { name: "The Pantry", type: "점심", note: "네덜란드 전통요리", mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Pantry+Amsterdam" },
      { name: "Blue Amsterdam", type: "카페", note: "도심 전망 카페", mapUrl: "https://www.google.com/maps/search/?api=1&query=Blue+Amsterdam" },
      { name: "van Wonderen Stroopwafels", type: "간식", note: "스트룹와플", mapUrl: "https://www.google.com/maps/search/?api=1&query=van+Wonderen+Stroopwafels+Amsterdam" }
    ],
    reservations: [{ name: "Royal Palace Amsterdam", time: "10:25", code: "", note: "운영 여부 확인" }],
    budget: [{ label: "왕궁 입장", amount: "약 €13" }, { label: "식사·카페", amount: "€35~50" }, { label: "교통", amount: "€5 내외" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=ibis+Amsterdam+Centre&destination=Blue+Amsterdam&waypoints=Amsterdam+Centraal%7CDam+Square%7CRoyal+Palace+Amsterdam%7CBloemenmarkt%7CRembrandtplein&travelmode=walking",
    morningMapUrl: "https://www.google.com/maps/dir/?api=1&origin=ibis+Amsterdam+Centre&destination=Bloemenmarkt&waypoints=Amsterdam+Centraal%7CDam+Square%7CRoyal+Palace+Amsterdam&travelmode=walking",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Bloemenmarkt&destination=ibis+Amsterdam+Centre&waypoints=The+Pantry+Amsterdam%7CRembrandtplein%7CBlue+Amsterdam&travelmode=walking",
    notes: "오후 자유 쇼핑 시간을 확보하고, 피곤하면 렘브란트광장 이후 일정을 줄입니다.",
    checklist: ["왕궁 운영 확인", "편한 신발", "보조배터리", "OVpay"],
    schedule: [
      { id: "d2-1", time: "08:30", title: "호텔 출발", description: "중앙역 방향으로 도보 이동", icon: "🚶" },
      { id: "d2-2", time: "09:00", title: "Amsterdam Centraal", description: "중앙홀과 IJ강 전망", icon: "🚉" },
      { id: "d2-3", time: "09:35", title: "담 광장", description: "광장과 주변 역사 건축", icon: "🏛️" },
      { id: "d2-4", time: "10:25", title: "암스테르담 왕궁", description: "내부 관람 약 1시간", icon: "👑" },
      { id: "d2-5", time: "11:35", title: "꽃시장", description: "Bloemenmarkt 산책", icon: "🌷" },
      { id: "d2-6", time: "12:30", title: "The Pantry", description: "네덜란드 전통요리 점심", icon: "🍽️" },
      { id: "d2-7", time: "14:00", title: "렘브란트광장", description: "광장과 주변 산책", icon: "🎨" },
      { id: "d2-8", time: "14:45", title: "Blue Amsterdam", description: "전망과 휴식", icon: "☕" },
      { id: "d2-9", time: "16:00", title: "스트룹와플", description: "van Wonderen 방문", icon: "🧇" },
      { id: "d2-10", time: "18:30", title: "저녁식사", description: "구시가지에서 자유 식사", icon: "🌙" }
    ]
  },
  {
    day: 3,
    date: "2026.08.08 (토)",
    title: "Museumplein & Zaandam",
    subtitle: "Dutch Masters",
    summary: "국립미술관과 반 고흐 미술관을 관람한 뒤 잔담으로 숙소를 옮기는 날",
    route: "ibis 체크아웃 → Rijksmuseum → The Seafood Bar → Van Gogh Museum → Moco Museum → ibis → Zaandam → Inntel Hotels",
    heroImage: "https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&w=1600&q=85",
    transport: "트램 + 도보 + Amsterdam Centraal에서 Zaandam행 NS 열차",
    tip: "국립미술관은 Gallery of Honour부터 보고, 반 고흐 미술관은 예약 시간보다 15분 일찍 도착하세요.",
    highlights: ["Rijksmuseum", "Van Gogh Museum", "Moco Museum", "Inntel Hotels Amsterdam Zaandam"],
    food: [
      { name: "The Seafood Bar", type: "점심", note: "해산물·홍합·Fish & Chips", mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Seafood+Bar+Museumplein" },
      { name: "Blushing Amsterdam", type: "카페", note: "커피와 가벼운 휴식", mapUrl: "https://www.google.com/maps/search/?api=1&query=Blushing+Amsterdam" }
    ],
    reservations: [
      { name: "Rijksmuseum", time: "09:00", code: "", note: "온라인 티켓 확인" },
      { name: "Van Gogh Museum", time: "13:30", code: "", note: "시간 지정 예약 필수" },
      { name: "Inntel Hotels Amsterdam Zaandam", time: "19:00", code: "", note: "2박 체크인" }
    ],
    budget: [{ label: "미술관", amount: "€45~60" }, { label: "식사·카페", amount: "€40~55" }, { label: "잔담 이동", amount: "€4~7" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=ibis+Amsterdam+Centre&destination=Inntel+Hotels+Amsterdam+Zaandam&waypoints=Rijksmuseum%7CThe+Seafood+Bar+Museumplein%7CVan+Gogh+Museum%7CMoco+Museum&travelmode=transit",
    morningMapUrl: "https://www.google.com/maps/dir/?api=1&origin=ibis+Amsterdam+Centre&destination=The+Seafood+Bar+Museumplein&waypoints=Rijksmuseum&travelmode=transit",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=The+Seafood+Bar+Museumplein&destination=Inntel+Hotels+Amsterdam+Zaandam&waypoints=Van+Gogh+Museum%7CMoco+Museum%7Cibis+Amsterdam+Centre&travelmode=transit",
    notes: "호텔에 짐을 맡기고 미술관을 관람한 뒤 중앙역에서 짐을 찾아 잔담으로 이동합니다.",
    checklist: ["미술관 예약 QR", "호텔 체크아웃", "짐 보관 영수증", "잔담행 열차 확인"],
    schedule: [
      { id: "d3-1", time: "08:00", title: "호텔 체크아웃", description: "짐 보관 후 뮤지엄플레인 이동", icon: "🧳" },
      { id: "d3-2", time: "09:00", title: "Rijksmuseum", description: "네덜란드 황금시대 명작 관람", icon: "🖼️" },
      { id: "d3-3", time: "12:10", title: "The Seafood Bar", description: "점심식사", icon: "🦪" },
      { id: "d3-4", time: "13:30", title: "Van Gogh Museum", description: "해바라기·아를의 침실·자화상", icon: "🌻" },
      { id: "d3-5", time: "15:40", title: "Moco Museum", description: "선택 관람", icon: "🎨" },
      { id: "d3-6", time: "16:40", title: "Blushing Amsterdam", description: "카페 휴식", icon: "☕" },
      { id: "d3-7", time: "18:30", title: "잔담 이동", description: "Amsterdam Centraal → Zaandam", icon: "🚆" },
      { id: "d3-8", time: "19:00", title: "Inntel 체크인", description: "잔담 시내 저녁 산책", icon: "🏨" }
    ]
  },
  {
    day: 4,
    date: "2026.08.09 (일)",
    title: "Zaanse Schans & Jordaan",
    subtitle: "Windmills & Canal Streets",
    summary: "잔담과 잔세스칸스의 풍차 풍경을 보고 암스테르담 조르단과 안네 프랑크 하우스 주변을 걷는 날",
    route: "Inntel → Zaandam 시청광장 → Zaanse Schans → De Kraai → Jordaan → Anne Frank House → Moeders → Inntel",
    heroImage: "https://images.unsplash.com/photo-1590165900724-f1f343bcc00d?auto=format&fit=crop&w=1600&q=85",
    transport: "도보 + 버스 391 + NS 열차",
    tip: "잔세스칸스는 오전에 가야 비교적 한적합니다. 바람이 강할 수 있어 얇은 겉옷을 준비하세요.",
    highlights: ["Inntel Hotels 외관", "Zaanse Schans", "Jordaan", "Anne Frank House 주변"],
    food: [
      { name: "De Kraai", type: "점심", note: "잔세스칸스 팬케이크", mapUrl: "https://www.google.com/maps/search/?api=1&query=De+Kraai+Zaanse+Schans" },
      { name: "Stefs Bakery", type: "카페", note: "샌드위치와 베이커리", mapUrl: "https://www.google.com/maps/search/?api=1&query=Stefs+Bakery+Amsterdam" },
      { name: "Moeders", type: "저녁", note: "네덜란드 가정식", mapUrl: "https://www.google.com/maps/search/?api=1&query=Moeders+Amsterdam" }
    ],
    reservations: [{ name: "Anne Frank House", time: "18:00", code: "", note: "내부 관람 시 온라인 사전예약 필수" }],
    budget: [{ label: "교통", amount: "€15~25" }, { label: "풍차·체험", amount: "€15~30" }, { label: "식사", amount: "€45~60" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=Inntel+Hotels+Amsterdam+Zaandam&destination=Moeders+Amsterdam&waypoints=Zaanse+Schans%7CJordaan+Amsterdam%7CAnne+Frank+House&travelmode=transit",
    morningMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Inntel+Hotels+Amsterdam+Zaandam&destination=De+Kraai+Zaanse+Schans&waypoints=Zaanse+Schans&travelmode=transit",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Zaanse+Schans&destination=Moeders+Amsterdam&waypoints=Jordaan+Amsterdam%7CAnne+Frank+House&travelmode=transit",
    notes: "안네 프랑크 하우스 티켓이 없으면 외관과 서교회, 주변 운하 산책으로 대체합니다.",
    checklist: ["겉옷", "우산", "안네 프랑크 예약 확인", "카메라 배터리"],
    schedule: [
      { id: "d4-1", time: "08:30", title: "잔담 시청광장", description: "Inntel Hotels 대표 구도 촬영", icon: "📷" },
      { id: "d4-2", time: "09:40", title: "잔세스칸스 이동", description: "버스 391 이용", icon: "🚌" },
      { id: "d4-3", time: "10:00", title: "Zaanse Schans", description: "풍차·치즈·나막신 공방", icon: "🌬️" },
      { id: "d4-4", time: "13:10", title: "De Kraai", description: "팬케이크 점심", icon: "🥞" },
      { id: "d4-5", time: "15:30", title: "Jordaan", description: "골목과 운하 산책", icon: "🚶" },
      { id: "d4-6", time: "17:00", title: "Stefs Bakery", description: "카페 휴식", icon: "🥐" },
      { id: "d4-7", time: "18:00", title: "Anne Frank House", description: "외관 및 주변 산책 또는 예약 관람", icon: "🏠" },
      { id: "d4-8", time: "19:00", title: "Moeders", description: "네덜란드 가정식 저녁", icon: "🍽️" }
    ]
  },
  {
    day: 5,
    date: "2026.08.10 (월)",
    title: "The Hague & Rotterdam",
    subtitle: "Art, Politics & Architecture",
    summary: "마우리츠하위스의 명화를 보고 로테르담의 현대 건축을 만나는 당일치기",
    route: "Zaandam 체크아웃 → DoubleTree 짐 보관 → The Hague → Mauritshuis → Rotterdam → Markthal → Cube Houses → Depot → DoubleTree",
    heroImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=85",
    transport: "NS Intercity + 헤이그·로테르담 시내 도보·트램",
    tip: "도시 두 곳을 이동하므로 각 미술관 관람 시간을 지키고, 늦어지면 Depot을 선택 일정으로 조정하세요.",
    highlights: ["Mauritshuis", "Binnenhof", "Markthal", "Cube Houses", "Depot Boijmans"],
    food: [
      { name: "Amazing Den Haag", type: "점심", note: "헤이그 도심 점심", mapUrl: "https://www.google.com/maps/search/?api=1&query=Amazing+Den+Haag" },
      { name: "Markthal Rotterdam", type: "간식·저녁", note: "다양한 푸드 매장", mapUrl: "https://www.google.com/maps/search/?api=1&query=Markthal+Rotterdam" }
    ],
    reservations: [
      { name: "Mauritshuis", time: "10:00", code: "", note: "온라인 티켓 권장" },
      { name: "DoubleTree Amsterdam Centraal", time: "20:20", code: "", note: "3박 체크인" }
    ],
    budget: [{ label: "도시간 열차", amount: "€35~50" }, { label: "미술관", amount: "€20~40" }, { label: "식사", amount: "€35~50" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&destination=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&waypoints=Mauritshuis%7CBinnenhof%7CMarkthal+Rotterdam%7CCube+Houses%7CDepot+Boijmans+Van+Beuningen&travelmode=transit",
    morningMapUrl: "https://www.google.com/maps/dir/?api=1&origin=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&destination=Amazing+Den+Haag&waypoints=Mauritshuis%7CBinnenhof&travelmode=transit",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Amazing+Den+Haag&destination=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&waypoints=Depot+Boijmans+Van+Beuningen%7CMarkthal+Rotterdam%7CCube+Houses&travelmode=transit",
    notes: "Zaandam에서 체크아웃한 뒤 DoubleTree에 먼저 짐을 맡기고 헤이그로 출발합니다.",
    checklist: ["체크아웃", "짐 보관", "Mauritshuis 예약", "열차 지연 확인"],
    schedule: [
      { id: "d5-1", time: "07:50", title: "잔담 체크아웃", description: "암스테르담 중앙역 이동", icon: "🧳" },
      { id: "d5-2", time: "09:00", title: "헤이그 이동", description: "Intercity 약 50분", icon: "🚆" },
      { id: "d5-3", time: "10:00", title: "Mauritshuis", description: "진주 귀걸이를 한 소녀·해부학 강의", icon: "🖼️" },
      { id: "d5-4", time: "11:40", title: "Binnenhof·도심", description: "정치 중심지와 구시가지 산책", icon: "🏛️" },
      { id: "d5-5", time: "13:10", title: "헤이그 점심", description: "Amazing Den Haag", icon: "🍽️" },
      { id: "d5-6", time: "14:30", title: "로테르담 이동", description: "Intercity 약 20~25분", icon: "🚆" },
      { id: "d5-7", time: "15:00", title: "Depot Boijmans", description: "현대 미술 수장고", icon: "🪞" },
      { id: "d5-8", time: "16:50", title: "Markthal", description: "건축과 푸드마켓", icon: "🥘" },
      { id: "d5-9", time: "18:00", title: "Cube Houses", description: "현대 건축 산책", icon: "🏘️" },
      { id: "d5-10", time: "20:20", title: "DoubleTree 체크인", description: "암스테르담 복귀", icon: "🏨" }
    ]
  },
  {
    day: 6,
    date: "2026.08.11 (화)",
    title: "Brussels Day Trip",
    subtitle: "Grand Place & Belgian Flavors",
    summary: "그랑플라스와 갤러리 생튀베르를 걷고 와플과 초콜릿을 즐기는 브뤼셀 당일치기",
    route: "DoubleTree → Amsterdam Centraal → Brussels Central → Grand Place → Galeries Royales → Manneken Pis → Chez Léon → Maison Dandoy → Amsterdam",
    heroImage: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=85",
    transport: "국제열차 약 2시간 + 브뤼셀 도보",
    tip: "국제열차 출발 30분 전 중앙역에 도착하고, 여권과 예약 QR을 바로 꺼낼 수 있게 준비하세요.",
    highlights: ["Grand Place", "Galeries Royales Saint-Hubert", "Manneken Pis", "벨기에 초콜릿"],
    food: [
      { name: "Chez Léon", type: "점심", note: "홍합찜과 감자튀김", mapUrl: "https://www.google.com/maps/search/?api=1&query=Chez+Leon+Brussels" },
      { name: "Maison Dandoy", type: "디저트", note: "벨기에 와플·스페큘루스", mapUrl: "https://www.google.com/maps/search/?api=1&query=Maison+Dandoy+Brussels" },
      { name: "Neuhaus / Pierre Marcolini / Leonidas", type: "쇼핑", note: "벨기에 초콜릿", mapUrl: "https://www.google.com/maps/search/?api=1&query=chocolate+shops+near+Grand+Place+Brussels" }
    ],
    reservations: [{ name: "Amsterdam ↔ Brussels 국제열차", time: "07:20 / 17:00", code: "", note: "좌석·플랫폼 확인" }],
    budget: [{ label: "국제열차", amount: "예약가 기준" }, { label: "식사·디저트", amount: "€40~60" }, { label: "초콜릿 쇼핑", amount: "€20~80" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=Brussels+Central+Station&destination=Brussels+Central+Station&waypoints=Grand+Place+Brussels%7CGaleries+Royales+Saint-Hubert%7CManneken+Pis%7CChez+Leon%7CMaison+Dandoy&travelmode=walking",
    morningMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Brussels+Central+Station&destination=Manneken+Pis&waypoints=Grand+Place+Brussels%7CGaleries+Royales+Saint-Hubert&travelmode=walking",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Manneken+Pis&destination=Brussels+Central+Station&waypoints=Chez+Leon+Brussels%7CMaison+Dandoy+Brussels&travelmode=walking",
    notes: "당일치기이므로 쇼핑 물품이 많아지지 않도록 작은 접이식 가방을 준비합니다.",
    checklist: ["여권", "국제열차 QR", "보조배터리", "접이식 쇼핑백"],
    schedule: [
      { id: "d6-1", time: "07:20", title: "암스테르담 출발", description: "국제열차 탑승", icon: "🚄" },
      { id: "d6-2", time: "09:30", title: "브뤼셀 중앙역", description: "그랑플라스로 도보 이동", icon: "🇧🇪" },
      { id: "d6-3", time: "09:45", title: "Grand Place", description: "시청사와 길드하우스", icon: "🏛️" },
      { id: "d6-4", time: "10:30", title: "Galeries Royales", description: "유럽 대표 아케이드", icon: "🛍️" },
      { id: "d6-5", time: "11:10", title: "Manneken Pis", description: "브뤼셀 상징 조형물", icon: "⛲" },
      { id: "d6-6", time: "12:40", title: "Chez Léon", description: "홍합찜 점심", icon: "🍟" },
      { id: "d6-7", time: "14:00", title: "Maison Dandoy", description: "와플과 디저트", icon: "🧇" },
      { id: "d6-8", time: "15:10", title: "초콜릿 쇼핑", description: "Neuhaus·Marcolini·Leonidas", icon: "🍫" },
      { id: "d6-9", time: "17:00", title: "암스테르담 출발", description: "국제열차로 복귀", icon: "🚄" }
    ]
  },
  {
    day: 7,
    date: "2026.08.12 (수)",
    title: "Amsterdam Markets & Shopping",
    subtitle: "Last Full Day",
    summary: "시장과 9스트라트, 드 비엔코르프를 둘러보며 마지막 쇼핑과 운하 산책을 즐기는 날",
    route: "DoubleTree → Albert Cuyp Market → Bloemenmarkt → 9 Streets → De Bijenkorf → Dam Square → Cannibale Royale → DoubleTree",
    heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1600&q=85",
    transport: "도보 + 트램·메트로",
    tip: "쇼핑 물품은 오후에 한 번 호텔에 두고 다시 나가면 저녁 산책이 편합니다.",
    highlights: ["Albert Cuyp Market", "Bloemenmarkt", "De 9 Straatjes", "De Bijenkorf", "담 광장"],
    food: [
      { name: "Albert Cuyp Market", type: "점심·간식", note: "청어·스트룹와플·시장 먹거리", mapUrl: "https://www.google.com/maps/search/?api=1&query=Albert+Cuyp+Market" },
      { name: "Cannibale Royale", type: "저녁", note: "스테이크와 버거", mapUrl: "https://www.google.com/maps/search/?api=1&query=Cannibale+Royale+Amsterdam" }
    ],
    reservations: [{ name: "Cannibale Royale", time: "18:40", code: "", note: "저녁 예약 권장" }],
    budget: [{ label: "식사", amount: "€40~60" }, { label: "교통", amount: "€5~10" }, { label: "쇼핑", amount: "개인 예산" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&destination=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&waypoints=Albert+Cuyp+Market%7CBloemenmarkt%7CDe+9+Straatjes%7CDe+Bijenkorf+Amsterdam%7CDam+Square%7CCannibale+Royale&travelmode=transit",
    morningMapUrl:
"https://www.google.com/maps/dir/?api=1&origin=Oosterdoksstraat+4,+1011+DK+Amsterdam,+Netherlands&destination=Hartenstraat+1,+1016+BZ+Amsterdam,+Netherlands&waypoints=Albert+Cuypstraat,+1073+BD+Amsterdam,+Netherlands%7CSingel+630,+1017+AZ+Amsterdam,+Netherlands&travelmode=transit",
    afternoonMapUrl: "https://www.google.com/maps/dir/?api=1&origin=De+9+Straatjes&destination=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&waypoints=De+Bijenkorf+Amsterdam%7CDam+Square%7CCannibale+Royale+Amsterdam&travelmode=walking",
    notes: "귀국 짐 무게를 고려해 쇼핑하고, 밤에 여권·항공권·공항 이동 시간을 최종 확인합니다.",
    checklist: ["접이식 쇼핑백", "택스리펀드 영수증", "수하물 무게 확인", "귀국 준비"],
    schedule: [
      { id: "d7-1", time: "09:00", title: "Albert Cuyp Market", description: "현지 시장과 길거리 먹거리", icon: "🛒" },
      { id: "d7-2", time: "10:30", title: "Bloemenmarkt", description: "꽃시장과 기념품", icon: "🌷" },
      { id: "d7-3", time: "11:30", title: "De 9 Straatjes", description: "빈티지숍과 디자인숍", icon: "🛍️" },
      { id: "d7-4", time: "13:10", title: "점심식사", description: "시장 또는 인근 카페", icon: "🥪" },
      { id: "d7-5", time: "14:40", title: "De Bijenkorf", description: "백화점 쇼핑", icon: "🏬" },
      { id: "d7-6", time: "17:10", title: "담 광장·운하", description: "마지막 도심 산책", icon: "🚶" },
      { id: "d7-7", time: "18:40", title: "Cannibale Royale", description: "마지막 저녁식사", icon: "🥩" },
      { id: "d7-8", time: "20:30", title: "호텔 복귀", description: "짐 정리와 귀국 준비", icon: "🧳" }
    ]
  },
  {
    day: 8,
    date: "2026.08.13 (목)",
    title: "Departure Day",
    subtitle: "Until Next Journey",
    summary: "호텔 체크아웃 후 스키폴공항으로 이동해 귀국하는 날",
    route: "DoubleTree → Amsterdam Centraal → Schiphol Airport → CDG → ICN",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    transport: "도보 → NS 열차 → 국제선 항공",
    tip: "스키폴공항 혼잡을 고려해 국제선 출발 3시간 전 도착을 기준으로 이동하세요.",
    highlights: ["암스테르담 마지막 아침", "스키폴공항 이동", "택스리펀드·수하물 처리"],
    food: [{ name: "호텔 또는 중앙역 인근", type: "아침", note: "이동 전 가볍게 식사", mapUrl: "https://www.google.com/maps/search/?api=1&query=breakfast+near+Amsterdam+Centraal" }],
    reservations: [{ name: "귀국 항공편", time: "항공권 확인", code: "", note: "터미널·게이트·수하물 규정 확인" }],
    budget: [{ label: "공항 이동", amount: "€6 내외" }, { label: "공항 식사·간식", amount: "€15~30" }],
    mapUrl: "https://www.google.com/maps/dir/?api=1&origin=DoubleTree+by+Hilton+Amsterdam+Centraal+Station&destination=Amsterdam+Airport+Schiphol&travelmode=transit",
    notes: "출발 전 호텔 객실 금고, 충전기, 여권, 지갑을 마지막으로 확인합니다.",
    checklist: ["여권", "항공권", "택스리펀드 서류", "수하물 무게", "충전기", "호텔 체크아웃"],
    schedule: [
      { id: "d8-1", time: "아침", title: "마지막 아침", description: "조식과 짐 정리", icon: "☕" },
      { id: "d8-2", time: "체크아웃", title: "DoubleTree 출발", description: "Amsterdam Centraal 이동", icon: "🏨" },
      { id: "d8-3", time: "출발 3시간 전", title: "스키폴공항 도착", description: "체크인·수하물·보안검색", icon: "🛫" },
      { id: "d8-4", time: "탑승 전", title: "택스리펀드·면세", description: "필요한 절차만 빠르게", icon: "🧾" },
      { id: "d8-5", time: "출발", title: "귀국편 탑승", description: "다음 여행을 기약하며 귀국", icon: "✈️" }
    ]
  }
];
