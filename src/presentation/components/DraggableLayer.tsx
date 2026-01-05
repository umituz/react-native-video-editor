/**
 * DraggableLayer Component
 * Draggable and resizable layer component
 */

import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { Layer } from "../../domain/entities";
import { useDraggableLayerGestures } from "../hooks/useDraggableLayerGestures";
import { LayerContent } from "./draggable-layer/LayerContent";
import { ResizeHandles } from "./draggable-layer/ResizeHandles";

interface DraggableLayerProps {
  layer: Layer;
  canvasWidth: number;
  canvasHeight: number;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
}

export const DraggableLayer: React.FC<DraggableLayerProps> = ({
  layer,
  canvasWidth,
  canvasHeight,
  isSelected,
  onSelect,
  onPositionChange,
  onSizeChange,
}) => {
  const tokens = useAppDesignTokens();

  const initialX = (layer.position.x / 100) * canvasWidth;
  const initialY = (layer.position.y / 100) * canvasHeight;
  const initialWidth = (layer.size.width / 100) * canvasWidth;
  const initialHeight = (layer.size.height / 100) * canvasHeight;

  const {
    translateX,
    translateY,
    width,
    height,
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
    canvasWidth,
    canvasHeight,
    onSelect,
    onPositionChange,
    onSizeChange,
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotationStr = `${layer.rotation}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotationStr },
      ],
      opacity: layer.opacity,
      width: width.value,
      height: height.value,
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.layer,
          {
            borderColor: isSelected ? tokens.colors.primary : "transparent",
            borderWidth: isSelected ? 2 : 0,
          },
          animatedStyle,
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
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    overflow: "hidden",
  },
});
