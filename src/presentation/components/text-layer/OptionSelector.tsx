/**
 * Option Selector Component
 * Reusable selector for font family, font weight, etc.
 * REFACTORED: Uses generic Selector component (29 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Selector, type SelectorItem } from "../generic/Selector";

interface Option {
  label: string;
  value: string;
}

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  title,
  options,
  selectedValue,
  onValueChange,
}) => {
  const tokens = useAppDesignTokens();

  const items = useMemo<SelectorItem<string>[]>(
    () => options.map((option) => ({ value: option.value, label: option.label })),
    [options],
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
        {title}
      </AtomicText>
      <Selector
        items={items}
        selectedValue={selectedValue}
        onSelect={onValueChange}
        orientation="grid"
        testID="option-selector"
      />
    </View>
  );
};
