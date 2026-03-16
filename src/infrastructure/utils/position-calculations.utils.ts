/**
 * Position & Size Calculation Utilities
 * Centralized position and size calculations for video editor
 */

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

/**
 * Convert percentage position to canvas pixels
 */
export function percentageToPixels(
  percentage: number,
  canvasSize: number,
): number {
  if (canvasSize <= 0) return 0;
  return (percentage / 100) * canvasSize;
}

/**
 * Convert canvas pixels to percentage
 */
export function pixelsToPercentage(
  pixels: number,
  canvasSize: number,
): number {
  if (canvasSize <= 0) return 0;
  return (pixels / canvasSize) * 100;
}

/**
 * Convert position from percentage to pixels
 */
export function positionToPixels(
  position: Position,
  canvasWidth: number,
  canvasHeight: number,
): Position {
  return {
    x: percentageToPixels(position.x, canvasWidth),
    y: percentageToPixels(position.y, canvasHeight),
  };
}

/**
 * Convert position from pixels to percentage
 */
export function positionToPercentage(
  position: Position,
  canvasWidth: number,
  canvasHeight: number,
): Position {
  return {
    x: pixelsToPercentage(position.x, canvasWidth),
    y: pixelsToPercentage(position.y, canvasHeight),
  };
}

/**
 * Convert size from percentage to pixels
 */
export function sizeToPixels(
  size: Size,
  canvasWidth: number,
  canvasHeight: number,
): Size {
  return {
    width: percentageToPixels(size.width, canvasWidth),
    height: percentageToPixels(size.height, canvasHeight),
  };
}

/**
 * Convert size from pixels to percentage
 */
export function sizeToPercentage(
  size: Size,
  canvasWidth: number,
  canvasHeight: number,
): Size {
  return {
    width: pixelsToPercentage(size.width, canvasWidth),
    height: pixelsToPercentage(size.height, canvasHeight),
  };
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Clamp position to canvas bounds (in pixels)
 */
export function clampPositionToCanvas(
  position: Position,
  canvasWidth: number,
  canvasHeight: number,
  elementWidth: number,
  elementHeight: number,
): Position {
  return {
    x: clamp(position.x, 0, canvasWidth - elementWidth),
    y: clamp(position.y, 0, canvasHeight - elementHeight),
  };
}

/**
 * Clamp position to percentage bounds (0-100)
 */
export function clampPositionPercentage(position: Position): Position {
  return {
    x: clamp(position.x, 0, 100),
    y: clamp(position.y, 0, 100),
  };
}

/**
 * Clamp size to minimum and maximum percentage values
 */
export function clampSizePercentage(
  size: Size,
  minSize: number = 1,
  maxSize: number = 100,
): Size {
  return {
    width: clamp(size.width, minSize, maxSize),
    height: clamp(size.height, minSize, maxSize),
  };
}

/**
 * Calculate center position for an element
 */
export function calculateCenterPosition(
  elementWidth: number,
  elementHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): Position {
  return {
    x: (canvasWidth - elementWidth) / 2,
    y: (canvasHeight - elementHeight) / 2,
  };
}

/**
 * Offset position by delta
 */
export function offsetPosition(position: Position, deltaX: number, deltaY: number): Position {
  return {
    x: position.x + deltaX,
    y: position.y + deltaY,
  };
}

/**
 * Check if position is within canvas bounds
 */
export function isPositionInBounds(
  position: Position,
  canvasWidth: number,
  canvasHeight: number,
  elementWidth: number,
  elementHeight: number,
): boolean {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x + elementWidth <= canvasWidth &&
    position.y + elementHeight <= canvasHeight
  );
}
