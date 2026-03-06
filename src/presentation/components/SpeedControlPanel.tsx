/**
 * SpeedControlPanel Component
 * Horizontal speed selector for video playback rate
 */

import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { SPEED_PRESETS } from "../../infrastructure/constants/speed.constants";

interface SpeedControlPanelProps {
  playbackRate: number;
  onChangeRate: (rate: number) => void;
  t: (key: string) => string;
}

export const SpeedControlPanel: React.FC<SpeedControlPanelProps> = ({
  playbackRate,
  onChangeRate,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { paddingVertical: tokens.spacing.sm },
        label: {
          paddingHorizontal: tokens.spacing.md,
          marginBottom: tokens.spacing.sm,
        },
        scroll: { paddingHorizontal: tokens.spacing.md, gap: tokens.spacing.sm },
        btn: {
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.borders.radius.full,
          backgroundColor: tokens.colors.surfaceVariant,
        },
        btnActive: {
          backgroundColor: tokens.colors.primary,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <AtomicText type="labelSmall" color="textSecondary" style={styles.label}>
        {t("editor.speed") || "Speed"}
      </AtomicText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {SPEED_PRESETS.map((preset) => {
          const isActive = playbackRate === preset.value;
          return (
            <TouchableOpacity
              key={preset.value}
              style={[styles.btn, isActive && styles.btnActive]}
              onPress={() => onChangeRate(preset.value)}
              accessibilityLabel={preset.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <AtomicText
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "onPrimary" : "textSecondary"}
              >
                {preset.label}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
