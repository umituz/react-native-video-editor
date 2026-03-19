/**
 * Color Picker Horizontal Component
 * Horizontal scrolling color picker for shape layer
 * REFACTORED: Uses generic Selector with colorPreview mode (28 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Selector, type SelectorItem } from "../generic/Selector";
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

  const items = useMemo<SelectorItem[]>(
    () => SHAPE_COLORS.map((color) => ({ value: color.value, label: "", color: color.value })),
    [],
  );

  return (
    <View style={{ marginBottom: tokens.spacing.md }}>
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
      <Selector
        items={items}
        selectedValue={selectedColor}
        onSelect={onColorChange}
        orientation="horizontal"
        colorPreview
        testID="color-picker-horizontal"
      />
    </View>
  );
};
