/**
 * Color Picker Component
 * Color picker for text layer
 * REFACTORED: Uses generic Selector with colorPreview mode (35 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import { Selector, type SelectorItem } from "../generic/Selector";
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

  const items = useMemo<SelectorItem[]>(
    () => TEXT_COLORS.map((color) => ({ value: color, label: "", color })),
    [],
  );

  return (
    <View style={{ marginBottom: tokens.spacing.md }}>
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
      <Selector
        items={items}
        selectedValue={selectedColor}
        onSelect={onColorChange}
        orientation="grid"
        colorPreview
        testID="color-picker"
      />
    </View>
  );
};
