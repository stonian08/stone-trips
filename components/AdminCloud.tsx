"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultDays } from "../lib/defaultData";
import {
  loadDaysFromCloud,
  resetDaysInCloud,
  saveDaysToCloud,
} from "../lib/cloudStorage";
import { uploadTripImage } from "../lib/imageStorage";
import { supabase } from "../lib/supabase";
import {
  createDirectionsSections,
  createPlaceMapUrl,
  placesForPeriod,
  routeFromPlaces,
  syncDayFromPlaces,
} from "../lib/routeUtils";
import { PlaceItem, TripDay } from "../lib/types";

export default function AdminCloud() {
  const [sessionReady, setSessionReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(
    process.env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [days, setDays] = useState<TripDay[]>(defaultDays);
  const [selected, setSelected] = useState(1);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [draggedPlaceIndex, setDraggedPlaceIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setSessionReady(true);
    });

    const queryDay = new URLSearchParams(location.search).get("day");
    if (queryDay) setSelected(Number(queryDay));
  }, []);

  useEffect(() => {
    if (!loggedIn) return;

    setBusy(true);
    loadDaysFromCloud()
      .then(setDays)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "불러오기 실패")
      )
      .finally(() => setBusy(false));
  }, [loggedIn]);

  const data = days.find((d) => d.day === selected) || days[0];

  const places = data.places || [];
  const morningPlaces = placesForPeriod(places, "morning");
  const afternoonPlaces = placesForPeriod(places, "afternoon");
  const wholeRouteSections = createDirectionsSections(places);
  const morningRouteSections = createDirectionsSections(morningPlaces);
  const afternoonRouteSections = createDirectionsSections(afternoonPlaces);
  const missingAddressCount = places.filter((place) => !place.address.trim()).length;

  const update = (patch: Partial<TripDay>) => {
    setDays((prev) =>
      prev.map((d) =>
        d.day === selected ? syncDayFromPlaces({ ...d, ...patch }) : d
      )
    );
  };

  const updatePlaces = (places: PlaceItem[]) => update({ places });

  const addPlace = () => {
    const places = data.places || [];
    const lastPeriod = places.at(-1)?.period || "morning";
    updatePlaces([
      ...places,
      {
        id: crypto.randomUUID(),
        name: "새 장소",
        address: "",
        time: "",
        period: lastPeriod,
        category: "sight",
        travelMode: "walking",
        note: "",
      },
    ]);
  };

  const movePlace = (index: number, direction: -1 | 1) => {
    const places = [...(data.places || [])];
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= places.length) return;
    [places[index], places[nextIndex]] = [places[nextIndex], places[index]];
    updatePlaces(places);
  };

  const dropPlace = (targetIndex: number) => {
    if (draggedPlaceIndex === null || draggedPlaceIndex === targetIndex) {
      setDraggedPlaceIndex(null);
      return;
    }

    const places = [...(data.places || [])];
    const [moved] = places.splice(draggedPlaceIndex, 1);
    places.splice(targetIndex, 0, moved);
    updatePlaces(places);
    setDraggedPlaceIndex(null);
  };

  const login = async () => {
    setError("");
    setBusy(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }

    setLoggedIn(true);
  };

  const save = async () => {
    setBusy(true);
    setError("");

    try {
      await saveDaysToCloud(days);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setBusy(false);
    }
  };

  const handleHeroUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const publicUrl = await uploadTripImage(file, selected);
      update({ heroImage: publicUrl });
    } catch (e) {
      setError(e instanceof Error ? e.message : "사진 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  if (!sessionReady) {
    return (
      <main className="login">
        <section className="loginBox">세션 확인 중...</section>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="login">
        <section className="loginBox">
          <div className="brand">STONE&apos;S TRIPS</div>
          <h1>클라우드 관리자 로그인</h1>

          <div className="form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="관리자 이메일"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Supabase 비밀번호"
              onKeyDown={(e) => e.key === "Enter" && login()}
            />
            <button className="btn primary" disabled={busy} onClick={login}>
              {busy ? "로그인 중..." : "로그인"}
            </button>
            {error && <div className="error">{error}</div>}
            <Link className="btn soft" href="/">여행 홈으로</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="top">
        <Link className="btn soft" href={`/day/${selected}`}>미리보기</Link>
        <div className="brand">CLOUD EDITOR · STAGE 5.2</div>
        <button
          className="btn soft"
          onClick={async () => {
            await supabase.auth.signOut();
            setLoggedIn(false);
          }}
        >
          로그아웃
        </button>
      </header>

      <section className="content">
        <h1>클라우드 여행정보 수정</h1>
        <div className="notice">
          대표사진을 직접 업로드하고, 맛집·예약·예상비용까지 수정할 수 있습니다.
        </div>

        {busy && <div className="notice" style={{ marginTop: 10 }}>처리 중...</div>}
        {error && <div className="error" style={{ marginTop: 10 }}>{error}</div>}

        <div className="form" style={{ marginTop: 16 }}>
          <label>
            수정할 DAY
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {days.map((d) => (
                <option key={d.day} value={d.day}>
                  DAY {d.day} · {d.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            날짜
            <input
              value={data.date}
              onChange={(e) => update({ date: e.target.value })}
            />
          </label>

          <label>
            화면 제목
            <input
              value={data.title}
              onChange={(e) => update({ title: e.target.value })}
            />
          </label>

          <label>
            영문 부제
            <input
              value={data.subtitle}
              onChange={(e) => update({ subtitle: e.target.value })}
            />
          </label>

          <label>
            대표사진 직접 업로드
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              onChange={handleHeroUpload}
            />
          </label>

          {uploading && <div className="notice">사진을 업로드하고 있습니다...</div>}

          {data.heroImage && (
            <div className="card">
              <strong>현재 대표사진 미리보기</strong>
              <img
                src={data.heroImage}
                alt={`DAY ${selected} 대표사진`}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 14,
                  maxHeight: 260,
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <label>
            대표사진 URL
            <input
              value={data.heroImage}
              onChange={(e) => update({ heroImage: e.target.value })}
            />
          </label>

          <label>
            한줄 설명
            <textarea
              value={data.summary}
              onChange={(e) => update({ summary: e.target.value })}
            />
          </label>

          <label>
            오늘의 경로 · 장소목록에서 자동 생성
            <textarea value={data.route} readOnly />
          </label>

          <label>
            교통 안내
            <textarea
              value={data.transport}
              onChange={(e) => update({ transport: e.target.value })}
            />
          </label>

          <label>
            여행 TIP
            <textarea
              value={data.tip}
              onChange={(e) => update({ tip: e.target.value })}
            />
          </label>

          <div className="notice">
            지도는 아래 장소의 이름과 정확한 주소를 기준으로 자동 생성됩니다.
            경로를 바꿀 때는 장소를 추가·삭제하거나 순서를 조정한 뒤 저장하세요.
          </div>

          <label>
            개인 메모
            <textarea
              value={data.notes}
              onChange={(e) => update({ notes: e.target.value })}
            />
          </label>
        </div>

        <h2 className="sectionTitle">장소 기반 경로</h2>
        <div className="notice" style={{ marginBottom: 12 }}>
          장소가 경로의 기준 데이터입니다. 장소 추가·삭제·순서 변경 즉시 오늘의 경로와
          지도 미리보기가 함께 바뀝니다. 저장하면 사용자 화면에도 그대로 반영됩니다.
        </div>

        <div className="card routePreviewCard">
          <div className="routePreviewHead">
            <strong>실시간 경로 미리보기</strong>
            <span>{places.length}개 장소</span>
          </div>
          <div className="routePreviewText">
            {routeFromPlaces(places) || "장소를 추가하면 경로가 여기에 표시됩니다."}
          </div>
          {missingAddressCount > 0 && (
            <div className="routeWarning">
              주소가 비어 있는 장소가 {missingAddressCount}개 있습니다. 장소명만으로도 열리지만,
              정확한 주소를 입력하면 다른 지역의 동명 장소로 연결되는 오류를 줄일 수 있습니다.
            </div>
          )}
          <div className="routePreviewActions">
            {wholeRouteSections.map((section, index) => (
              <a key={`whole-${index}`} className="btn primary" target="_blank" rel="noreferrer" href={section.url}>
                전체 동선{wholeRouteSections.length > 1 ? ` ${index + 1}` : ""} · {section.mode === "walking" ? "도보" : section.mode === "transit" ? "대중교통" : section.mode === "driving" ? "자동차" : "자전거"}
              </a>
            ))}
            {morningRouteSections.map((section, index) => (
              <a key={`morning-${index}`} className="btn soft" target="_blank" rel="noreferrer" href={section.url}>
                오전 동선{morningRouteSections.length > 1 ? ` ${index + 1}` : ""} · {section.mode === "walking" ? "도보" : section.mode === "transit" ? "대중교통" : section.mode === "driving" ? "자동차" : "자전거"}
              </a>
            ))}
            {afternoonRouteSections.map((section, index) => (
              <a key={`afternoon-${index}`} className="btn soft" target="_blank" rel="noreferrer" href={section.url}>
                오후 동선{afternoonRouteSections.length > 1 ? ` ${index + 1}` : ""} · {section.mode === "walking" ? "도보" : section.mode === "transit" ? "대중교통" : section.mode === "driving" ? "자동차" : "자전거"}
              </a>
            ))}
          </div>
        </div>

        {places.map((place, i) => (
          <div
            className={`editor placeEditor ${draggedPlaceIndex === i ? "dragging" : ""}`}
            key={place.id}
            draggable
            onDragStart={() => setDraggedPlaceIndex(i)}
            onDragEnd={() => setDraggedPlaceIndex(null)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropPlace(i)}
          >
            <div className="placeEditorTop">
              <div className="placeTitleWrap">
                <span className="dragHandle" title="끌어서 순서 변경">☰</span>
                <strong>{i + 1}. {place.name || "새 장소"}</strong>
              </div>
              <div className="placeMoveActions">
                <button
                  type="button"
                  className="btn soft compact"
                  disabled={i === 0}
                  onClick={() => movePlace(i, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn soft compact"
                  disabled={i === (data.places || []).length - 1}
                  onClick={() => movePlace(i, 1)}
                >
                  ↓
                </button>
              </div>
            </div>

            <input
              value={place.name}
              placeholder="장소 이름"
              onChange={(e) =>
                updatePlaces((data.places || []).map((v, n) =>
                  n === i ? { ...v, name: e.target.value } : v
                ))
              }
            />
            <input
              value={place.address}
              placeholder="정확한 주소 · 예: Museumstraat 1, Amsterdam"
              onChange={(e) =>
                updatePlaces((data.places || []).map((v, n) =>
                  n === i ? { ...v, address: e.target.value } : v
                ))
              }
            />

            <div className="row placeMetaRow">
              <input
                value={place.time}
                placeholder="시간"
                onChange={(e) =>
                  updatePlaces((data.places || []).map((v, n) =>
                    n === i ? { ...v, time: e.target.value } : v
                  ))
                }
              />
              <select
                value={place.period}
                onChange={(e) =>
                  updatePlaces((data.places || []).map((v, n) =>
                    n === i
                      ? { ...v, period: e.target.value as PlaceItem["period"] }
                      : v
                  ))
                }
              >
                <option value="morning">오전 동선</option>
                <option value="afternoon">오후 동선</option>
              </select>
            </div>

            <div className="row placeMetaRow">
              <input
                value={place.category}
                placeholder="분류 · 호텔/미술관/식당"
                onChange={(e) =>
                  updatePlaces((data.places || []).map((v, n) =>
                    n === i ? { ...v, category: e.target.value } : v
                  ))
                }
              />
              <select
                value={place.travelMode}
                onChange={(e) =>
                  updatePlaces((data.places || []).map((v, n) =>
                    n === i
                      ? { ...v, travelMode: e.target.value as PlaceItem["travelMode"] }
                      : v
                  ))
                }
              >
                <option value="walking">도보</option>
                <option value="transit">대중교통</option>
                <option value="driving">자동차</option>
                <option value="bicycling">자전거</option>
              </select>
            </div>

            <textarea
              value={place.note || ""}
              placeholder="장소 메모"
              onChange={(e) =>
                updatePlaces((data.places || []).map((v, n) =>
                  n === i ? { ...v, note: e.target.value } : v
                ))
              }
            />

            <div className="placeCardActions">
              <a
                className="btn soft"
                target="_blank"
                rel="noreferrer"
                href={createPlaceMapUrl(place)}
              >
                개별 지도
              </a>
              <button
                type="button"
                className="btn danger"
                onClick={() =>
                  updatePlaces((data.places || []).filter((_, n) => n !== i))
                }
              >
                장소 삭제
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn soft" onClick={addPlace}>
          + 새 장소 추가
        </button>

        <h2 className="sectionTitle">핵심 관전 포인트</h2>
        {data.highlights.map((x, i) => (
          <div className="editor" key={i}>
            <input
              value={x}
              onChange={(e) =>
                update({
                  highlights: data.highlights.map((v, n) =>
                    n === i ? e.target.value : v
                  ),
                })
              }
            />
            <button
              className="btn danger"
              onClick={() =>
                update({
                  highlights: data.highlights.filter((_, n) => n !== i),
                })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({ highlights: [...data.highlights, "새 포인트"] })
          }
        >
          + 관전 포인트 추가
        </button>

        <h2 className="sectionTitle">시간별 일정</h2>
        {data.schedule.map((x, i) => (
          <div className="editor" key={x.id}>
            <div className="row">
              <input
                value={x.icon}
                placeholder="아이콘"
                onChange={(e) =>
                  update({
                    schedule: data.schedule.map((v, n) =>
                      n === i ? { ...v, icon: e.target.value } : v
                    ),
                  })
                }
              />
              <input
                value={x.time}
                placeholder="시간"
                onChange={(e) =>
                  update({
                    schedule: data.schedule.map((v, n) =>
                      n === i ? { ...v, time: e.target.value } : v
                    ),
                  })
                }
              />
            </div>
            <input
              value={x.title}
              placeholder="일정 제목"
              onChange={(e) =>
                update({
                  schedule: data.schedule.map((v, n) =>
                    n === i ? { ...v, title: e.target.value } : v
                  ),
                })
              }
            />
            <textarea
              value={x.description}
              placeholder="설명"
              onChange={(e) =>
                update({
                  schedule: data.schedule.map((v, n) =>
                    n === i ? { ...v, description: e.target.value } : v
                  ),
                })
              }
            />
            <button
              className="btn danger"
              onClick={() =>
                update({
                  schedule: data.schedule.filter((_, n) => n !== i),
                })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({
              schedule: [
                ...data.schedule,
                {
                  id: crypto.randomUUID(),
                  time: "",
                  title: "새 일정",
                  description: "",
                  icon: "📍",
                },
              ],
            })
          }
        >
          + 일정 추가
        </button>

        <h2 className="sectionTitle">맛집·카페</h2>
        {data.food.map((x, i) => (
          <div className="editor" key={i}>
            <input
              value={x.name}
              placeholder="장소 이름"
              onChange={(e) =>
                update({
                  food: data.food.map((v, n) =>
                    n === i ? { ...v, name: e.target.value } : v
                  ),
                })
              }
            />
            <div className="row">
              <input
                value={x.type}
                placeholder="점심·카페·저녁"
                onChange={(e) =>
                  update({
                    food: data.food.map((v, n) =>
                      n === i ? { ...v, type: e.target.value } : v
                    ),
                  })
                }
              />
              <input
                value={x.mapUrl}
                placeholder="지도 URL"
                onChange={(e) =>
                  update({
                    food: data.food.map((v, n) =>
                      n === i ? { ...v, mapUrl: e.target.value } : v
                    ),
                  })
                }
              />
            </div>
            <textarea
              value={x.note}
              placeholder="메모"
              onChange={(e) =>
                update({
                  food: data.food.map((v, n) =>
                    n === i ? { ...v, note: e.target.value } : v
                  ),
                })
              }
            />
            <button
              className="btn danger"
              onClick={() =>
                update({ food: data.food.filter((_, n) => n !== i) })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({
              food: [
                ...data.food,
                { name: "새 장소", type: "", note: "", mapUrl: "" },
              ],
            })
          }
        >
          + 맛집·카페 추가
        </button>

        <h2 className="sectionTitle">예약정보</h2>
        {data.reservations.map((x, i) => (
          <div className="editor" key={i}>
            <input
              value={x.name}
              placeholder="예약명"
              onChange={(e) =>
                update({
                  reservations: data.reservations.map((v, n) =>
                    n === i ? { ...v, name: e.target.value } : v
                  ),
                })
              }
            />
            <div className="row">
              <input
                value={x.time}
                placeholder="예약시간"
                onChange={(e) =>
                  update({
                    reservations: data.reservations.map((v, n) =>
                      n === i ? { ...v, time: e.target.value } : v
                    ),
                  })
                }
              />
              <input
                value={x.code}
                placeholder="예약번호"
                onChange={(e) =>
                  update({
                    reservations: data.reservations.map((v, n) =>
                      n === i ? { ...v, code: e.target.value } : v
                    ),
                  })
                }
              />
            </div>
            <textarea
              value={x.note}
              placeholder="예약 메모"
              onChange={(e) =>
                update({
                  reservations: data.reservations.map((v, n) =>
                    n === i ? { ...v, note: e.target.value } : v
                  ),
                })
              }
            />
            <button
              className="btn danger"
              onClick={() =>
                update({
                  reservations: data.reservations.filter((_, n) => n !== i),
                })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({
              reservations: [
                ...data.reservations,
                { name: "새 예약", time: "", code: "", note: "" },
              ],
            })
          }
        >
          + 예약 추가
        </button>

        <h2 className="sectionTitle">예상비용</h2>
        {data.budget.map((x, i) => (
          <div className="editor" key={i}>
            <div className="row">
              <input
                value={x.label}
                placeholder="항목"
                onChange={(e) =>
                  update({
                    budget: data.budget.map((v, n) =>
                      n === i ? { ...v, label: e.target.value } : v
                    ),
                  })
                }
              />
              <input
                value={x.amount}
                placeholder="금액"
                onChange={(e) =>
                  update({
                    budget: data.budget.map((v, n) =>
                      n === i ? { ...v, amount: e.target.value } : v
                    ),
                  })
                }
              />
            </div>
            <button
              className="btn danger"
              onClick={() =>
                update({
                  budget: data.budget.filter((_, n) => n !== i),
                })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({
              budget: [...data.budget, { label: "새 비용", amount: "" }],
            })
          }
        >
          + 비용 추가
        </button>

        <h2 className="sectionTitle">체크리스트</h2>
        {data.checklist.map((x, i) => (
          <div className="editor" key={i}>
            <input
              value={x}
              onChange={(e) =>
                update({
                  checklist: data.checklist.map((v, n) =>
                    n === i ? e.target.value : v
                  ),
                })
              }
            />
            <button
              className="btn danger"
              onClick={() =>
                update({
                  checklist: data.checklist.filter((_, n) => n !== i),
                })
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          className="btn soft"
          onClick={() =>
            update({ checklist: [...data.checklist, "새 체크 항목"] })
          }
        >
          + 체크 항목 추가
        </button>

        <div className="actions" style={{ marginTop: 26 }}>
          <button
            className="btn primary"
            disabled={busy || uploading}
            onClick={save}
          >
            Supabase에 저장
          </button>

          <button
            className="btn danger"
            disabled={busy || uploading}
            onClick={async () => {
              if (!confirm("암스테르담 8일 자동입력암스테르담 8일 기본 일정을 불러오시겠습니까?\n현재 작성된 일정은 기본 일정으로 변경됩니다.")) return;
              await resetDaysInCloud();
              setDays(defaultDays);
            }}
          >
            암스테르담 8일 자동입력
          </button>

          <Link className="btn soft" href={`/day/${selected}`}>
            DAY {selected} 확인
          </Link>
        </div>

        {saved && (
          <div className="notice" style={{ marginTop: 12 }}>
            클라우드에 저장되었습니다.
          </div>
        )}
      </section>
    </main>
  );
}
