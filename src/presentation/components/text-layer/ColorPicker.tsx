/**
 * ColorPicker Component
 * Color picker for text layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { TEXT_COLORS } from "../../../infrastructure/constants/text-layer.constants";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  const { t } = useLocalization();
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
        {t("editor.properties.color")}
      </AtomicText>
      <View style={styles.colorGrid}>
        {TEXT_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              {
                backgroundColor: color,
                borderColor:
                  selectedColor === color
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                borderWidth: selectedColor === color ? 3 : 1,
              },
            ]}
            onPress={() => onColorChange(color)}
          >
            {selectedColor === color && (
              <AtomicIcon
                name="Check"
                size="sm"
                color={
                  color === "#FFFFFF" || color === "#FCD34D"
                    ? "primary"
                    : "onSurface"
                }
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
