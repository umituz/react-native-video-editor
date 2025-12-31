/**
 * OptionSelectorRow Component
 * Reusable option selector row for export settings
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface Option<T extends string> {
  value: T;
  label: string;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
}

interface OptionSelectorRowProps<T extends string> {
  title: string;
  options: Option<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
}

export function OptionSelectorRow<T extends string>({
  title,
  options,
  selectedValue,
  onValueChange,
}: OptionSelectorRowProps<T>) {
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
      <View style={styles.optionsRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  selectedValue === option.value
                    ? tokens.colors.primary
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
              type="bodySmall"
              style={{
                color:
                  selectedValue === option.value
                    ? "#FFFFFF"
                    : tokens.colors.textPrimary,
                fontWeight: selectedValue === option.value ? "600" : "400",
                textTransform: option.textTransform || "none",
              }}
            >
              {option.label}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
