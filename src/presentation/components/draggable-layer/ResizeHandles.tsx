/**
 * ResizeHandles Component
 * Resize handles for draggable layers
 */

import React from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

interface ResizeHandlesProps {
  topLeftGesture: ReturnType<typeof Gesture.Pan>;
  topRightGesture: ReturnType<typeof Gesture.Pan>;
  bottomLeftGesture: ReturnType<typeof Gesture.Pan>;
  bottomRightGesture: ReturnType<typeof Gesture.Pan>;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({
  topLeftGesture,
  topRightGesture,
  bottomLeftGesture,
  bottomRightGesture,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <>
      <GestureDetector gesture={topLeftGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleTopLeft,
            {
              backgroundColor: tokens.colors.primary,
              borderColor: tokens.colors.onPrimary,
            },
          ]}
        />
      </GestureDetector>

      <GestureDetector gesture={topRightGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleTopRight,
            {
              backgroundColor: tokens.colors.primary,
              borderColor: tokens.colors.onPrimary,
            },
          ]}
        />
      </GestureDetector>

      <GestureDetector gesture={bottomLeftGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleBottomLeft,
            {
              backgroundColor: tokens.colors.primary,
              borderColor: tokens.colors.onPrimary,
            },
          ]}
        />
      </GestureDetector>

      <GestureDetector gesture={bottomRightGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleBottomRight,
            {
              backgroundColor: tokens.colors.primary,
              borderColor: tokens.colors.onPrimary,
            },
          ]}
        />
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  handle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  handleTopLeft: {
    top: -6,
    left: -6,
  },
  handleTopRight: {
    top: -6,
    right: -6,
  },
  handleBottomLeft: {
    bottom: -6,
    left: -6,
  },
  handleBottomRight: {
    bottom: -6,
    right: -6,
  },
});
