/**
 * OpacitySelector Component
 * Opacity selector for image layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { IMAGE_OPACITY_OPTIONS } from "../../../infrastructure/constants/image-layer.constants";

interface OpacitySelectorProps {
  opacity: number;
  onOpacityChange: (opacity: number) => void;
}

export const OpacitySelector: React.FC<OpacitySelectorProps> = ({
  opacity,
  onOpacityChange,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.opacitySection}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {t("editor.properties.opacity")}: {Math.round(opacity * 100)}%
      </AtomicText>
      <View style={styles.opacityButtons}>
        {IMAGE_OPACITY_OPTIONS.map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.opacityButton,
              {
                backgroundColor:
                  opacity === value
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  opacity === value
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onOpacityChange(value)}
          >
            <AtomicText
              type="bodySmall"
              style={{
                color:
                  opacity === value ? tokens.colors.onPrimary : tokens.colors.textPrimary,
                fontWeight: opacity === value ? "600" : "400",
              }}
            >
              {Math.round(value * 100)}%
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  opacitySection: {
    marginBottom: 24,
  },
  opacityButtons: {
    flexDirection: "row",
    gap: 8,
  },
  opacityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
