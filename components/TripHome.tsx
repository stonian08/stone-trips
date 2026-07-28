"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultDays } from "../lib/defaultData";
import { loadDaysFromCloud } from "../lib/cloudStorage";
import { TripDay } from "../lib/types";

export default function TripHome() {
  const [days, setDays] = useState<TripDay[]>(defaultDays);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDaysFromCloud()
      .then(setDays)
      .catch((e) => setError(e instanceof Error ? e.message : "불러오기 실패"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <main className="shell loading">클라우드 여행정보를 불러오는 중...</main>;
  }

  return (
    <main className="shell">
      <header className="top">
        <div className="brand">STONE&apos;S TRIPS</div>
        <Link className="btn soft" href="/admin">관리자</Link>
      </header>

      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(7,27,43,.1),rgba(7,27,43,.85)),url("${days[0]?.heroImage}")`,
        }}
      >
        <div className="brand">STONE&apos;S TRIPS</div>
        <div>
          <div className="script">Let&apos;s Explore</div>
          <h1>AMSTERDAM</h1>
          <p>Netherlands &amp; Belgium Travel Guide</p>
          <div className="pill">2026.08.06 — 08.13</div>
        </div>
      </section>

      <section className="content">
        {error && <div className="error">{error}</div>}
        <h2 className="sectionTitle">8일 여행 일정</h2>

        <div className="dayGrid">
          {days.map((d) => (
            <Link className="card dayCard" href={`/day/${d.day}`} key={d.day}>
              <div>
                <div className="dayNo">DAY {d.day}</div>
                <h3>{d.title}</h3>
                <div className="small">{d.date}</div>
              </div>
              <div className="small">{d.summary}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
