"use client";

import { supabase } from "./supabase";

const BUCKET = "trip-images";

function safeExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  const byType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  return byType[file.type] || "jpg";
}

export async function uploadTripImage(
  file: File,
  day: number
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드할 수 있습니다.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("이미지는 10MB 이하만 업로드할 수 있습니다.");
  }

  const extension = safeExtension(file);
  const path = `amsterdam-2026/day-${day}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  if (!data.publicUrl) {
    throw new Error("업로드한 이미지 주소를 가져오지 못했습니다.");
  }

  return data.publicUrl;
}
