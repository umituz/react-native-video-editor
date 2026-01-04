/**
 * ColorPickerHorizontal Component
 * Horizontal scrolling color picker for shape layer
 */

import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { SHAPE_COLORS } from "../../../infrastructure/constants/shape-layer.constants";

interface ColorPickerHorizontalProps {
  title: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPickerHorizontal: React.FC<ColorPickerHorizontalProps> = ({
  title,
  selectedColor,
  onColorChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {title}
      </AtomicText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.colorsScroll}
      >
        {SHAPE_COLORS.map((color) => (
          <TouchableOpacity
            key={color.value}
            style={[
              styles.colorButton,
              {
                backgroundColor: color.value,
                borderColor:
                  selectedColor === color.value
                    ? tokens.colors.primary
                    : "#E5E7EB",
                borderWidth: selectedColor === color.value ? 3 : 2,
              },
            ]}
            onPress={() => onColorChange(color.value)}
          >
            {selectedColor === color.value && (
              <AtomicIcon
                name="Check"
                size="sm"
                color={color.value === "#FFFFFF" ? "primary" : "onSurface"}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  colorsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
