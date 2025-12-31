/**
 * Shape Layer Constants
 * Centralized constants for shape layer editor
 */

export type ShapeType = "rectangle" | "circle" | "triangle";

export const SHAPES: { type: ShapeType; label: string; icon: string }[] = [
  { type: "rectangle", label: "Rectangle", icon: "Square" },
  { type: "circle", label: "Circle", icon: "Circle" },
  { type: "triangle", label: "Triangle", icon: "Triangle" },
];

export const SHAPE_COLORS = [
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#22C55E" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Gray", value: "#6B7280" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
];

export const BORDER_WIDTHS = [0, 1, 2, 4, 6, 8];

export const OPACITY_OPTIONS = [0.25, 0.5, 0.75, 1];
