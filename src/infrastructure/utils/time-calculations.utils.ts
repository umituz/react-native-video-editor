/**
 * Time Calculation Utilities
 * Centralized time-related calculations for video editor
 */

/**
 * Convert milliseconds to seconds
 */
export function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Convert seconds to milliseconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Format milliseconds as display time (e.g., "5s" or "1:23")
 */
export function formatTimeDisplay(ms: number, showMinutes: boolean = false): string {
  const totalSeconds = Math.floor(ms / 1000);

  if (!showMinutes || totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Format milliseconds as detailed time (e.g., "1:23.4")
 */
export function formatTimeDetailed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

/**
 * Calculate progress percentage (0-1)
 */
export function calculateProgress(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, current / total));
}

/**
 * Calculate progress percentage (0-100)
 */
export function calculateProgressPercent(current: number, total: number): number {
  return calculateProgress(current, total) * 100;
}

/**
 * Calculate delta time between two timestamps
 */
export function calculateDelta(current: number, previous: number): number {
  return current - previous;
}

/**
 * Add delta time to base time
 */
export function addDeltaTime(baseTime: number, deltaTime: number): number {
  return baseTime + deltaTime;
}

/**
 * Clamp time to duration bounds
 */
export function clampTime(time: number, duration: number): number {
  return Math.max(0, Math.min(duration, time));
}

/**
 * Check if time is at or past duration
 */
export function isTimeAtEnd(time: number, duration: number): boolean {
  return time >= duration;
}

/**
 * Convert seconds to SRT time format (HH:MM:SS,mmm)
 */
export function toSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

/**
 * Calculate total duration from scenes (in milliseconds)
 */
export function calculateTotalDuration(sceneDurations: number[]): number {
  return sceneDurations.reduce((total, duration) => total + duration, 0);
}
