/**
 * Text Align Selector Component
 * Text alignment selector for text layer
 * REFACTORED: Uses generic Selector component (38 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import { Selector, type SelectorItem } from "../generic/Selector";
import { TEXT_ALIGNS } from "../../../infrastructure/constants/text-layer.constants";

interface TextAlignSelectorProps {
  textAlign: "left" | "center" | "right";
  onTextAlignChange: (align: "left" | "center" | "right") => void;
}

export const TextAlignSelector: React.FC<TextAlignSelectorProps> = ({
  textAlign,
  onTextAlignChange,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const items = useMemo<SelectorItem<"left" | "center" | "right">[]>(
    () => TEXT_ALIGNS.map((align) => ({
      value: align.value,
      label: "",
      icon: align.icon,
    })),
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
        {t("editor.properties.text_align")}
      </AtomicText>
      <Selector
        items={items}
        selectedValue={textAlign}
        onSelect={onTextAlignChange}
        icon
        testID="text-align-selector"
      />
    </View>
  );
};
