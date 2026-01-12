/**
 * ShapePreview Component
 * Preview section for shape layer
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ShapeLayerFormState } from "../../hooks/useShapeLayerForm";

interface ShapePreviewProps {
  formState: ShapeLayerFormState;
}

export const ShapePreview: React.FC<ShapePreviewProps> = ({ formState }) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.preview, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText
        type="labelSmall"
        style={{ color: tokens.colors.textSecondary, marginBottom: 12 }}
      >
        Preview
      </AtomicText>
      <View
        style={[
          styles.previewShape,
          {
            backgroundColor: formState.fillColor,
            borderColor: formState.borderColor,
            borderWidth: formState.borderWidth,
            borderRadius: formState.shape === "circle" ? 50 : 0,
            opacity: formState.opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  previewShape: {
    width: 100,
    height: 100,
  },
});
