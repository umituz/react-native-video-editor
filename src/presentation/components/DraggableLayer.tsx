/**
 * DraggableLayer Component
 * Draggable and resizable layer component
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { Layer } from "../../domain/entities/video-project.types";
import { useDraggableLayerGestures } from "../hooks/useDraggableLayerGestures";
import { LayerContent } from "./draggable-layer/LayerContent";
import { ResizeHandles } from "./draggable-layer/ResizeHandles";
import { percentageToPixels } from "../../infrastructure/utils/position-calculations.utils";

interface DraggableLayerProps {
  layer: Layer;
  canvasWidth: number;
  canvasHeight: number;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
}

export const DraggableLayer: React.FC<DraggableLayerProps> = React.memo(({
  layer,
  canvasWidth,
  canvasHeight,
  isSelected,
  onSelect,
  onPositionChange,
  onSizeChange,
}) => {
  const tokens = useAppDesignTokens();

  const safeCanvasWidth = canvasWidth > 0 ? canvasWidth : 1;
  const safeCanvasHeight = canvasHeight > 0 ? canvasHeight : 1;

  const initialX = percentageToPixels(layer.position.x, safeCanvasWidth);
  const initialY = percentageToPixels(layer.position.y, safeCanvasHeight);
  const initialWidth = percentageToPixels(layer.size.width, safeCanvasWidth);
  const initialHeight = percentageToPixels(layer.size.height, safeCanvasHeight);

  // Stable callbacks to prevent gesture re-creation
  const handlePositionChange = useCallback((x: number, y: number) => {
    onPositionChange(x, y);
  }, [onPositionChange]);

  const handleSizeChange = useCallback((width: number, height: number) => {
    onSizeChange(width, height);
  }, [onSizeChange]);

  const handleSelect = useCallback(() => {
    onSelect();
  }, [onSelect]);

  const {
    state,
    composedGesture,
    topLeftResizeHandler,
    topRightResizeHandler,
    bottomLeftResizeHandler,
    bottomRightResizeHandler,
  } = useDraggableLayerGestures({
    initialX,
    initialY,
    initialWidth,
    initialHeight,
    canvasWidth: safeCanvasWidth,
    canvasHeight: safeCanvasHeight,
    onSelect: handleSelect,
    onPositionChange: handlePositionChange,
    onSizeChange: handleSizeChange,
  });

  // Memoize layer style to prevent new object on every render
  const layerStyle = useMemo(() => ({
    transform: [
      { translateX: state.x },
      { translateY: state.y },
      { rotate: `${layer.rotation}deg` },
    ] as const,
    opacity: layer.opacity,
    width: state.width,
    height: state.height,
  }), [state.x, state.y, state.width, state.height, layer.rotation, layer.opacity]);

  // Memoize border style
  const borderStyle = useMemo(() => ({
    borderColor: isSelected ? tokens.colors.primary : "transparent",
    borderWidth: isSelected ? 2 : 0,
  }), [isSelected, tokens.colors.primary]);

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        style={[
          styles.layer,
          borderStyle,
          layerStyle,
        ]}
      >
        <LayerContent layer={layer} />

        {isSelected && (
          <ResizeHandles
            topLeftGesture={topLeftResizeHandler}
            topRightGesture={topRightResizeHandler}
            bottomLeftGesture={bottomLeftResizeHandler}
            bottomRightGesture={bottomRightResizeHandler}
          />
        )}
      </View>
    </GestureDetector>
  );
});

DraggableLayer.displayName = 'DraggableLayer';

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    overflow: "hidden",
  },
});
