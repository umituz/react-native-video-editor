/**
 * SRT Subtitle Utilities
 */

import type { Subtitle } from "../../domain/entities/video-project.types";

function toSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function generateSRT(subtitles: Subtitle[]): string {
  const validSubtitles = subtitles.filter((sub) => (
    sub.startTime >= 0 &&
    sub.endTime >= 0 &&
    sub.startTime < sub.endTime &&
    sub.text.trim().length > 0
  ));

  const sorted = [...validSubtitles].sort((a, b) => a.startTime - b.startTime);
  return sorted
    .map((sub, index) => `${index + 1}\n${toSrtTime(sub.startTime)} --> ${toSrtTime(sub.endTime)}\n${sub.text}\n`)
    .join("\n");
}

export function formatTimeDisplay(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatTimeDetailed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const t = Math.floor((seconds % 1) * 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${t}`;
}
