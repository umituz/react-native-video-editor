/**
 * Font Size Selector Component
 * Font size selector for text layer
 * REFACTORED: Uses generic Selector component (45 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import { Selector, type SelectorItem } from "../generic/Selector";
import { FONT_SIZES } from "../../../infrastructure/constants/text-layer.constants";

interface FontSizeSelectorProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
  fontSize,
  onFontSizeChange,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const items = useMemo<SelectorItem<number>[]>(
    () => FONT_SIZES.map((size) => ({ value: size, label: `${size}px` })),
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
        {t("editor.properties.font_size")}: {fontSize}px
      </AtomicText>
      <Selector
        items={items}
        selectedValue={fontSize}
        onSelect={onFontSizeChange}
        orientation="horizontal"
        testID="font-size-selector"
      />
    </View>
  );
};
