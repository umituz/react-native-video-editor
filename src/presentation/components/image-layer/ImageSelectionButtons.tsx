/**
 * ImageSelectionButtons Component
 * Image selection buttons (gallery and camera) for image layer editor
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface ImageSelectionButtonsProps {
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
}

export const ImageSelectionButtons: React.FC<ImageSelectionButtonsProps> = ({
  onPickFromGallery,
  onTakePhoto,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.selectionButtons}>
      <TouchableOpacity
        style={[
          styles.selectionButton,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
        onPress={onPickFromGallery}
      >
        <AtomicIcon name="folder-open-outline" size="md" color="primary" />
        <AtomicText
          type="bodySmall"
          style={{ color: tokens.colors.textPrimary, marginTop: 8 }}
        >
          From Gallery
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.selectionButton,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
        onPress={onTakePhoto}
      >
        <AtomicIcon name="camera-outline" size="md" color="primary" />
        <AtomicText
          type="bodySmall"
          style={{ color: tokens.colors.textPrimary, marginTop: 8 }}
        >
          Take Photo
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  selectionButton: {
    flex: 1,
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
