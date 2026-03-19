/**
 * Position & Size Calculation Utilities
 */

export interface Position { x: number; y: number; }
export interface Size { width: number; height: number; }

export const percentageToPixels = (percentage: number, canvasSize: number): number => {
  if (canvasSize <= 0) return 0;
  return (percentage / 100) * canvasSize;
};

export const pixelsToPercentage = (pixels: number, canvasSize: number): number => {
  if (canvasSize <= 0) return 0;
  return (pixels / canvasSize) * 100;
};

export const positionToPixels = (position: Position, canvasWidth: number, canvasHeight: number): Position => ({
  x: percentageToPixels(position.x, canvasWidth),
  y: percentageToPixels(position.y, canvasHeight),
});

export const positionToPercentage = (position: Position, canvasWidth: number, canvasHeight: number): Position => ({
  x: pixelsToPercentage(position.x, canvasWidth),
  y: pixelsToPercentage(position.y, canvasHeight),
});

export const sizeToPixels = (size: Size, canvasWidth: number, canvasHeight: number): Size => ({
  width: percentageToPixels(size.width, canvasWidth),
  height: percentageToPixels(size.height, canvasHeight),
});

export const sizeToPercentage = (size: Size, canvasWidth: number, canvasHeight: number): Size => ({
  width: pixelsToPercentage(size.width, canvasWidth),
  height: pixelsToPercentage(size.height, canvasHeight),
});

export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export const clampPositionToCanvas = (position: Position, canvasWidth: number, canvasHeight: number, elementWidth: number, elementHeight: number): Position => ({
  x: clamp(position.x, 0, canvasWidth - elementWidth),
  y: clamp(position.y, 0, canvasHeight - elementHeight),
});

export const clampPositionPercentage = (position: Position): Position => ({
  x: clamp(position.x, 0, 100),
  y: clamp(position.y, 0, 100),
});

export const clampSizePercentage = (size: Size, minSize: number = 1, maxSize: number = 100): Size => ({
  width: clamp(size.width, minSize, maxSize),
  height: clamp(size.height, minSize, maxSize),
});

export const calculateCenterPosition = (elementWidth: number, elementHeight: number, canvasWidth: number, canvasHeight: number): Position => ({
  x: (canvasWidth - elementWidth) / 2,
  y: (canvasHeight - elementHeight) / 2,
});

export const offsetPosition = (position: Position, deltaX: number, deltaY: number): Position => ({
  x: position.x + deltaX,
  y: position.y + deltaY,
});

export const isPositionInBounds = (position: Position, canvasWidth: number, canvasHeight: number, elementWidth: number, elementHeight: number): boolean =>
  position.x >= 0 && position.y >= 0 && position.x + elementWidth <= canvasWidth && position.y + elementHeight <= canvasHeight;
