/**
 * Subtitle Constants
 */

import type { SubtitleStyle } from "../../domain/entities/video-project.types";

export const DEFAULT_SUBTITLE_STYLE: SubtitleStyle = {
  fontSize: "medium",
  fontColor: "#FFFFFF",
  backgroundColor: "rgba(0,0,0,0.6)",
  position: "bottom",
};

export const FONT_SIZE_MAP: Record<SubtitleStyle["fontSize"], number> = {
  small: 14,
  medium: 18,
  large: 24,
  extraLarge: 32,
};

export const SUBTITLE_FONT_COLORS = [
  "#FFFFFF",
  "#FFEB3B",
  "#00BCD4",
  "#4CAF50",
  "#F44336",
  "#FF9800",
] as const;

export const SUBTITLE_BG_COLORS = [
  { label: "None", value: "transparent" },
  { label: "Dark", value: "rgba(0,0,0,0.6)" },
  { label: "Gray", value: "rgba(50,50,50,0.8)" },
] as const;
