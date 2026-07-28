import { TripDay } from "./types";
export const STORAGE_KEY = "stone-trips-v1-stage3-days";
export const CONTENT_ID = "amsterdam-2026";
export const defaultDays: TripDay[] = [
  {
    "day": 1,
    "date": "2026.08.06 (목)",
    "title": "Arrival in Amsterdam",
    "subtitle": "Start of Our Journey",
    "summary": "인천에서 암스테르담까지, 이동과 체크인에 집중하는 첫날",
    "route": "ICN → CDG → AMS → Amsterdam Centraal → ibis Amsterdam Centre",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "Schiphol Airport에서 NS 열차로 Amsterdam Centraal까지 약 15~20분, 중앙역에서 호텔까지 도보 약 5분",
    "tip": "파리 환승 시 쇼핑보다 Terminal 2F 이동과 쉥겐 입국심사를 우선하세요.",
    "highlights": [
      "파리 환승 동선",
      "스키폴공항 입국",
      "암스테르담 중앙역 첫인상"
    ],
    "food": [
      {
        "name": "도착 후 간단한 식사",
        "type": "저녁",
        "note": "늦은 시간 영업 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "ibis Amsterdam Centre",
        "time": "23:20 전후",
        "code": "",
        "note": "체크인 정보 확인"
      }
    ],
    "budget": [
      {
        "label": "공항철도",
        "amount": "현장 확인"
      },
      {
        "label": "야식·음료",
        "amount": "€20 내외"
      }
    ],
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=ibis+Amsterdam+Centre",
    "notes": "",
    "checklist": [
      "여권과 수하물 확인",
      "OVpay 결제수단 확인",
      "다음 날 예약 확인"
    ],
    "schedule": [
      {
        "id": "1-1",
        "time": "11:40",
        "title": "인천 출발",
        "description": "AF0267 · 파리 샤를드골공항으로 이동",
        "icon": "✈️"
      },
      {
        "id": "1-2",
        "time": "18:40",
        "title": "파리 도착",
        "description": "Terminal 2E 도착 후 환승 이동",
        "icon": "🛬"
      },
      {
        "id": "1-3",
        "time": "20:15",
        "title": "파리 출발",
        "description": "AF8346(KLM) · Terminal 2F",
        "icon": "🔄"
      },
      {
        "id": "1-4",
        "time": "21:25",
        "title": "스키폴공항 도착",
        "description": "입국심사와 수하물 수령",
        "icon": "🧳"
      },
      {
        "id": "1-5",
        "time": "22:20 전후",
        "title": "암스테르담 중앙역 이동",
        "description": "NS 열차 약 15~20분",
        "icon": "🚆"
      },
      {
        "id": "1-6",
        "time": "23:20 전후",
        "title": "호텔 체크인",
        "description": "ibis Amsterdam Centre",
        "icon": "🏨"
      }
    ]
  },
  {
    "day": 2,
    "date": "2026.08.07 (금)",
    "title": "Historic Amsterdam",
    "subtitle": "Canals, Jordaan & Old Town",
    "summary": "운하와 구시가를 따라 암스테르담의 첫인상을 깊게 만나는 날",
    "route": "Amsterdam Centraal → Jordaan → Anne Frank House 일대 → 9 Straatjes → Dam Square",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "2-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "2-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "2-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 3,
    "date": "2026.08.08 (토)",
    "title": "Museumplein",
    "subtitle": "Van Gogh & Rijksmuseum",
    "summary": "네덜란드 미술의 핵심을 만나는 뮤지엄 데이",
    "route": "ibis Amsterdam Centre → Museumplein → Van Gogh Museum → Rijksmuseum → Zaandam",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "3-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "3-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "3-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 4,
    "date": "2026.08.09 (일)",
    "title": "Zaanse Schans",
    "subtitle": "Windmills & Zaandam",
    "summary": "풍차와 목조주택, 네덜란드 전통 풍경을 만나는 날",
    "route": "Zaandam → Zaanse Schans → Zaandam",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "4-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "4-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "4-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 5,
    "date": "2026.08.10 (월)",
    "title": "The Hague & Rotterdam",
    "subtitle": "Two Cities in One Day",
    "summary": "정치도시 헤이그와 현대도시 로테르담을 하루에 만나는 날",
    "route": "Zaandam → Den Haag → Rotterdam → Amsterdam",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "5-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "5-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "5-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 6,
    "date": "2026.08.11 (화)",
    "title": "Brussels Day Trip",
    "subtitle": "Grand Place & Belgian Flavors",
    "summary": "브뤼셀의 그랑플라스와 벨기에 미식을 즐기는 당일치기",
    "route": "Amsterdam Centraal → Brussels Midi → Grand Place → Amsterdam",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "6-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "6-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "6-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 7,
    "date": "2026.08.12 (수)",
    "title": "Shopping & Free Time",
    "subtitle": "A Slow Amsterdam Day",
    "summary": "쇼핑과 카페, 놓친 장소를 여유롭게 채우는 날",
    "route": "DoubleTree → De 9 Straatjes → Kalverstraat → Canal Belt → DoubleTree",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "7-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "7-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "7-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  },
  {
    "day": 8,
    "date": "2026.08.13 (목)",
    "title": "Return Home",
    "subtitle": "Until Next Journey",
    "summary": "체크아웃 후 스키폴공항으로 이동해 귀국하는 날",
    "route": "DoubleTree → Amsterdam Centraal → Schiphol Airport → CDG → ICN",
    "heroImage": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    "transport": "세부 교통편과 예약시간은 출발 전 최종 확인하세요.",
    "tip": "관리자 화면에서 시간·장소·설명을 언제든 수정할 수 있습니다.",
    "highlights": [
      "핵심 장소 1",
      "핵심 장소 2",
      "현지에서 확인할 포인트"
    ],
    "food": [
      {
        "name": "식당 미정",
        "type": "점심 또는 저녁",
        "note": "예약 여부 확인",
        "mapUrl": ""
      }
    ],
    "reservations": [
      {
        "name": "예약 정보",
        "time": "",
        "code": "",
        "note": "확정 후 입력"
      }
    ],
    "budget": [
      {
        "label": "교통·입장료",
        "amount": "확정 후 입력"
      }
    ],
    "mapUrl": "",
    "notes": "",
    "checklist": [
      "예약 확인",
      "이동수단 확인",
      "날씨와 복장 확인"
    ],
    "schedule": [
      {
        "id": "8-1",
        "time": "09:00",
        "title": "첫 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "📍"
      },
      {
        "id": "8-2",
        "time": "12:30",
        "title": "점심",
        "description": "식당과 이동시간 확인",
        "icon": "🍽️"
      },
      {
        "id": "8-3",
        "time": "15:00",
        "title": "오후 일정",
        "description": "세부 내용은 관리자에서 수정",
        "icon": "🚶"
      }
    ]
  }
];
