"use client";

import { CONTENT_ID, defaultDays } from "./defaultData";
import { defaultPlacesByDay } from "./defaultPlaces";
import { syncDayFromPlaces } from "./routeUtils";
import { supabase } from "./supabase";
import { TripDay } from "./types";

type TripContentRow = {
  id: string;
  data: TripDay[];
  updated_at: string;
};

function normalizeDays(days: TripDay[]): TripDay[] {
  return days.map((day) => {
    const places = day.places?.length
      ? day.places
      : defaultPlacesByDay[day.day] || [];
    return syncDayFromPlaces({ ...day, places });
  });
}

export async function loadDaysFromCloud(): Promise<TripDay[]> {
  const { data, error } = await supabase
    .from("trip_content")
    .select("id,data,updated_at")
    .eq("id", CONTENT_ID)
    .maybeSingle<TripContentRow>();

  if (error) throw error;

  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return defaultDays;
  }

  return normalizeDays(data.data);
}

export async function saveDaysToCloud(days: TripDay[]): Promise<void> {
  const normalized = normalizeDays(days);
  const { error } = await supabase
    .from("trip_content")
    .upsert(
      {
        id: CONTENT_ID,
        data: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (error) throw error;
}

export async function resetDaysInCloud(): Promise<void> {
  await saveDaysToCloud(defaultDays);
}
