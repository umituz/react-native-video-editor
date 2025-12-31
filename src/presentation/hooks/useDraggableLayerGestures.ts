/**
 * useDraggableLayerGestures Hook
 * Manages gesture handling for draggable layers
 */

import { useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { withSpring, runOnJS } from "react-native-reanimated";

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

interface UseDraggableLayerGesturesReturn {
  translateX: ReturnType<typeof useSharedValue<number>>;
  translateY: ReturnType<typeof useSharedValue<number>>;
  width: ReturnType<typeof useSharedValue<number>>;
  height: ReturnType<typeof useSharedValue<number>>;
  composedGesture: ReturnType<typeof Gesture.Race>;
  topLeftResizeHandler: ReturnType<typeof Gesture.Pan>;
  topRightResizeHandler: ReturnType<typeof Gesture.Pan>;
  bottomLeftResizeHandler: ReturnType<typeof Gesture.Pan>;
  bottomRightResizeHandler: ReturnType<typeof Gesture.Pan>;
}

const MIN_SIZE = 50;

/**
 * Hook for managing draggable layer gestures
 */
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
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);

  const startX = useSharedValue(initialX);
  const startY = useSharedValue(initialY);
  const startWidth = useSharedValue(initialWidth);
  const startHeight = useSharedValue(initialHeight);

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
      runOnJS(onSelect)();
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(
        Math.max(0, Math.min(canvasWidth - width.value, translateX.value)),
      );
      translateY.value = withSpring(
        Math.max(0, Math.min(canvasHeight - height.value, translateY.value)),
      );

      const newX = (translateX.value / canvasWidth) * 100;
      const newY = (translateY.value / canvasHeight) * 100;
      runOnJS(onPositionChange)(newX, newY);
    });

  const createResizeHandler = (
    deltaX: (translationX: number) => number,
    deltaY: (translationY: number) => number,
  ) => {
    return Gesture.Pan()
      .onStart(() => {
        startWidth.value = width.value;
        startHeight.value = height.value;
        startX.value = translateX.value;
        startY.value = translateY.value;
        runOnJS(onSelect)();
      })
      .onUpdate((event) => {
        const newWidth = Math.max(
          MIN_SIZE,
          startWidth.value + deltaX(event.translationX),
        );
        const newHeight = Math.max(
          MIN_SIZE,
          startHeight.value + deltaY(event.translationY),
        );
        width.value = Math.min(newWidth, canvasWidth - startX.value);
        height.value = Math.min(newHeight, canvasHeight - startY.value);

        if (deltaX(event.translationX) < 0) {
          translateX.value = Math.max(
            0,
            startX.value + (startWidth.value - width.value),
          );
        }
        if (deltaY(event.translationY) < 0) {
          translateY.value = Math.max(
            0,
            startY.value + (startHeight.value - height.value),
          );
        }
      })
      .onEnd(() => {
        const newWidth = (width.value / canvasWidth) * 100;
        const newHeight = (height.value / canvasHeight) * 100;
        const newX = (translateX.value / canvasWidth) * 100;
        const newY = (translateY.value / canvasHeight) * 100;
        runOnJS(onSizeChange)(newWidth, newHeight);
        runOnJS(onPositionChange)(newX, newY);
      });
  };

  const topLeftResizeHandler = createResizeHandler(
    (tx) => -tx,
    (ty) => -ty,
  );
  const topRightResizeHandler = createResizeHandler(
    (tx) => tx,
    (ty) => -ty,
  );
  const bottomLeftResizeHandler = createResizeHandler(
    (tx) => -tx,
    (ty) => ty,
  );
  const bottomRightResizeHandler = createResizeHandler(
    (tx) => tx,
    (ty) => ty,
  );

  const composedGesture = Gesture.Race(
    gestureHandler,
    topLeftResizeHandler,
    topRightResizeHandler,
    bottomLeftResizeHandler,
    bottomRightResizeHandler,
  );

  return {
    translateX,
    translateY,
    width,
    height,
    composedGesture,
    topLeftResizeHandler,
    topRightResizeHandler,
    bottomLeftResizeHandler,
    bottomRightResizeHandler,
  };
}
