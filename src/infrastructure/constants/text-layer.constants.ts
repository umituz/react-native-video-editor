/**
 * Text Layer Constants
 * Centralized constants for text layer editor
 */

export const FONT_SIZES = [12, 16, 20, 24, 32, 40, 48, 64, 72, 96];

export const FONT_FAMILIES = [
  "System",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
];

export const FONT_WEIGHTS = [
  { label: "Normal", value: "normal" as const },
  { label: "Bold", value: "bold" as const },
  { label: "Light", value: "300" as const },
  { label: "Heavy", value: "700" as const },
];

export const TEXT_ALIGNS = [
  { label: "Left", value: "left" as const, icon: "AlignLeft" },
  { label: "Center", value: "center" as const, icon: "AlignCenter" },
  { label: "Right", value: "right" as const, icon: "AlignRight" },
];

export const TEXT_COLORS = [
  "#FFFFFF", // White
  "#000000", // Black
  "#EF4444", // Red
  "#F59E0B", // Orange
  "#10B981", // Green
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#6B7280", // Gray
  "#FCD34D", // Yellow
];
