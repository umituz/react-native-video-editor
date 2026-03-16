/**
 * SRT Subtitle Utilities
 * Re-exports time utilities for backward compatibility
 */

import type { Subtitle } from "../../domain/entities/video-project.types";
import { toSrtTime } from "./time-calculations.utils";

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

// Re-export time utilities for backward compatibility
export { formatTimeDisplay, formatTimeDetailed, toSrtTime } from "./time-calculations.utils";
