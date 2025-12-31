/**
 * OptionSelector Component
 * Reusable selector for font family, font weight, etc.
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

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
        {title}
      </AtomicText>
      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  selectedValue === option.value
                    ? tokens.colors.primary + "20"
                    : tokens.colors.surface,
                borderColor:
                  selectedValue === option.value
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onValueChange(option.value)}
          >
            <AtomicText
              type="labelSmall"
              style={{
                color:
                  selectedValue === option.value
                    ? tokens.colors.primary
                    : tokens.colors.textPrimary,
                fontWeight: selectedValue === option.value ? "600" : "400",
              }}
            >
              {option.label}
            </AtomicText>
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
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
