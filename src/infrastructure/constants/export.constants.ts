/**
 * Export Constants
 * Centralized constants for export dialog
 */

export type Resolution = "720p" | "1080p" | "4k";
export type Quality = "low" | "medium" | "high";
export type Format = "mp4" | "mov";

export const RESOLUTIONS: Resolution[] = ["720p", "1080p", "4k"];

export const QUALITIES: Quality[] = ["low", "medium", "high"];

export const FORMATS: Format[] = ["mp4", "mov"];

export const BASE_SIZE_PER_SECOND = 0.5; // MB per second for 1080p high quality

export const RESOLUTION_MULTIPLIERS: Record<Resolution, number> = {
  "720p": 0.6,
  "1080p": 1,
  "4k": 2,
};

export const QUALITY_MULTIPLIERS: Record<Quality, number> = {
  low: 0.5,
  medium: 0.75,
  high: 1,
};
