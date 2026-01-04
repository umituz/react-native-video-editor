/**
 * Animation Layer Constants
 * Centralized constants for animation layer editor
 */

import type { AnimationType } from "../../domain/entities";

export type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

export const ANIMATION_TYPES: {
  type: AnimationType;
  label: string;
  icon: string;
}[] = [
  { type: "none", label: "None", icon: "Ban" },
  { type: "fade", label: "Fade", icon: "Eye" },
  { type: "slide", label: "Slide", icon: "MoveRight" },
  { type: "bounce", label: "Bounce", icon: "ArrowUp" },
  { type: "zoom", label: "Zoom", icon: "Maximize2" },
  { type: "rotate", label: "Rotate", icon: "RotateCw" },
];

export const DURATIONS = [300, 500, 800, 1000, 1500, 2000];

export const DELAYS = [0, 200, 500, 1000];

export const EASINGS: { value: Easing; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In-Out" },
];
