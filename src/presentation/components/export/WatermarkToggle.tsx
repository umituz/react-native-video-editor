/**
 * WatermarkToggle Component
 * Watermark toggle for export dialog
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface WatermarkToggleProps {
  includeWatermark: boolean;
  onToggle: (include: boolean) => void;
}

export const WatermarkToggle: React.FC<WatermarkToggleProps> = ({
  includeWatermark,
  onToggle,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[styles.toggleRow, { backgroundColor: tokens.colors.surface }]}
      onPress={() => onToggle(!includeWatermark)}
    >
      <View style={{ flex: 1 }}>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          Include Watermark
        </AtomicText>
        <AtomicText
          type="labelSmall"
          style={{ color: tokens.colors.textSecondary, marginTop: 2 }}
        >
          Add app branding to exported video
        </AtomicText>
      </View>
      <View
        style={[
          styles.toggle,
          {
            backgroundColor: includeWatermark
              ? tokens.colors.primary
              : tokens.colors.borderLight,
          },
        ]}
      >
        <View
          style={[
            styles.toggleThumb,
            {
              backgroundColor: tokens.colors.onPrimary,
              transform: [{ translateX: includeWatermark ? 20 : 0 }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
