/**
 * useDraggableLayerGestures Hook
 * Manages gesture handling for draggable layers
 */

import { useState, useRef, useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";

interface UseDraggableLayerGesturesParams {
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  onSelect: () => void;
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
}

interface LayerState {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseDraggableLayerGesturesReturn {
  state: LayerState;
  composedGesture: ReturnType<typeof Gesture.Race>;
  topLeftResizeHandler: ReturnType<typeof Gesture.Pan>;
  topRightResizeHandler: ReturnType<typeof Gesture.Pan>;
  bottomLeftResizeHandler: ReturnType<typeof Gesture.Pan>;
  bottomRightResizeHandler: ReturnType<typeof Gesture.Pan>;
}

const MIN_SIZE = 50;

export function useDraggableLayerGestures({
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  canvasWidth,
  canvasHeight,
  onSelect,
  onPositionChange,
  onSizeChange,
}: UseDraggableLayerGesturesParams): UseDraggableLayerGesturesReturn {
  const [state, setState] = useState<LayerState>({
    x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight,
  });

  const startRef = useRef({ x: initialX, y: initialY, width: initialWidth, height: initialHeight });

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  }, []);

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      startRef.current = { ...state, x: state.x, y: state.y };
      onSelect();
    })
    .onUpdate((event) => {
      const newX = startRef.current.x + event.translationX;
      const newY = startRef.current.y + event.translationY;
      setState((prev) => ({ ...prev, x: newX, y: newY }));
    })
    .onEnd(() => {
      setState((prev) => {
        const clampedX = clamp(prev.x, 0, canvasWidth - prev.width);
        const clampedY = clamp(prev.y, 0, canvasHeight - prev.height);
        const newX = (clampedX / canvasWidth) * 100;
        const newY = (clampedY / canvasHeight) * 100;
        onPositionChange(newX, newY);
        return { ...prev, x: clampedX, y: clampedY };
      });
    });

  const createResizeHandler = (
    deltaX: (tx: number) => number,
    deltaY: (ty: number) => number,
  ) => {
    return Gesture.Pan()
      .onStart(() => {
        startRef.current = { ...state };
        onSelect();
      })
      .onUpdate((event) => {
        const newWidth = Math.max(MIN_SIZE, startRef.current.width + deltaX(event.translationX));
        const newHeight = Math.max(MIN_SIZE, startRef.current.height + deltaY(event.translationY));
        const clampedWidth = Math.min(newWidth, canvasWidth - startRef.current.x);
        const clampedHeight = Math.min(newHeight, canvasHeight - startRef.current.y);

        let newX = startRef.current.x;
        let newY = startRef.current.y;

        if (deltaX(event.translationX) < 0) {
          newX = Math.max(0, startRef.current.x + (startRef.current.width - clampedWidth));
        }
        if (deltaY(event.translationY) < 0) {
          newY = Math.max(0, startRef.current.y + (startRef.current.height - clampedHeight));
        }

        setState({ x: newX, y: newY, width: clampedWidth, height: clampedHeight });
      })
      .onEnd(() => {
        setState((prev) => {
          const newWidth = (prev.width / canvasWidth) * 100;
          const newHeight = (prev.height / canvasHeight) * 100;
          const newX = (prev.x / canvasWidth) * 100;
          const newY = (prev.y / canvasHeight) * 100;
          onSizeChange(newWidth, newHeight);
          onPositionChange(newX, newY);
          return prev;
        });
      });
  };

  const topLeftResizeHandler = createResizeHandler((tx) => -tx, (ty) => -ty);
  const topRightResizeHandler = createResizeHandler((tx) => tx, (ty) => -ty);
  const bottomLeftResizeHandler = createResizeHandler((tx) => -tx, (ty) => ty);
  const bottomRightResizeHandler = createResizeHandler((tx) => tx, (ty) => ty);

  const composedGesture = Gesture.Race(
    gestureHandler,
    topLeftResizeHandler,
    topRightResizeHandler,
    bottomLeftResizeHandler,
    bottomRightResizeHandler,
  );

  return {
    state,
    composedGesture,
    topLeftResizeHandler,
    topRightResizeHandler,
    bottomLeftResizeHandler,
    bottomRightResizeHandler,
  };
}
