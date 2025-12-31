/**
 * ImagePreview Component
 * Image preview or placeholder for image layer editor
 */

import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface ImagePreviewProps {
  imageUri: string;
  opacity: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  opacity,
}) => {
  const tokens = useAppDesignTokens();

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={[styles.imagePreview, { opacity }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.imagePlaceholder,
        {
          backgroundColor: tokens.colors.surfaceSecondary,
          borderColor: tokens.colors.borderLight,
        },
      ]}
    >
      <AtomicIcon name="image-outline" size="xl" color="secondary" />
      <AtomicText
        type="bodyMedium"
        style={{ color: tokens.colors.textSecondary, marginTop: 12 }}
      >
        No image selected
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
