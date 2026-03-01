/**
 * TextPreview Component
 * Preview section for text layer
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { TextLayerFormState } from "../../hooks/useTextLayerForm";

interface TextPreviewProps {
  formState: TextLayerFormState;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ formState }) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Preview
      </AtomicText>
      <View
        style={[
          styles.preview,
          {
            backgroundColor: tokens.colors.surfaceSecondary,
            borderColor: tokens.colors.borderLight,
          },
        ]}
      >
        <AtomicText
          type="bodyMedium"
          style={{
            fontSize: formState.fontSize,
            fontFamily: formState.fontFamily,
            fontWeight: formState.fontWeight,
            color: formState.color,
            textAlign: formState.textAlign,
          }}
        >
          {formState.text || "Enter text to preview..."}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  preview: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
  },
});
