/**
 * Speed Presets
 * Playback rate options for video editing
 */

export interface SpeedPreset {
  readonly label: string;
  readonly value: number;
}

export const SPEED_PRESETS: SpeedPreset[] = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "1x", value: 1 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
  { label: "3x", value: 3 },
  { label: "4x", value: 4 },
];

export const DEFAULT_PLAYBACK_RATE = 1;
