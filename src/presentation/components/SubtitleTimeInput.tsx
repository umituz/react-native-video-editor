/**
 * SubtitleTimeInput Component
 * Coarse (+/-1s) and fine (+/-0.1s, +/-5s) time adjustment
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { formatTimeDetailed } from "../../infrastructure/utils/srt.utils";

interface SubtitleTimeInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

export const SubtitleTimeInput: React.FC<SubtitleTimeInputProps> = ({ label, value, onChange }) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1 },
    label: { marginBottom: tokens.spacing.xs },
    row: { flexDirection: "row", alignItems: "center", gap: tokens.spacing.xs },
    adjustBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    display: {
      flex: 1,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
      paddingVertical: tokens.spacing.sm,
      alignItems: "center",
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    fineRow: {
      flexDirection: "row",
      gap: tokens.spacing.xs,
      marginTop: tokens.spacing.xs,
      flexWrap: "wrap",
    },
    fineBtn: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.sm,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
  }), [tokens]);

  const adjust = (delta: number) => onChange(Math.max(0, value + delta));

  return (
    <View style={styles.container}>
      <AtomicText type="labelSmall" color="textSecondary" style={styles.label}>
        {label}
      </AtomicText>
      <View style={styles.row}>
        <TouchableOpacity style={styles.adjustBtn} onPress={() => adjust(-1)} accessibilityRole="button">
          <AtomicText fontWeight="bold" color="textPrimary">−</AtomicText>
        </TouchableOpacity>
        <View style={styles.display}>
          <AtomicText fontWeight="semibold" color="textPrimary">
            {formatTimeDetailed(value)}
          </AtomicText>
        </View>
        <TouchableOpacity style={styles.adjustBtn} onPress={() => adjust(1)} accessibilityRole="button">
          <AtomicText fontWeight="bold" color="textPrimary">+</AtomicText>
        </TouchableOpacity>
      </View>
      <View style={styles.fineRow}>
        {([-5, -0.1, 0.1, 5] as const).map((delta) => (
          <TouchableOpacity key={delta} style={styles.fineBtn} onPress={() => adjust(delta)} accessibilityRole="button">
            <AtomicText type="labelSmall" color="textSecondary">
              {delta > 0 ? `+${delta}s` : `${delta}s`}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
