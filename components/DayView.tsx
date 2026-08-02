"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultDays } from "../lib/defaultData";
import { loadDaysFromCloud } from "../lib/cloudStorage";
import { createDirectionsUrls, createPlaceMapUrl, placesForPeriod, routeFromPlaces } from "../lib/routeUtils";
import { TripDay } from "../lib/types";

export default function DayView({ day }: { day: number }) {
  const [data, setData] = useState<TripDay>(
    defaultDays.find((d) => d.day === day) || defaultDays[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDaysFromCloud()
      .then((days) => {
        const found = days.find((d) => d.day === day);
        if (found) setData(found);
      })
      .finally(() => setLoading(false));
  }, [day]);

  if (loading) {
    return <main className="shell loading">DAY {day} 정보를 불러오는 중...</main>;
  }

  const places = data.places || [];
  const morningPlaces = placesForPeriod(places, "morning");
  const afternoonPlaces = placesForPeriod(places, "afternoon");
  const route = places.length > 0 ? routeFromPlaces(places) : data.route;
  const morningMapUrls = morningPlaces.length > 0
    ? createDirectionsUrls(morningPlaces)
    : data.morningMapUrl ? [data.morningMapUrl] : [];
  const afternoonMapUrls = afternoonPlaces.length > 0
    ? createDirectionsUrls(afternoonPlaces)
    : data.afternoonMapUrl ? [data.afternoonMapUrl] : [];
  const wholeMapUrls = places.length > 0
    ? createDirectionsUrls(places)
    : data.mapUrl ? [data.mapUrl] : [];

  return (
    <main className="shell">
      <header className="top">
        <Link className="btn soft" href="/">홈</Link>
        <div className="brand">STONE&apos;S TRIPS</div>
        <Link className="btn soft" href={`/admin?day=${day}`}>수정</Link>
      </header>

      <section
        className="dayHero"
        style={{
          backgroundImage: `linear-gradient(135deg,rgba(14,49,81,.97),rgba(14,49,81,.55)),url("${data.heroImage}")`,
        }}
      >
        <div className="brand">AMSTERDAM</div>
        <h1>DAY {data.day}</h1>
        <div className="script">{data.subtitle}</div>
        <p>{data.summary}</p>
        <div className="pill">{data.date}</div>
      </section>

      <section className="content">
        <article className="card">
          <strong>오늘의 경로</strong>
          <div className="route">{route}</div>
        </article>

        <article className="card">
          <h3>👀 핵심 관전 포인트</h3>
          <div className="tagWrap">
            {data.highlights.map((x, i) => <span className="tag" key={i}>{x}</span>)}
          </div>
        </article>

        {false && (
          <>
            <h2 className="sectionTitle">오늘의 장소</h2>
            <article className="card placeList">
              {places.map((place, i) => (
                <div className="placeRow" key={place.id}>
                  <div className="placeIndex">{i + 1}</div>
                  <div className="placeBody">
                    <strong>{place.time && `${place.time} · `}{place.name}</strong>
                    <div className="small">{place.address}</div>
                    {place.note && <div className="small">{place.note}</div>}
                  </div>
                  <a
                    className="btn soft compact"
                    target="_blank"
                    rel="noreferrer"
                    href={createPlaceMapUrl(place)}
                  >
                    지도
                  </a>
                </div>
              ))}
            </article>
          </>
        )}

        <h2 className="sectionTitle">오늘 일정</h2>
        <article className="card timeline">
          {data.schedule.map((x) => (
            <div className="event" key={x.id}>
              <div className="dot">{x.icon}</div>
              <div>
                <h3>{x.time} · {x.title}</h3>
                <p>{x.description}</p>
              </div>
            </div>
          ))}
        </article>

        <article className="card">
          <h3>🍽️ 맛집·카페</h3>
          {data.food.map((x, i) => (
            <div className="infoRow" key={i}>
              <strong>{x.name}</strong>
              <div className="small">{x.type} · {x.note}</div>
              {x.mapUrl && (
                <a className="inlineMapLink" target="_blank" rel="noreferrer" href={x.mapUrl}>
                  개별 지도 보기
                </a>
              )}
            </div>
          ))}
        </article>

        <article className="card">
          <h3>🎫 예약정보</h3>
          {data.reservations.map((x, i) => (
            <div className="infoRow" key={i}>
              <strong>{x.name}</strong>
              <div className="small">
                {x.time} {x.code && `· ${x.code}`}<br />{x.note}
              </div>
            </div>
          ))}
        </article>

        <article className="card">
          <h3>💶 예상비용</h3>
          {data.budget.map((x, i) => (
            <div className="infoRow" key={i}>
              <strong>{x.label}</strong>
              <div className="small">{x.amount}</div>
            </div>
          ))}
        </article>

        <article className="card">
          <h3>🚆 교통 안내</h3>
          <p className="small">{data.transport}</p>
          <div className="mapActions">
            {morningMapUrls.map((url, index) => (
              <a key={`morning-${index}`} className="btn primary mapBtn" target="_blank" rel="noreferrer" href={url}>
                오전 동선 지도{morningMapUrls.length > 1 ? ` ${index + 1}` : ""}
              </a>
            ))}
            {afternoonMapUrls.map((url, index) => (
              <a key={`afternoon-${index}`} className="btn soft mapBtn" target="_blank" rel="noreferrer" href={url}>
                오후 동선 지도{afternoonMapUrls.length > 1 ? ` ${index + 1}` : ""}
              </a>
            ))}
            {wholeMapUrls.map((url, index) => (
              <a key={`whole-${index}`} className="btn primary mapBtn" target="_blank" rel="noreferrer" href={url}>
                전체 동선 지도{wholeMapUrls.length > 1 ? ` ${index + 1}` : ""}
              </a>
            ))}
          </div>
        </article>

        <article className="card tip">
          <h3>💡 여행 TIP</h3>
          <p className="small" style={{ whiteSpace: "pre-line" }}>
  {data.tip}
</p>
        </article>

        <article className="card">
          <h3>✅ 체크리스트</h3>
          <ul className="small">
            {data.checklist.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </article>

        {data.notes && (
          <article className="card">
            <h3>📝 개인 메모</h3>
            <p className="small" style={{ whiteSpace: "pre-line" }}>
  {data.notes}
</p>
          </article>
        )}
      </section>
    </main>
  );
}
