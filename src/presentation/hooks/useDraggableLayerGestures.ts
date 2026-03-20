/**
 * useDraggableLayerGestures Hook
 * Manages gesture handling for draggable layers
 * PERFORMANCE: Uses runOnJS for state updates to prevent UI thread blocking
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
// @ts-ignore - react-native-reanimated is an optional peer dependency
import { runOnJS } from "react-native-reanimated";

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

  // Sync state when initial values change (e.g., layer props update from parent)
  useEffect(() => {
    setState({
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
    });
    startRef.current = { x: initialX, y: initialY, width: initialWidth, height: initialHeight };
  }, [initialX, initialY, initialWidth, initialHeight]);

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  }, []);

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      startRef.current = { ...state, x: state.x, y: state.y };
      runOnJS(onSelect)();
    })
    .onUpdate((event) => {
      'worklet';
      const newX = startRef.current.x + event.translationX;
      const newY = startRef.current.y + event.translationY;
      // Use runOnJS for state updates to prevent blocking UI thread
      runOnJS(setState)({ x: newX, y: newY, width: state.width, height: state.height });
    })
    .onEnd(() => {
      'worklet';
      const clampedX = clamp(state.x, 0, canvasWidth - state.width);
      const clampedY = clamp(state.y, 0, canvasHeight - state.height);
      const newX = (clampedX / canvasWidth) * 100;
      const newY = (clampedY / canvasHeight) * 100;
      runOnJS(setState)({ x: clampedX, y: clampedY, width: state.width, height: state.height });
      runOnJS(onPositionChange)(newX, newY);
    });

  const createResizeHandler = (
    deltaX: (tx: number) => number,
    deltaY: (ty: number) => number,
  ) => {
    return Gesture.Pan()
      .onStart(() => {
        'worklet';
        startRef.current = { ...state };
        runOnJS(onSelect)();
      })
      .onUpdate((event) => {
        'worklet';
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

        runOnJS(setState)({ x: newX, y: newY, width: clampedWidth, height: clampedHeight });
      })
      .onEnd(() => {
        'worklet';
        // Clamp position to canvas bounds
        const clampedX = Math.max(0, Math.min(state.x, canvasWidth - state.width));
        const clampedY = Math.max(0, Math.min(state.y, canvasHeight - state.height));

        const newWidth = (state.width / canvasWidth) * 100;
        const newHeight = (state.height / canvasHeight) * 100;
        const newX = (clampedX / canvasWidth) * 100;
        const newY = (clampedY / canvasHeight) * 100;

        runOnJS(onSizeChange)(newWidth, newHeight);
        runOnJS(onPositionChange)(newX, newY);
        runOnJS(setState)({ x: clampedX, y: clampedY, width: state.width, height: state.height });
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
