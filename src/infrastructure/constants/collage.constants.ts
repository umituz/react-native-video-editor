/**
 * Collage Layouts
 * Grid definitions for collage editor
 * Each cell: [x, y, width, height] as fractions of canvas (0–1)
 */

export interface CollageLayout {
  readonly id: string;
  readonly count: number;
  readonly grid: readonly [number, number, number, number][];
}

export const COLLAGE_LAYOUTS: CollageLayout[] = [
  {
    id: "2h",
    count: 2,
    grid: [
      [0, 0, 0.5, 1],
      [0.5, 0, 0.5, 1],
    ],
  },
  {
    id: "2v",
    count: 2,
    grid: [
      [0, 0, 1, 0.5],
      [0, 0.5, 1, 0.5],
    ],
  },
  {
    id: "3a",
    count: 3,
    grid: [
      [0, 0, 0.5, 1],
      [0.5, 0, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
    ],
  },
  {
    id: "3b",
    count: 3,
    grid: [
      [0, 0, 1, 0.5],
      [0, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
    ],
  },
  {
    id: "4",
    count: 4,
    grid: [
      [0, 0, 0.5, 0.5],
      [0.5, 0, 0.5, 0.5],
      [0, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, 0.5],
    ],
  },
  {
    id: "6",
    count: 6,
    grid: [
      [0, 0, 0.333, 0.5],
      [0.333, 0, 0.334, 0.5],
      [0.667, 0, 0.333, 0.5],
      [0, 0.5, 0.333, 0.5],
      [0.333, 0.5, 0.334, 0.5],
      [0.667, 0.5, 0.333, 0.5],
    ],
  },
];

export const DEFAULT_COLLAGE_LAYOUT = COLLAGE_LAYOUTS[0];
export const DEFAULT_COLLAGE_SPACING = 4;
export const DEFAULT_COLLAGE_BORDER_RADIUS = 8;
