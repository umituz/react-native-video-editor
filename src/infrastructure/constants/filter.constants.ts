/**
 * Filter Presets
 * Color overlay-based filters for video and photo editing
 */

import type { FilterPreset } from "../../domain/entities";

export const FILTER_PRESETS: FilterPreset[] = [
  { id: "none", name: "Original", overlay: "transparent", opacity: 0 },
  { id: "vivid", name: "Vivid", overlay: "rgba(255, 100, 50, 0.15)", opacity: 0.15 },
  { id: "warm", name: "Warm", overlay: "rgba(255, 170, 50, 0.2)", opacity: 0.2 },
  { id: "cool", name: "Cool", overlay: "rgba(50, 130, 255, 0.18)", opacity: 0.18 },
  { id: "bw", name: "B&W", overlay: "rgba(0, 0, 0, 0)", opacity: 0 },
  { id: "vintage", name: "Vintage", overlay: "rgba(200, 150, 80, 0.25)", opacity: 0.25 },
  { id: "fade", name: "Fade", overlay: "rgba(230, 220, 210, 0.3)", opacity: 0.3 },
  { id: "dramatic", name: "Drama", overlay: "rgba(20, 20, 40, 0.2)", opacity: 0.2 },
  { id: "rose", name: "Rose", overlay: "rgba(255, 100, 150, 0.18)", opacity: 0.18 },
  { id: "emerald", name: "Emerald", overlay: "rgba(0, 200, 100, 0.15)", opacity: 0.15 },
  { id: "cinema", name: "Cinema", overlay: "rgba(30, 50, 80, 0.22)", opacity: 0.22 },
  { id: "retro", name: "Retro DV", overlay: "rgba(180, 140, 60, 0.3)", opacity: 0.3 },
  { id: "glitch", name: "Glitch", overlay: "rgba(0, 255, 200, 0.12)", opacity: 0.12 },
  { id: "noir", name: "Noir", overlay: "rgba(0, 0, 0, 0.1)", opacity: 0.1 },
  { id: "sunset", name: "Sunset", overlay: "rgba(255, 120, 50, 0.22)", opacity: 0.22 },
];

export const DEFAULT_FILTER = FILTER_PRESETS[0];
