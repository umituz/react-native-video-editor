/**
 * ValueSelector Component
 * Reusable selector for border width, opacity, etc.
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface ValueSelectorProps {
  title: string;
  value: number;
  options: number[];
  formatValue: (value: number) => string;
  onValueChange: (value: number) => void;
}

export const ValueSelector: React.FC<ValueSelectorProps> = ({
  title,
  value,
  options,
  formatValue,
  onValueChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          {title}
        </AtomicText>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.primary, fontWeight: "600" }}
        >
          {formatValue(value)}
        </AtomicText>
      </View>

      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  value === option
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  value === option
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onValueChange(option)}
          >
            <AtomicText
              type="labelSmall"
              style={{
                color: value === option ? "#FFFFFF" : tokens.colors.textPrimary,
                fontWeight: value === option ? "600" : "400",
              }}
            >
              {formatValue(option)}
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    minWidth: "30%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
